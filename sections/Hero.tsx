import Image from 'next/image';
import { FolioTicker } from '@/components/ui/FolioTicker';
import { PortfolioLink } from '@/components/ui/PortfolioLink';
import { resumeData } from '@/lib/data';

const contents = [
  ['projects', 'Selected work'],
  ['experience', 'Experience'],
  ['skills', 'Technical skills'],
  ['education', 'Education'],
  ['leadership', 'Leadership & achievements'],
  ['contact', 'Contact'],
];

export function HeroSection() {
  return (
    <section id="about" className="folio-hero" aria-labelledby="folio-title">
      <div className="folio-frame">
        <h1 id="folio-title" className="masthead">
          <span>Julian Steve</span>{' '}<span>Anban</span>
        </h1>

        <div className="hero-grid">
          <div className="hero-intro">
            <p className="hero-deck">Software engineering, security & applied research.</p>
            <p className="hero-bio">
              I’m a computer science undergraduate at SRM University. I build full-stack software,
              have worked in security assessment, and research early warning signals for credit default.
            </p>
            <div className="resume-actions">
              <a className="folio-link" href="/resume">Read online résumé <span aria-hidden="true">↗</span></a>
              <PortfolioLink className="folio-link" href={resumeData.personal.resumeUrl} download event={{ type: 'resume' }}>
                Download PDF <span aria-hidden="true">↓</span>
              </PortfolioLink>
            </div>
            <FolioTicker />
          </div>

          <figure className="portrait">
            <div className="portrait-image">
              <Image
                src="/julian_photo.jpg"
                alt="Julian Steve Anban"
                fill
                sizes="(max-width: 600px) 75vw, (max-width: 1530px) 33vw, 490px"
                preload
              />
            </div>
          </figure>

          <nav className="contents" aria-label="Portfolio contents">
            <p className="folio-label contents-label">In this portfolio</p>
            <ol>
              {contents.map(([id, label], index) => (
                <li key={id}>
                  <a href={`#${id}`}>
                    <span className="folio-label" aria-hidden="true">0{index + 1}</span>
                    {label}
                    <span aria-hidden="true">↘</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
