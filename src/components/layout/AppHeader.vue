<script setup lang="ts">
import pkg from '../../../package.json';
import SearchIcon from '../icons/SearchIcon.vue';
import GithubIcon from '../icons/GithubIcon.vue';
import NpmIcon from '../icons/NpmIcon.vue';
</script>

<template>
  <header class="absolute left-0 top-0 h-[var(--header-height)] w-full text-[length:var(--text-md)] leading-[var(--text-md-lh)]">
    <div class="h-[var(--header-height)] flex items-center justify-between px-6 fixed top-0 inset-x-0 shadow-[inset_0_-1px_var(--color-gridline)] bg-background z-10 lg:static lg:shadow-none lg:bg-transparent">
      <router-link to="/" class="flex items-center px-2 -mx-2 py-1 -my-1 rounded-md transition-opacity active:opacity-70 focus-visible:outline-2 focus-visible:outline-blue focus-visible:-outline-offset-1" aria-label="Home">
        <img
          src="/favicon.svg"
          alt="Base UI Vue"
          width="24"
          height="24"
          class="block"
        />
      </router-link>
      <div class="hidden lg:flex gap-6 items-center">
        <div class="flex items-center gap-6 h-8 px-2 pl-3.5 border border-gray-200 bg-gray-100 rounded-md text-gray-600 cursor-text transition-[border-color] duration-150 hover:border-gray-300" aria-label="Search">
          <SearchIcon class="shrink-0" :size="15" :stroke-width="2.5" />
          <kbd class="font-[inherit] text-xs px-1.5 py-0.5 bg-content border border-gray-200 text-gray-400 rounded">Ctrl + K</kbd>
        </div>
        <a
          class="flex items-center gap-2 text-gray-600 px-2 py-1 rounded-md transition-colors duration-150 hover:text-foreground hover:bg-gray-100"
          href="https://www.npmjs.com/package/vue-base-ui"
          target="_blank"
          rel="noopener"
          aria-label="NPM Package"
        >
          <NpmIcon :size="16" />
          {{ pkg.version }}
        </a>
        <a
          class="flex items-center gap-2 text-gray-600 px-2 py-1 rounded-md transition-colors duration-150 hover:text-foreground hover:bg-gray-100"
          href="https://github.com/nycl/base-ui"
          target="_blank"
          rel="noopener"
          aria-label="GitHub Repository"
        >
          <GithubIcon :size="18" />
          GitHub
        </a>
      </div>
      <!-- Mobile: search -->
      <div class="flex items-center gap-2 lg:hidden">
        <button class="flex items-center justify-center w-9 h-9 rounded-md text-gray-600 transition-colors duration-150 hover:bg-gray-100" aria-label="Search">
          <SearchIcon :size="18" :stroke-width="2.5" />
        </button>
      </div>
    </div>
  </header>
</template>
