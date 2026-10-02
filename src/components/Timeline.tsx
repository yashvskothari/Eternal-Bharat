import { Link } from "react-router";
import type { CategoryId, TimelineEntry, TimelineEvent } from "../types";
import { battleById, kingdomById, warriorById } from "../data";

export const CATEGORY_LABELS: Record<CategoryId, string> = { rulers: "Rulers", battles: "Battles", kingdoms: "Kingdoms", milestones: "Milestones" };
const CATEGORY_STYLES: Record<CategoryId, string> = {
  rulers: "border-gold/40 bg-gold/10 text-gold-light",
  battles: "border-danger/35 bg-danger/10 text-danger",
  kingdoms: "border-success/35 bg-success/10 text-success",
  milestones: "border-white/25 bg-white/6 text-text",
};

export function CategoryTag({ category }: { category: CategoryId }) {
  return <span className={`rounded-full border px-3 py-0.5 text-xs font-medium ${CATEGORY_STYLES[category]}`}>{CATEGORY_LABELS[category]}</span>;
}

export function EraHeader({ label, range }: { label: string; range: string }) {
  return (
    <header className="relative z-1 mt-6 flex items-baseline justify-center gap-3 justify-self-center rounded-full border border-gold/40 bg-[#111] px-7 py-2.5 first:mt-0">
      <span className="font-display text-lg font-semibold text-gold">{label}</span>
      <small className="text-muted">{range}</small>
    </header>
  );
}

function Card({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <article className={`chronicle-item reveal ${index % 2 === 0 ? "is-left" : "is-right"}`}>
      <div className="card card-hover rounded-2xl p-6">{children}</div>
    </article>
  );
}

/** Event card for the main chronicle (with links to related warrior / kingdom / battle pages). */
export function EventCard({ event: e, index }: { event: TimelineEvent; index: number }) {
  const links = [
    e.warriorId && warriorById.has(e.warriorId) && { to: `/warriors/${e.warriorId}`, label: "View Warrior →" },
    e.kingdomId && kingdomById.has(e.kingdomId) && { to: `/kingdoms/${e.kingdomId}`, label: "View Kingdom →" },
    e.battleId && battleById.has(e.battleId) && { to: `/battles/${e.battleId}`, label: "View Battle →" },
  ].filter(Boolean) as { to: string; label: string }[];

  return (
    <Card index={index}>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <CategoryTag category={e.category} />
        {e.placeholder && <span className="rounded-full border border-dashed border-white/30 px-3 py-0.5 text-xs text-muted">Placeholder</span>}
      </div>
      <h3 className="text-2xl">{e.year}</h3>
      <h4 className="mt-1 mb-2 font-sans text-base font-semibold text-white">{e.title}</h4>
      <p className="text-[0.93rem] text-muted">{e.description}</p>
      {links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {links.map((l) => <Link key={l.to} to={l.to} className="link-gold">{l.label}</Link>)}
        </div>
      )}
    </Card>
  );
}

/** Same chronicle style, scoped to a single kingdom's own events. */
export function KingdomChronicle({ events, dynasty, period }: { events: TimelineEntry[]; dynasty: string; period: string }) {
  return (
    <div className="chronicle">
      <EraHeader label={dynasty} range={period} />
      {events.map((e, i) => (
        <Card key={`${e.year}-${i}`} index={i}>
          <div className="mb-3"><CategoryTag category="kingdoms" /></div>
          <h3 className="text-2xl">{e.year}</h3>
          <h4 className="mt-1 mb-2 font-sans text-base font-semibold text-white">{e.event || e.title}</h4>
          {e.description && <p className="text-[0.93rem] text-muted">{e.description}</p>}
        </Card>
      ))}
    </div>
  );
}

/** Simple vertical list used on warrior pages. */
export function StoryTimeline({ events }: { events: TimelineEntry[] }) {
  return (
    <ol className="relative ml-2 grid gap-7 border-l border-gold/30 pl-8">
      {events.map((e, i) => (
        <li key={`${e.year}-${i}`} className="relative before:absolute before:top-2 before:-left-[39px] before:size-3 before:rounded-full before:border-2 before:border-gold before:bg-ink">
          <span className="font-display text-lg font-semibold text-gold">{e.year}</span>
          <h3 className="mt-0.5 font-sans text-base font-semibold text-white">{e.event || e.title}</h3>
          {e.description && <p className="mt-1 max-w-[62ch] text-[0.93rem] text-muted">{e.description}</p>}
        </li>
      ))}
    </ol>
  );
}
