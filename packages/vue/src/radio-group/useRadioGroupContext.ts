import { type InjectionKey, inject, type Ref } from 'vue';

/**
 * The state shape shared from RadioGroup → child Radio components.
 */
export interface RadioGroupContext {
  /** The currently selected value. */
  checkedValue: Ref<string | undefined>;
  /** Set the selected value. */
  setCheckedValue: (value: string) => void;
  /** The shared form field name. */
  name: Ref<string | undefined>;
  /** Whether the entire group is disabled. */
  disabled: Ref<boolean>;
  /** Whether the entire group is read-only. */
  readonly: Ref<boolean>;
  /** Whether the group requires a selection. */
  required: Ref<boolean>;
}

/** Injection key for type-safe provide/inject. */
export const RADIO_GROUP_CONTEXT_KEY: InjectionKey<RadioGroupContext> = Symbol('RadioGroupContext');

/**
 * Composable to consume the radio group context.
 *
 * Returns `null` when used outside a `<RadioGroup>`.
 */
export function useRadioGroupContext(): RadioGroupContext | null {
  return inject(RADIO_GROUP_CONTEXT_KEY, null);
}
