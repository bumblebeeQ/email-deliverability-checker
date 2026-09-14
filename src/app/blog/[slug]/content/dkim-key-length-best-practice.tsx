import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function DkimKeyLengthBestPractice() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          Someone in a devops forum asked: <strong className="text-gray-800">&quot;Should I generate my 
          DKIM key as 1024-bit or 2048-bit? Does it even matter?&quot;</strong> Then a reply came in saying 
          &quot;just use 4096-bit to be safe.&quot; That reply is exactly how people end up with DKIM records 
          that silently fail on some receivers.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          DKIM key length isn&apos;t a &quot;bigger is better&quot; setting. It&apos;s a tradeoff between security and 
          DNS compatibility, and going too big breaks things in ways that are genuinely hard to debug — 
          your DKIM key looks published, dig returns something, and mail still fails signature checks on 
          certain providers.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          I&apos;ve regenerated DKIM keys for this exact reason more than once. Here&apos;s the actual 
          recommendation, why 1024-bit is now too weak, why 4096-bit causes its own problems, and how 
          to pick correctly the first time.
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
            <h3 className="text-lg font-semibold mb-2">Not sure if your current DKIM key is even valid?</h3>
            <p className="text-blue-100 mb-4">
              Run your domain through EmailDiag first — we&apos;ll check whether your DKIM record resolves 
              correctly and whether signatures are actually passing.
            </p>
            <Link 
              href="/test"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Check My DKIM <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="my-10 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-4">What we&apos;ll cover:</h3>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <a href="#the-recommendation" className="text-blue-600 hover:underline">The short answer: use 2048-bit</a>
          <a href="#why-1024-weak" className="text-blue-600 hover:underline">Why 1024-bit is considered weak now</a>
          <a href="#why-4096-breaks" className="text-blue-600 hover:underline">Why 4096-bit can actually break DKIM</a>
          <a href="#how-to-generate" className="text-blue-600 hover:underline">How to generate a 2048-bit key correctly</a>
          <a href="#rotating-keys" className="text-blue-600 hover:underline">Rotating an existing weak key safely</a>
          <a href="#verify" className="text-blue-600 hover:underline">How to verify it actually took</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick checklist</a>
        </div>
      </div>

      {/* The recommendation */}
      <section id="the-recommendation" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-lg font-bold">✓</span>
          The Short Answer: Use 2048-Bit
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          For DKIM keys generated today, <strong>2048-bit RSA</strong> is the correct default. It&apos;s the 
          length Google, Microsoft, and every major ESP use by default, it&apos;s well within DNS TXT record 
          size limits when split correctly, and it has years of runway before it&apos;s considered weak.
        </p>

        <div className="my-6 grid md:grid-cols-3 gap-3">
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 mb-1">1024-bit</p>
            <p className="text-sm text-red-700">Too weak. Avoid for new keys, rotate out if you still have one.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl border-2 border-green-300">
            <p className="font-semibold text-green-800 mb-1">2048-bit ✓</p>
            <p className="text-sm text-green-700">The right default. Secure and universally compatible.</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
            <p className="font-semibold text-amber-800 mb-1">4096-bit</p>
            <p className="text-sm text-amber-700">Overkill for most cases, and can break on some DNS setups.</p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          If someone tells you to just go bigger &quot;to be safe,&quot; that advice skips the actual 
          engineering constraint: DNS TXT records have practical size limits, and DKIM keys have to fit 
          inside them reliably across every receiver&apos;s DNS resolver.
        </p>
      </section>

      {/* Why 1024 is weak */}
      <section id="why-1024-weak" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">!</span>
          Why 1024-Bit Is Considered Weak Now
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          1024-bit RSA used to be the standard when DKIM was first widely adopted. It isn&apos;t anymore. 
          Computing power has grown enough that 1024-bit RSA keys are considered within reach of 
          well-resourced attackers, which defeats the point of signing your mail in the first place.
        </p>

        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100 mb-6">
          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Google publicly deprecated 512-bit and 768-bit DKIM keys</strong> years ago after 
            researchers demonstrated they could be factored. 1024-bit isn&apos;t broken the same way yet, 
            but it&apos;s the next one on that list — which is exactly why the industry consensus moved to 2048-bit.
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          If you inherited a mail server config from a few years ago, there&apos;s a real chance your DKIM 
          key is still 1024-bit. Check it with:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-2 overflow-x-auto">
          <div className="text-sm font-mono text-green-400">
            dig TXT mail._domainkey.yourdomain.com +short
          </div>
        </div>
        <p className="text-gray-500 text-xs mb-6">
          The <code className="bg-gray-100 px-1 rounded">p=</code> value length gives it away — roughly 
          ~215 characters of base64 for a 1024-bit key vs. ~390+ characters for 2048-bit.
        </p>
      </section>

      {/* Why 4096 breaks */}
      <section id="why-4096-breaks" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-lg font-bold">!</span>
          Why 4096-Bit Can Actually Break DKIM
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          This is the part people don&apos;t expect. A single DNS TXT record string has a 255-character 
          limit per segment (though most providers auto-split into multiple quoted segments). A 4096-bit 
          RSA public key encodes to roughly 800+ base64 characters — long enough that it stresses limits 
          in ways 2048-bit almost never does.
        </p>

        <div className="my-6 space-y-4">
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> DNS provider splitting errors
            </p>
            <p className="text-orange-700 text-sm">
              Some DNS panels don&apos;t split long TXT values into multiple strings correctly, or silently 
              truncate them. A 4096-bit key is far more likely to hit this than a 2048-bit key.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> UDP packet size and DNS fallback
            </p>
            <p className="text-orange-700 text-sm">
              Very large TXT responses can push DNS responses past the point where some resolvers cleanly 
              fall back to TCP, causing intermittent lookup failures — the kind that pass in testing and 
              fail in production for a subset of receivers.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Receiver-side length caps
            </p>
            <p className="text-orange-700 text-sm">
              Some mail receivers cap how much DKIM key data they&apos;ll parse. Google and Microsoft handle 
              2048-bit without issue; not every receiver is guaranteed to handle 4096-bit the same way.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          None of this means 4096-bit is impossible to run — some large providers do it successfully. It 
          just means you&apos;re trading a real, measurable increase in fragility for a security benefit 
          that 2048-bit RSA already provides more than enough of for email signing specifically.
        </p>
      </section>

      {/* How to generate */}
      <section id="how-to-generate" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          How to Generate a 2048-Bit Key Correctly
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          If you&apos;re running OpenDKIM on Linux, generate a 2048-bit key explicitly — it&apos;s not always 
          the tool&apos;s default:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-4 overflow-x-auto">
          <div className="text-sm font-mono text-green-400">
            opendkim-genkey -b 2048 -s mail -d yourdomain.com
          </div>
        </div>
        <p className="text-gray-500 text-xs mb-6">
          The <code className="bg-gray-100 px-1 rounded">-b 2048</code> flag is the part people skip — 
          without it, some older OpenDKIM builds still default to 1024-bit.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          If you&apos;re using a managed provider (Google Workspace, Microsoft 365, SendGrid, Mailgun), 
          check their DKIM generation screen — most default to 2048-bit today, but a few legacy setups 
          still offer 1024-bit as an option. Always pick 2048-bit when given the choice.
        </p>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Rotate your selector name when you rotate key size</strong> — e.g. go from 
            <code className="bg-blue-100 px-1 rounded"> mail</code> to <code className="bg-blue-100 px-1 rounded">mail2048</code>. 
            This lets you publish the new key alongside the old one and cut over cleanly instead of a 
            single risky swap.
          </p>
        </div>
      </section>

      {/* Rotating keys */}
      <section id="rotating-keys" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          Rotating an Existing Weak Key Safely
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          If you found a 1024-bit key in production, don&apos;t just delete it and swap in a new one — 
          DNS caching means some receivers will keep using the cached old record for a while after you 
          change it. Overlap the transition instead:
        </p>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
            <p className="text-gray-700 text-sm">Generate the new 2048-bit key under a new selector (e.g. <code className="bg-gray-200 px-1 rounded">mail2048</code>), leave the old selector&apos;s DNS record untouched.</p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
            <p className="text-gray-700 text-sm">Publish the new selector&apos;s public key in DNS and confirm it resolves before touching Postfix/mail server config.</p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
            <p className="text-gray-700 text-sm">Switch your mail server to sign with the new selector. Old mail already in transit still verifies fine against the old key.</p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</span>
            <p className="text-gray-700 text-sm">Wait at least a few days of clean sending on the new key, then remove the old 1024-bit DNS record.</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-100">
          <Clock className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Don&apos;t remove the old key immediately after cutover.</strong> Keep it published for 
            a few days as a safety net in case something in the new signing config needs a fix — it 
            costs nothing to leave an unused DNS record in place briefly.
          </p>
        </div>
      </section>

      {/* Verify */}
      <section id="verify" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          How to Verify It Actually Took
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Don&apos;t just trust that DNS propagated. Send a real test email to Gmail and open 
          &quot;Show original,&quot; then check two things:
        </p>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <p className="text-gray-700 text-sm">
              <code className="bg-green-100 px-1 rounded">DKIM: PASS</code> with the correct selector name 
              showing in the signature header (<code className="bg-green-100 px-1 rounded">s=mail2048</code>, 
              for example).
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <p className="text-gray-700 text-sm">
              The key length in the DNS record. A 2048-bit key&apos;s <code className="bg-green-100 px-1 rounded">p=</code> value 
              should be roughly 380-400 base64 characters, not the shorter ~215 of a 1024-bit key.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          If DKIM still shows as failed after DNS looks correct, double-check that your mail server is 
          actually signing with the new selector and not still pointed at the old key file on disk — 
          that mismatch is the most common cause of &quot;the record looks right but it still fails.&quot;
        </p>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <div className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">✅ DKIM Key Length Checklist</h2>
          <p className="text-gray-400 mb-6 text-sm">Run through this before generating or rotating a DKIM key.</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Generating a new key? Use 2048-bit, not 1024 or 4096</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Checked current key length with dig before assuming it&apos;s fine</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Used a new selector name for the rotated key, not overwriting the old one</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Confirmed new DNS record resolves fully before switching signing config</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Verified DKIM: PASS on a real Gmail test with the correct selector shown</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Left old key published for a few days after cutover before removing it</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Not sure what key length your DKIM is using right now?</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          EmailDiag reads your DKIM record and confirms whether it&apos;s actually passing — no manual 
          dig commands required. Free, takes 10 seconds.
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
            <h4 className="font-semibold text-gray-800 mb-2">Is 1024-bit DKIM broken today?</h4>
            <p className="text-gray-600 text-sm">
              Not broken in the same way 512-bit was, but it&apos;s the accepted next step down as computing 
              power grows. Treat it as &quot;deprecated, rotate when convenient,&quot; not &quot;urgent emergency,&quot; 
              unless you&apos;re in a high-security environment.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Do I need to update SPF or DMARC when I rotate DKIM keys?</h4>
            <p className="text-gray-600 text-sm">
              No. SPF and DMARC don&apos;t reference your DKIM key directly — DMARC just checks whether DKIM 
              passed and aligned. Rotating the DKIM key/selector doesn&apos;t require touching SPF or DMARC 
              records at all.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Can I use Ed25519 instead of RSA for DKIM?</h4>
            <p className="text-gray-600 text-sm">
              RFC 8463 defines Ed25519 support for DKIM, and it produces much shorter keys with strong 
              security. Support across receivers is improving but still inconsistent — the safe default 
              for broad compatibility right now is still RSA-2048, ideally published alongside an 
              Ed25519 key on a separate selector if your mail server supports dual-signing.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
