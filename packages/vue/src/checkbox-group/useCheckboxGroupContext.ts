import { type InjectionKey, inject, type Ref } from 'vue';

/**
 * The state shape shared from CheckboxGroup → child Checkbox components.
 */
export interface CheckboxGroupContext {
  /** The currently checked values. */
  value: Ref<string[]>;
  /** Update the checked values. */
  setValue: (value: string[]) => void;
  /** Toggle a specific value in/out of the array. */
  toggleValue: (itemValue: string) => void;
  /** Whether the entire group is disabled. */
  disabled: Ref<boolean>;
  /** All possible values (enables parent checkbox logic). */
  allValues: Ref<string[] | undefined>;
}

/** Injection key for type-safe provide/inject. */
export const CHECKBOX_GROUP_CONTEXT_KEY: InjectionKey<CheckboxGroupContext> =
  Symbol('CheckboxGroupContext');

/**
 * Composable to consume the checkbox group context.
 *
 * Returns `null` when used outside a `<CheckboxGroup>`.
 */
export function useCheckboxGroupContext(): CheckboxGroupContext | null {
  return inject(CHECKBOX_GROUP_CONTEXT_KEY, null);
}
