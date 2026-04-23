import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, Shield, Lock } from 'lucide-react';

export default function EmailAuthenticationBestPractices2026() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          A few months ago, I helped a friend migrate his company&apos;s email from one ESP to another.
          Everything looked perfect — SPF record updated, DKIM keys rotated, DMARC policy in place.
          We sent a test email, it landed in the inbox, high-fived, and moved on.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Two weeks later, he pinged me at 11pm: &quot;Dude, 60% of our invoices are going to spam.
          Clients are saying they never got them.&quot; Turns out the old ESP&apos;s
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">include:</code> was still in the SPF record,
          the new DKIM selector had a typo in the DNS entry, and his DMARC policy was set to{' '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">p=none</code> — so nothing was actually
          being enforced. Three separate issues, all at once.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          That mess could have been avoided with a proper authentication checklist. Not the
          &quot;set it and forget it&quot; kind — a real, up-to-date set of practices that accounts for
          how email providers work <em>right now</em>, in 2026.
        </p>
        <p className="text-gray-700 leading-relaxed">
          So here it is. Everything I&apos;ve learned from fixing authentication problems across dozens
          of domains, distilled into the practices that actually matter this year. No theory lectures —
          just the stuff that keeps your emails out of spam folders.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔒</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">How&apos;s your authentication right now?</h3>
            <p className="text-blue-100 mb-4">
              Before diving in, check where you stand. EmailDiag tests your SPF, DKIM, DMARC,
              and blacklist status in about 10 seconds. Free, no signup. See what needs fixing first.
            </p>
            <Link
              href="/test"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Check My Authentication <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="my-10 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-4">What we&apos;ll cover:</h3>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <a href="#why-2026" className="text-blue-600 hover:underline">Why 2026 is different (the rules changed)</a>
          <a href="#spf" className="text-blue-600 hover:underline">SPF: Keep it tight and under the limit</a>
          <a href="#dkim" className="text-blue-600 hover:underline">DKIM: Bigger keys, proper rotation</a>
          <a href="#dmarc" className="text-blue-600 hover:underline">DMARC: Stop sitting on p=none</a>
          <a href="#alignment" className="text-blue-600 hover:underline">The alignment trap nobody talks about</a>
          <a href="#monitoring" className="text-blue-600 hover:underline">Monitor or it&apos;ll break silently</a>
          <a href="#mistakes" className="text-blue-600 hover:underline">5 mistakes I still see every week</a>
          <a href="#checklist" className="text-blue-600 hover:underline">The 2026 authentication checklist</a>
        </div>
      </div>

      {/* Section: Why 2026 is different */}
      <section id="why-2026" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">!</span>
          Why 2026 Is Different (The Rules Changed)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          If you set up email authentication a couple of years ago and haven&apos;t touched it since,
          you might be in for a rude surprise. Gmail, Yahoo, and Microsoft have all tightened
          their requirements significantly since late 2024.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s what&apos;s changed and why it matters:
        </p>

        <div className="my-6 space-y-3">
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-gray-800 mb-1">🚨 Gmail &amp; Yahoo: DMARC is mandatory for bulk senders</p>
            <p className="text-gray-600 text-sm">
              Since February 2024, if you send more than 5,000 emails/day to Gmail or Yahoo, you
              <em> must</em> have DMARC. But here&apos;s the thing — even if you send way less than that,
              having no DMARC hurts your reputation. Most providers now factor DMARC presence into
              their spam scoring, regardless of volume.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-gray-800 mb-1">🚨 Microsoft: Stricter enforcement rolling out</p>
            <p className="text-gray-600 text-sm">
              Outlook.com and Microsoft 365 have been quietly ramping up enforcement throughout 2025.
              Emails failing authentication are increasingly being rejected outright instead of just
              landing in spam. If your Outlook delivery rate dropped recently, check your auth first.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-gray-800 mb-1">🚨 DKIM 1024-bit keys: On borrowed time</p>
            <p className="text-gray-600 text-sm">
              Google has been pushing for 2048-bit DKIM keys for years. While 1024-bit still works,
              it&apos;s increasingly seen as a negative signal. Several security-focused providers
              already flag it. If you&apos;re still on 1024-bit, upgrading should be on your list this year.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          The bottom line: what was &quot;good enough&quot; in 2023 might not cut it anymore. The bar has
          moved, and it&apos;s only moving higher. Let&apos;s make sure you&apos;re ahead of it.
        </p>
      </section>

      {/* Section: SPF */}
      <section id="spf" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          SPF: Keep It Tight and Under the Limit
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          SPF tells receiving servers which IP addresses are allowed to send email for your domain.
          Simple concept, but I see it misconfigured constantly. Here&apos;s what a solid SPF setup
          looks like in 2026.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">The 10-Lookup Rule Still Applies</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          Every <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">include:</code>,{' '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">a:</code>, and{' '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">mx:</code> in your SPF record
          counts toward a hard limit of 10 DNS lookups. Go over and SPF fails permanently — a
          &quot;permerror&quot; that most receiving servers treat as a hard fail.
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
          <div><span className="text-gray-400"># ❌ Bad: Too many includes (probably over 10 lookups)</span></div>
          <div><span className="text-red-400">v=spf1 include:_spf.google.com include:sendgrid.net include:spf.protection.outlook.com include:mail.zendesk.com include:amazonses.com include:helpscoutemail.com ~all</span></div>
          <div className="mt-3"><span className="text-gray-400"># ✅ Better: Only include services you actually use right now</span></div>
          <div><span className="text-green-400">v=spf1 include:_spf.google.com include:sendgrid.net ~all</span></div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Audit your SPF record every quarter. Seriously. I can&apos;t tell you how many times I&apos;ve
          found includes for services that were cancelled two years ago. Each unnecessary include
          wastes a lookup and brings you closer to the limit.
        </p>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2">⚠️ If you&apos;re already over the limit</p>
          <p className="text-amber-700">
            Don&apos;t panic. You have options: flatten your record (replace includes with direct IP
            ranges), use SPF macros, or consolidate sending services. I covered this in detail in my{' '}
            <Link href="/blog/spf-lookup-limit-exceeded" className="text-blue-600 hover:underline">
              SPF lookup limit fix guide
            </Link>.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Use -all, Not ~all (When You&apos;re Ready)</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          The <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">~all</code> (soft fail)
          mechanism is fine when you&apos;re first setting up, but in 2026 you should be aiming for{' '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">-all</code> (hard fail).
          Soft fail tells receivers &quot;emails from unauthorized sources are suspicious but maybe let
          them through.&quot; Hard fail says &quot;reject them.&quot;
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          The catch: only switch to <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">-all</code> after
          you&apos;re confident <em>every</em> legitimate sending source is in your SPF record. I usually
          recommend running with <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">~all</code> for
          at least 2-4 weeks while monitoring DMARC reports to catch anything you missed.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">One Record, One Domain</h3>

        <p className="text-gray-700 leading-relaxed">
          This one still trips people up: you can only have <strong>one</strong> SPF record per domain.
          If you add a second TXT record starting with{' '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">v=spf1</code>, both become invalid.
          I see this happen a lot when different teams add their own services without coordinating.
          Always merge into a single record.
        </p>
      </section>

      {/* Section: DKIM */}
      <section id="dkim" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          DKIM: Bigger Keys, Proper Rotation
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          DKIM signs your emails with a cryptographic key so receivers can verify they haven&apos;t
          been tampered with. It&apos;s been around for years, but the best practices have evolved.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Upgrade to 2048-Bit Keys</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          If your DKIM key is 1024 bits, it still works — for now. But 2048-bit is the standard
          you should target. The security improvement is significant, and more providers are
          starting to treat 1024-bit keys as a minor negative signal.
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
          <div><span className="text-gray-400"># Check your DKIM key length</span></div>
          <div><span className="text-gray-400"># Look at the &apos;p=&apos; value in your DKIM record</span></div>
          <div>nslookup -type=TXT google._domainkey.yourdomain.com</div>
          <div className="mt-2"><span className="text-gray-400"># 1024-bit key: ~216 characters in the p= value</span></div>
          <div><span className="text-gray-400"># 2048-bit key: ~392 characters in the p= value</span></div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Most ESPs (SendGrid, Mailgun, AWS SES) now generate 2048-bit keys by default. If
          you set up DKIM before 2024, there&apos;s a good chance you&apos;re still on 1024. Check and
          rotate if needed — it&apos;s usually a quick regenerate in your ESP dashboard plus a DNS update.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Rotate Keys at Least Once a Year</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          DKIM key rotation is something almost nobody does, and it drives me a little crazy.
          If your DKIM key is compromised, someone can send perfectly authenticated emails as
          your domain until you notice.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          The process is straightforward:
        </p>

        <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-4">
          <li>Generate a new key pair in your ESP (use a new selector like <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">s2</code> instead of <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">s1</code>)</li>
          <li>Add the new DKIM record to DNS with the new selector</li>
          <li>Wait for DNS propagation (give it 24-48 hours to be safe)</li>
          <li>Switch your ESP to use the new selector</li>
          <li>Keep the old record active for a few days (for in-flight emails)</li>
          <li>Remove the old DKIM record</li>
        </ol>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2">⚠️ Don&apos;t delete the old key too fast</p>
          <p className="text-amber-700">
            If you remove the old DKIM DNS record immediately after switching selectors, any emails
            that were sent with the old key but haven&apos;t been verified yet will fail DKIM.
            I learned this one the hard way — keep both records active for at least 48 hours.
            For high-volume senders, I&apos;d say a week to be safe.
          </p>
        </div>
      </section>

      {/* Section: DMARC */}
      <section id="dmarc" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          DMARC: Stop Sitting on p=none
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          This is probably the most important advice in this entire article. If your DMARC policy
          is still set to <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">p=none</code>,
          you&apos;re monitoring but not protecting. It&apos;s like having a security camera but no locks
          on the doors.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">The Path to p=reject</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          I know, moving to <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">p=reject</code> feels
          scary. &quot;What if I block legitimate email?&quot; That&apos;s a valid concern. Here&apos;s the
          progression I recommend:
        </p>

        <div className="my-6 space-y-3">
          <div className="p-4 bg-gray-50 rounded-xl border flex items-start gap-4">
            <div className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
            <div>
              <p className="font-semibold text-gray-800">Start with p=none + rua reports</p>
              <div className="my-2 bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com; fo=1
              </div>
              <p className="text-gray-600 text-sm">Collect reports for 2-4 weeks. Review them to find all legitimate sending sources.</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border flex items-start gap-4">
            <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
            <div>
              <p className="font-semibold text-gray-800">Move to p=quarantine with a percentage</p>
              <div className="my-2 bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                v=DMARC1; p=quarantine; pct=10; rua=mailto:dmarc@yourdomain.com; fo=1
              </div>
              <p className="text-gray-600 text-sm">Start with 10%, then 25%, 50%, 100%. Each step, check reports for false positives.</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border flex items-start gap-4">
            <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
            <div>
              <p className="font-semibold text-gray-800">Graduate to p=reject</p>
              <div className="my-2 bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                v=DMARC1; p=reject; rua=mailto:dmarc@yourdomain.com; ruf=mailto:dmarc-forensic@yourdomain.com; fo=1
              </div>
              <p className="text-gray-600 text-sm">The gold standard. Unauthorized emails get rejected outright. Your domain is now protected from spoofing.</p>
            </div>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          The whole process takes 6-12 weeks depending on your volume and complexity. But I&apos;ve
          seen organizations sit on <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">p=none</code> for
          <em> years</em> because nobody wants to be the person who breaks email. Don&apos;t be that
          organization. Set a deadline and work toward it.
        </p>

        <div className="my-6 p-5 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
          <p className="font-medium text-green-800 mb-2">✅ Quick check: What&apos;s your DMARC policy?</p>
          <p className="text-green-700">
            Run your domain through{' '}
            <Link href="/test" className="text-blue-600 hover:underline font-medium">EmailDiag</Link> —
            it&apos;ll show you exactly what your current DMARC policy is and what needs to change.
            If you see <code className="bg-green-100 px-1 rounded">p=none</code>, it&apos;s time to
            start the journey to <code className="bg-green-100 px-1 rounded">p=reject</code>.
          </p>
        </div>
      </section>

      {/* Section: Alignment */}
      <section id="alignment" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          The Alignment Trap Nobody Talks About
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s something that trips up even experienced admins: SPF and DKIM can both pass,
          but DMARC still fails. How? <strong>Alignment.</strong>
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          DMARC requires that the domain in the &quot;From&quot; header matches (aligns with) the domain
          used by either SPF or DKIM. If your marketing emails are sent from{' '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">news@yourcompany.com</code> but
          your ESP sends them via{' '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">bounce.esp-provider.com</code>,
          SPF passes for the ESP&apos;s domain — not yours. That&apos;s a misalignment.
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
          <div><span className="text-gray-400"># What alignment failure looks like in email headers:</span></div>
          <div className="mt-2"><span className="text-blue-300">From:</span> news@yourcompany.com</div>
          <div><span className="text-blue-300">Return-Path:</span> bounce@esp-provider.com  <span className="text-red-400">← SPF misaligned!</span></div>
          <div><span className="text-blue-300">DKIM-Signature: d=</span>esp-provider.com  <span className="text-red-400">← DKIM misaligned!</span></div>
          <div className="mt-2"><span className="text-yellow-400"># SPF: pass (for esp-provider.com) but DMARC: fail (not aligned with yourcompany.com)</span></div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>The fix:</strong> Set up a custom Return-Path domain (like{' '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">mail.yourcompany.com</code>) with
          your ESP, and configure DKIM to sign with your domain. Most ESPs call this &quot;domain
          authentication&quot; or &quot;sender authentication&quot; — it&apos;s usually a few DNS records they give
          you to add.
        </p>

        <div className="my-6 p-5 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
          <p className="font-medium text-blue-800 mb-2">💡 Relaxed vs Strict alignment</p>
          <p className="text-blue-700">
            DMARC has two alignment modes: &quot;relaxed&quot; (default) lets subdomains match the parent,
            so <code className="bg-blue-100 px-1 rounded">mail.yourcompany.com</code> aligns with{' '}
            <code className="bg-blue-100 px-1 rounded">yourcompany.com</code>. &quot;Strict&quot; requires
            an exact domain match. Relaxed is fine for most setups, but if you want tighter
            control, add <code className="bg-blue-100 px-1 rounded">aspf=s; adkim=s</code> to your
            DMARC record.
          </p>
        </div>
      </section>

      {/* Section: Monitoring */}
      <section id="monitoring" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          Monitor or It&apos;ll Break Silently
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Setting up authentication is the easy part. Keeping it working is where most people
          fail. DNS records get accidentally deleted during migrations. ESPs rotate keys without
          telling you. Someone adds a new sending service and forgets to update SPF.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          The worst part? You often won&apos;t notice until customers complain. Unlike a website going
          down, email failures are invisible — the emails just silently disappear into spam folders.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">What to Monitor</h3>

        <div className="my-6 space-y-3">
          <div className="p-4 bg-gray-50 rounded-xl border flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-800">DMARC aggregate reports (rua)</p>
              <p className="text-gray-600 text-sm">These come in daily from major providers. They tell you what percentage of your emails pass/fail authentication. Use a free tool like DMARCian or Postmark&apos;s DMARC service to parse them — raw XML reports are painful to read.</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-800">SPF/DKIM/DMARC pass rates</p>
              <p className="text-gray-600 text-sm">Track the percentage over time. A sudden drop means something changed. If your DKIM pass rate drops from 99% to 70%, investigate immediately — don&apos;t wait for the customer complaints.</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-800">DNS record changes</p>
              <p className="text-gray-600 text-sm">Set up alerts for changes to your TXT records. Tools like DNS Spy or even a simple cron job that checks your records daily can save you from nasty surprises.</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-800">Blacklist status</p>
              <p className="text-gray-600 text-sm">Check your sending IPs against major blacklists weekly. Getting listed on Spamhaus or Barracuda can tank your delivery overnight. Run a quick check on <Link href="/test" className="text-blue-600 hover:underline">EmailDiag</Link> to see your current status.</p>
            </div>
          </div>
        </div>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2">⚠️ Set a calendar reminder</p>
          <p className="text-amber-700">
            At minimum, run a full authentication check once a month. I do mine on the first
            Monday. Takes 5 minutes and has caught problems before they became emergencies more
            times than I can count.
          </p>
        </div>
      </section>

      {/* Section: Common mistakes */}
      <section id="mistakes" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">✗</span>
          5 Mistakes I Still See Every Week
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          After helping dozens of companies fix their email authentication, these are the
          mistakes that keep coming up. If you recognize any of these, fix them now.
        </p>

        <div className="space-y-6">
          <div className="p-5 bg-red-50 rounded-xl border border-red-100">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800 mb-2">1. Multiple SPF records on the same domain</p>
                <p className="text-gray-700 text-sm">
                  This happens when different teams or vendors add their own SPF records without
                  checking what&apos;s already there. Two SPF records = both invalid. Always merge
                  into one. Check with:{' '}
                  <code className="bg-red-100 px-1.5 py-0.5 rounded text-xs">nslookup -type=TXT yourdomain.com</code> —
                  you should see exactly one record starting with <code className="bg-red-100 px-1.5 py-0.5 rounded text-xs">v=spf1</code>.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 bg-red-50 rounded-xl border border-red-100">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800 mb-2">2. DKIM configured in ESP but DNS record missing</p>
                <p className="text-gray-700 text-sm">
                  You enabled DKIM in your email provider&apos;s dashboard and assumed it was working.
                  But the CNAME or TXT record never got added to DNS (or got deleted during a
                  migration). The ESP signs the email, but receivers can&apos;t find the public key
                  to verify it. Silent failure.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 bg-red-50 rounded-xl border border-red-100">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800 mb-2">3. DMARC rua reports going to a full or unmonitored inbox</p>
                <p className="text-gray-700 text-sm">
                  You set up <code className="bg-red-100 px-1 rounded text-xs">rua=mailto:admin@company.com</code>,
                  but that inbox hit its storage limit six months ago. Or nobody ever actually reads
                  the reports. It&apos;s like having a fire alarm that nobody can hear. Use a dedicated
                  DMARC monitoring service or at least a dedicated email address that someone checks.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 bg-red-50 rounded-xl border border-red-100">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800 mb-2">4. Not authenticating transactional AND marketing email</p>
                <p className="text-gray-700 text-sm">
                  Your marketing emails go through SendGrid (fully authenticated), but your app&apos;s
                  transactional emails go through your own server with no DKIM signing. Both need
                  to be authenticated. Unauthenticated transactional emails failing will drag down
                  your domain reputation, which hurts <em>everything</em> you send.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 bg-red-50 rounded-xl border border-red-100">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800 mb-2">5. Forgetting about subdomains</p>
                <p className="text-gray-700 text-sm">
                  You authenticated <code className="bg-red-100 px-1 rounded text-xs">company.com</code> perfectly,
                  but <code className="bg-red-100 px-1 rounded text-xs">app.company.com</code> and{' '}
                  <code className="bg-red-100 px-1 rounded text-xs">support.company.com</code> have no
                  authentication at all. Each subdomain needs its own SPF and DKIM setup. Use the DMARC{' '}
                  <code className="bg-red-100 px-1 rounded text-xs">sp=</code> tag to set a policy for
                  subdomains, and add specific records for any subdomain that sends email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-lg font-bold">✓</span>
          The 2026 Email Authentication Checklist
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          Print this out, bookmark it, put it on a sticky note — whatever works. Run through
          it quarterly and after any infrastructure change.
        </p>

        <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">SPF ✉️</h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
              <span className="text-gray-700">Single SPF record (no duplicates)</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
              <span className="text-gray-700">Under 10 DNS lookups</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
              <span className="text-gray-700">All current sending services included (remove old ones!)</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
              <span className="text-gray-700">Using -all (or ~all with a plan to move to -all)</span>
            </li>
          </ul>

          <h3 className="font-bold text-gray-800 mb-4 text-lg">DKIM 🔑</h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
              <span className="text-gray-700">2048-bit keys (not 1024-bit)</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
              <span className="text-gray-700">DNS record exists and matches your ESP config</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
              <span className="text-gray-700">Keys rotated in the last 12 months</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
              <span className="text-gray-700">All sending sources sign with your domain (not just the ESP&apos;s)</span>
            </li>
          </ul>

          <h3 className="font-bold text-gray-800 mb-4 text-lg">DMARC 🛡️</h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
              <span className="text-gray-700">DMARC record exists on _dmarc.yourdomain.com</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
              <span className="text-gray-700">Policy is p=quarantine or p=reject (not p=none)</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
              <span className="text-gray-700">rua reports going to a monitored address</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
              <span className="text-gray-700">Subdomain policy (sp=) is set</span>
            </li>
          </ul>

          <h3 className="font-bold text-gray-800 mb-4 text-lg">General 🔍</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
              <span className="text-gray-700">SPF and/or DKIM alignment with From domain (DMARC alignment)</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
              <span className="text-gray-700">All subdomains that send email are authenticated</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
              <span className="text-gray-700">Sending IPs not on any blacklists</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 border-2 border-gray-400 rounded mt-0.5 flex-shrink-0"></div>
              <span className="text-gray-700">Monthly check scheduled (set that calendar reminder!)</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to Check Your Authentication?</h3>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            EmailDiag runs a complete SPF, DKIM, DMARC, and blacklist check in about 10 seconds.
            Free, no signup required. Find out exactly where you stand — and what to fix first.
          </p>
          <Link
            href="/test"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors"
          >
            Test My Domain Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Related articles */}
      <div className="my-10 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-bold text-gray-800 mb-4">Related guides you might find useful:</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/blog/dmarc-policy-not-found" className="text-blue-600 hover:underline">
              → &quot;DMARC Policy Not Found&quot; Error? Here&apos;s the Complete Fix
            </Link>
          </li>
          <li>
            <Link href="/blog/spf-lookup-limit-exceeded" className="text-blue-600 hover:underline">
              → &quot;SPF Lookup Limit Exceeded&quot; Error? Here&apos;s How I Fixed It
            </Link>
          </li>
          <li>
            <Link href="/blog/dkim-signature-verification-failed" className="text-blue-600 hover:underline">
              → &quot;DKIM Signature Verification Failed&quot;? Here&apos;s How to Fix It
            </Link>
          </li>
          <li>
            <Link href="/blog/how-to-test-email-deliverability" className="text-blue-600 hover:underline">
              → How to Test Email Deliverability (My Complete 6-Step Workflow)
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
