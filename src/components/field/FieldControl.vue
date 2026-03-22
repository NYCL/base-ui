<script setup lang="ts">
import { computed, ref, useId, useTemplateRef, type Component, watch } from 'vue';
import { useFieldContext } from './useFieldContext';
import type { FieldState } from '@/utils/types';
import { stateToDataAttributes } from '@/utils/dataAttributes';

const {
  disabled = false,
  as = 'input',
  name,
  id,
  placeholder,
  type = 'text',
  autoFocus = false,
} = defineProps<{
  /** Whether the control is disabled. */
  disabled?: boolean;
  /** Element or component to render as. @default 'input' */
  as?: string | Component;
  /** The name attribute for the control. */
  name?: string;
  /** The id attribute for the control. */
  id?: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Input type (text, email, password, etc.). @default 'text' */
  type?: string;
  /** Whether to auto-focus on mount. @default false */
  autoFocus?: boolean;
}>();

const emit = defineEmits<{
  /** Fired when the value changes with additional details. */
  valueChange: [value: string];
}>();

const modelValue = defineModel<string>({ default: '' });

const fieldContext = useFieldContext();

// Use the field context's control ID if available, otherwise generate our own
const generatedId = useId()!;
const resolvedId = computed(() => id ?? fieldContext?.controlId.value ?? generatedId);
const resolvedName = computed(() => fieldContext?.name.value ?? name);
const resolvedDisabled = computed(() => fieldContext?.state.value.disabled || disabled);

// --- Local state tracking (used when no FieldRoot wraps us) ---
const localTouched = ref(false);
const localDirty = ref(false);
const localFilled = ref(modelValue.value !== '');
const localFocused = ref(false);

const state = computed<FieldState>(() => {
  if (fieldContext) {
    return {
      ...fieldContext.state.value,
      disabled: resolvedDisabled.value,
    };
  }
  return {
    disabled: resolvedDisabled.value,
    touched: localTouched.value,
    dirty: localDirty.value,
    valid: null,
    filled: localFilled.value,
    focused: localFocused.value,
  };
});

const dataAttrs = computed(() => stateToDataAttributes(state.value));

const controlRef = useTemplateRef<HTMLElement>('control');

// Track initial value to determine dirtiness
const initialValue = modelValue.value;

// --- State mutation helpers ---
function setTouched(value: boolean) {
  if (fieldContext) {
    fieldContext.setTouched(value);
  } else {
    localTouched.value = value;
  }
}

function setDirty(value: boolean) {
  if (fieldContext) {
    fieldContext.setDirty(value);
  } else {
    localDirty.value = value;
  }
}

function setFilled(value: boolean) {
  if (fieldContext) {
    fieldContext.setFilled(value);
  } else {
    localFilled.value = value;
  }
}

function setFocused(value: boolean) {
  if (fieldContext) {
    fieldContext.setFocused(value);
  } else {
    localFocused.value = value;
  }
}

// --- Event handlers ---
function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const newValue = target.value;

  modelValue.value = newValue;
  emit('valueChange', newValue);

  setDirty(newValue !== initialValue);
  setFilled(newValue !== '');
}

function onFocus() {
  setFocused(true);
}

function onBlur() {
  setTouched(true);
  setFocused(false);

  if (fieldContext?.validationMode.value === 'onBlur') {
    // Validation hook point — will be expanded later
  }
}

function onKeydown(event: KeyboardEvent) {
  const target = event.target as HTMLElement;
  if (target.tagName === 'INPUT' && event.key === 'Enter') {
    setTouched(true);
  }
}

// Sync initial filled state
watch(
  () => modelValue.value,
  (val) => {
    setFilled(val !== '');
  },
  { immediate: true },
);

// Expose the underlying DOM element for parent template refs
defineExpose({
  /** The underlying DOM element. */
  el: controlRef,
});
</script>

<template>
  <component
    :is="as"
    ref="control"
    :id="resolvedId"
    :name="resolvedName"
    :disabled="resolvedDisabled"
    :placeholder="placeholder"
    :type="as === 'input' ? type : undefined"
    :value="modelValue"
    :aria-labelledby="fieldContext?.labelId.value"
    :autofocus="autoFocus || undefined"
    v-bind="dataAttrs"
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
    @keydown="onKeydown"
  />
</template>
