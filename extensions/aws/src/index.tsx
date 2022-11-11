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
              commandKey="command1"
              resetCommand={function (): void {
                throw new Error('Function not implemented.');
              }}
              specData={{
                extensionId: '',
                data: { profile_name: 'staging', file_path: '~/.aws/credentials', access_key: 'AKIAU4T4YDSML4XCR3B6', secret_key: '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'},
              }}
            />
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  </div>,
);
