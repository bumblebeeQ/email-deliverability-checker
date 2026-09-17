import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function SpfRecordForMultipleMailServers() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          A reader emailed me: <strong className="text-gray-800">&quot;We send mail from our own Postfix 
          server AND through SendGrid for marketing AND through our CRM for sales sequences. Do I need 
          three separate SPF records?&quot;</strong>
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          No — and this is genuinely the most common SPF mistake I see once a company grows past a 
          single mail source. You can only publish <strong>one</strong> SPF TXT record per domain. 
          Publish two, and receivers don&apos;t merge them — they treat the whole thing as a PermError 
          and your SPF check fails for everyone, including your legitimate mail source.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          The fix isn&apos;t complicated once you see it, but the failure mode is sneaky: mail can look 
          fine for weeks, then someone adds a &quot;quick&quot; second SPF record for a new tool, and 
          suddenly deliverability craters across the board.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Here&apos;s how to do this correctly with any number of mail sources.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Check if you already have duplicate SPF records</h3>
            <p className="text-blue-100 mb-4">
              This is worth checking right now if you&apos;ve added any sending service in the last year — 
              duplicate SPF records are one of the most common silent deliverability killers.
            </p>
            <Link 
              href="/test"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Check My SPF Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="my-10 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-4">What we&apos;ll cover:</h3>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <a href="#one-record-rule" className="text-blue-600 hover:underline">The one-record rule (and why it exists)</a>
          <a href="#how-to-combine" className="text-blue-600 hover:underline">How to combine multiple mail sources</a>
          <a href="#real-example" className="text-blue-600 hover:underline">A real multi-source SPF example</a>
          <a href="#lookup-limit-tradeoff" className="text-blue-600 hover:underline">Watch the 10-lookup limit as you add sources</a>
          <a href="#subdomain-strategy" className="text-blue-600 hover:underline">Alternative: split sources across subdomains</a>
          <a href="#finding-duplicates" className="text-blue-600 hover:underline">How to find duplicate records you already have</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick checklist</a>
        </div>
      </div>

      {/* The one-record rule */}
      <section id="one-record-rule" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">!</span>
          The One-Record Rule (and Why It Exists)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          RFC 7208 is explicit about this: a domain must have <strong>at most one</strong> SPF-type TXT 
          record. If a receiver finds more than one, it can&apos;t know which one is authoritative, so it 
          returns <code className="bg-gray-100 px-1 rounded">PermError</code> — the same failure mode as 
          exceeding the 10-lookup limit, just from a different cause.
        </p>

        <div className="my-6 grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 mb-2">Wrong — two separate records</p>
            <div className="text-red-700 text-sm font-mono space-y-1">
              <div>v=spf1 ip4:203.0.113.10 -all</div>
              <div>v=spf1 include:sendgrid.net ~all</div>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
            <p className="font-semibold text-green-800 mb-2">Right — one merged record</p>
            <div className="text-green-700 text-sm font-mono">
              v=spf1 ip4:203.0.113.10 include:sendgrid.net ~all
            </div>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          This trips people up specifically because nothing warns you when it happens. You add a new 
          service, follow their setup guide, paste their suggested TXT record into your DNS — and now 
          you have two. DNS accepts it happily. Nothing breaks until a receiver actually evaluates SPF 
          and finds both.
        </p>
      </section>

      {/* How to combine */}
      <section id="how-to-combine" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          How to Combine Multiple Mail Sources
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Every mail source you use adds one or more mechanisms to the same single record. The pattern 
          is always: <code className="bg-gray-100 px-1 rounded">v=spf1</code> once at the start, every 
          mechanism from every source in the middle, one qualifier (<code className="bg-gray-100 px-1 rounded">~all</code> or 
          <code className="bg-gray-100 px-1 rounded"> -all</code>) at the end.
        </p>

        <div className="my-6 space-y-3">
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-medium text-gray-800 mb-1">Self-hosted Postfix server</p>
            <p className="text-sm text-gray-600">Add its IP directly: <code className="bg-gray-200 px-1 rounded">ip4:203.0.113.10</code></p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-medium text-gray-800 mb-1">SendGrid, Mailgun, Google Workspace, Microsoft 365</p>
            <p className="text-sm text-gray-600">Add their include: <code className="bg-gray-200 px-1 rounded">include:sendgrid.net</code></p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border">
            <p className="font-medium text-gray-800 mb-1">CRM or sales tool (HubSpot, Salesloft, Outreach)</p>
            <p className="text-sm text-gray-600">Add their include, exactly as documented — don&apos;t guess the syntax</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>Only ever change the record, never add a new one.</strong> Every time a new tool tells 
            you to &quot;add this TXT record for SPF,&quot; read it as &quot;merge this mechanism into your 
            existing SPF record.&quot;
          </p>
        </div>
      </section>

      {/* Real example */}
      <section id="real-example" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          A Real Multi-Source SPF Example
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s what the reader from the intro actually needed — one domain sending from a 
          self-hosted server, SendGrid, and a CRM tool:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-4 overflow-x-auto">
          <code className="text-green-400 text-sm font-mono break-all">
            v=spf1 ip4:203.0.113.10 include:sendgrid.net include:_spf.hubspot.com ~all
          </code>
        </div>
        <p className="text-gray-500 text-xs mb-6">
          One v=spf1 prefix, one ip4 for the Postfix box, two includes for the hosted services, one 
          qualifier at the end. That&apos;s the whole pattern regardless of how many sources you have.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Notice there&apos;s no separate record per source — everything lives in this single TXT value 
          at the domain root. If your DNS provider&apos;s panel shows you the record as multiple quoted 
          strings, that&apos;s normal (DNS TXT values get chunked at 255 characters per string), but it&apos;s 
          still one logical record.
        </p>
      </section>

      {/* Lookup limit tradeoff */}
      <section id="lookup-limit-tradeoff" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-lg font-bold">!</span>
          Watch the 10-Lookup Limit As You Add Sources
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Combining sources into one record solves the duplicate-record problem, but it introduces the 
          next one: every <code className="bg-gray-100 px-1 rounded">include:</code> mechanism costs a 
          DNS lookup, and some of those includes have their own nested includes. Add enough mail 
          sources and you can walk straight into the 10-lookup PermError instead.
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div className="text-gray-400 mb-2"># Four sources can already add up fast</div>
          <div>v=spf1 include:_spf.google.com include:sendgrid.net include:_spf.hubspot.com include:mailgun.org a mx ~all</div>
          <div className="mt-3 text-yellow-400">google.com alone = 1 lookup + 3 nested = 4 lookups</div>
          <div className="text-yellow-400">Plus 3 more includes + a + mx = 5 more</div>
          <div className="mt-2 text-red-400">Total: 9+ lookups, getting close to the limit fast</div>
        </div>

        <p className="text-gray-700 leading-relaxed">
          If you&apos;re adding a fourth or fifth sending service and want the full breakdown of how 
          lookups get counted (and how to flatten includes into raw IPs to stay under 10), that&apos;s 
          covered in depth in our{' '}
          <Link href="/blog/spf-lookup-limit-exceeded" className="text-blue-600 hover:underline">
            SPF lookup limit guide
          </Link>. The short version: check your lookup count every time you add a new mail source, 
          not just when something breaks.
        </p>
      </section>

      {/* Subdomain strategy */}
      <section id="subdomain-strategy" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          Alternative: Split Sources Across Subdomains
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          If you&apos;re running into the lookup limit or just want cleaner separation, each subdomain gets 
          its own independent SPF record with its own fresh 10-lookup budget:
        </p>

        <div className="my-6 space-y-2">
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-100 text-sm">
            <code className="bg-purple-100 px-1 rounded">mail.yourdomain.com</code> → self-hosted Postfix, <code className="bg-purple-100 px-1 rounded">v=spf1 ip4:203.0.113.10 -all</code>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-100 text-sm">
            <code className="bg-purple-100 px-1 rounded">marketing.yourdomain.com</code> → SendGrid, <code className="bg-purple-100 px-1 rounded">v=spf1 include:sendgrid.net ~all</code>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-100 text-sm">
            <code className="bg-purple-100 px-1 rounded">sales.yourdomain.com</code> → CRM tool, <code className="bg-purple-100 px-1 rounded">v=spf1 include:_spf.hubspot.com ~all</code>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Each subdomain still needs exactly one SPF record — the one-record rule applies per hostname, 
          not just per root domain. This approach also gives each mail stream its own reputation, so a 
          problem with your marketing sends doesn&apos;t drag down transactional mail from the main domain.
        </p>

        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-100">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-gray-700 text-sm">
            <strong>This adds operational overhead</strong> — more DNS records to maintain, and DKIM/DMARC 
            alignment gets slightly more involved across subdomains. Only worth it once you have enough 
            mail sources that a single combined record is genuinely getting unwieldy.
          </p>
        </div>
      </section>

      {/* Finding duplicates */}
      <section id="finding-duplicates" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          How to Find Duplicate Records You Already Have
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Before changing anything, check whether you already have this problem:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 mb-2 overflow-x-auto">
          <div className="text-sm font-mono text-green-400">
            dig TXT yourdomain.com +short | grep spf1
          </div>
        </div>
        <p className="text-gray-500 text-xs mb-6">
          If this returns more than one line starting with <code className="bg-gray-100 px-1 rounded">v=spf1</code>, 
          that&apos;s your problem, confirmed.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          To fix it: copy every mechanism out of every existing record, delete all of the SPF TXT 
          records at your DNS provider, then publish a single new one with everything merged together. 
          Don&apos;t try to edit one and delete the other in separate steps — for a brief window you&apos;ll 
          have zero or two records again, so make the change as one atomic update where your DNS 
          provider allows it.
        </p>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <div className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">✅ Multi-Source SPF Checklist</h2>
          <p className="text-gray-400 mb-6 text-sm">Run through this whenever you add a new mail-sending service.</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Confirmed only one v=spf1 TXT record exists for the domain</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>New service&apos;s mechanism merged into the existing record, not added separately</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Recounted total DNS lookups after adding the new mechanism</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Only one qualifier (~all or -all) at the very end of the record</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Considered subdomain split if lookup count is getting tight</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Sent a real test email from each source to confirm SPF still passes</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Added a new mail source recently?</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          Check that you still have exactly one SPF record and haven&apos;t crossed the 10-lookup limit. 
          Free, takes 10 seconds.
        </p>
        <Link 
          href="/test"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
        >
          Check My Domain <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Bonus: Quick FAQ */}
      <section className="my-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">What happens if I accidentally have two SPF records?</h4>
            <p className="text-gray-600 text-sm">
              SPF evaluation returns PermError for every email from that domain, regardless of which 
              record would have technically authorized the sending IP. Both records get treated as 
              invalid together, not evaluated separately.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Can I use redirect: to point to a shared SPF record across multiple domains?</h4>
            <p className="text-gray-600 text-sm">
              Yes, this is a common pattern for organizations managing many domains. 
              <code className="bg-gray-200 px-1 rounded">redirect:</code> makes each domain&apos;s record short 
              while all pointing to one centrally maintained record — but the redirect target still 
              counts toward the same domain&apos;s 10-lookup limit, so it doesn&apos;t avoid the limit entirely.
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">Do I need a separate record for each mail server&apos;s IP?</h4>
            <p className="text-gray-600 text-sm">
              No — list every IP as its own <code className="bg-gray-200 px-1 rounded">ip4:</code> or 
              <code className="bg-gray-200 px-1 rounded"> ip6:</code> mechanism inside the single record. 
              You can list as many IPs as you need; they don&apos;t count against the 10-lookup limit at all, 
              only the mechanisms that trigger DNS lookups do.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
