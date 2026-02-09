import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Plus } from "lucide-react";

interface Task {
  name: string;
  category: string;
  categoryColor: string;
  date: string;
}

const tasks: Task[] = [
  { name: "Dose No3", category: "DOSING", categoryColor: "bg-coral/15 text-coral", date: "Feb 9" },
  { name: "test rolling carbon", category: "MEDIA CHANGE", categoryColor: "bg-primary/15 text-primary", date: "Feb 11" },
  { name: "Clean ATS", category: "CLEANING", categoryColor: "bg-teal-glow/15 text-teal-glow", date: "Feb 13" },
];

const TasksSection = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-3 sm:p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground">Tasks</h3>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button size="sm" variant="outline" className="gap-1 sm:gap-1.5 text-xs h-7 sm:h-8 px-2 sm:px-3">
            <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span className="hidden sm:inline">Create Task</span>
            <span className="sm:hidden">New</span>
          </Button>
          <Button size="sm" variant="ghost" className="text-xs text-primary h-7 sm:h-8 px-2 sm:px-3">
            View All
          </Button>
        </div>
      </div>

      <div className="mt-3 sm:mt-4 space-y-0.5">
        {tasks.map((task) => (
          <div
            key={task.name}
            className="flex items-center justify-between gap-2 rounded-lg px-2 sm:px-3 py-2 sm:py-2.5 transition-colors hover:bg-muted/50"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-medium text-foreground truncate">{task.name}</span>
                <span className={`shrink-0 rounded-full px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide ${task.categoryColor}`}>
                  {task.category}
                </span>
              </div>
              <p className="mt-0.5 text-[11px] sm:text-xs text-muted-foreground">⏱ {task.date}</p>
            </div>
            <Button size="sm" variant="outline" className="shrink-0 gap-1 text-[11px] sm:text-xs text-primary border-primary/30 hover:bg-primary/10 h-7 sm:h-8 px-2 sm:px-3">
              <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              Done
            </Button>
          </div>
        ))}
      </div>

      <button className="mt-2 sm:mt-3 w-full text-center text-xs sm:text-sm font-medium text-primary hover:underline">
        +3 more tasks
      </button>
    </div>
  );
};

export default TasksSection;
