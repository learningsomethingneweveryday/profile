/**
 * theme.js
 * Two small, independent features, both progressive enhancements:
 *
 * 1. Theme toggle — switches [data-theme] between "light" and "dark" on
 *    <html>, persists the explicit choice to localStorage, and falls back
 *    to the system's prefers-color-scheme when nothing has been saved.
 *    All actual theming is done in CSS via custom properties — this file
 *    only ever sets one attribute.
 *
 * 2. Mobile nav toggle — turns the always-visible nav (the no-JS default)
 *    into a collapsible hamburger menu. If this script fails to load, the
 *    nav simply stays visible and the site remains fully usable.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "portfolio-theme";
  var root = document.documentElement;

  /* ---------------------------------------------------------------------
     Theme toggle
     --------------------------------------------------------------------- */
  function getSavedTheme() {
    try {
      var value = window.localStorage.getItem(STORAGE_KEY);
      return value === "light" || value === "dark" ? value : null;
    } catch (err) {
      return null;
    }
  }

  function systemPrefersDark() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  function effectiveTheme() {
    var attr = root.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") return attr;
    return systemPrefersDark() ? "dark" : "light";
  }

  function updateToggleButton(theme) {
    var toggle = document.getElementById("theme-toggle");
    if (!toggle) return;
    var isDark = theme === "dark";
    toggle.setAttribute("aria-pressed", String(isDark));
    var label = toggle.querySelector(".theme-toggle-text");
    var icon = toggle.querySelector(".theme-toggle-icon");
    if (label) label.textContent = isDark ? "Light mode" : "Dark mode";
    if (icon) icon.textContent = isDark ? "\u2600" : "\u25D1"; /* sun / half-moon */
  }

  var saved = getSavedTheme();
  if (saved) root.setAttribute("data-theme", saved);
  updateToggleButton(effectiveTheme());

  var themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = effectiveTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch (err) {
        /* localStorage unavailable (private mode etc.) — theme still
           applies for the rest of this page view, just won't persist. */
      }
      updateToggleButton(next);
    });
  }

  /* ---------------------------------------------------------------------
     Mobile nav toggle
     --------------------------------------------------------------------- */
  var navToggle = document.getElementById("nav-toggle");
  var navList = document.getElementById("primary-nav-list");

  if (navToggle && navList) {
    // Only collapse the nav behind a button once JS is confirmed working.
    root.classList.add("js-nav-enabled");

    function closeNav() {
      navList.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }

    function openNav() {
      navList.classList.add("is-open");
      navToggle.setAttribute("aria-expanded", "true");
    }

    navToggle.addEventListener("click", function () {
      if (navList.classList.contains("is-open")) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close after choosing a link (page navigates away regardless, but this
    // avoids a flash of the open menu on the next page for cached back/forward).
    Array.prototype.forEach.call(navList.querySelectorAll("a"), function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navList.classList.contains("is-open")) {
        closeNav();
        navToggle.focus();
      }
    });
  }
})();
