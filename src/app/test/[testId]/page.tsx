'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Mail, Zap, CheckCircle, XCircle, AlertTriangle, Clock, 
  RefreshCw, ArrowLeft, Shield, Server, FileText, Copy, Check,
  Info, Lightbulb, AlertCircle, ExternalLink
} from 'lucide-react';

interface TestResult {
  id: string;
  status: 'pending' | 'received' | 'expired';
  email: string;
  createdAt: string;
  expiresAt: string;
  receivedAt?: string;
  analysis?: {
    spf: { status: 'pass' | 'fail' | 'none'; details: string };
    dkim: { status: 'pass' | 'fail' | 'none'; details: string; selector?: string };
    dmarc: { status: 'pass' | 'fail' | 'none'; details: string };
    sendingIp?: string;
    reverseDns?: string;
    from?: string;
    subject?: string;
    spamScore?: number;
    spamDetails?: string[];
  };
  headers?: string;
}

interface PageProps {
  params: { testId: string };
}

// Authentication protocol explanations - user-friendly
const authExplanations = {
  spf: {
    name: 'SPF (Sender Policy Framework)',
    whatIs: 'Verifies that the server sending your email is authorized to send on behalf of your domain.',
    pass: {
      impact: '✅ The receiving server confirmed this email came from an authorized server. High trust score.',
      action: 'Keep your current configuration. Periodically review to ensure your SPF record stays up to date.'
    },
    fail: {
      impact: '⚠️ Your email may be marked as spam or rejected because the sending server is not authorized.',
      action: 'Add an SPF record to your DNS to authorize your mail servers. For example, if using Gmail: v=spf1 include:_spf.google.com ~all'
    },
    none: {
      impact: '⚠️ Without an SPF record, anyone can potentially spoof emails from your domain. This reduces email trustworthiness.',
      action: 'Add an SPF record to your DNS immediately. This is the most basic email security configuration.'
    }
  },
  dkim: {
    name: 'DKIM (DomainKeys Identified Mail)',
    whatIs: 'Adds a digital signature to your emails, proving the content hasn\'t been tampered with and truly comes from the claimed sender.',
    pass: {
      impact: '✅ Your email passed authenticity verification. Content integrity confirmed, unlikely to land in spam.',
      action: 'Keep your current configuration. Your emails have good credibility.'
    },
    fail: {
      impact: '🚨 Email signature verification failed. May be treated as forged and rejected.',
      action: 'Check if your DKIM signing is configured correctly. Ensure your mail server is properly signing emails.'
    },
    none: {
      impact: '⚠️ Without a digital signature, recipients cannot verify email authenticity. This may affect deliverability.',
      action: 'Enable DKIM signing with your email provider and add the corresponding public key record to your DNS.'
    }
  },
  dmarc: {
    name: 'DMARC (Domain-based Message Authentication)',
    whatIs: 'Tells receiving servers how to handle emails when SPF or DKIM verification fails, and provides reporting.',
    pass: {
      impact: '✅ Your email meets DMARC policy requirements. Highest level of trust achieved.',
      action: 'Keep your current configuration. Consider reviewing DMARC reports regularly to monitor email activity.'
    },
    fail: {
      impact: '🚨 Your email doesn\'t comply with the domain\'s DMARC policy. May be quarantined or rejected.',
      action: 'Check that your SPF and DKIM configurations align with your DMARC policy.'
    },
    none: {
      impact: '⚠️ Without a DMARC policy, your domain is vulnerable to being impersonated in phishing attacks.',
      action: 'Add a DMARC record. Start with monitoring mode: v=DMARC1; p=none; rua=mailto:your@email.com'
    }
  }
};

