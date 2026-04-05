<script setup lang="ts">
import { ref, nextTick, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import pkg from '../package.json';

const route = useRoute();

// ─── TOC / Quick Nav ───
const tocItems = ref<{ id: string; text: string; level: number }[]>([]);
const activeHeadingId = ref('');

function extractToc() {
  const headings = Array.from(document.querySelectorAll('.markdown-body h2, .markdown-body h3'));
  tocItems.value = headings.map((h) => {
    const el = h as HTMLElement;
    if (!el.id) {
      el.id =
        el.textContent
          ?.trim()
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, '') || '';
    }
    return {
      id: el.id,
      text: el.textContent || '',
      level: el.tagName === 'H2' ? 2 : 3,
    };
  });
}

watch(
  () => route.path,
  async () => {
    await nextTick();
    // Small delay to let markdown render
    setTimeout(() => {
      extractToc();
      activeHeadingId.value = '';
    }, 100);
  },
  { immediate: true },
);

// ─── Scroll Spy ───
function handleScroll() {
  const headings = tocItems.value
    .map((item) => {
      const el = document.getElementById(item.id);
      return el ? { id: item.id, top: el.getBoundingClientRect().top } : null;
    })
    .filter(Boolean) as { id: string; top: number }[];

  // Find the heading closest to top of viewport
  const offset = 100;
  let current = '';
  for (const h of headings) {
    if (h.top <= offset) {
      current = h.id;
    }
  }
  if (!current && headings.length > 0) {
    current = headings[0]?.id ?? '';
  }
  activeHeadingId.value = current;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

function scrollToAnchor(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
    activeHeadingId.value = id;
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  activeHeadingId.value = '';
}

// ─── Theme ───
type ThemeMode = 'system' | 'light' | 'dark';
const theme = ref<ThemeMode>('system');

function applyTheme() {
  const root = document.documentElement;
  root.removeAttribute('data-theme-mode');
  root.classList.remove('dark-theme', 'light-theme');

  if (theme.value === 'dark') {
    root.classList.add('dark-theme');
    root.setAttribute('data-theme-mode', 'dark');
  } else if (theme.value === 'light') {
    root.classList.add('light-theme');
    root.setAttribute('data-theme-mode', 'light');
  } else {
    root.setAttribute('data-theme-mode', 'system');
    // Let CSS media queries handle it
  }
}

function cycleTheme() {
  if (theme.value === 'system') theme.value = 'light';
  else if (theme.value === 'light') theme.value = 'dark';
  else theme.value = 'system';
  applyTheme();
}

onMounted(applyTheme);

// ─── Page Title ───
const pageTitle = ref('');
watch(
  () => (route.meta as Record<string, unknown>)['title'] as string | undefined,
  (title) => {
    pageTitle.value = title || 'Base UI Vue';
    document.title = `${pageTitle.value} — Base UI Vue`;
  },
  { immediate: true },
);
</script>

<template>
  <div class="RootLayout">
    <div class="RootLayoutContainer">
      <div class="RootLayoutContent">
        <div class="ContentLayoutRoot">
          <!-- ════ Header ════ -->
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
                  <!-- Search Icon -->
                  <svg
                    class="HeaderSearchIcon"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <kbd class="HeaderSearchKbd">Ctrl + K</kbd>
                </div>
                <a
                  class="HeaderLink"
                  href="https://www.npmjs.com/package/vue-base-ui"
                  target="_blank"
                  rel="noopener"
                  aria-label="NPM Package"
                >
                  <!-- Npm Icon (matching reference) -->
                  <svg
                    fill="currentcolor"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0 0V16H16V0H0ZM13 3H3V13H8V5H11V13H13V3Z"
                    />
                  </svg>
                  {{ pkg.version }}
                </a>
                <a
                  class="HeaderLink"
                  href="https://github.com/nicklasyoung/base-ui"
                  target="_blank"
                  rel="noopener"
                  aria-label="GitHub Repository"
                >
                  <!-- GitHub Icon (matching reference) -->
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="currentcolor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.375 0C4.6095 0 0.75 3.8595 0.75 8.625C0.75 12.4418 3.219 15.6652 6.64725 16.8075C7.0785 16.8832 7.23975 16.6245 7.23975 16.398C7.23975 16.1933 7.22925 15.5145 7.22925 14.7915C5.0625 15.1905 4.50225 14.2635 4.32975 13.779C4.23225 13.5308 3.81225 12.765 3.44475 12.5602C3.14325 12.3982 2.712 11.9993 3.43425 11.9888C4.11375 11.9783 4.599 12.6142 4.761 12.873C5.53725 14.178 6.777 13.8105 7.27275 13.584C7.34775 13.0237 7.57425 12.6465 7.8225 12.4305C5.90325 12.2153 3.8985 11.4713 3.8985 8.172C3.8985 7.2345 4.23225 6.45825 4.782 5.8545C4.69575 5.6385 4.39425 4.75425 4.86825 3.5685C4.86825 3.5685 5.5905 3.342 7.2405 4.45275C7.9305 4.2585 8.66325 4.16175 9.39675 4.16175C10.1295 4.16175 10.863 4.25925 11.553 4.45275C13.203 3.3315 13.9245 3.5685 13.9245 3.5685C14.3993 4.75425 14.097 5.6385 14.0107 5.8545C14.5605 6.45825 14.895 7.22325 14.895 8.172C14.895 11.4818 12.879 12.2145 10.9598 12.4305C11.2725 12.7005 11.5417 13.218 11.5417 14.0265C11.5417 15.18 11.5312 16.107 11.5312 16.398C11.5312 16.6245 11.6933 16.8945 12.1238 16.8083C15.5318 15.6652 18 12.4305 18 8.625C18 3.8595 14.1405 0 9.375 0Z"
                    />
                  </svg>
                  GitHub
                </a>
              </div>
              <!-- Mobile: hamburger + search -->
              <div class="HeaderMobileActions">
                <button class="HeaderButton HeaderSearchMobile" aria-label="Search">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          <!-- ════ Left Side Nav ════ -->
          <nav class="SideNavRoot" aria-label="Main navigation">
            <div class="SideNavViewport">
              <!-- Framework Toggle -->
              <div class="FrameworkToggle">
                <span class="FrameworkBtn active">
                  <svg
                    class="FrameworkIcon"
                    width="14"
                    height="14"
                    viewBox="0 0 261.76 226.69"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M161.096.001l-30.225 52.351L100.647.001H0l130.877 226.688L261.749.001z"
                      fill="#41B883"
                    />
                    <path
                      d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z"
                      fill="#34495E"
                    />
                  </svg>
                  Vue
                </span>
                <span class="FrameworkBtn disabled" title="React docs coming soon">
                  <svg
                    class="FrameworkIcon"
                    width="14"
                    height="14"
                    viewBox="-11.5 -10.232 23 20.463"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle r="2.05" fill="#61DAFB" />
                    <g stroke="#61DAFB" stroke-width="1" fill="none">
                      <ellipse rx="11" ry="4.2" />
                      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                    </g>
                  </svg>
                  React
                </span>
              </div>

              <div class="SideNavSection">
                <div class="SideNavHeading">Overview</div>
                <ul class="SideNavList">
                  <li class="SideNavItem">
                    <router-link
                      to="/overview/quick-start"
                      class="SideNavLink"
                      :data-active="route.path === '/overview/quick-start' || undefined"
                    >
                      Quick start
                    </router-link>
                  </li>
                  <li class="SideNavItem">
                    <router-link
                      to="/overview/accessibility"
                      class="SideNavLink"
                      :data-active="route.path === '/overview/accessibility' || undefined"
                    >
                      Accessibility
                    </router-link>
                  </li>
                </ul>
              </div>

              <div class="SideNavSection">
                <div class="SideNavHeading">Components</div>
                <ul class="SideNavList">
                  <li class="SideNavItem">
                    <router-link
                      to="/components/field"
                      class="SideNavLink"
                      :data-active="route.path === '/components/field' || undefined"
                    >
                      Field
                    </router-link>
                  </li>
                  <li class="SideNavItem">
                    <router-link
                      to="/components/input"
                      class="SideNavLink"
                      :data-active="route.path === '/components/input' || undefined"
                    >
                      Input
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <!-- ════ Main Content ════ -->
          <main class="ContentLayoutMain" id="main-content">
            <div class="QuickNavContainer">
              <div class="markdown-body">
                <router-view />
              </div>
            </div>
          </main>

          <!-- ════ Quick Nav (Right Sidebar) ════ -->
          <div class="QuickNavContainer QuickNavSidebar">
            <nav class="QuickNavRoot" aria-label="On this page" v-if="tocItems.length">
              <div class="QuickNavInner">
                <header class="QuickNavTitle">
                  <a href="#" @click.prevent="scrollToTop" class="QuickNavLink QuickNavTopLink">
                    {{ pageTitle || 'Page' }}
                  </a>
                </header>
                <ul class="QuickNavList">
                  <li
                    class="QuickNavItem"
                    v-for="item in tocItems"
                    :key="item.id"
                    :class="{ 'QuickNavItem--nested': item.level === 3 }"
                  >
                    <a
                      :href="'#' + item.id"
                      class="QuickNavLink"
                      :class="{ 'QuickNavLink--active': activeHeadingId === item.id }"
                      @click.prevent="scrollToAnchor(item.id)"
                    >
                      {{ item.text }}
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <!-- Theme toggle floating button -->
    <button
      class="ThemeToggle"
      @click="cycleTheme"
      :aria-label="'Theme: ' + theme"
      :title="'Theme: ' + theme"
    >
      <!-- Sun icon (shown in dark mode) -->
      <svg
        v-if="theme === 'dark'"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      <!-- Moon icon (shown in light mode) -->
      <svg
        v-else-if="theme === 'light'"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      <!-- Monitor icon (system mode) -->
      <svg
        v-else
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    </button>
  </div>
</template>

<style>
/* ════════════════════════════════════════════════════
   BASE THEME — OKLCH Color System (matching reference)
   ════════════════════════════════════════════════════ */

:root {
  color-scheme: light dark;

  /* ─── Core colors ─── */
  --color-blue: oklch(45% 50% 264deg);
  --color-red: oklch(50% 55% 31deg);

  /* ─── Gray scale (light) ─── */
  --color-gray-50: oklch(98% 0.25% 264deg);
  --color-gray-75: oklch(97% 0.325% 264deg);
  --color-gray-100: oklch(12% 9.5% 264deg / 5%);
  --color-gray-200: oklch(12% 9% 264deg / 7%);
  --color-gray-300: oklch(12% 8.5% 264deg / 17%);
  --color-gray-400: oklch(12% 8% 264deg / 38%);
  --color-gray-500: oklch(12% 7.5% 264deg / 50%);
  --color-gray-600: oklch(12% 7% 264deg / 67%);
  --color-gray-700: oklch(12% 6% 264deg / 77%);
  --color-gray-800: oklch(12% 5% 264deg / 85%);
  --color-gray-900: oklch(12% 5% 264deg / 90%);
  --color-gray-950: oklch(12% 5% 264deg / 95%);

  /* ─── Functional tokens ─── */
  --color-content: white;
  --color-background: var(--color-gray-50);
  --color-foreground: var(--color-gray-900);
  --color-gridline: oklch(91.6% 1% 264deg);
  --color-selection: oklch(80% 50% 264deg / 25%);

  /* ─── Layout ─── */
  --header-height: 3rem;
  --sidebar-width: 17.5rem;
  --breakpoint-max-layout-width: 89rem;
  --root-layout-padding-x: 0rem;

  /* ─── Typography ─── */
  --text-md: 0.9375rem;
  --text-md--line-height: 1.375rem;

  /* ─── Radii ─── */
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
}

/* ─── Dark mode (system) ─── */
@media (prefers-color-scheme: dark) {
  :root:not(.light-theme) {
    --color-blue: oklch(69% 50% 264deg);
    --color-red: oklch(80% 55% 31deg);

    --color-gray-50: oklch(17% 0.25% 264deg);
    --color-gray-75: oklch(19% 0.5% 264deg);
    --color-gray-100: oklch(28% 0.75% 264deg / 65%);
    --color-gray-200: oklch(29% 0.75% 264deg / 80%);
    --color-gray-300: oklch(35% 0.75% 264deg / 80%);
    --color-gray-400: oklch(47% 0.875% 264deg / 80%);
    --color-gray-500: oklch(64% 1% 264deg / 80%);
    --color-gray-600: oklch(82% 1% 264deg / 80%);
    --color-gray-700: oklch(92% 1.125% 264deg / 80%);
    --color-gray-800: oklch(93% 0.875% 264deg / 85%);
    --color-gray-900: oklch(95% 0.5% 264deg / 90%);
    --color-gray-950: oklch(94% 0.375% 264deg / 95%);

    --color-content: black;
    --color-background: black;
    --color-foreground: oklch(90% 2% 264deg);
    --color-gridline: oklch(24% 1% 264deg);
    --color-selection: oklch(50% 50% 264deg / 40%);
  }
}

/* ─── Forced dark theme ─── */
:root.dark-theme {
  --color-blue: oklch(69% 50% 264deg);
  --color-red: oklch(80% 55% 31deg);

  --color-gray-50: oklch(17% 0.25% 264deg);
  --color-gray-75: oklch(19% 0.5% 264deg);
  --color-gray-100: oklch(28% 0.75% 264deg / 65%);
  --color-gray-200: oklch(29% 0.75% 264deg / 80%);
  --color-gray-300: oklch(35% 0.75% 264deg / 80%);
  --color-gray-400: oklch(47% 0.875% 264deg / 80%);
  --color-gray-500: oklch(64% 1% 264deg / 80%);
  --color-gray-600: oklch(82% 1% 264deg / 80%);
  --color-gray-700: oklch(92% 1.125% 264deg / 80%);
  --color-gray-800: oklch(93% 0.875% 264deg / 85%);
  --color-gray-900: oklch(95% 0.5% 264deg / 90%);
  --color-gray-950: oklch(94% 0.375% 264deg / 95%);

  --color-content: black;
  --color-background: black;
  --color-foreground: oklch(90% 2% 264deg);
  --color-gridline: oklch(24% 1% 264deg);
  --color-selection: oklch(50% 50% 264deg / 40%);
}

/* ─── Forced light theme ─── */
:root.light-theme {
  --color-blue: oklch(45% 50% 264deg);
  --color-red: oklch(50% 55% 31deg);

  --color-gray-50: oklch(98% 0.25% 264deg);
  --color-gray-75: oklch(97% 0.325% 264deg);
  --color-gray-100: oklch(12% 9.5% 264deg / 5%);
  --color-gray-200: oklch(12% 9% 264deg / 7%);
  --color-gray-300: oklch(12% 8.5% 264deg / 17%);
  --color-gray-400: oklch(12% 8% 264deg / 38%);
  --color-gray-500: oklch(12% 7.5% 264deg / 50%);
  --color-gray-600: oklch(12% 7% 264deg / 67%);
  --color-gray-700: oklch(12% 6% 264deg / 77%);
  --color-gray-800: oklch(12% 5% 264deg / 85%);
  --color-gray-900: oklch(12% 5% 264deg / 90%);
  --color-gray-950: oklch(12% 5% 264deg / 95%);

  --color-content: white;
  --color-background: var(--color-gray-50);
  --color-foreground: var(--color-gray-900);
  --color-gridline: oklch(91.6% 1% 264deg);
  --color-selection: oklch(80% 50% 264deg / 25%);
}

/* ════════════════════════
   GLOBAL RESET & BASE
   ════════════════════════ */

html {
  word-break: break-word;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-synthesis: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-y: scroll;
  min-width: 320px;
  line-height: 1.5;
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family:
    'Inter',
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: var(--text-md);
}

::selection {
  background-color: var(--color-selection);
}

a {
  color: inherit;
  text-decoration: none;
}

code {
  font-family: 'SF Mono', Menlo, 'DejaVu Sans Mono', Consolas, Inconsolata, monospace;
  font-size: 0.875em;
}

button {
  font-family: inherit;
  border: none;
  background: none;
  cursor: pointer;
  color: inherit;
}

ul,
ol {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>

<style scoped>
/* ════════════════════════
   ROOT LAYOUT
   ════════════════════════ */

.RootLayout {
  z-index: 0;
  position: relative;
  padding-inline: var(--root-layout-padding-x);
}

@media (min-width: 64rem) {
  .RootLayout {
    --root-layout-padding-x: 3rem;
  }

  .RootLayout::before,
  .RootLayout::after {
    content: '';
    position: absolute;
    background-color: var(--color-gridline);
    height: 1px;
    right: 0;
    left: 0;
  }

  .RootLayout::before {
    top: var(--header-height);
    margin-top: -1px;
  }

  .RootLayout::after {
    bottom: var(--header-height);
    margin-bottom: -1px;
  }
}

.RootLayoutContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-inline: auto;
  min-height: 100dvh;
  max-width: calc(var(--breakpoint-max-layout-width) - var(--root-layout-padding-x) * 2);
}

@media (min-width: 64rem) {
  .RootLayoutContainer {
    padding-block: var(--header-height);
    padding-bottom: 0;
  }

  .RootLayoutContainer::before,
  .RootLayoutContainer::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: var(--color-gridline);
  }

  .RootLayoutContainer::before {
    left: 0;
    margin-left: -1px;
  }

  .RootLayoutContainer::after {
    right: 0;
    margin-right: -1px;
  }
}

