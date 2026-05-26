import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "agmxrontqhhuqnprhtsc.supabase.co",
      },
    ],
  },
}

export default nextConfig
