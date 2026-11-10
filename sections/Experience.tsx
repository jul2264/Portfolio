import { FolioSection } from '@/components/ui/FolioSection';
import { resumeData } from '@/lib/data';

export function ExperienceSection() {
  return (
    <FolioSection id="experience" number="02" label="The record" title="Experience">
      <ul className="record-list">
        {resumeData.experience.map((entry) => (
          <li key={entry.company} className="record-row">
            <div className="record-meta">
              <p className="folio-label">{entry.period}</p>
              <p>{entry.location}</p>
            </div>
            <div>
              <h3>{entry.role}</h3>
              <p className="record-byline">{entry.company}</p>
              <ul className="folio-bullets">
                {entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </FolioSection>
  );
}
