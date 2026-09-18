"use client";

import * as SimpleIcons from "@icons-pack/react-simple-icons";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  AtSign,
  BookOpenText,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileText,
  GitBranch,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  MessageSquareText,
  Moon,
  Search,
  Send,
  Sparkles,
  SunMedium,
  X,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { type ComponentType, useEffect, useMemo, useState } from "react";
import { certificates } from "@/data/certificates";
import { codingProfiles } from "@/data/codingProfiles";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { heroStats, navItems, profile, socialLinks } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories, skills } from "@/data/skills";
import { thoughtPosts } from "@/data/thoughts";
import { universityProfile } from "@/data/university";
import type { Certificate, SocialLink, UniversityActivity } from "@/data/types";

const iconMap: Record<SocialLink["icon"], LucideIcon> = {
  github: GitBranch,
  linkedin: BriefcaseBusiness,
  x: AtSign,
  email: Mail,
  cv: FileText,
};

type SkillIconProps = {
  size?: number;
  color?: string;
  className?: string;
  title?: string;
};

type SkillIconComponent = ComponentType<SkillIconProps>;

const skillIconMap: Record<string, SkillIconComponent> = {
  java: SimpleIcons.SiOpenjdk,
  python: SimpleIcons.SiPython,
  c: SimpleIcons.SiC,
  cplusplus: SimpleIcons.SiCplusplus,
  javascript: SimpleIcons.SiJavascript,
  typescript: SimpleIcons.SiTypescript,
  react: SimpleIcons.SiReact,
  nextdotjs: SimpleIcons.SiNextdotjs,
  nodejs: SimpleIcons.SiNodedotjs,
  html5: SimpleIcons.SiHtml5,
  css3: SimpleIcons.SiCss,
  tailwindcss: SimpleIcons.SiTailwindcss,
  sql: Database,
  postgresql: SimpleIcons.SiPostgresql,
  mongodb: SimpleIcons.SiMongodb,
  git: SimpleIcons.SiGit,
  github: SimpleIcons.SiGithub,
  docker: SimpleIcons.SiDocker,
  prisma: SimpleIcons.SiPrisma,
};

