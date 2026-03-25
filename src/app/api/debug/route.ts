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
    // Test specific record
    const { data: specific, error: specificError } = await supabase
      .from('email_tests')
      .select('*')
      .eq('id', 'bOWNoczy')
      .single();

    // Test general query
    const { data: all, error: allError } = await supabase
      .from('email_tests')
      .select('id, status')
      .order('created_at', { ascending: false })
      .limit(5);

    return NextResponse.json({
      success: true,
      specific: {
        data: specific,
        error: specificError?.message,
      },
      all: {
        data: all,
        error: allError?.message,
      },
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
