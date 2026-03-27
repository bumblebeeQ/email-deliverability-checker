'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, CheckCircle, AlertTriangle, XCircle, Shield, ArrowRight, Loader2, ArrowLeft, Copy, Check } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

// Schema for this tool page
const toolSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'DMARC Record Checker',
  applicationCategory: 'WebApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Free DMARC record checker tool. Validate your DMARC policy, check alignment settings, and get recommendations to protect your domain from email spoofing.',
  url: 'https://www.emaildiag.com/tools/dmarc-checker',
  provider: {
    '@type': 'Organization',
    name: 'EmailDiag',
    url: 'https://www.emaildiag.com',
  },
};

interface DMARCResult {
  record?: string;
  policy?: string;
  subdomainPolicy?: string;
  percentage?: number;
  rua?: string;
  ruf?: string;
  status: 'pass' | 'warning' | 'fail' | 'none';
  issues: string[];
  suggestions: string[];
}

export default function DMARCCheckerPage() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DMARCResult | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCheck = async () => {
    if (!domain.trim()) {
      setError('Please enter a domain');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    let cleanDomain = domain.trim().toLowerCase();
    cleanDomain = cleanDomain.replace(/^https?:\/\//i, '');
    cleanDomain = cleanDomain.split('/')[0];
    if (cleanDomain.includes('@')) {
      cleanDomain = cleanDomain.split('@')[1];
    }

    try {
      const response = await fetch(`/api/check?domain=${encodeURIComponent(cleanDomain)}`);
      const data = await response.json();
      
      if (data.success && data.result?.dmarc) {
        setResult(data.result.dmarc);
      } else {
        setError('Failed to check DMARC record. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyRecord = () => {
    if (result?.record) {
      navigator.clipboard.writeText(result.record);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case 'fail': return <XCircle className="w-6 h-6 text-red-500" />;
      default: return <XCircle className="w-6 h-6 text-gray-400" />;
    }
  };

  const getPolicyColor = (policy?: string) => {
    switch (policy) {
      case 'reject': return 'bg-green-100 text-green-700';
      case 'quarantine': return 'bg-yellow-100 text-yellow-700';
      case 'none': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <Navbar />

        {/* Breadcrumb */}
        <div className="py-4 px-4 bg-gray-50 border-b">
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">DMARC Checker</span>
          </div>
        </div>

        {/* Hero */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 p-2 bg-purple-100 rounded-full mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Free DMARC Record Checker
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Validate your DMARC policy and protect your domain from email spoofing and phishing attacks.
            </p>

            {/* Check Box */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex gap-2 max-w-xl mx-auto">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Enter domain, e.g. example.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                    className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={loading}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <button
                  onClick={handleCheck}
                  disabled={loading}
                  className="px-6 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Check DMARC'}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            </div>

            {/* Results */}
            {result && (
              <div className="bg-white rounded-2xl shadow-lg p-6 text-left">
                <div className="flex items-center gap-3 mb-6">
                  {getStatusIcon(result.status)}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      DMARC {result.status === 'pass' ? 'Valid' : result.status === 'warning' ? 'Warning' : result.status === 'none' ? 'Not Found' : 'Invalid'}
                    </h2>
                    {result.policy && (
                      <p className="text-sm text-gray-500">Policy: {result.policy}</p>
                    )}
                  </div>
                </div>

                {result.record && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2">DMARC Record</label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 p-3 bg-gray-100 rounded-lg text-sm font-mono break-all">
                        {result.record}
                      </code>
                      <button
                        onClick={copyRecord}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Copy"
                      >
                        {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-400" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Policy Details */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {result.policy && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Policy (p=)</label>
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getPolicyColor(result.policy)}`}>
                        {result.policy}
                      </span>
                    </div>
                  )}
                  {result.subdomainPolicy && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Subdomain Policy (sp=)</label>
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getPolicyColor(result.subdomainPolicy)}`}>
                        {result.subdomainPolicy}
                      </span>
                    </div>
                  )}
                  {result.percentage !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Percentage (pct=)</label>
                      <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                        {result.percentage}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Reporting */}
                {(result.rua || result.ruf) && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Reporting Addresses</label>
                    <div className="space-y-2">
                      {result.rua && (
                        <div className="text-sm">
                          <span className="text-gray-500">Aggregate (rua):</span>{' '}
                          <span className="font-mono text-gray-700">{result.rua}</span>
                        </div>
                      )}
                      {result.ruf && (
                        <div className="text-sm">
                          <span className="text-gray-500">Forensic (ruf):</span>{' '}
                          <span className="font-mono text-gray-700">{result.ruf}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {result.issues.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Issues Found</label>
                    <ul className="space-y-2">
                      {result.issues.map((issue, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-red-700 bg-red-50 p-3 rounded-lg">
                          <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.suggestions.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Recommendations</label>
                    <ul className="space-y-2">
                      {result.suggestions.map((sug, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-blue-700 bg-blue-50 p-3 rounded-lg">
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {sug}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-8 pt-6 border-t">
                  <p className="text-gray-600 mb-4">Want a complete email deliverability audit?</p>
                  <Link
                    href={`/report/${domain}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Full Domain Report <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* What is DMARC */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">What is DMARC?</h2>
            <div className="prose prose-gray max-w-none">
              <p>
                <strong>DMARC (Domain-based Message Authentication, Reporting & Conformance)</strong> is an email 
                authentication protocol that builds on SPF and DKIM. It tells receiving mail servers what to do 
                when an email fails authentication checks and provides reporting on email authentication activity.
              </p>
              <p>
                DMARC protects your domain from being used in email spoofing and phishing attacks, helping maintain 
                your brand reputation and improving email deliverability.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">DMARC Record Example</h3>
              <code className="block p-4 bg-gray-100 rounded-lg text-sm mb-4 break-all">
                v=DMARC1; p=reject; rua=mailto:dmarc@example.com; ruf=mailto:forensics@example.com; pct=100
              </code>
              
              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">DMARC Policies</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>p=none</strong> — Monitor only, don't take action (start here)</li>
                <li><strong>p=quarantine</strong> — Send failing emails to spam</li>
                <li><strong>p=reject</strong> — Reject failing emails completely (strongest protection)</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Key DMARC Tags</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>v=DMARC1</strong> — Version (required)</li>
                <li><strong>p=</strong> — Policy for domain (required)</li>
                <li><strong>sp=</strong> — Policy for subdomains (optional)</li>
                <li><strong>rua=</strong> — Address for aggregate reports</li>
                <li><strong>ruf=</strong> — Address for forensic reports</li>
                <li><strong>pct=</strong> — Percentage of emails to apply policy to</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">DMARC Implementation Path</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Start with <code>p=none</code> to collect reports</li>
                <li>Monitor for 2-4 weeks to identify all legitimate senders</li>
                <li>Move to <code>p=quarantine</code> with <code>pct=10</code></li>
                <li>Gradually increase percentage</li>
                <li>Finally move to <code>p=reject</code></li>
              </ol>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/spf-checker" className="p-4 bg-white rounded-xl border hover:border-purple-400 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-800 mb-1">SPF Checker</h3>
                <p className="text-sm text-gray-500">Validate SPF records</p>
              </Link>
              <Link href="/tools/dkim-checker" className="p-4 bg-white rounded-xl border hover:border-purple-400 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-800 mb-1">DKIM Checker</h3>
                <p className="text-sm text-gray-500">Validate DKIM signatures</p>
              </Link>
              <Link href="/tools/blacklist-check" className="p-4 bg-white rounded-xl border hover:border-purple-400 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-800 mb-1">Blacklist Check</h3>
                <p className="text-sm text-gray-500">Scan 50+ blacklists</p>
              </Link>
            </div>
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
    </>
  );
}
