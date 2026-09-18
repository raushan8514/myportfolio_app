import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: "Raushan Kumar Sahni | Computer Science Engineer",
  description:
    "Portfolio of Raushan Kumar Sahni, a B.Tech Computer Science student, full-stack developer, and AI enthusiast building modern digital experiences.",
  keywords: [
    "Raushan Kumar Sahni",
    "Computer Science Engineer",
    "Full Stack Developer",
    "AI Enthusiast",
    "Portfolio",
    "LPU",
  ],
  openGraph: {
    title: "Raushan Kumar Sahni | Computer Science Engineer",
    description:
      "Full-stack developer and AI enthusiast focused on modern web experiences, software engineering, and product thinking.",
    siteName: "Raushan Kumar Sahni",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raushan Kumar Sahni | Computer Science Engineer",
    description:
      "Full-stack developer and AI enthusiast building modern digital experiences and practical software solutions.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
