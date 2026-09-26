import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function DmarcAlignmentRelaxedVsStrictMode() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          Someone on r/DMARC asked something I&apos;ve seen a dozen variations of: <strong className="text-gray-800">
          &quot;Should I use aspf=s or aspf=r? The docs just say &apos;strict&apos; and &apos;relaxed&apos; 
          without telling me which one I actually want.&quot;</strong> Fair complaint. Most DMARC guides mention 
          these tags exist and then move on, as if the choice doesn&apos;t matter. It does — get it wrong and 
          you either break legitimate mail or leave a gap an attacker can walk through.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          The short version: <strong>relaxed is the default and the right choice for almost everyone</strong>, 
          but &quot;almost everyone&quot; isn&apos;t &quot;everyone,&quot; and understanding exactly what each 
          mode allows is the only way to know which camp you&apos;re in.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          I switched a client to strict mode once thinking it was the &quot;more secure&quot; option by default 
          — then spent an evening figuring out why their own subdomain-based mail server suddenly started 
          failing DMARC. Here&apos;s what I wish I&apos;d understood before making that change.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Let&apos;s break it down properly.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Not sure which alignment mode your DMARC record is using?</h3>
            <p className="text-blue-100 mb-4">
              EmailDiag reads your live DMARC record and tells you exactly what aspf/adkim are set to — 
              and whether that matches your actual sending setup.
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
          <a href="#the-tags" className="text-blue-600 hover:underline">The aspf and adkim tags, explained plainly</a>
          <a href="#relaxed-mode" className="text-blue-600 hover:underline">Relaxed mode: what it actually allows</a>
          <a href="#strict-mode" className="text-blue-600 hover:underline">Strict mode: what it actually requires</a>
          <a href="#side-by-side" className="text-blue-600 hover:underline">Side-by-side comparison</a>
          <a href="#which-to-choose" className="text-blue-600 hover:underline">Which one should you actually use?</a>
          <a href="#common-mistakes" className="text-blue-600 hover:underline">Common mistakes with each mode</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick checklist</a>
        </div>
      </div>

      {/* The tags */}
      <section id="the-tags" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          The aspf and adkim Tags, Explained Plainly
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Your DMARC record can include two optional tags that control how strictly DMARC compares domains 
          during alignment checks:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-6 overflow-x-auto">
          <div className="text-sm font-mono text-green-400">
            v=DMARC1; p=quarantine; aspf=r; adkim=r; rua=mailto:dmarc@yourdomain.com
          </div>
        </div>

        <div className="my-6 grid md:grid-cols-2 gap-3">
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">aspf — SPF alignment mode</p>
            <p className="text-sm text-gray-600">
              Controls how closely the envelope sender domain (<code className="bg-gray-200 px-1 rounded">RFC5321.MailFrom</code>) 
              must match your visible From header domain for SPF to count as aligned.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">adkim — DKIM alignment mode</p>
            <p className="text-sm text-gray-600">
              Controls how closely the DKIM signing domain (<code className="bg-gray-200 px-1 rounded">d=</code> tag) 
              must match your visible From header domain for DKIM to count as aligned.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Both tags accept the same two values: <code className="bg-gray-100 px-1 rounded">r</code> (relaxed) 
          or <code className="bg-gray-100 px-1 rounded">s</code> (strict). If you omit either tag entirely, 
          it defaults to <code className="bg-gray-100 px-1 rounded">r</code> — which is exactly why most 
          DMARC records you&apos;ll find online never mention these tags at all. Relaxed is already happening 
          by default whether you specify it or not.
        </p>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>You can set aspf and adkim independently.</strong> There&apos;s nothing stopping you from 
            running <code className="bg-blue-100 px-1 rounded">aspf=s; adkim=r</code> — strict for SPF, relaxed 
            for DKIM. This is actually a reasonable middle ground for some setups, covered below.
          </p>
        </div>
      </section>

      {/* Relaxed mode */}
      <section id="relaxed-mode" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          Relaxed Mode: What It Actually Allows
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Relaxed alignment allows the authenticated domain to be <strong>the same organizational domain</strong> 
          as your From header domain — meaning any subdomain of your root domain counts as a match, not just 
          an exact string match.
        </p>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
            <p className="text-gray-700 text-sm">
              From header: <code className="bg-green-100 px-1 rounded">news@yourdomain.com</code>, 
              DKIM signed with <code className="bg-green-100 px-1 rounded">d=mail.yourdomain.com</code> 
              → <strong>aligns under relaxed</strong> (same organizational domain: yourdomain.com)
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
            <p className="text-gray-700 text-sm">
              From header: <code className="bg-green-100 px-1 rounded">billing@yourdomain.com</code>, 
              SPF envelope domain <code className="bg-green-100 px-1 rounded">bounce.yourdomain.com</code> 
              → <strong>aligns under relaxed</strong> (same organizational domain)
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          This is what makes relaxed mode practical for real infrastructure. Most organizations send mail 
          from several subdomains — <code className="bg-gray-100 px-1 rounded">mail.</code>, 
          <code className="bg-gray-100 px-1 rounded"> mkt.</code>, <code className="bg-gray-100 px-1 rounded">bounce.</code> — 
          and relaxed mode treats all of them as legitimately &quot;yours&quot; as long as they share the 
          same root domain.
        </p>

        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>What relaxed does NOT forgive:</strong> a completely different registered domain. 
            <code className="bg-red-100 px-1 rounded">klaviyomail.com</code>, <code className="bg-red-100 px-1 rounded">sendgrid.net</code>, 
            or <code className="bg-red-100 px-1 rounded">mailgun.org</code> will never align with 
            <code className="bg-red-100 px-1 rounded"> yourdomain.com</code> under relaxed mode, no matter 
            how the subdomains are structured. Relaxed only widens the definition of &quot;your own domain,&quot; 
            it doesn&apos;t extend trust to third parties.
          </p>
        </div>
      </section>

      {/* Strict mode */}
      <section id="strict-mode" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          Strict Mode: What It Actually Requires
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Strict alignment requires an <strong>exact domain match</strong> — the authenticated domain must be 
          byte-for-byte identical to the From header domain, subdomains included.
        </p>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
            <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
            <p className="text-gray-700 text-sm">
              From header: <code className="bg-red-100 px-1 rounded">news@yourdomain.com</code>, 
              DKIM signed with <code className="bg-red-100 px-1 rounded">d=mail.yourdomain.com</code> 
              → <strong>fails under strict</strong> (mail.yourdomain.com ≠ yourdomain.com exactly)
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
            <p className="text-gray-700 text-sm">
              From header: <code className="bg-green-100 px-1 rounded">news@yourdomain.com</code>, 
              DKIM signed with <code className="bg-green-100 px-1 rounded">d=yourdomain.com</code> 
              → <strong>aligns under strict</strong> (exact match)
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          The practical consequence: under strict mode, every single sending source — your main server, 
          your marketing tool, your helpdesk software, your transactional email provider — needs to sign or 
          send using the <em>exact same domain string</em> that appears in your From header. No subdomain 
          variation is tolerated.
        </p>

        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-100">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>This is why strict mode breaks more setups than people expect.</strong> Plenty of ESPs 
            configure your branded sending domain as a subdomain (like <code className="bg-amber-100 px-1 rounded">send.yourdomain.com</code>) 
            by default, specifically because subdomain delegation is easier to set up via CNAME. That&apos;s 
            a perfectly good setup under relaxed mode — and a DMARC failure under strict.
          </p>
        </div>
      </section>

      {/* Side by side */}
      <section id="side-by-side" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          Side-by-Side Comparison
        </h2>

        <div className="my-6 overflow-x-auto">
          <table className="w-full text-sm border rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left font-semibold text-gray-800">Scenario</th>
                <th className="p-3 text-left font-semibold text-green-700">Relaxed (r)</th>
                <th className="p-3 text-left font-semibold text-red-700">Strict (s)</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr className="bg-white">
                <td className="p-3 text-gray-700">Same root domain, different subdomain</td>
                <td className="p-3 text-green-700">✅ Aligns</td>
                <td className="p-3 text-red-700">❌ Fails</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 text-gray-700">Exact domain match</td>
                <td className="p-3 text-green-700">✅ Aligns</td>
                <td className="p-3 text-green-700">✅ Aligns</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 text-gray-700">Completely different registered domain (ESP&apos;s own)</td>
                <td className="p-3 text-red-700">❌ Fails</td>
                <td className="p-3 text-red-700">❌ Fails</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 text-gray-700">Setup complexity for multi-subdomain infra</td>
                <td className="p-3 text-gray-700">Low</td>
                <td className="p-3 text-gray-700">High</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 text-gray-700">Protection against sibling-subdomain spoofing</td>
                <td className="p-3 text-gray-700">Lower</td>
                <td className="p-3 text-gray-700">Higher</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 text-gray-700">Default if tag is omitted</td>
                <td className="p-3 text-gray-700 font-semibold">Yes, this is the default</td>
                <td className="p-3 text-gray-700">No — must be set explicitly</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Which to choose */}
      <section id="which-to-choose" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          Which One Should You Actually Use?
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          For the overwhelming majority of domains, <strong>relaxed is the right call</strong> — and this 
          isn&apos;t a compromise choice, it&apos;s the mode DMARC was designed around. Here&apos;s how to 
          think about it:
        </p>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
            <p className="text-gray-700 text-sm">
              <strong>Use relaxed (the default) if</strong> you send from any subdomains at all — marketing 
              tools, transactional providers, helpdesk software, internal mail servers on 
              <code className="bg-gray-200 px-1 rounded"> mail.yourdomain.com</code>. This describes almost 
              every organization with more than one sending source.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">!</span>
            <p className="text-gray-700 text-sm">
              <strong>Consider strict only if</strong> every single sending source authenticates with your 
              exact root domain (no subdomains anywhere in your mail infrastructure), and you specifically 
              want to close off the theoretical risk of a compromised or malicious subdomain being used to 
              spoof your organization at DMARC-compliant scale.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">~</span>
            <p className="text-gray-700 text-sm">
              <strong>The realistic threat strict mode defends against</strong> is narrow: someone who 
              controls a subdomain of your domain (via a takeover, an abandoned DNS record, or a compromised 
              sub-tenant) sending mail that would otherwise align under relaxed mode. This is a real but 
              uncommon attack path — for most businesses, the operational cost of strict mode outweighs this risk.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>A reasonable middle ground:</strong> if you&apos;re worried about subdomain spoofing but 
            still rely on ESPs that only offer subdomain-based DKIM signing, you can independently publish a 
            separate, stricter DMARC record on high-risk subdomains themselves (e.g. an unused 
            <code className="bg-blue-100 px-1 rounded"> old-brand.yourdomain.com</code>) with 
            <code className="bg-blue-100 px-1 rounded"> p=reject</code>, while keeping your main domain&apos;s 
            record relaxed.
          </p>
        </div>
      </section>

      {/* Common mistakes */}
      <section id="common-mistakes" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">6</span>
          Common Mistakes With Each Mode
        </h2>

        <div className="my-6 space-y-4">
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Setting strict mode as a &quot;more secure&quot; default without testing
            </p>
            <p className="text-orange-700 text-sm">
              This is the exact mistake I made. Strict feels like the safer option because the word implies 
              it, but flipping it on without auditing every sending source first will silently break mail 
              from any subdomain-based sender — and you often won&apos;t notice until someone complains their 
              mail bounced or landed in spam.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Assuming relaxed mode is why an ESP still fails alignment
            </p>
            <p className="text-orange-700 text-sm">
              If SPF or DKIM still isn&apos;t aligning under relaxed mode, switching to strict will never fix 
              it — strict is a subset of relaxed&apos;s allowed matches, never a superset. If relaxed 
              can&apos;t align a domain, strict definitely can&apos;t either. The real fix is almost always 
              setting up a branded sending domain with the ESP, not touching aspf/adkim at all.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Mixing up aspf/adkim with the DMARC policy tag (p=)
            </p>
            <p className="text-orange-700 text-sm">
              Alignment mode and enforcement policy are independent settings. 
              <code className="bg-orange-100 px-1 rounded"> p=reject</code> with <code className="bg-orange-100 px-1 rounded">aspf=r</code> 
              is common and fine — strict enforcement of a relaxed alignment check. Don&apos;t confuse 
              &quot;how strict is the domain comparison&quot; with &quot;what happens when alignment fails.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <div className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">✅ Alignment Mode Decision Checklist</h2>
          <p className="text-gray-400 mb-6 text-sm">Run through this before setting aspf/adkim explicitly.</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Listed every sending source (ESP, CRM, internal server, helpdesk tool)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Checked whether any source signs/sends from a subdomain, not the exact root domain</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Confirmed relaxed mode (default) if any subdomain sending exists</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Only considered strict if every source uses the exact root domain</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Tested any alignment mode change at p=none before enforcing quarantine/reject</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Verified aspf/adkim tags aren&apos;t being confused with the p= enforcement tag</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">See exactly how your DMARC record is configured</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          EmailDiag reads your live record and breaks down every tag — policy, alignment mode, reporting — 
          in plain English. Free, takes 10 seconds.
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
            <h4 className="font-semibold text-gray-800 mb-2">Do I need to set aspf/adkim at all, or is the default fine?</h4>
            <p className="text-gray-600 text-sm">
              For most domains, leaving them unset (defaulting to relaxed) is fine and requires no action. 
              Only add these tags explicitly if you&apos;ve specifically decided you need strict mode for a 
              well-understood reason — there&apos;s no benefit to writing out <code className="bg-gray-100 px-1 rounded">aspf=r; adkim=r</code> 
              if that&apos;s already the default behavior.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Can I set aspf and adkim to different values?</h4>
            <p className="text-gray-600 text-sm">
              Yes, they&apos;re fully independent. A common pattern is <code className="bg-gray-100 px-1 rounded">adkim=s</code> 
              (strict for DKIM, since DKIM signing domains are usually easy to control precisely) with 
              <code className="bg-gray-100 px-1 rounded"> aspf=r</code> (relaxed for SPF, since envelope 
              senders often use bounce subdomains). DMARC only needs one of the two to align, so this gives 
              you flexibility per-mechanism.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Will switching to strict mode improve my sender reputation?</h4>
            <p className="text-gray-600 text-sm">
              No — alignment mode has nothing to do with sender reputation scoring at Gmail, Outlook, or 
              Yahoo. It only affects whether DMARC passes or fails for a given message. Reputation is a 
              separate system based on sending history, engagement, and complaint rates.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
