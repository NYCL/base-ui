<script setup lang="ts">
import { useSwitchContext } from './useSwitchContext';

const context = useSwitchContext();
</script>

<template>
  <span v-bind="$attrs">
    <slot :checked="context.checked.value" />
  </span>
</template>
