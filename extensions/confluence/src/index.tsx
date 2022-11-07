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
              commandKey="search_document"
              resetCommand={function (): void {
                throw new Error('Function not implemented.');
              }}
              specData={{
                extensionId: '',
                data: {'conflunce_domain':'gelocity.atlassian.net','email':'manoj@velocity.in','api_key':'1yiJdPX5wRsdD9lNWgy3D3CA'},
              }}
            />
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  </div>,
);
