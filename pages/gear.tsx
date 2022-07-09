import Head from 'next/head';
import Image from 'next/future/image';

import gear from 'public/static/images/gear.jpeg';

function GearPage() {
  return (
    <>
      <Head>
        <title>Gear - Serhii Shramko</title>
        <meta content="Here's what gear I'm currently using for coding and live." name="description" />
      </Head>
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-8 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          My Gear
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mt-2 mb-8">
          Here is what gear I am currently using for coding and live.
        </p>

        <div className="w-full mb-8 flex">
          <Image
            className="rounded-lg"
            alt="My stuff"
            src={gear}
            width={1000}
            height={667}
            priority
          />
        </div>
        <div className="prose dark:prose-dark w-full">
          <h3 id="computer-office">Computer</h3>
          <ul>
            <li>16&quot; Macbook Pro (2018)</li>
            <li>27&quot; LG UltraFine 27UL850-W</li>
            <li>SteelSeries Rival Wireless 3 Mouse</li>
          </ul>
          <h3 id="coding">Coding</h3>
          <ul>
            <li>
              Editor:&ensp;
              <a href="https://www.jetbrains.com/ru-ru/phpstorm/" rel="noopener noreferrer" target="_blank">
                PhpStorm
              </a>
            </li>
            <li>Theme: Darcula</li>
            <li>
              Terminal: MacOS Terminal +&ensp;
              <a href="https://ohmyz.sh/" rel="noopener noreferrer" target="_blank">
                Oh My Zsh
              </a>
            </li>
          </ul>
          <h3 id="audio-video">Audio</h3>
          <ul>
            <li>Sony WH-1000XM4 🎧</li>
            <li>Samsung Buds Pro</li>
          </ul>
          <h3 id="software">Software</h3>
          <ul>

            <li>
              <a href="https://macpaw.com/cleanmymac" rel="noopener noreferrer" target="_blank">CleanMyMac</a>
            </li>
            <li>
              <a href="https://macpaw.com/clearvpn" rel="noopener noreferrer" target="_blank">ClearVPN</a>
            </li>
            <li>
              1Password
            </li>
            <li>Spotify</li>
            <li>
              CleanShot X
            </li>
            <li>Grammarly</li>
            <li>Magnet</li>
          </ul>
          <h3 id="other">Other</h3>
          <ul>
            <li>Golf GTI&ensp;🚗💨</li>
            <li>Apple iPhone</li>
            <li>Apple Watch</li>
            <li>Kindle</li>
          </ul>
        </div>
      </article>
    </>
  );
}

export default GearPage;
