<script setup lang="ts">
import { provide, computed, useTemplateRef } from 'vue';
import { useFieldContext } from '../field/useFieldContext';
import { RADIO_GROUP_CONTEXT_KEY, type RadioGroupContext } from './useRadioGroupContext';

const {
  disabled: disabledProp = false,
  readonly: readonlyProp = false,
  required = false,
  defaultValue,
  name,
} = defineProps<{
  /** Whether the entire group is disabled. */
  disabled?: boolean;
  /** Whether the group is read-only. */
  readonly?: boolean;
  /** Whether a selection is required. */
  required?: boolean;
  /** Initial selected value (uncontrolled). */
  defaultValue?: string;
  /** The shared form field name for all radios. */
  name?: string;
}>();

const emit = defineEmits<{
  /** Fired when the selected value changes. */
  change: [value: string];
}>();

const checkedValue = defineModel<string>(/* { default: defaultValue } */);

const fieldContext = useFieldContext();

const resolvedDisabled = computed(() => fieldContext?.state.value.disabled || disabledProp);
const resolvedName = computed(() => fieldContext?.name.value ?? name);

function setCheckedValue(value: string) {
  if (resolvedDisabled.value || readonlyProp) return;

  emit('change', value);
  checkedValue.value = value;

  // Update field state
  if (fieldContext) {
    fieldContext.setTouched(true);
    fieldContext.setDirty(true);
    fieldContext.setFilled(true);
  }
}

// --- Keyboard navigation (roving tabindex) ---
const groupRef = useTemplateRef<HTMLDivElement>('group');

function handleKeydown(event: KeyboardEvent) {
  const group = groupRef.value;
  if (!group) return;

  const radios = Array.from(
    group.querySelectorAll<HTMLButtonElement>('button[role="radio"]:not(:disabled)'),
  );
  if (radios.length === 0) return;

  const currentIndex = radios.findIndex((r) => r.getAttribute('aria-checked') === 'true');
  let nextIndex = -1;

  switch (event.key) {
    case 'ArrowDown':
    case 'ArrowRight':
      event.preventDefault();
      nextIndex = currentIndex < radios.length - 1 ? currentIndex + 1 : 0;
      break;
    case 'ArrowUp':
    case 'ArrowLeft':
      event.preventDefault();
      nextIndex = currentIndex > 0 ? currentIndex - 1 : radios.length - 1;
      break;
    default:
      return;
  }

  if (nextIndex >= 0) {
    radios[nextIndex].focus();
    radios[nextIndex].click();
  }
}

// --- Focus tracking for Field ---
function handleFocusIn() {
  fieldContext?.setFocused(true);
}

function handleFocusOut(event: FocusEvent) {
  // Only fire when focus leaves the entire group
  const group = groupRef.value;
  if (group && !group.contains(event.relatedTarget as Node)) {
    fieldContext?.setFocused(false);
    fieldContext?.setTouched(true);
    if (fieldContext?.validationMode.value === 'onBlur') {
      fieldContext.validation.commit(checkedValue.value);
    }
  }
}

// --- Provide context ---
const radioGroupContext: RadioGroupContext = {
  checkedValue: computed(() => checkedValue.value),
  setCheckedValue,
  name: resolvedName,
  disabled: resolvedDisabled,
  readonly: computed(() => readonlyProp),
  required: computed(() => required),
};

provide(RADIO_GROUP_CONTEXT_KEY, radioGroupContext);

defineExpose({ el: groupRef });
</script>

<template>
  <div
    ref="group"
    role="radiogroup"
    :aria-labelledby="fieldContext?.labelId.value"
    :aria-required="required || undefined"
    :aria-disabled="resolvedDisabled || undefined"
    :aria-readonly="readonlyProp || undefined"
    v-bind="$attrs"
    @keydown="handleKeydown"
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
  >
    <slot />
  </div>
</template>
