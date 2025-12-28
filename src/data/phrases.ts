import phrasesData from "./phrases.json";
import phrasesB1Data from "./phrases-b1.json";
import phrasesB2Data from "./phrases-b2.json";
import phrasesC1Data from "./phrases-c1.json";
import { Phrase } from "@/types";

// Merge all phrases from different files
// Ensure unique IDs by offsetting IDs from different files
const allPhrases: Phrase[] = [
  ...(phrasesData.phrases as Phrase[]),
  ...phrasesB1Data.phrases.map((p) => ({
    ...p,
    id: p.id + 1000, // Offset B1 phrases to avoid ID conflicts
    level: p.level as "B1" | "B2" | "C1",
  })),
  ...phrasesB2Data.phrases.map((p) => ({
    ...p,
    id: p.id + 2000, // Offset B2 phrases to avoid ID conflicts
    level: p.level as "B1" | "B2" | "C1",
  })),
  ...phrasesC1Data.phrases.map((p) => ({
    ...p,
    id: p.id + 3000, // Offset C1 phrases to avoid ID conflicts
    level: p.level as "B1" | "B2" | "C1",
  })),
];

export default { phrases: allPhrases };
