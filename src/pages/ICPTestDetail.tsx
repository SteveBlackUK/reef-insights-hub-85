import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ParameterTable from "@/components/icp/ParameterTable";
import ElementHistory from "@/components/icp/ElementHistory";
import ElementInfoDialog from "@/components/icp/ElementInfoDialog";
import { mockICPTests, Parameter } from "@/components/icp/ICPTestData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter, ExternalLink, Copy, Trash2 } from "lucide-react";

const ICPTestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const test = mockICPTests.find((t) => t.id === id);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showOutOfRange, setShowOutOfRange] = useState(false);
  const [infoParam, setInfoParam] = useState<Parameter | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);

  const allParams = useMemo(
    () => test?.groups.flatMap((g) => g.parameters) ?? [],
    [test]
  );

  const selectedParams = useMemo(
    () => allParams.filter((p) => selectedIds.includes(p.id)),
    [allParams, selectedIds]
  );

  const toggleSelect = (paramId: string) => {
    setSelectedIds((prev) =>
      prev.includes(paramId) ? prev.filter((id) => id !== paramId) : [...prev, paramId]
    );
  };

  const handleParamClick = (param: Parameter) => {
    setInfoParam(param);
    setInfoOpen(true);
  };

  if (!test) {
    return (
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar activePage="ICP Tests" />
        <main className="flex-1 px-4 py-4 pt-18 sm:px-6 lg:ml-56 lg:px-8 lg:py-6 lg:pt-6">
          <p className="text-muted-foreground">Test not found.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar activePage="ICP Tests" />

      <main className="flex-1 px-4 py-4 pt-18 sm:px-6 lg:ml-56 lg:px-8 lg:py-6 lg:pt-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-4">
          <button
            onClick={() => navigate("/icp-tests")}
            className="flex items-center gap-1 text-primary hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> ICP Tests
          </button>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">{test.barcode}</span>
        </div>

        {/* Header card */}
        <div className="rounded-lg border border-border/50 bg-card p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <h1 className="font-heading text-xl sm:text-2xl font-bold text-foreground">{test.barcode}</h1>
              <Badge className="mt-1.5 bg-accent/15 text-accent border-accent/30 text-xs font-semibold">
                {test.tankName}
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">Tested: {test.date}</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant={showOutOfRange ? "default" : "outline"}
                size="sm"
                className="gap-1.5 text-xs"
                onClick={() => setShowOutOfRange(!showOutOfRange)}
              >
                <Filter className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Show Out of Range</span>
                <span className="sm:hidden">Out of Range</span>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Copy className="h-3.5 w-3.5" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Parameter groups */}
        {test.groups.map((group) => (
          <ParameterTable
            key={group.name}
            group={group}
            selectedIds={selectedIds}
            onToggleSelect={toggleSelect}
            onParameterClick={handleParamClick}
            showOutOfRange={showOutOfRange}
          />
        ))}

        {/* Element History */}
        {selectedIds.length > 0 && (
          <ElementHistory
            selectedParams={selectedParams}
            onClose={() => setSelectedIds([])}
          />
        )}

        {/* Element Info Dialog */}
        <ElementInfoDialog
          param={infoParam}
          open={infoOpen}
          onOpenChange={setInfoOpen}
        />
      </main>
    </div>
  );
};

export default ICPTestDetail;
