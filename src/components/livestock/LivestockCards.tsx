import { LivestockItem, getAge } from "./LivestockData";
import { Badge } from "@/components/ui/badge";

interface Props {
  items: LivestockItem[];
  onSelect: (item: LivestockItem) => void;
}

const LivestockCards = ({ items, onSelect }: Props) => {
  return (
    <div className="md:hidden space-y-3">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className="w-full text-left rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/40"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-medium text-foreground truncate">{item.commonName}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {item.tags.map((tag) => (
                  <span key={tag} className="text-[9px] font-bold tracking-wide text-primary uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <Badge
              className={
                item.status === "Alive"
                  ? "bg-green-500 text-primary-foreground hover:bg-green-500/90 border-transparent shrink-0"
                  : "bg-destructive text-destructive-foreground hover:bg-destructive/90 border-transparent shrink-0"
              }
            >
              {item.status.toUpperCase()}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1 italic">{item.scientificName}</p>
          <div className="flex gap-6 mt-3 text-xs">
            <div>
              <span className="text-muted-foreground">Age</span>
              <p className="font-medium text-foreground">{getAge(item.acquisitionDate)}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Qty</span>
              <p className="font-medium text-foreground">{item.quantity}</p>
            </div>
            <div>
              <span className="text-muted-foreground">From</span>
              <p className="font-medium text-foreground">{item.vendor}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default LivestockCards;
