import type { FieldState, InputState, CheckboxState, SwitchState, RadioState } from './types';

/**
 * Data attributes applied by the Input component based on its state.
 * These mirror the React Base UI InputDataAttributes.
 */
export const InputDataAttributes = {
  /** Present when the input is disabled. */
  disabled: 'data-disabled',
  /** Present when the input is in valid state (when wrapped in Field.Root). */
  valid: 'data-valid',
  /** Present when the input is in invalid state (when wrapped in Field.Root). */
  invalid: 'data-invalid',
  /** Present when the input has been touched (when wrapped in Field.Root). */
  touched: 'data-touched',
  /** Present when the input's value has changed (when wrapped in Field.Root). */
  dirty: 'data-dirty',
  /** Present when the input is filled (when wrapped in Field.Root). */
  filled: 'data-filled',
  /** Present when the input is focused (when wrapped in Field.Root). */
  focused: 'data-focused',
  /** Present when the input is readonly. */
  readonly: 'data-readonly',
  /** Present when the input is required. */
  required: 'data-required',
} as const;

/**
 * Data attributes applied by the Checkbox component based on its state.
 * These mirror the React Base UI CheckboxRootDataAttributes.
 */
export const CheckboxDataAttributes = {
  /** Present when the checkbox is checked. */
  checked: 'data-checked',
  /** Present when the checkbox is not checked. */
  unchecked: 'data-unchecked',
  /** Present when the checkbox is in an indeterminate state. */
  indeterminate: 'data-indeterminate',
  /** Present when the checkbox is disabled. */
  disabled: 'data-disabled',
  /** Present when the checkbox is readonly. */
  readonly: 'data-readonly',
  /** Present when the checkbox is required. */
  required: 'data-required',
  /** Present when the checkbox is in valid state (when wrapped in Field.Root). */
  valid: 'data-valid',
  /** Present when the checkbox is in invalid state (when wrapped in Field.Root). */
  invalid: 'data-invalid',
  /** Present when the checkbox has been touched (when wrapped in Field.Root). */
  touched: 'data-touched',
  /** Present when the checkbox's value has changed (when wrapped in Field.Root). */
  dirty: 'data-dirty',
  /** Present when the checkbox is checked (when wrapped in Field.Root). */
  filled: 'data-filled',
  /** Present when the checkbox is focused (when wrapped in Field.Root). */
  focused: 'data-focused',
} as const;

/**
 * Data attributes applied by the Radio component based on its state.
 */
export const RadioDataAttributes = {
  /** Present when the radio is selected. */
  checked: 'data-checked',
  /** Present when the radio is not selected. */
  unchecked: 'data-unchecked',
  /** Present when the radio is disabled. */
  disabled: 'data-disabled',
  /** Present when the radio is readonly. */
  readonly: 'data-readonly',
  /** Present when the radio is required. */
  required: 'data-required',
  /** Present when the radio is in valid state (when wrapped in Field.Root). */
  valid: 'data-valid',
  /** Present when the radio is in invalid state (when wrapped in Field.Root). */
  invalid: 'data-invalid',
  /** Present when the radio has been touched (when wrapped in Field.Root). */
  touched: 'data-touched',
  /** Present when the radio's value has changed (when wrapped in Field.Root). */
  dirty: 'data-dirty',
  /** Present when a radio is selected (when wrapped in Field.Root). */
  filled: 'data-filled',
  /** Present when the radio is focused (when wrapped in Field.Root). */
  focused: 'data-focused',
} as const;

/**
 * Data attributes applied by the Switch component based on its state.
 */
export const SwitchDataAttributes = {
  /** Present when the switch is on. */
  checked: 'data-checked',
  /** Present when the switch is off. */
  unchecked: 'data-unchecked',
  /** Present when the switch is disabled. */
  disabled: 'data-disabled',
  /** Present when the switch is readonly. */
  readonly: 'data-readonly',
  /** Present when the switch is required. */
  required: 'data-required',
  /** Present when the switch is in valid state (when wrapped in Field.Root). */
  valid: 'data-valid',
  /** Present when the switch is in invalid state (when wrapped in Field.Root). */
  invalid: 'data-invalid',
  /** Present when the switch has been touched (when wrapped in Field.Root). */
  touched: 'data-touched',
  /** Present when the switch's value has changed (when wrapped in Field.Root). */
  dirty: 'data-dirty',
  /** Present when the switch is on (when wrapped in Field.Root). */
  filled: 'data-filled',
  /** Present when the switch is focused (when wrapped in Field.Root). */
  focused: 'data-focused',
} as const;

/**
 * Maps a generic FieldState object to `data-*` HTML attributes.
 */
export function fieldStateToDataAttributes(state: FieldState): Record<string, string> {
  const attrs: Record<string, string> = {};

  if (state.disabled) attrs['data-disabled'] = '';
  // Field-specific validation states
  if (state.touched) attrs['data-touched'] = '';
  if (state.dirty) attrs['data-dirty'] = '';
  if (state.filled) attrs['data-filled'] = '';
  if (state.focused) attrs['data-focused'] = '';

  // valid/invalid are mutually exclusive; null = not yet checked
  if (state.valid === true) attrs['data-valid'] = '';
  if (state.valid === false) attrs['data-invalid'] = '';

  return attrs;
}

// --- Component-specific state mappers ---

export function inputStateToDataAttributes(state: InputState): Record<string, string> {
  const attrs = fieldStateToDataAttributes(state);
  if (state.readonly) attrs[InputDataAttributes.readonly] = '';
  if (state.required) attrs[InputDataAttributes.required] = '';
  return attrs;
}

export function checkboxStateToDataAttributes(state: CheckboxState): Record<string, string> {
  const attrs = fieldStateToDataAttributes(state);

  if (state.checked) attrs[CheckboxDataAttributes.checked] = '';
  else attrs[CheckboxDataAttributes.unchecked] = '';

  if (state.indeterminate) attrs[CheckboxDataAttributes.indeterminate] = '';
  if (state.readonly) attrs[CheckboxDataAttributes.readonly] = '';
  if (state.required) attrs[CheckboxDataAttributes.required] = '';

  return attrs;
}

export function switchStateToDataAttributes(state: SwitchState): Record<string, string> {
  const attrs = fieldStateToDataAttributes(state);

  if (state.checked) attrs[SwitchDataAttributes.checked] = '';
  else attrs[SwitchDataAttributes.unchecked] = '';

  if (state.readonly) attrs[SwitchDataAttributes.readonly] = '';
  if (state.required) attrs[SwitchDataAttributes.required] = '';

  return attrs;
}

export function radioStateToDataAttributes(state: RadioState): Record<string, string> {
  const attrs = fieldStateToDataAttributes(state);

  if (state.checked) attrs[RadioDataAttributes.checked] = '';
  else attrs[RadioDataAttributes.unchecked] = '';

  if (state.readonly) attrs[RadioDataAttributes.readonly] = '';
  if (state.required) attrs[RadioDataAttributes.required] = '';

  return attrs;
}
