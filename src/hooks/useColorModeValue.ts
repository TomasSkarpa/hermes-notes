"use client";

import { useColorMode } from "~/shared/contexts/colorMode";

/**
 * Custom hook to get color values based on current color mode
 * Similar to Chakra UI v2's useColorModeValue
 */
export function useColorModeValue<T>(lightValue: T, darkValue: T): T {
  const { colorMode } = useColorMode();
  return colorMode === "light" ? lightValue : darkValue;
}
