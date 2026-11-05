import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TraceMark from './TraceMark';
import LanguageSwitcher from './LanguageSwitcher';
import { navLinks, mailto } from '../../constants/site';

// A plain bar that slides in once the hero sheet's own top row has scrolled away.
const Topbar = () => {
  const { t } = useTranslation(['common', 'content']);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches
  );

  // On narrow screens the hero has no nav of its own, so the bar is always there.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const onChange = () => setNarrow(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const top = document.querySelector('[data-hero-top]');
    if (!top) return undefined;
    const io = new IntersectionObserver(([e]) => {
      setShow(!e.isIntersecting);
      if (e.isIntersecting) setOpen(false);
    });
    io.observe(top);
    return () => io.disconnect();
  }, []);

  const visible = narrow || show;
  const mail = mailto(t('content:contact.mailSubject'));

  return (
    <div className="topbar" data-show={visible ? '1' : '0'} inert={visible ? undefined : ''}>
      <div className="topbar-in">
        <a href="#top" className="wordmark">
          <TraceMark tone="dark" />
          {t('person.name')}
        </a>
        <nav aria-label={t('nav.main')}>
          <ul>
            {navLinks.map((id) => (
              <li key={id}>
                <a className="navlink" href={`#${id}`}>
                  {t(`nav.${id}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="topbar-end">
          <LanguageSwitcher className="lang-bar" />
          <a className="btn btn-paper" href={mail}>
            {t('actions.emailMe')}
          </a>
        </div>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="menu-panel"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? t('actions.closeMenu') : t('actions.openMenu')}</span>
          <svg className="menu-ico" width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path className="m-top" d="M3 9H25" />
            <path className="m-bot" d="M3 19H24" />
            <circle className="m-dot" cx="25" cy="19" r="2.6" fill="#c9a45c" stroke="none" />
          </svg>
        </button>
      </div>
      <div className="menu-panel" id="menu-panel" data-open={open ? '1' : '0'}>
        {navLinks.map((id) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {t(`nav.${id}`)}
          </a>
        ))}
        <a href={mail}>{t('actions.emailMe')}</a>
        <LanguageSwitcher className="lang-menu" onSwitch={() => setOpen(false)} />
      </div>
    </div>
  );
};

export default Topbar;
