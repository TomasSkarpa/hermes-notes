import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import type { ReactNode } from "react";

export const metadata: Metadata = createPageMetadata("/stats", {
  title: "Statistics — HermesNotes",
  description:
    "View your learning statistics, progress, and achievements. Track your streak, total reviews, and phrases learned.",
});

export default function StatsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
