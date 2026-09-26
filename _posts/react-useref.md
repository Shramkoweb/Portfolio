---
title: 'useRef in React: Refs vs State, DOM Access and React 19'
heading: useRef in React
description: 'When to use useRef instead of useState, how DOM refs and ref callbacks work, and what React 19 changed: ref as a prop, no forwardRef, ref cleanup.'
createDate: 2026-09-26T12:00:00.000Z
keywords:
  [
    react useref,
    useref vs usestate,
    react dom ref,
    ref as a prop react 19,
    forwardref deprecated,
    useimperativehandle,
    ref callback cleanup,
  ]
categories: [Advanced-React, Tutorial, JS, React]
featured: false
---

<Image src="useref.png" alt="Hand-drawn cover: the title useRef, a blue React atom shining a spotlight on a useState box that re-renders, while an orange box holding { current: 5 } sits outside the beam, not watched but still there" priority inverted />

A component is a function, and React calls it again on every render. Every variable inside it gets created from scratch each time:

```jsx
function Timer() {
  let intervalId = null; // null again on every render
  // ...
}
```

Most of the time that's fine. But sometimes you need a value that lives across renders and doesn't cause a new render when you change it. A timer ID, a pending request, a DOM node. That's what `useRef` is for.

## What a ref is

A ref is an object with one property, `current`. React creates it on the first render and gives you the same object every time after that:

```jsx
const countRef = useRef(0);

countRef.current; // 0
countRef.current = 5; // a plain mutation, React doesn't notice
```

The argument to `useRef` is only used once. After the first render, `current` holds whatever you last assigned to it. The expression itself still runs on every render, though, so `useRef(new ExpensiveThing())` creates a throwaway object each time.

It sounds a lot like state. It isn't, and a small example shows why.

## Ref vs state: a "Resend code" button

Most login screens have one: you ask for a code, and the button counts down "Resend in 30s" before you can ask again.

The component needs two values. The seconds left are shown on the button, so they go in state. The interval ID is never shown, we only need it to stop the timer, so it goes in a ref.

```jsx
function ResendCode({ onResend }) {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const intervalRef = useRef(null);

  const handleClick = () => {
    onResend();
    setSecondsLeft(30);

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
  };

  useEffect(() => {
    if (secondsLeft === 0) clearInterval(intervalRef.current);
  }, [secondsLeft]);

  // stop the timer if the component unmounts mid-countdown
  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <button onClick={handleClick} disabled={secondsLeft > 0}>
      {secondsLeft > 0 ? `Resend in ${secondsLeft}s` : 'Resend code'}
    </button>
  );
}
```

Now let's break it in both directions.

Put the interval ID in a plain variable:

```jsx
let intervalId = null;
```

The component re-renders every second, and every render starts with `intervalId = null`. The real ID is gone and `clearInterval(null)` does nothing. At first you won't notice: at 0 the button goes back to "Resend code". But the interval never stops, and `secondsLeft` quietly keeps going to -1, -2, -47. Click again and a second interval starts, so the countdown now runs twice as fast.

<Image src="useref-same-box.png" alt="Three renders of ResendCode with secondsLeft 0, 30 and 29. The click in the first render sets its intervalId to 17, but every later render starts with its own intervalId set to null, so the 17 is lost, while all three renders point to the same intervalRef object holding current: 17" inverted />

Put the seconds in a ref:

```jsx
const secondsLeftRef = useRef(0);
// ...
secondsLeftRef.current -= 1;
```

The number goes down, but nothing re-renders, not even after the click. The button keeps saying "Resend code" and stays clickable. Then something unrelated re-renders the component, and the label suddenly jumps to "Resend in 25s" or wherever the count happens to be.

So the rule: if a value appears on screen, it belongs in state. If it's only used behind the scenes, a ref is fine.

## Refs update right away, state is a snapshot

A ref is a regular object, so a new value is there on the very next line:

```jsx
const handleSend = () => {
  draftRef.current = '';
  console.log(draftRef.current); // ''
};
```

State works differently. Each render has its own copy of the state, and calling the setter doesn't touch the variable you're holding. It tells React to render again with the new value:

```jsx
const [draft, setDraft] = useState('Hello!');

const handleSend = () => {
  setDraft('');
  console.log(draft); // still 'Hello!'
};
```

