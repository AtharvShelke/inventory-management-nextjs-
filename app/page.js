import AboutComponents from "@/components/website/AboutComponents";
import CatalogSwiperSection from "@/components/website/CatalogSwiperSection";
import CatalogueSection from "@/components/website/CatalogueSection";
import CompanySection from "@/components/website/CompanySection";
import ContactSection from "@/components/website/ContactSection";
import Footer from "@/components/website/Footer";
import Header from "@/components/website/Header";
import HeroSection from "@/components/website/HeroSection";
import KeyFeatures from "@/components/website/KeyFeatures";


export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <CompanySection/>
      <KeyFeatures/>
      <AboutComponents/>
      <CatalogueSection/>
      <CatalogSwiperSection/>
      <ContactSection/>
      <Footer />
    </>
  );
}
