import React from 'react';
import ReactDOM from 'react-dom/client';
import { register } from '@tauri-apps/api/globalShortcut';
import { appWindow } from '@tauri-apps/api/window';

import ThemeProvider from './theme/provider';
import App from './App';

import './index.css';

// Register commands
register('Cmd+L', async () => {
  await appWindow.show();
  await appWindow.setFocus();
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
