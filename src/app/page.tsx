
import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Services from "@/components/home/Services";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import WhyChoose from "@/components/home/WhyChoose";

export default function Home(){

  return(
    <>
      <Hero />
      <Services />
      <WhyChoose/>
      <HowItWorks/>
      <Stats />
      <Testimonials/>
      <FAQ/>
      <CTA/>
      <Footer/>
    </>
  );

}