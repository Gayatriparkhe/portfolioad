// =========================================================
// Aditya Parkhe — Data Science Portfolio (vanilla JS)
// Features mirrored from the Shubham Gadekar reference:
//   - Typewriter hero
//   - Scroll-reveal via IntersectionObserver
//   - Bouncing scroll-cue
//   - Active-link scrollspy
//   - Mobile hamburger menu
//   - Dark/Light theme toggle (persisted)
//   - Project modal (click card OR button; Esc / backdrop close)
//   - Contact form validation + spinner + success toast
// =========================================================

(function () {
  'use strict';

  // 1. Theme (dark / light) toggle, persisted in localStorage
  const root = document.body;
  const themeBtn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('pf-theme');
  if (saved === 'light') root.classList.add('light');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      root.classList.toggle('light');
      localStorage.setItem('pf-theme', root.classList.contains('light') ? 'light' : 'dark');
    });
  }

  // 2. Nav background on scroll
  const nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 3. Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // 4. Active nav link (scrollspy)
  const sections = ['home','about','education','skills','projects','experience','contact']
    .map(function (id) { return document.getElementById(id); }).filter(Boolean);
  const navLinks = document.querySelectorAll('.menu .nav-link, .mobile-menu .m-link');
  function setActive(id) {
    navLinks.forEach(function (l) {
      const href = l.getAttribute('href').replace('#', '');
      if (href === id) l.classList.add('active');
      else l.classList.remove('active');
    });
  }
  if ('IntersectionObserver' in window && sections.length) {
    const so = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { threshold: 0.5 });
    sections.forEach(function (s) { so.observe(s); });
  }
  navLinks.forEach(function (l) {
    l.addEventListener('click', function () {
      setActive(l.getAttribute('href').replace('#', ''));
      const mm = document.getElementById('mobileMenu');
      if (mm) mm.classList.remove('open');
    });
  });

  // 5. Mobile menu (hamburger)
  const toggle = document.getElementById('menuToggle');
  const mm = document.getElementById('mobileMenu');
  if (toggle && mm) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      mm.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (mm.classList.contains('open') && !mm.contains(e.target) && !toggle.contains(e.target)) {
        mm.classList.remove('open');
      }
    });
  }

  // 6. Typewriter in the hero (replaces Typewriter.js from the reference)
  const typeEl = document.getElementById('type');
  if (typeEl) {
    const phrases = [
      'Data Science Student',
      'Python & SQL Practitioner',
      'Statistical Analyst',
      'Machine Learning Enthusiast',
      'Data Storyteller'
    ];
    let pi = 0, ci = 0, deleting = false;
    function tick() {
      const word = phrases[pi];
      typeEl.textContent = word.substring(0, ci);
      if (!deleting) {
        ci++;
        if (ci > word.length) { deleting = true; setTimeout(tick, 1400); return; }
      } else {
        ci--;
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 200); return; }
      }
      setTimeout(tick, deleting ? 35 : 70);
    }
    setTimeout(tick, 600);
  }

  // 7. Project MODAL (replaces spring-style AnimatePresence modal in the reference)
  const PROJECTS = {
    p1: {
      title: 'IPL Auction — Bid Pattern Analysis',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M3 3h18v2H3V3zm2 4h14v3H5V7zm0 5h14v3H5v-3zm0 5h14v3H5v-3zM3 20h18v2H3v-2z"/></svg>',
      details: 'Explored 12 seasons of IPL auction data to understand how team budgets, role scarcity and overseas-player caps influence final bids. Built a reproducible notebook covering cleaning, EDA, hypothesis tests on retention-vs-new-player patterns, and a logistic model for predicting whether a player crosses the marquee threshold. Delivered a 12-slide report to the campus data club.',
      tech: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'SciPy', 'Jupyter']
    },
    p2: {
      title: 'Library Circulation SQL Engine',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M4 5h16v3H4V5zm0 5h16v9H4v-9zm3 2v5h2v-5H7zm4 0v5h2v-5h-2z"/></svg>',
      details: 'Designed a normalised schema (3NF) for our college library covering books, members, loans and fines. Wrote 30+ analytical queries including subject-wise popularity per semester, peak return hours, overdue trends and member cohorts. Packaged the query set as a "sanity-check tool" the librarian now runs monthly to validate the GUI export.',
      tech: ['MySQL', 'Schema Design (3NF)', 'Window Functions', 'CTEs', 'SQL Analytics']
    },
    p3: {
      title: 'Rainfall Predictor — Maharashtra Districts',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M3 17 9 11l4 4 8-8v6h2V3h-10v2h6l-6 6-4-4-8 8 2 2z"/></svg>',
      details: 'Trained a Logistic Regression and a Random Forest classifier on 30 years of IMD district-level data to predict "above-normal" monsoon rainfall. Built features from prior-year rainfall, El Niño index and sowing calendar. Achieved ROC-AUC 0.79 on a held-out 5-year window. Documented all assumptions and feature treatments in a 10-page write-up.',
      tech: ['scikit-learn', 'Pandas', 'Matplotlib', 'NumPy', 'Statistics']
    },
    p4: {
      title: 'Student Performance Dashboard',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-3h2v17h-2V4zm4 6h2v11h-2V10zm4 3h2v8h-2v-8z"/></svg>',
      details: 'Interactive Power BI report combining attendance, internal marks and weekly quiz scores for ~120 students. Built 14 DAX measures including class average, subject-wise pass rate, at-risk identification (attendance <75% AND marks <50%). The dashboard is currently used by my Statistics professor for one section.',
      tech: ['Power BI', 'DAX', 'Excel', 'Data Modelling']
    },
    p5: {
      title: 'Sentiment on Movie Reviews (NLP intro)',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"/></svg>',
      details: 'Trained a TF-IDF + Logistic Regression baseline on the classic IMDB 50K dataset. Compared it with a simple LSTM (Keras, 1 layer, 64 units). LSTM won by ~3% F1 but was 8× slower at inference. Wrote a reproducibility notebook (fixed seeds, env pin) and presented it at the campus data club as an intro-to-NLP session.',
      tech: ['scikit-learn', 'NLTK', 'Keras', 'TensorFlow', 'TF-IDF', 'Jupyter']
    },
    p6: {
      title: 'PyClean — Lightweight CSV Cleaner',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M3 5h18v3H3V5zm2 5h14v9H5v-9zm3 2v5h2v-5H8zm4 0v5h2v-5h-2z"/></svg>',
      details: 'Personal utility package to detect duplicate rows, mixed-type columns and obvious outliers in CSV files. Built as a learning project to practice packaging, pytest and writing a real README with usage examples. Configures run via simple YAML; ~120 stars on GitHub from classmates.',
      tech: ['Python', 'pytest', 'Click CLI', 'GitHub Actions', 'PyYAML']
    }
  };

  const backdrop = document.getElementById('modalBackdrop');
  const modalTitle = document.getElementById('modalTitle');
  const modalIcon = document.getElementById('modalIcon');
  const modalDetails = document.getElementById('modalDetails');
  const modalTech = document.getElementById('modalTech');
  const closeBtn = document.getElementById('modalClose');
  const closeBtn2 = document.getElementById('modalClose2');

  function openModal(id) {
    const p = PROJECTS[id]; if (!p || !backdrop) return;
    modalTitle.textContent = p.title;
    modalIcon.innerHTML = p.icon;
    modalDetails.textContent = p.details;
    modalTech.innerHTML = '';
    p.tech.forEach(function (t) {
      const s = document.createElement('span'); s.textContent = t; modalTech.appendChild(s);
    });
    backdrop.hidden = false;
    requestAnimationFrame(function () { backdrop.classList.add('open'); });
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!backdrop) return;
    backdrop.classList.remove('open');
    setTimeout(function () {
      backdrop.hidden = true;
      document.body.style.overflow = '';
    }, 250);
  }
  document.querySelectorAll('[data-open]').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      openModal(b.getAttribute('data-open'));
    });
  });
  document.querySelectorAll('.proj-card').forEach(function (c) {
    c.addEventListener('click', function (e) {
      if (e.target.closest('button')) return;
      openModal(c.getAttribute('data-id'));
    });
  });
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeBtn2) closeBtn2.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', function (e) { if (e.target === backdrop) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  // 8. Contact form (validation + spinner + success)
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const required = form.querySelectorAll('[required]');
      let ok = true;
      required.forEach(function (el) {
        if (!el.value.trim()) { el.style.borderColor = '#ef4444'; ok = false; }
        else el.style.borderColor = '';
      });
      if (!ok) return;
      submitBtn.classList.add('sending');
      submitBtn.disabled = true;
      setTimeout(function () {
        submitBtn.classList.remove('sending');
        submitBtn.disabled = false;
        form.reset();
        if (success) {
          success.hidden = false;
          setTimeout(function () { success.hidden = true; }, 5000);
        }
      }, 1500);
    });
  }

  // 9. Copyright year
  const y = document.getElementById('copyright-year');
  if (y) y.textContent = new Date().getFullYear();
})();
