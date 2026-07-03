import AboutSection from "@/components/landing/About";
import ChatBot from "@/components/landing/Chatbot";
import ContactSection from "@/components/landing/Contact";
import ExpertFeedback from "@/components/landing/ExpertFeedback";
import FAQSection from "@/components/landing/FAQSection";
import GalerySection from "@/components/landing/Galery";
import HeroSection from "@/components/landing/Hero";
import MobileDirection from "@/components/landing/MobileDirection";
import NewsSection from "@/components/landing/News";
import PartnersSection from "@/components/landing/Partners";
import ProgramSection from "@/components/landing/Program";
import SpeakersSection from "@/components/landing/Speakers";
import StatsSection from "@/components/landing/Stats";
import "@ant-design/v5-patch-for-react-19";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section className="!p-0 bg-transparent ">
        <main className="main relative z-10">
          <ChatBot />
          <NewsSection />
          <AboutSection />
          <StatsSection />
          <ProgramSection />
          <SpeakersSection />
          <PartnersSection />
          <ExpertFeedback />
          <GalerySection />
          <FAQSection />
          <MobileDirection />
          <ContactSection />
        </main>
      </section>
    </>
  );
}
