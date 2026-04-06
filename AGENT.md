# Base UI AI Agent Technical Guidelines

This document provides context and guidelines for AI agents working within the `base-ui` repository. It is essential for understanding architectural preferences, monorepo file structures, and the development stack.

## Architecture & Goals

`base-ui` is a headless UI library. Our core objective is to build components and utilities that are **framework-agnostic** at their foundation, while providing seamless hooks for **Vue** and **React**.

---

## Development Stack

- **Package Manager**: **Bun** (Core), npm/pnpm (Secondary). Always use `bun add` for installs.
- **Transpiler/Bundler**: **Vite** for the documentation site and builds.
- **Languages**: **TypeScript** (Mandatory), HTML/CSS.
- **Logic**: Vanilla TypeScript classes/fns for core behavior.

---

## Monorepo Structure

- **`packages/utils`**: Framework-agnostic core logic. Everything from event handling to accessibility helpers lives here.
- **`packages/vue`**: High-level Vue component wrappers and specialized hooks.
- **`packages/react`**: High-level React component wrappers and specialized hooks.
- **`src`**: Documentation site (Vue-based).

---

## Development Rules

### 1. Separation of Concerns
Whenever possible, complex logic (like event handling, timers, or state machines) should be isolated in `@base-ui/utils` to ensure consistency cross-framework.
- **Do not** import `vue` or `react` into core utility files in `packages/utils/src`.

### 2. Multi-Framework Exports
When providing wrappers for utilities or components, maintain clean separation of environments using standard Node subpath exports. 

Structure them into framework-specific directories within `@base-ui/utils`:
- `@base-ui/utils/react`
- `@base-ui/utils/vue`

### 3. Styling & Syntax
- **CSS Variable-First**: We use a custom OKLCH color system defined in `theme.css`. Always use `--color-*` variables.
- **Headless**: Components MUST NOT contain hardcoded styling unless it's strictly necessary for structural functionality (e.g., hiding hidden elements).

### 4. Code Block Best Practices
When updating the documentation site (in `src/`):
- Ensure code blocks do not have unnecessary blank lines (spacing is handled by Flexbox).
- Include the **Copy Button** transformer in any new Shiki configurations.
- Use `transformerNotationDiff` and `transformerNotationHighlight` to provide a premium developer experience.

---

## Component Creation Workflow

1.  **Extract Logic**: Write the component behavior in a framework-agnostic utility.
2.  **Vue Wrapper**: Implement the Vue component in `packages/vue/src` using the utility.
3.  **React Wrapper**: Implement the React component in `packages/react/src` for consistency.
4.  **Docs**: Create a corresponding markdown file in `docs/` and update the documentation site.

## Verification Checklist

- [ ] Does it run in both **light and dark modes**?
- [ ] Is the logic **framework-agnostic** where possible?
- [ ] Does the documentation include **interactive demos** and **code snippets**?
- [ ] Does it follow the **OKLCH theme system**?

---

*Base UI Vue is inspired by the exceptional work from the mui/base-ui team.*
