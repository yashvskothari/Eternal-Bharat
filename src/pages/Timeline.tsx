import { useDeferredValue } from "react";
import { PageHero, SearchBox } from "../components/ui";
import { EraHeader, EventCard } from "../components/Timeline";
import { timeline } from "../data";
import { filterBy, usePageMeta, useUrlState } from "../lib/hooks";
import type { EraId } from "../types";

const ERAS: { id: EraId; label: string; range: string }[] = [
  { id: "ancient", label: "Ancient", range: "to 600 CE" },
  { id: "early-medieval", label: "Early Medieval", range: "600 – 1200" },
  { id: "medieval", label: "Medieval", range: "1200 – 1526" },
  { id: "early-modern", label: "Early Modern", range: "1526 – 1800" },
  { id: "modern", label: "Modern", range: "1800 onwards" },
];
const CATEGORIES = [
  { id: "all", title: "All Events", text: "The full chronological journey." },
  { id: "rulers", title: "Rulers", text: "Important births, reigns and successions." },
  { id: "battles", title: "Battles", text: "Major military campaigns and victories." },
  { id: "kingdoms", title: "Kingdoms", text: "Rise and expansion of powerful empires." },
];

export default function Timeline() {
  usePageMeta("Timeline | Eternal Bharat", "Travel across centuries and explore the rulers, empires and defining events that shaped Indian history.");
  const [query, setQuery] = useUrlState("q");
  const [category, setCategory] = useUrlState("category", "all");
  const [era, setEra] = useUrlState("era", "all");

  let events = filterBy(timeline, useDeferredValue(query), ["year", "title", "description", "category", "era"]);
  if (category !== "all") events = events.filter((e) => e.category === category);
  if (era !== "all") events = events.filter((e) => e.era === era);

  let index = 0;
  return (
    <>
      <PageHero tag="Historical Timeline" title="The Journey of Bharat Through Time">
        Travel across centuries and explore the rulers, empires and defining events that shaped Indian history.
      </PageHero>
      <section className="page-container pb-8">
        <SearchBox value={query} onChange={setQuery} label="Search timeline" placeholder="Search year, ruler or event..." />
      </section>

      <section className="page-section page-container">
        <h2 className="rule rule-center mb-14 text-center text-[clamp(1.9rem,4vw,2.5rem)]">Timeline Categories</h2>
        <div role="group" aria-label="Timeline categories" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-5">
          {CATEGORIES.map((c) => (
            <button key={c.id} type="button" aria-pressed={category === c.id} onClick={() => setCategory(c.id)}
              className="card card-hover p-6 text-left aria-pressed:border-gold aria-pressed:bg-gold/10 aria-pressed:shadow-gold">
              <h3 className="mb-1 text-lg">{c.title}</h3>
              <p className="text-sm text-muted">{c.text}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="page-container flex flex-wrap items-center justify-between gap-4 pb-10">
        <div role="group" aria-label="Eras" className="flex flex-wrap gap-2">
          <button type="button" className="chip" aria-pressed={era === "all"} onClick={() => setEra("all")}>All Eras</button>
          {ERAS.map((e) => <button key={e.id} type="button" className="chip" aria-pressed={era === e.id} onClick={() => setEra(e.id)}>{e.label}</button>)}
        </div>
        <p className="text-sm text-muted" role="status">
          {events.length ? `${events.length} event${events.length === 1 ? "" : "s"} across the chronicle` : "No events match these filters."}
        </p>
      </section>

      <section className="page-container pb-24">
        <h2 className="rule rule-center mb-14 text-center text-[clamp(1.9rem,4vw,2.5rem)]">Chronological Timeline</h2>
        {events.length ? (
          <div className="chronicle">
            {ERAS.map((def) => {
              const inEra = events.filter((e) => e.era === def.id);
              if (!inEra.length) return null;
              return [
                <EraHeader key={def.id} label={def.label} range={def.range} />,
                ...inEra.map((e) => <EventCard key={e.id} event={e} index={index++} />),
              ];
            })}
          </div>
        ) : <p className="py-10 text-center text-muted">No events found.</p>}
      </section>
    </>
  );
}
