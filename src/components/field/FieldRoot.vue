<script setup lang="ts">
import { provide, ref, computed, useId } from 'vue';
import { FIELD_CONTEXT_KEY, type FieldContext } from './useFieldContext';
import type { FieldState } from '@/utils/types';
import { stateToDataAttributes } from '@/utils/dataAttributes';

const {
  disabled = false,
  name,
  invalid,
  validationMode = 'onSubmit',
} = defineProps<{
  /** Whether the field and its controls should be disabled. */
  disabled?: boolean;
  /** Identifies the field when a form is submitted. */
  name?: string;
  /** Whether the field is invalid. Overrides internal validity. */
  invalid?: boolean;
  /** Determines when validation is triggered. */
  validationMode?: 'onSubmit' | 'onBlur' | 'onChange';
}>();

// Internal reactive state
const touched = ref(false);
const dirty = ref(false);
const filled = ref(false);
const focused = ref(false);
const valid = ref<boolean | null>(null);

const state = computed<FieldState>(() => ({
  disabled,
  touched: touched.value,
  dirty: dirty.value,
  valid: invalid === true ? false : valid.value,
  filled: filled.value,
  focused: focused.value,
}));

const dataAttrs = computed(() => stateToDataAttributes(state.value));

// Generate stable IDs for label ↔ control association
const controlId = ref(useId());
const labelId = ref(useId());

const nameRef = computed(() => name);
const validationModeRef = computed(() => validationMode);

const context: FieldContext = {
  state,
  name: nameRef,
  controlId,
  labelId,
  validationMode: validationModeRef,
  setTouched: (v: boolean) => {
    touched.value = v;
  },
  setDirty: (v: boolean) => {
    dirty.value = v;
  },
  setFilled: (v: boolean) => {
    filled.value = v;
  },
  setFocused: (v: boolean) => {
    focused.value = v;
  },
  setValid: (v: boolean | null) => {
    valid.value = v;
  },
};

provide(FIELD_CONTEXT_KEY, context);
</script>

<template>
  <div v-bind="dataAttrs">
    <slot />
  </div>
</template>
