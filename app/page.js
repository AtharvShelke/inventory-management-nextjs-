import HeroSection from "@/components/website/HeroSection";
import CompanySection from "@/components/website/CompanySection";
import KeyFeatures from "@/components/website/KeyFeatures";
import CatalogueSection from "@/components/website/CatalogueSection";
import CatalogSwiperSection from "@/components/website/CatalogSwiperSection";
import ContactSection from "@/components/website/ContactSection";
import Header from "@/components/website/Header";
import Footer from "@/components/website/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <CatalogueSection />
      <CompanySection />
      <KeyFeatures />
      <CatalogSwiperSection />
      <ContactSection />
      <Footer />
    </>
  );
}
