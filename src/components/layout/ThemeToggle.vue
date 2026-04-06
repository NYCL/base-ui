<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SunIcon from '../icons/SunIcon.vue';
import MoonIcon from '../icons/MoonIcon.vue';
import MonitorIcon from '../icons/MonitorIcon.vue';

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
  }
}

function cycleTheme() {
  if (theme.value === 'system') theme.value = 'light';
  else if (theme.value === 'light') theme.value = 'dark';
  else theme.value = 'system';
  applyTheme();
}

onMounted(applyTheme);
</script>

<template>
  <button
    class="fixed bottom-5 right-5 z-100 w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 border border-gray-200 text-gray-600 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-200 hover:bg-gray-200 hover:text-foreground hover:scale-105 active:scale-95"
    @click="cycleTheme"
    :aria-label="'Theme: ' + theme"
    :title="'Theme: ' + theme"
  >
    <SunIcon v-if="theme === 'dark'" :size="18" />
    <MoonIcon v-else-if="theme === 'light'" :size="18" />
    <MonitorIcon v-else :size="18" />
  </button>
</template>
