import { useEffect, useRef, useCallback } from 'react';
import { Timeout } from '../Timeout';

/**
 * A simple timer hook with automatic cleanup for React.
 *
 * Calling `start()` clears any pending timer before scheduling a new one.
 * The timer is automatically cleared when the component unmounts.
 */
export function useTimeout() {
  const timeoutRef = useRef(new Timeout());
  const { start, clear } = timeoutRef.current;

  // Cleanup on unmount
  useEffect(() => {
    return clear;
  }, [clear]);

  return {
    start: useCallback(start, [start]),
    clear: useCallback(clear, [clear]),
  };
}
