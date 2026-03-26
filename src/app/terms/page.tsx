import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'EmailDiag terms of service. Read our terms for using the email deliverability checker.',
};

export default function TermsPage() {
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
            <Link href="/test" className="hover:text-blue-600 transition-colors">Email Test</Link>
            <Link href="/faq" className="hover:text-blue-600 transition-colors">FAQ</Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: March 26, 2026</p>

          <div className="prose prose-gray max-w-none">
            <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
              
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
                <p className="text-gray-600">
                  By accessing or using EmailDiag ("the Service"), you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use the Service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Description of Service</h2>
                <p className="text-gray-600">
                  EmailDiag provides free email deliverability diagnostics including:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                  <li>Domain authentication checks (SPF, DKIM, DMARC, MX records)</li>
                  <li>Blacklist scanning</li>
                  <li>Email authentication testing</li>
                  <li>DNS configuration guides</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Acceptable Use</h2>
                <p className="text-gray-600">
                  You agree to use the Service only for lawful purposes. You may NOT:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                  <li>Use the Service to send spam or unsolicited emails</li>
                  <li>Attempt to probe, scan, or test vulnerabilities of the Service</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Use automated tools to excessively query the Service</li>
                  <li>Attempt to access data belonging to other users</li>
                  <li>Use the Service for any illegal activity</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Rate Limits</h2>
                <p className="text-gray-600">
                  To ensure fair access for all users, we may implement rate limits on API calls and checks. 
                  Excessive usage may result in temporary or permanent access restrictions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">5. No Warranty</h2>
                <p className="text-gray-600">
                  The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind. We do not guarantee:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                  <li>Continuous, uninterrupted access to the Service</li>
                  <li>Accuracy or completeness of diagnostic results</li>
                  <li>That the Service will meet your specific requirements</li>
                  <li>That defects will be corrected</li>
                </ul>
                <p className="text-gray-600 mt-2">
                  Email deliverability depends on many factors beyond our control. Our diagnostics are informational 
                  and should not be considered definitive.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Limitation of Liability</h2>
                <p className="text-gray-600">
                  To the maximum extent permitted by law, EmailDiag shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                  <li>Loss of profits or revenue</li>
                  <li>Loss of data</li>
                  <li>Business interruption</li>
                  <li>Email delivery failures</li>
                </ul>
                <p className="text-gray-600 mt-2">
                  Our total liability shall not exceed the amount you paid for the Service (which is $0 for free users).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Intellectual Property</h2>
                <p className="text-gray-600">
                  The Service, including its design, features, and content, is protected by copyright and other 
                  intellectual property laws. You may not copy, modify, or reverse engineer any part of the Service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Third-Party Services</h2>
                <p className="text-gray-600">
                  Our Service queries third-party DNS servers and blacklist databases. We are not responsible for 
                  the accuracy or availability of these external services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Modifications to Service</h2>
                <p className="text-gray-600">
                  We reserve the right to modify, suspend, or discontinue the Service at any time without notice. 
                  We may also update these Terms from time to time.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Termination</h2>
                <p className="text-gray-600">
                  We may terminate or suspend your access to the Service immediately, without notice, for conduct 
                  that we believe violates these Terms or is harmful to other users or the Service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">11. Governing Law</h2>
                <p className="text-gray-600">
                  These Terms shall be governed by and construed in accordance with applicable laws, without 
                  regard to conflict of law principles.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">12. Contact</h2>
                <p className="text-gray-600">
                  If you have questions about these Terms, please contact us at:{' '}
                  <a href="mailto:legal@emaildiag.com" className="text-blue-600 hover:underline">
                    legal@emaildiag.com
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
