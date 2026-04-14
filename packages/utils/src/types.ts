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

/**
 * A custom validation function passed to FieldRoot.
 *
 * Return a string or array of strings with the error message(s) if the value
 * is invalid, or `null` if everything is valid.
 *
 * Async functions are supported.
 *
 * When a Form component is added later, the signature will be extended to
 * `(value: unknown, formValues: Record<string, unknown>) => ...`.
 */
export type ValidateFn = (
  value: unknown,
) => string | string[] | null | Promise<string | string[] | null>;

/**
 * Represents the state of any input component.
 * For clarity Input represent any form element that can be validated.
 */
export interface InputState extends FieldState {
  readonly?: boolean;
  required?: boolean;
}

/**
 * Represents the state of a checkbox component.
 */
export interface CheckboxState extends InputState {
  checked: boolean;
  indeterminate: boolean;
}

/**
 * Represents the state of a switch component.
 */
export interface SwitchState extends InputState {
  checked: boolean;
}

/**
 * Represents the state of a radio component.
 */
export interface RadioState extends InputState {
  checked: boolean;
}
