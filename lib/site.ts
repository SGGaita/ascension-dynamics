/**
 * Site-wide SEO settings.
 *
 * The site URL is resolved in this order:
 *   1. NEXT_PUBLIC_SITE_URL   — set this when you move to a custom domain
 *   2. VERCEL_PROJECT_PRODUCTION_URL — set automatically by Vercel
 *   3. https://ascension-dynamics.vercel.app
 * Share previews (WhatsApp, LinkedIn, X…) need this to be the real public address,
 * otherwise the preview image can't load.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const url = explicit || (vercel ? `https://${vercel}` : "https://ascension-dynamics.vercel.app");
  return url.replace(/\/$/, "");
}

export const SITE = {
  url: resolveSiteUrl(),
  name: "Ascension Dynamics",
  /** ~60 characters: brand + primary services (what people search for). */
  title: "Ascension Dynamics | Website Design, App & Software Development",
  /** ~155 characters: services, benefit and a call to action. */
  description:
    "Website design, web & mobile app development and custom software for growing businesses and institutions. Ascension Dynamics plans, builds and supports it all — talk to us today.",
  keywords: [
    // core services
    "website design",
    "website development",
    "web design company",
    "web application development",
    "mobile app development",
    "Android and iOS app development",
    "custom software development",
    "software development company",
    "e-commerce website development",
    "UI/UX design",
    "website redesign",
    "website maintenance and support",
    "cloud hosting and DevOps",
    "SEO-friendly websites",
    // solutions we've shipped
    "school and alumni portal",
    "research information system",
    "university management system",
    "real estate website",
    "management information system",
    // technology
    "Next.js developers",
    "React developers",
    "WordPress development",
    // region
    "software company in Kenya",
    "web design Kenya",
    "app developers Kenya",
    "software development Africa",
  ],
};
