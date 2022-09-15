import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      utils: path.resolve(__dirname, './src/utils'),
      context: path.resolve(__dirname, './src/context'),
      ui: path.resolve(__dirname, './src/ui'),
      wrapper: path.resolve(__dirname, './src/wrapper'),
      types: path.resolve(__dirname, './src/types'),
    },
  },
  plugins: [react()],
});
