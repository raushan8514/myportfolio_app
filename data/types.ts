export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "x" | "email" | "cv";
};

export type Project = {
  id: string;
  title: string;
  name?: string;
  slug: string;
  image: string;
  shortDescription: string;
  description: string;
  category: "Web" | "Full Stack" | "AI" | "Java" | "Academic" | "Personal";
  technologies: string[];
  features: string[];
  githubUrl?: string;
  demoUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  featured?: boolean;
};

export type Skill = {
  name: string;
  category: "Languages" | "Frontend" | "Backend" | "Database" | "DevOps & Tools" | "AI / ML";
  icon: string;
  accent?: string;
  surface?: string;
};

export type EducationItem = {
  degree: string;
  program?: string;
  institution: string;
  startYear?: string;
  endYear?: string;
  period?: string;
  grade?: string;
  description?: string;
  details?: string;
};

export type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  summary: string;
  bullets: string[];
};

export type UniversityActivity = {
  id: string;
  title: string;
  type: "Workshop" | "Technical Event" | "University Event" | "Volunteering" | "Club Activity";
  date: string;
  role: string;
  description: string;
  image: string;
  link?: string;
};

export type UniversityProfile = {
  name: string;
  image: string;
  degree: string;
  duration: string;
  description: string;
  activities: UniversityActivity[];
};

export type CodingProfile = {
  platform: string;
  username?: string;
  url: string;
  stats?: string;
  logo: string;
  profileUrl?: string;
};

export type ThoughtPost = {
  id: string;
  title: string;
  slug: string;
  date: string;
  image: string;
  coverImage?: string;
  excerpt: string;
  content: string[];
  tags: string[];
};

export type Certificate = {
  id: string;
  title: string;
  name?: string;
  image: string;
  issuer?: string;
  platform: string;
  duration: string;
  issueDate?: string;
  issuedOn?: string;
  credentialId: string;
  certificateUrl: string;
  verificationUrl: string;
  category: string;
  year?: string;
  featured?: boolean;
};

export type Profile = {
  name: string;
  title: string;
  intro: string;
  aboutParagraph: string;
  profileImage: string;
  shortIntro?: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  x: string;
  resumePath: string;
  cvName: string;
  university: string;
  degree: string;
  graduationYear: string;
};
