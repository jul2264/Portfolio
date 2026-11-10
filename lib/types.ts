export interface PersonalData {
  name: string;
  title: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
  specializations: string[];
  resumeUrl: string;
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
  achievements: string[];
}

interface ProjectSummary {
  id: string;
  title: string;
  summary: string;
}

interface FeaturedProject extends ProjectSummary {
  subtitle: string;
  period: string;
  techStack: string[];
  keyFeatures: string[];
  github?: string;
}

interface GitHubProject extends ProjectSummary {
  github: string;
}

export interface ProjectsData {
  featured: FeaturedProject[];
  github: GitHubProject[];
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