.RootLayoutContent {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  background-color: var(--color-content);
}

/* ════════════════════════
   CONTENT GRID
   ════════════════════════ */

.ContentLayoutRoot {
  display: grid;
  align-items: start;
  padding-top: var(--header-height);
  padding-inline: 1.5rem;
  grid-template-columns: 1fr;
}

@media (min-width: 40rem) {
  .ContentLayoutRoot {
    padding-inline: 2.5rem;
  }
}

@media (min-width: 64rem) {
  .ContentLayoutRoot {
    padding-top: 0;
    padding-inline: 0;
    grid-template-columns: var(--sidebar-width) 1fr 3rem;
  }
}

@media (min-width: 84rem) {
  .ContentLayoutRoot {
    grid-template-columns: var(--sidebar-width) 1fr var(--sidebar-width);
  }
}

/* ════════════════════════
   HEADER
   ════════════════════════ */

.Header {
  font-size: var(--text-md);
  line-height: var(--text-md--line-height);
  position: absolute;
  left: 0;
  top: 0;
  height: var(--header-height);
  width: 100%;
}

.HeaderInner {
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 1.5rem;
  position: fixed;
  top: 0;
  inset-inline: 0;
  box-shadow: inset 0 -1px var(--color-gridline);
  background-color: var(--color-background);
  z-index: 10;
}

