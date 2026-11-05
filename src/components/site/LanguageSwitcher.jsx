import { useTranslation } from 'react-i18next';
import { LANGUAGES, QUERY_PARAM } from '../../i18n/config';
import { switchLanguage } from '../../i18n';
import { endonym } from '../../i18n/format';

// Each language is named in itself and links to ?lang=xx, so the choice works
// without JavaScript and can be shared; with JavaScript it switches in place.
const LanguageSwitcher = ({ className = '', onSwitch }) => {
  const { t, i18n } = useTranslation('common');
  const current = i18n.resolvedLanguage;

  return (
    <nav className={`lang-switch ${className}`} aria-label={t('language.label')}>
      <ul>
        {LANGUAGES.map(({ code }) => (
          <li key={code}>
            <a
              href={`?${QUERY_PARAM}=${code}`}
              hrefLang={code}
              lang={code}
              dir={i18n.dir(code)}
              aria-current={code === current ? 'true' : undefined}
              onClick={(e) => {
                e.preventDefault();
                if (code !== current) switchLanguage(code);
                onSwitch?.();
              }}
            >
              {endonym(code)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LanguageSwitcher;
