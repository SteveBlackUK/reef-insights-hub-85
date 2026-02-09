import { useState, useEffect } from "react";
import { LivestockItem } from "./LivestockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: LivestockItem | null;
  onSave: (item: Partial<LivestockItem>) => void;
}

const LivestockDialog = ({ open, onOpenChange, item, onSave }: Props) => {
  const isEdit = !!item;

  const [commonName, setCommonName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [category, setCategory] = useState("");
  const [acquisitionDate, setAcquisitionDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<"Alive" | "Deceased">("Alive");
  const [vendor, setVendor] = useState("");
  const [tankBred, setTankBred] = useState(false);
  const [pricePaid, setPricePaid] = useState(0);
  const [currency, setCurrency] = useState("GBP");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (item) {
      setCommonName(item.commonName);
      setScientificName(item.scientificName);
      setCategory(item.category);
      setAcquisitionDate(item.acquisitionDate);
      setQuantity(item.quantity);
      setStatus(item.status);
      setVendor(item.vendor);
      setTankBred(item.tankBred);
      setPricePaid(item.pricePaid);
      setCurrency(item.currency);
      setNotes(item.notes);
    } else {
      setCommonName("");
      setScientificName("");
      setCategory("");
      setAcquisitionDate(new Date().toISOString().split("T")[0]);
      setQuantity(1);
      setStatus("Alive");
      setVendor("");
      setTankBred(false);
      setPricePaid(0);
      setCurrency("GBP");
      setNotes("");
    }
  }, [item, open]);

  const handleSave = () => {
    onSave({
      ...(item ? { id: item.id } : {}),
      commonName,
      scientificName,
      category,
      acquisitionDate,
      quantity,
      status,
      vendor,
      tankBred,
      pricePaid,
      currency,
      notes,
    });
    onOpenChange(false);
  };

  const currencySymbol = currency === "GBP" ? "£" : currency === "EUR" ? "€" : "$";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Livestock" : "Add Livestock"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label>Common Name <span className="text-destructive">*</span></Label>
            <Input value={commonName} onChange={(e) => setCommonName(e.target.value)} placeholder="Search for species..." />
          </div>
          <div>
            <Label>Scientific Name</Label>
            <Input value={scientificName} onChange={(e) => setScientificName(e.target.value)} />
          </div>
          <div>
            <Label>Category</Label>
            <Input value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div>
            <Label>Acquisition Date <span className="text-destructive">*</span></Label>
            <Input type="date" value={acquisitionDate} onChange={(e) => setAcquisitionDate(e.target.value)} />
          </div>
          <div>
            <Label>Quantity</Label>
            <Input type="number" min={1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
          </div>
          {isEdit && (
            <div>
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as "Alive" | "Deceased")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alive">Alive</SelectItem>
                  <SelectItem value="Deceased">Deceased</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div>
            <Label>Vendor</Label>
            <Input value={vendor} onChange={(e) => setVendor(e.target.value)} placeholder="e.g., LiveAquaria, Local Fish Store" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="tankBred" checked={tankBred} onCheckedChange={(v) => setTankBred(!!v)} />
            <Label htmlFor="tankBred" className="mb-0">Tank bred</Label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Price Paid</Label>
              <Input type="number" min={0} step={0.01} value={pricePaid} onChange={(e) => setPricePaid(Number(e.target.value))} />
            </div>
            <div>
              <Label>Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="GBP">{`£ GBP`}</SelectItem>
                  <SelectItem value="USD">{`$ USD`}</SelectItem>
                  <SelectItem value="EUR">{`€ EUR`}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Notes</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional notes..." rows={3} />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={!commonName}>
            {isEdit ? "Save Changes" : "Add Livestock"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LivestockDialog;
