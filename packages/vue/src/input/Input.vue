<script setup lang="ts">
import { computed } from 'vue';
import FieldControl from '../field/FieldControl.vue';
import type { Component } from 'vue';
import { inputStateToDataAttributes, type FieldState } from '@base-ui/utils';

const {
  disabled = false,
  name,
  id,
  placeholder,
  type = 'text',
  as = 'input',
  autoFocus = false,
  defaultValue = '',
  readonly = false,
  required = false,
} = defineProps<{
  /** Whether the input is disabled. */
  disabled?: boolean;
  /** Whether the input is read-only. */
  readonly?: boolean;
  /** Whether the input is required. */
  required?: boolean;
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
  /** Default value for uncontrolled usage. */
  defaultValue?: string;
}>();

const emit = defineEmits<{
  /** Fired when the value changes. */
  change: [value: string];
}>();

const modelValue = defineModel<string>(/* { default: defaultValue } */);

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
    readonly,
    required,
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
    :state-attribute-mapper="
      (s: FieldState) => inputStateToDataAttributes({ ...s, readonly, required })
    "
    :readonly="readonly"
    :required="required"
    :aria-readonly="readonly || undefined"
    :aria-required="required || undefined"
    @value-change="onValueChange"
  />
</template>