@media (min-width: 64rem) {
  .HeaderInner {
    position: static;
    box-shadow: none;
    background-color: transparent;
  }
}

.HeaderLogoLink {
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  margin: -0.25rem -0.5rem;
  border-radius: var(--radius-md);
  transition: opacity 0.15s;
}

.HeaderLogoLink:active {
  opacity: 0.7;
}

.HeaderLogoLink:focus-visible {
  outline: 2px solid var(--color-blue);
  outline-offset: -1px;
}

.HeaderLogo {
  display: block;
}

.HeaderDesktopActions {
  display: none;
  gap: 1.5rem;
  align-items: center;
}

@media (min-width: 64rem) {
  .HeaderDesktopActions {
    display: flex;
  }
}

.HeaderMobileActions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

@media (min-width: 64rem) {
  .HeaderMobileActions {
    display: none;
  }
}

.HeaderLink,
.HeaderButton {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.5rem;
  margin: -0.25rem -0.5rem;
  border-radius: var(--radius-md);
  flex-shrink: 0;
  font-size: var(--text-md);
  transition: color 0.15s;
}

.HeaderLink > *,
.HeaderButton > * {
  flex-shrink: 0;
}

.HeaderLink:hover {
  text-decoration: underline;
  text-decoration-color: var(--color-gray-500);
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
}

