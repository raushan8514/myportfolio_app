import type { Skill } from "@/data/types";

export const skillCategories = [
  { title: "Languages", key: "Languages" },
  { title: "Frontend", key: "Frontend" },
  { title: "Backend", key: "Backend" },
  { title: "Database", key: "Database" },
  { title: "DevOps & Tools", key: "DevOps & Tools" },
  { title: "AI / ML", key: "AI / ML" },
] as const;

export const skills: Skill[] = [
  { name: "Java", category: "Languages", icon: "java", accent: "#ED8B00", surface: "bg-[#fff7ed] dark:bg-[#2a1d0d]" },
  { name: "Python", category: "Languages", icon: "python", accent: "#3776AB", surface: "bg-[#eff6ff] dark:bg-[#0f172a]" },
  { name: "C", category: "Languages", icon: "c", accent: "#A8B9CC", surface: "bg-[#f8fafc] dark:bg-[#0f172a]" },
  { name: "C++", category: "Languages", icon: "cplusplus", accent: "#00599C", surface: "bg-[#eff6ff] dark:bg-[#0f172a]" },
  { name: "JavaScript", category: "Languages", icon: "javascript", accent: "#F7DF1E", surface: "bg-[#fefce8] dark:bg-[#2a2604]" },
  { name: "TypeScript", category: "Languages", icon: "typescript", accent: "#3178C6", surface: "bg-[#eff6ff] dark:bg-[#111827]" },
  { name: "React", category: "Frontend", icon: "react", accent: "#61DAFB", surface: "bg-[#f0f9ff] dark:bg-[#0f172a]" },
  { name: "Next.js", category: "Frontend", icon: "nextdotjs", accent: "#111111", surface: "bg-[#f8fafc] dark:bg-[#020617]" },
  { name: "Node.js", category: "Backend", icon: "nodejs", accent: "#5FA04E", surface: "bg-[#f0fdf4] dark:bg-[#052e16]" },
  { name: "HTML", category: "Frontend", icon: "html5", accent: "#E34F26", surface: "bg-[#fff7ed] dark:bg-[#2b140d]" },
  { name: "CSS", category: "Frontend", icon: "css3", accent: "#1572B6", surface: "bg-[#eff6ff] dark:bg-[#0f172a]" },
  { name: "Tailwind CSS", category: "Frontend", icon: "tailwindcss", accent: "#06B6D4", surface: "bg-[#ecfeff] dark:bg-[#082f49]" },
  { name: "SQL", category: "Database", icon: "sql", accent: "#336791", surface: "bg-[#eff6ff] dark:bg-[#0f172a]" },
  { name: "PostgreSQL", category: "Database", icon: "postgresql", accent: "#4169E1", surface: "bg-[#eff6ff] dark:bg-[#0f172a]" },
  { name: "MongoDB", category: "Database", icon: "mongodb", accent: "#47A248", surface: "bg-[#f0fdf4] dark:bg-[#052e16]" },
  { name: "Git", category: "DevOps & Tools", icon: "git", accent: "#F05032", surface: "bg-[#fff7ed] dark:bg-[#2a1d0d]" },
  { name: "GitHub", category: "DevOps & Tools", icon: "github", accent: "#FFFFFF", surface: "bg-[#111827] dark:bg-[#0b1120]" },
  { name: "Docker", category: "DevOps & Tools", icon: "docker", accent: "#2496ED", surface: "bg-[#eff6ff] dark:bg-[#0f172a]" },
  { name: "Prisma", category: "Backend", icon: "prisma", accent: "#2D3748", surface: "bg-[#f8fafc] dark:bg-[#111827]" },

  { name: "Generative AI", category: "AI / ML", icon: "openai", accent: "#10A37F", surface: "bg-[#f0fdf4] dark:bg-[#052e16]" },
  { name: "OpenAI", category: "AI / ML", icon: "openai", accent: "#10A37F", surface: "bg-[#f0fdf4] dark:bg-[#052e16]" },
  { name: "Google Gemini", category: "AI / ML", icon: "googlegemini", accent: "#4285F4", surface: "bg-[#eff6ff] dark:bg-[#0f172a]" },
  { name: "Machine Learning", category: "AI / ML", icon: "scikitlearn", accent: "#F7931E", surface: "bg-[#fff7ed] dark:bg-[#2a1d0d]" },
  { name: "Computer Vision", category: "AI / ML", icon: "opencv", accent: "#5C3EE8", surface: "bg-[#f5f3ff] dark:bg-[#1e1b4b]" },
  { name: "Natural Language Processing", category: "AI / ML", icon: "nlp", accent: "#6366F1", surface: "bg-[#eef2ff] dark:bg-[#1e1b4b]" },
];
