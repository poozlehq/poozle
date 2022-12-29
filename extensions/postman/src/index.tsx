/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { theme } from '@poozle/edk';
import ReactDOM from 'react-dom/client';

import App from './app/index';
import styles from './index.module.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const colorScheme = 'dark';

root.render(
  <div className={styles.rootContainer}>
    <div className={styles.innerContainer}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={() => console.log('changed')}
      >
        <MantineProvider
          theme={theme(colorScheme)}
          withCSSVariables
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider>
            <App
              commandKey="search_collections"
              resetCommand={function (): void {
                throw new Error('Function not implemented.');
              }}
              specData={{
                id: 0,
                extensionId: '',
                data: {
                  api_key: 'PMAK-63997e1fa744cb0617bdc46f-80d7ce45154d6357b21ae8640d670d0be2',
                  workspace_id: '14a99322-cdc5-4c9b-8b49-92414e9e7bf0',
                },
              }}
            />
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  </div>,
);