.HeaderLink:focus-visible,
.HeaderButton:focus-visible {
  z-index: 1;
  outline: 2px solid var(--color-blue);
  outline-offset: -2px;
}

.HeaderButton:hover {
  background-color: var(--color-gray-100);
}

/* ─── Header Search ─── */
.HeaderSearch {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.25rem 0.25rem 0.6rem;
  background-color: var(--color-gray-100);
  border: 1px solid var(--color-gray-200);
  border-radius: 999px;
  color: var(--color-gray-600);
  cursor: pointer;
  transition:
    border-color 0.2s,
    background-color 0.2s;
  height: 2rem;
}

.HeaderSearch:hover {
  border-color: var(--color-gray-300);
  background-color: transparent;
}

.HeaderSearchIcon {
  color: var(--color-gray-500);
}

.HeaderSearchKbd {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.15rem 0.5rem;
  background-color: var(--color-content);
  border: 1px solid var(--color-gray-200);
  border-radius: 999px;
  font-family: inherit;
  color: var(--color-gray-600);
  line-height: 1.2;
}

.HeaderSearchMobile {
  padding: 0.5rem;
}

/* ════════════════════════
   SIDE NAV
   ════════════════════════ */

.SideNavRoot {
  --side-nav-item-height: 2rem;
  --side-nav-item-line-height: var(--text-md--line-height);
  --side-nav-item-padding-y: calc(
    var(--side-nav-item-height) / 2 - var(--side-nav-item-line-height) / 2
  );

  font-size: var(--text-md);
  line-height: var(--text-md--line-height);
  position: sticky;
  top: 0;
  display: none;
}

