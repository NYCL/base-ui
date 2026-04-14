<script setup lang="ts">
import { provide, ref, computed, useId, useTemplateRef, watch, onMounted } from 'vue';
import { useFieldContext } from '../field/useFieldContext';
import { useFieldValidation } from '../field/useFieldValidation';
import { CHECKBOX_CONTEXT_KEY, type CheckboxContext } from './useCheckboxContext';
import type { FieldState, FieldValidityData } from '@base-ui/utils';
import { DEFAULT_VALIDITY_STATE, checkboxStateToDataAttributes } from '@base-ui/utils';

const {
  disabled: disabledProp = false,
  readonly: readonlyProp = false,
  required = false,
  indeterminate = false,
  defaultChecked = false,
  name,
  id,
  value,
} = defineProps<{
  /** Whether the checkbox is disabled. */
  disabled?: boolean;
  /** Whether the checkbox is read-only (focusable but not changeable). */
  readonly?: boolean;
  /** Whether the checkbox is required for form validation. */
  required?: boolean;
  /** Whether the checkbox is in a mixed (indeterminate) state. */
  indeterminate?: boolean;
  /**
   * The initial checked state for uncontrolled usage.
   * Use `v-model` for controlled usage instead.
   * @default false
   */
  defaultChecked?: boolean;
  /** The name attribute for form submission. */
  name?: string;
  /** The id attribute for the hidden input. */
  id?: string;
  /** The value submitted with the form when checked. */
  value?: string;
}>();

const emit = defineEmits<{
  /** Fired when the checked state changes. */
  change: [checked: boolean];
}>();

/** Two-way binding: `v-model` maps to checked state. */
const checked = defineModel<boolean>({ default: defaultChecked });

// --- Resolve field context (if inside a FieldRoot) ---
const fieldContext = useFieldContext();

const resolvedDisabled = computed(() => fieldContext?.state.value.disabled || disabledProp);
const resolvedReadonly = computed(() => readonlyProp);
const resolvedName = computed(() => fieldContext?.name.value ?? name);

// --- Generate stable IDs ---
const generatedId = useId();
const resolvedId = computed(() => id ?? fieldContext?.controlId.value ?? generatedId);

// --- Local state tracking (used when no FieldRoot wraps us) ---
const localTouched = ref(false);
const localDirty = ref(false);
const localFilled = ref(checked.value);
const localFocused = ref(false);
const localMarkedDirty = ref(false);
const localValidityData = ref<FieldValidityData>({
  state: { ...DEFAULT_VALIDITY_STATE },
  error: '',
  errors: [],
  value: null,
  initialValue: null,
});

const localValidation = useFieldValidation({
  validate: () => null,
  validityData: localValidityData,
  setValidityData: (data) => {
    localValidityData.value = data;
  },
  getValidationDebounceTime: () => 0,
  invalid: false,
  markedDirtyRef: localMarkedDirty,
  shouldValidateOnChange: () => false,
});

const validation = computed(() => fieldContext?.validation ?? localValidation);

// --- State helpers ---
function setTouched(val: boolean) {
  if (fieldContext) {
    fieldContext.setTouched(val);
  } else {
    localTouched.value = val;
  }
}

function setDirty(val: boolean) {
  if (fieldContext) {
    fieldContext.setDirty(val);
  } else {
    if (val) localMarkedDirty.value = true;
    localDirty.value = val;
  }
}

function setFilled(val: boolean) {
  if (fieldContext) {
    fieldContext.setFilled(val);
  } else {
    localFilled.value = val;
  }
}

function setFocused(val: boolean) {
  if (fieldContext) {
    fieldContext.setFocused(val);
  } else {
    localFocused.value = val;
  }
}

// --- Derived state ---
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

// --- Data attributes ---
const dataAttrs = computed(() =>
  checkboxStateToDataAttributes({
    ...state.value,
    readonly: resolvedReadonly.value,
    required: required,
    checked: checked.value || false,
    indeterminate: indeterminate,
  }),
);

// --- Hidden input ref ---
const hiddenInputRef = useTemplateRef<HTMLInputElement>('hiddenInput');

// Set indeterminate on hidden input (can only be set programmatically)
onMounted(() => {
  if (hiddenInputRef.value) {
    hiddenInputRef.value.indeterminate = indeterminate;
  }
});

watch(
  () => indeterminate,
  (val) => {
    if (hiddenInputRef.value) {
      hiddenInputRef.value.indeterminate = val;
    }
  },
);

// Bind validation inputRef to the hidden input
watch(
  hiddenInputRef,
  (el) => {
    if (el) {
      validation.value.inputRef.value = el;
    }
  },
  { immediate: true },
);

// Track initial value for dirtiness
const initialChecked = checked.value;

// --- Event handlers ---
function handleClick() {
  if (resolvedDisabled.value || resolvedReadonly.value) return;

  const nextChecked = !checked.value;

  emit('change', nextChecked);
  checked.value = nextChecked;

  setDirty(nextChecked !== initialChecked);
  setFilled(nextChecked);

  validation.value.commitOnChange(nextChecked);
}

function handleFocus() {
  setFocused(true);
}

function handleBlur() {
  setTouched(true);
  setFocused(false);

  const validationMode = fieldContext?.validationMode.value;
  if (validationMode === 'onBlur') {
    validation.value.commit(checked.value);
  }
}

function handleKeydown(event: KeyboardEvent) {
  // Space is handled natively by <button>, Enter is not — trigger click on Enter
  if (event.key === 'Enter') {
    event.preventDefault();
    handleClick();
  }
}

// Sync filled state when checked changes externally (controlled)
watch(checked, (val) => {
  setFilled(val);
});

// --- Provide context to Indicator ---
const checkboxContext: CheckboxContext = {
  checked: computed(() => checked.value),
  indeterminate: computed(() => indeterminate),
  disabled: computed(() => resolvedDisabled.value),
  readonly: computed(() => resolvedReadonly.value),
  required: computed(() => required),
};

provide(CHECKBOX_CONTEXT_KEY, checkboxContext);

// Expose the underlying DOM element
const buttonRef = useTemplateRef<HTMLButtonElement>('button');
defineExpose({
  /** The underlying button DOM element. */
  el: buttonRef,
});
</script>

<template>
  <button
    ref="button"
    type="button"
    role="checkbox"
    :aria-checked="indeterminate ? 'mixed' : checked"
    :aria-readonly="resolvedReadonly || undefined"
    :aria-required="required || undefined"
    :aria-labelledby="fieldContext?.labelId.value"
    :aria-invalid="state.valid === false || undefined"
    :disabled="resolvedDisabled"
    v-bind="{ ...dataAttrs, ...$attrs }"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
    @keydown="handleKeydown"
  >
    <slot />
  </button>
  <input
    ref="hiddenInput"
    type="checkbox"
    :checked="checked"
    :disabled="resolvedDisabled"
    :required="required"
    :name="resolvedName"
    :value="value"
    :id="resolvedId"
    tabindex="-1"
    aria-hidden="true"
    :style="{
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: 0,
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      borderWidth: 0,
    }"
  />
</template>
