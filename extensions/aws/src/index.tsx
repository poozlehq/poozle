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
              commandKey="get_sqs"
              resetCommand={function (): void {
                throw new Error('Function not implemented.');
              }}
              specData={{
                extensionId: '',
                data: {
                  access_key: 'AKIA2QVBJ6HSUSRQGLHO',
                  secret_key: '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',
                  region: 'ap-south-1',
                },
              }}
            />
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  </div>,
);
