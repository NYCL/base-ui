<script setup>
import { ref } from 'vue';
import { SwitchRoot, SwitchThumb } from '@base-ui/vue';

const notifications = ref(true);
const darkMode = ref(false);
const autoSave = ref(false);
</script>

# Switch

<div class="description">A toggle that allows the user to turn an option on or off. Automatically works with <a href="#/components/field">Field</a>.</div>

<section class="demo-section hero-demo">
  <label class="switch-label">
    <SwitchRoot
      v-model="notifications"
      class="switch-root"
    >
      <SwitchThumb class="switch-thumb" />
    </SwitchRoot>
    Enable notifications
  </label>
</section>

<style>
.switch-label {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}
.switch-root {
  width: 2.75rem;
  height: 1.5rem;
  border-radius: 9999px;
  border: none;
  background: var(--color-gray-300);
  display: inline-flex;
  align-items: center;
  padding: 0.125rem;
  cursor: pointer;
  transition: background 150ms ease;
  flex-shrink: 0;
  position: relative;
}
.switch-root:focus-visible {
  outline: 2px solid var(--color-blue);
  outline-offset: 2px;
}
.switch-root[data-checked] {
  background: var(--color-blue);
}
.switch-root[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
.switch-root[data-readonly] {
  cursor: default;
}
.switch-thumb {
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  transition: transform 150ms ease;
}
.switch-root[data-checked] .switch-thumb {
  transform: translateX(1.25rem);
}
</style>

## Multiple switches

Switches work independently — each one manages its own on/off state.

<section class="demo-section">
  <div class="flex flex-col gap-4">
    <label class="switch-label">
      <SwitchRoot v-model="darkMode" class="switch-root">
        <SwitchThumb class="switch-thumb" />
      </SwitchRoot>
      Dark mode
    </label>
    <label class="switch-label">
      <SwitchRoot v-model="autoSave" class="switch-root">
        <SwitchThumb class="switch-thumb" />
      </SwitchRoot>
      Auto-save drafts
    </label>
  </div>
</section>

## Usage guidelines

- **Use for immediate effects**: A switch should apply a setting immediately, not as part of a form submission.
- **Use a checkbox instead** when the setting is submitted as part of a form.
- **Each switch needs a label**: Use a `<label>` element or `aria-label`.

## Anatomy

Import the component parts and compose them together:

```typescript
import { SwitchRoot, SwitchThumb } from '@base-ui/vue';
```

```vue
<template>
  <label>
    <SwitchRoot v-model="checked">
      <SwitchThumb />
    </SwitchRoot>
    Label text
  </label>
</template>
```

## API reference

### SwitchRoot

| Prop             | Type      | Default | Description                               |
| ---------------- | --------- | ------- | ----------------------------------------- |
| `modelValue`     | `boolean` | —       | Controlled on/off state (v-model)         |
| `defaultChecked` | `boolean` | `false` | Initial state (uncontrolled)              |
| `disabled`       | `boolean` | `false` | Disables interaction                      |
| `readonly`       | `boolean` | `false` | Prevents changes but stays focusable      |
| `required`       | `boolean` | `false` | Required for form validation              |
| `name`           | `string`  | —       | The name attribute for form submission    |
| `value`          | `string`  | —       | The value submitted with the form when on |

### Events

| Event               | Payload   | Description                    |
| ------------------- | --------- | ------------------------------ |
| `update:modelValue` | `boolean` | Emitted when the state changes |
| `checkedChange`     | `boolean` | Emitted when the state changes |

### SwitchThumb

The sliding part of the switch. Renders a `<span>`. No props — styled entirely via the parent's `data-checked` / `data-unchecked` attributes.

### Data attributes

| Attribute        | Description                                                              |
| ---------------- | ------------------------------------------------------------------------ |
| `data-checked`   | Present when the switch is on.                                           |
| `data-unchecked` | Present when the switch is off.                                          |
| `data-disabled`  | Present when the switch is disabled.                                     |
| `data-readonly`  | Present when the switch is read-only.                                    |
| `data-required`  | Present when the switch is required.                                     |
| `data-valid`     | Present when the switch is in valid state (when wrapped in FieldRoot).   |
| `data-invalid`   | Present when the switch is in invalid state (when wrapped in FieldRoot). |
| `data-dirty`     | Present when the switch's value has changed (when wrapped in FieldRoot). |
| `data-touched`   | Present when the switch has been touched (when wrapped in FieldRoot).    |
| `data-filled`    | Present when the switch is on (when wrapped in FieldRoot).               |
| `data-focused`   | Present when the switch is focused (when wrapped in FieldRoot).          |
