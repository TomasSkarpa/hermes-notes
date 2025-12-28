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
} from "@chakra-ui/react";
import { BookOpen, Zap, TrendingUp, Target } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useColorMode } from "~/shared/contexts/colorMode";
import categoriesData from "@/data/categories.json";
import phrasesData from "@/data/phrases.json";
import { Category, Phrase } from "@/types";

export default function HomePage() {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const features = [
    {
      Icon: BookOpen,
      title: "20+ Real Phrases",
      description: "Learn authentic idioms and expressions you'll actually use",
      link: "/study",
    },
    {
      Icon: Zap,
      title: "Remember phrases long-term",
      description:
        "Smart repetition shows phrases right before you forget them",
      link: "/study",
    },
    {
      Icon: TrendingUp,
      title: "Build a daily habit",
      description: "Track your streak and see real progress over time",
      link: "/stats",
    },
    {
      Icon: Target,
      title: "Perfect for B1/B2",
      description: "Designed specifically for intermediate learners",
      link: "/study",
    },
  ];

  return (
    <Flex flexDir="column" flex={1}>
      {/* Hero Section - Optimized for above-the-fold CTA on mobile */}
      <Box
        bgGradient="linear(to-br, orange.50, yellow.50)"
        _dark={{
          bgGradient: "linear(to-br, orange.950, gray.900)",
          borderColor: "orange.800",
        }}
        borderRadius="2xl"
        p={{ base: 6, md: 12 }}
        mb={12}
        position="relative"
        overflow="hidden"
        borderWidth="1px"
        borderColor="orange.200"
      >
        {/* Background decoration - Hermes shoe */}
        <Box
          position="absolute"
          right="-50px"
          bottom="-50px"
          opacity={0.08}
          _dark={{ opacity: 0.04 }}
        >
          <Image
            src="/logos/hermes-shoe.png"
            alt=""
            width={300}
            height={300}
            style={{ width: "300px", height: "300px" }}
            unoptimized
          />
        </Box>

        <Container maxW="container.lg" position="relative" zIndex={1}>
          <VStack gap={{ base: 4, md: 5 }} textAlign="center">
            {/* Hermes with Integrated Badge - Option B */}
            <Box mb={2} position="relative" display="inline-block">
              {/* Main circular badge with Hermes */}
              <Box
                position="relative"
                width={{ base: "120px", md: "144px" }}
                height={{ base: "120px", md: "144px" }}
                borderRadius="full"
                borderWidth="3px"
                borderColor="orange.300"
                _dark={{ borderColor: "orange.500", bg: "gray.800" }}
                bg="white"
                boxShadow="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={2}
              >
                <Image
                  src="/logos/hermes-dude.png"
                  alt="Hermes character mascot"
                  width={96}
                  height={96}
                  priority
                  sizes="96px"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>

              {/* Flags as status badges at bottom-right */}
              <HStack
                position="absolute"
                bottom="-10px"
                right="-10px"
                gap={1}
                bg="white"
                _dark={{ bg: "gray.800", borderColor: "orange.600" }}
                borderRadius="full"
                p={1}
                boxShadow="md"
                borderWidth="2px"
                borderColor="orange.200"
              >
                <Box
                  borderRadius="full"
                  overflow="hidden"
                  style={{ width: "34px", height: "34px" }}
                  borderWidth="1px"
                  borderColor="transparent"
                >
                  <Image
                    src="/images/1f1ec-1f1e7.webp"
                    alt="British flag"
                    width={34}
                    height={34}
                    sizes="34px"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box
                  borderRadius="full"
                  overflow="hidden"
                  style={{ width: "34px", height: "34px" }}
                  borderWidth="1px"
                  borderColor="transparent"
                >
                  <Image
                    src="/images/1f1fa-1f1f8.png"
                    alt="US flag"
                    width={34}
                    height={34}
                    sizes="34px"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </HStack>
            </Box>

            {/* Main Headline - Inverted Pyramid: Wider */}
            <Heading
              as="h1"
              size={{ base: "2xl", md: "4xl" }}
              fontWeight="extrabold"
              bgGradient="linear(to-r, orange.600, orange.400)"
              bgClip="text"
              data-cy="hero-title"
              lineHeight="shorter"
              mb={2}
              maxW="4xl"
              mx="auto"
            >
              Sound natural in English conversations — fast.
            </Heading>

            {/* Description - Inverted Pyramid: Medium width */}
            <VStack
              gap={2}
              maxW="3xl"
              data-cy="hero-description"
              mb={4}
              mx="auto"
            >
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="gray.800"
                _dark={{ color: "gray.100" }}
                fontWeight="semibold"
                lineHeight="tall"
              >
                Learn real phrases and idioms with smart spaced repetition.
              </Text>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.700"
                _dark={{ color: "gray.200" }}
                fontWeight="medium"
              >
                Designed for B1/B2 learners.
              </Text>
            </VStack>

            {/* Example phrase - Glassmorphism with inverted pyramid: Narrower than headline */}
            <Box
              p={6}
              bg="white"
              _dark={{
                bg: "gray.900",
                borderColor: "rgba(251, 146, 60, 0.25)",
                boxShadow:
                  "0 0 50px rgba(251, 146, 60, 0.3), 0 0 25px rgba(251, 146, 60, 0.2), inset 0 0 20px rgba(251, 146, 60, 0.05)",
              }}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="orange.200"
              boxShadow="0 0 20px rgba(251, 146, 60, 0.15)"
              maxW="2xl"
              mb={6}
              mx="auto"
            >
              <VStack gap={3} align="start">
                <Text
                  fontSize="xs"
                  color="orange.600"
                  _dark={{ color: "orange.400" }}
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  Example phrase you'll learn:
                </Text>
                <Text
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="bold"
                  fontStyle="italic"
                  lineHeight="shorter"
                  color={isDark ? "white" : "gray.900"}
                  style={{ color: isDark ? "#FFFFFF" : undefined }}
                >
                  "I'll get back to you on that."
                </Text>
                <Text
                  fontSize="sm"
                  color="gray.600"
                  _dark={{ color: "#A0A0A0" }}
                  fontWeight="medium"
                >
                  Common B2 phrase for professional conversations
                </Text>
              </VStack>
            </Box>

            {/* Primary CTA Section - Inverted Pyramid: Narrowest */}
            <VStack
              gap={{ base: 3, md: 4 }}
              pt={6}
              pb={2}
              w="100%"
              maxW="lg"
              mx="auto"
            >
              {/* Primary CTA - Maximum Visual Dominance */}
              <Box w="100%" position="relative">
                <Link
                  href="/study"
                  prefetch={true}
                  style={{ width: "100%", display: "block" }}
                >
                  <Button
                    size="xl"
                    colorPalette="orange"
                    w="100%"
                    h={{ base: "60px", md: "72px" }}
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="extrabold"
                    px={{ base: 10, md: 12 }}
                    py={8}
                    _hover={{
                      transform: "translateY(-3px)",
                      shadow: "2xl",
                      bg: "orange.600",
                      _dark: { bg: "orange.500" },
                    }}
                    _active={{
                      transform: "translateY(-1px)",
                    }}
                    transition="all 0.2s ease-in-out"
                    data-cy="start-studying-btn"
                    boxShadow="2xl"
                    bg="orange.500"
                    _dark={{ bg: "orange.400", color: "gray.900" }}
                    borderRadius="xl"
                    letterSpacing="wide"
                  >
                    <HStack gap={3}>
                      <Zap size={28} />
                      <Text>Start learning in 5 minutes</Text>
                    </HStack>
                  </Button>
                </Link>
              </Box>

              {/* Trust cue - Right below CTA with better contrast */}
              <Text
                fontSize="sm"
                color="gray.700"
                _dark={{ color: "gray.100" }}
                textAlign="center"
                fontWeight="semibold"
                pt={2}
              >
                Free to start • No account required
              </Text>

              {/* Progress tease - Psychological hook with better contrast */}
              <Text
                fontSize="sm"
                color="gray.800"
                _dark={{ color: "gray.50" }}
                textAlign="center"
                pt={1}
                fontWeight="semibold"
              >
                🔥 Streaks, progress, and reminders included
              </Text>

              {/* Secondary action - Demoted as text link, moved away */}
              <Box pt={4}>
                <Link
                  href="/stats"
                  style={{
                    color: "var(--chakra-colors-gray-600)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    fontWeight: "normal",
                  }}
                  data-cy="view-stats-btn"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color =
                      "var(--chakra-colors-orange-600)";
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color =
                      "var(--chakra-colors-gray-600)";
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  View your progress →
                </Link>
              </Box>
            </VStack>
          </VStack>
        </Container>
      </Box>

      {/* Features Grid - Benefit-oriented, clickable, with more padding and moved down */}
      <Container maxW="container.lg" mb={16} mt={8}>
        <Box mb={8} textAlign="center">
          <Heading
            size="lg"
            mb={2}
            color="gray.900"
            _dark={{ color: "gray.100" }}
          >
            Why HermesNotes works
          </Heading>
          <Text color="gray.700" _dark={{ color: "gray.200" }} fontSize="md">
            Everything you need to build confidence in English conversations
          </Text>
        </Box>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={6}>
          {features.map((feature, index) => {
            const FeatureIcon = feature.Icon;
            return (
              <Link
                key={index}
                href={feature.link}
                style={{ textDecoration: "none" }}
              >
                <Card.Root
                  bg="white"
                  _dark={{ bg: "gray.800", borderColor: "gray.600" }}
                  borderWidth="2px"
                  borderColor="gray.200"
                  cursor="pointer"
                  _hover={{
                    transform: "translateY(-4px)",
                    shadow: "xl",
                    borderColor: "orange.400",
                  }}
                  transition="all 0.3s"
                  h="100%"
                >
                  <Card.Body p={6}>
                    <VStack gap={4} align="center" textAlign="center">
                      <Box
                        p={4}
                        borderRadius="full"
                        bg="orange.100"
                        _dark={{ bg: "orange.900" }}
                      >
                        <FeatureIcon
                          size={28}
                          color="var(--chakra-colors-orange-600)"
                        />
                      </Box>
                      <Heading
                        size="md"
                        color="gray.900"
                        _dark={{ color: "gray.100" }}
                        fontWeight="bold"
                      >
                        {feature.title}
                      </Heading>
                      <Text
                        fontSize="md"
                        color="gray.700"
                        _dark={{ color: "gray.200" }}
                        lineHeight="tall"
                      >
                        {feature.description}
                      </Text>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              </Link>
            );
          })}
        </SimpleGrid>
      </Container>

      {/* British English Highlight Section */}
      <Container maxW="container.lg" mb={12}>
        <Card.Root
          bg="orange.100"
          _dark={{ bg: "orange.900/20", borderColor: "orange.700" }}
          borderWidth="2px"
          borderColor="orange.200"
          p={6}
        >
          <Card.Body>
            <HStack gap={6} justify="center" align="center" flexWrap="wrap">
              <HStack gap={3}>
                <Box
                  borderRadius="md"
                  boxShadow="lg"
                  overflow="hidden"
                  style={{ width: "70px", height: "47px" }}
                >
                  <Image
                    src="/images/1f1ec-1f1e7.webp"
                    alt="British flag"
                    width={70}
                    height={47}
                    sizes="70px"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box
                  borderRadius="md"
                  boxShadow="lg"
                  overflow="hidden"
                  style={{ width: "70px", height: "47px" }}
                >
                  <Image
                    src="/images/1f1fa-1f1f8.png"
                    alt="US flag"
                    width={70}
                    height={47}
                    sizes="70px"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </HStack>
              <VStack
                gap={2}
                align={{ base: "center", md: "flex-start" }}
                textAlign={{ base: "center", md: "left" }}
              >
                <Heading
                  size="md"
                  color="orange.800"
                  _dark={{ color: "orange.300" }}
                >
                  Learn Universal English
                </Heading>
                <Text
                  color="orange.700"
                  _dark={{ color: "orange.400" }}
                  fontSize="sm"
                >
                  Master authentic English phrases understood across the
                  English-speaking world
                </Text>
              </VStack>
            </HStack>
          </Card.Body>
        </Card.Root>
      </Container>

      {/* Categories Section */}
      <Container maxW="container.lg" mb={12}>
        <VStack gap={6} align="stretch">
          <Box textAlign="center">
            <Heading size="xl" mb={2}>
              Browse by Category
            </Heading>
            <Text
              color="gray.700"
              _dark={{ color: "gray.300" }}
              fontWeight="medium"
            >
              Choose a topic that interests you and start learning
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {(categoriesData.categories as Category[]).map((category) => {
              const phraseCount = (phrasesData.phrases as Phrase[]).filter(
                (p) => p.category === category.id
              ).length;

              return (
                <Link key={category.id} href={`/study?category=${category.id}`}>
                  <Card.Root
                    bg="white"
                    _dark={{ bg: "gray.800", borderColor: "gray.600" }}
                    borderWidth="2px"
                    borderColor="gray.200"
                    cursor="pointer"
                    _hover={{
                      transform: "translateY(-4px)",
                      shadow: "xl",
                      borderColor: `${category.color}.400`,
                    }}
                    transition="all 0.3s"
                  >
                    <Card.Body>
                      <VStack align="stretch" gap={3}>
                        <HStack justify="space-between">
                          <Badge
                            colorPalette={category.color}
                            fontSize="md"
                            px={3}
                            py={1}
                            borderRadius="full"
                          >
                            {category.name}
                          </Badge>
                          <Badge variant="outline" colorPalette="gray">
                            {phraseCount} phrases
                          </Badge>
                        </HStack>
                        <Text
                          fontSize="sm"
                          color="gray.600"
                          _dark={{ color: "gray.400" }}
                        >
                          {category.description}
                        </Text>
                      </VStack>
                    </Card.Body>
                  </Card.Root>
                </Link>
              );
            })}
          </SimpleGrid>
        </VStack>
      </Container>
    </Flex>
  );
}
