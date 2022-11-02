import type { ColorScheme } from '@mantine/core';

import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import * as React from 'react';

import { theme } from './defaultTheme';

interface Props {
  children: React.ReactElement;
}

const DEFAULT_THEME_SCHEME = 'dark';

export const ThemeProvider = ({ children }: Props) => {
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>(DEFAULT_THEME_SCHEME);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
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
};
