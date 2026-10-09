import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, PROJECTS } from "@/lib/projects";
import { getProjectBySlugCMS, getProjects, getSiteSettings } from "@/lib/cms";
import ProjectDetail from "@/components/site/ProjectDetail";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

async function loadProject(slug: string) {
  return (await getProjectBySlugCMS(slug)) ?? getProjectBySlug(slug);
}

export async function generateStaticParams() {
  try {
    const projects = await getProjects();
    if (projects.length) return projects.map((p) => ({ slug: p.slug }));
  } catch {}
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await loadProject(slug);
  if (!project) return { title: "Project not found", robots: { index: false } };
  const title = `${project.title} — ${project.category}`;
  return {
    title,
    description: project.shortDesc,
    alternates: { canonical: `/projects/${project.slug}` },
    keywords: [project.category, project.client, ...project.tech],
    openGraph: {
      type: "article",
      title,
      description: project.shortDesc,
      url: `/projects/${project.slug}`,
      images: [{ url: project.images.desktop, width: 800, height: 500, alt: `${project.title} on desktop` }],
    },
    twitter: { card: "summary_large_image", title, description: project.shortDesc, images: [project.images.desktop] },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = await loadProject(slug);
  if (!project) notFound();

  const [allProjects, siteSettings] = await Promise.all([getProjects(), getSiteSettings()]);
  const idx = allProjects.findIndex((p) => p.slug === project.slug);
  const next = allProjects.length > 1 ? allProjects[(idx + 1) % allProjects.length] : undefined;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        url: `${SITE.url}/projects/${project.slug}`,
        image: `${SITE.url}${project.images.desktop}`,
        dateCreated: project.year,
        creator: { "@type": "Organization", name: SITE.name, url: SITE.url },
        sourceOrganization: { "@type": "Organization", name: project.client },
        keywords: project.tech.join(", "),
        ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Work", item: `${SITE.url}/#work` },
          { "@type": "ListItem", position: 3, name: project.title, item: `${SITE.url}/projects/${project.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <ProjectDetail project={project} next={next} siteSettings={siteSettings} />
    </>
  );
}
