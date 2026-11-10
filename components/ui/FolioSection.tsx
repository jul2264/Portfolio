import type { ReactNode } from 'react';

interface FolioSectionProps {
  id: string;
  number: string;
  label: string;
  title: string;
  inverted?: boolean;
  children: ReactNode;
}

export function FolioSection({ id, number, label, title, inverted, children }: FolioSectionProps) {
  return (
    <section id={id} className={inverted ? 'folio-section folio-inverted' : 'folio-section'} aria-labelledby={`${id}-title`}>
      <div className="folio-frame">
        <header className="chapter-head">
          <p className="folio-label"><span>{number}</span> / {label}</p>
          <h2 className="chapter-title" id={`${id}-title`}>{title}</h2>
        </header>
        {children}
      </div>
    </section>
  );
}
