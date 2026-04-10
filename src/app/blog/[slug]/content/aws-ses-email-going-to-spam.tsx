import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, Shield, Mail } from 'lucide-react';

export default function AwsSesEmailGoingToSpam() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          So last month I pushed a SaaS app to production. Stripe payments working, database humming, 
          everything looking great. Then I get a Slack message from my co-founder: 
          <strong className="text-gray-800"> &quot;Hey, none of the signup confirmation emails are arriving.&quot;</strong>
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Turns out they <em>were</em> arriving — straight into the spam folder. Every. Single. One. 
          Welcome emails, password resets, invoice receipts. All of them sitting in Gmail&apos;s spam folder 
          with that lovely yellow warning banner.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          I spent the next 3 hours digging through AWS SES docs, Stack Overflow threads, and about 
          15 &quot;helpful&quot; forum posts that all said different things. Honestly, I almost gave up and 
          switched to SendGrid. But I figured it out, and now I want to save you those 3 hours.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Here&apos;s exactly what was wrong and how I fixed my SES emails landing in spam — step by step.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Before we start — check your domain health</h3>
            <p className="text-blue-100 mb-4">
              Run a quick test to see if your SPF, DKIM, and DMARC are properly configured for SES. 
              Takes 10 seconds and might save you an hour of debugging.
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
          <a href="#why-ses-spam" className="text-blue-600 hover:underline">Why SES emails land in spam</a>
          <a href="#fix-sandbox" className="text-blue-600 hover:underline">Fix #1: Get out of the sandbox</a>
          <a href="#fix-auth" className="text-blue-600 hover:underline">Fix #2: Email authentication (SPF/DKIM/DMARC)</a>
          <a href="#fix-dedicated-ip" className="text-blue-600 hover:underline">Fix #3: Dedicated IP + warm-up</a>
          <a href="#fix-content" className="text-blue-600 hover:underline">Fix #4: Clean up your content</a>
          <a href="#fix-reputation" className="text-blue-600 hover:underline">Fix #5: Monitor sender reputation</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick troubleshooting checklist</a>
        </div>
      </div>

      {/* Section: Why SES Emails Land in Spam */}
      <section id="why-ses-spam" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">!</span>
          Why SES Emails Land in Spam
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s the deal — AWS SES is actually a solid email service. Amazon sends billions of 
          emails through it. But there are some SES-specific gotchas that catch everyone:
        </p>

        <div className="my-6 space-y-4">
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Shared IP addresses
            </p>
            <p className="text-red-700 text-sm">
              By default, SES sends your emails from shared IPs. If someone else on that same IP 
              has been blasting spam, your emails get punished too. It&apos;s like having a bad roommate 
              who trashes the apartment — your landlord blames both of you.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Sandbox mode
            </p>
            <p className="text-red-700 text-sm">
              New SES accounts start in sandbox mode. You can only send to verified email addresses. 
              If you didn&apos;t realize this and your app is trying to send to real users... nothing works.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Default MAIL FROM domain
            </p>
            <p className="text-red-700 text-sm">
              SES uses <code className="bg-red-100 px-1 rounded">amazonses.com</code> as the default 
              MAIL FROM domain. Spam filters see this and immediately get suspicious — it doesn&apos;t 
              match your From address, which looks sketchy.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Missing authentication
            </p>
            <p className="text-red-700 text-sm">
              SES gives you the tools for SPF, DKIM, and DMARC — but it doesn&apos;t set them all up 
              automatically. If you skipped the DNS configuration, your emails are basically unsigned letters 
              from a stranger.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          The good news? Every single one of these is fixable. Let&apos;s go through them one by one.
        </p>
      </section>

      {/* Fix #1: Sandbox */}
      <section id="fix-sandbox" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          Get Out of the SES Sandbox
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          This one tripped me up the first time I used SES. I had everything configured, sent a test email 
          to my personal Gmail — worked perfectly! Then deployed to production and... nothing. No errors 
          in CloudWatch, no bounces, just silence.
        </p>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2">The thing is:</p>
          <p className="text-amber-700">
            In sandbox mode, SES only delivers to <strong>verified</strong> email addresses. Your test 
            emails work because you verified your own address. But real users? Their emails silently 
            vanish. No error, no bounce — just gone.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">How to request production access:</h3>

        <ol className="list-decimal pl-6 space-y-3 text-gray-700 mb-6">
          <li>Open the <strong>AWS SES Console</strong> → go to <strong>Account Dashboard</strong></li>
          <li>You&apos;ll see a banner saying you&apos;re in sandbox mode. Click <strong>&quot;Request Production Access&quot;</strong></li>
          <li>Fill in the form:
            <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
              <li><strong>Mail type:</strong> Choose &quot;Transactional&quot; if you&apos;re sending signup/password emails</li>
              <li><strong>Website URL:</strong> Your actual production site</li>
              <li><strong>Use case description:</strong> Be specific. &quot;We send order confirmations and password resets to registered users&quot; is way better than &quot;marketing emails&quot;</li>
              <li><strong>Expected volume:</strong> Be honest. Start low — you can always increase later</li>
            </ul>
          </li>
          <li>Submit and wait. Usually takes 24-48 hours. Sometimes they ask follow-up questions.</li>
        </ol>

        <div className="my-6 p-5 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
          <p className="font-medium text-green-800 mb-2">💡 Pro tip:</p>
          <p className="text-green-700">
            Mention that you have a bounce/complaint handling process, that you only email opted-in users, 
            and that you have an unsubscribe mechanism. AWS reviews these manually, and showing you&apos;ve 
            thought about best practices speeds up approval.
          </p>
        </div>
      </section>

      {/* Fix #2: Authentication */}
      <section id="fix-auth" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          Set Up Proper Email Authentication
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          This was the big one for me. I had verified my domain in SES and thought that was enough. 
          Nope. You need SPF, DKIM, <em>and</em> DMARC properly configured, plus a custom MAIL FROM domain. 
          Let me walk through each one.
        </p>

        {/* Custom MAIL FROM */}
        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Step 1: Set a custom MAIL FROM domain</h3>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          By default, SES sends from <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">amazonses.com</code>. 
          This causes SPF alignment failures because the MAIL FROM domain doesn&apos;t match your From header. 
          Fix this first.
        </p>

        <p className="text-gray-700 leading-relaxed mb-2">
          In SES Console → Verified Identities → your domain → MAIL FROM Domain, set it to something like:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <code>mail.yourdomain.com</code>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Then add these DNS records:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
          <div><span className="text-gray-400"># MX record for MAIL FROM</span></div>
          <div>mail.yourdomain.com  MX  10 feedback-smtp.us-east-1.amazonses.com</div>
          <div className="mt-3"><span className="text-gray-400"># SPF record for MAIL FROM</span></div>
          <div>mail.yourdomain.com  TXT  &quot;v=spf1 include:amazonses.com ~all&quot;</div>
        </div>

        {/* SPF */}
        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Step 2: SPF record on your main domain</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          You also want an SPF record on your root domain. If you&apos;re using other email services 
          (like Google Workspace), include them all:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <code>v=spf1 include:amazonses.com include:_spf.google.com ~all</code>
        </div>

        {/* DKIM */}
        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Step 3: Enable Easy DKIM</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          This is actually the easiest part. In SES Console → Verified Identities → your domain → 
          Authentication tab → click <strong>&quot;Generate DKIM tokens&quot;</strong>. SES gives you 3 CNAME records. 
          Add all three to your DNS:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
          <div><span className="text-gray-400"># DKIM CNAME records (SES generates unique tokens for you)</span></div>
          <div>abc123._domainkey.yourdomain.com  CNAME  abc123.dkim.amazonses.com</div>
          <div>def456._domainkey.yourdomain.com  CNAME  def456.dkim.amazonses.com</div>
          <div>ghi789._domainkey.yourdomain.com  CNAME  ghi789.dkim.amazonses.com</div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Wait for DNS propagation (usually 15-60 minutes), then SES will show a green &quot;Verified&quot; 
          status next to DKIM. That&apos;s it.
        </p>

        {/* DMARC */}
        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Step 4: Add a DMARC record</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          SES doesn&apos;t set this up for you, and honestly this is the one most people forget. 
          Without DMARC, Gmail and Outlook have no policy to follow when SPF or DKIM checks fail. 
          They tend to just spam everything.
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
          <div><span className="text-gray-400"># Add this TXT record at _dmarc.yourdomain.com</span></div>
          <div>_dmarc.yourdomain.com  TXT  &quot;v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@yourdomain.com; pct=100&quot;</div>
        </div>

        <div className="my-6 p-5 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
          <p className="text-blue-800">
            <strong>Real talk:</strong> Start with <code className="bg-blue-100 px-1 rounded">p=none</code> if 
            you&apos;re nervous about blocking legitimate emails. Monitor the reports for a week, then 
            move to <code className="bg-blue-100 px-1 rounded">p=quarantine</code> and eventually <code className="bg-blue-100 px-1 rounded">p=reject</code>.
          </p>
        </div>
      </section>

      {/* Fix #3: Dedicated IP */}
      <section id="fix-dedicated-ip" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          Use a Dedicated IP (And Warm It Up)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          If you&apos;re sending more than a few thousand emails per day, a dedicated IP is worth it. 
          With shared IPs, your reputation is tied to everyone else on that IP. One bad actor can 
          tank your deliverability overnight.
        </p>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2">⚠️ Warning: Don&apos;t skip the warm-up!</p>
          <p className="text-amber-700">
            A brand-new dedicated IP has zero reputation. If you blast 50,000 emails from it on day one, 
            every provider will flag you as spam immediately. You need to warm it up gradually.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">IP warm-up schedule that works:</h3>

        <div className="my-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Day</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Daily Volume</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr><td className="border border-gray-200 px-4 py-2">1-2</td><td className="border border-gray-200 px-4 py-2">200</td><td className="border border-gray-200 px-4 py-2">Send to your most engaged users first</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-4 py-2">3-4</td><td className="border border-gray-200 px-4 py-2">500</td><td className="border border-gray-200 px-4 py-2">Monitor bounce rates closely</td></tr>
              <tr><td className="border border-gray-200 px-4 py-2">5-7</td><td className="border border-gray-200 px-4 py-2">1,000</td><td className="border border-gray-200 px-4 py-2">Check Google Postmaster Tools</td></tr>
              <tr className="bg-gray-50"><td className="border border-gray-200 px-4 py-2">8-10</td><td className="border border-gray-200 px-4 py-2">5,000</td><td className="border border-gray-200 px-4 py-2">Pause if bounce rate spikes above 5%</td></tr>
              <tr><td className="border border-gray-200 px-4 py-2">11-14</td><td className="border border-gray-200 px-4 py-2">10,000+</td><td className="border border-gray-200 px-4 py-2">Gradually increase to your target volume</td></tr>
            </tbody>
          </table>
        </div>

        <p className="text-gray-700 leading-relaxed mt-4">
          SES also offers <strong>managed warm-up</strong> through its virtual deliverability manager. 
          It automatically splits traffic between the shared pool and your dedicated IP during the 
          warm-up period. Honestly, it&apos;s worth the extra cost if you don&apos;t want to babysit this process.
        </p>
      </section>

      {/* Fix #4: Content */}
      <section id="fix-content" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          Clean Up Your Email Content
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Even with perfect authentication, crappy content will land you in spam. I learned this the hard 
          way when my transactional emails were passing all SPF/DKIM/DMARC checks but <em>still</em> getting 
          flagged. Turned out my HTML template was a mess.
        </p>

        <div className="my-6 grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 rounded-xl">
            <p className="font-semibold text-red-800 mb-3 flex items-center gap-2">
              <XCircle className="w-5 h-5" /> Spam triggers to avoid
            </p>
            <ul className="space-y-2 text-sm text-red-700">
              <li>• &quot;FREE&quot;, &quot;Act Now&quot;, &quot;Limited Time&quot; in subject</li>
              <li>• ALL CAPS SUBJECT LINES!!!</li>
              <li>• Image-only emails (no text)</li>
              <li>• Shortened URLs (bit.ly, etc.)</li>
              <li>• Missing unsubscribe link</li>
              <li>• Huge HTML with tiny actual content</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <p className="font-semibold text-green-800 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" /> Do this instead
            </p>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Clear, descriptive subject lines</li>
              <li>• 60/40 text-to-image ratio minimum</li>
              <li>• Plain text version alongside HTML</li>
              <li>• Full URLs to your actual domain</li>
              <li>• Visible unsubscribe link</li>
              <li>• Clean, minimal HTML templates</li>
            </ul>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          For SES specifically — always include both HTML and plain text versions with your <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">SendEmail</code> API 
          call. Here&apos;s how:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`// Node.js with AWS SDK v3
const params = {
  Source: "noreply@yourdomain.com",
  Destination: { ToAddresses: [recipientEmail] },
  Message: {
    Subject: { Data: "Your order confirmation #1234" },
    Body: {
      Html: { Data: htmlContent },
      Text: { Data: plainTextContent }  // Don't skip this!
    }
  },
  ConfigurationSetName: "production-tracking"
};`}</pre>
        </div>
      </section>

      {/* Fix #5: Reputation */}
      <section id="fix-reputation" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          Monitor Your Sender Reputation
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          This is the part most people set and forget. But your sender reputation can degrade over time, 
          and SES gives you great tools to catch problems early.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Set up a Configuration Set</h3>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          If you&apos;re not using Configuration Sets, you&apos;re flying blind. They let you track bounces, 
          complaints, deliveries, and opens. Create one in the SES console and attach it to every email 
          you send (like in the code example above).
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">The numbers that matter:</h3>

        <div className="my-6 grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white border-2 border-green-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="font-semibold text-green-800">Bounce rate</p>
            </div>
            <p className="text-3xl font-bold text-green-700 mb-1">&lt; 5%</p>
            <p className="text-sm text-gray-600">SES will suspend your account above 10%. Keep it under 5% to be safe. Under 2% is ideal.</p>
          </div>
          <div className="p-4 bg-white border-2 border-green-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="font-semibold text-green-800">Complaint rate</p>
            </div>
            <p className="text-3xl font-bold text-green-700 mb-1">&lt; 0.1%</p>
            <p className="text-sm text-gray-600">This is the big one. SES flags accounts above 0.1%. Above 0.5% and you&apos;re getting suspended.</p>
          </div>
        </div>

        <div className="my-6 p-5 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
          <p className="text-blue-800">
            <strong>Honestly?</strong> Set up SNS notifications for bounces and complaints from day one. 
            Hook them up to a Lambda that automatically removes bounced addresses from your database. 
            This single automation saved me more headaches than everything else combined.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Also monitor these:</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
          <li><strong>SES Account Dashboard</strong> — Check your sending quota and reputation status daily during ramp-up</li>
          <li><a href="https://postmaster.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Postmaster Tools</a> — See how Gmail views your domain reputation</li>
          <li><a href="https://sendersupport.olc.protection.outlook.com/snds/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Microsoft SNDS</a> — Check your status with Outlook/Hotmail</li>
        </ul>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <div className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">✅ SES Spam Troubleshooting Checklist</h2>
          <p className="text-gray-400 mb-6 text-sm">Run through this when your SES emails hit spam. I keep this bookmarked.</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Out of SES sandbox (production access)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Custom MAIL FROM domain set</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>SPF record includes amazonses.com</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Easy DKIM enabled (3 CNAME records)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>DMARC record published</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Dedicated IP warmed up (if applicable)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Configuration Set attached to all sends</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Bounce rate &lt; 5%, complaint rate &lt; 0.1%</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Both HTML and plain text versions sent</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>No spam trigger words in subject/body</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>SNS notifications for bounces/complaints</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Unsubscribe link in all marketing emails</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Still landing in spam?</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          Run your domain through EmailDiag — we&apos;ll check your SPF, DKIM, DMARC, blacklist status, 
          and more. Free, takes 10 seconds, and it&apos;ll tell you exactly what&apos;s wrong.
        </p>
        <Link 
          href="/test"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
        >
          Test My Email Setup <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Wrap-up */}
      <div className="mt-8 mb-4">
        <p className="text-gray-700 leading-relaxed mb-4">
          Look, I know SES deliverability feels overwhelming when you&apos;re first dealing with it. 
          But honestly, most spam issues come down to the same 2-3 problems: missing authentication, 
          sandbox mode, or bad content practices. Fix those and you&apos;re 90% of the way there.
        </p>
        <p className="text-gray-700 leading-relaxed">
          I went from 100% of my SES emails hitting spam to a 98%+ inbox placement rate in about a week. 
          It just takes a bit of patience and methodical debugging. You got this.
        </p>
      </div>
    </>
  );
}
