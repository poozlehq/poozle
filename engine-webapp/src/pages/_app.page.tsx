/** Copyright (c) 2023, Poozle, all rights reserved. **/

import type { NextComponentType } from 'next';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import * as React from 'react';

import { theme } from 'app/theme';

import '../styles/globals.scss';

export const MyApp: NextComponentType<
  AppContext,
  AppInitialProps,
  AppLayoutProps
> = ({ Component, pageProps }: AppLayoutProps) => {
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BASE_SERVER_URL,
    cache: new InMemoryCache(),
    credentials: 'include',
  });

  return (
    <ApolloProvider client={client}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            colorScheme,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...(theme as any),
          }}
          withCSSVariables
          withGlobalStyles
          withNormalizeCSS
        >
          <Notifications />
          {getLayout(<Component {...pageProps} />)}
        </MantineProvider>
      </ColorSchemeProvider>
    </ApolloProvider>
  );
};

export default MyApp;
