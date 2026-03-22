import { ref, type Ref, type ShallowRef } from 'vue';
import { useTimeout } from '@/composables/useTimeout';
import { type FieldValidityData, type ValidateFn, DEFAULT_VALIDITY_STATE } from '@/utils/types';

const validityKeys = Object.keys(DEFAULT_VALIDITY_STATE) as Array<keyof ValidityState>;

/**
 * Reads the native ValidityState from a DOM element and returns
 * a plain object snapshot of the flags.
 */
function readNativeValidity(
  element: HTMLInputElement,
  markedDirty: boolean,
): Record<keyof ValidityState, boolean> {
  const state = validityKeys.reduce(
    (acc, key) => {
      acc[key] = element.validity[key];
      return acc;
    },
    {} as Record<keyof ValidityState, boolean>,
  );

  // Only surface `valueMissing` as invalid if the user has already
  // made changes — avoids showing "required" before the user types.
  let hasOnlyValueMissing = false;
  for (const key of validityKeys) {
    if (key === 'valid') continue;
    if (key === 'valueMissing' && state[key]) {
      hasOnlyValueMissing = true;
    } else if (state[key]) {
      return state; // other errors exist, return as-is
    }
  }
  if (hasOnlyValueMissing && !markedDirty) {
    state.valid = true;
    state.valueMissing = false;
  }

  return state;
}

export interface UseFieldValidationParams {
  /** The custom validate function from the consumer. */
  validate: ValidateFn;
  /** Reactive validity data, shared in the context. */
  validityData: Ref<FieldValidityData>;
  /** Setter to update validityData. */
  setValidityData: (data: FieldValidityData) => void;
  /** How long to debounce onChange validation (ms). Must be a getter for reactivity. */
  getValidationDebounceTime: () => number;
  /** Whether `invalid` was forced externally as a prop. */
  invalid: boolean;
  /** Whether the user has marked the field dirty. */
  markedDirtyRef: Ref<boolean>;
  /** Whether we should validate on change right now. */
  shouldValidateOnChange: () => boolean;
}

export interface UseFieldValidationReturn {
  /** Ref to bind to the actual DOM input element. */
  inputRef: ShallowRef<HTMLInputElement | null>;
  /**
   * Run validation for `value`.
   * @param value   The current control value.
   * @param revalidate  If true, only re-validates when already invalid
   *                    (used for onChange in non-onChange modes).
   */
  commit: (value: unknown, revalidate?: boolean) => Promise<void>;
  /**
   * Schedule or immediately run validation respecting debounce.
   * Call this from the control's `onInput` handler.
   */
  commitOnChange: (value: unknown) => void;
}

export function useFieldValidation(params: UseFieldValidationParams): UseFieldValidationReturn {
  const {
    validate,
    validityData,
    setValidityData,
    getValidationDebounceTime,
    invalid: _invalid,
    markedDirtyRef,
    shouldValidateOnChange,
  } = params;

  const inputRef = ref<HTMLInputElement | null>(null) as ShallowRef<HTMLInputElement | null>;
  const timeout = useTimeout();

  /**
   * Core validation runner.
   */
  async function commit(value: unknown, revalidate = false): Promise<void> {
    const element = inputRef.value;
    if (!element) return;

    // --- Lightweight re-validation (onChange outside of onChange mode) ---
    if (revalidate) {
      // Only re-validate when already invalid — clears errors in real-time
      if (validityData.value.state.valid !== false) return;

      // If valueMissing resolved, mark valid early
      if (!element.validity.valueMissing) {
        const nextData: FieldValidityData = {
          value,
          state: { ...DEFAULT_VALIDITY_STATE, valid: true },
          error: '',
          errors: [],
          initialValue: validityData.value.initialValue,
        };
        element.setCustomValidity('');
        setValidityData(nextData);
        return;
      }

      // If native invalidity is something other than valueMissing, skip
      const nativeState = readNativeValidity(element, true);
      if (!nativeState.valid) {
        let onlyValueMissing = false;
        for (const key of validityKeys) {
          if (key === 'valid') continue;
          if (key === 'valueMissing' && nativeState[key]) {
            onlyValueMissing = true;
          } else if (nativeState[key]) {
            onlyValueMissing = false;
            break;
          }
        }
        if (!onlyValueMissing) return;
      }
      // Fall through to full validation
    }

    // --- Full validation ---
    timeout.clear();

    const nextState = readNativeValidity(element, markedDirtyRef.value);

    let result: string | string[] | null = null;
    let validationErrors: string[] = [];
    let defaultValidationMessage: string | undefined;

    const validateOnChange = shouldValidateOnChange();

    if (element.validationMessage && !validateOnChange) {
      // Not validating on change — if native validity already has a message,
      // use it and skip calling the custom validate fn.
      defaultValidationMessage = element.validationMessage;
      validationErrors = [element.validationMessage];
    } else {
      // Call custom validate function
      const resultOrPromise = validate(value);
      if (
        typeof resultOrPromise === 'object' &&
        resultOrPromise !== null &&
        'then' in resultOrPromise
      ) {
        result = await resultOrPromise;
      } else {
        result = resultOrPromise;
      }

      if (result !== null) {
        nextState.valid = false;
        nextState.customError = true;

        if (Array.isArray(result)) {
          validationErrors = result;
          element.setCustomValidity(result.join('\n'));
        } else {
          validationErrors = [result];
          element.setCustomValidity(result);
        }
      } else if (validateOnChange) {
        // Custom validate returned no errors — clear custom validity
        element.setCustomValidity('');
        nextState.customError = false;

        if (element.validationMessage) {
          defaultValidationMessage = element.validationMessage;
          validationErrors = [element.validationMessage];
        } else if (element.validity.valid && !nextState.valid) {
          nextState.valid = true;
        }
      }
    }

    const nextValidityData: FieldValidityData = {
      value,
      state: nextState,
      error:
        defaultValidationMessage ?? (Array.isArray(result) ? (result[0] ?? '') : (result ?? '')),
      errors: validationErrors,
      initialValue: validityData.value.initialValue,
    };

    setValidityData(nextValidityData);
  }

  /**
   * Called from the control's onInput handler.
   * Handles debouncing for onChange mode and lightweight re-validation otherwise.
   */
  function commitOnChange(value: unknown): void {
    if (!shouldValidateOnChange()) {
      // Not in onChange mode — do lightweight re-validation only
      commit(value, true);
      return;
    }

    // onChange mode — run full validation with optional debounce
    if (String(value) === '') {
      // Empty values validate immediately (no debounce)
      commit(value);
      return;
    }

    timeout.clear();

    const debounce = getValidationDebounceTime();
    if (debounce) {
      timeout.start(debounce, () => {
        commit(value);
      });
    } else {
      commit(value);
    }
  }

  return {
    inputRef,
    commit,
    commitOnChange,
  };
}
