"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

/**
 * The real site's Header + Footer wrap every route via the root layout. /coming-soon
 * is a full-screen pre-launch splash with no nav and its own minimal footer, so it's
 * excluded here rather than inheriting the real site's chrome. Every other route's
 * markup (Header, flex-1 wrapper, Footer) is unchanged from what layout.tsx rendered
 * inline before this component existed.
 */
export function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isComingSoon = pathname?.startsWith("/coming-soon");

  if (isComingSoon) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
