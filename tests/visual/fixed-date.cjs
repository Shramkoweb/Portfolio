// Freeze SSR and prerendered dates too: otherwise badges and copyright drift
// before the browser clock is installed, and hydration can disagree with HTML.
const NativeDate = Date;
const timestamp = NativeDate.parse('2026-09-19T12:00:00.000Z');
global.Date = new Proxy(NativeDate, {
  construct(target, args, newTarget) {
    return Reflect.construct(
      target,
      args.length ? args : [timestamp],
      newTarget,
    );
  },
  apply() {
    return new NativeDate(timestamp).toString();
  },
});
