<script setup lang="ts">
interface TocItem {
  id: string;
  text: string;
  level: number;
}

defineProps<{
  tocItems: TocItem[];
  activeHeadingId: string;
  pageTitle: string;
}>();

const emit = defineEmits<{
  scrollToAnchor: [id: string];
  scrollToTop: [];
}>();
</script>

<template>
  <div
    class="hidden p-0 min-[84rem]:block min-[84rem]:sticky min-[84rem]:top-0 min-[84rem]:h-screen min-[84rem]:overflow-y-auto min-[84rem]:scrollbar-thin"
  >
    <nav
      class="text-[length:var(--text-md)] leading-[var(--text-md-lh)] z-1 mt-[5.75rem]"
      aria-label="On this page"
      v-if="tocItems.length"
    >
      <div
        class="border-t border-gray-200 relative left-8 pt-3 pb-10 w-[calc(var(--sidebar-width)-4rem)]"
      >
        <header class="py-[calc(1rem-var(--text-md-lh)/2)] font-bold">
          <a
            href="#"
            @click.prevent="emit('scrollToTop')"
            class="flex py-[calc(1rem-var(--text-md-lh)/2)] px-2 rounded-md text-foreground font-bold transition-colors duration-150 hover:underline hover:underline-offset-2 hover:decoration-1 hover:decoration-gray-500 focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-blue focus-visible:-outline-offset-2"
          >
            {{ pageTitle || 'Page' }}
          </a>
        </header>
        <ul class="text-gray-600 flex flex-col items-start">
          <li v-for="item in tocItems" :key="item.id" :class="{ 'pl-3': item.level === 3 }">
            <a
              :href="'#' + item.id"
              class="flex py-[calc(1rem-var(--text-md-lh)/2)] px-2 rounded-md transition-colors duration-150 hover:underline hover:underline-offset-2 hover:decoration-1 hover:decoration-gray-500 focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-blue focus-visible:-outline-offset-2"
              :class="{ 'text-foreground': activeHeadingId === item.id }"
              @click.prevent="emit('scrollToAnchor', item.id)"
            >
              {{ item.text }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
