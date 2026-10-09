/**
 * Site-wide SEO settings.
 * ⚠️ CONFIRM: set NEXT_PUBLIC_SITE_URL to the real production domain (no trailing slash).
 */
export const SITE = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://ascensiondynamics.io").replace(/\/$/, ""),
  name: "Ascension Dynamics",
  title: "Ascension Dynamics — Websites, Web & Mobile Apps, Custom Software",
  description:
    "Ascension Dynamics is a digital product studio. We plan, design, build and look after websites, web & mobile apps and custom software that people love to use.",
  keywords: [
    "software development company",
    "website design and development",
    "mobile app development",
    "custom software development",
    "web application development",
    "research information system",
    "university management system",
    "alumni portal development",
    "real estate website development",
    "Next.js development",
    "UI/UX design",
    "Kenya software studio",
  ],
};
