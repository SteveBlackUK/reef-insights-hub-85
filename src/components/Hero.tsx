import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroReef from "@/assets/hero-reef.jpg";
import logo from "@/assets/logo.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden gradient-ocean">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroReef} alt="Coral reef underwater" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/80 via-ocean-mid/60 to-ocean-deep/90" />
      </div>

      {/* Animated glow orbs */}
      <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-teal-glow/10 blur-3xl" style={{ animation: "pulse-glow 4s ease-in-out infinite" }} />
      <div className="absolute bottom-1/3 right-1/4 h-48 w-48 rounded-full bg-coral/10 blur-3xl" style={{ animation: "pulse-glow 5s ease-in-out infinite 1s" }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Reef Data Hub logo" className="h-8 w-8" />
          <span className="font-heading text-xl font-bold text-primary-foreground">Reef Data Hub</span>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">Features</a>
          <a href="#insights" className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">Insights</a>
          <a href="#cta" className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">Get Started</a>
        </div>
        <Button variant="heroOutline" size="sm" className="hidden md:inline-flex">Sign In</Button>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium tracking-wide text-teal-glow backdrop-blur-sm">
            🌊 Track · Analyze · Protect
          </span>
        </motion.div>

        <motion.h1
          className="mx-auto max-w-4xl font-heading text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl md:text-7xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Unlock the secrets of{" "}
          <span className="text-gradient-teal">your reef</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/60 md:text-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Centralize your reef data, discover trends, and make data-driven decisions to keep your ecosystem thriving.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <Button variant="hero" size="lg" className="text-base">
            Start Tracking Free
          </Button>
          <Button variant="heroOutline" size="lg" className="text-base">
            See a Demo
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-8 md:gap-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {[
            { value: "12K+", label: "Data Points Tracked" },
            { value: "340+", label: "Reef Sites" },
            { value: "98%", label: "Uptime" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-2xl font-bold text-teal-glow md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-primary-foreground/50 md:text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Wave bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L48 55C96 50 192 40 288 45C384 50 480 70 576 75C672 80 768 70 864 60C960 50 1056 40 1152 45C1248 50 1344 70 1392 80L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z" fill="hsl(210 40% 98%)" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
