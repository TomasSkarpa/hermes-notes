"use client";

import React from "react";
import { ChakraProvider, defaultSystem, Theme } from "@chakra-ui/react";

import { ChildrenInterface } from "~/shared/interfaces/general/childrenNode";
import { ColorModeProvider, useColorMode } from "~/shared/contexts/colorMode";

const ThemeBridge: React.FC<{
  children: React.ReactNode;
  defaultColorMode: "light" | "dark";
}> = ({ children, defaultColorMode }) => {
  const { colorMode } = useColorMode();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Use defaultColorMode during SSR and initial render to prevent hydration mismatch
  const appearance = mounted ? colorMode : defaultColorMode;

  return <Theme appearance={appearance}>{children}</Theme>;
};

const GlobalContext: React.FC<ChildrenInterface> = ({ children }) => {
  const defaultColorMode: "light" | "dark" = "dark";

  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider defaultColorMode={defaultColorMode}>
        <ThemeBridge defaultColorMode={defaultColorMode}>
          {children}
        </ThemeBridge>
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default GlobalContext;
