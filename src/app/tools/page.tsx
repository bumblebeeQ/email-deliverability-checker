import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Key, Ban, ArrowRight, Wrench } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Free Email Deliverability Tools - SPF, DKIM, DMARC, Blacklist | EmailDiag',
  description: 'Free email deliverability tools. Check SPF records, validate DKIM signatures, analyze DMARC policies, and scan blacklists. All tools are 100% free, no registration required.',
  keywords: 'email tools, SPF checker, DKIM checker, DMARC checker, blacklist checker, email deliverability tools, free email tools',
  openGraph: {
    title: 'Free Email Deliverability Tools',
    description: 'Free tools to check SPF, DKIM, DMARC, and blacklists. Improve your email deliverability.',
    url: 'https://www.emaildiag.com/tools',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.emaildiag.com/tools',
  },
};

const tools = [
  {
    id: 'spf-checker',
    name: 'SPF Record Checker',
    description: 'Validate your SPF configuration, check DNS lookup limits, and analyze mechanisms.',
    icon: Shield,
    color: 'blue',
    features: ['DNS lookup count', 'Mechanism analysis', 'Include sources'],
  },
  {
    id: 'dkim-checker',
    name: 'DKIM Record Checker',
    description: 'Lookup and validate DKIM signatures, check key length, and verify selectors.',
    icon: Key,
    color: 'green',
    features: ['Auto-detect selectors', 'Key length check', 'Signature validation'],
  },
  {
    id: 'dmarc-checker',
    name: 'DMARC Record Checker',
    description: 'Analyze your DMARC policy, check alignment settings, and review reporting configuration.',
    icon: Shield,
    color: 'purple',
    features: ['Policy analysis', 'Reporting check', 'Alignment validation'],
  },
  {
    id: 'blacklist-check',
    name: 'Email Blacklist Checker',
    description: 'Scan your domain and IP against 50+ major blacklists including Spamhaus and SpamCop.',
    icon: Ban,
    color: 'red',
    features: ['50+ blacklists', 'Instant results', 'Delisting guidance'],
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Hero */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 p-2 bg-blue-100 rounded-full mb-4">
            <Wrench className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Free Email Deliverability Tools
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            All the tools you need to diagnose and fix email deliverability issues.
            <br />
            100% free, no registration required.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.id}`}
                className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all group"
              >
                <div className={`inline-flex p-3 rounded-xl mb-4 ${
                  tool.color === 'blue' ? 'bg-blue-100' :
                  tool.color === 'green' ? 'bg-green-100' :
                  tool.color === 'purple' ? 'bg-purple-100' :
                  'bg-red-100'
                }`}>
                  <tool.icon className={`w-6 h-6 ${
                    tool.color === 'blue' ? 'text-blue-600' :
                    tool.color === 'green' ? 'text-green-600' :
                    tool.color === 'purple' ? 'text-purple-600' :
                    'text-red-600'
                  }`} />
                </div>
                
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 mb-2">
                  {tool.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  {tool.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.features.map((feature, i) => (
                    <span key={i} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center text-blue-600 font-medium group-hover:gap-2 transition-all">
                  Use Tool <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Full Check CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Want to Check Everything at Once?
          </h2>
          <p className="text-gray-600 mb-6">
            Our comprehensive email deliverability checker runs all tests in one scan
            and gives you a complete health report for your domain.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
          >
            Full Domain Check <ArrowRight className="w-4 h-4" />
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
