import { edgeFade, meteorAt, starAlpha, starAt } from '@/lib/starfield';

const star = { rank: 0.5, radius: 1, phase: 0, speed: 1 };

describe('starAt', () => {
  it('is stable for a cell', () => {
    expect(starAt(12, -40)).toEqual(starAt(12, -40));
  });

  it('keeps the field sparse', () => {
    let stars = 0;
    for (let col = -50; col < 50; col += 1) {
      for (let row = 0; row < 100; row += 1) {
        if (starAt(col, row)) stars += 1;
      }
    }
    expect(stars / 10_000).toBeGreaterThan(0.025);
    expect(stars / 10_000).toBeLessThan(0.055);
  });
});

describe('edgeFade', () => {
  it('hides stars inside the content and shows them in full far out', () => {
    expect(edgeFade(star, 300, 300, 720)).toBe(0);
    expect(edgeFade(star, 720, 300, 720)).toBe(1);
  });

  it('thins out gradually toward the content', () => {
    const samples = [360, 450, 540, 630, 720].map((distance) =>
      edgeFade({ ...star, rank: 0.3 }, distance, 300, 720),
    );
    expect(samples).toEqual([...samples].sort((a, b) => a - b));
  });

  it('lets low-ranked stars reach closer to the content', () => {
    const distance = 420;
    expect(
      edgeFade({ ...star, rank: 0.05 }, distance, 300, 720),
    ).toBeGreaterThan(edgeFade({ ...star, rank: 0.9 }, distance, 300, 720));
  });
});

describe('starAlpha', () => {
  it('breathes between dim and full', () => {
    const samples = Array.from({ length: 200 }, (_, i) =>
      starAlpha(star, i / 10),
    );
    expect(Math.min(...samples)).toBeCloseTo(0.3, 1);
    expect(Math.max(...samples)).toBeCloseTo(1, 1);
  });
});

describe('meteorAt', () => {
  it('appears briefly once per cycle, in a gutter', () => {
    const frames = Array.from({ length: 140 * 10 }, (_, i) =>
      meteorAt(i / 10, 1600, 900),
    ).filter((meteor) => meteor !== null);
    expect(frames.length).toBeGreaterThan(0);
    expect(frames.length).toBeLessThan(140);
    for (const { x } of frames) {
      expect(Math.abs(x - 800)).toBeGreaterThan(400);
    }
  });
});
