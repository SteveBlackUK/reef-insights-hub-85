import { MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EquipmentItem, categoryColors } from "./EquipmentData";

interface EquipmentGridProps {
  items: EquipmentItem[];
}

const EquipmentGrid = ({ items }: EquipmentGridProps) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <p className="text-sm">No equipment found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <Card
          key={item.id}
          className="relative flex flex-col justify-between p-4 hover:shadow-md transition-shadow border-border/60"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-heading text-sm font-semibold text-foreground truncate">
                {item.name}
                {item.quantity > 1 && (
                  <span className="text-muted-foreground font-normal ml-1">
                    (×{item.quantity})
                  </span>
                )}
              </h3>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {item.model}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0 text-muted-foreground"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>
                  {item.status === "active" ? "Retire" : "Reactivate"}
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {item.categories.map((cat) => (
              <Badge
                key={cat}
                variant="outline"
                className={`text-[10px] px-2 py-0 font-medium uppercase tracking-wide ${categoryColors[cat]}`}
              >
                {cat}
              </Badge>
            ))}
            {item.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[10px] px-2 py-0 font-medium uppercase tracking-wide"
              >
                {tag.replace(/_/g, " ")}
              </Badge>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default EquipmentGrid;
