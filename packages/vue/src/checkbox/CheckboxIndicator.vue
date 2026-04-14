<script setup lang="ts">
import { computed } from 'vue';
import { useCheckboxContext } from './useCheckboxContext';

const { keepMounted = false } = defineProps<{
  /**
   * Whether to keep the element in the DOM when the checkbox is not checked.
   * Useful for CSS animations on exit.
   * @default false
   */
  keepMounted?: boolean;
}>();

const context = useCheckboxContext();

/** Indicator is visible when checked or indeterminate. */
const shouldRender = computed(() => context.checked.value || context.indeterminate.value);
</script>

<template>
  <span v-if="keepMounted || shouldRender" v-bind="$attrs">
    <slot :checked="context.checked.value" :indeterminate="context.indeterminate.value" />
  </span>
</template>
