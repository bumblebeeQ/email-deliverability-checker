import Link from 'next/link';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export default function WhyEmailsGoingToSpam() {
  return (
    <>
      {/* Intro */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          Look, I get it. You spent 30 minutes crafting the perfect email, hit send, and... crickets. 
          No reply. No click. Later you find out it's been rotting in the spam folder the whole time. 
          <strong className="text-gray-800"> It's infuriating.</strong>
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Here's the thing: <strong>about 45% of all emails worldwide get flagged as spam</strong>. 
          That's not a typo. Almost half. So if your emails are ending up there, you're definitely not alone.
        </p>
        <p className="text-gray-700 leading-relaxed">
          But here's the good news — most spam issues are totally fixable. I've helped hundreds of companies 
          dig their way out of the spam folder, and it usually comes down to the same handful of problems.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Before we dive in — let's do a quick health check</h3>
            <p className="text-blue-100 mb-4">
              Run your domain through our free checker. It takes 10 seconds and will tell you immediately if you have any obvious configuration issues.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Check My Domain <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="my-10 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-4">What we'll cover:</h3>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <a href="#spf" className="text-blue-600 hover:underline">1. Missing SPF record</a>
          <a href="#dkim" className="text-blue-600 hover:underline">2. No DKIM signature</a>
          <a href="#dmarc" className="text-blue-600 hover:underline">3. No DMARC policy</a>
          <a href="#blacklist" className="text-blue-600 hover:underline">4. IP blacklisted</a>
          <a href="#reputation" className="text-blue-600 hover:underline">5. Poor sender reputation</a>
          <a href="#content" className="text-blue-600 hover:underline">6. Spammy content</a>
        </div>
      </div>

      {/* Section 1: SPF */}
      <section id="spf" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          Missing or Broken SPF Record
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          This is probably the #1 reason I see emails going to spam. And honestly? It's the easiest to fix.
        </p>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2">What's SPF in plain English?</p>
          <p className="text-amber-700">
            Think of SPF as a guest list for your email. It's a public record that says: "Hey email servers, 
            these are the <em>only</em> servers allowed to send emails on my behalf. Anyone else is an imposter."
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Without SPF, any random server on the internet can send emails pretending to be you. 
          Email providers know this, so they treat emails from domains without SPF with extreme suspicion.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">How to fix it:</h3>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          You need to add a TXT record to your domain's DNS. Here's a typical example:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <code>v=spf1 include:_spf.google.com include:sendgrid.net -all</code>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>Quick check:</strong> <Link href="/tools/spf-checker" className="text-blue-600 hover:underline">Run your domain through our SPF checker →</Link>
        </p>
      </section>

      {/* Section 2: DKIM */}
      <section id="dkim" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          No DKIM Signature
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          DKIM is like a tamper-proof seal on your emails. It adds a cryptographic signature that proves 
          two things: (1) the email really came from you, and (2) nobody messed with it in transit.
        </p>

        <div className="my-6 p-5 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
          <p className="text-blue-800">
            <strong>Real talk:</strong> DKIM is a bit more annoying to set up than SPF because it involves 
            generating keys and configuring your mail server. But it's worth it — many email providers 
            will straight-up spam emails without DKIM signatures.
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>Quick check:</strong> <Link href="/tools/dkim-checker" className="text-blue-600 hover:underline">Verify your DKIM configuration →</Link>
        </p>
      </section>

      {/* Section 3: DMARC */}
      <section id="dmarc" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          No DMARC Policy
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          DMARC ties SPF and DKIM together and tells email providers what to do when something fails. 
          Without it, you're leaving the decision entirely up to them — and they tend to err on the side of spam.
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <code>v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com; pct=100</code>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>Quick check:</strong> <Link href="/tools/dmarc-checker" className="text-blue-600 hover:underline">Check your DMARC policy →</Link>
        </p>
      </section>

      {/* Section 4: Blacklist */}
      <section id="blacklist" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          Your IP is Blacklisted
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          If you're on a blacklist, your emails might not even make it to the spam folder — 
          they could be blocked entirely. This is serious, but it's also fixable.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>Quick check:</strong> <Link href="/tools/blacklist-check" className="text-blue-600 hover:underline">Scan 50+ blacklists instantly →</Link>
        </p>
      </section>

      {/* Section 5: Reputation */}
      <section id="reputation" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          Poor Sender Reputation
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          Every email provider tracks your sending behavior and gives you a "reputation score." 
          It's like a credit score for email. Low score = spam folder.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">How to check your reputation:</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
          <li><a href="https://postmaster.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Postmaster Tools</a> — For Gmail reputation</li>
          <li><a href="https://sendersupport.olc.protection.outlook.com/snds/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Microsoft SNDS</a> — For Outlook reputation</li>
        </ul>
      </section>

      {/* Section 6: Content */}
      <section id="content" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">6</span>
          Spammy Email Content
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          Even with perfect authentication, your content can trigger spam filters. Here are the biggest red flags:
        </p>

        <div className="my-6 grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 rounded-xl">
            <p className="font-semibold text-red-800 mb-3 flex items-center gap-2">
              <XCircle className="w-5 h-5" /> Don't do this
            </p>
            <ul className="space-y-2 text-sm text-red-700">
              <li>• "FREE MONEY NOW!!!"</li>
              <li>• "ACT NOW - Limited time!!!"</li>
              <li>• All-image emails</li>
              <li>• Tiny unsubscribe link</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <p className="font-semibold text-green-800 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" /> Do this instead
            </p>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• "Your weekly update"</li>
              <li>• Clear, honest links</li>
              <li>• 60/40 text-to-image ratio</li>
              <li>• Prominent unsubscribe</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
        <h2 className="text-2xl font-bold mb-6">✅ Quick Checklist</h2>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span>SPF record configured</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span>DKIM enabled</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span>DMARC policy set</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span>Not on blacklists</span>
          </label>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Ready to fix your email deliverability?</h3>
        <p className="text-green-100 mb-6">
          Run a free check on your domain — it takes 10 seconds.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-colors"
        >
          Check My Domain Now <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </>
  );
}
