import type { Metadata } from "next";
import { ComingSoonClient } from "./ComingSoonClient";

export const metadata: Metadata = {
  title: "Coming Soon",
  description:
    "Aavira Looms — premium Indian handloom home textiles. Bedsheets, curtains, cushion covers, runners, dohars and more. Woven with warmth, rooted in tradition.",
};

export default function ComingSoonPage() {
  return <ComingSoonClient />;
}
