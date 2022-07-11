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
            <abbr title="HyperText Markup Language">HTML</abbr>
            &ensp;courses at&ensp;
            <a href="https://htmlacademy.ru/profile/id852139" target="_blank" rel="noreferrer">HTML Academy</a>
          </p>

          <h3>Experience</h3>
          <em className="text-gray-300 text-xs">
            <time dateTime="2021-10">October 2021</time>
            &ensp;–&ensp;present.
          </em>
          <p className="m-0 mb-4">
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
          <p className="text-sm">
            MacPaw develops software for iOS and MacOS. Their products include CleanMyMac, Setapp,
            Gemini Photos and more. MacPaw‘s active user base exceeds 30 million worldwide.
            Every fifth Mac on Earth has at least one app by MacPaw.
          </p>
          <ul className="text-sm">
            <li>Rewriting Japanese site with Next.js and improve web vitals metrics</li>
            <li>
              Mentoring junior developers and interns in&ensp;
              <a href="https://macpaw.com/internship" target="_blank" rel="noreferrer">MacPaw Internship</a>
            </li>
            <li>
              Refactored the
              {' '}
              <a href="https://imgix.com/" target="_blank" rel="noreferrer">imgix</a>
              {' '}
              code in PHP, which allowed to optimize the size of the pictures by 2-6 times 🔥
            </li>
            <li>Speaker in internal Front-end meetings</li>
          </ul>
          <hr />

          <em className="text-gray-300 text-xs">
            <time dateTime="2020-11">November 2020</time>
            &ensp;–&ensp;
            <time dateTime="2021-10">October 2021</time>
          </em>
          <p className="m-0 mb-4">
            Frontend Developer at&ensp;
            <a href="https://p1k.org/" rel="noopener noreferrer" target="_blank">Phase One Karma</a>
          </p>
          <p className="text-sm">
            Phase One Karma created AI-driven anti-plagiarism checker with more than 1
            million users worldwide
            {' '}
            <a href="https://unicheck.com/" target="_blank" rel="noreferrer">Unicheck</a>
            .
          </p>
          <ul className="text-sm">
            <li>
              Reduced code base and improved code reusability by creating shared npm
              UI library with
              {' '}
              <a href="https://storybook.js.org/" target="_blank" rel="noreferrer">Storybook</a>
            </li>
            <li>Reduced chunk size by 12 KB each, it crops the final bundle by 60kb</li>
            <li>
              Built from scratch new user dashboard with
              {' '}
              <a href="https://nextjs.org/" target="_blank" rel="noreferrer">Next.js</a>
            </li>
            <li>
              Rewrite old WordPress site to
              {' '}
              <a href="https://www.gatsbyjs.com/" target="_blank" rel="noreferrer">Gatsby</a>
            </li>
            <li>
              Create team guidelines for writing
              {' '}
              <abbr title="Cascading Style Sheets">CSS</abbr>
              {' '}
              and
              {' '}
              <abbr title="Syntactically Awesome Style Sheets">SCSS</abbr>
            </li>
          </ul>
          <hr />

          <em className="text-gray-300 text-sm">
            <time dateTime="2019-04">April 2019</time>
            &ensp;–&ensp;
            <time dateTime="2020-11">November 2020</time>
          </em>
          <p className="m-0 mb-4">
            Frontend Developer at&ensp;
            <a href="https://www.pdffiller.com/" rel="noopener noreferrer" target="_blank">pdfFiller</a>
          </p>
          <p className="text-sm">
            One of four Ukrainian unicorn 🦄 company.
            PDFfiller is a comprehensive online document management platform and provides service
            to over 120,000 businesses around the world and in almost every industry
          </p>
          <ul className="text-sm">
            <li>
              Improving internal UI framework by shared classes. It reduced the size of the
              {' '}
              <abbr title="Cascading Style Sheets">CSS</abbr>
              {' '}
              bundle by 5%
            </li>
            <li>
              Developed high-quality, scalable, and reusable UI library for 3 big company products
            </li>
            <li>Refactor Pug/Jade components to React</li>
            <li>
              Improving website accessibility for passing
              {' '}
              <abbr title="Web Content Accessibility Guidelines">WCAG</abbr>
            </li>
          </ul>
          <hr />

          <em className="text-gray-300 text-xs">
            <time dateTime="2018-12">December 2018</time>
            &ensp;–&ensp;
            <time dateTime="2019-03">March 2019</time>
          </em>
          <p className="m-0 mb-4">
            Frontend Developer at&ensp;
            <a href="https://hexa.com.ua/en/home/" rel="noopener noreferrer" target="_blank">Hexa</a>
          </p>
          <p className="text-sm">Hexa - A small web studio that makes websites and turnkey solutions.</p>
          <ul className="text-sm">
            <li>
              Move manual creation of emails to framework
              {' '}
              <a href="https://get.foundation/emails.html" target="_blank" rel="noreferrer">Foundation</a>
            </li>
            <li>Create user-friendly web pages</li>
          </ul>

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
              className="rounded-lg transition-transform time md:hover:scale-150"
              alt="Me with tennis cup"
              src={tennis}
            />
            <Image
              className="rounded-lg transition-transform time md:hover:scale-150"
              alt="I am eat =)"
              src={eat}
            />
            <Image
              className="rounded-lg transition-transform time md:hover:scale-150"
              alt="Me with Anton near red BMW"
              src={car}
            />
            <Image
              className="rounded-lg transition-transform time md:hover:scale-150"
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
