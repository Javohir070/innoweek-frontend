import AboutSection from "@/components/landing/About";
import ContactSection from "@/components/landing/Contact";
import ExpertFeedback from "@/components/landing/ExpertFeedback";
import FAQSection from "@/components/landing/FAQSection";
import GalerySection from "@/components/landing/Galery";
import HeroSection from "@/components/landing/Hero";
import NewsSection from "@/components/landing/News";
import PartnersSection from "@/components/landing/Partners";
import ProgramSection from "@/components/landing/Program";
import SpeakersSection from "@/components/landing/Speakers";
import StatsSection from "@/components/landing/Stats";

export default function RootPage() {
  return (
    <>
      <HeroSection />
      <section className="!p-0 bg-transparent ">
        <main className="main relative z-10">
          <NewsSection />
          <AboutSection />
          <StatsSection />
          <ProgramSection />
          <SpeakersSection />
          <PartnersSection />
          <ExpertFeedback />
          <GalerySection />
          <FAQSection />
          <ContactSection />
        </main>
      </section>
    </>
  );
}
