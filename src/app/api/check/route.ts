import { NextRequest, NextResponse } from 'next/server';
import { checkDomain } from '@/lib/dns-checker';
import { isValidDomain, extractDomain } from '@/lib/utils';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let { domain } = body;

    if (!domain) {
      return NextResponse.json(
        { success: false, error: '请输入域名' },
        { status: 400 }
      );
    }

    // 提取并验证域名
    domain = extractDomain(domain);
    
    if (!isValidDomain(domain)) {
      return NextResponse.json(
        { success: false, error: '无效的域名格式' },
        { status: 400 }
      );
    }

    // 执行检测
    const result = await checkDomain(domain);

    return NextResponse.json({
      success: true,
      data: result,
    });

  } catch (error: any) {
    console.error('Check error:', error);
    return NextResponse.json(
      { success: false, error: error.message || '检测失败' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json(
      { success: false, error: '请提供 domain 参数' },
      { status: 400 }
    );
  }

  // 复用 POST 逻辑
  const mockRequest = {
    json: async () => ({ domain }),
  } as NextRequest;

  return POST(mockRequest);
}
