import type { ColorScheme } from "@mantine/core";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { useState } from "react";

import { theme } from "./defaultTheme";

type Props = {
  children: React.ReactElement;
};

const DEFAULT_THEME_SCHEME = "dark";

export default function ThemeProvider({ children }: Props) {
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(DEFAULT_THEME_SCHEME);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={theme(colorScheme)}
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
