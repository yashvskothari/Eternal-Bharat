import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";

/** Sets the document title (and optional meta description) for the current page. */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (!description) return;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);
}

/** A string kept in the URL query (?key=value) so searches and filters are shareable. */
export function useUrlState(key: string, fallback = "") {
  const [params, setParams] = useSearchParams();
  const value = params.get(key) ?? fallback;
  const set = useCallback(
    (next: string) =>
      setParams(
        (prev) => {
          const p = new URLSearchParams(prev);
          if (next && next !== fallback) p.set(key, next);
          else p.delete(key);
          return p;
        },
        { replace: true, preventScrollReset: true },
      ),
    [key, fallback, setParams],
  );
  return [value, set] as const;
}

/** Case-insensitive "contains" filter across the given fields. */
export function filterBy<T>(items: T[], query: string, fields: (keyof T)[]): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((item) => fields.some((f) => String(item[f] ?? "").toLowerCase().includes(q)));
}

/** Tracks which section id is currently in view (for the "on this page" nav). */
export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join("|");
  useEffect(() => {
    const els = key.split("|").map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    if (!els.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-25% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
  return active;
}
