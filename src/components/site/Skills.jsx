import { useTranslation } from 'react-i18next';
import { skillGroups, spokenLanguages, CEFR } from '../../constants/site';
import { endonym, languageName } from '../../i18n/format';

// The spec sheet. Toolsets in the order a system runs, from the camera feed
// to the deployed answer; then the three languages, each on the CEFR scale.
const Skills = () => {
  const { t, i18n } = useTranslation('content');
  const lng = i18n.resolvedLanguage;

  return (
    <section className="skills" id="skills" aria-labelledby="skills-title">
      <div className="skills-head">
        <h2 className="h2" id="skills-title" data-rv>
          {t('skills.title')}
        </h2>
        <p className="lead" data-rv style={{ '--i': 1 }}>
          {t('skills.lead')}
        </p>
      </div>

      <dl className="spec">
        {skillGroups.map((id, i) => {
          const items = t(`skills.groups.${id}.items`, { returnObjects: true });
          return (
            <div className="spec-row" key={id} data-rv style={{ '--i': i % 3 }}>
              <dt className="h3">{t(`skills.groups.${id}.name`)}</dt>
              <dd>
                <ul>
                  {(Array.isArray(items) ? items : []).map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </dd>
            </div>
          );
        })}
      </dl>

      <ul className="langs" aria-label={t('skills.languagesLabel')}>
        {spokenLanguages.map((l, i) => {
          const name = languageName(l.code, lng);
          const level = t(`skills.levels.${l.level}`);
          return (
            <li key={l.code} data-rv style={{ '--i': i }}>
              <p className="w" lang={l.code}>
                {endonym(l.code)}
              </p>
              <p className="lv">
                <span className="nm">{name}</span>
                <span>{level}</span>
              </p>
              <div
                className="scale"
                role="img"
                aria-label={t('skills.scaleLabel', { language: name, level })}
              >
                {CEFR.map((c, k) => (
                  <span key={c} className="seg" data-on={k < l.filled ? '1' : undefined} style={{ '--k': k }}>
                    <span className="bar" />
                    <span className="cd" aria-hidden="true">
                      {c}
                    </span>
                  </span>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Skills;
