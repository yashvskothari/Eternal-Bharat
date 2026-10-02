import type { ReactNode } from "react";
import { Link } from "react-router";
import { useScrollSpy, usePageMeta } from "../lib/hooks";
import { Img } from "./Img";

export interface DetailSection { id: string; title: string; subtitle?: string; body: ReactNode }
export interface DetailAction { label: string; to?: string; href?: string; primary?: boolean }
export interface NavTarget { to: string; label: string }

interface Props {
  metaTitle: string;
  metaDescription: string;
  badge: string;
  name: string;
  subtitle?: string;
  years?: string;
  description: string;
  image: string;
  imageFit?: "cover" | "contain";
  actions: DetailAction[];
  facts: { label: string; value: ReactNode }[];
  sections: DetailSection[];
  prev?: NavTarget;
  next?: NavTarget;
}

/** One layout for warrior, kingdom and battle pages: hero, quick facts, scroll-spied sections, prev/next. */
export function Detail(p: Props) {
  usePageMeta(p.metaTitle, p.metaDescription);
  const sections = p.sections.filter((s) => s.body);
  const active = useScrollSpy(sections.map((s) => s.id));

  return (
    <>
      <section className="relative isolate overflow-hidden px-[4%] pt-40 pb-16 md:pt-44">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_20%,rgb(212_175_55/0.16),transparent_55%)]" />
        <div className="mx-auto grid max-w-325 items-center gap-12 min-[900px]:grid-cols-[1.25fr_1fr]">
          <div className="hero-rise">
            <span className="mb-5 inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold-light">{p.badge}</span>
            <h1 className="mb-3 text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.1] text-white">{p.name}</h1>
            {p.subtitle && <p className="mb-1 font-display text-xl text-gold">{p.subtitle}</p>}
            {p.years && <p className="mb-5 text-sm font-medium text-gold-light">{p.years}</p>}
            <p className="mb-8 max-w-[60ch] text-[1.02rem] leading-relaxed text-text">{p.description}</p>
            <div className="flex flex-wrap gap-4">
              {p.actions.map((a) =>
                a.to ? (
                  <Link key={a.label} to={a.to} className={`btn ${a.primary ? "btn-primary" : "btn-secondary"}`}>{a.label}</Link>
                ) : (
                  <a key={a.label} href={a.href} className={`btn ${a.primary ? "btn-primary" : "btn-secondary"}`}>{a.label}</a>
                ),
              )}
            </div>
          </div>
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-gold/30 bg-surface shadow-[0_25px_70px_rgb(0_0_0/0.55),var(--shadow-gold)] min-[900px]:max-w-none">
            <Img src={p.image} alt={p.name} priority className={`aspect-4/5 size-full max-h-[620px] min-[900px]:aspect-auto min-[900px]:h-[min(60vh,560px)] ${p.imageFit === "contain" ? "object-contain p-3" : "object-cover object-top"}`} />
          </div>
        </div>
      </section>

      <section className="page-container pb-6">
        <h2 className="mb-6 text-2xl">Quick Facts</h2>
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
          {p.facts.map((f) => (
            <div key={f.label} className="card rounded-2xl p-5">
              <dt className="mb-1 font-display text-sm font-semibold text-gold">{f.label}</dt>
              <dd className="text-[0.95rem] text-white">{f.value || "—"}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="page-container grid gap-12 py-14 min-[1100px]:grid-cols-[210px_minmax(0,1fr)]">
        <nav aria-label="Sections" className="sticky top-28 hidden self-start min-[1100px]:block">
          <ul className="grid gap-1 border-l border-gold/20">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined} className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors ${active === s.id ? "border-gold text-gold" : "border-transparent text-muted hover:text-white"}`}>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid min-w-0 gap-16">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <h2 className="rule mb-7 text-[clamp(1.6rem,3vw,2.1rem)]">{s.title}</h2>
              {s.subtitle && <p className="mb-8 max-w-[60ch] text-muted">{s.subtitle}</p>}
              {s.body}
            </section>
          ))}
        </div>
      </div>

      <nav aria-label="More" className="page-container flex flex-wrap justify-between gap-4 border-t border-gold/15 py-12">
        {p.prev ? <Link to={p.prev.to} className="link-gold">{p.prev.label}</Link> : <span />}
        {p.next ? <Link to={p.next.to} className="link-gold">{p.next.label}</Link> : <span />}
      </nav>
    </>
  );
}

/** Prose paragraph with comfortable measure. */
export const Prose = ({ children }: { children: ReactNode }) => <p className="prose-eb">{children}</p>;

/** Grid of small linked cards (battles, rulers). */
export const MiniGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-5">{children}</div>
);
export const MiniCard = ({ title, children }: { title: ReactNode; children?: ReactNode }) => (
  <article className="card rounded-2xl p-6">
    <h3 className="mb-2 text-lg">{title}</h3>
    <div className="space-y-1 text-[0.93rem] text-muted">{children}</div>
  </article>
);
