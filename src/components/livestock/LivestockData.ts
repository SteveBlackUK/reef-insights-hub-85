export interface LivestockItem {
  id: string;
  commonName: string;
  scientificName: string;
  category: string;
  tags: string[];
  status: "Alive" | "Deceased";
  acquisitionDate: string;
  quantity: number;
  vendor: string;
  tankBred: boolean;
  pricePaid: number;
  currency: string;
  notes: string;
}

export const mockLivestock: LivestockItem[] = [
  { id: "1", commonName: "Molly Miller Blenny", scientificName: "Scartella cristata", category: "Blennies", tags: ["BLENNIES"], status: "Alive", acquisitionDate: "2026-01-16", quantity: 1, vendor: "Abyss", tankBred: false, pricePaid: 29, currency: "GBP", notes: "Into DT on 4 Feb after QT for ~1 month (HTTM + Observation)" },
  { id: "2", commonName: "Red Psychedelic Mandarinfish", scientificName: "Synchiropus splendidus, Pterosynchiropus splendidus", category: "Gobies", tags: ["GOBIES", "BLENNIES", "DRAGONETS"], status: "Alive", acquisitionDate: "2026-01-09", quantity: 1, vendor: "AAC", tankBred: false, pricePaid: 35, currency: "GBP", notes: "" },
  { id: "3", commonName: "Diamond Watchman Goby", scientificName: "Valenciennea puellaris", category: "Gobies", tags: ["CUSTOMER FAVORITES", "MARINE FISH"], status: "Alive", acquisitionDate: "2026-01-09", quantity: 1, vendor: "AAC", tankBred: false, pricePaid: 22, currency: "GBP", notes: "" },
  { id: "4", commonName: "Resplendent Anthias", scientificName: "Pseudanthias pulcherrimus", category: "Anthias", tags: ["ANTHIAS FISH"], status: "Alive", acquisitionDate: "2025-12-09", quantity: 4, vendor: "AAC", tankBred: false, pricePaid: 18, currency: "GBP", notes: "" },
  { id: "5", commonName: "Resplendent Anthias", scientificName: "Pseudanthias pulcherrimus", category: "Anthias", tags: ["ANTHIAS FISH"], status: "Deceased", acquisitionDate: "2026-02-08", quantity: 1, vendor: "AAC", tankBred: false, pricePaid: 18, currency: "GBP", notes: "" },
  { id: "6", commonName: "Diamond Watchman Goby", scientificName: "Valenciennea puellaris", category: "Gobies", tags: ["CUSTOMER FAVORITES", "MARINE FISH"], status: "Deceased", acquisitionDate: "2026-01-26", quantity: 1, vendor: "AAC", tankBred: false, pricePaid: 22, currency: "GBP", notes: "" },
  { id: "7", commonName: "Scarlet Hawkfish", scientificName: "Neocirrhites armatus", category: "Hawkfish", tags: ["HAWKFISH"], status: "Alive", acquisitionDate: "2025-06-09", quantity: 1, vendor: "AAC", tankBred: false, pricePaid: 30, currency: "GBP", notes: "" },
  { id: "8", commonName: "Yellow Tang", scientificName: "Zebrasoma flavescens", category: "Tangs", tags: ["CUSTOMER FAVORITES", "MARINE FISH"], status: "Alive", acquisitionDate: "2025-06-09", quantity: 1, vendor: "AAC", tankBred: false, pricePaid: 55, currency: "GBP", notes: "" },
  { id: "9", commonName: "Bristletooth Tomini Tang", scientificName: "Ctenochaetus tominiensis", category: "Tangs", tags: ["TANGS & SURGEONS"], status: "Alive", acquisitionDate: "2025-05-09", quantity: 1, vendor: "AAC", tankBred: false, pricePaid: 40, currency: "GBP", notes: "" },
  { id: "10", commonName: "Diamond Watchman Goby", scientificName: "Valenciennea puellaris", category: "Gobies", tags: ["CUSTOMER FAVORITES", "MARINE FISH"], status: "Deceased", acquisitionDate: "2026-01-26", quantity: 1, vendor: "AAC", tankBred: false, pricePaid: 22, currency: "GBP", notes: "" },
  { id: "11", commonName: "Pink-Streaked Wrasse", scientificName: "Pseudocheilinops ataenia", category: "Wrasse", tags: ["WRASSE - REEF SAFE"], status: "Alive", acquisitionDate: "2025-05-09", quantity: 1, vendor: "Abyss", tankBred: false, pricePaid: 25, currency: "GBP", notes: "" },
];

export function getAge(dateStr: string): string {
  const acquired = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - acquired.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days < 1) return "today";
  if (days === 1) return "1 day";
  if (days < 7) return `${days} days`;
  const weeks = Math.floor(days / 7);
  if (days < 30) return weeks === 1 ? "1 week" : `${weeks} weeks`;
  const months = Math.floor(days / 30);
  if (days < 365) return months === 1 ? "1 month" : `${months} months`;
  const years = Math.floor(days / 365);
  return years === 1 ? "1 year" : `${years} years`;
}
