import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free DMARC Record Checker - Validate DMARC Policy | EmailDiag',
  description: 'Free DMARC record checker tool. Validate your DMARC policy, check alignment settings, analyze reporting configuration, and protect your domain from email spoofing.',
  keywords: 'DMARC checker, DMARC record lookup, DMARC validator, check DMARC record, DMARC test, email authentication, DMARC policy analyzer',
  openGraph: {
    title: 'Free DMARC Record Checker - Validate DMARC Policy',
    description: 'Validate your DMARC policy and protect your domain from email spoofing. Check alignment, reporting, and get recommendations.',
    url: 'https://www.emaildiag.com/tools/dmarc-checker',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.emaildiag.com/tools/dmarc-checker',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
