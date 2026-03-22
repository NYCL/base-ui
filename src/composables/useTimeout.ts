import { onScopeDispose } from 'vue';

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
  let id: ReturnType<typeof setTimeout> | null = null;

  /**
   * Schedule `fn` to run after `delay` ms.
   * Any previously scheduled call is cancelled first.
   */
  function start(delay: number, fn: () => void) {
    clear();
    id = setTimeout(() => {
      id = null;
      fn();
    }, delay);
  }

  /** Cancel any pending timer. */
  function clear() {
    if (id !== null) {
      clearTimeout(id);
      id = null;
    }
  }

  onScopeDispose(clear);

  return { start, clear };
}
