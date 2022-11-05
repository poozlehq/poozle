/** Copyright (c) 2022, Poozle, all rights reserved. **/

import type { ColorScheme } from '@mantine/core';

import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import * as React from 'react';

import { defaultColorScheme, theme } from './defaultTheme';

interface Props {
  children: React.ReactElement;
}

export const ThemeProvider = ({ children }: Props) => {
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>(defaultColorScheme);

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
