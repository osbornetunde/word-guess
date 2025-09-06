/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['vitest.setup.ts', './src/test/setup.ts'],
    testTimeout: 120000,
    poolOptions: {
      threads: {
        minThreads: 1,
        maxThreads: 1,
      },
    },
  },
})