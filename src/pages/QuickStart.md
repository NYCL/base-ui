# Quick start

<div class="description">Get up and running with Base UI Vue — install it and start building.</div>

## Installation

Base UI Vue is available as an npm package.

```bash
npm install @base-ui/vue
```

Or with yarn:

```bash
yarn add @base-ui/vue
```

Or with pnpm:

```bash
pnpm add @base-ui/vue
```

## Setup

Import and use Base UI components directly in your Vue single-file components. No provider wrapping or global config is required.

```vue
<script setup>
import { Input } from '@base-ui/vue';
</script>

<template>
  <Input placeholder="Enter text..." />
</template>
```

## With Vite

If you're using Vite (recommended), no additional configuration is needed. Just install the package and start importing components.

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
});
```

## TypeScript

Base UI Vue is written in TypeScript and ships with full type declarations. You get autocompletion and type checking out of the box.

## Styling

Base UI components are unstyled by default. They provide the structure, behavior, and accessibility — you provide the styles. This means you can use any CSS approach: vanilla CSS, CSS Modules, Tailwind, or any other solution.

```vue
<template>
  <Input class="my-custom-input" />
</template>

<style>
.my-custom-input {
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
}
</style>
```

## Next steps

- Explore the [Field](/overview/quick-start#) and [Input](/overview/quick-start#) components
- Read the [Accessibility](/overview/accessibility) guidelines
