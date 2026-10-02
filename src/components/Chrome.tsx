import { useEffect, useState } from "react";
import { useLocation } from "react-router";

/** Brand splash shown once per full page load; never blocks longer than a couple of seconds. */
export function Splash() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const hide = () => window.setTimeout(() => setGone(true), 500);
    const cap = window.setTimeout(() => setGone(true), 2500);
    let t = 0;
    if (document.readyState === "complete") t = hide();
    else window.addEventListener("load", () => (t = hide()), { once: true });
    return () => { clearTimeout(t); clearTimeout(cap); };
  }, []);
  return (
    <div aria-hidden className={`fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#090909] transition-[opacity,visibility] duration-700 ${gone ? "pointer-events-none invisible opacity-0" : ""}`}>
      <div className="size-16 animate-spin rounded-full border-4 border-gold/20 border-t-gold" />
      <p className="mt-5 font-display text-lg tracking-[0.2em] text-gold">Eternal Bharat</p>
    </div>
  );
}

/** Scroll progress bar, back-to-top button and the navbar's "scrolled" state, driven by one rAF-throttled listener. */
export function ScrollUI() {
  const { pathname } = useLocation();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--progress", String(max > 0 ? window.scrollY / max : 0));
      root.dataset.scrolled = String(window.scrollY > 50);
      setShowTop(window.scrollY > 500);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [pathname]);

  return (
    <>
      <div aria-hidden className="fixed inset-x-0 top-0 z-60 h-[3px] origin-left bg-linear-to-r from-gold-light to-gold" style={{ transform: "scaleX(var(--progress, 0))" }} />
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed right-6 bottom-6 z-50 grid size-12 place-items-center rounded-full bg-gold text-lg font-bold text-black shadow-lg transition hover:-translate-y-1 hover:shadow-gold ${showTop ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        ↑
      </button>
    </>
  );
}

/** Soft gold glow that follows the pointer (fine pointers only). */
export function CursorGlow() {
  useEffect(() => {
    if (!window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) return;
    const el = document.querySelector<HTMLElement>(".cursor-glow");
    if (!el) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => el.style.setProperty("transform", `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return <div aria-hidden className="cursor-glow pointer-events-none fixed top-0 left-0 z-0 hidden size-[300px] rounded-full bg-[radial-gradient(circle,rgb(212_175_55/0.07),transparent_70%)] [@media(hover:hover)_and_(pointer:fine)]:block" />;
}
