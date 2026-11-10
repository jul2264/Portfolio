import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { adminConfig, hasSession } from '@/lib/resume-admin';
import { readResume, resumeTextLimit } from '@/lib/resume-store';
import { LoginForm, ResumeEditor } from './editor';
import { logoutAction } from './actions';

export const metadata: Metadata = {
  title: 'Résumé studio',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
  openGraph: null,
  twitter: null,
};

export const dynamic = 'force-dynamic';

export default async function StudioPage({ params }: { params: Promise<{ key: string }> }) {
  const config = adminConfig();
  if (!config || (await params).key !== config.slug) notFound();

  const signedIn = await hasSession();
  const document = signedIn ? await readResume() : null;

  return (
    <main className="folio-frame resume-page">
      <header className="chapter-head">
        <p className="folio-label">Private access</p>
        <h1 className="chapter-title">Résumé studio</h1>
      </header>
      {document ? (
        <>
          <div className="resume-actions">
            <a className="folio-link" href="/resume" target="_blank" rel="noreferrer">View online résumé ↗</a>
            <form action={logoutAction}>
              <button className="folio-link" type="submit">Sign out</button>
            </form>
          </div>
          <ResumeEditor text={document.text} revision={document.revision} limit={resumeTextLimit} />
        </>
      ) : <LoginForm />}
    </main>
  );
}
