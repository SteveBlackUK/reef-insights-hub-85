import { motion } from "framer-motion";

const insights = [
  { metric: "Coral Coverage", value: "62%", change: "+4.2%", positive: true },
  { metric: "Water Temp", value: "26.3°C", change: "-0.8°C", positive: true },
  { metric: "Biodiversity Index", value: "8.7", change: "+1.1", positive: true },
  { metric: "Bleaching Risk", value: "Low", change: "↓", positive: true },
];

const InsightsPreview = () => {
  return (
    <section id="insights" className="bg-card px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">Insights</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">
              Your reef at a glance
            </h2>
            <p className="mt-4 text-muted-foreground">
              Reef Data Hub distills complex datasets into clear, actionable metrics. Monitor health indicators, compare sites, and share findings with your team—all from one dashboard.
            </p>
            <div className="mt-8 flex gap-6">
              <div>
                <p className="font-heading text-3xl font-bold text-primary">3×</p>
                <p className="mt-1 text-sm text-muted-foreground">Faster analysis</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-coral">50%</p>
                <p className="mt-1 text-sm text-muted-foreground">Less manual work</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {insights.map((ins, i) => (
              <div
                key={ins.metric}
                className="rounded-xl border border-border bg-background p-5 transition-all hover:glow-teal hover:border-primary/30"
                style={{ animation: `float ${3 + i * 0.5}s ease-in-out infinite ${i * 0.3}s` }}
              >
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{ins.metric}</p>
                <p className="mt-2 font-heading text-2xl font-bold text-foreground">{ins.value}</p>
                <p className={`mt-1 text-sm font-medium ${ins.positive ? "text-primary" : "text-coral"}`}>
                  {ins.change}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InsightsPreview;
