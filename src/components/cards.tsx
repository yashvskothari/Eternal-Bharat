import { Link } from "react-router";
import type { Battle, Kingdom, Warrior } from "../types";
import { Img } from "./Img";

/** Whole-card click target via one real link (stretched with an ::after overlay). */
const stretch = "after:absolute after:inset-0 after:content-['']";
const cta = `link-gold mt-auto pt-2 ${stretch}`;

export function WarriorCard({ warrior: w }: { warrior: Warrior }) {
  return (
    <article className="card card-hover group relative flex flex-col">
      <div className="aspect-4/5 overflow-hidden bg-surface">
        <Img src={w.image} alt={w.name} className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="text-xl">{w.name}</h3>
        <span className="text-sm font-medium text-gold-light">{w.years}</span>
        <p className="line-clamp-3 text-[0.93rem] leading-relaxed text-muted">{w.description}</p>
        <Link to={`/warriors/${w.id}`} className={cta}>Know More →</Link>
      </div>
    </article>
  );
}

export function KingdomCard({ kingdom: k }: { kingdom: Kingdom }) {
  return (
    <article className="card card-hover group relative flex flex-col">
      <div className="aspect-16/10 overflow-hidden bg-surface">
        <Img src={k.mapImage} alt={`${k.name} map`} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-6">
        <h3 className="mb-1 text-xl">{k.name}</h3>
        <p className="text-sm">Capital: {k.capital}</p>
        <p className="text-sm">Dynasty: {k.dynasty}</p>
        <p className="text-sm">Period: {k.period}</p>
        <p className="mt-2 line-clamp-3 text-[0.93rem] leading-relaxed text-muted">{k.description}</p>
        <Link to={`/kingdoms/${k.id}`} className={cta}>Explore →</Link>
      </div>
    </article>
  );
}

export function BattleCard({ battle: b }: { battle: Battle }) {
  return (
    <article className="card card-hover group relative flex flex-col">
      <div className="aspect-16/10 overflow-hidden bg-surface">
        <Img src={b.image} alt={b.name} className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-6">
        <h3 className="mb-1 text-xl">{b.name}</h3>
        <p className="text-sm"><strong className="font-semibold text-white">Year:</strong> {b.year}</p>
        <p className="text-sm"><strong className="font-semibold text-white">Location:</strong> {b.location}</p>
        <p className="text-sm"><strong className="font-semibold text-white">Commanders:</strong> {b.commanders}</p>
        <p className="mt-2 line-clamp-3 text-[0.93rem] leading-relaxed text-muted">{b.description}</p>
        <Link to={`/battles/${b.id}`} className={cta}>Explore →</Link>
      </div>
    </article>
  );
}

/** Small text-only card used for the static "Architecture & Culture" / "Military Strategies" blocks. */
export function InfoCard({ title, children }: { title: string; children: string }) {
  return (
    <div className="card p-7">
      <h3 className="mb-2 text-xl">{title}</h3>
      <p className="text-[0.93rem] text-muted">{children}</p>
    </div>
  );
}
