import { getSoundEnabled } from '@/lib/sound-preference';

export type Cue =
  | 'sound-on'
  | 'lights-on'
  | 'lights-off'
  | 'stars-on'
  | 'stars-off'
  | 'meteor'
  | 'pop'
  | 'tick';

interface CueOptions {
  delay?: number;
  pan?: number;
}

interface Voice {
  start: number;
  from: number;
  to?: number;
  peak: number;
  attack?: number;
  decay: number;
}

interface Tone extends Voice {
  type?: OscillatorType;
}

interface Hiss extends Voice {
  q: number;
}

type Synth = (context: AudioContext, out: AudioNode, start: number) => number;

const VOLUME = 0.3;
const SILENCE = 0.0001;
const LEAD = 0.005;
const IDLE_MS = 2000;

let shared: AudioContext | undefined;
let output: GainNode | undefined;
let noise: AudioBuffer | undefined;
let idleTimer: ReturnType<typeof setTimeout> | undefined;
let busyUntil = 0;

function envelope(
  gain: AudioParam,
  { start, peak, attack = 0.004, decay }: Voice,
): number {
  const end = start + attack + decay;
  gain.setValueAtTime(0, start);
  gain.linearRampToValueAtTime(peak, start + attack);
  gain.exponentialRampToValueAtTime(SILENCE, end);
  return end;
}

function tone(context: AudioContext, out: AudioNode, voice: Tone): number {
  const { start, from, to = from, type = 'sine' } = voice;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const end = envelope(gain.gain, voice);
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(from, start);
  if (to !== from) oscillator.frequency.exponentialRampToValueAtTime(to, end);
  oscillator.connect(gain).connect(out);
  oscillator.start(start);
  oscillator.stop(end);
  return end;
}

function hiss(context: AudioContext, out: AudioNode, voice: Hiss): number {
  const { start, from, to = from, q } = voice;
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  const end = envelope(gain.gain, { attack: 0.001, ...voice });
  source.buffer = noise ??= whiteNoise(context);
  source.loop = true;
  filter.type = 'bandpass';
  filter.Q.value = q;
  filter.frequency.setValueAtTime(from, start);
  if (to !== from) filter.frequency.exponentialRampToValueAtTime(to, end);
  source.connect(filter).connect(gain).connect(out);
  source.start(start);
  source.stop(end);
  return end;
}

function whiteNoise(context: AudioContext): AudioBuffer {
  const buffer = context.createBuffer(
    1,
    context.sampleRate,
    context.sampleRate,
  );
  const data = buffer.getChannelData(0);
  for (let index = 0; index < data.length; index += 1) {
    data[index] = Math.random() * 2 - 1;
  }
  return buffer;
}

function vary(spread: number): number {
  return 1 + (Math.random() - 0.5) * spread;
}

const CUES: Record<Cue, Synth> = {
  'sound-on': (context, out, start) =>
    Math.max(
      tone(context, out, { start, from: 784, peak: 0.45, decay: 0.25 }),
      tone(context, out, {
        start: start + 0.07,
        from: 1175,
        peak: 0.35,
        decay: 0.4,
      }),
    ),
  'lights-on': (context, out, start) =>
    Math.max(
      hiss(context, out, { start, from: 4200, q: 1.2, peak: 0.7, decay: 0.02 }),
      tone(context, out, {
        start,
        from: 2600,
        peak: 0.16,
        decay: 0.035,
        type: 'triangle',
      }),
    ),
  'lights-off': (context, out, start) =>
    Math.max(
      hiss(context, out, {
        start,
        from: 2400,
        q: 1.2,
        peak: 0.6,
        decay: 0.025,
      }),
      tone(context, out, {
        start,
        from: 1400,
        peak: 0.16,
        decay: 0.045,
        type: 'triangle',
      }),
    ),
  'stars-on': (context, out, start) =>
    Math.max(
      ...[880, 1109, 1319, 1760].map((from, index) =>
        tone(context, out, {
          start: start + index * 0.05,
          from,
          peak: 0.2 - index * 0.03,
          decay: 0.45,
        }),
      ),
    ),
  'stars-off': (context, out, start) =>
    Math.max(
      tone(context, out, { start, from: 1319, peak: 0.15, decay: 0.2 }),
      tone(context, out, {
        start: start + 0.07,
        from: 880,
        peak: 0.13,
        decay: 0.28,
      }),
    ),
  meteor: (context, out, start) => {
    const pitch = vary(0.1);
    return Math.max(
      hiss(context, out, {
        start,
        from: 6000 * pitch,
        to: 1800 * pitch,
        q: 4,
        peak: 0.22,
        attack: 0.5,
        decay: 0.6,
      }),
      tone(context, out, {
        start,
        from: 2093 * pitch,
        to: 1397 * pitch,
        peak: 0.035,
        attack: 0.5,
        decay: 0.6,
      }),
    );
  },
  pop: (context, out, start) => {
    const pitch = vary(0.08);
    return tone(context, out, {
      start,
      from: 420 * pitch,
      to: 980 * pitch,
      peak: 0.4,
      attack: 0.002,
      decay: 0.07,
    });
  },
  tick: (context, out, start) =>
    tone(context, out, {
      start,
      from: 1568,
      peak: 0.18,
      decay: 0.06,
      type: 'triangle',
    }),
};

function audio(): AudioContext | undefined {
  if (shared || typeof AudioContext === 'undefined') return shared;
  const { audioSession } = navigator as Navigator & {
    audioSession?: { type: string };
  };
  // 'ambient' mixes with the visitor's music and obeys the iOS silent switch.
  if (audioSession) audioSession.type = 'ambient';
  try {
    shared = new AudioContext({ latencyHint: 'interactive' });
  } catch {
    return undefined;
  }
  return shared;
}

function speaker(context: AudioContext): GainNode {
  if (output) return output;
  output = context.createGain();
  output.gain.value = VOLUME;
  output.connect(context.destination);
  return output;
}

export function stopSounds() {
  output?.disconnect();
  output = undefined;
}

function suspendAfter(context: AudioContext, end: number) {
  busyUntil = Math.max(busyUntil, end);
  clearTimeout(idleTimer);
  idleTimer = setTimeout(
    () => context.suspend().catch(() => {}),
    (busyUntil - context.currentTime) * 1000 + IDLE_MS,
  );
}

export function playSound(cue: Cue, { delay = 0, pan = 0 }: CueOptions = {}) {
  if (!getSoundEnabled()) return;
  const context = audio();
  if (!context) return;
  if (context.state !== 'running') context.resume().catch(() => {});

  let out: AudioNode = speaker(context);
  if (pan) {
    const panner = context.createStereoPanner();
    panner.pan.value = pan;
    panner.connect(out);
    out = panner;
  }
  suspendAfter(
    context,
    CUES[cue](context, out, context.currentTime + LEAD + delay),
  );
}
