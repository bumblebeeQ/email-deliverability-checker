import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, Shield, Clock, Terminal } from 'lucide-react';

export default function SetupDkimAwsSes() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          First time I set up DKIM on AWS SES, I messed it up bad. I added the CNAME records, 
          waited 10 minutes, saw the green &quot;Verified&quot; status, and thought I was done. 
          <strong className="text-gray-800"> Then I sent a test email and the DKIM check completely failed.</strong>
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Turns out I&apos;d copy-pasted the CNAME values wrong. One extra space somewhere. 
          SES showed &quot;Verified&quot; because it saw <em>something</em> at the DNS location — 
          but the actual cryptographic verification was broken.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Since then, I&apos;ve set up DKIM on SES for probably 30+ domains. I still check the docs 
          every single time. And honestly? That&apos;s fine. The SES DKIM setup process has enough 
          moving pieces that a quick refresher never hurts.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Here&apos;s the exact process I follow now — from identity verification to testing — 
          including the gotchas that tripped me up and how to avoid them.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Before you start — check your current setup</h3>
            <p className="text-blue-100 mb-4">
              If your domain&apos;s already configured, run a quick test to see if DKIM is actually passing. 
              You might be surprised.
            </p>
            <Link 
              href="/test"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Test My Domain <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="my-10 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-4">What we&apos;ll cover:</h3>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <a href="#why-dkim-ses" className="text-blue-600 hover:underline">Why DKIM matters for SES</a>
          <a href="#step-1-verify-domain" className="text-blue-600 hover:underline">Step 1: Verify your domain identity</a>
          <a href="#step-2-get-cname" className="text-blue-600 hover:underline">Step 2: Get the DKIM CNAME records</a>
          <a href="#step-3-add-dns" className="text-blue-600 hover:underline">Step 3: Add CNAME records to DNS</a>
          <a href="#step-4-wait-verify" className="text-blue-600 hover:underline">Step 4: Wait and verify status</a>
          <a href="#step-5-test" className="text-blue-600 hover:underline">Step 5: Test your DKIM setup</a>
          <a href="#common-gotchas" className="text-blue-600 hover:underline">Common gotchas (avoid my mistakes)</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick DKIM setup checklist</a>
        </div>
      </div>

      {/* Section: Why DKIM Matters for SES */}
      <section id="why-dkim-ses" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">?</span>
          Why DKIM Matters for SES
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          If your SES emails are landing in spam, DKIM is probably missing or misconfigured. 
          I wrote a whole guide on <Link href="/blog/aws-ses-email-going-to-spam" className="text-blue-600 hover:underline">why SES emails go to spam</Link>, 
          but here&apos;s the short version: DKIM is your cryptographic proof that you actually sent the email.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Without DKIM, Gmail, Outlook, and other providers have no way to verify that the email 
          claiming to be from <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">you@yourdomain.com</code> 
          actually came from your servers. They&apos;ll still accept it — but they&apos;ll mark it as suspicious.
        </p>

        <div className="my-6 p-5 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
          <p className="text-blue-800">
            <strong>The thing is:</strong> SES makes DKIM setup look easy. Click a button, 
            get some DNS records, add them, done. But there are about five ways to subtly mess this up, 
            and SES&apos;s &quot;Verified&quot; status doesn&apos;t catch all of them.
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed">
          Let&apos;s walk through the right way.
        </p>
      </section>

      {/* Step 1: Verify Domain */}
      <section id="step-1-verify-domain" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          Verify Your Domain Identity in SES
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Before you can set up DKIM, you need to verify that you own the domain. 
          SES offers two ways to do this: domain verification (recommended) or email verification.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Using the AWS Console:</h3>

        <ol className="list-decimal pl-6 space-y-3 text-gray-700 mb-6">
          <li>Open the <strong>AWS SES Console</strong> in your target region (us-east-1, eu-west-1, etc.)</li>
          <li>Go to <strong>Verified Identities</strong> → click <strong>&quot;Create Identity&quot;</strong></li>
          <li>Select <strong>&quot;Domain&quot;</strong> as the identity type</li>
          <li>Enter your domain (e.g., <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">yourdomain.com</code>)</li>
          <li>Leave &quot;Assign a default configuration set&quot; unchecked for now</li>
          <li>Click <strong>&quot;Create Identity&quot;</strong></li>
        </ol>

        <p className="text-gray-700 leading-relaxed mb-4">
          SES will generate a TXT record for domain verification. It looks like this:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div><span className="text-gray-400"># Domain verification TXT record</span></div>
          <div>_amazonses.yourdomain.com  TXT  &quot;amzn-ses-demo-abc123def456ghi789&quot;</div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Add this to your DNS. Wait for verification (usually 15-60 minutes). 
          Once verified, you&apos;ll see a green checkmark next to your domain identity.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Using the AWS CLI (for automation nerds):</h3>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`# Create a domain identity
aws ses verify-domain-identity \\
  --domain yourdomain.com \\
  --region us-east-1

# Get the verification token
aws ses get-identity-verification-attributes \\
  --identities yourdomain.com \\
  --region us-east-1`}</pre>
        </div>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2">⚠️ Region matters!</p>
          <p className="text-amber-700">
            SES is region-specific. If you verify your domain in <code className="bg-amber-100 px-1 rounded">us-east-1</code> 
            but send emails from <code className="bg-amber-100 px-1 rounded">eu-west-1</code>, 
            you&apos;ll need to verify it again in the EU region. I&apos;ve wasted hours debugging this exact issue.
          </p>
        </div>
      </section>

      {/* Step 2: Get DKIM CNAME Records */}
      <section id="step-2-get-cname" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          Get the DKIM CNAME Records from SES
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Once your domain is verified, SES can generate DKIM tokens for you. 
          These tokens become the CNAME records you&apos;ll add to your DNS.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">In the AWS Console:</h3>

        <ol className="list-decimal pl-6 space-y-3 text-gray-700 mb-6">
          <li>Go to <strong>Verified Identities</strong> → click on your domain</li>
          <li>Scroll to the <strong>&quot;Authentication&quot;</strong> section</li>
          <li>Click <strong>&quot;Generate DKIM records&quot;</strong> (or &quot;Edit DKIM signing&quot; if you&apos;ve done this before)</li>
          <li>SES will show you 3 CNAME records</li>
        </ol>

        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s what those records actually look like:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
          <div><span className="text-gray-400"># SES generates 3 DKIM CNAME records (your tokens will be different)</span></div>
          <div className="mt-2">Record 1:</div>
          <div>  Name:  <span className="text-green-400">abc123def456._domainkey.yourdomain.com</span></div>
          <div>  Type:  CNAME</div>
          <div>  Value: <span className="text-green-400">abc123def456.dkim.amazonses.com</span></div>
          <div className="mt-3">Record 2:</div>
          <div>  Name:  <span className="text-green-400">ghi789jkl012._domainkey.yourdomain.com</span></div>
          <div>  Type:  CNAME</div>
          <div>  Value: <span className="text-green-400">ghi789jkl012.dkim.amazonses.com</span></div>
          <div className="mt-3">Record 3:</div>
          <div>  Name:  <span className="text-green-400">mno345pqr678._domainkey.yourdomain.com</span></div>
          <div>  Type:  CNAME</div>
          <div>  Value: <span className="text-green-400">mno345pqr678.dkim.amazonses.com</span></div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Using the AWS CLI:</h3>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`# Enable Easy DKIM for your domain
aws ses set-identity-dkim-enabled \\
  --identity yourdomain.com \\
  --dkim-enabled \\
  --region us-east-1

# Get the DKIM tokens
aws ses get-identity-dkim-attributes \\
  --identities yourdomain.com \\
  --region us-east-1`}</pre>
        </div>

        <p className="text-gray-700 leading-relaxed mt-4 mb-4">
          The CLI output will show you the same 3 tokens. Copy them somewhere safe — 
          you&apos;ll need them for the DNS configuration.
        </p>

        <div className="my-6 p-5 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
          <p className="font-medium text-green-800 mb-2">💡 Why 3 records?</p>
          <p className="text-green-700">
            SES uses 3 different DKIM selectors for redundancy and key rotation. 
            All three need to be published in your DNS for DKIM to work properly. 
            Don&apos;t skip any of them.
          </p>
        </div>
      </section>

      {/* Step 3: Add CNAME Records to DNS */}
      <section id="step-3-add-dns" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          Add CNAME Records to Your DNS
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          This is where I messed up the first time. The CNAME records need to be added <em>exactly</em> as 
          SES provides them. No extra spaces, no missing dots, no creative formatting.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">If you&apos;re using Route 53 (AWS&apos;s DNS):</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          SES can actually add these records for you automatically. In the SES Console, 
          after generating the DKIM records, look for the &quot;Use Route 53&quot; button. 
          If your domain&apos;s DNS is hosted on Route 53, click it and you&apos;re done.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          If you prefer to add them manually (or your Route 53 is in a different account):
        </p>

        <ol className="list-decimal pl-6 space-y-3 text-gray-700 mb-6">
          <li>Open <strong>Route 53 Console</strong> → your hosted zone</li>
          <li>Click <strong>&quot;Create Record&quot;</strong></li>
          <li>For each CNAME record:
            <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
              <li><strong>Record name:</strong> <code className="bg-gray-100 px-1 rounded">abc123def456._domainkey</code> (Route 53 adds the domain automatically)</li>
              <li><strong>Record type:</strong> CNAME</li>
              <li><strong>Value:</strong> <code className="bg-gray-100 px-1 rounded">abc123def456.dkim.amazonses.com</code></li>
              <li><strong>TTL:</strong> 300 (or the default)</li>
            </ul>
          </li>
          <li>Repeat for all 3 records</li>
        </ol>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">If you&apos;re using another DNS provider (Cloudflare, GoDaddy, etc.):</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          The process varies slightly, but here&apos;s the generic version:
        </p>

        <div className="my-6 grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-xl">
            <p className="font-semibold text-green-800 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" /> Correct CNAME format
            </p>
            <div className="bg-white p-3 rounded font-mono text-xs space-y-1">
              <div><strong>Name/Host:</strong></div>
              <div className="text-green-700">abc123def456._domainkey</div>
              <div className="mt-2"><strong>Value/Target:</strong></div>
              <div className="text-green-700">abc123def456.dkim.amazonses.com</div>
            </div>
          </div>
          <div className="p-4 bg-red-50 rounded-xl">
            <p className="font-semibold text-red-800 mb-3 flex items-center gap-2">
              <XCircle className="w-5 h-5" /> Common mistakes
            </p>
            <ul className="space-y-2 text-sm text-red-700">
              <li>• Adding yourdomain.com at the end when the provider does it automatically</li>
              <li>• Extra spaces before/after the CNAME value</li>
              <li>• Using TXT instead of CNAME record type</li>
              <li>• Adding quotes around the value (some providers don&apos;t need them)</li>
            </ul>
          </div>
        </div>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2">⚠️ Cloudflare users: Turn off the proxy!</p>
          <p className="text-amber-700">
            If you&apos;re using Cloudflare, make sure the CNAME records are <strong>DNS-only</strong> 
            (gray cloud, not orange). DKIM CNAME records cannot be proxied. The proxy will break DKIM verification.
          </p>
        </div>
      </section>

      {/* Step 4: Wait and Verify */}
      <section id="step-4-wait-verify" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          Wait and Verify DKIM Status
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s the part where you wait. DNS propagation isn&apos;t instant. 
          Most of the time, DKIM verification happens within 15-60 minutes. 
          Sometimes longer. Occasionally much longer.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">How to check status in SES Console:</h3>

        <ol className="list-decimal pl-6 space-y-3 text-gray-700 mb-6">
          <li>Go to <strong>Verified Identities</strong> → your domain</li>
          <li>Look at the <strong>&quot;Authentication&quot;</strong> section</li>
          <li>You&apos;ll see DKIM status as &quot;Pending&quot;, &quot;Success&quot;, or &quot;Failed&quot;</li>
        </ol>

        <div className="my-6 space-y-4">
          <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
            <p className="font-semibold text-yellow-800 flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5" /> Pending
            </p>
            <p className="text-yellow-700 text-sm">
              SES is still waiting for DNS propagation. Give it more time. 
              If it&apos;s been over 72 hours, something&apos;s wrong with your DNS records.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
            <p className="font-semibold text-green-800 flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5" /> Success (Verified)
            </p>
            <p className="text-green-700 text-sm">
              DKIM records are properly configured. SES will now sign your emails with DKIM automatically.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5" /> Failed
            </p>
            <p className="text-red-700 text-sm">
              SES couldn&apos;t find or verify your DKIM records. Double-check the CNAME values, 
              make sure they&apos;re the right type, and verify there are no typos.
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Verify DNS propagation manually:</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          Don&apos;t just wait blindly. You can check if your DNS records are live using dig or nslookup:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div><span className="text-gray-400"># Check if DKIM CNAME is resolving</span></div>
          <div className="mt-2">dig abc123def456._domainkey.yourdomain.com CNAME</div>
          <div className="mt-3"><span className="text-gray-400"># Or using nslookup</span></div>
          <div>nslookup -type=CNAME abc123def456._domainkey.yourdomain.com</div>
        </div>

        <p className="text-gray-700 leading-relaxed mt-4">
          If the command returns your CNAME target (<code className="bg-gray-100 px-2 py-0.5 rounded text-sm">abc123def456.dkim.amazonses.com</code>), 
          the record is live. If you get &quot;NXDOMAIN&quot; or no answer, DNS hasn&apos;t propagated yet — 
          or there&apos;s an error in your record.
        </p>

        <div className="my-6 p-5 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
          <p className="text-blue-800">
            <strong>The 72-hour timeout:</strong> SES will only wait 72 hours for DKIM verification. 
            If your records aren&apos;t correct by then, the verification attempt expires and you&apos;ll need 
            to generate new tokens and try again. I&apos;ve never seen it take that long, but it&apos;s worth knowing.
          </p>
        </div>
      </section>

      {/* Step 5: Test DKIM */}
      <section id="step-5-test" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          Test Your DKIM Setup
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          SES showing &quot;Verified&quot; is a good sign — but it&apos;s not the same as DKIM actually working 
          in production. The only way to be sure is to send a real email and check the headers.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Quick test from SES Console:</h3>

        <ol className="list-decimal pl-6 space-y-3 text-gray-700 mb-6">
          <li>Go to <strong>Verified Identities</strong> → your domain</li>
          <li>Click <strong>&quot;Send a test email&quot;</strong></li>
          <li>Enter your email address and send</li>
          <li>Open the email and check the headers for <code className="bg-gray-100 px-1 rounded">dkim=pass</code></li>
        </ol>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">What to look for in email headers:</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          Find the <strong>Authentication-Results</strong> header in your received email. 
          You want to see something like this:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div><span className="text-gray-400"># Good DKIM result in email headers</span></div>
          <div className="text-green-400">Authentication-Results: mx.google.com;</div>
          <div className="text-green-400">       dkim=pass header.i=@yourdomain.com header.s=abc123def456;</div>
          <div className="text-green-400">       spf=pass (google.com: domain of you@yourdomain.com designates...</div>
        </div>

        <p className="text-gray-700 leading-relaxed mt-4 mb-4">
          If you see <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">dkim=fail</code> or no DKIM result at all, 
          something&apos;s wrong. Go back and double-check your DNS records.
        </p>

        {/* Test CTA */}
        <div className="my-10 p-6 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl text-white">
          <div className="flex items-start gap-4">
            <div className="text-4xl">✅</div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Want a full deliverability check?</h3>
              <p className="text-green-100 mb-4">
                EmailDiag will test your SPF, DKIM, DMARC, and blacklist status in one go. 
                Takes 10 seconds and gives you a clear pass/fail for each.
              </p>
              <Link 
                href="/test"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Run Full Domain Test <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Common Gotchas */}
      <section id="common-gotchas" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">!</span>
          Common Gotchas (Avoid My Mistakes)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          I&apos;ve made most of these mistakes so you don&apos;t have to. Here are the things that 
          trip people up when setting up DKIM on SES:
        </p>

        <div className="my-6 space-y-4">
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Confusing CNAME with TXT records
            </p>
            <p className="text-red-700 text-sm">
              DKIM records for SES are <strong>CNAME</strong> records, not TXT records. 
              This trips up people who&apos;ve set up DKIM for other providers (like Google Workspace or Office 365) 
              where DKIM uses TXT records. SES is different. Use CNAME.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Wrong AWS region
            </p>
            <p className="text-red-700 text-sm">
              SES is regional. If you verified your domain and set up DKIM in <code className="bg-red-100 px-1 rounded">us-east-1</code> 
              but send emails from <code className="bg-red-100 px-1 rounded">ap-south-1</code>, 
              your DKIM won&apos;t work. You need to verify in every region you use.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> The 72-hour verification timeout
            </p>
            <p className="text-red-700 text-sm">
              SES only waits 72 hours for DKIM records to appear. If you generate tokens but don&apos;t add 
              the DNS records within 72 hours, the tokens expire and you&apos;ll need to generate new ones. 
              I&apos;ve done this — generate tokens on Friday, forget about it, come back Monday to find them expired.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> Multiple identities for the same domain
            </p>
            <p className="text-red-700 text-sm">
              If you create multiple domain identities for the same domain (say, in different regions or accounts), 
              each one generates different DKIM tokens. Only the most recently-generated tokens are valid. 
              Old tokens stop working. This caused me a full day of debugging once.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" /> SES Console shows &quot;Verified&quot; but DKIM still fails
            </p>
            <p className="text-red-700 text-sm">
              SES&apos;s &quot;Verified&quot; status means it found <em>something</em> at the expected DNS location. 
              It doesn&apos;t guarantee the values are exactly right. Always send a test email and check 
              the actual DKIM result in the headers.
            </p>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <div className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">✅ SES DKIM Setup Checklist</h2>
          <p className="text-gray-400 mb-6 text-sm">Run through this when setting up DKIM on SES. I keep this bookmarked.</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Domain identity verified in SES (correct region)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>DKIM tokens generated in SES Console</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>All 3 CNAME records added to DNS</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>CNAME records (not TXT) — verified record type</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>No extra spaces or typos in CNAME values</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Cloudflare proxy OFF (if using Cloudflare)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Waited for DNS propagation (15-60 min)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>SES Console shows &quot;Verified&quot; DKIM status</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Test email sent and dkim=pass in headers</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>DKIM setup done within 72 hours of token generation</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Need to verify your DKIM is working?</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          Run your domain through EmailDiag — we&apos;ll check your SPF, DKIM, DMARC, and more. 
          Free, takes 10 seconds, and gives you a clear answer.
        </p>
        <Link 
          href="/test"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
        >
          Test My Email Setup <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Wrap-up */}
      <div className="mt-8 mb-4">
        <p className="text-gray-700 leading-relaxed mb-4">
          Setting up DKIM on SES isn&apos;t hard — it&apos;s just finicky. Generate tokens, 
          add 3 CNAME records exactly as given, wait for DNS propagation, verify it works. 
          The whole process takes about 30 minutes of actual work, plus waiting time.
        </p>
        <p className="text-gray-700 leading-relaxed">
          The mistakes happen when you rush. Copy-paste wrong. Forget about region. 
          Add TXT instead of CNAME. I&apos;ve done all of these. Now I follow this guide, 
          check everything twice, and send a test email before calling it done. 
          You&apos;ll save yourself a lot of debugging time if you do the same.
        </p>
      </div>
    </>
  );
}
