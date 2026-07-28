import resumeDataRaw from '@/data/resume.json';
import projectsDataRaw from '@/data/projects.json';
import skillsDataRaw from '@/data/skills.json';
import { ResumeData, ProjectItem, SkillsData } from './types';

export const resumeData = resumeDataRaw as ResumeData;
export const projectsData = projectsDataRaw as ProjectItem[];
export const skillsData = skillsDataRaw as SkillsData;
