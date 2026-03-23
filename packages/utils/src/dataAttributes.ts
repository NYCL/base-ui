import type { FieldState } from './types';
import { InputDataAttributes } from './InputDataAttributes';

/**
 * Maps a FieldState object to `data-*` HTML attributes.
 *
 * Only truthy boolean fields produce an attribute.
 * For `valid`, we map to either `data-valid` or `data-invalid`,
 * and skip both when `valid === null` (not yet checked).
 *
 * @example
 * stateToDataAttributes({ disabled: true, focused: false, ... })
 * // => { 'data-disabled': '' }
 */
export function stateToDataAttributes(state: FieldState): Record<string, string> {
  const attrs: Record<string, string> = {};

  if (state.disabled) attrs[InputDataAttributes.disabled] = '';
  if (state.touched) attrs[InputDataAttributes.touched] = '';
  if (state.dirty) attrs[InputDataAttributes.dirty] = '';
  if (state.filled) attrs[InputDataAttributes.filled] = '';
  if (state.focused) attrs[InputDataAttributes.focused] = '';

  // valid/invalid are mutually exclusive; null = not yet checked
  if (state.valid === true) attrs[InputDataAttributes.valid] = '';
  if (state.valid === false) attrs[InputDataAttributes.invalid] = '';

  return attrs;
}
