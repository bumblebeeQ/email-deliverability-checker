import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, TrendingUp, Shield, Clock } from 'lucide-react';

export default function ImproveEmailSenderReputation() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          Last year, one of my clients went from 95% inbox placement to 40% overnight. 
          No code changes, no DNS issues, nothing visibly wrong. 
          <strong className="text-gray-800"> Their sender reputation had tanked — and they had no idea it was happening.</strong>
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Took me about two days to piece together what went wrong. They&apos;d imported a purchased 
          email list (yep), blasted 50,000 contacts, got a ton of bounces and spam complaints, 
          and Gmail basically said &quot;nope, you&apos;re done.&quot;
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          The recovery took 6 weeks. Six painful weeks of throttled sending, cleaning lists, 
          and watching open rates slowly climb back. I learned more about sender reputation 
          in those 6 weeks than in the previous 3 years.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Here&apos;s everything I know about building and recovering email sender reputation — 
          the stuff that actually moves the needle, not the generic &quot;send good content&quot; advice 
          you&apos;ll find everywhere else.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">📊</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">First — check where you stand right now</h3>
            <p className="text-blue-100 mb-4">
              Before optimizing anything, you need a baseline. Run your domain through a quick 
              authentication check to see if the foundation is solid.
            </p>
            <Link 
              href="/test"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Check My Domain Health <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="my-10 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-4">What we&apos;ll cover:</h3>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <a href="#what-is-reputation" className="text-blue-600 hover:underline">What &quot;sender reputation&quot; actually means</a>
          <a href="#check-current" className="text-blue-600 hover:underline">How to check your current reputation</a>
          <a href="#authentication" className="text-blue-600 hover:underline">Step 1: Nail the authentication basics</a>
          <a href="#list-hygiene" className="text-blue-600 hover:underline">Step 2: Clean your list (ruthlessly)</a>
          <a href="#sending-patterns" className="text-blue-600 hover:underline">Step 3: Fix your sending patterns</a>
          <a href="#engagement" className="text-blue-600 hover:underline">Step 4: Improve engagement signals</a>
          <a href="#ip-warming" className="text-blue-600 hover:underline">Step 5: IP warming (if you&apos;re on dedicated IPs)</a>
          <a href="#monitor" className="text-blue-600 hover:underline">Step 6: Monitor and maintain</a>
          <a href="#recovery" className="text-blue-600 hover:underline">Reputation recovery (if you&apos;re already burned)</a>
          <a href="#checklist" className="text-blue-600 hover:underline">Quick reputation checklist</a>
        </div>
      </div>

      {/* Section: What Is Sender Reputation */}
      <section id="what-is-reputation" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">?</span>
          What &quot;Sender Reputation&quot; Actually Means
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Think of sender reputation like a credit score for your email. Every domain and IP address 
          that sends email has one. Gmail, Outlook, Yahoo — they&apos;re all keeping score. 
          And like a credit score, it&apos;s way easier to trash than to build up.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          There are actually two types of reputation:
        </p>

        <div className="my-6 grid md:grid-cols-2 gap-4">
          <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
            <h4 className="font-semibold text-blue-800 mb-2">🌐 Domain Reputation</h4>
            <p className="text-blue-700 text-sm">
              Tied to your sending domain (e.g., yourdomain.com). Follows you even if you switch 
              email providers or IP addresses. This is the one that matters most in 2026.
            </p>
          </div>
          <div className="p-5 bg-purple-50 rounded-xl border border-purple-100">
            <h4 className="font-semibold text-purple-800 mb-2">🖥️ IP Reputation</h4>
            <p className="text-purple-700 text-sm">
              Tied to the IP address sending your emails. Matters if you&apos;re on dedicated IPs. 
              If you&apos;re using shared IPs (like most people on SendGrid, Mailgun), this is partly 
              out of your control.
            </p>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          The signals that affect your reputation (roughly in order of impact):
        </p>

        <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-6">
          <li><strong>Spam complaints</strong> — The biggest killer. If people click &quot;Report Spam&quot;, you&apos;re in trouble fast.</li>
          <li><strong>Bounce rate</strong> — Lots of hard bounces = you&apos;re sending to bad addresses = you look like a spammer.</li>
          <li><strong>Engagement</strong> — Opens, clicks, replies. Gmail literally watches whether people read your emails.</li>
          <li><strong>Spam traps</strong> — Hitting a single spam trap address can tank your reputation instantly.</li>
          <li><strong>Volume consistency</strong> — Sudden spikes look suspicious. Gradual ramp-up is good.</li>
          <li><strong>Authentication</strong> — SPF, DKIM, DMARC all passing. The foundation everything else sits on.</li>
        </ol>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="text-amber-800">
            <strong>Here&apos;s what nobody tells you:</strong> reputation isn&apos;t binary. It&apos;s not like 
            you&apos;re either &quot;good&quot; or &quot;bad.&quot; It&apos;s a spectrum, and it varies by receiving provider. 
            You might have great reputation at Gmail but terrible reputation at Outlook. 
            Each provider calculates it differently, with different weightings.
          </p>
        </div>
      </section>

      {/* Section: Check Current Reputation */}
      <section id="check-current" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">🔍</span>
          How to Check Your Current Reputation
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          You can&apos;t fix what you can&apos;t measure. Here&apos;s where to look:
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Google Postmaster Tools (free, essential)</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          This is the gold standard if you send to Gmail users. Go to{' '}
          <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">postmaster.google.com</code>, 
          verify your domain, and you&apos;ll see:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
          <li><strong>Domain reputation:</strong> High, Medium, Low, or Bad</li>
          <li><strong>IP reputation:</strong> Same scale per sending IP</li>
          <li><strong>Spam rate:</strong> What percentage of recipients marked you as spam</li>
          <li><strong>Authentication:</strong> SPF/DKIM/DMARC pass rates</li>
        </ul>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div><span className="text-gray-400"># What you want to see in Google Postmaster</span></div>
          <div className="mt-2">Domain Reputation: <span className="text-green-400">High</span></div>
          <div>Spam Rate: <span className="text-green-400">&lt; 0.10%</span>  (Google&apos;s threshold is 0.3%)</div>
          <div>SPF Success: <span className="text-green-400">99%+</span></div>
          <div>DKIM Success: <span className="text-green-400">99%+</span></div>
          <div>DMARC Success: <span className="text-green-400">99%+</span></div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Microsoft SNDS (for Outlook/Hotmail)</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          Microsoft&apos;s Smart Network Data Services at{' '}
          <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">sendersupport.olc.protection.outlook.com/snds</code> 
          shows your IP reputation for Outlook/Hotmail. Less detailed than Google&apos;s tool, but important 
          if you have lots of Outlook recipients.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Quick domain health check</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          For a fast overview of your authentication setup (which is the foundation of reputation), 
          run your domain through an authentication checker. If SPF, DKIM, or DMARC are failing, 
          fix those first before worrying about anything else.
        </p>

        <div className="my-6 p-5 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
          <p className="font-medium text-red-800 mb-2">⚠️ Real talk: reputation data has a delay</p>
          <p className="text-red-700">
            Google Postmaster data is 24-48 hours delayed. Microsoft&apos;s is similar. 
            If you made a mistake yesterday, you might not see the damage until tomorrow. 
            This is why monitoring daily matters — by the time you see a drop, the damage 
            is already done and you&apos;re in recovery mode.
          </p>
        </div>
      </section>

      {/* Step 1: Authentication */}
      <section id="authentication" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
          Nail the Authentication Basics
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          I&apos;m going to assume you already have SPF, DKIM, and DMARC set up. If not, stop reading 
          this and go fix that first. No amount of reputation optimization will help if your 
          authentication is broken.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s the thing though — having authentication &quot;set up&quot; isn&apos;t enough. 
          I&apos;ve seen plenty of domains where SPF was configured but only covering 60% of their 
          sending sources. Or DKIM was enabled but not aligned with the From domain.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">What &quot;fully authenticated&quot; actually means:</h3>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div><span className="text-gray-400"># Your SPF record should include ALL sending sources</span></div>
          <div className="mt-2">v=spf1 include:_spf.google.com include:sendgrid.net include:mailgun.org -all</div>
          <div className="mt-3"><span className="text-gray-400"># DMARC should be at least p=quarantine (p=reject is ideal)</span></div>
          <div>v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com; pct=100</div>
          <div className="mt-3"><span className="text-gray-400"># DKIM should be signing ALL outbound email (not just some)</span></div>
          <div><span className="text-gray-400"># Check headers: dkim=pass AND aligned with From domain</span></div>
        </div>

        <p className="text-gray-700 leading-relaxed mt-6 mb-4">
          Key point: <strong>alignment matters</strong>. SPF and DKIM need to pass AND align 
          with your From domain for DMARC to pass. I wrote about the differences between 
          <Link href="/blog/spf-vs-dkim-vs-dmarc" className="text-blue-600 hover:underline"> SPF, DKIM, and DMARC</Link> 
          {' '}if you need a refresher.
        </p>

        <div className="my-6 p-5 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
          <p className="font-medium text-green-800 mb-2">💡 Pro tip: DMARC reports are gold</p>
          <p className="text-green-700">
            Set up a DMARC aggregate report receiver (the <code className="bg-green-100 px-1 rounded">rua=</code> address). 
            These reports tell you exactly which sources are sending as your domain and whether they&apos;re passing 
            authentication. I&apos;ve found rogue marketing tools, forgotten test environments, and even spoofing 
            attempts through DMARC reports.
          </p>
        </div>
      </section>

      {/* Step 2: List Hygiene */}
      <section id="list-hygiene" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
          Clean Your List (Ruthlessly)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          This is where most reputation problems actually live. Not in your DNS records, 
          not in your content — in your list quality. I&apos;ve seen this pattern so many times: 
          someone sends to their entire database of 100K contacts, half of which haven&apos;t 
          engaged in 2 years, and wonders why their reputation dropped.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Remove these immediately:</h3>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-800">Hard bounces</p>
              <p className="text-red-700 text-sm">Invalid addresses. Remove after first bounce. No exceptions.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-800">Spam complainers</p>
              <p className="text-red-700 text-sm">Anyone who&apos;s reported you as spam. Never email them again. Ever.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-800">Role addresses</p>
              <p className="text-red-700 text-sm">
                info@, admin@, support@, sales@ — these often become spam traps when companies 
                shut down or people leave.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-800">Inactive subscribers (no opens in 90+ days)</p>
              <p className="text-amber-700 text-sm">
                Don&apos;t delete them yet — run a re-engagement campaign first. If they still don&apos;t respond, 
                move them to a suppression list.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">The re-engagement play:</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          Before you nuke inactive subscribers, give them one last chance. Send a simple 
          &quot;Hey, do you still want to hear from us?&quot; email. I usually structure it like:
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div><span className="text-gray-400"># Re-engagement email strategy</span></div>
          <div className="mt-2">Day 1: &quot;We miss you&quot; email — offer something valuable</div>
          <div>Day 5: &quot;Last chance&quot; email — clear &quot;Stay subscribed&quot; button</div>
          <div>Day 10: If no engagement → suppress them</div>
          <div className="mt-3"><span className="text-gray-400"># Expected results:</span></div>
          <div>- 10-20% will re-engage (keep these)</div>
          <div>- 80-90% will ignore (suppress these)</div>
          <div>- Your list shrinks, but your metrics improve dramatically</div>
        </div>

        <div className="my-6 p-5 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
          <p className="text-blue-800">
            <strong>The counterintuitive truth:</strong> a smaller, engaged list performs WAY better 
            than a big, cold list. I&apos;ve seen clients cut their list by 40% and see inbox placement 
            go from 60% to 92%. Your reputation is largely a function of engagement rate — 
            dead weight subscribers are actively hurting you.
          </p>
        </div>
      </section>

      {/* Step 3: Sending Patterns */}
      <section id="sending-patterns" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
          Fix Your Sending Patterns
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Mailbox providers watch <em>how</em> you send, not just <em>what</em> you send. 
          Sudden volume spikes, erratic schedules, and batch-blasting all look suspicious. 
          Consistent, predictable sending looks legitimate.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">What good sending patterns look like:</h3>

        <div className="my-6 grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-xl">
            <p className="font-semibold text-green-800 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" /> Good patterns
            </p>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Consistent daily/weekly volume</li>
              <li>• Gradual increases (10-20% per week max)</li>
              <li>• Spread sending over hours (not 50K at once)</li>
              <li>• Regular schedule (same days, similar times)</li>
              <li>• Separate streams for transactional vs marketing</li>
            </ul>
          </div>
          <div className="p-4 bg-red-50 rounded-xl">
            <p className="font-semibold text-red-800 mb-3 flex items-center gap-2">
              <XCircle className="w-5 h-5" /> Bad patterns
            </p>
            <ul className="space-y-2 text-sm text-red-700">
              <li>• Sending 0 emails for weeks, then blasting 50K</li>
              <li>• 10x volume increase in a single day</li>
              <li>• All emails sent within minutes</li>
              <li>• Random schedules with no consistency</li>
              <li>• Mixing transactional and marketing on same IP</li>
            </ul>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Separate your email streams:</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          This is something I wish someone had told me earlier. Your transactional emails 
          (password resets, order confirmations) and marketing emails (newsletters, promotions) 
          should NOT share the same sending infrastructure if you can help it.
        </p>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div><span className="text-gray-400"># Ideal setup: separate subdomains for different email types</span></div>
          <div className="mt-2">Transactional: <span className="text-green-400">mail.yourdomain.com</span> (password resets, receipts)</div>
          <div>Marketing: <span className="text-green-400">news.yourdomain.com</span> (newsletters, promos)</div>
          <div>Cold outreach: <span className="text-green-400">outreach.yourdomain.com</span> (if you do cold email)</div>
          <div className="mt-3"><span className="text-gray-400"># Why? If marketing reputation drops (spam complaints),</span></div>
          <div><span className="text-gray-400"># it won&apos;t affect your transactional delivery</span></div>
        </div>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2">⚠️ Volume spike example that burned me</p>
          <p className="text-amber-700">
            A client normally sent 2,000 emails/day. They ran a Black Friday campaign and 
            jumped to 25,000 in one day. Gmail throttled them immediately. The fix? 
            They should have gradually increased volume over 2 weeks before the campaign. 
            Instead, they spent the next month rebuilding trust.
          </p>
        </div>
      </section>

      {/* Step 4: Engagement */}
      <section id="engagement" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
          Improve Engagement Signals
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Gmail has basically said out loud that they use engagement to determine inbox placement. 
          If people open, read, click, reply, and move your email out of spam — that&apos;s all positive 
          signal. If people delete without reading, never open, or report spam — negative signal.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">High-impact engagement tactics:</h3>

        <div className="my-6 space-y-4">
          <div className="p-5 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">1. Send to engaged segments first</h4>
            <p className="text-gray-700 text-sm">
              When you send a campaign, send to your most engaged subscribers first (people who opened 
              in the last 7 days). Wait a few hours. If metrics look good, expand to the next segment. 
              This &quot;seed&quot; strategy builds positive engagement signals before Gmail decides what to do 
              with the rest.
            </p>
          </div>
          <div className="p-5 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">2. Make unsubscribe dead simple</h4>
            <p className="text-gray-700 text-sm">
              I know this sounds backwards, but hear me out. If someone wants to stop receiving your emails, 
              you&apos;d rather they click &quot;Unsubscribe&quot; than &quot;Report Spam.&quot; An unsubscribe barely hurts you. 
              A spam complaint can destroy you. Make the unsubscribe link prominent and one-click.
            </p>
          </div>
          <div className="p-5 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">3. Use List-Unsubscribe headers</h4>
            <p className="text-gray-700 text-sm">
              Add the <code className="bg-gray-100 px-1 rounded">List-Unsubscribe</code> and{' '}
              <code className="bg-gray-100 px-1 rounded">List-Unsubscribe-Post</code> headers to your emails. 
              Gmail and other providers show a native &quot;Unsubscribe&quot; button when these are present — 
              which captures people who would otherwise hit &quot;Spam.&quot;
            </p>
          </div>
          <div className="p-5 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">4. Optimize send time</h4>
            <p className="text-gray-700 text-sm">
              Send when people actually check email. For B2B, that&apos;s usually Tuesday-Thursday, 
              9-11am in their timezone. For B2C, evenings and weekends often work better. 
              Most email platforms have send-time optimization built in. Use it.
            </p>
          </div>
          <div className="p-5 bg-gray-50 rounded-xl">
            <h4 className="font-semibold text-gray-800 mb-2">5. Ask for replies</h4>
            <p className="text-gray-700 text-sm">
              Replies are the strongest positive engagement signal. If someone replies to your email, 
              Gmail essentially says &quot;this sender is trusted.&quot; Ask a genuine question in your emails. 
              Not fake engagement bait — actual questions that warrant responses.
            </p>
          </div>
        </div>

        <div className="my-6 p-5 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
          <p className="text-green-800">
            <strong>The engagement flywheel:</strong> Better engagement → Better reputation → 
            Better inbox placement → More opens/clicks → Even better engagement. 
            Once you get this spinning, it compounds. But it also works in reverse — 
            one bad campaign can start a negative spiral.
          </p>
        </div>
      </section>

      {/* Step 5: IP Warming */}
      <section id="ip-warming" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
          IP Warming (If You&apos;re on Dedicated IPs)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          If you just got a new dedicated IP (from AWS SES, SendGrid, etc.), it has zero reputation. 
          Mailbox providers have never seen it before. Sending 50K emails from a brand-new IP is like 
          a stranger showing up at a party and trying to shake everyone&apos;s hand at once — suspicious.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          You need to warm it up gradually. Here&apos;s the schedule I use:
        </p>

        <div className="my-6 overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-800">Day</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-800">Daily Volume</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-800">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="px-4 py-2">1-3</td><td className="px-4 py-2">50-100</td><td className="px-4 py-2 text-gray-600">Send to your most engaged contacts only</td></tr>
              <tr><td className="px-4 py-2">4-7</td><td className="px-4 py-2">200-500</td><td className="px-4 py-2 text-gray-600">Expand to recent openers (last 30 days)</td></tr>
              <tr><td className="px-4 py-2">8-14</td><td className="px-4 py-2">1,000-2,000</td><td className="px-4 py-2 text-gray-600">Include openers from last 60 days</td></tr>
              <tr><td className="px-4 py-2">15-21</td><td className="px-4 py-2">5,000-10,000</td><td className="px-4 py-2 text-gray-600">Broader segments, monitor bounce rate</td></tr>
              <tr><td className="px-4 py-2">22-30</td><td className="px-4 py-2">20,000-50,000</td><td className="px-4 py-2 text-gray-600">Full volume (if metrics look good)</td></tr>
            </tbody>
          </table>
        </div>

        <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
          <p className="font-medium text-amber-800 mb-2">⚠️ Critical: monitor during warming</p>
          <p className="text-amber-700">
            Watch your bounce rate and spam complaint rate daily during warming. 
            If bounce rate exceeds 5% or spam complaints exceed 0.3%, stop and fix the issue 
            before continuing. Pushing through bad metrics during warming will poison the IP.
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          If you&apos;re on shared IPs (which most small-to-medium senders are), you can skip this section. 
          Your email provider handles IP reputation collectively. Focus on domain reputation instead.
        </p>
      </section>

      {/* Step 6: Monitor */}
      <section id="monitor" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold">6</span>
          Monitor and Maintain
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          Reputation isn&apos;t a set-it-and-forget-it thing. It needs ongoing attention. 
          The client I mentioned at the top? Their reputation was great for months before it crashed. 
          They just weren&apos;t watching the early warning signs.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">What to monitor weekly:</h3>

        <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div><span className="text-gray-400"># Weekly monitoring checklist</span></div>
          <div className="mt-2">1. Google Postmaster — domain reputation trend</div>
          <div>2. Spam complaint rate — must stay below <span className="text-yellow-400">0.1%</span> (ideal) / <span className="text-red-400">0.3%</span> (max)</div>
          <div>3. Bounce rate — must stay below <span className="text-yellow-400">2%</span> (ideal) / <span className="text-red-400">5%</span> (danger)</div>
          <div>4. Open rate trend — sudden drops indicate inbox issues</div>
          <div>5. Blacklist check — run domain against major blocklists</div>
          <div className="mt-3"><span className="text-gray-400"># Red flags that need immediate action:</span></div>
          <div className="text-red-400">- Spam rate above 0.3%</div>
          <div className="text-red-400">- Reputation dropped from High to Medium/Low</div>
          <div className="text-red-400">- Sudden open rate drop (&gt;20% decline)</div>
          <div className="text-red-400">- Listed on any major blacklist</div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Blacklist monitoring:</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          Check your domain and IPs against major blacklists regularly. The big ones to watch:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
          <li><strong>Spamhaus</strong> — The most impactful. Being listed here is bad news.</li>
          <li><strong>Barracuda</strong> — Used by many corporate email filters.</li>
          <li><strong>SORBS</strong> — Catches dynamic IPs and open relays.</li>
          <li><strong>SpamCop</strong> — Based on user complaints.</li>
          <li><strong>URIBL/SURBL</strong> — Domain-based (checks links in your email body).</li>
        </ul>

        <div className="my-6 p-5 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
          <p className="text-blue-800">
            <strong>Quick tip:</strong> Set up a weekly calendar reminder to check Google Postmaster. 
            It takes 2 minutes but catches problems early. The difference between catching a reputation 
            drop on day 1 vs day 7 can be the difference between a quick fix and a month-long recovery.
          </p>
        </div>
      </section>

      {/* Recovery Section */}
      <section id="recovery" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">🔧</span>
          Reputation Recovery (If You&apos;re Already Burned)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          If you&apos;re reading this because your reputation is already trashed — I&apos;ve been there. 
          It&apos;s fixable, but you need to be patient. Here&apos;s the recovery playbook I used:
        </p>

        <div className="my-6 space-y-4">
          <div className="p-5 bg-gray-50 rounded-xl border-l-4 border-gray-400">
            <h4 className="font-semibold text-gray-800 mb-2">Week 1: Stop the bleeding</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>Immediately stop all marketing/promotional sends</li>
              <li>Keep only critical transactional emails running</li>
              <li>Remove ALL hard bounces from your list</li>
              <li>Process all spam complaints and unsubscribes</li>
              <li>Fix any authentication issues (SPF, DKIM, DMARC)</li>
            </ul>
          </div>
          <div className="p-5 bg-gray-50 rounded-xl border-l-4 border-gray-400">
            <h4 className="font-semibold text-gray-800 mb-2">Week 2-3: Rebuild with your best contacts</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>Create a &quot;golden segment&quot; — contacts who opened in the last 14 days</li>
              <li>Resume sending ONLY to this segment</li>
              <li>Keep volume at 25% of normal</li>
              <li>Monitor metrics daily — abort if spam rate spikes</li>
            </ul>
          </div>
          <div className="p-5 bg-gray-50 rounded-xl border-l-4 border-gray-400">
            <h4 className="font-semibold text-gray-800 mb-2">Week 4-6: Gradual expansion</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>Increase volume by 20% per week (not faster)</li>
              <li>Expand to 30-day engaged contacts</li>
              <li>Watch Google Postmaster for reputation improvement</li>
              <li>If reputation improves to &quot;Medium&quot;, cautiously expand further</li>
            </ul>
          </div>
        </div>

        <div className="my-6 p-5 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
          <p className="font-medium text-red-800 mb-2">⚠️ Hard truth about recovery timelines</p>
          <p className="text-red-700">
            Recovery typically takes 4-8 weeks of perfect behavior. Sometimes longer. 
            There&apos;s no shortcut, no &quot;reset button,&quot; no email you can send to Google to ask them 
            to fix it. You just have to prove through consistent good sending that you&apos;re trustworthy again. 
            I know that&apos;s not what you want to hear. But it&apos;s the reality.
          </p>
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist" className="scroll-mt-20">
        <div className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">✅ Sender Reputation Checklist</h2>
          <p className="text-gray-400 mb-6 text-sm">Quick reference — run through this monthly to stay healthy.</p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>SPF, DKIM, DMARC all passing and aligned</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Google Postmaster reputation: High</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Spam complaint rate &lt; 0.1%</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Bounce rate &lt; 2%</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>No listings on major blacklists</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>List cleaned: hard bounces removed</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Inactive subscribers suppressed (90+ days no opens)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Sending volume consistent (no wild spikes)</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>List-Unsubscribe headers implemented</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <input type="checkbox" className="w-4 h-4 rounded" readOnly />
              <span>Transactional and marketing on separate subdomains</span>
            </label>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-3">Check your email authentication right now</h3>
        <p className="text-blue-100 mb-6 max-w-lg mx-auto">
          Good reputation starts with solid authentication. Run your domain through EmailDiag 
          to make sure SPF, DKIM, and DMARC are all passing correctly.
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
          Building sender reputation isn&apos;t glamorous work. It&apos;s list cleaning, authentication checks, 
          consistent sending, and daily monitoring. No shortcuts, no hacks.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          But here&apos;s the thing — once you get it right, it compounds. Good reputation means better 
          inbox placement, which means better engagement, which means even better reputation. 
          The flywheel works both ways.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Start with authentication, clean your list, fix your sending patterns, and monitor weekly. 
          In 4-6 weeks, you&apos;ll see real improvement. And if you&apos;re already in trouble? 
          Follow the recovery plan. It works — it just takes patience.
        </p>
      </div>
    </>
  );
}
