import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Twitter, Linkedin, CheckCircle, XCircle, AlertTriangle, ArrowRight, ExternalLink } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

type Props = {
  params: { slug: string };
};

// Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (params.slug === 'why-emails-going-to-spam') {
    return {
      title: 'Why Are My Emails Going to Spam? (2026 Complete Guide) | EmailDiag',
      description: 'Frustrated that your emails keep landing in spam? This guide covers the 12 most common reasons and exactly how to fix each one. Written by deliverability experts.',
      keywords: 'why emails go to spam, email spam fix, email deliverability, SPF, DKIM, DMARC, spam folder fix',
      authors: [{ name: 'Mike Chen' }],
      openGraph: {
        title: 'Why Are My Emails Going to Spam? (2026 Complete Guide)',
        description: 'The definitive guide to fixing email deliverability issues. 12 common problems and their solutions.',
        url: 'https://www.emaildiag.com/blog/why-emails-going-to-spam',
        type: 'article',
        publishedTime: '2026-03-27',
        images: ['/blog/spam-guide-cover.png'],
      },
      alternates: {
        canonical: 'https://www.emaildiag.com/blog/why-emails-going-to-spam',
      },
    };
  }
  return { title: 'Blog | EmailDiag' };
}

export async function generateStaticParams() {
  return [{ slug: 'why-emails-going-to-spam' }];
}

