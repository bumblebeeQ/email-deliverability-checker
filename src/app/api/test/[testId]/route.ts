import { NextRequest, NextResponse } from 'next/server';
import { type EmailTest } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: { testId: string } }
) {
  const { testId } = params;

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    let test: EmailTest | null = null;
    let debugInfo: any = { testIdReceived: testId };

    // 直接用 fetch 查询（避免 supabase 客户端的潜在问题）
    if (supabaseUrl && supabaseServiceKey) {
      const res = await fetch(
        `${supabaseUrl}/rest/v1/email_tests?id=eq.${testId}&select=*`,
        {
          headers: {
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`,
          },
          cache: 'no-store',
        }
      );
      const rows = await res.json();
      debugInfo.fetchRows = rows?.length;
      
      if (Array.isArray(rows) && rows.length > 0) {
        test = rows[0] as EmailTest;
        debugInfo.fetchStatus = test.status;
      }
    } else {
      debugInfo.error = 'Missing Supabase config';
    }

    // 如果找不到记录
    if (!test) {
      return NextResponse.json({
        success: false,
        error: 'Test not found',
        _debug: debugInfo,
      }, { status: 404 });
    }

    // 检查是否过期
    if (test.status === 'pending' && new Date(test.expires_at) < new Date()) {
      test.status = 'expired';
      // 更新数据库
      await fetch(
        `${supabaseUrl}/rest/v1/email_tests?id=eq.${testId}`,
        {
          method: 'PATCH',
          headers: {
            'apikey': supabaseServiceKey!,
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'expired' }),
        }
      );
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
      _debug: debugInfo,
    });

  } catch (error: any) {
    console.error('Get test error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to get test result' },
      { status: 500 }
    );
  }
}
