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
  Image,
} from "@chakra-ui/react";
import { BookOpen, Zap, TrendingUp, Target } from "lucide-react";
import Link from "next/link";
import categoriesData from "@/data/categories.json";
import phrasesData from "@/data/phrases.json";
import { Category, Phrase } from "@/types";

export default function HomePage() {
  const features = [
    {
      Icon: BookOpen,
      title: "20+ Phrases",
      description: "Curated English idioms and expressions",
    },
    {
      Icon: Zap,
      title: "Spaced Repetition",
      description: "Smart algorithm optimizes your learning",
    },
    {
      Icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your streak and improvements",
    },
    {
      Icon: Target,
      title: "B1/B2 Levels",
      description: "Perfect for intermediate learners",
    },
  ];

  return (
    <Flex flexDir="column" flex={1}>
      {/* Hero Section */}
      <Box
        bg="orange.50"
        _dark={{ bg: "orange.950" }}
        borderRadius="2xl"
        p={{ base: 8, md: 12 }}
        mb={12}
        position="relative"
        overflow="hidden"
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
            width="300px"
            height="300px"
          />
        </Box>

        <Container maxW="container.lg" position="relative" zIndex={1}>
          <VStack gap={6} textAlign="center">
            {/* Hermes Character with British Flag */}
            <HStack gap={4} justify="center" align="center">
              <Image
                src="/logos/hermes-dude.png"
                alt="Hermes"
                width="100px"
                height="100px"
              />
              <HStack gap={2}>
                <Image
                  src="/images/1f1ec-1f1e7.webp"
                  alt="English"
                  width="60px"
                  height="40px"
                  borderRadius="md"
                  boxShadow="md"
                />
                <Image
                  src="/images/1f1fa-1f1f8.png"
                  alt="English"
                  width="60px"
                  height="40px"
                  borderRadius="md"
                  boxShadow="md"
                />
              </HStack>
            </HStack>

            <Heading
              as="h1"
              size={{ base: "2xl", md: "3xl" }}
              fontWeight="extrabold"
              bgGradient="linear(to-r, orange.600, orange.400)"
              bgClip="text"
              data-cy="hero-title"
            >
              Master English Conversation
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.700"
              _dark={{ color: "gray.300" }}
              maxW="2xl"
              data-cy="hero-description"
            >
              Learn essential English phrases and idioms with spaced repetition.
              Perfect for B1/B2 learners who want to sound more natural in
              conversations.
            </Text>
            <HStack gap={4} pt={4}>
              <Link href="/study">
                <Button
                  size="lg"
                  colorPalette="orange"
                  _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                  transition="all 0.2s"
                  data-cy="start-studying-btn"
                >
                  <BookOpen size={20} />
                  Start Studying
                </Button>
              </Link>
              <Link href="/stats">
                <Button
                  size="lg"
                  variant="outline"
                  colorPalette="orange"
                  _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                  transition="all 0.2s"
                  data-cy="view-stats-btn"
                >
                  <TrendingUp size={20} />
                  View Stats
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Features Grid */}
      <Container maxW="container.lg" mb={12}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={6}>
          {features.map((feature, index) => {
            const FeatureIcon = feature.Icon;
            return (
              <Card.Root
                key={index}
                bg="white"
                _dark={{ bg: "gray.800", borderColor: "gray.600" }}
                borderWidth="1px"
                borderColor="gray.200"
                _hover={{
                  transform: "translateY(-4px)",
                  shadow: "xl",
                }}
                transition="all 0.3s"
              >
                <Card.Body>
                  <VStack gap={3} align="center" textAlign="center">
                    <Box
                      p={3}
                      borderRadius="full"
                      bg="orange.100"
                      _dark={{ bg: "orange.900" }}
                    >
                      <FeatureIcon
                        size={24}
                        color="var(--chakra-colors-orange-600)"
                      />
                    </Box>
                    <Heading size="sm">{feature.title}</Heading>
                    <Text
                      fontSize="sm"
                      color="gray.600"
                      _dark={{ color: "gray.400" }}
                    >
                      {feature.description}
                    </Text>
                  </VStack>
                </Card.Body>
              </Card.Root>
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
                <Image
                  src="/images/1f1ec-1f1e7.webp"
                  alt="English"
                  width="70px"
                  height="47px"
                  borderRadius="md"
                  boxShadow="lg"
                />
                <Image
                  src="/images/1f1fa-1f1f8.png"
                  alt="English"
                  width="70px"
                  height="47px"
                  borderRadius="md"
                  boxShadow="lg"
                />
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
            <Text color="gray.600" _dark={{ color: "gray.400" }}>
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

      {/* Call to Action */}
      <Container maxW="container.lg">
        <Card.Root
          bg="purple.50"
          _dark={{ bg: "purple.900", borderColor: "purple.700" }}
          borderWidth="2px"
          borderColor="purple.200"
        >
          <Card.Body>
            <VStack gap={4} textAlign="center" py={6}>
              <Heading size="lg">Ready to improve your English?</Heading>
              <Text color="gray.700" _dark={{ color: "gray.300" }} maxW="xl">
                Start your learning journey today. Our spaced repetition system
                will help you remember phrases naturally.
              </Text>
              <Link href="/study">
                <Button
                  size="lg"
                  colorPalette="purple"
                  _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                  transition="all 0.2s"
                >
                  <Zap size={20} />
                  Begin Learning Now
                </Button>
              </Link>
            </VStack>
          </Card.Body>
        </Card.Root>
      </Container>
    </Flex>
  );
}
