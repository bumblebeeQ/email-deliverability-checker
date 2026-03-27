import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Twitter, Linkedin, CheckCircle, XCircle, AlertTriangle, ArrowRight, Terminal, Copy } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'SPF and DKIM Set But Record Not Found? Here\'s the Fix | EmailDiag',
  description: 'Configured SPF and DKIM but still getting "record not found" errors? I spent 2 hours debugging this exact issue. Here\'s what actually worked.',
  keywords: 'SPF record not found, DKIM not found, DNS propagation, email authentication, SPF setup, DKIM setup',
  authors: [{ name: 'Mike Chen' }],
  openGraph: {
    title: 'SPF and DKIM Set But Record Not Found? Here\'s the Fix',
    description: 'The frustrating "record not found" error when you KNOW you set everything up. Let me save you 2 hours of debugging.',
    url: 'https://www.emaildiag.com/blog/spf-dkim-set-but-not-found',
    type: 'article',
    publishedTime: '2026-03-27',
  },
  alternates: {
    canonical: 'https://www.emaildiag.com/blog/spf-dkim-set-but-not-found',
  },
};

export default function SpfDkimNotFoundPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'SPF and DKIM Set But Record Not Found? Here\'s the Fix',
    description: 'Debug guide for SPF/DKIM record not found errors',
    datePublished: '2026-03-27',
    dateModified: '2026-03-27',
    author: { '@type': 'Person', name: 'Mike Chen', jobTitle: 'Email Deliverability Specialist' },
    publisher: { '@type': 'Organization', name: 'EmailDiag', url: 'https://www.emaildiag.com' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen bg-white">
        <Navbar />

        {/* Breadcrumb */}
        <nav className="py-3 px-4 bg-gray-50 border-b text-sm">
          <div className="max-w-3xl mx-auto flex items-center gap-2 text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-600">Blog</Link>
            <span>/</span>
            <span className="text-gray-700">SPF DKIM Not Found</span>
          </div>
        </nav>

        {/* Article Header */}
        <header className="pt-12 pb-8 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                Troubleshooting
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                March 27, 2026
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                8 min read
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              SPF and DKIM Set But "Record Not Found"? <br />
              <span className="text-gray-500">I Wasted 2 Hours on This. You Don't Have To.</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              You added the DNS records. You triple-checked the values. The registrar dashboard shows everything's there.
              But every checker tool keeps saying <code className="bg-red-100 text-red-700 px-2 py-0.5 rounded">"SPF record not found"</code>.
              <strong className="text-gray-800"> Sound familiar?</strong>
            </p>

            {/* Author */}
            <div className="flex items-center gap-4 pb-8 border-b">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                MC
              </div>
              <div>
                <p className="font-medium text-gray-900">Mike Chen</p>
                <p className="text-sm text-gray-500">Been debugging email configs since 2015. Still get tripped up sometimes.</p>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="px-4 pb-16">
          <div className="max-w-3xl mx-auto">
            
            {/* Story Intro */}
            <div className="mb-10">
              <p className="text-gray-700 leading-relaxed mb-4">
                Last Tuesday, a friend pinged me at 11 PM. He'd been trying to set up email authentication for his new SaaS 
                for <em>three hours</em>. DNS records were in place. Screenshots to prove it. But mail-tester kept giving him a 4/10.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                "Bro, I'm going insane. I literally copied everything from Google's documentation."
              </p>
              <p className="text-gray-700 leading-relaxed">
                Turns out it was one of those problems that looks complicated but has a stupidly simple cause.
                Let me walk you through what we found — and the 5 things you should check before you lose your mind.
              </p>
            </div>

            {/* Quick Check CTA */}
            <div className="my-10 p-5 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="text-2xl">⚡</div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Before we dive in</h3>
                  <p className="text-blue-700 text-sm mb-3">
                    Run a quick check on your domain. Sometimes the problem is obvious and you don't need to read this whole thing.
                  </p>
                  <Link 
                    href="/tools/spf-checker"
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Check my SPF record → 
                  </Link>
                </div>
              </div>
            </div>

            {/* Reason 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                DNS Propagation (The Boring But Common One)
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Yeah, I know. Everyone says "wait for DNS propagation" and you're thinking "I've waited an hour, that should be enough."
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Here's the thing — it depends on your DNS provider. Some are fast (Cloudflare, usually under 5 minutes). 
                Some are... not (looking at you, certain budget registrars).
              </p>

              <div className="my-6 p-4 bg-amber-50 border-l-4 border-amber-400">
                <p className="text-amber-800 font-medium mb-2">What actually happened to my friend:</p>
                <p className="text-amber-700 text-sm">
                  He was using GoDaddy's DNS. The dashboard showed the record, but when we ran <code>dig</code>, nothing.
                  We waited another 30 minutes — still nothing. Switched his nameservers to Cloudflare, and boom, 
                  records showed up in under 2 minutes.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">How to actually check propagation:</h3>
              
              <p className="text-gray-700 mb-3">Don't trust your registrar's dashboard. Use these instead:</p>

              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
                <p className="text-gray-400 mb-2"># Check SPF from command line</p>
                <code>dig TXT yourdomain.com +short</code>
                <p className="text-gray-400 mt-4 mb-2"># Or check from multiple locations</p>
                <code>nslookup -type=TXT yourdomain.com 8.8.8.8</code>
              </div>

              <p className="text-gray-700">
                If you see your record when querying Google's DNS (8.8.8.8) but not others, it's still propagating. 
                Give it another hour or two.
              </p>
            </section>

            {/* Reason 2 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Wrong Record Type (This One Got Me)
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                SPF records go in a <strong>TXT record</strong>, not an SPF record.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                "Wait, there's an SPF record type?" Yeah, there was. It's been deprecated since 2014. 
                But some older DNS interfaces still show it as an option, and if you pick that instead of TXT... nothing works.
              </p>

              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                  <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5" /> Wrong
                  </p>
                  <p className="text-sm text-red-700 font-mono">
                    Type: SPF<br />
                    Value: v=spf1 include:...
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="font-semibold text-green-800 flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5" /> Correct
                  </p>
                  <p className="text-sm text-green-700 font-mono">
                    Type: TXT<br />
                    Value: v=spf1 include:...
                  </p>
                </div>
              </div>

              <p className="text-gray-700">
                Same goes for DKIM — it's also a TXT record, just with a specific name format 
                (like <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">selector._domainkey.yourdomain.com</code>).
              </p>
            </section>

            {/* Reason 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                The Subdomain Trap
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                This is sneaky. You set up SPF for <code className="bg-gray-100 px-1.5 rounded">yourdomain.com</code>, 
                but your emails are actually sent from <code className="bg-gray-100 px-1.5 rounded">mail.yourdomain.com</code> 
                or <code className="bg-gray-100 px-1.5 rounded">notifications.yourdomain.com</code>.
              </p>

              <div className="my-6 p-4 bg-blue-50 border-l-4 border-blue-400">
                <p className="text-blue-800">
                  <strong>Key insight:</strong> SPF is checked against the domain in the <code>Return-Path</code> header, 
                  not the <code>From</code> header. These are often different, especially if you're using a third-party 
                  email service.
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                Check your email headers. Look for the <code>Return-Path</code> line. 
                That's the domain that needs the SPF record.
              </p>

              <p className="text-gray-700">
                For DKIM, check the <code>d=</code> value in the signature. 
                If it says <code>d=mail.yourdomain.com</code>, your DKIM record needs to be at 
                <code className="bg-gray-100 px-1.5 rounded text-sm">selector._domainkey.mail.yourdomain.com</code>, 
                not the root domain.
              </p>
            </section>

            {/* Reason 4 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                Quoting and Formatting Issues
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Some registrar interfaces are... special. They auto-add quotes around your TXT value. 
                Or they don't, when they should. Or they add escape characters that break everything.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Things that have broken my records before:</h3>
              
              <ul className="space-y-2 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Extra quotes: <code className="bg-gray-100 px-1 rounded">"\"v=spf1..."\"</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Smart quotes (copy-pasted from a Word doc): <code className="bg-gray-100 px-1 rounded">"v=spf1..."</code> vs <code className="bg-gray-100 px-1 rounded">"v=spf1..."</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Invisible characters (especially if copied from a PDF)</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Trailing spaces</span>
                </li>
              </ul>

              <div className="my-6 p-4 bg-gray-100 rounded-xl">
                <p className="font-medium text-gray-800 mb-2">Pro tip:</p>
                <p className="text-gray-600 text-sm">
                  Type it out manually instead of copy-pasting. Seriously. Or paste into a plain text editor first, 
                  then copy from there.
                </p>
              </div>
            </section>

            {/* Reason 5 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                DKIM Selector Mismatch
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                DKIM records have a "selector" — it's the first part of the record name. 
                If your email service uses <code>selector1</code> but you set up the record for <code>google</code>... 
                it won't match.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Common selectors by provider:
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-3 border">Provider</th>
                      <th className="text-left p-3 border">Typical Selector</th>
                      <th className="text-left p-3 border">Record Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border">Google Workspace</td>
                      <td className="p-3 border font-mono text-sm">google</td>
                      <td className="p-3 border font-mono text-sm">google._domainkey</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-3 border">Microsoft 365</td>
                      <td className="p-3 border font-mono text-sm">selector1, selector2</td>
                      <td className="p-3 border font-mono text-sm">selector1._domainkey</td>
                    </tr>
                    <tr>
                      <td className="p-3 border">SendGrid</td>
                      <td className="p-3 border font-mono text-sm">s1, s2</td>
                      <td className="p-3 border font-mono text-sm">s1._domainkey</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-3 border">Mailchimp</td>
                      <td className="p-3 border font-mono text-sm">k1</td>
                      <td className="p-3 border font-mono text-sm">k1._domainkey</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700">
                Check your email headers for the <code>s=</code> value in the DKIM signature. 
                That tells you exactly which selector is being used.
              </p>
            </section>

            {/* Quick Fix Checklist */}
            <section className="my-12 p-6 bg-gray-900 text-white rounded-2xl">
              <h2 className="text-xl font-bold mb-4">🔧 Quick Debug Checklist</h2>
              <p className="text-gray-300 text-sm mb-4">Run through these before you pull your hair out:</p>
              <div className="space-y-3 text-sm">
                <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span>Waited at least 30 min for DNS propagation?</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span>Using TXT record type (not SPF)?</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span>Checked the actual sending domain (not just root)?</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span>Verified with <code>dig</code> or external tool?</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span>No weird quotes or invisible characters?</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span>DKIM selector matches what's in email headers?</span>
                </label>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Stuck?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you've gone through all of this and it's still not working, there might be something 
                specific to your setup. The most helpful thing you can do is grab the raw email headers 
                from a test message and look at what's actually happening.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                My friend's issue? Turned out to be a combination of #1 and #3 — slow propagation at GoDaddy 
                plus he was checking the wrong domain. Classic combo.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We fixed it in about 10 minutes once we knew what to look for. 
                Hopefully this saves you the 2 hours of frustration we went through.
              </p>
            </section>

            {/* Final CTA */}
            <div className="my-12 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
              <h3 className="text-xl font-bold mb-2">Need a second opinion?</h3>
              <p className="text-blue-100 mb-4">
                Run your domain through our checker. It'll tell you exactly what's configured (or not) 
                and where the problem might be.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link 
                  href="/tools/spf-checker"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Check SPF <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/tools/dkim-checker"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-400 transition-colors"
                >
                  Check DKIM <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </article>

        {/* Share & Related */}
        <section className="py-12 px-4 bg-gray-50 border-t">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="text-gray-600 font-medium">Share:</span>
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Finally fixed my SPF/DKIM "record not found" issue')}&url=${encodeURIComponent('https://www.emaildiag.com/blog/spf-dkim-set-but-not-found')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white border rounded-lg hover:bg-gray-50 hover:border-blue-400 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-gray-600" />
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://www.emaildiag.com/blog/spf-dkim-set-but-not-found')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white border rounded-lg hover:bg-gray-50 hover:border-blue-400 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-gray-600" />
                </a>
              </div>
              <Link 
                href="/blog"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> All articles
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 border">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Related Articles</h3>
              <div className="space-y-3">
                <Link href="/blog/why-emails-going-to-spam" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <h4 className="font-medium text-gray-800">Why Are My Emails Going to Spam?</h4>
                  <p className="text-sm text-gray-500">The complete guide to fixing deliverability issues</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">© 2026 EmailDiag. The friendliest free email deliverability tool.</p>
              <div className="flex gap-6 text-sm text-gray-500">
                <Link href="/about" className="hover:text-blue-600">About</Link>
                <Link href="/privacy" className="hover:text-blue-600">Privacy</Link>
                <Link href="/terms" className="hover:text-blue-600">Terms</Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
