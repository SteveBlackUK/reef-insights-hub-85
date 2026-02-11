import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis,
} from "recharts";

/* ── Real parameter tiles from the dashboard ── */
const parameters = [
  { label: "Temperature", value: "24.8", unit: "°C", status: "ok" as const, sparkline: [24.5, 24.7, 24.9, 24.8, 25.0, 24.7, 24.8] },
  { label: "pH", value: "8.33", unit: "", status: "ok" as const, sparkline: [8.3, 8.35, 8.32, 8.33, 8.31, 8.34, 8.33] },
  { label: "Salinity", value: "33.7", unit: "ppt", status: "warning" as const, sparkline: [34.0, 33.8, 33.5, 33.7, 33.9, 33.6, 33.7] },
  { label: "Alkalinity", value: "8.4", unit: "dKH", status: "ok" as const, sparkline: [8.2, 8.3, 8.5, 8.4, 8.3, 8.4, 8.4] },
  { label: "Calcium", value: "400", unit: "ppm", status: "ok" as const, sparkline: [395, 398, 400, 402, 399, 400, 400] },
  { label: "Magnesium", value: "1550", unit: "ppm", status: "elevated" as const, sparkline: [1500, 1520, 1540, 1550, 1555, 1550, 1550] },
];

type Status = "ok" | "warning" | "elevated";

const statusIcon: Record<Status, React.ReactNode> = {
  ok: <CheckCircle2 className="h-3.5 w-3.5 text-primary" />,
  warning: <AlertTriangle className="h-3.5 w-3.5 text-coral" />,
  elevated: <ArrowUp className="h-3.5 w-3.5 text-coral" />,
};

const statusBorder: Record<Status, string> = {
  ok: "border-primary/20",
  warning: "border-coral/30",
  elevated: "border-coral/20",
};

const MiniSparkline = ({ data, status }: { data: number[]; status: Status }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const h = 24;
  const w = 80;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(" ");
  const strokeColor = status === "ok" ? "hsl(var(--primary))" : "hsl(var(--coral))";

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-6 w-full" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/* ── Mini dosing chart data ── */
const miniChartData = [
  { date: "Jan 28", alkalinity: 17.5, calcium: 8.2, rz: 18.1 },
  { date: "Jan 30", alkalinity: 19.0, calcium: 7.8, rz: 19.5 },
  { date: "Feb 1", alkalinity: 30.2, calcium: 9.1, rz: 31.0 },
  { date: "Feb 3", alkalinity: 32.8, calcium: 8.5, rz: 33.2 },
  { date: "Feb 5", alkalinity: 18.4, calcium: 7.6, rz: 17.9 },
  { date: "Feb 7", alkalinity: 17.9, calcium: 8.3, rz: 18.6 },
  { date: "Feb 9", alkalinity: 18.2, calcium: 8.0, rz: 18.0 },
];

/* ── Mini livestock table ── */
const livestock = [
  { name: "Yellow Tang", status: "ALIVE", age: "8 months", category: "Marine Fish" },
  { name: "Diamond Watchman Goby", status: "ALIVE", age: "1 month", category: "Marine Fish" },
  { name: "Scarlet Hawkfish", status: "ALIVE", age: "8 months", category: "Hawkfish" },
  { name: "Molly Miller Blenny", status: "ALIVE", age: "3 weeks", category: "Blennies" },
  { name: "Resplendent Anthias", status: "DECEASED", age: "3 days", category: "Anthias" },
];

const AppPreview = () => {
  return (
    <section id="insights" className="bg-card px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Live Preview</span>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Your reef at a glance
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Real data tiles, charts, and livestock tracking — all from one dashboard.
          </p>
        </motion.div>

        {/* Parameter Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Water Parameters</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-3">
            {parameters.map((p) => (
              <div
                key={p.label}
                className={cn(
                  "rounded-xl border bg-background p-3 transition-all duration-200",
                  statusBorder[p.status]
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-muted-foreground">{p.label}</span>
                  {statusIcon[p.status]}
                </div>
                <div className="mt-1.5 flex items-baseline gap-1">
                  <span className={cn("font-heading text-lg font-bold", p.status === "ok" ? "text-foreground" : "text-coral")}>{p.value}</span>
                  <span className="text-[10px] text-muted-foreground">{p.unit}</span>
                </div>
                <div className="mt-2">
                  <MiniSparkline data={p.sparkline} status={p.status} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Second row: Chart + Livestock */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Mini Dosing Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-xl border border-border bg-background p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Dosing Volume</p>
            <p className="font-heading text-sm font-semibold text-foreground mb-3">Daily Volume by Chemical</p>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={miniChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 25%, 88%)" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(210, 20%, 50%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(210, 20%, 50%)" }} axisLine={false} tickLine={false} width={30} />
                  <Bar dataKey="alkalinity" fill="hsl(210, 80%, 50%)" stackId="a" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="calcium" fill="hsl(145, 65%, 40%)" stackId="a" />
                  <Bar dataKey="rz" fill="hsl(210, 15%, 70%)" stackId="a" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Mini Livestock Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-xl border border-border bg-background p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Livestock</p>
            <p className="font-heading text-sm font-semibold text-foreground mb-3">Current Stocking</p>
            <div className="space-y-0">
              {livestock.map((l, i) => (
                <div key={i} className={cn("flex items-center justify-between py-2.5 px-1", i !== livestock.length - 1 && "border-b border-border")}>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{l.name}</p>
                    <p className="text-[11px] text-muted-foreground">{l.category}</p>
                  </div>
                  <span className={cn(
                    "shrink-0 ml-3 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                    l.status === "ALIVE"
                      ? "bg-primary/10 text-primary"
                      : "bg-coral/10 text-coral"
                  )}>
                    {l.status}
                  </span>
                  <span className="shrink-0 ml-3 text-xs text-muted-foreground w-16 text-right">{l.age}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="mt-10 flex justify-center gap-10 md:gap-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center">
            <p className="font-heading text-3xl font-bold text-primary">3×</p>
            <p className="mt-1 text-sm text-muted-foreground">Faster analysis</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-3xl font-bold text-coral">50%</p>
            <p className="mt-1 text-sm text-muted-foreground">Less manual work</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-3xl font-bold text-primary">8</p>
            <p className="mt-1 text-sm text-muted-foreground">Parameters tracked</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppPreview;
