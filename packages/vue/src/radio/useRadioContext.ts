import { type InjectionKey, inject, type Ref } from 'vue';

/**
 * The state shape shared from RadioRoot → RadioIndicator.
 */
export interface RadioContext {
  /** Whether this radio button is currently selected. */
  checked: Ref<boolean>;
  /** Whether this radio is disabled. */
  disabled: Ref<boolean>;
  /** Whether this radio is read-only. */
  readonly: Ref<boolean>;
}

/** Injection key for type-safe provide/inject. */
export const RADIO_CONTEXT_KEY: InjectionKey<RadioContext> = Symbol('RadioContext');

/**
 * Composable to consume the radio context.
 *
 * Must be used inside a `<RadioRoot>`. Throws if used outside.
 */
export function useRadioContext(): RadioContext {
  const context = inject(RADIO_CONTEXT_KEY, null);
  if (context === null) {
    throw new Error(
      'Base UI: RadioContext is missing. Radio parts must be placed within <RadioRoot>.',
    );
  }
  return context;
}
