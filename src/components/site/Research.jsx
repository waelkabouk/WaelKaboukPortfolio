import { useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { thesis } from '../../constants/site';

// The live thing: the thesis method, performed on the thesis tool's own frames.
// Three camera views (three passes) slide together into one composite frame
// (one pass), then the detections appear on it. The plate is a diagram of
// fixed geometry, so it keeps its layout in right-to-left languages too.
const LAYOUT = {
  cameras: [
    { x: 6, y: 6, s: 1 },
    { x: 25, y: 35.3, s: 1 },
    { x: 44, y: 64.6, s: 1 },
  ],
  frame: [
    { x: 6, y: 41.4, s: 0.5867 },
    { x: 35.33, y: 41.4, s: 0.5867 },
    { x: 64.67, y: 41.4, s: 0.5867 },
  ],
};
LAYOUT.tracked = LAYOUT.frame;

const FIGURES = ['consistency', 'speed'];

const Research = () => {
  const { t } = useTranslation(['content', 'common']);
  const [step, setStep] = useState(0);
  const [touched, setTouched] = useState(false);
  const plateRef = useRef(null);
  const steps = thesis.steps;
  const current = steps[step];
  const passes = current === 'cameras' ? thesis.cams.length : 1;

  // Play the three steps once in view, until the visitor takes over.
  useEffect(() => {
    if (touched) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let timer;
    const io = new IntersectionObserver(
      ([entry]) => {
        clearInterval(timer);
        if (entry.isIntersecting) {
          timer = setInterval(() => setStep((s) => (s + 1) % steps.length), 3600);
        }
      },
      { threshold: 0.4 }
    );
    if (plateRef.current) io.observe(plateRef.current);
    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  }, [touched, steps.length]);

  const choose = (i) => {
    setTouched(true);
    setStep(i);
  };

  // Arrow keys follow reading direction: in Arabic, the next tab is to the left.
  const onKey = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const rtl = document.documentElement.dir === 'rtl';
    const forward = (e.key === 'ArrowRight') !== rtl;
    const n = steps.length;
    const next = (step + (forward ? 1 : n - 1)) % n;
    choose(next);
    document.getElementById(`tab-${steps[next]}`)?.focus();
  };

  return (
    <section className="research" id="research" aria-labelledby="research-title">
      <figure className="plate" data-step={current} ref={plateRef} data-rv style={{ margin: 0 }}>
        {thesis.cams.map((cam, i) => {
          const p = LAYOUT[current][i];
          return (
            <div key={cam.id} className="frame" style={{ '--x': p.x, '--y': p.y, '--s': p.s }}>
              <img src={cam.src} alt={t(`research.cams.${cam.id}`)} width="960" height="565" loading="lazy" />
            </div>
          );
        })}
        <img
          className="composite"
          src="/thesis/composite.jpg"
          alt={t('research.compositeAlt')}
          width="1298"
          height="286"
          loading="lazy"
        />
        <p className="passes" aria-live="polite">
          <Trans t={t} i18nKey="research.passes" count={passes} components={{ num: <b /> }} />
        </p>
      </figure>

      <div className="research-text">
        <div className="tabs" role="tablist" aria-label={t('research.tablistLabel')} data-rv>
          {steps.map((id, i) => (
            <button
              key={id}
              id={`tab-${id}`}
              type="button"
              role="tab"
              className="tab"
              aria-selected={i === step}
              aria-controls="research-panel"
              tabIndex={i === step ? 0 : -1}
              onClick={() => choose(i)}
              onKeyDown={onKey}
            >
              {t(`research.steps.${id}.tab`)}
            </button>
          ))}
        </div>

        <div className="copy" data-rv style={{ '--i': 1 }}>
          <h2 className="h2" id="research-title">
            {t('research.title')}
          </h2>
          <div id="research-panel" role="tabpanel" aria-labelledby={`tab-${current}`}>
            <p className="say">{t(`research.steps.${current}.text`)}</p>
            <p className="cap small muted">{t(`research.steps.${current}.caption`)}</p>
          </div>
        </div>

        <dl className="research-figs" data-rv style={{ '--i': 2 }}>
          {FIGURES.map((f) => (
            <div key={f}>
              <dt className="sr-only">{t(`research.figures.${f}.label`)}</dt>
              <dd className="num">{t(`research.figures.${f}.value`)}</dd>
              <dd className="what">{t(`research.figures.${f}.what`)}</dd>
            </div>
          ))}
        </dl>

        <div className="cells" data-rv style={{ '--i': 3 }}>
          <a className="btn btn-paper" href={thesis.paper} target="_blank" rel="noopener noreferrer">
            {t('common:actions.readPaper')} <span className="arrow" aria-hidden="true">→</span>
          </a>
          <a className="btn btn-quiet" href={thesis.code} target="_blank" rel="noopener noreferrer">
            {t('common:actions.codeOnGithub')} <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Research;
