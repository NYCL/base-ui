# Base UI AI Agent Guidelines

This document provides context and guidelines for AI agents working within the `base-ui` repository. It should be used to understand the architectural preferences, file structures, and stack used across the libraries.

## Architecture & Goals

`base-ui` is a headless UI library. A core ongoing objective is to build components and utilities that are **framework-agnostic** at their core, while providing seamless hook wrappers for multiple ecosystems, notably **React** and **Vue**.

## Development Rules

### 1. Framework-Agnostic Core Logic
Whenever possible, complex logic (like event handling, timers, or state machines) should be isolated in plain, vanilla TypeScript classes or functions (e.g., `Timeout.ts`).
- Avoid importing framework-specific functions (`useEffect`, `onScopeDispose`) in core utility files.

### 2. Multi-Framework Exports
When providing wrappers for utilities or components, maintain clean separation of environments using standard Node subpath exports. 

Structure them into framework-specific directories:
- `@base-ui/utils/react` -> mapping to `src/react/index.ts`
- `@base-ui/utils/vue` -> mapping to `src/vue/index.ts`

### 3. File Naming & Structure
- Root of `src/` should contain the vanilla/headless logic and its `index.ts`.
- Framework wrappers should be contained entirely within `src/react/` and `src/vue/`.
- Maintain strict typing using TypeScript for all modules.

### 4. Dependencies
- Avoid intermixing framework dependencies. A component in `src/react` should safely import from `react` without affecting `src/vue`, and vice-versa.
- Ensure that `package.json` gracefully handles subpath exports with appropriate `main`/`types`/`exports` configurations.
