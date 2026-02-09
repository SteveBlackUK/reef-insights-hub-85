export type ParameterStatus = "in-range" | "low" | "high" | "elevated";

export interface Parameter {
  id: string;
  name: string;
  symbol: string;
  value: number;
  unit: string;
  rangeMin: number;
  rangeMax: number;
  desired: string;
  status: ParameterStatus;
  dosingRecommendation?: string;
  importance?: string;
  description?: string;
}

export interface ParameterGroup {
  name: string;
  parameters: Parameter[];
}

export interface ICPTest {
  id: string;
  barcode: string;
  date: string;
  tankName: string;
  keyParams: { label: string; value: string; color: string }[];
  groups: ParameterGroup[];
}

export interface ElementHistoryEntry {
  date: string;
  value: number;
}

function makeParam(
  id: string, name: string, symbol: string, value: number, unit: string,
  rangeMin: number, rangeMax: number, desired: string, status: ParameterStatus,
  dosingRecommendation?: string, importance?: string, description?: string
): Parameter {
  return { id, name, symbol, value, unit, rangeMin, rangeMax, desired, status, dosingRecommendation, importance, description };
}

const majorParams: Parameter[] = [
  makeParam("calcium", "Calcium", "Ca", 422, "ppm", 380, 500, "420 mg/l", "in-range", undefined, undefined,
    "Calcium is one of the most important elements in reef aquariums. It's essential for coral growth and skeletal formation."),
  makeParam("alkalinity", "Alkalinity", "Alk", 7.9, "dKH", 6.2, 8.5, "7.5 dKH", "in-range"),
  makeParam("magnesium", "Magnesium", "Mg", 1379, "ppm", 1350, 1600, "1400 mg/l", "in-range"),
  makeParam("ph", "pH", "pH", 8.15, "–", 8.1, 8.4, "8.25", "in-range"),
  makeParam("salinity", "Salinity", "Sal", 34.8, "ppt", 33, 35, "▲", "in-range"),
];

const nutrients: Parameter[] = [
  makeParam("nitrate", "Nitrate", "NO3", 3.94, "ppm", 2, 15, "5 mg/l", "in-range"),
  makeParam("nitrite", "Nitrite", "NO2", 0.2, "ppm", 0, 300, "0 µg/l", "in-range"),
  makeParam("phosphate", "Phosphate", "PO4", 0.18, "ppm", 0.021, 0.08, "0.04 mg/l", "high"),
  makeParam("phosphateion", "Phosphate Ion", "PO4i", 166.28, "ppm", 30, 80, "▲", "high"),
  makeParam("phosphorus", "Phosphorus", "P", 0.18, "ppm", 0.021, 0.08, "▲", "high",
    undefined, undefined, "Phosphorus is a key nutrient in reef systems."),
  makeParam("potassium", "Potassium", "K", 407, "ppm", 390, 500, "425 mg/l", "in-range"),
];

const majorElements: Parameter[] = [
  makeParam("boron", "Boron", "B", 4.6, "ppm", 4, 10, "6 mg/l", "in-range"),
  makeParam("strontium", "Strontium", "Sr", 9.1, "ppm", 8, 12, "10 mg/l", "in-range"),
  makeParam("bromide", "Bromide", "Br", 66.9, "ppm", 62, 100, "70 mg/l", "in-range"),
  makeParam("chloride", "Chloride", "Cl", 19960, "ppm", 18200, 20800, "19500 mg/l", "in-range"),
  makeParam("fluoride", "Fluoride", "F", 1.17, "ppm", 1.2, 1.9, "1.5 mg/l", "low",
    "31.35ml per day for 2 days", "6/10",
    "Fluoride is present in natural seawater and plays a role in the calcification process of corals."),
  makeParam("sodium", "Sodium", "Na", 10679, "ppm", 10000, 11300, "10700 mg/l", "in-range"),
  makeParam("sulfate", "Sulfate", "SO4", 2561, "ppm", 2426, 2963, "2695 mg/l", "in-range"),
  makeParam("sulfur", "Sulfur", "S", 881, "ppm", 810, 990, "900 mg/l", "in-range"),
];

