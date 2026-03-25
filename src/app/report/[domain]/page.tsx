import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Shield, Server, Ban, CheckCircle, AlertTriangle, XCircle, 
  Mail, Zap, Share2, RefreshCw, ArrowLeft, ExternalLink,
  Copy, Twitter, Linkedin
} from 'lucide-react';
import { checkDomain } from '@/lib/dns-checker';
import { isValidDomain, extractDomain } from '@/lib/utils';
import type { DomainCheckResult } from '@/types';
import { FixGuideCard } from '@/components/FixGuideCard';
import type { RecordType } from '@/lib/fix-guides';
import { ShareButtons } from './ShareButtons';
import { RefreshButton } from './RefreshButton';

interface PageProps {
  params: { domain: string };
}

// 生成动态metadata（SEO关键）
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const domain = decodeURIComponent(params.domain);
  
  if (!isValidDomain(extractDomain(domain))) {
    return { title: 'Invalid Domain - EmailDiag' };
  }

  const result = await checkDomain(extractDomain(domain));
  
  const title = `${domain} Email Deliverability Report - Score: ${result.score}/100 (${result.grade})`;
  const description = `Email authentication check for ${domain}: SPF ${result.checks.spf.status}, DKIM ${result.checks.dkim.status}, DMARC ${result.checks.dmarc.status}. ${result.summary.passed} passed, ${result.summary.warnings} warnings, ${result.summary.issues} issues.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://EmailDiag.xyz/report/${domain}`,
      siteName: 'EmailDiag',
      images: [{
        url: `https://EmailDiag.xyz/api/og?domain=${domain}&score=${result.score}&grade=${result.grade}`,
        width: 1200,
        height: 630,
        alt: `${domain} Email Score: ${result.grade}`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://EmailDiag.xyz/api/og?domain=${domain}&score=${result.score}&grade=${result.grade}`],
    },
    alternates: {
      canonical: `https://EmailDiag.xyz/report/${domain}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// JSON-LD结构化数据
function generateJsonLd(result: DomainCheckResult) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${result.domain} Email Deliverability Report`,
    description: `Email authentication analysis for ${result.domain} with score ${result.score}/100`,
    datePublished: result.checkedAt,
    author: {
      '@type': 'Organization',
      name: 'EmailDiag',
      url: 'https://EmailDiag.xyz',
    },
    publisher: {
      '@type': 'Organization',
      name: 'EmailDiag',
      url: 'https://EmailDiag.xyz',
    },
    mainEntity: {
      '@type': 'WebApplication',
      name: 'EmailDiag Email Deliverability Checker',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
    },
  };
}

export default async function ReportPage({ params }: PageProps) {
  const rawDomain = decodeURIComponent(params.domain);
  const domain = extractDomain(rawDomain);

  if (!isValidDomain(domain)) {
    notFound();
  }

  const result = await checkDomain(domain);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-500 bg-green-50 border-green-200';
      case 'B': return 'text-blue-500 bg-blue-50 border-blue-200';
      case 'C': return 'text-yellow-500 bg-yellow-50 border-yellow-200';
      case 'D': return 'text-orange-500 bg-orange-50 border-orange-200';
      case 'F': return 'text-red-500 bg-red-50 border-red-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
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

  const reportUrl = `https://EmailDiag.xyz/report/${domain}`;

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd(result)) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Header */}
        <header className="py-6 px-4 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
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
            </div>
            <nav className="hidden md:flex gap-6 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <Link href="/guides" className="hover:text-blue-600">Guides</Link>
            </nav>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="py-4 px-4 bg-gray-50 border-b">
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <span>/</span>
            <span className="text-gray-800">Report</span>
            <span>/</span>
            <span className="text-gray-800 font-medium">{domain}</span>
          </div>
        </div>

        {/* Report Content */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Score Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 break-all">
                      {result.domain}
                    </h1>
                    <a 
                      href={`https://${result.domain}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-500"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                  <p className="text-gray-500">
                    Email Deliverability Report • Checked: {new Date(result.checkedAt).toLocaleString()}
                  </p>
                </div>
                <div className={`text-6xl font-bold rounded-2xl w-28 h-28 flex items-center justify-center border-4 ${getGradeColor(result.grade)}`}>
                  {result.grade}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 font-medium">Overall Score</span>
                  <span className="font-bold text-lg">{result.score}/100</span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
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
              <div className="flex flex-wrap gap-4 text-sm mb-6">
                <span className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg">
                  <CheckCircle className="w-5 h-5" /> {result.summary.passed} Passed
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg">
                  <AlertTriangle className="w-5 h-5" /> {result.summary.warnings} Warnings
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg">
                  <XCircle className="w-5 h-5" /> {result.summary.issues} Issues
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t">
                <RefreshButton domain={domain} />
                <ShareButtons url={reportUrl} domain={domain} score={result.score} grade={result.grade} />
              </div>
            </div>

            {/* Detailed Results */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">Detailed Analysis</h2>
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

            {/* CTA */}
            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Need Help Fixing Issues?</h3>
              <p className="text-blue-700 text-sm mb-4">
                Check our step-by-step guides for your DNS provider to fix SPF, DKIM, and DMARC configuration.
              </p>
              <Link 
                href="/guides" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Setup Guides <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t bg-gray-50 mt-8">
          <div className="max-w-5xl mx-auto text-center text-gray-500 text-sm">
            <p>© 2026 EmailDiag. Free email deliverability checker.</p>
            <p className="mt-2">
              <Link href="/" className="hover:text-blue-600">Check Another Domain</Link>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

// Check Result Card Component
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

      {/* Fix Guide */}
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
