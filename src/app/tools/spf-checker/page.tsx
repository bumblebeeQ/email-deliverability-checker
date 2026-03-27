'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, CheckCircle, AlertTriangle, XCircle, Shield, ArrowRight, Loader2, ArrowLeft, Copy, Check } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

// Schema for this tool page
const toolSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SPF Record Checker',
  applicationCategory: 'WebApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Free SPF record checker tool. Validate your SPF configuration, check DNS lookups, and get actionable recommendations to improve email deliverability.',
  url: 'https://www.emaildiag.com/tools/spf-checker',
  provider: {
    '@type': 'Organization',
    name: 'EmailDiag',
    url: 'https://www.emaildiag.com',
  },
};

interface SPFResult {
  record?: string;
  status: 'pass' | 'warning' | 'fail' | 'none';
  mechanism?: string;
  includes?: string[];
  lookupCount?: number;
  issues: string[];
  suggestions: string[];
}

export default function SPFCheckerPage() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SPFResult | null>(null);
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
      
      if (data.success && data.data?.checks?.spf) {
        setResult(data.data.checks.spf);
      } else {
        setError('Failed to check SPF record. Please try again.');
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'bg-green-50 border-green-200 text-green-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'fail': return 'bg-red-50 border-red-200 text-red-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navbar />

        {/* Breadcrumb */}
        <div className="py-4 px-4 bg-gray-50 border-b">
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">SPF Checker</span>
          </div>
        </div>

        {/* Hero */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 p-2 bg-blue-100 rounded-full mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Free SPF Record Checker
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Validate your SPF configuration instantly. Check for issues, DNS lookup limits, and get recommendations.
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
                    className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={loading}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <button
                  onClick={handleCheck}
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Check SPF'}
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
                      SPF {result.status === 'pass' ? 'Valid' : result.status === 'warning' ? 'Warning' : result.status === 'none' ? 'Not Found' : 'Invalid'}
                    </h2>
                    {result.mechanism && (
                      <p className="text-sm text-gray-500">Mechanism: {result.mechanism}</p>
                    )}
                  </div>
                </div>

                {result.record && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2">SPF Record</label>
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

                {result.lookupCount !== undefined && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2">DNS Lookups</label>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${result.lookupCount <= 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {result.lookupCount}/10
                      {result.lookupCount > 10 && <span className="text-xs">(exceeds limit)</span>}
                    </div>
                  </div>
                )}

                {result.includes && result.includes.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Include Sources</label>
                    <div className="flex flex-wrap gap-2">
                      {result.includes.map((inc, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                          {inc}
                        </span>
                      ))}
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
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Full Domain Report <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* What is SPF */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">What is SPF?</h2>
            <div className="prose prose-gray max-w-none">
              <p>
                <strong>SPF (Sender Policy Framework)</strong> is an email authentication protocol that allows domain owners 
                to specify which mail servers are authorized to send emails on behalf of their domain.
              </p>
              <p>
                When a receiving mail server gets an email, it checks the sender's domain SPF record in DNS. If the sending 
                server's IP matches an authorized IP in the SPF record, the email passes SPF authentication.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">SPF Record Example</h3>
              <code className="block p-4 bg-gray-100 rounded-lg text-sm mb-4">
                v=spf1 include:_spf.google.com include:sendgrid.net ip4:192.168.1.1 -all
              </code>
              
              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">SPF Mechanisms</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><code>-all</code> (Hard Fail) — Reject emails from unauthorized servers</li>
                <li><code>~all</code> (Soft Fail) — Accept but mark as suspicious</li>
                <li><code>?all</code> (Neutral) — No policy, not recommended</li>
                <li><code>+all</code> (Pass All) — Allow anyone, very insecure</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Common SPF Issues</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Exceeding the 10 DNS lookup limit</li>
                <li>Multiple SPF records (should only have one)</li>
                <li>Using soft fail (~all) instead of hard fail (-all)</li>
                <li>Missing authorized sending sources</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/dkim-checker" className="p-4 bg-white rounded-xl border hover:border-blue-400 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-800 mb-1">DKIM Checker</h3>
                <p className="text-sm text-gray-500">Validate DKIM signatures</p>
              </Link>
              <Link href="/tools/dmarc-checker" className="p-4 bg-white rounded-xl border hover:border-blue-400 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-800 mb-1">DMARC Checker</h3>
                <p className="text-sm text-gray-500">Check DMARC policy</p>
              </Link>
              <Link href="/tools/blacklist-check" className="p-4 bg-white rounded-xl border hover:border-blue-400 hover:shadow-md transition-all">
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
