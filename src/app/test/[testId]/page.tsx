'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Mail, Zap, CheckCircle, XCircle, AlertTriangle, Clock, 
  RefreshCw, ArrowLeft, Shield, Server, FileText, Copy, Check
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
        // Stop polling if email received or expired
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

  // Polling for pending tests
  useEffect(() => {
    if (!result || result.status !== 'pending') return;

    setPolling(true);
    const interval = setInterval(() => {
      fetchResult();
    }, 5000); // Poll every 5 seconds

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
      case 'none': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'fail': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading test result...</p>
        </div>
      </main>
    );
  }

  if (error || !result) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Test Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'This test may have expired or does not exist.'}</p>
          <Link 
            href="/test"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <ArrowLeft className="w-4 h-4" /> Start New Test
          </Link>
        </div>
      </main>
    );
  }

  return (
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
              <span className="text-xl font-bold text-gray-800">MailProbe</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/guides" className="hover:text-blue-600">Guides</Link>
            <Link href="/test" className="text-blue-600 font-medium">Email Test</Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link 
            href="/test"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Email Test
          </Link>

          {result.status === 'pending' ? (
            /* Waiting for email */
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Waiting for Your Email
              </h1>
              
              <div className="text-left mb-6">
                <p className="text-gray-600 mb-2 font-medium">1. Send an email to:</p>
                <div className="p-4 bg-gray-100 rounded-xl font-mono text-lg text-gray-800 break-all mb-4">
                  t@test.mailprobe.xyz
                </div>
                
                <p className="text-gray-600 mb-2 font-medium">2. Use this subject line:</p>
                <div className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl font-mono text-lg text-gray-800">
                  TEST-{result.id}
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-blue-600 mb-6">
                {polling && <RefreshCw className="w-5 h-5 animate-spin" />}
                <span>Checking for incoming email...</span>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  Test expires: {new Date(result.expiresAt).toLocaleString()}
                </p>
              </div>
            </div>
          ) : result.status === 'expired' ? (
            /* Expired */
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <XCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Test Expired</h1>
              <p className="text-gray-600 mb-6">No email was received within the time limit.</p>
              <Link 
                href="/test"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Start New Test <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          ) : (
            /* Email received - show analysis */
            <>
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">Email Received!</h1>
                    <p className="text-gray-500 text-sm">
                      Received at: {result.receivedAt ? new Date(result.receivedAt).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>

                {result.analysis && (
                  <>
                    {/* Email Info */}
                    <div className="p-4 bg-gray-50 rounded-lg mb-6">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">From:</span>
                          <span className="ml-2 text-gray-800 font-medium">{result.analysis.from || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Subject:</span>
                          <span className="ml-2 text-gray-800 font-medium">{result.analysis.subject || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Sending IP:</span>
                          <span className="ml-2 text-gray-800 font-mono">{result.analysis.sendingIp || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Reverse DNS:</span>
                          <span className="ml-2 text-gray-800 font-mono">{result.analysis.reverseDns || 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Authentication Results */}
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Authentication Results</h2>
                    <div className="space-y-4 mb-6">
                      {/* SPF */}
                      <div className={`p-4 rounded-lg border ${getStatusColor(result.analysis.spf.status)}`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            <span className="font-medium">SPF</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium uppercase">{result.analysis.spf.status}</span>
                            {getStatusIcon(result.analysis.spf.status)}
                          </div>
                        </div>
                        <p className="text-sm opacity-80">{result.analysis.spf.details}</p>
                      </div>

                      {/* DKIM */}
                      <div className={`p-4 rounded-lg border ${getStatusColor(result.analysis.dkim.status)}`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            <span className="font-medium">DKIM</span>
                            {result.analysis.dkim.selector && (
                              <span className="text-xs bg-white/50 px-2 py-0.5 rounded">
                                selector: {result.analysis.dkim.selector}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium uppercase">{result.analysis.dkim.status}</span>
                            {getStatusIcon(result.analysis.dkim.status)}
                          </div>
                        </div>
                        <p className="text-sm opacity-80">{result.analysis.dkim.details}</p>
                      </div>

                      {/* DMARC */}
                      <div className={`p-4 rounded-lg border ${getStatusColor(result.analysis.dmarc.status)}`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            <span className="font-medium">DMARC</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium uppercase">{result.analysis.dmarc.status}</span>
                            {getStatusIcon(result.analysis.dmarc.status)}
                          </div>
                        </div>
                        <p className="text-sm opacity-80">{result.analysis.dmarc.details}</p>
                      </div>
                    </div>

                    {/* Spam Score */}
                    {result.analysis.spamScore !== undefined && (
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Spam Score</h2>
                        <div className={`p-4 rounded-lg border ${
                          result.analysis.spamScore <= 3 ? 'bg-green-50 border-green-200' :
                          result.analysis.spamScore <= 6 ? 'bg-yellow-50 border-yellow-200' :
                          'bg-red-50 border-red-200'
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">SpamAssassin Score</span>
                            <span className={`text-2xl font-bold ${
                              result.analysis.spamScore <= 3 ? 'text-green-600' :
                              result.analysis.spamScore <= 6 ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {result.analysis.spamScore}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            {result.analysis.spamScore <= 3 ? 'Excellent - Low spam risk' :
                             result.analysis.spamScore <= 6 ? 'Fair - Some spam signals detected' :
                             'Poor - High spam risk'}
                          </p>
                          {result.analysis.spamDetails && result.analysis.spamDetails.length > 0 && (
                            <ul className="mt-3 text-sm text-gray-700 space-y-1">
                              {result.analysis.spamDetails.map((detail, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-gray-400">•</span>
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Raw Headers */}
                {result.headers && (
                  <div>
                    <button
                      onClick={() => setShowHeaders(!showHeaders)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <FileText className="w-4 h-4" />
                      {showHeaders ? 'Hide' : 'Show'} Raw Headers
                    </button>
                    {showHeaders && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-500">Email Headers</span>
                          <button
                            onClick={handleCopyHeaders}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                          >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg text-xs overflow-x-auto max-h-96 overflow-y-auto">
                          {result.headers}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/test"
                  className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-center"
                >
                  Run Another Test
                </Link>
                {result.analysis?.from && (
                  <Link
                    href={`/report/${result.analysis.from.split('@')[1]}`}
                    className="flex-1 py-3 px-6 bg-white border border-gray-300 hover:border-blue-500 text-gray-700 font-medium rounded-lg text-center"
                  >
                    Check Domain Configuration
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-gray-50 mt-8">
        <div className="max-w-5xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2026 MailProbe. Free email deliverability checker.</p>
        </div>
      </footer>
    </main>
  );
}
