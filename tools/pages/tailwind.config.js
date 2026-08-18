/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/about/**/*.{js,ts,jsx,tsx,mdx}',
    './app/contact/**/*.{js,ts,jsx,tsx,mdx}',
    './app/music-distribution/**/*.{js,ts,jsx,tsx,mdx}',
    './app/youtube-content-id/**/*.{js,ts,jsx,tsx,mdx}',
    './app/youtube-policies/**/*.{js,ts,jsx,tsx,mdx}',
    './app/facebook-rights-manager/**/*.{js,ts,jsx,tsx,mdx}',
    './app/team/**/*.{js,ts,jsx,tsx,mdx}',
    './app/terms-and-conditions/**/*.{js,ts,jsx,tsx,mdx}',
    './app/privacy-policy/**/*.{js,ts,jsx,tsx,mdx}',
    './app/components/ScrollReveal.tsx',
    './app/components/ui/*.{tsx,ts}',
  ],
  corePlugins: { preflight: false },
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'calc(var(--radius) - 0.25rem)',
        md: 'calc(var(--radius) - 2px)',
        lg: 'calc(var(--radius) + 0.25rem)',
        xl: 'calc(var(--radius) + 0.5rem)',
        '2xl': 'calc(var(--radius) + 0.75rem)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        display: ['var(--font-sans)', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        fadeIn: 'fadeIn 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};