@media (min-width: 64rem) {
  .SideNavRoot {
    display: block;
  }
}

.SideNavViewport {
  max-height: 100vh;
  padding: 0.75rem 2rem 6rem 1.5rem;
  overflow-y: auto;
  outline: 0;
}

.SideNavSection {
  margin-bottom: 1rem;
}

.SideNavHeading {
  display: inline-flex;
  padding-block: var(--side-nav-item-padding-y);
  font-weight: 400;
  color: var(--color-gray-600);
}

.SideNavItem {
  display: flex;
}

.SideNavLink {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-grow: 1;
  padding: calc(var(--side-nav-item-padding-y) - 1px) 0.75rem;
  border-block: 1px solid transparent;
  background-clip: padding-box;
  border-radius: var(--radius-md);
  user-select: none;
  color: inherit;
  transition: background-color 0.15s;
}

.SideNavLink:hover {
  background-color: var(--color-gray-100);
}

.SideNavLink[data-active] {
  border: none;
  padding: var(--side-nav-item-padding-y) 0.75rem;
  background-color: var(--color-gray-100);
  outline: 1px solid var(--color-gray-200);
  outline-offset: -1px;
  font-weight: 400;
  cursor: default;
}

.SideNavLink:focus-visible {
  z-index: 1;
  outline: 2px solid var(--color-blue);
  outline-offset: -1px;
}

