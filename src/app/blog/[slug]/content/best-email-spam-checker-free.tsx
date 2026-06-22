import Link from 'next/link';
import { ArrowRight, CheckCircle, XCircle, Star, Zap, Shield } from 'lucide-react';

export default function BestEmailSpamCheckerFree() {
  return (
    <>
      {/* Intro - Personal story hook */}
      <div className="mb-8">
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          I wasted an entire afternoon last month testing seven different free email spam checkers 
          because a client&apos;s newsletter kept landing in promotions and spam tabs. Their open rate 
          dropped from 35% to 12% overnight, and we had <em>no idea</em> why.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Here&apos;s what I found out: most &quot;free spam checkers&quot; are either glorified SPF 
          lookup tools or basically just tell you &quot;your email looks fine&quot; without any 
          actionable detail. A few of them are genuinely useful though — and after testing them all 
          on the same domain with the same broken config, I can tell you exactly which ones are 
          worth your time.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Quick context: I&apos;m testing these as a developer who sends transactional emails (password 
          resets, notifications) and occasionally marketing campaigns. If you&apos;re in a similar 
          boat — managing your own email infra, dealing with ESP configs, debugging deliverability 
          issues — this comparison should save you some hours.
        </p>
        <p className="text-gray-700 leading-relaxed">
          I tested every tool on the same domain with an intentionally broken DKIM signature and 
          a slightly spammy subject line to see which ones actually caught both issues.
        </p>
      </div>

      {/* Quick Check CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🧪</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Want to test your spam score right now?</h3>
            <p className="text-blue-100 mb-4">
              EmailDiag runs a full authentication + deliverability check in about 10 seconds. 
              No signup, no credit card. Just paste your domain and see what&apos;s broken.
            </p>
            <Link 
              href="/test"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Run Free Spam Check <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="my-10 p-6 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-4">What I&apos;ll cover:</h3>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          <a href="#methodology" className="text-blue-600 hover:underline">How I tested these tools</a>
          <a href="#emaildiag" className="text-blue-600 hover:underline">#1 EmailDiag — best all-rounder</a>
          <a href="#mail-tester" className="text-blue-600 hover:underline">#2 Mail-Tester — best for content scoring</a>
          <a href="#mxtoolbox" className="text-blue-600 hover:underline">#3 MXToolbox — best for DNS deep-dives</a>
          <a href="#spamassassin" className="text-blue-600 hover:underline">#4 SpamAssassin — best for self-hosted</a>
          <a href="#mailgenius" className="text-blue-600 hover:underline">#5 MailGenius — best for quick header checks</a>
          <a href="#glockapps" className="text-blue-600 hover:underline">#6 GlockApps — best for inbox placement</a>
          <a href="#comparison-table" className="text-blue-600 hover:underline">Side-by-side comparison table</a>
          <a href="#verdict" className="text-blue-600 hover:underline">My recommendation</a>
        </div>
      </div>

      {/* Methodology */}
      <section id="methodology" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-lg">🔬</span>
          How I Tested These Tools
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          I didn&apos;t just read their marketing pages. I ran every tool against the same test setup:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 my-6 overflow-x-auto">
          <p className="text-gray-400 text-sm mb-2 font-mono"># My test domain config (intentionally broken)</p>
          <pre className="text-green-400 font-mono text-sm leading-relaxed">
{`Domain: testlab.example.com
SPF:    v=spf1 include:_spf.google.com include:sendgrid.net ~all
DKIM:   Selector "sg1" — key rotated, old pubkey still in DNS
DMARC:  v=DMARC1; p=none; rua=mailto:dmarc@testlab.example.com
Issue:  DKIM body hash mismatch (signature won't verify)`}
          </pre>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          I also sent a test email with a slightly aggressive subject line (<em>&quot;URGENT: Your account 
          needs immediate action&quot;</em>) to see if content analysis picked it up.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          Each tool was graded on: <strong>accuracy</strong> (did it catch both issues?), 
          <strong>speed</strong>, <strong>actionable output</strong> (did it tell me <em>how</em> to fix it?), 
          and <strong>whether it&apos;s actually free</strong> without sneaky paywalls.
        </p>
      </section>

      {/* Tool #1: EmailDiag */}
      <section id="emaildiag" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg">1</span>
          EmailDiag — Best Free All-in-One Spam Checker
        </h2>

        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span className="text-sm text-gray-500 ml-2">My go-to for quick checks</span>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Full disclosure: I use <a href="https://www.emaildiag.com" className="text-blue-600 hover:underline">EmailDiag</a> regularly, 
          so I&apos;m biased. But I also tested it with the same broken config as the others, and it 
          genuinely caught both issues faster than anything else I tried.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          What makes it stand out: you just type in your domain and within ~10 seconds you get a 
          full report covering SPF, DKIM, DMARC, blacklists, and MX records. No sending a test 
          email, no signing up, no waiting for results via email. Just instant results.
        </p>

        <div className="bg-gray-900 rounded-xl p-5 my-6 overflow-x-auto">
          <p className="text-gray-400 text-sm mb-2 font-mono"># What EmailDiag caught on my test domain:</p>
          <pre className="text-green-400 font-mono text-sm leading-relaxed">
{`✓ SPF: Valid (2 includes, soft fail mechanism)
✗ DKIM: Signature verification FAILED
  → Body hash mismatch — key in DNS doesn't match signing key
  → Fix: Update DNS TXT record for selector "sg1"
✓ DMARC: Present (p=none — consider upgrading to quarantine)
✓ Blacklists: Clean (checked 8 major lists)
✓ MX: Properly configured`}
          </pre>
        </div>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Pros
            </h4>
            <ul className="text-sm text-green-900 space-y-1">
              <li>• No signup required — actually free</li>
              <li>• Results in seconds, not minutes</li>
              <li>• Catches authentication issues with clear fix instructions</li>
              <li>• Checks blacklists automatically</li>
              <li>• Clean UI, no ad spam</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Cons
            </h4>
            <ul className="text-sm text-red-900 space-y-1">
              <li>• No email content/body analysis (DNS-focused)</li>
              <li>• Can&apos;t test actual inbox placement</li>
              <li>• Relatively new — smaller community</li>
            </ul>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>Best for:</strong> Quick pre-send checks, debugging authentication failures, 
          developers who want answers fast without creating accounts or sending test emails.
        </p>
      </section>

      {/* Tool #2: Mail-Tester */}
      <section id="mail-tester" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg">2</span>
          Mail-Tester — Best for Email Content Scoring
        </h2>

        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-gray-300" />
          <span className="text-sm text-gray-500 ml-2">Great for newsletter pre-checks</span>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Mail-Tester is the one everyone recommends, and honestly, it&apos;s pretty good. You send 
          an email to a random address they give you, wait 30 seconds, and get a score out of 10. 
          The nice thing is it checks <em>everything</em> — your content, HTML structure, 
          authentication, blacklists, and even SpamAssassin scoring.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          The catch? You only get 3 free checks per day. If you&apos;re iterating on a template, 
          you&apos;ll burn through those fast. I hit the limit within an hour during my testing session.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Pros
            </h4>
            <ul className="text-sm text-green-900 space-y-1">
              <li>• Analyzes actual email content (HTML + text)</li>
              <li>• SpamAssassin score included</li>
              <li>• Beautiful, easy-to-read reports</li>
              <li>• Checks broken links in email body</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Cons
            </h4>
            <ul className="text-sm text-red-900 space-y-1">
              <li>• Only 3 free tests per day</li>
              <li>• Requires sending a real email (can&apos;t just check domain)</li>
              <li>• Results take 30-60 seconds</li>
              <li>• No API for automation</li>
            </ul>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>Best for:</strong> Testing newsletter templates before sending to your full list. 
          Not ideal for quick DNS checks or ongoing monitoring.
        </p>
      </section>

      {/* Tool #3: MXToolbox */}
      <section id="mxtoolbox" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg">3</span>
          MXToolbox — Best for DNS Deep-Dives
        </h2>

        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-gray-300" />
          <span className="text-sm text-gray-500 ml-2">Industry standard, cluttered UI</span>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          MXToolbox has been around forever and it shows — both in the good way (comprehensive, 
          reliable) and the bad way (the UI looks like it was designed in 2012, and there are ads 
          everywhere). But when you need to dig into DNS records, blacklists, or SMTP diagnostics, 
          it&apos;s hard to beat.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          I use it specifically for blacklist checks and MX record diagnostics. For SPF/DKIM/DMARC 
          validation though, the output is technical to the point of being unhelpful if you don&apos;t 
          already know what you&apos;re looking at.
        </p>

        <div className="bg-gray-900 rounded-xl p-5 my-6 overflow-x-auto">
          <p className="text-gray-400 text-sm mb-2 font-mono"># MXToolbox SPF check output (typical)</p>
          <pre className="text-green-400 font-mono text-sm leading-relaxed">
{`$ dig TXT testlab.example.com | grep spf
"v=spf1 include:_spf.google.com include:sendgrid.net ~all"

MXToolbox result:
  SPF Record Found: Pass
  DNS Lookups: 4/10
  All Mechanism: SoftFail (~all)
  WARNING: Consider using -all for stricter policy`}
          </pre>
        </div>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Pros
            </h4>
            <ul className="text-sm text-green-900 space-y-1">
              <li>• Extremely comprehensive DNS toolset</li>
              <li>• Checks 100+ blacklists</li>
              <li>• SMTP diagnostics</li>
              <li>• Free monitoring (limited)</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Cons
            </h4>
            <ul className="text-sm text-red-900 space-y-1">
              <li>• Cluttered interface with lots of ads</li>
              <li>• Results can be overwhelming for beginners</li>
              <li>• Many features locked behind paid plans</li>
              <li>• No content analysis</li>
            </ul>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>Best for:</strong> Sysadmins and experienced devs who need low-level DNS debugging. 
          Not the friendliest for someone who just wants a quick &quot;am I going to spam?&quot; answer.
        </p>
      </section>

      {/* Tool #4: SpamAssassin */}
      <section id="spamassassin" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg">4</span>
          SpamAssassin (Self-Hosted) — Best for CI/CD Integration
        </h2>

        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-gray-300" />
          <span className="text-sm text-gray-500 ml-2">Power user tool</span>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          SpamAssassin isn&apos;t really a &quot;tool you go to&quot; — it&apos;s software you run yourself. 
          But if you want to automate spam score checking in your CI/CD pipeline (which you 
          absolutely should if you&apos;re sending transactional emails), this is the gold standard.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          I have it running in a Docker container that checks our email templates before every deploy. 
          If the spam score exceeds 3.0, the build fails. It&apos;s saved us from shipping spammy 
          templates more than once.
        </p>

        <div className="bg-gray-900 rounded-xl p-5 my-6 overflow-x-auto">
          <p className="text-gray-400 text-sm mb-2 font-mono"># Running SpamAssassin in Docker for CI/CD</p>
          <pre className="text-green-400 font-mono text-sm leading-relaxed">
{`# Dockerfile.spamcheck
FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y spamassassin
COPY test-email.eml /tmp/test-email.eml

# Check spam score
CMD ["spamassassin", "-t", "-e", "3", "/tmp/test-email.eml"]

# In your CI pipeline (GitHub Actions example):
# - name: Check email spam score
#   run: |
#     docker build -f Dockerfile.spamcheck -t spamcheck .
#     docker run --rm spamcheck
#     # Exit code 1 = spam score > 3.0 (build fails)`}
          </pre>
        </div>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Pros
            </h4>
            <ul className="text-sm text-green-900 space-y-1">
              <li>• Completely free and open source</li>
              <li>• Can integrate into CI/CD pipelines</li>
              <li>• Highly configurable scoring rules</li>
              <li>• No rate limits — run as many checks as you want</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Cons
            </h4>
            <ul className="text-sm text-red-900 space-y-1">
              <li>• Requires self-hosting / Docker setup</li>
              <li>• Only checks content, not DNS/authentication</li>
              <li>• Rules can be outdated (need manual updates)</li>
              <li>• Steep learning curve for custom rules</li>
            </ul>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>Best for:</strong> Teams with CI/CD pipelines who want automated spam checking 
          on every deploy. Combine with a DNS checker (like EmailDiag) for full coverage.
        </p>
      </section>

      {/* Tool #5: MailGenius */}
      <section id="mailgenius" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg">5</span>
          MailGenius — Best for Quick Header Analysis
        </h2>

        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-gray-300" />
          <Star className="w-5 h-5 text-gray-300" />
          <span className="text-sm text-gray-500 ml-2">Decent but limited</span>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          MailGenius works similarly to Mail-Tester — send an email, get a report. The interface 
          is cleaner and more modern, but I found it less thorough. It caught my DKIM issue but 
          completely missed the spammy subject line. Also, it kept trying to upsell me on a 
          &quot;deliverability audit&quot; which got annoying fast.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          The one thing it does well is header analysis. If you paste raw email headers, it breaks 
          them down nicely and highlights what&apos;s failing. That&apos;s useful when you&apos;re debugging 
          a specific email that landed in spam.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Pros
            </h4>
            <ul className="text-sm text-green-900 space-y-1">
              <li>• Clean, modern interface</li>
              <li>• Good header breakdown</li>
              <li>• Highlights authentication issues clearly</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Cons
            </h4>
            <ul className="text-sm text-red-900 space-y-1">
              <li>• Missed content spam signals</li>
              <li>• Aggressive upselling</li>
              <li>• Requires email sending (no domain-only check)</li>
              <li>• Limited free tier</li>
            </ul>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>Best for:</strong> One-off header analysis when you have a specific email 
          that landed in spam and want to understand why.
        </p>
      </section>

      {/* Tool #6: GlockApps */}
      <section id="glockapps" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg">6</span>
          GlockApps — Best for Inbox Placement Testing
        </h2>

        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <Star className="w-5 h-5 text-gray-300" />
          <span className="text-sm text-gray-500 ml-2">Powerful but barely free</span>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          GlockApps is the closest thing to a &quot;real&quot; inbox placement test you&apos;ll get 
          for free. It sends your email to seed accounts across Gmail, Outlook, Yahoo, etc., 
          and tells you whether you landed in inbox, spam, or promotions. That&apos;s genuinely 
          useful data you can&apos;t get from authentication checks alone.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          The asterisk: the free tier gives you 2 tests. Total. Ever. After that, plans start at 
          $59/month. So it&apos;s technically free for a quick validation, but not something you&apos;ll 
          use for ongoing monitoring without paying.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Pros
            </h4>
            <ul className="text-sm text-green-900 space-y-1">
              <li>• Actual inbox placement data (not just score)</li>
              <li>• Tests across Gmail, Outlook, Yahoo, etc.</li>
              <li>• Shows which tab you land in (inbox/promo/spam)</li>
              <li>• DMARC analytics included</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <XCircle className="w-4 h-4" /> Cons
            </h4>
            <ul className="text-sm text-red-900 space-y-1">
              <li>• &quot;Free&quot; = 2 tests total, then $59/mo</li>
              <li>• Results take 5-10 minutes</li>
              <li>• Complex setup (multiple seed addresses)</li>
              <li>• Overkill for simple authentication checks</li>
            </ul>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>Best for:</strong> One-time inbox placement validation before a big campaign launch. 
          Not practical as a free daily tool.
        </p>
      </section>

      {/* Comparison Table */}
      <section id="comparison-table" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <span className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-lg">📊</span>
          Side-by-Side Comparison
        </h2>

        <div className="overflow-x-auto my-6">
          <table className="w-full border border-gray-200 rounded-lg text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 border-b font-semibold">Tool</th>
                <th className="text-center p-3 border-b font-semibold">Actually Free?</th>
                <th className="text-center p-3 border-b font-semibold">No Signup?</th>
                <th className="text-center p-3 border-b font-semibold">Speed</th>
                <th className="text-center p-3 border-b font-semibold">Auth Check</th>
                <th className="text-center p-3 border-b font-semibold">Content Check</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-blue-50">
                <td className="p-3 border-b font-medium">EmailDiag</td>
                <td className="p-3 border-b text-center">✅ Unlimited</td>
                <td className="p-3 border-b text-center">✅</td>
                <td className="p-3 border-b text-center">~10s</td>
                <td className="p-3 border-b text-center">✅</td>
                <td className="p-3 border-b text-center">❌</td>
              </tr>
              <tr>
                <td className="p-3 border-b font-medium">Mail-Tester</td>
                <td className="p-3 border-b text-center">⚠️ 3/day</td>
                <td className="p-3 border-b text-center">✅</td>
                <td className="p-3 border-b text-center">~30s</td>
                <td className="p-3 border-b text-center">✅</td>
                <td className="p-3 border-b text-center">✅</td>
              </tr>
              <tr>
                <td className="p-3 border-b font-medium">MXToolbox</td>
                <td className="p-3 border-b text-center">⚠️ Limited</td>
                <td className="p-3 border-b text-center">✅</td>
                <td className="p-3 border-b text-center">~5s</td>
                <td className="p-3 border-b text-center">✅</td>
                <td className="p-3 border-b text-center">❌</td>
              </tr>
              <tr>
                <td className="p-3 border-b font-medium">SpamAssassin</td>
                <td className="p-3 border-b text-center">✅ Unlimited</td>
                <td className="p-3 border-b text-center">N/A (self-host)</td>
                <td className="p-3 border-b text-center">~2s</td>
                <td className="p-3 border-b text-center">❌</td>
                <td className="p-3 border-b text-center">✅</td>
              </tr>
              <tr>
                <td className="p-3 border-b font-medium">MailGenius</td>
                <td className="p-3 border-b text-center">⚠️ Limited</td>
                <td className="p-3 border-b text-center">❌</td>
                <td className="p-3 border-b text-center">~45s</td>
                <td className="p-3 border-b text-center">✅</td>
                <td className="p-3 border-b text-center">⚠️ Partial</td>
              </tr>
              <tr>
                <td className="p-3 border-b font-medium">GlockApps</td>
                <td className="p-3 border-b text-center">❌ 2 tests only</td>
                <td className="p-3 border-b text-center">❌</td>
                <td className="p-3 border-b text-center">~5min</td>
                <td className="p-3 border-b text-center">✅</td>
                <td className="p-3 border-b text-center">✅</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* My Workflow */}
      <section className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <Zap className="w-8 h-8 text-yellow-500" />
          My Actual Workflow (What I Use Daily)
        </h2>

        <p className="text-gray-700 leading-relaxed mb-4">
          After testing all of these, here&apos;s what my workflow actually looks like:
        </p>

        <div className="bg-gray-900 rounded-xl p-5 my-6 overflow-x-auto">
          <p className="text-gray-400 text-sm mb-2 font-mono"># My email deliverability testing workflow</p>
          <pre className="text-green-400 font-mono text-sm leading-relaxed">
{`1. Before sending: EmailDiag (quick auth check, 10 sec)
   → Catches SPF/DKIM/DMARC issues instantly

2. Before campaign: Mail-Tester (content + auth, 30 sec)
   → Catches spammy content, broken HTML, bad links

3. In CI/CD: SpamAssassin (automated, every deploy)
   → Fails build if spam score > 3.0

4. Monthly: GlockApps (inbox placement, use free trial wisely)
   → Validates actual Gmail/Outlook inbox placement

# Pro tip: Start with step 1. Fix auth issues first.
# Most spam problems are authentication, not content.`}
          </pre>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          The key insight I&apos;ve learned: <strong>80% of spam issues are authentication problems, 
          not content problems</strong>. A broken DKIM key or missing SPF include will tank your 
          deliverability way faster than using the word &quot;free&quot; in your subject line. That&apos;s 
          why I start with a quick authentication check every time.
        </p>
      </section>

      {/* Verdict */}
      <section id="verdict" className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-500" />
          My Recommendation
        </h2>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <p className="text-gray-800 leading-relaxed mb-4">
            <strong>If you only use one tool:</strong> Start with <a href="https://www.emaildiag.com/test" className="text-blue-600 hover:underline font-medium">EmailDiag</a>. 
            It&apos;s instant, free with no limits, and catches the issues that matter most 
            (broken authentication). No signup, no sending test emails, no waiting. Just type 
            your domain and see what&apos;s wrong.
          </p>
          <p className="text-gray-800 leading-relaxed mb-4">
            <strong>If you want full coverage:</strong> Combine EmailDiag (auth) + Mail-Tester (content) + 
            SpamAssassin in CI (automated). That covers all the angles without spending a dime.
          </p>
          <p className="text-gray-800 leading-relaxed">
            <strong>If you&apos;re sending big campaigns:</strong> Add GlockApps for inbox placement 
            testing before your first send. Those 2 free tests are worth gold if you use them at 
            the right moment.
          </p>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          Honestly, the biggest mistake I see people make isn&apos;t choosing the wrong tool — 
          it&apos;s not testing at all. Set up any kind of regular check and you&apos;ll catch problems 
          before your users start complaining. Your future self will thank you.
        </p>
      </section>

      {/* Final CTA */}
      <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
        <div className="flex items-start gap-4">
          <div className="text-4xl">⚡</div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Ready to check your email setup?</h3>
            <p className="text-blue-100 mb-4">
              Run a free spam check on your domain right now. Takes 10 seconds, no signup needed. 
              If something&apos;s broken, you&apos;ll know exactly what to fix.
            </p>
            <Link 
              href="/test"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Check My Domain Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Can a spam checker guarantee my emails won&apos;t go to spam?</h3>
            <p className="text-gray-700 leading-relaxed">
              No. These tools check for known issues (authentication, content triggers, blacklists), 
              but Gmail and Outlook use engagement signals too — open rates, reply rates, user 
              complaints. A tool can tell you if something&apos;s technically wrong, but inbox 
              placement ultimately depends on recipient behavior too.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">How often should I run a free email spam test?</h3>
            <p className="text-gray-700 leading-relaxed">
              At minimum: after every DNS change, ESP switch, or template update. Ideally: weekly 
              for authentication checks (takes 10 seconds with EmailDiag) and before every major 
              campaign for content checks.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Is my email spam score the same across all providers?</h3>
            <p className="text-gray-700 leading-relaxed">
              No. Gmail, Outlook, and Yahoo each have different algorithms. An email scoring 
              9/10 on Mail-Tester might still land in Gmail&apos;s promotions tab because of engagement 
              history. Spam score is a useful signal, not a guarantee.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
