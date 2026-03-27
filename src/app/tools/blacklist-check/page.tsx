'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, CheckCircle, AlertTriangle, XCircle, Ban, ArrowRight, Loader2, ArrowLeft, ExternalLink } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

// Schema for this tool page
const toolSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Email Blacklist Checker',
  applicationCategory: 'WebApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Free email blacklist checker tool. Scan your domain and IP against 50+ major blacklists including Spamhaus, SpamCop, Barracuda, and more.',
  url: 'https://www.emaildiag.com/tools/blacklist-check',
  provider: {
    '@type': 'Organization',
    name: 'EmailDiag',
    url: 'https://www.emaildiag.com',
  },
};

interface BlacklistResult {
  totalChecked: number;
  listedOn: string[];
  cleanOn: string[];
  status: 'pass' | 'warning' | 'fail';
  issues: string[];
  suggestions: string[];
}

export default function BlacklistCheckPage() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BlacklistResult | null>(null);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!domain.trim()) {
      setError('Please enter a domain or IP address');
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
      
      if (data.success && data.data?.checks?.blacklist) {
        const bl = data.data.checks.blacklist;
        setResult({
          totalChecked: bl.checked || 0,
          listedOn: bl.listed || [],
          cleanOn: [], // API doesn't return clean list, only count
          status: bl.status,
          issues: bl.issues || [],
          suggestions: bl.suggestions || [],
        });
      } else {
        setError('Failed to check blacklists. Please try again.');
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
      default: return <Ban className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-red-50 to-white">
        <Navbar />

        {/* Breadcrumb */}
        <div className="py-4 px-4 bg-gray-50 border-b">
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Blacklist Check</span>
          </div>
        </div>

        {/* Hero */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 p-2 bg-red-100 rounded-full mb-4">
              <Ban className="w-6 h-6 text-red-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Free Email Blacklist Checker
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Scan your domain or IP against 50+ major email blacklists including Spamhaus, SpamCop, and Barracuda.
            </p>

            {/* Check Box */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex gap-2 max-w-xl mx-auto">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Enter domain or IP, e.g. example.com or 1.2.3.4"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                    className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    disabled={loading}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <button
                  onClick={handleCheck}
                  disabled={loading}
                  className="px-6 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Check Blacklists'}
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
                      {result.status === 'pass' ? 'Not Listed on Any Blacklist' : 
                       result.status === 'warning' ? 'Listed on Some Blacklists' : 
                       'Listed on Multiple Blacklists'}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Checked {result.totalChecked} blacklists
                    </p>
                  </div>
                </div>

                {/* Summary */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className={`p-4 rounded-lg ${result.listedOn.length === 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {result.listedOn.length === 0 ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span className="font-medium text-gray-800">
                        {result.listedOn.length === 0 ? 'Clean' : `Listed on ${result.listedOn.length}`}
                      </span>
                    </div>
                    {result.listedOn.length > 0 && (
                      <ul className="text-sm space-y-1">
                        {result.listedOn.map((bl, i) => (
                          <li key={i} className="text-red-700 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                            {bl}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-gray-800">
                        Clean on {result.cleanOn.length} blacklists
                      </span>
                    </div>
                    <p className="text-sm text-green-700">
                      Including Spamhaus, SpamCop, Barracuda, and more
                    </p>
                  </div>
                </div>

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
                    <label className="block text-sm font-medium text-gray-600 mb-2">How to Get Delisted</label>
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
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Full Domain Report <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* What are Blacklists */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">What are Email Blacklists?</h2>
            <div className="prose prose-gray max-w-none">
              <p>
                <strong>Email blacklists</strong> (also called DNSBLs or RBLs) are real-time databases of IP addresses 
                and domains known to send spam or malicious emails. Email servers check these lists to decide whether 
                to accept, reject, or flag incoming emails.
              </p>
              <p>
                Being listed on a blacklist can severely impact your email deliverability, causing your emails to 
                land in spam folders or be rejected entirely.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Major Blacklists We Check</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Spam-Focused</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Spamhaus (SBL, XBL, PBL)</li>
                    <li>SpamCop</li>
                    <li>Barracuda Reputation</li>
                    <li>SORBS</li>
                    <li>UCE Protect</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Security-Focused</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Spamhaus CSS (Security)</li>
                    <li>SURBL</li>
                    <li>URIBL</li>
                    <li>Invaluement</li>
                    <li>JustSpam</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Common Reasons for Being Blacklisted</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Sending to purchased or harvested email lists</li>
                <li>High bounce rates (sending to invalid addresses)</li>
                <li>Too many spam complaints</li>
                <li>Compromised server sending spam</li>
                <li>Sending from a shared IP with bad senders</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">How to Get Delisted</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Identify the cause</strong> — Check server logs for unusual activity</li>
                <li><strong>Fix the issue</strong> — Clean your list, secure your server</li>
                <li><strong>Request removal</strong> — Visit each blacklist's website</li>
                <li><strong>Monitor</strong> — Check again in 24-48 hours</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/tools/spf-checker" className="p-4 bg-white rounded-xl border hover:border-red-400 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-800 mb-1">SPF Checker</h3>
                <p className="text-sm text-gray-500">Validate SPF records</p>
              </Link>
              <Link href="/tools/dkim-checker" className="p-4 bg-white rounded-xl border hover:border-red-400 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-800 mb-1">DKIM Checker</h3>
                <p className="text-sm text-gray-500">Validate DKIM signatures</p>
              </Link>
              <Link href="/tools/dmarc-checker" className="p-4 bg-white rounded-xl border hover:border-red-400 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-800 mb-1">DMARC Checker</h3>
                <p className="text-sm text-gray-500">Check DMARC policy</p>
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
