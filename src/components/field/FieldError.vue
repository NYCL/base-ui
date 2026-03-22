<script setup lang="ts">
import { computed } from 'vue';
import { useFieldContext } from './useFieldContext';

const fieldContext = useFieldContext();

const isInvalid = computed(() => fieldContext?.state.value.valid === false);
</script>

<template>
  <div v-if="isInvalid" role="alert">
    <slot />
  </div>
</template>
