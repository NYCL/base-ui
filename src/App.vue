<script setup lang="ts">
import { ref, computed } from 'vue';
import { FieldRoot, FieldLabel } from '@/components/field';
import { Input } from '@/components/input';

const controlledValue = ref('Hello, Base UI!');
const emailValue = ref('');
const textareaValue = ref('');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isEmailInvalid = computed(
  () => emailValue.value.length > 0 && !emailPattern.test(emailValue.value),
);

function setAccent(color: string) {
  document.documentElement.style.setProperty('--input-accent', color);
}
</script>

<template>
  <div class="app">
    <header>
      <h1>Vue Base UI — Input Playground</h1>
      <p class="subtitle">
        Port of <a href="https://base-ui.com" target="_blank">Base UI</a> for Vue 3.5
      </p>
    </header>

    <main>
      <!-- Color Customization -->
      <section>
        <h2>Change Accent Color</h2>
        <p class="hint">Change <code>--input-accent</code> to restyle every state at once.</p>
        <div class="color-swatches">
          <button class="swatch swatch-green" @click="setAccent('#41B883')">Vue Green</button>
          <button class="swatch swatch-blue" @click="setAccent('#3B82F6')">Blue</button>
          <button class="swatch swatch-purple" @click="setAccent('#8B5CF6')">Purple</button>
          <button class="swatch swatch-amber" @click="setAccent('#F59E0B')">Amber</button>
          <button class="swatch swatch-pink" @click="setAccent('#EC4899')">Pink</button>
        </div>
      </section>

      <!-- Controlled Input -->
      <section>
        <h2>Interactive — Controlled</h2>
        <FieldRoot name="controlled">
          <FieldLabel>Greeting</FieldLabel>
          <Input v-model="controlledValue" />
        </FieldRoot>
        <p class="state-debug">
          Value: <code>"{{ controlledValue }}"</code>
        </p>
        <button @click="controlledValue = ''">Clear</button>
        <button @click="controlledValue = 'Reset!'">Reset</button>
      </section>

      <!-- Error with email validation -->
      <section>
        <h2>Interactive — Error</h2>
        <FieldRoot name="email-field" :invalid="isEmailInvalid">
          <FieldLabel>Email</FieldLabel>
          <Input v-model="emailValue" placeholder="you@example.com" type="email" />
        </FieldRoot>
        <p class="state-debug" v-if="isEmailInvalid">⚠ Please enter a valid email address.</p>
      </section>

      <!-- Disabled -->
      <section>
        <h2>Interactive — Disabled</h2>
        <FieldRoot name="disabled-field" disabled>
          <FieldLabel>Cannot edit</FieldLabel>
          <Input model-value="I am disabled" />
        </FieldRoot>
      </section>

      <!-- Textarea -->
      <section>
        <h2>Interactive — Textarea</h2>
        <FieldRoot name="textarea-field">
          <FieldLabel>Bio</FieldLabel>
          <Input v-model="textareaValue" as="textarea" placeholder="Write your bio…" />
        </FieldRoot>
        <p class="state-debug">
          Value: <code>"{{ textareaValue }}"</code>
        </p>
      </section>
    </main>

    <footer>
      <p>Inspect elements in DevTools to see <code>data-*</code> attributes update in real time.</p>
    </footer>
  </div>
</template>

<style>
:root {
  --input-accent: #41b883;
  --input-error: #ef4444;
}

html,
body {
  margin: 0;
  padding: 0;
  background: #09090b;
}
</style>

<style scoped>
.app {
  max-width: 680px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    'Inter',
    system-ui,
    -apple-system,
    sans-serif;
  color: #e4e4e7;
}

header {
  margin-bottom: 2rem;
}

h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #fafafa;
  margin: 0 0 0.25rem;
}

.subtitle {
  font-size: 0.9rem;
  color: #a1a1aa;
}
.subtitle a {
  color: var(--input-accent);
  text-decoration: none;
}

h2 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #d4d4d8;
  margin: 0 0 0.75rem;
}

section {
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  color: #a1a1aa;
  margin-bottom: 0.5rem;
}

/* ── Default ── */
input,
textarea {
  display: block;
  width: 100%;
  padding: 0.6rem 0.75rem;
  font-size: 0.95rem;
  font-family: inherit;
  color: #fafafa;
  background: #09090b;
  border: 1px solid #3f3f46;
  border-radius: 8px;
  outline: none;
  box-sizing: border-box;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}

/* ── Hover ── */
input:hover:not(:disabled):not(:focus),
textarea:hover:not(:disabled):not(:focus) {
  border-color: #71717a;
}

/* ── Focus-visible (Tab + click on inputs) ── */
input:focus-visible,
textarea:focus-visible {
  border-color: var(--input-accent);
  box-shadow:
    0 0 0 3px color-mix(in srgb, var(--input-accent) 25%, transparent),
    0 0 12px color-mix(in srgb, var(--input-accent) 15%, transparent);
}

/* ── Disabled ── */
input:disabled,
textarea:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  border-color: #27272a;
}

/* ── Error ── */
input[data-invalid],
textarea[data-invalid] {
  border-color: var(--input-error);
}

input[data-invalid]:hover:not(:disabled):not(:focus),
textarea[data-invalid]:hover:not(:disabled):not(:focus) {
  border-color: color-mix(in srgb, var(--input-error) 80%, white);
}

input[data-invalid]:focus-visible,
textarea[data-invalid]:focus-visible {
  border-color: var(--input-error);
  box-shadow:
    0 0 0 3px color-mix(in srgb, var(--input-error) 25%, transparent),
    0 0 12px color-mix(in srgb, var(--input-error) 15%, transparent);
}

textarea {
  min-height: 80px;
  resize: vertical;
}

/* ── Swatches ── */
.hint {
  font-size: 0.8rem;
  color: #71717a;
  margin: 0 0 0.75rem;
}

.hint code {
  color: var(--input-accent);
  background: #27272a;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
}

.color-swatches {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.swatch {
  padding: 0.4rem 0.85rem;
  font-size: 0.8rem;
  font-family: inherit;
  color: #fafafa;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: opacity 0.15s;
}

.swatch:hover {
  opacity: 0.85;
}
.swatch-green {
  background: #41b883;
}
.swatch-blue {
  background: #3b82f6;
}
.swatch-purple {
  background: #8b5cf6;
}
.swatch-amber {
  background: #f59e0b;
  color: #18181b;
}
.swatch-pink {
  background: #ec4899;
}

/* ── Misc ── */
.state-debug {
  font-size: 0.8rem;
  color: #71717a;
  margin: 0.5rem 0 0;
}

.state-debug code {
  color: #a78bfa;
  background: #27272a;
  padding: 0.125rem 0.35rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

button:not(.swatch) {
  padding: 0.4rem 0.85rem;
  font-size: 0.85rem;
  font-family: inherit;
  color: #fafafa;
  background: #27272a;
  border: 1px solid #3f3f46;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  transition: background 0.15s;
}

button:not(.swatch):hover {
  background: #3f3f46;
}

footer {
  text-align: center;
  font-size: 0.8rem;
  color: #52525b;
  margin-top: 1rem;
}

footer code {
  color: var(--input-accent);
}
</style>
