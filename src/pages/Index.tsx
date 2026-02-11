import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AppPreview from "@/components/AppPreview";
import { CTA, Footer } from "@/components/CTAFooter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <AppPreview />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
