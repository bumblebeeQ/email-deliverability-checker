'use client';

import { useState } from 'react';
import { Copy, Twitter, Linkedin, Share2, Check, Link as LinkIcon, Download, Mail, MessageCircle } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  domain: string;
  score: number;
  grade: string;
}

export function ShareButtons({ url, domain, score, grade }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const shareText = `Check out ${domain}'s email deliverability score: ${score}/100 (Grade ${grade}) 📧`;
  const shareTextWithUrl = `${shareText}\n\nTest your domain free → ${url}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
  };

  const shareToReddit = () => {
    const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(`${domain} Email Deliverability Report - Score ${score}/100`)}`;
    window.open(redditUrl, '_blank', 'width=600,height=600');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Email Deliverability Report for ${domain}`);
    const body = encodeURIComponent(`Hi,\n\nI ran an email deliverability check on ${domain} and wanted to share the results.\n\nScore: ${score}/100 (Grade ${grade})\n\nView the full report: ${url}\n\nYou can test your own domain for free at https://www.emaildiag.com`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${domain} Email Deliverability Report`,
          text: shareText,
          url: url,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      handleCopy();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-gray-500 mr-1">Share:</span>
      
      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        title="Copy link"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-500" />
            <span className="hidden sm:inline">Copied!</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Copy Link</span>
          </>
        )}
      </button>

      {/* Twitter/X */}
      <button
        onClick={shareToTwitter}
        className="flex items-center justify-center w-9 h-9 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors"
        title="Share on X/Twitter"
      >
        <Twitter className="w-4 h-4" />
      </button>

      {/* LinkedIn */}
      <button
        onClick={shareToLinkedIn}
        className="flex items-center justify-center w-9 h-9 bg-[#0077b5] hover:bg-[#006396] text-white rounded-lg transition-colors"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </button>

      {/* Reddit */}
      <button
        onClick={shareToReddit}
        className="flex items-center justify-center w-9 h-9 bg-[#ff4500] hover:bg-[#e03d00] text-white rounded-lg transition-colors"
        title="Share on Reddit"
      >
        <MessageCircle className="w-4 h-4" />
      </button>

      {/* Email */}
      <button
        onClick={shareViaEmail}
        className="flex items-center justify-center w-9 h-9 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
        title="Share via Email"
      >
        <Mail className="w-4 h-4" />
      </button>

      {/* Print/PDF */}
      <button
        onClick={handlePrint}
        className="flex items-center gap-1.5 px-3 py-2 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
        title="Print or Save as PDF"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">PDF</span>
      </button>

      {/* Native Share (mobile) */}
      {'share' in navigator && (
        <button
          onClick={handleNativeShare}
          className="flex items-center justify-center w-9 h-9 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors sm:hidden"
          title="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
