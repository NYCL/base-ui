<script setup>
import { ref } from 'vue';
import { RadioGroup, RadioRoot, RadioIndicator } from '@base-ui/vue';

const selected = ref('blue');
</script>

# Radio

<div class="description">A single option within a <a href="#/components/radio-group">Radio Group</a>. The user can select one option at a time. Automatically works with <a href="#/components/field">Field</a>.</div>

<section class="demo-section hero-demo">
  <div>
    <label class="block mb-2 font-medium">Favorite color</label>
    <RadioGroup v-model="selected" name="color" class="radio-group">
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

## How it works

A `RadioRoot` **must** be used inside a `RadioGroup`. Its checked state is derived automatically — when the group's value matches this radio's `value` prop, it becomes selected.

```vue-html
<RadioGroup v-model="selected" name="size">
  <!-- This radio is checked when selected === 'small' -->
  <RadioRoot value="small">
    <RadioIndicator />
  </RadioRoot>

  <!-- This radio is checked when selected === 'large' -->
  <RadioRoot value="large">
    <RadioIndicator />
  </RadioRoot>
</RadioGroup>
```

Unlike a Checkbox (which manages its own `checked` boolean), a Radio **never** has a `v-model` — selection is always controlled by the parent `RadioGroup`.

## Usage guidelines

- **Always use inside a RadioGroup**: A standalone RadioRoot has no way to manage selection.
- **Each radio needs a unique `value`**: This is how the group identifies which option is selected.
- **Provide visible labels**: Wrap each radio + label in a `<label>` element for click-to-select behavior.
- **Keyboard navigation**: Arrow keys cycle through options; only the selected radio is tabbable.

## Anatomy

Import the component parts and compose them together:

```typescript
import { RadioRoot, RadioIndicator } from '@base-ui/vue';
```

```vue
<template>
  <label>
    <RadioRoot value="option-a">
      <RadioIndicator />
    </RadioRoot>
    Option A
  </label>
</template>
```

## API reference

### RadioRoot

| Prop       | Type      | Default        | Description                         |
| ---------- | --------- | -------------- | ----------------------------------- |
| `value`    | `string`  | **(required)** | Unique value identifying this radio |
| `disabled` | `boolean` | `false`        | Disables this specific radio        |
| `readonly` | `boolean` | `false`        | Prevents selection                  |

### RadioIndicator

| Prop          | Type      | Default | Description                                              |
| ------------- | --------- | ------- | -------------------------------------------------------- |
| `keepMounted` | `boolean` | `false` | Whether to keep the element in the DOM when not selected |

#### Scoped slot

| Property  | Type      | Description                    |
| --------- | --------- | ------------------------------ |
| `checked` | `boolean` | Whether this radio is selected |

### Data attributes

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
| `data-filled`    | Present when selected (when wrapped in FieldRoot).              |
| `data-focused`   | Present when focused (when wrapped in FieldRoot).               |
