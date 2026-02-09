import {
  Area, AreaChart, CartesianGrid, Legend, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Download, Calendar } from "lucide-react";

/* ── mock data ── */

const tempData = [
  { date: "Feb 1", temp: 25.0 },
  { date: "Feb 2", temp: 25.1 },
  { date: "Feb 3", temp: 24.9 },
  { date: "Feb 4", temp: 25.2 },
  { date: "Feb 5", temp: 24.8 },
  { date: "Feb 6", temp: 25.3 },
  { date: "Feb 7", temp: 24.7 },
  { date: "Feb 8", temp: 24.8 },
];

const phData = Array.from({ length: 50 }, (_, i) => {
  const h = i * 3.36;
  const day = Math.floor(h / 24) + 2;
  const hour = Math.round(h % 24);
  const label = `Feb ${day} ${hour.toString().padStart(2, "0")}:00`;
  return {
    time: label,
    apexPh: +(8.3 + 0.2 * Math.sin(((h % 24) / 24) * Math.PI * 2) + (Math.random() - 0.5) * 0.05).toFixed(3),
    apexPh2: +(8.15 + 0.18 * Math.sin(((h % 24) / 24) * Math.PI * 2) + (Math.random() - 0.5) * 0.05).toFixed(3),
    aquaWiz: +(8.03 + 0.05 * Math.sin(((h % 24) / 24) * Math.PI * 2) + (Math.random() - 0.5) * 0.02).toFixed(3),
  };
});

const alkData = Array.from({ length: 50 }, (_, i) => {
  const h = i * 3.36;
  const day = Math.floor(h / 24) + 2;
  const hour = Math.round(h % 24);
  const label = `Feb ${day} ${hour.toString().padStart(2, "0")}:00`;
  return {
    time: label,
    alkatronic: +(8.5 - i * 0.002 + (Math.random() - 0.5) * 0.04).toFixed(2),
    aquaWiz: +(8.0 + 0.15 * Math.sin(i * 0.4) + (Math.random() - 0.5) * 0.1).toFixed(2),
  };
});

const nutrientData = [
  { time: "Feb 2 20:00", no3: 10.7, po4: 0.06 },
  { time: "Feb 5 12:00", no3: 9.1, po4: 0.065 },
  { time: "Feb 7 12:00", no3: 4.8, po4: 0.078 },
];

/* ── shared ── */

const chartCardClass = "rounded-xl border border-border bg-card p-3 sm:p-5";
const axisTick = { fontSize: 11, fill: "hsl(210, 20%, 50%)" };
const tooltipStyle = {
  background: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 8,
  fontSize: 12,
};

const ChartHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-baseline gap-2">
      <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground">{title}</h3>
      {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
    </div>
    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground">
      <Download className="h-4 w-4" />
    </Button>
  </div>
);

/* ── date range bar ── */

const DateRangeBar = () => (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-border bg-card px-3 sm:px-5 py-3">
    <div>
      <p className="text-xs font-medium text-muted-foreground">Date Range</p>
      <div className="mt-1 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs sm:text-sm text-foreground">
        <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        Feb 01, 2026 – Feb 08, 2026
      </div>
    </div>
    <div className="flex items-center gap-2">
      <Switch />
      <span className="text-xs sm:text-sm text-muted-foreground">Show Moving Average</span>
    </div>
  </div>
);

/* ── Temperature chart ── */

