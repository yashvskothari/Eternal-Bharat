import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/warriors", label: "Warriors" },
  { to: "/kingdoms", label: "Kingdoms" },
  { to: "/battles", label: "Battles" },
  { to: "/timeline", label: "Timeline" },
  { to: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const bar = "block h-[3px] w-6.5 rounded-full bg-gold transition-transform duration-300";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Primary"
        className="relative mx-auto mt-4 flex w-[min(92%,1300px)] items-center justify-between rounded-card border border-gold/20 bg-[#0f0f0f]/75 px-5 py-3.5 backdrop-blur-xl transition-[margin,background,box-shadow,border-color] duration-300 min-[900px]:px-8 [html[data-scrolled='true']_&]:mt-2 [html[data-scrolled='true']_&]:border-gold/30 [html[data-scrolled='true']_&]:bg-[#080808]/95 [html[data-scrolled='true']_&]:shadow-[0_8px_30px_rgb(0_0_0/0.35)]"
      >
        <Link to="/" className="font-display text-2xl font-bold tracking-wide text-gold transition hover:text-gold-light max-[400px]:text-xl">
          Eternal Bharat
        </Link>

        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((o) => !o)}
          className="flex size-9 flex-col items-center justify-center gap-[5px] min-[900px]:hidden"
        >
          <span className={`${bar} ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`${bar} ${open ? "opacity-0" : ""}`} />
          <span className={`${bar} ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>

        <ul
          id="nav-links"
          className={`${open ? "flex" : "hidden"} absolute top-[calc(100%+10px)] left-0 w-full flex-col items-center gap-7 rounded-card border border-gold/20 bg-[#0c0c0c] p-9 shadow-lift backdrop-blur-xl min-[900px]:static min-[900px]:flex min-[900px]:w-auto min-[900px]:flex-row min-[900px]:gap-9 min-[900px]:border-0 min-[900px]:bg-transparent min-[900px]:p-0 min-[900px]:shadow-none`}
        >
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `relative inline-block text-[0.97rem] font-medium transition-colors after:absolute after:-bottom-2 after:left-1/2 after:h-0.5 after:-translate-x-1/2 after:rounded-full after:bg-gold after:transition-[width] after:duration-300 hover:text-gold hover:after:w-full ${isActive ? "text-gold after:w-full" : "text-white after:w-0"}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
