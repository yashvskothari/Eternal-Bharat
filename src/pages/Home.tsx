import { useDeferredValue, useState } from "react";
import { Link } from "react-router";
import { CardGrid, Empty, SectionHeading } from "../components/ui";
import { WarriorCard } from "../components/cards";
import { Img } from "../components/Img";
import { kingdomById, warriors } from "../data";
import { filterBy, usePageMeta } from "../lib/hooks";

const HERO_IMAGE = "https://cdn.jsdelivr.net/gh/yashvskothari/Eternal-Bharat-assets@main/assets/images/hero/hero-home.png";
const KINGDOM_PREVIEW = ["mewar", "maratha", "chola", "maurya", "sikh"];
const HIGHLIGHTS = [
  { n: "01", title: "Warriors", text: "Discover legendary rulers and commanders." },
  { n: "02", title: "Kingdoms", text: "Explore the empires and dynasties they built." },
  { n: "03", title: "Legacy", text: "Understand the impact that remains today." },
];

export default function Home() {
  usePageMeta("Eternal Bharat", "Discover the legacy of India's greatest warriors, kingdoms, battles and history.");
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const results = filterBy(warriors, deferred, ["name", "description", "kingdom"]);
  const featured = warriors.filter((w) => w.featured).slice(0, 4);
  const previewKingdoms = KINGDOM_PREVIEW.map((id) => kingdomById.get(id)).filter((k) => !!k);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-svh items-center overflow-hidden pt-36 pb-24">
        <Img src={HERO_IMAGE} alt="" priority className="absolute inset-0 -z-30 size-full object-cover object-[60%_center]" />
        <div aria-hidden className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgb(5_5_5/0.92)_0%,rgb(5_5_5/0.78)_35%,rgb(5_5_5/0.42)_65%,rgb(5_5_5/0.68)_100%),linear-gradient(180deg,rgb(5_5_5/0.25),rgb(5_5_5/0.15)_55%,rgb(5_5_5/0.85))] max-md:bg-[linear-gradient(90deg,rgb(5_5_5/0.88),rgb(5_5_5/0.55)),linear-gradient(180deg,rgb(5_5_5/0.2),rgb(5_5_5/0.9))]" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_45%,rgb(212_175_55/0.12),transparent_32%)]" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-linear-to-b from-transparent to-ink" />
        <div className="hero-rise page-container max-md:text-center">
          <p className="mb-5 inline-flex items-center gap-4 font-display text-sm font-semibold tracking-[0.2em] text-gold-light uppercase before:h-0.5 before:w-10 before:bg-linear-to-r before:from-transparent before:to-gold max-md:before:hidden">The Golden Legacy of Bharat</p>
          <h1 className="mb-6 max-w-212 text-[clamp(2.4rem,6vw,5.6rem)] leading-[1.08] text-white [text-shadow:0_4px_25px_rgb(0_0_0/0.65)]">Warriors Who Forged History</h1>
          <p className="mb-9 max-w-162 text-[1.05rem] leading-[1.9] text-white/80 max-md:mx-auto">
            Explore the lives, kingdoms, victories and legacy of India's greatest rulers who defended civilization through courage, sacrifice and vision.
          </p>
          <div className="flex flex-wrap gap-4 max-md:justify-center">
            <a href="#warriors" className="btn btn-primary min-w-47.5">Explore Warriors</a>
            <Link to="/timeline" className="btn btn-secondary min-w-40">View Timeline</Link>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="page-section text-center">
        <h2 className="mb-6 text-[clamp(1.9rem,4vw,2.5rem)]"><label htmlFor="search">Find Your Warrior</label></h2>
        <input
          id="search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Maharana Pratap, Shivaji Maharaj..."
          autoComplete="off"
          className="mx-auto block w-[min(90%,700px)] rounded-full border border-gold/25 bg-[#181818] px-6 py-4.5 text-white outline-none transition placeholder:text-muted focus:border-gold focus:shadow-[0_0_20px_rgb(212_175_55/0.15)]"
        />
      </section>

      {/* Featured */}
      <section id="warriors" className="page-section page-container">
        <SectionHeading title="Greatest Warriors">Explore legendary rulers, commanders and defenders who shaped Bharat.</SectionHeading>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,270px),1fr))] gap-6">
          {featured.map((w) => (
            <article key={w.id} className="card card-hover group relative flex flex-col gap-3 border-t-2 border-t-gold p-8">
              <span className="text-sm font-medium text-gold-light">{w.years}</span>
              <h3 className="text-2xl">{w.name}</h3>
              <p className="line-clamp-4 text-[0.95rem] leading-relaxed text-muted">{w.description}</p>
              <Link to={`/warriors/${w.id}`} className="link-gold mt-auto pt-3 after:absolute after:inset-0">Explore Legacy →</Link>
            </article>
          ))}
        </div>
      </section>

      {/* All warriors (filtered by the search above) */}
      <section className="page-section page-container">
        <SectionHeading title="Explore All Warriors">Browse the gallery of legendary rulers and commanders from across Bharat's history.</SectionHeading>
        <CardGrid>
          {results.length ? results.map((w) => <WarriorCard key={w.id} warrior={w} />) : <Empty>No warriors found.</Empty>}
        </CardGrid>
      </section>

      {/* Kingdoms */}
      <section className="page-section page-container">
        <SectionHeading title="Powerful Kingdoms">Learn about the empires ruled by these legendary kings and queens.</SectionHeading>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-6">
          {previewKingdoms.map((k) => (
            <Link key={k.id} to={`/kingdoms/${k.id}`} className="card card-hover group block">
              <div className="aspect-4/3 overflow-hidden bg-surface">
                <Img src={k.mapImage || k.image} alt={`${k.name} map`} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h3 className="p-5 text-center text-xl">{k.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="border-y border-gold/25 bg-[linear-gradient(135deg,rgb(212_175_55/0.06),transparent_50%)] px-5 py-28 text-center">
        <div className="mx-auto w-[min(900px,92%)]">
          <span className="mb-6 block text-xs font-semibold tracking-[0.3em] text-gold uppercase">A Legacy That Lives On</span>
          <blockquote className="font-display text-[clamp(1.5rem,3vw,2.4rem)] leading-relaxed text-white">
            "The legacy of great warriors lives not in monuments, but in the courage they inspire."
          </blockquote>
          <span className="mx-auto mt-8 mb-4 block h-0.5 w-[70px] bg-gold" />
          <p className="text-sm tracking-wide text-muted">— Eternal Bharat</p>
        </div>
      </section>

      {/* About preview */}
      <section className="page-section">
        <div className="mx-auto w-[min(1100px,92%)]">
          <div className="mb-14 text-center">
            <span className="mb-3 block text-xs font-semibold tracking-[0.25em] text-gold">OUR PURPOSE</span>
            <h2 className="rule rule-center text-[clamp(1.9rem,4vw,2.5rem)]">Why Eternal Bharat?</h2>
            <p className="mt-4 text-muted">Remembering the people, kingdoms and stories that shaped Bharat.</p>
          </div>
          <div className="grid items-center gap-14 min-[900px]:grid-cols-2">
            <div className="max-w-150 space-y-5">
              <p className="leading-[1.9]">
                Eternal Bharat is a tribute to the greatest warriors and rulers in Bharatiya history. It brings together their kingdoms, battles, forts, and remarkable journeys, preserving the stories of those who shaped the course of the nation through courage and leadership.
              </p>
              <p className="leading-[1.9]">
                From legendary kings and queens to iconic victories and historic strongholds, discover the people and places that defined different eras of Bharat and continue to inspire pride across generations.
              </p>
              <Link to="/about" className="btn btn-secondary mt-3">Discover Our Purpose →</Link>
            </div>
            <div className="grid gap-3">
              {HIGHLIGHTS.map((h) => (
                <div key={h.n} className="card card-hover flex items-start gap-5 p-5.5">
                  <span className="shrink-0 font-display text-xl text-gold">{h.n}</span>
                  <div>
                    <h3 className="mb-1 text-lg">{h.title}</h3>
                    <p className="text-sm text-muted">{h.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
