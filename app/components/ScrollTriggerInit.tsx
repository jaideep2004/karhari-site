'use client';

import { useScrollTriggerRefresh } from './hooks/useScrollTriggerRefresh';

/**
 * Mounted once in the page; remeasures ScrollTrigger positions after window
 * load and font swap. Renders nothing.
 */
export default function ScrollTriggerInit() {
  useScrollTriggerRefresh();
  return null;
}
