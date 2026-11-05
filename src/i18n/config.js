import { SITE_URL } from '../constants/site.js';

// Supported languages. Add a language here and a folder in src/locales with the
// same namespaces; nothing else in the app needs to change.
//   intl:     the locale tag handed to Intl (dates, language names). Arabic keeps
//             the Gregorian calendar and Western digits, as used in Saudi tech writing.
//   ogLocale: the Open Graph locale for link previews.
export const LANGUAGES = [
  { code: 'en', intl: 'en', ogLocale: 'en_US' },
  { code: 'ar', intl: 'ar-u-ca-gregory-nu-latn', ogLocale: 'ar_SA' },
  { code: 'tr', intl: 'tr', ogLocale: 'tr_TR' },
];

export const LANGUAGE_CODES = LANGUAGES.map((l) => l.code);
export const DEFAULT_LANGUAGE = 'en';
export const NAMESPACES = ['common', 'content'];

// ?lang=ar in the URL wins, then the visitor's last choice, then the browser.
export const QUERY_PARAM = 'lang';
export const STORAGE_KEY = 'lang';

const byCode = (code) => LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];
export const intlLocale = (code) => byCode(code).intl;
export const ogLocale = (code) => byCode(code).ogLocale;

// The public address of each language version: the root for the default
// language, ?lang=<code> for the others. Used for canonical, hreflang and the sitemap.
export const pageUrl = (code) =>
  code === DEFAULT_LANGUAGE ? `${SITE_URL}/` : `${SITE_URL}/?${QUERY_PARAM}=${code}`;
