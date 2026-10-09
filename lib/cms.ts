import "server-only";
import type { Project } from "./projects";
import { PROJECTS as STATIC_PROJECTS, LEGACY_SLUGS, projectImages } from "./projects";
import type { TestimonialData, ServiceData, SiteSettings } from "./types";

export type { TestimonialData, ServiceData, SiteSettings } from "./types";

/* ── Static fallbacks ────────────────────────────────────────── */

export const STATIC_TESTIMONIALS: TestimonialData[] = [
  { quote: "Ascension Dynamics didn't just build our platform — they fundamentally redesigned how we think about engineering infrastructure. Their technical depth and ability to communicate complex ideas to non-technical stakeholders was extraordinary.", name: "Sarah Okonkwo", role: "CTO, NexaPay Financial Services", emoji: "👩‍💼", rgb: "46,204,138", stat: "2M+ txns/mo", co: "NexaPay" },
  { quote: "We evaluated seven development firms. Ascension Dynamics was the only team that came back with questions before submitting a proposal — that intellectual curiosity defined the entire engagement. Delivered in 11 weeks, flawlessly.", name: "Dr. Marcus Webb", role: "CEO, MediSync Health Technologies", emoji: "👨‍⚕️", rgb: "232,192,48", stat: "11-week delivery", co: "MediSync" },
  { quote: "The migration to their cloud architecture cut our infrastructure costs by 38% while improving uptime from 99.2% to 99.97%. Their DevOps team became a true extension of our own — embedded partners, not contractors.", name: "Kwame Asante", role: "VP Engineering, VaultMarket", emoji: "👨‍💻", rgb: "240,114,40", stat: "−38% infra cost", co: "VaultMarket" },
  { quote: "Our student engagement scores jumped 47% within the first semester. Ascension Dynamics understood the pedagogical nuance behind the technical requirements — that rare blend of domain empathy and engineering excellence is what sets them apart.", name: "Prof. Amara Diallo", role: "Director of Digital Learning, Pan-African University", emoji: "👩‍🏫", rgb: "155,89,245", stat: "+47% engagement", co: "Pan-African Uni" },
];

export const STATIC_SERVICES: ServiceData[] = [
  { icon: "", title: "Website Design & Development", desc: "Fast, SEO-friendly websites and e-commerce stores that look great on every device and turn visitors into customers.", accentRgb: "25,167,168" },
  { icon: "", title: "Web Application Development", desc: "Portals, dashboards and SaaS platforms built with React, Next.js and modern back-ends — secure and ready to scale.", accentRgb: "25,167,168" },
  { icon: "", title: "Mobile App Development", desc: "Android and iOS apps with smooth, native-feeling experiences, built cross-platform to save time and budget.", accentRgb: "25,167,168" },
  { icon: "", title: "Custom Software & Systems", desc: "Management information systems, integrations and automation shaped around how your organisation actually works.", accentRgb: "25,167,168" },
  { icon: "", title: "UI/UX Design", desc: "Research, wireframes and polished interfaces that make your product easy, clear and enjoyable to use.", accentRgb: "25,167,168" },
  { icon: "", title: "Hosting, Security & Support", desc: "Cloud hosting, backups, monitoring, updates and a team on call — so your website and apps stay fast and safe.", accentRgb: "25,167,168" },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  navbar: { logoWidth: 88, logoHeight: 56, companyName: "Ascension.Dynamics", navbarHeight: "default" },
  hero: {
    headline: "We design & build *websites|web & mobile apps|custom software*",
    subtext: "From websites that win customers to web & mobile apps and the custom software that runs your business — we plan, design, build and look after digital products people love to use.",
    badges: ["Web Platforms", "Information Systems", "Cloud & DevOps", "Mobile", "Data & Reporting"],
    statusBadge: "Digital product studio",
    ctaPrimary: "Start a Project",
    ctaSecondary: "View Our Work",
  },
  contact: { email: "hello@ascensiondynamics.io", locations: "", phone: "+254-723-272915" },
};

/* ── Helpers ─────────────────────────────────────────────────── */

