import { intlLocale } from './config';

// Locale-aware formatting through Intl, so month and language names never live
// in the code or the translation files.

// '2023' or '2023-10' (ISO year or year-month).
const toDate = (iso) => {
  const [y, m] = iso.split('-').map(Number);
  return { hasMonth: Boolean(m), date: new Date(Date.UTC(y, (m || 1) - 1, 1)) };
};

export const formatDate = (iso, lng, month = 'short') => {
  const { hasMonth, date } = toDate(iso);
  const opts = hasMonth
    ? { year: 'numeric', month, timeZone: 'UTC' }
    : { year: 'numeric', timeZone: 'UTC' };
  return new Intl.DateTimeFormat(intlLocale(lng), opts).format(date);
};

// period: { start, end }. No end means a single date; end: null means ongoing.
// t must be bound to the 'common' namespace.
export const formatPeriod = ({ start, end }, lng, t, { month = 'short', ongoing = 'present' } = {}) => {
  const from = formatDate(start, lng, month);
  if (end === undefined) return from;
  const to = end === null ? t(`dates.${ongoing}`) : formatDate(end, lng, month);
  return from === to ? from : t('dates.range', { from, to });
};

// A language's name as written in another language: languageName('tr', 'en') is "Turkish".
export const languageName = (code, inLng) => {
  try {
    return new Intl.DisplayNames([intlLocale(inLng)], { type: 'language' }).of(code) || code;
  } catch {
    return code.toUpperCase();
  }
};

// A language's name in itself: "العربية", "English", "Türkçe".
export const endonym = (code) => languageName(code, code);