/* ─── Framework Toggle ─── */
.FrameworkToggle {
  display: flex;
  background-color: var(--color-gray-100);
  border-radius: 999px;
  padding: 0.2rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--color-gray-200);
}

.FrameworkBtn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 0.3rem 0;
  border-radius: 999px;
  color: var(--color-gray-600);
  cursor: pointer;
  transition: all 0.2s;
}

.FrameworkIcon {
  flex-shrink: 0;
  display: block;
}

.FrameworkBtn.active {
  background-color: var(--color-content);
  color: var(--color-blue);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--color-gray-200);
}

.FrameworkBtn.disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* ════════════════════════
   MAIN CONTENT
   ════════════════════════ */

.ContentLayoutMain {
  min-width: 0;
  max-width: 48rem;
  width: 100%;
  padding-top: 1.5rem;
  padding-bottom: 5rem;
  margin: 0 auto;
}

@media (min-width: 40rem) {
  .ContentLayoutMain {
    padding-top: 2rem;
  }
}

@media (min-width: 64rem) {
  .ContentLayoutMain {
    margin: 0;
    padding-bottom: 8rem;
  }
}

@media (min-width: 84rem) {
  .ContentLayoutMain {
    margin: 0;
  }
}

/* ════════════════════════
   QUICK NAV (Right sidebar)
   ════════════════════════ */

