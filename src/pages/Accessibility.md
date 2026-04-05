# Accessibility

<div class="description">How Base UI Vue components implement accessibility best practices.</div>

## Overview

Base UI Vue components follow the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) to ensure that all users, including those who rely on assistive technologies, can interact with your application.

Every component ships with the correct ARIA roles, states, and properties, as well as keyboard interaction patterns.

## Keyboard navigation

All interactive components support full keyboard navigation out of the box:

- **Tab** moves focus between interactive elements
- **Enter** and **Space** activate buttons, links, and other controls
- **Escape** closes overlays like dialogs and popovers
- **Arrow keys** navigate within composite widgets

## Focus management

Components automatically manage focus in common patterns:

- When a dialog opens, focus moves to the first focusable element
- When a dialog closes, focus returns to the trigger element
- Focus is trapped within modal overlays
- Focus indicators are always visible when using keyboard navigation

## Screen readers

All components include appropriate ARIA attributes:

- `role` attributes identify the type of widget
- `aria-label` and `aria-labelledby` provide accessible names
- `aria-describedby` links descriptions to controls
- `aria-expanded`, `aria-selected`, and `aria-checked` communicate state
- Live regions announce dynamic content changes

## Form accessibility

The [Field](/components/field) component automatically associates labels, descriptions, and error messages with form controls using `aria-labelledby`, `aria-describedby`, and `aria-invalid`.

```vue
<FieldRoot>
  <FieldLabel>Email</FieldLabel>
  <Input type="email" />
  <FieldError>Please enter a valid email.</FieldError>
</FieldRoot>
```

This renders the proper ARIA associations without manual `id` wiring.

## Color contrast

While Base UI is unstyled, we recommend following [WCAG 2.1 Level AA](https://www.w3.org/TR/WCAG21/) guidelines, which require:

- **4.5:1** contrast ratio for normal text
- **3:1** contrast ratio for large text and UI components
- **3:1** contrast ratio for focus indicators

## Testing

We test accessibility using:

- Automated tools (axe-core)
- Manual keyboard testing
- Screen reader testing with NVDA, VoiceOver, and JAWS
