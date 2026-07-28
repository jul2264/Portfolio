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
  id: string;
  title: string;
  subtitle: string;
  period: string;
  techStack: string[];
  summary: string;
  keyFeatures: string[];
  architectureSummary: string;
  github: string;
  demo: string;
  accent: 'blue' | 'green';
}

export interface SkillItem {
  name: string;
  icon: string;
  category: 'Languages' | 'Frameworks' | 'Developer Tools' | 'Security Tools';
}

export interface SkillsData {
  languages: SkillItem[];
  frameworks: SkillItem[];
  developerTools: SkillItem[];
  securityTools: SkillItem[];
}
