import type { Metadata } from "next";

const baseUrl = "https://hermes-notes.vercel.app";

/**
 * Generates canonical URL for a given path
 * @param path - The path (e.g., "/study", "/stats", "/")
 * @returns Full canonical URL
 */
export function getCanonicalUrl(path: string = "/"): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  // Remove trailing slash except for root
  const cleanPath =
    normalizedPath === "/" ? "/" : normalizedPath.replace(/\/$/, "");
  return `${baseUrl}${cleanPath}`;
}

/**
 * Helper to create metadata with canonical URL for a page
 * @param path - The path for the page (e.g., "/study", "/stats")
 * @param metadata - Additional metadata to merge
 * @returns Metadata object with canonical URL
 */
export function createPageMetadata(
  path: string,
  metadata?: Partial<Metadata>
): Metadata {
  return {
    ...metadata,
    alternates: {
      canonical: getCanonicalUrl(path),
      ...metadata?.alternates,
    },
  };
}
