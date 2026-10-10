/** @type {import("next").NextConfig} */
const nextConfig = {
  // Static export: `npm run build` writes the whole site to out/ (host it on Cloudflare Pages, S3, anywhere).
  output: "export",
  // Let other machines on the local network open the dev server (hot reload included).
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.16.*.*", "*.local"],
  poweredByHeader: false,
  compress: true,
  // The image optimizer needs a server, so images are served as-is (already small AVIF/WebP/JPG). Cache headers live in public/_headers.
  images: { unoptimized: true },
};
export default nextConfig;
