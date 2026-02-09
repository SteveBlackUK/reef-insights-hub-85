import { useState } from "react";
import { Parameter, elementHistoryData } from "./ICPTestData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Table2, BarChart3, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceArea,
} from "recharts";

interface ElementHistoryProps {
  selectedParams: Parameter[];
  onClose: () => void;
}

type ViewMode = "charts" | "table";

const ElementHistory = ({ selectedParams, onClose }: ElementHistoryProps) => {
  const [view, setView] = useState<ViewMode>("charts");

  if (selectedParams.length === 0) return null;

  const dates = elementHistoryData.calcium?.map((e) => e.date) ?? [];

  return (
    <div className="mt-6 rounded-lg border border-border/50 bg-card p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-heading text-lg font-semibold">Element History</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground ml-1">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-semibold text-primary border-primary/30 uppercase">
            {selectedParams.length} elements selected
          </Badge>
          <div className="flex rounded-md border border-border/50 overflow-hidden">
            <Button
              size="sm"
              variant={view === "table" ? "default" : "ghost"}
              className="rounded-none h-7 text-xs gap-1 px-2"
              onClick={() => setView("table")}
            >
              <Table2 className="h-3 w-3" /> Table
            </Button>
            <Button
              size="sm"
              variant={view === "charts" ? "default" : "ghost"}
              className="rounded-none h-7 text-xs gap-1 px-2"
              onClick={() => setView("charts")}
            >
              <BarChart3 className="h-3 w-3" /> Charts
            </Button>
          </div>
        </div>
      </div>

      {view === "charts" ? (
        <ChartsView params={selectedParams} />
      ) : (
        <TableView params={selectedParams} dates={dates} />
      )}
    </div>
  );
};

const ChartsView = ({ params }: { params: Parameter[] }) => (
  <div className="space-y-4">
    {params.map((p) => {
      const history = elementHistoryData[p.id];
      if (!history) return null;
      return (
        <div key={p.id} className="rounded-lg border border-border/50 p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="font-heading font-semibold text-sm">{p.name}</span>
              <span className="text-muted-foreground text-xs ml-2">{p.unit}</span>
            </div>
            <Maximize2 className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={history} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <ReferenceArea
                y1={p.rangeMin}
                y2={p.rangeMax}
                fill="hsl(145, 60%, 90%)"
                fillOpacity={0.6}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                domain={["auto", "auto"]}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(210, 80%, 55%)"
                strokeWidth={2}
                dot={{ r: 4, fill: "hsl(210, 80%, 55%)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    })}
  </div>
);

const TableView = ({ params, dates }: { params: Parameter[]; dates: string[] }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border/50 text-muted-foreground">
          <th className="text-left px-3 py-2 font-medium">Element</th>
          <th className="text-left px-3 py-2 font-medium w-24">Trend</th>
          {dates.map((d) => {
            const parts = d.split(", ");
            return (
              <th key={d} className="text-center px-3 py-2 font-medium">
                <div>{parts[0]?.replace(",", "")}</div>
                <div className="text-[10px] font-normal">{parts[1] || ""}</div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {params.map((p) => {
          const history = elementHistoryData[p.id];
          if (!history) return null;
          return (
            <tr key={p.id} className="border-b border-border/30 last:border-0">
              <td className="px-3 py-3">
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.unit}</div>
              </td>
              <td className="px-3 py-3">
                {/* Mini sparkline */}
                <svg width="60" height="20" viewBox="0 0 60 20" className="text-blue-500">
                  <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    points={history
                      .map((h, i) => {
                        const min = Math.min(...history.map((x) => x.value));
                        const max = Math.max(...history.map((x) => x.value));
                        const range = max - min || 1;
                        const x = (i / (history.length - 1)) * 56 + 2;
                        const y = 18 - ((h.value - min) / range) * 16;
                        return `${x},${y}`;
                      })
                      .join(" ")}
                  />
                </svg>
              </td>
              {history.map((h, i) => {
                const isOut = h.value < p.rangeMin || h.value > p.rangeMax;
                return (
                  <td
                    key={i}
                    className={cn(
                      "text-center px-3 py-3 tabular-nums font-medium",
                      isOut ? "text-destructive bg-destructive/5" : ""
                    )}
                  >
                    {h.value}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default ElementHistory;
