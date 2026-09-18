# Raushan Kumar Sahni | Portfolio

This is a personal portfolio built with Next.js and Tailwind CSS.

## Where to replace your real content

### Profile image
- Put your profile image here: `/public/profile/profile.jpg`
- Keep it front-facing and high resolution.
- Do not crop out important facial details.
- The hero section uses a large circular treatment and should remain sharp on mobile.

### Project images
- Place project images in: `/public/projects/`
- Example files:
  - `lifeos.jpg`
  - `maze-solver.jpg`
  - `language-learning-platform.jpg`
  - `hostel-allocation.jpg`

### Certificate images
- Place certificate images in: `/public/certificates/`
- These are used in the searchable certificate gallery and modal.

### University images
- Place university images in: `/public/university/`
- Example: `/public/university/lpu-campus.jpg`

### Activity images
- Place activity or event visuals in: `/public/activities/`
- Example: `/public/activities/ai-workshop.jpg`

### Skill logos
- Place logo files in: `/public/skills/`
- Use consistent file names and similar visual sizes for a clean logo grid.

### Resume / CV
- Place the final PDF here: `/public/resume/Raushan-Kumar-Sahni-CV.pdf`
- If the file is not available yet, keep the path configured and replace it later without changing component logic.

## Data files to edit

- `/data/profile.ts` — full name, title, bio, contact details, CV path, school, degree, graduation year
- `/data/projects.ts` — project metadata, images, descriptions, tech stack, and links
- `/data/certificates.ts` — certificate entries, verification links, issue dates, credentials
- `/data/education.ts` — academic timeline
- `/data/codingProfiles.ts` — coding platform profiles and usernames
- `/data/university.ts` — university overview and activity entries
- `/data/thoughts.ts` — future writing entries
- `/data/socialLinks.ts` — social links shown across the portfolio

## Notes

- The portfolio uses a central profile data model to reduce repeated hardcoding.
- Placeholder content is intentionally easy to replace with real personal information.
- Do not replace the asset structure unless you want to redesign the portfolio layout itself.
