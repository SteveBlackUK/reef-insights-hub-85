import { Parameter, ParameterGroup } from "./ICPTestData";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface ParameterTableProps {
  group: ParameterGroup;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onParameterClick: (param: Parameter) => void;
  showOutOfRange: boolean;
}

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "in-range") return <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />;
  if (status === "low") return <ArrowDown className="h-3.5 w-3.5 text-destructive" />;
  if (status === "high") return <ArrowUp className="h-3.5 w-3.5 text-destructive" />;
  return <ArrowUp className="h-3.5 w-3.5 text-amber-500" />;
};

const VisualBar = ({ param }: { param: Parameter }) => {
  const { value, rangeMin, rangeMax, status } = param;
  const padding = (rangeMax - rangeMin) * 0.15;
  const min = rangeMin - padding;
  const max = rangeMax + padding;
  const clampedValue = Math.max(min, Math.min(max, value));
  const pct = ((clampedValue - min) / (max - min)) * 100;
  const rangeStartPct = ((rangeMin - min) / (max - min)) * 100;
  const rangeWidthPct = ((rangeMax - rangeMin) / (max - min)) * 100;
  const isOut = status === "low" || status === "high";

  return (
    <div className="relative h-6 w-full min-w-[100px]">
      {/* background */}
      <div className="absolute inset-y-1 left-0 right-0 rounded bg-muted/50" />
      {/* range band */}
      <div
        className={cn("absolute inset-y-1 rounded", isOut ? "bg-destructive/15" : "bg-green-100")}
        style={{ left: `${rangeStartPct}%`, width: `${rangeWidthPct}%` }}
      />
      {/* value marker */}
      <div
        className={cn("absolute top-0 h-6 w-0.5 rounded", isOut ? "bg-destructive" : "bg-primary")}
        style={{ left: `${pct}%` }}
      />
      {/* labels */}
      <span className="absolute -bottom-3.5 left-0 text-[10px] text-muted-foreground">{rangeMin}</span>
      <span className="absolute -bottom-3.5 right-0 text-[10px] text-muted-foreground">{rangeMax}</span>
    </div>
  );
};

const ParameterTable = ({ group, selectedIds, onToggleSelect, onParameterClick, showOutOfRange }: ParameterTableProps) => {
  const params = showOutOfRange
    ? group.parameters.filter((p) => p.status !== "in-range")
    : group.parameters;

  if (params.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-heading text-xl font-semibold text-foreground">{group.name}</h2>
        <Badge variant="outline" className="text-xs font-semibold text-primary border-primary/30 uppercase tracking-wider">
          {params.length} parameters
        </Badge>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-border/50 bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 text-muted-foreground">
              <th className="px-3 py-2.5 text-left font-medium w-10">Compare</th>
              <th className="px-1 py-2.5 w-6" />
              <th className="px-3 py-2.5 text-left font-medium">Parameter</th>
              <th className="px-3 py-2.5 text-right font-medium w-20">Value</th>
              <th className="px-3 py-2.5 text-left font-medium w-14">Unit</th>
              <th className="px-3 py-2.5 text-left font-medium">Range</th>
              <th className="px-3 py-2.5 text-left font-medium w-20">Desired</th>
              <th className="px-3 py-2.5 text-left font-medium w-36">Visual</th>
              <th className="px-3 py-2.5 text-left font-medium">Dosing Recommendation</th>
              <th className="px-3 py-2.5 text-center font-medium w-24">Importance</th>
            </tr>
          </thead>
          <tbody>
            {params.map((p) => (
              <tr key={p.id} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-3 py-2.5">
                  <Checkbox
                    checked={selectedIds.includes(p.id)}
                    onCheckedChange={() => onToggleSelect(p.id)}
                  />
                </td>
                <td className="px-1 py-2.5"><StatusIcon status={p.status} /></td>
                <td className="px-3 py-2.5">
                  {p.description ? (
                    <button
                      onClick={() => onParameterClick(p)}
                      className="text-primary hover:underline font-medium text-left"
                    >
                      {p.name} ({p.symbol})
                    </button>
                  ) : (
                    <span className="font-medium">{p.name} ({p.symbol})</span>
                  )}
                </td>
                <td className={cn("px-3 py-2.5 text-right font-semibold tabular-nums",
                  p.status === "in-range" ? "text-primary" : "text-destructive"
                )}>
                  {p.value}
                </td>
                <td className="px-3 py-2.5 text-muted-foreground">{p.unit}</td>
                <td className="px-3 py-2.5 text-muted-foreground">{p.rangeMin} - {p.rangeMax} {p.unit}</td>
                <td className="px-3 py-2.5 text-muted-foreground">{p.desired}</td>
                <td className="px-3 py-2.5 pb-6"><VisualBar param={p} /></td>
                <td className="px-3 py-2.5 text-muted-foreground text-xs">{p.dosingRecommendation || "–"}</td>
                <td className="px-3 py-2.5 text-center text-muted-foreground text-xs">{p.importance || "–"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-2">
        {params.map((p) => (
          <div key={p.id} className="rounded-lg border border-border/50 bg-card p-3">
            <div className="flex items-center gap-2 mb-2">
              <Checkbox
                checked={selectedIds.includes(p.id)}
                onCheckedChange={() => onToggleSelect(p.id)}
              />
              <StatusIcon status={p.status} />
              {p.description ? (
                <button onClick={() => onParameterClick(p)} className="text-primary hover:underline font-medium text-sm">
                  {p.name} ({p.symbol})
                </button>
              ) : (
                <span className="font-medium text-sm">{p.name} ({p.symbol})</span>
              )}
              <span className={cn("ml-auto font-semibold tabular-nums",
                p.status === "in-range" ? "text-primary" : "text-destructive"
              )}>
                {p.value} <span className="text-muted-foreground font-normal text-xs">{p.unit}</span>
              </span>
            </div>
            <div className="text-xs text-muted-foreground mb-2">
              Range: {p.rangeMin}–{p.rangeMax} | Desired: {p.desired}
            </div>
            <VisualBar param={p} />
            {p.dosingRecommendation && (
              <div className="mt-4 text-xs text-muted-foreground">💊 {p.dosingRecommendation}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParameterTable;
