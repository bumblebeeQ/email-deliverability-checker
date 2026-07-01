import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, Shield } from 'lucide-react';

export default function Office365SpfRecordExample() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          A client emailed me last week: <strong className="text-gray-800">&quot;We switched to Microsoft 365 
          and now half our invoices are bouncing or landing in spam. Our old SPF record from the previous 
          provider is still in there somewhere.&quot;</strong>
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Classic migration mistake. They kept the old SPF include from their previous host and just 
          <em> added</em> the Microsoft one next to it — as a second TXT record. Two SPF records means 
          neither one validates. I&apos;ve seen this exact scenario probably 15 times this year alone.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          The good news: Microsoft 365&apos;s SPF setup is actually one of the simplest once you see a 
          real example. No weird proprietary syntax, no hidden gotchas — just one include value that 
          covers pretty much everything. Let me show you exactly what it should look like.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Let&apos;s get your record fixed.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">First — see what your current SPF record actually says</h3>
            <p className="text-blue-100 mb-4">
              Before touching DNS, check what&apos;s already there. Old records from a previous 
              provider love to hide in plain sight. Takes 10 seconds.
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
          <a href="#basic-example" className="text-blue-600 hover:underline">The basic Office 365 SPF record example</a>
          <a href="#where-to-add" className="text-blue-600 hover:underline">Step 1: Where to add it (DNS provider)</a>
          <a href="#hybrid-setup" className="text-blue-600 hover:underline">Step 2: Hybrid setup — Microsoft + other services</a>
          <a href="#gcc-high" className="text-blue-600 hover:underline">Step 3: GCC High and other special tenants</a>
          <a href="#verify" className="text-blue-600 hover:underline">Step 4: Verify it&apos;s actually working</a>
          <a href="#common-mistakes" className="text-blue-600 hover:underline">5 mistakes I keep seeing with M365 SPF</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick fix checklist</a>
        </div>
      </div>

      {/* Section: Basic example */}
      <section id="basic-example" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          The Basic Office 365 SPF Record Example
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          If Microsoft 365 (Exchange Online) is your only email sender, your SPF record should look 
          exactly like this:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-4 overflow-x-auto">
          <code className="text-green-400 text-sm font-mono">
            v=spf1 include:spf.protection.outlook.com -all
          </code>
        </div>

        <p className="text-gray-600 text-sm mb-6">
          ↑ This says: &quot;Only Microsoft&apos;s Exchange Online servers can send as my domain. Hard-fail 
          everything else.&quot;
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Note that I used <code className="bg-gray-100 px-1 rounded">-all</code> (hard fail) here, not 
          <code className="bg-gray-100 px-1 rounded">~all</code>. Microsoft&apos;s own documentation actually 
          recommends hard fail for M365-only setups, since the include already covers their entire 
          sending range. If you&apos;re nervous about breaking things during migration, start with 
          <code className="bg-gray-100 px-1 rounded">~all</code> for a week, then switch.
        </p>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <Shield className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Where this record goes:</strong> On your root domain (the same domain as your 
            email address after the @). Not on a subdomain, not on autodiscover — just the plain 
            domain, e.g. <code className="bg-gray-100 px-1 rounded">yourcompany.com</code>.
          </p>
        </div>
      </section>

      {/* Section: Where to add it */}
      <section id="where-to-add" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          Where to Add It (Your DNS Provider, Not Microsoft)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          This trips people up constantly: SPF is a DNS record, and it goes wherever your domain&apos;s 
          DNS is hosted — <strong>not</strong> inside the Microsoft 365 admin center. If you bought 
          your domain through GoDaddy, Namecheap, Cloudflare, or your domain registrar manages DNS, 
          that&apos;s where you add it.
        </p>

        <div className="space-y-4 mb-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold text-gray-800 mb-1">1. Log into your DNS provider</p>
            <p className="text-gray-600 text-sm">GoDaddy, Cloudflare, Namecheap, Google Domains — wherever your nameservers point.</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold text-gray-800 mb-1">2. Find the DNS management / Records section</p>
            <p className="text-gray-600 text-sm">Usually under &quot;DNS,&quot; &quot;DNS Zone File,&quot; or &quot;Advanced DNS.&quot;</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold text-gray-800 mb-2">3. Add a new TXT record:</p>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="font-medium text-gray-700 w-20">Type:</span>
                <span className="text-gray-800">TXT</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-gray-700 w-20">Host/Name:</span>
                <span className="text-gray-800">@ <span className="text-gray-500">(root domain)</span></span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-gray-700 w-20">Value:</span>
                <code className="bg-white px-2 py-0.5 rounded border text-xs">v=spf1 include:spf.protection.outlook.com -all</code>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-gray-700 w-20">TTL:</span>
                <span className="text-gray-800">3600 or Auto</span>
              </div>
            </div>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold text-gray-800 mb-1">4. Save and wait for propagation</p>
            <p className="text-gray-600 text-sm">Usually 15 minutes to a few hours depending on your provider&apos;s TTL settings.</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
          <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Before you save:</strong> Search your existing DNS records for anything starting 
            with <code className="bg-gray-100 px-1 rounded">v=spf1</code>. If you migrated from Google 
            Workspace, GoDaddy Email, or any other provider, there&apos;s a very good chance an old SPF 
            record is still sitting there. Edit that one — don&apos;t add a second one.
          </p>
        </div>
      </section>

      {/* Section: Hybrid setup */}
      <section id="hybrid-setup" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          Hybrid Setup: Microsoft 365 + Other Services
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Most businesses don&apos;t send email from just one place. Maybe your team uses Outlook for 
          regular mail, but Salesforce sends your marketing emails and Stripe sends your invoices. 
          You need ONE SPF record with every sender included:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-2 overflow-x-auto">
          <div className="text-sm font-mono">
            <span className="text-gray-500">// ✅ Correct — single record, all senders combined</span>
            <br />
            <span className="text-green-400">v=spf1 include:spf.protection.outlook.com include:sendgrid.net ~all</span>
          </div>
        </div>
        <p className="text-gray-500 text-xs mb-6">One record. Every sender gets an include. One qualifier at the end.</p>

        <div className="bg-gray-900 rounded-xl p-5 mb-2 overflow-x-auto">
          <div className="text-sm font-mono">
            <span className="text-gray-500">// ❌ Wrong — two separate SPF records</span>
            <br />
            <span className="text-red-400">v=spf1 include:spf.protection.outlook.com -all</span>
            <br />
            <span className="text-red-400">v=spf1 include:sendgrid.net ~all</span>
          </div>
        </div>
        <p className="text-gray-500 text-xs mb-6">Two SPF records = permerror. This is the #1 mistake during M365 migrations.</p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s a real-world combo I set up last month for a client running M365 + Mailchimp + a 
          CRM that sends transactional email:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-6 overflow-x-auto">
          <code className="text-green-400 text-sm font-mono">
            v=spf1 include:spf.protection.outlook.com include:servers.mcsv.net include:_spf.salesforce.com ~all
          </code>
        </div>

        <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Watch your lookup count!</strong> Microsoft&apos;s own include alone uses several 
            nested lookups. Add 2-3 more services and you can hit the 10-lookup limit faster than 
            you&apos;d think. See our{' '}
            <Link href="/blog/spf-lookup-limit-exceeded" className="text-blue-600 hover:underline">SPF lookup limit guide</Link> if 
            your record starts failing with a permerror.
          </p>
        </div>
      </section>

      {/* Section: GCC High */}
      <section id="gcc-high" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          Using GCC High, DoD, or a Custom Tenant?
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          The <code className="bg-gray-100 px-1 rounded">spf.protection.outlook.com</code> include is 
          for standard commercial Microsoft 365 tenants. If your organization is on a government or 
          sovereign cloud, the include value is different:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 border font-medium text-gray-700">Tenant type</th>
                <th className="text-left p-3 border font-medium text-gray-700">SPF Include Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border text-gray-700">Standard commercial M365</td>
                <td className="p-3 border"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs">include:spf.protection.outlook.com</code></td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 border text-gray-700">GCC High</td>
                <td className="p-3 border"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs">include:spf.protection.office365.us</code></td>
              </tr>
              <tr>
                <td className="p-3 border text-gray-700">DoD</td>
                <td className="p-3 border"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs">include:spf.protection.office365.us</code></td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 border text-gray-700">Office 365 China (21Vianet)</td>
                <td className="p-3 border"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs">include:spf.protection.partner.outlook.cn</code></td>
              </tr>
              <tr>
                <td className="p-3 border text-gray-700">Office 365 Germany</td>
                <td className="p-3 border"><code className="bg-gray-100 px-2 py-0.5 rounded text-xs">include:spf.protection.outlook.de</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-gray-700 leading-relaxed">
          If you&apos;re not sure which one applies, check your admin center URL. If you&apos;re logging 
          into <code className="bg-gray-100 px-1 rounded">portal.office365.us</code>, you&apos;re on GCC 
          High or DoD — use the .us include. Everyone else uses the standard 
          <code className="bg-gray-100 px-1 rounded">.com</code> version.
        </p>
      </section>

      {/* Section: Verify */}
      <section id="verify" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          Verify It&apos;s Actually Working
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Don&apos;t just assume it worked because you saved the record. Here&apos;s how I confirm it 
          every time:
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-gray-800">Method 1: Use EmailDiag (instant)</p>
              <p className="text-gray-600 text-sm">
                Run your domain through our{' '}
                <Link href="/test" className="text-blue-600 hover:underline">free domain checker</Link>. 
                It parses your SPF record, flags duplicates, and shows your lookup count.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-gray-800">Method 2: Command line</p>
              <div className="bg-gray-900 rounded-lg p-3 mt-2">
                <code className="text-green-400 text-xs font-mono">
                  nslookup -type=txt yourcompany.com
                </code>
              </div>
              <p className="text-gray-500 text-xs mt-2">On Mac/Linux: dig TXT yourcompany.com +short</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-gray-800">Method 3: Send a real test email</p>
              <p className="text-gray-600 text-sm">
                Send from your Outlook account to a Gmail address, open it, click the three dots → 
                &quot;Show original.&quot; Look for <code className="bg-gray-100 px-1 rounded">spf=pass</code> in 
                the authentication results near the top.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <Shield className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Timing note:</strong> Give it at least 30 minutes after saving before you panic. 
            Some DNS providers cache the old zone file longer than they should, especially right after 
            a domain migration to M365.
          </p>
        </div>
      </section>

      {/* Section: Common mistakes */}
      <section id="common-mistakes" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">⚠</span>
          5 Mistakes I Keep Seeing With M365 SPF
        </h2>

        <div className="space-y-6">
          <div className="border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-gray-800">Mistake #1: Leftover SPF record from the old provider</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              The single most common issue during migration. The old include (Google, GoDaddy, whoever) 
              never gets removed — it just sits next to the new Microsoft one.
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Fix:</strong> Search for every TXT record starting with &quot;v=spf1&quot; and merge them 
              into exactly one.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-gray-800">Mistake #2: Adding it in the M365 admin center instead of DNS</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              SPF isn&apos;t configured inside Microsoft 365 admin at all (unless Microsoft is also your 
              DNS host). It&apos;s a DNS record at your domain registrar or DNS provider.
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Fix:</strong> Log into wherever your domain&apos;s nameservers point, not admin.microsoft.com.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-gray-800">Mistake #3: Using the wrong regional include</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Using the standard <code className="bg-gray-100 px-1 rounded">.com</code> include on a 
              GCC High or China 21Vianet tenant. It won&apos;t validate because those tenants use different 
              sending IP ranges.
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Fix:</strong> Check your admin portal URL and use the matching include from the 
              table above.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-gray-800">Mistake #4: Forgetting third-party senders</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              Everyone remembers Outlook. Almost nobody remembers that their CRM, payroll system, or 
              marketing platform also sends email &quot;from&quot; the same domain — and needs its own include.
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Fix:</strong> List every tool that sends email as your domain before finalizing 
              the record, not after emails start bouncing.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-gray-800">Mistake #5: Typos in &quot;protection.outlook.com&quot;</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              I&apos;ve seen <code className="bg-gray-100 px-1 rounded">spf.protect.outlook.com</code> and 
              <code className="bg-gray-100 px-1 rounded">spf.protection.outlook.co</code> — one missing or 
              swapped character and the whole include silently fails to resolve.
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Fix:</strong> Copy-paste the value directly, don&apos;t retype it from memory.
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
              <span className="text-gray-700">Only ONE TXT record starts with <code className="bg-gray-100 px-1 rounded text-sm">v=spf1</code> on your root domain</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded" readOnly />
              <span className="text-gray-700">Includes <code className="bg-gray-100 px-1 rounded text-sm">spf.protection.outlook.com</code> (or the correct regional variant)</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded" readOnly />
              <span className="text-gray-700">Every other sending service (CRM, marketing tool, invoicing) also has an include</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded" readOnly />
              <span className="text-gray-700">No leftover SPF record from your previous email provider</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded" readOnly />
              <span className="text-gray-700">Ends with <code className="bg-gray-100 px-1 rounded text-sm">~all</code> or <code className="bg-gray-100 px-1 rounded text-sm">-all</code></span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded" readOnly />
              <span className="text-gray-700">Total DNS lookups ≤ 10 (check with EmailDiag)</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded" readOnly />
              <span className="text-gray-700">Verified with nslookup/dig or a real test email after saving</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Not sure if your Office 365 SPF record is correct?</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          Run your domain through EmailDiag and get an instant validation report — see your record, 
          check for duplicates, and verify your lookup count, all free.
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
          A correct Office 365 SPF record almost always boils down to one line: 
          <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">v=spf1 include:spf.protection.outlook.com -all</code>, 
          placed once on your root domain, with any additional senders added as extra includes in that 
          same record.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          The single biggest cause of failures isn&apos;t Microsoft&apos;s setup — it&apos;s leftover records 
          from whatever you used before migrating. Clean those up first, and 90% of &quot;my SPF isn&apos;t 
          working after switching to M365&quot; problems disappear.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Still stuck? Run a full diagnostic with our{' '}
          <Link href="/test" className="text-blue-600 hover:underline">free email deliverability checker</Link>. 
          It&apos;ll show you exactly what&apos;s wrong.
        </p>
      </div>
    </>
  );
}
