<script setup lang="ts">
import { computed } from 'vue';
import { useRadioContext } from './useRadioContext';

const { keepMounted = false } = defineProps<{
  /**
   * Whether to keep the element in the DOM when the radio is not selected.
   * @default false
   */
  keepMounted?: boolean;
}>();

const context = useRadioContext();

const shouldRender = computed(() => context.checked.value);
</script>

<template>
  <span v-if="keepMounted || shouldRender" v-bind="$attrs">
    <slot :checked="context.checked.value" />
  </span>
</template>
