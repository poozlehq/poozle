/** Copyright (c) 2023, Poozle, all rights reserved. **/

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { AppProps } from 'next/app';
import * as React from 'react';

import { configProcessor } from 'app';

import '../styles/globals.scss';

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const ComponentToRender = configProcessor(router, Component, pageProps);
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
          theme={{ colorScheme }}
          withCSSVariables
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider position="top-right">
            {ComponentToRender}
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </ApolloProvider>
  );
}