`draft` is a `const` inside this render. You'll see `''` in the next one. React does this so that all the values in a single render agree with each other. A ref gives you none of that. You change the object and that's it.

<Image src="useref-snapshot-vs-mutation.png" alt="A ref and state compared. Setting draftRef.current to an empty string shows up on the next line. setDraft leaves draft as Hello! in render 1 and asks React for render 2, where draft is an empty string" inverted />

## When to use a ref

Ask two questions:

1. Is the value used for rendering?
2. Is it passed to another component as a prop?

If both answers are no, use a ref. A search box with debounce is a good real example. It needs a timeout ID to reset the delay on each keystroke, and an `AbortController` to cancel the request that's already on its way:

```jsx
function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const timeoutRef = useRef(null);
  const controllerRef = useRef(null);

  const search = async (q) => {
    controllerRef.current?.abort(); // we don't care about the old request anymore
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
        signal: controller.signal,
      });
      setResults(await res.json());
    } catch (err) {
      if (err.name !== 'AbortError') throw err;
    }
  };

  const handleChange = (e) => {
    const q = e.target.value;
    setQuery(q);

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => search(q), 300);
  };

  return (
    <>
      <input value={query} onChange={handleChange} placeholder="Search…" />
      <ul>
        {results.map((r) => (
          <li key={r.id}>{r.title}</li>
        ))}
      </ul>
    </>
  );
}
```

`query` and `results` are rendered, so they're state. The timeout ID and the controller are never rendered, so they're refs.

<Image src="useref-on-screen-vs-behind.png" alt="SearchBox split in two: on screen, the input and results list backed by the query and results state; behind the scenes, timeoutRef restarting the 300 ms delay and controllerRef aborting the old request" inverted />

Other things that fit well in a ref: an instance of a map or chart library, a WebSocket connection, a flag like "we already sent this analytics event".

You may also have seen refs used to keep the latest version of a callback, so an effect can call it without re-subscribing. React 19.2 added `useEffectEvent` for exactly that, so you don't need the ref trick anymore.

One rule that's easy to break: don't read or write `ref.current` during render, only in event handlers and effects. The React Compiler and recent versions of `eslint-plugin-react-hooks` (the `refs` rule) flag it. The one accepted exception is initializing a ref once, with `if (ref.current === null) ref.current = …`. React doesn't know when a ref changes, so whatever you render from it will be out of date.

## Refs to DOM elements

This is what most people use `useRef` for. Pass the ref to an element's `ref` attribute, and React puts the DOM node into `current`:

```jsx
function ChatMessages({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="messages">
      {messages.map((m) => (
        <p key={m.id}>{m.text}</p>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
```

Every time a message comes in, the list scrolls to the bottom.

Another case is the native `<dialog>` element. You get a proper modal with a backdrop, focus handling and `Esc` to close, with no library. The catch is that you open it by calling a method, `showModal()`, so you need the node:

```jsx
function DeleteAccount({ onDelete }) {
  const dialogRef = useRef(null);

  return (
    <>
      <button onClick={() => dialogRef.current.showModal()}>
        Delete account
      </button>

      <dialog ref={dialogRef}>
        <p>Are you sure? This can't be undone.</p>
        <button onClick={() => dialogRef.current.close()}>Cancel</button>
        <button onClick={onDelete}>Delete</button>
      </dialog>
    </>
  );
}
```

`ref.current` stays `null` until React has created the element, so it's still empty during the first render. One more reason to use refs only in handlers and effects.

If you use TypeScript, pass the element type: `useRef<HTMLDialogElement>(null)`. With the React 19 types, `useRef()` without an argument doesn't compile.

## Ref callbacks with cleanup

Sometimes you want to run code when an element shows up in the DOM and undo it when the element goes away. Infinite scroll is the usual example: when the user reaches the end of the list, load the next page.

Since React 19, a ref callback can return a cleanup function, the same way an effect does:

```jsx
function Feed({ posts, loadMore }) {
  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      <div
        ref={(node) => {
          const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) loadMore();
          });
          observer.observe(node);

          return () => observer.disconnect();
        }}
      />
    </>
  );
}
```

No `useRef`, no `useEffect`, no checking for `node === null`. The observer starts when the element is attached and disconnects when it's removed.

