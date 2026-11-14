// ==========================================================================
// SOLTERRA — Interactions, Animations, Counters, Filters & Form Validation
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {
  // 1. Initialize AOS if loaded
  if (window.AOS) {
    window.AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

  // 2. Curtain Reveal Masks
  const revealTargets = document.querySelectorAll('.reveal-mask');
  if (revealTargets.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach(el => revealObserver.observe(el));
  }

  // 3. Scroll-Triggered Number Counters
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-counter'));
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const decimals = (el.getAttribute('data-decimals') || 0) * 1;
        const duration = 1400;
        const start = performance.now();

        function step(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = (target * eased).toFixed(decimals);
          el.textContent = `${prefix}${Number(value).toLocaleString()}${suffix}`;
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        }
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.3 });
    counters.forEach(el => counterObserver.observe(el));
  }

  // 4. Subtle Parallax on Scroll
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
        const rect = el.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          const rawOffset = (rect.top - window.innerHeight / 2) * speed;
          const offset = Math.max(-36, Math.min(36, rawOffset));
          el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.22)`;
        }
      });
    }, { passive: true });
  }

  // 5. Subtle 3D Card Tilt (Desktop Pointer)
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 1024) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // 6. Interactive Master Plan Plot Inspector
  const plotCells = document.querySelectorAll('[data-plot-id]');
  const plotInfoPanel = document.getElementById('plot-inspector-panel');
  if (plotCells.length && plotInfoPanel && window.SOLTERRA_DATA) {
    function selectPlot(plotId) {
      const plot = window.SOLTERRA_DATA.masterplanPlots.find(p => p.id === plotId);
      if (!plot) return;
      plotCells.forEach(c => c.classList.toggle('active', c.getAttribute('data-plot-id') === plotId));
      const badgeColor = plot.status === 'Available'
        ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
        : plot.status === 'Reserved'
          ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30'
          : 'bg-stone-500/15 text-stone-600 dark:text-stone-300 border-stone-500/30';

      plotInfoPanel.innerHTML = `
        <div class="flex items-center justify-between gap-3 mb-3">
          <div>
            <span class="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Plot ${plot.id}</span>
            <h4 class="font-serif-display text-2xl font-semibold">${plot.zone}</h4>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-semibold border ${badgeColor}">${plot.status}</span>
        </div>
        <div class="grid grid-cols-2 gap-3 text-sm pt-2 border-t border-theme">
          <div>
            <p class="text-xs text-muted-custom">Dimensions</p>
            <p class="font-semibold">${plot.size}</p>
          </div>
          <div>
            <p class="text-xs text-muted-custom">Orientation</p>
            <p class="font-semibold">${plot.facing}</p>
          </div>
          <div>
            <p class="text-xs text-muted-custom">Indicative Value</p>
            <p class="font-semibold text-gold">${plot.price}</p>
          </div>
          <div class="flex items-end">
            <a href="contact.html#site-visit" class="text-xs font-semibold underline underline-offset-4 hover:text-gold">Enquire Plot &rarr;</a>
          </div>
        </div>
      `;
    }
    plotCells.forEach(cell => {
      cell.addEventListener('click', () => selectPlot(cell.getAttribute('data-plot-id')));
      cell.addEventListener('mouseenter', () => selectPlot(cell.getAttribute('data-plot-id')));
    });
    selectPlot(plotCells[0].getAttribute('data-plot-id'));
  }

  // 7. Password Visibility Toggle (Login & Signup)
  document.querySelectorAll('[data-toggle-password]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-toggle-password');
      const input = document.getElementById(targetId);
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      const eyeOpen = btn.querySelector('[data-eye-open]');
      const eyeClosed = btn.querySelector('[data-eye-closed]');
      if (eyeOpen && eyeClosed) {
        eyeOpen.classList.toggle('hidden', isPassword);
        eyeClosed.classList.toggle('hidden', !isPassword);
      }
      btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    });
  });

  // 8. Unified Honest Form Validation Handler
  window.SolterraBindForm = function (formId, feedbackId, mode) {
    const form = document.getElementById(formId);
    const feedback = document.getElementById(feedbackId);
    if (!form || !feedback) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      feedback.className = 'hidden';

      const formData = new FormData(form);
      const email = (formData.get('email') || '').toString().trim();
      const phone = (formData.get('phone') || '').toString().trim();
      const password = (formData.get('password') || '').toString();
      const confirmPassword = (formData.get('confirmPassword') || '').toString();

      // Required fields check
      let missing = false;
      form.querySelectorAll('[required]').forEach(field => {
        if (field.type === 'checkbox' && !field.checked) missing = true;
        else if (!field.value.trim()) missing = true;
      });

      if (missing) {
        showFeedback(feedback, 'error', 'Please complete all required fields before submitting.');
        return;
      }

      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFeedback(feedback, 'error', 'Please enter a valid email address.');
        return;
      }

      if (phone && !/^[+\d\s()-]{8,18}$/.test(phone)) {
        showFeedback(feedback, 'error', 'Please enter a valid phone number (8–18 digits).');
        return;
      }

      if (password && password.length < 8) {
        showFeedback(feedback, 'error', 'Password must be at least 8 characters long.');
        return;
      }

      if (mode === 'signup' && password !== confirmPassword) {
        showFeedback(feedback, 'error', 'Passwords do not match. Please verify both fields.');
        return;
      }

      // Honest notice: validation passed, backend integration required for live persistence
      const messages = {
        enquiry: 'Validation passed! Your enquiry details are formatted and ready. Live submission requires backend API / CRM integration.',
        visit: 'Validation passed! Your site visit request details are verified. Live slot confirmation requires backend calendar & CRM integration.',
        login: 'Validation passed! Client portal authentication requires a connected backend identity provider.',
        signup: 'Validation passed! Account registration requires a connected backend authentication service.'
      };

      showFeedback(feedback, 'info', messages[mode] || messages.enquiry);
    });
  };

  function showFeedback(el, type, text) {
    const styles = {
      error: 'bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300',
      info: 'bg-amber-500/10 border border-[var(--accent-gold)] text-[var(--text-primary)]'
    };
    el.className = `mt-4 p-4 rounded-xl text-sm font-medium ${styles[type]}`;
    el.textContent = text;
  }
});

