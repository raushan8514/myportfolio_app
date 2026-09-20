import type { UniversityProfile } from "@/data/types";

export const universityProfile: UniversityProfile = {
  name: "Lovely Professional University",
  image: "/university/lpu-campus.jpg",
  degree: "B.Tech in Computer Science & Engineering",
  duration: "2024 – 2028",
  description:
    "Lovely Professional University is where I am pursuing my B.Tech in Computer Science & Engineering, building a strong foundation in software development, problem solving, and emerging technologies. My university experience combines academic learning with hands-on projects, technical workshops, student activities, and collaborative opportunities that support my growth as a computer science professional.",
  activities: [
    {
      id: "tech-workshop",
      title: "Technology Workshop",
      image: "/activities/work.png",
      date: "2025",
      type: "Workshop",
      role: "Participant",
      description: "Participation in workshops and technical sessions focused on modern development tools and practical learning.",
      link: "#",
    },
    {
      id: "campus-event",
      title: "University Technical Event",
      image: "/activities/sss.png",
      date: "2025",
      type: "Technical Event",
      role: "Participant",
      description: "Engagement with campus innovation, technical exploration, and student-driven events.",
      link: "#",
    },
    {
      id: "volunteering",
      title: "Campus Volunteering",
      image: "/activities/c.png",
      date: "2026",
      type: "Volunteering",
      role: "Volunteer",
      description: "Support for community and student engagement activities across campus events and initiatives.",
      link: "#",
    },
    {
      id: "club-activity",
      title: "Club Activity",
      image: "/activities/ravi.png",
      date: "2024",
      type: "Club Activity",
      role: "Member",
      description: "Participating in technical and collaborative university communities to keep learning practical and connected.",
      link: "#",
    },
  ],
};
