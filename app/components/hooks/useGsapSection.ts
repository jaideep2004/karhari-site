'use client';

import { useLayoutEffect, type RefObject } from 'react';
import { gsap, ScrollTrigger, MotionPathPlugin } from '../scripts/gsapSetup';

const INIT_MARKER = 'data-km-init';

/**
 * Runs a legacy extracted script segment inside a gsap.context scoped to
 * `ref`. On cleanup the context is reverted (kills tweens/ScrollTriggers and
 * restores inline styles), so unmounts are clean.
 *
 * The legacy scripts append DOM (cards, sparkles, platform grids) and start
 * infinite tweens. React dev remounts (Fast Refresh / StrictMode reuse the
 * same DOM nodes) would therefore duplicate content on a second run, so the
 * section root is marked once initialized and re-runs are skipped.
 */
export function useGsapSection(
  run: (gsapApi: typeof gsap, st: typeof ScrollTrigger, mpp: typeof MotionPathPlugin) => void,
  ref: RefObject<HTMLElement | null>
) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getAttribute(INIT_MARKER) === '1') return;
    el.setAttribute(INIT_MARKER, '1');
    const ctx = gsap.context(() => run(gsap, ScrollTrigger, MotionPathPlugin), ref);
    return () => {
      ctx.revert();
    };
  }, [run, ref]);
}
