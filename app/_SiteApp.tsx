"use client";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import HeroSection from "@/components/site/HeroSection";
import WorkSection from "@/components/site/WorkSection";
import ServicesSection from "@/components/site/ServicesSection";
import ProcessSection from "@/components/site/ProcessSection";
import ContactSection from "@/components/site/ContactSection";
import type { Project } from "@/lib/projects";
import type { ServiceData, SiteSettings } from "@/lib/types";

interface SiteAppProps {
  projects: Project[];
  services: ServiceData[];
  siteSettings?: SiteSettings;
}

export default function SiteApp({ projects, services, siteSettings }: SiteAppProps) {
  const contact = siteSettings?.contact;
  return (
    <>
      <SiteHeader settings={siteSettings?.navbar} phone={contact?.phone} overlay />
      <main>
        <HeroSection hero={siteSettings?.hero} />
        <WorkSection projects={projects} />
        <ServicesSection services={services} />
        <ProcessSection />
        <ContactSection contactInfo={contact} />
      </main>
      <SiteFooter email={contact?.email} phone={contact?.phone} />
    </>
  );
}
