import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// GitHub Pages project site URL: https://tecush.github.io/ZScope/
// If the repository name changes, change this one line (keep both slashes).
const BASE = "/ZScope/";

// One static HTML file per route, so /ZScope/features/ is served with HTTP 200
// and its own <title>. 404.html remains the fallback for unknown URLs.
const ROUTES = {
  features: "Features — ZScope",
  verification: "Verification — ZScope",
  download: "Download — ZScope",
  contact: "Contact — ZScope",
  citation: "Citation — ZScope",
};

function staticRoutes() {
  let outDir;
  return {
    name: "static-routes",
    apply: "build",
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const indexPath = resolve(outDir, "index.html");
      const html = readFileSync(indexPath, "utf8");
      copyFileSync(indexPath, resolve(outDir, "404.html"));
      for (const [route, title] of Object.entries(ROUTES)) {
        mkdirSync(resolve(outDir, route), { recursive: true });
        writeFileSync(
          resolve(outDir, route, "index.html"),
          html.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
        );
      }
    },
  };
}

export default defineConfig(({ mode }) => ({
  // dev server: "/"   |   build and preview (production mode): "/ZScope/"
  base: mode === "production" ? BASE : "/",
  plugins: [react(), staticRoutes()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
}));
