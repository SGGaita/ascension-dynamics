/**
 * Portfolio projects - static source of truth (also used to seed Payload).
 *
 * Every project carries: description, technology used, year, period, scope of work
 * and laptop + mobile screenshots (public/projects/<slug>-desktop.webp / -mobile.webp).
 *
 * ⚠️  Values marked `// CONFIRM` are best guesses - please correct them.
 * Confirmed from the live sites (Oct 2026): URLs, what each product does,
 * Next.js + MUI on NBPS & TemplumIS, Next.js on HospitiumRIS, WordPress on Citiscape.
 */

export type ProjectStatus = "Live" | "In development" | "Maintained";

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  /** Year the project shipped (or started, if ongoing). */
  year: string;
  /** Engagement period, e.g. "Feb 2025 - May 2025". */
  period: string;
  status: ProjectStatus;
  liveUrl?: string;
  /** Kept for CMS compatibility; the design uses a single site-wide accent. */
  accent: string;
  /** One-line summary for cards. */
  shortDesc: string;
  /** Full description for the detail page. */
  description: string;
  /** Scope of work - what Ascension Dynamics delivered. */
  scope: string[];
  /** Notable product features. */
  features: string[];
  /** Technology used. */
  tech: string[];
  /** Screenshots shown in the laptop and phone mockups. */
  images: { desktop: string; mobile: string };
}

const shots = (slug: string) => ({ desktop: `/projects/${slug}-desktop.webp`, mobile: `/projects/${slug}-mobile.webp` });

