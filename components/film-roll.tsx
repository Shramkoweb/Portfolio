import Image, { type StaticImageData } from 'next/image';

import campfire from '../public/static/images/roll/campfire.jpg';
import firstComputer from '../public/static/images/roll/first-computer.jpg';
import firstSchoolDay from '../public/static/images/roll/first-school-day.jpg';
import graduation from '../public/static/images/roll/graduation.jpg';
import jetSki from '../public/static/images/roll/jet-ski.jpg';
import studio from '../public/static/images/roll/studio.jpg';
import tracksuit from '../public/static/images/roll/tracksuit.jpg';

type Span = 'full' | 'half';

interface Frame {
  src: StaticImageData;
  alt: string;
  caption?: string;
  span: Span;
}

const SPAN_CLASSES: Record<Span, string> = {
  full: 'md:col-span-6',
  half: 'md:col-span-3',
};

const SPAN_SIZES: Record<Span, string> = {
  full: '(min-width: 768px) 768px, 100vw',
  half: '(min-width: 768px) 368px, 100vw',
};

/* Wide shots break the rows, so the squares between them come in pairs. */
const FRAMES: Frame[] = [
  {
    src: studio,
    alt: 'Serhii Shramko as a toddler in a patterned romper, holding hands with a girl in a large white hair bow in front of a painted birch-forest backdrop at a photo studio.',
    caption: 'Initial release.',
    span: 'full',
  },
  {
    src: jetSki,
    alt: 'Serhii Shramko as a young boy in a red cap sitting on a teal jet ski at a crowded beach.',
    caption: 'No rollback plan, no life vest.',
    span: 'half',
  },
  {
    src: campfire,
    alt: 'Serhii Shramko as a boy in a winter hat crouching by a campfire in a field with a friend, roasting food on sticks.',
    caption:
      'Learned to run things in production without an extinguisher nearby.',
    span: 'half',
  },
  {
    src: firstSchoolDay,
    alt: 'Serhii Shramko as a first grader in a black suit and bow tie holding a bouquet, standing with a woman in a red blazer in a courtyard of apartment blocks.',
    caption: 'Onboarding day. Dress code enforced by Mom ❤️',
    span: 'full',
  },
  {
    src: tracksuit,
    alt: 'Serhii Shramko as a schoolboy in a blue and red Reebok tracksuit standing in front of a painted wall mural.',
    span: 'half',
  },
  {
    src: graduation,
    alt: 'Serhii Shramko in a black suit at his 2004 school graduation, holding a certificate in front of a hand-made rainbow and globe decoration.',
    span: 'half',
  },
  {
    src: firstComputer,
    alt: 'Serhii Shramko as a teenager at his first computer desk, hand on the mouse, turning to the camera next to a CRT monitor.',
    caption: 'Found the workstation. Everything above this is a patch release.',
    span: 'full',
  },
];

function FilmRoll() {
  return (
    <section>
      <h2>Before the résumé</h2>

      <p className="font-mono text-xs text-gray-500 dark:text-gray-300">
        $ git log --before=2005
      </p>

      <ol className="not-prose grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-6">
        {FRAMES.map((frame) => (
          <li className={SPAN_CLASSES[frame.span]} key={frame.alt}>
            <Image
              className="pointer-events-none w-full rounded-lg"
              src={frame.src}
              alt={frame.alt}
              placeholder="blur"
              sizes={SPAN_SIZES[frame.span]}
              loading="lazy"
            />

            {frame.caption ? (
              <p className="mt-3 text-xs leading-6 text-gray-500 dark:text-gray-300">
                {frame.caption}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

export { FilmRoll };
