// Checks every locale against the default (en): same files, same keys, same
// list lengths, same {{placeholders}} and <tags>, no empty strings.
// Plural keys are compared by base name, since languages have different
// plural forms (Arabic has six, Turkish two). Run: npm run i18n:check
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../src/locales/', import.meta.url));
const BASE = 'en';
const PLURAL = /_(zero|one|two|few|many|other)$/;

const flatten = (obj, prefix = '', out = {}) => {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) flatten(v, key, out);
    else out[key] = v;
  }
  return out;
};

const tokens = (s) =>
  [...String(s).matchAll(/\{\{\s*([\w.]+)[^}]*\}\}|<\/?(\w+)\s*\/?>/g)]
    .map((m) => m[1] || `<${m[2]}>`)
    .sort()
    .join(',');

const load = (lng, file) => flatten(JSON.parse(readFileSync(join(root, lng, file), 'utf-8')));

const langs = readdirSync(root).filter((d) => d !== BASE);
const files = readdirSync(join(root, BASE));
const problems = [];

for (const file of files) {
  const base = load(BASE, file);
  const baseKeys = new Map(Object.keys(base).map((k) => [k.replace(PLURAL, ''), k]));

  for (const lng of langs) {
    let other;
    try {
      other = load(lng, file);
    } catch (e) {
      problems.push(`${lng}/${file}: ${e.message}`);
      continue;
    }
    const otherKeys = new Map(Object.keys(other).map((k) => [k.replace(PLURAL, ''), k]));

    for (const [stem, key] of baseKeys) {
      if (!otherKeys.has(stem)) {
        problems.push(`${lng}/${file}: missing ${stem}`);
        continue;
      }
      const a = base[key];
      const b = other[otherKeys.get(stem)];
      if (Array.isArray(a) !== Array.isArray(b)) problems.push(`${lng}/${file}: ${stem} should ${Array.isArray(a) ? '' : 'not '}be a list`);
      else if (Array.isArray(a) && a.length !== b.length) problems.push(`${lng}/${file}: ${stem} has ${b.length} items, ${BASE} has ${a.length}`);
      else if (!Array.isArray(a) && tokens(a) !== tokens(b)) problems.push(`${lng}/${file}: ${stem} placeholders differ (${tokens(a)} vs ${tokens(b)})`);
    }
    for (const stem of otherKeys.keys()) {
      if (!baseKeys.has(stem)) problems.push(`${lng}/${file}: extra key ${stem}`);
    }
    for (const [k, v] of Object.entries(other)) {
      if (v === '' || (Array.isArray(v) && v.some((x) => !x))) problems.push(`${lng}/${file}: empty ${k}`);
    }
  }
}

if (problems.length) {
  console.error(`Locale check failed (${problems.length}):\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`Locales match ${BASE}: ${langs.join(', ')} · ${files.join(', ')}`);
