import { NextResponse } from 'next/server';
import { nanoid } from '@/lib/nanoid';
import { createServerClient, type EmailTest } from '@/lib/supabase';

export const runtime = 'nodejs'; // 需要nodejs才能用supabase

// 内存存储（作为Supabase的fallback，注意serverless实例独立，仅作演示）
const memoryStore = new Map<string, EmailTest>();

export async function POST() {
  try {
    // 生成唯一测试ID
    const testId = nanoid(8);
    // 使用固定邮箱地址，测试ID通过主题传递
    const testEmail = `t@test.mailprobe.xyz`;
    
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24小时

    const testData: EmailTest = {
      id: testId,
      email: testEmail,
      status: 'pending',
      created_at: now.toISOString(),
      expires_at: expiresAt.toISOString(),
    };

    // 尝试保存到Supabase
    const supabase = createServerClient();
    
    if (supabase) {
      const { error } = await supabase
        .from('email_tests')
        .insert(testData);

      if (error) {
        console.error('Supabase insert error:', error);
        // 降级到内存存储
        memoryStore.set(testId, testData);
      }
    } else {
      // 没有配置Supabase，使用内存存储
      memoryStore.set(testId, testData);
    }

    return NextResponse.json({
      success: true,
      testId,
      email: testEmail,
    });

  } catch (error: any) {
    console.error('Create test error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create test' },
      { status: 500 }
    );
  }
}
