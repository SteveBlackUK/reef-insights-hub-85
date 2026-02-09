import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { dosingEvents } from "./DosingData";

const DosingEventsTable = () => (
  <div className="rounded-xl border border-border bg-card p-3 sm:p-5">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground">Recent Events</h3>
      <span className="text-xs text-muted-foreground">{dosingEvents.length} total events</span>
    </div>

    {/* Mobile card layout */}
    <div className="space-y-2 sm:hidden">
      {dosingEvents.map((e) => (
        <div key={e.id} className="flex items-center gap-3 rounded-lg border border-border/50 px-3 py-2.5">
          <Badge variant="outline" className="text-[10px] font-bold px-1.5 py-0.5 border-0 shrink-0 whitespace-nowrap" style={{ backgroundColor: e.pumpColor, color: "white" }}>
            {e.pump}
          </Badge>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-medium text-foreground truncate">
                {e.chemical}{e.chemicalSub ? ` (${e.chemicalSub})` : ""}
              </span>
              <span className="text-sm font-bold text-foreground tabular-nums shrink-0">{e.volume.toFixed(1)} mL</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{e.timestamp}</p>
          </div>
          {e.pump === "MANUAL" && (
            <div className="flex items-center gap-0.5 shrink-0">
              <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground"><Pencil className="h-3.5 w-3.5" /></Button>
              <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive/70"><Trash2 className="h-3.5 w-3.5" /></Button>
            </div>
          )}
        </div>
      ))}
    </div>

    {/* Desktop table layout */}
    <div className="overflow-x-auto -mx-3 sm:-mx-5 hidden sm:block">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="px-5 py-2 text-xs font-semibold text-foreground">Timestamp</th>
            <th className="px-5 py-2 text-xs font-semibold text-foreground">Chemical</th>
            <th className="px-5 py-2 text-xs font-semibold text-foreground text-right">Volume (mL)</th>
            <th className="px-5 py-2 text-xs font-semibold text-foreground text-right">Remaining (mL)</th>
            <th className="px-5 py-2 text-xs font-semibold text-foreground hidden md:table-cell">Notes</th>
          </tr>
        </thead>
        <tbody>
          {dosingEvents.map((e) => (
            <tr key={e.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              <td className="px-5 py-2.5 text-muted-foreground whitespace-nowrap">{e.timestamp}</td>
              <td className="px-5 py-2.5">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] font-bold px-1.5 py-0 border-0" style={{ backgroundColor: e.pumpColor, color: "white" }}>
                    {e.pump}
                  </Badge>
                  <div>
                    <span className="text-foreground">{e.chemical}</span>
                    {e.chemicalSub && <span className="block text-xs text-muted-foreground">{e.chemicalSub}</span>}
                  </div>
                </div>
              </td>
              <td className="px-5 py-2.5 text-right text-foreground tabular-nums">{e.volume.toFixed(1)}</td>
              <td className="px-5 py-2.5 text-right text-muted-foreground tabular-nums">{e.remaining ?? "—"}</td>
              <td className="px-5 py-2.5 hidden md:table-cell">
                {e.pump === "MANUAL" ? (
                  <div className="flex items-center gap-1">
                    <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground"><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive/70"><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default DosingEventsTable;
