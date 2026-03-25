import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  const debug = {
    hasUrl: !!supabaseUrl,
    hasServiceKey: !!supabaseServiceKey,
    urlPrefix: supabaseUrl?.substring(0, 30),
    keyPrefix: supabaseServiceKey?.substring(0, 20),
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
  };

  // 方法1: 用 supabase 客户端
  const supabase = createServerClient();
  let clientResult: any = null;
  
  if (supabase) {
    const { data, error } = await supabase
      .from('email_tests')
      .select('id, status, received_at')
      .eq('id', 'bOWNoczy')
      .single();
    clientResult = { data, error: error?.message };
  }

  // 方法2: 用 fetch 直接调用 REST API
  let fetchResult: any = null;
  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/email_tests?id=eq.bOWNoczy&select=id,status,received_at`,
      {
        headers: {
          'apikey': supabaseServiceKey!,
          'Authorization': `Bearer ${supabaseServiceKey}`,
        },
      }
    );
    fetchResult = await res.json();
  } catch (e: any) {
    fetchResult = { error: e.message };
  }

  return NextResponse.json({
    success: true,
    clientResult,
    fetchResult,
    debug,
  });
}
