// Mock data for the Analysis page

export interface DataSource {
  id: string;
  name: string;
  enabled: boolean;
}

export interface MeasurementGroup {
  id: string;
  name: string;
  unit: string;
  color: string;
  sources: DataSource[];
}

export interface DataPoint {
  date: string;
  value: number;
}

export interface EventItem {
  id: string;
  name: string;
  date: string;
  icon: "sparkles" | "calendar" | "droplets" | "wrench";
}

export const measurementGroups: MeasurementGroup[] = [
  {
    id: "alkalinity",
    name: "Alkalinity",
    unit: "dKH",
    color: "hsl(210, 80%, 55%)",
    sources: [
      { id: "alk-alkatronic", name: "Alkatronic", enabled: true },
      { id: "alk-aquarimate", name: "Aquarimate", enabled: false },
      { id: "alk-aquawiz", name: "AquaWiz KH1", enabled: true },
      { id: "alk-manual", name: "Manual", enabled: false },
      { id: "alk-mastertronic", name: "Mastertronic", enabled: false },
    ],
  },
  {
    id: "calcium",
    name: "Calcium",
    unit: "ppm",
    color: "hsl(145, 60%, 45%)",
    sources: [
      { id: "ca-aquarimate", name: "Aquarimate", enabled: true },
      { id: "ca-mastertronic", name: "Mastertronic", enabled: true },
    ],
  },
  {
    id: "magnesium",
    name: "Magnesium",
    unit: "ppm",
    color: "hsl(280, 60%, 55%)",
    sources: [
      { id: "mg-aquarimate", name: "Aquarimate", enabled: true },
      { id: "mg-mastertronic", name: "Mastertronic", enabled: true },
    ],
  },
  {
    id: "nitrate",
    name: "Nitrate",
    unit: "ppm",
    color: "hsl(25, 85%, 55%)",
    sources: [
      { id: "no3-aquarimate", name: "Aquarimate", enabled: false },
      { id: "no3-manual", name: "Manual", enabled: true },
      { id: "no3-mastertronic", name: "Mastertronic", enabled: false },
    ],
  },
  {
    id: "ph",
    name: "pH",
    unit: "",
    color: "hsl(340, 70%, 55%)",
    sources: [
      { id: "ph-apex", name: "Apex Fusion", enabled: false },
      { id: "ph-aquarimate", name: "Aquarimate", enabled: false },
      { id: "ph-manual", name: "Manual", enabled: false },
    ],
  },
  {
    id: "phosphate",
    name: "Phosphate",
    unit: "ppm",
    color: "hsl(50, 80%, 45%)",
    sources: [
      { id: "po4-aquarimate", name: "Aquarimate", enabled: false },
      { id: "po4-manual", name: "Manual", enabled: false },
      { id: "po4-mastertronic", name: "Mastertronic", enabled: false },
    ],
  },
  {
    id: "salinity",
    name: "Salinity",
    unit: "ppt",
    color: "hsl(195, 70%, 50%)",
    sources: [
      { id: "sal-apex", name: "Apex Fusion", enabled: false },
      { id: "sal-manual", name: "Manual", enabled: false },
      { id: "sal-aquarimate", name: "Aquarimate", enabled: false },
    ],
  },
];

export const dosingGroups = [
  {
    id: "dosing",
    name: "Dosing",
    sources: [
      { id: "dos-alk", name: "Alkalinity", enabled: false },
      { id: "dos-cal", name: "Calcium", enabled: false },
      { id: "dos-mag", name: "Magnesium", enabled: false },
    ],
  },
];

export const eventItems: EventItem[] = [
  { id: "evt-ats", name: "Clean ATS", date: "Feb 2, 2026", icon: "sparkles" },
  { id: "evt-nitrate", name: "Nitrate", date: "Jan 28, 2026", icon: "calendar" },
  { id: "evt-ato", name: "Refill ATO", date: "Jan 25, 2026", icon: "droplets" },
  { id: "evt-test2", name: "test 2", date: "Jan 20, 2026", icon: "calendar" },
  { id: "evt-inspect", name: "test inspection", date: "Jan 15, 2026", icon: "calendar" },
  { id: "evt-wc", name: "Water Change", date: "Jan 12, 2026", icon: "droplets" },
];

// Generate time series data for each active source
function generateTimeSeries(baseValue: number, variance: number, points: number): DataPoint[] {
  const dates: DataPoint[] = [];
  const startDate = new Date(2026, 0, 11); // Jan 11, 2026
  let value = baseValue;
  for (let i = 0; i < points; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    value += (Math.random() - 0.5) * variance;
    value = Math.max(baseValue - variance * 3, Math.min(baseValue + variance * 3, value));
    dates.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: Math.round(value * 100) / 100,
    });
  }
  return dates;
}

export const seriesData: Record<string, DataPoint[]> = {
  "alk-alkatronic": generateTimeSeries(9.2, 0.3, 30),
  "alk-aquawiz": generateTimeSeries(8.1, 0.2, 30),
  "no3-manual": (() => {
    // Sparse manual data with a spike
    const pts: DataPoint[] = [];
    const startDate = new Date(2026, 0, 11);
    const manualDays = [0, 5, 12, 20, 22, 24, 26, 28, 29];
    const manualVals = [4.5, 4.2, 4.0, 3.8, 5.5, 9.8, 11.2, 8.5, 4.7];
    manualDays.forEach((d, i) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + d);
      pts.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        value: manualVals[i],
      });
    });
    return pts;
  })(),
  "ca-aquarimate": generateTimeSeries(430, 5, 30),
  "ca-mastertronic": generateTimeSeries(425, 4, 30),
  "mg-aquarimate": generateTimeSeries(1340, 10, 30),
  "mg-mastertronic": generateTimeSeries(1335, 8, 30),
};

export const latestValues: Record<string, { value: number; unit: string }> = {
  "alk-alkatronic": { value: 8.44, unit: "dKH" },
  "alk-aquawiz": { value: 7.89, unit: "dKH" },
  "no3-manual": { value: 4.70, unit: "ppm" },
  "ca-aquarimate": { value: 432, unit: "ppm" },
  "ca-mastertronic": { value: 428, unit: "ppm" },
  "mg-aquarimate": { value: 1345, unit: "ppm" },
  "mg-mastertronic": { value: 1338, unit: "ppm" },
};
