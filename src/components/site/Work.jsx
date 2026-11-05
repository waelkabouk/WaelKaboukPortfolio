import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { workItems, otherProjects } from '../../constants/site';

// Stack entries are product names, or { term } for words that need translating.
const stackLine = (stack, t) =>
  stack.map((s) => (typeof s === 'string' ? s : t(`work.terms.${s.term}`))).join(' · ');

const linkLabel = (p, t) =>
  p.linkType === 'site'
    ? t('common:actions.visitSite', { site: p.site })
    : p.linkType === 'github'
      ? t('common:actions.codeOnGithub')
      : t('common:actions.open');

const pad = (n) => String(n).padStart(2, '0');

// Small index, large picture. On desktop the stage is pinned for one screen
// per project; the picture wipes up from the bottom as each one arrives.
const Work = () => {
  const { t } = useTranslation(['content', 'common']);
  const n = workItems.length;
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = trackRef.current;
        if (!el || !el.offsetParent) return;
        const r = el.getBoundingClientRect();
        const travel = r.height - window.innerHeight;
        const p = Math.min(Math.max(-r.top / Math.max(travel, 1), 0), 0.9999);
        setActive(Math.floor(p * n));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [n]);

  const jump = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (travel * (i + 0.5)) / n, behavior: 'smooth' });
  };

  const item = workItems[active];
  const text = (id, field) => t(`work.projects.${id}.${field}`);

  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="work-head">
        <h2 className="h-display" id="work-title" data-rv>
          {t('work.title')}
        </h2>
        <p data-rv style={{ '--i': 1 }}>
          {t('work.intro')}
        </p>
      </div>

      {/* Pinned stage: picture beside the text on desktop, above it on phones */}
      <div className="work-track" ref={trackRef} style={{ '--n': n }}>
        <div className="work-stage">
          <div className="work-left">
            <p className="work-count small muted" aria-hidden="true">
              {t('work.count', { current: pad(active + 1), total: pad(n) })}
            </p>
            <div className="work-active" aria-live="polite">
              <h3 className="h3">{text(item.id, 'name')}</h3>
              <p>{text(item.id, 'summary')}</p>
              <p className="stack small muted">{stackLine(item.stack, t)}</p>
              {item.link && (
                <a className="link go" href={item.link} target="_blank" rel="noopener noreferrer">
                  {linkLabel(item, t)}
                </a>
              )}
            </div>

            <ol className="work-index" aria-label={t('work.indexLabel')}>
              {workItems.map((w, i) => (
                <li key={w.id}>
                  <button type="button" aria-current={i === active} onClick={() => jump(i)}>
                    <span className="nm">{text(w.id, 'name')}</span>
                    <span className="kd">{text(w.id, 'kind')}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="work-pics">
            {workItems.map((w, i) => (
              <figure key={w.id} className="work-pic" data-on={i <= active ? '1' : '0'} data-rtl={w.rtl ? '1' : undefined}>
                <img src={w.image} alt={text(w.id, 'alt')} />
                {w.hasCaption && <figcaption>{text(w.id, 'caption')}</figcaption>}
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* Short screens only: each project stacks as picture and text */}
      <div className="work-mobile">
        {workItems.map((w) => (
          <article key={w.id} data-rv>
            <div className="pic">
              <img src={w.image} alt={text(w.id, 'alt')} loading="lazy" />
            </div>
            <h3 className="h3">{text(w.id, 'name')}</h3>
            <p className="kd small muted">{text(w.id, 'kind')}</p>
            <p className="sum">{text(w.id, 'summary')}</p>
            <p className="small muted" style={{ marginTop: 10 }}>{stackLine(w.stack, t)}</p>
            {w.link && (
              <a className="link" style={{ display: 'inline-block', marginTop: 14 }} href={w.link} target="_blank" rel="noopener noreferrer">
                {linkLabel(w, t)}
              </a>
            )}
          </article>
        ))}
      </div>

      <div className="others">
        <h3 className="h2" data-rv>
          {t('work.othersTitle')}
        </h3>
        <ul>
          {otherProjects.map((p, i) => (
            <li key={p.id} data-rv style={{ '--i': i % 2 }}>
              <h4 className="h3">{text(p.id, 'name')}</h4>
              <p>{text(p.id, 'summary')}</p>
              {p.link && (
                <a className="link" href={p.link} target="_blank" rel="noopener noreferrer">
                  {linkLabel(p, t)}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Work;
