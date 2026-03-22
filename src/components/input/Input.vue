<script setup lang="ts">
import { computed } from 'vue';
import FieldControl from '@/components/field/FieldControl.vue';
import type { Component } from 'vue';

const {
  disabled = false,
  name,
  id,
  placeholder,
  type = 'text',
  as = 'input',
  autoFocus = false,
} = defineProps<{
  /** Whether the input is disabled. */
  disabled?: boolean;
  /** The name attribute. */
  name?: string;
  /** The id attribute. */
  id?: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Input type (text, email, password, etc.). @default 'text' */
  type?: string;
  /** Element or component to render as. @default 'input' */
  as?: string | Component;
  /** Whether to auto-focus on mount. @default false */
  autoFocus?: boolean;
}>();

const emit = defineEmits<{
  /** Fired when the value changes. */
  change: [value: string];
}>();

const modelValue = defineModel<string>({ default: '' });

function onValueChange(value: string) {
  emit('change', value);
}

/**
 * Build a clean forwarded-props object, omitting keys whose value is undefined.
 * This avoids `exactOptionalPropertyTypes` errors when passing to FieldControl.
 */
const forwardedProps = computed(() => {
  const props: Record<string, unknown> = {
    disabled,
    type,
    as,
    autoFocus,
  };
  if (name !== undefined) props['name'] = name;
  if (id !== undefined) props['id'] = id;
  if (placeholder !== undefined) props['placeholder'] = placeholder;
  return props;
});
</script>

<template>
  <FieldControl
    v-model="modelValue"
    v-bind="{ ...forwardedProps, ...$attrs }"
    @value-change="onValueChange"
  />
</template>
