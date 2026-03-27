import Link from 'next/link';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export default function SpfDkimNotFound() {
  return (
    <>
      {/* Story Intro */}
      <div className="mb-10">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          You added the DNS records. You triple-checked the values. The registrar dashboard shows everything's there.
          But every checker tool keeps saying <code className="bg-red-100 text-red-700 px-2 py-0.5 rounded">"SPF record not found"</code>.
          <strong className="text-gray-800"> Sound familiar?</strong>
        </p>
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
            <span>Smart quotes (copy-pasted from a Word doc)</span>
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
            <span>Verified with dig or external tool?</span>
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
    </>
  );
}
