import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';
import Markdown from 'unplugin-vue-markdown/vite';
import Shiki from '@shikijs/markdown-it';
import { 
  transformerNotationDiff, 
  transformerNotationHighlight,
  transformerNotationFocus,
  transformerNotationErrorLevel
} from '@shikijs/transformers';

// https://vite.dev/config/
export default defineConfig(async () => ({
  plugins: [
    tailwindcss(),
    Markdown({
      async markdownItSetup(md) {
        // @ts-expect-error - markdown-it type mismatch between shiki and unplugin-vue-markdown
        md.use(await Shiki({
          theme: {
            name: 'base-ui',
            bg: 'transparent',
            fg: 'var(--syntax-default)',
            settings: [
              {
                scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
                settings: { foreground: 'var(--syntax-comment)' },
              },
              {
                scope: ['constant', 'entity.name.constant', 'variable.other.constant', 'variable.other.enummember', 'variable.language'],
                settings: { foreground: 'var(--syntax-constant)' },
              },
              {
                scope: ['entity', 'entity.name'],
                settings: { foreground: 'var(--syntax-entity)' },
              },
              {
                scope: 'variable.parameter.function',
                settings: { foreground: 'var(--syntax-parameter)' },
              },
              {
                scope: 'entity.name.tag',
                settings: { foreground: 'var(--syntax-tag)' },
              },
              {
                scope: 'keyword',
                settings: { foreground: 'var(--syntax-keyword)' },
              },
              {
                scope: ['storage', 'storage.type'],
                settings: { foreground: 'var(--syntax-keyword)' },
              },
              {
                scope: ['storage.modifier.package', 'storage.modifier.import', 'storage.type.java'],
                settings: { foreground: 'var(--syntax-parameter)' },
              },
              {
                scope: ['string', 'punctuation.definition.string', 'string punctuation.section.embedded source'],
                settings: { foreground: 'var(--syntax-string)' },
              },
              {
                scope: ['support', 'meta.property-name'],
                settings: { foreground: 'var(--syntax-constant)' },
              },
              {
                scope: 'variable',
                settings: { foreground: 'var(--syntax-variable)' },
              },
              {
                scope: 'variable.other',
                settings: { foreground: 'var(--syntax-parameter)' },
              },
              {
                scope: ['invalid.broken', 'invalid.deprecated', 'invalid.illegal', 'invalid.unimplemented', 'message.error'],
                settings: { foreground: 'var(--syntax-invalid)', fontStyle: 'italic' },
              },
              {
                scope: ['source.regexp', 'string.regexp'],
                settings: { foreground: 'var(--syntax-string)' },
              },
              {
                scope: 'markup.bold',
                settings: { fontStyle: 'bold' },
              },
              {
                scope: 'markup.italic',
                settings: { fontStyle: 'italic' },
              },
            ],
          },
          transformers: [
            transformerNotationDiff(),
            transformerNotationHighlight(),
            transformerNotationFocus(),
            transformerNotationErrorLevel(),
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
