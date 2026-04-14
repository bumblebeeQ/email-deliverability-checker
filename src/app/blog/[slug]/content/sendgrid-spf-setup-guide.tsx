import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, Shield } from 'lucide-react';

export default function SendgridSpfSetupGuide() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          Last Tuesday, a client pinged me at 11 PM: <strong className="text-gray-800">&quot;Our SendGrid emails 
          are all failing SPF checks. The marketing campaign goes out tomorrow morning. Help.&quot;</strong>
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          I&apos;d set up SendGrid SPF records probably 30+ times at that point. Should have been a 
          5-minute fix, right? Turns out they had three different SPF records on their domain, one 
          with a typo, and were hitting the 10-lookup limit. Classic mess.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s the thing — SendGrid SPF setup is genuinely simple when you know what you&apos;re doing. 
          But there are a few gotchas that trip up almost everyone. I&apos;m going to walk you through the 
          exact steps, show you the mistakes I see constantly, and get you to a passing SPF check 
          in about 5 minutes.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Let&apos;s get your SendGrid emails out of the spam folder.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">First — check where you stand right now</h3>
            <p className="text-blue-100 mb-4">
              Before changing anything, run a quick domain check. If your SPF is already passing, 
              you might not need this guide at all. Takes 10 seconds.
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
          <a href="#what-is-spf" className="text-blue-600 hover:underline">Quick refresher: what SPF actually does</a>
          <a href="#find-include" className="text-blue-600 hover:underline">Step 1: Find your SendGrid include value</a>
          <a href="#add-record" className="text-blue-600 hover:underline">Step 2: Add the SPF record to DNS</a>
          <a href="#multiple-services" className="text-blue-600 hover:underline">Step 3: Handle multiple email services</a>
          <a href="#verify" className="text-blue-600 hover:underline">Step 4: Verify everything works</a>
          <a href="#common-mistakes" className="text-blue-600 hover:underline">Common mistakes (I&apos;ve seen them all)</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick setup checklist</a>
        </div>
      </div>

      {/* Section: What is SPF */}
      <section id="what-is-spf" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">?</span>
          Quick Refresher: What SPF Actually Does
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Think of SPF like a guest list at a nightclub. Your domain is the club, and SPF is the 
          bouncer at the door. When Gmail or Outlook receives an email claiming to be from 
          <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">you@yourdomain.com</code>, they check 
          the SPF record to see if the sending server is on the list.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          If SendGrid&apos;s servers aren&apos;t on that list? Your email gets treated like some random person 
          trying to sneak into the club. Straight to spam. Or worse — rejected entirely.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The SPF record is just a TXT record in your DNS that says: &quot;Hey, these servers are 
          allowed to send email on behalf of my domain.&quot; That&apos;s it. Not complicated in theory — 
          but the details matter.
        </p>
      </section>

      {/* Step 1: Find SendGrid include value */}
      <section id="find-include" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          Find Your SendGrid SPF Include Value
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          This is the part that should be simple but somehow confuses people. SendGrid&apos;s SPF 
          include value is:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <code>include:sendgrid.net</code>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          That&apos;s it. Not <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">include:sendgrid.com</code>, 
          not <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">include:mail.sendgrid.net</code>, 
          not <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">include:spf.sendgrid.net</code>. 
          Just <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">sendgrid.net</code>.
        </p>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2">⚠️ I see this mistake constantly:</p>
          <p className="text-amber-700">
            People use <code className="bg-amber-100 px-1 rounded">include:sendgrid.com</code> instead of 
            <code className="bg-amber-100 px-1 rounded">include:sendgrid.net</code>. Looks right, feels right — 
            but it&apos;s wrong. The .com domain doesn&apos;t have the SPF records for their mail servers. 
            Your SPF check will pass... for none of SendGrid&apos;s IPs. Meaning it does nothing.
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          You can verify this yourself. Open a terminal and run:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
          <div><span className="text-gray-400"># Check what sendgrid.net resolves to</span></div>
          <div>dig TXT sendgrid.net +short</div>
          <div className="mt-3"><span className="text-gray-400"># You should see something like:</span></div>
          <div className="text-green-400">&quot;v=spf1 ip4:167.89.0.0/17 ip4:208.117.48.0/20 ip4:50.31.32.0/19 ...&quot;</div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          See all those IP ranges? That&apos;s SendGrid&apos;s entire sending infrastructure. When you 
          add <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">include:sendgrid.net</code> to your 
          SPF record, you&apos;re telling receiving mail servers &quot;all of these IPs are authorized to send 
          for my domain.&quot;
        </p>
      </section>

      {/* Step 2: Add to DNS */}
      <section id="add-record" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          Add the SPF Record to Your DNS
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          If you don&apos;t have any SPF record yet, this is dead simple. Go to your DNS provider 
          (Cloudflare, GoDaddy, Namecheap, Route 53 — wherever your domain lives) and add this 
          TXT record:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
          <div><span className="text-gray-400"># Add this TXT record at your root domain (@)</span></div>
          <div><span className="text-blue-300">Host:</span> @  (or leave blank, depending on your provider)</div>
          <div><span className="text-blue-300">Type:</span> TXT</div>
          <div><span className="text-blue-300">Value:</span> v=spf1 include:sendgrid.net ~all</div>
          <div><span className="text-blue-300">TTL:</span> 3600 (or &quot;Auto&quot;)</div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Let me break that down real quick:
        </p>

        <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-6">
          <li>
            <strong>v=spf1</strong> — &quot;This is an SPF record, version 1.&quot; Always starts with this. 
            No exceptions.
          </li>
          <li>
            <strong>include:sendgrid.net</strong> — &quot;SendGrid&apos;s servers are allowed to send for me.&quot;
          </li>
          <li>
            <strong>~all</strong> — &quot;Soft fail anything not on this list.&quot; This means unauthorized 
            servers won&apos;t pass SPF but won&apos;t get hard-rejected either. It&apos;s the safe starting option.
          </li>
        </ul>

        <div className="my-6 p-5 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
          <p className="font-medium text-green-800 mb-2">💡 ~all vs -all:</p>
          <p className="text-green-700">
            Use <code className="bg-green-100 px-1 rounded">~all</code> (soft fail) while you&apos;re setting 
            things up. Once you&apos;re confident everything&apos;s working — maybe after a week or two of 
            monitoring — switch to <code className="bg-green-100 px-1 rounded">-all</code> (hard fail) for 
            better protection. I usually keep <code className="bg-green-100 px-1 rounded">~all</code> for 
            the first month, honestly. Better safe than blocking legitimate emails.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Cloudflare example (since most people use it):</h3>

        <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-6">
          <li>Log into Cloudflare → select your domain → <strong>DNS</strong> tab</li>
          <li>Click <strong>&quot;Add record&quot;</strong></li>
          <li>Type: <strong>TXT</strong></li>
          <li>Name: <strong>@</strong></li>
          <li>Content: <strong>v=spf1 include:sendgrid.net ~all</strong></li>
          <li>Click <strong>Save</strong></li>
        </ol>

        <p className="text-gray-700 leading-relaxed">
          Done. That&apos;s literally it if SendGrid is your only email sender. But most people have 
          multiple services, so keep reading.
        </p>
      </section>

      {/* Step 3: Multiple services */}
      <section id="multiple-services" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          Handle Multiple Email Services
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s where it gets real. Most companies aren&apos;t just using SendGrid. You&apos;ve probably 
          got Google Workspace for team email, maybe Mailchimp for newsletters, HubSpot for marketing... 
          they all need to be in the same SPF record.
        </p>

        <div className="my-6 p-5 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
          <p className="font-medium text-red-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Critical rule: ONE SPF record per domain
          </p>
          <p className="text-red-700">
            You cannot have multiple TXT records that start with <code className="bg-red-100 px-1 rounded">v=spf1</code>. 
            If you do, <strong>both are invalid</strong>. This is the #1 mistake I see. People add a new 
            SPF record for SendGrid without checking if one already exists. Boom — everything breaks.
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Instead, combine all your services into one record. Here are the most common combos I set up:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-4">
          <div>
            <div className="text-gray-400"># SendGrid + Google Workspace</div>
            <div>v=spf1 include:sendgrid.net include:_spf.google.com ~all</div>
          </div>
          <div>
            <div className="text-gray-400"># SendGrid + Google Workspace + Mailchimp</div>
            <div>v=spf1 include:sendgrid.net include:_spf.google.com include:servers.mcsv.net ~all</div>
          </div>
          <div>
            <div className="text-gray-400"># SendGrid + Microsoft 365</div>
            <div>v=spf1 include:sendgrid.net include:spf.protection.outlook.com ~all</div>
          </div>
          <div>
            <div className="text-gray-400"># SendGrid + Google Workspace + HubSpot</div>
            <div>v=spf1 include:sendgrid.net include:_spf.google.com include:mail.hubspot.net ~all</div>
          </div>
        </div>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2">⚠️ Watch the 10-lookup limit!</p>
          <p className="text-amber-700">
            Each <code className="bg-amber-100 px-1 rounded">include:</code> triggers DNS lookups — and 
            those includes can have their own includes. SPF has a hard limit of 10 DNS lookups total. 
            Go over that and your SPF record is automatically invalid. I&apos;ve had clients with 14 
            lookups who couldn&apos;t figure out why SPF was failing — this was why.
          </p>
          <p className="text-amber-700 mt-2">
            <strong>Quick math:</strong> <code className="bg-amber-100 px-1 rounded">sendgrid.net</code> uses 
            about 3 lookups, <code className="bg-amber-100 px-1 rounded">_spf.google.com</code> uses about 3. 
            So those two together eat 6 of your 10. Add Mailchimp and you&apos;re at 8. It adds up fast.
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed">
          If you&apos;re hitting the limit, check out my article on{' '}
          <Link href="/blog/spf-lookup-limit-exceeded" className="text-blue-600 hover:underline">
            fixing the SPF lookup limit
          </Link>. The short version: you might need to flatten your SPF record or 
          replace some includes with direct IP ranges.
        </p>
      </section>

      {/* Step 4: Verify */}
      <section id="verify" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          Verify Everything Works
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Don&apos;t just save the DNS record and walk away. I&apos;ve learned this the hard way — always verify. 
          DNS changes can take anywhere from 30 seconds to a few hours to propagate, so give it 
          at least 10-15 minutes.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Method 1: Command line (fastest)</h3>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
          <div><span className="text-gray-400"># Linux/Mac</span></div>
          <div>dig TXT yourdomain.com +short</div>
          <div className="mt-3"><span className="text-gray-400"># Windows</span></div>
          <div>nslookup -type=TXT yourdomain.com</div>
          <div className="mt-3"><span className="text-gray-400"># You should see your SPF record in the output:</span></div>
          <div className="text-green-400">&quot;v=spf1 include:sendgrid.net include:_spf.google.com ~all&quot;</div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Method 2: Send a test email</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          Send a test email through SendGrid to your Gmail. Then open the email, click the three dots 
          menu → <strong>&quot;Show original&quot;</strong>. Look for these headers:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
          <div><span className="text-gray-400"># What you WANT to see:</span></div>
          <div><span className="text-green-400">Received-SPF: pass</span> (google.com: domain of bounce@yourdomain.com designates ... as permitted sender)</div>
          <div className="mt-3"><span className="text-gray-400"># What you DON&apos;T want to see:</span></div>
          <div><span className="text-red-400">Received-SPF: softfail</span></div>
          <div><span className="text-red-400">Received-SPF: fail</span></div>
          <div><span className="text-red-400">Received-SPF: permerror</span>  <span className="text-gray-400"># This means your SPF record is broken</span></div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Method 3: Use a tool (easiest)</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          Honestly, the fastest way is to just run your domain through{' '}
          <Link href="/test" className="text-blue-600 hover:underline font-medium">EmailDiag</Link>. 
          It checks SPF, DKIM, DMARC, and blacklist status all at once, and tells you exactly what&apos;s 
          wrong in plain English. I use it myself whenever I&apos;m setting up a new domain — takes the 
          guesswork out.
        </p>
      </section>

      {/* Common Mistakes */}
      <section id="common-mistakes" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">!</span>
          Common Mistakes (I&apos;ve Seen Them All)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          After helping dozens of people set up SendGrid SPF, these are the mistakes I see over and over. 
          Every. Single. Time.
        </p>

        <div className="my-6 space-y-4">
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5" /> Mistake #1: Using sendgrid.com instead of sendgrid.net
            </p>
            <p className="text-red-700 text-sm">
              I mentioned this earlier but it&apos;s worth repeating because I see it <em>so often</em>. 
              The correct value is <code className="bg-red-100 px-1 rounded">include:sendgrid.net</code>. 
              The .com domain is their website. The .net domain is their mail infrastructure. Easy to mix up.
            </p>
          </div>

          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5" /> Mistake #2: Multiple SPF records
            </p>
            <p className="text-red-700 text-sm">
              Someone adds a new TXT record for SendGrid without realizing there&apos;s already an SPF 
              record for Google Workspace. Now you have two v=spf1 records and both are invalid. 
              Always check existing records first: <code className="bg-red-100 px-1 rounded">dig TXT yourdomain.com</code>
            </p>
          </div>

          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5" /> Mistake #3: Forgetting DKIM
            </p>
            <p className="text-red-700 text-sm">
              SPF alone isn&apos;t enough in 2026. Gmail and Outlook strongly prefer emails that pass both 
              SPF <em>and</em> DKIM. SendGrid makes DKIM setup pretty easy — go to Settings → Sender 
              Authentication → Domain Authentication and follow the wizard. It gives you CNAME records 
              to add.
            </p>
          </div>

          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5" /> Mistake #4: Not authenticating your sender domain
            </p>
            <p className="text-red-700 text-sm">
              This is the one that got me early on. Adding the SPF record is step one, but you also 
              need to complete SendGrid&apos;s domain authentication process. Go to Settings → Sender 
              Authentication in the SendGrid dashboard. If you skip this, SendGrid sends emails via 
              <code className="bg-red-100 px-1 rounded">sendgrid.net</code> as the envelope sender, which 
              means SPF alignment fails even with the correct SPF record.
            </p>
          </div>

          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5" /> Mistake #5: Exceeding the 10-lookup limit
            </p>
            <p className="text-red-700 text-sm">
              You won&apos;t get an error when you save the record. Your DNS provider doesn&apos;t care. 
              But receiving mail servers will evaluate your SPF record, hit the limit, and return a 
              <code className="bg-red-100 px-1 rounded">permerror</code>. The email might still deliver — 
              but SPF is effectively broken. Use a lookup counter tool to check.
            </p>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <div className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">✅ SendGrid SPF Setup Checklist</h2>
          <p className="text-gray-400 mb-6 text-sm">Run through this every time you set up SendGrid for a new domain. I do.</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Check for existing SPF records first</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Use include:sendgrid.net (not .com!)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>One SPF record per domain only</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Include all email services in one record</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Total DNS lookups ≤ 10</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Complete SendGrid domain authentication</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Wait 10-15 min for DNS propagation</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Verify with dig/nslookup or EmailDiag</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Send test email and check headers</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Set up DKIM (domain authentication wizard)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Add DMARC record</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Received-SPF: pass in test email headers</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Not sure if it&apos;s working?</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          Run your domain through EmailDiag. We&apos;ll check your SPF record, count your DNS lookups, 
          verify DKIM and DMARC, and check blacklist status. Free, instant, no signup needed.
        </p>
        <Link 
          href="/test"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
        >
          Test My SendGrid Setup <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Wrap-up */}
      <div className="mt-8 mb-4">
        <p className="text-gray-700 leading-relaxed mb-4">
          That&apos;s the whole thing. SendGrid SPF setup really is a 5-minute job once you know the 
          right include value and avoid the common traps. The most important thing: check for existing 
          SPF records before you add anything, use <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">sendgrid.net</code> (not 
          .com), and don&apos;t forget to complete SendGrid&apos;s domain authentication wizard.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Oh, and if you&apos;re setting up SendGrid for the first time — don&apos;t stop at SPF. Set up 
          DKIM and DMARC too. In 2026, you really need all three for good deliverability. Check out 
          our guides on{' '}
          <Link href="/blog/dkim-signature-verification-failed" className="text-blue-600 hover:underline">
            DKIM setup
          </Link>{' '}and{' '}
          <Link href="/blog/dmarc-policy-not-found" className="text-blue-600 hover:underline">
            DMARC configuration
          </Link>{' '}if you need help with those.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Go get those emails into the inbox. You got this. 🚀
        </p>
      </div>
    </>
  );
}
