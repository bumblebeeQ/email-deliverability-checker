import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Shield, Mail, Zap, ArrowLeft, ExternalLink, Copy, Check, Terminal, Lightbulb, AlertCircle } from 'lucide-react';
import { getFixGuide, getAllProviders, DNS_PROVIDERS, type DNSProvider, type RecordType } from '@/lib/fix-guides';
import { CopyButton } from './CopyButton';

interface PageProps {
  params: { provider: string; record: string };
}

const RECORD_INFO: Record<RecordType, { name: string; fullName: string; color: string }> = {
  spf: { name: 'SPF', fullName: 'Sender Policy Framework', color: 'blue' },
  dkim: { name: 'DKIM', fullName: 'DomainKeys Identified Mail', color: 'green' },
  dmarc: { name: 'DMARC', fullName: 'Domain-based Message Authentication', color: 'purple' },
};

export async function generateStaticParams() {
  const providers = getAllProviders();
  const records: RecordType[] = ['spf', 'dkim', 'dmarc'];
  
  const params: Array<{ provider: string; record: string }> = [];
  for (const provider of providers) {
    for (const record of records) {
      params.push({ provider: provider.id, record });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const providerId = params.provider as DNSProvider;
  const recordType = params.record as RecordType;
  const provider = DNS_PROVIDERS[providerId];
  const record = RECORD_INFO[recordType];
  
  if (!provider || !record) return { title: 'Not Found' };

  return {
    title: `${provider.name} ${record.name} Setup Guide - ${record.fullName} Configuration | EmailDiag`,
    description: `Step-by-step guide to configure ${record.name} (${record.fullName}) in ${provider.name}. Includes example values, verification commands, and common mistakes to avoid.`,
    keywords: `${provider.name} ${record.name}, ${provider.name} ${record.name} setup, ${provider.name} ${record.fullName}, ${record.name} TXT record, email authentication`,
  };
}

export default function RecordGuidePage({ params }: PageProps) {
  const providerId = params.provider as DNSProvider;
  const recordType = params.record as RecordType;
  
  const provider = DNS_PROVIDERS[providerId];
  const recordInfo = RECORD_INFO[recordType];

  if (!provider || !recordInfo) {
    notFound();
  }

  const guide = getFixGuide(providerId, recordType);
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
            <span className="text-xl font-bold text-gray-800">EmailDiag</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/guides" className="text-blue-600 font-medium">Guides</Link>
            <Link href="/test" className="hover:text-blue-600">Email Test</Link>
            <Link href="/faq" className="hover:text-blue-600">FAQ</Link>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <Link href="/guides" className="hover:text-blue-600">Guides</Link>
          <span>/</span>
          <Link href={`/guides/${providerId}`} className="hover:text-blue-600">{provider.name}</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{recordInfo.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${
                  recordInfo.color === 'blue' ? 'bg-blue-100' :
                  recordInfo.color === 'green' ? 'bg-green-100' : 'bg-purple-100'
                }`}>
                  <Shield className={`w-6 h-6 ${
                    recordInfo.color === 'blue' ? 'text-blue-600' :
                    recordInfo.color === 'green' ? 'text-green-600' : 'text-purple-600'
                  }`} />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {provider.name} {recordInfo.name} Setup
                </h1>
              </div>
              <p className="text-lg text-gray-600">
                {recordInfo.fullName} - Step-by-step configuration guide
              </p>
            </div>
            <a
              href={provider.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0"
            >
              Open {provider.name} <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Prerequisites */}
      {guide.prerequisites && guide.prerequisites.length > 0 && (
        <section className="pb-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                <div>
                  <h2 className="font-semibold text-yellow-800 mb-2">Prerequisites</h2>
                  <ul className="space-y-1 text-yellow-700">
                    {guide.prerequisites.map((req, i) => (
                      <li key={i}>• {req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Steps */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Configuration Steps</h2>
          
          <div className="space-y-6">
            {guide.steps.map((step) => (
              <div key={step.step} className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                    {step.tip && (
                      <div className="mt-4 flex items-start gap-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                        <Lightbulb className="w-5 h-5 flex-shrink-0" />
                        <span>{step.tip}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Value */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Example Configuration</h2>
          
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Example {recordInfo.name} Value</h3>
              <CopyButton text={guide.exampleValue} />
            </div>
            <code className="block p-4 bg-gray-100 rounded-lg text-sm text-gray-800 break-all font-mono">
              {guide.exampleValue}
            </code>
            <p className="mt-4 text-sm text-gray-500">
              ⚠️ This is an example value. Modify it according to your email service provider's requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Verify Command */}
      {guide.verifyCommand && (
        <section className="pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Verify Your Configuration</h2>
            
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-300 flex items-center gap-2">
                  <Terminal className="w-5 h-5" /> Terminal Command
                </span>
                <CopyButton text={guide.verifyCommand} variant="dark" />
              </div>
              <code className="block text-green-400 font-mono">
                $ {guide.verifyCommand}
              </code>
              <p className="mt-4 text-sm text-gray-400">
                Replace "yourdomain.com" with your actual domain name
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Common Mistakes */}
      {guide.commonMistakes && guide.commonMistakes.length > 0 && (
        <section className="pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Common Mistakes to Avoid</h2>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <ul className="space-y-3">
                {guide.commonMistakes.map((mistake, i) => (
                  <li key={i} className="flex items-start gap-3 text-red-700">
                    <span className="flex-shrink-0 text-red-500">✗</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Other Records */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Other {provider.name} Guides</h2>
          <div className="flex flex-wrap gap-2">
            {(['spf', 'dkim', 'dmarc'] as RecordType[]).filter(r => r !== recordType).map((r) => (
              <Link
                key={r}
                href={`/guides/${providerId}/${r}`}
                className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors"
              >
                {provider.name} {RECORD_INFO[r].name} Guide
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other Providers for same record */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{recordInfo.name} Guides for Other Providers</h2>
          <div className="flex flex-wrap gap-2">
            {allProviders.filter(p => p.id !== providerId).map((p) => (
              <Link
                key={p.id}
                href={`/guides/${p.id}/${recordType}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                {p.name} {recordInfo.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-blue-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Verify Your {recordInfo.name} Configuration
          </h2>
          <p className="text-gray-600 mb-6">
            After setting up your {recordInfo.name} record, use our free checker to verify it's correctly configured.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Check Your Domain Now
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
