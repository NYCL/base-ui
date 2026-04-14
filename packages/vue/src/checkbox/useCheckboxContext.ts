import { type InjectionKey, inject, type Ref } from 'vue';

/**
 * The state shape shared from CheckboxRoot → CheckboxIndicator.
 */
export interface CheckboxContext {
  /** Whether the checkbox is currently ticked. */
  checked: Ref<boolean>;
  /** Whether the checkbox is in a mixed (indeterminate) state. */
  indeterminate: Ref<boolean>;
  /** Whether the checkbox is disabled. */
  disabled: Ref<boolean>;
  /** Whether the checkbox is read-only. */
  readonly: Ref<boolean>;
  /** Whether the checkbox is required. */
  required: Ref<boolean>;
}

/** Injection key for type-safe provide/inject. */
export const CHECKBOX_CONTEXT_KEY: InjectionKey<CheckboxContext> = Symbol('CheckboxContext');

/**
 * Composable to consume the checkbox context.
 *
 * Must be used inside a `<CheckboxRoot>`. Throws if used outside.
 */
export function useCheckboxContext(): CheckboxContext {
  const context = inject(CHECKBOX_CONTEXT_KEY, null);
  if (context === null) {
    throw new Error(
      'Base UI: CheckboxContext is missing. Checkbox parts must be placed within <CheckboxRoot>.',
    );
  }
  return context;
}
