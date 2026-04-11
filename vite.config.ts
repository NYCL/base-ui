import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';
import Markdown from 'unplugin-vue-markdown/vite';
import Shiki from '@shikijs/markdown-it';

// https://vite.dev/config/
export default defineConfig(async () => ({
  plugins: [
    tailwindcss(),
    Markdown({
      async markdownItSetup(md) {
        // @ts-expect-error - markdown-it type mismatch between shiki and unplugin-vue-markdown
        md.use(await Shiki({
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
          transformers: [
            {
              name: 'copy-button',
              pre(node) {
                node.children.push({
                  type: 'element',
                  tagName: 'button',
                  properties: {
                    className: ['copy-button'],
                    'aria-label': 'Copy code',
                  },
                  children: [{ type: 'text', value: 'Copy' }]
                });
              }
            },
          ]
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
