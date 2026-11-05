import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { LANGUAGES, DEFAULT_LANGUAGE, pageUrl } from './src/i18n/config.js'
import { SITE_URL } from './src/constants/site.js'

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// One link per language plus x-default (the root, which detects the visitor's language).
const alternates = () => [
  ...LANGUAGES.map((l) => ({ hreflang: l.code, href: pageUrl(l.code) })),
  { hreflang: 'x-default', href: pageUrl(DEFAULT_LANGUAGE) },
]

// The static <head> (what crawlers and link previews see before JavaScript
// runs) is filled from the default locale and the site address, so neither is
// written twice. At runtime src/i18n swaps in the visitor's language.
// The build also writes sitemap.xml (with hreflang alternates) and robots.txt.
const localeHead = () => ({
  name: 'locale-head',
  transformIndexHtml: {
    order: 'pre', // before Vite reads %NAME% as environment variables
    handler(html) {
      const { meta } = JSON.parse(
        readFileSync(new URL('./src/locales/en/common.json', import.meta.url), 'utf-8')
      )
      const links = alternates()
        .map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${esc(a.href)}" />`)
        .join('\n  ')
      return html
        .replaceAll('%META_TITLE%', esc(meta.title))
        .replaceAll('%META_DESCRIPTION%', esc(meta.description))
        .replaceAll('%META_OG_DESCRIPTION%', esc(meta.ogDescription))
        .replaceAll('%SITE_URL%', SITE_URL)
        .replaceAll('%CANONICAL_URL%', esc(pageUrl(DEFAULT_LANGUAGE)))
        .replace('<!-- %HREFLANG% -->', links)
    },
  },
  generateBundle() {
    const xhtml = alternates()
      .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${esc(a.href)}" />`)
      .join('\n')
    const urls = LANGUAGES.map(
      (l) => `  <url>\n    <loc>${esc(pageUrl(l.code))}</loc>\n${xhtml}\n  </url>`
    ).join('\n')
    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
    })
    this.emitFile({
      type: 'asset',
      fileName: 'robots.txt',
      source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
    })
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), localeHead()],
})
