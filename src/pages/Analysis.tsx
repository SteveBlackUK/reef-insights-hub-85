import { useState, useMemo } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DataSeriesPanel from "@/components/analysis/DataSeriesPanel";
import AnalysisCharts from "@/components/analysis/AnalysisCharts";
import EventsTimeline from "@/components/analysis/EventsTimeline";
import { measurementGroups, eventItems } from "@/components/analysis/AnalysisData";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Layers, GitMerge, PenLine, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const timeRanges = ["7D", "30D", "90D", "1Y"] as const;

const Analysis = () => {
  const [mode, setMode] = useState<"stacked" | "combined">("stacked");
  const [timeRange, setTimeRange] = useState<string>("30D");
  const [showTaskCompletions, setShowTaskCompletions] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  // Build initial enabled state from data
  const [enabledSources, setEnabledSources] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    measurementGroups.forEach((g) =>
      g.sources.forEach((s) => {
        initial[s.id] = s.enabled;
      })
    );
    return initial;
  });

  const [enabledEvents, setEnabledEvents] = useState<Record<string, boolean>>({
    "evt-ats": true,
  });

  const toggleSource = (id: string) =>
    setEnabledSources((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleEvent = (id: string) =>
    setEnabledEvents((prev) => ({ ...prev, [id]: !prev[id] }));

  const activeCount = useMemo(
    () => Object.values(enabledSources).filter(Boolean).length,
    [enabledSources]
  );

  const dateLabel = useMemo(() => {
    const end = new Date(2026, 1, 9);
    const days = timeRange === "7D" ? 7 : timeRange === "30D" ? 30 : timeRange === "90D" ? 90 : 365;
    const start = new Date(end);
    start.setDate(start.getDate() - days);
    const fmt = (d: Date) =>
      d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    return `${fmt(start)} – ${fmt(end)}`;
  }, [timeRange]);

  const panelContent = (
    <DataSeriesPanel
      measurements={measurementGroups}
      events={eventItems}
      enabledSources={enabledSources}
      enabledEvents={enabledEvents}
      onToggleSource={toggleSource}
      onToggleEvent={toggleEvent}
    />
  );

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar activePage="Analysis" />

      <main className="lg:ml-56 pt-14 lg:pt-0">
        <div className="flex">
          {/* Desktop data series panel */}
          <aside className="hidden lg:block w-60 min-w-[240px] border-r border-border/50 bg-card/50 p-4 min-h-screen overflow-y-auto">
            {panelContent}
          </aside>

          {/* Main content */}
          <div className="flex-1 p-4 sm:p-6 space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="font-heading text-xl font-bold">Analysis</h1>
                <p className="text-xs text-muted-foreground">Main Display Tank</p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Mobile data series trigger */}
                <Sheet open={panelOpen} onOpenChange={setPanelOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden gap-1.5">
                      <SlidersHorizontal className="h-3.5 w-3.5" />
                      Series
                      {activeCount > 0 && (
                        <span className="ml-1 bg-primary/15 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {activeCount}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-72 p-4 overflow-y-auto">
                    <SheetTitle className="sr-only">Data Series</SheetTitle>
                    {panelContent}
                  </SheetContent>
                </Sheet>

                <PenLine className="h-4 w-4 text-muted-foreground hidden sm:block" />

                {/* View toggle */}
                <div className="flex rounded-lg border border-border/50 overflow-hidden">
                  <Button
                    size="sm"
                    variant={mode === "stacked" ? "default" : "ghost"}
                    className="rounded-none h-8 text-xs gap-1.5 px-3"
                    onClick={() => setMode("stacked")}
                  >
                    <Layers className="h-3 w-3" />
                    Stacked
                  </Button>
                  <Button
                    size="sm"
                    variant={mode === "combined" ? "default" : "ghost"}
                    className="rounded-none h-8 text-xs gap-1.5 px-3"
                    onClick={() => setMode("combined")}
                  >
                    <GitMerge className="h-3 w-3" />
                    Combined
                  </Button>
                </div>
              </div>
            </div>

            {/* Controls row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-1">
                {timeRanges.map((r) => (
                  <Button
                    key={r}
                    size="sm"
                    variant={timeRange === r ? "default" : "ghost"}
                    className="h-7 px-3 text-xs font-semibold"
                    onClick={() => setTimeRange(r)}
                  >
                    {r}
                  </Button>
                ))}
                <span className="text-xs text-muted-foreground ml-2 hidden sm:inline">
                  {dateLabel}
                </span>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={showTaskCompletions}
                  onCheckedChange={(v) => setShowTaskCompletions(!!v)}
                />
                <span className="text-xs text-muted-foreground">Show task completions</span>
              </label>
            </div>

            {/* Charts */}
            <AnalysisCharts
              mode={mode}
              measurements={measurementGroups}
              enabledSources={enabledSources}
              showTaskCompletions={showTaskCompletions}
              enabledEvents={enabledEvents}
              events={eventItems}
            />

            {/* Events timeline */}
            <EventsTimeline events={eventItems} enabledEvents={enabledEvents} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analysis;
