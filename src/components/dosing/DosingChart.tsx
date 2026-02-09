import {
  Bar, BarChart, CartesianGrid, Legend,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { dailyVolumeData } from "./DosingData";

const axisTick = { fontSize: 11, fill: "hsl(210, 20%, 50%)" };
const tooltipStyle = {
  background: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 8,
  fontSize: 12,
};

const DosingChart = () => (
  <div className="rounded-xl border border-border bg-card p-3 sm:p-5">
    <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground mb-4">Daily Volume by Chemical</h3>
    <div className="h-64 sm:h-80 -ml-2 -mr-1">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dailyVolumeData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 25%, 88%)" vertical={false} />
          <XAxis dataKey="date" tick={axisTick} axisLine={false} tickLine={false} interval={2} angle={-45} textAnchor="end" height={50} />
          <YAxis tick={axisTick} axisLine={false} tickLine={false} label={{ value: "Volume (mL)", angle: -90, position: "insideLeft", style: { fontSize: 11, fill: "hsl(210,20%,50%)" } }} width={55} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend verticalAlign="bottom" iconType="square" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
          <Bar dataKey="alkalinity" name="Alkalinity" fill="hsl(210, 80%, 50%)" stackId="a" />
          <Bar dataKey="calciumMg" name="Calcium-Mg" fill="hsl(145, 65%, 40%)" stackId="a" />
          <Bar dataKey="magnesium" name="Magnesium" fill="hsl(210, 15%, 70%)" stackId="a" />
          <Bar dataKey="nitrate" name="Nitrate" fill="hsl(210, 15%, 55%)" stackId="a" />
          <Bar dataKey="rzPartA" name="RZ Part A" fill="hsl(210, 10%, 60%)" stackId="a" />
          <Bar dataKey="rzPartC" name="RZ Part C" fill="hsl(210, 10%, 45%)" stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default DosingChart;
