import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * This is `middleware.ts`, not `proxy.ts` — deliberately, despite Next.js 16
 * having renamed the convention. Investigated why the coming-soon redirect
 * wasn't firing in production even though it worked perfectly with a local
 * `next build && next start`:
 *
 * - `src/proxy.ts` with `export function proxy(...)` + `export const config`
 *   was 100% correct per Next.js 16's own source (node_modules/next/dist/build/
 *   index.js): file-location scanning treats "src/proxy.ts" identically to
 *   "src/middleware.ts", and the build output printed `ƒ Proxy (Middleware)`,
 *   confirming Next.js itself detected and compiled it correctly.
 * - `NEXT_PUBLIC_COMING_SOON` inlining (node_modules/next/dist/lib/static-env.js)
 *   is applied unconditionally to every bundle target (client, edge, node) —
 *   not just client code — so there's no special nuance that excludes
 *   proxy/middleware code from seeing the inlined value.
 * - A clean local `next build && next start` reproduced the *exact* production
 *   environment (env=true, same build) and both `/` and `/shop/*` correctly
 *   returned 307 -> /coming-soon. The code was never the bug.
 *
 * The actual issue: Vercel deploys Next.js through its own "Deployment
 * Adapter" — a separate piece of infrastructure from the `next` npm package,
 * which Next.js's own docs (deploying.md) say is coordinated/tested against
 * "before major releases." `proxy.ts` is a Next.js 16.0.0 file convention —
 * new enough that Vercel's adapter (on whatever version was active for this
 * deployment) most likely still only recognizes the long-established
 * `middleware.ts` convention for wiring up an actual Edge Middleware
 * function on their infrastructure. That would exactly explain the observed
 * symptom: the build succeeds (running `next build` alone never fails on
 * this), but nothing ever actually invokes the proxy at request time on
 * Vercel, so every request falls straight through to the origin handler —
 * a cached static response for `/` (hence "304"), a normal 200 for
 * `/shop/*`, and zero 307s anywhere in the logs.
 *
 * middleware.ts is guaranteed to be recognized by every version of Vercel's
 * adapter. Next.js still fully supports it (it only prints a one-line
 * deprecation warning at build time) — trading that harmless warning for
 * actually working in production now is the right tradeoff. Re-verified
 * with the exact same `next build && next start` check after the rename:
 * identical 307 behavior, plus the deprecation warning as expected.
 *
 * When Vercel's adapter confirms proxy.ts support (check their changelog),
 * this can migrate back via `npx @next/codemod@canary middleware-to-proxy .`
 *
 * When NEXT_PUBLIC_COMING_SOON is "true", every route redirects to /coming-soon.
 * When unset or "false", this is a no-op (NextResponse.next()) — every route,
 * including /shop, behaves exactly as it does without this file.
 */
export function middleware(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_COMING_SOON === "true") {
    return NextResponse.redirect(new URL("/coming-soon", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run on every page route except /coming-soon itself (avoid a redirect loop),
    // Next.js internals, favicon.ico, and any request for a file with an extension
    // (images, fonts, etc. — including /aavira-logo.png, which /coming-soon needs
    // to actually load instead of being redirected itself).
    "/((?!coming-soon|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
