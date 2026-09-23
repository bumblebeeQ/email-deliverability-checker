import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react';

export default function EmailsGoingToJunkDespiteSpfDkimDmarcPass() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          A sysadmin on r/Office365 put it about as well as anyone could: <strong className="text-gray-800">
          &quot;All three pass. Green checkmarks everywhere. And it still lands in Junk. What am I even 
          fixing at this point?&quot;</strong> That question comes up constantly, and the honest answer is 
          uncomfortable: nothing about your DNS is broken. You&apos;ve been solving the wrong layer of the problem.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          SPF, DKIM, and DMARC are <em>authentication</em> checks. They answer one question: &quot;is this 
          mail actually from who it claims to be from?&quot; Once that question is answered &quot;yes,&quot; 
          the mailbox provider moves on to a completely different question — &quot;do I actually want this 
          person&apos;s mail in the inbox?&quot; That second question is about reputation and engagement, 
          and it has nothing to do with your DNS records.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          I&apos;ve watched this exact thing happen to a client&apos;s cold outreach domain — perfect 
          authentication, still 80% Junk placement in Outlook. Took me a week of poking at it before I 
          accepted that the records weren&apos;t the problem. Here&apos;s what actually was.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Let&apos;s go through it.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Want to rule out the DNS layer first?</h3>
            <p className="text-blue-100 mb-4">
              EmailDiag confirms your SPF, DKIM, and DMARC are actually configured and aligned correctly — 
              so you can stop second-guessing the records and focus on what&apos;s really causing Junk placement.
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
          <a href="#why-auth-isnt-enough" className="text-blue-600 hover:underline">Why passing authentication isn&apos;t enough</a>
          <a href="#sender-reputation" className="text-blue-600 hover:underline">Sender/domain reputation is doing the real work</a>
          <a href="#content-triggers" className="text-blue-600 hover:underline">Content and behavior triggers to check</a>
          <a href="#office365-specific" className="text-blue-600 hover:underline">Office 365 / Outlook&apos;s extra layer (SCL/ZAP)</a>
          <a href="#how-to-fix" className="text-blue-600 hover:underline">How to actually fix it</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick checklist</a>
        </div>
      </div>

      {/* Why auth isn't enough */}
      <section id="why-auth-isnt-enough" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          Why Passing Authentication Isn&apos;t Enough
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Think of SPF/DKIM/DMARC as your ID check at the door — they prove you are who you say you are. 
          But getting past the ID check doesn&apos;t mean the bouncer thinks you&apos;re a good guest. That 
          decision — inbox vs. Junk vs. outright block — is made by a completely separate filtering layer 
          that mailbox providers (Gmail, Outlook, Yahoo) run <em>after</em> authentication passes.
        </p>

        <div className="my-6 grid md:grid-cols-2 gap-3">
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">What authentication checks</p>
            <p className="text-sm text-gray-600">
              Is this really from the domain it claims to be from? Was it tampered with in transit? 
              Binary pass/fail, based purely on DNS and cryptographic signatures.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">What spam filtering checks</p>
            <p className="text-sm text-gray-600">
              Does this sender have a history of good behavior? Do recipients engage with this content? 
              Does the message itself look/read like spam? A sliding score, not pass/fail.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>A verified spammer is still a spammer.</strong> Authentication only proves identity — 
            it was never designed to prove trustworthiness. A brand-new domain with perfect SPF/DKIM/DMARC 
            sending cold outreach at volume can still get buried in Junk, because the filter has no reason 
            yet to trust it.
          </p>
        </div>
      </section>

      {/* Sender reputation */}
      <section id="sender-reputation" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          Sender/Domain Reputation Is Doing the Real Work
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Once authentication passes, mailbox providers score your sending domain and IP based on history. 
          The three factors that move this score the most:
        </p>

        <div className="my-6 space-y-4">
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Domain/IP age and warmup
            </p>
            <p className="text-orange-700 text-sm">
              A new domain or a new sending IP has no track record. Sending real volume from day one, 
              before you&apos;ve built up positive signal, reads as suspicious no matter how clean your 
              DNS is. This is the single most common cause I see for &quot;everything&apos;s configured, 
              still in Junk&quot; on domains under 60 days old.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Engagement signals
            </p>
            <p className="text-orange-700 text-sm">
              Opens, replies, and &quot;move to inbox&quot; actions tell the filter people want this mail. 
              Low open rates, high delete-without-reading rates, and especially spam-button clicks all drag 
              your reputation down — even for authenticated mail.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Complaint and bounce rate
            </p>
            <p className="text-orange-700 text-sm">
              Anything above roughly 0.1% complaint rate or 2-5% bounce rate starts actively hurting you. 
              A single bad list import can tank a domain&apos;s reputation for weeks, and DNS records can&apos;t 
              undo that.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          None of this shows up when you check SPF/DKIM/DMARC — it lives in Google Postmaster Tools, 
          Microsoft SNDS, and the provider&apos;s own internal scoring, which you can&apos;t query directly.
        </p>
      </section>

      {/* Content triggers */}
      <section id="content-triggers" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          Content and Behavior Triggers to Check
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Beyond reputation, the actual content and sending pattern of the message can trip content-based 
          filters independent of authentication:
        </p>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
            <p className="text-gray-700 text-sm">
              <strong>Link and domain reputation in the body</strong> — a perfectly authenticated email 
              linking to a flagged or brand-new domain (including URL shorteners) can still get filtered 
              based on where those links point, not who sent the mail.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
            <p className="text-gray-700 text-sm">
              <strong>Spammy phrasing and formatting</strong> — excessive urgency language, ALL CAPS 
              subject lines, too many exclamation points, or an image-heavy email with almost no text 
              still trips content classifiers, regardless of DMARC status.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
            <p className="text-gray-700 text-sm">
              <strong>Sudden volume or pattern spikes</strong> — going from 50 emails/day to 5,000/day 
              overnight looks like a compromised account or a burst campaign, even from a domain with a 
              previously solid history.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</span>
            <p className="text-gray-700 text-sm">
              <strong>Missing List-Unsubscribe header</strong> — for bulk/marketing mail, Gmail and Yahoo&apos;s 
              2024+ sender requirements treat a missing one-click unsubscribe header as a negative signal, 
              separate from authentication status.
            </p>
          </div>
        </div>
      </section>

      {/* Office 365 specific */}
      <section id="office365-specific" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          Office 365 / Outlook&apos;s Extra Layer (SCL &amp; ZAP)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          This specific complaint — &quot;everything passes but Outlook still dumps it in Junk&quot; — shows 
          up disproportionately often for Microsoft 365 recipients, and there&apos;s a reason: Exchange Online 
          Protection (EOP) runs its own scoring on top of authentication, called the <strong>Spam Confidence 
          Level (SCL)</strong>.
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-6 overflow-x-auto">
          <div className="text-sm font-mono text-green-400 space-y-1">
            <div>X-Forefront-Antispam-Report: SCL:5</div>
            <div>Authentication-Results: spf=pass dkim=pass dmarc=pass</div>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Check the <code className="bg-gray-100 px-1 rounded">X-Forefront-Antispam-Report</code> header 
          (View → Message Details in Outlook) for the <code className="bg-gray-100 px-1 rounded">SCL</code> value. 
          An SCL of 5 or 6 routes to Junk regardless of a clean <code className="bg-gray-100 px-1 rounded">dmarc=pass</code> 
          right above it in the same header block. That number is the actual placement decision — 
          authentication is just one input into it.
        </p>

        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-100 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Watch out for Zero-hour Auto Purge (ZAP).</strong> Even mail that lands in the inbox 
            initially can get retroactively moved to Junk minutes or hours later if Microsoft&apos;s 
            backend reclassifies the sender or a similar campaign gets reported elsewhere. If users say 
            &quot;it was in my inbox, then it disappeared,&quot; that&apos;s ZAP, not a delivery failure.
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed">
          If you control the receiving tenant too (internal testing, or a client relationship), a mail 
          flow rule or Enhanced Filtering setting can bypass this for known-good senders — but that only 
          helps mail you receive, not mail you send to other people&apos;s tenants.
        </p>
      </section>

      {/* How to fix */}
      <section id="how-to-fix" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          How to Actually Fix It
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Since the problem lives in reputation and content, not DNS, the fix is behavioral and takes time 
          — there&apos;s no DNS record that shortcuts this.
        </p>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
            <p className="text-gray-700 text-sm">
              <strong>Warm up new domains/IPs gradually.</strong> Start at low volume (dozens/day, not 
              thousands) to your most engaged contacts first, and ramp up over 2-4 weeks. Skipping this is 
              the #1 cause of &quot;fully authenticated, still in Junk&quot; on new domains.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
            <p className="text-gray-700 text-sm">
              <strong>Check Google Postmaster Tools and Microsoft SNDS</strong> for your actual reputation 
              score and spam-rate data — this is the only place you&apos;ll see the metrics providers use, 
              since none of it appears in your own SPF/DKIM/DMARC checks.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
            <p className="text-gray-700 text-sm">
              <strong>Clean your list before every send.</strong> Remove hard bounces and unengaged 
              addresses that haven&apos;t opened in 90+ days. A smaller list with high engagement outperforms 
              a large list with lots of silent/dead addresses on every reputation metric that matters.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</span>
            <p className="text-gray-700 text-sm">
              <strong>Add a working List-Unsubscribe header</strong> for any bulk/marketing send, and make 
              the unsubscribe link actually work in one click — this is now effectively required by Gmail 
              and Yahoo&apos;s bulk sender rules, not optional.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">5</span>
            <p className="text-gray-700 text-sm">
              <strong>Ask a few real recipients to move your mail to inbox and reply.</strong> A handful of 
              genuine positive engagement signals per campaign does more for future placement than any 
              config change — this directly trains the reputation model in your favor.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          The trap to avoid: don&apos;t keep re-checking or re-generating SPF/DKIM/DMARC records hoping one 
          more tweak fixes it. If a checker confirms all three pass and are properly aligned, that layer is 
          done. Everything else here is a reputation and content problem that only improves with time and 
          behavior change.
        </p>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <div className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">✅ Junk-Despite-Passing Checklist</h2>
          <p className="text-gray-400 mb-6 text-sm">Run through this when SPF, DKIM, and DMARC all pass but mail still lands in Junk.</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Confirmed all three actually pass AND are aligned (not just present)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Checked domain/IP age — under 60 days needs a warmup plan</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Reviewed Google Postmaster Tools / Microsoft SNDS reputation data</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Checked SCL value in X-Forefront-Antispam-Report header (Outlook recipients)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Cleaned list of hard bounces and 90+ day unengaged addresses</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Added working one-click List-Unsubscribe header for bulk mail</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Reviewed content for spammy phrasing, excessive links, or image-only body</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Ruled out a sudden volume spike compared to normal sending pattern</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Rule out the DNS layer in 10 seconds</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          EmailDiag confirms your SPF, DKIM, and DMARC are actually passing and aligned — so you know for 
          sure the problem is reputation, not configuration.
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
            <h4 className="font-semibold text-gray-800 mb-2">If SPF, DKIM, and DMARC all pass, doesn&apos;t that guarantee inbox placement?</h4>
            <p className="text-gray-600 text-sm">
              No. Authentication is a prerequisite, not a guarantee. It proves identity, not trustworthiness. 
              Mailbox providers still run reputation and content scoring after authentication passes, and 
              that scoring is what actually decides inbox vs. Junk.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">How long does domain warmup actually take?</h4>
            <p className="text-gray-600 text-sm">
              Most providers see meaningful reputation improvement within 2-4 weeks of consistent, gradually 
              increasing volume to engaged recipients. There&apos;s no way to skip this by fixing DNS faster 
              — reputation is built from behavior over time, not configuration.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Why does this happen more with Outlook/Office 365 than Gmail?</h4>
            <p className="text-gray-600 text-sm">
              Exchange Online Protection assigns an explicit Spam Confidence Level (SCL) that&apos;s visible 
              in message headers, which makes the &quot;authenticated but still filtered&quot; gap more 
              obvious to troubleshoot. Gmail does the same kind of scoring, it&apos;s just less exposed in 
              the headers you can inspect yourself.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
