import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Email Deliverability Blog - Tips, Guides & Best Practices | EmailDiag',
  description: 'Learn how to improve email deliverability, fix spam issues, and configure SPF, DKIM, DMARC. Expert guides and tutorials for better inbox placement.',
  keywords: 'email deliverability blog, email marketing tips, SPF guide, DKIM tutorial, DMARC best practices, avoid spam folder',
  openGraph: {
    title: 'Email Deliverability Blog - Tips, Guides & Best Practices',
    description: 'Expert guides and tutorials for better email deliverability and inbox placement.',
    url: 'https://www.emaildiag.com/blog',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.emaildiag.com/blog',
  },
};

// Blog posts data - in production, this would come from a CMS or MDX files
const blogPosts = [
  {
    slug: 'why-emails-going-to-spam',
    title: 'Why Are My Emails Going to Spam? (2026 Complete Guide)',
    description: 'Discover the 12 most common reasons your emails land in spam and learn exactly how to fix each one. Complete guide with step-by-step solutions.',
    date: '2026-03-27',
    author: 'EmailDiag Team',
    category: 'Email Deliverability',
    tags: ['spam', 'email deliverability', 'SPF', 'DKIM', 'DMARC'],
    readingTime: '15 min read',
    featured: true,
  },
  // More posts will be added here
];

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      {/* Hero */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Email Deliverability Blog
          </h1>
          <p className="text-lg text-gray-600">
            Expert guides, tutorials, and tips to help your emails reach the inbox
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <Link 
              href={`/blog/${featuredPost.slug}`}
              className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="md:flex">
                <div className="md:w-2/5 bg-gradient-to-br from-blue-600 to-blue-800 p-8 flex items-center justify-center">
                  <div className="text-center text-white">
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
                      Featured Article
                    </span>
                    <div className="text-6xl mb-2">📧</div>
                    <p className="text-blue-100 text-sm">{featuredPost.readingTime}</p>
                  </div>
                </div>
                <div className="md:w-3/5 p-8">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {featuredPost.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-blue-600 font-medium group-hover:gap-2 transition-all">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">All Articles</h2>
          
          {blogPosts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl">
              <p className="text-gray-500">More articles coming soon!</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readingTime}
                    </span>
                    <span>·</span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {post.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
                    Read more <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-6">
            Get the latest email deliverability tips and guides delivered to your inbox.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            No spam. Unsubscribe anytime.
          </p>
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
              <a href="mailto:hello@emaildiag.com" className="hover:text-blue-600">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
