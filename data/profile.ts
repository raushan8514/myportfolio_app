import type { Profile, SocialLink } from "@/data/types";

export const profile: Profile = {
  name: "Raushan Kumar Sahni",
  title: "Computer Science Student | Full-Stack Developer | AI Enthusiast",
  intro:
    "I am a computer science student building practical full-stack products and exploring AI-driven experiences.",
  aboutParagraph:
    "I am a Computer Science student focused on full-stack development, problem solving, and building software that is useful, clean, and approachable.",
  // profileImage: "/profile/profile.jpg",
  profileImage: "/profile/raushan.jpeg",
  location: "Punjab, India",
  email: "raushansahni8514@gmail.com",
  github: "https://github.com/raushan8514",
  linkedin: "https://www.linkedin.com/in/raushansahni/",
  x: "https://x.com/Raushan1637436",
  // resumePath: "/resume/Raushan-Kumar-Sahni-CV.pdf",
  resumePath: "https://drive.google.com/file/d/1xP5ETWTfYglKRgI_Noe-ddyAvStCH4Hw/view",
  cvName: "Raushan-Kumar-Sahni-CV.pdf",
  university: "Lovely Professional University (LPU), Punjab, India",
  degree: "B.Tech Computer Science & Engineering",
  graduationYear: "2028",
};

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certificates", href: "#certificates" },
  { label: "Education", href: "#education" },
  { label: "Coding Profiles", href: "#coding-profiles" },
  { label: "Thoughts", href: "#thoughts" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: profile.github, icon: "github" },
  { label: "LinkedIn", href: profile.linkedin, icon: "linkedin" },
  { label: "X / Twitter", href: profile.x, icon: "x" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "email" },
  { label: "Download CV", href: profile.resumePath, icon: "cv" },
];

export const heroStats = [
  { label: "Projects", value: "4+" },
  { label: "Certifications", value: "Growing" },
  { label: "Technologies", value: "20+" },
  { label: "Coding Platforms", value: "6" },
];
