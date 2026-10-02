import { useDeferredValue } from "react";
import { Link } from "react-router";
import { CardGrid, Empty, PageHero, SearchBox } from "../components/ui";
import { BattleCard, InfoCard } from "../components/cards";
import { battles } from "../data";
import { filterBy, usePageMeta, useUrlState } from "../lib/hooks";

const STRATEGIES = [
  ["Guerrilla Warfare", "Fast, mobile tactics perfected by the Marathas."],
  ["Fort Defense", "Strategic use of hill forts and terrain."],
  ["Cavalry Charges", "Rapid assaults by elite horsemen."],
  ["Naval Warfare", "Control of seas through organized fleets."],
];

export default function Battles() {
  usePageMeta("Battles | Eternal Bharat", "Explore decisive battles that shaped kingdoms, protected civilizations and changed the course of Indian history.");
  const [query, setQuery] = useUrlState("q");
  const results = filterBy(battles, useDeferredValue(query), ["name", "location", "commanders", "year"]);

  return (
    <>
      <PageHero tag="Historic Battles" title="Defining Battles of Bharat">
        Explore decisive battles that shaped kingdoms, protected civilizations and changed the course of Indian history.
      </PageHero>
      <section className="page-container pb-8">
        <SearchBox value={query} onChange={setQuery} label="Search battles" placeholder="Search Battle of Haldighati, Panipat..." />
      </section>
      <section className="page-section page-container">
        <h2 className="rule rule-center mb-14 text-center text-[clamp(1.9rem,4vw,2.5rem)]">Major Battles</h2>
        <CardGrid>{results.length ? results.map((b) => <BattleCard key={b.id} battle={b} />) : <Empty>No battles found.</Empty>}</CardGrid>
      </section>
      <section className="page-section page-container">
        <h2 className="rule rule-center mb-14 text-center text-[clamp(1.9rem,4vw,2.5rem)]">Battle Timeline</h2>
        <ol className="mx-auto grid max-w-3xl gap-3">
          {results.length ? results.map((b) => (
            <li key={b.id} className="card flex items-baseline gap-6 rounded-2xl px-6 py-4">
              <strong className="w-36 shrink-0 font-display text-gold">{b.year}</strong>
              <Link to={`/battles/${b.id}`} className="font-medium text-white transition-colors hover:text-gold">{b.name}</Link>
            </li>
          )) : <Empty>No battles found.</Empty>}
        </ol>
      </section>
      <section className="page-section page-container">
        <h2 className="rule rule-center mb-14 text-center text-[clamp(1.9rem,4vw,2.5rem)]">Military Strategies</h2>
        <CardGrid>{STRATEGIES.map(([t, d]) => <InfoCard key={t} title={t}>{d}</InfoCard>)}</CardGrid>
      </section>
    </>
  );
}
