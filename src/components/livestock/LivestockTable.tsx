import { LivestockItem, getAge } from "./LivestockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Skull, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  items: LivestockItem[];
  onEdit: (item: LivestockItem) => void;
  onDelete: (item: LivestockItem) => void;
  onMarkDeceased: (item: LivestockItem) => void;
}

const LivestockTable = ({ items, onEdit, onDelete, onMarkDeceased }: Props) => {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Age</th>
            <th className="text-center py-3 px-4 font-medium text-muted-foreground">Qty</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Vendor</th>
            <th className="w-10"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
              <td className="py-3 px-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-foreground">{item.commonName}</span>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold tracking-wide text-primary uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 italic">{item.scientificName}</p>
              </td>
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
              <td className="py-3 px-4 text-muted-foreground">{getAge(item.acquisitionDate)}</td>
              <td className="py-3 px-4 text-center text-muted-foreground">{item.quantity}</td>
              <td className="py-3 px-4 text-muted-foreground">{item.vendor}</td>
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
