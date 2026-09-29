import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The approved legacy redirects terminate on slash URLs.
  // Proxy keeps the old slash behavior for all other V9 paths.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
