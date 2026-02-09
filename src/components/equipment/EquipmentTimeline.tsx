import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { EquipmentItem, categoryColors, sections } from "./EquipmentData";
import { format, parseISO, differenceInMonths } from "date-fns";

interface EquipmentTimelineProps {
  items: EquipmentItem[];
}

const EquipmentTimeline = ({ items }: EquipmentTimelineProps) => {
  const { months, startDate, totalMonths, grouped } = useMemo(() => {
    const allDates = items.flatMap((i) =>
      [i.addedDate, i.retiredDate].filter(Boolean).map((d) => parseISO(d!))
    );
    const now = new Date();
    allDates.push(now);
    const earliest = new Date(Math.min(...allDates.map((d) => d.getTime())));
    const start = new Date(earliest.getFullYear(), earliest.getMonth(), 1);
    const total = differenceInMonths(now, start) + 2; // +2 for padding

    const monthLabels: { label: string; date: Date }[] = [];
    for (let i = 0; i < total; i++) {
      const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
      monthLabels.push({ label: format(d, "MMM yy"), date: d });
    }

    const grouped = sections.map((section) => ({
      section,
      items: items.filter((i) => i.section === section),
    }));

    return { months: monthLabels, startDate: start, totalMonths: total, grouped };
  }, [items]);

  const getBarStyle = (item: EquipmentItem) => {
    const addedMonths = differenceInMonths(parseISO(item.addedDate), startDate);
    const endDate = item.retiredDate ? parseISO(item.retiredDate) : new Date();
    const durationMonths = differenceInMonths(endDate, parseISO(item.addedDate)) + 1;

    const left = `${(addedMonths / totalMonths) * 100}%`;
    const width = `${(Math.max(durationMonths, 1) / totalMonths) * 100}%`;
    return { left, width };
  };

  return (
    <div className="space-y-6">
      {grouped
        .filter((g) => g.items.length > 0)
        .map((group) => (
          <div key={group.section}>
            <h3 className="font-heading text-sm font-semibold text-foreground mb-3">
              {group.section}
            </h3>
            <div className="relative overflow-x-auto">
              {/* Month header */}
              <div className="flex border-b border-border/40 mb-1 min-w-[800px]">
                {months.map((m, i) => (
                  <div
                    key={i}
                    className="text-[10px] text-muted-foreground shrink-0"
                    style={{ width: `${100 / totalMonths}%` }}
                  >
                    {i % 3 === 0 ? m.label : ""}
                  </div>
                ))}
              </div>

              {/* Bars */}
              <div className="space-y-1.5 min-w-[800px]">
                {group.items.map((item) => {
                  const style = getBarStyle(item);
                  const primaryCat = item.categories[0];
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
                      <div
                        className={`absolute h-6 rounded-md flex items-center px-2 gap-1.5 text-xs font-medium border ${
                          item.status === "retired" ? "opacity-50" : ""
                        } ${categoryColors[primaryCat] || "bg-primary/15 text-primary border-primary/30"}`}
                        style={{ left: style.left, width: style.width, minWidth: 80 }}
                        title={`${item.name} — ${format(parseISO(item.addedDate), "MMM yyyy")} → ${
                          item.retiredDate
                            ? format(parseISO(item.retiredDate), "MMM yyyy")
                            : "Present"
                        }`}
                      >
                        <span className="truncate">
                          {item.name}
                          {item.quantity > 1 && ` (×${item.quantity})`}
                        </span>
                        {item.status === "retired" && (
                          <Badge
                            variant="outline"
                            className="text-[9px] px-1 py-0 shrink-0 border-destructive/40 text-destructive"
                          >
                            Retired
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default EquipmentTimeline;
