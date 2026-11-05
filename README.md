# waelkabouk.com

Personal site of Wael Kabouk: research, selected work, experience and contact, in English, Arabic and Turkish.

Live at **[waelkabouk.com](https://waelkabouk.com)**.

## Stack

- React 18 and Vite
- Plain CSS in `src/index.css` (Tailwind is used only for its Preflight reset)
- [i18next](https://www.i18next.com/) with react-i18next for translations

## Run it

Requires Node 20.19 or later (Vite 7).

```bash
npm install
npm run dev          # local dev server
npm run build        # checks the translations, then builds to dist/
npm run preview      # serves the built site
npm run i18n:check   # checks the translations on their own
```

`dist/` is a static site. Any static host works; no server rewrites are needed.

## Layout

```
index.html               page shell; head text is filled in at build time
vite.config.js           fills the head, writes sitemap.xml and robots.txt
scripts/check-locales.mjs
src/
  App.jsx, main.jsx
  index.css              all styles
  components/site/       one component per section
  constants/site.js      links, images, stacks and dates (no text)
  i18n/                  language setup and date/language-name formatting
  locales/<lang>/        all visible text
    common.json          menus, buttons, labels, page title
    content.json         sections, projects, CV
public/                  images served as-is (thesis/, work/, world/)
```

## Editing text

Every visible word lives in `src/locales/<lang>/*.json`. The components and `site.js` contain no copy, only keys and data.

- Change wording in the JSON file for each language. Keep the keys the same.
- Keep `{{placeholders}}` and `<num>` tags as they are; the words around them can move.
- A new project, role or place needs an entry in `src/constants/site.js` (its id, link, image and dates) and a matching block under the same id in each `content.json`.
- Dates are ISO in `site.js` (`'2023-10'`, or `'2023'` for a year). End `null` means ongoing; no end means a single date. Month names come from the browser, so they are never translated by hand.

`npm run build` stops if a language is missing a key, has a list of a different length, or has different placeholders from English.

## Languages

| Code | Language | Direction | URL |
| ---- | -------- | --------- | --- |
| `en` | English (default) | left to right | `/` |
| `ar` | Arabic | right to left | `/?lang=ar` |
| `tr` | Turkish | left to right | `/?lang=tr` |

The language is chosen from `?lang=` in the URL, then the visitor's last choice, then the browser's language. The page sets `lang` and `dir` on `<html>` and switches the title, description, canonical link and share tags to match.

Layout uses logical CSS properties (`inset-inline-start`, `padding-inline`, `text-align: start`), so it mirrors on its own in Arabic. Arabic text uses IBM Plex Sans Arabic and never takes negative letter-spacing.

To add a language:

1. Add it to `LANGUAGES` in `src/i18n/config.js`.
2. Copy `src/locales/en/` to `src/locales/<code>/` and translate it.
3. Run `npm run i18n:check`.

The switcher, the hreflang links and the sitemap pick it up automatically.

## Photo credits

The city photographs in `public/world/` are from Wikimedia Commons under Creative Commons licences. Titles, authors and licences are listed in `public/world/credits.json`.
