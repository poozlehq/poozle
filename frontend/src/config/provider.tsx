import type { ColorScheme } from '@mantine/core';

import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { theme } from '@poozle/edk';
import * as React from 'react';

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        theme={theme(colorScheme) as any}
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
