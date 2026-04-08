import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, Clock, Shield } from 'lucide-react';

export default function DkimSignatureVerificationFailed() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          Last month, a friend running a small SaaS reached out in a panic: "My transactional emails are 
          getting rejected by Gmail. Something about DKIM failing." He'd set up DKIM months ago and it had been 
          working fine. So what changed? Turns out, <strong>nothing on his end changed</strong> — and that was 
          actually the problem.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          I spent about two hours digging through email headers, DNS records, and mail server logs before I 
          finally cracked it. The fix was embarrassingly simple once I found the root cause. But getting there? 
          That was the hard part.
        </p>
        <p className="text-gray-700 leading-relaxed">
          If you're seeing <code className="bg-gray-100 px-2 py-1 rounded">dkim=fail</code> or 
          "DKIM signature verification failed" in your email headers, this guide will walk you through every 
          possible cause and exactly how to fix each one. No fluff — just the stuff that actually works.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🔑</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">First — check if your DKIM is actually broken</h3>
            <p className="text-blue-100 mb-4">
              Send a test email and we'll verify your DKIM signature, SPF, and DMARC in seconds. 
              You'll see exactly what's failing and why.
            </p>
            <Link 
              href="/test"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Test My DKIM <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="my-10 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-4">What we'll cover:</h3>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <a href="#what-is-dkim" className="text-blue-600 hover:underline">1. What is DKIM and why does it fail?</a>
          <a href="#find-the-error" className="text-blue-600 hover:underline">2. How to read the DKIM failure</a>
          <a href="#common-causes" className="text-blue-600 hover:underline">3. The 5 most common causes</a>
          <a href="#fix-dns" className="text-blue-600 hover:underline">4. Fix #1: DNS record issues</a>
          <a href="#fix-body-modified" className="text-blue-600 hover:underline">5. Fix #2: Message body modification</a>
          <a href="#fix-key-rotation" className="text-blue-600 hover:underline">6. Fix #3: Key rotation gone wrong</a>
          <a href="#verify-fix" className="text-blue-600 hover:underline">7. How to verify your fix worked</a>
          <a href="#checklist" className="text-blue-600 hover:underline">8. Quick troubleshooting checklist</a>
        </div>
      </div>

      {/* Section 1: What is DKIM */}
      <section id="what-is-dkim" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          What Is DKIM and Why Does It Fail?
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          DKIM (DomainKeys Identified Mail) is basically a digital signature for your emails. When your mail 
          server sends an email, it signs part of the message with a private key. The receiving server then looks 
          up your public key in DNS and checks if the signature matches.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Think of it like a wax seal on a letter. If someone tampers with the letter after it's sealed, the 
          seal breaks. Same idea with DKIM — if <em>anything</em> changes between signing and verification, the 
          signature won't match and verification fails.
        </p>

        <div className="my-6 p-5 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
          <p className="font-medium text-blue-800 mb-2">How DKIM verification works:</p>
          <ol className="text-blue-700 text-sm space-y-2">
            <li><strong>1.</strong> Your server signs the email with a private key</li>
            <li><strong>2.</strong> It adds a <code className="bg-blue-100 px-1 rounded">DKIM-Signature</code> header to the email</li>
            <li><strong>3.</strong> The receiving server reads the <code className="bg-blue-100 px-1 rounded">d=</code> (domain) and <code className="bg-blue-100 px-1 rounded">s=</code> (selector) from that header</li>
            <li><strong>4.</strong> It looks up the public key at <code className="bg-blue-100 px-1 rounded">selector._domainkey.yourdomain.com</code></li>
            <li><strong>5.</strong> It uses the public key to verify the signature matches the email content</li>
          </ol>
        </div>

        <p className="text-gray-700 leading-relaxed">
          When this process fails, you get <code className="bg-gray-100 px-1 rounded">dkim=fail</code> in the 
          email headers. And that's when Gmail, Outlook, and others start getting suspicious about your emails.
        </p>
      </section>

      {/* Section 2: How to read the error */}
      <section id="find-the-error" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          How to Read the DKIM Failure
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          Before you start fixing things, you need to know exactly what's failing. The first place to look is 
          the email headers. Here's how to find them:
        </p>

        <div className="my-6 space-y-3">
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">In Gmail:</h4>
            <p className="text-gray-600 text-sm">Open the email → Click the three dots (⋮) → "Show original"</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">In Outlook:</h4>
            <p className="text-gray-600 text-sm">Open the email → File → Properties → Internet Headers</p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Look for the <code className="bg-gray-100 px-1 rounded">Authentication-Results</code> header. Here's what 
          a DKIM failure looks like:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div className="text-gray-400 mb-2"># Example of a DKIM failure in email headers</div>
          <div>Authentication-Results: mx.google.com;</div>
          <div className="text-red-400">       dkim=fail (body hash did not verify)</div>
          <div>       header.i=@yourdomain.com header.s=selector1;</div>
          <div className="text-yellow-400">       spf=pass (sender IP is 198.51.100.1)</div>
          <div>       smtp.mailfrom=bounce@yourdomain.com;</div>
          <div className="text-yellow-400">       dmarc=fail (p=NONE sp=NONE)</div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Pay close attention to what's in the parentheses after <code className="bg-gray-100 px-1 rounded">dkim=fail</code>. 
          Different failure reasons point to different root causes:
        </p>

        <div className="my-6 grid gap-3">
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-800">"body hash did not verify"</p>
                <p className="text-red-600 text-sm mt-1">The email body was modified after signing. Something between your server and the recipient changed the message content.</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-800">"signature verification failed"</p>
                <p className="text-red-600 text-sm mt-1">The public key in DNS doesn't match the private key used to sign. Either the DNS record is wrong or the signing key has changed.</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-800">"no key for signature" / "key not found"</p>
                <p className="text-red-600 text-sm mt-1">The DNS record for the DKIM selector doesn't exist. Either it was never added or the selector name is wrong.</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-800">"key revoked"</p>
                <p className="text-red-600 text-sm mt-1">The DKIM key has been intentionally revoked (the DNS record has an empty <code className="bg-red-100 px-1 rounded">p=</code> value).</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: The 5 most common causes */}
      <section id="common-causes" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          The 5 Most Common Causes of DKIM Failure
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          After debugging this for dozens of clients, here are the causes I see over and over again, ranked 
          from most to least common:
        </p>

        <div className="my-6 space-y-4">
          <div className="p-5 bg-white rounded-xl border-2 border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">#1</span>
              <h4 className="font-bold text-gray-900">DNS record mismatch or missing record</h4>
            </div>
            <p className="text-gray-600 text-sm ml-11">
              The CNAME or TXT record for your DKIM selector is either missing, has a typo, or is pointing to the 
              wrong value. I see this in about 40% of cases.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border-2 border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">#2</span>
              <h4 className="font-bold text-gray-900">Email body modified in transit</h4>
            </div>
            <p className="text-gray-600 text-sm ml-11">
              Something between your server and the recipient changed the email — mailing lists, forwarding 
              services, security gateways, or even your own email footer tool. This gives you the "body hash 
              did not verify" error.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border-2 border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">#3</span>
              <h4 className="font-bold text-gray-900">Key rotation without updating DNS</h4>
            </div>
            <p className="text-gray-600 text-sm ml-11">
              Your email provider rotated the DKIM keys (they do this automatically sometimes), but the new 
              public key wasn't updated in your DNS. This is what happened to my friend's SaaS.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border-2 border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">#4</span>
              <h4 className="font-bold text-gray-900">Wrong selector in the DKIM-Signature header</h4>
            </div>
            <p className="text-gray-600 text-sm ml-11">
              The <code className="bg-gray-100 px-1 rounded">s=</code> value in the DKIM-Signature header 
              doesn't match what's configured in your DNS. Common when switching between email providers.
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border-2 border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">#5</span>
              <h4 className="font-bold text-gray-900">DNS propagation delays</h4>
            </div>
            <p className="text-gray-600 text-sm ml-11">
              You just updated your DKIM record, but DNS changes can take up to 48 hours to propagate globally. 
              During this window, some servers will see the old record and fail verification.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Fix DNS record issues */}
      <section id="fix-dns" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          Fix #1: DNS Record Issues (Most Common)
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          This is where I start every time. Nine times out of ten, the DKIM record in DNS is the problem. 
          Here's how to check and fix it step by step.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Step 1: Find your DKIM selector</h3>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          First, you need to know which DKIM selector your email provider uses. Common ones:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div className="text-gray-400 mb-2"># Common DKIM selectors by provider</div>
          <div><span className="text-green-400">Google Workspace:</span>  google</div>
          <div><span className="text-green-400">Microsoft 365:</span>    selector1, selector2</div>
          <div><span className="text-green-400">SendGrid:</span>         s1, s2</div>
          <div><span className="text-green-400">Mailchimp:</span>        k1</div>
          <div><span className="text-green-400">Amazon SES:</span>       custom (check SES console)</div>
          <div><span className="text-green-400">Postmark:</span>         custom (usually 20xxxxxx)</div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          If you're not sure, check the email headers of a recent email. Look for the <code className="bg-gray-100 px-1 rounded">DKIM-Signature</code> header 
          and find the <code className="bg-gray-100 px-1 rounded">s=</code> value:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div className="text-gray-400 mb-2"># Look for the s= value in the DKIM-Signature header</div>
          <div>DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed;</div>
          <div>        <span className="text-yellow-400">d=yourdomain.com; s=google;</span></div>
          <div>        h=from:to:subject:date:message-id;</div>
          <div>        bh=abc123...;</div>
          <div>        b=xyz789...;</div>
          <div className="mt-2 text-green-400"># In this example, the selector is "google"</div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Step 2: Query your DKIM DNS record</h3>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          Now look up the DKIM record using the selector:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div className="text-gray-400 mb-2"># Replace 'google' with your selector and 'yourdomain.com' with your domain</div>
          <div className="mb-3"><span className="text-blue-400"># Mac/Linux</span></div>
          <div>dig TXT google._domainkey.yourdomain.com +short</div>
          <div className="mt-3"><span className="text-blue-400"># Windows (PowerShell)</span></div>
          <div>Resolve-DnsName -Name "google._domainkey.yourdomain.com" -Type TXT</div>
          <div className="mt-3"><span className="text-blue-400"># Or check for CNAME (used by many providers)</span></div>
          <div>dig CNAME google._domainkey.yourdomain.com +short</div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          You should see either a TXT record containing <code className="bg-gray-100 px-1 rounded">v=DKIM1; k=rsa; p=MIGfMA0...</code> 
          or a CNAME pointing to your provider's DKIM record.
        </p>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-amber-800">Watch out for these common DNS mistakes:</p>
              <ul className="text-amber-700 text-sm mt-2 space-y-1">
                <li>• <strong>Extra dot at the end</strong> — some DNS providers auto-append a dot; adding one yourself creates a double-dot</li>
                <li>• <strong>Missing quotes around the value</strong> — long TXT records need to be wrapped in quotes</li>
                <li>• <strong>Record truncation</strong> — if your public key is very long, make sure the full value was saved (some DNS UIs silently truncate)</li>
                <li>• <strong>CNAME vs TXT confusion</strong> — Google uses TXT records, but SendGrid and others use CNAMEs. Don't mix them up</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Step 3: Compare with your provider's expected value</h3>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          Go to your email provider's admin panel and find the DKIM settings. They'll show you exactly what the 
          DNS record should contain. Compare it character by character with what you have in DNS.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          I once spent 45 minutes debugging a DKIM failure that turned out to be a single missing character 
          in the public key. The DNS admin had copied it from an email and accidentally missed the last few 
          characters. So yeah — <strong>check every single character</strong>.
        </p>
      </section>

      {/* Section 5: Fix body modification */}
      <section id="fix-body-modified" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          Fix #2: Message Body Was Modified After Signing
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          If you're seeing <code className="bg-gray-100 px-2 py-1 rounded">body hash did not verify</code>, 
          something changed the email content after your server signed it. This is one of the trickier ones to 
          debug because the modification might not be obvious.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Here are the usual suspects:
        </p>

        <div className="my-6 space-y-4">
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <h4 className="font-semibold text-orange-800 mb-2">🔄 Email forwarding / mailing lists</h4>
            <p className="text-orange-700 text-sm">
              When emails are forwarded or pass through a mailing list (Google Groups, Listserv, etc.), the 
              forwarding server often adds footers, modifies headers, or rewrites links. Any of these changes 
              will break the DKIM signature.
            </p>
            <p className="text-orange-700 text-sm mt-2 font-medium">
              Fix: This is expected behavior. There's not much you can do about it except ensure your 
              SPF is properly set up as a fallback, or ask mailing list admins to re-sign with their own DKIM.
            </p>
          </div>

          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <h4 className="font-semibold text-orange-800 mb-2">🛡️ Security gateways / email proxies</h4>
            <p className="text-orange-700 text-sm">
              Corporate email security tools (Mimecast, Proofpoint, Barracuda) often rewrite URLs for 
              click tracking or add disclaimer footers. This modifies the body after DKIM signing.
            </p>
            <p className="text-orange-700 text-sm mt-2 font-medium">
              Fix: Configure your security gateway to re-sign emails with DKIM after making modifications, 
              or exclude outbound emails from URL rewriting.
            </p>
          </div>

          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <h4 className="font-semibold text-orange-800 mb-2">📝 Email signature / footer tools</h4>
            <p className="text-orange-700 text-sm">
              Tools like Exclaimer or CodeTwo that add company signatures to outgoing emails modify the body 
              after your mail server has already signed it with DKIM.
            </p>
            <p className="text-orange-700 text-sm mt-2 font-medium">
              Fix: Make sure the signature tool runs <em>before</em> DKIM signing, not after. Check the 
              processing order in your mail flow rules.
            </p>
          </div>

          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <h4 className="font-semibold text-orange-800 mb-2">📊 Link tracking / analytics</h4>
            <p className="text-orange-700 text-sm">
              Some marketing platforms add tracking parameters to URLs after the email is signed. If URL 
              rewriting happens after DKIM signing, it breaks the signature.
            </p>
            <p className="text-orange-700 text-sm mt-2 font-medium">
              Fix: Ensure link tracking is applied before DKIM signing. Most reputable ESPs (SendGrid, 
              Mailchimp) handle this correctly, but custom setups might not.
            </p>
          </div>
        </div>

        <div className="my-6 p-5 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
          <p className="font-medium text-blue-800 mb-2">💡 Pro tip: Use <code className="bg-blue-100 px-1 rounded">c=relaxed/relaxed</code></p>
          <p className="text-blue-700 text-sm">
            DKIM supports two canonicalization modes: "simple" and "relaxed." The relaxed mode is more 
            tolerant of minor formatting changes (like whitespace normalization). If you're seeing body hash 
            failures, check if your DKIM is using <code className="bg-blue-100 px-1 rounded">c=simple/simple</code> — 
            switching to <code className="bg-blue-100 px-1 rounded">c=relaxed/relaxed</code> might help.
          </p>
        </div>
      </section>

      {/* Section 6: Fix key rotation */}
      <section id="fix-key-rotation" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-lg font-bold">6</span>
          Fix #3: Key Rotation Gone Wrong
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          This is what caught my friend off guard. His email provider (Postmark) rotated their DKIM keys 
          automatically. The new private key was being used to sign emails, but the public key in his DNS still 
          pointed to the old one. Result: every single email failed DKIM verification.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Here's the thing — if you're using CNAME records for DKIM (which is what SendGrid, Mailchimp, and 
          most modern providers recommend), key rotation is handled automatically. The CNAME points to the 
          provider's DNS, and when they update the key, it just works.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>But if you're using TXT records</strong> with the actual public key pasted into your DNS, 
          you have to manually update the key whenever it changes. This is where things break.
        </p>

        <div className="my-6 grid gap-4 md:grid-cols-2">
          <div className="p-4 bg-green-50 rounded-xl border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <p className="font-semibold text-green-800">CNAME approach (recommended)</p>
            </div>
            <div className="bg-green-900 text-green-100 p-3 rounded-lg font-mono text-xs">
              <div className="text-green-400"># Auto-updates when provider rotates keys</div>
              <div>s1._domainkey.yourdomain.com</div>
              <div>  CNAME → s1.domainkey.u1234.wl.sendgrid.net</div>
            </div>
          </div>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <p className="font-semibold text-red-800">TXT approach (manual updates needed)</p>
            </div>
            <div className="bg-red-900 text-red-100 p-3 rounded-lg font-mono text-xs">
              <div className="text-red-400"># Breaks when provider rotates keys!</div>
              <div>s1._domainkey.yourdomain.com</div>
              <div>  TXT → "v=DKIM1; k=rsa; p=MIGfMA..."</div>
            </div>
          </div>
        </div>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-amber-800">How to fix a key rotation issue:</p>
              <ol className="text-amber-700 text-sm mt-2 space-y-1">
                <li><strong>1.</strong> Log into your email provider's admin panel</li>
                <li><strong>2.</strong> Go to DKIM settings — they'll show the current public key or CNAME value</li>
                <li><strong>3.</strong> Update your DNS record to match</li>
                <li><strong>4.</strong> If possible, switch from TXT to CNAME so this won't happen again</li>
                <li><strong>5.</strong> Wait for DNS propagation (usually 15-60 minutes, up to 48 hours)</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Verify your fix */}
      <section id="verify-fix" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">7</span>
          How to Verify Your Fix Worked
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          After making changes, don't just assume it's fixed. Test it properly. Here's my verification routine:
        </p>

        <div className="my-6 space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">1. Check DNS propagation first</h4>
            <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm">
              <div className="text-gray-400"># Check if DNS has updated</div>
              <div>dig TXT google._domainkey.yourdomain.com +short</div>
              <div className="mt-2 text-gray-400"># Use Google's DNS to check propagation</div>
              <div>dig @8.8.8.8 TXT google._domainkey.yourdomain.com +short</div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">2. Send a test email and check headers</h4>
            <p className="text-gray-600 text-sm mb-2">
              Send an email to a Gmail account and check "Show original." You should see:
            </p>
            <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm">
              <div className="text-green-400">dkim=pass header.i=@yourdomain.com header.s=google</div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">3. Use an automated testing tool</h4>
            <p className="text-gray-600 text-sm">
              Manual header checking works, but it's tedious. Use a tool that automatically checks all 
              three — SPF, DKIM, and DMARC — in one go.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="my-10 p-6 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl text-white">
          <div className="flex items-start gap-4">
            <div className="text-4xl">✅</div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Verify your DKIM fix in seconds</h3>
              <p className="text-green-100 mb-4">
                Send a test email to our checker. We'll verify your DKIM signature, show the public key 
                we found in DNS, and confirm everything matches. Free, no signup required.
              </p>
              <Link 
                href="/test"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Verify My DKIM Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Quick checklist */}
      <section id="checklist" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-lg font-bold">8</span>
          Quick Troubleshooting Checklist
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          Save this checklist. Next time DKIM breaks, run through it top to bottom — it covers 95% of cases:
        </p>

        <div className="my-6 p-6 bg-gray-50 rounded-xl">
          <div className="space-y-3">
            <label className="flex items-start gap-3 text-gray-700">
              <span className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0 mt-0.5"></span>
              <span><strong>Check the error type</strong> — Is it "body hash," "key not found," or "signature verification"? Each has a different fix.</span>
            </label>
            <label className="flex items-start gap-3 text-gray-700">
              <span className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0 mt-0.5"></span>
              <span><strong>Verify DNS record exists</strong> — Query <code className="bg-gray-200 px-1 rounded">selector._domainkey.yourdomain.com</code> for both TXT and CNAME.</span>
            </label>
            <label className="flex items-start gap-3 text-gray-700">
              <span className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0 mt-0.5"></span>
              <span><strong>Match the selector</strong> — The <code className="bg-gray-200 px-1 rounded">s=</code> value in the DKIM-Signature header must match your DNS record name.</span>
            </label>
            <label className="flex items-start gap-3 text-gray-700">
              <span className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0 mt-0.5"></span>
              <span><strong>Compare public keys</strong> — Ensure the key in DNS matches what your email provider shows in their admin panel.</span>
            </label>
            <label className="flex items-start gap-3 text-gray-700">
              <span className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0 mt-0.5"></span>
              <span><strong>Check for intermediaries</strong> — Are mailing lists, security gateways, or signature tools modifying the email after signing?</span>
            </label>
            <label className="flex items-start gap-3 text-gray-700">
              <span className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0 mt-0.5"></span>
              <span><strong>Use CNAME when possible</strong> — Switch from TXT records to CNAMEs so key rotations are handled automatically.</span>
            </label>
            <label className="flex items-start gap-3 text-gray-700">
              <span className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0 mt-0.5"></span>
              <span><strong>Wait for DNS propagation</strong> — Give it at least 30 minutes. Use <code className="bg-gray-200 px-1 rounded">dig @8.8.8.8</code> to check if Google's DNS has the update.</span>
            </label>
            <label className="flex items-start gap-3 text-gray-700">
              <span className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0 mt-0.5"></span>
              <span><strong>Send a test email</strong> — After fixing, send to Gmail and check "Show original" for <code className="bg-gray-200 px-1 rounded">dkim=pass</code>.</span>
            </label>
          </div>
        </div>
      </section>

      {/* Closing */}
      <div className="mt-16 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-3">Wrapping up</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          DKIM failures are frustrating because they can appear out of nowhere — everything was working fine 
          yesterday, and suddenly it's not. But once you understand the three main failure modes (DNS issues, 
          body modification, and key rotation), debugging becomes a lot more systematic.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          The biggest lesson from my friend's incident: <strong>set up monitoring</strong>. Don't wait for 
          customers to tell you emails are going to spam. Run a periodic check on your DKIM, SPF, and DMARC 
          so you catch issues before they become problems.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Still not sure what's wrong? Run a quick test — it takes 30 seconds and 
          you'll know exactly what's failing and why.
        </p>
        <div className="mt-4">
          <Link 
            href="/test"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Test My Email Authentication <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
