import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'EmailDiag privacy policy. Learn how we handle your data with respect and transparency.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <Navbar />

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: March 26, 2026</p>

          <div className="prose prose-gray max-w-none">
            <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
              
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Overview</h2>
                <p className="text-gray-600">
                  EmailDiag ("we", "our", or "us") is committed to protecting your privacy. This policy explains 
                  how we collect, use, and safeguard information when you use our email deliverability checking service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Information We Collect</h2>
                <h3 className="font-medium text-gray-700 mt-4 mb-2">Domain Checks</h3>
                <p className="text-gray-600">
                  When you check a domain, we query public DNS records (SPF, DKIM, DMARC, MX) and public blacklist databases. 
                  We do not store the domains you check beyond temporary caching for performance.
                </p>
                
                <h3 className="font-medium text-gray-700 mt-4 mb-2">Email Tests</h3>
                <p className="text-gray-600">
                  When you send a test email, we temporarily store:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                  <li>Email headers (for authentication analysis)</li>
                  <li>Sender address</li>
                  <li>Subject line (only to match your test ID)</li>
                  <li>Authentication results (SPF, DKIM, DMARC status)</li>
                </ul>
                <p className="text-gray-600 mt-2">
                  <strong>We do NOT store email body content.</strong> All test data is automatically deleted after 24 hours.
                </p>

                <h3 className="font-medium text-gray-700 mt-4 mb-2">Analytics</h3>
                <p className="text-gray-600">
                  We use privacy-friendly analytics to understand how our service is used. This includes:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                  <li>Page views (anonymized)</li>
                  <li>Country/region (from IP, not stored)</li>
                  <li>Device type and browser</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">How We Use Information</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>To provide email deliverability diagnostics</li>
                  <li>To improve our service and fix bugs</li>
                  <li>To understand usage patterns (anonymized)</li>
                </ul>
                <p className="text-gray-600 mt-2">
                  We do NOT sell, rent, or share your personal information with third parties for marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Data Security</h2>
                <p className="text-gray-600">
                  We implement industry-standard security measures:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                  <li>HTTPS encryption for all connections</li>
                  <li>Secure cloud infrastructure</li>
                  <li>Automatic data deletion after 24 hours</li>
                  <li>No permanent storage of sensitive email data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Cookies</h2>
                <p className="text-gray-600">
                  We use minimal, essential cookies for:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                  <li>Session management</li>
                  <li>Analytics (anonymized)</li>
                </ul>
                <p className="text-gray-600 mt-2">
                  We do not use advertising or tracking cookies.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Third-Party Services</h2>
                <p className="text-gray-600">
                  We use the following third-party services:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                  <li><strong>Vercel</strong> — Hosting and CDN</li>
                  <li><strong>Cloudflare</strong> — DNS and email routing</li>
                  <li><strong>Supabase</strong> — Temporary data storage</li>
                </ul>
                <p className="text-gray-600 mt-2">
                  Each service has their own privacy policy governing data handling.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Your Rights</h2>
                <p className="text-gray-600">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                  <li>Access any personal data we hold about you</li>
                  <li>Request deletion of your data</li>
                  <li>Opt out of analytics tracking</li>
                </ul>
                <p className="text-gray-600 mt-2">
                  Since we don't require registration and automatically delete test data, most users have no 
                  persistent personal data stored with us.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Children's Privacy</h2>
                <p className="text-gray-600">
                  Our service is not directed at children under 13. We do not knowingly collect personal 
                  information from children.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Changes to This Policy</h2>
                <p className="text-gray-600">
                  We may update this policy from time to time. Changes will be posted on this page with an 
                  updated revision date.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact Us</h2>
                <p className="text-gray-600">
                  If you have questions about this privacy policy, please contact us at:{' '}
                  <a href="mailto:privacy@emaildiag.com" className="text-blue-600 hover:underline">
                    privacy@emaildiag.com
                  </a>
                </p>
              </section>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2026 EmailDiag. Free email deliverability checker.</p>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="/about" className="hover:text-blue-600">About</Link>
              <Link href="/privacy" className="hover:text-blue-600">Privacy</Link>
              <Link href="/terms" className="hover:text-blue-600">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