// Get overall recommendation
const getOverallRecommendation = (analysis: TestResult['analysis']) => {
  if (!analysis) return null;
  
  const statuses = [analysis.spf.status, analysis.dkim.status, analysis.dmarc.status];
  const passCount = statuses.filter(s => s === 'pass').length;
  const failCount = statuses.filter(s => s === 'fail').length;
  const noneCount = statuses.filter(s => s === 'none').length;

  if (passCount === 3) {
    return {
      level: 'excellent',
      title: '🎉 Perfect Email Configuration!',
      message: 'Your domain\'s email authentication is fully configured. Your deliverability should be excellent. Keep it up!',
      color: 'bg-green-50 border-green-200 text-green-800'
    };
  } else if (passCount >= 2 && failCount === 0) {
    return {
      level: 'good',
      title: '👍 Good Setup, Room for Improvement',
      message: 'Most authentication checks passed, but there\'s room for improvement. Complete all authentication to maximize deliverability.',
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    };
  } else if (failCount > 0) {
    return {
      level: 'warning',
      title: '⚠️ Immediate Action Required',
      message: 'Some authentication checks failed. This will seriously impact email deliverability. Please fix the issues below as soon as possible.',
      color: 'bg-red-50 border-red-200 text-red-800'
    };
  } else {
    return {
      level: 'needs-setup',
      title: '📧 Email Authentication Needed',
      message: 'Your domain lacks basic email authentication. This may cause emails to land in spam or allow spoofing. Set up authentication as soon as possible.',
      color: 'bg-amber-50 border-amber-200 text-amber-800'
    };
  }
};

