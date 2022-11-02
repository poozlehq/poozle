import { Loader as LoaderComponent, MantineProvider } from '@mantine/core';
import { theme } from 'config/defaultTheme';
import * as React from 'react';

import styles from './loader.module.scss';

export const Loader = (): React.ReactElement => (
  <div className={styles.loader}>
    <MantineProvider
      theme={theme('dark')}
      inherit
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
    >
      <LoaderComponent />
    </MantineProvider>
  </div>
);
