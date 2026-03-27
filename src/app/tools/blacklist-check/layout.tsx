import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Email Blacklist Checker - Scan 50+ Blacklists | EmailDiag',
  description: 'Free email blacklist checker tool. Scan your domain and IP against 50+ major blacklists including Spamhaus, SpamCop, Barracuda. Find out if you are blacklisted and how to get delisted.',
  keywords: 'blacklist checker, email blacklist check, IP blacklist lookup, DNSBL check, Spamhaus check, spam blacklist, domain blacklist, RBL check',
  openGraph: {
    title: 'Free Email Blacklist Checker - Scan 50+ Blacklists',
    description: 'Scan your domain and IP against 50+ major email blacklists. Find out if you are blacklisted and get delisting guidance.',
    url: 'https://www.emaildiag.com/tools/blacklist-check',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.emaildiag.com/tools/blacklist-check',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
