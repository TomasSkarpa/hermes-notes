import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import type { ReactNode } from "react";

export const metadata: Metadata = createPageMetadata("/study", {
  title: "Study — HermesNotes",
  description:
    "Study English phrases and idioms with spaced repetition flashcards. Review due cards and track your progress.",
});

export default function StudyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
