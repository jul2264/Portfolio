import type { Metadata } from 'next';
import Link from 'next/link';
import { PortfolioLink } from '@/components/ui/PortfolioLink';
import { resumeData } from '@/lib/data';
import { readResume } from '@/lib/resume-store';

export const metadata: Metadata = { title: 'Résumé — Julian Steve Anban' };
export const dynamic = 'force-dynamic';

export default async function ResumePage() {
  const document = await readResume().catch(() => null);

  return (
    <main className="folio-frame resume-page">
      <div className="resume-actions">
        <Link className="folio-link" href="/">← Portfolio</Link>
        <PortfolioLink className="folio-link" href={resumeData.personal.resumeUrl} download event={{ type: 'resume' }}>
          Download original PDF ↓
        </PortfolioLink>
      </div>
      <header className="chapter-head">
        <p className="folio-label">Julian Steve Anban</p>
        <h1 className="chapter-title">Résumé</h1>
      </header>
      {!document && <p>The online résumé is temporarily unavailable. The original PDF is available above.</p>}
      <article className="resume-text">
        {document?.text.split(/^##[ \t]+/m).map((section, index) => {
          if (index === 0) return section.trim() && <p key={index}>{section.trim()}</p>;
          const lineEnd = section.indexOf('\n');
          const heading = lineEnd < 0 ? section : section.slice(0, lineEnd);
          const body = lineEnd < 0 ? '' : section.slice(lineEnd + 1).trim();
          return (
            <section key={index}>
              <h2>{heading.trim()}</h2>
              {body && <p>{body}</p>}
            </section>
          );
        })}
      </article>
    </main>
  );
}
