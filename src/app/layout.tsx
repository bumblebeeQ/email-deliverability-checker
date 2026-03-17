import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MailProbe - Email Deliverability Checker",
  description: "Free email deliverability test. Check SPF, DKIM, DMARC configuration, scan blacklists, and get actionable fix suggestions.",
  keywords: ["email deliverability", "SPF check", "DKIM check", "DMARC check", "email spam", "blacklist check"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
