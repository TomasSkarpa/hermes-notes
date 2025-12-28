"use client";

import React, { useState, useEffect, Suspense } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Progress,
  Badge,
  Card,
} from "@chakra-ui/react";
import { ArrowLeft, RotateCcw, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Flashcard } from "@/components/Flashcard";
import { ReviewButtons } from "@/components/ReviewButtons";
import { useSpacedRepetition } from "@/hooks/useSpacedRepetition";
import phrasesData from "@/data/phrases.json";
import categoriesData from "@/data/categories.json";
import { Phrase, ReviewQuality, Category } from "@/types";

function StudyPageContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const levelFilter = searchParams.get("level") as "B1" | "B2" | null;

  const { getDueForReview, recordReview, stats, isLoaded } =
    useSpacedRepetition(phrasesData.phrases as Phrase[]);

  const [dueCards, setDueCards] = useState<Phrase[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  // Load due cards when component mounts or filters change
  useEffect(() => {
    if (isLoaded) {
      const cards = getDueForReview(
        categoryFilter || undefined,
        levelFilter || undefined
      );
      setDueCards(cards);
      setCurrentIndex(0);
      setSessionComplete(cards.length === 0);
      setReviewedCount(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, categoryFilter, levelFilter]);

  const currentCard = dueCards[currentIndex];
  const progress =
    dueCards.length > 0 ? (currentIndex / dueCards.length) * 100 : 0;
  const remaining = dueCards.length - currentIndex;

  const handleReview = (quality: ReviewQuality) => {
    if (!currentCard || !isFlipped) return;

    recordReview(currentCard.id, quality, currentCard.category);
    setReviewedCount((prev) => prev + 1);

    // Move to next card
    if (currentIndex < dueCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    } else {
      setSessionComplete(true);
    }
  };

  const handleRestart = () => {
    const cards = getDueForReview(
      categoryFilter || undefined,
      levelFilter || undefined
    );
    setDueCards(cards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionComplete(cards.length === 0);
    setReviewedCount(0);
  };

  const getCategoryName = (categoryId: string) => {
    const category = (categoriesData.categories as Category[]).find(
      (c) => c.id === categoryId
    );
    return category?.name || categoryId;
  };

  // Loading state
  if (!isLoaded) {
    return (
      <Container maxW="container.lg" py={8}>
        <VStack gap={4}>
          <Heading>Loading...</Heading>
        </VStack>
      </Container>
    );
  }

  // Session complete state
  if (sessionComplete) {
    return (
      <Container maxW="container.lg" py={8}>
        <Card.Root
          bg="white"
          _dark={{ bg: "gray.800", borderColor: "gray.600" }}
          borderWidth="2px"
          borderColor="gray.200"
        >
          <Card.Body>
            <VStack gap={6} py={8} textAlign="center">
              <Box
                p={4}
                borderRadius="full"
                bg="green.100"
                _dark={{ bg: "green.900" }}
              >
                <CheckCircle size={64} color="#16a34a" />
              </Box>

              <Heading size="xl">
                {reviewedCount > 0 ? "Great Work!" : "All Caught Up!"}
              </Heading>

              {reviewedCount > 0 ? (
                <>
                  <Text
                    fontSize="lg"
                    color="gray.600"
                    _dark={{ color: "gray.400" }}
                  >
                    You&apos;ve reviewed {reviewedCount}{" "}
                    {reviewedCount === 1 ? "phrase" : "phrases"} today.
                  </Text>

                  <VStack gap={2} pt={4}>
                    <HStack>
                      <Text fontWeight="bold">Current Streak:</Text>
                      <Badge colorPalette="orange" fontSize="lg" px={3} py={1}>
                        {stats.streak} {stats.streak === 1 ? "day" : "days"} 🔥
                      </Badge>
                    </HStack>
                    <HStack>
                      <Text fontWeight="bold">Total Reviews:</Text>
                      <Badge colorPalette="blue" fontSize="lg" px={3} py={1}>
                        {stats.totalReviews}
                      </Badge>
                    </HStack>
                    <HStack>
                      <Text fontWeight="bold">Phrases Learned:</Text>
                      <Badge colorPalette="green" fontSize="lg" px={3} py={1}>
                        {stats.phrasesLearned}
                      </Badge>
                    </HStack>
                  </VStack>
                </>
              ) : (
                <Text
                  fontSize="lg"
                  color="gray.600"
                  _dark={{ color: "gray.400" }}
                >
                  No phrases due for review right now. Come back later!
                </Text>
              )}

              <HStack gap={4} pt={4}>
                <Button
                  size="lg"
                  variant="outline"
                  colorPalette="orange"
                  asChild
                >
                  <Link href="/">
                    <ArrowLeft size={20} />
                    Back Home
                  </Link>
                </Button>
                <Button size="lg" colorPalette="orange" onClick={handleRestart}>
                  <RotateCcw size={20} />
                  Study Again
                </Button>
                <Button size="lg" colorPalette="orange" asChild>
                  <Link href="/stats">View Stats</Link>
                </Button>
              </HStack>
            </VStack>
          </Card.Body>
        </Card.Root>
      </Container>
    );
  }

  // Study session in progress
  return (
    <Container maxW="container.lg" py={8}>
      <VStack gap={6} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft size={16} />
              Back
            </Link>
          </Button>

          <HStack gap={4}>
            {categoryFilter && (
              <Badge colorPalette="blue" fontSize="md" px={3} py={1}>
                {getCategoryName(categoryFilter)}
              </Badge>
            )}
            {levelFilter && (
              <Badge colorPalette="green" fontSize="md" px={3} py={1}>
                {levelFilter}
              </Badge>
            )}
          </HStack>
        </Flex>

        {/* Progress Bar */}
        <Box>
          <Flex justify="space-between" mb={2}>
            <Text fontSize="sm" fontWeight="medium">
              Progress
            </Text>
            <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
              {remaining} {remaining === 1 ? "card" : "cards"} remaining
            </Text>
          </Flex>
          <Progress.Root
            value={progress}
            colorPalette="orange"
            borderRadius="full"
            size="sm"
            striped
            animated
          >
            <Progress.Range />
          </Progress.Root>
        </Box>

        {/* Flashcard */}
        {currentCard && (
          <Box>
            <Flashcard phrase={currentCard} onFlip={setIsFlipped} />
          </Box>
        )}

        {/* Review Buttons - Fixed height container to prevent layout shift */}
        <Box pt={4} minH="120px">
          {isFlipped ? (
            <VStack gap={4}>
              <Text
                fontSize="sm"
                color="gray.600"
                _dark={{ color: "gray.400" }}
                textAlign="center"
              >
                How well did you know this phrase?
              </Text>
              <ReviewButtons onReview={handleReview} />
            </VStack>
          ) : (
            <Text
              fontSize="sm"
              color="gray.600"
              _dark={{ color: "gray.400" }}
              textAlign="center"
            >
              Click the card to reveal the answer
            </Text>
          )}
        </Box>

        {/* Stats Footer */}
        <Card.Root
          bg="white"
          _dark={{ bg: "gray.800", borderColor: "gray.600" }}
          borderWidth="1px"
          borderColor="gray.200"
          mt={4}
        >
          <Card.Body>
            <HStack justify="space-around" flexWrap="wrap">
              <VStack gap={1}>
                <Text
                  fontSize="xs"
                  color="gray.600"
                  _dark={{ color: "gray.400" }}
                >
                  STREAK
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                  {stats.streak} 🔥
                </Text>
              </VStack>
              <VStack gap={1}>
                <Text
                  fontSize="xs"
                  color="gray.600"
                  _dark={{ color: "gray.400" }}
                >
                  TODAY
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                  {reviewedCount}
                </Text>
              </VStack>
              <VStack gap={1}>
                <Text
                  fontSize="xs"
                  color="gray.600"
                  _dark={{ color: "gray.400" }}
                >
                  TOTAL
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                  {stats.totalReviews}
                </Text>
              </VStack>
              <VStack gap={1}>
                <Text
                  fontSize="xs"
                  color="gray.600"
                  _dark={{ color: "gray.400" }}
                >
                  LEARNED
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                  {stats.phrasesLearned}
                </Text>
              </VStack>
            </HStack>
          </Card.Body>
        </Card.Root>
      </VStack>
    </Container>
  );
}

export default function StudyPage() {
  return (
    <Suspense
      fallback={
        <Container maxW="container.lg" py={8}>
          <VStack gap={4}>
            <Heading>Loading...</Heading>
          </VStack>
        </Container>
      }
    >
      <StudyPageContent />
    </Suspense>
  );
}
