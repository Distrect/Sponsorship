import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      '@styles': path.join(__dirname, 'src/styles'),
      '@actorPages': path.join(__dirname, 'src/actors/authority/pages'),
    },
  },
});
