import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Livestock from "./pages/Livestock";
import ICPTests from "./pages/ICPTests";
import ICPTestDetail from "./pages/ICPTestDetail";
import Dosing from "./pages/Dosing";
import Analysis from "./pages/Analysis";
import Equipment from "./pages/Equipment";
import TraceDosing from "./pages/TraceDosing";
import TraceDosingNew from "./pages/TraceDosingNew";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/livestock" element={<Livestock />} />
          <Route path="/icp-tests" element={<ICPTests />} />
          <Route path="/icp-tests/:id" element={<ICPTestDetail />} />
          <Route path="/dosing" element={<Dosing />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/trace-dosing" element={<TraceDosing />} />
          <Route path="/trace-dosing/new" element={<TraceDosingNew />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