export const PROJECTS: Project[] = [
  {
    slug: "nbps-alumni",
    title: "NBPS Alumni",
    client: "NBPS Alumni Association",
    category: "Community platform",
    year: "2025", // CONFIRM
    period: "Jan 2025 - Apr 2025", // CONFIRM
    status: "Live",
    liveUrl: "https://nbps-alumni.co.ke/",
    accent: "#D81B6A",
    shortDesc: "A home for Nyandarua Boarding Primary School graduates - reconnecting alumni, running events and funding school projects.",
    description:
      "The NBPS Alumni Association needed one place where former students could reconnect, follow what the association is doing and give back to the school. We designed and built a content-rich, mobile-first platform that brings together events, fundraising projects such as the NBPS Digital Library, a photo gallery, news, fitness and welfare programmes - with registration and donation calls-to-action throughout and rich link previews so every campaign travels further on social media.",
    scope: [
      "Discovery and information architecture",
      "UI/UX design for desktop and mobile",
      "Front-end engineering",
      "Events, projects, gallery and news modules",
      "Alumni registration and donation flows",
      "SEO, Open Graph and social integration",
      "Domain, hosting and deployment",
      "Admin training and handover",
    ],
    features: [
      "Hero storytelling slider for alumni, projects, welfare, fitness and fun day",
      "Events calendar with featured activities and entry fees",
      "Fundraising pages for the Digital Library and classroom upgrades",
      "Photo gallery, news and blog",
      "Registration and Donate calls-to-action on every page",
      "Seven social channels with rich link previews",
    ],
    tech: ["Next.js", "React", "Material UI", "Turbopack", "Google Forms", "Vercel"], // CONFIRM hosting
    images: shots("nbps-alumni"),
  },
  {
    slug: "hospitium-ris",
    title: "HospitiumRIS",
    client: "HospitiumRIS", // CONFIRM
    category: "Health research information system",
    year: "2025", // CONFIRM
    period: "Mar 2025 - Present", // CONFIRM
    status: "Live",
    liveUrl: "https://hospitium.hospitiumris.org/",
    accent: "#19A7A8",
    shortDesc: "A research information system that manages the full research lifecycle in hospitals and health research institutions.",
    description:
      "HospitiumRIS is integrated digital infrastructure for managing, tracking and improving research in hospitals. It connects clinicians, researchers, ethics committees and funders on one centralised, secure platform - replacing spreadsheets and email chains with structured workflows from proposal to publication. We led the product from requirements through architecture, design, build and rollout, including multilingual support, a dark mode and adjustable text size for accessibility.",
    scope: [
      "Requirements with research offices and ethics committees",
      "Product design and journeys for each stakeholder role",
      "System architecture, data model and API design",
      "Full-stack web application development",
      "Role-based access control and audit logging",
      "Accessibility: language switcher, dark mode, text sizing",
      "Cloud deployment, monitoring and backups",
      "Onboarding, training and ongoing support",
    ],
    features: [
      "Research proposal submission and tracking", // CONFIRM
      "Ethics review workflow for committees", // CONFIRM
      "Grant and funding management", // CONFIRM
      "Project monitoring with milestones and reports", // CONFIRM
      "Publications and research-output registry", // CONFIRM
      "Dashboards for institutional leadership", // CONFIRM
    ],
    tech: ["Next.js", "React", "Node.js", "PostgreSQL", "REST API", "Docker"], // CONFIRM beyond Next.js
    images: shots("hospitium-ris"),
  },
  {
    slug: "templum-is",
    title: "TemplumIS",
    client: "TemplumIS",
    category: "Higher-education intelligence",
    year: "2026", // CONFIRM
    period: "Jan 2026 - Present", // CONFIRM
    status: "Live",
    liveUrl: "https://templum.templumis.org/",
    accent: "#1E2D5A",
    shortDesc: "Institutional intelligence for universities - enrollment, student success, scholarships, research and rankings in one data layer.",
    description:
      "TemplumIS powers smarter higher education by turning siloed institutional data into a unified intelligence layer. Five integrated modules cover the complete institutional data lifecycle: enrollment and student success, scholarships and financial aid, student support, grants and research, and university rankings - giving leadership live dashboards and early warnings, and giving students self-service tools and timely nudges.",
    scope: [
      "Product strategy and module design",
      "UX for administrators, faculty and students",
      "Data model unifying admissions, finance and research data",
      "Web platform and dashboard development",
      "Multilingual interface and authentication",
      "Demo, onboarding and sign-up flows",
      "Deployment and ongoing support",
    ],
    features: [
      "Enrollment & student success with time-to-degree analytics and early-warning dashboards",
      "Scholarship & financial aid lifecycle - funds, applications, awards, compliance",
      "Student support with milestone tracking, nudges and ticketing",
      "Grants & research - burn rates, publication mapping, ethics/IRB alerts",
      "University rankings - indicator readiness, targets and live dashboards",
    ],
    tech: ["Next.js", "React", "Material UI", "Emotion", "PostgreSQL"], // CONFIRM beyond Next.js + MUI
    images: shots("templum-is"),
  },
  {
    slug: "citiscape-valuers",
    title: "Citiscape Valuers",
    client: "Citiscape Valuers & Estate Agents Ltd",
    category: "Real estate & valuation",
    year: "2024", // CONFIRM
    period: "Aug 2024 - Oct 2024", // CONFIRM
    status: "Live",
    liveUrl: "https://citiscapevaluers.com/",
    accent: "#9BC53D",
    shortDesc: "A property marketplace and corporate site for a valuation and estate agency - listings, virtual tours and valuation services.",
    description:
      "Citiscape Valuers & Estate Agents needed a site that sells properties and builds trust in its valuation and property-management services. We delivered a WordPress platform with a property manager for sale and rental listings (prices, bedrooms and bathrooms), immersive virtual tours, service pages for valuation and property management, a client showcase, an expert blog, and one-tap contact through phone, WhatsApp and social channels.",
    scope: [
      "UX and visual design",
      "WordPress theme customisation (child theme)",
      "Property listings for buy and rent",
      "Virtual tours integration",
      "Enquiry and valuation forms",
      "Blog and content setup",
      "SEO, hosting and deployment",
    ],
    features: [
      "Hero slider for homes, rentals and investment opportunities",
      "Property listings with price, bedrooms and bathrooms",
      "Virtual property tours",
      "Valuation and property-management service pages",
      "Client logo showcase and expert blog",
      "Click-to-call, WhatsApp and social quick links",
    ],
    tech: ["WordPress", "PHP", "MySQL", "Flatsome", "Formidable Forms", "Virtual Tours"],
    images: shots("citiscape-valuers"),
  },
];

/** Slugs of the old demo projects - ignored if they still exist in the CMS. */
export const LEGACY_SLUGS = ["nexapay", "medisync", "vaultmarket", "optimesh", "learnforge", "trackfleet"];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function projectImages(slug: string) {
  return shots(slug);
}
