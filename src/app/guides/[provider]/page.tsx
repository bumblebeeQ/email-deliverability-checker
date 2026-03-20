import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Shield, Mail, Zap, ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import { getAllProviders, DNS_PROVIDERS, type DNSProvider } from '@/lib/fix-guides';

interface PageProps {
  params: { provider: string };
}

const RECORD_TYPES = [
  { id: 'spf', name: 'SPF', fullName: 'Sender Policy Framework', description: 'Authorize email senders' },
  { id: 'dkim', name: 'DKIM', fullName: 'DomainKeys Identified Mail', description: 'Sign your emails' },
  { id: 'dmarc', name: 'DMARC', fullName: 'Domain-based Message Authentication', description: 'Set authentication policies' },
];

export async function generateStaticParams() {
  const providers = getAllProviders();
  return providers.map((provider) => ({
    provider: provider.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const providerId = params.provider as DNSProvider;
  const provider = DNS_PROVIDERS[providerId];
  
  if (!provider) return { title: 'Not Found' };

  return {
    title: `${provider.name} Email Authentication Guide - SPF, DKIM, DMARC Setup | MailProbe`,
    description: `Complete guide to configure SPF, DKIM, and DMARC records in ${provider.name}. Step-by-step instructions with examples and common mistakes to avoid.`,
    keywords: `${provider.name} SPF, ${provider.name} DKIM, ${provider.name} DMARC, ${provider.name} email setup, ${provider.name} DNS TXT record`,
  };
}

export default function ProviderGuidePage({ params }: PageProps) {
  const providerId = params.provider as DNSProvider;
  const provider = DNS_PROVIDERS[providerId];

  if (!provider) {
    notFound();
  }

  const allProviders = getAllProviders();

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
            <span className="text-xl font-bold text-gray-800">MailProbe</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/guides" className="text-blue-600 font-medium">Guides</Link>
            <Link href="#" className="hover:text-blue-600">Pricing</Link>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/guides" className="hover:text-blue-600 flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> All Guides
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{provider.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {provider.name} Email Authentication Guide
              </h1>
              <p className="text-lg text-gray-600">
                Configure SPF, DKIM, and DMARC records step by step
              </p>
            </div>
            <a
              href={provider.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Open {provider.name} <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Record Type Cards */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            {RECORD_TYPES.map((record) => (
              <Link
                key={record.id}
                href={`/guides/${providerId}/${record.id}`}
                className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-blue-400 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600">
                    {record.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 mb-2">{record.fullName}</p>
                <p className="text-gray-600 mb-4">{record.description}</p>
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  View Guide <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Overview</h2>
          
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Setting up email authentication in {provider.name}</h3>
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center">1</span>
                <div>
                  <p className="font-medium text-gray-800">Log in to {provider.name}</p>
                  <p className="text-sm text-gray-600">Access your DNS management console at <a href={provider.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{provider.url}</a></p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center">2</span>
                <div>
                  <p className="font-medium text-gray-800">Navigate to DNS Records</p>
                  <p className="text-sm text-gray-600">Find the DNS management section for your domain</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center">3</span>
                <div>
                  <p className="font-medium text-gray-800">Add TXT Records</p>
                  <p className="text-sm text-gray-600">Create SPF, DKIM, and DMARC TXT records following our guides</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center">4</span>
                <div>
                  <p className="font-medium text-gray-800">Verify Configuration</p>
                  <p className="text-sm text-gray-600">Use our <Link href="/" className="text-blue-600 hover:underline">free checker</Link> to verify your setup</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Other Providers */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Other DNS Providers</h2>
          <div className="flex flex-wrap gap-2">
            {allProviders.filter(p => p.id !== providerId).map((p) => (
              <Link
                key={p.id}
                href={`/guides/${p.id}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-blue-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Check Your Domain Configuration
          </h2>
          <p className="text-gray-600 mb-6">
            After setting up your records, verify they're correctly configured with our free checker.
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
          <p>© 2026 MailProbe. Free email deliverability checker.</p>
        </div>
      </footer>
    </main>
  );
}
