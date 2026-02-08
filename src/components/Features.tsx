import { motion } from "framer-motion";
import { BarChart3, Database, Eye, Zap, LineChart, Shield } from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Centralized Data",
    description: "Aggregate water quality, species counts, and environmental readings in one place.",
  },
  {
    icon: LineChart,
    title: "Trend Analysis",
    description: "Spot patterns in coral growth, bleaching events, and biodiversity over time.",
  },
  {
    icon: Eye,
    title: "Real-Time Monitoring",
    description: "Live dashboards that surface anomalies the moment they appear.",
  },
  {
    icon: BarChart3,
    title: "Custom Reports",
    description: "Generate publication-ready charts and export data in any format.",
  },
  {
    icon: Zap,
    title: "Smart Alerts",
    description: "Get notified when parameters drift outside healthy thresholds.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your reef data stays yours. End-to-end encryption and role-based access.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Features = () => {
  return (
    <section id="features" className="bg-background px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Features</span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-5xl">
            Everything your reef needs
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            From data ingestion to insight delivery, Reef Data Hub handles the heavy lifting so you can focus on conservation.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:glow-teal hover:border-primary/30"
            >
              <div className="mb-4 inline-flex rounded-lg gradient-teal p-2.5">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-card-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
