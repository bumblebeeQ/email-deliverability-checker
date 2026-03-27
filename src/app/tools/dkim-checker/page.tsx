'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, CheckCircle, AlertTriangle, XCircle, Key, ArrowRight, Loader2, ArrowLeft, Copy, Check } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

// Schema for this tool page
const toolSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'DKIM Record Checker',
  applicationCategory: 'WebApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Free DKIM record checker tool. Lookup and validate DKIM signatures, check key length, and verify email authentication configuration.',
  url: 'https://www.emaildiag.com/tools/dkim-checker',
  provider: {
    '@type': 'Organization',
    name: 'EmailDiag',
    url: 'https://www.emaildiag.com',
  },
};

interface DKIMResult {
  selectors?: string[];
  keyLength?: number;
  status: 'pass' | 'warning' | 'fail' | 'none';
  issues: string[];
  suggestions: string[];
}

export default function DKIMCheckerPage() {
  const [domain, setDomain] = useState('');
  const [selector, setSelector] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DKIMResult | null>(null);
  const [error, setError] = useState('');

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
      
      if (data.success && data.result?.dkim) {
        setResult(data.result.dkim);
      } else {
        setError('Failed to check DKIM record. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <Navbar />

        {/* Breadcrumb */}
        <div className="py-4 px-4 bg-gray-50 border-b">
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">DKIM Checker</span>
          </div>
        </div>

        {/* Hero */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 p-2 bg-green-100 rounded-full mb-4">
              <Key className="w-6 h-6 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Free DKIM Record Checker
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Lookup and validate your DKIM configuration. Check key length and verify email signatures.
            </p>

            {/* Check Box */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-2 max-w-xl mx-auto">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Enter domain, e.g. example.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                    className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    disabled={loading}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <button
                  onClick={handleCheck}
                  disabled={loading}
                  className="px-6 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Check DKIM'}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                We automatically check common DKIM selectors (google, default, selector1, selector2, etc.)
              </p>
              {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            </div>

            {/* Results */}
            {result && (
              <div className="bg-white rounded-2xl shadow-lg p-6 text-left">
                <div className="flex items-center gap-3 mb-6">
                  {getStatusIcon(result.status)}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      DKIM {result.status === 'pass' ? 'Valid' : result.status === 'warning' ? 'Warning' : result.status === 'none' ? 'Not Found' : 'Invalid'}
                    </h2>
                    {result.keyLength && (
                      <p className="text-sm text-gray-500">Key Length: {result.keyLength} bits</p>
                    )}
                  </div>
                </div>

                {result.selectors && result.selectors.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Found Selectors</label>
                    <div className="flex flex-wrap gap-2">
                      {result.selectors.map((sel, i) => (
                        <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-mono">
                          {sel}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {result.keyLength && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Key Strength</label>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                      result.keyLength >= 2048 ? 'bg-green-100 text-green-700' : 
                      result.keyLength >= 1024 ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {result.keyLength} bits
                      {result.keyLength >= 2048 && <span className="text-xs">(recommended)</span>}
                      {result.keyLength < 2048 && result.keyLength >= 1024 && <span className="text-xs">(upgrade recommended)</span>}
                      {result.keyLength < 1024 && <span className="text-xs">(too weak)</span>}
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
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Full Domain Report <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* What is DKIM */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">What is DKIM?</h2>
            <div className="prose prose-gray max-w-none">
              <p>
                <strong>DKIM (DomainKeys Identified Mail)</strong> is an email authentication method that adds a digital 
                signature to outgoing emails. This cryptographic signature verifies that the email was sent from an 
                authorized server and hasn't been modified in transit.
              </p>
              <p>
                When you send an email, your mail server signs it using a private key. The receiving server then 
                looks up your public key (stored in DNS) to verify the signature.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">DKIM Record Example</h3>
              <code className="block p-4 bg-gray-100 rounded-lg text-sm mb-4 break-all">
                selector._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBA..."
              </code>
              
              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Key Components</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Selector</strong> — Identifies which key to use (e.g., "google", "default")</li>
                <li><strong>v=DKIM1</strong> — Version identifier</li>
                <li><strong>k=rsa</strong> — Key type (RSA is most common)</li>
                <li><strong>p=</strong> — The public key (base64 encoded)</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Recommended Key Length</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>2048 bits</strong> — Recommended, provides strong security</li>
                <li><strong>1024 bits</strong> — Minimum acceptable, consider upgrading</li>
                <li><strong>512 bits</strong> — Obsolete, should be upgraded immediately</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/spf-checker" className="p-4 bg-white rounded-xl border hover:border-green-400 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-800 mb-1">SPF Checker</h3>
                <p className="text-sm text-gray-500">Validate SPF records</p>
              </Link>
              <Link href="/tools/dmarc-checker" className="p-4 bg-white rounded-xl border hover:border-green-400 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-800 mb-1">DMARC Checker</h3>
                <p className="text-sm text-gray-500">Check DMARC policy</p>
              </Link>
              <Link href="/tools/blacklist-check" className="p-4 bg-white rounded-xl border hover:border-green-400 hover:shadow-md transition-all">
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
