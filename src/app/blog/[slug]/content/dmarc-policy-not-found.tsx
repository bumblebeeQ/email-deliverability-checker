import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function DmarcPolicyNotFound() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          Last Tuesday, a friend pinged me at 11 PM: <em>"Dude, I keep seeing 'DMARC policy not found' in my email headers. 
          What does that even mean?"</em> He'd been debugging for 3 hours and was about ready to throw his laptop out the window.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Sound familiar? This error is <strong>way more common than you'd think</strong> — and honestly, 
          it's one of the easier email authentication issues to fix. I've seen this exact problem dozens of times, 
          and it usually takes less than 10 minutes to solve once you know what you're looking at.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Let me walk you through exactly what this error means and how to fix it. No fluff, just the stuff that actually works.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">First — let's see what we're dealing with</h3>
            <p className="text-blue-100 mb-4">
              Run a quick check on your domain. It'll tell you in 5 seconds if DMARC is the issue (or if it's something else entirely).
            </p>
            <Link 
              href="/tools/dmarc-checker"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Check My DMARC <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="my-10 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-4">What we'll cover:</h3>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <a href="#what-is-dmarc" className="text-blue-600 hover:underline">1. What does this error actually mean?</a>
          <a href="#why-it-matters" className="text-blue-600 hover:underline">2. Why you can't ignore it</a>
          <a href="#step-by-step" className="text-blue-600 hover:underline">3. Step-by-step fix (5 minutes)</a>
          <a href="#verify" className="text-blue-600 hover:underline">4. How to verify it's working</a>
          <a href="#common-mistakes" className="text-blue-600 hover:underline">5. Common mistakes I've seen</a>
          <a href="#checklist" className="text-blue-600 hover:underline">6. Quick checklist</a>
        </div>
      </div>

      {/* Section 1: What does this error mean */}
      <section id="what-is-dmarc" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          What Does "DMARC Policy Not Found" Actually Mean?
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          When you see this error, it means one simple thing: <strong>your domain doesn't have a DMARC record in DNS</strong>.
        </p>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2">Quick analogy:</p>
          <p className="text-amber-700">
            Think of DMARC as a "return policy" sign at a store. Without it, when someone returns a package (email), 
            the store clerk (email server) doesn't know what to do — accept it? Reject it? Put it in the back room (spam folder)? 
            DMARC tells them exactly what to do.
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          The error message you're seeing might look like one of these:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
          <div><code className="text-red-400">DMARC: none</code></div>
          <div><code className="text-red-400">dmarc=none (p=none dis=none)</code></div>
          <div><code className="text-red-400">DMARC policy not found</code></div>
          <div><code className="text-red-400">No DMARC record found for domain</code></div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          All of these mean the same thing — <strong>time to add a DMARC record</strong>.
        </p>
      </section>

      {/* Section 2: Why it matters */}
      <section id="why-it-matters" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          Why You Can't Just Ignore This
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          I know what you're thinking: <em>"My emails are sending fine, why bother?"</em> 
          Here's the thing — they might be sending, but without DMARC:
        </p>

        <div className="my-6 grid gap-4">
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Your emails are more likely to land in spam
            </p>
            <p className="text-red-700 text-sm">
              Gmail, Outlook, and Yahoo now explicitly check for DMARC. No DMARC = suspicious sender = spam folder.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Anyone can spoof your domain
            </p>
            <p className="text-red-700 text-sm">
              Without DMARC, bad actors can send emails pretending to be you. Your customers could get phishing emails that look like they came from your company.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> You have zero visibility
            </p>
            <p className="text-red-700 text-sm">
              DMARC lets you receive reports about who's sending emails using your domain. Without it, you're flying blind.
            </p>
          </div>
        </div>

        <div className="my-6 p-5 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
          <p className="text-blue-800">
            <strong>Real talk:</strong> Starting February 2024, Google and Yahoo require DMARC for bulk senders. 
            If you send more than 5,000 emails/day, you <em>must</em> have DMARC or your emails will be rejected outright.
          </p>
        </div>
      </section>

      {/* Section 3: Step by step fix */}
      <section id="step-by-step" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          Step-by-Step Fix (Takes About 5 Minutes)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          Alright, let's fix this. You'll need access to your domain's DNS settings — usually through your registrar 
          (GoDaddy, Cloudflare, Namecheap, etc.) or hosting provider.
        </p>

        {/* Step 3.1 */}
        <div className="my-8 p-6 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
            Log into your DNS provider
          </h3>
          <p className="text-gray-700 mb-4">
            Go to wherever you manage your domain's DNS records. If you're not sure, check where you registered your domain.
          </p>
          <p className="text-gray-600 text-sm">
            <strong>Common providers:</strong> Cloudflare, GoDaddy, Namecheap, AWS Route 53, Google Domains, DNSPod
          </p>
        </div>

        {/* Step 3.2 */}
        <div className="my-8 p-6 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
            Add a new TXT record
          </h3>
          <p className="text-gray-700 mb-4">
            Create a new TXT record with these values:
          </p>
          
          <div className="bg-white border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50 w-32">Host/Name</td>
                  <td className="px-4 py-3 font-mono text-gray-800">_dmarc</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50">Type</td>
                  <td className="px-4 py-3 font-mono text-gray-800">TXT</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50">Value</td>
                  <td className="px-4 py-3 font-mono text-gray-800 break-all">v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-600 bg-gray-50">TTL</td>
                  <td className="px-4 py-3 font-mono text-gray-800">3600 (or Auto)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-amber-50 rounded-lg">
            <p className="text-amber-800 text-sm">
              <strong>⚠️ Important:</strong> Replace <code className="bg-amber-100 px-1 rounded">dmarc@yourdomain.com</code> with 
              your actual email address. This is where you'll receive reports about who's sending emails using your domain.
            </p>
          </div>
        </div>

        {/* Step 3.3 */}
        <div className="my-8 p-6 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
            Save and wait for propagation
          </h3>
          <p className="text-gray-700 mb-4">
            Hit save. DNS changes usually propagate within <strong>5-30 minutes</strong>, though it can sometimes take up to 24 hours.
          </p>
          <p className="text-gray-600 text-sm flex items-center gap-2">
            <Clock className="w-4 h-4" />
            In my experience, Cloudflare is almost instant. GoDaddy usually takes 10-15 minutes.
          </p>
        </div>

        {/* The DMARC record explained */}
        <div className="my-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Breaking down that DMARC record:</h3>
          
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-4">
            <code>v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com</code>
          </div>

          <div className="space-y-3">
            <div className="flex gap-3">
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-blue-600 whitespace-nowrap">v=DMARC1</code>
              <p className="text-gray-600 text-sm">Version tag. Always DMARC1 — don't change this.</p>
            </div>
            <div className="flex gap-3">
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-blue-600 whitespace-nowrap">p=none</code>
              <p className="text-gray-600 text-sm">Policy. Start with "none" (monitor only). You can change to "quarantine" or "reject" later once you're confident.</p>
            </div>
            <div className="flex gap-3">
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-blue-600 whitespace-nowrap">rua=mailto:...</code>
              <p className="text-gray-600 text-sm">Where to send aggregate reports. These are XML files showing who sent emails using your domain.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Verify */}
      <section id="verify" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          How to Verify It's Working
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          Don't just assume it worked — verify. Here's how:
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Method 1: Use our DMARC checker (fastest)</h3>
        <p className="text-gray-700 mb-4">
          <Link href="/tools/dmarc-checker" className="text-blue-600 hover:underline font-medium">Run your domain through our DMARC checker →</Link>
          <br />
          <span className="text-gray-500 text-sm">Takes 5 seconds and shows you exactly what email servers see.</span>
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Method 2: Command line (for the nerds)</h3>
        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div className="text-gray-400"># Mac/Linux</div>
          <div><code>dig TXT _dmarc.yourdomain.com +short</code></div>
          <div className="mt-3 text-gray-400"># Windows (PowerShell)</div>
          <div><code>nslookup -q=TXT _dmarc.yourdomain.com</code></div>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          You should see your DMARC record in the output. If not, wait a bit longer for DNS propagation.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Method 3: Send a test email</h3>
        <p className="text-gray-700 mb-4">
          Send an email to a Gmail account and check the email headers (click the three dots → "Show original"). 
          Look for <code className="bg-gray-100 px-1 rounded">dmarc=pass</code> instead of <code className="bg-gray-100 px-1 rounded">dmarc=none</code>.
        </p>
      </section>

      {/* Section 5: Common mistakes */}
      <section id="common-mistakes" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          Common Mistakes I've Seen (Don't Do These)
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <XCircle className="w-5 h-5" /> Using "_dmarc.yourdomain.com" as the host
            </p>
            <p className="text-red-700 text-sm">
              Most DNS providers automatically append your domain. If you enter "_dmarc.yourdomain.com", 
              it becomes "_dmarc.yourdomain.com.yourdomain.com". Just use "_dmarc".
            </p>
          </div>

          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <XCircle className="w-5 h-5" /> Forgetting the underscore
            </p>
            <p className="text-red-700 text-sm">
              It's <code className="bg-red-100 px-1 rounded">_dmarc</code>, not <code className="bg-red-100 px-1 rounded">dmarc</code>. 
              The underscore is required. I've seen this mistake more times than I can count.
            </p>
          </div>

          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <XCircle className="w-5 h-5" /> Starting with p=reject immediately
            </p>
            <p className="text-red-700 text-sm">
              If you jump straight to "reject" mode without monitoring first, you might accidentally block legitimate emails 
              (like marketing tools or CRMs you forgot about). Always start with <code className="bg-red-100 px-1 rounded">p=none</code>, 
              watch the reports for 2-4 weeks, then gradually move to quarantine → reject.
            </p>
          </div>

          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <XCircle className="w-5 h-5" /> Not setting up SPF and DKIM first
            </p>
            <p className="text-red-700 text-sm">
              DMARC relies on SPF and DKIM. If those aren't configured correctly, DMARC won't help. 
              <Link href="/blog/spf-dkim-set-but-not-found" className="underline"> Check our SPF/DKIM troubleshooting guide →</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist" className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
        <h2 className="text-2xl font-bold mb-6">✅ Quick DMARC Setup Checklist</h2>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span>SPF record is configured and passing</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span>DKIM is enabled and signing emails</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span>DMARC TXT record added to _dmarc subdomain</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span>Started with p=none policy</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span>Added rua email for reports</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span>Verified with DMARC checker</span>
          </label>
        </div>
      </section>

      {/* Timeline - What to expect */}
      <section className="my-12 p-6 bg-blue-50 rounded-2xl">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">What to expect next:</h3>
        <div className="space-y-3 text-blue-800">
          <p className="flex items-start gap-3">
            <span className="font-bold text-blue-600 min-w-[100px]">5-30 minutes</span>
            <span>DNS propagates, DMARC record becomes visible</span>
          </p>
          <p className="flex items-start gap-3">
            <span className="font-bold text-blue-600 min-w-[100px]">24-48 hours</span>
            <span>Start receiving aggregate reports at your rua email</span>
          </p>
          <p className="flex items-start gap-3">
            <span className="font-bold text-blue-600 min-w-[100px]">2-4 weeks</span>
            <span>Review reports, then consider moving to p=quarantine</span>
          </p>
          <p className="flex items-start gap-3">
            <span className="font-bold text-blue-600 min-w-[100px]">1-2 months</span>
            <span>If all looks good, move to p=reject for full protection</span>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Ready to check if your DMARC is set up correctly?</h3>
        <p className="text-green-100 mb-6">
          Takes 5 seconds. We'll also check your SPF and DKIM while we're at it.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-colors"
        >
          Check My Domain Now <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Bonus: FAQ */}
      <section className="my-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Can I have multiple DMARC records?</h4>
            <p className="text-gray-600 text-sm">
              No. You can only have one DMARC record per domain. If you have multiple, email providers will treat it as invalid 
              (same as having no record at all). If you need to send reports to multiple addresses, use comma-separated values 
              in the rua field.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">What's the difference between p=none, p=quarantine, and p=reject?</h4>
            <p className="text-gray-600 text-sm">
              <strong>none:</strong> Monitor only, don't affect email delivery. 
              <strong> quarantine:</strong> Send failing emails to spam folder. 
              <strong> reject:</strong> Block failing emails entirely. Always start with none and work your way up.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Do subdomains need their own DMARC record?</h4>
            <p className="text-gray-600 text-sm">
              By default, subdomains inherit the parent domain's DMARC policy. But you can add <code className="bg-gray-200 px-1 rounded">sp=</code> 
              to your DMARC record to set a different policy for subdomains, or create separate DMARC records for each subdomain that sends email.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
