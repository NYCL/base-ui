import type { FieldState } from './types';

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

  if (state.disabled) attrs['data-disabled'] = '';
  if (state.touched) attrs['data-touched'] = '';
  if (state.dirty) attrs['data-dirty'] = '';
  if (state.filled) attrs['data-filled'] = '';
  if (state.focused) attrs['data-focused'] = '';

  // valid/invalid are mutually exclusive; null = not yet checked
  if (state.valid === true) attrs['data-valid'] = '';
  if (state.valid === false) attrs['data-invalid'] = '';

  return attrs;
}
