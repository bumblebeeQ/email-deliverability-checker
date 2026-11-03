import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function MtaStsSetupGuideEmailSecurity() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          A security-conscious admin asked in r/sysadmin: <strong className="text-gray-800">&quot;We&apos;ve 
          got SPF, DKIM, DMARC all locked down. Security audit still flagged us for missing MTA-STS. What 
          does that even protect against that DMARC doesn&apos;t?&quot;</strong> Fair question — and the 
          answer is that MTA-STS protects something DMARC was never designed to touch at all: the connection 
          itself, not the message.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          SPF, DKIM, and DMARC all verify things about a message after it&apos;s been delivered. MTA-STS 
          works earlier than that — it forces incoming mail <em>to</em> your domain to arrive over an 
          encrypted, authenticated connection in the first place, closing off a specific downgrade attack 
          that none of the authentication trio even looks at.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          It&apos;s a newer, less commonly implemented standard, which is exactly why security audits flag 
          its absence even on otherwise well-configured domains. Here&apos;s what it actually does and the 
          exact setup.
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
            <h3 className="text-lg font-semibold mb-2">Get the outbound authentication layer solid first</h3>
            <p className="text-blue-100 mb-4">
              EmailDiag confirms SPF, DKIM, and DMARC on your domain — the layer MTA-STS complements, not replaces.
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
          <a href="#what-mta-sts-protects" className="text-blue-600 hover:underline">What MTA-STS actually protects against</a>
          <a href="#how-it-differs" className="text-blue-600 hover:underline">How it differs from SPF/DKIM/DMARC</a>
          <a href="#the-setup" className="text-blue-600 hover:underline">The full setup: policy file + DNS record</a>
          <a href="#tls-rpt" className="text-blue-600 hover:underline">Pairing it with TLS-RPT for visibility</a>
          <a href="#rollout-strategy" className="text-blue-600 hover:underline">Rollout strategy (don&apos;t jump to enforce)</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick checklist</a>
        </div>
      </div>

      {/* What it protects */}
      <section id="what-mta-sts-protects" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          What MTA-STS Actually Protects Against
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          By default, SMTP connections between mail servers attempt STARTTLS encryption, but if that 
          negotiation fails for any reason, most servers quietly fall back to sending the message in plain 
          text anyway rather than refuse delivery. That fallback behavior is the vulnerability.
        </p>

        <div className="my-6 grid md:grid-cols-2 gap-3">
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">The attack: STARTTLS downgrade / SMTP MITM</p>
            <p className="text-sm text-gray-600">
              An attacker positioned on the network path (or spoofing DNS/MX records) interferes with the 
              TLS handshake, forcing the connection to fall back to unencrypted plain text — then reads or 
              modifies the mail in transit.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">What MTA-STS does about it</p>
            <p className="text-sm text-gray-600">
              Publishes a policy telling sending servers: &quot;always require valid TLS to deliver to this 
              domain, and refuse to send/fall back to plain text if TLS fails.&quot; No more silent downgrade.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>This is a transport-layer attack, not a message-spoofing attack.</strong> SPF/DKIM/DMARC 
            all verify who sent a message and whether it was tampered with after arrival. MTA-STS addresses 
            a completely different threat: whether the message was ever exposed or interceptable in transit 
            on the way to your mail server, regardless of who ultimately signed it.
          </p>
        </div>
      </section>

      {/* How it differs */}
      <section id="how-it-differs" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          How It Differs From SPF/DKIM/DMARC
        </h2>

        <div className="my-6 overflow-x-auto">
          <table className="w-full text-sm border rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left font-semibold text-gray-800">Mechanism</th>
                <th className="p-3 text-left font-semibold text-gray-800">What it verifies</th>
                <th className="p-3 text-left font-semibold text-gray-800">Direction</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr className="bg-white">
                <td className="p-3 text-gray-700 font-medium">SPF</td>
                <td className="p-3 text-gray-700">Is the sending IP authorized for this domain?</td>
                <td className="p-3 text-gray-700">Outbound (your mail to others)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 text-gray-700 font-medium">DKIM</td>
                <td className="p-3 text-gray-700">Was this message signed and untampered?</td>
                <td className="p-3 text-gray-700">Outbound</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 text-gray-700 font-medium">DMARC</td>
                <td className="p-3 text-gray-700">Do SPF/DKIM align with the visible From domain?</td>
                <td className="p-3 text-gray-700">Outbound</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 text-gray-700 font-medium">MTA-STS</td>
                <td className="p-3 text-gray-700">Was the connection to deliver mail to you properly encrypted?</td>
                <td className="p-3 text-blue-700 font-medium">Inbound (mail arriving to you)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-gray-700 leading-relaxed">
          That direction difference is the key thing to understand: MTA-STS is a policy <em>you</em> publish 
          to protect mail <em>arriving at your domain</em>, not a check on mail you send out. It&apos;s 
          enforced by whoever is sending <em>to</em> you, respecting your published policy.
        </p>
      </section>

      {/* The setup */}
      <section id="the-setup" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          The Full Setup: Policy File + DNS Record
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          MTA-STS has two parts: a DNS TXT record that announces you support it, and an HTTPS-hosted policy 
          file that spells out the actual rules.
        </p>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
            <div className="text-sm text-gray-700 w-full">
              <p className="mb-2">Publish the DNS TXT record at a fixed subdomain:</p>
              <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                <div className="text-sm font-mono text-green-400">
                  _mta-sts.yourdomain.com TXT<br />
                  v=STSv1; id=20261101000000;
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-2">The <code className="bg-gray-100 px-1 rounded">id=</code> value just needs to change whenever you update the policy — a timestamp works well.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
            <div className="text-sm text-gray-700 w-full">
              <p className="mb-2">Host a policy file at this exact fixed HTTPS path:</p>
              <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                <div className="text-sm font-mono text-green-400">
                  https://mta-sts.yourdomain.com/.well-known/mta-sts.txt
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
            <div className="text-sm text-gray-700 w-full">
              <p className="mb-2">Policy file contents:</p>
              <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                <div className="text-sm font-mono text-green-400 space-y-1">
                  <div>version: STSv1</div>
                  <div>mode: testing</div>
                  <div>mx: mail.yourdomain.com</div>
                  <div>max_age: 86400</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-100">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>The policy file itself needs valid HTTPS with a trusted certificate.</strong> Sending 
            servers fetch this file over HTTPS and will refuse to trust it if the certificate is 
            self-signed, expired, or otherwise invalid — your mail server&apos;s own certificate situation 
            matters here too.
          </p>
        </div>
      </section>

      {/* TLS-RPT */}
      <section id="tls-rpt" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          Pairing It With TLS-RPT for Visibility
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          MTA-STS alone doesn&apos;t tell you anything about what&apos;s happening — you&apos;re flying 
          blind on whether connections are succeeding or being blocked. <strong>TLS-RPT</strong> (TLS 
          Reporting) fixes that by having senders email you aggregate reports on TLS connection failures, 
          similar in spirit to DMARC&apos;s rua reports.
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-6 overflow-x-auto">
          <div className="text-sm font-mono text-green-400">
            _smtp._tls.yourdomain.com TXT<br />
            v=TLSRPTv1; rua=mailto:tls-reports@yourdomain.com
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Set up TLS-RPT at the same time as MTA-STS, before you ever consider enforce mode.</strong> 
            Without it, a misconfiguration in enforce mode can silently drop legitimate mail with zero 
            visibility into why. TLS-RPT gives you the equivalent of DMARC&apos;s reporting safety net before 
            you turn on actual enforcement.
          </p>
        </div>
      </section>

      {/* Rollout */}
      <section id="rollout-strategy" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          Rollout Strategy (Don&apos;t Jump to Enforce)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          The policy file&apos;s <code className="bg-gray-100 px-1 rounded">mode</code> field has three 
          values, and the progression matters exactly the same way DMARC&apos;s p=none → quarantine → 
          reject progression does:
        </p>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
            <p className="text-gray-700 text-sm">
              <strong>mode: testing</strong> — Senders report TLS failures via TLS-RPT but still deliver 
              mail even if TLS fails. This is the safe starting point; run it for at least 1-2 weeks while 
              watching reports.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-100">
            <span className="w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
            <p className="text-gray-700 text-sm">
              <strong>mode: enforce</strong> — Senders will refuse to deliver mail if TLS fails, full stop. 
              Only move here once TLS-RPT data over a reasonable window confirms no legitimate delivery 
              paths are breaking.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-gray-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
            <p className="text-gray-700 text-sm">
              <strong>mode: none</strong> — Effectively disables the policy without removing it, useful if 
              you need to pause enforcement temporarily without losing your DNS/policy setup.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          The trap to avoid: don&apos;t set <code className="bg-gray-100 px-1 rounded">mode: enforce</code> 
          on day one because it feels more &quot;secure.&quot; If your MX server has any TLS 
          certificate issue you haven&apos;t noticed yet, enforce mode will start silently bouncing inbound 
          mail from any sender honoring the policy — exactly the kind of outage that&apos;s hard to notice 
          until someone reports a missing email days later.
        </p>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <div className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">✅ MTA-STS Setup Checklist</h2>
          <p className="text-gray-400 mb-6 text-sm">Run through this to deploy MTA-STS safely.</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Confirmed MX server has a valid, non-expired TLS certificate</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Published _mta-sts TXT record with current id= value</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Hosted policy file at /.well-known/mta-sts.txt over valid HTTPS</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Set up TLS-RPT alongside it for visibility into failures</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Started in mode: testing, not enforce, on day one</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Watched TLS-RPT reports for 1-2+ weeks before moving to enforce</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Lock down outbound authentication too</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          MTA-STS protects inbound mail. EmailDiag checks SPF, DKIM, and DMARC on your outbound side — the 
          complete picture, free in 10 seconds.
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
            <h4 className="font-semibold text-gray-800 mb-2">Do I need MTA-STS if I already use DANE for TLS?</h4>
            <p className="text-gray-600 text-sm">
              They solve a similar problem through different mechanisms — DANE relies on DNSSEC, MTA-STS 
              doesn&apos;t. If your domain already has DNSSEC and DANE TLSA records properly deployed, 
              MTA-STS is somewhat redundant, but many organizations find MTA-STS easier to deploy since it 
              doesn&apos;t require DNSSEC as a prerequisite.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Will MTA-STS improve my spam filtering or sender reputation?</h4>
            <p className="text-gray-600 text-sm">
              No — it has nothing to do with spam filtering or reputation scoring. It&apos;s purely a 
              transport security control for mail arriving at your domain. Don&apos;t expect any 
              deliverability improvement from implementing it; the benefit is confidentiality/integrity of 
              inbound mail in transit.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">What happens if I forget to update the id= field when I change the policy?</h4>
            <p className="text-gray-600 text-sm">
              Senders cache your policy based on the max_age value and only re-fetch it when the id= value 
              changes. If you update the policy file but leave id= the same, some senders may keep using 
              the stale cached version until their cache naturally expires.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
