/** Copyright (c) 2023, Poozle, all rights reserved. **/

import type { NextComponentType } from 'next';

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import { useRouter } from 'next/router';
import * as React from 'react';
import {
  Hydrate,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import SuperTokensReact, { SuperTokensWrapper } from 'supertokens-auth-react';

import { theme } from 'app/theme';

import '../styles/globals.scss';
import { frontendConfig } from './config';

if (typeof window !== 'undefined') {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig());
}

const useGetQueryClient = () => {
  const router = useRouter();

  return React.useRef(
    new QueryClient({
      queryCache: new QueryCache({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          if (error?.resStatus === 403) {
            // global intercept 403 and redirect to home page
            router.push('/');
          }
        },
      }),
    }),
  );
};

export const MyApp: NextComponentType<
  AppContext,
  AppInitialProps,
  AppLayoutProps
> = ({
  Component,
  pageProps: { dehydratedState, ...pageProps },
}: AppLayoutProps) => {
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const queryClientRef = useGetQueryClient();

  return (
    <SuperTokensWrapper>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={dehydratedState}>
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
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </SuperTokensWrapper>
  );
};

export default MyApp;
