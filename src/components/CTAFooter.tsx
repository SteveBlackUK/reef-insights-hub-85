import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-bubbles3.png";

const CTA = () => (
  <section id="cta" className="relative overflow-hidden gradient-ocean px-6 py-24 md:px-12">
    <div className="absolute inset-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-teal-glow/10 blur-3xl" style={{ animation: "pulse-glow 4s ease-in-out infinite" }} />
    </div>
    <motion.div
      className="relative z-10 mx-auto max-w-2xl text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-heading text-3xl font-bold text-primary-foreground md:text-5xl">
        Ready to dive in?
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-primary-foreground/60">
        Join researchers and reef enthusiasts who are already using Reef Data Hub to protect marine ecosystems.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button variant="hero" size="lg" className="text-base">Get Started Free</Button>
        <Button variant="heroOutline" size="lg" className="text-base">Contact Us</Button>
      </div>
    </motion.div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-border bg-background px-6 py-10 md:px-12">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Reef Data Hub logo" className="h-6 w-6" />
        <span className="font-heading text-sm font-semibold text-foreground">Reef Data Hub</span>
      </div>
      <p className="text-xs text-muted-foreground">© 2026 Reef Data Hub. All rights reserved.</p>
    </div>
  </footer>
);

export { CTA, Footer };
