"use client";

import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  Badge,
  Progress,
} from "@chakra-ui/react";
import {
  ArrowLeft,
  TrendingUp,
  Flame,
  BookOpen,
  Target,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useSpacedRepetition } from "@/hooks/useSpacedRepetition";
import phrasesData from "@/data/phrases.json";
import categoriesData from "@/data/categories.json";
import { Category, Phrase } from "@/types";

export default function StatsPage() {
  const { stats, progress, isLoaded } = useSpacedRepetition(
    phrasesData.phrases as Phrase[]
  );

  // Calculate additional stats
  const totalPhrases = phrasesData.phrases.length;
  const learnedPercentage =
    totalPhrases > 0 ? (stats.phrasesLearned / totalPhrases) * 100 : 0;

  // Get phrases by status
  const newPhrases = (phrasesData.phrases as Phrase[]).filter(
    (p) => !progress[p.id] || progress[p.id].repetitions === 0
  ).length;

  const learningPhrases = (phrasesData.phrases as Phrase[]).filter(
    (p) => progress[p.id] && progress[p.id].repetitions > 0
  ).length;

  // Calculate due today
  const now = new Date();
  const dueToday = (phrasesData.phrases as Phrase[]).filter((p) => {
    const phraseProgress = progress[p.id];
    if (!phraseProgress || phraseProgress.nextReview === null) return true;
    const nextReview = new Date(phraseProgress.nextReview);
    return nextReview <= now;
  }).length;

  // Format last study date
  const formatLastStudy = () => {
    if (!stats.lastStudyDate) return "Never";
    const date = new Date(stats.lastStudyDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  if (!isLoaded) {
    return (
      <Container maxW="container.lg" py={8}>
        <VStack gap={4}>
          <Heading>Loading...</Heading>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={8}>
      <VStack gap={8} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center">
          <Heading size="xl">Your Progress</Heading>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft size={16} />
              Back Home
            </Link>
          </Button>
        </Flex>

        {/* Main Stats Cards */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={6}>
          <Card.Root
            bg="white"
            _dark={{ bg: "gray.800" }}
            borderWidth="2px"
            borderColor="orange.400"
            shadow="lg"
          >
            <Card.Body>
              <VStack align="stretch" gap={3}>
                <HStack justify="space-between">
                  <Text
                    fontSize="sm"
                    color="gray.600"
                    _dark={{ color: "gray.400" }}
                    fontWeight="medium"
                  >
                    CURRENT STREAK
                  </Text>
                  <Flame size={20} color="#fb923c" />
                </HStack>
                <Heading
                  size="2xl"
                  color="orange.500"
                  _dark={{ color: "orange.400" }}
                >
                  {stats.streak}
                </Heading>
                <Text
                  fontSize="sm"
                  color="gray.600"
                  _dark={{ color: "gray.400" }}
                >
                  {stats.streak === 1 ? "day" : "days"} in a row 🔥
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>

          <Card.Root
            bg="white"
            _dark={{ bg: "gray.800" }}
            borderWidth="2px"
            borderColor="blue.400"
            shadow="lg"
          >
            <Card.Body>
              <VStack align="stretch" gap={3}>
                <HStack justify="space-between">
                  <Text
                    fontSize="sm"
                    color="gray.600"
                    _dark={{ color: "gray.400" }}
                    fontWeight="medium"
                  >
                    TOTAL REVIEWS
                  </Text>
                  <TrendingUp size={20} color="#60a5fa" />
                </HStack>
                <Heading
                  size="2xl"
                  color="blue.500"
                  _dark={{ color: "blue.400" }}
                >
                  {stats.totalReviews}
                </Heading>
                <Text
                  fontSize="sm"
                  color="gray.600"
                  _dark={{ color: "gray.400" }}
                >
                  cards reviewed
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>

          <Card.Root
            bg="white"
            _dark={{ bg: "gray.800" }}
            borderWidth="2px"
            borderColor="green.400"
            shadow="lg"
          >
            <Card.Body>
              <VStack align="stretch" gap={3}>
                <HStack justify="space-between">
                  <Text
                    fontSize="sm"
                    color="gray.600"
                    _dark={{ color: "gray.400" }}
                    fontWeight="medium"
                  >
                    PHRASES LEARNED
                  </Text>
                  <Target size={20} color="#4ade80" />
                </HStack>
                <Heading
                  size="2xl"
                  color="green.500"
                  _dark={{ color: "green.400" }}
                >
                  {stats.phrasesLearned}
                </Heading>
                <Text
                  fontSize="sm"
                  color="gray.600"
                  _dark={{ color: "gray.400" }}
                >
                  out of {totalPhrases}
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>

          <Card.Root
            bg="white"
            _dark={{ bg: "gray.800" }}
            borderWidth="2px"
            borderColor="purple.400"
            shadow="lg"
          >
            <Card.Body>
              <VStack align="stretch" gap={3}>
                <HStack justify="space-between">
                  <Text
                    fontSize="sm"
                    color="gray.600"
                    _dark={{ color: "gray.400" }}
                    fontWeight="medium"
                  >
                    LAST STUDY
                  </Text>
                  <Calendar size={20} color="#c084fc" />
                </HStack>
                <Heading
                  size="xl"
                  color="purple.500"
                  _dark={{ color: "purple.400" }}
                >
                  {formatLastStudy()}
                </Heading>
                <Text
                  fontSize="sm"
                  color="gray.600"
                  _dark={{ color: "gray.400" }}
                >
                  Keep it up!
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        {/* Learning Progress */}
        <Card.Root
          bg="white"
          _dark={{ bg: "gray.800", borderColor: "gray.600" }}
          borderWidth="2px"
          borderColor="gray.200"
        >
          <Card.Body>
            <VStack align="stretch" gap={6}>
              <Heading size="md">Learning Progress</Heading>

              <Box>
                <Flex justify="space-between" mb={2}>
                  <Text fontSize="sm" fontWeight="medium">
                    Overall Completion
                  </Text>
                  <Text
                    fontSize="sm"
                    color="gray.600"
                    _dark={{ color: "gray.400" }}
                  >
                    {Math.round(learnedPercentage)}%
                  </Text>
                </Flex>
                <Progress.Root
                  value={learnedPercentage}
                  colorPalette="green"
                  borderRadius="full"
                  size="lg"
                  striped
                  animated
                >
                  <Progress.Range />
                </Progress.Root>
              </Box>

              <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
                <Box
                  p={4}
                  borderRadius="lg"
                  bg="blue.50"
                  _dark={{ bg: "blue.900", borderColor: "blue.700" }}
                  borderWidth="1px"
                  borderColor="blue.200"
                >
                  <VStack gap={2}>
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      color="blue.600"
                      _dark={{ color: "blue.400" }}
                    >
                      {newPhrases}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="gray.600"
                      _dark={{ color: "gray.400" }}
                    >
                      New Phrases
                    </Text>
                  </VStack>
                </Box>

                <Box
                  p={4}
                  borderRadius="lg"
                  bg="orange.50"
                  _dark={{ bg: "orange.900", borderColor: "orange.700" }}
                  borderWidth="1px"
                  borderColor="orange.200"
                >
                  <VStack gap={2}>
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      color="orange.600"
                      _dark={{ color: "orange.400" }}
                    >
                      {learningPhrases}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="gray.600"
                      _dark={{ color: "gray.400" }}
                    >
                      In Progress
                    </Text>
                  </VStack>
                </Box>

                <Box
                  p={4}
                  borderRadius="lg"
                  bg="green.50"
                  _dark={{ bg: "green.900", borderColor: "green.700" }}
                  borderWidth="1px"
                  borderColor="green.200"
                >
                  <VStack gap={2}>
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      color="green.600"
                      _dark={{ color: "green.400" }}
                    >
                      {dueToday}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="gray.600"
                      _dark={{ color: "gray.400" }}
                    >
                      Due Today
                    </Text>
                  </VStack>
                </Box>
              </SimpleGrid>
            </VStack>
          </Card.Body>
        </Card.Root>

        {/* Category Progress */}
        <Card.Root
          bg="white"
          _dark={{ bg: "gray.800", borderColor: "gray.600" }}
          borderWidth="2px"
          borderColor="gray.200"
        >
          <Card.Body>
            <VStack align="stretch" gap={6}>
              <Heading size="md">Progress by Category</Heading>

              {(categoriesData.categories as Category[]).map((category) => {
                const categoryReviews =
                  stats.categoriesProgress[category.id] || 0;
                const categoryPhrases = (
                  phrasesData.phrases as Phrase[]
                ).filter((p) => p.category === category.id).length;

                return (
                  <Box key={category.id}>
                    <Flex justify="space-between" mb={2}>
                      <HStack>
                        <Badge colorPalette={category.color} px={2} py={1}>
                          {category.name}
                        </Badge>
                        <Text
                          fontSize="sm"
                          color="gray.600"
                          _dark={{ color: "gray.400" }}
                        >
                          {categoryPhrases}{" "}
                          {categoryPhrases === 1 ? "phrase" : "phrases"}
                        </Text>
                      </HStack>
                      <Text fontSize="sm" fontWeight="medium">
                        {categoryReviews} reviews
                      </Text>
                    </Flex>
                    <Progress.Root
                      value={
                        categoryPhrases > 0
                          ? (categoryReviews / (categoryPhrases * 3)) * 100
                          : 0
                      }
                      colorPalette={category.color}
                      borderRadius="full"
                      size="sm"
                    >
                      <Progress.Range />
                    </Progress.Root>
                  </Box>
                );
              })}
            </VStack>
          </Card.Body>
        </Card.Root>

        {/* Call to Action */}
        {dueToday > 0 && (
          <Card.Root
            bg="blue.50"
            _dark={{ bg: "blue.900", borderColor: "blue.700" }}
            borderWidth="2px"
            borderColor="blue.200"
          >
            <Card.Body>
              <VStack gap={4} textAlign="center" py={4}>
                <BookOpen size={48} color="#3b82f6" />
                <Heading
                  size="md"
                  color="gray.800"
                  _dark={{ color: "gray.100" }}
                >
                  You have {dueToday} {dueToday === 1 ? "phrase" : "phrases"}{" "}
                  ready to review!
                </Heading>
                <Button size="lg" colorPalette="orange" asChild>
                  <Link href="/study">
                    <BookOpen size={20} />
                    Start Studying
                  </Link>
                </Button>
              </VStack>
            </Card.Body>
          </Card.Root>
        )}
      </VStack>
    </Container>
  );
}
