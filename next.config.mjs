/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "uw6sp52zpggjhn1x.public.blob.vercel-storage.com",
                port: "",
                pathname: "**"
            }
        ]
    }
};

export default nextConfig;
