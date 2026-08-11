'use client';

import { useEffect } from 'react';
import { ScrollTrigger } from '../scripts/gsapSetup';

/**
 * Remeasures ScrollTrigger positions after window load and font swap.
 * The legacy static page relied on GSAP's internal load refresh, but in Next.js
 * images and web fonts can finish loading later and shift section heights,
 * which would leave trigger start/end positions stale.
 */
export function useScrollTriggerRefresh() {
  useEffect(() => {
    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };
    if (document.readyState === 'complete') {
      refresh();
    } else {
      window.addEventListener('load', refresh);
    }
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh).catch(() => {});
    }
    return () => {
      cancelled = true;
      window.removeEventListener('load', refresh);
    };
  }, []);
}
