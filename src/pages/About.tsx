import type { ReactNode } from "react";
import { Link } from "react-router";
import { usePageMeta } from "../lib/hooks";

function Heading({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <div className="mb-14 text-center">
      <span className="mb-3 block font-display text-sm font-semibold tracking-[0.2em] text-gold-light">{eyebrow}</span>
      <h2 className="rule rule-center mx-auto max-w-3xl text-[clamp(1.8rem,4vw,2.5rem)]">{title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-muted">{children}</p>
    </div>
  );
}

const PILLARS = [
  ["01/DISCOVER", "Stories Before Statistics", "Explore warriors, kingdoms and battles through meaningful stories instead of disconnected facts."],
  ["02/UNDERSTAND", "Context Creates Meaning", "Connect rulers, places, conflicts and historical periods to understand how one event influenced another."],
  ["03/REMEMBER", "Legacy Beyond the Past", "Discover the ideas, courage, architecture and cultural memory that continue to shape how Bharat is remembered."],
];
const EXPLORE = [
  ["01", "Warriors", "/warriors", "Discover rulers and commanders, their achievements, struggles and enduring legacy."],
  ["02", "Kingdoms", "/kingdoms", "Explore empires, dynasties, capitals, administration and cultural heritage."],
  ["03", "Battles", "/battles", "Understand decisive conflicts, military strategy and their historical consequences."],
  ["04", "Timeline", "/timeline", "Travel across centuries and connect major rulers, kingdoms and events chronologically."],
];
const TECH = [
  ["HTML5", "Semantic structure and accessible page layouts."],
  ["CSS3", "Responsive design, visual effects and animations."],
  ["JavaScript ES6", "Dynamic rendering, search and interactive behaviour."],
  ["JSON", "Structured historical data for scalable content."],
  ["CDN Assets", "Fast delivery of visual assets and interface resources."],
  ["Responsive UI", "Designed to remain immersive across screen sizes."],
];

export default function About() {
  usePageMeta("About | Eternal Bharat", "A journey through the courage, kingdoms, battles and civilizations that shaped Bharat.");
  const section = "page-section page-container";

  return (
    <>
      <section className="relative isolate flex min-h-[78svh] items-center justify-center overflow-hidden px-[4%] pt-40 pb-20 text-center">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_35%,rgb(212_175_55/0.18),transparent_60%)]" />
        <div className="hero-rise mx-auto max-w-3xl">
          <span className="mb-6 inline-block font-display text-sm font-semibold tracking-[0.2em] text-gold-light uppercase">The Golden Legacy of Bharat</span>
          <h1 className="mb-6 text-[clamp(2.8rem,8vw,5.5rem)] leading-[1.05] text-white">Eternal Bharat</h1>
          <p className="mx-auto mb-5 max-w-2xl font-display text-[clamp(1.1rem,2.2vw,1.45rem)] leading-relaxed text-gold-light">
            A journey through the courage, kingdoms, battles and civilizations that shaped Bharat.
          </p>
          <p className="mx-auto mb-10 max-w-xl text-muted">
            We believe history should not feel like a list of dates. It should feel like a living legacy — one that can be explored, understood and remembered.
          </p>
          <a href="#vision" className="inline-flex flex-col items-center gap-3 text-sm text-gold">
            Discover the story
            <span aria-hidden className="h-10 w-px animate-pulse bg-linear-to-b from-gold to-transparent" />
          </a>
        </div>
      </section>

      <section id="vision" className={section}>
        <Heading eyebrow="Our Vision" title="Remembering a Civilization, Not Just a Timeline">
          Eternal Bharat presents Indian history as an interconnected story of people, places, ideas, victories, struggles and enduring cultural memory.
        </Heading>
        <div className="grid items-start gap-12 min-[900px]:grid-cols-[1.3fr_1fr]">
          <div className="prose-eb space-y-6">
            <p>Bharat's history stretches across centuries of kingdoms, empires, warriors, scholars, builders and communities. Eternal Bharat is designed to make that enormous legacy easier to explore through structured information, visual storytelling and connected historical journeys.</p>
            <p>From legendary rulers and decisive battles to the kingdoms and civilizations that shaped their world, every section is intended to help visitors understand not only <em>what happened</em>, but why it mattered.</p>
          </div>
          <aside className="card rounded-3xl border-l-4 border-l-gold p-8">
            <strong className="mb-3 block font-display text-2xl text-gold">“Sone ki Chidiya”</strong>
            <p className="text-[0.95rem] leading-relaxed text-muted">The visual identity of Eternal Bharat draws inspiration from the idea of a prosperous and culturally rich Bharat — represented through a restrained golden-black palette rather than excessive ornamentation.</p>
          </aside>
        </div>
      </section>

      <section className={section}>
        <Heading eyebrow="The Philosophy" title="Three Pillars of Eternal Bharat">
          The experience is built around three simple ideas: discover the past, understand its context and carry its legacy forward.
        </Heading>
        <div className="grid gap-6 min-[900px]:grid-cols-3">
          {PILLARS.map(([n, t, d]) => (
            <article key={n} className="card card-hover p-8">
              <span className="mb-4 block font-display text-sm font-semibold text-gold-light">{n}</span>
              <h3 className="mb-3 text-xl">{t}</h3>
              <p className="text-[0.95rem] text-muted">{d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={section}>
        <Heading eyebrow="Explore Bharat" title="Four Ways to Enter the Story">
          Move between people, powers, conflicts and time to build a broader picture of India's historical legacy.
        </Heading>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-6">
          {EXPLORE.map(([n, t, to, d]) => (
            <Link key={n} to={to} className="card card-hover block p-7">
              <span className="mb-4 block font-display text-sm font-semibold text-gold-light">{n}</span>
              <h3 className="mb-2 text-xl">{t}</h3>
              <p className="text-[0.93rem] text-muted">{d}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={section}>
        <div className="grid gap-12 min-[900px]:grid-cols-[1fr_1.4fr]">
          <div>
            <span className="mb-3 block font-display text-sm font-semibold tracking-[0.2em] text-gold-light">Behind the Experience</span>
            <h2 className="rule mb-5 text-[clamp(1.8rem,3.5vw,2.4rem)]">Simple Technology. Immersive Presentation.</h2>
            <p className="max-w-[48ch] text-muted">The project keeps its architecture lightweight so the focus remains on the historical content and the experience of exploring it.</p>
          </div>
          <dl className="grid gap-4 sm:grid-cols-2">
            {TECH.map(([t, d]) => (
              <div key={t} className="card rounded-2xl p-5">
                <dt className="mb-1 font-display font-semibold text-gold">{t}</dt>
                <dd className="text-sm text-muted">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="page-section border-t border-gold/20 bg-[radial-gradient(ellipse_at_50%_100%,rgb(212_175_55/0.1),transparent_65%)] text-center">
        <div className="page-container max-w-3xl">
          <span className="mb-3 block font-display text-sm font-semibold tracking-[0.2em] text-gold-light">The Journey Continues</span>
          <h2 className="mb-6 text-[clamp(1.8rem,4vw,2.6rem)]">From a Digital Archive to a Living Experience</h2>
          <p className="mb-9 text-muted">Eternal Bharat can continue to grow with more warriors, kingdoms, battles, forts, maps, historical periods and educational resources while retaining the same core architecture.</p>
          <Link to="/timeline" className="btn btn-secondary">Begin the Journey →</Link>
          <span className="mt-10 block font-display text-gold-light">Remember the past. Understand the legacy. Inspire the future.</span>
        </div>
      </section>
    </>
  );
}
