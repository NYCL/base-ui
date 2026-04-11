# Field

<div class="description">A wrapper for form controls that provides labels, descriptions, and validation messages with correct ARIA associations.</div>

## Usage guidelines

Field is a structural component that groups a form control with its label, description, and error message. It automatically wires up `aria-labelledby`, `aria-describedby`, and `aria-invalid` so you don't have to manage `id` attributes manually.

## Anatomy

Import the component parts and compose them together:

```typescript
import { FieldRoot, FieldLabel, FieldDescription, FieldError } from '@base-ui/vue';
```

```vue
<template>
  <FieldRoot>
    <FieldLabel>Label</FieldLabel>
    <FieldDescription>Help text</FieldDescription>
    <!-- Your form control here -->
    <FieldError>Error message</FieldError>
  </FieldRoot>
</template>
```

## Validation

Field supports both native HTML validation and custom validation functions. Use the `validate` prop on `FieldRoot` to provide a custom validation function.

```vue
<script setup>
function validateEmail(value) {
  if (!value.includes('@')) {
    return 'Please enter a valid email address.';
  }
  return null;
}
</script>

<template>
  <FieldRoot name="email" :validate="validateEmail">
    <FieldLabel>Email</FieldLabel>
    <Input type="email" />
    <FieldError />
  </FieldRoot>
</template>
```

## Validation modes

The `validation-mode` prop controls when validation runs:

- `onSubmit` — validates when the form is submitted (default)
- `onChange` — validates as the user types
- `onBlur` — validates when the field loses focus

```vue-html
<FieldRoot name="username" :validate="validateUsername" validation-mode="onBlur">
  <FieldLabel>Username</FieldLabel>
  <Input />
  <FieldError />
</FieldRoot>
```

## Debounced validation

When using `onChange` mode, you can debounce the validation to avoid excessive calls:

```vue-html
<FieldRoot
  name="search"
  :validate="validateSearch"
  validation-mode="onChange"
  :validation-debounce-time="300"
>
  <FieldLabel>Search</FieldLabel>
  <Input />
  <FieldError />
</FieldRoot>
```

## API reference

### FieldRoot

| Prop                       | Type                                   | Default      | Description                                 |
| -------------------------- | -------------------------------------- | ------------ | ------------------------------------------- |
| `name`                     | `string`                               | —            | The field name for form submission          |
| `validate`                 | `(value: unknown) => string \| null`   | —            | Custom validation function                  |
| `validation-mode`          | `'onSubmit' \| 'onChange' \| 'onBlur'` | `'onSubmit'` | When validation triggers                    |
| `validation-debounce-time` | `number`                               | `0`          | Debounce time in ms for onChange validation |
| `disabled`                 | `boolean`                              | `false`      | Disables all child controls                 |

### FieldLabel

Renders a `<label>` element automatically associated with the field's control.

### FieldError

Renders an error message when the field is invalid. Automatically hidden when valid.

### FieldDescription

Renders a description that is associated with the control via `aria-describedby`.
