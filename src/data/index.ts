// Single typed entry point for all content. Edit the JSON files to change content;
// run `npm run validate:data` to catch broken cross-references.
import type { Battle, Kingdom, TimelineEvent, Warrior } from "../types";
import warriorsJson from "./warriors.json";
import kingdomsJson from "./kingdoms.json";
import battlesJson from "./battles.json";
import timelineJson from "./timeline.json";

export const warriors = warriorsJson as unknown as Warrior[];
export const kingdoms = kingdomsJson as unknown as Kingdom[];
export const timeline = (timelineJson as unknown as TimelineEvent[])
  .slice()
  .sort((a, b) => (a.sort || 0) - (b.sort || 0));

// Chronological, same order the original Battles page used.
export const battles = (battlesJson as unknown as Battle[])
  .slice()
  .sort((a, b) => parseInt(a.year, 10) - parseInt(b.year, 10));

const index = <T extends { id: string }>(items: T[]) => new Map(items.map((i) => [i.id, i]));
export const warriorById = index(warriors);
export const kingdomById = index(kingdoms);
export const battleById = index(battles);

/** Previous / next item in a list, for the detail-page footers. */
export function siblings<T extends { id: string }>(items: T[], id: string) {
  const i = items.findIndex((x) => x.id === id);
  return { prev: items[i - 1], next: items[i + 1] };
}
