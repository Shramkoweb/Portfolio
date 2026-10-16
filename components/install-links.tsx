import type { ExtensionStores } from '@/lib/constants';
import { withStoreUtm } from '@/lib/store-links';

const STORES = [
  { key: 'chrome', label: 'Chrome' },
  { key: 'firefox', label: 'Firefox' },
  { key: 'edge', label: 'Edge' },
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
    <ul className="not-prose my-6 flex flex-wrap gap-3">
      {STORES.map(({ key, label }) => (
        <li key={key}>
          <a
            href={withStoreUtm(stores[key], medium, campaign)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Install ${name} for ${label}`}
            className="inline-flex rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-900 transition-[background-color,transform] duration-200 ease-out-expo hover:bg-gray-100 active:scale-[0.97] dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
          >
            Add to {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
