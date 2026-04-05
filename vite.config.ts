import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import Markdown from 'unplugin-vue-markdown/vite';
import Shiki from '@shikijs/markdown-it';

// https://vite.dev/config/
export default defineConfig(async () => ({
  plugins: [
    Markdown({
      async markdownItSetup(md) {
        // @ts-expect-error - markdown-it type mismatch between shiki and unplugin-vue-markdown
        md.use(await Shiki({
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
        }));
      },
    }),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}));
