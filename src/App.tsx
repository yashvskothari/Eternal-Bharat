import type { ComponentType } from "react";
import { Navigate, createBrowserRouter, useSearchParams, type RouteObject } from "react-router";
import { Layout } from "./components/Layout";
import { NotFound } from "./components/ui";

/** Route-level code splitting: each page is its own chunk, loaded on first visit. */
const page = (path: string | undefined, load: () => Promise<{ default: ComponentType }>): RouteObject =>
  path === undefined
    ? { index: true, lazy: async () => ({ Component: (await load()).default }) }
    : { path, lazy: async () => ({ Component: (await load()).default }) };

/** Keeps links from the old multi-page site (warrior.html?id=shivaji) working. */
function LegacyRedirect({ to }: { to: string }) {
  const [params] = useSearchParams();
  const id = params.get("id");
  return <Navigate to={id ? `${to}/${id}` : to} replace />;
}
const legacy: [string, string][] = [
  ["index.html", "/"], ["warriors.html", "/warriors"], ["kingdoms.html", "/kingdoms"], ["battles.html", "/battles"],
  ["timeline.html", "/timeline"], ["about.html", "/about"], ["warrior.html", "/warriors"], ["kingdom.html", "/kingdoms"], ["battle.html", "/battles"],
];

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    HydrateFallback: () => null,
    children: [
      page(undefined, () => import("./pages/Home")),
      page("warriors", () => import("./pages/Warriors")),
      page("warriors/:id", () => import("./pages/WarriorDetail")),
      page("kingdoms", () => import("./pages/Kingdoms")),
      page("kingdoms/:id", () => import("./pages/KingdomDetail")),
      page("battles", () => import("./pages/Battles")),
      page("battles/:id", () => import("./pages/BattleDetail")),
      page("timeline", () => import("./pages/Timeline")),
      page("about", () => import("./pages/About")),
      ...legacy.map(([path, to]): RouteObject => ({ path, element: <LegacyRedirect to={to} /> })),
      { path: "*", element: <NotFound what="Page" back="Back to Home" backTo="/" /> },
    ],
  },
];

export const createRouter = () =>
  createBrowserRouter(routes, { basename: import.meta.env.BASE_URL.replace(/\/$/, "") || "/" });
