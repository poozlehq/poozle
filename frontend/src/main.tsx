/** Copyright (c) 2022, Poozle, all rights reserved. **/

import { register } from '@tauri-apps/api/globalShortcut';
import { appWindow } from '@tauri-apps/api/window';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Segment from 'react-segment-analytics';

import App from './app';
import { ThemeProvider } from './config';

import './index.css';

// Register commands
try {
  register('Cmd+L', async () => {
    await appWindow.show();
    await appWindow.setFocus();
  });
} catch (err) {
  console.log(err);
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ThemeProvider>
      <Segment writeKey={import.meta.env.DEV ? '12345' : import.meta.env.VITE_SEGMENT_KEY}>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </Segment>
    </ThemeProvider>
  </Router>,
);
