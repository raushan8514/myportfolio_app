// import type { ThoughtPost } from "@/data/types";

// export const thoughtPosts: ThoughtPost[] = [];

// export const thoughtsEmptyState = "No thoughts published yet.";


import type { ThoughtPost } from "@/data/types";

export const thoughtPosts: ThoughtPost[] = [
  {
    id: "thought-1",
    title: "My First Thought",
    slug: "my-first-thought",
    date: "2026-09-19",
    image: "/activities/my-first-thought.png",
    excerpt:
      "A short introduction to my first published thought.",
    content: [
      "This is the first paragraph of my thought.",
      "This is the second paragraph of my thought.",
    ],
    tags: ["Learning", "Technology"],
  },
];

export const thoughtsEmptyState =
  "No thoughts published yet. Check back soon.";