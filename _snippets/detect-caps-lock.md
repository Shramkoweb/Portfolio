---
title: Detect Caps Lock State in JavaScript - Modern Methods & Browser Support
heading: Detect Caps Lock with JavaScript
description: Learn how to detect Caps Lock state in JavaScript using getModifierState() and fallback methods. Complete guide with real-world examples for form validation, password fields, and cross-browser compatibility.
createDate: 2025-05-29
keywords: [ JavaScript Caps Lock detection, getModifierState JavaScript, Caps Lock JavaScript, JavaScript keyboard events, JavaScript modifier keys, Caps Lock warning JavaScript, JavaScript form validation, Keyboard state detection, JavaScript keydown events, Caps Lock indicator, JavaScript input validation, Browser keyboard API, JavaScript modifier state, Caps Lock check JavaScript, Keyboard modifiers JavaScript ]
---

Caps Lock detection using [getModifierState](https://w3c.github.io/uievents/#event-modifier-initializers).

```javascript
function checkCapsLock(event) {
  if (event.getModifierState) {
    return event.getModifierState('CapsLock');
  }
  return false; // Fallback if not supported
}
```

## Example

```javascript
function setupCapsLockDetection(inputElement, warningElement) {
  inputElement.addEventListener('keydown', function(event) {
    const isCapsLockOn = event.getModifierState('CapsLock');

    if (isCapsLockOn) {
      warningElement.textContent = '⚠️ Caps Lock is enabled';
      warningElement.style.display = 'block';
      warningElement.style.color = '#ff6b35';
    } else {
      warningElement.style.display = 'none';
    }
  });
}

const passwordField = document.querySelector('#password');
const warning = document.querySelector('#caps-warning');
setupCapsLockDetection(passwordField, warning);
```
