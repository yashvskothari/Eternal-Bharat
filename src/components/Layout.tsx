import { Outlet, ScrollRestoration } from "react-router";
import { CursorGlow, ScrollUI, Splash } from "./Chrome";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function Layout() {
  return (
    <>
      <a href="#main" className="fixed top-3 left-3 z-110 -translate-y-20 rounded-full bg-gold px-5 py-2 font-semibold text-black transition focus:translate-y-0">
        Skip to content
      </a>
      <Splash />
      <ScrollUI />
      <CursorGlow />
      <Navbar />
      <main id="main" className="relative z-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
}
