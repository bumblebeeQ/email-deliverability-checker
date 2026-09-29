import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function GooglePostmasterToolsDomainReputationLowFix() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          Logged into Google Postmaster Tools last month expecting nothing interesting, and there it was: 
          <strong className="text-gray-800"> domain reputation sitting at &quot;Low.&quot;</strong> No warning, 
          no email, just a graph that had quietly dropped over about two weeks. Authentication was clean. 
          Nothing had obviously changed. And yet there it was in red.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          If you&apos;re staring at the same thing right now, the good news is that &quot;Low&quot; is a 
          recoverable state, not a permanent flag — but the fix depends entirely on figuring out which of 
          a handful of causes actually triggered it. Guessing and changing five things at once just makes 
          it harder to tell what worked.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s how I actually traced mine back to the cause, and the exact recovery process that 
          took it from Low back to Medium/High over about three weeks.
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
            <h3 className="text-lg font-semibold mb-2">Before diagnosing reputation, rule out authentication</h3>
            <p className="text-blue-100 mb-4">
              EmailDiag confirms your SPF, DKIM, and DMARC are actually configured correctly — so you know 
              for sure a low Postmaster Tools score isn&apos;t hiding a simple DNS problem underneath it.
            </p>
            <Link 
              href="/test"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Check My Domain <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="my-10 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-4">What we&apos;ll cover:</h3>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <a href="#what-domain-reputation-means" className="text-blue-600 hover:underline">What &quot;domain reputation&quot; actually measures</a>
          <a href="#common-causes" className="text-blue-600 hover:underline">The most common causes of a drop</a>
          <a href="#how-to-diagnose" className="text-blue-600 hover:underline">How to diagnose which cause is yours</a>
          <a href="#the-fix" className="text-blue-600 hover:underline">The actual fix, step by step</a>
          <a href="#how-long" className="text-blue-600 hover:underline">How long recovery really takes</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick checklist</a>
        </div>
      </div>

      {/* What it means */}
      <section id="what-domain-reputation-means" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          What &quot;Domain Reputation&quot; Actually Measures
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Google Postmaster Tools reports domain reputation as one of four buckets: <strong>High</strong>, 
          <strong> Medium</strong>, <strong>Low</strong>, or <strong>Bad</strong>. It&apos;s a rolling, 
          fuzzy signal Gmail derives from real recipient behavior on mail from your domain over roughly the 
          trailing 24-48 hours — not a fixed score you can query precisely, and not something authentication 
          checks touch at all.
        </p>

        <div className="my-6 grid md:grid-cols-2 gap-3">
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">What it&apos;s built from</p>
            <p className="text-sm text-gray-600">
              Spam complaint rate, user engagement (opens, replies, &quot;not spam&quot; clicks), and how 
              Gmail users have historically treated mail from your domain in aggregate.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">What it&apos;s NOT built from</p>
            <p className="text-sm text-gray-600">
              SPF/DKIM/DMARC status, DNS configuration, or anything about your website. This is a pure 
              behavioral signal that lives entirely on Google&apos;s side.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>&quot;Low&quot; directly affects inbox placement for Gmail recipients specifically.</strong> 
            It doesn&apos;t mean your domain is blocked everywhere — it means Gmail, based on recent 
            recipient behavior, is currently routing more of your mail to spam or applying stricter filtering 
            than it would for a domain with High reputation.
          </p>
        </div>
      </section>

      {/* Common causes */}
      <section id="common-causes" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          The Most Common Causes of a Drop
        </h2>

        <div className="my-6 space-y-4">
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> A sudden volume or list-quality change
            </p>
            <p className="text-orange-700 text-sm">
              Sent a bigger campaign than usual, imported a purchased or scraped list, or re-activated a 
              dormant list without re-permission. Any of these spikes bounce rate and complaint rate in the 
              same window, which is exactly what tanks this score.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Rising spam complaint rate
            </p>
            <p className="text-orange-700 text-sm">
              Check the &quot;Spam Rate&quot; graph in Postmaster Tools directly — Google&apos;s own threshold 
              guidance flags anything consistently above 0.3% as a problem, and above 0.1% as worth watching 
              closely. This is usually the single biggest driver of a reputation drop.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> A compromised account or open relay sending on your behalf
            </p>
            <p className="text-orange-700 text-sm">
              If a mailbox on your domain got compromised (phished credentials, leaked SMTP password) and 
              started sending spam through your legitimate infrastructure, it will pass SPF/DKIM/DMARC fine 
              — because it&apos;s genuinely sending as you — while destroying your reputation in the process.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Shared IP contamination (if using a shared-IP ESP)
            </p>
            <p className="text-orange-700 text-sm">
              Postmaster Tools reports domain reputation separately from IP reputation, but if you&apos;re on 
              a shared sending IP and another tenant on that IP gets flagged heavily, it can drag down the 
              broader delivery environment your mail travels through, indirectly affecting engagement metrics.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Low engagement from a stale list, even with no complaints
            </p>
            <p className="text-orange-700 text-sm">
              Complaints aren&apos;t the only input. If most of your recipients simply never open, never 
              reply, and never move your mail out of spam when it lands there, that silence itself reads as 
              a negative signal over time — it doesn&apos;t require an active complaint to hurt you.
            </p>
          </div>
        </div>
      </section>

      {/* How to diagnose */}
      <section id="how-to-diagnose" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          How to Diagnose Which Cause Is Yours
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Don&apos;t guess — Postmaster Tools gives you enough graphs to actually narrow this down before 
          you change anything:
        </p>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
            <p className="text-gray-700 text-sm">
              <strong>Open the Spam Rate graph first.</strong> Look for a spike that lines up with the date 
              your domain reputation started dropping. If you see one, cross-reference it against your own 
              send history — what campaign went out that day?
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
            <p className="text-gray-700 text-sm">
              <strong>Check the Authentication graph.</strong> If SPF/DKIM/DMARC pass rates suddenly dropped 
              at the same time, that&apos;s a strong signal something unauthorized (or a broken config change) 
              started sending. If authentication stayed clean throughout, the problem is content/engagement, 
              not a sending-source issue.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
            <p className="text-gray-700 text-sm">
              <strong>Check the Delivery Errors graph.</strong> A spike in errors (especially 
              rate-limiting/temporary-block type errors from Gmail) around the same date usually confirms 
              Gmail itself started actively pushing back on your volume, not just filtering to spam quietly.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</span>
            <p className="text-gray-700 text-sm">
              <strong>Pull your own send logs for that exact window.</strong> Look specifically for: a bigger 
              batch than normal, a list segment you don&apos;t normally email, or any account/API key that 
              could have been compromised. Nine times out of ten the cause is sitting in your own logs.
            </p>
          </div>
        </div>
      </section>

      {/* The fix */}
      <section id="the-fix" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          The Actual Fix, Step by Step
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Once you know the cause, recovery is mostly about stopping the behavior that caused it and letting 
          time and clean sending rebuild the signal — there&apos;s no shortcut or override button.
        </p>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
            <p className="text-gray-700 text-sm">
              <strong>Stop sending to the problem segment immediately.</strong> If a specific list or 
              campaign caused the spike, pause it entirely rather than just reducing volume. Continuing to 
              send to a bad segment while reputation is Low compounds the problem daily.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
            <p className="text-gray-700 text-sm">
              <strong>If it was a compromised account, rotate every credential now.</strong> Change SMTP/API 
              passwords, revoke and reissue API keys, and check for any forwarding rules or OAuth grants an 
              attacker might have added to keep access after a password change.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
            <p className="text-gray-700 text-sm">
              <strong>Sunset or suppress unengaged addresses.</strong> Remove anyone who hasn&apos;t opened 
              in 90+ days from active sends, and don&apos;t re-add them without a genuine re-permission step. 
              A smaller, more engaged list recovers reputation faster than a large stale one.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</span>
            <p className="text-gray-700 text-sm">
              <strong>Drop volume back to your pre-spike baseline, then ramp slowly.</strong> Resume sending 
              only to your most engaged recipients first for a week or two, then gradually reintroduce 
              broader segments as the reputation graph trends back up.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">5</span>
            <p className="text-gray-700 text-sm">
              <strong>Make unsubscribing genuinely one-click.</strong> A working <code className="bg-gray-200 px-1 rounded">List-Unsubscribe</code> 
              header reduces the chance frustrated recipients hit the spam button instead — every spam click 
              hurts far more than a clean unsubscribe.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          The trap to avoid: don&apos;t respond to a Low reputation score by switching to a brand-new sending 
          domain or IP to &quot;start fresh.&quot; That resets you to zero reputation with no history at all, 
          which mailbox providers treat with just as much suspicion as a known-bad one — you&apos;ve traded 
          one problem for a different, equally slow one.
        </p>
      </section>

      {/* How long */}
      <section id="how-long" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          How Long Recovery Really Takes
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Postmaster Tools reputation is a trailing signal, so it lags your actual behavior change — don&apos;t 
          panic if it doesn&apos;t move for the first several days after you fix the root cause.
        </p>

        <div className="my-6 grid md:grid-cols-3 gap-3">
          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
            <p className="font-semibold text-green-800 mb-1">Minor, short-lived spike</p>
            <p className="text-sm text-green-700">Often recovers in 1-2 weeks once the bad segment is removed and volume normalizes.</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
            <p className="font-semibold text-amber-800 mb-1">Sustained complaint issue</p>
            <p className="text-sm text-amber-700">Typically 3-4 weeks of consistently clean sending before it fully trends back to High.</p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 mb-1">Compromise / abuse incident</p>
            <p className="text-sm text-red-700">Can take 4-6+ weeks, especially if the domain briefly hit &quot;Bad&quot; rather than just Low.</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Watch for a lag, not a cliff.</strong> Expect the graph to stay flat for several days 
            after you fix the cause, then start climbing gradually rather than jumping straight back to High. 
            If it&apos;s still flat-at-Low after 3+ weeks of genuinely clean sending, re-check for a second, 
            separate cause you might have missed.
          </p>
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <div className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">✅ Domain Reputation Recovery Checklist</h2>
          <p className="text-gray-400 mb-6 text-sm">Run through this when Google Postmaster Tools shows Low or Bad reputation.</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Checked Spam Rate graph for a spike matching the reputation drop date</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Checked Authentication graph for any unexplained pass-rate drop</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Reviewed own send logs for the exact window the drop started</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Ruled out or confirmed a compromised account/API key</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Paused the specific list/campaign that triggered the spike</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Suppressed 90+ day unengaged addresses from active sending</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Reduced volume to baseline and ramped back up gradually</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Avoided switching to a fresh domain/IP as a shortcut</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Rule out authentication before you chase reputation</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          EmailDiag confirms SPF, DKIM, and DMARC are correctly configured and aligned — so you can be sure 
          a low Postmaster Tools score isn&apos;t masking a simple DNS fix.
        </p>
        <Link 
          href="/test"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
        >
          Test My Domain <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Bonus: Quick FAQ */}
      <section className="my-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Is Low domain reputation the same as being blacklisted?</h4>
            <p className="text-gray-600 text-sm">
              No. Blacklisting is a separate, third-party system (Spamhaus, Barracuda, etc.) that can 
              actively block delivery. Low domain reputation in Postmaster Tools is Gmail-specific filtering 
              behavior based on recipient engagement — it affects placement, not whether mail is accepted at all.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Does IP reputation matter separately from domain reputation?</h4>
            <p className="text-gray-600 text-sm">
              Yes, Postmaster Tools reports them as two distinct metrics. A dedicated IP with clean history 
              can sometimes offset a temporarily low domain reputation, and vice versa — but if you&apos;re 
              on shared IPs, you have far less control over that half of the equation.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">My reputation shows &quot;no data&quot; instead of a rating — what does that mean?</h4>
            <p className="text-gray-600 text-sm">
              That means your domain isn&apos;t sending enough volume to Gmail addresses for a reliable 
              rating yet, not that something is wrong. Postmaster Tools needs a meaningful daily volume 
              threshold before it will display a reputation bucket at all.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
