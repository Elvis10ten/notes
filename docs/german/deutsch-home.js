/* deutsch-home.js — shared by every page in this folder (overview, trainers, notes), loaded just before </body>.
 *
 * 0. Loads Google Analytics on every page. Put the measurement ID in GA_ID below; leave it empty to disable.
 * 1. Adds a small "Overview · Notes" bar at the top of each trainer.
 * 2. Records the visit, so the overview's "last opened" line is right even when a trainer
 *    is opened from a bookmark instead of from the overview.
 * 3. Exposes window.deutschHome.answer(isCorrect). A trainer calls it once for every answer it
 *    judges. The overview turns that into a per-topic accuracy and "Continue practicing" picks the
 *    weakest topic instead of the least recently opened one. deutschHome.amend(isCorrect) flips the
 *    verdict of the most recent answer, for trainers with a "that was actually right" override.
 *
 * Everything is stored under localStorage keys prefixed "deutsch-home:", which the overview's
 * backup exports together with the trainers' own data.
 */
(function () {
  'use strict';

  var GA_ID = 'G-D7XLZDC9HP';   // Google Analytics measurement ID (Admin → Data streams)

  var file = decodeURIComponent((location.pathname.split('/').pop() || 'index.html').split('?')[0]);
  var isOverview = file === 'index.html';
  var isNote = /-note\.html$/.test(file);
  var notesFile = /-practice\.html$/.test(file) ? file.replace(/-practice\.html$/, '-note.html') : null;

  /* ---------- 0. Analytics ---------- */
  if (GA_ID && /^https?:$/.test(location.protocol)) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
    var ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
    document.head.appendChild(ga);
  }

  // The overview and the note pages only need analytics; the bar and progress tracking are for the trainers.
  if (isOverview || isNote) return;

  function read(key) { try { return JSON.parse(localStorage.getItem(key)) || {}; } catch (e) { return {}; } }
  function write(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {} }

  /* ---------- 2. Visit ---------- */
  var opened = read('deutsch-home:lastOpened');
  opened[file] = Date.now();
  write('deutsch-home:lastOpened', opened);

  /* ---------- 3. Progress ---------- */
  var PROGRESS = 'deutsch-home:progress';
  var RECENT = 20;          // how many of the latest answers make up the "recent accuracy"
  var inSession = false;    // a session is one page load with at least one answer

  function answer(isCorrect) {
    var all = read(PROGRESS);
    var p = all[file] || { total: 0, correct: 0, recent: [], sessions: 0 };
    p.total += 1;
    if (isCorrect) p.correct += 1;
    p.recent = (p.recent || []).concat(isCorrect ? 1 : 0).slice(-RECENT);
    if (!inSession) { p.sessions = (p.sessions || 0) + 1; inSession = true; }
    p.updatedAt = Date.now();
    all[file] = p;
    write(PROGRESS, all);
    return p;
  }

  function amend(isCorrect) {
    var all = read(PROGRESS);
    var p = all[file];
    if (!p || !p.recent || !p.recent.length) return;
    var was = p.recent[p.recent.length - 1], now = isCorrect ? 1 : 0;
    if (was === now) return p;
    p.recent[p.recent.length - 1] = now;
    p.correct += now - was;
    p.updatedAt = Date.now();
    write(PROGRESS, all);
    return p;
  }

  window.deutschHome = { file: file, notes: notesFile, answer: answer, amend: amend };

  /* ---------- 1. Bar ---------- */
  function addBar() {
    if (document.getElementById('deutsch-home-bar')) return;

    var style = document.createElement('style');
    style.textContent =
      '#deutsch-home-bar{all:initial;display:flex;align-items:center;gap:1.1rem;box-sizing:border-box;width:100%;' +
        'padding:.65rem 1rem;color:inherit;opacity:.7;' +
        'font:600 13px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}' +
      '#deutsch-home-bar a{all:initial;cursor:pointer;color:inherit;font:inherit;text-decoration:none;padding:.25rem 0}' +
      '#deutsch-home-bar a:hover{text-decoration:underline}' +
      '#deutsch-home-bar a:focus-visible{outline:2px solid currentColor;outline-offset:2px}';

    var bar = document.createElement('nav');
    bar.id = 'deutsch-home-bar';
    bar.setAttribute('aria-label', 'German overview');

    var home = document.createElement('a');
    home.href = 'index.html';
    home.textContent = '\u2190 Overview';
    bar.appendChild(home);

    if (notesFile) {
      var notes = document.createElement('a');
      notes.href = notesFile;
      notes.textContent = 'Notes';
      bar.appendChild(notes);
    }

    document.head.appendChild(style);
    document.body.insertBefore(bar, document.body.firstChild);
  }

  if (document.body) addBar(); else document.addEventListener('DOMContentLoaded', addBar);
})();
