import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  EMAIL,
  LINKEDIN,
  LINKEDIN_HANDLE,
  GITHUB,
  GITHUB_HANDLE,
  PHONE,
  PHONE_HREF,
  mailto,
} from '../../constants/site';

// One field, nothing else. Sending opens the visitor's email app with the
// message filled in; there is no form backend.
const Contact = () => {
  const { t } = useTranslation('content');
  const [msg, setMsg] = useState('');
  const subject = t('contact.mailSubject');

  const send = (e) => {
    e.preventDefault();
    window.location.href = mailto(subject, msg.trim());
  };

  // Addresses, numbers and handles are always left-to-right, even on an
  // Arabic page; dir="ltr" keeps "+966 571 872 756" from reordering.
  const channels = [
    { id: 'email', href: mailto(subject), value: EMAIL },
    { id: 'phone', href: PHONE_HREF, value: PHONE },
    { id: 'linkedin', href: LINKEDIN, value: LINKEDIN_HANDLE, external: true },
    { id: 'github', href: GITHUB, value: GITHUB_HANDLE, external: true },
  ];

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <form className="contact-form" onSubmit={send} data-rv>
        <h2 className="h2" id="contact-title">
          <span className="soft">{t('contact.soft')}</span>
          {t('contact.title')}
        </h2>
        <div className="field">
          <label htmlFor="msg" className="sr-only">
            {t('contact.messageLabel')}
          </label>
          <input
            id="msg"
            type="text"
            dir="auto"
            placeholder={t('contact.placeholder')}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            aria-describedby="msg-note"
            autoComplete="off"
          />
          <button type="submit" aria-label={t('contact.send')}>
            <svg className="flip-rtl" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M3 10h13M11 4.5 16.5 10 11 15.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
            </svg>
          </button>
        </div>
        <p className="note small muted" id="msg-note">
          {t('contact.note', { email: EMAIL })}
        </p>
      </form>

      <ul className="channels" data-rv style={{ '--i': 1 }}>
        {channels.map((c) => (
          <li key={c.id}>
            <p className="lbl">{t(`contact.channels.${c.id}`)}</p>
            <a
              href={c.href}
              dir="ltr"
              {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {c.value}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Contact;