const traceElements: Parameter[] = [
  makeParam("aluminum", "Aluminum", "Al", 0.0, "ppb", 0, 20, "0 µg/l", "in-range"),
  makeParam("silver", "Silver", "Ag", 0.0, "ppb", 0, 3, "0 µg/l", "in-range"),
  makeParam("arsenic", "Arsenic", "As", 0.0, "ppb", 0, 10, "0 µg/l", "in-range"),
  makeParam("barium", "Barium", "Ba", 26.8, "ppb", 10, 100, "15 µg/l", "in-range"),
  makeParam("beryllium", "Beryllium", "Be", 0.0, "ppb", 0, 10, "0 µg/l", "in-range"),
  makeParam("cobalt", "Cobalt", "Co", 0.0, "ppb", 0.1, 1, "0.2 µg/l", "low",
    "0.03ml per day for 12 days", "4/10"),
  makeParam("chromium", "Chromium", "Cr", 0.0, "ppb", 0.2, 1, "0.5 µg/l", "low",
    "0.03ml per day for 28 days", "4/10"),
  makeParam("copper", "Copper", "Cu", 0.0, "ppb", 0.1, 5, "▲", "low"),
  makeParam("iron", "Iron", "Fe", 0.0, "ppb", 0.2, 5, "▲", "low"),
  makeParam("iodine", "Iodine", "I", 47.9, "ppb", 60, 95, "▲", "low"),
  makeParam("nickel", "Nickel", "Ni", 0.0, "ppb", 2, 5, "▲", "low",
    undefined, undefined,
    "Nickel is present in reefs all around the world and is an essential element for many marine creatures and bacteria as it promotes many enzymatic processes to occur.\n\nWith the ideal Nickel concentration, improvements in growth along with red and turquoise colours and contrast.\n\nNonetheless, Nickel gets depleted from the water in our tanks quickly.\n\nNickel has a growth-enhancing effect if ideal Nitrate levels are found in the water.\n\nOn a scale of 1-10 (1 low, 10 high) we classify the importance of nickel supplementation a 3 and suitable for experienced reefers only."),
  makeParam("manganese", "Manganese", "Mn", 0.0, "ppb", 0.9, 4, "▲", "low"),
  makeParam("molybdenum", "Molybdenum", "Mo", 20.4, "ppb", 12, 20, "▲", "high"),
  makeParam("vanadium", "Vanadium", "V", 0.0, "ppb", 0.5, 5, "▲", "low"),
];

const testGroups: ParameterGroup[] = [
  { name: "Major Parameters", parameters: majorParams },
  { name: "Nutrients", parameters: nutrients },
  { name: "Major Elements", parameters: majorElements },
  { name: "Trace Elements", parameters: traceElements },
];

export const mockICPTests: ICPTest[] = [
  {
    id: "1",
    barcode: "ADV-ae-44701",
    date: "07/01/2026",
    tankName: "NYOS440",
    keyParams: [
      { label: "CA", value: "422", color: "hsl(280 60% 60%)" },
      { label: "ALK", value: "7.9", color: "hsl(330 60% 55%)" },
      { label: "MG", value: "1379", color: "hsl(185 60% 45%)" },
    ],
    groups: testGroups,
  },
  {
    id: "2",
    barcode: "ADV-hm-44700",
    date: "09/12/2025",
    tankName: "NYOS440",
    keyParams: [
      { label: "CA", value: "412", color: "hsl(280 60% 60%)" },
      { label: "ALK", value: "8.1", color: "hsl(330 60% 55%)" },
      { label: "MG", value: "1374", color: "hsl(185 60% 45%)" },
    ],
    groups: testGroups,
  },
  {
    id: "3",
    barcode: "ADV-mz-50816",
    date: "11/11/2025",
    tankName: "NYOS440",
    keyParams: [
      { label: "CA", value: "416", color: "hsl(280 60% 60%)" },
      { label: "ALK", value: "8.0", color: "hsl(330 60% 55%)" },
      { label: "MG", value: "1349", color: "hsl(185 60% 45%)" },
    ],
    groups: testGroups,
  },
  {
    id: "4",
    barcode: "ADV-no-46665",
    date: "10/10/2025",
    tankName: "NYOS440",
    keyParams: [
      { label: "CA", value: "435", color: "hsl(280 60% 60%)" },
      { label: "ALK", value: "7.8", color: "hsl(330 60% 55%)" },
      { label: "MG", value: "1396", color: "hsl(185 60% 45%)" },
    ],
    groups: testGroups,
  },
  {
    id: "5",
    barcode: "ADV-kz-50242",
    date: "10/09/2025",
    tankName: "NYOS440",
    keyParams: [
      { label: "CA", value: "436", color: "hsl(280 60% 60%)" },
      { label: "ALK", value: "7.8", color: "hsl(330 60% 55%)" },
      { label: "MG", value: "1336", color: "hsl(185 60% 45%)" },
    ],
    groups: testGroups,
  },
];

// Element history data for selected elements across tests
export const elementHistoryData: Record<string, ElementHistoryEntry[]> = {
  calcium: [
    { date: "Sep 10, 2025", value: 436.1 },
    { date: "Oct 10, 2025", value: 434.6 },
    { date: "Nov 11, 2025", value: 416.1 },
    { date: "Dec 9, 2025", value: 412.3 },
    { date: "Jan 7, 2026", value: 422.4 },
  ],
  alkalinity: [
    { date: "Sep 10, 2025", value: 7.8 },
    { date: "Oct 10, 2025", value: 7.8 },
    { date: "Nov 11, 2025", value: 8.0 },
    { date: "Dec 9, 2025", value: 8.1 },
    { date: "Jan 7, 2026", value: 7.9 },
  ],
  nitrate: [
    { date: "Sep 10, 2025", value: 33.3 },
    { date: "Oct 10, 2025", value: 12.7 },
    { date: "Nov 11, 2025", value: 5.7 },
    { date: "Dec 9, 2025", value: 3.2 },
    { date: "Jan 7, 2026", value: 3.9 },
  ],
  fluoride: [
    { date: "Sep 10, 2025", value: 0.7 },
    { date: "Oct 10, 2025", value: 1.3 },
    { date: "Nov 11, 2025", value: 1.1 },
    { date: "Dec 9, 2025", value: 1.4 },
    { date: "Jan 7, 2026", value: 1.2 },
  ],
};
