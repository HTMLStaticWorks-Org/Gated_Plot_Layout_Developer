// Early theme & direction initialization to prevent flash of unstyled content (FOUC)
(function () {
  const savedTheme = localStorage.getItem('solterra-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  const savedDir = localStorage.getItem('solterra-dir') || 'ltr';
  document.documentElement.setAttribute('dir', savedDir);
})();

window.SolterraDir = {
  get: function () {
    return document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
  },
  set: function (dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem('solterra-dir', dir);
    this.syncButtons();
  },
  toggle: function () {
    const next = this.get() === 'rtl' ? 'ltr' : 'rtl';
    this.set(next);
  },
  syncButtons: function () {
    const isRtl = this.get() === 'rtl';
    document.querySelectorAll('[data-dir-toggle]').forEach(btn => {
      btn.setAttribute('aria-label', isRtl ? 'Switch to LTR layout' : 'Switch to RTL layout');
      btn.setAttribute('title', isRtl ? 'RTL Active (Switch to LTR)' : 'LTR Active (Switch to RTL)');
      btn.classList.toggle('border-[var(--accent-gold)]', isRtl);
      btn.classList.toggle('text-gold', isRtl);
    });
  }
};

window.SolterraTheme = {
  get: function () {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  },
  set: function (theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('solterra-theme', theme);
    this.syncIcons();
  },
  toggle: function () {
    const next = this.get() === 'dark' ? 'light' : 'dark';
    this.set(next);
  },
  syncIcons: function () {
    const isDark = this.get() === 'dark';
    document.querySelectorAll('[data-theme-sun]').forEach(el => {
      el.classList.toggle('hidden', !isDark);
    });
    document.querySelectorAll('[data-theme-moon]').forEach(el => {
      el.classList.toggle('hidden', isDark);
    });
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });
  }
};

document.addEventListener('DOMContentLoaded', function () {
  window.SolterraTheme.syncIcons();
  if (window.SolterraDir) window.SolterraDir.syncButtons();
});

