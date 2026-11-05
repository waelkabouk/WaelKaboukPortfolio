import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { pathPlaces, SHOW_AL_RAJHI } from '../../constants/site';
import { formatPeriod } from '../../i18n/format';

// Sticky photograph, active list: the places on the path. The row nearest the
// middle of the screen (or the one hovered, focused or tapped) is active, and
// the photograph crossfades to that place.
const Path = () => {
  const { t, i18n } = useTranslation(['content', 'common']);
  const tc = i18n.getFixedT(i18n.resolvedLanguage, 'common');
  const [active, setActive] = useState(0);
  const rows = useRef([]);
  const lock = useRef(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (Date.now() < lock.current) return;
        const mid = window.innerHeight * 0.55;
        let best = -1;
        let bestD = Infinity;
        rows.current.forEach((el, i) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const d = Math.abs(r.top + 32 - mid);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        });
        if (best >= 0) setActive(best);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const pick = (i) => {
    lock.current = Date.now() + 900;
    setActive(i);
  };

  const field = (id, f, opts) => t(`path.places.${id}.${f}`, opts);
  const when = (p) => formatPeriod(p, i18n.resolvedLanguage, tc, { month: 'long', ongoing: 'today' });

  return (
    <section className="path" id="path" aria-labelledby="path-title">
      <div className="path-head">
        <h2 className="h2" id="path-title" data-rv>
          {t('path.title')}
        </h2>
        <p className="lead" data-rv style={{ '--i': 1 }}>
          {t('path.lead')}
        </p>
      </div>
      <figure className="path-photo" data-rv>
        <div className="ph">
          {pathPlaces.map((p, i) => (
            <img
              key={p.id}
              src={p.image}
              alt={i === active ? field(p.id, 'alt') : ''}
              aria-hidden={i === active ? undefined : 'true'}
              data-on={i === active ? '1' : '0'}
              style={p.focus ? { objectPosition: p.focus } : undefined}
              loading="lazy"
            />
          ))}
        </div>
        <figcaption aria-live="polite">{field(pathPlaces[active].id, 'caption')}</figcaption>
      </figure>

      <div className="path-list">
        <ol>
          {pathPlaces.map((p, i) => (
            <li
              key={p.id}
              className="path-row"
              data-on={i === active ? '1' : '0'}
              ref={(el) => {
                rows.current[i] = el;
              }}
              onMouseEnter={() => pick(i)}
            >
              <button
                type="button"
                aria-expanded={i === active}
                aria-controls={`place-${i}`}
                onClick={() => pick(i)}
                onFocus={() => pick(i)}
              >
                <span className="pl">{field(p.id, 'place')}</span>
                <span className="yr">{when(p)}</span>
              </button>
              <div className="tx" id={`place-${i}`}>
                <div>
                  {/* context picks text_alRajhi where it exists, else falls back to text */}
                  <p>{field(p.id, 'text', { context: SHOW_AL_RAJHI ? 'alRajhi' : undefined })}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Path;
