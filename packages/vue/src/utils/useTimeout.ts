import { onScopeDispose } from 'vue';
import { Timeout } from '@base-ui/utils';

/**
 * A simple timer composable with automatic cleanup.
 *
 * Mirrors React Base UI's `Timeout` utility — calling `start()` clears any
 * pending timer before scheduling a new one (i.e. it debounces).
 *
 * The timer is automatically cleared when the enclosing effect scope
 * (component or composable) is disposed.
 */
export function useTimeout() {
  const timeout = new Timeout();

  onScopeDispose(timeout.clear);

  return { start: timeout.start, clear: timeout.clear };
}
