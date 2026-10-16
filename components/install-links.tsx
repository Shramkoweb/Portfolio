import Image from 'next/image';

import type { ExtensionStores } from '@/lib/constants';
import { withStoreUtm } from '@/lib/store-links';

const BADGES = [
  {
    store: 'chrome',
    label: 'Chrome Web Store',
    src: '/static/images/badges/chrome-web-store.png',
    width: 496,
    height: 150,
  },
  {
    store: 'firefox',
    label: 'Firefox Add-ons',
    src: '/static/images/badges/firefox-add-ons.svg',
    width: 172,
    height: 60,
  },
  {
    store: 'edge',
    label: 'Microsoft Edge Add-ons',
    src: '/static/images/badges/microsoft-edge-add-ons.png',
    width: 544,
    height: 144,
  },
] as const;

interface InstallLinksProps {
  name: string;
  stores: ExtensionStores;
  medium: string;
  campaign: string;
}

export function InstallLinks(props: InstallLinksProps) {
  const { name, stores, medium, campaign } = props;

  return (
    <ul className="not-prose my-6 flex flex-wrap items-center gap-4">
      {BADGES.map((badge) => (
        <li key={badge.store}>
          <a
            target="_blank"
            rel="nofollow noopener"
            href={withStoreUtm(stores[badge.store], medium, campaign)}
            aria-label={`${name} on ${badge.label}`}
            className="block"
          >
            <Image
              className="h-12 w-auto"
              alt=""
              src={badge.src}
              width={badge.width}
              height={badge.height}
              unoptimized
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
