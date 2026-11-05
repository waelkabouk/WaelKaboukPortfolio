import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Topbar from './components/site/Topbar';
import Hero from './components/site/Hero';
import Research from './components/site/Research';
import Work from './components/site/Work';
import Path from './components/site/Path';
import CV from './components/site/CV';
import Skills from './components/site/Skills';
import Contact from './components/site/Contact';
import Footer from './components/site/Footer';

// Entrances: each marked part rises once as it enters. Content is never left
// hidden: without IntersectionObserver, or under reduced motion, nothing is hidden.
const useReveal = () => {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return undefined;
    const root = document.documentElement;
    root.classList.add('rv-on');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute('data-in', '');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 }
    );
    document.querySelectorAll('[data-rv]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

const App = () => {
  const { t } = useTranslation('common');
  useReveal();
  return (
    <>
      <a className="skip" href="#research">
        {t('actions.skipToResearch')}
      </a>
      <Topbar />
      <main>
        <Hero />
        <Research />
        <Work />
        <Path />
        <CV />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default App;
