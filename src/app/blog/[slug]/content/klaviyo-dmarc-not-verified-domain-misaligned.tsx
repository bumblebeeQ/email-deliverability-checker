import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function KlaviyoDmarcNotVerifiedDomainMisaligned() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          A common question in Klaviyo&apos;s own community forum goes something like: 
          <strong className="text-gray-800"> &quot;My sending domain shows &apos;Verified&apos; with a 
          green checkmark in Klaviyo, but my DMARC report says the domain is &apos;not aligned.&apos; Which 
          one do I trust?&quot;</strong> Both, actually — they&apos;re just answering different questions, 
          and the gap between them is exactly where this problem lives.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Klaviyo&apos;s &quot;Verified&quot; badge means you correctly added the DNS records Klaviyo asked 
          for. It does not mean your emails will pass DMARC alignment — those are two separate checks, and 
          passing one has nothing to do with passing the other. This single misunderstanding is behind the 
          majority of &quot;but Klaviyo says it&apos;s verified!&quot; tickets I&apos;ve seen.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          I walked a client through exactly this confusion last quarter — fully verified in Klaviyo, 100% 
          DMARC failure in their aggregate reports. Here&apos;s what verified actually means, why it 
          doesn&apos;t guarantee alignment, and the specific setting that fixes it.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Let&apos;s walk through it.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Want to see your actual alignment status, not just Klaviyo&apos;s checkmark?</h3>
            <p className="text-blue-100 mb-4">
              EmailDiag checks SPF, DKIM, and DMARC alignment together — the thing Klaviyo&apos;s 
              &quot;Verified&quot; badge doesn&apos;t actually confirm.
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
          <a href="#what-verified-means" className="text-blue-600 hover:underline">What Klaviyo&apos;s &quot;Verified&quot; actually checks</a>
          <a href="#why-still-misaligned" className="text-blue-600 hover:underline">Why you can still be misaligned anyway</a>
          <a href="#the-shared-domain-trap" className="text-blue-600 hover:underline">The shared-domain trap specifically</a>
          <a href="#how-to-check" className="text-blue-600 hover:underline">How to check your real alignment status</a>
          <a href="#how-to-fix" className="text-blue-600 hover:underline">How to actually fix it</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick checklist</a>
        </div>
      </div>

      {/* What verified means */}
      <section id="what-verified-means" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          What Klaviyo&apos;s &quot;Verified&quot; Actually Checks
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          When you add a sending domain in Klaviyo, it gives you a handful of DNS records to publish — 
          typically a few CNAMEs for DKIM and sometimes an SPF-related TXT record. The &quot;Verified&quot; 
          status means Klaviyo successfully queried your DNS and found those exact records in place.
        </p>

        <div className="my-6 grid md:grid-cols-2 gap-3">
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">What &quot;Verified&quot; confirms</p>
            <p className="text-sm text-gray-600">
              The specific DNS records Klaviyo requested exist and resolve correctly. That&apos;s it — a 
              DNS presence check, not a DMARC alignment check.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">What it does NOT confirm</p>
            <p className="text-sm text-gray-600">
              Whether the domain actually used in your DKIM signature or SPF envelope matches your visible 
              From header domain closely enough for DMARC to count it as aligned.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-100">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Verified just means &quot;you did the setup Klaviyo asked for.&quot;</strong> It&apos;s 
            Klaviyo confirming its own instructions were followed, not Klaviyo confirming the end result 
            passes DMARC for your specific domain and From-address setup.
          </p>
        </div>
      </section>

      {/* Why still misaligned */}
      <section id="why-still-misaligned" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          Why You Can Still Be Misaligned Anyway
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          DMARC alignment compares the domain in your <em>visible From header</em> against the domain used 
          for SPF (envelope sender) or DKIM (signing domain). Klaviyo&apos;s verification doesn&apos;t check 
          this comparison — it only checks that the records it asked for exist.
        </p>

        <div className="my-6 space-y-4">
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Branded domain verified, but the From address uses a different domain
            </p>
            <p className="text-orange-700 text-sm">
              You verified <code className="bg-orange-100 px-1 rounded">send.yourdomain.com</code> in 
              Klaviyo&apos;s domain settings, but your email templates still send From 
              <code className="bg-orange-100 px-1 rounded"> hello@adifferentbrand.com</code> — a leftover 
              from before you consolidated domains, or a secondary brand. Klaviyo shows the first domain as 
              verified; DMARC checks the second.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> DKIM verified but SPF still points to Klaviyo&apos;s shared domain
            </p>
            <p className="text-orange-700 text-sm">
              You completed DKIM setup (the CNAME records), which shows Verified, but never added the 
              dedicated SPF-related record for your branded domain — so SPF still authenticates against 
              <code className="bg-orange-100 px-1 rounded"> _spf.klaviyomail.com</code> or similar, which 
              doesn&apos;t align with your From domain either way.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Multiple sending domains in Klaviyo, only one actually used
            </p>
            <p className="text-orange-700 text-sm">
              Accounts with flows/campaigns split across brands sometimes verify a domain early on, stop 
              actively using it, and switch default sending to a different domain that was never fully set 
              up the same way — the old verified one keeps showing green while nothing currently sends from it.
            </p>
          </div>
        </div>
      </section>

      {/* Shared domain trap */}
      <section id="the-shared-domain-trap" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          The Shared-Domain Trap Specifically
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          If you skip Klaviyo&apos;s custom domain setup entirely (or only do it halfway), Klaviyo falls 
          back to sending through its own shared sending infrastructure. This is the single most common 
          root cause behind this exact complaint:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-6 overflow-x-auto">
          <div className="text-sm font-mono text-green-400 space-y-1">
            <div>From: hello@yourbrand.com</div>
            <div>Return-Path: bounce@klaviyomail.com</div>
            <div>DKIM-Signature: d=klaviyomail.com</div>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Your recipient sees <code className="bg-gray-100 px-1 rounded">yourbrand.com</code> in their 
          inbox, but every authenticating mechanism actually points to Klaviyo&apos;s own domain. SPF and 
          DKIM both still <em>pass</em> — Klaviyo is a legitimate, correctly configured sender for 
          klaviyomail.com — but neither one <em>aligns</em>, because klaviyomail.com will never match 
          yourbrand.com under any DMARC alignment mode.
        </p>

        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
          <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>This is a completely different problem from an unverified domain.</strong> Nothing here 
            is &quot;broken&quot; from Klaviyo&apos;s perspective, and nothing shows as an error in your 
            Klaviyo dashboard. The mail sends successfully and often lands fine — right up until a strict 
            DMARC policy (<code className="bg-red-100 px-1 rounded">p=quarantine</code> or 
            <code className="bg-red-100 px-1 rounded"> p=reject</code>) on your own domain starts actively 
            rejecting it specifically for failing alignment.
          </p>
        </div>
      </section>

      {/* How to check */}
      <section id="how-to-check" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          How to Check Your Real Alignment Status
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Don&apos;t rely on Klaviyo&apos;s dashboard for this — pull a real header from a Klaviyo-sent 
          campaign email received at a Gmail address:
        </p>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
            <p className="text-gray-700 text-sm">
              Open the email in Gmail, click the three dots → <strong>&quot;Show original.&quot;</strong>
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
            <p className="text-gray-700 text-sm">
              Find the <code className="bg-gray-200 px-1 rounded">DKIM-Signature</code> header and check the 
              <code className="bg-gray-200 px-1 rounded"> d=</code> value. If it says 
              <code className="bg-gray-200 px-1 rounded"> d=klaviyomail.com</code> instead of your own 
              domain, DKIM isn&apos;t aligned, regardless of what your Klaviyo dashboard shows.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
            <p className="text-gray-700 text-sm">
              Check the final <code className="bg-gray-200 px-1 rounded">DMARC: &apos;FAIL&apos;</code> or 
              <code className="bg-gray-200 px-1 rounded"> &apos;PASS&apos;</code> line directly — this is 
              the ground truth, independent of anything Klaviyo tells you.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Also check your DMARC aggregate reports (rua)</strong> if you have them set up — they 
            show alignment pass/fail across your actual sending volume, not just one test email, and will 
            clearly list <code className="bg-blue-100 px-1 rounded">klaviyomail.com</code> as the source if 
            that&apos;s what&apos;s actually authenticating.
          </p>
        </div>
      </section>

      {/* How to fix */}
      <section id="how-to-fix" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          How to Actually Fix It
        </h2>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
            <p className="text-gray-700 text-sm">
              <strong>Complete Klaviyo&apos;s full custom domain authentication, not just the minimum.</strong> 
              In Klaviyo, go to Settings → Domains, add the domain you actually send From, and publish 
              <em>every</em> DNS record it provides — both the DKIM CNAMEs and the SPF-related record, not 
              whichever one you got to first.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
            <p className="text-gray-700 text-sm">
              <strong>Confirm the verified domain matches your actual From address domain exactly</strong> 
              (accounting for subdomain relaxed-alignment rules). If you verified 
              <code className="bg-gray-200 px-1 rounded"> send.yourdomain.com</code> but send From 
              <code className="bg-gray-200 px-1 rounded"> hello@shop.yourdomain.com</code>, that still 
              aligns under relaxed mode (same root domain) — but if the roots differ entirely, it won&apos;t.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
            <p className="text-gray-700 text-sm">
              <strong>Re-verify by sending a fresh test campaign</strong> after DNS propagates (usually 
              within an hour), and pull the header again. Klaviyo&apos;s dashboard checkmark updates based on 
              DNS lookups it runs periodically — it won&apos;t retroactively re-check mail you&apos;ve 
              already sent.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</span>
            <p className="text-gray-700 text-sm">
              <strong>Audit every flow and campaign for the From address actually used</strong>, especially 
              if your account has history predating a domain consolidation or rebrand. It&apos;s common to 
              fix the default sending domain and miss one legacy flow still hardcoded to an old From address.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          The trap to avoid: don&apos;t loosen your own domain&apos;s DMARC policy to 
          <code className="bg-gray-100 px-1 rounded"> p=none</code> just to make the failures stop showing 
          up in reports. That hides the symptom without fixing the underlying setup, and leaves your domain 
          with weaker DMARC enforcement than you intended for every other sender, not just Klaviyo.
        </p>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <div className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">✅ Klaviyo Alignment Checklist</h2>
          <p className="text-gray-400 mb-6 text-sm">Run through this when Klaviyo shows Verified but DMARC reports show misalignment.</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Confirmed the exact domain verified in Klaviyo matches your actual From address domain</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Published every DNS record Klaviyo provided, not just the first/easiest one</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Pulled a real Gmail header and checked the DKIM d= value directly</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Checked DMARC aggregate reports for klaviyomail.com appearing as an unaligned source</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Audited every flow/campaign for a leftover or legacy From address</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Sent a fresh test campaign after DNS propagation to re-verify, instead of trusting old mail</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Check what&apos;s actually aligning, not just what Klaviyo shows</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          EmailDiag checks SPF, DKIM, and DMARC alignment together and tells you exactly which domain is 
          actually authenticating your mail. Free, takes 10 seconds.
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
            <h4 className="font-semibold text-gray-800 mb-2">If I skip Klaviyo&apos;s domain verification entirely, will my emails still send?</h4>
            <p className="text-gray-600 text-sm">
              Yes — Klaviyo will send through its shared infrastructure using its own domain for 
              authentication, and mail will typically still be delivered. The problem only becomes visible 
              once your own domain enforces a strict DMARC policy, or once you check alignment directly.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Do I need to verify every sub-brand domain separately in Klaviyo?</h4>
            <p className="text-gray-600 text-sm">
              Yes, if different flows or campaigns send From different domains, each one needs its own 
              domain authentication setup in Klaviyo. Verifying one domain doesn&apos;t extend alignment 
              coverage to mail sent From a different domain, even within the same Klaviyo account.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">How often does Klaviyo re-check the Verified status?</h4>
            <p className="text-gray-600 text-sm">
              Klaviyo periodically re-queries DNS for your added domains, but it checks record presence, 
              not DMARC outcomes. Changing your From address or DMARC policy won&apos;t trigger Klaviyo to 
              flag anything — you have to check alignment yourself via headers or aggregate reports.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
