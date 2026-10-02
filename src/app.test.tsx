import { cleanup, render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { routes } from "./App";
import { battles, kingdoms, timeline, warriors } from "./data";

window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
afterEach(cleanup);

async function visit(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);
  return screen.findByRole("heading", { level: 1 });
}

describe("static pages", () => {
  it.each([
    ["/", "Warriors Who Forged History"],
    ["/warriors", "Rulers Who Forged History"],
    ["/kingdoms", "Empires That Shaped Bharat"],
    ["/battles", "Defining Battles of Bharat"],
    ["/timeline", "The Journey of Bharat Through Time"],
    ["/about", "Eternal Bharat"],
  ])("%s renders", async (path, title) => {
    expect((await visit(path)).textContent).toBe(title);
  });

  it("shows every timeline event", async () => {
    await visit("/timeline");
    expect(screen.getByRole("status", { name: "" }).textContent).toContain(`${timeline.length} events`);
  });

  it("redirects legacy URLs", async () => {
    expect((await visit("/warrior.html?id=shivaji")).textContent).toBe(warriors.find((w) => w.id === "shivaji")!.name);
  });

  it("shows a not-found state for unknown ids", async () => {
    expect((await visit("/warriors/nobody")).textContent).toBe("Warrior Not Found");
  });
});

describe("every detail page renders", () => {
  it.each(warriors.map((w) => [`/warriors/${w.id}`, w.name]))("%s", async (path, name) => expect((await visit(path)).textContent).toBe(name));
  it.each(kingdoms.map((k) => [`/kingdoms/${k.id}`, k.name]))("%s", async (path, name) => expect((await visit(path)).textContent).toBe(name));
  it.each(battles.map((b) => [`/battles/${b.id}`, b.name]))("%s", async (path, name) => expect((await visit(path)).textContent).toBe(name));
});
