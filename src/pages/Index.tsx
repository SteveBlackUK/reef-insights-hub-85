import Hero from "@/components/Hero";
import Features from "@/components/Features";
import InsightsPreview from "@/components/InsightsPreview";
import { CTA, Footer } from "@/components/CTAFooter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <InsightsPreview />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
