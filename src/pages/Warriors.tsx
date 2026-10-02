import { useDeferredValue } from "react";
import { CardGrid, Empty, PageHero, SearchBox } from "../components/ui";
import { WarriorCard } from "../components/cards";
import { warriors } from "../data";
import { filterBy, usePageMeta, useUrlState } from "../lib/hooks";

export default function Warriors() {
  usePageMeta("Warriors | Eternal Bharat", "Discover the courage, strategy and legacy of India's greatest warriors.");
  const [query, setQuery] = useUrlState("q");
  const results = filterBy(warriors, useDeferredValue(query), ["name", "description", "kingdom"]);

  return (
    <>
      <PageHero tag="Legendary Warriors" title="Rulers Who Forged History">
        Discover the courage, strategy and legacy of India's greatest warriors — from Rajput defenders to empire builders.
      </PageHero>
      <section className="page-container pb-8">
        <SearchBox value={query} onChange={setQuery} label="Search warriors" placeholder="Search Maharana Pratap, Shivaji Maharaj..." />
      </section>
      <section className="page-section page-container">
        <h2 className="rule rule-center mb-14 text-center text-[clamp(1.9rem,4vw,2.5rem)]">Warriors Gallery</h2>
        <CardGrid>{results.length ? results.map((w) => <WarriorCard key={w.id} warrior={w} />) : <Empty>No warriors found.</Empty>}</CardGrid>
      </section>
    </>
  );
}
