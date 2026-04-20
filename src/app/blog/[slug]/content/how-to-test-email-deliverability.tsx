import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, Shield } from 'lucide-react';

export default function HowToTestEmailDeliverability() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          Last month, a friend called me in a panic. His SaaS app had been sending welcome emails 
          for <em>three weeks</em> — and about 40% of them were going straight to spam. He had no idea 
          until customers started complaining they never got their login credentials.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          The scary part? He thought everything was fine. He&apos;d set up SPF and DKIM months ago 
          and assumed it was working. But he never actually <em>tested</em> it. Turns out his DKIM 
          key had been rotated by his ESP, and no one updated the DNS record. Three weeks of 
          broken authentication, hundreds of emails in spam folders, and a bunch of angry users.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          That experience convinced me: testing email deliverability isn&apos;t something you do once 
          and forget. It&apos;s something you should check regularly — especially after DNS changes, 
          provider switches, or when you notice engagement dropping.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Here&apos;s exactly how I test deliverability now, step by step. No fluff, just the stuff 
          that actually catches problems before your users do.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Want the quick version? Test your domain right now</h3>
            <p className="text-blue-100 mb-4">
              EmailDiag checks your SPF, DKIM, DMARC, and blacklist status in about 10 seconds. 
              Free, no signup required. Start here and then read on for the full testing workflow.
            </p>
            <Link 
              href="/test"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Test My Domain Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="my-10 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-4">What we&apos;ll cover:</h3>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <a href="#why-test" className="text-blue-600 hover:underline">Why most people skip testing (and regret it)</a>
          <a href="#authentication" className="text-blue-600 hover:underline">Step 1: Check your authentication records</a>
          <a href="#send-test" className="text-blue-600 hover:underline">Step 2: Send test emails to major providers</a>
          <a href="#headers" className="text-blue-600 hover:underline">Step 3: Read the email headers</a>
          <a href="#blacklists" className="text-blue-600 hover:underline">Step 4: Check blacklists</a>
          <a href="#content" className="text-blue-600 hover:underline">Step 5: Test your email content</a>
          <a href="#ongoing" className="text-blue-600 hover:underline">Step 6: Set up ongoing monitoring</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick testing checklist</a>
        </div>
      </div>

      {/* Section: Why test */}
      <section id="why-test" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">?</span>
          Why Most People Skip Testing (And Regret It Later)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s a pattern I see constantly: someone sets up their email infrastructure, sends 
          themselves a test email, sees it land in their inbox, and calls it done. 
          &quot;Works for me!&quot; Famous last words.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          The problem is that sending one email to yourself proves almost nothing. Gmail treats 
          emails differently based on your sending history, engagement patterns, and authentication 
          setup. An email that reaches <em>your</em> inbox might land in spam for everyone else.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Real deliverability testing means checking multiple things:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
          <li><strong>Authentication</strong> — Are SPF, DKIM, and DMARC all passing?</li>
          <li><strong>Reputation</strong> — Is your IP or domain on any blacklists?</li>
          <li><strong>Content</strong> — Does your email body trigger spam filters?</li>
          <li><strong>Infrastructure</strong> — Are your DNS records configured correctly?</li>
          <li><strong>Inbox placement</strong> — Where does it actually land across different providers?</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          Skip any one of these and you&apos;re flying blind. I learned this the hard way after a 
          client&apos;s transactional emails silently went to spam for two weeks because their IP 
          got listed on Spamhaus. Nobody checked. Two weeks of password reset emails in spam 
          folders. Not fun.
        </p>
      </section>

      {/* Step 1: Authentication */}
      <section id="authentication" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          Check Your Authentication Records (SPF, DKIM, DMARC)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          This is step one for a reason — authentication failures are the #1 cause of 
          deliverability problems I see. Before you do anything else, make sure your DNS 
          records are correct.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">SPF Check</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          Quick way to check your SPF record from the command line:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
          <div><span className="text-gray-400"># Check SPF record for your domain</span></div>
          <div>nslookup -type=TXT yourdomain.com</div>
          <div className="mt-2"><span className="text-gray-400"># Or with dig (Linux/Mac)</span></div>
          <div>dig TXT yourdomain.com +short</div>
          <div className="mt-3"><span className="text-gray-400"># You should see something like:</span></div>
          <div><span className="text-green-400">&quot;v=spf1 include:_spf.google.com include:sendgrid.net ~all&quot;</span></div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          What to look for: make sure all your sending sources are included. If you use Google 
          Workspace AND SendGrid, both need to be in there. Miss one and those emails fail SPF.
        </p>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2">⚠️ Watch the lookup limit</p>
          <p className="text-amber-700">
            SPF has a hard limit of 10 DNS lookups. Each <code className="bg-amber-100 px-1 rounded">include:</code> counts 
            as at least one. If you&apos;re over 10, SPF will permanently fail — and most tools won&apos;t 
            warn you clearly. I wrote a whole guide on{' '}
            <Link href="/blog/spf-lookup-limit-exceeded" className="text-blue-600 hover:underline">
              fixing the SPF lookup limit
            </Link> if you hit this.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">DKIM Check</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          DKIM is trickier to check because you need to know your selector. It varies by provider:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
          <div><span className="text-gray-400"># Common DKIM selectors by provider:</span></div>
          <div><span className="text-blue-300">Google Workspace:</span> google._domainkey.yourdomain.com</div>
          <div><span className="text-blue-300">SendGrid:</span> s1._domainkey.yourdomain.com</div>
          <div><span className="text-blue-300">Mailgun:</span> k1._domainkey.yourdomain.com</div>
          <div><span className="text-blue-300">AWS SES:</span> [random]._domainkey.yourdomain.com</div>
          <div className="mt-3"><span className="text-gray-400"># Check it:</span></div>
          <div>nslookup -type=TXT google._domainkey.yourdomain.com</div>
          <div className="mt-2"><span className="text-gray-400"># Should return a key starting with:</span></div>
          <div><span className="text-green-400">&quot;v=DKIM1; k=rsa; p=MIGfMA0GCSq...&quot;</span></div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          If it comes back empty, your DKIM isn&apos;t set up. If it returns a key, great — but that 
          only means the DNS record exists. You still need to verify it actually <em>passes</em> when 
          you send email. More on that in Step 3.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">DMARC Check</h3>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
          <div><span className="text-gray-400"># Check DMARC record</span></div>
          <div>nslookup -type=TXT _dmarc.yourdomain.com</div>
          <div className="mt-2"><span className="text-gray-400"># Minimum valid DMARC:</span></div>
          <div><span className="text-green-400">&quot;v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com&quot;</span></div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          No DMARC record? That&apos;s a problem in 2026. Gmail and Yahoo now <em>require</em> DMARC 
          for bulk senders, and even small senders benefit from it. At minimum, set up 
          <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">p=none</code> so you start getting 
          reports. Check our{' '}
          <Link href="/blog/dmarc-policy-not-found" className="text-blue-600 hover:underline">
            DMARC setup guide
          </Link> for the full walkthrough.
        </p>

        <div className="my-6 p-5 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
          <p className="font-medium text-blue-800 mb-2">💡 Or just use a tool</p>
          <p className="text-blue-700">
            Honestly, running these commands manually gets old fast. That&apos;s literally why I built{' '}
            <Link href="/test" className="text-blue-600 hover:underline font-medium">EmailDiag</Link> — 
            it checks all three records at once and tells you exactly what&apos;s wrong. One click, 
            10 seconds, done.
          </p>
        </div>
      </section>

      {/* Step 2: Send test emails */}
      <section id="send-test" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          Send Test Emails to Major Providers
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          DNS records looking good? Time to actually send some emails and see where they land. 
          Don&apos;t just send to yourself — each provider handles email differently.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s my testing routine. I keep test accounts at each of these:
        </p>

        <div className="my-6 space-y-3">
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">📧 Gmail (personal)</p>
            <p className="text-gray-600 text-sm">The biggest email provider. Strict filtering, tabs system. If it works here, you&apos;re in decent shape.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">📧 Google Workspace</p>
            <p className="text-gray-600 text-sm">Different filtering rules than personal Gmail. Worth testing separately — I&apos;ve seen emails pass personal Gmail but get flagged in Workspace.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">📧 Outlook.com / Hotmail</p>
            <p className="text-gray-600 text-sm">Microsoft&apos;s consumer email. Notoriously aggressive spam filtering. If you can pass here, you can pass anywhere.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">📧 Yahoo Mail</p>
            <p className="text-gray-600 text-sm">Still has significant market share. Their spam filtering has gotten much stricter in 2025-2026.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-semibold text-gray-800 mb-1">📧 Apple Mail (iCloud)</p>
            <p className="text-gray-600 text-sm">Growing user base. Less aggressive filtering, but worth checking for completeness.</p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Send the same email to all of them. Use your actual email template — not just 
          &quot;test 123&quot;. The content matters for spam scoring (we&apos;ll get to that in Step 5).
        </p>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2">⚠️ Don&apos;t test from a brand new domain</p>
          <p className="text-amber-700">
            New domains have zero reputation. Your first emails will probably land in spam regardless 
            of how perfect your setup is. If you just registered a domain, warm it up for at least 
            2-4 weeks before judging deliverability. Send small volumes to engaged recipients first, 
            then gradually increase.
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed">
          For each test email, note: Did it land in Inbox, Spam, or Promotions tab? This gives 
          you a baseline. If something&apos;s going to spam, the next step tells you why.
        </p>
      </section>

      {/* Step 3: Read headers */}
      <section id="headers" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          Read the Email Headers (This Is Where the Truth Lives)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Email headers tell you exactly what happened during delivery. This is the single most 
          useful debugging technique I know, and most people never look at them.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">How to View Headers in Gmail</h3>

        <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-6">
          <li>Open the email</li>
          <li>Click the three dots (⋮) in the top right</li>
          <li>Select <strong>&quot;Show original&quot;</strong></li>
          <li>You&apos;ll see a summary at the top — that&apos;s the gold</li>
        </ol>

        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s what you&apos;re looking for in the <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">Authentication-Results</code> header:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
          <div><span className="text-gray-400"># What you WANT to see:</span></div>
          <div>Authentication-Results: mx.google.com;</div>
          <div>       <span className="text-green-400">spf=pass</span> (google.com: domain of you@yourdomain.com designates 1.2.3.4 as permitted sender)</div>
          <div>       <span className="text-green-400">dkim=pass</span> header.i=@yourdomain.com header.s=google</div>
          <div>       <span className="text-green-400">dmarc=pass</span> (p=QUARANTINE sp=QUARANTINE dis=NONE)</div>
        </div>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
          <div><span className="text-gray-400"># What you DON&apos;T want to see:</span></div>
          <div>       <span className="text-red-400">spf=fail</span> <span className="text-gray-400"># Your sending IP isn&apos;t in SPF record</span></div>
          <div>       <span className="text-red-400">dkim=fail</span> <span className="text-gray-400"># DKIM signature doesn&apos;t match DNS key</span></div>
          <div>       <span className="text-red-400">spf=softfail</span> <span className="text-gray-400"># IP not in SPF, but ~all means &quot;soft&quot; fail</span></div>
          <div>       <span className="text-yellow-400">dkim=neutral</span> <span className="text-gray-400"># DKIM record exists but didn&apos;t verify</span></div>
          <div>       <span className="text-red-400">dmarc=fail</span> <span className="text-gray-400"># Neither SPF nor DKIM aligned with From domain</span></div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          I check these three lines every single time. If all three show <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">pass</code>, 
          your authentication is solid. If any one of them fails, that&apos;s your problem right there.
        </p>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2">💡 Pro tip: check the &quot;softfail&quot; carefully</p>
          <p className="text-amber-700">
            SPF <code className="bg-amber-100 px-1 rounded">softfail</code> (<code className="bg-amber-100 px-1 rounded">~all</code>) 
            doesn&apos;t outright reject the email, but it hurts your spam score. Gmail treats it as a 
            negative signal. If you see softfail, find the sending IP that&apos;s not covered and add 
            it to your SPF record. Better yet, switch to <code className="bg-amber-100 px-1 rounded">-all</code> once 
            you&apos;re confident your SPF record is complete.
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed">
          If you see{' '}
          <Link href="/blog/dkim-signature-verification-failed" className="text-blue-600 hover:underline">
            DKIM signature verification failed
          </Link>, that usually means the key in DNS doesn&apos;t match what the server signed with. 
          Common after key rotations or provider changes.
        </p>
      </section>

      {/* Step 4: Blacklists */}
      <section id="blacklists" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          Check If You&apos;re on Any Blacklists
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Authentication all passing but still hitting spam? Check if your sending IP or domain 
          is blacklisted. This happens more often than you&apos;d think — especially on shared IPs.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          The big blacklists to check:
        </p>

        <div className="my-6 space-y-3">
          <div className="p-4 bg-gray-50 rounded-xl border flex items-start gap-3">
            <Shield className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-800">Spamhaus (SBL, XBL, PBL)</p>
              <p className="text-gray-600 text-sm">The most impactful blacklist. If you&apos;re on Spamhaus, most of your email is going to spam. Period.</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border flex items-start gap-3">
            <Shield className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-800">Barracuda (BRBL)</p>
              <p className="text-gray-600 text-sm">Used by many corporate email gateways. Getting listed here kills B2B email delivery.</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border flex items-start gap-3">
            <Shield className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-800">SpamCop</p>
              <p className="text-gray-600 text-sm">Listings are usually temporary (24-48 hours) but still hurt during that window.</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border flex items-start gap-3">
            <Shield className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-800">SURBL / URIBL</p>
              <p className="text-gray-600 text-sm">These check your <em>domain</em> (not IP). Links in your email body get checked against these.</p>
            </div>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          You can check manually at each provider&apos;s site, or use a multi-checker tool. 
          I usually start with MXToolbox&apos;s blacklist check — it hits about 100 lists at once.
        </p>

        <div className="my-6 p-5 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
          <p className="font-medium text-red-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> On a shared IP? You&apos;re at risk
          </p>
          <p className="text-red-700">
            If you&apos;re using a shared sending IP (common with SendGrid free tier, Mailgun starter, 
            etc.), someone else&apos;s bad behavior can get &quot;your&quot; IP blacklisted. This is one of the 
            biggest arguments for dedicated IPs once you&apos;re sending 50K+ emails per month. For 
            lower volumes, shared IPs are usually fine — just check regularly.
          </p>
        </div>
      </section>

      {/* Step 5: Content */}
      <section id="content" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          Test Your Email Content (Yes, Words Matter)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Authentication&apos;s passing, you&apos;re not blacklisted, but emails are still going to spam? 
          The problem might be your email itself. Spam filters analyze your content, and certain 
          patterns are red flags.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Content Red Flags to Avoid</h3>

        <div className="my-6 space-y-3">
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5" /> ALL CAPS SUBJECT LINES
            </p>
            <p className="text-red-700 text-sm">
              &quot;FREE OFFER INSIDE!!!&quot; — instant spam trigger. Even partial caps like &quot;Get Your FREE Gift&quot; can hurt.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5" /> Too many images, not enough text
            </p>
            <p className="text-red-700 text-sm">
              Image-only emails are a classic spam technique. Aim for at least a 60/40 text-to-image ratio.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5" /> Suspicious links
            </p>
            <p className="text-red-700 text-sm">
              URL shorteners (bit.ly, etc.), mismatched display text vs. actual URL, and links to newly 
              registered domains all trigger filters.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5" /> Missing unsubscribe link
            </p>
            <p className="text-red-700 text-sm">
              For marketing emails, this isn&apos;t just a spam filter issue — it&apos;s a legal requirement 
              (CAN-SPAM, GDPR). Gmail now explicitly checks for a one-click unsubscribe header too.
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Content Checks That Actually Work</h3>

        <div className="my-6 space-y-3">
          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
            <p className="font-semibold text-green-800 flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5" /> Send your actual production template
            </p>
            <p className="text-green-700 text-sm">
              Don&apos;t test with &quot;Hello this is a test.&quot; Test with your real email content — 
              the template, the links, the images, everything. Spam filters score the complete package.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
            <p className="font-semibold text-green-800 flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5" /> Check your HTML for issues
            </p>
            <p className="text-green-700 text-sm">
              Broken HTML, inline JavaScript, and embedded forms are spam signals. Keep your HTML clean 
              and use inline CSS. Tables for layout (I know, it&apos;s 2026 and we&apos;re still doing this for email).
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
            <p className="font-semibold text-green-800 flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5" /> Include a plain text version
            </p>
            <p className="text-green-700 text-sm">
              Always send multipart emails (HTML + plain text). HTML-only emails score slightly 
              worse with some filters. Most ESPs do this automatically, but double-check.
            </p>
          </div>
        </div>
      </section>

      {/* Step 6: Ongoing monitoring */}
      <section id="ongoing" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">6</span>
          Set Up Ongoing Monitoring (Don&apos;t Just Test Once)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s the thing that my friend from the intro learned the hard way: deliverability 
          can change overnight. Your IP gets blacklisted, a DNS record expires, your ESP rotates 
          DKIM keys — and suddenly emails are going to spam.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">What to Monitor Regularly</h3>

        <div className="my-4 space-y-4">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">W</span>
            <div>
              <p className="font-medium text-gray-800">Weekly: Run an authentication check</p>
              <p className="text-gray-600 text-sm">Quick SPF/DKIM/DMARC check. Takes 30 seconds with a tool like EmailDiag. Catches DNS changes or record deletions.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">W</span>
            <div>
              <p className="font-medium text-gray-800">Weekly: Check your bounce rate</p>
              <p className="text-gray-600 text-sm">Your ESP dashboard shows this. Bounce rates above 2% are a warning sign. Above 5% and you&apos;ve got a problem.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">M</span>
            <div>
              <p className="font-medium text-gray-800">Monthly: Full blacklist check</p>
              <p className="text-gray-600 text-sm">Check your sending IPs against major blacklists. More frequently if you&apos;re on shared IPs.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">M</span>
            <div>
              <p className="font-medium text-gray-800">Monthly: Review DMARC reports</p>
              <p className="text-gray-600 text-sm">If you set up DMARC with <code className="bg-gray-100 px-1 rounded text-xs">rua=</code>, you&apos;re getting aggregate reports. Review them to spot unauthorized senders or authentication failures you missed.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">!</span>
            <div>
              <p className="font-medium text-gray-800">After any change: Re-test everything</p>
              <p className="text-gray-600 text-sm">Changed DNS provider? Switched ESP? Updated email templates? Test again. Every. Time. I can&apos;t stress this enough.</p>
            </div>
          </div>
        </div>

        <div className="my-6 p-5 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
          <p className="font-medium text-blue-800 mb-2">💡 Set a calendar reminder</p>
          <p className="text-blue-700">
            Seriously, put &quot;check email deliverability&quot; on your calendar for every Monday morning. 
            It takes 2 minutes with the right tools and saves you from finding out about problems 
            from angry customers. I have mine set as a recurring 15-minute slot at 9 AM.
          </p>
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <div className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">✅ Email Deliverability Testing Checklist</h2>
          <p className="text-gray-400 mb-6 text-sm">Run through this every time you set up a new sending domain or after infrastructure changes.</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>SPF record exists and is valid</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>SPF includes all sending sources</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>SPF lookup count ≤ 10</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>DKIM record exists in DNS</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>DKIM passes in email headers</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>DMARC record set up</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Test email to Gmail → Inbox</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Test email to Outlook → Inbox</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Test email to Yahoo → Inbox</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Not on major blacklists</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Email content passes spam checks</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Weekly monitoring scheduled</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Test Your Email Deliverability Right Now</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          Don&apos;t wait until customers complain. Run your domain through EmailDiag — we&apos;ll 
          check SPF, DKIM, DMARC, and blacklist status in seconds. Free, no signup.
        </p>
        <Link 
          href="/test"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
        >
          Run Free Deliverability Test <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Wrap-up */}
      <div className="mt-8 mb-4">
        <p className="text-gray-700 leading-relaxed mb-4">
          That&apos;s my complete email deliverability testing workflow. The whole thing takes about 
          15-20 minutes for a thorough check, and 2 minutes for the weekly spot-check. The key 
          is making it a habit — don&apos;t wait for problems to find you.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          If you found issues during testing, here&apos;s where to go next:{' '}
          <Link href="/blog/spf-dkim-set-but-not-found" className="text-blue-600 hover:underline">
            SPF/DKIM not found errors
          </Link>,{' '}
          <Link href="/blog/dmarc-policy-not-found" className="text-blue-600 hover:underline">
            DMARC setup guide
          </Link>, or{' '}
          <Link href="/blog/why-emails-going-to-spam" className="text-blue-600 hover:underline">
            the complete &quot;why emails go to spam&quot; guide
          </Link>.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Now go test those emails. Your future self (and your users) will thank you. 🚀
        </p>
      </div>
    </>
  );
}
