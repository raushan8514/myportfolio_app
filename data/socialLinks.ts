import type { SocialLink } from "@/data/types";
import { profile } from "@/data/profile";

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: profile.github, icon: "github" },
  { label: "LinkedIn", href: profile.linkedin, icon: "linkedin" },
  { label: "X / Twitter", href: profile.x, icon: "x" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "email" },
  { label: "Download CV", href: profile.resumePath, icon: "cv" },
];