One thing to watch: without the React Compiler, the inline callback is a new function on every render, so React disconnects and reconnects the observer each time. A new observer reports right away, so while the sentinel is on screen, every re-render calls `loadMore` again, and you get duplicate requests. The Compiler memoizes the callback for you. Without it, wrap the callback in `useCallback` with `[loadMore]`, and make sure the parent passes a stable `loadMore`.

## Passing a ref to a child component

Say the chat has a separate `MessageInput` component, and each message has a "Reply" button. Clicking it should put `@name` into the text field and focus it. The button is in `Chat`, but the `<textarea>` is inside `MessageInput`.

In React 19 `ref` is a normal prop for function components, so you pass it down like anything else:

```jsx
function MessageInput({ value, onChange, ref }) {
  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Message…"
    />
  );
}

function Chat({ messages }) {
  const [draft, setDraft] = useState('');
  const inputRef = useRef(null);

  const reply = (message) => {
    setDraft(`@${message.author} `);
    inputRef.current.focus();
  };

  return (
    <>
      {messages.map((m) => (
        <div key={m.id}>
          {m.text}
          <button onClick={() => reply(m)}>Reply</button>
        </div>
      ))}

      <MessageInput value={draft} onChange={setDraft} ref={inputRef} />
    </>
  );
}
```

`Chat` creates the ref, `MessageInput` attaches it to the `<textarea>`, and React fills in `current`.

Before React 19 this didn't work. React kept `ref` for itself, and you had to wrap the child in `forwardRef((props, ref) => …)`. `forwardRef` still works, but you don't need it anymore, and React plans to deprecate it in a future version. There's a codemod that removes it for you. If you see it all over an older codebase, that's why.

## Exposing your own API with useImperativeHandle

The last example is a course page: a video player plus a list of chapters. Click "2:15 Setup" and the video jumps there.

You could give the parent the `<video>` node directly. The problem is that the parent then depends on how the player is built. Switch from `<video>` to a Mux or YouTube embed, and every `videoRef.current.currentTime` in the app breaks.

It's better if the player offers a few methods of its own, like `play()`, `pause()` and `seekTo()`. `useImperativeHandle` lets you do that. It controls what the parent's ref points to:

```jsx
function VideoPlayer({ src, ref }) {
  const videoRef = useRef(null); // internal, the parent never sees it

  useImperativeHandle(
    ref,
    () => ({
      play: () => videoRef.current.play(),
      pause: () => videoRef.current.pause(),
      seekTo: (seconds) => {
        videoRef.current.currentTime = seconds;
        videoRef.current.play();
      },
    }),
    [],
  );

  return <video ref={videoRef} src={src} controls />;
}
```

The hook takes three arguments:

1. the ref to attach to, here the one the parent passed in
2. a function that returns the object, which becomes `ref.current`
3. a dependency array, like other hooks

And the page:

```jsx
const chapters = [
  { time: 0, label: '0:00 Intro' },
  { time: 135, label: '2:15 Setup' },
  { time: 402, label: '6:42 First component' },
];

function LessonPage() {
  const playerRef = useRef(null);

  return (
    <>
      <VideoPlayer ref={playerRef} src="/videos/lesson-1.mp4" />

      <ul>
        {chapters.map((ch) => (
          <li key={ch.time}>
            <button onClick={() => playerRef.current.seekTo(ch.time)}>
              {ch.label}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
```

`LessonPage` doesn't know there's a `<video>` in there. It calls `seekTo()`. If the player changes tomorrow and keeps the same methods, the page doesn't need to change.

<Image src="useimperativehandle-api.png" alt="LessonPage calls playerRef.current.seekTo(135) from the 2:15 Setup button. Inside VideoPlayer, ref.current exposes only play, pause and seekTo, while videoRef and the video element stay private" inverted />

## Wrapping up

My rule is simple: if you see it on the screen, it's state. If you don't, a ref is probably fine.

Don't touch `ref.current` while rendering. It seems to work, until it doesn't.

On React 19 you can drop `forwardRef` and pass `ref` like any other prop. And if you're writing a ref just so an effect can call the latest callback, try `useEffectEvent` first.

Honestly, I don't need refs that often. Props and state do most of the work.

This post is part of my [Advanced React series](/blog/category/advanced-react). If you're new here, start with [what triggers re-renders](/blog/react-rerender).
