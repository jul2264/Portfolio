import { resumeData } from '@/lib/data';

export function Footer() {
  return (
    <footer className="folio-footer">
      <div className="folio-frame folio-footer-inner">
        <p>© {new Date().getFullYear()} {resumeData.personal.name}</p>
        <a className="folio-link" href="#hero">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}
