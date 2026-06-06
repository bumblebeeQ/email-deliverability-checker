import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, Shield, HelpCircle } from 'lucide-react';

export default function SpfSoftFailVsHardFail() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          I spent an embarrassing amount of time staring at SPF records before I finally 
          understood the difference between <code className="bg-gray-100 px-2 py-0.5 rounded text-blue-700">~all</code> and <code className="bg-gray-100 px-2 py-0.5 rounded text-blue-700">-all</code>. 
          <strong className="text-gray-800"> One character. That&apos;s it. But get it wrong, and your emails either get silently flagged or straight-up rejected.</strong>
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s what triggered my deep dive: a client switched from <code className="bg-gray-100 px-1 rounded">~all</code> to <code className="bg-gray-100 px-1 rounded">-all</code> on 
          a Friday afternoon (classic) without realizing their CRM was sending from a server 
          not listed in their SPF record. Monday morning — 2,000+ customer emails bounced. 
          The CEO called me at 7 AM. Fun times.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          That experience taught me that this isn&apos;t just a theoretical DNS thing — choosing 
          between soft fail and hard fail has real consequences. And most guides online either 
          oversimplify it (&quot;just use -all, it&apos;s more secure&quot;) or make it way too complicated.
        </p>
        <p className="text-gray-700 leading-relaxed">
          So here&apos;s the practical breakdown: what each one does, when to use which, 
          and the mistakes I keep seeing people make.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Not sure what your SPF record says right now?</h3>
            <p className="text-blue-100 mb-4">
              Before changing anything, check your current setup. A quick scan will show you 
              whether you&apos;re on soft fail or hard fail — and if there are other issues hiding in your record.
            </p>
            <Link 
              href="/test"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Scan My SPF Record <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="my-10 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-4">What we&apos;ll cover:</h3>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <a href="#quick-answer" className="text-blue-600 hover:underline">The 30-second answer</a>
          <a href="#what-is-spf" className="text-blue-600 hover:underline">SPF in plain English (quick refresher)</a>
          <a href="#soft-fail" className="text-blue-600 hover:underline">What soft fail (~all) actually does</a>
          <a href="#hard-fail" className="text-blue-600 hover:underline">What hard fail (-all) actually does</a>
          <a href="#comparison" className="text-blue-600 hover:underline">Side-by-side comparison table</a>
          <a href="#which-to-use" className="text-blue-600 hover:underline">Which one should YOU use?</a>
          <a href="#migration" className="text-blue-600 hover:underline">How to safely switch from ~all to -all</a>
          <a href="#mistakes" className="text-blue-600 hover:underline">5 mistakes I keep seeing</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick decision checklist</a>
        </div>
      </div>

      {/* Section: Quick Answer */}
      <section id="quick-answer" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-lg">⚡</span>
          The 30-Second Answer
        </h2>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
          <p className="text-gray-800 leading-relaxed mb-4">
            <strong>Soft fail (<code className="bg-white px-1.5 py-0.5 rounded border">~all</code>):</strong> If 
            an email comes from a server not in your SPF record, mark it as suspicious but still deliver it. 
            Think of it as a yellow flag — &quot;this might not be legit, but don&apos;t block it yet.&quot;
          </p>
          <p className="text-gray-800 leading-relaxed">
            <strong>Hard fail (<code className="bg-white px-1.5 py-0.5 rounded border">-all</code>):</strong> If 
            an email comes from an unauthorized server, reject it outright. Red card. 
            &quot;This is definitely not from us, throw it away.&quot;
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Most domains should start with <code className="bg-gray-100 px-1 rounded">~all</code> (soft fail) and 
          only switch to <code className="bg-gray-100 px-1 rounded">-all</code> (hard fail) once you&apos;re 100% sure 
          every legitimate email source is listed. But there&apos;s more nuance to it than that — keep reading.
        </p>
      </section>

      {/* Section: SPF Refresher */}
      <section id="what-is-spf" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-500" />
          SPF in Plain English (Quick Refresher)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          If you already know what SPF is, skip ahead. But for the quick version:
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          SPF (Sender Policy Framework) is basically a list of servers allowed to send email 
          on behalf of your domain. You publish it as a DNS TXT record, and when someone receives 
          an email claiming to be from your domain, they check this list.
        </p>

        <div className="bg-gray-900 rounded-xl p-6 my-6 overflow-x-auto">
          <p className="text-gray-400 text-sm mb-2"># A typical SPF record looks like this:</p>
          <code className="text-green-400 text-sm">
            v=spf1 include:_spf.google.com include:sendgrid.net ip4:203.0.113.5 ~all
          </code>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          That last part — the <code className="bg-gray-100 px-1 rounded">~all</code> or <code className="bg-gray-100 px-1 rounded">-all</code> — is 
          the &quot;all mechanism.&quot; It tells receiving servers what to do with emails from servers 
          NOT in your list. And that&apos;s where the soft fail vs hard fail decision lives.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-6">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-gray-700 text-sm">
                <strong>Quick note:</strong> There&apos;s also <code className="bg-white px-1 rounded">?all</code> (neutral) 
                and <code className="bg-white px-1 rounded">+all</code> (pass all). Neutral means &quot;I have no opinion,&quot; 
                and +all means &quot;anyone can send as me&quot; — which is basically saying &quot;please spoof my domain.&quot; 
                If you see +all in your record... fix it immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Soft Fail */}
      <section id="soft-fail" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-lg">~</span>
          What Soft Fail (~all) Actually Does
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          When a receiving server sees <code className="bg-gray-100 px-1 rounded">~all</code> in your SPF record 
          and the email came from an unlisted server, here&apos;s what happens in practice:
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-gray-800">The email gets marked as &quot;softfail&quot;</p>
              <p className="text-sm text-gray-600 mt-1">
                You&apos;ll see <code className="bg-white px-1 rounded text-xs">Received-SPF: softfail</code> in 
                the email headers. The receiving server knows it&apos;s suspicious.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-gray-800">It&apos;s usually still delivered</p>
              <p className="text-sm text-gray-600 mt-1">
                Most mail servers won&apos;t reject it. But they might bump up the spam score. 
                Gmail, for example, considers SPF softfail as one factor among many — it won&apos;t 
                automatically junk the email, but it&apos;s not helping.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-gray-800">DMARC still uses it for alignment checks</p>
              <p className="text-sm text-gray-600 mt-1">
                If you have DMARC set up (you should), a soft fail still counts as an SPF failure 
                for DMARC purposes. So your DMARC policy might handle it more strictly than the 
                soft fail alone would suggest.
              </p>
            </div>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          The real-world effect? <strong>Soft fail is forgiving.</strong> If you forgot to add a 
          mail server to your SPF record, emails from that server will probably still get through. 
          They might land in spam more often, but they won&apos;t get rejected at the gate.
        </p>

        <p className="text-gray-700 leading-relaxed">
          I think of <code className="bg-gray-100 px-1 rounded">~all</code> as the &quot;I&apos;m still figuring things out&quot; setting. 
          It gives you room to make mistakes without catastrophic consequences.
        </p>
      </section>

      {/* Section: Hard Fail */}
      <section id="hard-fail" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg">-</span>
          What Hard Fail (-all) Actually Does
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Hard fail is the strict version. When a server sees <code className="bg-gray-100 px-1 rounded">-all</code> and 
          the sending IP isn&apos;t listed:
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
            <XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-gray-800">The email is marked as &quot;fail&quot;</p>
              <p className="text-sm text-gray-600 mt-1">
                Headers will show <code className="bg-white px-1 rounded text-xs">Received-SPF: fail</code>. 
                This is a strong signal that the email is unauthorized.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
            <XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-gray-800">Many servers will reject it outright</p>
              <p className="text-sm text-gray-600 mt-1">
                Unlike soft fail, hard fail gives receiving servers permission to bounce the email. 
                Not all will — Gmail often still delivers it to spam rather than rejecting — but 
                strict corporate mail servers (Exchange, Barracuda, Proofpoint) will often reject it cold.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
            <XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-gray-800">You won&apos;t always get a bounce notification</p>
              <p className="text-sm text-gray-600 mt-1">
                This is the scary part. If a legitimate email gets rejected due to hard fail, you 
                might never know. The sender might not get a bounce-back (depending on the rejecting 
                server&apos;s config), and the recipient just... never sees the email.
              </p>
            </div>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>Hard fail means confidence.</strong> You&apos;re telling the world: &quot;I know exactly 
          who sends email for my domain. If it&apos;s not on this list, it&apos;s fake.&quot; 
          Great for security. Terrifying if you missed a server.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Remember my client who switched on a Friday? They were confident too. Turns out they 
          forgot their CRM system uses a third-party relay that wasn&apos;t in the SPF record. 
          Two thousand bounced emails later, they learned the hard way what &quot;hard fail&quot; means.
        </p>
      </section>

      {/* Section: Comparison Table */}
      <section id="comparison" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-lg">⚖️</span>
          Side-by-Side Comparison
        </h2>

        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700"></th>
                <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-yellow-700">Soft Fail (~all)</th>
                <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-red-700">Hard Fail (-all)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">What it says</td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">&quot;This is suspicious but don&apos;t reject it&quot;</td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">&quot;This is unauthorized, reject it&quot;</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">SPF header result</td>
                <td className="border border-gray-200 px-4 py-3 text-sm"><code className="bg-yellow-100 px-1 rounded">softfail</code></td>
                <td className="border border-gray-200 px-4 py-3 text-sm"><code className="bg-red-100 px-1 rounded">fail</code></td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">Email delivery</td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">Usually delivered (maybe to spam)</td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">Often rejected or bounced</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">Risk level</td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">Low — mistakes are forgiving</td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">High — mistakes cause lost email</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">Security</td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">Moderate — doesn&apos;t stop spoofing</td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">Strong — actively blocks spoofing</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">Best for</td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">Setting up, multiple senders, not fully audited</td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">Fully audited domains, high-security needs</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">DMARC interaction</td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">Still counts as SPF fail for DMARC</td>
                <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">Counts as SPF fail for DMARC</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-6">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-gray-700 text-sm">
                <strong>Important nuance:</strong> In practice, Gmail treats soft fail and hard fail almost 
                the same — it uses them as spam scoring signals rather than hard reject triggers. 
                But corporate email gateways (Mimecast, Proofpoint, Barracuda) take hard fail very 
                literally. If your recipients are mostly enterprise/corporate, hard fail can definitely 
                cause bounced emails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Which To Use */}
      <section id="which-to-use" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-lg">🎯</span>
          Which One Should YOU Use?
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          After dealing with this for dozens of domains, here&apos;s my decision framework:
        </p>

        <div className="space-y-6 mb-8">
          {/* Use Soft Fail */}
          <div className="border border-yellow-200 rounded-xl overflow-hidden">
            <div className="bg-yellow-50 px-5 py-3 border-b border-yellow-200">
              <h3 className="font-semibold text-yellow-800">Use ~all (soft fail) if:</h3>
            </div>
            <div className="px-5 py-4 space-y-2">
              <p className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-yellow-500 mt-0.5">→</span> 
                You&apos;re still setting up email authentication for the first time
              </p>
              <p className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-yellow-500 mt-0.5">→</span> 
                You have multiple departments/teams sending email (and you&apos;re not sure you&apos;ve listed them all)
              </p>
              <p className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-yellow-500 mt-0.5">→</span> 
                Your company uses lots of SaaS tools that send email on your behalf
              </p>
              <p className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-yellow-500 mt-0.5">→</span> 
                You don&apos;t have a complete inventory of all email-sending services
              </p>
              <p className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-yellow-500 mt-0.5">→</span> 
                You forward email to other domains (forwarding breaks SPF)
              </p>
            </div>
          </div>

          {/* Use Hard Fail */}
          <div className="border border-red-200 rounded-xl overflow-hidden">
            <div className="bg-red-50 px-5 py-3 border-b border-red-200">
              <h3 className="font-semibold text-red-800">Use -all (hard fail) if:</h3>
            </div>
            <div className="px-5 py-4 space-y-2">
              <p className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-red-500 mt-0.5">→</span> 
                You&apos;ve done a thorough audit of ALL services sending email for your domain
              </p>
              <p className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-red-500 mt-0.5">→</span> 
                You&apos;ve been on ~all for a while and your DMARC reports show zero legitimate failures
              </p>
              <p className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-red-500 mt-0.5">→</span> 
                Security is a top priority (financial services, healthcare, government)
              </p>
              <p className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-red-500 mt-0.5">→</span> 
                You&apos;re on DMARC <code className="bg-white px-1 rounded text-xs">p=reject</code> and everything is passing
              </p>
              <p className="text-gray-700 text-sm flex items-start gap-2">
                <span className="text-red-500 mt-0.5">→</span> 
                Your domain has been targeted by spoofing/phishing attacks
              </p>
            </div>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>My honest recommendation?</strong> Most small-to-medium businesses should stay on 
          <code className="bg-gray-100 px-1 rounded">~all</code>. Not because hard fail is bad — it&apos;s objectively more secure — 
          but because the downside of accidentally blocking legitimate email is usually worse than the 
          marginal security gain.
        </p>

        <p className="text-gray-700 leading-relaxed">
          The real protection against spoofing comes from DMARC anyway. If you have DMARC with 
          <code className="bg-gray-100 px-1 rounded">p=quarantine</code> or <code className="bg-gray-100 px-1 rounded">p=reject</code>, 
          you&apos;re already protected regardless of whether your SPF uses ~ or -. So the pressure 
          to rush to hard fail is lower than people think.
        </p>
      </section>

      {/* Section: Migration Guide */}
      <section id="migration" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg">🔄</span>
          How to Safely Switch from ~all to -all
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          If you do decide to make the switch, here&apos;s the process I use with clients. 
          It takes about 2-4 weeks but saves you from that Monday morning panic call.
        </p>

        <div className="space-y-6 mb-8">
          {/* Step 1 */}
          <div className="relative pl-8 border-l-2 border-blue-200">
            <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
            <h4 className="font-semibold text-gray-800 mb-2">Set up DMARC reporting first</h4>
            <p className="text-gray-600 text-sm mb-2">
              If you don&apos;t already have DMARC with reporting, add it:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code className="text-green-400 text-xs">
                v=DMARC1; p=none; rua=mailto:dmarc-reports@yourdomain.com
              </code>
            </div>
            <p className="text-gray-600 text-sm mt-2">
              The <code className="bg-gray-100 px-1 rounded text-xs">p=none</code> means no enforcement yet — we&apos;re just collecting data. 
              Wait at least 2 weeks to get enough data.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative pl-8 border-l-2 border-blue-200">
            <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
            <h4 className="font-semibold text-gray-800 mb-2">Analyze DMARC reports</h4>
            <p className="text-gray-600 text-sm mb-2">
              Look for legitimate sources showing SPF failures. Common culprits I find:
            </p>
            <ul className="text-gray-600 text-sm space-y-1 list-disc pl-5">
              <li>CRM systems (HubSpot, Salesforce) sending notifications</li>
              <li>Helpdesk tools (Zendesk, Freshdesk) replying to tickets</li>
              <li>Marketing platforms (Mailchimp, Klaviyo) sending campaigns</li>
              <li>Internal tools sending alerts or reports</li>
              <li>Third-party billing systems sending invoices</li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="relative pl-8 border-l-2 border-blue-200">
            <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
            <h4 className="font-semibold text-gray-800 mb-2">Add all legitimate sources to SPF</h4>
            <p className="text-gray-600 text-sm mb-2">
              For each legitimate source failing SPF, add the appropriate include or IP:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code className="text-green-400 text-xs">
                v=spf1 include:_spf.google.com include:sendgrid.net include:spf.protection.outlook.com ~all
              </code>
            </div>
            <p className="text-gray-600 text-sm mt-2">
              ⚠️ Watch your lookup count — stay under 10. If you need help with that, 
              check out my <Link href="/blog/spf-lookup-limit-exceeded" className="text-blue-600 hover:underline">SPF lookup limit guide</Link>.
            </p>
          </div>

          {/* Step 4 */}
          <div className="relative pl-8 border-l-2 border-blue-200">
            <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
            <h4 className="font-semibold text-gray-800 mb-2">Wait another week, check reports again</h4>
            <p className="text-gray-600 text-sm">
              Are there still legitimate failures? If yes, go back to step 3. 
              If reports are clean (only unauthorized senders failing), you&apos;re ready.
            </p>
          </div>

          {/* Step 5 */}
          <div className="relative pl-8 border-l-2 border-blue-200">
            <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</div>
            <h4 className="font-semibold text-gray-800 mb-2">Make the switch</h4>
            <p className="text-gray-600 text-sm mb-2">
              Change <code className="bg-gray-100 px-1 rounded text-xs">~all</code> to <code className="bg-gray-100 px-1 rounded text-xs">-all</code>. 
              Do it on a <strong>Tuesday morning</strong> (not Friday afternoon... trust me). 
              Monitor closely for 48 hours.
            </p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-gray-700 text-sm">
                <strong>Pro tip:</strong> Keep a record of your previous SPF record before changing it. 
                If things go wrong, you can revert in under 5 minutes. DNS propagation is usually 
                fast for TXT record changes (5-30 minutes for most providers).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Common Mistakes */}
      <section id="mistakes" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg">⚠️</span>
          5 Mistakes I Keep Seeing
        </h2>

        <div className="space-y-6">
          {/* Mistake 1 */}
          <div className="border border-gray-200 rounded-xl p-5">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500" />
              Mistake #1: Jumping straight to -all on a new domain
            </h4>
            <p className="text-gray-600 text-sm mb-2">
              I get it — you read that -all is &quot;more secure&quot; and want the best protection from day one. 
              But if you haven&apos;t audited every service that sends email for you, you&apos;re going to break something.
            </p>
            <div className="bg-green-50 rounded-lg p-3 mt-3">
              <p className="text-sm text-green-800">
                <CheckCircle className="w-4 h-4 inline text-green-600 mr-1" />
                <strong>Do this instead:</strong> Start with ~all, set up DMARC reporting, wait 2-4 weeks, 
                then graduate to -all once you have data.
              </p>
            </div>
          </div>

          {/* Mistake 2 */}
          <div className="border border-gray-200 rounded-xl p-5">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500" />
              Mistake #2: Using -all but not having DMARC
            </h4>
            <p className="text-gray-600 text-sm mb-2">
              SPF hard fail without DMARC is like locking your front door but leaving the back door wide open. 
              Spoofers can still abuse your domain via forwarded emails and other workarounds. 
              DMARC ties everything together.
            </p>
            <div className="bg-green-50 rounded-lg p-3 mt-3">
              <p className="text-sm text-green-800">
                <CheckCircle className="w-4 h-4 inline text-green-600 mr-1" />
                <strong>Do this instead:</strong> Always pair SPF with DKIM and DMARC. The three work together — 
                no single one is sufficient alone.
              </p>
            </div>
          </div>

          {/* Mistake 3 */}
          <div className="border border-gray-200 rounded-xl p-5">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500" />
              Mistake #3: Forgetting about email forwarding
            </h4>
            <p className="text-gray-600 text-sm mb-2">
              This one bites people all the time. When an email is forwarded (like an alias forwarding to a personal inbox), 
              the sending IP changes but the envelope sender stays the same. SPF checks the forwarding 
              server&apos;s IP against your record — and it fails. With -all, those forwarded emails get rejected.
            </p>
            <div className="bg-green-50 rounded-lg p-3 mt-3">
              <p className="text-sm text-green-800">
                <CheckCircle className="w-4 h-4 inline text-green-600 mr-1" />
                <strong>Do this instead:</strong> If your recipients forward email, ~all is safer. 
                Alternatively, rely on DKIM for DMARC alignment — DKIM survives forwarding, SPF doesn&apos;t.
              </p>
            </div>
          </div>

          {/* Mistake 4 */}
          <div className="border border-gray-200 rounded-xl p-5">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500" />
              Mistake #4: Switching on a Friday (or before a holiday)
            </h4>
            <p className="text-gray-600 text-sm mb-2">
              I mentioned this already but it bears repeating because I&apos;ve seen it happen three times 
              in the last year alone. DNS changes propagate over hours. If you switch to -all on Friday 
              at 5 PM and something breaks, you won&apos;t catch it until Monday when your support inbox is 
              overflowing with &quot;I never got your email.&quot;
            </p>
            <div className="bg-green-50 rounded-lg p-3 mt-3">
              <p className="text-sm text-green-800">
                <CheckCircle className="w-4 h-4 inline text-green-600 mr-1" />
                <strong>Do this instead:</strong> Tuesday or Wednesday morning. 
                Have someone monitoring bounce rates for 48 hours after the change.
              </p>
            </div>
          </div>

          {/* Mistake 5 */}
          <div className="border border-gray-200 rounded-xl p-5">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500" />
              Mistake #5: Thinking -all alone stops spoofing
            </h4>
            <p className="text-gray-600 text-sm mb-2">
              Here&apos;s the uncomfortable truth: SPF -all does NOT prevent all spoofing. 
              SPF only checks the envelope sender (MAIL FROM), not the visible &quot;From:&quot; header 
              that users see. An attacker can still send email with a different envelope sender 
              and forge your domain in the visible From header — unless you have DMARC enforcing alignment.
            </p>
            <div className="bg-green-50 rounded-lg p-3 mt-3">
              <p className="text-sm text-green-800">
                <CheckCircle className="w-4 h-4 inline text-green-600 mr-1" />
                <strong>Do this instead:</strong> Implement DMARC with <code className="bg-white px-1 rounded text-xs">p=reject</code> for 
                real spoofing protection. SPF is one piece of the puzzle, not the whole picture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Quick Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-green-500" />
          Quick Decision Checklist
        </h2>

        <div className="bg-gray-50 rounded-xl p-6 my-6">
          <h4 className="font-semibold text-gray-800 mb-4">Before choosing your SPF &quot;all&quot; mechanism:</h4>
          <div className="space-y-3">
            <label className="flex items-start gap-3 text-sm text-gray-700">
              <input type="checkbox" className="mt-0.5 rounded" readOnly />
              <span>I&apos;ve listed every service/server that sends email for my domain</span>
            </label>
            <label className="flex items-start gap-3 text-sm text-gray-700">
              <input type="checkbox" className="mt-0.5 rounded" readOnly />
              <span>I have DMARC set up with reporting (rua) enabled</span>
            </label>
            <label className="flex items-start gap-3 text-sm text-gray-700">
              <input type="checkbox" className="mt-0.5 rounded" readOnly />
              <span>I&apos;ve reviewed at least 2 weeks of DMARC aggregate reports</span>
            </label>
            <label className="flex items-start gap-3 text-sm text-gray-700">
              <input type="checkbox" className="mt-0.5 rounded" readOnly />
              <span>No legitimate senders are showing SPF failures in reports</span>
            </label>
            <label className="flex items-start gap-3 text-sm text-gray-700">
              <input type="checkbox" className="mt-0.5 rounded" readOnly />
              <span>I&apos;ve checked if any recipients use email forwarding</span>
            </label>
            <label className="flex items-start gap-3 text-sm text-gray-700">
              <input type="checkbox" className="mt-0.5 rounded" readOnly />
              <span>My SPF record has fewer than 10 DNS lookups</span>
            </label>
            <label className="flex items-start gap-3 text-sm text-gray-700">
              <input type="checkbox" className="mt-0.5 rounded" readOnly />
              <span>DKIM is configured and passing for all legitimate senders</span>
            </label>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-700 mb-2">
              <strong>✅ All checked?</strong> → You can safely use <code className="bg-white px-1 rounded text-xs border">-all</code>
            </p>
            <p className="text-sm text-gray-700">
              <strong>❌ Some unchecked?</strong> → Stick with <code className="bg-white px-1 rounded text-xs border">~all</code> until you can check them all
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl text-white">
        <h3 className="text-xl font-bold mb-3">Check your SPF record in 30 seconds</h3>
        <p className="text-blue-100 mb-6 leading-relaxed">
          Not sure whether your record is set up correctly — or which &quot;all&quot; mechanism you&apos;re currently using? 
          Run a free scan and get a clear breakdown of your SPF, DKIM, and DMARC status.
        </p>
        <Link 
          href="/test"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg"
        >
          Scan My Domain Free <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Related Articles */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">Related guides you might find useful:</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <Link href="/blog/spf-lookup-limit-exceeded" className="text-blue-600 hover:underline text-sm">
            → SPF Lookup Limit Exceeded? Here&apos;s How I Fixed It
          </Link>
          <Link href="/blog/spf-vs-dkim-vs-dmarc" className="text-blue-600 hover:underline text-sm">
            → SPF vs DKIM vs DMARC: What&apos;s the Difference?
          </Link>
          <Link href="/blog/fix-spf-record-cloudflare" className="text-blue-600 hover:underline text-sm">
            → How to Fix SPF Record on Cloudflare
          </Link>
          <Link href="/blog/dmarc-policy-not-found" className="text-blue-600 hover:underline text-sm">
            → &quot;DMARC Policy Not Found&quot; Error? Here&apos;s the Fix
          </Link>
        </div>
      </div>
    </>
  );
}