export default function TestResultPage({ params }: PageProps) {
  const { testId } = params;
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [polling, setPolling] = useState(false);
  const [showHeaders, setShowHeaders] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchResult = async () => {
    try {
      const response = await fetch(`/api/test/${testId}`);
      const data = await response.json();

      if (data.success) {
        setResult(data.result);
        if (data.result.status !== 'pending') {
          setPolling(false);
        }
      } else {
        setError(data.error || 'Failed to fetch result');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResult();
  }, [testId]);

  useEffect(() => {
    if (!result || result.status !== 'pending') return;

    setPolling(true);
    const interval = setInterval(() => {
      fetchResult();
    }, 5000);

    return () => clearInterval(interval);
  }, [result?.status]);

  const handleCopyHeaders = async () => {
    if (!result?.headers) return;
    try {
      await navigator.clipboard.writeText(result.headers);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-600 bg-green-50 border-green-200';
      case 'fail': return 'text-red-600 bg-red-50 border-red-200';
      case 'none': return 'text-amber-600 bg-amber-50 border-amber-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'fail': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pass': return 'Pass';
      case 'fail': return 'Fail';
      case 'none': return 'Not Configured';
      default: return 'Unknown';
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading test result...</p>
        </div>
      </main>
    );
  }

  if (error || !result) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Test Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'This test may have expired or does not exist.'}</p>
          <Link 
            href="/test"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Start New Test
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="py-4 px-4 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg rotate-3"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
                <Zap className="w-2.5 h-2.5 text-yellow-300 absolute -top-0.5 -right-0.5" />
              </div>
            </div>
            <span className="text-lg font-bold text-gray-800">EmailDiag</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/guides" className="hover:text-blue-600 transition-colors">Guides</Link>
            <Link href="/test" className="text-blue-600 font-medium">Email Test</Link>
            <Link href="/faq" className="hover:text-blue-600 transition-colors">FAQ</Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link 
            href="/test"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Email Test
          </Link>

          {result.status === 'pending' ? (
            /* Waiting for email */
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Waiting for Your Email
              </h1>
              <p className="text-gray-500 mb-6">Send a test email to see your authentication results</p>
              
              <div className="text-left bg-slate-50 rounded-xl p-6 mb-6">
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">1. Send an email to:</p>
                  <div className="p-3 bg-white rounded-lg border border-gray-200 font-mono text-gray-800 break-all">
                    t@emaildiag.com
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">2. Use this exact subject line:</p>
                  <div className="p-3 bg-amber-50 border-2 border-amber-300 rounded-lg font-mono text-gray-800">
                    TEST-{result.id}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-blue-600 mb-6">
                {polling && <RefreshCw className="w-4 h-4 animate-spin" />}
                <span className="text-sm">Checking for incoming email...</span>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-500">
                Test expires: {new Date(result.expiresAt).toLocaleString()}
              </div>
            </div>
          ) : result.status === 'expired' ? (
            /* Expired */
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
              <XCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Test Expired</h1>
              <p className="text-gray-600 mb-6">No email was received within the time limit.</p>
              <Link 
                href="/test"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start New Test <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          ) : (
            /* Email received - show analysis */
            <>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-6">
                {/* Success Header */}
                <div className="flex items-center gap-4 pb-6 border-b border-gray-100 mb-6">
                  <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-green-500" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">Email Received!</h1>
                    <p className="text-gray-500 text-sm">
                      Received at {result.receivedAt ? new Date(result.receivedAt).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>

                {result.analysis && (
                  <>
                    {/* Overall Recommendation */}
                    {(() => {
                      const recommendation = getOverallRecommendation(result.analysis);
                      return recommendation && (
                        <div className={`p-5 rounded-xl border-2 mb-6 ${recommendation.color}`}>
                          <h3 className="font-bold text-lg mb-1">{recommendation.title}</h3>
                          <p className="text-sm opacity-90">{recommendation.message}</p>
                        </div>
                      );
                    })()}

                    {/* Email Info */}
                    <div className="p-5 bg-slate-50 rounded-xl mb-6">
                      <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <Mail className="w-4 h-4" /> Email Details
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex flex-col">
                          <span className="text-gray-400 text-xs uppercase tracking-wide mb-1">From</span>
                          <span className="text-gray-800 font-medium">{result.analysis.from || 'N/A'}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-400 text-xs uppercase tracking-wide mb-1">Subject</span>
                          <span className="text-gray-800 font-medium">{result.analysis.subject || 'N/A'}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-400 text-xs uppercase tracking-wide mb-1">Sending IP</span>
                          <span className="text-gray-800 font-mono text-sm">{result.analysis.sendingIp || 'N/A'}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-400 text-xs uppercase tracking-wide mb-1">Reverse DNS</span>
                          <span className="text-gray-800 font-mono text-sm">{result.analysis.reverseDns || 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Authentication Results */}
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-500" /> Authentication Results
                    </h2>
                    <div className="space-y-4 mb-6">
                      {/* SPF */}
                      <AuthCard 
                        auth={authExplanations.spf}
                        result={result.analysis.spf}
                        getStatusColor={getStatusColor}
                        getStatusIcon={getStatusIcon}
                        getStatusLabel={getStatusLabel}
                      />

                      {/* DKIM */}
                      <AuthCard 
                        auth={authExplanations.dkim}
                        result={result.analysis.dkim}
                        selector={result.analysis.dkim.selector}
                        getStatusColor={getStatusColor}
                        getStatusIcon={getStatusIcon}
                        getStatusLabel={getStatusLabel}
                      />

                      {/* DMARC */}
                      <AuthCard 
                        auth={authExplanations.dmarc}
                        result={result.analysis.dmarc}
                        getStatusColor={getStatusColor}
                        getStatusIcon={getStatusIcon}
                        getStatusLabel={getStatusLabel}
                      />
                    </div>

                    {/* Spam Score */}
                    {result.analysis.spamScore !== undefined && result.analysis.spamScore !== null && (
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <Server className="w-5 h-5 text-purple-500" /> Spam Score
                        </h2>
                        <div className={`p-5 rounded-xl border-2 ${
                          result.analysis.spamScore <= 3 ? 'bg-green-50 border-green-200' :
                          result.analysis.spamScore <= 6 ? 'bg-amber-50 border-amber-200' :
                          'bg-red-50 border-red-200'
                        }`}>
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700">SpamAssassin Score</span>
                            <span className={`text-3xl font-bold ${
                              result.analysis.spamScore <= 3 ? 'text-green-600' :
                              result.analysis.spamScore <= 6 ? 'text-amber-600' :
                              'text-red-600'
                            }`}>
                              {result.analysis.spamScore}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {result.analysis.spamScore <= 3 ? '✅ Excellent - Very low spam risk. Your email should be delivered normally.' :
                             result.analysis.spamScore <= 6 ? '⚠️ Fair - Some spam characteristics detected. May be filtered.' :
                             '🚨 Poor - High spam risk. Email will likely land in spam folder.'}
                          </p>
                          {result.analysis.spamDetails && result.analysis.spamDetails.length > 0 && (
                            <div className="mt-4 p-3 bg-white/50 rounded-lg">
                              <p className="text-sm font-medium text-gray-700 mb-2">Issues detected:</p>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {result.analysis.spamDetails.map((detail, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-gray-400">•</span>
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Help Link */}
                    <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-800">Need help configuring?</p>
                          <p className="text-sm text-blue-700 mt-1">
                            Check our{' '}
                            <Link href="/guides" className="underline font-medium hover:text-blue-900">
                              DNS Setup Guides
                            </Link>
                            {' '}for step-by-step instructions for popular providers like Cloudflare, GoDaddy, and more.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Raw Headers */}
                {result.headers && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <button
                      onClick={() => setShowHeaders(!showHeaders)}
                      className="flex items-center gap-2 text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      {showHeaders ? 'Hide' : 'Show'} Raw Headers
                    </button>
                    {showHeaders && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-400 uppercase tracking-wide">Email Headers</span>
                          <button
                            onClick={handleCopyHeaders}
                            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copied ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs overflow-x-auto max-h-80 overflow-y-auto">
                          {result.headers}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/test"
                  className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-center transition-colors"
                >
                  Run Another Test
                </Link>
                {result.analysis?.from && (
                  <Link
                    href={`/report/${result.analysis.from.split('@')[1]}`}
                    className="flex-1 py-3 px-6 bg-white border border-gray-200 hover:border-blue-300 text-gray-700 font-medium rounded-xl text-center transition-colors flex items-center justify-center gap-2"
                  >
                    Full Domain Report <ExternalLink className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-slate-50 mt-auto">
        <div className="max-w-5xl mx-auto text-center text-gray-400 text-sm">
          <p>© 2026 EmailDiag. Free email deliverability checker.</p>
        </div>
      </footer>
    </main>
  );
}

// Authentication Card Component
function AuthCard({ 
  auth, 
  result, 
  selector,
  getStatusColor, 
  getStatusIcon, 
  getStatusLabel 
}: { 
  auth: typeof authExplanations.spf;
  result: { status: string; details: string };
  selector?: string;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusLabel: (status: string) => string;
}) {
  const [expanded, setExpanded] = useState(result.status !== 'pass');
  const statusInfo = auth[result.status as 'pass' | 'fail' | 'none'];

  return (
    <div className={`rounded-xl border-2 overflow-hidden transition-all ${
      result.status === 'pass' ? 'border-green-200' :
      result.status === 'fail' ? 'border-red-200' : 'border-amber-200'
    }`}>
      {/* Header - Always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full p-4 flex items-center justify-between ${getStatusColor(result.status)} hover:opacity-90 transition-opacity`}
      >
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5" />
          <span className="font-semibold">{auth.name}</span>
          {selector && (
            <span className="text-xs bg-white/60 px-2 py-0.5 rounded-full">
              selector: {selector}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium px-3 py-1 rounded-full bg-white/60">
            {getStatusLabel(result.status)}
          </span>
          {getStatusIcon(result.status)}
        </div>
      </button>
      
      {/* Expandable Details */}
      {expanded && (
        <div className="p-4 bg-white space-y-3 text-sm">
          <div className="flex gap-3">
            <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-700">What is this?</p>
              <p className="text-gray-600">{auth.whatIs}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-700">Impact</p>
              <p className="text-gray-600">{statusInfo.impact}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Lightbulb className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-700">Recommended Action</p>
              <p className="text-gray-600">{statusInfo.action}</p>
            </div>
          </div>
          {result.details && (
            <div className="mt-2 p-2 bg-slate-50 rounded text-xs text-gray-500 font-mono">
              Technical details: {result.details}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
