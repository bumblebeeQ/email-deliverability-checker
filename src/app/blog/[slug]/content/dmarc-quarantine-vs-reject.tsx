import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, Shield, HelpCircle } from 'lucide-react';

export default function DmarcQuarantineVsReject() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          A client asked me last week: <strong className="text-gray-800">&quot;My DMARC reports look 
          clean. Should I just jump straight to p=reject and be done with it?&quot;</strong> I told him 
          to wait — and I&apos;m glad he listened, because two weeks later we found a legacy invoicing 
          tool still sending unauthenticated mail from his domain.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          <code className="bg-gray-100 px-2 py-0.5 rounded text-blue-700">p=quarantine</code> and{' '}
          <code className="bg-gray-100 px-2 py-0.5 rounded text-blue-700">p=reject</code> both protect 
          your domain from spoofing, but they fail very differently when something&apos;s misconfigured. 
          One sends the email to spam. The other makes it disappear completely — no bounce, no warning, 
          just gone.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          I&apos;ve moved dozens of domains through this exact transition. Here&apos;s the practical 
          breakdown: what each policy actually does, when to use which, and how to move from one to 
          the other without breaking anything.
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
            <h3 className="text-lg font-semibold mb-2">Not sure what policy you&apos;re currently on?</h3>
            <p className="text-blue-100 mb-4">
              Check your current DMARC record before changing anything. Takes 5 seconds and shows 
              exactly what policy is live right now.
            </p>
            <Link 
              href="/tools/dmarc-checker"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Check My DMARC Policy <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="my-10 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-4">What we&apos;ll cover:</h3>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <a href="#quick-answer" className="text-blue-600 hover:underline">The 30-second answer</a>
          <a href="#what-is-dmarc-policy" className="text-blue-600 hover:underline">DMARC policy in plain English</a>
          <a href="#quarantine" className="text-blue-600 hover:underline">What p=quarantine actually does</a>
          <a href="#reject" className="text-blue-600 hover:underline">What p=reject actually does</a>
          <a href="#comparison" className="text-blue-600 hover:underline">Side-by-side comparison table</a>
          <a href="#which-to-use" className="text-blue-600 hover:underline">Which one should YOU use?</a>
          <a href="#migration" className="text-blue-600 hover:underline">How to safely move from quarantine to reject</a>
          <a href="#mistakes" className="text-blue-600 hover:underline">5 mistakes I keep seeing</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick decision checklist</a>
        </div>
      </div>

      {/* Section: Quick Answer */}
      <section id="quick-answer" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-lg">⚡</span>
          The 30-Second Answer
        </h2>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
          <p className="text-gray-800 leading-relaxed mb-4">
            <strong>Quarantine (<code className="bg-white px-1.5 py-0.5 rounded border">p=quarantine</code>):</strong> Emails 
            that fail DMARC alignment get sent to the recipient&apos;s spam folder instead of the inbox — but 
            they still arrive. Think of it as a security guard who pats down anyone suspicious but 
            still lets them into the building, just through a side door.
          </p>
          <p className="text-gray-800 leading-relaxed">
            <strong>Reject (<code className="bg-white px-1.5 py-0.5 rounded border">p=reject</code>):</strong> Emails 
            that fail DMARC alignment get rejected outright at the receiving mail server — they never 
            arrive anywhere, not even spam. Same security guard, except now he just doesn&apos;t let 
            them in the building at all.
          </p>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <HelpCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Rule of thumb:</strong> Start with <code className="bg-gray-100 px-1 rounded">p=none</code> to 
            monitor, move to <code className="bg-gray-100 px-1 rounded">p=quarantine</code> once your reports look 
            clean, and only move to <code className="bg-gray-100 px-1 rounded">p=reject</code> after weeks of 
            quarantine with zero surprises. Never skip straight to reject.
          </p>
        </div>
      </section>

      {/* Section: What is DMARC policy */}
      <section id="what-is-dmarc-policy" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          DMARC Policy in Plain English (Quick Refresher)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Your DMARC record has a <code className="bg-gray-100 px-1 rounded">p=</code> tag that tells 
          receiving mail servers what to do when an email claims to be from your domain but fails 
          SPF and DKIM alignment. There are exactly three values:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-4 overflow-x-auto">
          <code className="text-green-400 text-sm font-mono">
            v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com; pct=100
          </code>
        </div>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 border font-medium text-gray-700">Policy value</th>
                <th className="text-left p-3 border font-medium text-gray-700">What happens to failing mail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border text-gray-700"><code className="bg-gray-100 px-1 rounded text-xs">p=none</code></td>
                <td className="p-3 border text-gray-700">Nothing — delivered normally, you just get reports</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 border text-gray-700"><code className="bg-gray-100 px-1 rounded text-xs">p=quarantine</code></td>
                <td className="p-3 border text-gray-700">Sent to spam/junk folder, still delivered</td>
              </tr>
              <tr>
                <td className="p-3 border text-gray-700"><code className="bg-gray-100 px-1 rounded text-xs">p=reject</code></td>
                <td className="p-3 border text-gray-700">Rejected at the mail server, never delivered</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-gray-700 leading-relaxed">
          This article focuses on the jump from quarantine to reject — the step people are most 
          nervous about, and rightfully so.
        </p>
      </section>

      {/* Section: Quarantine */}
      <section id="quarantine" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          What p=quarantine Actually Does
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          When a receiving server sees your DMARC record set to quarantine and gets an email that 
          fails alignment, it doesn&apos;t bounce it or drop it — it delivers the email to the 
          recipient&apos;s spam/junk folder instead of their inbox.
        </p>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2">Why this matters:</p>
          <p className="text-amber-700">
            If something in your setup is misconfigured — a legacy tool you forgot about, a new 
            marketing platform without SPF/DKIM yet — the emails still technically arrive. You (or 
            your users) can find them in spam and notice something&apos;s wrong. It&apos;s forgiving 
            while you&apos;re still tuning things.
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Example record:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-2 overflow-x-auto">
          <code className="text-amber-400 text-sm font-mono">
            v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com; pct=100
          </code>
        </div>
        <p className="text-gray-500 text-xs mb-6">This tells receivers: quarantine 100% of failing mail, and send me daily aggregate reports.</p>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <Shield className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Use <code className="bg-gray-100 px-1 rounded">pct=</code> to ramp gradually.</strong> Setting{' '}
            <code className="bg-gray-100 px-1 rounded">pct=25</code> means only 25% of failing mail gets 
            quarantined at random — a good way to test the waters before committing to 100%.
          </p>
        </div>
      </section>

      {/* Section: Reject */}
      <section id="reject" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          What p=reject Actually Does
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Reject is the strictest policy. Failing mail gets bounced at the receiving mail server — 
          it never reaches the recipient at all, not even in spam. Depending on the receiving server, 
          the sender might get a bounce notification, or the email might just silently vanish.
        </p>

        <div className="my-6 p-5 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
          <p className="font-medium text-red-800 mb-2">Why this is risky if you&apos;re not ready:</p>
          <p className="text-red-700">
            If you missed a sending source — say, an old CRM export tool, a contractor&apos;s laptop 
            using your domain, or a subdomain you forgot existed — those emails don&apos;t just look 
            suspicious anymore. They disappear completely. No spam folder to check, no bounce to 
            notice easily. This is exactly what happened to a client of mine: three weeks after 
            switching to reject, we discovered a support ticketing system had been silently failing 
            to deliver notification emails the entire time.
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Example record:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-6 overflow-x-auto">
          <code className="text-red-400 text-sm font-mono">
            v=DMARC1; p=reject; rua=mailto:dmarc@yourdomain.com; pct=100
          </code>
        </div>

        <p className="text-gray-700 leading-relaxed">
          Reject gives you the strongest protection against domain spoofing and phishing — attackers 
          can no longer send convincing fake emails that look like they came from your domain. That&apos;s 
          the whole point of DMARC. But it demands that your authentication setup is genuinely complete, 
          not just &quot;mostly working.&quot;
        </p>
      </section>

      {/* Section: Comparison table */}
      <section id="comparison" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          Side-by-Side Comparison
        </h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 border font-medium text-gray-700"></th>
                <th className="text-left p-3 border font-medium text-amber-700">p=quarantine</th>
                <th className="text-left p-3 border font-medium text-red-700">p=reject</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border text-gray-700 font-medium">Failing mail delivered?</td>
                <td className="p-3 border text-gray-700">Yes, to spam folder</td>
                <td className="p-3 border text-gray-700">No, rejected at server</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 border text-gray-700 font-medium">Spoofing protection</td>
                <td className="p-3 border text-gray-700">Strong</td>
                <td className="p-3 border text-gray-700">Strongest</td>
              </tr>
              <tr>
                <td className="p-3 border text-gray-700 font-medium">Risk if misconfigured</td>
                <td className="p-3 border text-gray-700">Low — mail is findable in spam</td>
                <td className="p-3 border text-gray-700">High — mail vanishes silently</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 border text-gray-700 font-medium">Good for</td>
                <td className="p-3 border text-gray-700">Testing/ramping after p=none</td>
                <td className="p-3 border text-gray-700">Mature, fully-mapped sending setups</td>
              </tr>
              <tr>
                <td className="p-3 border text-gray-700 font-medium">Recommended by</td>
                <td className="p-3 border text-gray-700">Intermediate step, always</td>
                <td className="p-3 border text-gray-700">Google/Yahoo bulk sender requirements (eventually)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section: Which to use */}
      <section id="which-to-use" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          Which One Should YOU Use?
        </h2>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-gray-800">Use quarantine if...</p>
              <p className="text-gray-600 text-sm">
                You just moved off p=none, you&apos;re still discovering every service that sends email 
                from your domain, or you run a small team without dedicated email infrastructure staff. 
                Quarantine is the right &quot;default&quot; for most domains for at least a month.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
            <CheckCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-gray-800">Move to reject if...</p>
              <p className="text-gray-600 text-sm">
                You&apos;ve run quarantine for at least 2-4 weeks with clean DMARC aggregate reports, 
                you&apos;ve confirmed every legitimate sending source passes SPF/DKIM alignment, and 
                your domain is a common phishing target (finance, SaaS, anything customer-facing).
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <Shield className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Note on bulk sender requirements:</strong> Google and Yahoo require DMARC enforcement 
            (quarantine or reject) at scale, but they don&apos;t require reject specifically — quarantine 
            satisfies the requirement too. Don&apos;t rush to reject just because of the deadline.
          </p>
        </div>
      </section>

      {/* Section: Migration */}
      <section id="migration" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">6</span>
          How to Safely Move From Quarantine to Reject
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          Here&apos;s the exact process I use with clients — it&apos;s slower than just flipping the 
          switch, but it&apos;s saved every one of them from a surprise outage.
        </p>

        <div className="space-y-6 mb-8">
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold text-gray-800 mb-1">1. Run p=quarantine for at least 2-4 weeks</p>
            <p className="text-gray-600 text-sm">Don&apos;t rush this. The whole point is to surface every sending source before you make failures permanent.</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold text-gray-800 mb-1">2. Read your aggregate (rua) reports every week</p>
            <p className="text-gray-600 text-sm">Look for any source IP that&apos;s failing SPF/DKIM alignment. Tools like Postmark DMARC Digests or dmarcian can parse the raw XML into something readable.</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold text-gray-800 mb-1">3. Fix every failing source you find</p>
            <p className="text-gray-600 text-sm">Add missing SPF includes, enable DKIM signing, or migrate the sender to use your subdomain properly.</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold text-gray-800 mb-2">4. Ramp reject gradually with pct=</p>
            <div className="bg-gray-900 rounded-lg p-3 mt-2">
              <code className="text-green-400 text-xs font-mono">
                v=DMARC1; p=reject; pct=10; rua=mailto:dmarc@yourdomain.com
              </code>
            </div>
            <p className="text-gray-600 text-sm mt-2">Start at 10%, watch for a week, then 50%, then 100%. Each jump gives you time to catch anything you missed.</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold text-gray-800 mb-1">5. Only go to pct=100 once reports are completely clean</p>
            <p className="text-gray-600 text-sm">Zero unexplained failures for at least a week at 50%+ before pushing to full enforcement.</p>
          </div>
        </div>
      </section>

      {/* Section: Mistakes */}
      <section id="mistakes" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">⚠</span>
          5 Mistakes I Keep Seeing
        </h2>

        <div className="space-y-6">
          <div className="border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-gray-800">Mistake #1: Jumping straight from p=none to p=reject</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Skipping quarantine entirely because &quot;the reports looked fine.&quot; Reports can look 
              clean for weeks and still miss a low-volume sender (like a quarterly billing tool) that 
              only fires occasionally.
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Fix:</strong> Always pass through quarantine first, even if you&apos;re confident.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-gray-800">Mistake #2: Not reading the aggregate reports at all</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Setting <code className="bg-gray-100 px-1 rounded">rua=</code> and then never actually 
              opening the reports. They&apos;re raw XML by default and genuinely unreadable without a 
              parser — most people give up and just guess instead.
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Fix:</strong> Use a free DMARC report parser or a service like dmarcian, EasyDMARC, 
              or Postmark&apos;s DMARC digest to turn reports into a readable dashboard.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-gray-800">Mistake #3: Forgetting subdomains</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Your main domain enforces reject, but a subdomain used by an old marketing tool inherits 
              the same policy by default — and breaks silently because nobody thought to check it.
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Fix:</strong> Use the <code className="bg-gray-100 px-1 rounded">sp=</code> tag to 
              set a separate (often more lenient) policy for subdomains until they&apos;re verified too.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-gray-800">Mistake #4: Not fixing SPF/DKIM before enforcing</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              DMARC policy is only as strong as the SPF and DKIM alignment underneath it. Moving to 
              reject with a shaky SPF setup just means legitimate mail gets blocked faster.
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Fix:</strong> Confirm SPF and DKIM both pass and align before touching the policy tag.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-gray-800">Mistake #5: Going to pct=100 immediately</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Setting <code className="bg-gray-100 px-1 rounded">p=reject; pct=100</code> the moment 
              you decide to enforce, instead of ramping. If anything was missed, it now affects every 
              single failing email instead of a sample.
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Fix:</strong> Ramp 10% → 50% → 100% over 2-3 weeks minimum.
            </p>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-lg font-bold">✓</span>
          Quick Decision Checklist
        </h2>

        <div className="bg-gray-50 rounded-xl p-6">
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded" readOnly />
              <span className="text-gray-700">You&apos;ve run p=none for at least 1-2 weeks and reviewed the reports</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded" readOnly />
              <span className="text-gray-700">SPF and DKIM both pass AND align for every legitimate sender</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded" readOnly />
              <span className="text-gray-700">Moved to p=quarantine before even considering reject</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded" readOnly />
              <span className="text-gray-700">Ran quarantine for 2-4 weeks with clean, readable reports</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded" readOnly />
              <span className="text-gray-700">Checked subdomains separately with the sp= tag if needed</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded" readOnly />
              <span className="text-gray-700">Ramping reject gradually with pct= instead of jumping to 100%</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded" readOnly />
              <span className="text-gray-700">Have a DMARC report parser or dashboard set up, not just raw XML</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Ready to check your current DMARC policy?</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          Run your domain through EmailDiag and see your exact DMARC record, policy, and alignment 
          status — free, in seconds.
        </p>
        <Link 
          href="/test"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          Check My DMARC Setup <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Wrap up */}
      <div className="mt-8 pt-8 border-t">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Wrapping Up</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Quarantine and reject both protect your domain from spoofing — the difference is what 
          happens when something&apos;s misconfigured. Quarantine forgives mistakes by dropping them 
          in spam. Reject doesn&apos;t forgive anything; it just makes the email disappear.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          That&apos;s exactly why the migration path matters more than the destination. Spend real 
          time at quarantine, read your reports, fix what&apos;s broken, then ramp reject slowly with 
          <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">pct=</code>. Rushing this step is 
          the single most common cause of &quot;our emails just stopped working&quot; incidents I get 
          called about.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Still not sure which policy you&apos;re on? Run a full diagnostic with our{' '}
          <Link href="/test" className="text-blue-600 hover:underline">free email deliverability checker</Link>. 
          It&apos;ll show you exactly what&apos;s configured right now.
        </p>
      </div>
    </>
  );
}
