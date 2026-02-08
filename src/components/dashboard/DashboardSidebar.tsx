import { Home, PenLine, ListTodo, Cog, Droplets, Pipette, Wrench, Fish, BarChart3, FlaskConical, Container, Cpu, Settings, Users, Waves } from "lucide-react";
import logo from "@/assets/logo-bubbles-final.png";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: PenLine, label: "Data Editor" },
  { icon: ListTodo, label: "Tasks" },
  { icon: Cog, label: "Equipment" },
  { icon: Droplets, label: "Dosing" },
  { icon: Wrench, label: "Maintenance" },
  { icon: Fish, label: "Livestock" },
  { icon: BarChart3, label: "Analysis" },
  { icon: FlaskConical, label: "ICP Tests" },
  { icon: Container, label: "Tanks" },
  { icon: Cpu, label: "Devices" },
];

const bottomItems = [
  { icon: Settings, label: "Settings" },
  { icon: Users, label: "Admin: Users" },
];

const DashboardSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-56 flex-col border-r border-border/50 bg-secondary">
      {/* Logo */}
      <div className="flex items-center gap-0.5 px-5 py-4">
        <img src={logo} alt="Reef Data Hub" className="h-7 w-7 -mr-0.5" />
        <span className="font-heading text-base font-bold text-secondary-foreground">Reef Data Hub</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 px-3 py-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              item.active
                ? "bg-primary/15 text-primary"
                : "text-secondary-foreground/60 hover:bg-primary/5 hover:text-secondary-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="border-t border-border/30 px-3 py-3 space-y-0.5">
        {bottomItems.map((item) => (
          <button
            key={item.label}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-secondary-foreground/60 transition-colors hover:bg-primary/5 hover:text-secondary-foreground"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
