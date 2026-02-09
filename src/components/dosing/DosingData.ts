export interface DosingEvent {
  id: string;
  timestamp: string;
  pump: string;
  pumpColor: string;
  chemical: string;
  chemicalSub?: string;
  volume: number;
  remaining: number | null;
  notes: string;
}

export interface DosingSummary {
  chemical: string;
  volume: number;
  isManual?: boolean;
}

export const dosingSummary: DosingSummary[] = [
  { chemical: "Alkalinity", volume: 3.9 },
  { chemical: "Calcium-Mg", volume: 4.5 },
  { chemical: "RZ Part A", volume: 9.0 },
  { chemical: "RZ Part C", volume: 10.0 },
  { chemical: "Nitrate", volume: 0.8, isManual: true },
];

export const dosingEvents: DosingEvent[] = [
  { id: "1", timestamp: "Feb 9, 12:00:00 PM", pump: "MANUAL", pumpColor: "hsl(280, 60%, 55%)", chemical: "Nitrate", chemicalSub: "DIY", volume: 0.8, remaining: null, notes: "" },
  { id: "2", timestamp: "Feb 8, 11:25:10 PM", pump: "PUMP 5", pumpColor: "hsl(185, 72%, 40%)", chemical: "RZ Part C", volume: 1.0, remaining: 201, notes: "" },
  { id: "3", timestamp: "Feb 8, 11:10:10 PM", pump: "PUMP 2", pumpColor: "hsl(210, 80%, 50%)", chemical: "RZ Part A", volume: 1.0, remaining: 201, notes: "" },
  { id: "4", timestamp: "Feb 8, 10:25:10 PM", pump: "PUMP 5", pumpColor: "hsl(185, 72%, 40%)", chemical: "RZ Part C", volume: 1.0, remaining: 202, notes: "" },
  { id: "5", timestamp: "Feb 8, 10:10:10 PM", pump: "PUMP 2", pumpColor: "hsl(210, 80%, 50%)", chemical: "RZ Part A", volume: 1.0, remaining: 202, notes: "" },
  { id: "6", timestamp: "Feb 8, 10:05:10 PM", pump: "PUMP 1", pumpColor: "hsl(340, 70%, 55%)", chemical: "Alkalinity", volume: 0.9, remaining: 1190, notes: "" },
  { id: "7", timestamp: "Feb 8, 09:25:10 PM", pump: "PUMP 5", pumpColor: "hsl(185, 72%, 40%)", chemical: "RZ Part C", volume: 1.0, remaining: 203, notes: "" },
  { id: "8", timestamp: "Feb 8, 09:10:10 PM", pump: "PUMP 2", pumpColor: "hsl(210, 80%, 50%)", chemical: "RZ Part A", volume: 1.0, remaining: 203, notes: "" },
];

export const dailyVolumeData = Array.from({ length: 31 }, (_, i) => {
  const day = i + 10;
  const month = day > 31 ? "Feb" : "Jan";
  const d = day > 31 ? day - 31 : day;
  const base = { date: `${month} ${d}` };
  const spike = (i >= 8 && i <= 12) || i === 18 ? 1.8 : 1;
  return {
    ...base,
    alkalinity: +(18 * spike + (Math.random() - 0.5) * 2).toFixed(1),
    calciumMg: +(8 + (Math.random() - 0.5) * 2).toFixed(1),
    magnesium: +(2 + Math.random()).toFixed(1),
    nitrate: i === 30 ? 0.8 : 0,
    rzPartA: +(18 * spike + (Math.random() - 0.5) * 2).toFixed(1),
    rzPartC: +(18 * spike + (Math.random() - 0.5) * 2).toFixed(1),
  };
});
