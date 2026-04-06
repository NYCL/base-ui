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
  <div class="QuickNavContainer QuickNavSidebar">
    <nav class="QuickNavRoot" aria-label="On this page" v-if="tocItems.length">
      <div class="QuickNavInner">
        <header class="QuickNavTitle">
          <a href="#" @click.prevent="emit('scrollToTop')" class="QuickNavLink QuickNavTopLink">
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
