import React from 'react';
import Link from 'next/link';
import AppLogo from '../../components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Desktop: single row */}
        <div className="hidden sm:flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2" aria-label="KharhariMedia home">
            <AppLogo
              src="/assets/images/1608452013412__1_-1786284315378.png"
              size={28}
            />
            <span className="font-semibold text-sm text-foreground">KharhariMedia</span>
          </Link>

          <div className="flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Services</a>
            <a href="#platforms" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Platforms</a>
            <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            <a href="https://karharimedia.com/about/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</a>
          </div>

          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span>© 2025 Karhari Media Pvt. Ltd.</span>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="sm:hidden flex flex-col items-center gap-6">
          <Link href="/" className="flex items-center gap-2" aria-label="KharhariMedia home">
            <AppLogo src="/assets/images/1608452013412__1_-1786284315378.png" size={28} />
            <span className="font-semibold text-sm text-foreground">KharhariMedia</span>
          </Link>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center">Services</a>
            <a href="#platforms" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center">Platforms</a>
            <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center">Contact</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center">Privacy</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center">Terms</a>
          </div>
          <p className="text-xs text-muted-foreground text-center">© 2025 Karhari Media Pvt. Ltd.</p>
        </div>
      </div>
    </footer>
  );
}