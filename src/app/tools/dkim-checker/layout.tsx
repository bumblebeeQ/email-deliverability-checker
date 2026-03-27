import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free DKIM Record Checker - Lookup & Validate DKIM | EmailDiag',
  description: 'Free DKIM record checker and lookup tool. Validate DKIM signatures, check key length, verify selectors, and ensure your email authentication is properly configured.',
  keywords: 'DKIM checker, DKIM record lookup, DKIM validator, check DKIM record, DKIM test, email authentication, DKIM selector lookup',
  openGraph: {
    title: 'Free DKIM Record Checker - Lookup & Validate DKIM',
    description: 'Lookup and validate your DKIM configuration. Check key length, verify selectors, and ensure proper email authentication.',
    url: 'https://www.emaildiag.com/tools/dkim-checker',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.emaildiag.com/tools/dkim-checker',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
