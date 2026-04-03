import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function SpfLookupLimitExceeded() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          A client's marketing team decided to add HubSpot to their email stack. Seemed harmless enough — 
          they were already using Google Workspace, SendGrid, Mailchimp, and Zendesk. But the moment they 
          updated their SPF record to include HubSpot, <strong>everything broke</strong>.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Every email started bouncing with this cryptic error: <code className="bg-gray-100 px-2 py-1 rounded">SPF PermError: Too many DNS lookups</code>. 
          Took me an embarrassing amount of time to figure out what was going on. Spoiler: they'd hit the infamous 
          <strong> SPF 10-lookup limit</strong>, and I had to flatten their entire SPF record to fix it.
        </p>
        <p className="text-gray-700 leading-relaxed">
          If you're seeing "SPF lookup limit exceeded" errors, you're in the right place. Let me show you exactly 
          how to fix this — no fluff, just the stuff that actually works.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">First — check how many lookups your SPF is using</h3>
            <p className="text-blue-100 mb-4">
              Run a quick SPF check. We'll show you exactly how many DNS lookups your record requires and which ones are pushing you over the limit.
            </p>
            <Link 
              href="/test"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Check My SPF <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="my-10 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-4">What we'll cover:</h3>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <a href="#what-is-limit" className="text-blue-600 hover:underline">1. What is the SPF lookup limit?</a>
          <a href="#why-it-happens" className="text-blue-600 hover:underline">2. Why does this happen?</a>
          <a href="#how-to-count" className="text-blue-600 hover:underline">3. How to count your lookups</a>
          <a href="#the-fix" className="text-blue-600 hover:underline">4. The fix: SPF flattening</a>
          <a href="#alternatives" className="text-blue-600 hover:underline">5. Alternative approaches</a>
          <a href="#common-mistakes" className="text-blue-600 hover:underline">6. Common mistakes</a>
          <a href="#checklist" className="text-blue-600 hover:underline">7. Quick checklist</a>
        </div>
      </div>

      {/* Section 1: What is the SPF lookup limit */}
      <section id="what-is-limit" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          What Is the SPF Lookup Limit?
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          According to <strong>RFC 7208</strong>, SPF evaluators are required to limit the total number of DNS lookups to 
          <strong> 10 or fewer</strong>. If your SPF record requires more than 10 DNS lookups to evaluate, 
          SPF returns a <code className="bg-gray-100 px-1 rounded">PermError</code> — and your emails will fail authentication.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Here's what counts as a DNS lookup:
        </p>

        <div className="my-6 grid gap-4">
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 mb-2">These count toward the limit:</p>
            <ul className="text-red-700 text-sm space-y-1">
              <li><code className="bg-red-100 px-1 rounded">include:</code> — each one requires a DNS lookup</li>
              <li><code className="bg-red-100 px-1 rounded">a:</code> — resolves the A record</li>
              <li><code className="bg-red-100 px-1 rounded">mx:</code> — resolves all MX records</li>
              <li><code className="bg-red-100 px-1 rounded">redirect:</code> — follows to another SPF record</li>
              <li><code className="bg-red-100 px-1 rounded">exists:</code> — checks if domain exists</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
            <p className="font-semibold text-green-800 mb-2">These do NOT count:</p>
            <ul className="text-green-700 text-sm space-y-1">
              <li><code className="bg-green-100 px-1 rounded">ip4:</code> — IP address is directly in the record</li>
              <li><code className="bg-green-100 px-1 rounded">ip6:</code> — same, no DNS lookup needed</li>
              <li><code className="bg-green-100 px-1 rounded">all</code> — the fallback mechanism</li>
            </ul>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">Let's look at an example:</p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div className="text-gray-400 mb-2"># Example SPF record — let's count the lookups</div>
          <div>v=spf1 include:_spf.google.com include:sendgrid.net include:mailchimp.com a mx ~all</div>
          <div className="mt-4 text-gray-400">Lookup count:</div>
          <div className="text-yellow-400">include:_spf.google.com = 1 lookup</div>
          <div className="text-yellow-400">include:sendgrid.net = 1 lookup</div>
          <div className="text-yellow-400">include:mailchimp.com = 1 lookup</div>
          <div className="text-yellow-400">a = 1 lookup</div>
          <div className="text-yellow-400">mx = 1 lookup (per MX record)</div>
          <div className="mt-2 text-green-400">Total: 5+ lookups ✓ (under the limit)</div>
        </div>
      </section>

      {/* Section 2: Why does this happen */}
      <section id="why-it-happens" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          Why Does This Happen So Often?
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          Modern companies use a <em>lot</em> of email services. Each one needs to be added to your SPF record. 
          Here's a real-world scenario I see all the time:
        </p>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2">The "stack creep" problem:</p>
          <ul className="text-amber-700 text-sm space-y-1">
            <li>Google Workspace for corporate email → <code className="bg-amber-100 px-1 rounded">include:_spf.google.com</code></li>
            <li>SendGrid for transactional emails → <code className="bg-amber-100 px-1 rounded">include:sendgrid.net</code></li>
            <li>Mailchimp for newsletters → <code className="bg-amber-100 px-1 rounded">include:mailchimp.com</code></li>
            <li>Zendesk for support tickets → <code className="bg-amber-100 px-1 rounded">include:mail.zendesk.com</code></li>
            <li>HubSpot for marketing → <code className="bg-amber-100 px-1 rounded">include:hubspot.com</code></li>
            <li>Plus your own a and mx mechanisms...</li>
          </ul>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Sounds fine, right? Five includes, plus a and mx — that's only 7 lookups. 
          <strong> But here's the trap:</strong> each <code className="bg-gray-100 px-1 rounded">include:</code> can itself 
          contain <em>nested</em> includes.
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div className="text-gray-400 mb-2"># Google's SPF record includes MORE includes:</div>
          <div className="text-blue-400">$ dig TXT _spf.google.com +short</div>
          <div>"v=spf1 include:_netblocks.google.com include:_netblocks2.google.com include:_netblocks3.google.com ~all"</div>
          <div className="mt-3 text-yellow-400"># That's 3 MORE lookups from just one include!</div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          So <code className="bg-gray-100 px-1 rounded">include:_spf.google.com</code> alone uses <strong>4 lookups</strong> 
          (1 for the initial lookup + 3 nested). Add up all the nested lookups, and suddenly you're way over 10.
        </p>
      </section>

      {/* Section 3: How to count your lookups */}
      <section id="how-to-count" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          How to Count Your SPF Lookups
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          Before you can fix the problem, you need to know how bad it is. Here's how to manually count:
        </p>

        <div className="my-6 space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Step 1: Get your current SPF record</h4>
            <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm">
              <div className="text-gray-400"># Mac/Linux</div>
              <div>dig TXT yourdomain.com +short | grep v=spf1</div>
              <div className="mt-2 text-gray-400"># Windows (PowerShell)</div>
              <div>nslookup -q=TXT yourdomain.com</div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Step 2: Count the mechanisms</h4>
            <p className="text-gray-600 text-sm">
              Count every <code className="bg-gray-200 px-1 rounded">include:</code>, <code className="bg-gray-200 px-1 rounded">a:</code>, 
              <code className="bg-gray-200 px-1 rounded">mx:</code>, and <code className="bg-gray-200 px-1 rounded">redirect:</code>. 
              Each one = 1 lookup (minimum).
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Step 3: Check for nested includes</h4>
            <p className="text-gray-600 text-sm">
              For each <code className="bg-gray-200 px-1 rounded">include:</code>, query that domain's SPF record and 
              count its includes too. This is where most people get tripped up.
            </p>
            <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm mt-2">
              <div className="text-gray-400"># Check nested includes</div>
              <div>dig TXT _spf.google.com +short</div>
            </div>
          </div>
        </div>

        <div className="my-6 p-5 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
          <p className="text-blue-800">
            <strong>Honest advice:</strong> Don't do this manually. Use our <Link href="/test" className="underline">SPF checker</Link> — 
            it recursively counts all lookups and shows you exactly which mechanisms are using them.
          </p>
        </div>
      </section>

      {/* Section 4: The Fix - SPF Flattening */}
      <section id="the-fix" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          The Fix: SPF Flattening
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          SPF flattening means replacing <code className="bg-gray-100 px-1 rounded">include:</code> mechanisms with 
          <code className="bg-gray-100 px-1 rounded">ip4:</code> and <code className="bg-gray-100 px-1 rounded">ip6:</code> 
          mechanisms. Since IP addresses don't require DNS lookups, this reduces your lookup count to zero.
        </p>

        {/* Step 4.1 */}
        <div className="my-8 p-6 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
            List all your include mechanisms
          </h3>
          <p className="text-gray-700 mb-4">
            Grab every <code className="bg-gray-200 px-1 rounded">include:</code> from your SPF record.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
            <div className="text-gray-400"># Example includes to flatten:</div>
            <div>include:_spf.google.com</div>
            <div>include:sendgrid.net</div>
            <div>include:mailchimp.com</div>
          </div>
        </div>

        {/* Step 4.2 */}
        <div className="my-8 p-6 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
            Resolve each to IP addresses
          </h3>
          <p className="text-gray-700 mb-4">
            Query each domain to get their IP ranges. You'll need to follow nested includes too.
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <div className="text-gray-400"># Get IPs from SendGrid's SPF record</div>
            <div>$ dig TXT sendgrid.net +short</div>
            <div>"v=spf1 ip4:167.89.0.0/17 ip4:208.117.48.0/20 ip4:50.31.32.0/19 ~all"</div>
            <div className="mt-3 text-gray-400"># Get IPs from Google's SPF (need to follow nested includes)</div>
            <div>$ dig TXT _netblocks.google.com +short</div>
            <div>"v=spf1 ip4:35.190.247.0/24 ip4:64.233.160.0/19 ip4:66.102.0.0/20 ..."</div>
          </div>
        </div>

        {/* Step 4.3 */}
        <div className="my-8 p-6 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
            Replace includes with ip4/ip6
          </h3>
          <p className="text-gray-700 mb-4">Before and after:</p>
          
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
            <div className="text-red-400 mb-2"># BEFORE (11 lookups — over limit!)</div>
            <div>v=spf1 include:_spf.google.com include:sendgrid.net include:mailchimp.com a mx ~all</div>
          </div>

          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <div className="text-green-400 mb-2"># AFTER (0 lookups — all IPs)</div>
            <div>v=spf1 ip4:35.190.247.0/24 ip4:64.233.160.0/19 ip4:66.102.0.0/20 \</div>
            <div>     ip4:167.89.0.0/17 ip4:208.117.48.0/20 ip4:50.31.32.0/19 \</div>
            <div>     ip4:205.201.128.0/20 ip4:198.2.128.0/18 \</div>
            <div>     a mx ~all</div>
          </div>
        </div>

        {/* Step 4.4 */}
        <div className="my-8 p-6 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
            Update your DNS and verify
          </h3>
          <p className="text-gray-700 mb-4">
            Replace your old SPF record with the flattened version. Then verify it works:
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
            <div className="text-gray-400"># Check your new SPF record</div>
            <div>dig TXT yourdomain.com +short</div>
          </div>
        </div>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Important caveat
          </p>
          <p className="text-amber-700">
            IP addresses can change! When SendGrid or Google add new IP ranges, your flattened record won't include them. 
            You'll need to re-check and update your flattened record periodically — I recommend every 3-6 months, 
            or use an automated SPF flattening service.
          </p>
        </div>
      </section>

      {/* Section 5: Alternative approaches */}
      <section id="alternatives" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          Alternative Approaches
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          SPF flattening isn't your only option. Here are some alternatives:
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
            <p className="font-semibold text-purple-800 mb-2">Use subdomains for different services</p>
            <p className="text-purple-700 text-sm">
              Instead of having all services send from <code className="bg-purple-100 px-1 rounded">@yourdomain.com</code>, 
              use <code className="bg-purple-100 px-1 rounded">@marketing.yourdomain.com</code> for Mailchimp, 
              <code className="bg-purple-100 px-1 rounded">@transactional.yourdomain.com</code> for SendGrid, etc. 
              Each subdomain has its own SPF record with its own 10-lookup budget.
            </p>
          </div>

          <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
            <p className="font-semibold text-purple-800 mb-2">Use SPF flattening services</p>
            <p className="text-purple-700 text-sm">
              Services like EasySPF, dmarcian, or Valimail will automatically flatten your SPF record and keep it 
              updated when providers change their IP ranges. This saves you from the manual maintenance burden.
            </p>
          </div>

          <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
            <p className="font-semibold text-purple-800 mb-2">Consolidate sending services</p>
            <p className="text-purple-700 text-sm">
              Do you really need 5 different ESPs? Sometimes the best fix is to consolidate your email sending 
              through fewer services. Each service you remove is one fewer include mechanism.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Common mistakes */}
      <section id="common-mistakes" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">6</span>
          Common Mistakes I've Seen (Don't Do These)
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <XCircle className="w-5 h-5" /> Multiple SPF records
            </p>
            <p className="text-red-700 text-sm">
              You can only have ONE SPF TXT record per domain. If you have multiple records, email servers will treat 
              it as a permerror. Combine all mechanisms into a single record.
            </p>
          </div>

          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <XCircle className="w-5 h-5" /> Forgetting to count nested includes
            </p>
            <p className="text-red-700 text-sm">
              <code className="bg-red-100 px-1 rounded">include:_spf.google.com</code> alone uses 4 lookups because 
              Google's SPF record contains nested includes. Always resolve includes recursively.
            </p>
          </div>

          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <XCircle className="w-5 h-5" /> Flattening and never updating
            </p>
            <p className="text-red-700 text-sm">
              Email providers add new IP ranges regularly. If you flatten your SPF record and never update it, 
              legitimate emails from new IPs will fail SPF checks. Set a calendar reminder every 3-6 months.
            </p>
          </div>

          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <XCircle className="w-5 h-5" /> Using redirect: as a workaround
            </p>
            <p className="text-red-700 text-sm">
              <code className="bg-red-100 px-1 rounded">redirect:</code> also counts as a lookup and doesn't help 
              with the limit. It just points to another SPF record — the lookup count still applies.
            </p>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist" className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
        <h2 className="text-2xl font-bold mb-6">✅ SPF Lookup Limit Fix Checklist</h2>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span>Counted all include/a/mx/redirect mechanisms</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span>Checked for nested includes recursively</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span>Resolved all includes to IP addresses</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span>Replaced includes with ip4/ip6 mechanisms</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span>Verified SPF record is under 10 lookups</span>
          </label>
          <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span>Set reminder to re-check IPs in 3-6 months</span>
          </label>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Ready to fix your SPF lookup limit?</h3>
        <p className="text-green-100 mb-6">
          Check your SPF record now and see exactly how many lookups it requires. We'll show you which mechanisms to flatten.
        </p>
        <Link 
          href="/test"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-colors"
        >
          Check My SPF Now <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Bonus: Quick FAQ */}
      <section className="my-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Why is the limit only 10?</h4>
            <p className="text-gray-600 text-sm">
              It's a DNS security measure. Without this limit, a malicious SPF record could cause a "DNS amplification attack" 
              by forcing servers to make hundreds of recursive lookups. RFC 7208 set 10 as the safe maximum.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Does mx count as 1 lookup or more?</h4>
            <p className="text-gray-600 text-sm">
              The <code className="bg-gray-200 px-1 rounded">mx</code> mechanism counts as 1 lookup plus additional lookups 
              for each MX record returned. If you have 3 MX records, that's 1 + 3 = 4 lookups total for the mx mechanism.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">What happens when I exceed the limit?</h4>
            <p className="text-gray-600 text-sm">
              SPF evaluation returns a PermError, and receiving servers will typically treat your emails as failing SPF. 
              This can cause emails to be rejected or sent to spam, depending on the receiver's policy and your DMARC settings.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
