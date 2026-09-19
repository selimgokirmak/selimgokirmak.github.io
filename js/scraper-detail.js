/**
 * skython — scraper detail page logic
 * Handles: rendering detail sections from data, related scrapers,
 *          events search/filter, code block copy, mobile nav.
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

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  /* ============================================
     Get scraper slug from page data attribute
     ============================================ */
  var body = document.body;
  var slug = body.getAttribute('data-slug');
  var scraper = window.SKYTHON_findScraper ? window.SKYTHON_findScraper(slug) : null;

  if (!scraper) return;


  /* ============================================
     Render example JSON output
     ============================================ */
  var codeBlock = document.getElementById('exampleCode');
  if (codeBlock && scraper.exampleOutput) {
    var jsonStr = JSON.stringify(scraper.exampleOutput, null, 2);
    codeBlock.innerHTML = syntaxHighlightJSON(jsonStr);
  }

  function syntaxHighlightJSON(json) {
    var escaped = json
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    return escaped.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function (match) {
        var cls = 'tok-num';
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? 'tok-key' : 'tok-str';
        } else if (/true|false/.test(match)) {
          cls = 'tok-bool';
        } else if (/null/.test(match)) {
          cls = 'tok-bool';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      }
    );
  }

  /* ============================================
     Copy code button
     ============================================ */
  var copyBtn = document.getElementById('copyCode');
  if (copyBtn && codeBlock) {
    copyBtn.addEventListener('click', function () {
      var text = codeBlock.textContent;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function () {
          copyBtn.classList.add('copied');
          copyBtn.textContent = 'Copied!';
          setTimeout(function () {
            copyBtn.classList.remove('copied');
            copyBtn.textContent = 'Copy';
          }, 2000);
        });
      }
    });
  }


  /* ============================================
     Render supported events with search
     ============================================ */
  var eventsList = document.getElementById('eventsList');
  var eventsSearch = document.getElementById('eventsSearch');

  function renderEvents(filter) {
    if (!eventsList || !scraper.events) return;

    var term = (filter || '').toLowerCase().trim();
    var filtered = scraper.events.filter(function (ev) {
      return (
        !term ||
        ev.name.toLowerCase().indexOf(term) !== -1 ||
        (ev.url && ev.url.toLowerCase().indexOf(term) !== -1)
      );
    });

    eventsList.innerHTML = '';

    if (filtered.length === 0) {
      eventsList.innerHTML = '<p class="no-results">No events found. It may not been indexed yet.</p>';
      return;
    }

    filtered.forEach(function (ev) {
      var item = document.createElement('div');
      item.className = 'event-item';
      item.innerHTML =
        '<a href="' + ev.url + '" target="_blank">' +
        '<div class="event-item__name">' + ev.name + '</div>' +
        '<div class="event-item__meta">' + (ev.domain || '') + '</div>' + 
        '</a>';
      eventsList.appendChild(item);
    });
  }

  if (eventsSearch) {
    eventsSearch.addEventListener('input', function () {
      renderEvents(eventsSearch.value);
    });
  }

  renderEvents('');

  /* ============================================
     Render related scrapers
     ============================================ */
  var relatedGrid = document.getElementById('relatedGrid');
  if (relatedGrid && scraper.related) {
    var relatedScrapers = window.SKYTHON_findScrapers(scraper.related);
    relatedScrapers.forEach(function (rs) {
      var card = document.createElement('a');
      card.className = 'scraper-card';
      card.href = 'blog-' + rs.slug + '.html';

      card.innerHTML =
        '<div class="scraper-card__top">' +
          '<span class="scraper-card__platform">' + rs.platform + '</span>' +
          '<span class="scraper-card__category">' + rs.category + '</span>' +
        '</div>' +
        '<h3 class="scraper-card__name">' + rs.shortName + '</h3>' +
        '<p class="scraper-card__desc">' + rs.description + '</p>' +
        '<div class="scraper-card__meta"><span class="scraper-card__meta-item">' + rs.dataType + '</span></div>' +
        '<span class="scraper-card__link">View Scraper <span class="btn__arrow">&rarr;</span></span>';

      relatedGrid.appendChild(card);
    });
  }

  /* ============================================
     Footer scraper links
     ============================================ */
  var footerScraperList = document.getElementById('footerScraperList');
  if (footerScraperList) {
    var allScrapers = window.SKYTHON_SCRAPERS || [];
    allScrapers.slice(0, 6).forEach(function (s) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = 'blog-' + s.slug + '.html';
      a.textContent = s.shortName;
      li.appendChild(a);
      footerScraperList.appendChild(li);
    });
  }
})();
