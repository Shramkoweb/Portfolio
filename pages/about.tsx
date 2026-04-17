import Head from 'next/head';
import Image from 'next/image';

import { LinkedinFeedback } from '@/components/linkedin-feedback';
import { LINKEDIN_FEEDBACK_LIST } from '@/components/linkedin-feedback/constants';

import about from '../public/static/images/about.jpeg';
import car from '../public/static/images/car.jpeg';
import tennis from '../public/static/images/tennis.jpeg';
import eat from '../public/static/images/eat.jpeg';
import carBack from '../public/static/images/car-back.jpeg';
import standing from '../public/static/images/standing.jpg';

function AboutPage() {
  return (
    <>
      <Head>
        <title>About | Serhii Shramko</title>
        <meta
          content="Learn about me and my journey through life. Discover my passions, interests, and experiences on my personal about page. Get to know the real me today."
          name="description"
          key="description"
        />
        <meta
          content="
          frontend developer,
          Serhii,
          Serhii Shramko,
          shramko,
          software engineer,
          web developer,
          dev engineer"
          name="keywords"
          key="keywords"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "url": "https://shramko.dev/about",
              "inLanguage": "en",
              "dateModified": "2026-03-28",
              "mainEntity": {
                "@type": "Person",
                "@id": "https://shramko.dev/#person",
                "name": "Serhii Shramko",
                "description": "Senior Software Engineer specializing in React, TypeScript, and frontend architecture. Building scalable web applications and mentoring developers.",
                "url": "https://shramko.dev/about",
                "image": {
                  "@type": "ImageObject",
                  "url": "https://shramko.dev/static/images/twittersite.png",
                  "width": 1269,
                  "height": 846
                },
                "sameAs": [
                  "https://github.com/shramkoweb",
                  "https://www.linkedin.com/in/shramko-dev/",
                  "https://www.instagram.com/serhii.shramko/"
                ],
                "knowsAbout": [
                  "Frontend Development",
                  "TypeScript",
                  "JavaScript",
                  "React",
                  "Next.js",
                  "Redux",
                  "Redux-Saga",
                  "Nest.js",
                  "Refine",
                  "Playwright",
                  "Elasticsearch",
                  "Kibana",
                  "WCAG 2.1",
                  "Accessibility",
                  "CI/CD",
                  "Performance Optimization"
                ],
                "jobTitle": "Senior Software Engineer",
                "worksFor": {
                  "@type": "Organization",
                  "name": "BetterMe",
                  "url": "https://betterme.world/"
                },
                "email": "shramko.dev@gmail.com",
                "workLocation": {
                  "@type": "Place",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Boston",
                    "addressRegion": "MA",
                    "addressCountry": "US"
                  }
                },
                "alumniOf": {
                  "@type": "CollegeOrUniversity",
                  "name": "Dnipro University of Technology",
                  "url": "https://nmu.org.ua/en/"
                }
              }
            })
          }}
        />
      </Head>
      <section className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-8 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          About Me
        </h1>

        <div className="w-full mb-8 flex">
          <Image
            className="rounded-lg"
            alt="Serhii Shramko holding a vintage FED-5 film camera up to his eye in a black-and-white portrait"
            src={about}
            width={1269}
            height={846}
            sizes="(min-width: 768px) 768px, 100vw"
            priority
            fetchPriority="high"
          />
        </div>

        <div className="mb-8 prose dark:prose-dark leading-6">
          <h2>Links</h2>

          <ul>
            <li>
              <a
                href="https://github.com/shramkoweb"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
            </li>

            <li>
              <a href="https://www.linkedin.com/in/shramko-dev/">LinkedIn</a>
            </li>

            <li>
              <a
                href="mailto:shramko.dev@gmail.com"
                rel="noopener noreferrer"
                target="_blank"
                title="Shramko Serhii personal email"
              >
                shramko.dev@gmail.com
              </a>
            </li>
          </ul>

          <h2>Experience</h2>

          <div className="flex justify-between">
            <em className="text-gray-300 text-xs">
              <time dateTime="2025-01">January 2025</time>
              &ensp;–&ensp; Present
            </em>
            <em className="text-gray-300 text-xs">Boston, MA</em>
          </div>

          <h3 className="m-0 mb-4">
            Senior Software Engineer at&ensp;
            <a
              href="https://betterme.world/"
              rel="noopener noreferrer"
              target="_blank"
            >
              BetterMe
            </a>
          </h3>

          <p className="text-sm">
            BetterMe — digital health & wellness platform with{' '}
            <strong>100M+ downloads</strong>.
          </p>

          <ul className="text-sm">
            <li>
              Served as <strong>Technical Lead & hands-on architect</strong> for
              a new <strong>B2B admin platform</strong>, drove front- and
              back-end architecture (Next.js, Nest.JS, Refine, Redux),
              established scalable infrastructure, CI/CD and a design system,
              coordinated delivery across the team, and was accountable for
              production readiness.
            </li>

            <li>
              Built <strong>centralized monitoring</strong> with{' '}
              <strong>Elasticsearch and Kibana</strong>, enabling real-time
              issue detection and <strong>100% coverage</strong> of critical
              flows; reduced incident response time (MTTR).
            </li>

            <li>
              Introduced <strong>automated testing</strong> with Playwright
              (E2E) and Jest (unit/integration), increased coverage, cut
              regression bugs, and shortened the manual QA cycle.
            </li>

            <li>
              Led <strong>React, TypeScript upskilling programs</strong>;
              established shared patterns =&gt; less review time, higher code
              quality, faster prod deploys.
            </li>
          </ul>

          <hr />

          <div className="flex justify-between">
            <em className="text-gray-300 text-xs">
              <time dateTime="2021-11">November 2021</time>
              &ensp;–&ensp;
              <time dateTime="2024-12">December 2024</time>
            </em>
            <em className="text-gray-300 text-xs">Boston, MA</em>
          </div>

          <h3 className="m-0 mb-4">
            Senior Software Engineer at&ensp;
            <a
              href="https://macpaw.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              MacPaw
            </a>
          </h3>

          <p className="text-sm">
            MacPaw develops software for iOS and macOS. Their products include
            CleanMyMac, Setapp, Gemini Photos and more. MacPaw‘s active user
            base exceeds <strong>30 million</strong> worldwide. Every fifth Mac
            on Earth has at least one app by MacPaw.
          </p>

          <ul className="text-sm">
            <li>
              <strong>Led a team of 3 frontend developers</strong>, delivering
              1–1 sessions and code reviews leading to a 30% enhancement in
              overall performance and code quality. Elevated juniors to
              mid-level.
            </li>

            <li>
              Spearheaded the front-end development of critical websites
              reaching <strong>2.6M+</strong> monthly users, leading to improved
              website stability and higher customer retention.
            </li>

            <li>
              Implemented a new responsive and adaptive design for the company
              blog using TypeScript, BEM, SCSS, and Laravel, leading to a{' '}
              <strong>$100K increase in revenue</strong>.
            </li>

            <li>
              Collaborated with different teams to launch Subscription Cabinet
              on Vercel with Next.js and REST APIs, resulting in a{' '}
              <strong>95% Google Lighthouse performance</strong> score and
              onboarding <strong>13,000 users</strong> in the first month.
            </li>

            <li>
              Implemented new <strong>CI/CD</strong> processes, resulting in an{' '}
              <strong>8% reduction</strong> in code review time per week and
              increased productivity for the engineering team.
            </li>

            <li>
              Enhanced codebase security and stability by implementing automated
              dependency updates with Renovate, reducing outdated dependencies
              by 35%. Aligned with <strong>SOC 2</strong> company strategy to
              ensure a robust software environment.
            </li>
          </ul>

          <hr />

          <div className="flex justify-between">
            <em className="text-gray-300 text-xs">
              <time dateTime="2020-10">October 2020</time>
              &ensp;–&ensp;
              <time dateTime="2021-11">November 2021</time>
            </em>
            <em className="text-gray-300 text-xs">Hicksville, NY</em>
          </div>

          <h3 className="m-0 mb-4">
            Software Engineer at&ensp;
            <a
              href="https://loio.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Lawrina
            </a>
          </h3>

          <p className="text-sm">
            An innovative legal tech company delivering AI-driven solutions to
            streamline legal processes and enhance efficiency. Created AI-driven
            anti-plagiarism checker with more than{' '}
            <strong>1 million users</strong> worldwide{' '}
            <a
              href="https://www.turnitin.com/products/unicheck/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Unicheck
            </a>
          </p>

          <ul className="text-sm">
            <li>
              Developed a user dashboard from scratch using Next.js, TypeScript,
              and Storybook, achieving a page load time of{' '}
              <strong>under 2 seconds</strong>.
            </li>

            <li>
              Migrated an old WordPress website to Gatsby.js, styled with
              Tailwind, achieving a <strong>15% reduction</strong> in page load
              time and enhancing the user experience.
            </li>

            <li>
              Implemented <strong>A/B</strong> testing with the server-side
              render, leading to a <strong>10-25% rise</strong> in key user
              metrics and generating actionable insights for strategic growth.
            </li>

            <li>
              Improved developer experience by implementing guidelines for{' '}
              <abbr title="Syntactically Awesome Style Sheets">SCSS</abbr>,
              Accessibility, and Semantic markup in a cross-functional team.
            </li>
          </ul>

          <hr />

          <div className="flex justify-between">
            <em className="text-gray-300 text-xs">
              <time dateTime="2018-10">October 2018</time>
              &ensp;–&ensp;
              <time dateTime="2020-10">October 2020</time>
            </em>

            <em className="text-gray-300 text-xs">Brookline, MA</em>
          </div>

          <h3 className="m-0 mb-4">
            Software Engineer at&ensp;
            <a
              href="https://www.pdffiller.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              PDFfiller
            </a>
          </h3>

          <p className="text-sm">
            A global leader in document management, serving more than
            <strong> 100 million users</strong> worldwide. One of four Ukrainian
            unicorn 🦄 companies.
          </p>

          <ul className="text-sm">
            <li>
              Achieved <strong>ADA and WCAG 2.1 compliance</strong> by
              implementing semantic HTML, ARIA landmarks, and enhanced keyboard
              navigation, ensuring user accessibility and{' '}
              <strong>saving over $1 million</strong> in potential lawsuits.
            </li>

            <li>
              Achieved a <strong>10% rise</strong> in user engagement by
              building high-performing SPAs with React, Redux, and Redux-Saga,
              enriching UI/UX for enterprise SaaS products.
            </li>

            <li>
              Collaborated with three teams and{' '}
              <strong>over 30 developers</strong> to implement a reusable UI
              library and a component-based architecture, resulting in improved
              code maintainability.
            </li>

            <li>
              Reduced CSS bundle size by <strong>5%</strong> by implementing
              shared classes in the Pug framework, boosting performance and user
              satisfaction.
            </li>

            <li>
              Collaborated with cross-functional teams, including design,
              product, and backend, to launch features and fix bugs.
            </li>
          </ul>

          <hr />

          <LinkedinFeedback feedbackList={LINKEDIN_FEEDBACK_LIST} />

          <hr />

          <h2 className="mt-16">Education</h2>

          <p>
            <strong>
              Master of Science in Electromechanical Automation Systems
            </strong>
            <br />
            <a
              href="https://nmu.org.ua/en/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Dnipro University of Technology
            </a>
          </p>

          <hr />

          <h2>Open Source</h2>

          <h3 className="m-0 mb-4">
            Mentor -&ensp;
            <a
              href="https://kottans.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kottans
            </a>
          </h3>

          <p className="text-sm">
            Over the years, I&apos;ve had the joy of mentoring{' '}
            <strong>more than 30</strong> individuals. I love conducting
            insightful code reviews on GitHub, offering engaging voice and text
            consultations, and sharing motivation and inspiration along the way.
          </p>

          <h3 className="m-0 mb-4">
            Front-end consultations -&ensp;
            <a
              href="https://macpaw.com/career-wave"
              target="_blank"
              rel="noopener noreferrer"
            >
              MacPaw Career Wave
            </a>
          </h3>

          <p className="text-sm">
            A <strong>mentorship program</strong> that empowers girls with
            valuable career insights and both soft and hard skill development. I{' '}
            <strong>helped 5 girls</strong> break the stalemate in their careers
            and find jobs.
          </p>

          <h3 className="m-0 mb-4">
            Contributor -&ensp;
            <a
              href="https://stateofjs.com/en-US"
              target="_blank"
              rel="noopener noreferrer"
            >
              State of JS & CSS
            </a>
          </h3>

          <p className="text-sm">
            Authored Ukrainian and Russian translations for the State of JS &
            CSS survey.
          </p>

          <hr />

          <h2>I love Eating, Parties, and Cars</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Image
              className="pointer-events-none rounded-lg w-full md:col-span-2"
              alt="Serhii Shramko smiling and holding a trophy, standing next to a woman holding a 500 UAH certificate in a casual office setting with a whiteboard in the background."
              placeholder="blur"
              src={tennis}
              sizes="(min-width: 768px) 768px, 100vw"
              loading="lazy"
            />
            <Image
              className="pointer-events-none rounded-lg"
              alt="Serhii Shramko enjoying snacks and drinks with friends at a lively party"
              placeholder="blur"
              src={eat}
              sizes="(min-width: 768px) 384px, 100vw"
              loading="lazy"
            />
            <Image
              className="pointer-events-none rounded-lg"
              alt="Serhii Shramko showing a red and black BMW to a friend in an outdoor parking lot."
              placeholder="blur"
              src={car}
              sizes="(min-width: 768px) 384px, 100vw"
              loading="lazy"
            />
            <Image
              className="pointer-events-none rounded-lg"
              alt="Serhii Shramko and a friend examining the rear of a red sporty car in a parking garage"
              placeholder="blur"
              src={carBack}
              sizes="(min-width: 768px) 384px, 100vw"
              loading="lazy"
            />
            <Image
              className="pointer-events-none rounded-lg"
              alt="Serhii Shramko and a friend standing outdoors in a bright, forested park, wearing casual outfits."
              placeholder="blur"
              src={standing}
              sizes="(min-width: 768px) 384px, 100vw"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
