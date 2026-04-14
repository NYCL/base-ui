<script setup>
import { ref } from 'vue';
import { RadioGroup, RadioRoot, RadioIndicator } from '@base-ui/vue';

const selectedColor = ref('blue');
const selectedPlan = ref('pro');
</script>

# Radio Group

<div class="description">A set of mutually exclusive options where only one can be selected at a time. Automatically works with <a href="#/components/field">Field</a>.</div>

<section class="demo-section hero-demo">
  <div>
    <label class="block mb-2 font-medium">Favorite color</label>
    <RadioGroup v-model="selectedColor" name="color" class="radio-group">
      <label class="radio-label" v-for="color in ['red', 'blue', 'green']" :key="color">
        <RadioRoot :value="color" class="radio-root">
          <RadioIndicator class="radio-indicator" />
        </RadioRoot>
        <span class="capitalize">{{ color }}</span>
      </label>
    </RadioGroup>
  </div>
</section>

<style>
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.radio-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
.radio-root {
  box-sizing: border-box;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  border: 2px solid var(--color-gray-400);
  background: var(--color-content);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 150ms ease;
  padding: 0;
  flex-shrink: 0;
}
.radio-root:focus-visible {
  outline: 2px solid var(--color-blue);
  outline-offset: 2px;
}
.radio-root[data-checked] {
  border-color: var(--color-blue);
}
.radio-root[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
.radio-indicator {
  display: block;
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 9999px;
  background: var(--color-blue);
}
</style>

## Card-style radios

Radio buttons can be composed into any visual layout — here's a card-based selection pattern:

<section class="demo-section">
  <div class="w-full max-w-lg">
    <label class="block mb-3 font-medium">Select a plan</label>
    <RadioGroup v-model="selectedPlan" name="plan" class="flex gap-3 w-full">
      <label
        v-for="plan in [
          { id: 'basic', name: 'Basic', price: '$9/mo' },
          { id: 'pro', name: 'Pro', price: '$29/mo' },
          { id: 'team', name: 'Team', price: '$79/mo' },
        ]"
        :key="plan.id"
        class="radio-card"
        :data-selected="selectedPlan === plan.id || undefined"
      >
        <div class="flex justify-between items-start gap-2 mb-2">
          <strong class="whitespace-nowrap">{{ plan.name }}</strong>
          <RadioRoot :value="plan.id" class="radio-root">
            <RadioIndicator class="radio-indicator" />
          </RadioRoot>
        </div>
        <div class="text-gray-500 text-sm whitespace-nowrap">{{ plan.price }}</div>
      </label>
    </RadioGroup>
  </div>
</section>

<style>
.radio-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 2px solid var(--color-gray-200);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 150ms ease;
  min-width: 0;
}
.radio-card:hover {
  border-color: var(--color-gray-300);
}
.radio-card[data-selected] {
  border-color: var(--color-blue);
  background: color-mix(in srgb, var(--color-blue) 5%, transparent);
}
</style>

## Usage guidelines

- **Use for mutually exclusive choices**: Only one option can be selected at a time.
- **Use checkboxes** when multiple options can be selected.
- **Always provide a label**: Use a `<label>` for the group heading and visible text for each option.
- **Keyboard navigation**: Arrow keys move between options; the selected radio receives focus.

## Anatomy

Import the component parts and compose them together:

```typescript
import { RadioGroup, RadioRoot, RadioIndicator } from '@base-ui/vue';
```

```vue
<template>
  <RadioGroup v-model="selected" name="options">
    <label>
      <RadioRoot value="a">
        <RadioIndicator />
      </RadioRoot>
      Option A
    </label>
    <label>
      <RadioRoot value="b">
        <RadioIndicator />
      </RadioRoot>
      Option B
    </label>
  </RadioGroup>
</template>
```

## API reference

### RadioGroup

| Prop           | Type      | Default | Description                           |
| -------------- | --------- | ------- | ------------------------------------- |
| `modelValue`   | `string`  | —       | Controlled selected value (v-model)   |
| `defaultValue` | `string`  | —       | Initial selected value (uncontrolled) |
| `name`         | `string`  | —       | Shared form field name for all radios |
| `disabled`     | `boolean` | `false` | Disables all radios                   |
| `readonly`     | `boolean` | `false` | Prevents selection changes            |
| `required`     | `boolean` | `false` | At least one option must be selected  |

### RadioRoot

| Prop       | Type      | Default        | Description                  |
| ---------- | --------- | -------------- | ---------------------------- |
| `value`    | `string`  | **(required)** | Unique value in the group    |
| `disabled` | `boolean` | `false`        | Disables this specific radio |
| `readonly` | `boolean` | `false`        | Prevents selection           |

### RadioIndicator

| Prop          | Type      | Default | Description                                              |
| ------------- | --------- | ------- | -------------------------------------------------------- |
| `keepMounted` | `boolean` | `false` | Whether to keep the element in the DOM when not selected |

### Events

| Event               | Payload  | Description                        |
| ------------------- | -------- | ---------------------------------- |
| `update:modelValue` | `string` | Emitted when the selection changes |
| `valueChange`       | `string` | Emitted when the selection changes |

### Data attributes (on RadioRoot)

| Attribute        | Description                                                     |
| ---------------- | --------------------------------------------------------------- |
| `data-checked`   | Present when the radio is selected.                             |
| `data-unchecked` | Present when the radio is not selected.                         |
| `data-disabled`  | Present when the radio is disabled.                             |
| `data-readonly`  | Present when the radio is read-only.                            |
| `data-required`  | Present when the radio is required.                             |
| `data-valid`     | Present when in valid state (when wrapped in FieldRoot).        |
| `data-invalid`   | Present when in invalid state (when wrapped in FieldRoot).      |
| `data-dirty`     | Present when the value has changed (when wrapped in FieldRoot). |
| `data-touched`   | Present when it has been touched (when wrapped in FieldRoot).   |
| `data-filled`    | Present when a value is selected (when wrapped in FieldRoot).   |
| `data-focused`   | Present when focused (when wrapped in FieldRoot).               |
