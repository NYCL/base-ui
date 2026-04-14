<script setup>
import { ref } from 'vue';
import { FieldRoot, FieldLabel, Input } from '@base-ui/vue';

const controlledValue = ref('Hello, Base UI!');
</script>

# Input

<div class="description">A native input element that automatically works with <a href="#/components/field">Field</a>.</div>

<section class="demo-section hero-demo">
  <FieldRoot name="hero-demo">
    <FieldLabel>Name</FieldLabel>
    <Input v-model="controlledValue" placeholder="Enter your name" />
  </FieldRoot>
</section>

## Usage guidelines

- **Form controls must have an accessible name**: It can be created using a `<label>` element or the `FieldLabel` component.

## Anatomy

Import the component and use it as a single part:

```typescript
import { Input } from '@base-ui/vue';
```

```vue
<template>
  <Input />
</template>
```

## API reference

### Input

| Prop          | Type      | Default  | Description                         |
| ------------- | --------- | -------- | ----------------------------------- |
| `modelValue`  | `string`  | —        | The controlled value of the `input` |
| `placeholder` | `string`  | —        | Placeholder text                    |
| `type`        | `string`  | `'text'` | The input type                      |
| `disabled`    | `boolean` | `false`  | Whether the input is disabled       |
| `required`    | `boolean` | `false`  | Whether the input is required       |

### Events

| Event               | Payload  | Description                    |
| ------------------- | -------- | ------------------------------ |
| `update:modelValue` | `string` | Emitted when the value changes |

### Data attributes

| Attribute       | Description                                                             |
| --------------- | ----------------------------------------------------------------------- |
| `data-disabled` | Present when the input is disabled.                                     |
| `data-valid`    | Present when the input is in valid state (when wrapped in FieldRoot).   |
| `data-invalid`  | Present when the input is in invalid state (when wrapped in FieldRoot). |
| `data-dirty`    | Present when the input's value has changed (when wrapped in FieldRoot). |
| `data-touched`  | Present when the input has been touched (when wrapped in FieldRoot).    |
| `data-filled`   | Present when the input is filled (when wrapped in FieldRoot).           |
| `data-focused`  | Present when the input is focused (when wrapped in FieldRoot).          |
