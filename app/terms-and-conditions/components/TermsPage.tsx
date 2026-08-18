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
    id: 'acceptance',
    title: 'Acceptance of Terms',
    icon: 'CheckBadgeIcon',
    color: '#ffd93d',
    glow: 'rgba(255,217,61,0.35)',
    badge: '01',
    content: [
      { type: 'text', text: 'By accessing our website, submitting an application, or entering into a digital contract with Karhari Media, you ("Artist," "Record Label," "YouTube Creator," or "Client") agree to be legally bound by these Terms and Conditions. These Terms constitute a binding legal agreement between you and Karhari Media.' },
      { type: 'heading', text: 'These Terms apply to all services:' },
      { type: 'bullet', text: 'Digital music distribution to streaming and download platforms' },
      { type: 'bullet', text: 'YouTube Multi-Channel Network (MCN) management services' },
      { type: 'bullet', text: 'YouTube Content Management System (CMS) services' },
      { type: 'bullet', text: 'Revenue collection and disbursement services' },
      { type: 'bullet', text: 'Catalog management and metadata services' },
      { type: 'bullet', text: 'UGC platform rights management' },
      { type: 'text', text: 'Karhari Media reserves the right to modify these Terms at any time. Continued use of our services after notification of changes constitutes acceptance of the revised Terms.' },
    ],
  },
  {
    id: 'eligibility',
    title: 'Eligibility & Registration',
    icon: 'UserCircleIcon',
    color: '#4d96ff',
    glow: 'rgba(77,150,255,0.35)',
    badge: '02',
    content: [
      { type: 'heading', text: 'Eligibility Requirements:' },
      { type: 'bullet', text: 'Be at least 18 years of age (or the age of majority in your jurisdiction)' },
      { type: 'bullet', text: 'Have the legal capacity to enter into binding contracts' },
      { type: 'bullet', text: 'Own or control all rights to the content you submit for distribution' },
      { type: 'bullet', text: 'Not be prohibited from using our services under applicable law' },
      { type: 'heading', text: 'Registration & KYC:' },
      { type: 'bullet', text: 'Submission of valid government-issued photo identification (PAN card, Aadhaar, passport, or equivalent)' },
      { type: 'bullet', text: 'Proof of address documentation' },
      { type: 'bullet', text: 'Bank account details for revenue disbursement' },
      { type: 'bullet', text: 'For record labels: Certificate of incorporation, GST registration, and authorized signatory documentation' },
      { type: 'bullet', text: 'For YouTube creators: Verification of channel ownership and compliance with YouTube Partner Program requirements' },
      { type: 'heading', text: 'Digital Contract:' },
      { type: 'text', text: 'All services are governed by a digital contract signed between you and Karhari Media. The digital contract, together with these Terms and Conditions, constitutes the entire agreement between the parties.' },
    ],
  },
  {
    id: 'music-distribution',
    title: 'Music Distribution Services',
    icon: 'MusicalNoteIcon',
    color: '#6bcb77',
    glow: 'rgba(107,203,119,0.35)',
    badge: '03',
    content: [
      { type: 'heading', text: 'Scope of Distribution Services:' },
      { type: 'text', text: 'Karhari Media provides digital music distribution services to 20+ global platforms including Spotify, Apple Music, Amazon Music, YouTube Music, JioSaavn, Gaana, Wynk, Hungama, Deezer, Tidal, Napster, and other stores as available.' },
      { type: 'heading', text: 'Content Ownership & Rights:' },
      { type: 'bullet', text: 'You are the sole and exclusive owner of all rights to the submitted content, or you have obtained all necessary licenses, permissions, and clearances' },
      { type: 'bullet', text: 'The content does not infringe upon any third-party intellectual property rights' },
      { type: 'bullet', text: 'You have obtained all necessary mechanical licenses, synchronization licenses, and master recording rights' },
      { type: 'bullet', text: 'All featured artists, producers, and songwriters have been properly credited and compensated' },
      { type: 'highlight', text: 'Revenue Share: Karhari Media retains 20% of all net revenues. 80% of net revenues are disbursed to the Artist or Record Label.' },
      { type: 'text', text: 'Revenue disbursements are made monthly, subject to a minimum threshold as specified in your digital contract. Net revenues are calculated after deduction of any platform fees, taxes, or withholding amounts.' },
    ],
  },
  {
    id: 'youtube-mcn',
    title: 'YouTube MCN & CMS Services',
    icon: 'PlayCircleIcon',
    color: '#ff6b6b',
    glow: 'rgba(255,107,107,0.35)',
    badge: '04',
    content: [
      { type: 'heading', text: 'YouTube Multi-Channel Network (MCN) Services:' },
      { type: 'text', text: 'Karhari Media operates as an authorized YouTube Multi-Channel Network (MCN) partner. By joining our network, you agree to the following terms.' },
      { type: 'heading', text: 'Eligible Content Categories:' },
      { type: 'bullet', text: 'Music videos and audio-visual content by artists and record labels' },
      { type: 'bullet', text: 'Film, comedy, and entertainment content' },
      { type: 'bullet', text: 'Children\'s educational and entertainment content' },
      { type: 'bullet', text: 'Sports and cricket-related content' },
      { type: 'bullet', text: 'General YouTube creator content' },
      { type: 'highlight', text: 'Revenue Share: Karhari Media retains 20% of all YouTube monetization revenues. 80% of net YouTube revenues are disbursed to the YouTube Creator.' },
      { type: 'heading', text: 'YouTube Partner Program Compliance:' },
      { type: 'bullet', text: 'Maintain compliance with YouTube\'s Community Guidelines at all times' },
      { type: 'bullet', text: 'Adhere to YouTube\'s Monetization Policies and advertiser-friendly content guidelines' },
      { type: 'bullet', text: 'Comply with YouTube\'s Terms of Service and YouTube Partner Program policies' },
      { type: 'bullet', text: 'Properly designate made-for-kids content in accordance with COPPA requirements' },
      { type: 'bullet', text: 'Not engage in artificial view inflation, click fraud, or any form of policy manipulation' },
    ],
  },
  {
    id: 'platform-policies',
    title: 'Platform Policy Compliance',
    icon: 'ShieldCheckIcon',
    color: '#ff922b',
    glow: 'rgba(255,146,43,0.35)',
    badge: '05',
    content: [
      { type: 'text', text: 'Karhari Media strictly adheres to and enforces compliance with the policies of all partner platforms. All clients must comply with the following platform policies.' },
      { type: 'heading', text: 'YouTube Policies:' },
      { type: 'bullet', text: 'YouTube Terms of Service & Community Guidelines' },
      { type: 'bullet', text: 'YouTube Monetization Policies & Partner Program Terms' },
      { type: 'bullet', text: 'YouTube Content ID policies & made-for-kids content rules' },
      { type: 'heading', text: 'Meta (Facebook & Instagram) Policies:' },
      { type: 'bullet', text: 'Facebook Terms of Service and Community Standards' },
      { type: 'bullet', text: 'Instagram Terms of Use and Community Guidelines' },
      { type: 'bullet', text: 'Meta\'s Music Guidelines and Rights Manager policies' },
      { type: 'heading', text: 'TikTok & Digital Music Store Policies:' },
      { type: 'bullet', text: 'TikTok Terms of Service and Community Guidelines' },
      { type: 'bullet', text: 'TikTok\'s Music and Copyright policies' },
      { type: 'bullet', text: 'Spotify, Apple Music, Amazon Music distribution policies' },
      { type: 'heading', text: 'Consequences of Non-Compliance:' },
      { type: 'bullet', text: 'Immediate suspension or termination of your account with Karhari Media' },
      { type: 'bullet', text: 'Removal of your content from distribution platforms' },
      { type: 'bullet', text: 'Forfeiture of pending revenue payments' },
      { type: 'bullet', text: 'Legal action for damages caused to Karhari Media or its partners' },
    ],
  },
  {
    id: 'prohibited-content',
    title: 'Prohibited Content & Activities',
    icon: 'ExclamationTriangleIcon',
    color: '#cc5de8',
    glow: 'rgba(204,93,232,0.35)',
    badge: '06',
    content: [
      { type: 'heading', text: 'Strictly Prohibited Content:' },
      { type: 'bullet', text: 'Infringes upon any copyright, trademark, or other intellectual property rights' },
      { type: 'bullet', text: 'Contains unauthorized samples, interpolations, or third-party recordings' },
      { type: 'bullet', text: 'Promotes hate speech, discrimination, or violence against any individual or group' },
      { type: 'bullet', text: 'Depicts or glorifies illegal activities, terrorism, or extremism' },
      { type: 'bullet', text: 'Constitutes defamation, harassment, or invasion of privacy' },
      { type: 'heading', text: 'Prohibited Activities:' },
      { type: 'bullet', text: 'Artificial streaming, view inflation, or manipulation of platform metrics' },
      { type: 'bullet', text: 'Click fraud or any form of ad fraud' },
      { type: 'bullet', text: 'Unauthorized use of third-party accounts or credentials' },
      { type: 'bullet', text: 'Circumventing platform monetization policies or Content ID systems' },
      { type: 'bullet', text: 'Misrepresenting ownership or rights to submitted content' },
      { type: 'highlight', text: 'Zero-Tolerance Policy: Karhari Media has a zero-tolerance policy for piracy and copyright infringement. Violations result in immediate termination and may lead to legal action.' },
    ],
  },
  {
    id: 'revenue-payments',
    title: 'Revenue Collection & Payments',
    icon: 'BanknotesIcon',
    color: '#20c997',
    glow: 'rgba(32,201,151,0.35)',
    badge: '07',
    content: [
      { type: 'text', text: 'Karhari Media collects revenues on your behalf from all distribution and MCN partner platforms. We act as your authorized representative for the purpose of revenue collection.' },
      { type: 'heading', text: 'Payment Schedule:' },
      { type: 'bullet', text: 'Revenue reports are generated monthly, typically within 45-60 days after the end of each reporting period' },
      { type: 'bullet', text: 'Payments are processed once revenues exceed the minimum threshold specified in your digital contract' },
      { type: 'bullet', text: 'Payment methods include bank transfer (NEFT/RTGS/IMPS), UPI, or other methods as agreed' },
      { type: 'heading', text: 'Revenue Deductions:' },
      { type: 'bullet', text: 'Platform fees and distribution costs charged by partner stores' },
      { type: 'bullet', text: 'Applicable taxes including TDS (Tax Deducted at Source) as per Indian tax laws' },
      { type: 'bullet', text: 'Currency conversion fees for international revenues' },
      { type: 'bullet', text: 'Any chargebacks, refunds, or adjustments required by platforms' },
      { type: 'heading', text: 'Tax Compliance:' },
      { type: 'bullet', text: 'All clients are responsible for their own tax obligations' },
      { type: 'bullet', text: 'Karhari Media will deduct TDS as required under Indian income tax laws' },
      { type: 'bullet', text: 'Clients must provide valid PAN details for tax compliance' },
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property Rights',
    icon: 'DocumentCheckIcon',
    color: '#f06595',
    glow: 'rgba(240,101,149,0.35)',
    badge: '08',
    content: [
      { type: 'heading', text: 'Your Content:' },
      { type: 'text', text: 'You retain full ownership of all intellectual property rights in the content you submit to Karhari Media. By submitting content, you grant Karhari Media a non-exclusive, worldwide, royalty-free license to:' },
      { type: 'bullet', text: 'Distribute, reproduce, and transmit your content to partner platforms' },
      { type: 'bullet', text: 'Create metadata, thumbnails, and promotional materials for distribution purposes' },
      { type: 'bullet', text: 'Manage Content ID and rights claims on your behalf' },
      { type: 'bullet', text: 'Collect revenues generated from your content' },
      { type: 'heading', text: 'ISRC & UPC Codes:' },
      { type: 'text', text: 'ISRC (International Standard Recording Code) and UPC (Universal Product Code) codes issued by Karhari Media for your content remain associated with your recordings. Upon termination of services, you may request transfer of these codes subject to applicable fees.' },
      { type: 'heading', text: 'Copyright Registration:' },
      { type: 'text', text: 'Karhari Media strongly recommends that all artists and record labels register their copyrights with the Copyright Office of India or relevant international bodies. We can assist with copyright registration as an additional service.' },
    ],
  },
  {
    id: 'term-termination',
    title: 'Term & Termination',
    icon: 'XCircleIcon',
    color: '#74c0fc',
    glow: 'rgba(116,192,252,0.35)',
    badge: '09',
    content: [
      { type: 'heading', text: 'Contract Duration:' },
      { type: 'text', text: 'The term of your agreement with Karhari Media is specified in your individual digital contract. Standard agreements are for a minimum period of 1 year, with automatic renewal unless terminated by either party with proper notice.' },
      { type: 'heading', text: 'Termination by Client:' },
      { type: 'bullet', text: 'Provide written notice as specified in your digital contract (typically 30-90 days)' },
      { type: 'bullet', text: 'Content will be removed from distribution platforms within the notice period' },
      { type: 'bullet', text: 'All pending revenues will be disbursed after the final accounting period' },
      { type: 'heading', text: 'Termination by Karhari Media (Immediate):' },
      { type: 'bullet', text: 'Violation of these Terms and Conditions or your digital contract' },
      { type: 'bullet', text: 'Submission of infringing, fraudulent, or prohibited content' },
      { type: 'bullet', text: 'Violation of any platform policy that results in penalties to Karhari Media' },
      { type: 'bullet', text: 'Non-payment of any fees owed to Karhari Media' },
    ],
  },
  {
    id: 'liability',
    title: 'Limitation of Liability',
    icon: 'ScaleIcon',
    color: '#ff6b6b',
    glow: 'rgba(255,107,107,0.35)',
    badge: '10',
    content: [
      { type: 'heading', text: 'Disclaimer of Warranties:' },
      { type: 'text', text: 'Karhari Media\'s services are provided "as is" and "as available" without warranties of any kind, express or implied. We do not warrant that our services will be uninterrupted, error-free, or free from viruses or other harmful components.' },
      { type: 'heading', text: 'Limitation of Liability:' },
      { type: 'bullet', text: 'Indirect, incidental, special, consequential, or punitive damages' },
      { type: 'bullet', text: 'Loss of profits, revenue, data, or business opportunities' },
      { type: 'bullet', text: 'Damages arising from platform policy changes, platform outages, or third-party actions' },
      { type: 'bullet', text: 'Any damages exceeding the total fees paid by you to Karhari Media in the 12 months preceding the claim' },
      { type: 'heading', text: 'Indemnification:' },
      { type: 'text', text: 'You agree to indemnify, defend, and hold harmless Karhari Media, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from your breach of these Terms, content infringement, or violation of any platform policy.' },
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing Law & Dispute Resolution',
    icon: 'BuildingLibraryIcon',
    color: '#a9e34b',
    glow: 'rgba(169,227,75,0.35)',
    badge: '11',
    content: [
      { type: 'heading', text: 'Governing Law:' },
      { type: 'bullet', text: 'The Indian Contract Act, 1872' },
      { type: 'bullet', text: 'The Information Technology Act, 2000' },
      { type: 'bullet', text: 'The Copyright Act, 1957' },
      { type: 'bullet', text: 'The Trade Marks Act, 1999' },
      { type: 'bullet', text: 'The Consumer Protection Act, 2019' },
      { type: 'heading', text: 'Jurisdiction:' },
      { type: 'text', text: 'Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Mumbai & Kolkata, India, unless otherwise agreed in your individual digital contract.' },
      { type: 'heading', text: 'Dispute Resolution Process:' },
      { type: 'bullet', text: 'Informal Resolution: Good-faith negotiation within 30 days of written notice' },
      { type: 'bullet', text: 'Mediation: Through a mutually agreed mediator if informal resolution fails' },
      { type: 'bullet', text: 'Arbitration: Under the Arbitration and Conciliation Act, 1996 (India)' },
      { type: 'bullet', text: 'Litigation: Either party may seek injunctive or equitable relief in court' },
    ],
  },
  {
    id: 'general',
    title: 'General Provisions',
    icon: 'DocumentTextIcon',
    color: '#ffd43b',
    glow: 'rgba(255,212,59,0.35)',
    badge: '12',
    content: [
      { type: 'heading', text: 'Entire Agreement:' },
      { type: 'text', text: 'These Terms and Conditions, together with your individual digital contract and our Privacy Policy, constitute the entire agreement between you and Karhari Media regarding our services and supersede all prior agreements, representations, and understandings.' },
      { type: 'heading', text: 'Severability & Waiver:' },
      { type: 'text', text: 'If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. Failure by Karhari Media to enforce any provision shall not constitute a waiver.' },
      { type: 'heading', text: 'Force Majeure:' },
      { type: 'text', text: 'Karhari Media shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including natural disasters, government actions, platform outages, or other force majeure events.' },
      { type: 'heading', text: 'Language:' },
      { type: 'text', text: 'These Terms are written in English. In the event of any conflict between the English version and any translation, the English version shall prevail.' },
    ],
  },
  {
    id: 'contact',
    title: 'Contact Information',
    icon: 'EnvelopeIcon',
    color: '#da77f2',
    glow: 'rgba(218,119,242,0.35)',
    badge: '13',
    content: [
      { type: 'text', text: 'For any questions, concerns, or notices regarding these Terms and Conditions, please contact us:' },
      { type: 'highlight', text: 'Email: support@karharimedia.com' },
      { type: 'heading', text: 'Headquarters:' },
      { type: 'bullet', text: 'Mumbai, Kolkata, India' },
      { type: 'bullet', text: 'Mumbai Office: WeWork NESCO IT Park, Goregaon East, Mumbai – 400063, MH' },
      { type: 'bullet', text: 'Kolkata Office: New Town, Action Area 3, Rajarhat, Kolkata – 700135, WB' },
      { type: 'text', text: 'All formal legal notices must be sent in writing to our registered address or via email to support@karharimedia.com with the subject line "Legal Notice." We aim to respond to all inquiries within 5 business days and to all legal notices within 15 business days.' },
    ],
  },
];

function Particle({ style }: { style: React.CSSProperties }) {
  return <div className="absolute rounded-full pointer-events-none" style={style} />;
}

export default function TermsAndConditionsPage() {
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
    { width: 6, height: 6, top: '8%', left: '5%', background: '#ffd93d', opacity: 0.7, animation: 'float-note 5s ease-in-out infinite' },
    { width: 4, height: 4, top: '15%', left: '90%', background: '#4d96ff', opacity: 0.6, animation: 'float-note 7s ease-in-out infinite 1s' },
    { width: 8, height: 8, top: '30%', left: '3%', background: '#cc5de8', opacity: 0.5, animation: 'float-note 6s ease-in-out infinite 2s' },
    { width: 5, height: 5, top: '50%', left: '95%', background: '#ff6b6b', opacity: 0.6, animation: 'float-note 8s ease-in-out infinite 0.5s' },
    { width: 7, height: 7, top: '70%', left: '7%', background: '#6bcb77', opacity: 0.5, animation: 'float-note 5.5s ease-in-out infinite 3s' },
    { width: 4, height: 4, top: '85%', left: '88%', background: '#ff922b', opacity: 0.6, animation: 'float-note 6.5s ease-in-out infinite 1.5s' },
    { width: 10, height: 10, top: '20%', left: '50%', background: '#ffd93d', opacity: 0.2, animation: 'blob-drift 10s ease-in-out infinite' },
    { width: 6, height: 6, top: '60%', left: '45%', background: '#20c997', opacity: 0.4, animation: 'float-note 9s ease-in-out infinite 2.5s' },
    { width: 5, height: 5, top: '40%', left: '15%', background: '#f06595', opacity: 0.4, animation: 'float-note 7.5s ease-in-out infinite 1.2s' },
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
    <div className="min-h-screen text-foreground relative overflow-x-hidden" style={{ background: 'linear-gradient(135deg, #050308 0%, #120a05 25%, #1a0a10 50%, #0a0518 75%, #050308 100%)' }}>
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
          0%, 100% { box-shadow: 0 8px 40px rgba(0,0,0,0.5), 0 0 20px var(--card-glow-color, rgba(255,217,61,0.15)); }
          50% { box-shadow: 0 8px 60px rgba(0,0,0,0.4), 0 0 40px var(--card-glow-color, rgba(255,217,61,0.3)), 0 0 80px var(--card-glow-color, rgba(255,217,61,0.1)); }
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
        .card-animated-tc {
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
        <div className="absolute w-[700px] h-[700px] rounded-full opacity-[0.12]" style={{ top: '-15%', left: '-15%', background: 'radial-gradient(circle, #ffd93d 0%, transparent 70%)', animation: 'blob-drift 12s ease-in-out infinite' }} />
        <div className="absolute w-[600px] h-[600px] rounded-full opacity-[0.10]" style={{ top: '25%', right: '-12%', background: 'radial-gradient(circle, #cc5de8 0%, transparent 70%)', animation: 'blob-drift 15s ease-in-out infinite 3s' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-[0.08]" style={{ bottom: '5%', left: '15%', background: 'radial-gradient(circle, #ff6b6b 0%, transparent 70%)', animation: 'blob-drift 18s ease-in-out infinite 6s' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-[0.09]" style={{ top: '55%', right: '25%', background: 'radial-gradient(circle, #4d96ff 0%, transparent 70%)', animation: 'blob-drift 10s ease-in-out infinite 2s' }} />
        <div className="absolute w-[350px] h-[350px] rounded-full opacity-[0.07]" style={{ top: '10%', right: '40%', background: 'radial-gradient(circle, #6bcb77 0%, transparent 70%)', animation: 'blob-drift 14s ease-in-out infinite 4s' }} />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,217,61,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,217,61,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
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
              <div className="spin-ring-1 absolute inset-0 rounded-full" style={{ border: '2px dashed rgba(255,217,61,0.5)', borderTopColor: '#ffd93d', borderRightColor: 'transparent' }} />
              <div className="spin-ring-2 absolute rounded-full" style={{ inset: '8px', border: '2px dashed rgba(204,93,232,0.4)', borderBottomColor: '#cc5de8', borderLeftColor: 'transparent' }} />
              <div className="spin-ring-3 absolute rounded-full" style={{ inset: '16px', border: '1px dashed rgba(255,107,107,0.4)', borderTopColor: '#ff6b6b', borderRightColor: 'transparent' }} />
              <div className="absolute inset-0 rounded-full blur-2xl opacity-40" style={{ background: 'radial-gradient(circle, #ffd93d, transparent)', transform: 'scale(1.3)' }} />
              <div className="relative w-20 h-20 rounded-full flex items-center justify-center overflow-hidden" style={{ background: 'rgba(255,217,61,0.1)', border: '2px solid rgba(255,217,61,0.5)', boxShadow: '0 0 40px rgba(255,217,61,0.4), inset 0 0 20px rgba(255,217,61,0.05)' }}>
                <Image src={LOGO} alt="Karhari Media Logo" width={72} height={72} className="object-contain p-1" />
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(255,217,61,0.12)', border: '1px solid rgba(255,217,61,0.35)', color: '#ffd93d' }}>
            <Icon name="DocumentTextIcon" size={14} />
            Legal Document · Karhari Media Pvt. Ltd.
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none">
            <span className="block text-white">Terms &</span>
            <span className="block" style={{ background: 'linear-gradient(135deg, #ffd93d 0%, #ff922b 30%, #ff6b6b 60%, #cc5de8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Conditions</span>
          </h1>

          <p className="text-lg max-w-2xl mx-auto leading-relaxed mb-8" style={{ color: 'rgba(190,205,235,0.85)' }}>
            Please read these Terms and Conditions carefully before using Karhari Media&apos;s music distribution and YouTube MCN services.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-xs px-4 py-2 rounded-full" style={{ background: 'rgba(255,217,61,0.1)', border: '1px solid rgba(255,217,61,0.25)', color: 'rgba(255,217,61,0.95)' }}>
              <Icon name="CalendarIcon" size={13} />
              Effective Date: August 2025
            </div>
            <div className="flex items-center gap-2 text-xs px-4 py-2 rounded-full" style={{ background: 'rgba(77,150,255,0.1)', border: '1px solid rgba(77,150,255,0.25)', color: 'rgba(116,192,252,0.95)' }}>
              <Icon name="EnvelopeIcon" size={13} />
              support@karharimedia.com
            </div>
            <div className="flex items-center gap-2 text-xs px-4 py-2 rounded-full" style={{ background: 'rgba(107,203,119,0.1)', border: '1px solid rgba(107,203,119,0.25)', color: 'rgba(107,203,119,0.95)' }}>
              <Icon name="MapPinIcon" size={13} />
              Headquarters: Mumbai, Kolkata, India
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice Banner */}
      <section className="px-6 pb-10 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl p-5 flex items-start gap-4" style={{ background: 'linear-gradient(135deg, rgba(255,217,61,0.08) 0%, rgba(255,146,43,0.05) 100%)', border: '1px solid rgba(255,217,61,0.25)', boxShadow: '0 0 30px rgba(255,217,61,0.08)' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(255,217,61,0.15)', border: '1px solid rgba(255,217,61,0.3)' }}>
              <Icon name="ExclamationTriangleIcon" size={16} style={{ color: '#ffd93d' }} />
            </div>
            <div>
              <p className="text-sm font-bold mb-1" style={{ color: '#ffd93d' }}>Important Notice</p>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(190,205,230,0.85)' }}>
                By using Karhari Media&apos;s services, you agree to these Terms and Conditions. These Terms form a legally binding contract. If you do not agree, please do not use our services. For questions, contact us at{' '}
                <a href="mailto:support@karharimedia.com" className="underline" style={{ color: '#ffd93d' }}>support@karharimedia.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="px-6 pb-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,217,61,0.2)', backdropFilter: 'blur(20px)', boxShadow: '0 0 30px rgba(255,217,61,0.05)' }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,217,61,0.15)', border: '1px solid rgba(255,217,61,0.35)' }}>
                <Icon name="ListBulletIcon" size={15} style={{ color: '#ffd93d' }} />
              </div>
              <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#ffd93d' }}>Table of Contents</h2>
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
                className={`relative rounded-2xl overflow-hidden transition-all duration-700 card-animated-tc ${isWide ? 'md:col-span-2' : ''}`}
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
          <div className="rounded-3xl p-10 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(255,217,61,0.1) 0%, rgba(255,146,43,0.07) 30%, rgba(204,93,232,0.07) 70%, rgba(77,150,255,0.08) 100%)', border: '1px solid rgba(255,217,61,0.25)', boxShadow: '0 0 80px rgba(255,217,61,0.1)' }}>
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, #ffd93d, #ff922b, #ff6b6b, #cc5de8, #4d96ff, #ffd93d)', backgroundSize: '200% 100%', animation: 'border-trace 3s linear infinite' }} />
            <div className="flex justify-center mb-5">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <div className="spin-ring-1 absolute inset-0 rounded-full" style={{ border: '2px dashed rgba(255,217,61,0.5)', borderTopColor: '#ffd93d', borderRightColor: 'transparent' }} />
                <div className="spin-ring-2 absolute rounded-full" style={{ inset: '6px', border: '2px dashed rgba(204,93,232,0.4)', borderBottomColor: '#cc5de8', borderLeftColor: 'transparent' }} />
                <div className="spin-ring-3 absolute rounded-full" style={{ inset: '14px', border: '1px dashed rgba(255,107,107,0.4)', borderTopColor: '#ff6b6b', borderRightColor: 'transparent' }} />
                <div className="absolute inset-0 rounded-full blur-xl opacity-40" style={{ background: 'radial-gradient(circle, #ffd93d, transparent)' }} />
                <div className="relative w-16 h-16 rounded-full flex items-center justify-center overflow-hidden" style={{ background: 'rgba(255,217,61,0.12)', border: '2px solid rgba(255,217,61,0.45)', boxShadow: '0 0 30px rgba(255,217,61,0.3)' }}>
                  <Image src={LOGO} alt="Karhari Media" width={56} height={56} className="object-contain p-1" />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-black mb-2 text-white">Have Questions About Our Terms?</h3>
            <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: 'rgba(190,205,230,0.75)' }}>
              Our legal team at Karhari Media is available to clarify any aspect of our Terms and Conditions.
            </p>
            <a href="mailto:support@karharimedia.com" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105" style={{ background: 'linear-gradient(135deg, #ffd93d 0%, #ff922b 100%)', color: '#0a0510', boxShadow: '0 0 30px rgba(255,217,61,0.5)' }}>
              <Icon name="EnvelopeIcon" size={16} />
              Contact Legal Team
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
