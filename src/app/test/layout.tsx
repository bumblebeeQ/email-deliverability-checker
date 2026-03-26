import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Email Test - Check SPF DKIM DMARC Authentication',
  description: 'Send a test email to analyze your SPF, DKIM, DMARC authentication and spam score. Get instant results with actionable recommendations.',
  openGraph: {
    title: 'Free Email Test - Check SPF DKIM DMARC | EmailDiag',
    description: 'Send a test email to analyze your email authentication and spam score. Free, instant results.',
  },
};

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
