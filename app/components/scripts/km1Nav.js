/* Extracted verbatim from combined.html by tools/phase2-extract.js - do not hand-edit. */
export function runKm1Nav(gsap, ScrollTrigger, MotionPathPlugin) {
// ============================================
        // NAVBAR SCROLL EFFECT
        // ============================================
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });

        // ============================================
        // MOBILE NAV TOGGLE
        // ============================================
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');

        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        navLinks.querySelectorAll('a:not(.nav-dropdown-toggle)').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // ============================================
        // SERVICES DROPDOWN TOGGLE (mobile: closed by default)
        // ============================================
        const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
        const navDropdown = document.querySelector('.nav-dropdown');
        if (dropdownToggle && navDropdown) {
            dropdownToggle.addEventListener('click', (e) => {
                e.preventDefault();
                navDropdown.classList.toggle('open');
            });
            navDropdown.querySelectorAll('.nav-dropdown-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    navDropdown.classList.remove('open');
                });
            });
        }

        // ============================================
}
