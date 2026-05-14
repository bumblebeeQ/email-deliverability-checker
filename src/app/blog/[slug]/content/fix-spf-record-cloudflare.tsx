import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, Shield } from 'lucide-react';

export default function FixSpfRecordCloudflare() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          I got a panicked Slack message from a friend last month: <strong className="text-gray-800">&quot;My 
          SPF record is failing and all our customer emails are going to spam. I&apos;m using Cloudflare 
          and I have no idea what I messed up.&quot;</strong>
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Turns out he&apos;d added an SPF record as a CNAME instead of a TXT record. Cloudflare&apos;s 
          DNS interface doesn&apos;t exactly hold your hand here, and I&apos;ve seen this same mistake at 
          least a dozen times. The orange cloud proxy thing doesn&apos;t help either — it messes with 
          people&apos;s heads about what gets proxied and what doesn&apos;t.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s the good news: fixing SPF on Cloudflare is actually straightforward once you know 
          the three places things go wrong. I&apos;ll walk you through the exact steps, show you the 
          Cloudflare-specific gotchas, and get your SPF passing in about 5 minutes.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Let&apos;s fix this.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">First — check if your SPF is actually broken</h3>
            <p className="text-blue-100 mb-4">
              Before you start changing DNS records, run a quick check on your domain. Maybe it&apos;s 
              already passing and the issue is something else entirely. Takes 10 seconds.
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
          <a href="#why-cloudflare" className="text-blue-600 hover:underline">Why Cloudflare SPF setup trips people up</a>
          <a href="#correct-record" className="text-blue-600 hover:underline">Step 1: The correct SPF record format</a>
          <a href="#add-to-cloudflare" className="text-blue-600 hover:underline">Step 2: Adding it in Cloudflare&apos;s dashboard</a>
          <a href="#multiple-services" className="text-blue-600 hover:underline">Step 3: Multiple email services? Combine them</a>
          <a href="#proxy-mode" className="text-blue-600 hover:underline">Step 4: Proxy mode — does it matter?</a>
          <a href="#verify" className="text-blue-600 hover:underline">Step 5: Verify it&apos;s working</a>
          <a href="#common-mistakes" className="text-blue-600 hover:underline">5 Cloudflare SPF mistakes I keep seeing</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick fix checklist</a>
        </div>
      </div>

      {/* Section: Why Cloudflare trips people up */}
      <section id="why-cloudflare" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">!</span>
          Why Cloudflare SPF Setup Trips People Up
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Cloudflare is fantastic for performance and security, but its DNS management has a few 
          quirks that confuse people when setting up email authentication:
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-100">
            <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-gray-800">The orange cloud confusion</p>
              <p className="text-gray-600 text-sm">People see the proxy toggle and wonder if their TXT records 
              get proxied too. They don&apos;t — but the UI isn&apos;t super clear about this.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-100">
            <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-gray-800">Multiple TXT records on the same name</p>
              <p className="text-gray-600 text-sm">Cloudflare happily lets you add multiple SPF records 
              on the same domain — which actually <em>breaks</em> SPF entirely. No warning.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-100">
            <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-gray-800">The &quot;@&quot; vs domain name thing</p>
              <p className="text-gray-600 text-sm">Some guides say put &quot;@&quot; in the Name field, others say 
              your domain. In Cloudflare, &quot;@&quot; means your root domain — but if you type the full domain 
              it also works. Confusing for beginners.</p>
            </div>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          Okay, now that you know why it&apos;s confusing — let&apos;s fix it properly.
        </p>
      </section>

      {/* Section: Correct SPF record */}
      <section id="correct-record" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          The Correct SPF Record Format
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          An SPF record is just a TXT record on your domain that lists which servers are allowed 
          to send email on your behalf. Here&apos;s the basic structure:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-4 overflow-x-auto">
          <code className="text-green-400 text-sm font-mono">
            v=spf1 include:_spf.google.com ~all
          </code>
        </div>

        <p className="text-gray-600 text-sm mb-6">
          ↑ This says: &quot;Only Google&apos;s servers can send as my domain. Soft-fail everything else.&quot;
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Here are the most common SPF records depending on your email provider:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 border font-medium text-gray-700">Provider</th>
                <th className="text-left p-3 border font-medium text-gray-700">SPF Include Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border text-gray-700">Google Workspace</td>
                <td className="p-3 border"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs">include:_spf.google.com</code></td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 border text-gray-700">Microsoft 365</td>
                <td className="p-3 border"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs">include:spf.protection.outlook.com</code></td>
              </tr>
              <tr>
                <td className="p-3 border text-gray-700">SendGrid</td>
                <td className="p-3 border"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs">include:sendgrid.net</code></td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 border text-gray-700">Mailgun</td>
                <td className="p-3 border"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs">include:mailgun.org</code></td>
              </tr>
              <tr>
                <td className="p-3 border text-gray-700">AWS SES</td>
                <td className="p-3 border"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs">include:amazonses.com</code></td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 border text-gray-700">Zoho Mail</td>
                <td className="p-3 border"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs">include:zoho.com</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <Shield className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Pro tip:</strong> Use <code className="bg-gray-100 px-1 rounded">~all</code> (soft fail) 
            while you&apos;re testing. Once you&apos;re confident everything works, switch to{' '}
            <code className="bg-gray-100 px-1 rounded">-all</code> (hard fail) for better security. 
            I always start with soft fail — less risk of accidentally blocking legit emails.
          </p>
        </div>
      </section>

      {/* Section: Add to Cloudflare */}
      <section id="add-to-cloudflare" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          Adding the SPF Record in Cloudflare
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s the step-by-step. I&apos;m going to be annoyingly specific because I&apos;ve watched 
          people make mistakes on each step:
        </p>

        <div className="space-y-6 mb-8">
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold text-gray-800 mb-1">1. Log into Cloudflare → Select your domain</p>
            <p className="text-gray-600 text-sm">Make sure you&apos;re on the right domain if you have multiple sites.</p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold text-gray-800 mb-1">2. Go to DNS → Records</p>
            <p className="text-gray-600 text-sm">Left sidebar → DNS → Records tab. You&apos;ll see all your existing records.</p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold text-gray-800 mb-1">3. Click &quot;Add Record&quot;</p>
            <p className="text-gray-600 text-sm">Big blue button at the top. Hard to miss.</p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold text-gray-800 mb-2">4. Fill in the fields:</p>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="font-medium text-gray-700 w-20">Type:</span>
                <span className="text-gray-800">TXT</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-gray-700 w-20">Name:</span>
                <span className="text-gray-800">@ <span className="text-gray-500">(or your domain name — same thing in Cloudflare)</span></span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-gray-700 w-20">Content:</span>
                <code className="bg-white px-2 py-0.5 rounded border text-xs">v=spf1 include:_spf.google.com ~all</code>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-gray-700 w-20">TTL:</span>
                <span className="text-gray-800">Auto <span className="text-gray-500">(fine for now)</span></span>
              </div>
            </div>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold text-gray-800 mb-1">5. Click Save</p>
            <p className="text-gray-600 text-sm">Done. But wait — you need to check one more thing (next step).</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
          <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Critical:</strong> Before saving, scroll down and check if you already have an SPF 
            record (another TXT record starting with <code className="bg-gray-100 px-1 rounded">v=spf1</code>). 
            If you do, you need to <em>edit</em> the existing one instead of adding a new one. 
            Having two SPF records = SPF permanently broken.
          </p>
        </div>
      </section>

      {/* Section: Multiple services */}
      <section id="multiple-services" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          Multiple Email Services? Here&apos;s How to Combine Them
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          This is where most people mess up. Say you use Google Workspace for regular email AND 
          SendGrid for transactional emails. You need ONE SPF record with both includes:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-2 overflow-x-auto">
          <div className="text-sm font-mono">
            <span className="text-gray-500">// ✅ Correct — single record, multiple includes</span>
            <br />
            <span className="text-green-400">v=spf1 include:_spf.google.com include:sendgrid.net ~all</span>
          </div>
        </div>
        <p className="text-gray-500 text-xs mb-6">One SPF record. Multiple includes. One ~all at the end.</p>

        <div className="bg-gray-900 rounded-xl p-5 mb-2 overflow-x-auto">
          <div className="text-sm font-mono">
            <span className="text-gray-500">// ❌ Wrong — two separate SPF records</span>
            <br />
            <span className="text-red-400">v=spf1 include:_spf.google.com ~all</span>
            <br />
            <span className="text-red-400">v=spf1 include:sendgrid.net ~all</span>
          </div>
        </div>
        <p className="text-gray-500 text-xs mb-6">Two SPF records on the same domain = permerror. SPF completely broken.</p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s a real-world example with Google Workspace + SendGrid + Mailgun (yes, I&apos;ve seen setups like this):
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-6 overflow-x-auto">
          <code className="text-green-400 text-sm font-mono">
            v=spf1 include:_spf.google.com include:sendgrid.net include:mailgun.org ~all
          </code>
        </div>

        <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Watch your lookup count!</strong> Each <code className="bg-gray-100 px-1 rounded">include:</code> counts 
            toward the 10-lookup limit. Google alone uses 4 lookups. If you have 3-4 services, 
            you might hit the limit. Check out our{' '}
            <Link href="/blog/spf-lookup-limit-exceeded" className="text-blue-600 hover:underline">SPF lookup limit guide</Link> if 
            you run into this.
          </p>
        </div>
      </section>

      {/* Section: Proxy mode */}
      <section id="proxy-mode" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          Does Cloudflare Proxy Mode Affect SPF?
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Short answer: <strong>no</strong>. But I totally get why people worry about this.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Cloudflare&apos;s proxy (the orange cloud icon) only applies to HTTP/HTTPS traffic — web 
          requests. TXT records like SPF are DNS-only records. They don&apos;t carry traffic, so there&apos;s 
          nothing to proxy.
        </p>

        <div className="bg-gray-50 rounded-xl p-5 mb-6">
          <p className="font-medium text-gray-800 mb-3">Here&apos;s what&apos;s proxied vs. not:</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-400"></span>
              <span className="text-gray-700">A/AAAA records (web traffic) — <strong>proxied</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-400"></span>
              <span className="text-gray-700">MX records (email routing) — <strong>DNS only, never proxied</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-400"></span>
              <span className="text-gray-700">TXT records (SPF, DKIM, DMARC) — <strong>DNS only, never proxied</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-400"></span>
              <span className="text-gray-700">CNAME records for email — <strong>DNS only</strong></span>
            </div>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          So don&apos;t worry about the proxy toggle for email records. TXT records don&apos;t even show 
          the proxy option in Cloudflare&apos;s UI — that&apos;s your confirmation.
        </p>
      </section>

      {/* Section: Verify */}
      <section id="verify" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          Verify It&apos;s Working
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          After adding your SPF record, you need to confirm it&apos;s actually propagated and validating 
          correctly. Here&apos;s my verification workflow:
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-gray-800">Method 1: Use EmailDiag (instant)</p>
              <p className="text-gray-600 text-sm">
                Run your domain through our{' '}
                <Link href="/test" className="text-blue-600 hover:underline">free domain checker</Link>. 
                It&apos;ll show you exactly what your SPF record says, whether it&apos;s valid, and 
                how many lookups you&apos;re using.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-gray-800">Method 2: Command line (for the nerds)</p>
              <div className="bg-gray-900 rounded-lg p-3 mt-2">
                <code className="text-green-400 text-xs font-mono">
                  dig TXT yourdomain.com +short | grep spf
                </code>
              </div>
              <p className="text-gray-500 text-xs mt-2">On Windows? Use: nslookup -type=txt yourdomain.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-gray-800">Method 3: Send a test email</p>
              <p className="text-gray-600 text-sm">
                Send an email to a Gmail account, then click the three dots → &quot;Show original.&quot; 
                Look for <code className="bg-gray-100 px-1 rounded">spf=pass</code> in the authentication results.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <Shield className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Timing note:</strong> Cloudflare DNS propagation is usually fast — like 1-5 minutes 
            for most locations. But some ISPs cache aggressively. If your check fails right away, 
            wait 10 minutes and try again. I&apos;ve never had to wait more than 30 minutes with Cloudflare.
          </p>
        </div>
      </section>

      {/* Section: Common mistakes */}
      <section id="common-mistakes" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">⚠</span>
          5 Cloudflare SPF Mistakes I Keep Seeing
        </h2>

        <div className="space-y-6">
          {/* Mistake 1 */}
          <div className="border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-gray-800">Mistake #1: Multiple SPF records</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              This is the #1 issue I see. Someone adds a new email service and creates a second SPF 
              record instead of editing the existing one.
            </p>
            <div className="bg-gray-900 rounded-lg p-3 text-xs font-mono mb-2">
              <span className="text-red-400">❌ Two SPF records = both invalid</span>
            </div>
            <p className="text-gray-600 text-sm">
              <strong>Fix:</strong> Search your DNS records for &quot;v=spf1&quot;. If you find more than one, 
              merge them into a single record.
            </p>
          </div>

          {/* Mistake 2 */}
          <div className="border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-gray-800">Mistake #2: Wrong record type</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              I&apos;ve seen people add SPF as a CNAME or even an A record. It must be a TXT record. Period.
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Fix:</strong> Delete the wrong record type. Add a fresh TXT record with your SPF value.
            </p>
          </div>

          {/* Mistake 3 */}
          <div className="border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-gray-800">Mistake #3: Putting SPF on a subdomain</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              If your emails come from <code className="bg-gray-100 px-1 rounded">user@yourdomain.com</code>, 
              the SPF record goes on <code className="bg-gray-100 px-1 rounded">yourdomain.com</code> (Name: @). 
              Not on <code className="bg-gray-100 px-1 rounded">mail.yourdomain.com</code> unless you&apos;re 
              sending from that subdomain.
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Fix:</strong> Make sure Name is set to @ (root domain) unless you specifically 
              send from a subdomain.
            </p>
          </div>

          {/* Mistake 4 */}
          <div className="border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-gray-800">Mistake #4: Forgetting the &quot;v=spf1&quot; prefix</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Some people just type <code className="bg-gray-100 px-1 rounded">include:_spf.google.com ~all</code> without 
              the required <code className="bg-gray-100 px-1 rounded">v=spf1</code> at the start. That makes 
              the whole record invalid — receiving servers won&apos;t recognize it as SPF.
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Fix:</strong> Always start with <code className="bg-gray-100 px-1 rounded">v=spf1</code>. Always.
            </p>
          </div>

          {/* Mistake 5 */}
          <div className="border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-gray-800">Mistake #5: Using +all instead of ~all or -all</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              I once saw someone use <code className="bg-gray-100 px-1 rounded">+all</code> which literally means 
              &quot;allow anyone in the world to send as my domain.&quot; That defeats the entire purpose of SPF 
              and can actually make your spam score <em>worse</em>.
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Fix:</strong> Use <code className="bg-gray-100 px-1 rounded">~all</code> (soft fail) 
              or <code className="bg-gray-100 px-1 rounded">-all</code> (hard fail). Never <code className="bg-gray-100 px-1 rounded">+all</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-lg font-bold">✓</span>
          Quick Fix Checklist
        </h2>

        <div className="bg-gray-50 rounded-xl p-6">
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded" readOnly />
              <span className="text-gray-700">Only ONE TXT record starts with <code className="bg-gray-100 px-1 rounded text-sm">v=spf1</code> on your domain</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded" readOnly />
              <span className="text-gray-700">Record type is TXT (not CNAME, not A)</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded" readOnly />
              <span className="text-gray-700">Name field is @ (root domain) — or your specific sending subdomain</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded" readOnly />
              <span className="text-gray-700">All your email services are included in one record</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded" readOnly />
              <span className="text-gray-700">Ends with <code className="bg-gray-100 px-1 rounded text-sm">~all</code> or <code className="bg-gray-100 px-1 rounded text-sm">-all</code> (never +all)</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded" readOnly />
              <span className="text-gray-700">Total DNS lookups ≤ 10 (check with EmailDiag)</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded" readOnly />
              <span className="text-gray-700">Verified with dig/nslookup or online tool after saving</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Not sure if your fix worked?</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          Run your domain through EmailDiag and get an instant SPF validation report. 
          See your record, check for errors, and verify your lookup count — all free.
        </p>
        <Link 
          href="/test"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          Test My SPF Record <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Wrap up */}
      <div className="mt-8 pt-8 border-t">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Wrapping Up</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Cloudflare SPF setup really comes down to one thing: make sure you have exactly one TXT 
          record starting with <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">v=spf1</code> on 
          your root domain, with all your email service includes in it, ending with{' '}
          <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">~all</code>.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          The proxy thing doesn&apos;t matter for email records. The propagation is fast. And if 
          something&apos;s still not working, 90% of the time it&apos;s a duplicate SPF record hiding 
          somewhere in your DNS zone.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Good luck — and if you&apos;re still stuck after all this, feel free to run a full diagnostic 
          with our <Link href="/test" className="text-blue-600 hover:underline">free email deliverability checker</Link>. 
          It&apos;ll tell you exactly what&apos;s wrong.
        </p>
      </div>
    </>
  );
}
