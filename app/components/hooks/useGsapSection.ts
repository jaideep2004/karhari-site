'use client';

import { useLayoutEffect, type RefObject } from 'react';
import { gsap, ScrollTrigger, MotionPathPlugin } from '../scripts/gsapSetup';

/**
 * Runs a legacy extracted script segment inside a gsap.context scoped to
 * `ref`. On cleanup the context is reverted (kills tweens/ScrollTriggers and
 * restores inline styles), so unmounts are clean.
 */
export function useGsapSection(
  run: (gsapApi: typeof gsap, st: typeof ScrollTrigger, mpp: typeof MotionPathPlugin) => void,
  ref: RefObject<HTMLElement | null>
) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => run(gsap, ScrollTrigger, MotionPathPlugin), ref);
    return () => {
      ctx.revert();
    };
  }, [run, ref]);
}
