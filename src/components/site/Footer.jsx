import { useTranslation } from 'react-i18next';
import TraceMark from './TraceMark';
import LanguageSwitcher from './LanguageSwitcher';
import { LINKEDIN, GITHUB, mailto } from '../../constants/site';

// The close mirrors the opening stage: the last photograph, Riyadh at night
// with its traffic running in lines of light, the name across it ending in
// the gold point, and the paper bar the hero stands on.
const Footer = () => {
  const { t } = useTranslation(['content', 'common']);
  const name = t('common:person.name');

  return (
    <footer className="foot" aria-labelledby="foot-name">
      <div className="foot-stage">
        <div className="foot-bg">
          <img src="/world/riyadh-night.jpg" alt="" loading="lazy" width="1920" height="1005" />
        </div>
        <p className="foot-place" data-rv>
          {t('footer.place')}
        </p>
        <h2 className="foot-name" id="foot-name" data-rv style={{ '--i': 1 }}>
          {name}
          <span className="pt" aria-hidden="true" />
        </h2>
        <div className="foot-bar">
          <a href="#top" className="wordmark foot-mark" aria-label={t('common:nav.backToTopOf', { name })}>
            <TraceMark tone="light" />
          </a>
          <ul aria-label={t('footer.contactLabel')}>
            <li>
              <a href={mailto(t('contact.mailSubject'))}>{t('contact.channels.email')}</a>
            </li>
            <li>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                {t('contact.channels.linkedin')}
              </a>
            </li>
            <li>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer">
                {t('contact.channels.github')}
              </a>
            </li>
            <li className="to-top">
              <a href="#top">{t('common:actions.backToTop')}</a>
            </li>
          </ul>
          <LanguageSwitcher className="lang-foot" />
        </div>
      </div>

      <div className="foot-legal">
        <p>{t('footer.copyright', { year: new Date().getFullYear(), name })}</p>
      </div>
    </footer>
  );
};

export default Footer;
