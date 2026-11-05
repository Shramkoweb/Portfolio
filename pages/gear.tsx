import Head from 'next/head';
import Image from 'next/image';

import { PageMeta } from '@/components/page-meta';
import { MEDIA_QUERIES } from '@/lib/breakpoints';
import { SITE_URL } from '@/lib/constants';
import {
  generateBreadcrumbSchema,
  person,
  serializeJsonLd,
} from '@/lib/schema';

import gear from '../public/static/images/gear.jpeg';

const TITLE = 'Gear | Serhii Shramko';
const DESCRIPTION =
  'Explore my coding setup: MacBook Pro M3, PhpStorm IDE, headphones, and essential apps. Hardware and software I use daily for development and productivity.';
const PAGE_URL = `${SITE_URL}/gear`;

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${PAGE_URL}/#collection`,
  name: TITLE,
  url: PAGE_URL,
  description: DESCRIPTION,
  inLanguage: 'en',
  author: person,
  isPartOf: {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
  },
};

const BREADCRUMB_JSON_LD = generateBreadcrumbSchema([
  { name: 'Home', url: `${SITE_URL}/` },
  { name: 'Gear', url: PAGE_URL },
]);

function GearPage() {
  return (
    <>
      <PageMeta title={TITLE} description={DESCRIPTION} />
      <Head>
        <meta
          content="
          gear for coding,
          software for coding,
          IDE,
          PhpStorm"
          name="keywords"
          key="keywords"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(BREADCRUMB_JSON_LD),
          }}
        />
      </Head>
      <section className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-8 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          My Gear
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mt-2 mb-8">
          Here is what gear I am currently using for coding and life.
        </p>

        <div className="w-full mb-8 flex">
          <Image
            className="rounded-lg"
            alt="Serhii Shramko is sitting at a table in front of a computer and coding"
            src={gear}
            width={1000}
            height={667}
            sizes={`${MEDIA_QUERIES.md} 768px, 100vw`}
            priority
            fetchPriority="high"
          />
        </div>
        <div className="prose dark:prose-dark w-full">
          <h2 id="computer-office">Computer</h2>
          <ul>
            <li>14&quot; MacBook Pro M3 Max</li>
            <li>27&quot; Apple Studio Display</li>
            <li>Keychron K3 Max</li>
            <li>SteelSeries Rival Wireless 3</li>
          </ul>
          <h2 id="coding">Coding</h2>
          <ul>
            <li>
              Editor:&ensp;
              <a
                href="https://www.jetbrains.com/ru-ru/phpstorm/"
                rel="noopener"
                target="_blank"
              >
                PhpStorm
              </a>
            </li>
            <li>Theme: Darcula</li>
            <li>
              Terminal: MacOS Terminal +&ensp;
              <a href="https://ohmyz.sh/" rel="noopener" target="_blank">
                Oh My Zsh
              </a>
            </li>
          </ul>
          <h2 id="audio-video">Audio</h2>
          <ul>
            <li>Sony WH-1000XM4 🎧</li>
            <li>AirPods Pro 2</li>
          </ul>
          <h2 id="software">Software</h2>
          <ul>
            <li>
              <a
                href="https://preply.com/en/invite/OTc2NzkwOQ==?id=1733275008.074286"
                target="_blank"
                rel="noopener"
              >
                Preply
              </a>
            </li>
            <li>Raycast</li>
            <li>1Password</li>
            <li>Claude AI</li>
            <li>ChatGPT</li>
            <li>Perplexity.AI</li>
            <li>Spotify</li>
            <li>CleanShot X</li>
            <li>Grammarly</li>
            <li>Magnet</li>
          </ul>
          <h2 id="other">Other</h2>
          <ul>
            <li>
              <s>Golf GTI</s>
            </li>
            <li>BMW 428 XDrive&ensp;🚗💨</li>
            <li>Apple iPhone 13 Pro</li>
            <li>Apple Watch 8th</li>
            <li>Kindle 2022</li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default GearPage;
