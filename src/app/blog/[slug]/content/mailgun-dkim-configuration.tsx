import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, Shield } from 'lucide-react';

export default function MailgunDkimConfiguration() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          I&apos;ll be honest — the first time I set up Mailgun DKIM, I wasted an entire afternoon. 
          The records weren&apos;t propagating, I was second-guessing every hostname, and their dashboard 
          kept showing that infuriating <strong className="text-gray-800">&quot;DNS not verified&quot;</strong> status.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s what nobody tells you: Mailgun&apos;s DKIM setup is actually straightforward. 
          But there are about five different ways to screw it up, and I managed to hit most of them 
          on my first go. The SPF record uses <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">mailgun.org</code> not 
          <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">mailgun.com</code>. The MX records will 
          break your existing email if you&apos;re not careful. And don&apos;t even get me started on DKIM key lengths.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          I&apos;ve now set up Mailgun for probably 40+ domains, and I&apos;ve got the process down to about 
          10 minutes. This guide is everything I wish someone had told me — the exact steps, the 
          gotchas, and the mistakes that&apos;ll cost you hours if you don&apos;t catch them early.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Let&apos;s get your Mailgun emails actually passing authentication checks.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Before you touch anything — check your current status</h3>
            <p className="text-blue-100 mb-4">
              Run your domain through EmailDiag right now. You&apos;ll see exactly which DNS records are 
              missing, misconfigured, or working fine. Takes 10 seconds and saves you from guessing.
            </p>
            <Link 
              href="/test"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Test My Domain <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="my-10 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-4">What we&apos;ll cover:</h3>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <a href="#why-dkim" className="text-blue-600 hover:underline">Why DKIM matters for Mailgun</a>
          <a href="#add-domain" className="text-blue-600 hover:underline">Step 1: Add your domain to Mailgun</a>
          <a href="#dns-records" className="text-blue-600 hover:underline">Step 2: Add the DNS records</a>
          <a href="#verify" className="text-blue-600 hover:underline">Step 3: Verify in Mailgun dashboard</a>
          <a href="#common-mistakes" className="text-blue-600 hover:underline">Common mistakes (I&apos;ve made them)</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick setup checklist</a>
        </div>
      </div>

      {/* Section: Why DKIM */}
      <section id="why-dkim" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">?</span>
          Why DKIM Matters for Mailgun (And Why SPF Alone Isn&apos;t Enough)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Look, I used to think SPF was all I needed. Set up the TXT record, call it a day, right? 
          Wrong. Gmail, Outlook, and pretty much every major email provider in 2026 expect both 
          SPF <em>and</em> DKIM to pass. Some are starting to require DMARC too.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s the difference: SPF says &quot;this server is allowed to send for my domain.&quot; 
          DKIM says &quot;this email hasn&apos;t been tampered with in transit.&quot; It&apos;s a cryptographic 
          signature that proves your email is legit — not just that it came from an authorized server, 
          but that the content itself is authentic.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Without DKIM, you&apos;re leaving deliverability on the table. I&apos;ve seen open rates jump 
          15-20% after getting DKIM properly configured. Not because SPF was broken — just because 
          DKIM adds that extra layer of trust.
        </p>
        <p className="text-gray-700 leading-relaxed">
          And Mailgun makes it relatively easy. They generate the DKIM keys for you. You just 
          need to add the DNS records they provide.
        </p>
      </section>

      {/* Step 1: Add domain */}
      <section id="add-domain" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          Add Your Domain to Mailgun
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          First things first — log into your Mailgun dashboard. Go to 
          <strong> Sending → Domains → Add new domain</strong>.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s a decision point that trips people up:
        </p>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2">💡 Use a subdomain, not your root domain</p>
          <p className="text-amber-700 mb-3">
            Mailgun recommends using something like <code className="bg-amber-100 px-1 rounded">mg.yourdomain.com</code> or 
            <code className="bg-amber-100 px-1 rounded">mail.yourdomain.com</code> instead of 
            <code className="bg-amber-100 px-1 rounded">yourdomain.com</code>.
          </p>
          <p className="text-amber-700">
            Why? Two reasons: (1) If you ever switch email providers, you don&apos;t have to rebuild 
            sender reputation from scratch. (2) It keeps your transactional email reputation separate 
            from your regular corporate email. Trust me on this — I&apos;ve seen companies burn their 
            main domain reputation and regret it.
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Enter your domain (I&apos;ll use <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">mg.example.com</code> as 
          the example throughout this guide). Mailgun will generate all the DNS records you need.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          You&apos;ll see something like this in the domain details page:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-3">
          <div className="text-gray-400"># DKIM Record (the main one you need)</div>
          <div><span className="text-blue-300">Type:</span> TXT</div>
          <div><span className="text-blue-300">Hostname:</span> k1._domainkey.mg.example.com</div>
          <div><span className="text-blue-300">Value:</span> k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQ...</div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          That <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">k1._domainkey</code> hostname is important. 
          The <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">k1</code> part is the selector — Mailgun 
          assigns this uniquely to your domain. Don&apos;t change it.
        </p>
      </section>

      {/* Step 2: Add DNS records */}
      <section id="dns-records" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          Add the DNS Records to Your Provider
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Mailgun gives you several DNS records. Let me break down what each one does and which 
          ones you actually need.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">The DKIM TXT Record (Required)</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          This is the main event. Add this TXT record in your DNS provider:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
          <div><span className="text-blue-300">Host:</span> k1._domainkey.mg (or whatever Mailgun shows)</div>
          <div><span className="text-blue-300">Type:</span> TXT</div>
          <div><span className="text-blue-300">Value:</span> k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQ...</div>
          <div><span className="text-blue-300">TTL:</span> 3600 or Auto</div>
        </div>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2">⚠️ Key length matters:</p>
          <p className="text-amber-700">
            Mailgun uses 2048-bit DKIM keys by default. Some DNS providers (looking at you, GoDaddy) 
            have character limits that truncate these long keys. If your DKIM keeps failing after 
            you&apos;ve added everything correctly, check if the value got cut off. The fix: contact 
            Mailgun support to generate a 1024-bit key instead, or switch DNS providers.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">The SPF Record (Required)</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          Add this TXT record at your subdomain root:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
          <div><span className="text-blue-300">Host:</span> mg (or your subdomain)</div>
          <div><span className="text-blue-300">Type:</span> TXT</div>
          <div><span className="text-blue-300">Value:</span> v=spf1 include:mailgun.org ~all</div>
        </div>

        <div className="my-6 p-5 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
          <p className="font-medium text-red-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Critical: It&apos;s mailgun.org, NOT mailgun.com
          </p>
          <p className="text-red-700">
            I see this mistake constantly. The SPF include uses <code className="bg-red-100 px-1 rounded">mailgun.org</code>. 
            Not .com. The .org domain has the SPF records for their mail servers. The .com is just 
            their website. This will silently fail — no error, just SPF won&apos;t pass for Mailgun IPs.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">The CNAME Record for Tracking (Optional but Recommended)</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          This lets Mailgun track opens and clicks with your own domain instead of theirs:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
          <div><span className="text-blue-300">Host:</span> email.mg</div>
          <div><span className="text-blue-300">Type:</span> CNAME</div>
          <div><span className="text-blue-300">Value:</span> mailgun.org</div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">The MX Records (Only If Using Mailgun for Receiving)</h3>

        <div className="my-6 p-5 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
          <p className="font-medium text-red-800 mb-2">⚠️ Careful with MX records!</p>
          <p className="text-red-700">
            Mailgun provides MX records: <code className="bg-red-100 px-1 rounded">mxa.mailgun.org</code> and 
            <code className="bg-red-100 px-1 rounded">mxb.mailgun.org</code>. <strong>Do not add these if 
            you already have MX records for your domain!</strong> You&apos;ll break your existing email.
          </p>
          <p className="text-red-700 mt-2">
            If you&apos;re using Google Workspace or Microsoft 365 for email, those MX records need to stay. 
            Since you&apos;re (hopefully) using a subdomain like mg.yourdomain.com, this shouldn&apos;t be an 
            issue — the MX records would only go on the subdomain. But I&apos;ve seen people accidentally 
            add them to their root domain. Chaos ensues.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Cloudflare Example</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          Most people use Cloudflare these days, so here&apos;s exactly how it looks:
        </p>

        <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-6">
          <li>Log into Cloudflare → select your domain → <strong>DNS</strong> tab</li>
          <li>Click <strong>&quot;Add record&quot;</strong></li>
          <li>Add each record from Mailgun one at a time</li>
          <li>For the DKIM TXT record, paste the <em>full</em> value including the <code className="bg-gray-100 px-1 rounded">k=rsa; p=...</code> part</li>
          <li>Make sure proxy status is <strong>DNS only</strong> (gray cloud) for email records</li>
        </ol>

        <p className="text-gray-700 leading-relaxed">
          I&apos;ve messed this up before by leaving the proxy on (orange cloud) for MX records. 
          Email stopped working entirely. Keep everything DNS-only for mail-related records.
        </p>
      </section>

      {/* Step 3: Verify */}
      <section id="verify" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          Verify in Mailgun Dashboard
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          After adding all the records, go back to the Mailgun dashboard. Click 
          <strong> &quot;Verify DNS Settings&quot;</strong> next to your domain.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s the thing that drove me crazy the first time: DNS propagation can take 
          <em> up to 48 hours</em>. But in practice, it&apos;s usually 10-30 minutes. If Mailgun 
          shows unverified right away, don&apos;t panic. Go grab coffee, come back, try again.
        </p>

        <div className="my-6 p-5 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
          <p className="font-medium text-green-800 mb-2">✅ What success looks like:</p>
          <ul className="text-green-700 text-sm space-y-1">
            <li>• DKIM: <span className="font-medium text-green-800">Verified</span> (green checkmark)</li>
            <li>• SPF: <span className="font-medium text-green-800">Verified</span></li>
            <li>• MX: <span className="font-medium text-green-800">Verified</span> (if you added them)</li>
            <li>• CNAME: <span className="font-medium text-green-800">Verified</span> (for tracking)</li>
          </ul>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Send a Test Email</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          The dashboard verification is nice, but I always send an actual test email. Use Mailgun&apos;s 
          test feature or send through your application:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
          <div><span className="text-gray-400"># Quick test via curl</span></div>
          <div>curl -s --user &apos;api:YOUR_API_KEY&apos; \</div>
          <div>  https://api.mailgun.net/v3/mg.example.com/messages \</div>
          <div>  -F from=&apos;Excited User &lt;me@mg.example.com&gt;&apos; \</div>
          <div>  -F to=&apos;YOUR_EMAIL@gmail.com&apos; \</div>
          <div>  -F subject=&apos;DKIM Test&apos; \</div>
          <div>  -F text=&apos;Testing DKIM configuration&apos;</div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Open the email in Gmail, click the three dots → <strong>&quot;Show original&quot;</strong>, and 
          look for:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
          <div><span className="text-green-400">DKIM-Signature: v=1; a=rsa-sha256; d=mg.example.com; s=k1; ...</span></div>
          <div><span className="text-green-400">d=mg.example.com; s=k1;</span> <span className="text-gray-400"># domain and selector</span></div>
          <div className="mt-2"><span className="text-green-400">Authentication-Results: mx.google.com;</span></div>
          <div><span className="text-green-400">       dkim=pass</span> header.i=@mg.example.com header.s=k1</div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          See <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">dkim=pass</code>? You&apos;re golden. 
          If you see <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">dkim=fail</code> or 
          <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">dkim=neutral</code>, check out our 
          <Link href="/blog/dkim-signature-verification-failed" className="text-blue-600 hover:underline">
            DKIM troubleshooting guide
          </Link>.
        </p>
      </section>

      {/* Common Mistakes */}
      <section id="common-mistakes" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">!</span>
          Common Mistakes (I&apos;ve Made Most of These)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          After setting up Mailgun DKIM dozens of times, here are the mistakes I see over and over. 
          And yes, I&apos;ve personally made at least half of these.
        </p>

        <div className="my-6 space-y-4">
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5" /> Mistake #1: Using mailgun.com for SPF
            </p>
            <p className="text-red-700 text-sm">
              I&apos;ve mentioned this twice already because it&apos;s that common. The SPF include is 
              <code className="bg-red-100 px-1 rounded">include:mailgun.org</code>. Using .com will not 
              throw an error, but SPF will silently fail. Check your SPF record: it should have 
              <code className="bg-red-100 px-1 rounded">mailgun.org</code> in it.
            </p>
          </div>

          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5" /> Mistake #2: Using root domain instead of subdomain
            </p>
            <p className="text-red-700 text-sm">
              Sending from <code className="bg-red-100 px-1 rounded">you@yourdomain.com</code> through 
              Mailgun is risky. If your Mailgun reputation takes a hit (spam complaints, bounces), 
              it affects your entire domain — including your regular corporate email. Always use 
              a subdomain like <code className="bg-red-100 px-1 rounded">mg.yourdomain.com</code>.
            </p>
          </div>

          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5" /> Mistake #3: Adding MX records to root domain
            </p>
            <p className="text-red-700 text-sm">
              If you already have email set up through Google Workspace or Microsoft 365, do NOT add 
              Mailgun&apos;s MX records to your root domain. You&apos;ll break your existing email. The MX 
              records should only go on the subdomain you&apos;re using for Mailgun.
            </p>
          </div>

          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5" /> Mistake #4: DKIM key gets truncated
            </p>
            <p className="text-red-700 text-sm">
              Some DNS providers have character limits on TXT record values. A 2048-bit DKIM key is 
              long — I&apos;ve seen it get cut off silently. Then DKIM verification fails and you&apos;re 
              pulling your hair out. If verification keeps failing, check that the full key is actually 
              saved in DNS. Compare character counts if you have to.
            </p>
          </div>

          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5" /> Mistake #5: Forgetting to click &quot;Verify DNS Settings&quot;
            </p>
            <p className="text-red-700 text-sm">
              This one&apos;s embarrassing but I&apos;ve done it. Added all the records, walked away, 
              assumed it was working. Came back a week later to find Mailgun still showed 
              &quot;Unverified&quot; because I never clicked the verify button. Don&apos;t be like me.
            </p>
          </div>

          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5" /> Mistake #6: Not setting up DMARC after DKIM
            </p>
            <p className="text-red-700 text-sm">
              DKIM is great, but in 2026 you really should have DMARC too. It tells receivers what to 
              do when SPF or DKIM fail, and gives you visibility through reports. Start with 
              <code className="bg-red-100 px-1 rounded">v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com</code> for 
              monitoring, then gradually increase enforcement. Check out our{' '}
              <Link href="/blog/dmarc-policy-not-found" className="text-blue-600 hover:underline">
                DMARC setup guide
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <div className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">✅ Mailgun DKIM Setup Checklist</h2>
          <p className="text-gray-400 mb-6 text-sm">Run through this every time. I keep it bookmarked.</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Use subdomain (mg.yourdomain.com)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Add domain in Mailgun dashboard</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Copy DKIM TXT record exactly</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Check DKIM key not truncated</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>SPF uses mailgun.org (not .com!)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Add CNAME for tracking (optional)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>MX only on subdomain (if needed)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Set DNS records to &quot;DNS only&quot;</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Wait 10-30 min for propagation</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Click &quot;Verify DNS Settings&quot;</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Send test email to Gmail</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Confirm dkim=pass in headers</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Set up DMARC record</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Verify Your Mailgun Setup in 10 Seconds</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          Not sure if DKIM, SPF, and DMARC are all working correctly? Run your domain through 
          EmailDiag. We&apos;ll check everything and tell you exactly what needs fixing.
        </p>
        <Link 
          href="/test"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
        >
          Test My Mailgun Setup <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Wrap-up */}
      <div className="mt-8 mb-4">
        <p className="text-gray-700 leading-relaxed mb-4">
          That&apos;s the whole Mailgun DKIM setup. The key things to remember: use a subdomain, 
          make sure SPF has <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">mailgun.org</code> not 
          .com, and always verify the DKIM key didn&apos;t get truncated. The whole thing should take 
          you about 10-15 minutes if you&apos;re setting it up for the first time.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Once you&apos;ve got DKIM working, don&apos;t stop there. Set up DMARC too — it&apos;s the missing 
          piece that ties SPF and DKIM together and gives you visibility into authentication failures. 
          And if you&apos;re hitting the{' '}
          <Link href="/blog/spf-lookup-limit-exceeded" className="text-blue-600 hover:underline">
            SPF lookup limit
          </Link> because of too many includes, check out our guide on flattening SPF records.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Now go send those emails with confidence. 🚀
        </p>
      </div>
    </>
  );
}
