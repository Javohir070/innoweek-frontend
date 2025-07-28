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
const HeroVideo = "/video/1.mp4";

export default function RootPage() {
  return (
    <>
      <div
        id="hero"
        className="absolute w-full ml-[-30px] mt-[-30px] h-screen overflow-hidden -z-50"
      >
        <div className="absolute inset-0 bg-black/55 dark:bg-black/70 backdrop-blur-[0,5px] z-[1]"></div>
        <video
          className="absolute w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
        >
          <source src={HeroVideo} type="video/mp4" />
        </video>
      </div>

      <section className="xl:px-[80px] lg:px-[20px] bg-transparent ">
        <main className="main relative z-10">
          <HeroSection />
          <NewsSection />
          <AboutSection />
          <ExpertFeedback />
          <StatsSection />
          <ProgramSection />
          <SpeakersSection />
          <PartnersSection />
          <GalerySection />
          <FAQSection />
          <ContactSection />
        </main>
      </section>
    </>
  );
}
