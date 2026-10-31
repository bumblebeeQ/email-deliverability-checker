import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function BimiRecordSetupGuide2026() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          A marketing lead asked me recently: <strong className="text-gray-800">&quot;Why does our 
          competitor&apos;s email show their logo right next to it in Gmail, and ours just shows a gray 
          circle with an initial?&quot;</strong> That logo is BIMI — Brand Indicators for Message 
          Identification — and getting it requires more than just publishing a DNS record, which is where 
          most setup guides stop short.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          The DNS record itself takes five minutes. What actually gates most companies from getting BIMI 
          live is a prerequisite most people don&apos;t expect: a <strong>Verified Mark Certificate (VMC)</strong>, 
          which costs money, requires a registered trademark, and currently only works for a specific set 
          of mailbox providers.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s the complete picture — the DMARC prerequisite, the VMC requirement, the actual record 
          format, and which providers will show your logo once it&apos;s all in place.
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
            <h3 className="text-lg font-semibold mb-2">BIMI requires enforced DMARC first</h3>
            <p className="text-blue-100 mb-4">
              EmailDiag confirms your DMARC policy and alignment are actually set up correctly — the 
              hard prerequisite before BIMI will work at all.
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
          <a href="#what-is-bimi" className="text-blue-600 hover:underline">What BIMI actually does</a>
          <a href="#prerequisites" className="text-blue-600 hover:underline">The prerequisites (most people skip these)</a>
          <a href="#the-vmc" className="text-blue-600 hover:underline">The VMC: what it is and whether you need one</a>
          <a href="#the-record" className="text-blue-600 hover:underline">The actual BIMI DNS record</a>
          <a href="#provider-support" className="text-blue-600 hover:underline">Which providers actually show it</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick checklist</a>
        </div>
      </div>

      {/* What is BIMI */}
      <section id="what-is-bimi" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          What BIMI Actually Does
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          BIMI lets your verified logo appear next to your emails in the recipient&apos;s inbox, in the spot 
          that normally shows a generic avatar or a letter circle. It&apos;s purely a visual/brand-trust 
          signal — it doesn&apos;t improve deliverability or inbox placement on its own.
        </p>

        <div className="my-6 grid md:grid-cols-2 gap-3">
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">What BIMI does</p>
            <p className="text-sm text-gray-600">
              Displays your verified brand logo in supported inboxes, increasing recognition and trust at a 
              glance before the recipient even opens the email.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">What BIMI does NOT do</p>
            <p className="text-sm text-gray-600">
              Improve spam filtering, inbox placement, or sender reputation directly. It&apos;s a visual 
              reward layered on top of already-strong authentication, not a deliverability fix.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Why it exists at all:</strong> BIMI is built specifically so logo display requires 
            strong DMARC enforcement underneath it. Mailbox providers only show the logo for domains that 
            have already proven they&apos;re actively blocking spoofed mail — which is exactly why it 
            doubles as an indirect trust signal to recipients.
          </p>
        </div>
      </section>

      {/* Prerequisites */}
      <section id="prerequisites" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          The Prerequisites (Most People Skip These)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          BIMI will not display your logo — even with a perfectly formatted record — unless these are 
          already in place:
        </p>

        <div className="my-6 space-y-4">
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> DMARC must be enforced, not just present
            </p>
            <p className="text-orange-700 text-sm">
              Your DMARC policy needs to be <code className="bg-orange-100 px-1 rounded">p=quarantine</code> 
              or <code className="bg-orange-100 px-1 rounded">p=reject</code> — most providers explicitly 
              reject BIMI for domains still at <code className="bg-orange-100 px-1 rounded">p=none</code>. 
              This is the single most common blocker, since many domains stay at <code className="bg-orange-100 px-1 rounded">p=none</code> 
              indefinitely out of caution.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> The logo file itself has strict requirements
            </p>
            <p className="text-orange-700 text-sm">
              Must be an SVG in the restricted <strong>SVG Tiny Portable/Secure (SVG-P/S)</strong> format — 
              not a regular SVG export from Illustrator or Figma. It must be square, typically centered in a 
              circle, with no scripts, external references, or animations allowed.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> The domain needs a decent sending reputation
            </p>
            <p className="text-orange-700 text-sm">
              A domain with poor reputation or low volume history is less likely to render the logo even 
              with everything technically correct — mailbox providers factor in general trust signals, not 
              just the presence of a valid BIMI record.
            </p>
          </div>
        </div>
      </section>

      {/* The VMC */}
      <section id="the-vmc" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          The VMC: What It Is and Whether You Need One
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          A <strong>Verified Mark Certificate (VMC)</strong> is a digital certificate that cryptographically 
          proves you have legal rights to the logo you&apos;re publishing — issued by a small number of 
          Certificate Authorities (currently DigiCert and Entrust) after reviewing your trademark registration.
        </p>

        <div className="my-6 overflow-x-auto">
          <table className="w-full text-sm border rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left font-semibold text-gray-800">Requirement</th>
                <th className="p-3 text-left font-semibold text-gray-800">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr className="bg-white">
                <td className="p-3 text-gray-700">Registered trademark</td>
                <td className="p-3 text-gray-700">Required — a pending application or unregistered mark won&apos;t qualify</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 text-gray-700">Approximate cost</td>
                <td className="p-3 text-gray-700">Roughly $1,000–$1,500/year depending on the issuing CA</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 text-gray-700">Issuance time</td>
                <td className="p-3 text-gray-700">Days to a few weeks, depending on trademark verification</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 text-gray-700">Who requires it</td>
                <td className="p-3 text-gray-700">Gmail requires a VMC; some other providers display logos without one</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
          <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>No trademark, no VMC, no Gmail logo.</strong> This trips up a lot of smaller businesses 
            and startups who haven&apos;t registered a trademark yet — there&apos;s currently no workaround 
            for Gmail specifically. If trademark registration isn&apos;t realistic right now, you can still 
            publish a BIMI record and get logo display on providers that don&apos;t require a VMC.
          </p>
        </div>
      </section>

      {/* The record */}
      <section id="the-record" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          The Actual BIMI DNS Record
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Once prerequisites are met, the record itself is a single TXT record at a specific subdomain:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-2 overflow-x-auto">
          <div className="text-sm font-mono text-green-400">
            default._bimi.yourdomain.com TXT<br />
            v=BIMI1; l=https://yourdomain.com/logo.svg; a=https://yourdomain.com/vmc.pem
          </div>
        </div>
        <p className="text-gray-500 text-xs mb-6">
          <code className="bg-gray-100 px-1 rounded">l=</code> points to your logo file, 
          <code className="bg-gray-100 px-1 rounded"> a=</code> points to your VMC (omit this tag entirely 
          if you don&apos;t have one yet)
        </p>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
            <p className="text-gray-700 text-sm">
              Host your SVG-P/S logo file at a publicly accessible HTTPS URL — most providers require HTTPS, 
              not plain HTTP.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
            <p className="text-gray-700 text-sm">
              If you have a VMC, host the certificate file (<code className="bg-gray-200 px-1 rounded">.pem</code>) 
              at an HTTPS URL too, and reference it with the <code className="bg-gray-200 px-1 rounded">a=</code> tag.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
            <p className="text-gray-700 text-sm">
              Publish the TXT record at the exact <code className="bg-gray-200 px-1 rounded">default._bimi.</code> 
              subdomain prefix — this exact label is required by the spec, not optional or customizable.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</span>
            <p className="text-gray-700 text-sm">
              Confirm DMARC is already enforced (<code className="bg-gray-200 px-1 rounded">p=quarantine</code> 
              or <code className="bg-gray-200 px-1 rounded">p=reject</code>) before expecting any logo to show.
            </p>
          </div>
        </div>
      </section>

      {/* Provider support */}
      <section id="provider-support" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          Which Providers Actually Show It
        </h2>

        <div className="my-6 overflow-x-auto">
          <table className="w-full text-sm border rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left font-semibold text-gray-800">Provider</th>
                <th className="p-3 text-left font-semibold text-gray-800">VMC required?</th>
                <th className="p-3 text-left font-semibold text-gray-800">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr className="bg-white">
                <td className="p-3 text-gray-700">Gmail / Google Workspace</td>
                <td className="p-3 text-red-700 font-medium">Yes</td>
                <td className="p-3 text-gray-700">No logo without a valid VMC</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 text-gray-700">Yahoo / AOL</td>
                <td className="p-3 text-green-700 font-medium">No</td>
                <td className="p-3 text-gray-700">Will display logo with just DMARC enforcement + valid SVG</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 text-gray-700">Apple Mail / iCloud</td>
                <td className="p-3 text-green-700 font-medium">No</td>
                <td className="p-3 text-gray-700">Supports BIMI without requiring a VMC</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 text-gray-700">Microsoft Outlook / 365</td>
                <td className="p-3 text-amber-700 font-medium">Rolling out</td>
                <td className="p-3 text-gray-700">Support has been expanding gradually; check current status before relying on it</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>You get partial coverage even without a VMC.</strong> Publishing BIMI without a VMC 
            still gets your logo showing on Yahoo and Apple Mail — a meaningful chunk of inboxes — while you 
            decide whether a VMC&apos;s cost is worth it for Gmail coverage specifically.
          </p>
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <div className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">✅ BIMI Setup Checklist</h2>
          <p className="text-gray-400 mb-6 text-sm">Run through this before expecting your logo to appear.</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>DMARC policy set to p=quarantine or p=reject (not p=none)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Logo converted to valid SVG-P/S format (not a standard SVG export)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Logo and VMC (if applicable) hosted at publicly accessible HTTPS URLs</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Decided whether a VMC is worth the cost for Gmail coverage specifically</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Published TXT record at exact default._bimi.yourdomain.com</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Confirmed domain has reasonable sending reputation/volume history</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Confirm your DMARC enforcement level first</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          BIMI needs p=quarantine or p=reject to work at all. EmailDiag checks your current DMARC policy 
          and alignment in 10 seconds, free.
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
            <h4 className="font-semibold text-gray-800 mb-2">Can I use a regular PNG or JPG logo for BIMI?</h4>
            <p className="text-gray-600 text-sm">
              No. BIMI specifically requires SVG Tiny Portable/Secure format — a restricted SVG profile with 
              scripts, external references, and certain elements stripped out for security. You&apos;ll need 
              a tool or service that converts and validates against this specific profile, not a generic 
              image converter.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Will moving to p=reject for BIMI break any legitimate mail?</h4>
            <p className="text-gray-600 text-sm">
              It can, if any legitimate sending source isn&apos;t yet DMARC-aligned. Don&apos;t jump straight 
              to enforcement just to unlock BIMI — follow the standard p=none → p=quarantine → p=reject 
              progression, confirming alignment at each stage first via DMARC reports.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Does BIMI work for subdomains, or only the root domain?</h4>
            <p className="text-gray-600 text-sm">
              You can publish a separate BIMI record for a subdomain if you send from it with its own 
              aligned DMARC policy. Each sending domain/subdomain that wants its own logo generally needs 
              its own BIMI record and matching DMARC enforcement.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
