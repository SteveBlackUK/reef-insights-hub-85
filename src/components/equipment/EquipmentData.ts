export type EquipmentStatus = "active" | "retired";

export type EquipmentCategory =
  | "LIGHTING"
  | "CIRCULATION"
  | "CONTROL"
  | "OTHER"
  | "FILTRATION"
  | "DOSING";

export type EquipmentTag =
  | "MAIN_LIGHT"
  | "WAVEMAKER"
  | "CONTROLLER"
  | "AUTOMATED_TESTING"
  | "DOSER"
  | "HEATER"
  | "SKIMMER"
  | "REACTOR"
  | "UV";

export interface EquipmentItem {
  id: string;
  name: string;
  model: string;
  quantity: number;
  status: EquipmentStatus;
  categories: EquipmentCategory[];
  tags: EquipmentTag[];
  addedDate: string; // ISO date
  retiredDate?: string; // ISO date
  section: string; // e.g. "Display Tank", "Sump", "ATO"
}

export const equipmentData: EquipmentItem[] = [
  {
    id: "1",
    name: "Reefi Uno 2.1 Pro",
    model: "Reefi Uno 2.1 Pro",
    quantity: 2,
    status: "active",
    categories: ["LIGHTING"],
    tags: ["MAIN_LIGHT"],
    addedDate: "2024-03-15",
    section: "Display Tank",
  },
  {
    id: "2",
    name: "Aqua Illumination",
    model: "Aqua Illumination",
    quantity: 1,
    status: "active",
    categories: ["CIRCULATION"],
    tags: ["WAVEMAKER"],
    addedDate: "2024-01-10",
    section: "Display Tank",
  },
  {
    id: "3",
    name: "Aqua Illumination Nero 5",
    model: "Aqua Illumination Nero 5",
    quantity: 2,
    status: "active",
    categories: ["CIRCULATION"],
    tags: ["WAVEMAKER"],
    addedDate: "2024-02-20",
    section: "Display Tank",
  },
  {
    id: "4",
    name: "Eheim Jager 150W",
    model: "Eheim Jager 150W",
    quantity: 2,
    status: "active",
    categories: ["OTHER"],
    tags: ["HEATER"],
    addedDate: "2023-11-05",
    section: "Sump",
  },
  {
    id: "5",
    name: "Focustronic Alkatronic",
    model: "Focustronic Alkatronic",
    quantity: 1,
    status: "active",
    categories: ["CONTROL"],
    tags: ["AUTOMATED_TESTING"],
    addedDate: "2024-06-01",
    section: "Sump",
  },
  {
    id: "6",
    name: "Focustronic Dosetronic",
    model: "Focustronic Dosetronic",
    quantity: 2,
    status: "active",
    categories: ["CONTROL", "DOSING"],
    tags: ["DOSER"],
    addedDate: "2024-06-01",
    section: "Sump",
  },
  {
    id: "7",
    name: "Neptune Systems Apex 2016",
    model: "Neptune Systems Apex 2016",
    quantity: 2,
    status: "active",
    categories: ["CONTROL"],
    tags: ["CONTROLLER"],
    addedDate: "2023-06-15",
    section: "Sump",
  },
  {
    id: "8",
    name: "Reef Octopus Classic 150",
    model: "Reef Octopus Classic 150-INT",
    quantity: 1,
    status: "active",
    categories: ["FILTRATION"],
    tags: ["SKIMMER"],
    addedDate: "2023-06-15",
    section: "Sump",
  },
  {
    id: "9",
    name: "Aqua UV 25W Sterilizer",
    model: "Aqua UV 25W",
    quantity: 1,
    status: "retired",
    categories: ["OTHER"],
    tags: ["UV"],
    addedDate: "2023-08-01",
    retiredDate: "2025-01-15",
    section: "Sump",
  },
  {
    id: "10",
    name: "BRS Reactor",
    model: "BRS Single Reactor",
    quantity: 1,
    status: "retired",
    categories: ["FILTRATION"],
    tags: ["REACTOR"],
    addedDate: "2023-07-01",
    retiredDate: "2024-09-30",
    section: "Sump",
  },
  {
    id: "11",
    name: "Tunze Osmolator 3155",
    model: "Tunze Osmolator 3155",
    quantity: 1,
    status: "active",
    categories: ["CONTROL"],
    tags: ["CONTROLLER"],
    addedDate: "2023-06-20",
    section: "ATO",
  },
];

export const categoryColors: Record<EquipmentCategory, string> = {
  LIGHTING: "bg-amber-500/15 text-amber-700 border-amber-500/30",
  CIRCULATION: "bg-blue-500/15 text-blue-700 border-blue-500/30",
  CONTROL: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30",
  OTHER: "bg-muted text-muted-foreground border-border",
  FILTRATION: "bg-purple-500/15 text-purple-700 border-purple-500/30",
  DOSING: "bg-teal-500/15 text-teal-700 border-teal-500/30",
};

export const sections = ["Display Tank", "Sump", "ATO"] as const;
