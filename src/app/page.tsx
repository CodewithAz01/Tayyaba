import LoadingScreen from "@/components/portfolio/LoadingScreen";
import CustomCursor from "@/components/portfolio/CustomCursor";
import Navigation from "@/components/portfolio/Navigation";
import Hero from "@/components/portfolio/Hero";
import SkillsMarquee from "@/components/portfolio/SkillsMarquee";
import About from "@/components/portfolio/About";
import WhoIAm from "@/components/portfolio/WhoIAm";
import Skills from "@/components/portfolio/Skills";
import Tools from "@/components/portfolio/Tools";
import Services from "@/components/portfolio/Services";
import Projects from "@/components/portfolio/Projects";
import WorkProcess from "@/components/portfolio/WorkProcess";
import Education from "@/components/portfolio/Education";
import Journey from "@/components/portfolio/Journey";
import Experience from "@/components/portfolio/Experience";
import Philosophy from "@/components/portfolio/Philosophy";
import FAQ from "@/components/portfolio/FAQ";
import CVSection from "@/components/portfolio/CVSection";
import Contact from "@/components/portfolio/Contact";
import SharePortfolio from "@/components/portfolio/SharePortfolio";
import CTASection from "@/components/portfolio/CTASection";
import Footer from "@/components/portfolio/Footer";
import FloatingButtons from "@/components/portfolio/FloatingButtons";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <SkillsMarquee />
        <About />
        <WhoIAm />
        <Skills />
        <Tools />
        <Services />
        <Projects />
        <WorkProcess />
        <Experience />
        <Education />
        <Journey />
        <Philosophy />
        <FAQ />
        <CVSection />
        <Contact />
        <SharePortfolio />
        <CTASection />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