.QuickNavSidebar {
  padding: 0;
  position: relative;
  display: none;
}

@media (min-width: 84rem) {
  .QuickNavSidebar {
    display: block;
  }
}

.QuickNavRoot {
  --quick-nav-item-height: 2rem;
  --quick-nav-item-line-height: var(--text-md--line-height);
  --quick-nav-item-padding-y: calc(
    var(--quick-nav-item-height) / 2 - var(--quick-nav-item-line-height) / 2
  );
  --quick-nav-margin-x: 2rem;

  font-size: var(--text-md);
  line-height: var(--text-md--line-height);
  z-index: 1;
  position: sticky;
  top: 0;
  margin-top: 5.75rem;
}

.QuickNavInner {
  border-top: 1px solid var(--color-gray-200);
  position: relative;
  left: var(--quick-nav-margin-x);
  padding-top: 0.75rem;
  padding-bottom: 2.5rem;
  width: calc(var(--sidebar-width) - var(--quick-nav-margin-x) * 2);
}

.QuickNavTitle {
  padding-block: var(--quick-nav-item-padding-y);
  font-weight: 700;
}

.QuickNavList {
  color: var(--color-gray-600);
  display: flex;
  flex-direction: column;
  align-items: start;
}

.QuickNavItem--nested {
  padding-left: 0.75rem;
}

.QuickNavLink {
  display: flex;
  padding: var(--quick-nav-item-padding-y) 0.5rem;
  border-radius: var(--radius-md);
  color: inherit;
  transition: color 0.15s;
}

.QuickNavLink:hover {
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-thickness: 1px;
  text-decoration-color: var(--color-gray-500);
}

.QuickNavLink--active {
  color: var(--color-foreground);
}

.QuickNavLink:focus-visible {
  z-index: 1;
  outline: 2px solid var(--color-blue);
  outline-offset: -2px;
}

.QuickNavTopLink {
  color: var(--color-foreground);
  font-weight: 700;
}

/* ════════════════════════
   THEME TOGGLE
   ════════════════════════ */

.ThemeToggle {
  position: fixed;
  bottom: 1.25rem;
  right: 1.25rem;
  z-index: 100;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-gray-100);
  border: 1px solid var(--color-gray-200);
  color: var(--color-gray-600);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition:
    background-color 0.2s,
    color 0.2s,
    transform 0.15s;
}

.ThemeToggle:hover {
  background-color: var(--color-gray-200);
  color: var(--color-foreground);
  transform: scale(1.05);
}

.ThemeToggle:active {
  transform: scale(0.95);
}
</style>
