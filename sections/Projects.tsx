import { FolioSection } from '@/components/ui/FolioSection';
import { PortfolioLink } from '@/components/ui/PortfolioLink';
import { projectsData, resumeData } from '@/lib/data';

export function ProjectsSection() {
  return (
    <FolioSection id="projects" number="01" label="The work" title="Selected work" inverted>
      <ol className="work-list">
        {projectsData.featured.map((project, index) => (
          <li key={project.id} className="work-row">
            <div className="work-echo" aria-hidden="true">
              <span>{project.title} · {project.title} · {project.title}</span>
            </div>
            <span className="work-number" aria-hidden="true">0{index + 1}</span>
            <div className="work-heading">
              <p className="folio-label">{project.period}</p>
              <h3>{project.title}</h3>
              <p>{project.subtitle}</p>
            </div>
            <div className="work-body">
              <p className="work-summary">{project.summary}</p>
              <ul className="folio-bullets">
                {project.keyFeatures.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <p className="stack-line"><span className="folio-label">Stack</span> {project.techStack.join(' · ')}</p>
              {project.github && (
                <PortfolioLink
                  href={project.github}
                  className="folio-link"
                  event={{ type: 'project', label: project.id }}
                  aria-label={`View ${project.title} repository`}
                >
                  View repository <span aria-hidden="true">↗</span>
                </PortfolioLink>
              )}
            </div>
          </li>
        ))}
      </ol>

      <div className="github-index">
        <h3>More from GitHub</h3>
        <div>
          <ul>
            {projectsData.github.map((project) => (
              <li key={project.id}>
                <PortfolioLink href={project.github} className="folio-link" event={{ type: 'project', label: project.id }}>
                  {project.title} <span aria-hidden="true">↗</span>
                </PortfolioLink>
                <p>{project.summary}</p>
              </li>
            ))}
          </ul>
          <PortfolioLink
            className="folio-link"
            href={`${resumeData.personal.github}?tab=repositories`}
            event={{ type: 'project', label: 'github-catalog' }}
          >
            All repositories <span aria-hidden="true">↗</span>
          </PortfolioLink>
        </div>
      </div>
    </FolioSection>
  );
}
