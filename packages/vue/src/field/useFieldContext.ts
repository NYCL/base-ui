import { type InjectionKey, inject, type Ref } from 'vue';
import type { FieldState, FieldValidityData } from '@base-ui/utils';
import type { UseFieldValidationReturn } from './useFieldValidation';

/**
 * The shape of the field context shared from FieldRoot → child components.
 */
export interface FieldContext {
  /** Reactive field state object. */
  state: Ref<FieldState>;
  /** The field name attribute. */
  name: Ref<string | undefined>;
  /** The control element's generated id (for label `for` binding). */
  controlId: Ref<string>;
  /** The label element's id (for `aria-labelledby`). */
  labelId: Ref<string>;
  /** Validation mode. */
  validationMode: Ref<'onSubmit' | 'onBlur' | 'onChange'>;
  /** Validation debounce time (ms). */
  validationDebounceTime: Ref<number>;
  /** Rich validity data (native state + error messages). */
  validityData: Ref<FieldValidityData>;
  /** The validation engine — used by FieldControl to trigger validation. */
  validation: UseFieldValidationReturn;
  /** State mutators — called by FieldControl to update shared state. */
  setTouched: (value: boolean) => void;
  setDirty: (value: boolean) => void;
  setFilled: (value: boolean) => void;
  setFocused: (value: boolean) => void;
}

/** Injection key for type-safe provide/inject. */
export const FIELD_CONTEXT_KEY: InjectionKey<FieldContext> = Symbol('FieldContext');

/**
 * Composable to consume the field context.
 *
 * When used outside of a `<FieldRoot>`, returns `null` — allowing
 * components like `<Input>` to work standalone with local state.
 */
export function useFieldContext(): FieldContext | null {
  return inject(FIELD_CONTEXT_KEY, null);
}
