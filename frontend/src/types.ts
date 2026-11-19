export interface Contact {
  email: string;
  github: string;
  linkedin: string;
}
export interface SkillGroup {
  category: string;
  items: string[];
}
export interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}
export interface Project {
  name: string;
  description: string;
  tech: string[];
  url: string;
}
export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  bio: string;
  contact: Contact;
  skills: SkillGroup[];
  experience: Experience[];
  projects: Project[];
}
