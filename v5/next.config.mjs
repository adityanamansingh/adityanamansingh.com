/** @type {import("next").NextConfig} */
const nextConfig = {
  // Let other machines on the local network open the dev server (hot reload included).
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.16.*.*", "*.local"],
  poweredByHeader: false,
  compress: true,
  images: { localPatterns: [{ pathname: "/images/**" }, { pathname: "/photo.jpg" }], formats: ["image/avif", "image/webp"], minimumCacheTTL: 60 * 60 * 24 },
  async headers() {
    // Static images in /public: cache for an hour in the browser, serve stale for a day while revalidating (so replaced images show up soon).
    return [{ source: "/images/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }] }];
  },
};
export default nextConfig;
