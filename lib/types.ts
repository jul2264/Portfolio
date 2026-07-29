export interface PersonalData {
  name: string;
  title: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
  specializations: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  syllabus?: string;
  grade: string;
  period: string;
  location: string;
  year: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
  tools: string[];
}

export interface LeadershipItem {
  role: string;
  organization: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface ResumeData {
  personal: PersonalData;
  education: EducationItem[];
  experience: ExperienceItem[];
  leadership: LeadershipItem[];
}

export interface ProjectItem {
  id?: string;
  title: string;
  subtitle?: string;
  category?: string;
  shortDescription?: string;
  fullDescription?: string;
  summary?: string;
  techStack: string[];
  highlights?: string[];
  keyFeatures?: string[];
  architectureSummary?: string;
  metrics?: string;
  githubUrl?: string;
  github?: string;
  liveUrl?: string;
  demo?: string;
  featured?: boolean;
  accent?: 'blue' | 'green' | 'none';
  period?: string;
}

export interface SkillItem {
  name: string;
  category: string;
  icon: string;
  proficiency?: number;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface SkillsData {
  languages?: SkillItem[];
  frameworks?: SkillItem[];
  developerTools?: SkillItem[];
  securityTools?: SkillItem[];
  technicalSkills?: SkillCategory[];
  cybersecurityTools?: SkillCategory[];
}
