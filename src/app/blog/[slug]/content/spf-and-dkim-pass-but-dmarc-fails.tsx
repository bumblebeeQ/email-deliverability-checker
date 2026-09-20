import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function SpfAndDkimPassButDmarcFails() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          Someone posted in r/sysadmin something like: <strong className="text-gray-800">&quot;SPF passes. 
          DKIM passes. DMARC still fails. How does that even make sense?&quot;</strong> I&apos;ve seen that exact 
          confusion play out a dozen times, and it always comes from the same wrong assumption: that DMARC 
          is just &quot;SPF and DKIM combined.&quot; It isn&apos;t.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          DMARC adds a third check on top of SPF and DKIM called <strong>alignment</strong>, and it&apos;s 
          entirely possible — common, even — for both underlying checks to pass individually while DMARC 
          still fails the message. This is the single most misunderstood part of email authentication, and 
          it&apos;s why so many people stare at a DMARC report that says &quot;fail&quot; next to two green checkmarks.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          I spent a good chunk of an afternoon once convinced my DMARC record itself was broken, before 
          realizing the record was fine — my envelope sender domain just didn&apos;t match my From header. 
          Here&apos;s exactly what alignment means, why this happens, and how to fix it.
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
            <h3 className="text-lg font-semibold mb-2">Not sure if your setup has an alignment problem?</h3>
            <p className="text-blue-100 mb-4">
              EmailDiag checks your SPF, DKIM, and DMARC alignment together — not just whether each record 
              exists, but whether they actually line up the way DMARC needs them to.
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
          <a href="#what-is-alignment" className="text-blue-600 hover:underline">What &quot;alignment&quot; actually means</a>
          <a href="#why-this-happens" className="text-blue-600 hover:underline">The most common cause: mismatched domains</a>
          <a href="#relaxed-vs-strict" className="text-blue-600 hover:underline">Relaxed vs. strict alignment mode</a>
          <a href="#how-to-check" className="text-blue-600 hover:underline">How to check alignment yourself</a>
          <a href="#how-to-fix" className="text-blue-600 hover:underline">How to actually fix it</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick checklist</a>
        </div>
      </div>

      {/* What is alignment */}
      <section id="what-is-alignment" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          What &quot;Alignment&quot; Actually Means
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          SPF and DKIM each check <em>authentication</em> — did this mail actually come from where it claims, 
          and is the signature valid. DMARC adds a separate check on top called <em>alignment</em> — does the 
          domain that passed SPF or DKIM actually match the domain the recipient sees in their inbox (the 
          visible <code className="bg-gray-100 px-1 rounded">From:</code> header)?
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          That&apos;s two different domains being compared:
        </p>

        <div className="my-6 grid md:grid-cols-2 gap-3">
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">SPF alignment</p>
            <p className="text-sm text-gray-600">
              Compares the domain in the invisible envelope sender (<code className="bg-gray-200 px-1 rounded">RFC5321.MailFrom</code>) 
              to the visible From header (<code className="bg-gray-200 px-1 rounded">RFC5322.From</code>).
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">DKIM alignment</p>
            <p className="text-sm text-gray-600">
              Compares the signing domain (<code className="bg-gray-200 px-1 rounded">d=</code> tag in the 
              DKIM-Signature header) to the same visible From header.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100 mb-6">
          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>DMARC only needs one of these to align, not both.</strong> But if neither SPF&apos;s 
            envelope domain nor DKIM&apos;s signing domain matches your visible From domain, DMARC fails — 
            full stop, regardless of whether SPF and DKIM each individually reported PASS.
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed">
          So &quot;SPF: PASS, DKIM: PASS, DMARC: FAIL&quot; isn&apos;t a contradiction or a broken DMARC record. 
          It&apos;s DMARC doing exactly what it&apos;s designed to do — catching a case where authentication 
          succeeded for a domain that isn&apos;t the one the recipient actually sees.
        </p>
      </section>

      {/* Why this happens */}
      <section id="why-this-happens" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          The Most Common Cause: Mismatched Domains
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          In practice, this almost always comes down to one specific setup mistake. Here&apos;s the pattern 
          I see over and over:
        </p>

        <div className="my-6 space-y-4">
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> ESP sends on your behalf using its own domain
            </p>
            <p className="text-orange-700 text-sm">
              Your marketing tool (Klaviyo, HubSpot, Mailchimp, etc.) sends mail with an envelope-from like 
              <code className="bg-orange-100 px-1 rounded"> bounce.klaviyomail.com</code>, but your visible 
              From header shows <code className="bg-orange-100 px-1 rounded">yourcompany.com</code>. SPF 
              passes for klaviyomail.com — but that&apos;s not the domain the recipient sees, so it doesn&apos;t align.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> DKIM signed by a third-party subdomain
            </p>
            <p className="text-orange-700 text-sm">
              Your ESP signs with its own DKIM key using <code className="bg-orange-100 px-1 rounded">d=mail.sendgrid.net</code>, 
              which passes DKIM authentication just fine. But your From header still shows your own domain, 
              so that signing domain doesn&apos;t align either.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Forwarding breaks SPF, leaving only DKIM — and it&apos;s unaligned too
            </p>
            <p className="text-orange-700 text-sm">
              Mail forwarding often breaks SPF outright (the forwarding server isn&apos;t in your SPF record). 
              If DKIM survives the forward but was signed by an unaligned domain, DMARC has nothing left to pass on.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          Notice the pattern: it&apos;s never that SPF or DKIM are lying about passing. It&apos;s that they&apos;re 
          passing for a domain that isn&apos;t the one your recipients actually see in their inbox.
        </p>
      </section>

      {/* Relaxed vs strict */}
      <section id="relaxed-vs-strict" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          Relaxed vs. Strict Alignment Mode
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          DMARC lets you control how forgiving this domain comparison is, using the 
          <code className="bg-gray-100 px-1 rounded"> aspf</code> and <code className="bg-gray-100 px-1 rounded">adkim</code> tags 
          in your DMARC record:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-2 overflow-x-auto">
          <div className="text-sm font-mono text-green-400">
            v=DMARC1; p=quarantine; aspf=r; adkim=r; rua=mailto:dmarc@yourdomain.com
          </div>
        </div>
        <p className="text-gray-500 text-xs mb-6">
          <code className="bg-gray-100 px-1 rounded">r</code> = relaxed (default if omitted), 
          <code className="bg-gray-100 px-1 rounded"> s</code> = strict
        </p>

        <div className="my-6 grid md:grid-cols-2 gap-3">
          <div className="p-4 bg-green-50 rounded-xl border-2 border-green-300">
            <p className="font-semibold text-green-800 mb-1">Relaxed (r) — the default</p>
            <p className="text-sm text-green-700">
              Allows <code className="bg-green-100 px-1 rounded">mail.yourdomain.com</code> to align with 
              <code className="bg-green-100 px-1 rounded"> yourdomain.com</code>. Subdomains of your own 
              domain count as a match.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 mb-1">Strict (s)</p>
            <p className="text-sm text-red-700">
              Requires an exact domain match — no subdomains allowed. Breaks alignment for a lot of 
              legitimate multi-subdomain setups unless every sending source uses the exact root domain.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Relaxed mode won&apos;t save you from the ESP problem above.</strong> Relaxed alignment 
            only forgives subdomain differences within your own domain — it still won&apos;t align 
            <code className="bg-blue-100 px-1 rounded"> klaviyomail.com</code> or 
            <code className="bg-blue-100 px-1 rounded"> sendgrid.net</code> against 
            <code className="bg-blue-100 px-1 rounded"> yourcompany.com</code>. Switching alignment mode is 
            not the fix for a third-party sending domain mismatch.
          </p>
        </div>
      </section>

      {/* How to check */}
      <section id="how-to-check" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          How to Check Alignment Yourself
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Send a real test email to a Gmail address, open it, and click the three dots → 
          <strong> &quot;Show original.&quot;</strong> Look for three specific lines:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-6 overflow-x-auto">
          <div className="text-sm font-mono text-green-400 space-y-1">
            <div>SPF: PASS with IP xxx.xxx.xxx.xxx</div>
            <div>Learn more at https://support.google.com/mail/answer/180707</div>
            <div>DKIM: &apos;PASS&apos; with domain mail.yoursender.com</div>
            <div>DMARC: &apos;FAIL&apos;</div>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Now compare that DKIM <code className="bg-gray-100 px-1 rounded">domain</code> value and the SPF 
          check&apos;s underlying envelope domain against whatever shows in the visible From address at the 
          top of the email. If neither one matches your actual From domain (accounting for relaxed 
          subdomain rules), that&apos;s your alignment failure, right there in plain text.
        </p>

        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-100">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Don&apos;t trust standalone SPF/DKIM checker tools for this.</strong> Most of them only 
            confirm that a record exists and resolves — they don&apos;t evaluate alignment against your actual 
            From header the way a real DMARC report does. You need either a real test send or an aggregate 
            DMARC report to see alignment specifically.
          </p>
        </div>
      </section>

      {/* How to fix */}
      <section id="how-to-fix" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          How to Actually Fix It
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          The fix depends on which sending source is unaligned, but it&apos;s always some version of the 
          same idea: make the domain doing the authenticating match the domain in your From header.
        </p>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
            <p className="text-gray-700 text-sm">
              <strong>Set up a branded sending domain with your ESP</strong> (e.g. 
              <code className="bg-gray-200 px-1 rounded"> send.yourdomain.com</code> or 
              <code className="bg-gray-200 px-1 rounded"> mail.yourdomain.com</code>) instead of using their 
              shared domain. Almost every major ESP — Klaviyo, SendGrid, Mailgun, HubSpot — supports this, 
              and it&apos;s usually a checkbox plus a couple of CNAME records away.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
            <p className="text-gray-700 text-sm">
              <strong>Confirm DKIM signs with your branded subdomain</strong>, not the ESP&apos;s own domain. 
              Once you enable custom domain authentication, the ESP should switch the 
              <code className="bg-gray-200 px-1 rounded"> d=</code> tag automatically — verify it in the 
              raw headers after switching, don&apos;t just assume the dashboard toggle worked.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
            <p className="text-gray-700 text-sm">
              <strong>For self-hosted/forwarded mail</strong>, make sure your own outbound mail server signs 
              DKIM with your primary domain (not a subdomain the recipient never sees), so DKIM alignment 
              survives even if SPF breaks somewhere along a forwarding chain.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</span>
            <p className="text-gray-700 text-sm">
              <strong>Start your DMARC policy at <code className="bg-gray-200 px-1 rounded">p=none</code></strong> while 
              fixing this and watch aggregate reports for a week or two. Once every legitimate sending source 
              shows aligned, then move to <code className="bg-gray-200 px-1 rounded">quarantine</code> or 
              <code className="bg-gray-200 px-1 rounded"> reject</code>.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          The trap to avoid: don&apos;t &quot;fix&quot; this by loosening your DMARC policy to 
          <code className="bg-gray-100 px-1 rounded"> p=none</code> permanently, or by trying to tweak 
          <code className="bg-gray-100 px-1 rounded"> aspf</code>/<code className="bg-gray-100 px-1 rounded">adkim</code> tags. 
          Neither one solves an actual cross-domain mismatch — they just hide the report or slightly widen 
          what counts as &quot;same domain.&quot; Fixing the sending domain itself is the only real fix.
        </p>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <div className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">✅ DMARC Alignment Checklist</h2>
          <p className="text-gray-400 mb-6 text-sm">Run through this when SPF and DKIM both pass but DMARC still fails.</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Pulled a real Gmail &quot;Show original&quot; header to see actual SPF/DKIM/DMARC lines</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Compared SPF envelope domain against the visible From header domain</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Compared DKIM d= signing domain against the visible From header domain</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Checked whether ESP is using its own shared domain instead of a branded one</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Set up custom/branded sending domain with ESP if using their shared domain</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Left DMARC at p=none while confirming alignment, before enforcing quarantine/reject</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Want to see your alignment status without digging through headers?</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          EmailDiag checks SPF, DKIM, and DMARC alignment together and tells you exactly which domain 
          isn&apos;t matching. Free, takes 10 seconds.
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
            <h4 className="font-semibold text-gray-800 mb-2">Do I need both SPF and DKIM to align, or just one?</h4>
            <p className="text-gray-600 text-sm">
              Just one. DMARC passes if either SPF alignment or DKIM alignment succeeds — you don&apos;t need 
              both. That&apos;s actually good news: if one of your sending sources has broken SPF alignment 
              but correctly aligned DKIM, DMARC still passes for that message.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Why does my DMARC report show &quot;fail&quot; for mail I know is legitimate?</h4>
            <p className="text-gray-600 text-sm">
              This is almost always a legitimate third-party sender (an ESP, a CRM, a helpdesk tool) that 
              hasn&apos;t been set up with a branded sending domain yet. It&apos;s not spoofing — it&apos;s a 
              configuration gap on a tool you actually authorized. Check the source IP/domain in the report 
              against your list of approved senders before assuming it&apos;s an attack.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Will fixing alignment slow down my email sending?</h4>
            <p className="text-gray-600 text-sm">
              No. Alignment is a DNS/domain configuration issue, not a sending-speed or infrastructure issue. 
              Setting up a branded sending domain with your ESP is a one-time DNS change (usually a few CNAME 
              records) — it doesn&apos;t change how fast or how many emails you can send.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
