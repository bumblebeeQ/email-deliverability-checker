import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Email Deliverability FAQ - Common Questions Answered | EmailDiag',
  description: 'Get answers to frequently asked questions about email deliverability, SPF, DKIM, DMARC configuration, blacklist issues, and how to fix emails going to spam.',
  keywords: 'email deliverability FAQ, SPF FAQ, DKIM FAQ, DMARC FAQ, email spam FAQ, why emails go to spam, email authentication questions',
  openGraph: {
    title: 'Email Deliverability FAQ - Common Questions Answered',
    description: 'Get answers to frequently asked questions about email deliverability, SPF, DKIM, DMARC configuration.',
    url: 'https://www.emaildiag.com/faq',
  },
  alternates: {
    canonical: 'https://www.emaildiag.com/faq',
  },
};

const faqs = [
  {
    question: 'Why are my emails going to spam?',
    answer: `Emails typically go to spam for several reasons: missing or misconfigured SPF, DKIM, or DMARC records; your domain or IP is on a blacklist; poor sender reputation; spammy content or subject lines; lack of engagement from recipients. Use our free email deliverability checker to diagnose the exact issue with your domain.`,
  },
  {
    question: 'What is SPF and why do I need it?',
    answer: `SPF (Sender Policy Framework) is a DNS record that specifies which mail servers are authorized to send email on behalf of your domain. Without SPF, spammers can easily forge emails from your domain, and receiving servers may mark your legitimate emails as spam. SPF is essential for email authentication and deliverability.`,
  },
  {
    question: 'What is DKIM and how does it work?',
    answer: `DKIM (DomainKeys Identified Mail) adds a digital signature to your outgoing emails. This cryptographic signature verifies that the email was actually sent from your domain and hasn't been modified in transit. DKIM requires adding a public key to your DNS records and configuring your mail server to sign outgoing messages.`,
  },
  {
    question: 'What is DMARC and should I set it up?',
    answer: `DMARC (Domain-based Message Authentication, Reporting & Conformance) tells receiving mail servers what to do when SPF or DKIM checks fail. It also provides reports about who is sending email using your domain. Yes, you should absolutely set up DMARC - it protects your brand from email spoofing and phishing attacks.`,
  },
  {
    question: 'How do I check if my domain is on a blacklist?',
    answer: `Use our free email deliverability checker at EmailDiag to scan your domain against 50+ major blacklists including Spamhaus, SpamCop, and Barracuda. If you're listed, we'll show you which blacklists and provide guidance on how to get delisted.`,
  },
  {
    question: 'How long does it take for DNS changes to propagate?',
    answer: `DNS changes typically propagate within 1-48 hours, though most changes are visible within 1-4 hours. The propagation time depends on the TTL (Time To Live) setting of your DNS records and how different DNS servers around the world cache information.`,
  },
  {
    question: 'What\'s the difference between soft fail (~all) and hard fail (-all) in SPF?',
    answer: `In SPF records, ~all (soft fail) suggests that emails from unauthorized servers should be accepted but marked as suspicious, while -all (hard fail) tells receiving servers to reject emails from unauthorized servers outright. For better security, we recommend using -all once you've confirmed all legitimate sending sources are included in your SPF record.`,
  },
  {
    question: 'Can I have multiple SPF records for my domain?',
    answer: `No, you should only have one SPF record per domain. Having multiple SPF records can cause authentication failures because some mail servers will randomly pick one record, leading to inconsistent results. If you use multiple email services, combine them into a single SPF record using the "include:" mechanism.`,
  },
  {
    question: 'How do I fix "SPF record exceeds 10 DNS lookup limit"?',
    answer: `SPF has a limit of 10 DNS lookups to prevent denial-of-service attacks. To fix this: 1) Remove unused "include:" statements, 2) Replace "include:" with "ip4:" or "ip6:" where possible, 3) Use SPF flattening services that resolve includes to IP addresses, 4) Consider using subdomains for different email services.`,
  },
  {
    question: 'What DMARC policy should I start with?',
    answer: `Start with p=none (monitoring mode) to collect reports without affecting email delivery. Monitor the reports for 2-4 weeks to identify all legitimate email sources. Then gradually move to p=quarantine and finally p=reject. This phased approach prevents accidentally blocking legitimate emails.`,
  },
  {
    question: 'How can I test if my email configuration is correct?',
    answer: `Use our Email Test feature at EmailDiag. We provide a unique test email address - send an email to it and we'll analyze your SPF, DKIM, and DMARC authentication in real-time, showing you exactly what receiving mail servers see.`,
  },
  {
    question: 'Why is email authentication important for marketing emails?',
    answer: `Email authentication (SPF, DKIM, DMARC) is crucial for marketing because: 1) It improves inbox placement rates, 2) It builds sender reputation, 3) It protects your brand from spoofing, 4) Major email providers like Gmail and Outlook increasingly require proper authentication, 5) It's required for BIMI (Brand Indicators for Message Identification).`,
  },
];

// Generate FAQ Schema for rich snippets
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      {/* FAQ Schema for rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Header */}
        <Navbar />

        {/* Breadcrumb */}
        <div className="py-4 px-4 bg-gray-50 border-b">
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">FAQ</span>
          </div>
        </div>

        {/* Content */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Email Deliverability FAQ
              </h1>
              <p className="text-lg text-gray-600">
                Common questions about email authentication, spam issues, and deliverability
              </p>
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-800 pr-4">
                      {faq.question}
                    </h2>
                    <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-6 pt-2">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-blue-50 rounded-2xl border border-blue-200 text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Still have questions?
              </h2>
              <p className="text-gray-600 mb-6">
                Check your domain's email configuration for free and get personalized recommendations.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Check Your Domain Now
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t bg-gray-50">
          <div className="max-w-5xl mx-auto text-center text-gray-500 text-sm">
            <p>© 2026 EmailDiag. Free email deliverability checker.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
