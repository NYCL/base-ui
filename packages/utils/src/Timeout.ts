/**
 * A simple framework-agnostic timer utility.
 *
 * Calling `start()` clears any pending timer before scheduling a new one (i.e. it debounces).
 */
export class Timeout {
  id: ReturnType<typeof setTimeout> | null = null;

  /**
   * Schedule `fn` to run after `delay` ms.
   * Any previously scheduled call is cancelled first.
   */
  start = (delay: number, fn: () => void) => {
    this.clear();
    this.id = setTimeout(() => {
      this.id = null;
      fn();
    }, delay);
  };

  /** Cancel any pending timer. */
  clear = () => {
    if (this.id !== null) {
      clearTimeout(this.id);
      this.id = null;
    }
  };
}
