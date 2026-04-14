import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Twitter, Linkedin, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { getArticleBySlug, getAllSlugs, blogArticles } from '@/lib/blog-data';

// Import article content components
import WhyEmailsGoingToSpam from './content/why-emails-going-to-spam';
import SpfDkimNotFound from './content/spf-dkim-set-but-not-found';
import DmarcPolicyNotFound from './content/dmarc-policy-not-found';
import SpfLookupLimitExceeded from './content/spf-lookup-limit-exceeded';
import DkimSignatureVerificationFailed from './content/dkim-signature-verification-failed';
import AwsSesEmailGoingToSpam from './content/aws-ses-email-going-to-spam';
import SendgridSpfSetupGuide from './content/sendgrid-spf-setup-guide';

type Props = {
  params: { slug: string };
};

const contentComponents: Record<string, React.ComponentType> = {
  'why-emails-going-to-spam': WhyEmailsGoingToSpam,
  'spf-dkim-set-but-not-found': SpfDkimNotFound,
  'dmarc-policy-not-found': DmarcPolicyNotFound,
  'spf-lookup-limit-exceeded': SpfLookupLimitExceeded,
  'dkim-signature-verification-failed': DkimSignatureVerificationFailed,
  'aws-ses-email-going-to-spam': AwsSesEmailGoingToSpam,
  'sendgrid-spf-setup-guide': SendgridSpfSetupGuide,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: 'Blog | EmailDiag' };

  return {
    title: `${article.title} | EmailDiag`,
    description: article.description,
    keywords: article.keywords,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://www.emaildiag.com/blog/${article.slug}`,
      type: 'article',
      publishedTime: article.date,
    },
    alternates: {
      canonical: `https://www.emaildiag.com/blog/${article.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export default function BlogPostPage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const ContentComponent = contentComponents[params.slug];
  if (!ContentComponent) notFound();

  const categoryColors: Record<string, string> = {
    red: 'bg-red-100 text-red-700',
    orange: 'bg-orange-100 text-orange-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: { '@type': 'Person', name: article.author },
    publisher: { '@type': 'Organization', name: 'EmailDiag', url: 'https://www.emaildiag.com' },
  };

  // Get related articles (exclude current)
  const relatedArticles = blogArticles.filter(a => a.slug !== params.slug).slice(0, 2);

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
            <span className="text-gray-700">{article.category}</span>
          </div>
        </nav>

        {/* Article Header */}
        <header className="pt-12 pb-8 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <span className={`px-3 py-1 rounded-full font-medium ${categoryColors[article.categoryColor] || 'bg-gray-100 text-gray-700'}`}>
                {article.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readingTime}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-4 pb-8 border-b">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {article.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-gray-900">{article.author}</p>
                <p className="text-sm text-gray-500">{article.authorBio}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="px-4 pb-16">
          <div className="max-w-3xl mx-auto">
            <ContentComponent />
          </div>
        </article>

        {/* Share & Related */}
        <section className="py-12 px-4 bg-gray-50 border-t">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="text-gray-600 font-medium">Share:</span>
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://www.emaildiag.com/blog/${article.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white border rounded-lg hover:bg-gray-50 hover:border-blue-400 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-gray-600" />
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.emaildiag.com/blog/${article.slug}`)}`}
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

            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Related Articles</h3>
                <div className="space-y-3">
                  {relatedArticles.map(related => (
                    <Link key={related.slug} href={`/blog/${related.slug}`} className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <h4 className="font-medium text-gray-800">{related.title}</h4>
                      <p className="text-sm text-gray-500">{related.description.slice(0, 100)}...</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
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
