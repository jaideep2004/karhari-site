import React from 'react';
import Link from 'next/link';
import AppLogo from '../../components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <div className="flex items-center gap-2">
              <AppLogo size={36} />
              <span className="font-display font-bold text-lg tracking-tight text-foreground">Karhari Media</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Global Music Distribution &amp; Rights Management Company
            </p>
            <div className="flex items-center gap-4 mt-2">
              {['f', 'tw', 'ig', 'in', 'yt']?.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors text-xs font-bold"
                  aria-label={s}
                >
                  {s === 'f' ? 'f' : s === 'tw' ? 'tw' : s === 'ig' ? 'ig' : s === 'in' ? 'in' : 'yt'}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-foreground">Quick Links</span>
              {[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'About Us', href: '/about' },
              ]?.map((l) => (
                <Link key={l?.label} href={l?.href} className="text-muted-foreground hover:text-primary transition-colors min-h-[44px] flex items-center">{l?.label}</Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-foreground">Our Services</span>
              {['Music Distribution', 'YouTube MCN', 'Rights Management', 'Content ID', 'Royalty Collection', 'Analytics & Reporting']?.map((l) => (
                <span key={l} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer min-h-[44px] flex items-center">{l}</span>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-foreground">Support</span>
              {['Help Center', 'Terms & Conditions', 'Privacy Policy', 'Refund Policy', 'Contact Support']?.map((l) => (
                <span key={l} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer min-h-[44px] flex items-center">{l}</span>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-foreground">Contact Us</span>
              <div className="text-muted-foreground text-xs space-y-2">
                <p>Email: info@karharimedia.com</p>
                <p>Website: www.karharimedia.com</p>
                <p>Phone: +91 9304360383</p>
                <p className="leading-relaxed">Karhari Village, Darbhanga, Bihar, India - 847403</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <span>© 2025 Karhari Media Private Limited. All Rights Reserved.</span>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-primary transition-colors min-h-[44px] flex items-center">Privacy</Link>
            <Link href="/" className="hover:text-primary transition-colors min-h-[44px] flex items-center">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}