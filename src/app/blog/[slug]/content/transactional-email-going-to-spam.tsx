import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, Shield, Mail } from 'lucide-react';

export default function TransactionalEmailGoingToSpam() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          A founder DMed me on a Friday night: <strong className="text-gray-800">&quot;Our password 
          reset emails are going to spam and users are locking themselves out of their accounts. 
          Support tickets are piling up.&quot;</strong>
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          This one stings more than marketing emails going to spam, because transactional email is 
          supposed to be the reliable stuff — receipts, password resets, order confirmations, OTP 
          codes. Users actually <em>want</em> these. And yet they still end up buried in spam more 
          often than people expect.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          The confusing part is that transactional email fails for different reasons than marketing 
          email. It&apos;s not about unsubscribe rates or promotional language — it&apos;s almost always 
          infrastructure and trust signals. Here&apos;s exactly what to check, in the order I check it.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Let&apos;s get your emails back into the inbox.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">First — check your domain&apos;s authentication</h3>
            <p className="text-blue-100 mb-4">
              Nine times out of ten, transactional spam issues trace back to SPF, DKIM, or DMARC. 
              Run a free check before digging further. Takes 10 seconds.
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
          <a href="#why-different" className="text-blue-600 hover:underline">Why transactional email fails differently</a>
          <a href="#fix-shared-domain" className="text-blue-600 hover:underline">Fix #1: Stop sharing a domain with marketing email</a>
          <a href="#fix-auth" className="text-blue-600 hover:underline">Fix #2: Authentication has to be airtight</a>
          <a href="#fix-engagement" className="text-blue-600 hover:underline">Fix #3: Engagement signals still matter</a>
          <a href="#fix-triggers" className="text-blue-600 hover:underline">Fix #4: Content triggers unique to OTP/receipts</a>
          <a href="#fix-monitoring" className="text-blue-600 hover:underline">Fix #5: Monitor before users complain</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick troubleshooting checklist</a>
        </div>
      </div>

      {/* Section: Why different */}
      <section id="why-different" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">!</span>
          Why Transactional Email Fails Differently Than Marketing Email
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Marketing email spam issues are usually about content and consent — spammy subject lines, 
          people who never opted in, high unsubscribe rates. Transactional email is different because 
          users actually requested it. So when it still lands in spam, the cause is almost always one 
          of these:
        </p>

        <div className="my-6 space-y-4">
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Shared sending domain with marketing email
            </p>
            <p className="text-red-700 text-sm">
              If your password reset and your weekly newsletter both send from the exact same domain, 
              one bad marketing campaign can tank the reputation of your critical transactional email too.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> No sending history for the domain/IP
            </p>
            <p className="text-red-700 text-sm">
              Brand new domains or subdomains have zero reputation. Spam filters are extra cautious 
              with anything unfamiliar, especially at low volume — which is exactly what a new product 
              looks like in its first weeks.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Broken or partial authentication
            </p>
            <p className="text-red-700 text-sm">
              Transactional senders (Stripe, Auth0, your own backend via SES/SendGrid) often only get 
              SPF configured and skip DKIM or DMARC alignment. One out of three passing isn&apos;t enough 
              anymore for Gmail and Yahoo.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Low engagement, even for wanted email
            </p>
            <p className="text-red-700 text-sm">
              Counterintuitively, transactional emails often have <em>low</em> open rates — people 
              glance at a receipt and move on. Gmail reads low opens + no replies as a weak signal, 
              even for legitimate mail.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          None of these are hard to fix. Let&apos;s go through the fixes in priority order.
        </p>
      </section>

      {/* Fix #1: Separate domain */}
      <section id="fix-shared-domain" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          Stop Sharing a Domain With Marketing Email
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          This is the single highest-impact fix, and it&apos;s the one most teams skip because it 
          sounds like extra work. It isn&apos;t — it&apos;s one subdomain and one DNS record.
        </p>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2">The thing is:</p>
          <p className="text-amber-700">
            Sender reputation is tracked per sending domain (and per IP, if you&apos;re not on shared 
            infrastructure). If <code className="bg-amber-100 px-1 rounded">marketing@yourapp.com</code> and{' '}
            <code className="bg-amber-100 px-1 rounded">noreply@yourapp.com</code> share the exact same 
            domain, they share the exact same reputation. A spike in spam complaints from a promo blast 
            drags down your password reset emails too.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">The fix — split by subdomain:</h3>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-1">
          <div><span className="text-gray-400"># Transactional — critical, high trust needed</span></div>
          <div>noreply@<span className="text-green-400">transactional</span>.yourapp.com</div>
          <div className="mt-3"><span className="text-gray-400"># Marketing — can tolerate more risk</span></div>
          <div>hello@<span className="text-blue-400">news</span>.yourapp.com</div>
        </div>

        <p className="text-gray-700 leading-relaxed mt-4">
          Each subdomain gets its own SPF, DKIM, and DMARC alignment, which means its own reputation. 
          Most transactional providers (SendGrid, Mailgun, Postmark, SES) support this natively — you 
          just verify the subdomain instead of the root domain.
        </p>
      </section>

      {/* Fix #2: Authentication */}
      <section id="fix-auth" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          Authentication Has to Be Airtight — Not Just &quot;Mostly Working&quot;
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          For marketing email, an imperfect SPF setup might just hurt your inbox rate a bit. For 
          transactional email — especially OTP codes and password resets — a single failed check can 
          be the difference between the email landing and getting silently dropped by Gmail.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 border font-medium text-gray-700">Check</th>
                <th className="text-left p-3 border font-medium text-gray-700">What it needs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border text-gray-700">SPF</td>
                <td className="p-3 border text-gray-700">Your provider&apos;s include added, single record, under 10 DNS lookups</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 border text-gray-700">DKIM</td>
                <td className="p-3 border text-gray-700">Signing enabled at your provider, CNAME/TXT records published and verified</td>
              </tr>
              <tr>
                <td className="p-3 border text-gray-700">DMARC</td>
                <td className="p-3 border text-gray-700">Published with at least <code className="bg-gray-100 px-1 rounded text-xs">p=none</code>, ideally <code className="bg-gray-100 px-1 rounded text-xs">p=quarantine</code></td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 border text-gray-700">Alignment</td>
                <td className="p-3 border text-gray-700">From: domain matches the SPF/DKIM signing domain (not just &quot;passes in isolation&quot;)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
          <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>The alignment trap:</strong> SPF can technically &quot;pass&quot; while still failing 
            DMARC alignment if the domain in your envelope sender doesn&apos;t match your visible From 
            address. This is the #1 reason people say &quot;SPF passes but emails still go to spam.&quot; See 
            our{' '}
            <Link href="/blog/spf-vs-dkim-vs-dmarc" className="text-blue-600 hover:underline">SPF vs DKIM vs DMARC guide</Link> for 
            how alignment actually works.
          </p>
        </div>
      </section>

      {/* Fix #3: Engagement */}
      <section id="fix-engagement" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          Engagement Signals Still Matter, Even for Wanted Email
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Gmail and Outlook don&apos;t have a special &quot;this is transactional, be lenient&quot; category. 
          They just watch how recipients interact with mail from your domain overall. A few things 
          that quietly help:
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <p className="text-gray-700 text-sm">
              <strong>Ramp up volume gradually</strong> on a new domain/subdomain instead of blasting 
              your full user base on day one. Send to your most active users first.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <p className="text-gray-700 text-sm">
              <strong>Keep bounce rate near zero.</strong> Transactional email often gets triggered by 
              stale or fake signup addresses — validate email format and consider a confirmation step 
              before sending anything beyond the first welcome email.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <p className="text-gray-700 text-sm">
              <strong>Watch complaint rate closely.</strong> Even one &quot;mark as spam&quot; click on a 
              transactional email is a stronger negative signal than on marketing email, because it&apos;s 
              unusual for wanted mail to get reported.
            </p>
          </div>
        </div>
      </section>

      {/* Fix #4: Content triggers */}
      <section id="fix-triggers" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          Content Triggers Unique to OTPs and Receipts
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Transactional templates have their own set of spam triggers that don&apos;t show up in 
          marketing email discussions:
        </p>

        <div className="my-6 grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 rounded-xl">
            <p className="font-semibold text-red-800 mb-3 flex items-center gap-2">
              <XCircle className="w-5 h-5" /> Common mistakes
            </p>
            <ul className="space-y-2 text-sm text-red-700">
              <li>• Code/link only, almost no surrounding text</li>
              <li>• Generic subject like &quot;Notification&quot; or &quot;Alert&quot;</li>
              <li>• Sending from a &quot;noreply@&quot; with no reply-to at all</li>
              <li>• Link shorteners in password reset links</li>
              <li>• No plain-text version alongside HTML</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <p className="font-semibold text-green-800 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" /> Do this instead
            </p>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Include product name + specific action in subject</li>
              <li>• Set a monitored reply-to, even for automated mail</li>
              <li>• Link directly to your own domain, never shortened</li>
              <li>• Always send both HTML and plain text</li>
              <li>• Add your company name/address in the footer</li>
            </ul>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          A good subject line example: <em>&quot;Your Acme account password reset code: 483920&quot;</em> beats 
          <em> &quot;Security Notification&quot;</em> every time — it&apos;s specific, expected, and matches what 
          the user just requested.
        </p>
      </section>

      {/* Fix #5: Monitoring */}
      <section id="fix-monitoring" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          Monitor Before Users Start Complaining
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Transactional email failures are especially painful because you usually find out from angry 
          support tickets, not from a dashboard. Set up monitoring before that happens:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
          <li><strong>Provider-side alerts</strong> — bounce/complaint webhooks from SES, SendGrid, Postmark, Mailgun, wired into Slack or PagerDuty</li>
          <li><a href="https://postmaster.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Postmaster Tools</a> — domain reputation and spam rate, broken down by IP</li>
          <li><a href="https://sendersupport.olc.protection.outlook.com/snds/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Microsoft SNDS</a> — same idea for Outlook/Hotmail</li>
          <li><strong>Periodic seed testing</strong> — send yourself a real password reset weekly and check which folder it lands in</li>
        </ul>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <Shield className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Quick check:</strong> Run your sending domain through{' '}
            <Link href="/test" className="text-blue-600 hover:underline">EmailDiag</Link> periodically — 
            it flags authentication gaps before they turn into a wave of support tickets.
          </p>
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <div className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2"><Mail className="w-6 h-6" /> Transactional Email Troubleshooting Checklist</h2>
          <p className="text-gray-400 mb-6 text-sm">Run through this when password resets or receipts start landing in spam.</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Transactional email uses its own subdomain, separate from marketing</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>SPF, DKIM, and DMARC all pass — not just SPF</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>From: domain aligns with SPF/DKIM signing domain</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>New domain/IP volume ramped gradually, not blasted at launch</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Bounce rate near zero, invalid addresses filtered before sending</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Specific subject lines, no generic &quot;Notification&quot; wording</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Both HTML and plain-text versions sent</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Monitored reply-to address, even on &quot;noreply&quot; sends</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Bounce/complaint webhooks wired to an alert channel</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Google Postmaster Tools / Microsoft SNDS set up</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Password resets landing in spam right now?</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          Run your sending domain through EmailDiag — we&apos;ll check SPF, DKIM, DMARC alignment, and 
          blacklist status in seconds, free.
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
          Transactional email feels like it should &quot;just work&quot; because users requested it — but 
          spam filters don&apos;t know that. They just see a domain, its authentication, and its history. 
          Split your sending domains, get authentication fully aligned (not just partially passing), 
          and most transactional deliverability problems disappear.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The founder who DMed me? Separate subdomain plus fixing a DMARC alignment gap got password 
          resets back in the inbox within two days. No dedicated IP, no fancy tooling — just the basics 
          done properly.
        </p>
      </div>
    </>
  );
}
