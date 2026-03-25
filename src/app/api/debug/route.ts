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
  };

  const supabase = createServerClient();
  
  if (!supabase) {
    return NextResponse.json({
      success: false,
      error: 'Supabase client is null',
      debug,
    });
  }

  try {
    const { data, error } = await supabase
      .from('email_tests')
      .select('id, status')
      .limit(3);

    return NextResponse.json({
      success: !error,
      data,
      error: error?.message,
      debug,
    });
  } catch (e: any) {
    return NextResponse.json({
      success: false,
      error: e.message,
      debug,
    });
  }
}
