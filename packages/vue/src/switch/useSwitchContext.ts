import { type InjectionKey, inject, type Ref } from 'vue';

/**
 * The state shape shared from SwitchRoot → SwitchThumb.
 */
export interface SwitchContext {
  /** Whether the switch is currently on. */
  checked: Ref<boolean>;
  /** Whether the switch is disabled. */
  disabled: Ref<boolean>;
  /** Whether the switch is read-only. */
  readonly: Ref<boolean>;
  /** Whether the switch is required. */
  required: Ref<boolean>;
}

/** Injection key for type-safe provide/inject. */
export const SWITCH_CONTEXT_KEY: InjectionKey<SwitchContext> = Symbol('SwitchContext');

/**
 * Composable to consume the switch context.
 *
 * Must be used inside a `<SwitchRoot>`. Throws if used outside.
 */
export function useSwitchContext(): SwitchContext {
  const context = inject(SWITCH_CONTEXT_KEY, null);
  if (context === null) {
    throw new Error(
      'Base UI: SwitchContext is missing. Switch parts must be placed within <SwitchRoot>.',
    );
  }
  return context;
}
