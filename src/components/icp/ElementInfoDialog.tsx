import { Parameter } from "./ICPTestData";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface ElementInfoDialogProps {
  param: Parameter | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ElementInfoDialog = ({ param, open, onOpenChange }: ElementInfoDialogProps) => {
  if (!param) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl">
            {param.name} ({param.symbol})
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4 text-sm text-foreground/80 leading-relaxed">
          {param.description?.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ElementInfoDialog;
