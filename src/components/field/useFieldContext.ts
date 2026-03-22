import { type InjectionKey, inject, type Ref } from 'vue';
import type { FieldState } from '@/utils/types';

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
  /** State mutators — called by FieldControl to update shared state. */
  setTouched: (value: boolean) => void;
  setDirty: (value: boolean) => void;
  setFilled: (value: boolean) => void;
  setFocused: (value: boolean) => void;
  setValid: (value: boolean | null) => void;
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
