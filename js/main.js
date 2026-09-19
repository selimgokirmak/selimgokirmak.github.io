/**
 * skython — main JavaScript
 * Handles: mobile nav, scraper catalog rendering, search, filtering, footer links.
 */
(function () {
  'use strict';

  /* ============================================
     Mobile navigation toggle
     ============================================ */
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  /* ============================================
     Scraper catalog
     ============================================ */
  var scrapers = window.SKYTHON_SCRAPERS || [];
  var grid = document.getElementById('scraperGrid');
  var searchInput = document.getElementById('scraperSearch');
  var filterBar = document.getElementById('filterBar');
  var footerScraperList = document.getElementById('footerScraperList');

  var activeCategory = 'All';
  var searchTerm = '';

  function renderScraperCard(scraper) {
    var card = document.createElement('a');
    card.className = 'scraper-card';
    card.href = 'blog-' + scraper.slug + '.html';

    var metaHtml = '<span class="scraper-card__meta-item">' + scraper.dataType + '</span>' + '&middot;';
    if (scraper.events && scraper.events.length > 0) {
      metaHtml += '<span class="scraper-card__meta-item">' + scraper.events.length + ' events</span>';
    }

    card.innerHTML =
      '<div class="scraper-card__top">' +
        '<span class="scraper-card__platform">' + scraper.platform + '</span>' +
        '<span class="scraper-card__category">' + scraper.category + '</span>' +
      '</div>' +
      '<h3 class="scraper-card__name">' + scraper.shortName + '</h3>' +
      '<p class="scraper-card__desc">' + scraper.description + '</p>' +
      '<div class="scraper-card__meta">' + metaHtml + '</div>' +
      '<span class="scraper-card__link">View Scraper <span class="btn__arrow">&rarr;</span></span>';

    return card;
  }

  function renderCatalog() {
    if (!grid) return;

    var filtered = scrapers.filter(function (s) {
      var matchesCategory = activeCategory === 'All' || s.category === activeCategory;
      var term = searchTerm.toLowerCase().trim();
      var matchesSearch =
        !term ||
        s.name.toLowerCase().indexOf(term) !== -1 ||
        s.shortName.toLowerCase().indexOf(term) !== -1 ||
        s.description.toLowerCase().indexOf(term) !== -1 ||
        s.platform.toLowerCase().indexOf(term) !== -1;
      return matchesCategory && matchesSearch;
    });

    grid.innerHTML = '';

    if (filtered.length === 0) {
      grid.innerHTML = '<p class="no-results">No scrapers found. Try a different search or filter.</p>';
      return;
    }

    filtered.forEach(function (scraper) {
      grid.appendChild(renderScraperCard(scraper));
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      searchTerm = searchInput.value;
      renderCatalog();
    });
  }

  if (filterBar) {
    filterBar.addEventListener('click', function (e) {
      var chip = e.target.closest('.filter-chip');
      if (!chip) return;

      activeCategory = chip.getAttribute('data-category');

      filterBar.querySelectorAll('.filter-chip').forEach(function (c) {
        c.classList.remove('active');
      });
      chip.classList.add('active');

      renderCatalog();
    });
  }

  /* ============================================
     Footer scraper links
     ============================================ */
  if (footerScraperList) {
    var shown = scrapers.slice(0, 6);
    shown.forEach(function (s) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = 'blog-' +  s.slug + '.html';
      a.textContent = s.shortName;
      li.appendChild(a);
      footerScraperList.appendChild(li);
    });
  }

  /* ============================================
     Initial render
     ============================================ */
  renderCatalog();
})();
