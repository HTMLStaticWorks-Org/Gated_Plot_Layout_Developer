// ==========================================================================
// SOLTERRA — Reusable Header, Footer & Brand Logo Components
// ==========================================================================

(function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  function getBrandLogoHTML(sizeClass = 'w-9 h-9', textClass = 'text-xl sm:text-2xl') {
    return `
      <a href="index.html" class="inline-flex items-center gap-3 group focus:outline-none" aria-label="SOLTERRA Home">
        <svg class="${sizeClass} shrink-0 transition-transform duration-500 group-hover:rotate-3" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="3" y="3" width="58" height="58" rx="14" stroke="currentColor" stroke-opacity="0.18" stroke-width="2"/>
          <path d="M16 24V16H24M40 16H48V24M48 40V48H40M24 48H16V40" stroke="var(--accent-gold)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M32 18L44 25V39L32 46L20 39V25L32 18Z" stroke="var(--accent-olive)" stroke-width="2.3" stroke-linejoin="round"/>
          <path d="M32 18V32M32 32L44 25M32 32L20 25" stroke="var(--accent-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="32" cy="32" r="2.8" fill="var(--accent-gold)"/>
        </svg>
        <div class="flex flex-col leading-none">
          <span class="font-serif-display ${textClass} font-bold tracking-[0.18em] uppercase">SOLTERRA</span>
          <span class="text-[9px] tracking-[0.28em] uppercase text-gold font-semibold mt-0.5">Landmark Estates</span>
        </div>
      </a>
    `;
  }

  window.SolterraBrandLogo = getBrandLogoHTML;

  function isActive(page) {
    return currentPage === page ? 'text-gold font-semibold' : 'hover:text-gold';
  }

  function renderHeader() {
    const headerMount = document.getElementById('global-header');
    if (!headerMount) return;

    headerMount.innerHTML = `
      <header id="site-header" class="site-header fixed top-0 left-0 right-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-20">
            <!-- Brand -->
            <div class="shrink-0">
              ${getBrandLogoHTML('w-9 h-9', 'text-xl sm:text-2xl')}
            </div>

            <!-- Desktop Navigation -->
            <nav class="hidden xl:flex items-center gap-6 text-sm font-medium" aria-label="Main Navigation">
              <a href="index.html" class="py-2 transition-colors ${isActive('index.html')}">Home 1</a>
              <a href="home-2.html" class="py-2 transition-colors ${isActive('home-2.html')}">Home 2</a>
              <a href="about.html" class="py-2 transition-colors ${isActive('about.html')}">About</a>
              <a href="projects.html" class="py-2 transition-colors ${isActive('projects.html')}">Projects</a>
              <a href="amenities.html" class="py-2 transition-colors ${isActive('amenities.html')}">Amenities</a>
              <a href="investment.html" class="py-2 transition-colors ${isActive('investment.html')}">Invest</a>
              <a href="contact.html" class="py-2 transition-colors ${isActive('contact.html')}">Contact</a>
            </nav>

            <!-- Right Actions (Desktop Only; Mobile/Tablet housed inside Hamburger Drawer) -->
            <div class="flex items-center gap-2.5 sm:gap-3">
              <!-- RTL / LTR Toggle (Desktop) -->
              <button type="button" data-dir-toggle onclick="window.SolterraDir.toggle()" class="hidden xl:flex w-10 h-10 rounded-full border border-theme items-center justify-center hover:border-[var(--accent-gold)] transition-colors" aria-label="Switch to RTL layout" title="Toggle RTL / LTR">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.9" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16m0 0l-3.5-3.5M20 8l-3.5 3.5M20 16H4m0 0l3.5-3.5M4 16l3.5 3.5"/>
                </svg>
              </button>

              <!-- Theme Toggle (Desktop) -->
              <button type="button" data-theme-toggle onclick="window.SolterraTheme.toggle()" class="hidden xl:flex w-10 h-10 rounded-full border border-theme items-center justify-center hover:border-[var(--accent-gold)] transition-colors" aria-label="Toggle Theme">
                <svg data-theme-sun class="w-5 h-5 hidden text-gold" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="4"/><path stroke-linecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"/>
                </svg>
                <svg data-theme-moon class="w-5 h-5 text-olive" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
              </button>

              <!-- Book a Site Visit CTA (Desktop) -->
              <a href="contact.html#site-visit" class="hidden xl:inline-flex btn-gold btn-sm">
                <span>Book a Site Visit</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>

              <!-- Hamburger Button -->
              <button id="mobile-menu-btn" type="button" class="xl:hidden w-10 h-10 rounded-full border border-theme flex items-center justify-center hover:border-[var(--accent-gold)] transition-colors" aria-label="Open Menu" aria-expanded="false">
                <svg id="hamburger-open-icon" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
                <svg id="hamburger-close-icon" class="w-5 h-5 hidden" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile & Tablet Hamburger Drawer -->
        <div id="mobile-menu-drawer" class="xl:hidden hidden border-t border-theme surface-primary">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-4">
            <div class="grid grid-cols-1 gap-2">
              <a href="index.html" class="px-4 py-2.5 rounded-xl surface-secondary text-sm font-medium ${isActive('index.html')}">Home 1</a>
              <a href="home-2.html" class="px-4 py-2.5 rounded-xl surface-secondary text-sm font-medium ${isActive('home-2.html')}">Home 2</a>
              <a href="about.html" class="px-4 py-2.5 rounded-xl surface-secondary text-sm font-medium ${isActive('about.html')}">About</a>
              <a href="projects.html" class="px-4 py-2.5 rounded-xl surface-secondary text-sm font-medium ${isActive('projects.html')}">Projects</a>
              <a href="amenities.html" class="px-4 py-2.5 rounded-xl surface-secondary text-sm font-medium ${isActive('amenities.html')}">Amenities</a>
              <a href="investment.html" class="px-4 py-2.5 rounded-xl surface-secondary text-sm font-medium ${isActive('investment.html')}">Invest</a>
              <a href="contact.html" class="px-4 py-2.5 rounded-xl surface-secondary text-sm font-medium ${isActive('contact.html')}">Contact</a>
            </div>

            <!-- Aligned Controls & CTA Inside Hamburger Drawer -->
            <div class="pt-3 border-t border-theme flex flex-col gap-3">
              <div class="flex items-center gap-3">
                <button type="button" data-dir-toggle onclick="window.SolterraDir.toggle()" class="w-11 h-11 rounded-full border border-theme surface-secondary flex items-center justify-center hover:border-[var(--accent-gold)] transition-colors" aria-label="Switch to RTL layout" title="Toggle RTL / LTR">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.9" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16m0 0l-3.5-3.5M20 8l-3.5 3.5M20 16H4m0 0l3.5-3.5M4 16l3.5 3.5"/>
                  </svg>
                </button>
                <button type="button" data-theme-toggle onclick="window.SolterraTheme.toggle()" class="w-11 h-11 rounded-full border border-theme surface-secondary flex items-center justify-center hover:border-[var(--accent-gold)] transition-colors" aria-label="Toggle Theme">
                  <svg data-theme-sun class="w-5 h-5 hidden text-gold" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="4"/><path stroke-linecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"/>
                  </svg>
                  <svg data-theme-moon class="w-5 h-5 text-olive" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                  </svg>
                </button>
              </div>
              <a href="contact.html#site-visit" class="btn-gold w-full">
                <span>Book a Site Visit</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    `;

    // Bind Mobile Menu Toggle
    const btn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-menu-drawer');
    const openIcon = document.getElementById('hamburger-open-icon');
    const closeIcon = document.getElementById('hamburger-close-icon');
    if (btn && drawer) {
      btn.addEventListener('click', () => {
        const isOpen = !drawer.classList.contains('hidden');
        drawer.classList.toggle('hidden', isOpen);
        openIcon.classList.toggle('hidden', !isOpen);
        closeIcon.classList.toggle('hidden', isOpen);
        btn.setAttribute('aria-expanded', String(!isOpen));
      });
    }

    // Header scroll shadow
    const siteHeader = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
      if (siteHeader) {
        siteHeader.classList.toggle('scrolled', window.scrollY > 24);
      }
    }, { passive: true });
  }

  function renderFooter() {
    const footerMount = document.getElementById('global-footer');
    if (!footerMount) return;

    footerMount.innerHTML = `
      <footer id="site-footer" style="background-color: var(--footer-bg); color: var(--footer-text);" class="relative border-t border-theme pt-16 pb-10 transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-theme">
            <!-- Brand & Intro -->
            <div class="lg:col-span-4 space-y-5">
              ${getBrandLogoHTML('w-10 h-10', 'text-2xl')}
              <p class="text-sm leading-relaxed" style="color: var(--footer-muted);">
                Crafting sovereign gated plot communities with enduring infrastructure, botanical landscapes, and legally verified land ownership for discerning families and investors.
              </p>
              <!-- Original Social Media Icons -->
              <div class="flex items-center gap-3 pt-1">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-icon-btn social-ig" aria-label="Instagram">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-icon-btn social-fb" aria-label="Facebook">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-icon-btn social-li" aria-label="LinkedIn">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-icon-btn social-yt" aria-label="YouTube">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            <!-- Quick Links -->
            <div class="lg:col-span-2 space-y-4">
              <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Quick Links</h3>
              <ul class="space-y-2.5 text-sm" style="color: var(--footer-muted);">
                <li><a href="index.html" class="hover:text-gold transition-colors">Home 1</a></li>
                <li><a href="home-2.html" class="hover:text-gold transition-colors">Home 2</a></li>
                <li><a href="about.html" class="hover:text-gold transition-colors">About Us</a></li>
                <li><a href="investment.html" class="hover:text-gold transition-colors">Investment Guide</a></li>
                <li><a href="contact.html" class="hover:text-gold transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <!-- Projects Links -->
            <div class="lg:col-span-2 space-y-4">
              <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Projects</h3>
              <ul class="space-y-2.5 text-sm" style="color: var(--footer-muted);">
                <li><a href="projects.html#all-projects" class="hover:text-gold transition-colors">Solterra Meadows</a></li>
                <li><a href="projects.html#all-projects" class="hover:text-gold transition-colors">Solterra Crestwood</a></li>
                <li><a href="projects.html#all-projects" class="hover:text-gold transition-colors">Solterra Olive Grove</a></li>
                <li><a href="projects.html#all-projects" class="hover:text-gold transition-colors">Solterra Highlands</a></li>
                <li><a href="projects.html#masterplans" class="hover:text-gold transition-colors">Master Plans</a></li>
              </ul>
            </div>

            <!-- Amenities Links -->
            <div class="lg:col-span-2 space-y-4">
              <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Amenities</h3>
              <ul class="space-y-2.5 text-sm" style="color: var(--footer-muted);">
                <li><a href="amenities.html#security" class="hover:text-gold transition-colors">24/7 Gated Security</a></li>
                <li><a href="amenities.html#greens" class="hover:text-gold transition-colors">Botanical Parks</a></li>
                <li><a href="amenities.html#lifestyle" class="hover:text-gold transition-colors">The Guild Clubhouse</a></li>
                <li><a href="amenities.html#gallery" class="hover:text-gold transition-colors">Lifestyle Gallery</a></li>
              </ul>
            </div>

            <!-- Contact Info -->
            <div class="lg:col-span-2 space-y-4">
              <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Contact</h3>
              <ul class="space-y-2.5 text-sm" style="color: var(--footer-muted);">
                <li>420 Aurelia Crest, Heritage Boulevard, Bengaluru 560001</li>
                <li><a href="tel:+918045678900" class="hover:text-gold transition-colors">+91 80 4567 8900</a></li>
                <li><a href="mailto:info@solterra.com" class="hover:text-gold transition-colors">info@solterra.com</a></li>
                <li class="text-xs">Mon – Sun: 9:30 AM – 6:30 PM</li>
              </ul>
            </div>
          </div>

          <!-- Bottom Bar -->
          <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style="color: var(--footer-muted);">
            <p>&copy; ${new Date().getFullYear()} SOLTERRA Landmark Estates Pvt. Ltd. All rights reserved.</p>
            <div class="flex items-center gap-6 pr-12 sm:pr-14">
              <button type="button" onclick="window.SolterraOpenLegal('privacy')" class="hover:text-gold transition-colors">Privacy Policy</button>
              <button type="button" onclick="window.SolterraOpenLegal('terms')" class="hover:text-gold transition-colors">Terms &amp; Conditions</button>
            </div>
          </div>
        </div>

        <!-- Back to Top Button (Bottom-Right Corner of Footer) -->
        <button id="back-to-top-btn" type="button" onclick="window.scrollTo({ top: 0, behavior: 'smooth' })"
          class="absolute right-5 bottom-5 sm:right-8 sm:bottom-8 w-11 h-11 rounded-full bg-[var(--accent-gold)] text-[#141311] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
          aria-label="Back to Top">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>
        </button>
      </footer>
    `;
  }

  window.SolterraOpenLegal = function (type) {
    const existing = document.getElementById('legal-modal');
    if (existing) existing.remove();

    const isPrivacy = type === 'privacy';
    const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';
    const body = isPrivacy
      ? 'SOLTERRA Landmark Estates respects your privacy. Any enquiry details submitted via our forms (name, email, phone, plot preferences) are used solely to coordinate site visits and share verified project documentation. We never sell or lease client data to third parties.'
      : 'All plot dimensions, master plans, and amenity timelines displayed on this website are for illustrative and informational purposes. Existing amenities are operational as marked; proposed amenities are scheduled for phased delivery per RERA disclosures. Final allotment is governed by the registered Sale Agreement.';

    const modal = document.createElement('div');
    modal.id = 'legal-modal';
    modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm';
    modal.innerHTML = `
      <div class="surface-elevated max-w-lg w-full rounded-3xl p-6 sm:p-8 relative">
        <button type="button" onclick="document.getElementById('legal-modal').remove()" class="absolute top-5 right-5 w-9 h-9 rounded-full border border-theme flex items-center justify-center hover:border-[var(--accent-gold)]" aria-label="Close">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <p class="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-2">SOLTERRA Legal</p>
        <h3 class="font-serif-display text-3xl font-semibold mb-4">${title}</h3>
        <p class="text-sm text-muted-custom leading-relaxed mb-6">${body}</p>
        <button type="button" onclick="document.getElementById('legal-modal').remove()" class="btn-luxury">Understood</button>
      </div>
    `;
    document.body.appendChild(modal);
  };

  document.addEventListener('DOMContentLoaded', function () {
    renderHeader();
    renderFooter();
    if (window.SolterraTheme) window.SolterraTheme.syncIcons();
    if (window.SolterraDir) window.SolterraDir.syncButtons();
  });
})();

