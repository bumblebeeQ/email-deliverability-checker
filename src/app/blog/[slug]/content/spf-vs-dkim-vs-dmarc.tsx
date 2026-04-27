import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, Shield, Lock, Eye, FileCheck } from 'lucide-react';

export default function SpfVsDkimVsDmarc() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          A friend of mine launched his SaaS last month. Within a week he messaged me: <strong className="text-gray-800">&quot;I set up SPF and my emails still go to spam. Do I need DKIM too? And what the hell is DMARC?&quot;</strong>
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          I hear some version of this question every single week. People know they need &quot;email authentication&quot; but the three acronyms — SPF, DKIM, and DMARC — blur together into alphabet soup. Most tutorials treat them like interchangeable checkboxes. They&apos;re not.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Each one does something completely different. SPF checks <em>who&apos;s sending</em>. DKIM checks <em>if the message was tampered with</em>. DMARC ties them together and tells receivers what to do when checks fail. Skip any one of them and you&apos;ve got a gap that spammers (and spam filters) will notice.
        </p>
        <p className="text-gray-700 leading-relaxed">
          I&apos;m going to break down exactly what each one does, how they work together, and — most importantly — the order you should set them up. No fluff, just the stuff that actually matters for getting your emails into inboxes.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Check your setup before reading on</h3>
            <p className="text-blue-100 mb-4">
              Run a quick scan of your domain first. You might already have all three configured correctly — or you might be missing one you didn&apos;t know about. Takes 10 seconds.
            </p>
            <Link 
              href="/test"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Test My Domain Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="my-10 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-4">What we&apos;ll cover:</h3>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <a href="#the-analogy" className="text-blue-600 hover:underline">The nightclub analogy (it clicks instantly)</a>
          <a href="#spf-explained" className="text-blue-600 hover:underline">SPF: the bouncer checking the guest list</a>
          <a href="#dkim-explained" className="text-blue-600 hover:underline">DKIM: the tamper-proof seal on the envelope</a>
          <a href="#dmarc-explained" className="text-blue-600 hover:underline">DMARC: the policy that ties it all together</a>
          <a href="#how-they-work-together" className="text-blue-600 hover:underline">How the three actually work together</a>
          <a href="#setup-order" className="text-blue-600 hover:underline">The right order to set them up</a>
          <a href="#common-mistakes" className="text-blue-600 hover:underline">5 mistakes I see every week</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick comparison checklist</a>
        </div>
      </div>

      {/* Section: The Analogy */}
      <section id="the-analogy" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-lg font-bold">💡</span>
          The Nightclub Analogy (This Makes It Click)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Imagine your domain is a nightclub. Every email you send is a person trying to get in.
        </p>

        <div className="my-6 space-y-4">
          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="text-2xl">🚪</div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">SPF = The Guest List</p>
              <p className="text-gray-600 text-sm">
                The bouncer checks: &quot;Is this person on the list?&quot; SPF tells receiving servers which IP addresses are allowed to send email on your behalf. If the sending server isn&apos;t on the list, it&apos;s suspicious.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
            <div className="text-2xl">✉️</div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">DKIM = The Wax Seal</p>
              <p className="text-gray-600 text-sm">
                Like a wax seal on a letter — it proves the message hasn&apos;t been opened or changed since it left you. DKIM adds a cryptographic signature to every email. If someone messes with the content in transit, the seal breaks.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
            <div className="text-2xl">📋</div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">DMARC = The Security Policy</p>
              <p className="text-gray-600 text-sm">
                DMARC is the written policy posted at the door: &quot;If someone fails the guest list AND the seal check, here&apos;s what you do — let them in anyway, put them in a side room (quarantine), or kick them out (reject).&quot;
              </p>
            </div>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          See the difference? SPF verifies the <strong>sender</strong>. DKIM verifies the <strong>message</strong>. DMARC sets the <strong>rules</strong> for what happens when things don&apos;t check out.
        </p>
        <p className="text-gray-700 leading-relaxed">
          You need all three. Here&apos;s why each one matters on its own.
        </p>
      </section>

      {/* Section: SPF Explained */}
      <section id="spf-explained" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          SPF: Who&apos;s Allowed to Send Your Email?
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>SPF (Sender Policy Framework)</strong> is a DNS record that lists every server authorized to send email for your domain. When Gmail gets an email from <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">you@yourdomain.com</code>, it checks: &quot;Is this IP address on the approved list?&quot;
        </p>

        <div className="my-6 p-5 bg-gray-900 rounded-xl text-sm font-mono">
          <p className="text-gray-400 mb-2"># Example SPF record</p>
          <p className="text-green-400">v=spf1 include:_spf.google.com include:sendgrid.net -all</p>
          <p className="text-gray-500 mt-3 text-xs">
            Translation: &quot;Google and SendGrid can send for me. Everyone else? Reject.&quot;
          </p>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">What SPF catches</h3>
        <ul className="space-y-2 mb-6">
          <li className="flex items-start gap-2 text-gray-700">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Someone using a random server to send email pretending to be you</span>
          </li>
          <li className="flex items-start gap-2 text-gray-700">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Spammers spoofing your domain from unauthorized IPs</span>
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">What SPF can&apos;t do</h3>
        <ul className="space-y-2 mb-6">
          <li className="flex items-start gap-2 text-gray-700">
            <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <span>It can&apos;t verify that the email content wasn&apos;t changed in transit</span>
          </li>
          <li className="flex items-start gap-2 text-gray-700">
            <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <span>It breaks when emails are forwarded (the forwarding server isn&apos;t on your list)</span>
          </li>
          <li className="flex items-start gap-2 text-gray-700">
            <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <span>It only checks the &quot;envelope from&quot; address — not what the recipient sees in their inbox</span>
          </li>
        </ul>

        <div className="my-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-amber-800 mb-1">Watch out: the 10-lookup limit</p>
              <p className="text-amber-700 text-sm">
                SPF records can only do 10 DNS lookups. If you&apos;re using Google Workspace + SendGrid + Mailgun + a few more services, you&apos;ll hit this limit fast. I&apos;ve written a whole guide on <Link href="/blog/spf-lookup-limit-exceeded" className="text-blue-600 hover:underline">fixing the SPF lookup limit</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: DKIM Explained */}
      <section id="dkim-explained" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          DKIM: Was the Message Tampered With?
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>DKIM (DomainKeys Identified Mail)</strong> adds a digital signature to every email you send. Think of it like a tamper-proof seal. The sending server signs the message with a private key, and the receiving server checks it with a public key stored in your DNS.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          If even one character of the email changes after it leaves your server — someone injects a phishing link, modifies the subject line, whatever — the signature breaks and the receiving server knows something&apos;s wrong.
        </p>

        <div className="my-6 p-5 bg-gray-900 rounded-xl text-sm font-mono">
          <p className="text-gray-400 mb-2"># Simplified DKIM flow</p>
          <p className="text-blue-400">1. Your server → signs email with private key</p>
          <p className="text-blue-400">2. Adds &quot;DKIM-Signature&quot; header to the email</p>
          <p className="text-blue-400">3. Gmail receives it → looks up public key in your DNS</p>
          <p className="text-blue-400">4. Checks signature → matches? ✅ Doesn&apos;t match? ❌</p>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">What DKIM catches</h3>
        <ul className="space-y-2 mb-6">
          <li className="flex items-start gap-2 text-gray-700">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Man-in-the-middle attacks that modify email content</span>
          </li>
          <li className="flex items-start gap-2 text-gray-700">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Someone intercepting and altering your messages</span>
          </li>
          <li className="flex items-start gap-2 text-gray-700">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Survives email forwarding (unlike SPF!)</span>
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">What DKIM can&apos;t do</h3>
        <ul className="space-y-2 mb-6">
          <li className="flex items-start gap-2 text-gray-700">
            <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <span>It doesn&apos;t check who sent the email — only that the content is intact</span>
          </li>
          <li className="flex items-start gap-2 text-gray-700">
            <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <span>It doesn&apos;t tell the receiver what to do if verification fails</span>
          </li>
        </ul>

        <div className="my-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-amber-800 mb-1">Common gotcha: key length</p>
              <p className="text-amber-700 text-sm">
                Always use 2048-bit DKIM keys. Some providers still default to 1024-bit, and a few DNS providers have trouble with the longer records (you might need to split them). I covered this in my <Link href="/blog/dkim-signature-verification-failed" className="text-blue-600 hover:underline">DKIM verification failed guide</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: DMARC Explained */}
      <section id="dmarc-explained" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          DMARC: The Policy That Ties Everything Together
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>DMARC (Domain-based Message Authentication, Reporting & Conformance)</strong> is where SPF and DKIM stop being independent checks and start working as a system.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s the thing most people miss: without DMARC, SPF and DKIM are just informational. A receiving server can see that SPF failed... and still deliver the email anyway. DMARC changes that. It tells the receiver: &quot;Here&apos;s my policy. If authentication fails, here&apos;s what I want you to do about it.&quot;
        </p>

        <div className="my-6 p-5 bg-gray-900 rounded-xl text-sm font-mono">
          <p className="text-gray-400 mb-2"># Example DMARC record</p>
          <p className="text-green-400">v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com; pct=100</p>
          <p className="text-gray-500 mt-3 text-xs">
            Translation: &quot;If SPF and DKIM both fail, quarantine the email. Send me reports about it.&quot;
          </p>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">The three DMARC policies</h3>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <code className="bg-gray-200 px-2 py-0.5 rounded text-sm font-bold text-gray-700">p=none</code>
            <div>
              <p className="text-gray-700 text-sm"><strong>Monitor only.</strong> Don&apos;t do anything, just send me reports. Good for starting out — you can see who&apos;s sending email as your domain without breaking anything.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
            <code className="bg-amber-200 px-2 py-0.5 rounded text-sm font-bold text-amber-800">p=quarantine</code>
            <div>
              <p className="text-gray-700 text-sm"><strong>Send to spam.</strong> If authentication fails, put the email in the spam folder. A good middle ground.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
            <code className="bg-red-200 px-2 py-0.5 rounded text-sm font-bold text-red-800">p=reject</code>
            <div>
              <p className="text-gray-700 text-sm"><strong>Block it entirely.</strong> Reject the email outright. Maximum protection, but make sure your legitimate emails all pass first.</p>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">The &quot;alignment&quot; check most people forget</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          DMARC adds one more requirement: <strong>alignment</strong>. It&apos;s not enough for SPF or DKIM to pass — the domain used in the check must also match the &quot;From&quot; address the recipient sees.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          This catches a sneaky trick: a spammer could set up their own SPF and DKIM for <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">evil.com</code>, but send email with a &quot;From&quot; header showing <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">you@yourdomain.com</code>. SPF and DKIM would both pass (for evil.com), but DMARC alignment would catch it because the domains don&apos;t match.
        </p>

        <div className="my-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-blue-800 mb-1">Why Gmail and Yahoo now require DMARC</p>
              <p className="text-blue-700 text-sm">
                Since February 2024, Gmail and Yahoo require DMARC for bulk senders (5,000+ emails/day). Even if you&apos;re under that threshold, having DMARC boosts your deliverability. More details in my <Link href="/blog/dmarc-policy-not-found" className="text-blue-600 hover:underline">&quot;DMARC policy not found&quot; fix guide</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: How They Work Together */}
      <section id="how-they-work-together" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-lg font-bold">🔗</span>
          How SPF, DKIM, and DMARC Work Together
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          Here&apos;s what actually happens when Gmail receives your email. The whole process takes milliseconds:
        </p>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
            <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
            <div>
              <p className="font-medium text-gray-800">SPF Check</p>
              <p className="text-gray-600 text-sm">Gmail looks up your SPF record. Is the sending server&apos;s IP on the approved list? ✅ or ❌</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
            <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
            <div>
              <p className="font-medium text-gray-800">DKIM Check</p>
              <p className="text-gray-600 text-sm">Gmail finds the DKIM signature in the email header, fetches your public key from DNS, and verifies the signature. ✅ or ❌</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
            <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
            <div>
              <p className="font-medium text-gray-800">DMARC Evaluation</p>
              <p className="text-gray-600 text-sm">Gmail checks: did <strong>at least one</strong> of SPF or DKIM pass <strong>with alignment</strong>? If yes → deliver. If no → follow your DMARC policy (none/quarantine/reject).</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
            <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
            <div>
              <p className="font-medium text-gray-800">DMARC Report</p>
              <p className="text-gray-600 text-sm">Gmail sends a daily report to the address in your DMARC record, telling you how many emails passed/failed. Free visibility into who&apos;s using your domain.</p>
            </div>
          </div>
        </div>

        <div className="my-8 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-green-800 mb-1">Key insight: DMARC needs only ONE to pass</p>
              <p className="text-green-700 text-sm">
                DMARC passes if either SPF or DKIM passes with alignment. This is crucial for forwarded emails — SPF will fail (wrong IP), but DKIM still passes because the signature travels with the message. That&apos;s why you need both: they cover each other&apos;s blind spots.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-lg font-bold">📊</span>
          Side-by-Side Comparison
        </h2>

        <div className="my-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 border font-semibold text-gray-700"></th>
                <th className="text-left p-3 border font-semibold text-blue-700">SPF</th>
                <th className="text-left p-3 border font-semibold text-green-700">DKIM</th>
                <th className="text-left p-3 border font-semibold text-orange-700">DMARC</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr>
                <td className="p-3 border font-medium bg-gray-50">What it checks</td>
                <td className="p-3 border">Sending server IP</td>
                <td className="p-3 border">Message integrity</td>
                <td className="p-3 border">SPF/DKIM alignment + policy</td>
              </tr>
              <tr>
                <td className="p-3 border font-medium bg-gray-50">DNS record type</td>
                <td className="p-3 border">TXT on root domain</td>
                <td className="p-3 border">TXT on selector subdomain</td>
                <td className="p-3 border">TXT on _dmarc subdomain</td>
              </tr>
              <tr>
                <td className="p-3 border font-medium bg-gray-50">Survives forwarding?</td>
                <td className="p-3 border">❌ No</td>
                <td className="p-3 border">✅ Yes</td>
                <td className="p-3 border">✅ (via DKIM)</td>
              </tr>
              <tr>
                <td className="p-3 border font-medium bg-gray-50">Verifies content?</td>
                <td className="p-3 border">❌ No</td>
                <td className="p-3 border">✅ Yes</td>
                <td className="p-3 border">Relies on DKIM</td>
              </tr>
              <tr>
                <td className="p-3 border font-medium bg-gray-50">Enforces policy?</td>
                <td className="p-3 border">Soft/hard fail only</td>
                <td className="p-3 border">❌ No</td>
                <td className="p-3 border">✅ Yes (none/quarantine/reject)</td>
              </tr>
              <tr>
                <td className="p-3 border font-medium bg-gray-50">Sends reports?</td>
                <td className="p-3 border">❌ No</td>
                <td className="p-3 border">❌ No</td>
                <td className="p-3 border">✅ Yes (rua/ruf)</td>
              </tr>
              <tr>
                <td className="p-3 border font-medium bg-gray-50">Setup difficulty</td>
                <td className="p-3 border">⭐ Easy</td>
                <td className="p-3 border">⭐⭐ Medium</td>
                <td className="p-3 border">⭐ Easy (to start)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section: Setup Order */}
      <section id="setup-order" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-lg font-bold">🔧</span>
          The Right Order to Set Them Up
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          This is where I see people mess up constantly. They jump straight to <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">p=reject</code> on day one and then wonder why half their emails disappear. Here&apos;s the order I recommend after setting up 50+ domains:
        </p>

        <div className="my-6 space-y-4">
          <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-gray-800 mb-2">Step 1: SPF (10 minutes)</h3>
            <p className="text-gray-700 text-sm mb-2">
              Start here because it&apos;s the simplest. One TXT record listing your email services. <Link href="/blog/sendgrid-spf-setup-guide" className="text-blue-600 hover:underline">Here&apos;s how for SendGrid</Link>, and <Link href="/blog/spf-dkim-set-but-not-found" className="text-blue-600 hover:underline">here&apos;s what to do if it says &quot;not found&quot;</Link>.
            </p>
          </div>

          <div className="p-5 bg-green-50 rounded-xl border border-green-100">
            <h3 className="font-semibold text-gray-800 mb-2">Step 2: DKIM (15-30 minutes)</h3>
            <p className="text-gray-700 text-sm mb-2">
              Slightly more involved — you need to generate keys in your email provider and add the public key to DNS. Every provider does it slightly differently. <Link href="/blog/mailgun-dkim-configuration" className="text-blue-600 hover:underline">Mailgun guide here</Link>.
            </p>
          </div>

          <div className="p-5 bg-orange-50 rounded-xl border border-orange-100">
            <h3 className="font-semibold text-gray-800 mb-2">Step 3: DMARC with p=none (5 minutes)</h3>
            <p className="text-gray-700 text-sm mb-2">
              Start with monitoring only. Add this record and wait 2-4 weeks to collect data:
            </p>
            <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm">
              <p className="text-green-400">v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com</p>
            </div>
          </div>

          <div className="p-5 bg-amber-50 rounded-xl border border-amber-100">
            <h3 className="font-semibold text-gray-800 mb-2">Step 4: Review reports, then tighten</h3>
            <p className="text-gray-700 text-sm">
              After you&apos;ve confirmed all legitimate emails pass, move to <code className="bg-gray-200 px-2 py-0.5 rounded text-xs">p=quarantine</code> for a week, then <code className="bg-gray-200 px-2 py-0.5 rounded text-xs">p=reject</code>. Don&apos;t rush this.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Common Mistakes */}
      <section id="common-mistakes" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">⚠️</span>
          5 Mistakes I See Every Week
        </h2>

        <div className="space-y-6">
          <div className="p-5 bg-red-50 rounded-xl border border-red-100">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <span className="text-red-600 font-bold">1.</span> Setting up SPF but skipping DKIM
            </h3>
            <p className="text-gray-700 text-sm">
              &quot;SPF passed, that&apos;s enough, right?&quot; No. SPF breaks on forwarding, and without DKIM, DMARC has nothing to fall back on. I&apos;ve seen domains with perfect SPF records still landing in spam because they had no DKIM and their emails were getting forwarded.
            </p>
          </div>

          <div className="p-5 bg-red-50 rounded-xl border border-red-100">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <span className="text-red-600 font-bold">2.</span> Going straight to p=reject on DMARC
            </h3>
            <p className="text-gray-700 text-sm">
              A client did this once. Turns out their HR team was using a third-party recruiting platform that sent emails as their domain — no one in IT knew. Those emails all got rejected. Start with <code className="bg-gray-200 px-2 py-0.5 rounded text-xs">p=none</code> and actually read the reports.
            </p>
          </div>

          <div className="p-5 bg-red-50 rounded-xl border border-red-100">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <span className="text-red-600 font-bold">3.</span> Multiple SPF records on the same domain
            </h3>
            <p className="text-gray-700 text-sm">
              You can only have ONE SPF record per domain. I can&apos;t stress this enough. If you add a second one, both become invalid. Merge them into a single record with multiple <code className="bg-gray-200 px-2 py-0.5 rounded text-xs">include:</code> statements.
            </p>
          </div>

          <div className="p-5 bg-red-50 rounded-xl border border-red-100">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <span className="text-red-600 font-bold">4.</span> Forgetting about alignment
            </h3>
            <p className="text-gray-700 text-sm">
              SPF passes, DKIM passes, but DMARC still fails. Why? Because the domains don&apos;t align. Your SPF might authenticate <code className="bg-gray-200 px-2 py-0.5 rounded text-xs">bounce.sendgrid.net</code> but your From address is <code className="bg-gray-200 px-2 py-0.5 rounded text-xs">you@yourdomain.com</code>. That&apos;s an alignment mismatch. Make sure at least one of SPF or DKIM uses your actual domain.
            </p>
          </div>

          <div className="p-5 bg-red-50 rounded-xl border border-red-100">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <span className="text-red-600 font-bold">5.</span> Not monitoring DMARC reports
            </h3>
            <p className="text-gray-700 text-sm">
              Setting up DMARC without reading the reports is like installing a security camera and never checking the footage. Those reports tell you exactly who&apos;s sending email as your domain — including services you forgot about and attackers you didn&apos;t know existed.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-lg font-bold">✅</span>
          Quick Comparison Checklist
        </h2>

        <div className="my-6 p-6 bg-gray-50 rounded-xl space-y-4">
          <div>
            <h3 className="font-semibold text-blue-700 mb-2">SPF</h3>
            <ul className="space-y-1.5 text-sm text-gray-700">
              <li className="flex items-start gap-2"><span>☐</span> One TXT record on your root domain</li>
              <li className="flex items-start gap-2"><span>☐</span> Lists all services that send email for you</li>
              <li className="flex items-start gap-2"><span>☐</span> Under 10 DNS lookups</li>
              <li className="flex items-start gap-2"><span>☐</span> Ends with <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">-all</code> (hard fail) or <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">~all</code> (soft fail)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-green-700 mb-2">DKIM</h3>
            <ul className="space-y-1.5 text-sm text-gray-700">
              <li className="flex items-start gap-2"><span>☐</span> Key generated in your email provider</li>
              <li className="flex items-start gap-2"><span>☐</span> Public key published in DNS (TXT record on selector subdomain)</li>
              <li className="flex items-start gap-2"><span>☐</span> Using 2048-bit key length</li>
              <li className="flex items-start gap-2"><span>☐</span> Signing domain matches your From domain</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-orange-700 mb-2">DMARC</h3>
            <ul className="space-y-1.5 text-sm text-gray-700">
              <li className="flex items-start gap-2"><span>☐</span> TXT record on <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">_dmarc.yourdomain.com</code></li>
              <li className="flex items-start gap-2"><span>☐</span> Started with <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">p=none</code>, working toward <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">p=reject</code></li>
              <li className="flex items-start gap-2"><span>☐</span> Report email address (<code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs">rua=</code>) configured</li>
              <li className="flex items-start gap-2"><span>☐</span> At least one of SPF/DKIM aligned with your From domain</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Not Sure If Your Setup Is Right?</h3>
        <p className="text-blue-100 mb-6 max-w-md mx-auto">
          Run a free domain check. EmailDiag tests your SPF, DKIM, and DMARC configuration in seconds and tells you exactly what needs fixing.
        </p>
        <Link 
          href="/test"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors text-lg"
        >
          Check My Domain Free <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Related Articles */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Keep reading</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/blog/email-authentication-best-practices-2026" className="p-4 border rounded-xl hover:border-blue-300 hover:bg-blue-50/30 transition-colors">
            <h3 className="font-medium text-gray-800 mb-1">Email Authentication Best Practices 2026</h3>
            <p className="text-sm text-gray-500">The complete guide to staying ahead of Gmail and Yahoo&apos;s requirements.</p>
          </Link>
          <Link href="/blog/how-to-test-email-deliverability" className="p-4 border rounded-xl hover:border-blue-300 hover:bg-blue-50/30 transition-colors">
            <h3 className="font-medium text-gray-800 mb-1">How to Test Email Deliverability</h3>
            <p className="text-sm text-gray-500">My complete 6-step workflow for making sure emails actually land in inboxes.</p>
          </Link>
        </div>
      </section>
    </>
  );
}