/* eslint-disable @typescript-eslint/no-explicit-any */
function docToProject(doc: Record<string, any>): Project {
  const list = (arr: any[] | undefined, key: string) =>
    (arr ?? []).map((x: any) => (typeof x === "string" ? x : x?.[key] ?? "")).filter(Boolean);
  return {
    slug:        doc.slug        ?? "",
    title:       doc.title       ?? "",
    client:      doc.client      ?? "",
    category:    doc.category    ?? "",
    year:        doc.year        ?? "",
    period:      doc.period      ?? "",
    status:      doc.status      ?? "Live",
    liveUrl:     doc.liveUrl     || undefined,
    accent:      doc.accent      || "#0B7F86",
    shortDesc:   doc.shortDesc   ?? "",
    description: doc.description ?? "",
    scope:       list(doc.scope, "item"),
    features:    list(doc.features, "feature"),
    tech:        list(doc.tech, "name"),
    images: {
      desktop: (doc.desktopImage && typeof doc.desktopImage === "object" && doc.desktopImage.url) || projectImages(doc.slug ?? "").desktop,
      mobile:  (doc.mobileImage  && typeof doc.mobileImage  === "object" && doc.mobileImage.url)  || projectImages(doc.slug ?? "").mobile,
    },
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/** CMS docs are used only when they belong to the new schema (not the old demo projects). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isCurrentProject(doc: Record<string, any>) {
  return !LEGACY_SLUGS.includes(doc.slug) && !!doc.client && !!doc.year;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function docToTestimonial(doc: Record<string, any>): TestimonialData {
  return {
    quote: doc.quote ?? "", name: doc.name ?? "", role: doc.role ?? "",
    emoji: doc.emoji ?? "", rgb: doc.accentRgb ?? "46,204,138",
    stat: doc.stat ?? "", co: doc.company ?? "",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function docToService(doc: Record<string, any>): ServiceData {
  return { icon: doc.icon ?? "", title: doc.title ?? "", desc: doc.desc ?? "", accentRgb: doc.accentRgb ?? "46,204,138" };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function docToSettings(doc: Record<string, any>): SiteSettings {
  const navbar = doc.navbar ?? {};
  const hero   = doc.hero   ?? {};
  const contact = doc.contact ?? {};
  const logo = navbar.logo;
  return {
    navbar: {
      logoUrl:     logo && typeof logo === "object" ? (logo.url as string) : undefined,
      logoWidth:   (navbar.logoWidth  as number)  ?? 88,
      logoHeight:  (navbar.logoHeight as number)  ?? 56,
      companyName: (navbar.companyName as string) ?? "Ascension.Dynamics",
      navbarHeight: (navbar.navbarHeight as "compact" | "default" | "tall") ?? "default",
    },
    hero: {
      headline:     (hero.headline    as string) ?? DEFAULT_SETTINGS.hero.headline,
      subtext:      (hero.subtext     as string) ?? DEFAULT_SETTINGS.hero.subtext,
      badges:       ((hero.badges ?? []) as Array<{ text: string }>).map(b => b.text).filter(Boolean),
      statusBadge:  (hero.statusBadge as string) ?? DEFAULT_SETTINGS.hero.statusBadge,
      ctaPrimary:   (hero.ctaPrimary  as string) ?? DEFAULT_SETTINGS.hero.ctaPrimary,
      ctaSecondary: (hero.ctaSecondary as string) ?? DEFAULT_SETTINGS.hero.ctaSecondary,
    },
    contact: {
      email:     (contact.email     as string) ?? DEFAULT_SETTINGS.contact.email,
      locations: (contact.locations as string) ?? DEFAULT_SETTINGS.contact.locations,
      phone:     (contact.phone as string) || DEFAULT_SETTINGS.contact.phone,
    },
  };
}

/* ── Data fetchers ───────────────────────────────────────────── */

async function getPayloadClient() {
  const { getPayload } = await import("payload");
  const payloadConfig = (await import("@payload-config")).default;
  return getPayload({ config: payloadConfig });
}

export async function getProjects(): Promise<Project[]> {
  try {
    const payload = await getPayloadClient();
    const result  = await payload.find({ collection: "projects", limit: 50, sort: "order" });
    const docs    = result.docs.filter(isCurrentProject);
    if (!docs.length) return STATIC_PROJECTS;
    return docs.map(docToProject);
  } catch { return STATIC_PROJECTS; }
}

export async function getProjectBySlugCMS(slug: string): Promise<Project | undefined> {
  try {
    const payload = await getPayloadClient();
    const result  = await payload.find({ collection: "projects", where: { slug: { equals: slug } }, limit: 1 });
    if (!result.docs.length || !isCurrentProject(result.docs[0])) return undefined;
    return docToProject(result.docs[0]);
  } catch { return undefined; }
}

export async function getTestimonials(): Promise<TestimonialData[]> {
  try {
    const payload = await getPayloadClient();
    const result  = await payload.find({ collection: "testimonials", limit: 20, sort: "order" });
    if (!result.docs.length) return STATIC_TESTIMONIALS;
    return result.docs.map(docToTestimonial);
  } catch { return STATIC_TESTIMONIALS; }
}

export async function getServices(): Promise<ServiceData[]> {
  try {
    const payload = await getPayloadClient();
    const result  = await payload.find({ collection: "services", limit: 20, sort: "order" });
    if (!result.docs.length) return STATIC_SERVICES;
    return result.docs.map(docToService);
  } catch { return STATIC_SERVICES; }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const payload = await getPayloadClient();
    const doc     = await payload.findGlobal({ slug: "site-settings" });
    return docToSettings(doc as Record<string, unknown>);
  } catch { return DEFAULT_SETTINGS; }
}
