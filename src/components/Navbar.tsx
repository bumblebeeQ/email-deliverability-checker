'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Zap, Menu, X } from 'lucide-react';

interface NavbarProps {
  // Optional: highlight a specific nav item
  active?: 'home' | 'guides' | 'test' | 'faq';
}

export function Navbar({ active }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Auto-detect active based on pathname if not provided
  const currentActive = active || (() => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/guides')) return 'guides';
    if (pathname.startsWith('/test')) return 'test';
    if (pathname === '/faq') return 'faq';
    return undefined;
  })();

  const navLinks = [
    { href: '/', label: 'Home', key: 'home' },
    { href: '/guides', label: 'Guides', key: 'guides' },
    { href: '/test', label: 'Email Test', key: 'test' },
    { href: '/faq', label: 'FAQ', key: 'faq' },
  ];

  return (
    <header className="py-4 px-4 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg rotate-3"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
              <Zap className="w-2.5 h-2.5 text-yellow-300 absolute -top-0.5 -right-0.5" />
            </div>
          </div>
          <span className="text-lg font-bold text-gray-800">EmailDiag</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-sm text-gray-600">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`transition-colors ${
                currentActive === link.key
                  ? 'text-blue-600 font-medium'
                  : 'hover:text-blue-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 -mr-2 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg">
          <nav className="max-w-5xl mx-auto py-4 px-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg transition-colors ${
                  currentActive === link.key
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2" />
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
            >
              About
            </Link>
            <a
              href="mailto:hello@emaildiag.com"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
