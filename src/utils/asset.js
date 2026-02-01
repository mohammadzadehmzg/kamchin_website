import picManifest from "../data/pic.manifest.json";

function basenameFromUrl(url) {
  try {
    const u = new URL(url);
    const parts = (u.pathname || "").split("/").filter(Boolean);
    const base = parts[parts.length - 1] || "";
    return decodeURIComponent(base);
  } catch {
    return "";
  }
}

/**
 * Resolve remote WordPress-style image URLs to local `/pic/` assets.
 *
 * - If `src` is already a relative path (starts with `/`), it's returned as-is.
 * - If `src` is a URL, we map its decoded basename to a file under `/pic/` using `pic.manifest.json`.
 * - If no mapping is found, return an empty string (caller should fall back).
 */
export function resolvePic(src) {
  if (!src) return "";
  if (typeof src !== "string") return "";
  // Already a public path.
  if (src.startsWith("/")) return src;

  const base = basenameFromUrl(src);
  if (!base) return "";

  const rel = picManifest[base];
  if (!rel) return "";

  // Map to local static assets under /public/pic.
  return `/pic/${rel}`;
}
