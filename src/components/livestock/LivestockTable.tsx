import { useState } from "react";
import { LivestockItem, getAge } from "./LivestockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Pencil, Skull, Trash2, ArrowUpDown, ArrowUp, ArrowDown, Settings2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type SortKey = "name" | "status" | "age" | "quantity" | "vendor" | "price" | "acquisitionDate" | "tankBred";
export type SortDir = "asc" | "desc";

const ALL_COLUMNS: { key: string; label: string; defaultVisible: boolean }[] = [
  { key: "name", label: "Name", defaultVisible: true },
  { key: "status", label: "Status", defaultVisible: true },
  { key: "age", label: "Age", defaultVisible: true },
  { key: "quantity", label: "Quantity", defaultVisible: true },
  { key: "vendor", label: "Vendor", defaultVisible: true },
  { key: "price", label: "Price", defaultVisible: false },
  { key: "acquisitionDate", label: "Acquisition Date", defaultVisible: false },
  { key: "tankBred", label: "Tank Bred", defaultVisible: false },
];

const DEFAULT_VISIBLE = ALL_COLUMNS.filter((c) => c.defaultVisible).map((c) => c.key);

function ageDays(dateStr: string): number {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
}

interface Props {
  items: LivestockItem[];
  onEdit: (item: LivestockItem) => void;
  onDelete: (item: LivestockItem) => void;
  onMarkDeceased: (item: LivestockItem) => void;
}

const LivestockTable = ({ items, onEdit, onDelete, onMarkDeceased }: Props) => {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [visibleCols, setVisibleCols] = useState<string[]>(DEFAULT_VISIBLE);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = [...items].sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    switch (sortKey) {
      case "name": return a.commonName.localeCompare(b.commonName) * dir;
      case "status": return a.status.localeCompare(b.status) * dir;
      case "age": return (ageDays(a.acquisitionDate) - ageDays(b.acquisitionDate)) * dir;
      case "quantity": return (a.quantity - b.quantity) * dir;
      case "vendor": return a.vendor.localeCompare(b.vendor) * dir;
      case "price": return (a.pricePaid - b.pricePaid) * dir;
      case "acquisitionDate": return a.acquisitionDate.localeCompare(b.acquisitionDate) * dir;
      case "tankBred": return (Number(a.tankBred) - Number(b.tankBred)) * dir;
      default: return 0;
    }
  });

  const toggleCol = (key: string) => {
    if (key === "name") return; // Name always visible
    setVisibleCols((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );
  };

  const SortHeader = ({ label, colKey }: { label: string; colKey: SortKey }) => {
    const active = sortKey === colKey;
    return (
      <button
        onClick={() => toggleSort(colKey)}
        className="inline-flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        {label}
        {active ? (
          sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
        ) : (
          <ArrowUpDown className="h-3 w-3 opacity-40" />
        )}
      </button>
    );
  };

  const show = (key: string) => visibleCols.includes(key);
  const visibleColumns = ALL_COLUMNS.filter((c) => visibleCols.includes(c.key));
  const hiddenColumns = ALL_COLUMNS.filter((c) => !visibleCols.includes(c.key));

  const formatPrice = (item: LivestockItem) => {
    const sym = item.currency === "GBP" ? "£" : item.currency === "EUR" ? "€" : "$";
    return `${sym}${item.pricePaid}`;
  };

  return (
    <div className="hidden md:block overflow-x-auto">
      {/* Column settings gear */}
      <div className="flex justify-end mb-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <Settings2 className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-56">
            <p className="text-sm font-medium mb-3">Visible Columns</p>
            <div className="space-y-2">
              {visibleColumns.map((col) => (
                <label key={col.key} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked
                    disabled={col.key === "name"}
                    onCheckedChange={() => toggleCol(col.key)}
                  />
                  {col.label}
                </label>
              ))}
            </div>
            {hiddenColumns.length > 0 && (
              <>
                <p className="text-sm font-medium mt-4 mb-2 text-muted-foreground">Hidden Columns</p>
                <div className="space-y-2">
                  {hiddenColumns.map((col) => (
                    <label key={col.key} className="flex items-center gap-2 text-sm">
                      <Checkbox checked={false} onCheckedChange={() => toggleCol(col.key)} />
                      {col.label}
                    </label>
                  ))}
                </div>
              </>
            )}
            <button
              onClick={() => setVisibleCols(DEFAULT_VISIBLE)}
              className="text-sm text-primary mt-4 hover:underline"
            >
              Reset to defaults
            </button>
          </PopoverContent>
        </Popover>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {show("name") && <th className="text-left py-3 px-4"><SortHeader label="Name" colKey="name" /></th>}
            {show("status") && <th className="text-left py-3 px-4"><SortHeader label="Status" colKey="status" /></th>}
            {show("age") && <th className="text-left py-3 px-4"><SortHeader label="Age" colKey="age" /></th>}
            {show("quantity") && <th className="text-center py-3 px-4"><SortHeader label="Qty" colKey="quantity" /></th>}
            {show("vendor") && <th className="text-left py-3 px-4"><SortHeader label="Vendor" colKey="vendor" /></th>}
            {show("price") && <th className="text-left py-3 px-4"><SortHeader label="Price" colKey="price" /></th>}
            {show("acquisitionDate") && <th className="text-left py-3 px-4"><SortHeader label="Acquired" colKey="acquisitionDate" /></th>}
            {show("tankBred") && <th className="text-center py-3 px-4"><SortHeader label="Tank Bred" colKey="tankBred" /></th>}
            <th className="w-10"></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((item) => (
            <tr key={item.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              {show("name") && (
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-foreground">{item.commonName}</span>
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-bold tracking-wide text-primary uppercase">{tag}</span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 italic">{item.scientificName}</p>
                </td>
              )}
              {show("status") && (
                <td className="py-3 px-4">
                  <Badge
                    className={
                      item.status === "Alive"
                        ? "bg-green-500 text-primary-foreground hover:bg-green-500/90 border-transparent"
                        : "bg-destructive text-destructive-foreground hover:bg-destructive/90 border-transparent"
                    }
                  >
                    {item.status.toUpperCase()}
                  </Badge>
                </td>
              )}
              {show("age") && <td className="py-3 px-4 text-muted-foreground">{getAge(item.acquisitionDate)}</td>}
              {show("quantity") && <td className="py-3 px-4 text-center text-muted-foreground">{item.quantity}</td>}
              {show("vendor") && <td className="py-3 px-4 text-muted-foreground">{item.vendor}</td>}
              {show("price") && <td className="py-3 px-4 text-muted-foreground">{formatPrice(item)}</td>}
              {show("acquisitionDate") && <td className="py-3 px-4 text-muted-foreground">{item.acquisitionDate}</td>}
              {show("tankBred") && <td className="py-3 px-4 text-center text-muted-foreground">{item.tankBred ? "Yes" : "No"}</td>}
              <td className="py-3 px-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(item)}>
                      <Pencil className="h-4 w-4 mr-2" /> Edit
                    </DropdownMenuItem>
                    {item.status === "Alive" && (
                      <DropdownMenuItem onClick={() => onMarkDeceased(item)}>
                        <Skull className="h-4 w-4 mr-2" /> Mark Deceased
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => onDelete(item)} className="text-destructive focus:text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LivestockTable;
