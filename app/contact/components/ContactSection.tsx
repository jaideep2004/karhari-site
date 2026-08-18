'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import AppLogo from '../../components/ui/AppLogo';

// ─── Official YouTube SVG Logo ────────────────────────────────────────────────
function YouTubeLogo({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
        fill="#FF0000"
      />
      <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#ffffff" />
    </svg>
  );
}

// ─── Artist Microphone Icon ───────────────────────────────────────────────────
function ArtistIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="9" y="2" width="6" height="11" rx="3" fill="currentColor" opacity="0.9"/>
      <path d="M5 10a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// ─── Record Label / Company Building Icon ────────────────────────────────────
function RecordLabelIcon({ className = 'w-8 h-8', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M5 21V7l7-4 7 4v14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="9" y="13" width="2.5" height="4" rx="0.5" fill="currentColor"/>
      <rect x="12.5" y="13" width="2.5" height="4" rx="0.5" fill="currentColor"/>
      <rect x="9" y="8" width="2.5" height="3" rx="0.5" fill="currentColor"/>
      <rect x="12.5" y="8" width="2.5" height="3" rx="0.5" fill="currentColor"/>
    </svg>
  );
}

// ─── Country Data (All Countries) ────────────────────────────────────────────
const COUNTRIES = [
  { code: 'AF', name: 'Afghanistan', dial: '+93', flag: '🇦🇫' },
  { code: 'AL', name: 'Albania', dial: '+355', flag: '🇦🇱' },
  { code: 'DZ', name: 'Algeria', dial: '+213', flag: '🇩🇿' },
  { code: 'AD', name: 'Andorra', dial: '+376', flag: '🇦🇩' },
  { code: 'AO', name: 'Angola', dial: '+244', flag: '🇦🇴' },
  { code: 'AG', name: 'Antigua and Barbuda', dial: '+1-268', flag: '🇦🇬' },
  { code: 'AR', name: 'Argentina', dial: '+54', flag: '🇦🇷' },
  { code: 'AM', name: 'Armenia', dial: '+374', flag: '🇦🇲' },
  { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺' },
  { code: 'AT', name: 'Austria', dial: '+43', flag: '🇦🇹' },
  { code: 'AZ', name: 'Azerbaijan', dial: '+994', flag: '🇦🇿' },
  { code: 'BS', name: 'Bahamas', dial: '+1-242', flag: '🇧🇸' },
  { code: 'BH', name: 'Bahrain', dial: '+973', flag: '🇧🇭' },
  { code: 'BD', name: 'Bangladesh', dial: '+880', flag: '🇧🇩' },
  { code: 'BB', name: 'Barbados', dial: '+1-246', flag: '🇧🇧' },
  { code: 'BY', name: 'Belarus', dial: '+375', flag: '🇧🇾' },
  { code: 'BE', name: 'Belgium', dial: '+32', flag: '🇧🇪' },
  { code: 'BZ', name: 'Belize', dial: '+501', flag: '🇧🇿' },
  { code: 'BJ', name: 'Benin', dial: '+229', flag: '🇧🇯' },
  { code: 'BT', name: 'Bhutan', dial: '+975', flag: '🇧🇹' },
  { code: 'BO', name: 'Bolivia', dial: '+591', flag: '🇧🇴' },
  { code: 'BA', name: 'Bosnia and Herzegovina', dial: '+387', flag: '🇧🇦' },
  { code: 'BW', name: 'Botswana', dial: '+267', flag: '🇧🇼' },
  { code: 'BR', name: 'Brazil', dial: '+55', flag: '🇧🇷' },
  { code: 'BN', name: 'Brunei', dial: '+673', flag: '🇧🇳' },
  { code: 'BG', name: 'Bulgaria', dial: '+359', flag: '🇧🇬' },
  { code: 'BF', name: 'Burkina Faso', dial: '+226', flag: '🇧🇫' },
  { code: 'BI', name: 'Burundi', dial: '+257', flag: '🇧🇮' },
  { code: 'CV', name: 'Cabo Verde', dial: '+238', flag: '🇨🇻' },
  { code: 'KH', name: 'Cambodia', dial: '+855', flag: '🇰🇭' },
  { code: 'CM', name: 'Cameroon', dial: '+237', flag: '🇨🇲' },
  { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦' },
  { code: 'CF', name: 'Central African Republic', dial: '+236', flag: '🇨🇫' },
  { code: 'TD', name: 'Chad', dial: '+235', flag: '🇹🇩' },
  { code: 'CL', name: 'Chile', dial: '+56', flag: '🇨🇱' },
  { code: 'CN', name: 'China', dial: '+86', flag: '🇨🇳' },
  { code: 'CO', name: 'Colombia', dial: '+57', flag: '🇨🇴' },
  { code: 'KM', name: 'Comoros', dial: '+269', flag: '🇰🇲' },
  { code: 'CG', name: 'Congo', dial: '+242', flag: '🇨🇬' },
  { code: 'CR', name: 'Costa Rica', dial: '+506', flag: '🇨🇷' },
  { code: 'HR', name: 'Croatia', dial: '+385', flag: '🇭🇷' },
  { code: 'CU', name: 'Cuba', dial: '+53', flag: '🇨🇺' },
  { code: 'CY', name: 'Cyprus', dial: '+357', flag: '🇨🇾' },
  { code: 'CZ', name: 'Czech Republic', dial: '+420', flag: '🇨🇿' },
  { code: 'DK', name: 'Denmark', dial: '+45', flag: '🇩🇰' },
  { code: 'DJ', name: 'Djibouti', dial: '+253', flag: '🇩🇯' },
  { code: 'DM', name: 'Dominica', dial: '+1-767', flag: '🇩🇲' },
  { code: 'DO', name: 'Dominican Republic', dial: '+1-809', flag: '🇩🇴' },
  { code: 'EC', name: 'Ecuador', dial: '+593', flag: '🇪🇨' },
  { code: 'EG', name: 'Egypt', dial: '+20', flag: '🇪🇬' },
  { code: 'SV', name: 'El Salvador', dial: '+503', flag: '🇸🇻' },
  { code: 'GQ', name: 'Equatorial Guinea', dial: '+240', flag: '🇬🇶' },
  { code: 'ER', name: 'Eritrea', dial: '+291', flag: '🇪🇷' },
  { code: 'EE', name: 'Estonia', dial: '+372', flag: '🇪🇪' },
  { code: 'SZ', name: 'Eswatini', dial: '+268', flag: '🇸🇿' },
  { code: 'ET', name: 'Ethiopia', dial: '+251', flag: '🇪🇹' },
  { code: 'FJ', name: 'Fiji', dial: '+679', flag: '🇫🇯' },
  { code: 'FI', name: 'Finland', dial: '+358', flag: '🇫🇮' },
  { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷' },
  { code: 'GA', name: 'Gabon', dial: '+241', flag: '🇬🇦' },
  { code: 'GM', name: 'Gambia', dial: '+220', flag: '🇬🇲' },
  { code: 'GE', name: 'Georgia', dial: '+995', flag: '🇬🇪' },
  { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪' },
  { code: 'GH', name: 'Ghana', dial: '+233', flag: '🇬🇭' },
  { code: 'GR', name: 'Greece', dial: '+30', flag: '🇬🇷' },
  { code: 'GD', name: 'Grenada', dial: '+1-473', flag: '🇬🇩' },
  { code: 'GT', name: 'Guatemala', dial: '+502', flag: '🇬🇹' },
  { code: 'GN', name: 'Guinea', dial: '+224', flag: '🇬🇳' },
  { code: 'GW', name: 'Guinea-Bissau', dial: '+245', flag: '🇬🇼' },
  { code: 'GY', name: 'Guyana', dial: '+592', flag: '🇬🇾' },
  { code: 'HT', name: 'Haiti', dial: '+509', flag: '🇭🇹' },
  { code: 'HN', name: 'Honduras', dial: '+504', flag: '🇭🇳' },
  { code: 'HU', name: 'Hungary', dial: '+36', flag: '🇭🇺' },
  { code: 'IS', name: 'Iceland', dial: '+354', flag: '🇮🇸' },
  { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
  { code: 'ID', name: 'Indonesia', dial: '+62', flag: '🇮🇩' },
  { code: 'IR', name: 'Iran', dial: '+98', flag: '🇮🇷' },
  { code: 'IQ', name: 'Iraq', dial: '+964', flag: '🇮🇶' },
  { code: 'IE', name: 'Ireland', dial: '+353', flag: '🇮🇪' },
  { code: 'IL', name: 'Israel', dial: '+972', flag: '🇮🇱' },
  { code: 'IT', name: 'Italy', dial: '+39', flag: '🇮🇹' },
  { code: 'JM', name: 'Jamaica', dial: '+1-876', flag: '🇯🇲' },
  { code: 'JP', name: 'Japan', dial: '+81', flag: '🇯🇵' },
  { code: 'JO', name: 'Jordan', dial: '+962', flag: '🇯🇴' },
  { code: 'KZ', name: 'Kazakhstan', dial: '+7', flag: '🇰🇿' },
  { code: 'KE', name: 'Kenya', dial: '+254', flag: '🇰🇪' },
  { code: 'KI', name: 'Kiribati', dial: '+686', flag: '🇰🇮' },
  { code: 'KW', name: 'Kuwait', dial: '+965', flag: '🇰🇼' },
  { code: 'KG', name: 'Kyrgyzstan', dial: '+996', flag: '🇰🇬' },
  { code: 'LA', name: 'Laos', dial: '+856', flag: '🇱🇦' },
  { code: 'LV', name: 'Latvia', dial: '+371', flag: '🇱🇻' },
  { code: 'LB', name: 'Lebanon', dial: '+961', flag: '🇱🇧' },
  { code: 'LS', name: 'Lesotho', dial: '+266', flag: '🇱🇸' },
  { code: 'LR', name: 'Liberia', dial: '+231', flag: '🇱🇷' },
  { code: 'LY', name: 'Libya', dial: '+218', flag: '🇱🇾' },
  { code: 'LI', name: 'Liechtenstein', dial: '+423', flag: '🇱🇮' },
  { code: 'LT', name: 'Lithuania', dial: '+370', flag: '🇱🇹' },
  { code: 'LU', name: 'Luxembourg', dial: '+352', flag: '🇱🇺' },
  { code: 'MG', name: 'Madagascar', dial: '+261', flag: '🇲🇬' },
  { code: 'MW', name: 'Malawi', dial: '+265', flag: '🇲🇼' },
  { code: 'MY', name: 'Malaysia', dial: '+60', flag: '🇲🇾' },
  { code: 'MV', name: 'Maldives', dial: '+960', flag: '🇲🇻' },
  { code: 'ML', name: 'Mali', dial: '+223', flag: '🇲🇱' },
  { code: 'MT', name: 'Malta', dial: '+356', flag: '🇲🇹' },
  { code: 'MH', name: 'Marshall Islands', dial: '+692', flag: '🇲🇭' },
  { code: 'MR', name: 'Mauritania', dial: '+222', flag: '🇲🇷' },
  { code: 'MU', name: 'Mauritius', dial: '+230', flag: '🇲🇺' },
  { code: 'MX', name: 'Mexico', dial: '+52', flag: '🇲🇽' },
  { code: 'FM', name: 'Micronesia', dial: '+691', flag: '🇫🇲' },
  { code: 'MD', name: 'Moldova', dial: '+373', flag: '🇲🇩' },
  { code: 'MC', name: 'Monaco', dial: '+377', flag: '🇲🇨' },
  { code: 'MN', name: 'Mongolia', dial: '+976', flag: '🇲🇳' },
  { code: 'ME', name: 'Montenegro', dial: '+382', flag: '🇲🇪' },
  { code: 'MA', name: 'Morocco', dial: '+212', flag: '🇲🇦' },
  { code: 'MZ', name: 'Mozambique', dial: '+258', flag: '🇲🇿' },
  { code: 'MM', name: 'Myanmar', dial: '+95', flag: '🇲🇲' },
  { code: 'NA', name: 'Namibia', dial: '+264', flag: '🇳🇦' },
  { code: 'NR', name: 'Nauru', dial: '+674', flag: '🇳🇷' },
  { code: 'NP', name: 'Nepal', dial: '+977', flag: '🇳🇵' },
  { code: 'NL', name: 'Netherlands', dial: '+31', flag: '🇳🇱' },
  { code: 'NZ', name: 'New Zealand', dial: '+64', flag: '🇳🇿' },
  { code: 'NI', name: 'Nicaragua', dial: '+505', flag: '🇳🇮' },
  { code: 'NE', name: 'Niger', dial: '+227', flag: '🇳🇪' },
  { code: 'NG', name: 'Nigeria', dial: '+234', flag: '🇳🇬' },
  { code: 'NO', name: 'Norway', dial: '+47', flag: '🇳🇴' },
  { code: 'OM', name: 'Oman', dial: '+968', flag: '🇴🇲' },
  { code: 'PK', name: 'Pakistan', dial: '+92', flag: '🇵🇰' },
  { code: 'PW', name: 'Palau', dial: '+680', flag: '🇵🇼' },
  { code: 'PA', name: 'Panama', dial: '+507', flag: '🇵🇦' },
  { code: 'PG', name: 'Papua New Guinea', dial: '+675', flag: '🇵🇬' },
  { code: 'PY', name: 'Paraguay', dial: '+595', flag: '🇵🇾' },
  { code: 'PE', name: 'Peru', dial: '+51', flag: '🇵🇪' },
  { code: 'PH', name: 'Philippines', dial: '+63', flag: '🇵🇭' },
  { code: 'PL', name: 'Poland', dial: '+48', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', dial: '+351', flag: '🇵🇹' },
  { code: 'QA', name: 'Qatar', dial: '+974', flag: '🇶🇦' },
  { code: 'RO', name: 'Romania', dial: '+40', flag: '🇷🇴' },
  { code: 'RU', name: 'Russia', dial: '+7', flag: '🇷🇺' },
  { code: 'RW', name: 'Rwanda', dial: '+250', flag: '🇷🇼' },
  { code: 'KN', name: 'Saint Kitts and Nevis', dial: '+1-869', flag: '🇰🇳' },
  { code: 'LC', name: 'Saint Lucia', dial: '+1-758', flag: '🇱🇨' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', dial: '+1-784', flag: '🇻🇨' },
  { code: 'WS', name: 'Samoa', dial: '+685', flag: '🇼🇸' },
  { code: 'SM', name: 'San Marino', dial: '+378', flag: '🇸🇲' },
  { code: 'ST', name: 'Sao Tome and Principe', dial: '+239', flag: '🇸🇹' },
  { code: 'SA', name: 'Saudi Arabia', dial: '+966', flag: '🇸🇦' },
  { code: 'SN', name: 'Senegal', dial: '+221', flag: '🇸🇳' },
  { code: 'RS', name: 'Serbia', dial: '+381', flag: '🇷🇸' },
  { code: 'SC', name: 'Seychelles', dial: '+248', flag: '🇸🇨' },
  { code: 'SL', name: 'Sierra Leone', dial: '+232', flag: '🇸🇱' },
  { code: 'SG', name: 'Singapore', dial: '+65', flag: '🇸🇬' },
  { code: 'SK', name: 'Slovakia', dial: '+421', flag: '🇸🇰' },
  { code: 'SI', name: 'Slovenia', dial: '+386', flag: '🇸🇮' },
  { code: 'SB', name: 'Solomon Islands', dial: '+677', flag: '🇸🇧' },
  { code: 'SO', name: 'Somalia', dial: '+252', flag: '🇸🇴' },
  { code: 'ZA', name: 'South Africa', dial: '+27', flag: '🇿🇦' },
  { code: 'SS', name: 'South Sudan', dial: '+211', flag: '🇸🇸' },
  { code: 'ES', name: 'Spain', dial: '+34', flag: '🇪🇸' },
  { code: 'LK', name: 'Sri Lanka', dial: '+94', flag: '🇱🇰' },
  { code: 'SD', name: 'Sudan', dial: '+249', flag: '🇸🇩' },
  { code: 'SR', name: 'Suriname', dial: '+597', flag: '🇸🇷' },
  { code: 'SE', name: 'Sweden', dial: '+46', flag: '🇸🇪' },
  { code: 'CH', name: 'Switzerland', dial: '+41', flag: '🇨🇭' },
  { code: 'SY', name: 'Syria', dial: '+963', flag: '🇸🇾' },
  { code: 'TW', name: 'Taiwan', dial: '+886', flag: '🇹🇼' },
  { code: 'TJ', name: 'Tajikistan', dial: '+992', flag: '🇹🇯' },
  { code: 'TZ', name: 'Tanzania', dial: '+255', flag: '🇹🇿' },
  { code: 'TH', name: 'Thailand', dial: '+66', flag: '🇹🇭' },
  { code: 'TL', name: 'Timor-Leste', dial: '+670', flag: '🇹🇱' },
  { code: 'TG', name: 'Togo', dial: '+228', flag: '🇹🇬' },
  { code: 'TO', name: 'Tonga', dial: '+676', flag: '🇹🇴' },
  { code: 'TT', name: 'Trinidad and Tobago', dial: '+1-868', flag: '🇹🇹' },
  { code: 'TN', name: 'Tunisia', dial: '+216', flag: '🇹🇳' },
  { code: 'TR', name: 'Turkey', dial: '+90', flag: '🇹🇷' },
  { code: 'TM', name: 'Turkmenistan', dial: '+993', flag: '🇹🇲' },
  { code: 'TV', name: 'Tuvalu', dial: '+688', flag: '🇹🇻' },
  { code: 'UG', name: 'Uganda', dial: '+256', flag: '🇺🇬' },
  { code: 'UA', name: 'Ukraine', dial: '+380', flag: '🇺🇦' },
  { code: 'AE', name: 'United Arab Emirates', dial: '+971', flag: '🇦🇪' },
  { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
  { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
  { code: 'UY', name: 'Uruguay', dial: '+598', flag: '🇺🇾' },
  { code: 'UZ', name: 'Uzbekistan', dial: '+998', flag: '🇺🇿' },
  { code: 'VU', name: 'Vanuatu', dial: '+678', flag: '🇻🇺' },
  { code: 'VE', name: 'Venezuela', dial: '+58', flag: '🇻🇪' },
  { code: 'VN', name: 'Vietnam', dial: '+84', flag: '🇻🇳' },
  { code: 'YE', name: 'Yemen', dial: '+967', flag: '🇾🇪' },
  { code: 'ZM', name: 'Zambia', dial: '+260', flag: '🇿🇲' },
  { code: 'ZW', name: 'Zimbabwe', dial: '+263', flag: '🇿🇼' },
];

// ─── Global Digital Music Distributors (no Indian labels) ────────────────────
const GLOBAL_DISTRIBUTORS = [
  'Single Audio Distribution',
  'DistroKid',
  'TuneCore',
  'CD Baby',
  'Amuse',
  'AWAL',
  'Believe Distribution',
  'The Orchard (Sony)',
  'Empire Distribution',
  'Ingrooves (Universal)',
  'Stem',
  'Symphonic Distribution',
  'RouteNote',
  'Ditto Music',
  'Spinnup (Universal)',
  'Horus Music',
  'Songtrust',
  'Reverbnation',
  'OneRPM',
  'Fuga',
  'Repost by SoundCloud',
  'UnitedMasters',
  'Landr Distribution',
  'Soundrop',
  'Fresh Tunes',
  'iMusician',
  'Octiive',
  'Mondotunes',
  'Indiefy',
  'Record Union',
  'Zebralution',
  'Finetunes',
  'Phonofile',
  'Rebeat Digital',
  'Believe Recordings',
  'Kontor New Media',
  'Altafonte',
  'Believe Digital',
  'Absolute Label Services',
  'Proper Music Distribution',
  'Alliance Entertainment',
  'Baker & Taylor Entertainment',
  'Ingram Entertainment',
  'MVD Entertainment Group',
  'Other',
];

// ─── Catalog Dropdown Ranges ──────────────────────────────────────────────────
const TOTAL_ARTISTS_RANGES = [
  '1 – 5',
  '6 – 10',
  '11 – 25',
  '26 – 50',
  '51 – 100',
  '101 – 250',
  '251 – 500',
  '501 – 1,000',
  '1,000 – 5,000',
  '5,000+',
];

const TOTAL_LABELS_RANGES = [
  '1',
  '2 – 3',
  '4 – 5',
  '6 – 10',
  '11 – 20',
  '21 – 50',
  '51 – 100',
  '100+',
];

const TOTAL_TRACKS_RANGES = [
  'Under 50',
  '50 – 100',
  '101 – 250',
  '251 – 500',
  '501 – 1,000',
  '1,001 – 5,000',
  '5,001 – 10,000',
  '10,001 – 50,000',
  '50,000+',
];

// ─── Types ───────────────────────────────────────────────────────────────────
interface FormData {
  iAmType: string;
  // Artist fields
  artistFullName: string;
  artistEmail: string;
  artistCountryCode: string;
  artistPhone: string;
  artistName: string;
  artistSongCount: string;
  artistYouTubeUrl: string;
  artistInstagramUrl: string;
  artistAppleMusicUrl: string;
  artistSpotifyUrl: string;
  artistOtherSocialUrls: string;
  artistSongRightsOwnership: string;
  artistUsedCopyrightedMusic: string;
  // Record Label fields
  labelFullLegalName: string;
  labelContactEmail: string;
  labelPersonCountryCode: string;
  labelPersonPhone: string;
  labelCompanyName: string;
  labelRegistrationNumber: string;
  labelCompanyAddress: string;
  labelCompanyWebsite: string;
  labelCountry: string;
  labelCity: string;
  labelNumberOfArtists: string;
  labelNumberOfLabels: string;
  labelNumberOfSongs: string;
  labelPreviousDistributor: string;
  labelDistributorName: string;
  labelHasArtistAgreements: string;
  labelMonthlyRevenue: string;
  labelLegalRepName: string;
  labelAdditionalInfo: string;
  // YouTube CMS fields
  ytcmsFullName: string;
  ytcmsEmail: string;
  ytcmsCountryCode: string;
  ytcmsPhone: string;
  ytcmsAddress: string;
  ytcmsCountry: string;
  ytcmsChannelName: string;
  ytcmsChannelId: string;
  ytcmsChannelUrl: string;
  ytcmsSubscribers: string;
  ytcmsMonthlyViews: string;
  ytcmsMonthlyRevenue: string;
  ytcmsMonetized: string;
  ytcmsOriginalContent: string;
  ytcmsCopyrightStrike: string;
  ytcmsPolicyViolation: string;
  ytcmsContentType: string;
  // General
  message: string;
}

const contactInfo = [
  { icon: EnvelopeIcon, label: 'Email', value: 'support@karharimedia.com', href: 'mailto:support@karharimedia.com' },
  { icon: PhoneIcon, label: 'Phone', value: '+91 9832703698', href: 'tel:+919832703698' },
  { icon: MapPinIcon, label: 'Headquarters', value: 'Mumbai, Kolkata, India', href: '#' },
];

// ─── Dropdown Ranges ─────────────────────────────────────────────────────────
const SUBSCRIBER_RANGES = [
  'Under 1,000',
  '1,000 – 5,000',
  '5,000 – 10,000',
  '10,000 – 50,000',
  '50,000 – 1,00,000',
  '1,00,000 – 5,00,000',
  '5,00,000 – 10,00,000',
  '10,00,000 – 50,00,000',
  '50,00,000 – 1,00,00,000',
  '1,00,00,000+',
];

const MONTHLY_VIEWS_RANGES = [
  'Under 10,000',
  '10,000 – 50,000',
  '50,000 – 1,00,000',
  '1,00,000 – 5,00,000',
  '5,00,000 – 10,00,000',
  '10,00,000 – 50,00,000',
  '50,00,000 – 1,00,00,000',
  '1,00,00,000 – 5,00,00,000',
  '5,00,00,000+',
];

const MONTHLY_REVENUE_RANGES = [
  'Under $50',
  '$50 – $200',
  '$200 – $500',
  '$500 – $1,000',
  '$1,000 – $3,000',
  '$3,000 – $5,000',
  '$5,000 – $10,000',
  '$10,000 – $25,000',
  '$25,000+',
];

const CHANNEL_CONTENT_TYPES = [
  'Music Channel',
  'Entertainment Channel',
  "Children\'s Channel",
  'Dance Channel',
  'Comedy Channel',
  'Education Channel',
  'Gaming Channel',
  'News & Politics Channel',
  'Sports Channel',
  'Technology Channel',
  'Travel & Vlog Channel',
  'Food & Cooking Channel',
  'Fashion & Beauty Channel',
  'Fitness & Health Channel',
  'Devotional / Spiritual Channel',
  'Short Films & Web Series',
  'Animation Channel',
  'Other',
];

// ─── Country Selector Component (phone dial code) ────────────────────────────
function CountrySelector({ selected, onSelect }: { selected: string; onSelect: (code: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropRef = useRef<HTMLDivElement>(null);

  const country = COUNTRIES.find((c) => c.code === selected) || COUNTRIES.find((c) => c.code === 'IN') || COUNTRIES[0];
  const filtered = COUNTRIES.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.dial.includes(search)
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={dropRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 h-full border-r border-border bg-muted/40 rounded-l-xl hover:bg-muted/70 transition-colors min-w-[80px]"
      >
        <span className="text-lg leading-none">{country.flag}</span>
        <span className="text-xs font-semibold text-foreground">{country.dial}</span>
        <ChevronDownIcon className={`w-3 h-3 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 w-72 bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
          <div className="p-2 border-b border-border">
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
              <MagnifyingGlassIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country..."
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
              />
            </div>
          </div>
          <div className="max-h-56 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">No countries found</p>
            ) : (
              filtered.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => { onSelect(c.code); setOpen(false); setSearch(''); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-primary/10 transition-colors ${selected === c.code ? 'bg-primary/10' : ''}`}
                >
                  <span className="text-lg leading-none">{c.flag}</span>
                  <span className="text-sm font-medium text-foreground flex-1">{c.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">{c.dial}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Country Dropdown (full country select) ───────────────────────────────────
const TOP_COUNTRIES = ['US', 'IN', 'GB', 'CA', 'AU', 'DE', 'FR', 'BR', 'JP', 'NG'];

function CountryDropdown({ selected, onSelect, className = '' }: { selected: string; onSelect: (code: string) => void; className?: string }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropRef = useRef<HTMLDivElement>(null);

  const country = COUNTRIES.find((c) => c.code === selected);
  const filtered = COUNTRIES.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase())
  );

  // When no search, show top 10 first then rest
  const displayList = search
    ? filtered
    : [
        ...TOP_COUNTRIES.map((code) => COUNTRIES.find((c) => c.code === code)!).filter(Boolean),
        ...COUNTRIES.filter((c) => !TOP_COUNTRIES.includes(c.code)),
      ];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={dropRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 px-4 py-3 border border-border rounded-xl bg-muted/20 hover:border-primary/40 transition-all text-left"
        style={{ borderColor: 'rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.04)' }}
      >
        {country ? (
          <>
            <span className="text-lg leading-none">{country.flag}</span>
            <span className="text-sm font-medium text-foreground flex-1">{country.name}</span>
          </>
        ) : (
          <span className="text-sm text-muted-foreground flex-1">Select your country</span>
        )}
        <ChevronDownIcon className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className="absolute left-0 top-full mt-1 w-full bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
          style={{ zIndex: 9999 }}
        >
          <div className="p-2 border-b border-border bg-card">
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
              <MagnifyingGlassIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country..."
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
              />
            </div>
            {!search && (
              <p className="text-xs text-muted-foreground mt-1.5 px-1">Popular countries shown first — scroll for full list</p>
            )}
          </div>
          <div className="max-h-60 overflow-y-auto">
            {!search && (
              <div className="px-3 py-1.5 bg-muted/30">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Popular</span>
              </div>
            )}
            {displayList.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">No countries found</p>
            ) : (
              displayList.map((c, idx) => (
                <React.Fragment key={c.code}>
                  {!search && idx === TOP_COUNTRIES.length && (
                    <div className="px-3 py-1.5 bg-muted/30 border-t border-border">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">All Countries</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => { onSelect(c.code); setOpen(false); setSearch(''); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-primary/10 transition-colors ${selected === c.code ? 'bg-primary/10' : ''}`}
                  >
                    <span className="text-lg leading-none">{c.flag}</span>
                    <span className="text-sm font-medium text-foreground flex-1">{c.name}</span>
                  </button>
                </React.Fragment>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState<FormData>({
    iAmType: '',
    // Artist
    artistFullName: '',
    artistEmail: '',
    artistCountryCode: 'IN',
    artistPhone: '',
    artistName: '',
    artistSongCount: '',
    artistYouTubeUrl: '',
    artistInstagramUrl: '',
    artistAppleMusicUrl: '',
    artistSpotifyUrl: '',
    artistOtherSocialUrls: '',
    artistSongRightsOwnership: '',
    artistUsedCopyrightedMusic: '',
    // Record Label
    labelFullLegalName: '',
    labelContactEmail: '',
    labelPersonCountryCode: 'IN',
    labelPersonPhone: '',
    labelCompanyName: '',
    labelRegistrationNumber: '',
    labelCompanyAddress: '',
    labelCompanyWebsite: '',
    labelCountry: '',
    labelCity: '',
    labelNumberOfArtists: '',
    labelNumberOfLabels: '',
    labelNumberOfSongs: '',
    labelPreviousDistributor: '',
    labelDistributorName: '',
    labelHasArtistAgreements: '',
    labelMonthlyRevenue: '',
    labelLegalRepName: '',
    labelAdditionalInfo: '',
    // YouTube CMS
    ytcmsFullName: '',
    ytcmsEmail: '',
    ytcmsCountryCode: 'IN',
    ytcmsPhone: '',
    ytcmsAddress: '',
    ytcmsCountry: '',
    ytcmsChannelName: '',
    ytcmsChannelId: '',
    ytcmsChannelUrl: '',
    ytcmsSubscribers: '',
    ytcmsMonthlyViews: '',
    ytcmsMonthlyRevenue: '',
    ytcmsMonetized: '',
    ytcmsOriginalContent: '',
    ytcmsCopyrightStrike: '',
    ytcmsPolicyViolation: '',
    ytcmsContentType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [policyAgreements, setPolicyAgreements] = useState({
    monetizationPolicy: false,
    communityGuidelines: false,
    cmsPolicy: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.section-enter').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (submitError) setSubmitError(null);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const buildMailPayload = (): { subject: string; body: string } => {
    const artistCountry = COUNTRIES.find((c) => c.code === formData.artistCountryCode);
    const labelPersonCountry = COUNTRIES.find((c) => c.code === formData.labelPersonCountryCode);
    const labelCountryName = COUNTRIES.find((c) => c.code === formData.labelCountry)?.name || formData.labelCountry;
    const ytcmsCountryDialCountry = COUNTRIES.find((c) => c.code === formData.ytcmsCountryCode);
    const ytcmsCountryName = COUNTRIES.find((c) => c.code === formData.ytcmsCountry)?.name || formData.ytcmsCountry;

    let subject = '';
    let body = '';

    if (formData.iAmType === 'artist') {
      subject = `Artist Partnership Application — ${formData.artistName || formData.artistFullName || 'New Artist'}`;
      body = [
        '=== ARTIST PARTNERSHIP APPLICATION ===',
        '',
        '--- Basic Information ---',
        `Full Name: ${formData.artistFullName || '—'}`,
        `Email Address: ${formData.artistEmail || '—'}`,
        `Phone Number: ${artistCountry ? `${artistCountry.flag} ${artistCountry.dial}` : ''} ${formData.artistPhone || '—'}`,
        '',
        '--- Artist Information ---',
        `Artist / Band Name: ${formData.artistName || '—'}`,
        `Number of Songs: ${formData.artistSongCount || '—'}`,
        '',
        '--- Social Media & Streaming URLs ---',
        `YouTube Channel URL: ${formData.artistYouTubeUrl || '—'}`,
        `Instagram Profile URL: ${formData.artistInstagramUrl || '—'}`,
        `Apple Music Profile URL: ${formData.artistAppleMusicUrl || '—'}`,
        `Spotify Artist URL: ${formData.artistSpotifyUrl || '—'}`,
        `Other Social Media URLs: ${formData.artistOtherSocialUrls || '—'}`,
        '',
        '--- Song Rights & Copyright ---',
        `Owns All Song Rights: ${formData.artistSongRightsOwnership === 'yes' ? 'Yes' : formData.artistSongRightsOwnership === 'no' ? 'No — Shared / Licensed' : '—'}`,
        `Used Copyrighted / Looped Music: ${formData.artistUsedCopyrightedMusic === 'yes' ? 'Yes' : formData.artistUsedCopyrightedMusic === 'no' ? 'No' : '—'}`,
        '',
        '--- Additional Information ---',
        formData.message || '—',
        '',
        '=====================================',
        'Submitted via Karhari Media Contact Form',
      ].join('\n');

    } else if (formData.iAmType === 'record-label') {
      subject = `Record Label Partnership Application — ${formData.labelCompanyName || formData.labelFullLegalName || 'New Label'}`;
      body = [
        '=== RECORD LABEL PARTNERSHIP APPLICATION ===',
        '',
        '--- Basic Information ---',
        `Full Legal Name: ${formData.labelFullLegalName || '—'}`,
        `Contact Email: ${formData.labelContactEmail || '—'}`,
        `Phone Number: ${labelPersonCountry ? `${labelPersonCountry.flag} ${labelPersonCountry.dial}` : ''} ${formData.labelPersonPhone || '—'}`,
        '',
        '--- Company / Label Details ---',
        `Company / Label Name: ${formData.labelCompanyName || '—'}`,
        `Company Registration Number: ${formData.labelRegistrationNumber || '—'}`,
        `Company Address: ${formData.labelCompanyAddress || '—'}`,
        `Company / Label Website URL: ${formData.labelCompanyWebsite || '—'}`,
        '',
        '--- Country & City ---',
        `Country: ${labelCountryName || '—'}`,
        `City: ${formData.labelCity || '—'}`,
        '',
        '--- Catalog & Scale ---',
        `Total Artists: ${formData.labelNumberOfArtists || '—'}`,
        `Total Record Labels: ${formData.labelNumberOfLabels || '—'}`,
        `Total Music Catalog: ${formData.labelNumberOfSongs || '—'}`,
        '',
        '--- Music Distribution Partners ---',
        `Previous / Current Distributor: ${formData.labelPreviousDistributor || '—'}`,
        `Current / Primary Distributor Name: ${formData.labelDistributorName || '—'}`,
        '',
        '--- Agreements & Revenue ---',
        `Holds All Artist Agreements: ${formData.labelHasArtistAgreements === 'yes' ? 'Yes — All agreements in place' : formData.labelHasArtistAgreements === 'no' ? 'No — Incomplete' : '—'}`,
        `Monthly Revenue (USD): ${formData.labelMonthlyRevenue || '—'}`,
        '',
        '--- Legal Representative ---',
        `Legal Name of Company Representative: ${formData.labelLegalRepName || '—'}`,
        '',
        '--- Additional Information ---',
        formData.message || '—',
        '',
        '============================================',
        'Submitted via Karhari Media Contact Form',
      ].join('\n');

    } else if (formData.iAmType === 'youtube-cms') {
      subject = `YouTube MCN Application — ${formData.ytcmsChannelName || formData.ytcmsFullName || 'New Channel'}`;
      body = [
        '=== YOUTUBE MULTI CHANNEL NETWORK APPLICATION ===',
        '',
        '--- Basic Information ---',
        `Full Name: ${formData.ytcmsFullName || '—'}`,
        `Email Address: ${formData.ytcmsEmail || '—'}`,
        `Phone Number: ${ytcmsCountryDialCountry ? `${ytcmsCountryDialCountry.flag} ${ytcmsCountryDialCountry.dial}` : ''} ${formData.ytcmsPhone || '—'}`,
        `Full Address: ${formData.ytcmsAddress || '—'}`,
        `Country: ${ytcmsCountryName || '—'}`,
        '',
        '--- YouTube Channel Details ---',
        `YouTube Channel Name: ${formData.ytcmsChannelName || '—'}`,
        `Original Channel ID: ${formData.ytcmsChannelId || '—'}`,
        `Channel URL: ${formData.ytcmsChannelUrl || '—'}`,
        `Total Subscribers: ${formData.ytcmsSubscribers || '—'}`,
        `Monthly Views: ${formData.ytcmsMonthlyViews || '—'}`,
        `Monthly Revenue (USD): ${formData.ytcmsMonthlyRevenue || '—'}`,
        `Content Type: ${formData.ytcmsContentType || '—'}`,
        '',
        '--- Channel Status & Compliance ---',
        `Channel Monetized: ${formData.ytcmsMonetized === 'yes' ? 'Yes' : formData.ytcmsMonetized === 'no' ? 'No' : '—'}`,
        `Original Content: ${formData.ytcmsOriginalContent === 'yes' ? 'Yes — Original Content' : formData.ytcmsOriginalContent === 'no' ? 'No — Copyrighted Content' : '—'}`,
        `Has Copyright Strike: ${formData.ytcmsCopyrightStrike === 'yes' ? 'Yes' : formData.ytcmsCopyrightStrike === 'no' ? 'No' : '—'}`,
        `Has Policy Violation: ${formData.ytcmsPolicyViolation === 'yes' ? 'Yes' : formData.ytcmsPolicyViolation === 'no' ? 'No' : '—'}`,
        '',
        '--- Policy Agreements ---',
        `YouTube Monetization Policy: ${policyAgreements.monetizationPolicy ? 'Agreed' : 'Not agreed'}`,
        `YouTube Community Guidelines: ${policyAgreements.communityGuidelines ? 'Agreed' : 'Not agreed'}`,
        `YouTube CMS Content Policies & Terms: ${policyAgreements.cmsPolicy ? 'Agreed' : 'Not agreed'}`,
        '',
        '--- Additional Information ---',
        formData.message || '—',
        '',
        '=================================================',
        'Submitted via Karhari Media Contact Form',
      ].join('\n');
    }

    return { subject, body };
  };

  const getReplyToEmail = (): string => {
    if (formData.iAmType === 'artist') return formData.artistEmail;
    if (formData.iAmType === 'record-label') return formData.labelContactEmail;
    if (formData.iAmType === 'youtube-cms') return formData.ytcmsEmail;
    return '';
  };

  const getSenderName = (): string => {
    if (formData.iAmType === 'artist') return formData.artistFullName;
    if (formData.iAmType === 'record-label') return formData.labelFullLegalName;
    if (formData.iAmType === 'youtube-cms') return formData.ytcmsFullName;
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);
    try {
      const { subject, body } = buildMailPayload();
      const replyTo = getReplyToEmail();
      if (!replyTo) {
        throw new Error('Please enter your email address above.');
      }
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          body,
          replyTo,
          fromName: getSenderName(),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.error ||
            'Your application could not be sent. Please try again or email us directly at support@karharimedia.com.'
        );
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or email us directly at support@karharimedia.com.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-16 sm:py-24 border-t border-border relative overflow-hidden">
      {/* Colorful animated orbs */}
      <div className="absolute bottom-0 right-0 w-96 h-96 blob-blue opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-64 h-64 blob-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-80 h-80 orb-pink opacity-25 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 orb-teal opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-60 h-60 orb-orange opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 section-enter">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 block">Work With Us</span>
          <h2 className="text-section-title font-extrabold text-foreground mb-4">Ready to Partner?</h2>
          <p className="text-muted-foreground font-medium max-w-lg mx-auto text-sm sm:text-base">
            Whether you&apos;re an independent artist or a record label, fill out the form below and our team will reach out within 48 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Left: Info panel */}
          <div className="lg:col-span-4 flex flex-col gap-5 sm:gap-6">
            {/* Brand card */}
            <div className="section-enter stagger-1 bento-card neon-card p-6 sm:p-8" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3 mb-5">
                <AppLogo src="/assets/images/1608452013412__1_-1786284315378.png" size={40} />
                <div>
                  <p className="font-bold text-foreground text-base">Karhari Media</p>
                  <p className="text-xs text-muted-foreground font-medium">Pvt. Ltd. · Est. 2014</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium mb-5">
                India&apos;s growing digital music distribution company, trusted by thousands of artists and labels. Registered as Private Limited in 2022.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Spotify Partner', 'TikTok Partner', 'Meta Partner', 'YouTube Partner'].map((tag) => (
                  <span key={tag} className="text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">{tag}</span>
                ))}
              </div>
            </div>

            {/* Contact details */}
            <div className="section-enter stagger-2 bento-card neon-card p-6 sm:p-8 space-y-5" style={{ animationDelay: '0.5s' }}>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Get In Touch</h3>
              {contactInfo.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <a key={item.label} href={item.href} className="flex items-start gap-3 group">
                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                      <ItemIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-0.5">{item.label}</p>
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{item.value}</p>
                    </div>
                  </a>
                );
              })}
              {/* Mumbai Address */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">Mumbai Office</p>
                  <p className="text-sm font-semibold text-foreground leading-relaxed">WeWork NESCO IT Park 10th Floor, Building 4, NESCO IT Park Western Express Highway, Goregaon (East) Mumbai – 400063, Maharashtra, India</p>
                </div>
              </div>
              {/* Kolkata Address */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">Kolkata Office</p>
                  <p className="text-sm font-semibold text-foreground leading-relaxed">Shop No. 3, Market Area, Patharghata, Behind Shapoorji Complex, New Town, Action Area 3, Rajarhat, Kolkata – 700135, West Bengal, India</p>
                </div>
              </div>
            </div>

            {/* Quick facts */}
            <div className="section-enter stagger-3 glass-card-lime neon-card rounded-2xl p-5 sm:p-6 border border-primary/15" style={{ animationDelay: '0.8s' }}>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">What Happens Next</p>
              <div className="space-y-2.5">
                {['We review your application within 24 hours', 'Agreement signing and onboarding call', 'Music delivered to all platforms in 5–7 days'].map((step, i) => (
                  <div key={step} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-xs sm:text-sm font-medium text-foreground/80">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-8 section-enter stagger-2">
            <div className="bento-card neon-card p-6 sm:p-10" style={{ animationDelay: '0.4s' }}>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mb-5 lime-glow">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mb-2">Application Submitted!</h3>
                  <p className="text-muted-foreground font-medium text-sm sm:text-base max-w-sm">
                    Thank you for reaching out. Our team will review your application and contact you within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">

                  {/* ── Section 1: I Am A ── */}
                  <div>
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-primary mb-5 flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">1</span>
                      <span className="text-base sm:text-lg">I Am A</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                      {/* Artist */}
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, iAmType: 'artist' }))}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                          formData.iAmType === 'artist' ?'border-primary bg-primary/10 shadow-lg shadow-primary/20' :'border-border bg-muted/20 hover:border-primary/40 hover:bg-primary/5'
                        }`}
                      >
                        <ArtistIcon className={`w-8 h-8 ${formData.iAmType === 'artist' ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className={`text-sm font-bold text-center ${formData.iAmType === 'artist' ? 'text-primary' : 'text-foreground'}`}>Artist</span>
                        <span className="text-xs text-muted-foreground">Solo / Band</span>
                      </button>

                      {/* Record Label */}
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, iAmType: 'record-label' }))}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                          formData.iAmType === 'record-label' ?'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20' :'border-border bg-muted/20 hover:border-blue-400/40 hover:bg-blue-500/5'
                        }`}
                      >
                        <RecordLabelIcon className={`w-8 h-8 ${formData.iAmType === 'record-label' ? 'text-blue-400' : 'text-muted-foreground'}`} />
                        <span className={`text-sm font-bold text-center ${formData.iAmType === 'record-label' ? 'text-blue-400' : 'text-foreground'}`}>Record Label</span>
                        <span className="text-xs text-muted-foreground">Label / Company</span>
                      </button>

                      {/* YouTube MCN */}
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, iAmType: 'youtube-cms' }))}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                          formData.iAmType === 'youtube-cms' ?'border-red-500 bg-red-500/10 shadow-lg shadow-red-500/20' :'border-border bg-muted/20 hover:border-red-400/40 hover:bg-red-500/5'
                        }`}
                      >
                        <YouTubeLogo className="w-8 h-8" />
                        <span className={`text-sm font-bold text-center ${formData.iAmType === 'youtube-cms' ? 'text-red-400' : 'text-foreground'}`}>YouTube Multi Channel Network</span>
                        <span className="text-xs text-muted-foreground">YouTube CMS</span>
                      </button>
                    </div>

                    {/* ── Artist Fields ── */}
                    {formData.iAmType === 'artist' && (
                      <div className="space-y-4 animate-fadeIn">
                        {/* Basic Information */}
                        <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                            <p className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-2 flex-shrink-0">
                              <ArtistIcon className="w-4 h-4 text-primary" />
                              Basic Information
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed sm:ml-2">
                              Karhari Media manages music for artists and record labels, and also manages hundreds of thousands of channels on YouTube through the YouTube Multi-Channel Network. Whatever service you require, please fill out this form and send it to us.
                            </p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Full Name <span className="text-primary">*</span></label>
                              <input type="text" name="artistFullName" value={formData.artistFullName} onChange={handleChange} required placeholder="Your legal full name" className="form-input" />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Email Address <span className="text-primary">*</span></label>
                              <input type="email" name="artistEmail" value={formData.artistEmail} onChange={handleChange} required placeholder="your@email.com" className="form-input" />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Phone Number</label>
                              <div className="flex items-stretch border border-border rounded-xl overflow-visible bg-muted/20 focus-within:border-primary/60 focus-within:ring-1 focus-within:ring-primary/30 transition-all">
                                <CountrySelector
                                  selected={formData.artistCountryCode}
                                  onSelect={(code) => setFormData((prev) => ({ ...prev, artistCountryCode: code }))}
                                />
                                <input
                                  type="tel"
                                  name="artistPhone"
                                  value={formData.artistPhone}
                                  onChange={handleChange}
                                  placeholder="98765 43210"
                                  className="flex-1 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Artist Info */}
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-4">
                          <p className="text-xs font-bold text-primary uppercase tracking-wider">Artist Information</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Artist / Band Name <span className="text-primary">*</span></label>
                              <input type="text" name="artistName" value={formData.artistName} onChange={handleChange} placeholder="e.g. Rahul Beats" className="form-input" />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Number of Songs <span className="text-primary">*</span></label>
                              <input type="number" name="artistSongCount" value={formData.artistSongCount} onChange={handleChange} placeholder="e.g. 25" min="0" className="form-input" />
                            </div>
                          </div>
                        </div>

                        {/* Social Media URLs */}
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-4">
                          <p className="text-xs font-bold text-primary uppercase tracking-wider">Social Media &amp; Streaming URLs</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">YouTube Channel URL</label>
                              <input type="url" name="artistYouTubeUrl" value={formData.artistYouTubeUrl} onChange={handleChange} placeholder="https://youtube.com/@yourchannel" className="form-input" />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Instagram Profile URL</label>
                              <input type="url" name="artistInstagramUrl" value={formData.artistInstagramUrl} onChange={handleChange} placeholder="https://instagram.com/yourprofile" className="form-input" />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Apple Music Profile URL</label>
                              <input type="url" name="artistAppleMusicUrl" value={formData.artistAppleMusicUrl} onChange={handleChange} placeholder="https://music.apple.com/artist/..." className="form-input" />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Spotify Artist URL</label>
                              <input type="url" name="artistSpotifyUrl" value={formData.artistSpotifyUrl} onChange={handleChange} placeholder="https://open.spotify.com/artist/..." className="form-input" />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Other Social Media URLs</label>
                              <input type="text" name="artistOtherSocialUrls" value={formData.artistOtherSocialUrls} onChange={handleChange} placeholder="Facebook, Twitter, TikTok, SoundCloud, etc." className="form-input" />
                            </div>
                          </div>
                        </div>

                        {/* Song Rights & Copyright */}
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-5">
                          <p className="text-xs font-bold text-primary uppercase tracking-wider">Song Rights &amp; Copyright Information</p>
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                              Do you own the rights to all your songs? <span className="text-primary">*</span>
                            </label>
                            <div className="flex gap-3">
                              {[{ v: 'yes', l: '✅ Yes — I own all rights' }, { v: 'no', l: '❌ No — Shared / Licensed' }].map((opt) => (
                                <button
                                  key={opt.v}
                                  type="button"
                                  onClick={() => setFormData((prev) => ({ ...prev, artistSongRightsOwnership: opt.v }))}
                                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all ${
                                    formData.artistSongRightsOwnership === opt.v
                                      ? 'border-primary bg-primary/15 text-primary' :'border-border bg-muted/20 text-muted-foreground hover:border-primary/40'
                                  }`}
                                >
                                  {opt.l}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                              Have you used any looped or copyrighted music in your songs? <span className="text-primary">*</span>
                            </label>
                            <p className="text-xs text-muted-foreground mb-3">This includes samples, loops, beats, or any third-party copyrighted audio material.</p>
                            <div className="flex gap-3">
                              {[{ v: 'yes', l: '⚠️ Yes' }, { v: 'no', l: '✅ No' }].map((opt) => (
                                <button
                                  key={opt.v}
                                  type="button"
                                  onClick={() => setFormData((prev) => ({ ...prev, artistUsedCopyrightedMusic: opt.v }))}
                                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all ${
                                    formData.artistUsedCopyrightedMusic === opt.v
                                      ? 'border-primary bg-primary/15 text-primary' :'border-border bg-muted/20 text-muted-foreground hover:border-primary/40'
                                  }`}
                                >
                                  {opt.l}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── Record Label Fields ── */}
                    {formData.iAmType === 'record-label' && (
                      <div className="space-y-5 animate-fadeIn">

                        {/* ── Box 1: Basic Information — Cyan/Teal glow ── */}
                        <div
                          className="relative p-5 rounded-2xl space-y-4 overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(20,184,166,0.06) 100%)',
                            border: '1.5px solid rgba(6,182,212,0.35)',
                            boxShadow: '0 0 18px rgba(6,182,212,0.18), inset 0 0 30px rgba(6,182,212,0.04)',
                          }}
                        >
                          {/* Animated shimmer line */}
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 animate-pulse" />
                          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                            <p className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 flex-shrink-0" style={{ color: '#22d3ee' }}>
                              <RecordLabelIcon className="w-4 h-4" style={{ color: '#22d3ee' } as React.CSSProperties} />
                              Basic Information
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed sm:ml-2">
                              Karhari Media manages music for artists and record labels, and also manages hundreds of thousands of channels on YouTube through the YouTube Multi-Channel Network. Whatever service you require, please fill out this form and send it to us.
                            </p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Full Legal Name <span className="text-cyan-400">*</span></label>
                              <input
                                type="text"
                                name="labelFullLegalName"
                                value={formData.labelFullLegalName}
                                onChange={handleChange}
                                required
                                placeholder="Your full legal name"
                                className="form-input"
                                style={{ borderColor: 'rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.04)' }}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Contact Email <span className="text-cyan-400">*</span></label>
                              <input
                                type="email"
                                name="labelContactEmail"
                                value={formData.labelContactEmail}
                                onChange={handleChange}
                                required
                                placeholder="contact@yourlabel.com"
                                className="form-input"
                                style={{ borderColor: 'rgba(6,182,212,0.3)', background: 'rgba(6,182,212,0.04)' }}
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Phone Number (with country code)</label>
                              <div className="flex items-stretch border rounded-xl overflow-visible bg-muted/20 focus-within:ring-1 transition-all" style={{ borderColor: 'rgba(6,182,212,0.35)' }}>
                                <CountrySelector
                                  selected={formData.labelPersonCountryCode}
                                  onSelect={(code) => setFormData((prev) => ({ ...prev, labelPersonCountryCode: code }))}
                                />
                                <input
                                  type="tel"
                                  name="labelPersonPhone"
                                  value={formData.labelPersonPhone}
                                  onChange={handleChange}
                                  placeholder="98765 43210"
                                  className="flex-1 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ── Box 2: Company Details — Purple/Violet glow ── */}
                        <div
                          className="relative p-5 rounded-2xl space-y-4"
                          style={{
                            background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(168,85,247,0.06) 100%)',
                            border: '1.5px solid rgba(139,92,246,0.35)',
                            boxShadow: '0 0 18px rgba(139,92,246,0.18), inset 0 0 30px rgba(139,92,246,0.04)',
                          }}
                        >
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }} />
                          <p className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: '#a78bfa' }}>
                            <RecordLabelIcon className="w-4 h-4" style={{ color: '#a78bfa' } as React.CSSProperties} />
                            Company / Label Details
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Company / Label Name <span className="text-violet-400">*</span></label>
                              <input
                                type="text"
                                name="labelCompanyName"
                                value={formData.labelCompanyName}
                                onChange={handleChange}
                                placeholder="Your company or label name"
                                className="form-input"
                                style={{ borderColor: 'rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.04)' }}
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Company Registration Number</label>
                              <input
                                type="text"
                                name="labelRegistrationNumber"
                                value={formData.labelRegistrationNumber}
                                onChange={handleChange}
                                placeholder="e.g. CIN / LLC No."
                                className="form-input"
                                style={{ borderColor: 'rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.04)' }}
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Company Address <span className="text-violet-400">*</span></label>
                              <input
                                type="text"
                                name="labelCompanyAddress"
                                value={formData.labelCompanyAddress}
                                onChange={handleChange}
                                placeholder="Street / Building, Area, State, PIN/ZIP"
                                className="form-input"
                                style={{ borderColor: 'rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.04)' }}
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Company / Label Website URL</label>
                              <input
                                type="url"
                                name="labelCompanyWebsite"
                                value={formData.labelCompanyWebsite}
                                onChange={handleChange}
                                placeholder="https://www.yourcompany.com"
                                className="form-input"
                                style={{ borderColor: 'rgba(139,92,246,0.3)', background: 'rgba(139,92,246,0.04)' }}
                              />
                              <p className="text-xs text-muted-foreground mt-1">Enter your company or label&apos;s official website URL (optional)</p>
                            </div>
                          </div>
                        </div>

                        {/* ── Box 3: Country & City — Emerald/Green glow ── */}
                        <div
                          className="relative p-5 rounded-2xl space-y-4"
                          style={{
                            background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(5,150,105,0.06) 100%)',
                            border: '1.5px solid rgba(16,185,129,0.35)',
                            boxShadow: '0 0 18px rgba(16,185,129,0.18), inset 0 0 30px rgba(16,185,129,0.04)',
                          }}
                        >
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
                          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#34d399' }}>🌍 Country &amp; City</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Country <span className="text-emerald-400">*</span></label>
                              <CountryDropdown
                                selected={formData.labelCountry}
                                onSelect={(code) => setFormData((prev) => ({ ...prev, labelCountry: code }))}
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">City <span className="text-emerald-400">*</span></label>
                              <input
                                type="text"
                                name="labelCity"
                                value={formData.labelCity}
                                onChange={handleChange}
                                placeholder="e.g. Mumbai, New York, London"
                                className="form-input"
                                style={{ borderColor: 'rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.04)' }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* ── Box 4: Catalog Size — Orange/Amber glow ── */}
                        <div
                          className="relative p-5 rounded-2xl space-y-4 overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(251,191,36,0.06) 100%)',
                            border: '1.5px solid rgba(245,158,11,0.35)',
                            boxShadow: '0 0 18px rgba(245,158,11,0.18), inset 0 0 30px rgba(245,158,11,0.04)',
                          }}
                        >
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60 animate-pulse" style={{ animationDelay: '1.5s' }} />
                          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#fbbf24' }}>🎵 Catalog &amp; Scale</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Total Artists</label>
                              <div className="relative">
                                <select
                                  name="labelNumberOfArtists"
                                  value={formData.labelNumberOfArtists}
                                  onChange={handleChange}
                                  className="form-select w-full"
                                  style={{ borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.04)' }}
                                >
                                  <option value="" disabled>Select range</option>
                                  {TOTAL_ARTISTS_RANGES.map((r) => (
                                    <option key={r} value={r}>{r}</option>
                                  ))}
                                </select>
                                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Total Record Labels</label>
                              <div className="relative">
                                <select
                                  name="labelNumberOfLabels"
                                  value={formData.labelNumberOfLabels}
                                  onChange={handleChange}
                                  className="form-select w-full"
                                  style={{ borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.04)' }}
                                >
                                  <option value="" disabled>Select range</option>
                                  {TOTAL_LABELS_RANGES.map((r) => (
                                    <option key={r} value={r}>{r}</option>
                                  ))}
                                </select>
                                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Total Music Catalog</label>
                              <div className="relative">
                                <select
                                  name="labelNumberOfSongs"
                                  value={formData.labelNumberOfSongs}
                                  onChange={handleChange}
                                  className="form-select w-full"
                                  style={{ borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.04)' }}
                                >
                                  <option value="" disabled>Select range</option>
                                  {TOTAL_TRACKS_RANGES.map((r) => (
                                    <option key={r} value={r}>{r}</option>
                                  ))}
                                </select>
                                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ── Box 5: Distribution — Pink/Rose glow ── */}
                        <div
                          className="relative p-5 rounded-2xl space-y-4 overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, rgba(244,63,94,0.08) 0%, rgba(251,113,133,0.06) 100%)',
                            border: '1.5px solid rgba(244,63,94,0.35)',
                            boxShadow: '0 0 18px rgba(244,63,94,0.18), inset 0 0 30px rgba(244,63,94,0.04)',
                          }}
                        >
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent opacity-60 animate-pulse" style={{ animationDelay: '2s' }} />
                          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#fb7185' }}>📦 Music Distribution Partners</p>
                          <p className="text-xs text-muted-foreground">Select the digital distribution company your label / artists have previously worked with:</p>
                          <div className="relative">
                            <select
                              name="labelPreviousDistributor"
                              value={formData.labelPreviousDistributor}
                              onChange={handleChange}
                              className="form-select w-full"
                              style={{ borderColor: 'rgba(244,63,94,0.3)', background: 'rgba(244,63,94,0.04)' }}
                            >
                              <option value="" disabled>Select previous / current distributor</option>
                              {GLOBAL_DISTRIBUTORS.map((d) => (
                                <option key={d} value={d}>{d}</option>
                              ))}
                            </select>
                            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Current / Primary Distributor Name</label>
                            <input
                              type="text"
                              name="labelDistributorName"
                              value={formData.labelDistributorName}
                              onChange={handleChange}
                              placeholder="Name of your current music distributor"
                              className="form-input"
                              style={{ borderColor: 'rgba(244,63,94,0.3)', background: 'rgba(244,63,94,0.04)' }}
                            />
                          </div>
                        </div>

                        {/* ── Box 6: Agreements & Revenue — Blue glow ── */}
                        <div
                          className="relative p-5 rounded-2xl space-y-5 overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(99,102,241,0.06) 100%)',
                            border: '1.5px solid rgba(59,130,246,0.35)',
                            boxShadow: '0 0 18px rgba(59,130,246,0.18), inset 0 0 30px rgba(59,130,246,0.04)',
                          }}
                        >
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60 animate-pulse" style={{ animationDelay: '2.5s' }} />
                          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#60a5fa' }}>📋 Agreements &amp; Revenue</p>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                              Does your record label hold all agreements and documentation from your artists? <span className="text-blue-400">*</span>
                            </label>
                            <p className="text-xs text-muted-foreground mb-3">This includes signed contracts, licensing agreements, and rights documentation.</p>
                            <div className="flex gap-3">
                              {[{ v: 'yes', l: '✅ Yes — All agreements in place' }, { v: 'no', l: '❌ No — Incomplete' }].map((opt) => (
                                <button
                                  key={opt.v}
                                  type="button"
                                  onClick={() => setFormData((prev) => ({ ...prev, labelHasArtistAgreements: opt.v }))}
                                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all ${
                                    formData.labelHasArtistAgreements === opt.v
                                      ? 'border-blue-400 bg-blue-500/15 text-blue-300' :'border-border bg-muted/20 text-muted-foreground hover:border-blue-400/40'
                                  }`}
                                >
                                  {opt.l}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Monthly Revenue (USD)</label>
                            <div className="relative">
                              <select
                                name="labelMonthlyRevenue"
                                value={formData.labelMonthlyRevenue}
                                onChange={handleChange}
                                className="form-select"
                                style={{ borderColor: 'rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.04)' }}
                              >
                                <option value="" disabled>Select monthly revenue range</option>
                                {MONTHLY_REVENUE_RANGES.map((r) => (
                                  <option key={r} value={r}>{r}</option>
                                ))}
                              </select>
                              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            </div>
                          </div>
                        </div>

                        {/* ── Box 7: Legal Representative — Gold/Yellow glow ── */}
                        <div
                          className="relative p-5 rounded-2xl space-y-4 overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, rgba(234,179,8,0.08) 0%, rgba(202,138,4,0.06) 100%)',
                            border: '1.5px solid rgba(234,179,8,0.35)',
                            boxShadow: '0 0 18px rgba(234,179,8,0.18), inset 0 0 30px rgba(234,179,8,0.04)',
                          }}
                        >
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60 animate-pulse" style={{ animationDelay: '3s' }} />
                          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#facc15' }}>⚖️ Legal Representative</p>
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                              Legal Name of Company Representative <span className="text-yellow-400">*</span>
                            </label>
                            <p className="text-xs text-muted-foreground mb-2">The authorized person who will sign agreements on behalf of the company or label.</p>
                            <input
                              type="text"
                              name="labelLegalRepName"
                              value={formData.labelLegalRepName}
                              onChange={handleChange}
                              placeholder="Full legal name of the authorized representative"
                              className="form-input"
                              style={{ borderColor: 'rgba(234,179,8,0.3)', background: 'rgba(234,179,8,0.04)' }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ── YouTube CMS / Multi Channel Network Fields ── */}
                    {formData.iAmType === 'youtube-cms' && (
                      <div className="animate-fadeIn space-y-5">
                        {/* CMS Header Banner */}
                        <div className="p-5 rounded-2xl bg-gradient-to-r from-red-600/20 via-red-500/10 to-orange-500/10 border border-red-500/30">
                          <div className="flex items-center gap-3 mb-2">
                            <YouTubeLogo className="w-10 h-10 flex-shrink-0" />
                            <div>
                              <h4 className="text-base sm:text-lg font-extrabold text-red-400">Music &amp; Entertainment CMS</h4>
                              <p className="text-xs text-muted-foreground font-medium">YouTube Multi Channel Network — Channel Connection Application</p>
                            </div>
                          </div>
                          <p className="text-xs text-foreground/70 leading-relaxed">
                            Connect your YouTube channel to Karhari Media&apos;s CMS network. Please fill in your personal details and complete channel information below.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-3">
                            <a
                              href="https://support.google.com/youtube/answer/1311392"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all"
                            >
                              <YouTubeLogo className="w-3.5 h-3.5" />
                              YouTube CMS Music Content Monetization Policy →
                            </a>
                            <a
                              href="https://www.youtube.com/howyoutubeworks/policies/monetization-policies/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20 hover:text-orange-300 transition-all"
                            >
                              <YouTubeLogo className="w-3.5 h-3.5" />
                              YouTube CMS Entertainment Monetization Policy →
                            </a>
                          </div>
                        </div>

                        {/* Personal Information */}
                        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                            <p className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-2 flex-shrink-0">
                              <span>👤</span> Basic Information
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed sm:ml-2">
                              Karhari Media manages music for artists and record labels, and also manages hundreds of thousands of channels on YouTube through the YouTube Multi-Channel Network. Whatever service you require, please fill out this form and send it to us.
                            </p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Full Name <span className="text-primary">*</span></label>
                              <input type="text" name="ytcmsFullName" value={formData.ytcmsFullName} onChange={handleChange} placeholder="Your legal full name" className="form-input" />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Email Address <span className="text-primary">*</span></label>
                              <input type="email" name="ytcmsEmail" value={formData.ytcmsEmail} onChange={handleChange} placeholder="your@email.com" className="form-input" />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Phone Number</label>
                              <div className="flex items-stretch border border-border rounded-xl overflow-visible bg-muted/20 focus-within:border-red-500/60 focus-within:ring-1 focus-within:ring-red-500/30 transition-all">
                                <CountrySelector
                                  selected={formData.ytcmsCountryCode}
                                  onSelect={(code) => setFormData((prev) => ({ ...prev, ytcmsCountryCode: code }))}
                                />
                                <input
                                  type="tel"
                                  name="ytcmsPhone"
                                  value={formData.ytcmsPhone}
                                  onChange={handleChange}
                                  placeholder="98765 43210"
                                  className="flex-1 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                                />
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Selected: {COUNTRIES.find((c) => c.code === formData.ytcmsCountryCode)?.flag} {COUNTRIES.find((c) => c.code === formData.ytcmsCountryCode)?.name} ({COUNTRIES.find((c) => c.code === formData.ytcmsCountryCode)?.dial})
                              </p>
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Full Address</label>
                              <input
                                type="text"
                                name="ytcmsAddress"
                                value={formData.ytcmsAddress}
                                onChange={handleChange}
                                placeholder="House/Flat No., Street, City, State, PIN/ZIP"
                                className="form-input"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Country <span className="text-primary">*</span></label>
                              <CountryDropdown
                                selected={formData.ytcmsCountry}
                                onSelect={(code) => setFormData((prev) => ({ ...prev, ytcmsCountry: code }))}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Channel Details */}
                        <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 space-y-4">
                          <p className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                            <YouTubeLogo className="w-5 h-5" />
                            YouTube Channel Details
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">YouTube Channel Name <span className="text-primary">*</span></label>
                              <input type="text" name="ytcmsChannelName" value={formData.ytcmsChannelName} onChange={handleChange} placeholder="e.g. Karhari Music Official" className="form-input" />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Original Channel ID <span className="text-primary">*</span></label>
                              <input type="text" name="ytcmsChannelId" value={formData.ytcmsChannelId} onChange={handleChange} placeholder="e.g. UCxxxxxxxxxxxxxxxxxx" className="form-input" />
                              <p className="text-xs text-muted-foreground mt-1">Find it in YouTube Studio → Settings → Channel → Advanced</p>
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Channel URL <span className="text-primary">*</span></label>
                              <input type="url" name="ytcmsChannelUrl" value={formData.ytcmsChannelUrl} onChange={handleChange} placeholder="https://youtube.com/@yourchannel" className="form-input" />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Total Subscribers <span className="text-primary">*</span></label>
                              <div className="relative">
                                <select name="ytcmsSubscribers" value={formData.ytcmsSubscribers} onChange={handleChange} className="form-select">
                                  <option value="" disabled>Select subscriber range</option>
                                  {SUBSCRIBER_RANGES.map((r) => (
                                    <option key={r} value={r}>{r}</option>
                                  ))}
                                </select>
                                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Monthly Views <span className="text-primary">*</span></label>
                              <div className="relative">
                                <select name="ytcmsMonthlyViews" value={formData.ytcmsMonthlyViews} onChange={handleChange} className="form-select">
                                  <option value="" disabled>Select monthly views range</option>
                                  {MONTHLY_VIEWS_RANGES.map((r) => (
                                    <option key={r} value={r}>{r}</option>
                                  ))}
                                </select>
                                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                              </div>
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Monthly Revenue Generated (USD) <span className="text-primary">*</span></label>
                              <div className="relative">
                                <select name="ytcmsMonthlyRevenue" value={formData.ytcmsMonthlyRevenue} onChange={handleChange} className="form-select">
                                  <option value="" disabled>Select monthly revenue range</option>
                                  {MONTHLY_REVENUE_RANGES.map((r) => (
                                    <option key={r} value={r}>{r}</option>
                                  ))}
                                </select>
                                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">Approximate monthly AdSense / YouTube revenue from your channel in US Dollars</p>
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Content Type <span className="text-primary">*</span></label>
                              <p className="text-xs text-muted-foreground mb-2">What type of content does your YouTube channel primarily publish?</p>
                              <div className="relative">
                                <select name="ytcmsContentType" value={formData.ytcmsContentType} onChange={handleChange} className="form-select">
                                  <option value="" disabled>Select your channel content type</option>
                                  {CHANNEL_CONTENT_TYPES.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                  ))}
                                </select>
                                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Channel Status & Compliance */}
                        <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 space-y-5">
                          <p className="text-xs font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-2">
                            <span>⚠️</span> Channel Status &amp; Compliance
                          </p>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Is your channel monetized? <span className="text-primary">*</span></label>
                            <div className="flex gap-3">
                              {[{ v: 'yes', l: '✅ Yes' }, { v: 'no', l: '❌ No' }].map((opt) => (
                                <button
                                  key={opt.v}
                                  type="button"
                                  onClick={() => setFormData((prev) => ({ ...prev, ytcmsMonetized: opt.v }))}
                                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all ${
                                    formData.ytcmsMonetized === opt.v
                                      ? 'border-yellow-400 bg-yellow-500/15 text-yellow-300' :'border-border bg-muted/20 text-muted-foreground hover:border-yellow-400/40'
                                  }`}
                                >
                                  {opt.l}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Does your channel have original content or copyrighted content? <span className="text-primary">*</span></label>
                            <p className="text-xs text-muted-foreground mb-3">Select &quot;Yes&quot; if your channel contains original content you own, or &quot;No&quot; if it uses third-party copyrighted material.</p>
                            <div className="flex gap-3">
                              {[{ v: 'yes', l: '✅ Yes — Original Content' }, { v: 'no', l: '❌ No — Copyrighted Content' }].map((opt) => (
                                <button
                                  key={opt.v}
                                  type="button"
                                  onClick={() => setFormData((prev) => ({ ...prev, ytcmsOriginalContent: opt.v }))}
                                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all ${
                                    formData.ytcmsOriginalContent === opt.v
                                      ? 'border-yellow-400 bg-yellow-500/15 text-yellow-300' :'border-border bg-muted/20 text-muted-foreground hover:border-yellow-400/40'
                                  }`}
                                >
                                  {opt.l}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Has your YouTube channel ever received a copyright strike? <span className="text-primary">*</span></label>
                            <p className="text-xs text-muted-foreground mb-2">
                              A copyright strike is issued when a copyright owner submits a valid legal request to remove your content.{' '}
                              <a
                                href="https://support.google.com/youtube/answer/2814000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-400 underline underline-offset-2 hover:text-red-300 transition-colors font-semibold"
                              >
                                Learn about YouTube&apos;s Copyright Strike Policy →
                              </a>
                            </p>
                            <div className="flex gap-3 mt-3">
                              {[{ v: 'yes', l: '⚠️ Yes' }, { v: 'no', l: '✅ No' }].map((opt) => (
                                <button
                                  key={opt.v}
                                  type="button"
                                  onClick={() => setFormData((prev) => ({ ...prev, ytcmsCopyrightStrike: opt.v }))}
                                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all ${
                                    formData.ytcmsCopyrightStrike === opt.v
                                      ? 'border-yellow-400 bg-yellow-500/15 text-yellow-300' :'border-border bg-muted/20 text-muted-foreground hover:border-yellow-400/40'
                                  }`}
                                >
                                  {opt.l}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Has your YouTube channel ever violated YouTube&apos;s policy? <span className="text-primary">*</span></label>
                            <p className="text-xs text-muted-foreground mb-2">
                              This includes community guidelines violations, spam, misleading content, or any other policy breach. Please review YouTube&apos;s policies:
                            </p>
                            <div className="flex flex-wrap gap-3 mb-3">
                              <a
                                href="https://www.youtube.com/howyoutubeworks/policies/monetization-policies/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 underline underline-offset-2 hover:text-red-300 transition-colors"
                              >
                                <YouTubeLogo className="w-3.5 h-3.5" />
                                YouTube Monetization Policy →
                              </a>
                              <a
                                href="https://www.youtube.com/howyoutubeworks/policies/community-guidelines/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 underline underline-offset-2 hover:text-red-300 transition-colors"
                              >
                                <YouTubeLogo className="w-3.5 h-3.5" />
                                YouTube Community Guidelines Policy →
                              </a>
                            </div>
                            <div className="flex gap-3">
                              {[{ v: 'yes', l: '⚠️ Yes' }, { v: 'no', l: '✅ No' }].map((opt) => (
                                <button
                                  key={opt.v}
                                  type="button"
                                  onClick={() => setFormData((prev) => ({ ...prev, ytcmsPolicyViolation: opt.v }))}
                                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all ${
                                    formData.ytcmsPolicyViolation === opt.v
                                      ? 'border-yellow-400 bg-yellow-500/15 text-yellow-300' :'border-border bg-muted/20 text-muted-foreground hover:border-yellow-400/40'
                                  }`}
                                >
                                  {opt.l}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── Section 2: Additional Information (General) ── */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">2</span>
                      Additional Information
                    </h3>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your music, goals, or any specific requirements..."
                      className="form-input resize w-full min-h-[100px]"
                      style={{ resize: 'both' }}
                    />
                    <p className="text-xs text-muted-foreground mt-1">You can drag the bottom-right corner to resize this box.</p>
                  </div>

                  <p className="text-xs text-muted-foreground font-medium">
                    By submitting, you agree to Karhari Media reviewing your application. We respect your privacy and will never share your data.
                  </p>

                  {/* ── Policy Agreement Checkboxes — Only for YouTube MCN ── */}
                  {formData.iAmType === 'youtube-cms' && (
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 space-y-3">
                      <p className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
                        <YouTubeLogo className="w-4 h-4" />
                        YouTube Policy Agreement — Please confirm before submitting
                      </p>

                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={policyAgreements.monetizationPolicy}
                          onChange={(e) => setPolicyAgreements((prev) => ({ ...prev, monetizationPolicy: e.target.checked }))}
                          className="mt-0.5 w-4 h-4 rounded border-border accent-red-500 cursor-pointer flex-shrink-0"
                        />
                        <span className="text-xs text-foreground/80 leading-relaxed">
                          I have read and agree to comply with{' '}
                          <a
                            href="https://www.youtube.com/howyoutubeworks/policies/monetization-policies/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-400 underline underline-offset-2 hover:text-red-300 transition-colors font-semibold"
                          >
                            YouTube&apos;s Monetization Policy →
                          </a>
                          {' '}and understand the requirements for channel monetization.
                        </span>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={policyAgreements.communityGuidelines}
                          onChange={(e) => setPolicyAgreements((prev) => ({ ...prev, communityGuidelines: e.target.checked }))}
                          className="mt-0.5 w-4 h-4 rounded border-border accent-red-500 cursor-pointer flex-shrink-0"
                        />
                        <span className="text-xs text-foreground/80 leading-relaxed">
                          I confirm that my channel follows{' '}
                          <a
                            href="https://www.youtube.com/howyoutubeworks/policies/community-guidelines/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-400 underline underline-offset-2 hover:text-red-300 transition-colors font-semibold"
                          >
                            YouTube&apos;s Community Guidelines Policy →
                          </a>
                          {' '}and I have not violated any YouTube content policies.
                        </span>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={policyAgreements.cmsPolicy}
                          onChange={(e) => setPolicyAgreements((prev) => ({ ...prev, cmsPolicy: e.target.checked }))}
                          className="mt-0.5 w-4 h-4 rounded border-border accent-red-500 cursor-pointer flex-shrink-0"
                        />
                        <span className="text-xs text-foreground/80 leading-relaxed">
                          I agree to the{' '}
                          <a
                            href="https://support.google.com/youtube/answer/1311392"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-400 underline underline-offset-2 hover:text-red-300 transition-colors font-semibold"
                          >
                            YouTube CMS Content Policies →
                          </a>
                          {' '}and{' '}
                          <a
                            href="https://www.youtube.com/t/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-400 underline underline-offset-2 hover:text-red-300 transition-colors font-semibold"
                          >
                            YouTube Terms of Service →
                          </a>
                          {' '}for connecting my channel to a Multi Channel Network (MCN).
                        </span>
                      </label>
                    </div>
                  )}

                  {submitError && (
                    <div className="flex items-start gap-3 p-4 rounded-xl border border-red-500/40 bg-red-500/10 text-red-300 text-sm font-medium">
                      <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground font-bold text-sm sm:text-base py-4 rounded-full hover:bg-primary/90 transition-all duration-200 lime-glow disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Partnership Application
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
