'use client';
import React from 'react';
import Image from 'next/image';

const FacebookIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer id="contact" style={{ background: '#080808', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center" style={{ background: 'rgba(232,93,38,0.15)', border: '1px solid rgba(232,93,38,0.3)' }}>
                <Image src="/assets/images/1608452013412__1_-1786628988863.png" alt="Karhari Media Logo" width={36} height={36} style={{ objectFit: 'contain' }} />
              </div>
              <span className="font-bold text-white text-xl tracking-tight">Karhari Media</span>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-xs" style={{ color: '#666666' }}>
              Official Facebook Rights Manager partner. We distribute and monetize music from artists and record labels across Facebook, Instagram, and WhatsApp.
            </p>
            <div className="flex items-center gap-3">
              {[
                { href: 'https://www.facebook.com', icon: <FacebookIcon size={14} /> },
                {
                  href: 'https://www.instagram.com',
                  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                },
                {
                  href: 'https://twitter.com',
                  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#666' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#666'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4" style={{ letterSpacing: '-0.01em' }}>Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Music Distribution', href: '#' },
                { label: 'Rights Protection', href: '#' },
                { label: 'Revenue Collection', href: '#' },
                { label: 'Monthly Payouts', href: '#' },
                { label: 'FAQ', href: '#faq' },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm transition-colors duration-200" style={{ color: '#555' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#1877F2'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#555'; }}
                  >{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Facebook Policies */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4" style={{ letterSpacing: '-0.01em' }}>Facebook Policies</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Music Guidelines', href: 'https://www.facebook.com/legal/music_guidelines' },
                { label: 'Rights Manager', href: 'https://www.facebook.com/help/rightsmanager' },
                { label: 'Terms of Service', href: 'https://www.facebook.com/legal/terms' },
                { label: 'Privacy Policy', href: 'https://www.facebook.com/privacy/policy/' },
                { label: 'Creator Tools', href: 'https://www.facebook.com/creators/tools/rights-manager' },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm transition-colors duration-200" style={{ color: '#555' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#1877F2'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#555'; }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
