import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { getAllProviders } from '@/lib/fix-guides';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Email Authentication Guides - SPF, DKIM, DMARC Setup | EmailDiag',
  description: 'Step-by-step guides to configure SPF, DKIM, and DMARC for Cloudflare, GoDaddy, Aliyun, DNSPod, and AWS Route 53. Fix email deliverability issues.',
  keywords: 'SPF setup, DKIM configuration, DMARC guide, email authentication, DNS setup, Cloudflare SPF, GoDaddy DKIM',
  openGraph: {
    title: 'Email Authentication Guides - SPF, DKIM, DMARC Setup',
    description: 'Step-by-step guides to configure SPF, DKIM, and DMARC for major DNS providers.',
    url: 'https://www.emaildiag.com/guides',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.emaildiag.com/guides',
  },
};

const RECORD_TYPES = [
  {
    id: 'spf',
    name: 'SPF',
    fullName: 'Sender Policy Framework',
    description: 'Specify which servers can send emails on behalf of your domain',
    color: 'blue',
  },
  {
    id: 'dkim',
    name: 'DKIM',
    fullName: 'DomainKeys Identified Mail',
    description: 'Add digital signatures to verify email authenticity',
    color: 'green',
  },
  {
    id: 'dmarc',
    name: 'DMARC',
    fullName: 'Domain-based Message Authentication',
    description: 'Define policies for handling failed authentication',
    color: 'purple',
  },
];

export default function GuidesPage() {
  const providers = getAllProviders();

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <Navbar />

      {/* Hero */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Email Authentication Setup Guides
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Step-by-step instructions to configure SPF, DKIM, and DMARC for your domain.
            <br />
            Choose your DNS provider to get started.
          </p>
        </div>
      </section>

      {/* What is Email Authentication */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Understanding Email Authentication
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {RECORD_TYPES.map((record) => (
              <div
                key={record.id}
                className={`p-6 rounded-xl border-2 ${
                  record.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                  record.color === 'green' ? 'bg-green-50 border-green-200' :
                  'bg-purple-50 border-purple-200'
                }`}
              >
                <div className={`inline-flex p-2 rounded-lg mb-4 ${
                  record.color === 'blue' ? 'bg-blue-100' :
                  record.color === 'green' ? 'bg-green-100' :
                  'bg-purple-100'
                }`}>
                  <Shield className={`w-6 h-6 ${
                    record.color === 'blue' ? 'text-blue-600' :
                    record.color === 'green' ? 'text-green-600' :
                    'text-purple-600'
                  }`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{record.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{record.fullName}</p>
                <p className="text-sm text-gray-600">{record.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DNS Providers Grid */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Select Your DNS Provider
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <Link
                key={provider.id}
                href={`/guides/${provider.id}`}
                className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all group"
              >
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 mb-3">
                  {provider.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Setup guides for SPF, DKIM, and DMARC
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">SPF</span>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">DKIM</span>
                  <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">DMARC</span>
                </div>
                <div className="flex items-center text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
                  View Guides <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Authentication Matters */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Why Email Authentication Matters
          </h2>
          <div className="space-y-4">
            {[
              { title: 'Prevent Spoofing', desc: 'Stop attackers from sending emails pretending to be you' },
              { title: 'Improve Deliverability', desc: 'Authenticated emails are more likely to reach the inbox' },
              { title: 'Build Trust', desc: 'Recipients and email providers trust verified senders' },
              { title: 'Protect Brand', desc: 'Prevent phishing attacks that damage your reputation' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Check Your Current Configuration
          </h2>
          <p className="text-gray-600 mb-6">
            Use our free tool to see if your domain's email authentication is properly configured.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Check Your Domain <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2026 EmailDiag. The friendliest free email deliverability tool.</p>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="/about" className="hover:text-blue-600">About</Link>
              <Link href="/privacy" className="hover:text-blue-600">Privacy</Link>
              <Link href="/terms" className="hover:text-blue-600">Terms</Link>
              <a href="mailto:hello@emaildiag.com" className="hover:text-blue-600">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