const codingProfileIconMap: Record<string, SkillIconComponent> = {
  github: SimpleIcons.SiGithub,
  leetcode: SimpleIcons.SiLeetcode,
  hackerrank: SimpleIcons.SiHackerrank,
  geeksforgeeks: SimpleIcons.SiGeeksforgeeks,
  codechef: SimpleIcons.SiCodechef,
  codeforces: SimpleIcons.SiCodeforces,
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function UniversityActivityCard({ activity }: { activity: UniversityActivity }) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.article
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] shadow-sm"
    >
      <div className="relative h-40 overflow-hidden">
        {!imageError && activity.image ? (
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[var(--soft)] px-4 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Image coming soon
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full border border-[var(--border)] bg-[var(--soft)] px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            {activity.type}
          </span>
          {activity.date ? <span className="text-xs text-[var(--muted)]">{activity.date}</span> : null}
        </div>
        <h3 className="text-lg font-bold text-[var(--foreground)]">{activity.title}</h3>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">{activity.role}</p>
        <p className="text-sm leading-6 text-[var(--muted)]">{activity.description}</p>
        {activity.link && activity.link !== "#" ? (
          <a href={activity.link} target="_blank" rel="noreferrer" className="inline-flex items-center text-xs font-medium text-[var(--primary)]">
            View details
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}

export default function HomePage() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const storedTheme = window.localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return storedTheme ? storedTheme === "dark" : systemDark;
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    {
      role: "bot",
      text: "Hi! Ask me about Raushan's background, skills, projects, education, certifications, or how to contact him.",
    },
  ]);
  const [certificateSearch, setCertificateSearch] = useState("");
  const [certificatePlatform, setCertificatePlatform] = useState("All");
  const [certificateCategory, setCertificateCategory] = useState("All");
  const [certificateSort, setCertificateSort] = useState("newest");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState<{ type: "idle" | "error" | "success"; message: string }>({
    type: "idle",
    message: "",
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  const certificatePlatforms = ["All", ...new Set(certificates.map((certificate) => certificate.platform))];
  const certificateCategories = ["All", ...new Set(certificates.map((certificate) => certificate.category))];

  const getCertificateTitle = (certificate: Certificate) => certificate.title ?? certificate.name ?? "Untitled certificate";
  const getCertificateDate = (certificate: Certificate) => certificate.issuedOn ?? certificate.issueDate ?? "TBD";

  const filteredCertificates = useMemo(() => {
    const searchQuery = certificateSearch.toLowerCase();
    const result = certificates.filter((certificate) => {
      const certificateTitle = getCertificateTitle(certificate).toLowerCase();
      const matchesSearch =
        certificateTitle.includes(searchQuery) ||
        certificate.platform.toLowerCase().includes(searchQuery) ||
        certificate.category.toLowerCase().includes(searchQuery);
      const matchesPlatform = certificatePlatform === "All" || certificate.platform === certificatePlatform;
      const matchesCategory = certificateCategory === "All" || certificate.category === certificateCategory;
      return matchesSearch && matchesPlatform && matchesCategory;
    });

    return [...result].sort((a, b) => {
      const aDate = getCertificateDate(a);
      const bDate = getCertificateDate(b);
      const aTitle = getCertificateTitle(a);
      const bTitle = getCertificateTitle(b);

      if (certificateSort === "newest") return bDate.localeCompare(aDate);
      if (certificateSort === "oldest") return aDate.localeCompare(bDate);
      return aTitle.localeCompare(bTitle);
    });
  }, [certificateCategory, certificatePlatform, certificateSearch, certificateSort]);

  const handleThemeToggle = () => setDarkMode((prev) => !prev);

  const handleFormChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus({
        type: "error",
        message: "Please fill in your name, email, and message before sending.",
      });
      return;
    }

    setFormStatus({
      type: "success",
      message: "Thanks for reaching out. This form is ready for your email backend integration.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const askPortfolioAI = (question: string) => {
    const text = question.toLowerCase();

    if (text.includes("who") || text.includes("raushan")) {
      return `${profile.name} is a ${profile.title.toLowerCase()} with a strong interest in building modern web experiences and intelligent applications.`;
    }

    if (text.includes("technology") || text.includes("skills") || text.includes("know")) {
      return `Raushan works with ${skills.slice(0, 10).map((skill) => skill.name).join(", ")}, and has a broader web and AI-focused technology stack.`;
    }

    if (text.includes("project") || text.includes("built") || text.includes("lifeos")) {
      return "Featured projects include LifeOS, Maze Solver, the Language Learning Subscription Platform, Hostel Allocation & Roommate Matching, and a personal portfolio site.";
    }

    if (text.includes("lifeos")) {
      return "LifeOS is a productivity and personal planning platform designed to help users organize tasks, routines, and daily planning in one place.";
    }

    if (text.includes("certif") || text.includes("certificate")) {
      return `Current portfolio certificate data includes ${certificates
        .slice(0, 3)
        .map((item) => item.platform)
        .join(", ")}. These entries are intentionally stored in a data file so they can be updated easily.`;
    }

    if (text.includes("contact") || text.includes("email") || text.includes("reach")) {
      return `You can contact Raushan at ${profile.email}, or connect through the GitHub, LinkedIn, or X/Twitter links throughout the portfolio.`;
    }

    if (text.includes("study") || text.includes("education") || text.includes("lpu")) {
      return "Raushan is pursuing a B.Tech in Computer Science & Engineering at Lovely Professional University and is focused on software engineering, web development, and emerging technologies.";
    }

    return "I can answer questions about Raushan's skills, projects, education, certifications, contact details, and portfolio sections.";
  };

  const handleSendMessage = () => {
    const trimmed = chatInput.trim();
    if (!trimmed) return;

    setChatMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setChatInput("");

    setTimeout(() => {
      setChatMessages((prev) => [...prev, { role: "bot", text: askPortfolioAI(trimmed) }]);
    }, 250);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[rgba(245,247,251,0.78)] backdrop-blur-xl dark:bg-[rgba(2,8,23,0.76)]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3" aria-label="Raushan home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)] text-sm font-bold text-white shadow-lg shadow-[var(--primary-soft)]">
              RK
            </span>
            <div>
              <div className="text-base font-semibold tracking-tight">Raushan</div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">Developer</div>
            </div>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleThemeToggle}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] shadow-sm transition hover:border-[var(--primary)]"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <SunMedium size={18} /> : <Moon size={18} />}
            </button>
            <a
              href={profile.resumePath}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[var(--primary-soft)] transition hover:-translate-y-0.5 sm:inline-flex"
            >
              <Download size={16} />
              Resume
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] lg:hidden"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-[var(--border)] bg-[var(--background)] lg:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted)] hover:bg-[var(--soft)] hover:text-[var(--foreground)]"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href={profile.resumePath}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white"
                >
                  <Download size={16} />
                  Download CV
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section id="home" className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pb-28 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.5 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
              <Sparkles size={14} />
              Available for internships & opportunities
            </div>
            <h1 className="max-w-2xl text-4xl font-black tracking-[-0.06em] text-[var(--foreground)] sm:text-5xl lg:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg font-medium text-[var(--primary)] sm:text-xl">{profile.title}</p>
            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg">{profile.intro}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--primary-soft)] transition hover:-translate-y-0.5"
              >
                View My Work
                <ArrowRight size={18} />
              </a>
              <a
                href={profile.resumePath}
                target="_blank"
                rel="noreferrer"
                download={profile.cvName}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)]"
              >
                <Download size={18} />
                Download CV
              </a>
            </div>

            <div className="mt-8 flex items-center gap-3">
              {socialLinks.slice(0, 4).map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={link.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] transition hover:-translate-y-1 hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
                  <div className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</div>
                  <div className="mt-1 text-sm text-[var(--muted)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="absolute inset-6 rounded-full bg-[var(--primary-soft)] blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-4 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/60 to-transparent" />
              <div className="overflow-hidden rounded-[1.6rem] border border-[var(--border)] bg-[var(--soft)] p-3">
                <div className="relative mx-auto aspect-square w-full max-w-[480px] overflow-hidden rounded-full border-[6px] border-white/70 bg-[var(--soft)] shadow-inner shadow-slate-200/60 dark:shadow-slate-900/50">
                  <Image
                    // src="/profile/profile-avatar.svg"
                    src={profile.profileImage}
                    alt="Portrait of Raushan Kumar Sahni"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-2 left-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-lg">
              <div className="flex items-center gap-2 text-sm font-medium text-[var(--muted)]">
                <MapPin size={16} className="text-[var(--primary)]" />
                {profile.location}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.45 }}>
            <div className="section-kicker">About</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Building thoughtful software for real people.</h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-[var(--muted)]">
              <p>
                I am a computer science student with a strong interest in modern web development, full-stack engineering, and AI-powered product experiences.
              </p>
              <p>
                My focus is on writing clean, scalable code while building interfaces and systems that are useful, intuitive, and performance-conscious.
              </p>
              <p>
                I am especially interested in solving practical problems through product thinking, experimentation, and strong engineering fundamentals.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Computer Science",
                "Full Stack Development",
                "AI / ML",
                "Problem Solving",
              ].map((item) => (
                <span key={item} className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-sm font-medium text-[var(--foreground)]">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--soft)] p-5">
              <div className="mb-4 flex items-center gap-2 text-[var(--primary)]">
                <BrainCircuit size={18} />
                <span className="text-sm font-semibold uppercase tracking-[0.18em]">Developer story</span>
              </div>
              <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">
                <p>
                  My journey into software started with curiosity — understanding how systems work, how interfaces behave, and how technology can simplify everyday tasks.
                </p>
                <p>
                  Over time, that curiosity grew into a serious interest in product development, problem solving, and building experiences that combine usability with technical quality.
                </p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-[var(--border)] bg-white/40 p-3 dark:bg-slate-900/30">
                  <div className="mb-2 flex items-center gap-2 text-[var(--primary)]"><Code2 size={16} /> <span className="font-medium">Core</span></div>
                  <p className="text-sm text-[var(--muted)]">Frontend, backend, APIs, and product logic.</p>
                </div>
                <div className="rounded-xl border border-[var(--border)] bg-white/40 p-3 dark:bg-slate-900/30">
                  <div className="mb-2 flex items-center gap-2 text-[var(--primary)]"><BriefcaseBusiness size={16} /> <span className="font-medium">Direction</span></div>
                  <p className="text-sm text-[var(--muted)]">Building software that solves real problems for people.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="section-kicker">Skills</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Technology stack</h2>
          </div>
        </div>

        <div className="space-y-8">
          {skillCategories.map((category) => {
            const categorySkills = skills.filter((skill) => skill.category === category.key);
            return (
              <div key={category.key}>
                <h3 className="mb-4 text-lg font-semibold text-[var(--foreground)]">{category.title}</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                  {categorySkills.map((skill) => {
                    const Icon = skillIconMap[skill.icon] ?? Database;

                    return (
                      <div
                        key={skill.name}
                        title={skill.name}
                        className="group flex min-h-[140px] flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-[var(--primary)]"
                      >
                        <div
                          className={`flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--border)] ${skill.surface ?? "bg-[var(--soft)]"} p-3`}
                        >
                          <Icon
                            size={34}
                            color={skill.accent ?? "currentColor"}
                            className="transition-transform duration-200 group-hover:scale-105"
                            title={skill.name}
                          />
                        </div>
                        <span className="text-xs font-medium tracking-[0.08em] text-[var(--muted)] uppercase">{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="section-kicker">Projects</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Selected work</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "All",
              ...new Set(projects.map((project) => project.category)),
            ].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  activeCategory === category
                    ? "bg-[var(--primary)] text-white"
                    : "border border-[var(--border)] bg-[var(--card)] text-[var(--muted)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {filteredProjects.map((project) => {
            const projectTitle = project.title ?? project.name ?? "Untitled project";

            return (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group overflow-hidden rounded-[1.8rem] border border-[var(--border)] bg-[var(--card)] shadow-sm"
            >
              <div className="relative h-56 overflow-hidden">
                <Image src={project.image} alt={projectTitle} fill className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,7,18,0.7)] via-transparent to-transparent" />
                <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                  {project.category}
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--foreground)]">{projectTitle}</h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">{project.shortDescription}</p>
                  </div>
                  {project.featured && (
                    <span className="rounded-full bg-[var(--soft)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
                      Featured
                    </span>
                  )}
                </div>

                <p className="text-sm leading-7 text-[var(--muted)]">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span key={technology} className="rounded-full border border-[var(--border)] bg-[var(--soft)] px-2.5 py-1 text-xs font-medium text-[var(--foreground)]">
                      {technology}
                    </span>
                  ))}
                </div>

                <ul className="space-y-2 text-sm text-[var(--muted)]">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3 pt-2">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
                      <GitBranch size={16} /> GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                  {project.caseStudyUrl && (
                    <a href={project.caseStudyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
                      <BookOpenText size={16} /> Case Study
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
            );
          })}
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="section-kicker">Experience</div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Current focus and growth</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {experience.map((item) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[1.8rem] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-[var(--foreground)]">{item.title}</h3>
                  <p className="mt-1 text-sm font-medium text-[var(--primary)]">{item.company}</p>
                </div>
                <span className="rounded-full bg-[var(--soft)] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  {item.period}
                </span>
              </div>
              <p className="text-sm leading-7 text-[var(--muted)]">{item.summary}</p>
              <ul className="mt-4 space-y-3">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="certificates" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="section-kicker">Certificates</div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Learning timeline</h2>
        </div>

        <div className="mb-6 flex flex-col gap-3 rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] p-4 md:flex-row">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={16} />
            <input
              type="search"
              value={certificateSearch}
              onChange={(event) => setCertificateSearch(event.target.value)}
              placeholder="Search certificates"
              className="w-full rounded-full border border-[var(--border)] bg-[var(--soft)] py-2.5 pl-10 pr-3 text-sm text-[var(--foreground)] outline-none ring-0 transition focus:border-[var(--primary)]"
            />
          </div>
          <select value={certificatePlatform} onChange={(event) => setCertificatePlatform(event.target.value)} className="rounded-full border border-[var(--border)] bg-[var(--soft)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]">
            {certificatePlatforms.map((platform) => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
          <select value={certificateCategory} onChange={(event) => setCertificateCategory(event.target.value)} className="rounded-full border border-[var(--border)] bg-[var(--soft)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]">
            {certificateCategories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select value={certificateSort} onChange={(event) => setCertificateSort(event.target.value)} className="rounded-full border border-[var(--border)] bg-[var(--soft)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="alpha">A-Z</option>
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCertificates.map((certificate) => {
            const certificateTitle = getCertificateTitle(certificate);
            const certificateDate = getCertificateDate(certificate);

            return (
            <article key={certificate.id} className="overflow-hidden rounded-[1.6rem] border border-[var(--border)] bg-[var(--card)] shadow-sm">
              <button type="button" onClick={() => setSelectedCertificate(certificate)} className="block w-full overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image src={certificate.image} alt={certificateTitle} fill className="object-cover transition hover:scale-105" />
                </div>
              </button>
              <div className="space-y-3 p-5">
                <div>
                  <h3 className="text-xl font-bold text-[var(--foreground)]">{certificateTitle}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">Issued by: {certificate.platform}</p>
                </div>
                <div className="grid gap-2 text-sm text-[var(--muted)]">
                  <p>Duration: {certificate.duration}</p>
                  <p>Completed: {certificateDate}</p>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a href={certificate.certificateUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)]">
                    View Certificate <ExternalLink size={15} />
                  </a>
                  <a href={certificate.verificationUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--foreground)]">
                    Verify Credential <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </article>
            );
          })}
        </div>

        {filteredCertificates.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card)] p-8 text-center text-[var(--muted)]">
            No certificates match the current filter.
          </div>
        )}
      </section>

      <section id="university" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="section-kicker">University Experience</div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Lovely Professional University</h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden rounded-[1.8rem] border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
            <div className="relative h-72 overflow-hidden rounded-[1.4rem]">
              <Image src={universityProfile.image} alt={universityProfile.name} fill className="object-cover" />
            </div>
            <div className="mt-5 space-y-4">
              <h3 className="text-2xl font-bold text-[var(--foreground)]">{universityProfile.name}</h3>
              <div className="flex flex-wrap gap-2 text-sm text-[var(--muted)]">
                <span className="rounded-full bg-[var(--soft)] px-2.5 py-1">{universityProfile.degree}</span>
                <span className="rounded-full bg-[var(--soft)] px-2.5 py-1">{universityProfile.duration}</span>
              </div>
              <p className="text-sm leading-7 text-[var(--muted)]">{universityProfile.description}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {universityProfile.activities.map((activity) => (
              <UniversityActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="section-kicker">Education</div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Academic background</h2>
        </div>

        <div className="relative ml-2 space-y-8 before:absolute before:left-3 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-[var(--border)]">
          {education.map((item, index) => (
            <motion.div key={item.degree} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative pl-10">
              <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--primary)] text-[10px] font-bold text-white">
                {index + 1}
              </div>
              <div className="rounded-[1.6rem] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-2 text-[var(--primary)]">
                  <GraduationCap size={18} />
                  <p className="text-sm font-semibold uppercase tracking-[0.2em]">Education</p>
                </div>
                <h3 className="text-2xl font-bold text-[var(--foreground)]">{item.degree}</h3>
                <p className="mt-2 text-lg text-[var(--muted)]">{item.institution}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
                  <span className="rounded-full bg-[var(--soft)] px-2.5 py-1">{item.period}</span>
                  {item.grade && <span className="rounded-full bg-[var(--soft)] px-2.5 py-1">{item.grade}</span>}
                </div>
                {item.details && <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{item.details}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="coding-profiles" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="section-kicker">Coding Profiles</div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Practice and problem solving</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {codingProfiles.map((profileItem) => {
            const Icon = codingProfileIconMap[profileItem.logo] ?? SimpleIcons.SiGithub;
            const username = profileItem.username || "Username pending";

            return (
              <motion.a
                key={profileItem.platform}
                href={profileItem.url}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3 }}
                className="rounded-[1.6rem] border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--soft)] p-2">
                      <Icon size={32} color={profileItem.platform === "GitHub" ? "#fff" : "currentColor"} className="shrink-0" title={profileItem.platform} />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-[var(--foreground)]">{profileItem.platform}</p>
                      <p className="text-sm text-[var(--muted)]">{username}</p>
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-[var(--muted)]" />
                </div>
                {profileItem.stats ? <p className="mt-4 text-sm text-[var(--muted)]">{profileItem.stats}</p> : null}
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1.5 text-sm font-medium text-[var(--foreground)]">
                  Visit Profile <ArrowRight size={15} />
                </div>
              </motion.a>
            );
          })}
        </div>
      </section>

      <section id="thoughts" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="section-kicker">Thoughts</div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Notes, lessons, and reflections</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {thoughtPosts.map((post) => (
            <article key={post.id} className="overflow-hidden rounded-[1.8rem] border border-[var(--border)] bg-[var(--card)] shadow-sm">
              <div className="relative h-52 overflow-hidden">
                <Image src={post.coverImage ?? post.image} alt={post.title} fill className="object-cover" />
              </div>
              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                  <span>{post.date}</span>
                  <span>Journal</span>
                </div>
                <h3 className="text-2xl font-bold text-[var(--foreground)]">{post.title}</h3>
                <p className="text-sm leading-7 text-[var(--muted)]">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-[var(--border)] bg-[var(--soft)] px-2.5 py-1 text-[11px] font-medium text-[var(--foreground)]">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)]">
                  Read More <ArrowRight size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
            <div className="section-kicker">Contact</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Let&apos;s build something together</h2>
            <div className="mt-8 space-y-5 text-[var(--muted)]">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-sm font-medium"><Mail size={16} className="text-[var(--primary)]" /> {profile.email}</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm font-medium"><BriefcaseBusiness size={16} className="text-[var(--primary)]" /> LinkedIn</a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm font-medium"><GitBranch size={16} className="text-[var(--primary)]" /> GitHub</a>
              <a href={profile.x} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm font-medium"><AtSign size={16} className="text-[var(--primary)]" /> X / Twitter</a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-[var(--foreground)]">
                <span>Name</span>
                <input value={formData.name} onChange={(event) => handleFormChange("name", event.target.value)} className="w-full rounded-xl border border-[var(--border)] bg-[var(--soft)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)]" placeholder="Your name" />
              </label>
              <label className="space-y-2 text-sm font-medium text-[var(--foreground)]">
                <span>Email</span>
                <input type="email" value={formData.email} onChange={(event) => handleFormChange("email", event.target.value)} className="w-full rounded-xl border border-[var(--border)] bg-[var(--soft)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)]" placeholder="Your email" />
              </label>
            </div>

            <label className="mt-5 block space-y-2 text-sm font-medium text-[var(--foreground)]">
              <span>Subject</span>
              <input value={formData.subject} onChange={(event) => handleFormChange("subject", event.target.value)} className="w-full rounded-xl border border-[var(--border)] bg-[var(--soft)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)]" placeholder="Project inquiry, opportunity, etc." />
            </label>

            <label className="mt-5 block space-y-2 text-sm font-medium text-[var(--foreground)]">
              <span>Message</span>
              <textarea value={formData.message} onChange={(event) => handleFormChange("message", event.target.value)} rows={6} className="w-full rounded-xl border border-[var(--border)] bg-[var(--soft)] px-3 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--primary)]" placeholder="Tell me about your idea or opportunity." />
            </label>

            {formStatus.type !== "idle" && (
              <div className={`mt-5 rounded-xl border px-3 py-2 text-sm ${formStatus.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300" : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"}`}>
                {formStatus.message}
              </div>
            )}

            <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--primary-soft)] transition hover:-translate-y-0.5">
              Send Message <Send size={16} />
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] bg-[var(--card)]/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <div className="text-lg font-bold text-[var(--foreground)]">{profile.name}</div>
            <p className="mt-1 text-sm text-[var(--muted)]">Building elegant, modern, and practical digital experiences.</p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-[var(--muted)]">
            {navItems.slice(0, 6).map((item) => (
              <a key={item.label} href={item.href} className="transition hover:text-[var(--foreground)]">
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.slice(0, 4).map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={link.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--soft)] text-[var(--foreground)]"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>
        <div className="border-t border-[var(--border)] py-4 text-center text-xs text-[var(--muted)]">
          © 2026 {profile.name}. All rights reserved.
        </div>
      </footer>

      <div className="fixed bottom-5 right-5 z-50">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              className="mb-4 w-[340px] overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--card)] shadow-[0_25px_60px_rgba(15,23,42,0.2)]"
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--soft)] px-4 py-3">
                <div className="flex items-center gap-2 font-semibold text-[var(--foreground)]">
                  <MessageSquareText size={18} className="text-[var(--primary)]" />
                  Ask Raushan AI
                </div>
                <button type="button" onClick={() => setChatOpen(false)} className="rounded-full p-1 text-[var(--muted)] hover:bg-[var(--card)]">
                  <X size={16} />
                </button>
              </div>
              <div className="flex max-h-72 flex-col gap-3 overflow-y-auto p-4">
                {chatMessages.map((message, index) => (
                  <div key={`${message.role}-${index}`} className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 ${message.role === "user" ? "ml-auto bg-[var(--primary)] text-white" : "bg-[var(--soft)] text-[var(--foreground)]"}`}>
                    {message.text}
                  </div>
                ))}
              </div>
              <div className="border-t border-[var(--border)] p-3">
                <div className="flex gap-2">
                  <input
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Ask about skills, projects, or contact info"
                    className="w-full rounded-full border border-[var(--border)] bg-[var(--soft)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                  />
                  <button type="button" onClick={handleSendMessage} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-white">
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setChatOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-4 py-3 font-semibold text-white shadow-lg shadow-[var(--primary-soft)]"
        >
          <Sparkles size={16} />
          Ask Raushan AI
        </button>
      </div>

      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#020817]/70 p-4 backdrop-blur-sm"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] shadow-2xl"
            >
              <button type="button" onClick={() => setSelectedCertificate(null)} className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white">
                <X size={18} />
              </button>
              <div className="relative h-[340px] w-full overflow-hidden">
                <Image src={selectedCertificate.image} alt={getCertificateTitle(selectedCertificate)} fill className="object-cover" />
              </div>
              <div className="space-y-3 p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-2xl font-bold text-[var(--foreground)]">{getCertificateTitle(selectedCertificate)}</h3>
                  <span className="rounded-full border border-[var(--border)] bg-[var(--soft)] px-2.5 py-1 text-xs font-medium text-[var(--muted)]">
                    {selectedCertificate.category}
                  </span>
                </div>
                <p className="text-sm text-[var(--muted)]">Issued by: {selectedCertificate.platform}</p>
                <div className="grid gap-2 text-sm text-[var(--muted)] sm:grid-cols-2">
                  <p>Duration: {selectedCertificate.duration}</p>
                  <p>Completed: {getCertificateDate(selectedCertificate)}</p>
                  <p>Credential ID: {selectedCertificate.credentialId}</p>
                  <p>Verification: {selectedCertificate.verificationUrl !== "#" ? "Available" : "Placeholder"}</p>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a href={selectedCertificate.certificateUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white">
                    View Certificate <ExternalLink size={14} />
                  </a>
                  <a href={selectedCertificate.verificationUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)]">
                    Verify Credential
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
