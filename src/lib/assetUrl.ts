/** Vite: string URL. Next.js legacy: `{ src: string }`. */
export function assetUrl(
  asset: string | { src: string; default?: string }
): string {
  if (typeof asset === "string") return asset;
  return asset.src ?? asset.default ?? "";
}
