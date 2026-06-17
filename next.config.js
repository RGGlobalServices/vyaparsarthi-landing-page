// Plain JS config (not .ts) on purpose — a TypeScript config makes Next.js
// load @parcel/watcher, whose native binary is omitted in some managed build
// environments, breaking the build.
//
// NOTE: no `output: 'export'`. Hostinger's managed "Next.js" deployment runs
// the app as a Node server and expects a `.next` build, not a static `out/`
// folder. Building as a normal server app is what works there.
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
};

module.exports = nextConfig;
