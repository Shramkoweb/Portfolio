---
title: "Copy to Clipboard in JavaScript: Modern Async Clipboard API"
heading: Copy to Clipboard
description: Copy text to clipboard using the modern Async Clipboard API in TypeScript. Includes a ready-to-use React copy button component with success feedback.
createDate: 2026-02-15
keywords: [
  copy to clipboard JavaScript,
  clipboard API,
  navigator clipboard writeText,
  copy text to clipboard,
  copy button React,
  copy to clipboard TypeScript,
  JavaScript clipboard,
  copy paste JavaScript,
  click to copy,
  clipboard writeText example,
  copy code snippet button,
]
---

The modern way to copy text to the clipboard. No hidden textareas, no `document.execCommand` — just the Async Clipboard
API that works in all modern browsers.

```typescript
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
```

## React Component

A copy button with visual feedback — shows a checkmark for 2 seconds after a successful copy:

```tsx
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(text);

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button onClick={handleCopy} aria-label="Copy to clipboard">
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}
```

> The Clipboard API requires a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) (
> HTTPS or localhost). It won't work on plain HTTP pages.

## Related

- [React Elements, Children as Props, and Re-Renders](/blog/react-elements-children) - React composition patterns that prevent unnecessary re-renders in interactive components
