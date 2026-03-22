<script setup lang="ts">
import { computed } from 'vue';
import { useFieldContext } from './useFieldContext';

const fieldContext = useFieldContext();

const htmlFor = computed(() => fieldContext?.controlId.value);
const labelId = computed(() => fieldContext?.labelId.value);
</script>

<template>
  <label :id="labelId" :for="htmlFor">
    <slot />
  </label>
</template>
