import Unfonts from 'unplugin-fonts/vite';
import { Plugin, defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import basicSsl from '@vitejs/plugin-basic-ssl';
import replace from '@rollup/plugin-replace';
import type { RollupReplaceOptions } from '@rollup/plugin-replace';

const replaceOptions: RollupReplaceOptions = {
  __DATE__: new Date().toISOString(),
  preventAssignment: true,
};

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  process.env.BASE_URL = process.env.VITE_BASE_URL ?? '';

  return {
    base: `${process.env.BASE_URL}/`,
    plugins: [
      react(),
      tsconfigPaths(),
      basicSsl(),
      replace(replaceOptions) as Plugin,
      VitePWA({
        strategies: 'generateSW',
        registerType: 'prompt',
        injectRegister: 'auto',
        manifest: {
          name: 'JS on Demand',
          short_name: 'JSOD',
          id: 'com.pkcarreno.jsod',
          start_url: `${process.env.BASE_URL}/`,
          display: 'standalone',
          background_color: '#FDFEFB',
          theme_color: '#fdfefb',
          description: 'Write, run, and share JavaScript code instantly.',
          prefer_related_applications: false,
          categories: ['productivity', 'utilities'],
          orientation: 'portrait',
          dir: 'ltr',
          shortcuts: [
            {
              name: 'New Editor',
              url: `${process.env.BASE_URL}/`,
              description: 'Open new editor',
            },
          ],
          screenshots: [
            {
              src: `${process.env.BASE_URL}/desktop-1.jpeg`,
              sizes: '1694×930',
              type: 'image/jpeg',
              form_factor: 'wide',
            },
            {
              src: `${process.env.BASE_URL}/mobile-1.jpeg`,
              sizes: '412×915',
              type: 'image/jpeg',
              form_factor: 'narrow',
            },
            {
              src: `${process.env.BASE_URL}/mobile-2.jpeg`,
              sizes: '412×915',
              type: 'image/jpeg',
              form_factor: 'narrow',
            },
          ],
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
          globPatterns: ['**/*.{html,js,css,svg,woff,woff2,ttf,eot,ico,wasm}'],
          sourcemap: true,
        },
        devOptions: {
          enabled: process.env.NODE_ENV === 'development',
          /* when using generateSW the PWA plugin will switch to classic */
          type: 'module',
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
