import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Download, Calendar } from "lucide-react";
import { useState } from "react";

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

const DateRangeBar = () => (
  <div className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-3">
    <div>
      <p className="text-xs font-medium text-muted-foreground">Date Range</p>
      <div className="mt-1 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground">
        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
        Feb 01, 2026 – Feb 08, 2026
      </div>
    </div>
    <div className="flex items-center gap-2">
      <Switch />
      <span className="text-sm text-muted-foreground">Show Moving Average</span>
    </div>
  </div>
);

const TemperatureChart = () => (
  <div className="rounded-xl border border-border bg-card p-5">
    <div className="flex items-center justify-between">
      <h3 className="font-heading text-lg font-semibold text-foreground">Temperature</h3>
      <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground">
        <Download className="h-4 w-4" />
      </Button>
    </div>
    <div className="mt-4 h-56">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={tempData}>
          <defs>
            <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(185, 72%, 40%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(185, 72%, 40%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 25%, 88%)" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "hsl(210, 20%, 50%)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[24.5, 25.5]}
            tick={{ fontSize: 12, fill: "hsl(210, 20%, 50%)" }}
            axisLine={false}
            tickLine={false}
            unit="°C"
          />
          <Tooltip
            contentStyle={{
              background: "hsl(210, 60%, 8%)",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontSize: "13px",
            }}
          />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="hsl(185, 72%, 40%)"
            strokeWidth={2}
            fill="url(#tempGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const ChartSection = () => {
  return (
    <div className="space-y-4">
      <DateRangeBar />
      <TemperatureChart />
    </div>
  );
};

export default ChartSection;
