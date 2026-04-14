<script setup lang="ts">
import { provide, computed, useId, useTemplateRef } from 'vue';
import { useFieldContext } from '../field/useFieldContext';
import { useRadioGroupContext } from '../radio-group/useRadioGroupContext';
import { RADIO_CONTEXT_KEY, type RadioContext } from './useRadioContext';
import type { FieldState } from '@base-ui/utils';
import { RadioDataAttributes } from '@base-ui/utils';

const {
  value,
  disabled: disabledProp = false,
  readonly: readonlyProp = false,
} = defineProps<{
  /** The unique value of this radio in the group. */
  value: string;
  /** Whether this specific radio is disabled. */
  disabled?: boolean;
  /** Whether this specific radio is read-only. */
  readonly?: boolean;
}>();

// --- Resolve contexts ---
const fieldContext = useFieldContext();
const groupContext = useRadioGroupContext();

const resolvedDisabled = computed(
  () => fieldContext?.state.value.disabled || groupContext?.disabled.value || disabledProp,
);
const resolvedReadonly = computed(() => groupContext?.readonly.value || readonlyProp);
const resolvedRequired = computed(() => groupContext?.required.value || false);

// Checked is derived from the group's selected value
const checked = computed(() => groupContext?.checkedValue.value === value);

const id = useId()!;

// --- State ---
const state = computed<FieldState>(() => {
  if (fieldContext) {
    return { ...fieldContext.state.value, disabled: resolvedDisabled.value };
  }
  return {
    disabled: resolvedDisabled.value,
    touched: false,
    dirty: false,
    valid: null,
    filled: checked.value,
    focused: false,
  };
});

// --- Data attributes ---
const dataAttrs = computed(() => {
  const attrs: Record<string, string> = {};

  if (checked.value) attrs[RadioDataAttributes.checked] = '';
  else attrs[RadioDataAttributes.unchecked] = '';

  if (resolvedDisabled.value) attrs[RadioDataAttributes.disabled] = '';
  if (resolvedReadonly.value) attrs[RadioDataAttributes.readonly] = '';
  if (resolvedRequired.value) attrs[RadioDataAttributes.required] = '';

  if (state.value.touched) attrs[RadioDataAttributes.touched] = '';
  if (state.value.dirty) attrs[RadioDataAttributes.dirty] = '';
  if (state.value.filled) attrs[RadioDataAttributes.filled] = '';
  if (state.value.focused) attrs[RadioDataAttributes.focused] = '';
  if (state.value.valid === true) attrs[RadioDataAttributes.valid] = '';
  if (state.value.valid === false) attrs[RadioDataAttributes.invalid] = '';

  return attrs;
});

// --- Hidden input ---
const hiddenInputRef = useTemplateRef<HTMLInputElement>('hiddenInput');

// --- Event handlers ---
function handleClick() {
  if (resolvedDisabled.value || resolvedReadonly.value) return;
  groupContext?.setCheckedValue(value);
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleClick();
  }
}

// --- Provide context to Indicator ---
const radioContext: RadioContext = {
  checked,
  disabled: resolvedDisabled,
  readonly: resolvedReadonly,
};

provide(RADIO_CONTEXT_KEY, radioContext);

const buttonRef = useTemplateRef<HTMLButtonElement>('button');
defineExpose({ el: buttonRef });
</script>

<template>
  <button
    ref="button"
    type="button"
    role="radio"
    :aria-checked="checked"
    :aria-readonly="resolvedReadonly || undefined"
    :aria-required="resolvedRequired || undefined"
    :aria-labelledby="fieldContext?.labelId.value"
    :disabled="resolvedDisabled"
    :tabindex="checked ? 0 : -1"
    v-bind="{ ...dataAttrs, ...$attrs }"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <slot />
  </button>
  <input
    ref="hiddenInput"
    type="radio"
    :checked="checked"
    :disabled="resolvedDisabled"
    :required="resolvedRequired"
    :name="groupContext?.name.value"
    :value="value"
    :id="id"
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
