import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ParameterCard from "@/components/dashboard/ParameterCard";
import TasksSection from "@/components/dashboard/TasksSection";
import ChartSection from "@/components/dashboard/ChartSection";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Settings } from "lucide-react";

const parameters = [
  { label: "Temperature", value: "24.8", unit: "°C", status: "ok" as const, sparkline: [24.5, 24.7, 24.9, 24.8, 25.0, 24.7, 24.8], timestamp: "about 22 hours ago" },
  { label: "pH", value: "8.33", unit: "", status: "ok" as const, sparkline: [8.3, 8.35, 8.32, 8.33, 8.31, 8.34, 8.33], timestamp: "about 22 hours ago" },
  { label: "Salinity", value: "33.7", unit: "ppt", status: "warning" as const, sparkline: [34.0, 33.8, 33.5, 33.7, 33.9, 33.6, 33.7], timestamp: "about 22 hours ago" },
  { label: "Alkalinity", value: "8.4", unit: "dKH", status: "ok" as const, sparkline: [8.2, 8.3, 8.5, 8.4, 8.3, 8.4, 8.4], timestamp: "about 12 hours ago" },
  { label: "Calcium", value: "400", unit: "ppm", status: "ok" as const, sparkline: [395, 398, 400, 402, 399, 400, 400], timestamp: "17 days ago" },
  { label: "Magnesium", value: "1550", unit: "ppm", status: "elevated" as const, sparkline: [1500, 1520, 1540, 1550, 1555, 1550, 1550], timestamp: "30 days ago" },
  { label: "Nitrate", value: "8.3", unit: "ppm", status: "ok" as const, sparkline: [8.0, 8.5, 8.2, 8.3, 8.1, 8.4, 8.3], timestamp: "15 days ago" },
  { label: "Phosphate", value: "0.08", unit: "ppm", status: "ok" as const, sparkline: [0.09, 0.08, 0.07, 0.08, 0.09, 0.08, 0.08], timestamp: "15 days ago" },
];

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="ml-56 flex-1 px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-3xl font-bold text-foreground">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="h-9 w-9 text-muted-foreground">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="gap-2 text-sm">
              <RefreshCw className="h-4 w-4" />
              Refresh Data
            </Button>
          </div>
        </div>

        {/* Parameter Cards */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          {parameters.map((p) => (
            <ParameterCard key={p.label} {...p} />
          ))}
        </div>

        {/* Tasks */}
        <div className="mt-6">
          <TasksSection />
        </div>

        {/* Charts */}
        <div className="mt-6">
          <ChartSection />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
