import { ColorScheme, MantineThemeOverride } from "@mantine/core";

export const theme = (colorScheme: ColorScheme): MantineThemeOverride => ({
  colorScheme,
  fontFamily: "Metropolis",
  defaultRadius: "sm",
  black: "#1f2023",
  white: "#F7F7F8",
});
