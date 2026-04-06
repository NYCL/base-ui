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

function handleCopyCode(e: MouseEvent) {
  const btn = (e.target as HTMLElement).closest('.copy-button');
  if (!btn) return;
  const pre = btn.closest('pre');
  if (!pre) return;
  
  // Get code from the code element to avoid using data-code attribute (which breaks build)
  const codeEl = pre.querySelector('code');
  const code = codeEl ? codeEl.innerText : '';
  if (!code) return;

  navigator.clipboard.writeText(code).then(() => {
    const originalText = btn.textContent;
    btn.textContent = 'Copied';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove('copied');
    }, 2000);
  });
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  document.addEventListener('click', handleCopyCode);
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleCopyCode);
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
import SearchIcon from './components/icons/SearchIcon.vue';
import GithubIcon from './components/icons/GithubIcon.vue';
import SunIcon from './components/icons/SunIcon.vue';
import MoonIcon from './components/icons/MoonIcon.vue';
import MonitorIcon from './components/icons/MonitorIcon.vue';
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
                  href="https://github.com/nycl/base-ui"
                  target="_blank"
                  rel="noopener"
                  aria-label="GitHub Repository"
                >
                  <!-- GitHub Icon (matching reference) -->
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
      <SunIcon v-if="theme === 'dark'" :size="18" />
      <!-- Moon icon (shown in light mode) -->
      <MoonIcon v-else-if="theme === 'light'" :size="18" />
      <!-- Monitor icon (system mode) -->
      <MonitorIcon v-else :size="18" />
    </button>
  </div>
</template>

<style>
@import './css/main.css';
</style>

