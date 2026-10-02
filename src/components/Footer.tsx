import { Link } from "react-router";
import { NAV_LINKS } from "./Navbar";

export function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-ink-deep pt-14">
      <div className="page-container flex flex-wrap items-start justify-between gap-10 pb-10">
        <div className="max-w-xs">
          <Link to="/" className="mb-3 inline-block font-display text-2xl font-bold text-gold">Eternal Bharat</Link>
          <p className="text-sm leading-relaxed text-muted">Preserving the stories of Bharat, one legacy at a time.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {NAV_LINKS.map(({ to, label }) => (
            <Link key={to} to={to} className="text-sm text-text transition-colors hover:text-gold">{label}</Link>
          ))}
        </nav>
      </div>
      <div className="page-container flex flex-wrap items-center justify-between gap-4 border-t border-gold/10 py-5">
        <p className="text-[0.82rem] text-muted">© 2026 Eternal Bharat</p>
        <p className="text-[0.82rem] text-muted">Built to remember. Designed to inspire.</p>
      </div>
    </footer>
  );
}
