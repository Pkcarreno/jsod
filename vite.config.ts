import Unfonts from 'unplugin-fonts/vite';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  process.env.BASE_URL = process.env.VITE_BASE_URL ?? '';
  return {
    base: process.env.BASE_URL,
    plugins: [
      react(),
      tsconfigPaths(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        manifest: {
          name: 'JS on Demand',
          short_name: 'JSOD',
          start_url: '/',
          display: 'standalone',
          background_color: '#FDFEFB',
          theme_color: '#fdfefb',
          description: 'Write, run, and share JavaScript code instantly.',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        },
      }),
      Unfonts({
        fontsource: {
          families: [
            {
              name: 'IBM Plex Sans',
              weights: [400, 500, 600, 700],
              styles: ['italic', 'normal'],
            },
            {
              name: 'IBM Plex Mono',
              weights: [400],
              styles: ['italic', 'normal'],
            },
          ],
        },
      }),
    ],
    define: {
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
      BASE_URL: JSON.stringify(process.env.BASE_URL),
    },
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: '.vitest/setup',
      include: ['**/test.{ts,tsx}'],
    },
  };
});
