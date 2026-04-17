import Head from 'next/head';
import Image from 'next/image';

import gear from 'public/static/images/gear.jpeg';

function GearPage() {
  return (
    <>
      <Head>
        <title>Gear | Serhii Shramko</title>
        <meta
          content="Explore my coding setup: MacBook Pro M3, PhpStorm IDE, headphones, and essential apps. Hardware and software I use daily for development and productivity."
          name="description"
          key="description"
        />
        <meta
          content="
          gear for coding,
          software for coding,
          IDE,
          PhpStorm"
          name="keywords"
          key="keywords"
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
            sizes="(min-width: 768px) 768px, 100vw"
            priority
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
