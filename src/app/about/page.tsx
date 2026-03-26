import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Zap, Shield, Heart, Lightbulb, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - Our Mission',
  description: 'EmailDiag is the friendliest free email deliverability tool. Learn about our mission to help everyone fix email delivery issues.',
};

export default function AboutPage() {
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

      {/* Hero */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About EmailDiag
          </h1>
          <p className="text-xl text-gray-600">
            The friendliest free email deliverability tool
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              We believe everyone deserves to have their emails delivered. Whether you're a small business owner, 
              a developer, or someone who just wants their newsletter to reach subscribers — email deliverability 
              shouldn't be a mystery.
            </p>
            <p className="text-gray-600 leading-relaxed">
              EmailDiag was created to demystify email authentication. We provide clear, actionable diagnostics 
              and step-by-step guides that anyone can follow, regardless of technical expertise.
            </p>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="p-2 bg-green-100 rounded-lg w-fit mb-4">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Free Forever</h3>
              <p className="text-sm text-gray-600">
                Core features are free with no registration required. We believe basic email diagnostics should be accessible to everyone.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="p-2 bg-purple-100 rounded-lg w-fit mb-4">
                <Lightbulb className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Easy to Understand</h3>
              <p className="text-sm text-gray-600">
                We explain technical concepts in plain language. Our guides are designed for humans, not just engineers.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="p-2 bg-orange-100 rounded-lg w-fit mb-4">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Privacy First</h3>
              <p className="text-sm text-gray-600">
                We don't store your email content. Test results are temporary and automatically deleted after 24 hours.
              </p>
            </div>
          </div>

          {/* What We Do */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">What We Offer</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">•</span>
                <span><strong>Domain Check</strong> — Instantly analyze SPF, DKIM, DMARC, and MX records for any domain</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">•</span>
                <span><strong>Email Test</strong> — Send a real email and see exactly how receiving servers evaluate it</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">•</span>
                <span><strong>Blacklist Scan</strong> — Check if your domain or IP is listed on 50+ major blacklists</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold">•</span>
                <span><strong>Setup Guides</strong> — Step-by-step instructions for Cloudflare, GoDaddy, AWS, and more</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-blue-50 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-4">
              Have questions, feedback, or suggestions? We'd love to hear from you.
            </p>
            <a 
              href="mailto:hello@emaildiag.com" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
              hello@emaildiag.com
            </a>
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
