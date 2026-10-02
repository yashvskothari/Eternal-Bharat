export interface Fort { name: string; image?: string; description?: string }
export interface TimelineEntry { year: string; event?: string; title?: string; description?: string }
export interface BattleRef { id: string | null; name: string; year?: string; outcome?: string }

export interface Warrior {
  id: string; name: string; title: string; years: string; featured: boolean;
  kingdomId?: string; kingdom: string; description: string; image: string;
  capital: string; dynasty: string; reign: string; born: string; died: string;
  biography: string; kingdomDescription: string;
  campaigns: string[]; battles: BattleRef[]; forts: Fort[];
  timeline: TimelineEntry[]; achievements: string[]; legacy: string; references: string[];
}

export interface Kingdom {
  id: string; name: string; capital: string; dynasty: string; period: string;
  founded: string; region: string; description: string; image: string; mapImage: string;
  overview: string; rulers: string[]; forts: Fort[]; battles: BattleRef[];
  timeline: TimelineEntry[]; achievements: string[]; legacy: string; references: string[];
}

export interface Battle {
  id: string; name: string; year: string; location: string; commanders: string;
  result: string; kingdom: string; kingdomId?: string; description: string;
  image: string; significance: string; warriors: string[]; references: string[];
}

export type EraId = "ancient" | "early-medieval" | "medieval" | "early-modern" | "modern";
export type CategoryId = "rulers" | "battles" | "kingdoms" | "milestones";

export interface TimelineEvent {
  id: string; year: string; sort: number; era: EraId; category: CategoryId;
  title: string; description: string; placeholder?: boolean;
  warriorId?: string; kingdomId?: string; battleId?: string;
}
