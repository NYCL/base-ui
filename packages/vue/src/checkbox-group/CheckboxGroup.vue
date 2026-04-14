<script setup lang="ts">
import { provide, ref, computed, useTemplateRef } from 'vue';
import { useFieldContext } from '../field/useFieldContext';
import { CHECKBOX_GROUP_CONTEXT_KEY, type CheckboxGroupContext } from './useCheckboxGroupContext';

const {
  disabled: disabledProp = false,
  defaultValue = [],
  allValues,
} = defineProps<{
  /** Whether the entire group is disabled. */
  disabled?: boolean;
  /** Initial checked values (uncontrolled). @default [] */
  defaultValue?: string[];
  /**
   * All possible values in the group.
   * Required when using a parent checkbox for "select all" behavior.
   */
  allValues?: string[];
}>();

const emit = defineEmits<{
  /** Fired when the checked values change. */
  change: [value: string[]];
}>();

const modelValue = defineModel<string[]>();

const fieldContext = useFieldContext();

const resolvedDisabled = computed(() => fieldContext?.state.value.disabled || disabledProp);

// --- Internal value state ---
const internalValue = ref<string[]>([...defaultValue]);

const checkedValues = computed({
  get: () => modelValue.value ?? internalValue.value,
  set: (val: string[]) => {
    if (modelValue.value !== undefined) {
      modelValue.value = val;
    } else {
      internalValue.value = val;
    }
  },
});

function setValue(newValue: string[]) {
  emit('change', newValue);
  checkedValues.value = newValue;

  if (fieldContext) {
    fieldContext.setDirty(true);
    fieldContext.setFilled(newValue.length > 0);
  }
}

function toggleValue(itemValue: string) {
  if (resolvedDisabled.value) return;

  const current = checkedValues.value;
  const next = current.includes(itemValue)
    ? current.filter((v) => v !== itemValue)
    : [...current, itemValue];

  setValue(next);
}

// --- Focus tracking for Field ---
const groupRef = useTemplateRef<HTMLDivElement>('group');

function handleFocusIn() {
  fieldContext?.setFocused(true);
}

function handleFocusOut(event: FocusEvent) {
  const group = groupRef.value;
  if (group && !group.contains(event.relatedTarget as Node)) {
    fieldContext?.setFocused(false);
    fieldContext?.setTouched(true);
  }
}

// --- Provide context ---
const checkboxGroupContext: CheckboxGroupContext = {
  value: computed(() => checkedValues.value),
  setValue,
  toggleValue,
  disabled: resolvedDisabled,
  allValues: computed(() => allValues),
};

provide(CHECKBOX_GROUP_CONTEXT_KEY, checkboxGroupContext);

defineExpose({ el: groupRef });
</script>

<template>
  <div
    ref="group"
    role="group"
    :aria-labelledby="fieldContext?.labelId.value"
    :aria-disabled="resolvedDisabled || undefined"
    v-bind="$attrs"
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
  >
    <slot />
  </div>
</template>
