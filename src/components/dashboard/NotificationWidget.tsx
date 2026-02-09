import { useState } from "react";
import { Bell, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface DueTask {
  id: string;
  name: string;
  overdueDays: number;
  completed: boolean;
}

const initialTasks: DueTask[] = [
  { id: "1", name: "Nitrate", overdueDays: 1, completed: false },
  { id: "2", name: "Phosphate", overdueDays: 0, completed: false },
];

const NotificationWidget = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const navigate = useNavigate();
  const overdue = tasks.filter((t) => t.overdueDays > 0 && !t.completed);

  const toggle = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="relative h-9 w-9 text-muted-foreground">
          <Bell className="h-4 w-4" />
          {overdue.length > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              {overdue.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="end">
        <div className="border-b border-border px-4 py-3 flex items-center justify-between">
          <h4 className="font-heading font-semibold text-sm">Due Tasks</h4>
          {overdue.length > 0 && (
            <Badge variant="destructive" className="text-[10px] uppercase font-bold px-1.5 py-0.5">
              {overdue.length} Overdue
            </Badge>
          )}
        </div>
        <div className="divide-y divide-border">
          {tasks.map((t) => (
            <div key={t.id} className="flex items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.overdueDays > 0 ? `${t.overdueDays} day${t.overdueDays > 1 ? "s" : ""} overdue` : "Due today"}
                </p>
              </div>
              <button onClick={() => toggle(t.id)} className="text-muted-foreground hover:text-primary">
                <CheckCircle2 className={`h-5 w-5 ${t.completed ? "text-primary fill-primary/20" : ""}`} />
              </button>
            </div>
          ))}
        </div>
        <div className="border-t border-border px-4 py-2.5 text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm font-medium text-primary hover:underline"
          >
            View All Tasks
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationWidget;
