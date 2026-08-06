import { rmSync } from "node:fs";
import { resolve } from "node:path";

const generatedPaths = [".next", "test-results", "playwright-report"];

for (const relativePath of generatedPaths) {
  rmSync(resolve(process.cwd(), relativePath), {
    recursive: true,
    force: true,
  });
}

console.log("Removed generated Next.js and Playwright state.");
