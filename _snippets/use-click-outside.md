---
title: 'useClickOutside React Hook: Detect Clicks Outside an Element'
heading: useClickOutside
description: React hook to detect clicks outside a component. Close dropdowns, modals, and popovers when users click outside. TypeScript, zero dependencies.
createDate: 2026-01-11
keywords:
  [
    useClickOutside,
    useClickOutside React hook,
    click outside React,
    detect click outside element,
    close dropdown on click outside,
    close modal on click outside,
    React outside click,
    useOnClickOutside,
    React ref click outside,
    click outside hook TypeScript,
    dismiss popover on click outside,
  ]
---

Detect when a user clicks outside a referenced element. The go-to pattern for closing dropdowns, modals, popovers, and
context menus.

```typescript
function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
) {
  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
```

## Usage

A dropdown that closes when you click anywhere outside of it:

```tsx
function Dropdown() {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>Menu</button>

      {isOpen && (
        <ul role="menu">
          <li role="menuitem">Profile</li>
          <li role="menuitem">Settings</li>
          <li role="menuitem">Log out</li>
        </ul>
      )}
    </div>
  );
}
```

> This hook listens on `mousedown` and `touchstart` instead of `click`. This prevents the dropdown from closing and
> immediately reopening when the toggle button is inside the ref.

## Related

- [Common React Hooks Pitfalls](/blog/react-hooks-pitfalls) - avoid common mistakes when building custom hooks like this one