const TemperatureChart = () => (
  <div className={chartCardClass}>
    <ChartHeader title="Temperature" />
    <div className="h-48 sm:h-56 -ml-2 -mr-1">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={tempData}>
          <defs>
            <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(185, 72%, 40%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(185, 72%, 40%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 25%, 88%)" vertical={false} />
          <XAxis dataKey="date" tick={axisTick} axisLine={false} tickLine={false} />
          <YAxis domain={[24.5, 25.5]} tick={axisTick} axisLine={false} tickLine={false} unit="°C" width={45} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area type="monotone" dataKey="temp" stroke="hsl(185, 72%, 40%)" strokeWidth={2} fill="url(#tempGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

/* ── pH chart (3 probes) ── */

const PhChart = () => (
  <div className={chartCardClass}>
    <ChartHeader title="pH" />
    <div className="h-48 sm:h-56 -ml-2 -mr-1">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={phData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 25%, 88%)" vertical />
          <XAxis dataKey="time" tick={axisTick} axisLine={false} tickLine={false} interval={9} />
          <YAxis domain={[7.5, 8.75]} tick={axisTick} axisLine={false} tickLine={false} width={35} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12 }} />
          <Line type="monotone" dataKey="apexPh" name="Apex pH" stroke="hsl(30, 95%, 55%)" strokeWidth={1.5} dot={false} />
          <Line type="monotone" dataKey="apexPh2" name="Apex pH2" stroke="hsl(0, 75%, 50%)" strokeWidth={1.5} dot={false} />
          <Line type="monotone" dataKey="aquaWiz" name="AquaWiz" stroke="hsl(145, 65%, 40%)" strokeWidth={1.5} dot={{ r: 2, fill: "hsl(145, 65%, 40%)" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

/* ── Alkalinity chart (2 sources) ── */

const AlkalinityChart = () => (
  <div className={chartCardClass}>
    <ChartHeader title="Alkalinity" subtitle="(77 tests)" />
    <div className="h-48 sm:h-56 -ml-2 -mr-1">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={alkData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 25%, 88%)" vertical />
          <XAxis dataKey="time" tick={axisTick} axisLine={false} tickLine={false} interval={9} />
          <YAxis domain={[7.5, 9.0]} tick={axisTick} axisLine={false} tickLine={false} unit=" dKH" width={55} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12 }} />
          <Line type="monotone" dataKey="alkatronic" name="Alkatronic" stroke="hsl(30, 95%, 55%)" strokeWidth={1.5} dot={{ r: 2, fill: "hsl(30, 95%, 55%)" }} />
          <Line type="monotone" dataKey="aquaWiz" name="AquaWiz" stroke="hsl(270, 60%, 55%)" strokeWidth={1.5} dot={{ r: 2, fill: "hsl(270, 60%, 55%)" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

/* ── Nitrate + Phosphate (dual Y-axis) ── */

const NutrientChart = () => (
  <div className={chartCardClass}>
    <ChartHeader title="Nitrate + Phosphate" />
    <div className="h-48 sm:h-56 -ml-2 -mr-1">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={nutrientData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 25%, 88%)" vertical />
          <XAxis dataKey="time" tick={axisTick} axisLine={false} tickLine={false} />
          <YAxis yAxisId="left" domain={[0, 20]} tick={axisTick} axisLine={false} tickLine={false} label={{ value: "Nitrate (ppm)", angle: -90, position: "insideLeft", style: { fontSize: 11, fill: "hsl(210,20%,50%)" } }} width={55} />
          <YAxis yAxisId="right" orientation="right" domain={[0, 0.15]} tick={axisTick} axisLine={false} tickLine={false} label={{ value: "Phosphate (ppm)", angle: 90, position: "insideRight", style: { fontSize: 11, fill: "hsl(210,20%,50%)" } }} width={65} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12 }} />
          <Line yAxisId="left" type="monotone" dataKey="no3" name="NO3 (Manual)" stroke="hsl(210, 80%, 50%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(210, 80%, 50%)" }} />
          <Line yAxisId="right" type="monotone" dataKey="po4" name="PO4 (Manual)" stroke="hsl(145, 65%, 40%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(145, 65%, 40%)" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

/* ── Main export ── */

const ChartSection = () => (
  <div className="space-y-3 sm:space-y-4">
    <DateRangeBar />
    <TemperatureChart />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
      <PhChart />
      <AlkalinityChart />
    </div>
    <NutrientChart />
  </div>
);

export default ChartSection;
