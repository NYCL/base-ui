<script setup lang="ts">
import { ref } from 'vue';
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

import { onMounted } from 'vue';
onMounted(applyTheme);
</script>

<template>
  <button
    class="ThemeToggle"
    @click="cycleTheme"
    :aria-label="'Theme: ' + theme"
    :title="'Theme: ' + theme"
  >
    <SunIcon v-if="theme === 'dark'" :size="18" />
    <MoonIcon v-else-if="theme === 'light'" :size="18" />
    <MonitorIcon v-else :size="18" />
  </button>
</template>
