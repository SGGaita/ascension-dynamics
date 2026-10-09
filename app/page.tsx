import SiteApp from "./_SiteApp";
import JsonLd from "@/components/JsonLd";
import { getProjects, getServices, getSiteSettings } from "@/lib/cms";
import { CONTACT, SOCIALS } from "@/lib/contact";
import { SITE } from "@/lib/site";

export default async function Page() {
  const [projects, services, siteSettings] = await Promise.all([
    getProjects(),
    getServices(),
    getSiteSettings(),
  ]);

  const phone = siteSettings?.contact?.phone || CONTACT.phone;
  const email = siteSettings?.contact?.email || CONTACT.email;

  // Structured data: who we are, what we offer and what we've built.
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/icon-mark.png`,
        image: `${SITE.url}/opengraph-image.png`,
        description: SITE.description,
        telephone: phone,
        email,
        sameAs: SOCIALS.map((s) => s.href),
        knowsAbout: services.map((s) => s.title),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.desc } })),
        },
      },
      { "@type": "WebSite", "@id": `${SITE.url}/#website`, url: SITE.url, name: SITE.name, publisher: { "@id": `${SITE.url}/#organization` } },
      {
        "@type": "ItemList",
        name: "Selected work",
        itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE.url}/projects/${p.slug}`, name: p.title })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <SiteApp projects={projects} services={services} siteSettings={siteSettings} />
    </>
  );
}
