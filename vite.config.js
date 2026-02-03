import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/fonds-chauffage-simulator/',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});