'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, CheckCircle, AlertTriangle, XCircle, Shield, Server, Ban, Loader2, Mail, Zap, Wrench, ArrowRight, ExternalLink } from 'lucide-react';
import type { DomainCheckResult } from '@/types';
import { FixGuideCard } from '@/components/FixGuideCard';
import type { RecordType } from '@/lib/fix-guides';
import { getAllProviders } from '@/lib/fix-guides';

export default function Home() {
  const router = useRouter();
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DomainCheckResult | null>(null);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!domain.trim()) {
      setError('Please enter a domain');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    // Extract clean domain
    let cleanDomain = domain.trim().toLowerCase();
    cleanDomain = cleanDomain.replace(/^https?:\/\//i, '');
    cleanDomain = cleanDomain.split('/')[0];
    cleanDomain = cleanDomain.split(':')[0];
    if (cleanDomain.includes('@')) {
      cleanDomain = cleanDomain.split('@')[1];
    }

    // Redirect to report page (SEO-friendly URL)
    router.push(`/report/${encodeURIComponent(cleanDomain)}`);
  };

  // Legacy inline check (for preview on homepage)
  const handleQuickCheck = async () => {
    if (!domain.trim()) {
      setError('Please enter a domain');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: domain.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error || 'Check failed');
      }
    } catch (err) {
      setError('Network error, please try again');
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-500 bg-green-50';
      case 'B': return 'text-blue-500 bg-blue-50';
      case 'C': return 'text-yellow-500 bg-yellow-50';
      case 'D': return 'text-orange-500 bg-orange-50';
      case 'F': return 'text-red-500 bg-red-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'fail': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'pass': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'fail': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="py-6 px-4 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo */}
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl rotate-3"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
                <Zap className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1" />
              </div>
            </div>
            <span className="text-xl font-bold text-gray-800">EmailDiag</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-gray-600">
            <Link href="/" className="text-blue-600 font-medium">Home</Link>
            <Link href="/guides" className="hover:text-blue-600">Guides</Link>
            <Link href="/test" className="hover:text-blue-600">Email Test</Link>
            <Link href="/faq" className="hover:text-blue-600">FAQ</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Email Deliverability Checker
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Check your SPF, DKIM, DMARC configuration, scan blacklists, and get actionable fix suggestions
          </p>

          {/* Search Box */}
          <div className="flex gap-2 max-w-xl mx-auto">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter domain, e.g. example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <button
              onClick={handleCheck}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Checking
                </>
              ) : (
                'Check Now'
              )}
            </button>
          </div>

          {error && (
            <p className="mt-4 text-red-500">{error}</p>
          )}
        </div>
      </section>

      {/* Results */}
      {result && (
        <section className="pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Score Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{result.domain}</h2>
                  <p className="text-gray-500">Checked at: {new Date(result.checkedAt).toLocaleString()}</p>
                </div>
                <div className={`text-6xl font-bold rounded-full w-24 h-24 flex items-center justify-center ${getGradeColor(result.grade)}`}>
                  {result.grade}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Overall Score</span>
                  <span className="font-medium">{result.score}/100</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      result.score >= 75 ? 'bg-green-500' :
                      result.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${result.score}%` }}
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="flex gap-4 text-sm">
                <span className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-4 h-4" /> {result.summary.passed} Passed
                </span>
                <span className="flex items-center gap-1 text-yellow-600">
                  <AlertTriangle className="w-4 h-4" /> {result.summary.warnings} Warnings
                </span>
                <span className="flex items-center gap-1 text-red-600">
                  <XCircle className="w-4 h-4" /> {result.summary.issues} Issues
                </span>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="grid gap-4">
              {/* SPF */}
              <CheckCard
                icon={<Shield className="w-5 h-5" />}
                title="SPF Record"
                subtitle="Sender Policy Framework"
                result={result.checks.spf}
                domain={result.domain}
                recordType="spf"
                getStatusIcon={getStatusIcon}
                getStatusBg={getStatusBg}
              />

              {/* DKIM */}
              <CheckCard
                icon={<Shield className="w-5 h-5" />}
                title="DKIM Signature"
                subtitle="DomainKeys Identified Mail"
                result={result.checks.dkim}
                domain={result.domain}
                recordType="dkim"
                getStatusIcon={getStatusIcon}
                getStatusBg={getStatusBg}
                extra={result.checks.dkim.selectors.length > 0 && (
                  <p className="text-sm text-gray-500">
                    Detected selectors: {result.checks.dkim.selectors.join(', ')}
                  </p>
                )}
              />

              {/* DMARC */}
              <CheckCard
                icon={<Shield className="w-5 h-5" />}
                title="DMARC Policy"
                subtitle="Domain-based Message Authentication"
                result={result.checks.dmarc}
                domain={result.domain}
                recordType="dmarc"
                getStatusIcon={getStatusIcon}
                getStatusBg={getStatusBg}
              />

              {/* MX */}
              <CheckCard
                icon={<Server className="w-5 h-5" />}
                title="MX Records"
                subtitle="Mail Exchange Servers"
                result={result.checks.mx}
                domain={result.domain}
                getStatusIcon={getStatusIcon}
                getStatusBg={getStatusBg}
                extra={result.checks.mx.records.length > 0 && (
                  <div className="mt-2 text-sm">
                    {result.checks.mx.records.map((mx: any, i: number) => (
                      <p key={i} className="text-gray-600">
                        Priority {mx.priority}: {mx.host}
                      </p>
                    ))}
                  </div>
                )}
              />

              {/* Blacklist */}
              <CheckCard
                icon={<Ban className="w-5 h-5" />}
                title="Blacklist Check"
                subtitle={`Checked ${result.checks.blacklist.checked} blacklists`}
                result={result.checks.blacklist}
                domain={result.domain}
                getStatusIcon={getStatusIcon}
                getStatusBg={getStatusBg}
                extra={result.checks.blacklist.listed.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-red-600 font-medium">Listed on:</p>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {result.checks.blacklist.listed.map((bl: string, i: number) => (
                        <li key={i}>{bl}</li>
                      ))}
                    </ul>
                  </div>
                )}
              />
            </div>
          </div>
        </section>
      )}

      {/* Features (show when no result) */}
      {!result && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
              Complete Analysis, Precise Diagnosis
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Shield className="w-8 h-8 text-blue-500" />}
                title="Email Authentication"
                description="Check SPF, DKIM, DMARC configuration to ensure emails aren't forged"
              />
              <FeatureCard
                icon={<Ban className="w-8 h-8 text-red-500" />}
                title="Blacklist Scanning"
                description="Scan 50+ major blacklists to detect IP reputation issues"
              />
              <FeatureCard
                icon={<CheckCircle className="w-8 h-8 text-green-500" />}
                title="Fix Suggestions"
                description="Get specific configuration advice with step-by-step guidance"
              />
              <FeatureCard
                icon={<Wrench className="w-8 h-8 text-purple-500" />}
                title="DNS Provider Guides"
                description="Step-by-step fix guides for Cloudflare, GoDaddy, Aliyun, and more"
              />
            </div>
          </div>
        </section>
      )}

      {/* DNS Provider Guides Section */}
      {!result && (
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                DNS Provider Setup Guides
              </h2>
              <Link href="/guides" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium">
                View All Guides <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              {getAllProviders().map((provider) => (
                <Link
                  key={provider.id}
                  href={`/guides/${provider.id}`}
                  className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-md transition-all text-center group"
                >
                  <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 mb-1">
                    {provider.name}
                  </h3>
                  <p className="text-xs text-gray-500">SPF · DKIM · DMARC</p>
                </Link>
              ))}
            </div>
            
            {/* Quick Links */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-700 mb-4">Popular Guides</h3>
              <div className="flex flex-wrap gap-2">
                <Link href="/guides/cloudflare/spf" className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600">Cloudflare SPF</Link>
                <Link href="/guides/cloudflare/dkim" className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600">Cloudflare DKIM</Link>
                <Link href="/guides/cloudflare/dmarc" className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600">Cloudflare DMARC</Link>
                <Link href="/guides/godaddy/spf" className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600">GoDaddy SPF</Link>
                <Link href="/guides/aliyun/spf" className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600">阿里云 SPF</Link>
                <Link href="/guides/dnspod/spf" className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600">腾讯云 SPF</Link>
                <Link href="/guides/route53/spf" className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600">AWS Route 53 SPF</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-gray-50">
        <div className="max-w-5xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2026 EmailDiag. Free email deliverability checker.</p>
        </div>
      </footer>
    </main>
  );
}

// Check Result Card Component - 增加修复指南
function CheckCard({
  icon,
  title,
  subtitle,
  result,
  domain,
  recordType,
  getStatusIcon,
  getStatusBg,
  extra,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  result: any;
  domain: string;
  recordType?: RecordType;
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusBg: (status: string) => string;
  extra?: React.ReactNode;
}) {
  return (
    <div className={`bg-white rounded-xl border-2 p-6 ${getStatusBg(result.status)}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
          <div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{result.score}/{result.maxScore}</span>
          {getStatusIcon(result.status)}
        </div>
      </div>

      {result.record && (
        <div className="mb-4 p-3 bg-gray-100 rounded-lg overflow-x-auto">
          <code className="text-xs text-gray-700 break-all">{result.record}</code>
        </div>
      )}

      {extra}

      {result.issues.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-red-600 mb-2">Issues:</p>
          <ul className="text-sm text-gray-700 space-y-1">
            {result.issues.map((issue: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.suggestions.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-blue-600 mb-2">Suggestions:</p>
          <ul className="text-sm text-gray-700 space-y-1">
            {result.suggestions.map((suggestion: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 修复指南 - 仅对 SPF/DKIM/DMARC 且状态非 pass 显示 */}
      {recordType && result.status !== 'pass' && (
        <FixGuideCard
          domain={domain}
          recordType={recordType}
          status={result.status}
          currentRecord={result.record}
        />
      )}
    </div>
  );
}

// Feature Card
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center p-6">
      <div className="inline-flex p-4 bg-gray-100 rounded-2xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
