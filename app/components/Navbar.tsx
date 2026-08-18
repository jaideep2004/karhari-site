'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNavbar } from './hooks/useNavbar';

const services = [
  { label: 'Music CMS & MCN', href: '/#music-cms' },
  { label: 'All Platforms', href: '/#all-platforms' },
  { label: 'Content ID', href: '/#content-id' },
  { label: 'Royalty Reporting', href: '/#royalty' },
  { label: 'Entertainment CMS & MCN', href: '/#entertainment-cms' },
  { label: 'Rights Protection', href: '/#rights-protection' },
  { label: 'Content ID Cards', href: '/#content-id-cards' },
];

export default function Navbar() {
  useNavbar();
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="nav-logo" aria-label="Karhari Media home">
          <img src="karhari-media-b1.png" alt="Karhari Media" className="nav-logo-img" />
        </Link>
        <ul className="nav-links" id="navLinks">
          <li>
            <Link href="/" className={isActive('/') ? 'active' : ''}>HOME</Link>
          </li>
          <li className="nav-dropdown">
            <a href="#" className="nav-dropdown-toggle">SERVICES</a>
            <ul className="nav-dropdown-menu">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link href="/about" className={isActive('/about') ? 'active' : ''}>ABOUT US</Link>
          </li>
          <li>
            <Link href="/contact" className={isActive('/contact') ? 'active' : ''}>CONTACT US</Link>
          </li>
          <li>
            <Link href="/music-distribution" className={isActive('/music-distribution') ? 'active' : ''}>MUSIC DISTRIBUTION</Link>
          </li>
          <li>
            <Link href="/youtube-content-id" className={isActive('/youtube-content-id') ? 'active' : ''}>YOUTUBE CONTENT ID</Link>
          </li>
          <li>
            <Link href="/facebook-rights-manager" className={isActive('/facebook-rights-manager') ? 'active' : ''}>FACEBOOK RIGHTS MANAGER</Link>
          </li>
          <li>
            <Link href="/team" className={isActive('/team') ? 'active' : ''}>OUR TEAM</Link>
          </li>
        </ul>
        <div className="nav-actions">
          <a href="#" className="nav-login">LOGIN</a>
          <a href="#" className="nav-cta">SIGN UP</a>
        </div>
        <button className="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
