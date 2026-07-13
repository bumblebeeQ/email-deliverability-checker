import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, Shield, Clock } from 'lucide-react';

export default function ColdEmailDeliverabilityTips() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          A sales lead messaged me last month: <strong className="text-gray-800">&quot;We just started 
          cold outreach on our main domain and now our regular business emails are landing in spam 
          too. What did we break?&quot;</strong>
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          They hadn&apos;t broken anything technically — they&apos;d just made the single most common 
          cold email mistake: sending cold outreach from the exact same domain used for everyday 
          business communication. One aggressive campaign later, their whole domain&apos;s reputation 
          took the hit.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Cold email deliverability plays by different rules than regular email. You&apos;re messaging 
          people who never opted in and have zero relationship with you, which means spam filters 
          are watching every signal much more closely. Here&apos;s what actually keeps cold email out 
          of spam, in the order I&apos;d fix things.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Let&apos;s get into it.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">First — check your sending domain&apos;s health</h3>
            <p className="text-blue-100 mb-4">
              Before touching your outreach sequence, confirm SPF, DKIM, and DMARC are solid on 
              whatever domain you&apos;re about to use. Takes 10 seconds.
            </p>
            <Link 
              href="/test"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Check My Domain Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="my-10 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-4">What we&apos;ll cover:</h3>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <a href="#why-different" className="text-blue-600 hover:underline">Why cold email is riskier than regular email</a>
          <a href="#tip-separate-domain" className="text-blue-600 hover:underline">Tip #1: Never use your main domain</a>
          <a href="#tip-warmup" className="text-blue-600 hover:underline">Tip #2: Warm up before you send at volume</a>
          <a href="#tip-auth" className="text-blue-600 hover:underline">Tip #3: Full authentication, no shortcuts</a>
          <a href="#tip-volume" className="text-blue-600 hover:underline">Tip #4: Sending limits and pacing</a>
          <a href="#tip-content" className="text-blue-600 hover:underline">Tip #5: Content and personalization</a>
          <a href="#tip-monitoring" className="text-blue-600 hover:underline">Tip #6: Monitor bounce and reply signals</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick checklist before you hit send</a>
        </div>
      </div>

      {/* Section: Why different */}
      <section id="why-different" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">!</span>
          Why Cold Email Is Riskier Than Regular Email
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          With a newsletter, people opted in — there&apos;s at least some trust baked in. With cold 
          outreach, every single recipient is a stranger to your domain. That flips a few things:
        </p>

        <div className="my-6 space-y-4">
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Zero prior relationship signal
            </p>
            <p className="text-red-700 text-sm">
              Spam filters weigh whether the recipient has emailed you before, opened your emails 
              before, or added you to contacts. Cold email starts at zero on all of these.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Higher spam complaint risk
            </p>
            <p className="text-red-700 text-sm">
              Recipients who didn&apos;t ask for your email are far more likely to hit &quot;Report Spam&quot; 
              than someone who joined your list voluntarily — even if your message is relevant.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Volume looks unusual by definition
            </p>
            <p className="text-red-700 text-sm">
              You&apos;re typically sending to many new addresses you&apos;ve never contacted before, all 
              at once — which is exactly the pattern spam filters are built to catch.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          None of this means cold email is impossible to land well. It just means you need more 
          discipline around infrastructure than a typical marketing send. Here&apos;s the priority order.
        </p>
      </section>

      {/* Tip #1: Separate domain */}
      <section id="tip-separate-domain" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          Never Use Your Main Domain for Cold Outreach
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          This is the fix that would have saved the sales lead who messaged me. Cold email carries 
          real reputation risk, and you don&apos;t want that risk anywhere near the domain your team 
          uses for invoices, support, and password resets.
        </p>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2">The standard setup professional outbound teams use:</p>
          <p className="text-amber-700">
            Register a small number of look-alike domains (e.g. <code className="bg-amber-100 px-1 rounded">tryacme.com</code>, <code className="bg-amber-100 px-1 rounded">acmehq.com</code>) 
            dedicated purely to cold outreach. If one gets burned from aggressive sending, your primary 
            domain — and your actual business email — is never affected.
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-5 mb-2 overflow-x-auto">
          <div className="text-sm font-mono">
            <span className="text-gray-500">// ✅ Separate infrastructure</span>
            <br />
            <span className="text-green-400">Main domain: acme.com (invoices, support, product)</span>
            <br />
            <span className="text-green-400">Cold outreach: tryacme.com, acmehq.com (sales sequences only)</span>
          </div>
        </div>
        <p className="text-gray-500 text-xs mb-6">Each outreach domain gets its own mailbox, its own warm-up, and its own reputation to burn if things go wrong.</p>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <Shield className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Don&apos;t use free email domains either.</strong> A cold email from a random Gmail 
            or Outlook address looks unprofessional and gets flagged fast. Use a real domain you 
            own, just not your main one.
          </p>
        </div>
      </section>

      {/* Tip #2: Warmup */}
      <section id="tip-warmup" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          Warm Up Before You Send at Volume
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          A brand-new domain or mailbox has zero reputation. Sending 500 cold emails from it on day 
          one is the fastest way to land in spam permanently. Warm-up builds trust gradually before 
          you scale.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 border font-medium text-gray-700">Week</th>
                <th className="text-left p-3 border font-medium text-gray-700">Daily volume</th>
                <th className="text-left p-3 border font-medium text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border text-gray-700">1</td>
                <td className="p-3 border text-gray-700">5-10</td>
                <td className="p-3 border text-gray-700">Send to colleagues/friends who&apos;ll reply and mark as &quot;not spam&quot;</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 border text-gray-700">2</td>
                <td className="p-3 border text-gray-700">15-25</td>
                <td className="p-3 border text-gray-700">Mix in real prospects, keep replies coming where possible</td>
              </tr>
              <tr>
                <td className="p-3 border text-gray-700">3</td>
                <td className="p-3 border text-gray-700">30-50</td>
                <td className="p-3 border text-gray-700">Monitor bounce rate closely, pause if it climbs</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 border text-gray-700">4+</td>
                <td className="p-3 border text-gray-700">50-100 per mailbox</td>
                <td className="p-3 border text-gray-700">Standard sustainable ceiling per mailbox for most providers</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-gray-700 leading-relaxed">
          Automated warm-up tools (Warmy, Mailwarm, Instantly&apos;s built-in warm-up, etc.) simulate 
          real back-and-forth conversations to speed this up. Worth using if you&apos;re warming up 
          multiple mailboxes at once.
        </p>
      </section>

      {/* Tip #3: Authentication */}
      <section id="tip-auth" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          Full Authentication, No Shortcuts
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Because cold email already carries more risk, spam filters give it zero benefit of the 
          doubt on authentication. SPF and DKIM both need to pass and align, and DMARC needs to be 
          published — even if you keep it at <code className="bg-gray-100 px-1 rounded">p=none</code> for 
          now.
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-4 overflow-x-auto">
          <code className="text-green-400 text-sm font-mono">
            v=spf1 include:_spf.google.com ~all
          </code>
        </div>
        <p className="text-gray-500 text-xs mb-6">Example for a Google Workspace outreach domain — adjust the include for whichever provider hosts your outreach mailboxes.</p>

        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
          <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Set up your outreach domain the same day you register it</strong> — SPF, DKIM, DMARC, 
            and MX records — before creating any mailboxes on it. Fixing authentication after you&apos;ve 
            already started sending is much harder to recover from.
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed">
          If you&apos;re not sure whether your outreach domain is fully set up, run it through{' '}
          <Link href="/test" className="text-blue-600 hover:underline">EmailDiag&apos;s free checker</Link> before your first campaign, not after your first complaint.
        </p>
      </section>

      {/* Tip #4: Volume and pacing */}
      <section id="tip-volume" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          Sending Limits and Pacing
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Even after warm-up, cold email works better spread across multiple mailboxes and multiple 
          domains than blasted from one address.
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <p className="text-gray-700 text-sm">
              <strong>Keep it around 30-50 emails per mailbox per day</strong> for cold outreach — 
              higher on Google Workspace/Microsoft 365 gets flagged faster than most people expect.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <p className="text-gray-700 text-sm">
              <strong>Spread sends across the day</strong>, not all at once. Most sequencing tools 
              (Instantly, Smartlead, Lemlist) have built-in randomized delays between sends — use them.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <p className="text-gray-700 text-sm">
              <strong>Use multiple mailboxes on multiple outreach domains</strong> for real volume 
              (500+/day) instead of pushing one mailbox past its limit.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <Clock className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Don&apos;t rush a campaign deadline by cranking volume.</strong> A missed sales 
            target is recoverable. A burned domain takes weeks to rebuild.
          </p>
        </div>
      </section>

      {/* Tip #5: Content */}
      <section id="tip-content" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          Content and Personalization
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Content matters more in cold email than almost anywhere else, because engagement is the 
          strongest signal offsetting the lack of relationship history.
        </p>

        <div className="my-6 grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 rounded-xl">
            <p className="font-semibold text-red-800 mb-3 flex items-center gap-2">
              <XCircle className="w-5 h-5" /> Avoid
            </p>
            <ul className="space-y-2 text-sm text-red-700">
              <li>• Identical templates sent to hundreds of people</li>
              <li>• Tracking pixels/link shorteners in every email</li>
              <li>• Attachments in the first message</li>
              <li>• Spammy subject lines (&quot;Quick question!!!&quot;, all caps)</li>
              <li>• Sending the exact same sequence from 10 mailboxes simultaneously</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <p className="font-semibold text-green-800 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" /> Do instead
            </p>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Vary subject lines and opening lines per send</li>
              <li>• Keep tracking minimal — one open pixel max, no link shorteners</li>
              <li>• Plain text or near-plain-text formatting</li>
              <li>• Specific, relevant subject lines tied to the recipient</li>
              <li>• A real, monitored reply-to address</li>
            </ul>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          Plain-text-style emails with light personalization consistently outperform heavily designed 
          HTML templates in cold outreach — both for spam filters and for actual reply rates.
        </p>
      </section>

      {/* Tip #6: Monitoring */}
      <section id="tip-monitoring" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">6</span>
          Monitor Bounce and Reply Signals Daily
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Cold email reputation can turn bad within a single day of sending. Check these numbers 
          every single day you&apos;re actively sending, not weekly:
        </p>

        <div className="my-6 grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white border-2 border-green-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="font-semibold text-green-800">Bounce rate</p>
            </div>
            <p className="text-3xl font-bold text-green-700 mb-1">&lt; 3%</p>
            <p className="text-sm text-gray-600">Above 5% is a hard stop — pause and clean your list immediately.</p>
          </div>
          <div className="p-4 bg-white border-2 border-green-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="font-semibold text-green-800">Reply rate</p>
            </div>
            <p className="text-3xl font-bold text-green-700 mb-1">&gt; 1%</p>
            <p className="text-sm text-gray-600">Even negative replies help — they prove real humans are reading your emails.</p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Always verify email addresses before sending (NeverBounce, ZeroBounce, or your sequencing 
          tool&apos;s built-in verifier) — a stale or scraped list is the #1 cause of bounce rate spikes 
          in cold outreach specifically.
        </p>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <div className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">✅ Cold Email Pre-Launch Checklist</h2>
          <p className="text-gray-400 mb-6 text-sm">Run through this before your first cold outreach campaign.</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Using a dedicated outreach domain, not your main domain</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>SPF, DKIM, DMARC set up before the domain sends its first email</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Mailboxes warmed up for at least 2-3 weeks before real volume</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Email list verified — no scraped or unverified addresses</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Volume capped around 30-50/day per mailbox</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Sends spread throughout the day, not batched at once</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Subject lines and copy varied across sends</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Minimal tracking — no link shorteners, one open pixel max</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Bounce rate and reply rate monitored daily</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Real, monitored reply-to address on every mailbox</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Launching a cold outreach domain?</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          Run it through EmailDiag first — check SPF, DKIM, DMARC, and blacklist status before your 
          first campaign, not after your first complaint. Free, takes 10 seconds.
        </p>
        <Link 
          href="/test"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
        >
          Test My Domain <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Wrap-up */}
      <div className="mt-8 mb-4">
        <p className="text-gray-700 leading-relaxed mb-4">
          Cold email deliverability comes down to treating infrastructure with more care than content — 
          separate domains, real warm-up, airtight authentication, and disciplined pacing beat any 
          clever subject line trick.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Get the infrastructure right first, and your reply rates will follow — because your emails 
          are actually reaching the inbox instead of getting quietly buried before anyone sees them.
        </p>
      </div>
    </>
  );
}
