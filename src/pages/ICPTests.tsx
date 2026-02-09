import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { mockICPTests } from "@/components/icp/ICPTestData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronUp, ChevronDown, FlaskConical } from "lucide-react";

const ICPTests = () => {
  const navigate = useNavigate();
  const [addOpen, setAddOpen] = useState(true);
  const [barcode, setBarcode] = useState("");
  const [tankName, setTankName] = useState("");

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar activePage="ICP Tests" />

      <main className="flex-1 px-4 py-4 pt-18 sm:px-6 lg:ml-56 lg:px-8 lg:py-6 lg:pt-6">
        <div className="flex items-center gap-2 mb-6">
          <FlaskConical className="h-6 w-6 text-muted-foreground" />
          <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">ICP Tests</h1>
        </div>

        {/* Add New Test */}
        <Collapsible open={addOpen} onOpenChange={setAddOpen}>
          <div className="rounded-lg border border-border/50 bg-card mb-6">
            <CollapsibleTrigger className="flex w-full items-center justify-between px-5 py-4">
              <h2 className="font-heading text-base font-semibold">Add New ICP Test</h2>
              {addOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-5 pb-5 space-y-4">
                <div>
                  <Label className="text-sm font-medium">
                    Test Barcode <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    placeholder="Enter barcode from ReefZelements"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">
                    Tank Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    value={tankName}
                    onChange={(e) => setTankName(e.target.value)}
                    placeholder="Enter tank name"
                    className="mt-1"
                  />
                </div>
                <Button className="w-full" size="lg">
                  Retrieve Test Results
                </Button>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Tests Table */}
        <div className="rounded-lg border border-border/50 bg-card">
          <div className="px-5 py-3 text-sm text-muted-foreground">
            Showing {mockICPTests.length} tests
          </div>

          {/* Desktop */}
          <div className="hidden sm:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-t border-border/50 text-muted-foreground">
                  <th className="px-5 py-2.5 text-left font-medium">Date</th>
                  <th className="px-5 py-2.5 text-left font-medium">Barcode</th>
                  <th className="px-5 py-2.5 text-left font-medium">Key Parameters</th>
                </tr>
              </thead>
              <tbody>
                {mockICPTests.map((test) => (
                  <tr
                    key={test.id}
                    onClick={() => navigate(`/icp-tests/${test.id}`)}
                    className="border-t border-border/30 hover:bg-muted/30 cursor-pointer transition-colors"
                  >
                    <td className="px-5 py-3 tabular-nums">{test.date}</td>
                    <td className="px-5 py-3 font-medium">{test.barcode}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        {test.keyParams.map((kp) => (
                          <span
                            key={kp.label}
                            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                            style={{
                              background: `${kp.color.replace(")", " / 0.12)")}`,
                              color: kp.color,
                            }}
                          >
                            {kp.label}: {kp.value}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="sm:hidden divide-y divide-border/30">
            {mockICPTests.map((test) => (
              <button
                key={test.id}
                onClick={() => navigate(`/icp-tests/${test.id}`)}
                className="w-full px-4 py-3 text-left hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{test.barcode}</span>
                  <span className="text-xs text-muted-foreground tabular-nums">{test.date}</span>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {test.keyParams.map((kp) => (
                    <span
                      key={kp.label}
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        background: `${kp.color.replace(")", " / 0.12)")}`,
                        color: kp.color,
                      }}
                    >
                      {kp.label}: {kp.value}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ICPTests;
