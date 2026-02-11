export interface TraceElement {
  id: string;
  name: string;
  color: string;
  mlPerDay: number;
}

export interface BatchContainer {
  id: string;
  name: string;
  mlPerDay: number;
  elements: TraceElement[];
}

export interface TraceBatch {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  containers: number;
  elements: TraceElement[];
  totalVolume: number;
}

export interface TraceTemplate {
  id: string;
  name: string;
  containers: number;
  elements: number;
  days: number;
  mlPerDay: number;
  elementNames: string[];
}

export const availableElements: { name: string; color: string }[] = [
  { name: "IODINE", color: "hsl(145, 65%, 40%)" },
  { name: "SELENIUM", color: "hsl(12, 80%, 55%)" },
  { name: "VANADIUM", color: "hsl(45, 80%, 45%)" },
  { name: "CHROMIUM", color: "hsl(185, 72%, 40%)" },
  { name: "COBALT", color: "hsl(280, 60%, 55%)" },
  { name: "IRON", color: "hsl(210, 80%, 50%)" },
  { name: "MANGANESE", color: "hsl(340, 70%, 55%)" },
  { name: "ZINC", color: "hsl(120, 50%, 40%)" },
  { name: "MOLYBDENUM", color: "hsl(30, 70%, 50%)" },
  { name: "NICKEL", color: "hsl(200, 40%, 50%)" },
];

export const sampleTemplates: TraceTemplate[] = [
  {
    id: "t1",
    name: "RZ - Monthly",
    containers: 2,
    elements: 8,
    days: 40,
    mlPerDay: 48,
    elementNames: ["IODINE", "SELENIUM", "VANADIUM", "CHROMIUM", "COBALT", "IRON", "MANGANESE", "ZINC"],
  },
];

export const sampleBatches: TraceBatch[] = [
  {
    id: "b1",
    name: "RZ - Monthly",
    startDate: "Jan 17, 2026",
    endDate: "Feb 26, 2026",
    containers: 2,
    elements: [
      { id: "e1", name: "IODINE", color: "hsl(145, 65%, 40%)", mlPerDay: 0.2 },
      { id: "e2", name: "SELENIUM", color: "hsl(12, 80%, 55%)", mlPerDay: 0.06 },
      { id: "e3", name: "VANADIUM", color: "hsl(45, 80%, 45%)", mlPerDay: 0.2 },
      { id: "e4", name: "CHROMIUM", color: "hsl(185, 72%, 40%)", mlPerDay: 0.06 },
      { id: "e5", name: "COBALT", color: "hsl(280, 60%, 55%)", mlPerDay: 0.06 },
      { id: "e6", name: "IRON", color: "hsl(210, 80%, 50%)", mlPerDay: 0.2 },
      { id: "e7", name: "MANGANESE", color: "hsl(340, 70%, 55%)", mlPerDay: 0.75 },
      { id: "e8", name: "ZINC", color: "hsl(120, 50%, 40%)", mlPerDay: 0.4 },
    ],
    totalVolume: 1920,
  },
];
