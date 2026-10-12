import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react';

export default function SharedVsDedicatedIpEmailSendingReputation() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          Someone asked in r/EmailMarketing something I get asked constantly in client calls: 
          <strong className="text-gray-800"> &quot;Should I pay extra for a dedicated IP, or is shared 
          fine? Our sales rep at the ESP keeps pushing dedicated.&quot;</strong> That last part is the tell 
          — ESPs make more money selling dedicated IPs, so the advice you get from a sales rep isn&apos;t 
          always the advice that fits your actual volume.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          The honest answer is that dedicated IPs are the right call for a specific, fairly narrow set of 
          senders, and actively the wrong call for everyone else. Picking wrong in either direction has a 
          real reputation cost — low-volume senders tank a dedicated IP through inactivity, and 
          high-volume senders drag down their reputation sharing a pool with bad actors.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          I watched a client switch to dedicated too early once, send barely 2,000 emails a week on it, and 
          watch deliverability actually get worse than it was on shared. Here&apos;s the volume threshold 
          that actually matters, and how to tell which side of it you&apos;re on.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Let&apos;s break it down.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Whichever IP setup you choose, authentication still matters</h3>
            <p className="text-blue-100 mb-4">
              EmailDiag confirms your SPF, DKIM, and DMARC are correctly configured — a prerequisite for 
              good reputation on either shared or dedicated IPs.
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
          <a href="#how-each-works" className="text-blue-600 hover:underline">How reputation works differently on each</a>
          <a href="#shared-pros-cons" className="text-blue-600 hover:underline">Shared IP: pros and cons</a>
          <a href="#dedicated-pros-cons" className="text-blue-600 hover:underline">Dedicated IP: pros and cons</a>
          <a href="#the-volume-threshold" className="text-blue-600 hover:underline">The volume threshold that actually matters</a>
          <a href="#how-to-decide" className="text-blue-600 hover:underline">How to decide for your situation</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick checklist</a>
        </div>
      </div>

      {/* How each works */}
      <section id="how-each-works" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          How Reputation Works Differently on Each
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Mailbox providers score sending IPs based on history — complaint rates, bounce rates, spam trap 
          hits, and engagement. The difference between shared and dedicated is simply <em>whose</em> 
          history that score reflects.
        </p>

        <div className="my-6 grid md:grid-cols-2 gap-3">
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">Shared IP</p>
            <p className="text-sm text-gray-600">
              The reputation score is a blend of <em>every sender</em> on that IP pool. Your own clean 
              sending can&apos;t fully offset another tenant sending spam from the same pool — and vice 
              versa, their good behavior can carry you.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">Dedicated IP</p>
            <p className="text-sm text-gray-600">
              The reputation score reflects only your own sending history. Nobody else&apos;s behavior 
              affects you — but you also have zero history to lean on when you start, and have to build 
              it entirely yourself.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Most major ESPs (SendGrid, Mailgun, Postmark, SES) pre-warm their shared pools</strong> 
            with a long history of mixed, generally-legitimate traffic. That history is exactly why shared 
            IPs often outperform a brand-new dedicated IP for the first several weeks — you&apos;re borrowing 
            an established reputation instead of building one from zero.
          </p>
        </div>
      </section>

      {/* Shared pros cons */}
      <section id="shared-pros-cons" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          Shared IP: Pros and Cons
        </h2>

        <div className="my-6 grid md:grid-cols-2 gap-3">
          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
            <p className="font-semibold text-green-800 mb-2">Pros</p>
            <ul className="text-sm text-green-700 space-y-1.5 list-disc pl-4">
              <li>No warmup period needed — benefits from the pool&apos;s existing history immediately</li>
              <li>No cost to maintain reputation during low-volume periods or seasonal gaps</li>
              <li>ESP actively monitors and manages the pool&apos;s overall health for you</li>
              <li>Lower cost — usually included in standard ESP pricing tiers</li>
            </ul>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 mb-2">Cons</p>
            <ul className="text-sm text-red-700 space-y-1.5 list-disc pl-4">
              <li>Vulnerable to other tenants on the same pool sending spam or hitting spam traps</li>
              <li>Less control — you can&apos;t isolate your sending behavior from the pool&apos;s average</li>
              <li>Harder to pin down the exact cause when deliverability dips (could be you, could be a neighbor)</li>
              <li>Reputable ESPs rotate/remove bad tenants, but there&apos;s always some lag</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Dedicated pros cons */}
      <section id="dedicated-pros-cons" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          Dedicated IP: Pros and Cons
        </h2>

        <div className="my-6 grid md:grid-cols-2 gap-3">
          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
            <p className="font-semibold text-green-800 mb-2">Pros</p>
            <ul className="text-sm text-green-700 space-y-1.5 list-disc pl-4">
              <li>Full control — your reputation reflects only your own behavior</li>
              <li>Easier to diagnose problems — any dip is unambiguously about your own sending</li>
              <li>At scale, a well-maintained reputation outperforms any shared pool long-term</li>
              <li>Required by some providers (Gmail Postmaster-style guidance) above very high volume thresholds</li>
            </ul>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 mb-2">Cons</p>
            <ul className="text-sm text-red-700 space-y-1.5 list-disc pl-4">
              <li>Requires a proper warmup period (typically 2-4+ weeks) before full volume is safe</li>
              <li>Reputation decays if volume drops — inconsistent/seasonal sending actively hurts it</li>
              <li>You own 100% of the recovery effort if something goes wrong (no pool to dilute a mistake)</li>
              <li>Additional cost on top of standard ESP pricing</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Volume threshold */}
      <section id="the-volume-threshold" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          The Volume Threshold That Actually Matters
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Most ESPs and deliverability consultants converge on a rough consensus number, even though exact 
          figures vary by provider:
        </p>

        <div className="my-6 overflow-x-auto">
          <table className="w-full text-sm border rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left font-semibold text-gray-800">Sending volume</th>
                <th className="p-3 text-left font-semibold text-gray-800">Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr className="bg-white">
                <td className="p-3 text-gray-700">Under ~50,000 emails/month</td>
                <td className="p-3 text-green-700 font-medium">Stay on shared</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 text-gray-700">~50,000–100,000/month</td>
                <td className="p-3 text-amber-700 font-medium">Gray zone — depends on consistency</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 text-gray-700">Consistently 100,000+/month</td>
                <td className="p-3 text-blue-700 font-medium">Dedicated starts making sense</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 text-gray-700">1 million+/month</td>
                <td className="p-3 text-blue-700 font-medium">Dedicated strongly recommended</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-100">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Volume alone isn&apos;t the whole picture — consistency matters just as much.</strong> A 
            dedicated IP needs steady daily sending to maintain the reputation you build. A domain sending 
            150,000 emails one week and 20,000 the next will actually fare worse on dedicated than a domain 
            sending a flat 60,000/week, because reputation decays during low-activity gaps.
          </p>
        </div>
      </section>

      {/* How to decide */}
      <section id="how-to-decide" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          How to Decide for Your Situation
        </h2>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
            <p className="text-gray-700 text-sm">
              <strong>Choose shared if</strong> your volume is under ~50k/month, your sending is seasonal or 
              inconsistent, you&apos;re a new sender without an established list, or you don&apos;t have the 
              operational bandwidth to actively manage a warmup schedule.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
            <p className="text-gray-700 text-sm">
              <strong>Choose dedicated if</strong> you consistently send 100k+/month, you&apos;ve had 
              repeated unexplained deliverability dips on shared that line up with no changes on your end 
              (a sign of pool contamination), or you&apos;re at a scale where a single bad actor on a shared 
              pool could meaningfully hurt a business-critical sending program.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">!</span>
            <p className="text-gray-700 text-sm">
              <strong>If you do go dedicated, budget 2-4 weeks for warmup</strong> before relying on it for 
              full volume — start with your most engaged segment at low daily volume, and increase gradually 
              as inbox placement and engagement metrics stay healthy. Skipping warmup is the most common way 
              a new dedicated IP ends up performing worse than the shared pool it replaced.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          One more option some ESPs offer: a <strong>dedicated IP pool shared only among your own sending 
          sources</strong> (e.g. separate transactional vs. marketing IPs within your own account). This 
          isolates your transactional mail from marketing campaign reputation risk without the full warmup 
          burden of a single dedicated IP — worth asking your ESP about if you&apos;re near the volume 
          threshold but want some separation.
        </p>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <div className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">✅ Shared vs. Dedicated Decision Checklist</h2>
          <p className="text-gray-400 mb-6 text-sm">Run through this before switching IP strategy.</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Calculated actual monthly sending volume (not peak, average)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Assessed how consistent that volume is week-to-week</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Checked if unexplained deliverability dips correlate with no changes on your own end</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Confirmed capacity to run a 2-4 week warmup if going dedicated</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Asked ESP about a per-account dedicated pool as a middle-ground option</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Verified SPF/DKIM/DMARC are correctly set up regardless of IP choice</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Get the authentication layer right first</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          Whether you&apos;re on shared or dedicated, SPF/DKIM/DMARC need to be correctly configured and 
          aligned. EmailDiag checks all three in 10 seconds, free.
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
            <h4 className="font-semibold text-gray-800 mb-2">Can I switch back to shared if dedicated isn&apos;t working out?</h4>
            <p className="text-gray-600 text-sm">
              Yes, most ESPs let you switch back. You&apos;ll immediately inherit the shared pool&apos;s 
              established reputation again, which is often an improvement if your dedicated IP never fully 
              warmed up or volume dropped unexpectedly. There&apos;s no penalty for switching back.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Does domain reputation matter separately from IP reputation?</h4>
            <p className="text-gray-600 text-sm">
              Yes — Gmail and other major providers increasingly weight domain-level reputation alongside 
              IP reputation, partly because IP-based signals got less reliable as cloud/shared hosting grew. 
              A strong domain reputation can partially offset a newer or shared IP, and vice versa.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Should I use separate dedicated IPs for marketing vs. transactional email?</h4>
            <p className="text-gray-600 text-sm">
              At high volume, yes — this is standard practice. It isolates transactional mail (password 
              resets, receipts, which recipients expect and rarely mark as spam) from marketing campaign 
              risk, so a bad campaign doesn&apos;t threaten delivery of critical transactional messages.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
