import React from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});
import type { Metadata, Viewport } from "next";

import GlobalContext from "~/shared/contexts/globalContext";
import { Flex } from "@chakra-ui/react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export const metadata: Metadata = {
  title: "HermesNotes — Master English Conversation with Spaced Repetition",
  description:
    "Master English conversation with spaced repetition flashcards. Learn essential B1/B2 phrases and idioms faster. Free, effective language learning for intermediate learners.",
  openGraph: {
    title: "HermesNotes — Master English Conversation with Spaced Repetition",
    description:
      "Master English conversation with spaced repetition flashcards. Learn essential B1/B2 phrases and idioms faster. Free, effective language learning for intermediate learners.",
    type: "website",
    images: [
      {
        url: "/images/dev-libraries.jpg",
        width: 1200,
        height: 630,
        alt: "HermesNotes - Master English Conversation with Spaced Repetition",
      },
    ],
    url: "https://hermes-notes.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "HermesNotes — Master English Conversation with Spaced Repetition",
    description:
      "Master English conversation with spaced repetition flashcards. Learn essential B1/B2 phrases and idioms faster.",
  },
  icons: {
    icon: [
      { url: "/favicon-180.png", type: "image/png" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-128.png", type: "image/png", sizes: "128x128" },
      { url: "/favicon-180.png", type: "image/png", sizes: "180x180" },
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/favicon-180.png", type: "image/png" }],
    shortcut: [{ url: "/favicon-192.png", type: "image/png" }],
  },
  metadataBase: new URL("https://hermes-notes.vercel.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "TomasSkarpa", url: "https://github.com/TomasSkarpa" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "HermesNotes",
    url: "https://hermes-notes.vercel.app",
    description:
      "Master English conversation with spaced repetition flashcards. Learn essential B1/B2 phrases and idioms faster.",
    publisher: {
      "@type": "Organization",
      name: "HermesNotes",
      url: "https://hermes-notes.vercel.app",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://hermes-notes.vercel.app/?category={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HermesNotes",
    url: "https://hermes-notes.vercel.app",
    logo: "https://hermes-notes.vercel.app/logos/hermes-dude.png",
    description:
      "Free language learning application for mastering English conversation through spaced repetition flashcards.",
    founder: {
      "@type": "Person",
      name: "TomasSkarpa",
      url: "https://github.com/TomasSkarpa",
    },
    sameAs: [
      "https://github.com/TomasSkarpa/hermes-notes",
      "https://www.facebook.com/tomik.skarpa/",
      "https://www.instagram.com/tommii.s/",
      "https://www.linkedin.com/in/tomas-skarpa",
    ],
  };

  const educationalApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalApplication",
    name: "HermesNotes",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1",
    },
    description:
      "Master English conversation with spaced repetition flashcards. Learn essential B1/B2 phrases and idioms faster. Free, effective language learning for intermediate learners.",
    educationalUse: "Language Learning",
    learningResourceType: "Flashcards",
    teaches: "English Conversation, English Idioms, English Phrases",
    educationalLevel: "Intermediate (B1/B2)",
    inLanguage: "en",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    url: "https://hermes-notes.vercel.app",
    screenshot: "https://hermes-notes.vercel.app/images/dev-libraries.jpg",
    applicationSubCategory: "Language Learning",
    featureList: [
      "Spaced Repetition Algorithm",
      "Progress Tracking",
      "Flashcard Learning",
      "B1/B2 Level Content",
      "Dark/Light Mode",
      "Free to Use",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="rating" content="general" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(educationalApplicationSchema),
          }}
        />
      </head>
      <body className={poppins.className}>
        <GlobalContext>
          <Flex flexDir="column" minH="100vh" w="100%" p={6}>
            <Header title="" />
            {children}
            <Footer />
          </Flex>
        </GlobalContext>
      </body>
    </html>
  );
}
