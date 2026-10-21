import type { Cue } from '@/lib/sound';

class FakeParam {
  value = 0;
  setValueAtTime = jest.fn();
  linearRampToValueAtTime = jest.fn();
  exponentialRampToValueAtTime = jest.fn();
}

class FakeNode {
  targets: unknown[] = [];
  disconnect = jest.fn();

  connect<T>(node: T): T {
    this.targets.push(node);
    return node;
  }
}

class FakeSource extends FakeNode {
  start = jest.fn();
  stop = jest.fn();
}

class FakeAudioContext {
  static created: FakeAudioContext[] = [];
  currentTime = 10;
  sampleRate = 8;
  state: AudioContextState = 'suspended';
  destination = new FakeNode();
  sources: FakeSource[] = [];
  gains: (FakeNode & { gain: FakeParam })[] = [];
  panners: { pan: FakeParam }[] = [];
  resume = jest.fn(() => {
    this.state = 'running';
    return Promise.resolve();
  });
  suspend = jest.fn(() => {
    this.state = 'suspended';
    return Promise.resolve();
  });

  constructor(readonly options?: AudioContextOptions) {
    FakeAudioContext.created.push(this);
  }

  createGain() {
    const gain = Object.assign(new FakeNode(), { gain: new FakeParam() });
    this.gains.push(gain);
    return gain;
  }

  createOscillator() {
    return this.track({ type: 'sine', frequency: new FakeParam() });
  }

  createBufferSource() {
    return this.track({ buffer: null, loop: false });
  }

  createBiquadFilter() {
    return Object.assign(new FakeNode(), {
      type: 'lowpass',
      Q: new FakeParam(),
      frequency: new FakeParam(),
    });
  }

  createStereoPanner() {
    const panner = Object.assign(new FakeNode(), { pan: new FakeParam() });
    this.panners.push(panner);
    return panner;
  }

  createBuffer(_channels: number, length: number) {
    const data = new Float32Array(length);
    return { getChannelData: () => data };
  }

  private track<T extends object>(fields: T) {
    const source = Object.assign(new FakeSource(), fields);
    this.sources.push(source);
    return source;
  }
}

const CUES: Cue[] = [
  'sound-on',
  'lights-on',
  'lights-off',
  'stars-on',
  'stars-off',
  'meteor',
  'pop',
  'tick',
];

const audioSession = { type: 'auto' };

async function load() {
  return import('@/lib/sound');
}

function context() {
  return FakeAudioContext.created[0];
}

function speakers() {
  const { gains, destination } = context();
  return gains.filter(({ targets }) => targets.includes(destination));
}

describe('playSound', () => {
  beforeEach(() => {
    jest.resetModules();
    localStorage.clear();
    FakeAudioContext.created = [];
    audioSession.type = 'auto';
    Object.assign(globalThis, { AudioContext: FakeAudioContext });
    Object.defineProperty(navigator, 'audioSession', {
      value: audioSession,
      configurable: true,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    Reflect.deleteProperty(globalThis, 'AudioContext');
    Reflect.deleteProperty(navigator, 'audioSession');
  });

  it('stays silent until the visitor turns sound on', async () => {
    const { playSound } = await load();

    playSound('pop');

    expect(FakeAudioContext.created).toHaveLength(0);
  });

  it('shares one interactive context in an ambient audio session', async () => {
    localStorage.setItem('sound', 'on');
    const { playSound } = await load();

    playSound('pop');
    playSound('tick');

    expect(FakeAudioContext.created).toHaveLength(1);
    expect(context().options).toEqual({ latencyHint: 'interactive' });
    expect(audioSession.type).toBe('ambient');
  });

  it('resumes the context only when it is not running', async () => {
    localStorage.setItem('sound', 'on');
    const { playSound } = await load();

    playSound('pop');
    playSound('pop');

    expect(context().resume).toHaveBeenCalledTimes(1);
  });

  it.each(CUES)('starts and stops every voice of %s', async (cue) => {
    localStorage.setItem('sound', 'on');
    const { playSound } = await load();

    playSound(cue);

    const { sources, currentTime } = context();
    expect(sources.length).toBeGreaterThan(0);
    for (const source of sources) {
      const [start] = source.start.mock.calls[0];
      const [stop] = source.stop.mock.calls[0];
      expect(start).toBeGreaterThan(currentTime);
      expect(stop).toBeGreaterThan(start);
    }
  });

  it('delays and pans a cue', async () => {
    localStorage.setItem('sound', 'on');
    const { playSound } = await load();

    playSound('meteor', { delay: 0.5, pan: -0.6 });

    const { sources, panners, currentTime } = context();
    expect(panners.map(({ pan }) => pan.value)).toEqual([-0.6]);
    for (const source of sources) {
      expect(source.start.mock.calls[0][0]).toBeCloseTo(currentTime + 0.505);
    }
  });

  it('suspends the context once the last scheduled sound has ended', async () => {
    jest.useFakeTimers();
    localStorage.setItem('sound', 'on');
    const { playSound } = await load();

    playSound('meteor', { delay: 1 });
    playSound('tick');

    jest.advanceTimersByTime(4000);
    expect(context().suspend).not.toHaveBeenCalled();

    jest.advanceTimersByTime(200);
    expect(context().suspend).toHaveBeenCalledTimes(1);
  });

  it('cuts scheduled sounds when stopped and plays the next through a fresh output', async () => {
    localStorage.setItem('sound', 'on');
    const { playSound, stopSounds } = await load();

    playSound('meteor', { delay: 1 });
    const [first] = speakers();
    stopSounds();
    playSound('tick');

    expect(first.disconnect).toHaveBeenCalledTimes(1);
    expect(speakers()).toHaveLength(2);
    expect(speakers()[1].disconnect).not.toHaveBeenCalled();
  });

  it('stays optional when the browser refuses an audio context', async () => {
    localStorage.setItem('sound', 'on');
    Object.assign(globalThis, {
      AudioContext: jest.fn(() => {
        throw new DOMException('Too many contexts', 'NotSupportedError');
      }),
    });
    const { playSound, stopSounds } = await load();

    expect(() => playSound('pop')).not.toThrow();
    expect(() => stopSounds()).not.toThrow();
  });

  it('does nothing in a browser without Web Audio', async () => {
    localStorage.setItem('sound', 'on');
    Reflect.deleteProperty(globalThis, 'AudioContext');
    const { playSound } = await load();

    expect(() => playSound('pop')).not.toThrow();
  });
});
