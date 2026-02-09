import { Home, PenLine, ListTodo, Cog, Droplets, Wrench, Fish, BarChart3, FlaskConical, Container, Cpu, Settings, Users, Menu, X } from "lucide-react";
import logo from "@/assets/logo-bubbles-final.png";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: PenLine, label: "Data Editor" },
  { icon: ListTodo, label: "Tasks" },
  { icon: Cog, label: "Equipment" },
  { icon: Droplets, label: "Dosing" },
  { icon: Wrench, label: "Maintenance" },
  { icon: Fish, label: "Livestock", path: "/livestock" },
  { icon: BarChart3, label: "Analysis" },
  { icon: FlaskConical, label: "ICP Tests" },
  { icon: Container, label: "Tanks" },
  { icon: Cpu, label: "Devices" },
];

const bottomItems = [
  { icon: Settings, label: "Settings" },
  { icon: Users, label: "Admin: Users" },
];

interface SidebarContentProps {
  activePage: string;
  onNavigate: (path: string) => void;
}

const SidebarContent = ({ activePage, onNavigate }: SidebarContentProps) => (
  <>
    <div className="flex items-center gap-0.5 px-5 py-4">
      <img src={logo} alt="Reef Data Hub" className="h-7 w-7 -mr-0.5" />
      <span className="font-heading text-base font-bold text-secondary-foreground">Reef Data Hub</span>
    </div>
    <nav className="flex-1 space-y-0.5 px-3 py-2">
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => item.path && onNavigate(item.path)}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            item.label === activePage
              ? "bg-primary/15 text-primary"
              : "text-secondary-foreground/60 hover:bg-primary/5 hover:text-secondary-foreground"
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </button>
      ))}
    </nav>
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
  </>
);

interface DashboardSidebarProps {
  activePage?: string;
}

const DashboardSidebar = ({ activePage = "Home" }: DashboardSidebarProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      {/* Mobile trigger */}
      <div className="fixed left-0 top-0 z-40 flex h-14 w-full items-center border-b border-border/50 bg-secondary px-4 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="text-secondary-foreground">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-56 bg-secondary p-0 border-r border-border/50">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex h-full flex-col">
              <SidebarContent activePage={activePage} onNavigate={handleNavigate} />
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-0.5 ml-2">
          <img src={logo} alt="Reef Data Hub" className="h-6 w-6 -mr-0.5" />
          <span className="font-heading text-sm font-bold text-secondary-foreground">Reef Data Hub</span>
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-56 flex-col border-r border-border/50 bg-secondary lg:flex">
        <SidebarContent activePage={activePage} onNavigate={handleNavigate} />
      </aside>
    </>
  );
};

export default DashboardSidebar;
