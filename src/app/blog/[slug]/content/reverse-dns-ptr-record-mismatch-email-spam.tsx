import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function ReverseDnsPtrRecordMismatchEmailSpam() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          A thread on r/sysadmin summed it up well: <strong className="text-gray-800">&quot;SPF, DKIM, 
          DMARC — all green. Still bouncing with a vague 550 error mentioning my IP&apos;s hostname. 
          What does my hostname have to do with any of this?&quot;</strong> Turns out, quite a lot — and 
          it&apos;s a check that has nothing to do with any of your DNS authentication records.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          That check is <strong>reverse DNS</strong> (rDNS), and specifically whether your mail server&apos;s 
          <strong> PTR record</strong> matches up with its forward-facing hostname. It&apos;s one of the 
          oldest spam-fighting mechanisms on the internet — older than SPF, DKIM, or DMARC — and it still 
          quietly blocks or flags a surprising amount of self-hosted mail.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          I got bit by this setting up a new mail server on a fresh VPS once — authentication perfect, mail 
          still bouncing — because the hosting provider&apos;s default PTR record pointed to their own 
          generic hostname, not mine. Here&apos;s exactly what that mismatch means and how to fix it.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Let&apos;s dig in.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Already checked SPF, DKIM, and DMARC?</h3>
            <p className="text-blue-100 mb-4">
              EmailDiag confirms those three are solid — so if mail is still bouncing, you can move straight 
              to checking infrastructure-level issues like PTR records with confidence.
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
          <a href="#what-is-ptr" className="text-blue-600 hover:underline">What a PTR record actually is</a>
          <a href="#why-mail-servers-check" className="text-blue-600 hover:underline">Why mail servers check this at all</a>
          <a href="#common-mismatch-causes" className="text-blue-600 hover:underline">Common causes of a PTR mismatch</a>
          <a href="#how-to-check" className="text-blue-600 hover:underline">How to check your own PTR record</a>
          <a href="#how-to-fix" className="text-blue-600 hover:underline">How to actually fix it</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick checklist</a>
        </div>
      </div>

      {/* What is PTR */}
      <section id="what-is-ptr" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          What a PTR Record Actually Is
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Regular DNS answers &quot;what IP does this hostname point to?&quot; A <strong>PTR record</strong> 
          (pointer record) answers the exact opposite question: &quot;what hostname does this IP point back to?&quot; 
          It&apos;s the reverse lookup, and it lives in a special reverse DNS zone, not your regular domain&apos;s DNS.
        </p>

        <div className="my-6 grid md:grid-cols-2 gap-3">
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">Forward DNS (what you normally manage)</p>
            <p className="text-sm text-gray-600">
              <code className="bg-gray-200 px-1 rounded">mail.yourdomain.com</code> → A record → 
              <code className="bg-gray-200 px-1 rounded"> 203.0.113.50</code>
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">Reverse DNS (PTR record)</p>
            <p className="text-sm text-gray-600">
              <code className="bg-gray-200 px-1 rounded">203.0.113.50</code> → PTR record → 
              <code className="bg-gray-200 px-1 rounded"> mail.yourdomain.com</code>
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-100">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>You almost never control your own PTR record directly.</strong> Unlike forward DNS, 
            which you manage in Cloudflare/Route53/your registrar, PTR records belong to whoever owns the 
            IP block — usually your hosting provider or ISP. You have to request the change from them, not 
            set it yourself in your domain&apos;s DNS panel.
          </p>
        </div>
      </section>

      {/* Why mail servers check */}
      <section id="why-mail-servers-check" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          Why Mail Servers Check This At All
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          When a receiving mail server gets a connection, it typically runs what&apos;s called a 
          <strong> forward-confirmed reverse DNS (FCrDNS)</strong> check — a two-step verification:
        </p>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
            <p className="text-gray-700 text-sm">
              Receiving server sees your connecting IP, looks up its PTR record, and gets back a hostname 
              (e.g. <code className="bg-gray-200 px-1 rounded">mail.yourdomain.com</code>)
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
            <p className="text-gray-700 text-sm">
              It then does a forward lookup on that hostname to confirm it resolves back to the same IP you 
              connected from. If it does, the IP and hostname are &quot;FCrDNS confirmed&quot; — a legitimate, 
              consistent identity.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          This predates SPF, DKIM, and DMARC by years, going back to a simple observation: spammers and 
          botnets running on compromised home/dynamic IPs almost never have a matching PTR record (ISPs 
          typically set generic ones like <code className="bg-gray-100 px-1 rounded">123-45-67-89.dynamic.isp.com</code>), 
          while legitimate mail servers almost always do.
        </p>

        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Missing or mismatched PTR is treated as a strong spam signal</strong> — independent of 
            SPF/DKIM/DMARC entirely. Many mail servers (Postfix, Exim, Exchange) and spam filters (SpamAssassin, 
            Microsoft&apos;s EOP) will reject or heavily penalize a connection with no valid PTR before they 
            even look at the message content or your authentication headers.
          </p>
        </div>
      </section>

      {/* Common causes */}
      <section id="common-mismatch-causes" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          Common Causes of a PTR Mismatch
        </h2>

        <div className="my-6 space-y-4">
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> New VPS/cloud server with a provider-default PTR
            </p>
            <p className="text-orange-700 text-sm">
              This is the single most common cause. Spin up a new server at DigitalOcean, Linode, Hetzner, 
              or AWS, and the PTR record defaults to something generic like 
              <code className="bg-orange-100 px-1 rounded"> ec2-203-0-113-50.compute-1.amazonaws.com</code> 
              — which obviously doesn&apos;t match your mail server&apos;s actual hostname.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> PTR points to a hostname, but that hostname doesn&apos;t resolve back
            </p>
            <p className="text-orange-700 text-sm">
              You updated the PTR to <code className="bg-orange-100 px-1 rounded">mail.yourdomain.com</code>, 
              but forgot to create the matching A record for that hostname — so the forward-confirmation 
              step fails even though the PTR itself looks correct.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> HELO/EHLO hostname doesn&apos;t match the PTR hostname
            </p>
            <p className="text-orange-700 text-sm">
              Your mail server software announces itself in the SMTP HELO/EHLO greeting using a different 
              hostname than what the PTR resolves to. Some filters specifically compare these two and flag 
              a mismatch even when both individually resolve correctly.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> IPv6 PTR missing while IPv4 is configured correctly
            </p>
            <p className="text-orange-700 text-sm">
              If your mail server has an IPv6 address and sends over it, that address needs its own PTR 
              record too. It&apos;s easy to configure IPv4 reverse DNS carefully and completely forget the 
              IPv6 side exists.
            </p>
          </div>
        </div>
      </section>

      {/* How to check */}
      <section id="how-to-check" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          How to Check Your Own PTR Record
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          You can verify both halves of the FCrDNS check yourself from any terminal with <code className="bg-gray-100 px-1 rounded">dig</code> or <code className="bg-gray-100 px-1 rounded">nslookup</code>:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-6 overflow-x-auto">
          <div className="text-sm font-mono text-green-400 space-y-2">
            <div># Step 1: reverse lookup — what hostname does your IP point to?</div>
            <div>$ dig -x 203.0.113.50 +short</div>
            <div>mail.yourdomain.com.</div>
            <div className="mt-3"># Step 2: forward lookup — does that hostname point back to the same IP?</div>
            <div>$ dig mail.yourdomain.com +short</div>
            <div>203.0.113.50</div>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          If step 1 returns nothing, times out, or returns your hosting provider&apos;s generic hostname 
          instead of your own domain, that&apos;s your PTR record itself being missing or wrong. If step 1 
          returns the right hostname but step 2 doesn&apos;t resolve back to the same IP, that&apos;s the 
          forward-confirmation half failing — usually a missing A record.
        </p>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Also check your HELO hostname matches.</strong> Look at your mail server config 
            (<code className="bg-blue-100 px-1 rounded">myhostname</code> in Postfix, 
            <code className="bg-blue-100 px-1 rounded"> primary_hostname</code> in Exim) and confirm it&apos;s 
            the exact same string your PTR record resolves to — not a different subdomain or shorthand version.
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
              <strong>Request the PTR change through your hosting provider, not your DNS panel.</strong> Most 
              major providers have a dashboard setting for this — AWS calls it &quot;reverse DNS,&quot; 
              DigitalOcean and Linode have it right in the droplet/instance network settings, and most VPS 
              providers support it via a support ticket if there&apos;s no self-service option.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
            <p className="text-gray-700 text-sm">
              <strong>Create the matching A record in your own forward DNS</strong> for whatever hostname 
              you set the PTR to. If PTR resolves to <code className="bg-gray-200 px-1 rounded">mail.yourdomain.com</code>, 
              that exact hostname needs an A record pointing back to the same IP, or forward-confirmation 
              will keep failing.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
            <p className="text-gray-700 text-sm">
              <strong>Set your mail server&apos;s HELO/EHLO hostname to match exactly.</strong> In Postfix, 
              set <code className="bg-gray-200 px-1 rounded">myhostname = mail.yourdomain.com</code> in 
              <code className="bg-gray-200 px-1 rounded"> main.cf</code> and restart the service — don&apos;t 
              leave it on an auto-detected or default value.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</span>
            <p className="text-gray-700 text-sm">
              <strong>Don&apos;t forget IPv6 if you send over it.</strong> Request a PTR for your IPv6 
              address too, and create a matching AAAA record — the same mismatch problem applies independently 
              on that stack.
            </p>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">5</span>
            <p className="text-gray-700 text-sm">
              <strong>Re-run the dig check after making changes</strong> and allow for propagation time — PTR 
              changes through most providers take effect within minutes to a few hours, much faster than 
              typical domain DNS propagation.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          The trap to avoid: if your hosting provider doesn&apos;t support custom PTR records at all (some 
          budget shared hosts don&apos;t), don&apos;t try to work around it by routing mail through a 
          different IP without checking that IP&apos;s PTR situation too — you&apos;ll just hit the same 
          problem one layer removed. Many self-hosters in this situation switch to a provider or VPS tier 
          that explicitly supports reverse DNS management, specifically because of this.
        </p>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <div className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">✅ PTR Record Checklist</h2>
          <p className="text-gray-400 mb-6 text-sm">Run through this when authentication passes but mail still bounces or gets flagged.</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Ran dig -x on sending IP and confirmed it returns your own hostname</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Confirmed forward lookup on that hostname resolves back to the same IP</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Checked HELO/EHLO hostname in mail server config matches the PTR hostname exactly</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Requested PTR update through hosting provider dashboard/support, not DNS panel</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Created matching A record for the PTR hostname in forward DNS</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Checked IPv6 PTR separately if sending over IPv6</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Confirm your DNS authentication layer is clean</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          EmailDiag checks SPF, DKIM, and DMARC together so you can rule that layer out and focus on 
          infrastructure issues like PTR records with confidence.
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
            <h4 className="font-semibold text-gray-800 mb-2">Does PTR mismatch affect me if I use Gmail, Outlook 365, or an ESP?</h4>
            <p className="text-gray-600 text-sm">
              No — this only matters if you&apos;re running your own mail server (Postfix, Exim, Exchange on 
              your own VPS). Major ESPs and mailbox providers already manage correct PTR records on their 
              sending IPs. This is purely a self-hosted mail server issue.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Can I set my own PTR record in my domain&apos;s DNS panel?</h4>
            <p className="text-gray-600 text-sm">
              No. PTR records live in the reverse DNS zone owned by whoever controls the IP block — your 
              hosting provider or ISP — not in your domain&apos;s regular DNS zone. You have to request the 
              change through them, even though you fully control the forward A/MX/TXT records yourself.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Does the PTR hostname need to exactly match my domain, or just resolve consistently?</h4>
            <p className="text-gray-600 text-sm">
              It just needs to resolve consistently (forward-confirmed), not necessarily match your sending 
              domain exactly. <code className="bg-gray-100 px-1 rounded">mail.yourdomain.com</code> as a PTR 
              for a server sending <code className="bg-gray-100 px-1 rounded">@yourdomain.com</code> mail is 
              ideal, but a consistent, non-generic hostname on a different domain can still pass FCrDNS — it 
              just looks less trustworthy to some filters than an exact match.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
