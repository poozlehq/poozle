import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { theme } from '@poozle/edk';
import ReactDOM from 'react-dom/client';

import App from './app/index';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const colorScheme = 'dark';

root.render(
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
      position: 'fixed',
    }}
  >
    <div
      style={{
        background: '#1A1B1E',
        width: '800px',
        height: '800px',
        borderRadius: '8px',
      }}
    >
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
              commandKey="create_issue"
              resetCommand={function (): void {
                throw new Error('Function not implemented.');
              }}
              specData={{
                extensionId: '',
                data: {},
              }}
            />
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  </div>,
);
