// Blog article metadata registry
export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  keywords: string;
  author: string;
  authorBio: string;
  category: string;
  categoryColor: string;
  date: string;
  readingTime: string;
  featured?: boolean;
}

export const blogArticles: BlogArticle[] = [
  {
    slug: 'why-emails-going-to-spam',
    title: 'Why Are My Emails Going to Spam? (2026 Complete Guide)',
    description: 'Frustrated that your emails keep landing in spam? This guide covers the 12 most common reasons and exactly how to fix each one. Written by deliverability experts.',
    keywords: 'why emails go to spam, email spam fix, email deliverability, SPF, DKIM, DMARC, spam folder fix',
    author: 'Mike Chen',
    authorBio: 'Email Deliverability Specialist · 8 years in the trenches',
    category: 'Email Deliverability',
    categoryColor: 'red',
    date: '2026-03-27',
    readingTime: '12 min read',
    featured: true,
  },
  {
    slug: 'spf-dkim-set-but-not-found',
    title: 'SPF and DKIM Set But "Record Not Found"? Here\'s the Fix',
    description: 'Configured SPF and DKIM but still getting "record not found" errors? I spent 2 hours debugging this exact issue. Here\'s what actually worked.',
    keywords: 'SPF record not found, DKIM not found, DNS propagation, email authentication, SPF setup, DKIM setup',
    author: 'Mike Chen',
    authorBio: 'Been debugging email configs since 2015. Still get tripped up sometimes.',
    category: 'Troubleshooting',
    categoryColor: 'orange',
    date: '2026-03-27',
    readingTime: '8 min read',
  },
  {
    slug: 'dmarc-policy-not-found',
    title: '"DMARC Policy Not Found" Error? Here\'s the Complete Fix',
    description: 'Keep seeing "DMARC policy not found" in your email headers? I\'ll show you exactly how to fix this in under 10 minutes. Step-by-step guide with copy-paste DNS records.',
    keywords: 'DMARC policy not found, DMARC setup, DMARC record, DMARC error fix, email authentication, dmarc=none fix',
    author: 'Mike Chen',
    authorBio: 'Fixed this exact error for dozens of clients. It\'s easier than you think.',
    category: 'Troubleshooting',
    categoryColor: 'orange',
    date: '2026-03-31',
    readingTime: '10 min read',
  },
  {
    slug: 'spf-lookup-limit-exceeded',
    title: '"SPF Lookup Limit Exceeded" Error? Here\'s How I Fixed It',
    description: 'Getting the dreaded "SPF lookup limit exceeded (10/10)" error? I\'ll show you exactly how to flatten your SPF record and get back under the 10-lookup limit. Real fix, tested on 20+ domains.',
    keywords: 'SPF lookup limit exceeded, SPF too many lookups, SPF 10 lookup limit, SPF flatten, SPF record fix, SPF permerror',
    author: 'Mike Chen',
    authorBio: 'Spent way too many hours counting SPF lookups. Now I automate it.',
    category: 'Troubleshooting',
    categoryColor: 'orange',
    date: '2026-04-03',
    readingTime: '10 min read',
  },
  {
    slug: 'dkim-signature-verification-failed',
    title: '"DKIM Signature Verification Failed"? Here\'s How to Fix It',
    description: 'Seeing "dkim=fail" or "DKIM signature verification failed" in your email headers? I\'ll walk you through every cause and the exact fix for each one. Tested on real production domains.',
    keywords: 'DKIM signature verification failed, dkim fail, DKIM not passing, DKIM body hash did not verify, DKIM key not found, email authentication fix',
    author: 'Mike Chen',
    authorBio: 'Debugged more DKIM failures than I can count. The fix is usually simpler than you think.',
    category: 'Troubleshooting',
    categoryColor: 'orange',
    date: '2026-04-08',
    readingTime: '11 min read',
  },
  {
    slug: 'aws-ses-email-going-to-spam',
    title: 'AWS SES Email Going to Spam? Here\'s How I Fixed It',
    description: 'All my SES transactional emails were landing in spam. After 3 hours of debugging, I found the fix. Here\'s the complete walkthrough — sandbox, authentication, dedicated IPs, and content fixes.',
    keywords: 'aws ses email going to spam, aws ses spam, aws ses deliverability, ses emails landing in spam, ses sandbox, ses dkim, ses spf, ses dmarc',
    author: 'Mike Chen',
    authorBio: 'Moved 200K emails off SES spam folders. Still get nervous hitting Send.',
    category: 'Troubleshooting',
    categoryColor: 'orange',
    date: '2026-04-10',
    readingTime: '10 min read',
  },
  {
    slug: 'sendgrid-spf-setup-guide',
    title: 'SendGrid SPF Setup Guide: How I Got It Working in 5 Minutes',
    description: 'Struggling with SendGrid SPF configuration? I spent way too long figuring this out. Here\'s the exact DNS record you need and the mistakes to avoid.',
    keywords: 'sendgrid spf setup, sendgrid spf record, sendgrid email authentication, sendgrid dns setup, sendgrid spf include, sendgrid deliverability',
    author: 'Mike Chen',
    authorBio: 'Set up SendGrid for more domains than I can count. Still double-check the include value every time.',
    category: 'Setup Guide',
    categoryColor: 'blue',
    date: '2026-04-14',
    readingTime: '9 min read',
  },
  {
    slug: 'mailgun-dkim-configuration',
    title: 'Mailgun DKIM Configuration: The Complete Setup Guide (That Actually Works)',
    description: 'Struggling with Mailgun DKIM setup? After 40+ domain configurations, I\'ve got it down to 10 minutes. Here\'s the exact DNS records you need and the mistakes that cost me hours.',
    keywords: 'mailgun dkim configuration, mailgun dkim setup, mailgun email authentication, mailgun dns setup, mailgun domain verification, mailgun deliverability',
    author: 'Mike Chen',
    authorBio: 'Configured Mailgun DKIM for 40+ domains. Still remember the afternoon I wasted on my first try.',
    category: 'Setup Guide',
    categoryColor: 'blue',
    date: '2026-04-17',
    readingTime: '10 min read',
  },
  {
    slug: 'how-to-test-email-deliverability',
    title: 'How to Test Email Deliverability (My Complete 6-Step Workflow)',
    description: 'Think your emails are landing in inboxes? Here\'s how to actually verify it. My complete testing workflow — authentication checks, header analysis, blacklist monitoring, and ongoing testing habits.',
    keywords: 'how to test email deliverability, email deliverability test, check email deliverability, email spam test, email authentication check, inbox placement test',
    author: 'Mike Chen',
    authorBio: 'Lost count of how many deliverability fires I\'ve put out. Testing regularly would\'ve prevented most of them.',
    category: 'Email Deliverability',
    categoryColor: 'red',
    date: '2026-04-20',
    readingTime: '11 min read',
  },
  {
    slug: 'email-authentication-best-practices-2026',
    title: 'Email Authentication Best Practices 2026: The Complete Guide',
    description: 'Gmail, Yahoo, and Microsoft have raised the bar on email authentication. Here\'s what actually matters in 2026 — SPF, DKIM, DMARC setup, alignment traps, and the mistakes I still see every week.',
    keywords: 'email authentication best practices 2026, email authentication guide, SPF DKIM DMARC best practices, email security 2026, DMARC reject policy, email deliverability authentication',
    author: 'Mike Chen',
    authorBio: 'Fixed email authentication for dozens of domains. The basics haven\'t changed — but the bar keeps rising.',
    category: 'Email Deliverability',
    categoryColor: 'red',
    date: '2026-04-23',
    readingTime: '12 min read',
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find(article => article.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogArticles.map(article => article.slug);
}

export function getFeaturedArticle(): BlogArticle | undefined {
  return blogArticles.find(article => article.featured);
}
