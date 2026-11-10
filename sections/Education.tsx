import { FolioSection } from '@/components/ui/FolioSection';
import { resumeData } from '@/lib/data';

export function EducationSection() {
  return (
    <FolioSection id="education" number="04" label="The foundations" title="Education">
      <ul className="record-list">
        {resumeData.education.map((entry) => (
          <li key={entry.institution} className="record-row">
            <div className="record-meta">
              <p className="folio-label">{entry.period}</p>
              <p>{entry.location}</p>
            </div>
            <div>
              <h3>{entry.institution}</h3>
              <p className="record-byline">{entry.degree}{entry.syllabus && ` · ${entry.syllabus}`}</p>
              <p>{entry.grade}</p>
            </div>
          </li>
        ))}
      </ul>
    </FolioSection>
  );
}
