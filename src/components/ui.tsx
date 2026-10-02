import type { ReactNode } from "react";
import { Link } from "react-router";

export function SectionHeading({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="mb-14 text-center">
      <h2 className="rule rule-center text-[clamp(1.9rem,4vw,2.5rem)]">{title}</h2>
      {children && <p className="mx-auto mt-4 max-w-175 text-text">{children}</p>}
    </div>
  );
}

/** Compact hero used by the Warriors / Kingdoms / Battles / Timeline pages. */
export function PageHero({ tag, title, children }: { tag: string; title: string; children: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden px-[4%] pt-44 pb-16 text-center">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgb(212_175_55/0.14),transparent_62%)]" />
      <div className="hero-rise mx-auto max-w-212">
        <span className="mb-5 inline-block font-display text-sm font-semibold tracking-[0.2em] text-gold-light uppercase">{tag}</span>
        <h1 className="mb-5 text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.1] text-white">{title}</h1>
        <p className="mx-auto max-w-160 text-lg leading-relaxed text-text/90">{children}</p>
      </div>
    </section>
  );
}

export function SearchBox({ value, onChange, placeholder, label }: { value: string; onChange: (v: string) => void; placeholder: string; label: string }) {
  return (
    <div className="mx-auto w-full max-w-187.5">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        autoComplete="off"
        className="w-full rounded-full border border-gold/25 bg-[#181818] px-6 py-4 text-[0.95rem] text-white outline-none transition placeholder:text-muted focus:border-gold focus:shadow-[0_0_20px_rgb(212_175_55/0.15)] focus-visible:outline-none"
      />
    </div>
  );
}

export const CardGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-7">{children}</div>
);

export const Empty = ({ children }: { children: ReactNode }) => (
  <p className="col-span-full py-10 text-center text-muted" role="status">{children}</p>
);

/** Link that only renders as a link when its target exists (avoids dead links to unwritten pages). */
export function MaybeLink({ to, exists, children, className = "link-gold" }: { to: string; exists: boolean; children: ReactNode; className?: string }) {
  return exists ? <Link to={to} className={className}>{children}</Link> : <>{children}</>;
}

export function GoldList({ items }: { items: string[] }) {
  return (
    <ul className="grid max-w-190 gap-3">
      {items.map((item) => (
        <li key={item} className="relative pl-7 leading-relaxed text-text before:absolute before:top-[0.7em] before:left-1 before:size-2 before:rotate-45 before:bg-gold">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function NotFound({ what, back, backTo }: { what: string; back: string; backTo: string }) {
  return (
    <section className="page-container py-48 text-center">
      <h1 className="mb-6 text-4xl">{what} Not Found</h1>
      <Link to={backTo} className="btn btn-secondary">{back}</Link>
    </section>
  );
}
