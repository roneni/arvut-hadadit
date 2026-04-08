/* ========================================
   ARVUT HADADIT — ערבות הדדית
   Main Application JavaScript
   ======================================== */

(function () {
  'use strict';

  // ---- THEME TOGGLE ----
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let currentTheme = localStorage.getItem('arvut-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  root.setAttribute('data-theme', currentTheme);
  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      localStorage.setItem('arvut-theme', currentTheme);
      themeToggle.setAttribute('aria-label', currentTheme === 'dark' ? 'מעבר למצב בהיר' : 'מעבר למצב כהה');
      updateThemeIcon();
    });
  }

  function updateThemeIcon() {
    if (!themeToggle) return;
    themeToggle.innerHTML = currentTheme === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }


  // ---- MOBILE MENU ----
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileMenuBtn.classList.toggle('active');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      mobileNav.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }


  // ---- HEADER SCROLL BEHAVIOR ----
  const header = document.getElementById('site-header');
  let lastScrollY = 0;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    if (scrollY > lastScrollY && scrollY > 400) {
      header.classList.add('header--hidden');
    } else {
      header.classList.remove('header--hidden');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });


  // ---- SCROLL ANIMATIONS ----
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));


  // ---- ORGANIZATION DIRECTORY ----
  const categories = [
    'חיילים ומילואים', 'קשישים', 'נכים ומוגבלויות', 'עולים חדשים',
    'נפגעי טרור', 'רווחה כללית', 'זכויות משפטיות', 'בריאות',
    'חינוך', 'התנדבות'
  ];

  let organizations = [];
  let activeFilter = 'all';
  let searchQuery = '';

  // Fetch organizations data
  fetch('data/organizations.json')
    .then(res => res.json())
    .then(data => {
      organizations = data;
      renderFilterChips();
      renderOrganizations();
    })
    .catch(err => {
      console.error('Failed to load organizations:', err);
      const grid = document.getElementById('org-grid');
      if (grid) {
        grid.innerHTML = '<p class="org-load-error" role="alert">שגיאה בטעינת הארגונים. נסו לרענן את הדף.</p>';
      }
    });

  function renderFilterChips() {
    const chipsContainer = document.getElementById('filter-chips');
    if (!chipsContainer) return;

    // "All" chip already in HTML
    categories.forEach(cat => {
      const count = organizations.filter(o => o.category === cat).length;
      if (count === 0) return;
      const chip = document.createElement('button');
      chip.className = 'chip';
      chip.dataset.filter = cat;
      chip.textContent = `${cat} (${count})`;
      chipsContainer.appendChild(chip);
    });

    // Chip click handlers
    chipsContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      chipsContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.dataset.filter;
      renderOrganizations();
    });
  }

  function renderOrganizations() {
    const grid = document.getElementById('org-grid');
    const empty = document.getElementById('org-empty');
    if (!grid) return;

    let filtered = organizations;

    // Filter by category
    if (activeFilter !== 'all') {
      filtered = filtered.filter(o => o.category === activeFilter);
    }

    // Filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(o =>
        o.name.toLowerCase().includes(q) ||
        o.nameEn.toLowerCase().includes(q) ||
        o.category.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      grid.innerHTML = '';
      empty.hidden = false;
      return;
    }

    empty.hidden = true;
    grid.innerHTML = filtered.map(org => `
      <article class="org-card">
        <div class="org-card-header">
          <div>
            <div class="org-name">${org.name}</div>
            <div class="org-name-en" lang="en">${org.nameEn}</div>
          </div>
          <span class="org-category">${org.category}</span>
        </div>
        <p class="org-desc">${org.description}</p>
        <div class="org-links">
          <a href="${org.website}" target="_blank" rel="noopener noreferrer" class="org-link" aria-label="אתר ${org.name}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            אתר
          </a>
          ${org.guidestarUrl ? `
          <a href="${org.guidestarUrl}" target="_blank" rel="noopener noreferrer" class="org-link" aria-label="פרופיל ${org.name} בגיידסטאר">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            גיידסטאר
          </a>` : ''}
        </div>
      </article>
    `).join('');
  }

  // Search input
  const searchInput = document.getElementById('org-search');
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        searchQuery = e.target.value.trim();
        renderOrganizations();
      }, 200);
    });
  }

  // Clear search button
  const clearSearch = document.getElementById('clear-search');
  if (clearSearch) {
    clearSearch.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      activeFilter = 'all';
      const chipsContainer = document.getElementById('filter-chips');
      if (chipsContainer) {
        chipsContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        const allChip = chipsContainer.querySelector('[data-filter="all"]');
        if (allChip) allChip.classList.add('active');
      }
      renderOrganizations();
    });
  }


  // ---- SMOOTH SCROLL FOR ANCHORS ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
