import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

// 统一使用 www 版本作为主域名
const BASE_URL = 'https://www.emaildiag.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "EmailDiag - Free Email Deliverability Checker",
    template: "%s | EmailDiag",
  },
  description: "Free email deliverability test. Check SPF, DKIM, DMARC configuration, scan blacklists, and get actionable fix suggestions with step-by-step DNS guides.",
  keywords: ["email deliverability", "SPF check", "DKIM check", "DMARC check", "email spam", "blacklist check", "DNS setup", "email authentication"],
  authors: [{ name: "EmailDiag" }],
  creator: "EmailDiag",
  publisher: "EmailDiag",
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "EmailDiag",
    title: "EmailDiag - Free Email Deliverability Checker",
    description: "Free email deliverability test. Check SPF, DKIM, DMARC configuration, scan blacklists, and get actionable fix suggestions.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "EmailDiag - Email Deliverability Checker",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "EmailDiag - Free Email Deliverability Checker",
    description: "Free email deliverability test. Check SPF, DKIM, DMARC and get fix suggestions.",
    images: [`${BASE_URL}/og-image.png`],
  },
  
  // SEO
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
  
  // Verification
  verification: {
    // google: "your-google-verification-code",
  },
  
  // Canonical
  alternates: {
    canonical: BASE_URL,
  },
};

// JSON-LD - 移除虚假的 aggregateRating
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "EmailDiag",
  description: "Free email deliverability checker. Test SPF, DKIM, DMARC configuration and get fix suggestions.",
  url: BASE_URL,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  // aggregateRating 已移除 - 等有真实用户评价后再添加
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GVP0GMDKJW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GVP0GMDKJW');
          `}
        </Script>
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
// Trigger redeploy
