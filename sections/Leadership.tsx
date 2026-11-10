import { FolioSection } from '@/components/ui/FolioSection';
import { resumeData } from '@/lib/data';

export function LeadershipSection() {
  return (
    <FolioSection id="leadership" number="05" label="Campus & community" title="Leadership & achievements">
      <ul className="record-list">
        {resumeData.leadership.map((entry) => (
          <li key={entry.organization} className="record-row">
            <div className="record-meta">
              <p className="folio-label">{entry.period}</p>
              <p>{entry.location}</p>
            </div>
            <div>
              <h3>{entry.role}</h3>
              <p className="record-byline">{entry.organization}</p>
              <ul className="folio-bullets">
                {entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ul>
      <div className="honors" id="achievements">
        <h3>Achievements</h3>
        <ul className="folio-bullets">
          {resumeData.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}
        </ul>
      </div>
    </FolioSection>
  );
}
