import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

import enCommon from '../locales/en/common.json';
import enContent from '../locales/en/content.json';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_CODES,
  NAMESPACES,
  QUERY_PARAM,
  STORAGE_KEY,
  LANGUAGES,
  ogLocale,
  pageUrl,
} from './config';

// The default language ships in the main bundle; the others are split into
// their own chunks and fetched only when a visitor needs them.
const lazyLocales = import.meta.glob(['../locales/*/*.json', '!../locales/en/*.json']);

const loadLocale = (lng, ns) => {
  const load = lazyLocales[`../locales/${lng}/${ns}.json`];
  return load ? load() : Promise.reject(new Error(`No locale file for ${lng}/${ns}`));
};

const setMeta = (attr, key, value) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
};

// Keep <html lang dir>, the title and the share tags in step with the language.
// i18next fires this only after the language's files have loaded.
const syncDocument = (detected) => {
  const lng = i18n.resolvedLanguage || detected; // 'en-US' from the browser becomes 'en'
  const root = document.documentElement;
  root.lang = lng;
  root.dir = i18n.dir(lng);
  const t = i18n.getFixedT(lng, 'common');
  document.title = t('meta.title');
  setMeta('name', 'description', t('meta.description'));
  setMeta('property', 'og:title', t('meta.title'));
  setMeta('property', 'og:description', t('meta.ogDescription'));
  setMeta('property', 'og:locale', ogLocale(lng));
  setMeta('property', 'og:url', pageUrl(lng));
  document.head.querySelector('link[rel="canonical"]')?.setAttribute('href', pageUrl(lng));
  document.head.querySelectorAll('meta[property="og:locale:alternate"]').forEach((m) => m.remove());
  LANGUAGES.filter((l) => l.code !== lng).forEach((l) => {
    const m = document.createElement('meta');
    m.setAttribute('property', 'og:locale:alternate');
    m.setAttribute('content', l.ogLocale);
    document.head.appendChild(m);
  });
};

i18n.on('languageChanged', syncDocument);

i18n
  .use(LanguageDetector)
  .use(resourcesToBackend(loadLocale))
  .use(initReactI18next)
  .init({
    resources: { [DEFAULT_LANGUAGE]: { common: enCommon, content: enContent } },
    partialBundledLanguages: true,
    supportedLngs: LANGUAGE_CODES,
    load: 'languageOnly',
    fallbackLng: DEFAULT_LANGUAGE,
    ns: NAMESPACES,
    defaultNS: 'common',
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: QUERY_PARAM,
      lookupLocalStorage: STORAGE_KEY,
      caches: ['localStorage'],
      convertDetectedLanguage: (lng) => lng.split('-')[0], // ar-SA → ar, tr-TR → tr
    },
    interpolation: { escapeValue: false }, // React escapes output already
    returnEmptyString: false,
  });

// Switch language and keep the URL shareable (?lang=xx), without a reload.
export const switchLanguage = (lng) => {
  const url = new URL(window.location.href);
  url.searchParams.set(QUERY_PARAM, lng);
  window.history.replaceState(window.history.state, '', url);
  return i18n.changeLanguage(lng);
};

export default i18n;
