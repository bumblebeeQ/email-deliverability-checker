import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, type EmailTest } from '@/lib/supabase';

export const runtime = 'nodejs';

// 内存存储（与create路由共享概念，但由于serverless每个实例独立，实际需要数据库）
const memoryStore = new Map<string, EmailTest>();

// 模拟数据 - 已禁用，只有真实邮件才会显示结果
// 如需本地测试，可以取消注释下面的函数
function generateMockAnalysis(testId: string, email: string, createdAt: string) {
  // 禁用模拟模式 - 返回 null
  return null;
  
  /*
  const createdTime = new Date(createdAt).getTime();
  const elapsed = Date.now() - createdTime;
  
  // 15秒后生成模拟结果（演示用）
  if (elapsed < 15000) {
    return null;
  }

  return {
    spf: { 
      status: 'pass', 
      details: 'SPF record exists and sender IP is authorized' 
    },
    dkim: { 
      status: 'pass', 
      details: 'DKIM signature verified successfully',
      selector: 'google'
    },
    dmarc: { 
      status: 'pass', 
      details: 'DMARC policy satisfied (p=quarantine)' 
    },
    sendingIp: '209.85.220.41',
    reverseDns: 'mail-sor-f41.google.com',
    from: 'demo@example.com',
    subject: 'Test Email - Demo Mode',
    spamScore: 1.5,
    spamDetails: [
      'HTML_MESSAGE: HTML included in message',
      'MIME_HTML_ONLY: Message only has text/html MIME parts',
    ],
  };
  */
}

function generateMockHeaders(email: string) {
  return `Received: from mail-sor-f41.google.com (mail-sor-f41.google.com [209.85.220.41])
        by test.mailprobe.xyz with ESMTPS id demo123
        for <${email}>; ${new Date().toUTCString()}
Authentication-Results: test.mailprobe.xyz;
        spf=pass (google.com: domain of demo@example.com designates 209.85.220.41 as permitted sender);
        dkim=pass header.d=example.com header.s=google;
        dmarc=pass (p=QUARANTINE sp=QUARANTINE dis=NONE) header.from=example.com
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=example.com; s=google;
        h=from:to:subject:date:message-id;
        bh=abc123def456...;
        b=xyz789abc123...
From: demo@example.com
To: ${email}
Subject: Test Email - Demo Mode
Date: ${new Date().toUTCString()}
Message-ID: <demo123@mail.example.com>
Content-Type: text/html; charset=UTF-8

[This is a demo email for testing purposes]`;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { testId: string } }
) {
  const { testId } = params;

  try {
    const supabase = createServerClient();
    let test: EmailTest | null = null;

    // 尝试从Supabase获取
    if (supabase) {
      const { data, error } = await supabase
        .from('email_tests')
        .select('*')
        .eq('id', testId)
        .single();

      if (!error && data) {
        test = data as EmailTest;
      }
    }

    // 从内存获取（fallback）
    if (!test) {
      test = memoryStore.get(testId) || null;
    }

    // 如果找不到，创建演示测试
    if (!test) {
      const now = new Date();
      test = {
        id: testId,
        email: `test-${testId}@test.mailprobe.xyz`,
        status: 'pending',
        created_at: new Date(now.getTime() - 5000).toISOString(),
        expires_at: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      };
      memoryStore.set(testId, test);
    }

    // 检查是否过期
    if (test.status === 'pending' && new Date(test.expires_at) < new Date()) {
      test.status = 'expired';
      
      // 更新数据库
      if (supabase) {
        await supabase
          .from('email_tests')
          .update({ status: 'expired' })
          .eq('id', testId);
      }
      memoryStore.set(testId, test);
    }

    // 如果还在pending，检查是否有模拟数据（演示模式）
    if (test.status === 'pending') {
      const mockAnalysis = generateMockAnalysis(testId, test.email, test.created_at);
      
      if (mockAnalysis) {
        test.status = 'received';
        test.received_at = new Date().toISOString();
        test.analysis = mockAnalysis;
        test.raw_headers = generateMockHeaders(test.email);
        test.from_address = mockAnalysis.from;
        test.subject = mockAnalysis.subject;
        test.sending_ip = mockAnalysis.sendingIp;
        test.reverse_dns = mockAnalysis.reverseDns;
        test.spf_result = mockAnalysis.spf.status;
        test.spf_details = mockAnalysis.spf.details;
        test.dkim_result = mockAnalysis.dkim.status;
        test.dkim_details = mockAnalysis.dkim.details;
        test.dkim_selector = mockAnalysis.dkim.selector;
        test.dmarc_result = mockAnalysis.dmarc.status;
        test.dmarc_details = mockAnalysis.dmarc.details;
        test.spam_score = mockAnalysis.spamScore;
        test.spam_details = mockAnalysis.spamDetails;
        
        memoryStore.set(testId, test);
      }
    }

    // 构建响应
    const result = {
      id: test.id,
      email: test.email,
      status: test.status,
      createdAt: test.created_at,
      expiresAt: test.expires_at,
      receivedAt: test.received_at,
      analysis: test.status === 'received' ? {
        spf: { status: test.spf_result || 'none', details: test.spf_details || '' },
        dkim: { 
          status: test.dkim_result || 'none', 
          details: test.dkim_details || '',
          selector: test.dkim_selector 
        },
        dmarc: { status: test.dmarc_result || 'none', details: test.dmarc_details || '' },
        sendingIp: test.sending_ip,
        reverseDns: test.reverse_dns,
        from: test.from_address,
        subject: test.subject,
        spamScore: test.spam_score,
        spamDetails: test.spam_details,
      } : undefined,
      headers: test.raw_headers,
    };

    return NextResponse.json({
      success: true,
      result,
    });

  } catch (error: any) {
    console.error('Get test error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to get test result' },
      { status: 500 }
    );
  }
}
