'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Icon from '../../components/ui/AppIcon';

const LOGO = '/assets/images/1608452013412__1_-1786333580948.png';

// Unique vibrant colors for each section number
const NUMBER_COLORS = [
  '#ff6b6b', // 01 - coral red
  '#ffd93d', // 02 - vivid yellow
  '#6bcb77', // 03 - bright green
  '#4d96ff', // 04 - electric blue
  '#ff922b', // 05 - vivid orange
  '#cc5de8', // 06 - bright purple
  '#20c997', // 07 - teal
  '#f06595', // 08 - hot pink
  '#74c0fc', // 09 - sky blue
  '#ff6b6b', // 10 - coral red
  '#a9e34b', // 11 - lime green
  '#ffd43b', // 12 - golden yellow
  '#da77f2', // 13 - lavender purple
];

const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    icon: 'InformationCircleIcon',
    color: '#4d96ff',
    glow: 'rgba(77,150,255,0.35)',
    badge: '01',
    content: [
      { type: 'text', text: 'Karhari Media ("we," "our," or "us") is committed to protecting your privacy and handling your personal data with transparency and care. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or enter into a digital contract with us as an artist, record label, or YouTube creator.' },
      { type: 'text', text: 'By accessing our website or using our services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with the terms of this policy, please discontinue use of our services immediately.' },
      { type: 'heading', text: 'Applicable Data Protection Laws:' },
      { type: 'bullet', text: 'Information Technology Act, 2000 (India)' },
      { type: 'bullet', text: 'Personal Data Protection Bill (India)' },
      { type: 'bullet', text: 'General Data Protection Regulation (GDPR) — where applicable' },
      { type: 'bullet', text: 'California Consumer Privacy Act (CCPA) — where applicable' },
    ],
  },
  {
    id: 'information-collected',
    title: 'Information We Collect',
    icon: 'DocumentTextIcon',
    color: '#cc5de8',
    glow: 'rgba(204,93,232,0.35)',
    badge: '02',
    content: [
      { type: 'heading', text: 'Personal Information You Provide:' },
      { type: 'bullet', text: 'Full legal name, stage name, and professional identity details' },
      { type: 'bullet', text: 'Email address, phone number, and postal address' },
      { type: 'bullet', text: 'Bank account details, UPI IDs, or payment information for revenue disbursements' },
      { type: 'bullet', text: 'Government-issued identification documents (PAN card, Aadhaar, passport) for KYC compliance' },
      { type: 'bullet', text: 'YouTube channel URLs, social media handles, and digital platform credentials' },
      { type: 'bullet', text: 'Music catalog information including song titles, album names, ISRC codes, and UPC barcodes' },
      { type: 'bullet', text: 'Copyright ownership documents and licensing agreements' },
      { type: 'heading', text: 'Information Collected Automatically:' },
      { type: 'bullet', text: 'IP address, browser type, and operating system' },
      { type: 'bullet', text: 'Pages visited, time spent on pages, and navigation patterns' },
      { type: 'bullet', text: 'Device identifiers and cookies' },
      { type: 'heading', text: 'Information from Third Parties:' },
      { type: 'bullet', text: 'Revenue and streaming data from digital music stores (Spotify, Apple Music, Amazon Music, etc.)' },
      { type: 'bullet', text: 'YouTube Analytics data including views, watch time, and monetization reports' },
      { type: 'bullet', text: 'Performance data from UGC platforms and social media networks' },
    ],
  },
  {
    id: 'how-we-use',
    title: 'How We Use Your Information',
    icon: 'CogIcon',
    color: '#6bcb77',
    glow: 'rgba(107,203,119,0.35)',
    badge: '03',
    content: [
      { type: 'heading', text: 'Service Delivery:' },
      { type: 'bullet', text: 'Processing and distributing your music to 20+ digital stores and streaming platforms' },
      { type: 'bullet', text: 'Managing your YouTube channel under our MCN agreement' },
      { type: 'highlight', text: 'Revenue Share: 80% to artists and record labels for music distribution; 80% to YouTube creators for MCN services.' },
      { type: 'bullet', text: 'Issuing digital contracts and maintaining contractual records' },
      { type: 'bullet', text: 'Providing ISRC codes, UPC barcodes, and metadata management' },
      { type: 'heading', text: 'Communication:' },
      { type: 'bullet', text: 'Sending revenue reports, payment notifications, and account statements' },
      { type: 'bullet', text: 'Notifying you of policy updates, platform changes, or service modifications' },
      { type: 'bullet', text: 'Responding to your inquiries, support requests, and complaints' },
      { type: 'heading', text: 'Legal and Compliance:' },
      { type: 'bullet', text: 'Verifying your identity and ownership of content' },
      { type: 'bullet', text: 'Complying with copyright laws, tax regulations, and government requirements' },
      { type: 'bullet', text: 'Detecting and preventing fraud, piracy, and unauthorized use of content' },
    ],
  },
  {
    id: 'data-sharing',
    title: 'Data Sharing & Disclosure',
    icon: 'ShareIcon',
    color: '#4d96ff',
    glow: 'rgba(77,150,255,0.35)',
    badge: '04',
    content: [
      { type: 'text', text: 'We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:' },
      { type: 'heading', text: 'Digital Music Stores & Streaming Platforms:' },
      { type: 'text', text: 'We share your music metadata, artist information, and catalog details with our distribution partners including Spotify, Apple Music, Amazon Music, YouTube Music, JioSaavn, Gaana, Wynk, Hungama, Deezer, Tidal, and other platforms necessary to distribute your content globally.' },
      { type: 'heading', text: 'YouTube & Google:' },
      { type: 'text', text: 'As a YouTube Multi-Channel Network (MCN), we share channel management data with YouTube/Google in accordance with the YouTube Partner Program policies and YouTube\'s Terms of Service.' },
      { type: 'heading', text: 'UGC Platforms:' },
      { type: 'text', text: 'We share necessary content identification data with Facebook, Instagram, TikTok, Snapchat, and other UGC platforms for Content ID and rights management purposes.' },
      { type: 'heading', text: 'Legal Authorities:' },
      { type: 'text', text: 'We may disclose your information to government authorities, law enforcement agencies, or courts when required by law, court order, or to protect the rights, property, or safety of Karhari Media, our clients, or the public.' },
    ],
  },
  {
    id: 'data-security',
    title: 'Data Security',
    icon: 'ShieldCheckIcon',
    color: '#ff922b',
    glow: 'rgba(255,146,43,0.35)',
    badge: '05',
    content: [
      { type: 'text', text: 'We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.' },
      { type: 'heading', text: 'Security Measures Include:' },
      { type: 'bullet', text: 'SSL/TLS encryption for all data transmitted through our website' },
      { type: 'bullet', text: 'Secure, encrypted storage of sensitive documents and financial information' },
      { type: 'bullet', text: 'Access controls limiting data access to authorized personnel only' },
      { type: 'bullet', text: 'Regular security audits and vulnerability assessments' },
      { type: 'bullet', text: 'Two-factor authentication for administrative systems' },
      { type: 'bullet', text: 'Secure backup procedures and disaster recovery protocols' },
      { type: 'highlight', text: 'Your Responsibility: Maintain confidentiality of login credentials and notify us immediately at support@karharimedia.com if you suspect unauthorized access.' },
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies & Tracking Technologies',
    icon: 'ComputerDesktopIcon',
    color: '#da77f2',
    glow: 'rgba(218,119,242,0.35)',
    badge: '06',
    content: [
      { type: 'text', text: 'Our website uses cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic.' },
      { type: 'heading', text: 'Types of Cookies We Use:' },
      { type: 'bullet', text: 'Essential Cookies: Required for the website to function properly, including session management and security features' },
      { type: 'bullet', text: 'Analytics Cookies: Help us understand how visitors interact with our website (e.g., Google Analytics)' },
      { type: 'bullet', text: 'Preference Cookies: Remember your settings and preferences for future visits' },
      { type: 'bullet', text: 'Marketing Cookies: Used to deliver relevant advertisements (only with your consent)' },
      { type: 'heading', text: 'Managing Cookies:' },
      { type: 'text', text: 'You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies or delete existing ones. However, disabling certain cookies may affect the functionality of our website.' },
    ],
  },
  {
    id: 'your-rights',
    title: 'Your Rights & Choices',
    icon: 'UserCircleIcon',
    color: '#20c997',
    glow: 'rgba(32,201,151,0.35)',
    badge: '07',
    content: [
      { type: 'text', text: 'Depending on your location and applicable law, you may have the following rights regarding your personal information:' },
      { type: 'bullet', text: 'Right to Access: Request a copy of the personal information we hold about you' },
      { type: 'bullet', text: 'Right to Rectification: Request correction of inaccurate or incomplete personal information' },
      { type: 'bullet', text: 'Right to Erasure: Request deletion of your personal information, subject to our legal obligations' },
      { type: 'bullet', text: 'Right to Restriction: Request that we limit the processing of your personal information' },
      { type: 'bullet', text: 'Right to Data Portability: Request your personal information in a structured, machine-readable format' },
      { type: 'bullet', text: 'Right to Object: Object to the processing of your personal information for direct marketing' },
      { type: 'bullet', text: 'Right to Withdraw Consent: Where processing is based on consent, you may withdraw it at any time' },
      { type: 'highlight', text: 'To exercise any of these rights, contact us at support@karharimedia.com with the subject line "Privacy Rights Request." We will respond within 30 days.' },
    ],
  },
  {
    id: 'retention',
    title: 'Data Retention',
    icon: 'ArchiveBoxIcon',
    color: '#f06595',
    glow: 'rgba(240,101,149,0.35)',
    badge: '08',
    content: [
      { type: 'text', text: 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.' },
      { type: 'heading', text: 'Retention Periods:' },
      { type: 'bullet', text: 'Active Contract Data: Retained for the duration of your contract plus 7 years after termination (for legal and tax compliance)' },
      { type: 'bullet', text: 'Financial Records: Retained for a minimum of 8 years as required by Indian tax laws and accounting standards' },
      { type: 'bullet', text: 'Music Catalog Data: Retained for the duration of distribution agreements and for a reasonable period thereafter' },
      { type: 'bullet', text: 'Communication Records: Retained for 3 years from the date of last communication' },
      { type: 'bullet', text: 'Website Analytics: Retained for 26 months (standard Google Analytics retention)' },
      { type: 'text', text: 'Upon expiration of the applicable retention period, we will securely delete or anonymize your personal information.' },
    ],
  },
  {
    id: 'third-party',
    title: 'Third-Party Links & Services',
    icon: 'LinkIcon',
    color: '#74c0fc',
    glow: 'rgba(116,192,252,0.35)',
    badge: '09',
    content: [
      { type: 'text', text: 'Our website and services may contain links to third-party websites, platforms, and services including YouTube, Spotify, Apple Music, Facebook, TikTok, and others. This Privacy Policy does not apply to those third-party services.' },
      { type: 'heading', text: 'Platform-Specific Policies:' },
      { type: 'bullet', text: 'YouTube: Subject to Google\'s Privacy Policy and YouTube\'s Terms of Service' },
      { type: 'bullet', text: 'Meta (Facebook/Instagram): Subject to Meta\'s Data Policy' },
      { type: 'bullet', text: 'TikTok: Subject to TikTok\'s Privacy Policy' },
      { type: 'bullet', text: 'Digital Music Stores: Subject to each store\'s respective privacy policy' },
      { type: 'text', text: 'By using our distribution and MCN services, you acknowledge and agree to comply with the applicable policies of all relevant platforms.' },
    ],
  },
  {
    id: 'children',
    title: "Children\'s Privacy",
    icon: 'HeartIcon',
    color: '#ff6b6b',
    glow: 'rgba(255,107,107,0.35)',
    badge: '10',
    content: [
      { type: 'text', text: 'Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately at support@karharimedia.com.' },
      { type: 'text', text: 'If we discover that we have inadvertently collected personal information from a minor, we will take prompt steps to delete such information from our records.' },
      { type: 'highlight', text: 'COPPA Notice: YouTube creators who produce children\'s content must accurately designate their content as made-for-kids in accordance with YouTube\'s requirements and COPPA regulations.' },
    ],
  },
  {
    id: 'international',
    title: 'International Data Transfers',
    icon: 'GlobeAltIcon',
    color: '#a9e34b',
    glow: 'rgba(169,227,75,0.35)',
    badge: '11',
    content: [
      { type: 'text', text: 'Karhari Media operates primarily in India and distributes content globally. Your personal information may be transferred to and processed in countries other than your country of residence, including countries where our distribution partners and platform providers are located.' },
      { type: 'heading', text: 'International Transfer Safeguards:' },
      { type: 'bullet', text: 'Standard contractual clauses approved by relevant data protection authorities' },
      { type: 'bullet', text: 'Adequacy decisions by applicable regulatory bodies' },
      { type: 'bullet', text: 'Other legally recognized transfer mechanisms' },
      { type: 'text', text: 'By using our services, you consent to the transfer of your information to countries outside your home country, which may have different data protection standards.' },
    ],
  },
  {
    id: 'updates',
    title: 'Updates to This Policy',
    icon: 'ArrowPathIcon',
    color: '#ffd43b',
    glow: 'rgba(255,212,59,0.35)',
    badge: '12',
    content: [
      { type: 'text', text: 'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will:' },
      { type: 'bullet', text: 'Post the updated policy on our website with a new "Last Updated" date' },
      { type: 'bullet', text: 'Send an email notification to registered users and active contract holders' },
      { type: 'bullet', text: 'Display a prominent notice on our website for a reasonable period' },
      { type: 'text', text: 'Your continued use of our services after the effective date of the updated policy constitutes your acceptance of the changes. We encourage you to review this policy periodically.' },
    ],
  },
  {
    id: 'contact',
    title: 'Contact Us',
    icon: 'EnvelopeIcon',
    color: '#da77f2',
    glow: 'rgba(218,119,242,0.35)',
    badge: '13',
    content: [
      { type: 'text', text: 'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:' },
      { type: 'highlight', text: 'Email: support@karharimedia.com' },
      { type: 'heading', text: 'Headquarters:' },
      { type: 'bullet', text: 'Mumbai, Kolkata, India' },
      { type: 'bullet', text: 'Mumbai Office: WeWork NESCO IT Park, Goregaon East, Mumbai – 400063, MH' },
      { type: 'bullet', text: 'Kolkata Office: New Town, Action Area 3, Rajarhat, Kolkata – 700135, WB' },
      { type: 'text', text: 'We are committed to resolving any privacy concerns promptly and transparently. For formal complaints, you may also contact the relevant data protection authority in your jurisdiction.' },
    ],
  },
];

function Particle({ style }: { style: React.CSSProperties }) {
  return <div className="absolute rounded-full pointer-events-none" style={style} />;
}

export default function PrivacyPolicyPage() {
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.id;
            if (id) setVisibleCards((prev) => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    cardRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const particles = [
    { width: 6, height: 6, top: '8%', left: '5%', background: '#4d96ff', opacity: 0.7, animation: 'float-note 5s ease-in-out infinite' },
    { width: 4, height: 4, top: '15%', left: '90%', background: '#cc5de8', opacity: 0.6, animation: 'float-note 7s ease-in-out infinite 1s' },
    { width: 8, height: 8, top: '30%', left: '3%', background: '#6bcb77', opacity: 0.5, animation: 'float-note 6s ease-in-out infinite 2s' },
    { width: 5, height: 5, top: '50%', left: '95%', background: '#20c997', opacity: 0.6, animation: 'float-note 8s ease-in-out infinite 0.5s' },
    { width: 7, height: 7, top: '70%', left: '7%', background: '#ff922b', opacity: 0.5, animation: 'float-note 5.5s ease-in-out infinite 3s' },
    { width: 4, height: 4, top: '85%', left: '88%', background: '#f06595', opacity: 0.6, animation: 'float-note 6.5s ease-in-out infinite 1.5s' },
    { width: 10, height: 10, top: '20%', left: '50%', background: '#4d96ff', opacity: 0.2, animation: 'blob-drift 10s ease-in-out infinite' },
    { width: 6, height: 6, top: '60%', left: '45%', background: '#da77f2', opacity: 0.4, animation: 'float-note 9s ease-in-out infinite 2.5s' },
    { width: 5, height: 5, top: '40%', left: '15%', background: '#ffd43b', opacity: 0.4, animation: 'float-note 7.5s ease-in-out infinite 1.2s' },
    { width: 3, height: 3, top: '75%', left: '60%', background: '#a9e34b', opacity: 0.5, animation: 'float-note 6.2s ease-in-out infinite 0.8s' },
  ];

  const renderContent = (items: typeof sections[0]['content'], color: string) => {
    return items.map((item, i) => {
      if (item.type === 'heading') {
        return (
          <p key={i} className="font-bold text-sm mt-4 mb-2" style={{ color }}>
            {item.text}
          </p>
        );
      }
      if (item.type === 'bullet') {
        return (
          <li key={i} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: 'rgba(210,220,240,0.9)' }}>
            <span className="mt-1.5 shrink-0 text-xs" style={{ color }}>▸</span>
            <span>{item.text}</span>
          </li>
        );
      }
      if (item.type === 'highlight') {
        return (
          <div key={i} className="my-3 px-4 py-3 rounded-xl text-sm font-semibold" style={{ background: `${color}20`, border: `1px solid ${color}50`, color, boxShadow: `0 0 12px ${color}20` }}>
            {item.text}
          </div>
        );
      }
      return (
        <p key={i} className="text-sm leading-relaxed" style={{ color: 'rgba(190,205,230,0.9)' }}>
          {item.text}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen text-foreground relative overflow-x-hidden" style={{ background: 'linear-gradient(135deg, #03020a 0%, #07051a 25%, #0a0520 50%, #060318 75%, #03020a 100%)' }}>
      <style>{`
        @keyframes spin-ring {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-ring-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes number-pulse {
          0%, 100% { opacity: 1; transform: scale(1); text-shadow: 0 0 20px currentColor, 0 0 40px currentColor; }
          50% { opacity: 0.85; transform: scale(1.05); text-shadow: 0 0 30px currentColor, 0 0 60px currentColor, 0 0 80px currentColor; }
        }
        @keyframes border-trace {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        @keyframes card-glow-pulse {
          0%, 100% { box-shadow: 0 8px 40px rgba(0,0,0,0.5), 0 0 20px var(--card-glow-color, rgba(77,150,255,0.15)); }
          50% { box-shadow: 0 8px 60px rgba(0,0,0,0.4), 0 0 40px var(--card-glow-color, rgba(77,150,255,0.3)), 0 0 80px var(--card-glow-color, rgba(77,150,255,0.1)); }
        }
        @keyframes shimmer-border {
          0% { opacity: 0.4; }
          50% { opacity: 1; }
          100% { opacity: 0.4; }
        }
        @keyframes float-note {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-18px) scale(1.1); }
        }
        @keyframes blob-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }
        .card-animated {
          animation: card-glow-pulse 3s ease-in-out infinite;
        }
        .number-animated {
          animation: number-pulse 2s ease-in-out infinite;
        }
        .spin-ring-1 {
          animation: spin-ring 3s linear infinite;
        }
        .spin-ring-2 {
          animation: spin-ring-reverse 4s linear infinite;
        }
        .spin-ring-3 {
          animation: spin-ring 6s linear infinite;
        }
      `}</style>

      {/* Animated background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-[700px] h-[700px] rounded-full opacity-[0.12]" style={{ top: '-15%', left: '-15%', background: 'radial-gradient(circle, #4d96ff 0%, transparent 70%)', animation: 'blob-drift 12s ease-in-out infinite' }} />
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-[0.10]" style={{ top: '25%', right: '-12%', background: 'radial-gradient(circle, #cc5de8 0%, transparent 70%)', animation: 'blob-drift 15s ease-in-out infinite 3s' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-[0.08]" style={{ bottom: '5%', left: '15%', background: 'radial-gradient(circle, #20c997 0%, transparent 70%)', animation: 'blob-drift 18s ease-in-out infinite 6s' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-[0.09]" style={{ top: '55%', right: '25%', background: 'radial-gradient(circle, #f06595 0%, transparent 70%)', animation: 'blob-drift 10s ease-in-out infinite 2s' }} />
        <div className="absolute w-[350px] h-[350px] rounded-full opacity-[0.07]" style={{ top: '10%', right: '40%', background: 'radial-gradient(circle, #ffd43b 0%, transparent 70%)', animation: 'blob-drift 14s ease-in-out infinite 4s' }} />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(77,150,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(77,150,255,0.6) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Floating particles */}
        {particles.map((p, i) => (
          <Particle key={i} style={{ width: p.width, height: p.height, top: p.top, left: p.left, background: p.background, opacity: p.opacity, animation: p.animation }} />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo with spinning rings */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Outer spinning ring */}
              <div className="spin-ring-1 absolute inset-0 rounded-full" style={{ border: '2px dashed rgba(77,150,255,0.5)', borderTopColor: '#4d96ff', borderRightColor: 'transparent' }} />
              {/* Middle spinning ring */}
              <div className="spin-ring-2 absolute rounded-full" style={{ inset: '8px', border: '2px dashed rgba(204,93,232,0.4)', borderBottomColor: '#cc5de8', borderLeftColor: 'transparent' }} />
              {/* Inner spinning ring */}
              <div className="spin-ring-3 absolute rounded-full" style={{ inset: '16px', border: '1px dashed rgba(32,201,151,0.4)', borderTopColor: '#20c997', borderRightColor: 'transparent' }} />
              {/* Glow */}
              <div className="absolute inset-0 rounded-full blur-2xl opacity-40" style={{ background: 'radial-gradient(circle, #4d96ff, transparent)', transform: 'scale(1.3)' }} />
              {/* Logo */}
              <div className="relative w-20 h-20 rounded-full flex items-center justify-center overflow-hidden" style={{ background: 'rgba(77,150,255,0.1)', border: '2px solid rgba(77,150,255,0.5)', boxShadow: '0 0 40px rgba(77,150,255,0.4), inset 0 0 20px rgba(77,150,255,0.05)' }}>
                <Image src={LOGO} alt="Karhari Media Logo" width={72} height={72} className="object-contain p-1" />
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(77,150,255,0.12)', border: '1px solid rgba(77,150,255,0.35)', color: '#74c0fc' }}>
            <Icon name="ShieldCheckIcon" size={14} />
            Legal Document · Karhari Media Pvt. Ltd.
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none">
            <span className="block text-white">Privacy</span>
            <span className="block" style={{ background: 'linear-gradient(135deg, #4d96ff 0%, #cc5de8 40%, #20c997 80%, #ffd43b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Policy</span>
          </h1>

          <p className="text-lg max-w-2xl mx-auto leading-relaxed mb-8" style={{ color: 'rgba(190,205,235,0.85)' }}>
            Karhari Media is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-xs px-4 py-2 rounded-full" style={{ background: 'rgba(77,150,255,0.1)', border: '1px solid rgba(77,150,255,0.25)', color: 'rgba(116,192,252,0.95)' }}>
              <Icon name="CalendarIcon" size={13} />
              Last Updated: August 2025
            </div>
            <div className="flex items-center gap-2 text-xs px-4 py-2 rounded-full" style={{ background: 'rgba(204,93,232,0.1)', border: '1px solid rgba(204,93,232,0.25)', color: 'rgba(218,119,242,0.95)' }}>
              <Icon name="EnvelopeIcon" size={13} />
              support@karharimedia.com
            </div>
            <div className="flex items-center gap-2 text-xs px-4 py-2 rounded-full" style={{ background: 'rgba(32,201,151,0.1)', border: '1px solid rgba(32,201,151,0.25)', color: 'rgba(32,201,151,0.95)' }}>
              <Icon name="MapPinIcon" size={13} />
              Headquarters: Mumbai, Kolkata, India
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="px-6 pb-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(77,150,255,0.2)', backdropFilter: 'blur(20px)', boxShadow: '0 0 30px rgba(77,150,255,0.05)' }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(77,150,255,0.15)', border: '1px solid rgba(77,150,255,0.35)' }}>
                <Icon name="ListBulletIcon" size={15} style={{ color: '#74c0fc' }} />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#74c0fc' }}>Table of Contents</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {sections.map((section, idx) => (
                <a key={section.id} href={`#${section.id}`} className="flex items-center gap-2 text-xs py-1.5 px-2 rounded-lg transition-all duration-200" style={{ color: 'rgba(190,205,230,0.75)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = NUMBER_COLORS[idx]; (e.currentTarget as HTMLElement).style.background = `${NUMBER_COLORS[idx]}15`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(190,205,230,0.75)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                  <span className="text-xs font-black shrink-0" style={{ color: NUMBER_COLORS[idx] }}>{section.badge}</span>
                  <span>{section.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Cards */}
      <section className="px-6 pb-24 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => {
            const isVisible = visibleCards.has(section.id);
            const isWide = section.content.length > 8;
            const numColor = NUMBER_COLORS[index];
            return (
              <div
                key={section.id}
                id={section.id}
                data-id={section.id}
                ref={(el) => { if (el) cardRefs.current.set(section.id, el); }}
                className={`relative rounded-2xl overflow-hidden transition-all duration-700 card-animated ${isWide ? 'md:col-span-2' : ''}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
                  transitionDelay: `${(index % 4) * 80}ms`,
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${section.color}30`,
                  backdropFilter: 'blur(24px)',
                  ['--card-glow-color' as string]: `${section.color}25`,
                }}
              >
                {/* Animated top border trace */}
                <div className="absolute top-0 left-0 right-0 h-[3px] overflow-hidden rounded-t-2xl">
                  <div className="h-full w-full" style={{
                    background: `linear-gradient(90deg, transparent 0%, ${section.color} 30%, ${numColor} 60%, transparent 100%)`,
                    backgroundSize: '200% 100%',
                    animation: 'border-trace 2.5s linear infinite',
                  }} />
                </div>

                {/* Animated side glow lines */}
                <div className="absolute top-0 left-0 w-[2px] h-full" style={{ background: `linear-gradient(180deg, ${section.color}60, transparent 50%, ${section.color}30)`, animation: 'shimmer-border 2s ease-in-out infinite' }} />
                <div className="absolute top-0 right-0 w-[2px] h-full" style={{ background: `linear-gradient(180deg, transparent, ${numColor}50, transparent)`, animation: 'shimmer-border 2.5s ease-in-out infinite 0.5s' }} />

                {/* Background glow */}
                <div className="absolute top-0 right-0 w-56 h-56 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${section.glow} 0%, transparent 70%)`, transform: 'translate(30%, -30%)', opacity: 0.5 }} />
                <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${numColor}20 0%, transparent 70%)`, transform: 'translate(-30%, 30%)', opacity: 0.4 }} />

                {/* LARGE COLORFUL SECTION NUMBER — top right corner */}
                <div className="absolute top-3 right-4 pointer-events-none select-none" style={{ zIndex: 2 }}>
                  <span
                    className="number-animated font-black"
                    style={{
                      fontSize: '3.5rem',
                      lineHeight: 1,
                      color: numColor,
                      textShadow: `0 0 20px ${numColor}, 0 0 40px ${numColor}80, 0 0 60px ${numColor}40`,
                      display: 'block',
                    }}
                  >
                    {section.badge}
                  </span>
                </div>

                <div className="relative p-6 pt-5">
                  {/* Card Header */}
                  <div className="flex items-start gap-4 mb-5 pr-16">
                    {/* Logo with spinning ring */}
                    <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                      <div className="spin-ring-1 absolute inset-0 rounded-full" style={{ border: `1.5px dashed ${section.color}60`, borderTopColor: section.color, borderRightColor: 'transparent' }} />
                      <div className="spin-ring-2 absolute rounded-full" style={{ inset: '4px', border: `1px dashed ${numColor}40`, borderBottomColor: numColor, borderLeftColor: 'transparent' }} />
                      <div className="relative w-9 h-9 rounded-full flex items-center justify-center overflow-hidden" style={{ background: `${section.color}15`, border: `1px solid ${section.color}40`, boxShadow: `0 0 15px ${section.glow}` }}>
                        <Image src={LOGO} alt="Karhari Media" width={28} height={28} className="object-contain" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${section.color}15`, border: `1px solid ${section.color}35` }}>
                          <Icon name={section.icon} size={15} style={{ color: section.color }} />
                        </div>
                        <div className="text-xs font-bold uppercase tracking-widest" style={{ color: `${section.color}` }}>Section {section.badge}</div>
                      </div>
                      <h2 className="text-lg font-bold leading-tight" style={{ color: 'rgba(240,248,255,0.97)' }}>{section.title}</h2>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="mb-4 h-px" style={{ background: `linear-gradient(90deg, ${section.color}50, ${numColor}30, transparent)` }} />

                  {/* Content */}
                  <div className="flex flex-col gap-1.5">
                    {renderContent(section.content, section.color)}
                  </div>

                  {/* Footer brand */}
                  <div className="mt-5 pt-4 flex items-center gap-2" style={{ borderTop: `1px solid ${section.color}20` }}>
                    <div className="relative w-5 h-5 flex items-center justify-center">
                      <div className="spin-ring-3 absolute inset-0 rounded-full" style={{ border: `1px dashed ${section.color}40`, borderTopColor: section.color }} />
                      <Image src={LOGO} alt="Karhari Media" width={12} height={12} className="object-contain opacity-60" />
                    </div>
                    <span className="text-xs font-semibold" style={{ color: `${section.color}70` }}>Karhari Media Pvt. Ltd.</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-24 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl p-10 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(77,150,255,0.1) 0%, rgba(204,93,232,0.07) 40%, rgba(32,201,151,0.08) 80%, rgba(255,212,59,0.06) 100%)', border: '1px solid rgba(77,150,255,0.25)', boxShadow: '0 0 80px rgba(77,150,255,0.1)' }}>
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, #4d96ff, #cc5de8, #20c997, #ffd43b, #4d96ff)', backgroundSize: '200% 100%', animation: 'border-trace 3s linear infinite' }} />
            <div className="flex justify-center mb-5">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <div className="spin-ring-1 absolute inset-0 rounded-full" style={{ border: '2px dashed rgba(77,150,255,0.5)', borderTopColor: '#4d96ff', borderRightColor: 'transparent' }} />
                <div className="spin-ring-2 absolute rounded-full" style={{ inset: '6px', border: '2px dashed rgba(204,93,232,0.4)', borderBottomColor: '#cc5de8', borderLeftColor: 'transparent' }} />
                <div className="spin-ring-3 absolute rounded-full" style={{ inset: '14px', border: '1px dashed rgba(32,201,151,0.4)', borderTopColor: '#20c997', borderRightColor: 'transparent' }} />
                <div className="absolute inset-0 rounded-full blur-xl opacity-40" style={{ background: 'radial-gradient(circle, #4d96ff, transparent)' }} />
                <div className="relative w-16 h-16 rounded-full flex items-center justify-center overflow-hidden" style={{ background: 'rgba(77,150,255,0.12)', border: '2px solid rgba(77,150,255,0.45)', boxShadow: '0 0 30px rgba(77,150,255,0.3)' }}>
                  <Image src={LOGO} alt="Karhari Media" width={56} height={56} className="object-contain p-1" />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-black mb-2 text-white">Questions About Our Privacy Policy?</h3>
            <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: 'rgba(190,205,230,0.75)' }}>
              Our team at Karhari Media is here to help. Reach out to us and we&apos;ll respond within 30 days.
            </p>
            <a href="mailto:support@karharimedia.com" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105" style={{ background: 'linear-gradient(135deg, #4d96ff 0%, #cc5de8 100%)', color: '#ffffff', boxShadow: '0 0 30px rgba(77,150,255,0.5)' }}>
              <Icon name="EnvelopeIcon" size={16} />
              Contact Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
