import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react';

export default function EmailWarmUpNewDomainSchedule() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          Someone in r/smallbusiness asked exactly the question I get most about new domains: 
          <strong className="text-gray-800"> &quot;We just migrated to a new sending domain. Can I just 
          blast our full list of 40,000 subscribers today, or is there actually a waiting period?&quot;</strong> 
          There is, and skipping it is the single most common way a perfectly configured new domain ends up 
          buried in spam folders within its first week.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          A brand-new domain has zero sending history. Mailbox providers have no basis to trust it yet, and 
          a sudden flood of mail from an unknown source is exactly what spam campaigns look like from the 
          outside — even when it&apos;s completely legitimate. Warmup exists to build that trust gradually, 
          in a pattern providers actually recognize as normal.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          I&apos;ve run this exact schedule for new client domains more times than I can count. Here&apos;s 
          the actual day-by-day plan, not just &quot;start slow and increase gradually.&quot;
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
            <h3 className="text-lg font-semibold mb-2">Before you warm up, confirm authentication is solid</h3>
            <p className="text-blue-100 mb-4">
              EmailDiag checks SPF, DKIM, and DMARC on your new domain — fix any gaps before day one of 
              warmup, not after you&apos;ve already started sending.
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
          <a href="#before-you-start" className="text-blue-600 hover:underline">What to set up before day one</a>
          <a href="#the-schedule" className="text-blue-600 hover:underline">The actual warmup schedule</a>
          <a href="#who-to-send-to-first" className="text-blue-600 hover:underline">Who to send to first (this matters more than volume)</a>
          <a href="#what-to-watch" className="text-blue-600 hover:underline">What to monitor during warmup</a>
          <a href="#common-mistakes" className="text-blue-600 hover:underline">Common mistakes that reset the clock</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick checklist</a>
        </div>
      </div>

      {/* Before you start */}
      <section id="before-you-start" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          What to Set Up Before Day One
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Warmup fixes a reputation problem, not a configuration problem — so fix configuration first. 
          Starting warmup with broken authentication just means you&apos;re patiently building reputation 
          for a domain that still bounces or lands in spam for unrelated reasons.
        </p>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
            <p className="text-gray-700 text-sm">
              <strong>SPF, DKIM, and DMARC all configured and passing</strong> — not just present, actually 
              aligned. A warmup period won&apos;t fix an authentication gap, it&apos;ll just run alongside it.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
            <p className="text-gray-700 text-sm">
              <strong>DMARC set to p=none initially</strong>, with reporting (rua) enabled, so you can watch 
              real alignment data without risking legitimate mail getting rejected while you&apos;re still 
              confirming everything works.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
            <p className="text-gray-700 text-sm">
              <strong>List cleaned of hard bounces and stale addresses</strong> before you send a single 
              email. Any list quality problem gets amplified during warmup, when every bounce and complaint 
              carries more weight against a thin reputation history.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
            <p className="text-gray-700 text-sm">
              <strong>Google Postmaster Tools and Microsoft SNDS set up</strong> for the new domain, even 
              though they&apos;ll show little/no data initially — you want them already in place so you can 
              watch metrics develop from day one instead of setting them up reactively after a problem shows up.
            </p>
          </div>
        </div>
      </section>

      {/* The schedule */}
      <section id="the-schedule" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          The Actual Warmup Schedule
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          This is a 4-week schedule that works well for most new domains sending to an existing (not 
          purchased) list. Scale the absolute numbers up or down based on your eventual target volume — 
          the <em>shape</em> of the curve matters more than the exact numbers.
        </p>

        <div className="my-6 overflow-x-auto">
          <table className="w-full text-sm border rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left font-semibold text-gray-800">Week</th>
                <th className="p-3 text-left font-semibold text-gray-800">Daily volume</th>
                <th className="p-3 text-left font-semibold text-gray-800">Audience</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr className="bg-white">
                <td className="p-3 text-gray-700 font-medium">Week 1</td>
                <td className="p-3 text-gray-700">50–100/day</td>
                <td className="p-3 text-gray-700">Most engaged subscribers only (opened in last 30 days)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 text-gray-700 font-medium">Week 2</td>
                <td className="p-3 text-gray-700">200–500/day</td>
                <td className="p-3 text-gray-700">Expand to engaged subscribers (opened in last 90 days)</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 text-gray-700 font-medium">Week 3</td>
                <td className="p-3 text-gray-700">1,000–2,000/day</td>
                <td className="p-3 text-gray-700">Broader active list, still excluding dormant/unengaged</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 text-gray-700 font-medium">Week 4</td>
                <td className="p-3 text-gray-700">5,000+/day</td>
                <td className="p-3 text-gray-700">Full active list, approaching target volume</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-100">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Roughly double your previous day&apos;s volume at most, never more.</strong> Within a 
            week, stay consistent day-to-day rather than spiking — a smooth ramp reads as normal business 
            growth; a sawtooth pattern (big day, quiet day, big day) reads as inconsistent/suspicious sending.
          </p>
        </div>
      </section>

      {/* Who to send to first */}
      <section id="who-to-send-to-first" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          Who to Send to First (This Matters More Than Volume)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Volume gets most of the attention, but audience selection during warmup is arguably more 
          important — sending the right volume to the wrong people still produces a bad warmup.
        </p>

        <div className="my-6 space-y-4">
          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
            <p className="font-semibold text-green-800 flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5" /> Start with recent openers and repliers
            </p>
            <p className="text-green-700 text-sm">
              People who&apos;ve opened or replied to your mail in the last 30 days are statistically far 
              more likely to open, click, and not complain. Every one of those positive signals during the 
              fragile early days builds reputation faster than raw volume ever will.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Never start with a purchased, scraped, or long-dormant list
            </p>
            <p className="text-red-700 text-sm">
              Any list you didn&apos;t build through genuine opt-in, or a segment that hasn&apos;t engaged in 
              over a year, is loaded with spam trap risk and near-certain high complaint/bounce rates — 
              exactly the pattern that permanently damages a brand-new domain&apos;s reputation before 
              it even gets started.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          If you don&apos;t have enough recently-engaged subscribers to fill even the small Week 1 volume, 
          that&apos;s a sign to slow the whole timeline down rather than reach into less-engaged segments 
          early just to hit a number.
        </p>
      </section>

      {/* What to watch */}
      <section id="what-to-watch" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          What to Monitor During Warmup
        </h2>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
            <p className="text-gray-700 text-sm">
              <strong>Bounce rate — keep it under 2%.</strong> Anything higher means your &quot;clean&quot; 
              list wasn&apos;t actually clean, and you should pause the ramp-up until you&apos;ve removed 
              the bouncing addresses rather than pushing through to the next volume tier.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
            <p className="text-gray-700 text-sm">
              <strong>Spam complaint rate — stay under 0.1%.</strong> This is the single most sensitive 
              metric during warmup. A spike here should pause volume increases immediately, not just get 
              noted for later.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
            <p className="text-gray-700 text-sm">
              <strong>Open rate relative to your normal baseline.</strong> If your usual list opens at 25% 
              and the warmup segment is opening at 8%, that&apos;s a sign you&apos;re including less-engaged 
              people too early, not a sign to just push forward on schedule.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</span>
            <p className="text-gray-700 text-sm">
              <strong>Google Postmaster Tools domain reputation bucket</strong>, once it starts showing 
              data (usually after a few days of consistent volume). Watching it trend toward Medium/High 
              over the warmup period is your clearest external confirmation things are working.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>If any metric trips its threshold, pause the volume increase — don&apos;t pause sending 
            entirely.</strong> Hold at the current volume for a few extra days until metrics stabilize, then 
            resume the ramp. Stopping sending altogether and restarting later actually resets some of the 
            progress you&apos;ve built.
          </p>
        </div>
      </section>

      {/* Common mistakes */}
      <section id="common-mistakes" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          Common Mistakes That Reset the Clock
        </h2>

        <div className="my-6 space-y-4">
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Going quiet mid-warmup
            </p>
            <p className="text-orange-700 text-sm">
              Starting warmup, then taking a week off because you got busy, resets more progress than people 
              expect. Reputation signals decay without continuous activity — pick a schedule you can actually 
              sustain daily, even if that means a slower overall ramp.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Running an aggressive campaign the moment warmup &quot;finishes&quot;
            </p>
            <p className="text-orange-700 text-sm">
              Four weeks of careful ramping, then a Black Friday-style blast at 3x your target steady-state 
              volume on day 29, undoes a lot of the gradual trust you just built. Treat the end of warmup as 
              reaching your new baseline, not a green light to spike arbitrarily.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Warming up the domain but not the IP (or vice versa)
            </p>
            <p className="text-orange-700 text-sm">
              If you&apos;re also on a new dedicated IP at the same time as a new domain, both need warming 
              up together — fixing one doesn&apos;t substitute for the other. Most ESPs handle this 
              automatically on shared IPs, but check explicitly if you&apos;re self-hosting or on dedicated infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <div className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">✅ New Domain Warmup Checklist</h2>
          <p className="text-gray-400 mb-6 text-sm">Run through this before and during a new domain warmup.</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>SPF, DKIM, DMARC all configured and confirmed aligned before day one</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>List cleaned of hard bounces and dormant addresses before sending anything</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Google Postmaster Tools and Microsoft SNDS set up for the new domain</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Week 1 audience limited to subscribers engaged in the last 30 days</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Daily volume roughly doubling week-over-week, not spiking day-to-day</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Monitoring bounce rate (&lt;2%) and complaint rate (&lt;0.1%) daily during ramp</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Committed to sending every day through the full schedule, no gaps</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Planned a steady post-warmup baseline instead of a volume spike at the end</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Confirm your new domain is configured right before warmup</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          EmailDiag checks SPF, DKIM, and DMARC together, so your warmup period builds reputation on a 
          foundation that actually works. Free, takes 10 seconds.
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
            <h4 className="font-semibold text-gray-800 mb-2">Do I need to warm up a domain if I&apos;m only sending transactional email (receipts, password resets)?</h4>
            <p className="text-gray-600 text-sm">
              Yes, though it&apos;s usually less risky since transactional mail naturally has high engagement 
              and low complaint rates. Still ramp volume gradually rather than switching all transactional 
              traffic to the new domain instantly — the same unknown-sender suspicion applies regardless of mail type.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Can I speed up warmup by using a warmup automation tool/service?</h4>
            <p className="text-gray-600 text-sm">
              These tools (which simulate engagement by having seed accounts open and reply to your mail) 
              can help, but they&apos;re a supplement to real engaged-audience sending, not a replacement 
              for it. Providers have gotten better at distinguishing artificial engagement patterns from 
              genuine ones over time.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">What if I need to migrate domains quickly and can&apos;t wait 4 weeks?</h4>
            <p className="text-gray-600 text-sm">
              Run both domains in parallel during the transition — keep sending from the old domain while 
              gradually ramping the new one, rather than cutting over all at once. This avoids forcing your 
              full volume onto an unproven domain under time pressure.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
