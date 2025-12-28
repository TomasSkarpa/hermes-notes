"use client";

import React from "react";
import { Button, HStack, VStack, Text } from "@chakra-ui/react";
import { ReviewQuality } from "@/types";

interface ReviewButtonsProps {
  onReview: (quality: ReviewQuality) => void;
  disabled?: boolean;
}

export function ReviewButtons({
  onReview,
  disabled = false,
}: ReviewButtonsProps) {
  const reviews: Array<{
    quality: ReviewQuality;
    label: string;
    interval: string;
    colorPalette: string;
  }> = [
    {
      quality: "again",
      label: "Again",
      interval: "< 1 day",
      colorPalette: "red",
    },
    {
      quality: "hard",
      label: "Hard",
      interval: "~3 days",
      colorPalette: "orange",
    },
    {
      quality: "good",
      label: "Good",
      interval: "~6 days",
      colorPalette: "green",
    },
    {
      quality: "easy",
      label: "Easy",
      interval: "~14 days",
      colorPalette: "blue",
    },
  ];

  return (
    <HStack gap={4} width="100%" justifyContent="center" flexWrap="wrap">
      {reviews.map(({ quality, label, interval, colorPalette }) => (
        <VStack key={quality} gap={1}>
          <Button
            colorPalette={colorPalette}
            onClick={() => onReview(quality)}
            disabled={disabled}
            size="lg"
            minWidth="120px"
            height="60px"
            fontSize="lg"
            fontWeight="bold"
            _hover={{
              transform: "translateY(-2px)",
              shadow: "lg",
            }}
            transition="all 0.2s"
          >
            {label}
          </Button>
          <Text fontSize="xs" color="gray.500">
            {interval}
          </Text>
        </VStack>
      ))}
    </HStack>
  );
}
