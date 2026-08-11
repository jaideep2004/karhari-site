'use client';

import { useEffect } from 'react';
import { gsap, ScrollTrigger, MotionPathPlugin } from '../scripts/gsapSetup';
import { runKm1Nav } from '../scripts/km1Nav';

/**
 * Navbar interactions (scroll state + mobile menu toggle), ported from
 * js/main.js. The listeners are attached to window/nav elements and live for
 * the page lifetime.
 */
export function useNavbar() {
  useEffect(() => {
    runKm1Nav(gsap, ScrollTrigger, MotionPathPlugin);
  }, []);
}
