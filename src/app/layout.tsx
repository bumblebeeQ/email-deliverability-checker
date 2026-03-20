import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = 'https://mailprobe.xyz';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "MailProbe - Email Deliverability Checker",
    template: "%s | MailProbe",
  },
  description: "Free email deliverability test. Check SPF, DKIM, DMARC configuration, scan blacklists, and get actionable fix suggestions with step-by-step DNS guides.",
  keywords: ["email deliverability", "SPF check", "DKIM check", "DMARC check", "email spam", "blacklist check", "DNS setup", "email authentication"],
  authors: [{ name: "MailProbe" }],
  creator: "MailProbe",
  publisher: "MailProbe",
  
  // Open Graph - 社交分享
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "MailProbe",
    title: "MailProbe - Email Deliverability Checker",
    description: "Free email deliverability test. Check SPF, DKIM, DMARC configuration, scan blacklists, and get actionable fix suggestions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MailProbe - Email Deliverability Checker",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "MailProbe - Email Deliverability Checker",
    description: "Free email deliverability test. Check SPF, DKIM, DMARC and get fix suggestions.",
    images: ["/og-image.png"],
  },
  
  // 其他 SEO 设置
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // 验证标签（后续可以添加 Google Search Console 等）
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  
  // 其他元数据
  alternates: {
    canonical: BASE_URL,
  },
};

// JSON-LD 结构化数据
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "MailProbe",
  description: "Free email deliverability checker. Test SPF, DKIM, DMARC configuration and get fix suggestions.",
  url: BASE_URL,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "150",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* 主题色 */}
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
