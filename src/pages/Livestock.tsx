import { useState, useMemo } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import LivestockTable from "@/components/livestock/LivestockTable";
import LivestockCards from "@/components/livestock/LivestockCards";
import LivestockTimeline from "@/components/livestock/LivestockTimeline";
import LivestockDialog from "@/components/livestock/LivestockDialog";
import { mockLivestock, LivestockItem } from "@/components/livestock/LivestockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Fish, LayoutList, GanttChart } from "lucide-react";

const Livestock = () => {
  const [items, setItems] = useState<LivestockItem[]>(mockLivestock);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "timeline">("list");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<LivestockItem | null>(null);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      if (search && !item.commonName.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [items, statusFilter, search]);

  const aliveCount = items.filter((i) => i.status === "Alive").reduce((s, i) => s + i.quantity, 0);

  const handleSave = (data: Partial<LivestockItem>) => {
    if (data.id) {
      setItems((prev) => prev.map((i) => (i.id === data.id ? { ...i, ...data } as LivestockItem : i)));
    } else {
      const newItem: LivestockItem = {
        ...data,
        id: Date.now().toString(),
        tags: data.category ? [data.category.toUpperCase()] : [],
      } as LivestockItem;
      setItems((prev) => [newItem, ...prev]);
    }
    setEditItem(null);
  };

  const handleEdit = (item: LivestockItem) => {
    setEditItem(item);
    setDialogOpen(true);
  };

  const handleDelete = (item: LivestockItem) => {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  const handleMarkDeceased = (item: LivestockItem) => {
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, status: "Deceased" as const } : i)));
  };

  const handleAdd = () => {
    setEditItem(null);
    setDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar activePage="Livestock" />

      <main className="flex-1 px-4 py-4 pt-18 sm:px-6 lg:ml-56 lg:px-8 lg:py-6 lg:pt-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Fish className="h-6 w-6 text-muted-foreground" />
              <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">Livestock</h1>
              <span className="text-muted-foreground text-sm">(current stocking: {aliveCount} fish)</span>
            </div>
          </div>
          <Button onClick={handleAdd} className="shrink-0">
            <Plus className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Add Livestock</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>

        {/* Filters + View toggle */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40 bg-card">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Alive">Alive</SelectItem>
              <SelectItem value="Deceased">Deceased</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="pl-9 bg-card"
            />
          </div>
          {/* View toggle */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1 shrink-0">
            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="sm"
              className="h-7 px-2.5 gap-1.5 text-xs"
              onClick={() => setView("list")}
            >
              <LayoutList className="h-3.5 w-3.5" />
              List
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
        <div className="mt-5">
          {view === "list" ? (
            <>
              <LivestockTable
                items={filtered}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onMarkDeceased={handleMarkDeceased}
              />
              <LivestockCards items={filtered} onSelect={handleEdit} />
            </>
          ) : (
            <LivestockTimeline items={filtered} onSelect={handleEdit} />
          )}
        </div>

        {/* Dialog */}
        <LivestockDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          item={editItem}
          onSave={handleSave}
        />
      </main>
    </div>
  );
};

export default Livestock;
