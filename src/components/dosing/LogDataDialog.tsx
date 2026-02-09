import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Check, FlaskConical, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

const waterTestParams = ["Alk", "Ammonium", "Ca", "Copper", "Mg", "Nitrite", "NO₃", "pH", "PO₄", "Sal"];
const chemicals = ["Alkalinity", "Calcium-Mg", "RZ Part A", "RZ Part C", "Nitrate", "Magnesium"];
const testers = ["Hanna", "Salifert", "Red Sea", "API", "Trident", "Other"];
const brands = ["Red Sea", "Brightwell", "ESV", "Fauna Marin", "Tropic Marin", "DIY"];

type Tab = "water" | "dosing";

const LogDataDialog = () => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("water");
  const [selectedParams, setSelectedParams] = useState<string[]>([]);
  const [paramValues, setParamValues] = useState<Record<string, string>>({});

  const toggleParam = (p: string) => {
    setSelectedParams((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const now = new Date();
  const defaultDateTime = `${now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} ${now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Log Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-heading">
            {tab === "water" ? <FlaskConical className="h-5 w-5" /> : <Droplets className="h-5 w-5" />}
            Log Data
          </DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <div className="grid grid-cols-2 rounded-lg border border-border bg-muted/50 p-0.5">
          <button
            onClick={() => setTab("water")}
            className={cn(
              "rounded-md py-2 text-sm font-medium transition-colors",
              tab === "water" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Water Test
          </button>
          <button
            onClick={() => setTab("dosing")}
            className={cn(
              "rounded-md py-2 text-sm font-medium transition-colors",
              tab === "dosing" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Dosing
          </button>
        </div>

        {tab === "water" ? (
          <div className="space-y-4">
            {/* Parameter chips */}
            <div className="flex flex-wrap gap-2">
              {waterTestParams.map((p) => (
                <Badge
                  key={p}
                  variant={selectedParams.includes(p) ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer select-none px-3 py-1 text-xs font-medium transition-colors",
                    selectedParams.includes(p) ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  )}
                  onClick={() => toggleParam(p)}
                >
                  {p}
                </Badge>
              ))}
            </div>

            {/* Dynamic value inputs for selected params */}
            {selectedParams.length > 0 && (
              <div className="space-y-3">
                {selectedParams.map((p) => (
                  <div key={p}>
                    <label className="text-sm font-medium text-foreground">{p} Value *</label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="0"
                      className="mt-1"
                      value={paramValues[p] || ""}
                      onChange={(e) => setParamValues((prev) => ({ ...prev, [p]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-foreground">Date & Time</label>
              <Input className="mt-1" defaultValue={defaultDateTime} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Notes</label>
              <Textarea className="mt-1" placeholder="Optional notes about this reading..." rows={2} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Tester</label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select tester brand (optional)" /></SelectTrigger>
                <SelectContent>
                  {testers.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full gap-2" disabled={selectedParams.length === 0}>
              <Check className="h-4 w-4" /> Save Entry
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Chemical *</label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select or type chemical name" /></SelectTrigger>
                <SelectContent>
                  {chemicals.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Volume (mL) *</label>
              <Input type="number" step="0.1" defaultValue="0" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Date & Time *</label>
              <Input className="mt-1" defaultValue={defaultDateTime} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Brand (optional)</label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select or type brand" /></SelectTrigger>
                <SelectContent>
                  {brands.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Notes (optional)</label>
              <Textarea className="mt-1" placeholder="Any additional notes..." rows={2} />
            </div>
            <Button className="w-full gap-2">
              <Check className="h-4 w-4" /> Log Dosing
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LogDataDialog;
