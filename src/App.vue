<script setup lang="ts">
import { ref, nextTick, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

import AppHeader from './components/layout/AppHeader.vue';
import SideNav from './components/layout/SideNav.vue';
import QuickNav from './components/layout/QuickNav.vue';
import ThemeToggle from './components/layout/ThemeToggle.vue';

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

// ─── Copy Code Handler ───
function handleCopyCode(e: MouseEvent) {
  const btn = (e.target as HTMLElement).closest('.copy-button');
  if (!btn) return;
  const pre = btn.closest('pre');
  if (!pre) return;

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

// ─── Quick Nav Actions ───
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
  <!-- Root Layout -->
  <div class="relative z-0 px-0 lg:px-12">
    <!-- Top gridline -->
    <div
      class="hidden lg:block absolute top-[var(--header-height)] left-0 right-0 h-px bg-gridline -mt-px"
    ></div>
    <!-- Bottom gridline -->
    <div
      class="hidden lg:block absolute bottom-[var(--header-height)] left-0 right-0 h-px bg-gridline -mb-px"
    ></div>

    <!-- Container -->
    <div
      class="relative flex flex-col mx-auto min-h-dvh max-w-[calc(var(--breakpoint-max-layout-width)-var(--header-height)*2)] lg:pt-[var(--header-height)] lg:pb-0"
    >
      <!-- Left vertical gridline -->
      <div class="hidden lg:block absolute top-0 bottom-0 left-0 w-px bg-gridline -ml-px"></div>
      <!-- Right vertical gridline -->
      <div class="hidden lg:block absolute top-0 bottom-0 right-0 w-px bg-gridline -mr-px"></div>

      <!-- Content wrapper -->
      <div class="flex flex-col grow bg-content">
        <!-- Content Grid -->
        <div
          class="grid items-start pt-[var(--header-height)] px-6 grid-cols-[1fr] grid-rows-[auto_1fr] sm:px-10 lg:pt-0 lg:px-0 lg:grid-cols-[var(--sidebar-width)_1fr_3rem] min-[84rem]:grid-cols-[var(--sidebar-width)_1fr_var(--sidebar-width)]"
        >
          <!-- ════ Header ════ -->
          <AppHeader />

          <!-- ════ Left Side Nav ════ -->
          <SideNav />

          <!-- ════ Main Content ════ -->
          <main
            class="min-w-0 max-w-3xl w-full pt-6 pb-20 mx-auto sm:pt-8 lg:mx-0 lg:pb-32"
            id="main-content"
          >
            <div class="markdown-body">
              <router-view />
            </div>
          </main>

          <!-- ════ Quick Nav (Right Sidebar) ════ -->
          <QuickNav
            :toc-items="tocItems"
            :active-heading-id="activeHeadingId"
            :page-title="pageTitle"
            @scroll-to-anchor="scrollToAnchor"
            @scroll-to-top="scrollToTop"
          />
        </div>
      </div>
    </div>
    <ThemeToggle />
  </div>
</template>

<style>
@import './css/main.css';
</style>
