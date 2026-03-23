<script setup lang="ts">
import { computed, type Component } from 'vue';
import { useFieldContext } from './useFieldContext';

const { match, as = 'div' } = defineProps<{
  /**
   * Determines when to show the error message.
   *
   * - `true` — always show when the field is invalid (useful for external control).
   * - A `ValidityState` key (e.g. `"typeMismatch"`) — show only for that specific
   *   validity condition.
   * - Omitted / `undefined` — show whenever `valid === false`.
   */
  match?: boolean | keyof ValidityState;
  /** Element or component to render as. @default 'div' */
  as?: string | Component;
}>();

const fieldContext = useFieldContext();

const isRendered = computed(() => {
  if (!fieldContext) return false;

  const { validityData, state } = fieldContext;

  if (match === true) return true;

  if (typeof match === 'string') {
    return Boolean(validityData.value.state[match as keyof typeof validityData.value.state]);
  }

  // Default: show when invalid
  return state.value.valid === false;
});

/** The first error message, or all messages joined. */
const errorMessage = computed(() => {
  if (!fieldContext) return '';
  const { error, errors } = fieldContext.validityData.value;
  if (errors.length > 1) return errors.join(', ');
  return error;
});
</script>

<template>
  <component :is="as" v-if="isRendered" role="alert">
    <slot :error="errorMessage" :errors="fieldContext?.validityData.value.errors ?? []">
      {{ errorMessage }}
    </slot>
  </component>
</template>
