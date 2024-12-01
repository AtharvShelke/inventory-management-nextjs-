import AboutComponents from "@/components/website/AboutComponents";
import CatalogSwiperSection from "@/components/website/CatalogSwiperSection";
import CatalogueSection from "@/components/website/CatalogueSection";
import CompanySection from "@/components/website/CompanySection";
import ContactSection from "@/components/website/ContactSection";
import Footer from "@/components/website/Footer";
import Header from "@/components/website/Header";
import HeroSection from "@/components/website/HeroSection";


export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <CompanySection/>
      <AboutComponents/>
      <CatalogueSection/>
      <CatalogSwiperSection/>
      <ContactSection/>
      <Footer />
    </>
  );
}
