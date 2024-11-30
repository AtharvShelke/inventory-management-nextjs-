import AboutComponents from "@/components/website/AboutComponents";
import CompanySection from "@/components/website/CompanySection";
import Footer from "@/components/website/Footer";
import Header from "@/components/website/Header";
import HeroSection from "@/components/website/HeroSection";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <CompanySection/>
      <AboutComponents/>
      <Footer />
    </>
  );
}
