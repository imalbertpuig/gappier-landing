#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
const translations = JSON.parse(fs.readFileSync(path.join(__dirname, 'translations.json'), 'utf8'));

const LANGUAGES = [
  { code: 'en', label: 'English',     url: '/' },
  { code: 'ca', label: 'Català',      url: '/ca/' },
  { code: 'es', label: 'Español',     url: '/es/' },
  { code: 'fr', label: 'Français',    url: '/fr/' },
  { code: 'it', label: 'Italiano',    url: '/it/' },
  { code: 'pt', label: 'Português',   url: '/pt/' },
  { code: 'de', label: 'Deutsch',     url: '/de/' },
  { code: 'pl', label: 'Polski',      url: '/pl/' },
  { code: 'tr', label: 'Türkçe',      url: '/tr/' },
  { code: 'vi', label: 'Tiếng Việt',  url: '/vi/' },
];

const CLASS_ACTIVE   = 'block px-4 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30';
const CLASS_INACTIVE = 'block px-4 py-1.5 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800';

function buildLangNav(activeCode) {
  return LANGUAGES.map(({ code, label, url }) => {
    const cls = code === activeCode ? CLASS_ACTIVE : CLASS_INACTIVE;
    return `            <a href="${url}" class="${cls}">${label}</a>`;
  }).join('\n');
}

function splitAroundChalkWord(heading, chalkWord) {
  const idx = heading.indexOf(chalkWord);
  if (idx === -1) {
    return { before: heading, after: '' };
  }
  return {
    before: heading.slice(0, idx),
    after:  heading.slice(idx + chalkWord.length),
  };
}

function buildPage(langCode) {
  const t = translations[langCode];
  if (!t) throw new Error(`No translations found for language: ${langCode}`);

  const { before, after } = splitAroundChalkWord(t.ctaHeading, t.ctaChalkWord);

  let html = template;

  // Replace computed placeholders first
  html = html.replace('{{langNav}}', buildLangNav(langCode));
  html = html.replace('{{ctaHeading_before}}', before);
  html = html.replace('{{ctaHeading_after}}', after);

  // Replace all remaining {{key}} placeholders
  html = html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(t, key)) {
      return t[key];
    }
    console.warn(`  [warn] No translation for key "{{${key}}}" in lang "${langCode}"`);
    return match;
  });

  return html;
}

function getOutputPath(langCode) {
  if (langCode === 'en') return path.join(DIST, 'index.html');
  return path.join(DIST, langCode, 'index.html');
}

// Clean and recreate dist/
if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true });
fs.mkdirSync(DIST);

// Generate HTML pages
for (const { code } of LANGUAGES) {
  const html = buildPage(code);
  const dest = getOutputPath(code);

  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(dest, html, 'utf8');
  console.log(`  built: ${path.relative(ROOT, dest)}`);
}

// Copy static assets to dist/
const STATIC_ASSETS = ['favicon.svg', 'og-image.png', 'robots.txt', 'sitemap.xml'];
for (const asset of STATIC_ASSETS) {
  const src = path.join(ROOT, asset);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(DIST, asset));
    console.log(`  copied: ${asset}`);
  }
}

console.log(`\nGenerated ${LANGUAGES.length} pages → dist/`);
