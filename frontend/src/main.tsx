import { register } from '@tauri-apps/api/globalShortcut';
import { appWindow } from '@tauri-apps/api/window';
import ReactDOM from 'react-dom/client';

import App from './App';
import ThemeProvider from './theme/provider';

import './index.css';

// Register commands
register('Cmd+L', async () => {
  await appWindow.show();
  await appWindow.setFocus();
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
