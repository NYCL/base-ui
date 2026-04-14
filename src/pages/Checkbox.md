<script setup>
import { ref } from 'vue';
import { CheckboxRoot, CheckboxIndicator, CheckIcon, DashIcon } from '@base-ui/vue';

const checked = ref(false);
const indeterminateChecked = ref(false);
const isIndeterminate = ref(true);
</script>

# Checkbox

<div class="description">A control that allows the user to toggle between checked and not checked. Automatically works with <a href="#/components/field">Field</a>.</div>

<section class="demo-section hero-demo">
  <label class="checkbox-label">
    <CheckboxRoot
      v-model="checked"
      class="checkbox-root"
    >
      <CheckboxIndicator class="checkbox-indicator">
        <CheckIcon />
      </CheckboxIndicator>
    </CheckboxRoot>
    Accept terms and conditions
  </label>
</section>

<style>
.checkbox-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
.checkbox-root {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.25rem;
  border: 2px solid var(--color-gray-400);
  background: var(--color-content);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 150ms ease;
  padding: 0;
  color: white;
  flex-shrink: 0;
}
.checkbox-root:focus-visible {
  outline: 2px solid var(--color-blue);
  outline-offset: 2px;
}
.checkbox-root[data-checked],
.checkbox-root[data-indeterminate] {
  background: var(--color-blue);
  border-color: var(--color-blue);
}
.checkbox-root[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
.checkbox-root[data-readonly] {
  cursor: default;
}
.checkbox-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

## Indeterminate state

The `indeterminate` prop puts the checkbox in a mixed state — neither fully checked nor unchecked. This is commonly used for "select all" parent checkboxes.

<section class="demo-section">
  <label class="checkbox-label">
    <CheckboxRoot
      v-model="indeterminateChecked"
      :indeterminate="isIndeterminate"
      class="checkbox-root"
      @checked-change="isIndeterminate = false"
    >
      <CheckboxIndicator class="checkbox-indicator">
        <template #default="{ indeterminate: isIndet }">
          <DashIcon v-if="isIndet" />
          <CheckIcon v-else />
        </template>
      </CheckboxIndicator>
    </CheckboxRoot>
    Select all items
  </label>
</section>

## Usage guidelines

- **Checkboxes must have an accessible name**: Use a `<label>` element or `aria-label`.
- **Use for binary choices**: Each checkbox operates independently — for mutual exclusion, use a Radio Group.
- **Indeterminate is visual only**: The `indeterminate` prop does not affect the underlying `checked` state — it's a display hint.

## Anatomy

Import the component parts and compose them together:

```typescript
import { CheckboxRoot, CheckboxIndicator, CheckIcon } from '@base-ui/vue';
```

```vue
<template>
  <label>
    <CheckboxRoot v-model="checked">
      <CheckboxIndicator>
        <CheckIcon />
      </CheckboxIndicator>
    </CheckboxRoot>
    Label text
  </label>
</template>
```

## API reference

### CheckboxRoot

| Prop             | Type      | Default | Description                                      |
| ---------------- | --------- | ------- | ------------------------------------------------ |
| `modelValue`     | `boolean` | —       | Controlled checked state (v-model)               |
| `defaultChecked` | `boolean` | `false` | Initial checked state (uncontrolled)             |
| `indeterminate`  | `boolean` | `false` | Whether to display the mixed/indeterminate state |
| `disabled`       | `boolean` | `false` | Disables interaction                             |
| `readonly`       | `boolean` | `false` | Prevents changes but stays focusable             |
| `required`       | `boolean` | `false` | Marks as required for form validation            |
| `name`           | `string`  | —       | The name attribute for form submission           |
| `value`          | `string`  | —       | The value submitted with the form when checked   |

### Events

| Event               | Payload   | Description                        |
| ------------------- | --------- | ---------------------------------- |
| `update:modelValue` | `boolean` | Emitted when checked state changes |
| `checkedChange`     | `boolean` | Emitted when checked state changes |

### CheckboxIndicator

| Prop          | Type      | Default | Description                                             |
| ------------- | --------- | ------- | ------------------------------------------------------- |
| `keepMounted` | `boolean` | `false` | Whether to keep the element in the DOM when not checked |

#### Scoped slot

| Property        | Type      | Description                                |
| --------------- | --------- | ------------------------------------------ |
| `checked`       | `boolean` | Whether the checkbox is ticked             |
| `indeterminate` | `boolean` | Whether the checkbox is in the mixed state |

### Data attributes

| Attribute            | Description                                                                |
| -------------------- | -------------------------------------------------------------------------- |
| `data-checked`       | Present when the checkbox is checked.                                      |
| `data-unchecked`     | Present when the checkbox is not checked.                                  |
| `data-indeterminate` | Present when the checkbox is in the indeterminate state.                   |
| `data-disabled`      | Present when the checkbox is disabled.                                     |
| `data-readonly`      | Present when the checkbox is read-only.                                    |
| `data-required`      | Present when the checkbox is required.                                     |
| `data-valid`         | Present when the checkbox is in valid state (when wrapped in FieldRoot).   |
| `data-invalid`       | Present when the checkbox is in invalid state (when wrapped in FieldRoot). |
| `data-dirty`         | Present when the checkbox's value has changed (when wrapped in FieldRoot). |
| `data-touched`       | Present when the checkbox has been touched (when wrapped in FieldRoot).    |
| `data-filled`        | Present when the checkbox is checked (when wrapped in FieldRoot).          |
| `data-focused`       | Present when the checkbox is focused (when wrapped in FieldRoot).          |
