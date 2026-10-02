import { useDeferredValue } from "react";
import { Link } from "react-router";
import { CardGrid, Empty, PageHero, SearchBox } from "../components/ui";
import { InfoCard, KingdomCard } from "../components/cards";
import { kingdoms } from "../data";
import { filterBy, usePageMeta, useUrlState } from "../lib/hooks";

const CULTURE = [
  ["Forts", "Legendary hill forts and defensive architecture."],
  ["Temples", "Magnificent temples representing artistic excellence."],
  ["Literature", "Growth of regional languages and classical texts."],
  ["Trade", "Maritime routes and prosperous commerce."],
];

export default function Kingdoms() {
  usePageMeta("Kingdoms | Eternal Bharat", "Explore the kingdoms that nurtured great rulers, remarkable architecture and military brilliance.");
  const [query, setQuery] = useUrlState("q");
  const results = filterBy(kingdoms, useDeferredValue(query), ["name", "capital", "dynasty"]);

  return (
    <>
      <PageHero tag="Historic Kingdoms" title="Empires That Shaped Bharat">
        Explore the kingdoms that nurtured great rulers, remarkable architecture, military brilliance and centuries of cultural heritage.
      </PageHero>
      <section className="page-container pb-8">
        <SearchBox value={query} onChange={setQuery} label="Search kingdoms" placeholder="Search Mewar, Chola, Maratha Empire..." />
      </section>
      <section className="page-section page-container">
        <h2 className="rule rule-center mb-14 text-center text-[clamp(1.9rem,4vw,2.5rem)]">Explore Kingdoms</h2>
        <CardGrid>{results.length ? results.map((k) => <KingdomCard key={k.id} kingdom={k} />) : <Empty>No kingdoms found.</Empty>}</CardGrid>
      </section>
      <section className="page-section page-container">
        <h2 className="rule rule-center mb-14 text-center text-[clamp(1.9rem,4vw,2.5rem)]">Empire Timeline</h2>
        <ol className="mx-auto grid max-w-3xl gap-3">
          {kingdoms.map((k) => (
            <li key={k.id} className="card flex items-baseline gap-6 rounded-2xl px-6 py-4">
              <strong className="w-36 shrink-0 font-display text-gold">{k.founded}</strong>
              <Link to={`/kingdoms/${k.id}`} className="font-medium text-white transition-colors hover:text-gold">{k.name}</Link>
            </li>
          ))}
        </ol>
      </section>
      <section className="page-section page-container">
        <h2 className="rule rule-center mb-14 text-center text-[clamp(1.9rem,4vw,2.5rem)]">Architecture & Culture</h2>
        <CardGrid>{CULTURE.map(([t, d]) => <InfoCard key={t} title={t}>{d}</InfoCard>)}</CardGrid>
      </section>
    </>
  );
}
