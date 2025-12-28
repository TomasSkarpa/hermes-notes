"use client";

import { Flex, Text, Box, Image, HStack } from "@chakra-ui/react";
import Link from "next/link";

import ThemeButton from "../ThemeButton";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <Flex justifyContent="space-between" alignItems="center" mb={4}>
      <Link href="/">
        <Box
          cursor="pointer"
          _hover={{ opacity: 0.8 }}
          transition="opacity 0.2s"
        >
          <HStack gap={3} align="center">
            <Image
              src="/logos/hermes-dude.png"
              alt="HermesNotes"
              height="50px"
              width="50px"
            />
            <HStack gap={2} align="center">
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="orange.600"
                _dark={{ color: "orange.400" }}
                fontFamily="'Georgia', serif"
              >
                HermesNotes
              </Text>
            </HStack>
          </HStack>
        </Box>
      </Link>
      <Text data-cy="title-header">{title}</Text>
      <ThemeButton aria-label="Toggle light-dark mode" />
    </Flex>
  );
}
