import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin, Link as LinkIcon, CheckCircle, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

// Blog post content - in production, this would be loaded from MDX/CMS
const blogPostsContent: Record<string, {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: string;
  content: string;
}> = {
  'why-emails-going-to-spam': {
    title: 'Why Are My Emails Going to Spam? (2026 Complete Guide)',
    description: 'Discover the 12 most common reasons your emails land in spam and learn exactly how to fix each one. Complete guide with step-by-step solutions for 2026.',
    date: '2026-03-27',
    author: 'EmailDiag Team',
    category: 'Email Deliverability',
    tags: ['spam', 'email deliverability', 'SPF', 'DKIM', 'DMARC', 'email authentication'],
    readingTime: '15 min read',
    content: `
## Quick Diagnosis: Is Your Email Configuration the Problem?

Before diving into the details, let's run a quick check. **Use our free Email Deliverability Checker** to instantly see if your domain has any configuration issues.

The tool will check:
- ✅ SPF record
- ✅ DKIM signature
- ✅ DMARC policy
- ✅ Blacklist status
- ✅ MX records

---

## The 12 Reasons Your Emails Go to Spam

### 1. Missing or Incorrect SPF Record

**What is SPF?**

SPF (Sender Policy Framework) is like a guest list for your email. It tells receiving servers: "These are the only servers allowed to send emails from my domain."

Without SPF, anyone can pretend to send emails from your domain. Email providers don't trust emails from domains without SPF.

**How to fix:**

Add a TXT record to your DNS:

\`\`\`
v=spf1 include:_spf.google.com include:sendgrid.net -all
\`\`\`

**Key tips:**
- Only have ONE SPF record (multiple records = failure)
- Use \`-all\` (hard fail) instead of \`~all\` (soft fail) for better security
- Stay under 10 DNS lookups

---

### 2. No DKIM Signature

**What is DKIM?**

DKIM (DomainKeys Identified Mail) adds a digital signature to your emails. It proves:
1. The email actually came from your domain
2. The content wasn't modified in transit

Think of it as a tamper-proof seal on your emails.

**How to fix:**

DKIM setup varies by email provider. Check your email provider's documentation for specific instructions.

**Key tips:**
- Use 2048-bit keys (1024-bit is outdated)
- Each email service needs its own DKIM record

---

### 3. No DMARC Policy

**What is DMARC?**

DMARC (Domain-based Message Authentication, Reporting & Conformance) ties SPF and DKIM together. It tells email providers:
- What to do when authentication fails
- Where to send reports about email authentication

**How to fix:**

Add this TXT record to \`_dmarc.yourdomain.com\`:

\`\`\`
v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com; pct=100
\`\`\`

**DMARC policy progression:**
1. Start with \`p=none\` - Monitor only
2. Move to \`p=quarantine\` - Send failures to spam
3. Finally \`p=reject\` - Block failures completely

---

### 4. Your IP Address is Blacklisted

**What are blacklists?**

Blacklists (DNSBLs) are databases of IP addresses known to send spam. If your sending IP is listed, your emails may be blocked or sent to spam.

**How to get delisted:**
1. Identify the cause - Check your sending logs
2. Fix the issue - Clean your list, secure your server
3. Request removal - Visit each blacklist's website
4. Wait - Some blacklists auto-remove after 24-48 hours

---

### 5. Poor Sender Reputation

**What is sender reputation?**

Email providers track your sending behavior and assign a "reputation score." Poor reputation = spam folder.

**Factors that affect reputation:**
- Bounce rate (emails to invalid addresses)
- Spam complaint rate
- Engagement (opens, clicks, replies)
- Sending volume consistency
- Authentication (SPF, DKIM, DMARC)

**How to improve:**
1. Clean your email list regularly
2. Use double opt-in
3. Make unsubscribing easy
4. Maintain consistent sending volume

---

### 6. Spammy Email Content

Even with perfect authentication, your content can trigger spam filters.

**Common content triggers:**
- ALL CAPS subject lines
- Excessive punctuation (!!!)
- Spam trigger words ("Free", "Winner", "Act now")
- Too many images, not enough text
- Suspicious links
- Missing unsubscribe link

---

### 7. Missing Physical Address

In the US (CAN-SPAM) and EU (GDPR), commercial emails must include:
- Your physical mailing address
- Clear identification of the sender
- Unsubscribe mechanism

---

### 8. Sending from Free Email Accounts

Using \`@gmail.com\` or \`@yahoo.com\` for business emails? That's a red flag for spam filters.

**How to fix:**
1. Get a custom domain
2. Set up Google Workspace or Microsoft 365
3. Configure SPF, DKIM, DMARC

---

### 9. Purchased or Scraped Email Lists

This is the fastest way to the spam folder. Build your list organically instead.

---

### 10. High Bounce Rate

Keep bounce rate under 2%. Remove bounced addresses immediately.

---

### 11. Inconsistent Sending Patterns

Warm up new domains/IPs gradually. Maintain consistent daily/weekly sending.

---

### 12. Technical Issues

Other problems: broken HTML, missing plain-text version, invalid headers, wrong MIME type.

---

## Checklist: Email Deliverability Best Practices

- ☐ SPF record configured with -all
- ☐ DKIM enabled (2048-bit key)
- ☐ DMARC policy set (at least p=none)
- ☐ Not on any blacklists
- ☐ Custom domain (not @gmail.com)
- ☐ Physical address in footer
- ☐ Unsubscribe link present
- ☐ Bounce rate under 2%
- ☐ Complaint rate under 0.1%
- ☐ Consistent sending volume
- ☐ Clean, permission-based list

---

## Conclusion

Email deliverability isn't magic—it's configuration. Start by checking your domain with our free tool. Fix what it finds. Then monitor your sender reputation over time.

Your emails will be back in the inbox before you know it.
    `,
  },
};

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPostsContent[params.slug];
  
  if (!post) {
    return {
      title: 'Post Not Found | EmailDiag Blog',
    };
  }

  return {
    title: `${post.title} | EmailDiag Blog`,
    description: post.description,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.emaildiag.com/blog/${params.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    alternates: {
      canonical: `https://www.emaildiag.com/blog/${params.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(blogPostsContent).map((slug) => ({
    slug,
  }));
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPostsContent[params.slug];

  if (!post) {
    notFound();
  }

  // Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'EmailDiag',
      url: 'https://www.emaildiag.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.emaildiag.com/blog/${params.slug}`,
    },
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
        <div className="py-4 px-4 bg-gray-50 border-b">
          <div className="max-w-3xl mx-auto flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-600">Blog</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium truncate">{post.title}</span>
          </div>
        </div>

        {/* Article Header */}
        <header className="py-12 px-4 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readingTime}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              {post.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Banner */}
            <div className="p-6 bg-blue-600 rounded-2xl text-white">
              <p className="font-semibold mb-2">🔍 Quick Diagnosis</p>
              <p className="text-blue-100 mb-4">
                Check your domain's email configuration instantly with our free tool.
              </p>
              <Link 
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Check Your Domain <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg prose-gray max-w-none
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900
                prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:text-gray-100
                prose-ul:list-disc prose-ul:pl-6
                prose-ol:list-decimal prose-ol:pl-6
                prose-li:text-gray-700
                prose-hr:my-8
              "
              dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
            />
          </div>
        </article>

        {/* Share & Related */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            {/* Share */}
            <div className="flex items-center gap-4 mb-12">
              <span className="text-gray-600 font-medium">Share this article:</span>
              <div className="flex gap-2">
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://www.emaildiag.com/blog/${params.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-gray-600" />
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.emaildiag.com/blog/${params.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-gray-600" />
                </a>
              </div>
            </div>

            {/* Related Tools */}
            <div className="bg-white rounded-2xl p-8 border">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Related Tools</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/tools/spf-checker" className="p-4 border rounded-xl hover:border-blue-400 transition-colors">
                  <h4 className="font-semibold text-gray-800 mb-1">SPF Checker</h4>
                  <p className="text-sm text-gray-500">Validate your SPF record configuration</p>
                </Link>
                <Link href="/tools/dkim-checker" className="p-4 border rounded-xl hover:border-blue-400 transition-colors">
                  <h4 className="font-semibold text-gray-800 mb-1">DKIM Checker</h4>
                  <p className="text-sm text-gray-500">Verify DKIM signatures and keys</p>
                </Link>
                <Link href="/tools/dmarc-checker" className="p-4 border rounded-xl hover:border-blue-400 transition-colors">
                  <h4 className="font-semibold text-gray-800 mb-1">DMARC Checker</h4>
                  <p className="text-sm text-gray-500">Analyze your DMARC policy</p>
                </Link>
                <Link href="/tools/blacklist-check" className="p-4 border rounded-xl hover:border-blue-400 transition-colors">
                  <h4 className="font-semibold text-gray-800 mb-1">Blacklist Checker</h4>
                  <p className="text-sm text-gray-500">Scan 50+ email blacklists</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Blog */}
        <section className="py-8 px-4">
          <div className="max-w-3xl mx-auto">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t bg-gray-50">
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

// Simple markdown-like formatting
function formatContent(content: string): string {
  return content
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>')
    .replace(/^---$/gim, '<hr />')
    .replace(/\n\n/g, '</p><p>')
    .replace(/- ☐/g, '☐ ')
    .replace(/- ✅/g, '✅ ');
}
