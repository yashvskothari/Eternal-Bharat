// GitHub Pages has no SPA rewrites: serving index.html as 404.html makes deep links
// like /warriors/shivaji load the app instead of a 404 page.
import { copyFileSync } from "node:fs";
copyFileSync("dist/index.html", "dist/404.html");
