import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cesium from 'vite-plugin-cesium';

export default defineConfig({
  plugins: [react(), cesium()],
  optimizeDeps: {
    exclude: ['@cesium/engine', '@cesium/widgets']
  },
  build: {
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          cesium: ['@cesium/engine', '@cesium/widgets'],
          react: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@headlessui/react', '@heroicons/react']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
