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
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-foreground">Tasks</h3>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="gap-1.5 text-xs">
            <Plus className="h-3.5 w-3.5" />
            Create Task
          </Button>
          <Button size="sm" variant="ghost" className="text-xs text-primary">
            View All
          </Button>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        {tasks.map((task) => (
          <div
            key={task.name}
            className="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{task.name}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${task.categoryColor}`}>
                    {task.category}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">⏱ {task.date}</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="gap-1 text-xs text-primary border-primary/30 hover:bg-primary/10">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Done
            </Button>
          </div>
        ))}
      </div>

      <button className="mt-3 w-full text-center text-sm font-medium text-primary hover:underline">
        +3 more tasks
      </button>
    </div>
  );
};

export default TasksSection;
