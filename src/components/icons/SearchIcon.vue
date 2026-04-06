<script setup lang="ts">
interface Props {
  size?: number | string;
  strokeWidth?: number | string;
}
defineProps<Props>();
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size || 24"
    :height="size || 24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth || 2"
    stroke-linecap="round"
    stroke-linejoin="round"
    v-bind="$attrs"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
</template>
