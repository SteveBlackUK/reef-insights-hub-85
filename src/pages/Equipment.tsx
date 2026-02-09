import { useState, useMemo } from "react";
import { Plus, LayoutGrid, GanttChart } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import EquipmentGrid from "@/components/equipment/EquipmentGrid";
import EquipmentTimeline from "@/components/equipment/EquipmentTimeline";
import { equipmentData, EquipmentStatus } from "@/components/equipment/EquipmentData";

type StatusFilter = "active" | "retired" | "all";

const Equipment = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("active");
  const [view, setView] = useState<"grid" | "timeline">("grid");

  const filtered = useMemo(() => {
    if (statusFilter === "all") return equipmentData;
    return equipmentData.filter((e) => e.status === statusFilter);
  }, [statusFilter]);

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar activePage="Equipment" />

      <main className="lg:pl-56 pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between gap-4">
            <h1 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
              Equipment
            </h1>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Equipment</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>

          {/* Sub-navigation: Status filter + View toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Status tabs */}
            <Tabs
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as StatusFilter)}
              className="w-full sm:w-auto"
            >
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="active" className="flex-1 sm:flex-initial text-xs sm:text-sm">
                  Active
                </TabsTrigger>
                <TabsTrigger value="retired" className="flex-1 sm:flex-initial text-xs sm:text-sm">
                  Retired
                </TabsTrigger>
                <TabsTrigger value="all" className="flex-1 sm:flex-initial text-xs sm:text-sm">
                  All
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* View toggle */}
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <Button
                variant={view === "grid" ? "default" : "ghost"}
                size="sm"
                className="h-7 px-2.5 gap-1.5 text-xs"
                onClick={() => setView("grid")}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                Grid
              </Button>
              <Button
                variant={view === "timeline" ? "default" : "ghost"}
                size="sm"
                className="h-7 px-2.5 gap-1.5 text-xs"
                onClick={() => setView("timeline")}
              >
                <GanttChart className="h-3.5 w-3.5" />
                Timeline
              </Button>
            </div>
          </div>

          {/* Content */}
          {view === "grid" ? (
            <EquipmentGrid items={filtered} />
          ) : (
            <EquipmentTimeline items={filtered} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Equipment;
