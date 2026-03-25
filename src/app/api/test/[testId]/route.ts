import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, type EmailTest } from '@/lib/supabase';

export const runtime = 'nodejs';

// 内存存储（与create路由共享概念，但由于serverless每个实例独立，实际需要数据库）
const memoryStore = new Map<string, EmailTest>();

export async function GET(
  request: NextRequest,
  { params }: { params: { testId: string } }
) {
  const { testId } = params;

  try {
    const supabase = createServerClient();
    let test: EmailTest | null = null;
    let debugInfo: any = { supabaseCreated: !!supabase };

    // 尝试从Supabase获取
    if (supabase) {
      const { data, error } = await supabase
        .from('email_tests')
        .select('*')
        .eq('id', testId)
        .single();

      debugInfo.queryError = error?.message;
      debugInfo.dataFound = !!data;
      debugInfo.dataStatus = data?.status;

      if (!error && data) {
        test = data as EmailTest;
      }
    }

    // 从内存获取（fallback）
    if (!test) {
      test = memoryStore.get(testId) || null;
      debugInfo.fromMemory = !!test;
    }

    // 如果找不到，创建演示测试
    if (!test) {
      debugInfo.createdDemo = true;
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
    
    // 添加debug信息到响应（临时）
    console.log('Debug info:', JSON.stringify(debugInfo));

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

    // 模拟模式已禁用，只等待真实邮件

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
      _debug: debugInfo, // 临时调试
    });

  } catch (error: any) {
    console.error('Get test error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to get test result' },
      { status: 500 }
    );
  }
}
