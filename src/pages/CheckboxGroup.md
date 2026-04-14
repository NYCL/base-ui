<script setup>
import { ref, computed } from 'vue';
import { CheckboxGroup, CheckboxRoot, CheckboxIndicator, CheckIcon, DashIcon } from '@base-ui/vue';

const selectedFruits = ref(['apple', 'banana']);

const allFruits = ['apple', 'banana', 'cherry', 'dragonfruit'];

const isAllSelected = computed(() => selectedFruits.value.length === allFruits.length);
const isIndeterminate = computed(
  () => selectedFruits.value.length > 0 && selectedFruits.value.length < allFruits.length,
);

function toggleAll() {
  if (isAllSelected.value) {
    selectedFruits.value = [];
  } else {
    selectedFruits.value = [...allFruits];
  }
}
</script>

# Checkbox Group

<div class="description">A container that coordinates multiple checkboxes with an array-based value. Automatically works with <a href="#/components/field">Field</a>.</div>

<section class="demo-section hero-demo">
  <div>
    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Select fruits</label>
    <CheckboxGroup v-model="selectedFruits" class="checkbox-group-container">
      <label class="checkbox-label" v-for="fruit in allFruits" :key="fruit">
        <CheckboxRoot
          :value="fruit"
          :model-value="selectedFruits.includes(fruit)"
          class="checkbox-root"
          @checked-change="(checked) => {
            if (checked) selectedFruits = [...selectedFruits, fruit];
            else selectedFruits = selectedFruits.filter(v => v !== fruit);
          }"
        >
          <CheckboxIndicator class="checkbox-indicator">
            <CheckIcon />
          </CheckboxIndicator>
        </CheckboxRoot>
        <span style="text-transform: capitalize;">{{ fruit }}</span>
      </label>
    </CheckboxGroup>
  </div>
</section>

<style>
.checkbox-group-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
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
.checkbox-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

## Parent checkbox (select all)

A parent checkbox that reflects the collective state of all child checkboxes. It shows:

- **Checked** when all children are checked
- **Indeterminate** (dash) when some children are checked
- **Unchecked** when no children are checked

<section class="demo-section">
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <label class="checkbox-label" style="font-weight: 500;">
      <CheckboxRoot
        :model-value="isAllSelected"
        :indeterminate="isIndeterminate"
        class="checkbox-root"
        @checked-change="toggleAll"
      >
        <CheckboxIndicator class="checkbox-indicator">
          <template #default="{ indeterminate }">
            <DashIcon v-if="indeterminate" />
            <CheckIcon v-else />
          </template>
        </CheckboxIndicator>
      </CheckboxRoot>
      Select all fruits
    </label>
    <div style="padding-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
      <label class="checkbox-label" v-for="fruit in allFruits" :key="fruit">
        <CheckboxRoot
          :value="fruit"
          :model-value="selectedFruits.includes(fruit)"
          class="checkbox-root"
          @checked-change="(checked) => {
            if (checked) selectedFruits = [...selectedFruits, fruit];
            else selectedFruits = selectedFruits.filter(v => v !== fruit);
          }"
        >
          <CheckboxIndicator class="checkbox-indicator">
            <CheckIcon />
          </CheckboxIndicator>
        </CheckboxRoot>
        <span style="text-transform: capitalize;">{{ fruit }}</span>
      </label>
    </div>
  </div>
</section>

## Usage guidelines

- **Use for multi-select**: Each checkbox operates independently — the group collects them into an array.
- **Parent checkbox pattern**: Use a parent checkbox with `indeterminate` to create "select all" behavior.
- **Always provide a label**: Use a `<label>` for proper accessibility.

## Anatomy

Import the component parts and compose them together:

```typescript
import { CheckboxGroup, CheckboxRoot, CheckboxIndicator, CheckIcon } from '@base-ui/vue';
```

```vue
<template>
  <CheckboxGroup v-model="selected">
    <label>
      <CheckboxRoot value="a">
        <CheckboxIndicator><CheckIcon /></CheckboxIndicator>
      </CheckboxRoot>
      Option A
    </label>
    <label>
      <CheckboxRoot value="b">
        <CheckboxIndicator><CheckIcon /></CheckboxIndicator>
      </CheckboxRoot>
      Option B
    </label>
  </CheckboxGroup>
</template>
```

## API reference

### CheckboxGroup

| Prop           | Type       | Default | Description                                   |
| -------------- | ---------- | ------- | --------------------------------------------- |
| `modelValue`   | `string[]` | —       | Controlled array of checked values (v-model)  |
| `defaultValue` | `string[]` | `[]`    | Initial checked values (uncontrolled)         |
| `disabled`     | `boolean`  | `false` | Disables all child checkboxes                 |
| `allValues`    | `string[]` | —       | All possible values (enables parent checkbox) |

### Events

| Event               | Payload    | Description                        |
| ------------------- | ---------- | ---------------------------------- |
| `update:modelValue` | `string[]` | Emitted when checked values change |
| `valueChange`       | `string[]` | Emitted when checked values change |
