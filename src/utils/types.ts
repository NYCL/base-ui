/**
 * Represents the state of a field component.
 * All Base UI field-aware components share this state shape.
 */
export interface FieldState {
  /** Whether the component should ignore user interaction. */
  disabled: boolean;
  /** Whether the field has been touched (blurred at least once). */
  touched: boolean;
  /** Whether the field value has changed from its initial value. */
  dirty: boolean;
  /** Whether the field is valid. `null` when validity has not been checked. */
  valid: boolean | null;
  /** Whether the field has a non-empty value. */
  filled: boolean;
  /** Whether the field is currently focused. */
  focused: boolean;
}

/**
 * Mirrors the browser's native ValidityState interface,
 * plus error string(s) and the current/initial value.
 */
export interface FieldValidityData {
  state: {
    badInput: boolean;
    customError: boolean;
    patternMismatch: boolean;
    rangeOverflow: boolean;
    rangeUnderflow: boolean;
    stepMismatch: boolean;
    tooLong: boolean;
    tooShort: boolean;
    typeMismatch: boolean;
    valueMissing: boolean;
    valid: boolean | null;
  };
  error: string;
  errors: string[];
  value: unknown;
  initialValue: unknown;
}

/** The default ValidityState — everything is valid, nothing checked yet. */
export const DEFAULT_VALIDITY_STATE: FieldValidityData['state'] = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valueMissing: false,
  valid: null,
};

/** The default field state — untouched, clean, unfocused. */
export const DEFAULT_FIELD_STATE: FieldState = {
  disabled: false,
  touched: false,
  dirty: false,
  valid: null,
  filled: false,
  focused: false,
};
