import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DosingChart from "@/components/dosing/DosingChart";
import DosingEventsTable from "@/components/dosing/DosingEventsTable";
import LogDataDialog from "@/components/dosing/LogDataDialog";
import { dosingSummary } from "@/components/dosing/DosingData";
import { Button } from "@/components/ui/button";
import { Calendar, ClipboardList, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Tab = "events" | "schedules";

const Dosing = () => {
  const [tab, setTab] = useState<Tab>("events");

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar activePage="Dosing" />

      <main className="flex-1 px-4 py-4 pt-18 sm:px-6 lg:ml-56 lg:px-8 lg:py-6 lg:pt-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">Dosing</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="gap-2 text-sm">
              <ClipboardList className="h-4 w-4" /> Create Dosing Schedule
            </Button>
            <LogDataDialog />
            <Button variant="outline" className="gap-2 text-sm">
              <FlaskConical className="h-4 w-4" /> Trace Dosing Batches
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex items-center gap-4 border-b border-border">
          <button
            onClick={() => setTab("events")}
            className={cn(
              "pb-2 text-sm font-medium transition-colors border-b-2",
              tab === "events" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Events
          </button>
          <button
            onClick={() => setTab("schedules")}
            className={cn(
              "pb-2 text-sm font-medium transition-colors border-b-2 flex items-center gap-1.5",
              tab === "schedules" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Schedules
            <span className="rounded-full bg-primary/15 text-primary text-[10px] font-bold px-1.5 py-0.5">1</span>
          </button>
        </div>

        {tab === "events" && (
          <div className="mt-6 space-y-4">
            {/* Date range */}
            <div className="rounded-xl border border-border bg-card px-3 sm:px-5 py-3">
              <p className="text-xs font-medium text-muted-foreground">Date Range</p>
              <div className="mt-1 inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs sm:text-sm text-foreground">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                Jan 10, 2026 – Feb 09, 2026
              </div>
            </div>

            {/* Last 24h summary cards */}
            <div className="rounded-xl border border-border bg-card p-3 sm:p-5">
              <h3 className="font-heading text-base font-semibold text-foreground mb-3">Last 24 Hours</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {dosingSummary.map((d) => (
                  <div
                    key={d.chemical}
                    className={cn(
                      "rounded-lg border border-border p-3 text-center",
                      d.isManual ? "bg-accent/5" : "bg-primary/5"
                    )}
                  >
                    {d.isManual && <span className="text-[10px] font-medium text-muted-foreground">Manual</span>}
                    <p className="text-sm font-medium text-foreground">{d.chemical}</p>
                    <p className="text-lg font-bold text-foreground tabular-nums">{d.volume.toFixed(1)} mL</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart */}
            <DosingChart />

            {/* Events table */}
            <DosingEventsTable />
          </div>
        )}

        {tab === "schedules" && (
          <div className="mt-6 rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
            <p className="text-sm">Schedules view coming soon</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dosing;
