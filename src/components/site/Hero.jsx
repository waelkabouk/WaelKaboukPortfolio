import { useTranslation } from 'react-i18next';
import TraceMark from './TraceMark';
import LanguageSwitcher from './LanguageSwitcher';
import { SHOW_AL_RAJHI, mailto } from '../../constants/site';

const FIGURES = ['consistency', 'speed'];

// Hero: the split stage. Left, a paper sheet set like a printed card, then the
// About text on the same sheet. Right, the portrait stays put while the sheet scrolls.
const Hero = () => {
  const { t } = useTranslation(['content', 'common']);
  const name = t('common:person.name');

  return (
    <div className="hero" id="top">
      <div className="sheet">
        <div className="sheet-top" data-hero-top>
          <nav aria-label={t('common:nav.sections')}>
            <a href="#research">{t('common:nav.research')}</a>
            <a href="#work">{t('common:nav.work')}</a>
          </nav>
          <a href="#top" className="mark" aria-label={t('common:nav.home', { name })}>
            <TraceMark tone="light" />
          </a>
          <nav aria-label={t('common:nav.moreSections')}>
            <a href="#experience">{t('common:nav.experience')}</a>
            <a href="#contact">{t('common:nav.contact')}</a>
          </nav>
        </div>

        <div className="sheet-head">
          <h1 className="h-display" data-rv style={{ '--i': 0 }}>
            {name}
          </h1>
          <p className="lead" data-rv style={{ '--i': 1 }}>
            {t('hero.lead')}
          </p>
          <div className="actions" data-rv style={{ '--i': 2 }}>
            <a className="btn btn-ink" href={mailto(t('contact.mailSubject'))}>
              {t('common:actions.emailMe')}
            </a>
            <a className="link" href="#research">
              {t('common:actions.seeResearch')}
            </a>
          </div>
        </div>

        <section className="sheet-about" id="about" aria-labelledby="about-title">
          <div>
            <h2 className="h2" id="about-title" data-rv>
              {t('about.title')}
            </h2>
            <div data-rv style={{ '--i': 1 }}>
              <p>{t('about.intro')}</p>
              {SHOW_AL_RAJHI && <p>{t('about.alRajhi')}</p>}
              <p>{t('about.thesis')}</p>
              <p>{t('about.open')}</p>
            </div>
            <dl className="figures" data-rv style={{ '--i': 2 }}>
              {FIGURES.map((f) => (
                <div key={f}>
                  <dt className="sr-only">{t(`about.figures.${f}.label`)}</dt>
                  <dd className="num">{t(`about.figures.${f}.value`)}</dd>
                  <dd className="what">{t(`about.figures.${f}.what`)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>

      <div className="stage">
        <img
          src="/wael.png"
          alt={t('hero.portraitAlt')}
          width="2048"
          height="2048"
          fetchpriority="high"
        />
        <div className="stage-bar">
          <span>{t('hero.location')}</span>
          <LanguageSwitcher className="lang-stage" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
