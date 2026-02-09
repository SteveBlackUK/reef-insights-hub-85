import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { LivestockItem } from "./LivestockData";
import { format, parseISO, differenceInMonths } from "date-fns";

interface Props {
  items: LivestockItem[];
  onSelect: (item: LivestockItem) => void;
}

const categoryColors: Record<string, string> = {
  Blennies: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Gobies: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Anthias: "bg-pink-500/15 text-pink-400 border-pink-500/30",
  Hawkfish: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Tangs: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Wrasse: "bg-purple-500/15 text-purple-400 border-purple-500/30",
};

const LivestockTimeline = ({ items, onSelect }: Props) => {
  const { months, startDate, totalMonths, sortedItems } = useMemo(() => {
    const allDates = items.map((i) => parseISO(i.acquisitionDate));
    const now = new Date();
    allDates.push(now);
    const earliest = new Date(Math.min(...allDates.map((d) => d.getTime())));
    const start = new Date(earliest.getFullYear(), earliest.getMonth(), 1);
    const total = differenceInMonths(now, start) + 2;

    const monthLabels: { label: string; date: Date }[] = [];
    for (let i = 0; i < total; i++) {
      const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
      monthLabels.push({ label: format(d, "MMM yy"), date: d });
    }

    // Sort by acquisition date (earliest first)
    const sortedItems = [...items].sort((a, b) => a.acquisitionDate.localeCompare(b.acquisitionDate));

    return { months: monthLabels, startDate: start, totalMonths: total, sortedItems };
  }, [items]);

  const getBarStyle = (item: LivestockItem) => {
    const addedMonths = differenceInMonths(parseISO(item.acquisitionDate), startDate);
    const now = new Date();
    const durationMonths = differenceInMonths(now, parseISO(item.acquisitionDate)) + 1;

    const left = `${(addedMonths / totalMonths) * 100}%`;
    const width = `${(Math.max(durationMonths, 1) / totalMonths) * 100}%`;
    return { left, width };
  };

  return (
    <div className="relative overflow-x-auto">
      {/* Month header */}
      <div className="flex border-b border-border/40 mb-1 min-w-[800px]">
        {months.map((m, i) => (
          <div
            key={i}
            className="text-[10px] text-muted-foreground shrink-0"
            style={{ width: `${100 / totalMonths}%` }}
          >
            {i % 2 === 0 ? m.label : ""}
          </div>
        ))}
      </div>

      {/* Bars */}
      <div className="space-y-1.5 min-w-[800px]">
        {sortedItems.map((item) => {
          const style = getBarStyle(item);
          const colors = categoryColors[item.category] || "bg-primary/15 text-primary border-primary/30";
          return (
            <div key={item.id} className="relative h-8 flex items-center">
              {/* Grid lines */}
              <div className="absolute inset-0 flex pointer-events-none">
                {months.map((_, i) => (
                  <div
                    key={i}
                    className="border-l border-border/20 h-full shrink-0"
                    style={{ width: `${100 / totalMonths}%` }}
                  />
                ))}
              </div>
              {/* Bar */}
              <button
                onClick={() => onSelect(item)}
                className={`absolute h-6 rounded-md flex items-center px-2 gap-1.5 text-xs font-medium border cursor-pointer hover:brightness-110 transition ${
                  item.status === "Deceased" ? "opacity-50" : ""
                } ${colors}`}
                style={{ left: style.left, width: style.width, minWidth: 80 }}
                title={`${item.commonName} — ${format(parseISO(item.acquisitionDate), "MMM yyyy")} → ${
                  item.status === "Deceased" ? "Deceased" : "Present"
                }`}
              >
                <span className="truncate">
                  {item.commonName}
                  {item.quantity > 1 && ` (×${item.quantity})`}
                </span>
                {item.status === "Deceased" && (
                  <Badge
                    variant="outline"
                    className="text-[9px] px-1 py-0 shrink-0 border-destructive/40 text-destructive"
                  >
                    Deceased
                  </Badge>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LivestockTimeline;
