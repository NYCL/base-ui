<script setup>
import { ref } from 'vue';
import { FieldRoot, FieldLabel, FieldError, Input } from '@base-ui/vue';

const controlledValue = ref('Hello, Base UI!');
const debounceTime = ref(400);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateEmail(value) {
  const v = String(value);
  if (v.length > 0 && !emailPattern.test(v)) return '⚠ Please enter a valid email address.';
  return null;
}
</script>

# Input

<div class="description">A native input element that integrates with <a href="#/components/field">Field</a> for labels, validation, and accessibility.</div>

<section class="demo-section hero-demo">
  <FieldRoot name="hero-demo">
    <FieldLabel>Name</FieldLabel>
    <Input v-model="controlledValue" placeholder="Enter your name" />
  </FieldRoot>
</section>

## Usage guidelines

The Input component is a thin wrapper around the native `<input>` element. When placed inside a `FieldRoot`, it automatically receives:

- An accessible label via `aria-labelledby`
- Error association via `aria-describedby`
- Invalid state via `aria-invalid` and `data-invalid`
- Disabled state propagation

Form controls must have an accessible name: use a `<label>` element or the `FieldLabel` component within a `FieldRoot`.

## Anatomy

Import the component and use it as a single part:

```typescript
import { Input } from '@base-ui/vue';
```

```vue
<template>
  <Input placeholder="Type here..." />
</template>
```

When used with Field:

```vue
<script setup>
import { FieldRoot, FieldLabel, FieldError, Input } from '@base-ui/vue';
</script>

<template>
  <FieldRoot name="email">
    <FieldLabel>Email</FieldLabel>
    <Input type="email" placeholder="you@example.com" />
    <FieldError />
  </FieldRoot>
</template>
```

## Controlled value

Use `v-model` to create a controlled input:

```vue
<script setup>
import { ref } from 'vue';
import { Input } from '@base-ui/vue';

const name = ref('');
</script>

<template>
  <Input v-model="name" />
  <p>Current value: {{ name }}</p>
</template>
```

## Validation

A demonstration of live validation with the Field component:

<section class="demo-section">
  <FieldRoot name="email-field-onchange" :validate="validateEmail" validation-mode="onChange" :validation-debounce-time="debounceTime">
    <FieldLabel>Email (live validation)</FieldLabel>
    <Input placeholder="you@example.com" type="email" />
    <FieldError class="field-error" />
  </FieldRoot>
</section>

## Disabled state

When the parent `FieldRoot` is disabled, the Input automatically becomes disabled:

<section class="demo-section">
  <FieldRoot name="disabled-field" disabled>
    <FieldLabel>Disabled Input</FieldLabel>
    <Input model-value="I am disabled" />
  </FieldRoot>
</section>

## API reference

### Input

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | — | The controlled value of the input |
| `placeholder` | `string` | — | Placeholder text |
| `type` | `string` | `'text'` | The input type |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `required` | `boolean` | `false` | Whether the input is required |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted when the value changes |
