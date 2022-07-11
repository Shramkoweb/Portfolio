import Head from 'next/head';
import Image from 'next/future/image';

import about from '../public/static/images/about.jpeg';
import car from '../public/static/images/car.jpeg';
import tennis from '../public/static/images/tennis.jpeg';
import eat from '../public/static/images/eat.jpeg';
import carBack from '../public/static/images/car-back.jpeg';

function AboutPage() {
  return (
    <>
      <Head>
        <title>About - Serhii Shramko</title>
      </Head>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-8 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          About Me
        </h1>

        <div className="w-full mb-8 flex">
          <Image
            className="rounded-lg"
            alt="Serhii Shramko with photography camera"
            src={about}
            width={1269}
            height={846}
            priority
          />
        </div>

        <div className="mb-8 prose dark:prose-dark leading-6">
          <h2>Links</h2>
          <ul>
            <li>
              <a href="https://github.com/shramkoweb" rel="noopener noreferrer" target="_blank">GitHub</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/sergey-shramko">
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="mailto:shramko.dev@gmail.com"
                rel="noreferrer"
                target="_blank"
                title="Shramko Serhii personal email"
              >
                shramko.dev@gmail.com
              </a>
            </li>
          </ul>
          <h2>Bio</h2>
          <p>
            Hi there, I&apos;m Serhii. I am a developer in the MacPaw web team,
            where my team develops cool sites and internal projects for the company.
            I&apos;m passionate about frontend development and try to be better than yesterday.
          </p>

          <p>
            In the past, I am a mentor and tutor for&ensp;
            <abbr title="TypeScript">TS</abbr>
            ,&ensp;
            <abbr title="A JavaScript library for building user interfaces">React</abbr>
            &ensp;and&ensp;
            <abbr title="HyperText Markup Languag">HTML</abbr>
            &ensp;courses at&ensp;
            <a href="https://htmlacademy.ru/profile/id852139" target="_blank" rel="noreferrer">HTML Academy</a>
          </p>

          <h3>Experience</h3>
          <em className="text-gray-300">
            <time dateTime="2021-10">October 2021</time>
            &ensp;–&ensp;present.
          </em>
          <p className="mb-8">
            Senior Developer at&ensp;
            <a
              href="https://macpaw.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              MacPaw
            </a>
            &ensp;🐾
          </p>

          <em className="text-gray-300">
            <time dateTime="2020-11">November 2020</time>
            &ensp;–&ensp;
            <time dateTime="2021-10">October 2021</time>
          </em>
          <p>
            Frontend Developer at&ensp;
            <a href="https://p1k.org/" rel="noopener noreferrer" target="_blank">Phase One Karma</a>
          </p>

          <em className="text-gray-300">
            <time dateTime="2019-04">April 2019</time>
            &ensp;–&ensp;
            <time dateTime="2020-11">November 2020</time>
          </em>
          <p>
            Frontend Developer at&ensp;
            <a href="https://www.pdffiller.com/" rel="noopener noreferrer" target="_blank">pdfFiller</a>
          </p>

          <em className="text-gray-300">
            <time dateTime="2018-12">December 2018</time>
            &ensp;–&ensp;
            <time dateTime="2019-03">March 2019</time>
          </em>
          <p>
            Frontend Developer at&ensp;
            <a href="https://hexa.com.ua/en/home/" rel="noopener noreferrer" target="_blank">Hexa</a>
          </p>
          <h3>Education</h3>
          <p>
            Master degree in Electromechanical Systems of Automation and Electric Drive at&ensp;
            <a href="http://www.nmu.org.ua/en/" rel="noopener noreferrer" target="_blank">
              NMU
            </a>
          </p>
          <h2>I love Eating, Parties, and Cars</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Image
              className="rounded-lg"
              alt="Me with tennis cup"
              src={tennis}
            />
            <Image
              className="rounded-lg"
              alt="I am eat =)"
              src={eat}
            />
            <Image
              className="rounded-lg"
              alt="Me with Anton near red BMW"
              src={car}
            />
            <Image
              className="rounded-lg"
              alt="Me with Anton near red Golf GTI"
              src={carBack}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
