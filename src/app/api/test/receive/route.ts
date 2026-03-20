import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export const runtime = 'nodejs';

/**
 * 接收来自 Cloudflare Email Worker 的邮件分析结果
 * POST /api/test/receive
 * 
 * Headers:
 *   Authorization: Bearer {EMAIL_TEST_API_SECRET}
 * 
 * Body:
 * {
 *   testId: string,
 *   analysis: {
 *     spf: { status, details },
 *     dkim: { status, details, selector },
 *     dmarc: { status, details },
 *     sendingIp: string,
 *     reverseDns: string,
 *     from: string,
 *     subject: string,
 *     spamScore: number,
 *     spamDetails: string[],
 *   },
 *   headers: string,
 *   receivedAt: string,
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // 验证API密钥
    const authHeader = request.headers.get('authorization');
    const expectedSecret = process.env.EMAIL_TEST_API_SECRET;

    if (expectedSecret) {
      const providedSecret = authHeader?.replace('Bearer ', '');
      if (providedSecret !== expectedSecret) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    const body = await request.json();
    const { testId, analysis, headers, receivedAt } = body;

    if (!testId) {
      return NextResponse.json(
        { success: false, error: 'Missing testId' },
        { status: 400 }
      );
    }

    console.log('Received email result for test:', testId);

    const supabase = createServerClient();

    if (!supabase) {
      console.error('Supabase not configured, cannot store email result');
      return NextResponse.json(
        { success: false, error: 'Database not configured' },
        { status: 500 }
      );
    }

    // 更新测试记录
    const updateData: any = {
      status: 'received',
      received_at: receivedAt || new Date().toISOString(),
      raw_headers: headers,
    };

    if (analysis) {
      updateData.from_address = analysis.from;
      updateData.subject = analysis.subject;
      updateData.sending_ip = analysis.sendingIp;
      updateData.reverse_dns = analysis.reverseDns;
      
      if (analysis.spf) {
        updateData.spf_result = analysis.spf.status;
        updateData.spf_details = analysis.spf.details;
      }
      
      if (analysis.dkim) {
        updateData.dkim_result = analysis.dkim.status;
        updateData.dkim_details = analysis.dkim.details;
        updateData.dkim_selector = analysis.dkim.selector;
      }
      
      if (analysis.dmarc) {
        updateData.dmarc_result = analysis.dmarc.status;
        updateData.dmarc_details = analysis.dmarc.details;
      }

      if (typeof analysis.spamScore === 'number') {
        updateData.spam_score = analysis.spamScore;
      }

      if (analysis.spamDetails) {
        updateData.spam_details = analysis.spamDetails;
      }

      // 存储完整分析结果
      updateData.analysis = analysis;
    }

    const { error } = await supabase
      .from('email_tests')
      .update(updateData)
      .eq('id', testId);

    if (error) {
      console.error('Failed to update test:', error);
      return NextResponse.json(
        { success: false, error: 'Database update failed' },
        { status: 500 }
      );
    }

    console.log('Successfully stored email result for test:', testId);

    return NextResponse.json({
      success: true,
      message: 'Email result received',
    });

  } catch (error: any) {
    console.error('Receive email error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process email' },
      { status: 500 }
    );
  }
}

// 健康检查
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Email receive endpoint is healthy',
    timestamp: new Date().toISOString(),
  });
}
