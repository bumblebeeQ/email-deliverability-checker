import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free SPF Record Checker - Validate SPF Configuration | EmailDiag',
  description: 'Free SPF record checker tool. Validate your SPF configuration, check DNS lookup limits, analyze mechanisms, and get recommendations to improve email deliverability.',
  keywords: 'SPF checker, SPF record lookup, SPF validator, check SPF record, SPF test, email authentication, SPF DNS lookup',
  openGraph: {
    title: 'Free SPF Record Checker - Validate SPF Configuration',
    description: 'Validate your SPF configuration instantly. Check DNS lookups, analyze mechanisms, and get actionable recommendations.',
    url: 'https://www.emaildiag.com/tools/spf-checker',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.emaildiag.com/tools/spf-checker',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
