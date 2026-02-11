import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { availableElements } from "@/components/trace-dosing/TracDosingData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ElementRow {
  id: string;
  name: string;
  color: string;
  mlPerDay: number;
}

interface Container {
  id: string;
  name: string;
  mlPerDay: number;
  elements: ElementRow[];
}

let nextId = 1;
const uid = () => String(nextId++);

const TraceDosingNew = () => {
  const navigate = useNavigate();
  const [days, setDays] = useState(30);
  const [startDate] = useState("Feb 11, 2026");
  const [containers, setContainers] = useState<Container[]>([
    { id: uid(), name: "Dosing Batch 1", mlPerDay: 24, elements: [] },
  ]);

  const plannedEndDate = useMemo(() => {
    const start = new Date(2026, 1, 11);
    start.setDate(start.getDate() + days);
    return start.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }, [days]);

  const updateContainer = (cid: string, patch: Partial<Container>) => {
    setContainers((prev) => prev.map((c) => (c.id === cid ? { ...c, ...patch } : c)));
  };

  const addElement = (cid: string, elementName: string) => {
    const el = availableElements.find((e) => e.name === elementName);
    if (!el) return;
    setContainers((prev) =>
      prev.map((c) =>
        c.id === cid && !c.elements.find((e) => e.name === elementName)
          ? { ...c, elements: [...c.elements, { id: uid(), name: el.name, color: el.color, mlPerDay: 0.2 }] }
          : c
      )
    );
  };

  const removeElement = (cid: string, eid: string) => {
    setContainers((prev) =>
      prev.map((c) => (c.id === cid ? { ...c, elements: c.elements.filter((e) => e.id !== eid) } : c))
    );
  };

  const updateElementMl = (cid: string, eid: string, ml: number) => {
    setContainers((prev) =>
      prev.map((c) =>
        c.id === cid
          ? { ...c, elements: c.elements.map((e) => (e.id === eid ? { ...e, mlPerDay: ml } : e)) }
          : c
      )
    );
  };

  const addContainer = () => {
    setContainers((prev) => [
      ...prev,
      { id: uid(), name: `Dosing Batch ${prev.length + 1}`, mlPerDay: 24, elements: [] },
    ]);
  };

  const removeContainer = (cid: string) => {
    if (containers.length <= 1) return;
    setContainers((prev) => prev.filter((c) => c.id !== cid));
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar activePage="Dosing" />

      <main className="flex-1 px-4 py-4 pt-18 sm:px-6 lg:ml-56 lg:px-8 lg:py-6 lg:pt-6">
        {/* Back link */}
        <button
          onClick={() => navigate("/trace-dosing")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Batches
        </button>

        <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">Create New Batch</h1>

        {/* Date config */}
        <div className="mt-6 rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Start Date</label>
              <div className="mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground min-w-[140px]">
                {startDate}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Days</label>
              <Input
                type="number"
                value={days}
                onChange={(e) => setDays(Number(e.target.value) || 1)}
                className="mt-1 w-20"
                min={1}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Planned End Date</label>
              <div className="mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground min-w-[140px]">
                {plannedEndDate}
              </div>
            </div>
          </div>
        </div>

        {/* Containers */}
        {containers.map((container) => {
          const usedNames = container.elements.map((e) => e.name);
          const remaining = availableElements.filter((e) => !usedNames.includes(e.name));
          const totalBatchMl = container.elements.reduce(
            (sum, el) => sum + el.mlPerDay * days,
            0
          );
          const roWater = container.mlPerDay * days - totalBatchMl;

          return (
            <div key={container.id} className="mt-6 rounded-xl border border-border bg-card">
              {/* Container header */}
              <div className="flex items-center gap-4 rounded-t-xl bg-secondary/60 px-4 py-3 sm:px-6">
                <span className="font-heading font-semibold text-foreground">{container.name}</span>
                <span className="text-sm text-muted-foreground">ml/day:</span>
                <Input
                  type="number"
                  value={container.mlPerDay}
                  onChange={(e) => updateContainer(container.id, { mlPerDay: Number(e.target.value) || 1 })}
                  className="w-20 h-8"
                  min={1}
                />
                {containers.length > 1 && (
                  <button onClick={() => removeContainer(container.id)} className="ml-auto text-muted-foreground hover:text-destructive">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Elements table */}
              <div className="p-4 sm:p-6">
                {/* Header row */}
                <div className="hidden sm:grid grid-cols-[1fr_1fr_auto_1fr] gap-4 text-xs font-medium text-muted-foreground mb-2 px-1">
                  <span>Element</span>
                  <span>ml/day</span>
                  <span></span>
                  <span className="text-right">Total ml per Batch</span>
                </div>

                {container.elements.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-6">
                    No elements added yet. Use the dropdown below to add elements.
                  </p>
                )}

                {container.elements.map((el) => (
                  <div
                    key={el.id}
                    className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_1fr_auto_1fr] gap-3 sm:gap-4 items-center border-b border-border/50 py-2.5 px-1 last:border-0"
                  >
                    <Badge
                      variant="outline"
                      className="text-[11px] font-bold uppercase w-fit"
                      style={{ borderColor: el.color, color: el.color }}
                    >
                      {el.name}
                    </Badge>
                    <Input
                      type="number"
                      step="0.01"
                      value={el.mlPerDay}
                      onChange={(e) => updateElementMl(container.id, el.id, Number(e.target.value) || 0)}
                      className="w-24 h-8"
                      min={0}
                    />
                    <button
                      onClick={() => removeElement(container.id, el.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                    <span className="hidden sm:block text-right text-sm font-medium tabular-nums text-foreground">
                      {(el.mlPerDay * days).toFixed(1)} ml
                    </span>
                  </div>
                ))}

                {/* RO/DI Water & Total */}
                {container.elements.length > 0 && (
                  <>
                    <div className="flex items-center justify-between py-2 px-1 text-sm">
                      <span className="font-medium text-primary">RO/DI Water</span>
                      <span className="font-medium text-primary tabular-nums">{roWater.toFixed(1)} ml</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-secondary/40 px-3 py-2 text-sm font-bold">
                      <span className="text-foreground">Total Volume</span>
                      <span className="text-foreground tabular-nums">{(container.mlPerDay * days).toFixed(0)} ml</span>
                    </div>
                  </>
                )}

                {/* Add element dropdown */}
                {remaining.length > 0 && (
                  <div className="mt-4">
                    <Select onValueChange={(val) => addElement(container.id, val)}>
                      <SelectTrigger className="w-48 h-8 text-xs">
                        <SelectValue placeholder="+ Add Element" />
                      </SelectTrigger>
                      <SelectContent>
                        {remaining.map((el) => (
                          <SelectItem key={el.name} value={el.name}>
                            {el.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Add container button */}
        <button
          onClick={addContainer}
          className="mt-4 w-full rounded-xl border-2 border-dashed border-primary/30 py-3 text-sm font-medium text-primary hover:border-primary/50 hover:bg-primary/5 transition-colors"
        >
          <Plus className="inline h-4 w-4 mr-1 -mt-0.5" /> Add Another Batch Container
        </button>

        {/* Footer actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-border bg-card p-4">
          <Button variant="ghost" onClick={() => navigate("/trace-dosing")}>
            Discard
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline">Save as Template</Button>
            <Button>Save Batch</Button>
          </div>
        </div>

        <div className="h-8" />
      </main>
    </div>
  );
};

export default TraceDosingNew;
