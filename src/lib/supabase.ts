import { createClient } from '@supabase/supabase-js';

// 公共客户端（用于前端）
export function createBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

// 服务端客户端（用于API，有完整权限）
export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    // 如果没配置，返回null，让调用方使用fallback
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// 类型定义
export interface EmailTest {
  id: string;
  email: string;
  status: 'pending' | 'received' | 'expired';
  created_at: string;
  expires_at: string;
  received_at?: string;
  raw_headers?: string;
  from_address?: string;
  subject?: string;
  sending_ip?: string;
  reverse_dns?: string;
  spf_result?: string;
  spf_details?: string;
  dkim_result?: string;
  dkim_details?: string;
  dkim_selector?: string;
  dmarc_result?: string;
  dmarc_details?: string;
  spam_score?: number;
  spam_details?: string[];
  analysis?: any;
}
