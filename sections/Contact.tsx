'use client';

import { useState, type FormEvent } from 'react';
import { FolioSection } from '@/components/ui/FolioSection';
import { PortfolioLink } from '@/components/ui/PortfolioLink';
import { resumeData } from '@/lib/data';
import { trackContactClick } from '@/lib/gtag';

const { email, phone, linkedin, github, resumeUrl } = resumeData.personal;
const contacts = [
  { label: 'Email', value: email, href: `mailto:${email}` },
  { label: 'LinkedIn', value: 'juliansteve', href: linkedin },
  { label: 'GitHub', value: 'jul2264', href: github },
  { label: 'Phone', value: `+91 ${phone}`, href: `tel:+91${phone}` },
];

interface EmailDraft {
  mailto: string;
  gmail: string;
  text: string;
}

export function ContactSection() {
  const [draft, setDraft] = useState<EmailDraft | null>(null);
  const [status, setStatus] = useState('');

  function prepareDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name')).trim();
    const senderEmail = String(form.get('email')).trim();
    const subject = String(form.get('subject')).trim() || 'Portfolio inquiry';
    const message = String(form.get('message')).trim();

    if (!name || !senderEmail || !message) {
      setDraft(null);
      setStatus('Enter your name, email address, and a message to prepare a draft.');
      return;
    }

    const body = `Hi Julian,\r\n\r\n${message.replace(/\r?\n/g, '\r\n')}\r\n\r\nName: ${name}\r\nEmail: ${senderEmail}`;
    setDraft({
      mailto: `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      text: `To: ${email}\nSubject: ${subject}\n\n${body}`,
    });
    setStatus('Draft ready. Open it in your email app, open Gmail, or copy the text.');
  }

  async function copy(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setStatus(`${label} copied.`);
      trackContactClick(`Copy ${label}`);
    } catch {
      setStatus(`Could not copy the ${label.toLowerCase()}. Use the email link instead.`);
    }
  }

  return (
    <FolioSection id="contact" number="06" label="Correspondence" title="Get in touch" inverted>
      <div className="contact-grid">
        <div>
          <p className="contact-deck">Have a project, a role, or a research question in mind?</p>
          <dl className="contact-index">
            {contacts.map(({ label, value, href }) => (
              <div key={label}>
                <dt className="folio-label">{label}</dt>
                <dd><PortfolioLink href={href} className="folio-link" event={{ type: 'contact', label }}>{value}</PortfolioLink></dd>
              </div>
            ))}
          </dl>
          <div className="contact-actions">
            <button className="folio-link" type="button" onClick={() => void copy(email, 'Email address')}>Copy email</button>
            <PortfolioLink className="folio-link" href={resumeUrl} download event={{ type: 'resume' }}>
              Download résumé <span aria-hidden="true">↓</span>
            </PortfolioLink>
          </div>
        </div>

        <form className="contact-form" onSubmit={prepareDraft} onChange={() => { setDraft(null); setStatus(''); }}>
          <h3>Write an email</h3>
          <div className="form-pair">
            <label>Name<input name="name" autoComplete="name" required /></label>
            <label>Email<input name="email" type="email" autoComplete="email" required /></label>
          </div>
          <label>Subject <span>(optional)</span><input name="subject" /></label>
          <label>Message<textarea name="message" rows={5} required /></label>
          <button className="outline-action" type="submit">Prepare draft <span aria-hidden="true">↘</span></button>
          <p className="form-status" role="status">{status}</p>
          {draft && (
            <div className="contact-actions">
              <PortfolioLink className="folio-link" href={draft.mailto} event={{ type: 'contact', label: 'Form Submit Mailto' }}>Open email app</PortfolioLink>
              <PortfolioLink className="folio-link" href={draft.gmail} target="_blank" rel="noopener noreferrer" event={{ type: 'contact', label: 'Open Gmail' }}>Open Gmail ↗</PortfolioLink>
              <button className="folio-link" type="button" onClick={() => void copy(draft.text, 'Draft')}>Copy draft</button>
            </div>
          )}
        </form>
      </div>
    </FolioSection>
  );
}
