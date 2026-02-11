import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Copy, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { sampleTemplates, sampleBatches } from "@/components/trace-dosing/TracDosingData";

const TraceDosing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar activePage="Dosing" />

      <main className="flex-1 px-4 py-4 pt-18 sm:px-6 lg:ml-56 lg:px-8 lg:py-6 lg:pt-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Trace Dosing Calculator
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Calculate trace element volumes for batch preparation
            </p>
          </div>
          <Button
            className="gap-2"
            onClick={() => navigate("/trace-dosing/new")}
          >
            <Plus className="h-4 w-4" /> New Batch
          </Button>
        </div>

        {/* Templates */}
        <div className="mt-6 rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-semibold text-foreground">Your Templates</h2>
            <span className="text-xs text-muted-foreground">Click to reuse</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sampleTemplates.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => navigate("/trace-dosing/new?template=" + tpl.id)}
                className="relative rounded-lg border border-border bg-background p-4 text-left transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <div className="absolute top-3 right-3">
                  <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                </div>
                <p className="font-heading font-semibold text-foreground">{tpl.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {tpl.containers} containers | {tpl.elements} elements | {tpl.days} days | {tpl.mlPerDay} ml/day
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {tpl.elementNames.slice(0, 3).map((el) => (
                    <Badge key={el} variant="outline" className="text-[10px] font-bold uppercase border-primary/30 text-primary">
                      {el}
                    </Badge>
                  ))}
                  {tpl.elementNames.length > 3 && (
                    <Badge variant="secondary" className="text-[10px]">
                      +{tpl.elementNames.length - 3}
                    </Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Batch History */}
        <div className="mt-6 rounded-xl border border-border bg-card p-4 sm:p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Batch History</h2>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-2 font-medium">Batch Name</th>
                  <th className="pb-2 font-medium">Start Date</th>
                  <th className="pb-2 font-medium">End Date</th>
                  <th className="pb-2 font-medium">Containers</th>
                  <th className="pb-2 font-medium">Elements</th>
                  <th className="pb-2 font-medium text-right">Volume</th>
                  <th className="pb-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sampleBatches.map((batch) => (
                  <tr key={batch.id} className="border-b border-border/50 last:border-0">
                    <td className="py-3 font-medium text-foreground">{batch.name}</td>
                    <td className="py-3 text-muted-foreground">{batch.startDate}</td>
                    <td className="py-3 text-muted-foreground">{batch.endDate}</td>
                    <td className="py-3 text-muted-foreground">{batch.containers}</td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-1">
                        {batch.elements.slice(0, 3).map((el) => (
                          <Badge key={el.id} variant="outline" className="text-[10px] font-bold uppercase border-primary/30 text-primary">
                            {el.name}
                          </Badge>
                        ))}
                        {batch.elements.length > 3 && (
                          <Badge variant="secondary" className="text-[10px]">
                            +{batch.elements.length - 3}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 text-right font-medium tabular-nums text-foreground">{batch.totalVolume} ml</td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden space-y-3">
            {sampleBatches.map((batch) => (
              <div key={batch.id} className="rounded-lg border border-border bg-background p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">{batch.name}</p>
                  <p className="text-sm font-medium tabular-nums text-foreground">{batch.totalVolume} ml</p>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {batch.startDate} – {batch.endDate} · {batch.containers} containers
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {batch.elements.slice(0, 3).map((el) => (
                    <Badge key={el.id} variant="outline" className="text-[10px] font-bold uppercase border-primary/30 text-primary">
                      {el.name}
                    </Badge>
                  ))}
                  {batch.elements.length > 3 && (
                    <Badge variant="secondary" className="text-[10px]">
                      +{batch.elements.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TraceDosing;
