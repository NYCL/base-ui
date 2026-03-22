<script setup lang="ts">
import { provide, ref, computed, useId } from 'vue';
import { FIELD_CONTEXT_KEY, type FieldContext } from './useFieldContext';
import { useFieldValidation } from './useFieldValidation';
import type { FieldState, FieldValidityData, ValidateFn } from '@/utils/types';
import { DEFAULT_VALIDITY_STATE } from '@/utils/types';
import { stateToDataAttributes } from '@/utils/dataAttributes';

const {
  disabled = false,
  name,
  invalid: invalidProp,
  validate: validateProp,
  validationMode = 'onSubmit',
  validationDebounceTime = 0,
} = defineProps<{
  /** Whether the field and its controls should be disabled. */
  disabled?: boolean;
  /** Identifies the field when a form is submitted. */
  name?: string;
  /** Whether the field is invalid. Overrides internal validity. */
  invalid?: boolean;
  /**
   * A function for custom validation.
   * Return a string or array of strings with error messages, or `null` if valid.
   * Async functions are supported.
   */
  validate?: ValidateFn;
  /**
   * Determines when validation is triggered.
   *
   * - `onSubmit`: deferred (placeholder for future Form integration).
   * - `onBlur`: validates when the control loses focus.
   * - `onChange`: validates on every change (with optional debounce).
   *
   * @default 'onSubmit'
   */
  validationMode?: 'onSubmit' | 'onBlur' | 'onChange';
  /**
   * Debounce time in ms for onChange validation.
   * @default 0
   */
  validationDebounceTime?: number;
}>();

// Internal reactive state
const touched = ref(false);
const dirty = ref(false);
const filled = ref(false);
const focused = ref(false);
const markedDirtyRef = ref(false);

const validityData = ref<FieldValidityData>({
  state: { ...DEFAULT_VALIDITY_STATE },
  error: '',
  errors: [],
  value: null,
  initialValue: null,
});

function setValidityData(data: FieldValidityData) {
  validityData.value = data;
}

// Wrap the validate prop so it's always a function
const validate: ValidateFn = validateProp ?? (() => null);

const shouldValidateOnChange = () => validationMode === 'onChange';
// Future: || (validationMode === 'onSubmit' && submitAttemptedRef.value)

const invalid = computed(() => invalidProp === true);

const validation = useFieldValidation({
  validate,
  validityData,
  setValidityData,
  getValidationDebounceTime: () => validationDebounceTime,
  invalid: invalid.value,
  markedDirtyRef,
  shouldValidateOnChange,
});

// Derive overall validity from the external `invalid` prop and internal validityData
const derivedValid = computed<boolean | null>(() => {
  if (invalid.value) return false;
  return validityData.value.state.valid;
});

const state = computed<FieldState>(() => ({
  disabled,
  touched: touched.value,
  dirty: dirty.value,
  valid: derivedValid.value,
  filled: filled.value,
  focused: focused.value,
}));

const dataAttrs = computed(() => stateToDataAttributes(state.value));

// Generate stable IDs for label ↔ control association
const controlId = ref(useId());
const labelId = ref(useId());

const nameRef = computed(() => name);
const validationModeRef = computed(() => validationMode);
const validationDebounceTimeRef = computed(() => validationDebounceTime);

const context: FieldContext = {
  state,
  name: nameRef,
  controlId,
  labelId,
  validationMode: validationModeRef,
  validationDebounceTime: validationDebounceTimeRef,
  validityData,
  validation,
  setTouched: (v: boolean) => {
    touched.value = v;
  },
  setDirty: (v: boolean) => {
    if (v) markedDirtyRef.value = true;
    dirty.value = v;
  },
  setFilled: (v: boolean) => {
    filled.value = v;
  },
  setFocused: (v: boolean) => {
    focused.value = v;
  },
};

provide(FIELD_CONTEXT_KEY, context);
</script>

<template>
  <div v-bind="dataAttrs">
    <slot />
  </div>
</template>
