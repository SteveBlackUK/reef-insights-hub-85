import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, ArrowUp } from "lucide-react";

type Status = "ok" | "warning" | "elevated";

interface ParameterCardProps {
  label: string;
  value: string;
  unit: string;
  status: Status;
  sparkline: number[];
  timestamp: string;
}

const statusConfig: Record<Status, { border: string; icon: React.ReactNode; valueColor: string }> = {
  ok: {
    border: "border-primary/30 hover:border-primary/60",
    icon: <CheckCircle2 className="h-4 w-4 text-primary" />,
    valueColor: "text-foreground",
  },
  warning: {
    border: "border-coral/40 hover:border-coral/70",
    icon: <AlertTriangle className="h-4 w-4 text-coral" />,
    valueColor: "text-coral",
  },
  elevated: {
    border: "border-coral/30 hover:border-coral/50",
    icon: <ArrowUp className="h-4 w-4 text-coral" />,
    valueColor: "text-coral",
  },
};

const MiniSparkline = ({ data, status }: { data: number[]; status: Status }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const h = 28;
  const w = 100;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(" ");

  const strokeColor = status === "ok" ? "hsl(var(--primary))" : "hsl(var(--coral))";

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-7 w-full" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ParameterCard = ({ label, value, unit, status, sparkline, timestamp }: ParameterCardProps) => {
  const config = statusConfig[status];

  return (
    <div
      className={cn(
        "rounded-xl border bg-card transition-all duration-200",
        "p-2.5 sm:p-4",
        config.border
      )}
    >
      {/* Mobile: single row with label left, value right */}
      <div className="flex items-center justify-between sm:hidden">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <div className="flex items-baseline gap-1">
          <span className={cn("font-heading text-base font-bold", config.valueColor)}>{value}</span>
          <span className="text-[10px] text-muted-foreground">{unit}</span>
        </div>
      </div>
      <div className="mt-1.5 sm:hidden">
        <MiniSparkline data={sparkline} status={status} />
      </div>

      {/* Desktop: original layout */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          {config.icon}
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className={cn("font-heading text-2xl font-bold", config.valueColor)}>{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        <div className="mt-3">
          <MiniSparkline data={sparkline} status={status} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground/60">{timestamp}</p>
      </div>
    </div>
  );
};

export default ParameterCard;
