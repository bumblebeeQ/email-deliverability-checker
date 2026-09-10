import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, Terminal, Clock } from 'lucide-react';

export default function PostfixDmarcSetupUbuntu() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          A guy in a self-hosting Discord asked me last week: <strong className="text-gray-800">&quot;I set up 
          Postfix on Ubuntu, added SPF, and Gmail still dumps everything in spam. Do I actually need 
          DMARC or is that overkill for a personal mail server?&quot;</strong>
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Short answer: you need it, and it&apos;s not overkill. Long answer: Postfix doesn&apos;t do DMARC 
          for you — DMARC is a DNS record plus a policy, not a Postfix setting. The confusing part is 
          that Postfix is where DKIM signing actually happens, and DMARC just checks whether that 
          signing lines up with your DNS. Get one piece wrong and DMARC quietly fails even though 
          Postfix logs look clean.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          I&apos;ve rebuilt this exact stack — Postfix + OpenDKIM + SPF + DMARC — on Ubuntu more times 
          than I can count, for side projects and small business mail servers. Here&apos;s the setup 
          that actually works, plus the three things that trip people up every single time.
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
            <h3 className="text-lg font-semibold mb-2">Already have a domain and mail server?</h3>
            <p className="text-blue-100 mb-4">
              Skip the manual checking — run your domain through EmailDiag to see your current SPF, 
              DKIM, and DMARC status before you touch any config files.
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
          <a href="#why-dmarc-needs-dkim" className="text-blue-600 hover:underline">Why DMARC depends on DKIM being right first</a>
          <a href="#step-opendkim" className="text-blue-600 hover:underline">Step 1: Install and configure OpenDKIM</a>
          <a href="#step-postfix" className="text-blue-600 hover:underline">Step 2: Wire OpenDKIM into Postfix</a>
          <a href="#step-spf" className="text-blue-600 hover:underline">Step 3: Publish your SPF record</a>
          <a href="#step-dmarc" className="text-blue-600 hover:underline">Step 4: Publish your DMARC record</a>
          <a href="#step-verify" className="text-blue-600 hover:underline">Step 5: Verify everything actually aligns</a>
          <a href="#common-mistakes" className="text-blue-600 hover:underline">Three mistakes I keep seeing</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick checklist</a>
        </div>
      </div>

      {/* Section: Why DMARC needs DKIM right */}
      <section id="why-dmarc-needs-dkim" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">!</span>
          Why DMARC Depends on DKIM Being Right First
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          DMARC doesn&apos;t check your email content. It checks one thing: does at least one of SPF or 
          DKIM pass, <em>and</em> does the domain in that passing check align with the domain in your 
          From address. On a self-hosted Postfix box, DKIM is almost always the piece that&apos;s 
          misconfigured, because it involves three moving parts that all have to agree:
        </p>

        <div className="my-6 space-y-4">
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> The selector in your DNS TXT record
            </p>
            <p className="text-red-700 text-sm">
              Something like <code className="bg-red-100 px-1 rounded">mail._domainkey.yourdomain.com</code>. 
              Typo the selector name here and it&apos;s just wrong forever until you fix it — no error, 
              no warning, mail just fails silently.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> The selector OpenDKIM is actually signing with
            </p>
            <p className="text-red-700 text-sm">
              Set in <code className="bg-red-100 px-1 rounded">KeyTable</code> and 
              <code className="bg-red-100 px-1 rounded"> SigningTable</code>. This has to match the DNS 
              record exactly, including case.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Postfix actually calling OpenDKIM at all
            </p>
            <p className="text-red-700 text-sm">
              Postfix has to be told to route outgoing mail through the OpenDKIM milter. Miss this 
              and mail sends fine, DKIM header never gets added, DMARC fails.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          Get all three lined up, then SPF and DMARC on top of that are honestly the easy part — 
          they&apos;re just DNS records.
        </p>
      </section>

      {/* Step 1: OpenDKIM */}
      <section id="step-opendkim" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          Install and Configure OpenDKIM
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          On Ubuntu, install OpenDKIM and the tools alongside Postfix:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-4 overflow-x-auto">
          <div className="text-sm font-mono text-green-400">
            sudo apt update<br />
            sudo apt install postfix opendkim opendkim-tools -y
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Generate your DKIM keypair for a selector — I&apos;ll use <code className="bg-gray-100 px-1 rounded">mail</code> 
          throughout this guide, but any short lowercase string works:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-2 overflow-x-auto">
          <div className="text-sm font-mono text-green-400">
            sudo mkdir -p /etc/opendkim/keys/yourdomain.com<br />
            cd /etc/opendkim/keys/yourdomain.com<br />
            sudo opendkim-genkey -s mail -d yourdomain.com<br />
            sudo chown opendkim:opendkim mail.private<br />
            sudo chmod 600 mail.private
          </div>
        </div>
        <p className="text-gray-500 text-xs mb-6">This creates mail.private (your signing key) and mail.txt (the DNS record you&apos;ll publish).</p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Now edit <code className="bg-gray-100 px-1 rounded">/etc/opendkim/KeyTable</code>:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-4 overflow-x-auto">
          <div className="text-sm font-mono text-green-400">
            mail._domainkey.yourdomain.com yourdomain.com:mail:/etc/opendkim/keys/yourdomain.com/mail.private
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          And <code className="bg-gray-100 px-1 rounded">/etc/opendkim/SigningTable</code>:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-4 overflow-x-auto">
          <div className="text-sm font-mono text-green-400">
            *@yourdomain.com mail._domainkey.yourdomain.com
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-100">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>The selector <code className="bg-amber-100 px-1 rounded">mail</code> appears in three 
            places</strong> — the key filename, KeyTable, and SigningTable. They all have to say the exact 
            same string. This is the single most common typo I see.
          </p>
        </div>
      </section>

      {/* Step 2: Postfix integration */}
      <section id="step-postfix" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          Wire OpenDKIM Into Postfix
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          OpenDKIM needs to listen on a socket that Postfix can talk to. Edit 
          <code className="bg-gray-100 px-1 rounded"> /etc/opendkim.conf</code> and set:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-4 overflow-x-auto">
          <div className="text-sm font-mono text-green-400">
            Socket inet:12301@localhost<br />
            Domain yourdomain.com<br />
            KeyTable /etc/opendkim/KeyTable<br />
            SigningTable /etc/opendkim/SigningTable<br />
            Mode sv<br />
            Syslog yes
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Then tell Postfix about that socket in <code className="bg-gray-100 px-1 rounded">/etc/postfix/main.cf</code>:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-4 overflow-x-auto">
          <div className="text-sm font-mono text-green-400">
            milter_default_action = accept<br />
            milter_protocol = 6<br />
            smtpd_milters = inet:localhost:12301<br />
            non_smtpd_milters = inet:localhost:12301
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Restart both services:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-4 overflow-x-auto">
          <div className="text-sm font-mono text-green-400">
            sudo systemctl restart opendkim<br />
            sudo systemctl restart postfix
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <Terminal className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>If OpenDKIM fails to start</strong>, run 
            <code className="bg-blue-100 px-1 rounded"> sudo journalctl -u opendkim -n 30</code> before doing 
            anything else. Nine times out of ten it&apos;s a file permission issue on the private key or 
            a syntax typo in KeyTable/SigningTable.
          </p>
        </div>
      </section>

      {/* Step 3: SPF */}
      <section id="step-spf" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          Publish Your SPF Record
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Add a TXT record at your domain root that lists the IP your Postfix server sends from:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-4 overflow-x-auto">
          <code className="text-green-400 text-sm font-mono">
            v=spf1 ip4:203.0.113.10 -all
          </code>
        </div>
        <p className="text-gray-500 text-xs mb-6">Replace with your actual server IP. Use -all (hard fail) once you&apos;re confident this is the only IP that will ever send mail for this domain.</p>

        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
          <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Self-hosted servers on residential or generic VPS IPs</strong> often fight an uphill 
            reputation battle regardless of SPF/DKIM/DMARC being perfect. If deliverability stays bad 
            after everything below checks out, that&apos;s usually IP reputation, not your config.
          </p>
        </div>
      </section>

      {/* Step 4: DMARC */}
      <section id="step-dmarc" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          Publish Your DMARC Record
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Add a TXT record at <code className="bg-gray-100 px-1 rounded">_dmarc.yourdomain.com</code>:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-4 overflow-x-auto">
          <code className="text-green-400 text-sm font-mono">
            v=DMARC1; p=none; rua=mailto:dmarc-reports@yourdomain.com; fo=1
          </code>
        </div>
        <p className="text-gray-500 text-xs mb-6">Start with p=none — this only asks receivers to report on failures, it doesn&apos;t reject or quarantine anything yet.</p>

        <div className="my-6 grid md:grid-cols-3 gap-3">
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">p=none</p>
            <p className="text-sm text-gray-600">Monitor only. Start here for at least 1-2 weeks.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">p=quarantine</p>
            <p className="text-sm text-gray-600">Failing mail goes to spam. Move here once reports look clean.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">p=reject</p>
            <p className="text-sm text-gray-600">Failing mail gets bounced outright. Final stage.</p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          On a single self-hosted server, you likely don&apos;t need a report-parsing tool — you&apos;re not 
          juggling ten sending sources like a company would. Just read the raw XML reports that land 
          in your inbox, or skip <code className="bg-gray-100 px-1 rounded">rua=</code> entirely for the 
          first week if you&apos;d rather test manually first.
        </p>
      </section>

      {/* Step 5: Verify */}
      <section id="step-verify" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          Verify Everything Actually Aligns
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Send a real test email to a Gmail address, then open the message and check 
          &quot;Show original.&quot; You want to see all three of these pass:
        </p>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <p className="text-gray-700 text-sm">
              <code className="bg-green-100 px-1 rounded">SPF: PASS</code> — your sending IP matches 
              the SPF record.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <p className="text-gray-700 text-sm">
              <code className="bg-green-100 px-1 rounded">DKIM: PASS</code> with the <code className="bg-green-100 px-1 rounded">d=</code> value 
              matching your domain, not just present.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <p className="text-gray-700 text-sm">
              <code className="bg-green-100 px-1 rounded">DMARC: PASS</code> — this only shows PASS once 
              SPF or DKIM above pass AND align with your From domain.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          DKIM showing up as present but not signed correctly is the classic silent failure here — 
          the header exists, but the domain doesn&apos;t align, so DMARC still fails even though it 
          looks like DKIM &quot;worked.&quot;
        </p>
      </section>

      {/* Common mistakes */}
      <section id="common-mistakes" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">⚠</span>
          Three Mistakes I Keep Seeing
        </h2>

        <div className="space-y-4 mb-6">
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 mb-2">1. OpenDKIM socket bound to the wrong interface</p>
            <p className="text-orange-700 text-sm">
              If <code className="bg-orange-100 px-1 rounded">Socket</code> in opendkim.conf uses a Unix 
              socket path instead of <code className="bg-orange-100 px-1 rounded">inet:12301@localhost</code>, 
              make sure the path matches exactly what&apos;s in Postfix&apos;s milter setting, and that Postfix 
              has permission to reach it. Mismatches here fail silently — mail still sends, just unsigned.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 mb-2">2. DNS TXT record split across multiple strings incorrectly</p>
            <p className="text-orange-700 text-sm">
              DKIM public keys are long. Some DNS providers require splitting them into multiple 
              quoted strings. Get the split wrong and you get a permanent DKIM fail that looks 
              identical to a missing record in most checker tools.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 mb-2">3. Jumping straight to p=reject</p>
            <p className="text-orange-700 text-sm">
              Skipping p=none and p=quarantine means any misconfiguration you haven&apos;t caught yet 
              — a forwarding rule, a second sending IP you forgot about — results in legitimate mail 
              getting bounced outright, with no report to warn you first.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          Give each DMARC policy stage at least a week of real traffic before tightening it. There&apos;s 
          no prize for rushing to <code className="bg-gray-100 px-1 rounded">p=reject</code> on day one.
        </p>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <div className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">✅ Postfix + DMARC Setup Checklist</h2>
          <p className="text-gray-400 mb-6 text-sm">Run through this before calling the setup done.</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>OpenDKIM installed and key generated for your selector</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Selector name matches exactly in DNS, KeyTable, and SigningTable</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Postfix main.cf points smtpd_milters at OpenDKIM&apos;s socket</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>SPF TXT record published with your sending IP</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>DMARC TXT record published at _dmarc.yourdomain.com, starting at p=none</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Test email to Gmail shows SPF PASS, DKIM PASS, DMARC PASS</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>DKIM d= domain matches your From domain, not just "present"</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Ran at least a week on p=none before moving to quarantine/reject</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Not sure if your DNS records are right?</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          Skip the manual dig/nslookup checks — EmailDiag reads your SPF, DKIM, and DMARC records 
          and tells you exactly what&apos;s missing or misaligned. Free, takes 10 seconds.
        </p>
        <Link 
          href="/test"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
        >
          Test My Domain <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Wrap-up */}
      <div className="mt-8 mb-4">
        <p className="text-gray-700 leading-relaxed mb-4">
          Postfix and DMARC feel disconnected at first because DMARC lives entirely in DNS while 
          Postfix just does the signing work behind the scenes. Once you see them as two separate 
          layers that only have to agree on a domain and a selector name, the whole stack stops 
          feeling mysterious.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Start at p=none, watch a week of real mail flow through cleanly, then tighten. That&apos;s the 
          whole trick — nothing about self-hosting makes DMARC harder, it just removes the managed 
          service that used to hide these steps from you.
        </p>
      </div>
    </>
  );
}
