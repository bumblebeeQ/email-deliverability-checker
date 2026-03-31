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
