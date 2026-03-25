import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Mail, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { getAllProviders } from '@/lib/fix-guides';

export const metadata: Metadata = {
  title: 'Email Authentication Guides - SPF, DKIM, DMARC Setup | EmailDiag',
  description: 'Step-by-step guides to configure SPF, DKIM, and DMARC for Cloudflare, GoDaddy, Aliyun, DNSPod, and AWS Route 53. Fix email deliverability issues.',
  keywords: 'SPF setup, DKIM configuration, DMARC guide, email authentication, DNS setup, Cloudflare SPF, GoDaddy DKIM',
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
      <header className="py-6 px-4 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl rotate-3"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
                <Zap className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1" />
              </div>
            </div>
            <span className="text-xl font-bold text-gray-800">EmailDiag</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/guides" className="text-blue-600 font-medium">Guides</Link>
            <Link href="#" className="hover:text-blue-600">Pricing</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Email Authentication Setup Guides
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Step-by-step instructions to configure SPF, DKIM, and DMARC for your domain.
            Choose your DNS provider to get started.
          </p>
        </div>
      </section>

      {/* DNS Providers Grid */}
      <section className="pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Your DNS Provider</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {providers.map((provider) => (
              <Link
                key={provider.id}
                href={`/guides/${provider.id}`}
                className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-blue-400 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                      {provider.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      SPF · DKIM · DMARC Guides
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Record Types Overview */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Understanding Email Authentication</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {RECORD_TYPES.map((record) => (
              <div key={record.id} className="bg-gray-50 rounded-xl p-6">
                <div className={`inline-flex p-3 rounded-lg mb-4 ${
                  record.color === 'blue' ? 'bg-blue-100' :
                  record.color === 'green' ? 'bg-green-100' : 'bg-purple-100'
                }`}>
                  <Shield className={`w-6 h-6 ${
                    record.color === 'blue' ? 'text-blue-600' :
                    record.color === 'green' ? 'text-green-600' : 'text-purple-600'
                  }`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{record.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{record.fullName}</p>
                <p className="text-gray-600">{record.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links by Record Type */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Links</h2>
          
          {RECORD_TYPES.map((record) => (
            <div key={record.id} className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">{record.name} Setup Guides</h3>
              <div className="flex flex-wrap gap-2">
                {providers.map((provider) => (
                  <Link
                    key={`${provider.id}-${record.id}`}
                    href={`/guides/${provider.id}/${record.id}`}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
                  >
                    {provider.name} {record.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Email Authentication Matters */}
      <section className="py-12 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Why Email Authentication Matters
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-3">✅ Benefits of Proper Setup</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Higher inbox placement rates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Protection against email spoofing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Better sender reputation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Compliance with Gmail/Yahoo requirements</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-3">⚠️ Risks Without Authentication</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Emails landing in spam folders</li>
                <li>• Domain being blacklisted</li>
                <li>• Phishing attacks using your domain</li>
                <li>• Rejected emails from major providers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-gray-600 mb-6">
            Run a free check on your domain to see which records need to be configured.
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
        <div className="max-w-5xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2026 EmailDiag. Free email deliverability checker.</p>
        </div>
      </footer>
    </main>
  );
}
