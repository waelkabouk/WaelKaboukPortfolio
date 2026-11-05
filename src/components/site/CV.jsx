import { useTranslation } from 'react-i18next';
import { cvGroups, education, publications } from '../../constants/site';
import { formatDate, formatPeriod } from '../../i18n/format';

// The printed sheet: experience, education and publications set like a CV page.
const Item = ({ title, org, date, points, children }) => (
  <article className="cv-item">
    <div className="cv-row">
      <h4 className="t">{title}</h4>
      <span className="d">{date}</span>
    </div>
    {org && <p className="org">{org}</p>}
    {points?.length > 0 && (
      <ul>
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    )}
    {children}
  </article>
);

const list = (value) => (Array.isArray(value) ? value : []);

const CV = () => {
  const { t, i18n } = useTranslation(['content', 'common']);
  const lng = i18n.resolvedLanguage;
  const tc = i18n.getFixedT(lng, 'common');
  const period = (p) => formatPeriod(p, lng, tc);

  // One entry from content:cv.<section>.<id>, with its dates formatted for the language.
  const entry = (section, item) => ({
    title: t(`cv.${section}.${item.id}.title`),
    org: t(`cv.${section}.${item.id}.org`),
    points: list(t(`cv.${section}.${item.id}.points`, { returnObjects: true })),
    date: period(item),
  });

  return (
    <section className="cv" id="experience" aria-labelledby="cv-title">
      <div className="cv-sheet">
        <div className="cv-head" data-rv>
          <h2 className="h2" id="cv-title">
            {t('cv.title')}
          </h2>
          <p className="small">{t('cv.intro')}</p>
        </div>

        {cvGroups.map((g) =>
          g.items.length ? (
            <div className="cv-group" key={g.id} id={g.anchor || g.id} data-rv>
              <h3 className="h3">{t(`cv.groups.${g.id}`)}</h3>
              {g.items.map((e) => (
                <Item key={e.id} {...entry('roles', e)} />
              ))}
            </div>
          ) : null
        )}

        <div className="cv-group" id="education" data-rv>
          <h3 className="h3">{t('cv.groups.education')}</h3>
          {education.map((e) => (
            <Item key={e.id} {...entry('education', e)} />
          ))}
        </div>

        <div className="cv-group" id="publications" data-rv>
          <h3 className="h3">{t('cv.groups.publications')}</h3>
          {publications.map((p) => (
            <Item
              key={p.id}
              title={t(`cv.publications.${p.id}.title`)}
              org={t('cv.citation', {
                authors: p.authors.join(', '),
                venue: t(`cv.publications.${p.id}.venue`),
                location: t(`cv.publications.${p.id}.location`),
                pages: p.pages,
              })}
              date={formatDate(p.date.slice(0, 4), lng)}
              points={[t(`cv.publications.${p.id}.summary`)]}
            >
              {p.link && (
                <a className="link pdf small" href={p.link} target="_blank" rel="noopener noreferrer">
                  {t('common:actions.readPaper')}
                </a>
              )}
            </Item>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CV;
