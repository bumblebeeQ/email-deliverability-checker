import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain') || 'example.com';
  const score = parseInt(searchParams.get('score') || '0');
  const grade = searchParams.get('grade') || 'F';

  // Grade colors
  const gradeColors: Record<string, { bg: string; text: string; border: string }> = {
    'A': { bg: '#dcfce7', text: '#16a34a', border: '#86efac' },
    'B': { bg: '#dbeafe', text: '#2563eb', border: '#93c5fd' },
    'C': { bg: '#fef9c3', text: '#ca8a04', border: '#fde047' },
    'D': { bg: '#fed7aa', text: '#ea580c', border: '#fdba74' },
    'F': { bg: '#fee2e2', text: '#dc2626', border: '#fca5a5' },
  };

  const colors = gradeColors[grade] || gradeColors['F'];

  // Score bar color
  const scoreColor = score >= 75 ? '#22c55e' : score >= 50 ? '#eab308' : '#ef4444';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8fafc',
          background: 'linear-gradient(to bottom right, #eff6ff, #f8fafc, #eff6ff)',
        }}
      >
        {/* Logo and title */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16,
            }}
          >
            <span style={{ fontSize: 32, color: 'white' }}>✉️</span>
          </div>
          <span style={{ fontSize: 36, fontWeight: 700, color: '#1e293b' }}>
            EmailDiag
          </span>
        </div>

        {/* Domain */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: 32,
            maxWidth: 900,
            textAlign: 'center',
            wordBreak: 'break-all',
          }}
        >
          {domain}
        </div>

        {/* Score card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 48,
            padding: '40px 64px',
            background: 'white',
            borderRadius: 24,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Grade circle */}
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: colors.bg,
              border: `6px solid ${colors.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: colors.text,
              }}
            >
              {grade}
            </span>
          </div>

          {/* Score */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 24, color: '#64748b' }}>
              Email Deliverability Score
            </div>
            <div style={{ fontSize: 64, fontWeight: 800, color: '#0f172a' }}>
              {score}/100
            </div>
            {/* Score bar */}
            <div
              style={{
                width: 300,
                height: 16,
                background: '#e2e8f0',
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${score}%`,
                  height: '100%',
                  background: scoreColor,
                  borderRadius: 8,
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 32,
            fontSize: 20,
            color: '#94a3b8',
          }}
        >
          www.emaildiag.com • Free Email Deliverability Checker
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
