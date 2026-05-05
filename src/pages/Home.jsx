import Hero from "@/components/home/Hero";
import ObjectivesSection from "@/components/home/ObjectivesSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import ContactCTA from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <ObjectivesSection />
      <ServicesPreview />
      <ProjectsPreview />
      <ContactCTA />
    </main>
  );
}