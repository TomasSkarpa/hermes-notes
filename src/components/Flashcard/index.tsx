"use client";

import React, { useState, useEffect } from "react";
import { Box, Text, Badge, VStack, HStack, Heading } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Phrase } from "@/types";
import { MessageCircle } from "lucide-react";

interface FlashcardProps {
  phrase: Phrase;
  onFlip?: (isFlipped: boolean) => void;
}

const MotionBox = motion.create(Box);

export function Flashcard({ phrase, onFlip }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const levelColor = phrase.level === "B1" ? "green" : "blue";

  // Reset flip state when phrase changes
  useEffect(() => {
    setIsFlipped(false);
    if (onFlip) {
      onFlip(false);
    }
  }, [phrase.id]);

  const handleFlip = () => {
    const newFlippedState = !isFlipped;
    setIsFlipped(newFlippedState);
    if (onFlip) {
      onFlip(newFlippedState);
    }
  };

  return (
    <MotionBox
      position="relative"
      width="100%"
      maxW="600px"
      height="450px"
      cursor="pointer"
      onClick={handleFlip}
      margin="0 auto"
      style={{ perspective: "1500px" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <MotionBox
          key={isFlipped ? "back" : "front"}
          position="absolute"
          width="100%"
          height="100%"
          bg="white"
          _dark={{ bg: "white" }}
          backgroundImage="repeating-linear-gradient(transparent 0 calc(1.5rem - 1px), rgba(200, 210, 220, 0.3) 0 1.5rem)"
          borderRadius="xl"
          boxShadow="0 0 0 1px rgba(0, 0, 0, 0.05) inset, 4px 8px 20px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)"
          overflow="hidden"
          initial={{ rotateY: isFlipped ? -180 : 0 }}
          animate={{ rotateY: 0 }}
          exit={{ rotateY: isFlipped ? 180 : -180 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Paper edge effect */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            height="8px"
            bg="linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 100%)"
            pointerEvents="none"
            zIndex={0}
          />

          {/* Left margin line */}
          <Box
            position="absolute"
            left="50px"
            top={0}
            bottom={0}
            width="2px"
            bg="rgba(255, 100, 100, 0.2)"
            pointerEvents="none"
            zIndex={0}
          />

          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            padding="40px 60px 40px 70px"
            position="relative"
            zIndex={1}
          >
            {!isFlipped ? (
              // Front of card - show phrase
              <VStack
                gap={8}
                width="100%"
                height="100%"
                justifyContent="space-between"
                align="stretch"
                py={4}
              >
                <HStack width="100%" justifyContent="space-between">
                  <Badge
                    colorPalette={levelColor}
                    fontSize="xs"
                    px={2}
                    py={1}
                    borderRadius="full"
                    fontWeight="bold"
                    textTransform="uppercase"
                  >
                    {phrase.level}
                  </Badge>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    _dark={{ color: "gray.400" }}
                    textTransform="uppercase"
                    letterSpacing="wider"
                    fontWeight="600"
                  >
                    {phrase.category.replace(/-/g, " ")}
                  </Text>
                </HStack>

                <VStack
                  gap={6}
                  flex={1}
                  justifyContent="center"
                  align="stretch"
                >
                  <Heading
                    as="h2"
                    fontSize="3xl"
                    textAlign="left"
                    color="gray.900"
                    _dark={{ color: "gray.50" }}
                    fontWeight="600"
                    lineHeight="1.3"
                    fontFamily="'Georgia', 'Times New Roman', serif"
                  >
                    {phrase.english}
                  </Heading>

                  {/* Placeholder to maintain consistent height with back side */}
                  <Box minH="160px" />
                </VStack>

                <HStack
                  px={4}
                  py={2}
                  bg="gray.100"
                  _dark={{ bg: "gray.700" }}
                  borderRadius="full"
                  alignSelf="flex-start"
                >
                  <Text
                    fontSize="sm"
                    color="gray.600"
                    _dark={{ color: "gray.300" }}
                    fontWeight="500"
                  >
                    👆 Tap to reveal meaning
                  </Text>
                </HStack>
              </VStack>
            ) : (
              // Back of card - show meaning and example
              <VStack
                gap={5}
                width="100%"
                height="100%"
                justifyContent="space-between"
                align="stretch"
                py={4}
              >
                <HStack width="100%" justifyContent="space-between">
                  <Badge
                    colorPalette={levelColor}
                    fontSize="xs"
                    px={2}
                    py={1}
                    borderRadius="full"
                    fontWeight="bold"
                    textTransform="uppercase"
                  >
                    {phrase.level}
                  </Badge>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    _dark={{ color: "gray.400" }}
                    textTransform="uppercase"
                    letterSpacing="wider"
                    fontWeight="600"
                  >
                    {phrase.category.replace(/-/g, " ")}
                  </Text>
                </HStack>

                <VStack
                  gap={4}
                  flex={1}
                  justifyContent="center"
                  align="stretch"
                >
                  <Heading
                    as="h3"
                    fontSize="xl"
                    textAlign="left"
                    color="gray.700"
                    _dark={{ color: "gray.200" }}
                    fontWeight="600"
                    fontFamily="'Georgia', 'Times New Roman', serif"
                  >
                    {phrase.english}
                  </Heading>

                  <Text
                    fontSize="2xl"
                    textAlign="left"
                    color="gray.900"
                    _dark={{ color: "gray.100" }}
                    fontWeight="500"
                    lineHeight="1.5"
                    fontFamily="'Georgia', 'Times New Roman', serif"
                  >
                    {phrase.meaning}
                  </Text>

                  <Box
                    width="100%"
                    bg="blue.50"
                    _dark={{ bg: "blue.900/20", borderColor: "blue.700/50" }}
                    borderWidth="1px"
                    borderColor="blue.200"
                    borderRadius="lg"
                    padding={4}
                  >
                    <HStack gap={2} mb={2}>
                      <MessageCircle size={16} color="#3b82f6" />
                      <Text
                        fontSize="xs"
                        fontWeight="bold"
                        color="blue.700"
                        _dark={{ color: "blue.400" }}
                        textTransform="uppercase"
                        letterSpacing="wide"
                      >
                        Example
                      </Text>
                    </HStack>
                    <Text
                      fontSize="md"
                      fontStyle="italic"
                      color="gray.700"
                      _dark={{ color: "gray.300" }}
                      lineHeight="1.6"
                    >
                      &ldquo;{phrase.example}&rdquo;
                    </Text>
                  </Box>
                </VStack>

                <HStack
                  px={4}
                  py={2}
                  bg="gray.100"
                  _dark={{ bg: "gray.700" }}
                  borderRadius="full"
                  alignSelf="flex-start"
                >
                  <Text
                    fontSize="sm"
                    color="gray.600"
                    _dark={{ color: "gray.300" }}
                    fontWeight="500"
                  >
                    👆 Tap to flip back
                  </Text>
                </HStack>
              </VStack>
            )}
          </Box>

          {/* Bottom shadow for depth */}
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            height="8px"
            bg="linear-gradient(0deg, rgba(0,0,0,0.08) 0%, transparent 100%)"
            _dark={{
              bg: "linear-gradient(0deg, rgba(0,0,0,0.2) 0%, transparent 100%)",
            }}
            pointerEvents="none"
            zIndex={0}
          />
        </MotionBox>
      </AnimatePresence>
    </MotionBox>
  );
}
