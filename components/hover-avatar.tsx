'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

import smile from '../public/static/images/smile.webp';
import tongue from '../public/static/images/tongue.webp';

export function HoverAvatar() {
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);

  const handleHover = () => {
    setIsAvatarHovered((prevValue) => !prevValue);
  };

  return (
    <div
      className="shrink-0 block relative mr-auto mb-8 w-32 h-32 sm:mb-0"
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <Image
        alt="Serhii Shramko's Memoji avatar — smiling face with brown hair and round glasses"
        src={smile}
        quality={75}
        width={128}
        height={128}
        className={clsx('absolute', { 'opacity-0': isAvatarHovered })}
        sizes="128px"
        priority
      />
      <Image
        alt="Serhii Shramko's Memoji avatar — winking face with tongue out, brown hair, and round glasses"
        src={tongue}
        quality={75}
        width={128}
        height={128}
        className={clsx('absolute', { 'opacity-0': !isAvatarHovered })}
        sizes="128px"
        priority
      />
    </div>
  );
}
