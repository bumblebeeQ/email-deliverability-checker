'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Zap, Send, ArrowRight, Copy, Check, Clock, Shield, AlertTriangle, Info } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

// Note: metadata needs to be in a separate file for client components
// Create test/layout.tsx or use generateMetadata in a server component wrapper

export default function EmailTestPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [testData, setTestData] = useState<{ testId: string; email: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleStartTest = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/test/create', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        setTestData({
          testId: data.testId,
          email: data.email,
        });
      } else {
        setError(data.error || 'Failed to create test');
      }
    } catch (err) {
      setError('Network error, please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyEmail = async () => {
    if (!testData) return;
    try {
      await navigator.clipboard.writeText(testData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleViewResults = () => {
    if (testData) {
      router.push(`/test/${testData.testId}`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <Navbar active="test" />

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex p-4 bg-blue-100 rounded-full mb-6">
              <Send className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Email Deliverability Test
            </h1>
            <p className="text-lg text-gray-600">
              Send a test email to analyze your email authentication and spam score
            </p>
          </div>

          {!testData ? (
            /* Step 1: Start Test */
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">How it works</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Get a unique test email address</h3>
                    <p className="text-gray-600 text-sm">We'll generate a temporary mailbox for your test</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Send an email from your domain</h3>
                    <p className="text-gray-600 text-sm">Send any email to the test address using your normal email system</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Get detailed analysis</h3>
                    <p className="text-gray-600 text-sm">See SPF, DKIM, DMARC results and spam score</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  Test emails expire after 24 hours. Results are private and not stored permanently.
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <button
                onClick={handleStartTest}
                disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Test...
                  </>
                ) : (
                  <>
                    Start Email Test <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Step 2: Send Email */
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-sm text-green-800">
                  Test created! Send an email with the subject line below.
                </p>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                1. Send email to:
              </h2>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 p-4 bg-gray-100 rounded-xl font-mono text-lg text-gray-800 break-all">
                  {testData.email}
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="flex-shrink-0 p-4 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                  title="Copy email address"
                >
                  {copied ? (
                    <Check className="w-6 h-6 text-green-600" />
                  ) : (
                    <Copy className="w-6 h-6 text-gray-600" />
                  )}
                </button>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                2. Use this subject line:
              </h2>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex-1 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl font-mono text-lg text-gray-800">
                  TEST-{testData.testId}
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`TEST-${testData.testId}`);
                  }}
                  className="flex-shrink-0 p-4 bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-300 rounded-xl transition-colors"
                  title="Copy subject"
                >
                  <Copy className="w-6 h-6 text-yellow-700" />
                </button>
              </div>

              <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  This test email address is valid for <strong>24 hours</strong>.
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <h3 className="font-medium text-gray-700 flex items-center gap-2">
                  <Info className="w-4 h-4" /> Tips for best results:
                </h3>
                <ul className="text-sm text-gray-600 space-y-2 pl-6 list-disc">
                  <li>Send from your actual business email address</li>
                  <li>Include some text content (not just blank)</li>
                  <li>Wait 1-2 minutes for the email to arrive</li>
                </ul>
              </div>

              <button
                onClick={handleViewResults}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Check Results <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Test ID: <code className="bg-gray-100 px-2 py-1 rounded">{testData.testId}</code>
              </p>
            </div>
          )}

          {/* Features */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="inline-flex p-3 bg-green-100 rounded-xl mb-3">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Authentication Check</h3>
              <p className="text-sm text-gray-600">Verify SPF, DKIM, and DMARC alignment</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex p-3 bg-yellow-100 rounded-xl mb-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Spam Score</h3>
              <p className="text-sm text-gray-600">See how spam filters rate your email</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex p-3 bg-blue-100 rounded-xl mb-3">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Header Analysis</h3>
              <p className="text-sm text-gray-600">Full header inspection and diagnosis</p>
            </div>
          </div>
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
