import fs from "node:fs";
import path from "node:path";

const EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg"]);

/**
 * Looks in public/images and returns { "<file name without extension>": "/images/<file>" }.
 * Drop a file named e.g. portrait.jpg or life-trek.webp in there and the site picks it up (restart the production server after adding).
 * Names used: portrait, life-trek, life-mountain, life-music, life-dance, life-travel, project-<slug>[-2..4].
 */
export function getImages(): Record<string, string> {
  const dir = path.join(process.cwd(), "public", "images");
  const out: Record<string, string> = {};
  try {
    for (const f of fs.readdirSync(dir)) {
      const ext = path.extname(f).toLowerCase();
      if (EXT.has(ext)) out[path.basename(f, ext)] = `/images/${f}?v=${Math.round(fs.statSync(path.join(dir, f)).mtimeMs)}`; // ?v= busts browser caches when a file is replaced
    }
  } catch { /* folder missing: no images yet */ }
  return out;
}