export default function BlogPostPage({ params }: Props) {
  if (params.slug !== 'why-emails-going-to-spam') {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Why Are My Emails Going to Spam? (2026 Complete Guide)',
    description: 'The definitive guide to fixing email deliverability issues.',
    datePublished: '2026-03-27',
    dateModified: '2026-03-27',
    author: { '@type': 'Person', name: 'Mike Chen', jobTitle: 'Email Deliverability Specialist' },
    publisher: { '@type': 'Organization', name: 'EmailDiag', url: 'https://www.emaildiag.com' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen bg-white">
        <Navbar />

        {/* Breadcrumb */}
        <nav className="py-3 px-4 bg-gray-50 border-b text-sm">
          <div className="max-w-3xl mx-auto flex items-center gap-2 text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-600">Blog</Link>
            <span>/</span>
            <span className="text-gray-700">Spam Guide</span>
          </div>
        </nav>

        {/* Article Header */}
        <header className="pt-12 pb-8 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">
                Email Deliverability
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                March 27, 2026
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                12 min read
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Why Are My Emails Going to Spam?
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Look, I get it. You spent 30 minutes crafting the perfect email, hit send, and... crickets. 
              No reply. No click. Later you find out it's been rotting in the spam folder the whole time. 
              <strong className="text-gray-800"> It's infuriating.</strong>
            </p>

            {/* Author */}
            <div className="flex items-center gap-4 pb-8 border-b">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                MC
              </div>
              <div>
                <p className="font-medium text-gray-900">Mike Chen</p>
                <p className="text-sm text-gray-500">Email Deliverability Specialist · 8 years in the trenches</p>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="px-4 pb-16">
          <div className="max-w-3xl mx-auto">
            
            {/* Intro */}
            <div className="prose-section">
              <p>
                Here's the thing: <strong>about 45% of all emails worldwide get flagged as spam</strong>. 
                That's not a typo. Almost half. So if your emails are ending up there, you're definitely not alone.
              </p>
              <p>
                But here's the good news — most spam issues are totally fixable. I've helped hundreds of companies 
                dig their way out of the spam folder, and it usually comes down to the same handful of problems.
              </p>
              <p>
                In this guide, I'll walk you through the 12 most common reasons emails go to spam, 
                and more importantly, <em>exactly how to fix each one</em>.
              </p>
            </div>

            {/* Quick Check CTA */}
            <div className="my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🔍</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Before we dive in — let's do a quick health check</h3>
                  <p className="text-blue-100 mb-4">
                    Run your domain through our free checker. It takes 10 seconds and will tell you immediately if you have any obvious configuration issues.
                  </p>
                  <Link 
                    href="/"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Check My Domain <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Table of Contents */}
            <div className="my-10 p-6 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-4">What we'll cover:</h3>
              <div className="grid md:grid-cols-2 gap-2 text-sm">
                <a href="#spf" className="text-blue-600 hover:underline">1. Missing SPF record</a>
                <a href="#dkim" className="text-blue-600 hover:underline">2. No DKIM signature</a>
                <a href="#dmarc" className="text-blue-600 hover:underline">3. No DMARC policy</a>
                <a href="#blacklist" className="text-blue-600 hover:underline">4. IP blacklisted</a>
                <a href="#reputation" className="text-blue-600 hover:underline">5. Poor sender reputation</a>
                <a href="#content" className="text-blue-600 hover:underline">6. Spammy content</a>
                <a href="#address" className="text-blue-600 hover:underline">7. Missing physical address</a>
                <a href="#free-email" className="text-blue-600 hover:underline">8. Using free email accounts</a>
                <a href="#purchased-lists" className="text-blue-600 hover:underline">9. Purchased email lists</a>
                <a href="#bounces" className="text-blue-600 hover:underline">10. High bounce rate</a>
                <a href="#patterns" className="text-blue-600 hover:underline">11. Inconsistent sending</a>
                <a href="#technical" className="text-blue-600 hover:underline">12. Technical issues</a>
              </div>
            </div>

            {/* Section 1: SPF */}
            <section id="spf" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
                <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">1</span>
                Missing or Broken SPF Record
              </h2>
              
              <p className="mb-4">
                This is probably the #1 reason I see emails going to spam. And honestly? It's the easiest to fix.
              </p>

              <div className="my-6 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                <p className="font-medium text-amber-800 mb-2">What's SPF in plain English?</p>
                <p className="text-amber-700">
                  Think of SPF as a guest list for your email. It's a public record that says: "Hey email servers, 
                  these are the <em>only</em> servers allowed to send emails on my behalf. Anyone else is an imposter."
                </p>
              </div>

              <p className="mb-4">
                Without SPF, any random server on the internet can send emails pretending to be you. 
                Email providers know this, so they treat emails from domains without SPF with extreme suspicion.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">How to fix it:</h3>
              
              <p className="mb-4">
                You need to add a TXT record to your domain's DNS. Here's a typical example:
              </p>

              <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <code>v=spf1 include:_spf.google.com include:sendgrid.net -all</code>
              </div>

              <p className="mb-4">Let me break that down:</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><code className="bg-gray-100 px-1 rounded">v=spf1</code> — This is an SPF record (required)</li>
                <li><code className="bg-gray-100 px-1 rounded">include:_spf.google.com</code> — Google Workspace can send as me</li>
                <li><code className="bg-gray-100 px-1 rounded">include:sendgrid.net</code> — SendGrid can send as me</li>
                <li><code className="bg-gray-100 px-1 rounded">-all</code> — Everyone else? Reject them.</li>
              </ul>

              <div className="my-6 p-5 bg-red-50 border border-red-200 rounded-xl">
                <p className="font-semibold text-red-800 flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5" /> Common mistake
                </p>
                <p className="text-red-700">
                  Having multiple SPF records. You can only have ONE. If you have two, spam filters will randomly pick one, 
                  and half your emails will fail authentication. I've seen this break email for entire companies.
                </p>
              </div>

              <p className="mb-4">
                <strong>Quick check:</strong> <Link href="/tools/spf-checker" className="text-blue-600 hover:underline">Run your domain through our SPF checker →</Link>
              </p>
            </section>

            {/* Section 2: DKIM */}
            <section id="dkim" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
                <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">2</span>
                No DKIM Signature
              </h2>
              
              <p className="mb-4">
                DKIM is like a tamper-proof seal on your emails. It adds a cryptographic signature that proves 
                two things: (1) the email really came from you, and (2) nobody messed with it in transit.
              </p>

              <div className="my-6 p-5 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                <p className="text-blue-800">
                  <strong>Real talk:</strong> DKIM is a bit more annoying to set up than SPF because it involves 
                  generating keys and configuring your mail server. But it's worth it — many email providers 
                  will straight-up spam emails without DKIM signatures.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Setup depends on your email provider:</h3>
              
              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="font-semibold text-gray-800 mb-2">Google Workspace</p>
                  <p className="text-sm text-gray-600">Admin Console → Apps → Gmail → Authenticate email</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="font-semibold text-gray-800 mb-2">Microsoft 365</p>
                  <p className="text-sm text-gray-600">Defender Portal → Email authentication → DKIM</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="font-semibold text-gray-800 mb-2">SendGrid</p>
                  <p className="text-sm text-gray-600">Settings → Sender Authentication → Domain</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="font-semibold text-gray-800 mb-2">Mailchimp</p>
                  <p className="text-sm text-gray-600">Settings → Domains → Verify a domain</p>
                </div>
              </div>

              <p className="mb-4">
                <strong>Pro tip:</strong> Use 2048-bit keys. Some older guides recommend 1024-bit, but those are 
                considered weak now. Most providers have switched to 2048-bit as the default.
              </p>

              <p className="mb-4">
                <strong>Quick check:</strong> <Link href="/tools/dkim-checker" className="text-blue-600 hover:underline">Verify your DKIM configuration →</Link>
              </p>
            </section>

            {/* Section 3: DMARC */}
            <section id="dmarc" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
                <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">3</span>
                No DMARC Policy
              </h2>
              
              <p className="mb-4">
                DMARC ties SPF and DKIM together and tells email providers what to do when something fails. 
                Without it, you're leaving the decision entirely up to them — and they tend to err on the side of spam.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Start with monitoring mode:</h3>
              
              <p className="mb-4">
                Add this TXT record at <code className="bg-gray-100 px-1 rounded">_dmarc.yourdomain.com</code>:
              </p>

              <div className="my-4 bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <code>v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com; pct=100</code>
              </div>

              <p className="mb-4">
                The <code className="bg-gray-100 px-1 rounded">p=none</code> means "just report problems, don't take action yet." 
                This is important — you want to collect data first before you start blocking emails.
              </p>

              <div className="my-6 p-5 bg-green-50 border border-green-200 rounded-xl">
                <p className="font-semibold text-green-800 flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5" /> The right way to roll out DMARC
                </p>
                <ol className="list-decimal pl-5 space-y-1 text-green-700">
                  <li><strong>Week 1-4:</strong> Start with <code className="bg-green-100 px-1 rounded">p=none</code>, collect reports</li>
                  <li><strong>Week 5-8:</strong> Move to <code className="bg-green-100 px-1 rounded">p=quarantine</code> (sends failures to spam)</li>
                  <li><strong>Week 9+:</strong> Once confident, switch to <code className="bg-green-100 px-1 rounded">p=reject</code> (blocks failures)</li>
                </ol>
              </div>

              <p className="mb-4">
                <strong>Quick check:</strong> <Link href="/tools/dmarc-checker" className="text-blue-600 hover:underline">Check your DMARC policy →</Link>
              </p>
            </section>

            {/* Section 4: Blacklist */}
            <section id="blacklist" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
                <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">4</span>
                Your IP is Blacklisted
              </h2>
              
              <p className="mb-4">
                If you're on a blacklist, your emails might not even make it to the spam folder — 
                they could be blocked entirely. This is serious, but it's also fixable.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Why does this happen?</h3>
              
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Sending to a purchased or scraped email list</li>
                <li>High bounce rates (lots of invalid addresses)</li>
                <li>Too many spam complaints</li>
                <li>Your email account or server got hacked</li>
                <li>You're on a shared IP with other bad senders</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">How to get off a blacklist:</h3>
              
              <ol className="list-decimal pl-6 space-y-2 mb-6">
                <li><strong>First, figure out WHY you got listed.</strong> Check your sending logs for unusual activity.</li>
                <li><strong>Fix the underlying issue.</strong> Clean your list, secure your server, whatever it takes.</li>
                <li><strong>Request removal.</strong> Each blacklist has their own process — you'll need to visit their website.</li>
                <li><strong>Wait.</strong> Some blacklists (like SpamCop) auto-remove after 24 hours if you stop the bad behavior.</li>
              </ol>

              <p className="mb-4">
                <strong>Quick check:</strong> <Link href="/tools/blacklist-check" className="text-blue-600 hover:underline">Scan 50+ blacklists instantly →</Link>
              </p>
            </section>

            {/* Section 5: Reputation */}
            <section id="reputation" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
                <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">5</span>
                Poor Sender Reputation
              </h2>
              
              <p className="mb-4">
                Every email provider tracks your sending behavior and gives you a "reputation score." 
                It's like a credit score for email. Low score = spam folder.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">What affects your reputation?</h3>
              
              <div className="my-6 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-3 border">Factor</th>
                      <th className="text-left p-3 border">Target</th>
                      <th className="text-left p-3 border">Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border">Bounce rate</td>
                      <td className="p-3 border">&lt; 2%</td>
                      <td className="p-3 border text-red-600">High</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-3 border">Spam complaint rate</td>
                      <td className="p-3 border">&lt; 0.1%</td>
                      <td className="p-3 border text-red-600">Very High</td>
                    </tr>
                    <tr>
                      <td className="p-3 border">Engagement (opens, clicks)</td>
                      <td className="p-3 border">Higher = better</td>
                      <td className="p-3 border text-yellow-600">Medium</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-3 border">Authentication</td>
                      <td className="p-3 border">SPF + DKIM + DMARC</td>
                      <td className="p-3 border text-red-600">High</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">How to check your reputation:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><a href="https://postmaster.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Postmaster Tools</a> — For Gmail reputation</li>
                <li><a href="https://sendersupport.olc.protection.outlook.com/snds/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Microsoft SNDS</a> — For Outlook reputation</li>
              </ul>
            </section>

            {/* Section 6: Content */}
            <section id="content" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
                <span className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-lg font-bold">6</span>
                Spammy Email Content
              </h2>
              
              <p className="mb-4">
                Even with perfect authentication, your content can trigger spam filters. Here are the biggest red flags:
              </p>

              <div className="my-6 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-xl">
                  <p className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5" /> Don't do this
                  </p>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li>• "FREE MONEY NOW!!!"</li>
                    <li>• "ACT NOW - Limited time!!!"</li>
                    <li>• "You've been selected..."</li>
                    <li>• "Click here" (with misleading link)</li>
                    <li>• All-image emails</li>
                    <li>• Tiny unsubscribe link</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-xl">
                  <p className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" /> Do this instead
                  </p>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• "Your weekly update"</li>
                    <li>• "Complete your order"</li>
                    <li>• "Thanks for signing up"</li>
                    <li>• Clear, honest links</li>
                    <li>• 60/40 text-to-image ratio</li>
                    <li>• Prominent unsubscribe</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Sections 7-12 (shorter) */}
            <section id="address" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
                <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">7</span>
                Missing Physical Address
              </h2>
              <p className="mb-4">
                The CAN-SPAM Act (US) and GDPR (EU) require commercial emails to include a physical mailing address. 
                Missing it isn't just illegal — it's also a spam signal. Always include it in your footer.
              </p>
            </section>

            <section id="free-email" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
                <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">8</span>
                Sending from @gmail.com
              </h2>
              <p className="mb-4">
                Using <code className="bg-gray-100 px-1 rounded">your.business@gmail.com</code> for business emails? 
                Big red flag. You can't properly configure SPF/DKIM for free email domains. Get a custom domain — it's like $12/year.
              </p>
            </section>

            <section id="purchased-lists" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
                <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">9</span>
                Purchased Email Lists
              </h2>
              <p className="mb-4">
                I'll be blunt: <strong>never buy email lists</strong>. They're full of spam traps (fake addresses designed to catch spammers), 
                invalid addresses, and people who will report you. It's the fastest way to destroy your sender reputation.
              </p>
            </section>

            <section id="bounces" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
                <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">10</span>
                High Bounce Rate
              </h2>
              <p className="mb-4">
                Keep your bounce rate under 2%. Above 5%? You're in trouble. 
                Remove hard bounces immediately and clean inactive subscribers every few months.
              </p>
            </section>

            <section id="patterns" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
                <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">11</span>
                Inconsistent Sending Patterns
              </h2>
              <p className="mb-4">
                Going from 100 emails/day to 10,000 overnight looks suspicious. 
                Warm up new domains gradually — start small and increase volume over 2-4 weeks.
              </p>
            </section>

            <section id="technical" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-6 pb-3 border-b flex items-center gap-3">
                <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-lg font-bold">12</span>
                Technical Issues
              </h2>
              <p className="mb-4">
                Less common but still important: broken HTML, missing plain-text version, invalid headers, 
                wrong MIME types. Test your emails across different clients before sending.
              </p>
            </section>

            {/* Checklist */}
            <section className="my-16 p-8 bg-gray-900 text-white rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">✅ Quick Checklist</h2>
              <p className="text-gray-300 mb-6">Before you send your next email, make sure you've got these covered:</p>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span>SPF record with -all</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span>DKIM enabled (2048-bit)</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span>DMARC policy set</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span>Not on blacklists</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span>Custom domain</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span>Physical address in footer</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span>Clear unsubscribe link</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span>Bounce rate under 2%</span>
                </label>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">The Bottom Line</h2>
              <p className="mb-4">
                Email deliverability isn't some dark art — it's mostly just configuration. 
                The vast majority of spam problems come down to three things:
              </p>
              <ol className="list-decimal pl-6 space-y-2 mb-6">
                <li><strong>Missing authentication</strong> (SPF, DKIM, DMARC)</li>
                <li><strong>Poor list hygiene</strong> (bounces, complaints)</li>
                <li><strong>Spammy content</strong> (trigger words, shady links)</li>
              </ol>
              <p className="mb-4">
                Start by <Link href="/" className="text-blue-600 hover:underline font-medium">checking your domain</Link> with 
                our free tool. Fix what it finds. Then keep an eye on your sender reputation over time.
              </p>
              <p className="text-lg font-medium text-gray-800">
                Your emails will be back in the inbox before you know it. 📬
              </p>
            </section>

            {/* Final CTA */}
            <div className="my-12 p-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl text-white text-center">
              <h3 className="text-2xl font-bold mb-3">Ready to fix your email deliverability?</h3>
              <p className="text-green-100 mb-6">
                Run a free check on your domain — it takes 10 seconds.
              </p>
              <Link 
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-colors"
              >
                Check My Domain Now <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

          </div>
        </article>

        {/* Share & Related */}
        <section className="py-12 px-4 bg-gray-50 border-t">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="text-gray-600 font-medium">Share:</span>
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Great guide on fixing email deliverability issues')}&url=${encodeURIComponent('https://www.emaildiag.com/blog/why-emails-going-to-spam')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white border rounded-lg hover:bg-gray-50 hover:border-blue-400 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-gray-600" />
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://www.emaildiag.com/blog/why-emails-going-to-spam')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white border rounded-lg hover:bg-gray-50 hover:border-blue-400 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-gray-600" />
                </a>
              </div>
              <Link 
                href="/blog"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> All articles
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 border">
              <h3 className="text-xl font-bold text-gray-800 mb-6">🛠️ Related Tools</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/tools/spf-checker" className="group p-4 border rounded-xl hover:border-blue-400 hover:shadow-md transition-all">
                  <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 mb-1">SPF Checker</h4>
                  <p className="text-sm text-gray-500">Validate your SPF record</p>
                </Link>
                <Link href="/tools/dkim-checker" className="group p-4 border rounded-xl hover:border-blue-400 hover:shadow-md transition-all">
                  <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 mb-1">DKIM Checker</h4>
                  <p className="text-sm text-gray-500">Verify DKIM signatures</p>
                </Link>
                <Link href="/tools/dmarc-checker" className="group p-4 border rounded-xl hover:border-blue-400 hover:shadow-md transition-all">
                  <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 mb-1">DMARC Checker</h4>
                  <p className="text-sm text-gray-500">Analyze your DMARC policy</p>
                </Link>
                <Link href="/tools/blacklist-check" className="group p-4 border rounded-xl hover:border-blue-400 hover:shadow-md transition-all">
                  <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 mb-1">Blacklist Checker</h4>
                  <p className="text-sm text-gray-500">Scan 50+ blacklists</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">© 2026 EmailDiag. The friendliest free email deliverability tool.</p>
              <div className="flex gap-6 text-sm text-gray-500">
                <Link href="/about" className="hover:text-blue-600">About</Link>
                <Link href="/privacy" className="hover:text-blue-600">Privacy</Link>
                <Link href="/terms" className="hover:text-blue-600">Terms</Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
