<script setup lang="ts">
interface Props {
  size?: number | string;
}
defineProps<Props>();
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size || 16"
    :height="size || 16"
    viewBox="0 0 16 16"
    fill="currentColor"
    v-bind="$attrs"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 0V16H16V0H0ZM13 3H3V13H8V5H11V13H13V3Z"
    />
  </svg>
</template>
