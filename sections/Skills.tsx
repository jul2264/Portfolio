import { FolioSection } from '@/components/ui/FolioSection';
import { skillsData } from '@/lib/data';

export function SkillsSection() {
  return (
    <FolioSection id="skills" number="03" label="The toolkit" title="Technical skills">
      <dl className="skill-index">
        {skillsData.map(({ category, skills }) => (
          <div key={category}>
            <dt className="folio-label">{category}</dt>
            <dd>{skills.join(' · ')}</dd>
          </div>
        ))}
      </dl>
    </FolioSection>
  );
}
