import Unfonts from 'unplugin-fonts/vite';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  process.env.BASE_URL = process.env.VITE_BASE_URL ?? '';
  return {
    base: `${process.env.BASE_URL}/`,
    plugins: [
      react(),
      tsconfigPaths(),
      VitePWA({
        strategies: 'generateSW',
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        manifest: {
          name: 'JS on Demand',
          short_name: 'JSOD',
          start_url: `${process.env.BASE_URL}/`,
          display: 'standalone',
          background_color: '#FDFEFB',
          theme_color: '#fdfefb',
          description: 'Write, run, and share JavaScript code instantly.',
          icons: [
            {
              src: `${process.env.BASE_URL}/pwa-192x192.png`,
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: `${process.env.BASE_URL}/pwa-512x512.png`,
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: `${process.env.BASE_URL}/pwa-maskable-192x192.png`,
              sizes: '192x192',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: `${process.env.BASE_URL}/pwa-maskable-512x512.png`,
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{html,js,css,woff,woff2,ttf,eot,ico,wasm}'],
          runtimeCaching: [
            {
              urlPattern: /\.(?:wasm)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'web assembly',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 30 * 24 * 60 * 60,
                },
              },
            },
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'images',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 30 * 24 * 60 * 60,
                },
              },
            },
            {
              urlPattern: /\.(?:woff|woff2|ttf|eot|ico)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'fonts',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 30 * 24 * 60 * 60,
                },
              },
            },
          ],
          navigateFallback: null,
          cleanupOutdatedCaches: true,
          clientsClaim: true,
        },
        injectManifest: {
          globPatterns: ['**/*.{js,css,html,svg,png,svg,ico}'],
        },
      }),
      Unfonts({
        fontsource: {
          families: [
            {
              name: 'IBM Plex Sans',
              weights: [400, 500, 600, 700],
              styles: ['italic', 'normal'],
              subset: 'latin',
            },
            {
              name: 'IBM Plex Mono',
              weights: [400],
              styles: ['italic', 'normal'],
              subset: 'latin',
            },
          ],
        },
      }),
    ],
    define: {
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
      BASE_URL: JSON.stringify(process.env.BASE_URL),
    },
    worker: {
      format: 'es',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: '.vitest/setup',
      include: ['**/test.{ts,tsx}'],
    },
  };
});
