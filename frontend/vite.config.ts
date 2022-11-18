/** Copyright (c) 2022, Poozle, all rights reserved. **/

import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

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
      service: path.resolve(__dirname, './src/service'),
      pages: path.resolve(__dirname, './src/pages'),
    },
  },
  plugins: [react()],
});
