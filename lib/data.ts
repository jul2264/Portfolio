import resumeDataRaw from '@/data/resume.json';
import projectsDataRaw from '@/data/projects.json';
import skillsDataRaw from '@/data/skills.json';
import type { ResumeData, ProjectsData, SkillCategory } from './types';

export const resumeData: ResumeData = resumeDataRaw;
export const projectsData: ProjectsData = projectsDataRaw;
export const skillsData: SkillCategory[] = skillsDataRaw;
