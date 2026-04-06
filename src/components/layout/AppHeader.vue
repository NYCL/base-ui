<script setup lang="ts">
import pkg from '../../../package.json';
import SearchIcon from '../icons/SearchIcon.vue';
import GithubIcon from '../icons/GithubIcon.vue';
import NpmIcon from '../icons/NpmIcon.vue';
</script>

<template>
  <header class="Header">
    <div class="HeaderInner">
      <router-link to="/" class="HeaderLogoLink" aria-label="Home">
        <img
          src="/favicon.svg"
          alt="Base UI Vue"
          width="24"
          height="24"
          class="HeaderLogo"
        />
      </router-link>
      <div class="HeaderDesktopActions">
        <div class="HeaderSearch" aria-label="Search">
          <SearchIcon class="HeaderSearchIcon" :size="15" :stroke-width="2.5" />
          <kbd class="HeaderSearchKbd">Ctrl + K</kbd>
        </div>
        <a
          class="HeaderLink"
          href="https://www.npmjs.com/package/vue-base-ui"
          target="_blank"
          rel="noopener"
          aria-label="NPM Package"
        >
          <NpmIcon :size="16" />
          {{ pkg.version }}
        </a>
        <a
          class="HeaderLink"
          href="https://github.com/nycl/base-ui"
          target="_blank"
          rel="noopener"
          aria-label="GitHub Repository"
        >
          <GithubIcon :size="18" />
          GitHub
        </a>
      </div>
      <!-- Mobile: hamburger + search -->
      <div class="HeaderMobileActions">
        <button class="HeaderButton HeaderSearchMobile" aria-label="Search">
          <SearchIcon :size="18" :stroke-width="2.5" />
        </button>
      </div>
    </div>
  </header>
</template>
