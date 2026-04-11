import Head from 'next/head';
import {
  Bookmark,
  BookOpen,
  Globe,
  Lightbulb,
  Newspaper,
  Sparkles,
  Users,
  Wrench,
} from 'lucide-react';

interface BookmarkItem {
  title: string;
  url: string;
  description: string;
}

interface BookmarkSection {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  items: BookmarkItem[];
}

const BOOKMARK_SECTIONS: BookmarkSection[] = [
  {
    id: 'books',
    title: 'The Staff Engineer Reading List',
    icon: BookOpen,
    description:
      'I keep lending these out and buying new copies. If someone asks me where to start, I send at least three of these.',
    items: [
      {
        title: "The Software Engineer's Guidebook by Gergely Orosz",
        url: 'https://www.engguidebook.com/',
        description:
          'Orosz wrote this over four years after leaving Uber. Junior to staff, all in one book. I wish someone handed me this in 2020 instead of me figuring it out the hard way.',
      },
      {
        title: "The Staff Engineer's Path by Tanya Reilly",
        url: 'https://www.oreilly.com/library/view/the-staff-engineers/9781098118723/',
        description:
          'If Larson is the map, Reilly is the field manual. How to run projects across teams, how to think big-picture, how to actually help people grow. Less inspirational, more useful.',
      },
      {
        title:
          'Staff Engineer: Leadership Beyond the Management Track by Will Larson',
        url: 'https://staffeng.com/book',
        description:
          'Before this book, "staff engineer" was just a title to me. Larson made it concrete — what you actually do, how you set direction, why alignment matters. The Stripe and Slack stories helped.',
      },
      {
        title: 'Just Enough Software Architecture by George Fairbanks',
        url: 'https://www.georgefairbanks.com/book/',
        description:
          'Risk-driven architecture. You design proportional to what can go wrong. Stopped me from over-engineering low-stakes features and under-designing the parts that actually mattered.',
      },
      {
        title: 'The Phoenix Project by Gene Kim, Kevin Behr & George Spafford',
        url: 'https://itrevolution.com/product/the-phoenix-project/',
        description:
          'A novel about an IT disaster. Read it in two sittings. DevOps and Theory of Constraints finally clicked for me through the story, not from slides at a conference.',
      },
      {
        title: 'Designing Data-Intensive Applications by Martin Kleppmann',
        url: 'https://dataintensive.net/',
        description:
          'Frontend engineer reading a distributed systems book — sounds weird, but after this I stopped writing client code that fights the backend. Replication, partitioning, consistency models. Dense but worth it.',
      },
      {
        title: "You Don't Know JS by Kyle Simpson",
        url: 'https://github.com/getify/You-Dont-Know-JS',
        description:
          'I picked this up around 2021, three years into my career. Thought I knew JS. Was wrong. Closures, prototypes, the event loop — Kyle Simpson explains what actually happens at the engine level.',
      },
    ],
  },
  {
    id: 'engineering-blogs',
    title: 'Engineering Blogs I Actually Read',
    icon: Newspaper,
    description:
      'Six blogs I actually open. Everything else is noise.',
    items: [
      {
        title: 'The Pragmatic Engineer by Gergely Orosz',
        url: 'https://blog.pragmaticengineer.com/',
        description:
          'I check this before making career moves. Hiring trends, comp data, big tech culture from someone who was in the room at Uber.',
      },
      {
        title: 'StaffEng.com',
        url: 'https://staffeng.com/',
        description:
          'Real stories from staff engineers at Stripe, Slack, Dropbox. Not theory — how they actually spend their days.',
      },
      {
        title: 'Kent C. Dodds Blog',
        url: 'https://kentcdodds.com/blog',
        description:
          'His testing trophy replaced the testing pyramid on my team. He maintains the libraries he writes about, which is rare.',
      },
      {
        title: 'web.dev by Google',
        url: 'https://web.dev/',
        description:
          'Where we settle arguments about Core Web Vitals and accessibility at work. Source of truth for web platform stuff.',
      },
      {
        title: 'Josh W. Comeau Blog',
        url: 'https://www.joshwcomeau.com/',
        description:
          'Best CSS explanations on the internet. Interactive demos that make flexbox and grid click. I send his stuff to every dev I mentor.',
      },
      {
        title: 'Smashing Magazine',
        url: 'https://www.smashingmagazine.com/',
        description:
          'Been reading it since I started coding. Long-form front-end articles that go deeper than the average dev.to post.',
      },
    ],
  },
  {
    id: 'tools',
    title: 'Developer Tools Worth Your Time',
    icon: Wrench,
    description:
      'Not a "top 50 tools" listicle. These are the ones I actually have open right now.',
    items: [
      {
        title: 'Raycast',
        url: 'https://www.raycast.com/',
        description:
          'I uninstalled Spotlight, Alfred, and three menu bar apps the day I set this up. Clipboard history alone saves me 20 minutes a day. Pure Love ❤️',
      },
      {
        title: 'Sentry',
        url: 'https://sentry.io/',
        description:
          'Gets wired in on day one of every project. Got burned once shipping without it.',
      },
      {
        title: 'Checkly',
        url: 'https://www.checklyhq.com/',
        description:
          'Runs Playwright checks against shramko.dev on a schedule. I found out my OG images broke from a Checkly alert, not from a user complaint. That is the whole pitch.',
      },
    ],
  },
  {
    id: 'ai-tools',
    title: 'AI in My Engineering Workflow',
    icon: Sparkles,
    description: 'These are in my daily rotation, not a wishlist.',
    items: [
      {
        title: 'Claude Code',
        url: 'https://docs.anthropic.com/en/docs/claude-code',
        description:
          'Built this bookmarks page with it. Refactoring, tests, PR drafts. It reads repo structure first, which is why I trust it with real code.',
      },
      {
        title: 'OpenAI Codex',
        url: 'https://openai.com/index/openai-codex/',
        description:
          'My fallback when Claude tokens run out. GPT 5.3 on Codex Extra High is solid — async tasks, migrations, dependency upgrades. Review the diff and move on.',
      },
      {
        title: 'Claude AI',
        url: 'https://claude.ai/',
        description:
          'My rubber duck. Architecture decisions, RFC drafts, thinking through tradeoffs before bringing them to the team.',
      },
      {
        title: 'Perplexity AI',
        url: 'https://www.perplexity.ai/',
        description:
          'Replaced Google for technical searches. Finds actual docs instead of SEO spam.',
      },
    ],
  },
  {
    id: 'learning',
    title: 'Courses That Still Challenge Me',
    icon: Lightbulb,
    description:
      'Seven years in and I still take courses. The difference is what I pick now.',
    items: [
      {
        title: 'CS50: Introduction to Computer Science — Harvard',
        url: 'https://cs50.harvard.edu/x/',
        description:
          'Took this years into my career. Filled gaps in algorithms and memory that self-teaching left. Malan is the best lecturer I have seen.',
      },
      {
        title: 'Boot.dev — Backend Development Courses',
        url: 'https://www.boot.dev/',
        description:
          'Go, Python, algorithms, distributed systems. I use it to get outside my frontend bubble. Helps me talk to backend engineers without guessing.',
      },
      {
        title: 'Total TypeScript by Matt Pocock',
        url: 'https://www.totaltypescript.com/',
        description:
          'Where I finally understood generics and conditional types. The gap between "using TS" and "designing type-safe APIs" closed here.',
      },
      {
        title: 'Testing JavaScript by Kent C. Dodds',
        url: 'https://testingjavascript.com/',
        description:
          'Built our testing culture at MacPaw around this. Static analysis through E2E. I still link it when onboarding new people.',
      },
      {
        title: 'Frontend Masters',
        url: 'https://frontendmasters.com/',
        description:
          'My go-to when I need to go deep on one thing. Their TypeScript and system design workshops are particularly good.',
      },
    ],
  },
  {
    id: 'newsletters',
    title: 'Newsletters and Podcasts',
    icon: Globe,
    description: 'What actually lands in my inbox and earbuds every week.',
    items: [
      {
        title: 'The Pragmatic Engineer Newsletter',
        url: 'https://newsletter.pragmaticengineer.com/',
        description:
          'Gergely Orosz on big tech culture, comp, and hiring. I read this before making career decisions.',
      },
      {
        title: 'JavaScript Weekly',
        url: 'https://javascriptweekly.com/',
        description:
          'Every Friday. Best JS roundup out there. Subscribed since 2019, still open every issue. Some of my posts ended up here too.',
      },
      {
        title: 'Bytes.dev',
        url: 'https://bytes.dev/',
        description:
          'JS newsletter that is actually fun to read. Twice a week, never boring.',
      },
      {
        title: 'React Status',
        url: 'https://react.statuscode.com/',
        description:
          'Weekly React news. My react-rerender post got picked up here. Nice to be on both sides — reader and featured author.',
      },
      {
        title: 'Syntax.fm',
        url: 'https://syntax.fm/',
        description:
          'Wes Bos and Scott Tolinski. Good energy, real depth. I listen on the way to the gym.',
      },
      {
        title: 'The Changelog',
        url: 'https://changelog.com/',
        description:
          'Long interviews with maintainers of tools we all depend on. Context no README gives you.',
      },
    ],
  },
  {
    id: 'oss-contributions',
    title: 'Open Source Contributions',
    icon: Users,
    description:
      'Translations, mentorship, community. Arctic Code Vault Contributor, 4x Pull Shark.',
    items: [
      {
        title: 'JavaScript Testing Best Practices — Ukrainian Translation',
        url: 'https://github.com/goldbergyoni/javascript-testing-best-practices',
        description:
          'Full Ukrainian translation of the 24.6k-star testing guide. 50+ best practices without Google Translate mangling the code examples.',
      },
      {
        title: 'State of JS & State of CSS — Ukrainian Translation',
        url: 'https://stateofjs.com/en-US',
        description:
          'Official Ukrainian translator for both annual surveys. They shape how the industry tracks adoption — now accessible to Ukrainian devs.',
      },
      {
        title: 'Kottans — Mentorship Program',
        url: 'https://github.com/kottans',
        description:
          'Mentored 30+ devs. Code reviews on GitHub, 1-on-1 calls, curriculum work. Open source education for Ukrainian developers.',
      },
    ],
  },
];

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://shramko.dev/bookmarks/#collection',
  name: 'Developer Bookmarks & Open Source | Serhii Shramko',
  url: 'https://shramko.dev/bookmarks',
  description:
    'Curated developer bookmarks from a senior software engineer: open source projects, staff-level engineering books, programming blogs, developer tools, and learning resources.',
  inLanguage: 'en',
  author: {
    '@type': 'Person',
    '@id': 'https://shramko.dev/#person',
    name: 'Serhii Shramko',
    url: 'https://shramko.dev/about',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://shramko.dev/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Bookmarks',
        item: 'https://shramko.dev/bookmarks',
      },
    ],
  },
  hasPart: BOOKMARK_SECTIONS.flatMap((section) =>
    section.items.map((item) => ({
      '@type': 'WebPage',
      name: item.title,
      url: item.url,
      description: item.description,
    })),
  ),
};

function BookmarksPage() {
  return (
    <>
      <Head>
        <title>Developer Bookmarks & Open Source | Serhii Shramko</title>
        <meta
          content="Curated developer bookmarks from a senior software engineer with 7+ years of experience: open source projects, staff-level engineering books, programming blogs, tools, and resources for JavaScript, TypeScript, React, and Next.js developers."
          name="description"
          key="description"
        />
        <meta
          content="
          developer bookmarks,
          open source projects,
          staff engineer reading list,
          senior engineer resources,
          programming books,
          engineering blogs,
          developer tools,
          frontend resources,
          JavaScript books,
          React resources,
          TypeScript learning,
          web development resources,
          software engineering reading list,
          system design resources,
          tech leadership books,
          best programming books,
          coding resources,
          tech blogs,
          open source contributions"
          name="keywords"
          key="keywords"
        />
        <meta
          property="og:title"
          content="Developer Bookmarks & Open Source | Serhii Shramko"
          key="og:title"
        />
        <meta
          property="og:description"
          content="Open source projects, staff-level engineering books, tools, and resources curated by a senior software engineer with 7+ years in React, TypeScript, and Next.js."
          key="og:description"
        />
        <meta
          property="og:image"
          content="https://shramko.dev/api/og?title=Developer%20Bookmarks"
          key="og:image"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(JSON_LD),
          }}
        />
      </Head>
      <section className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Bookmarks
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mt-2 mb-8">
          Books I actually re-read, tools I have open right now, blogs that
          changed how I write code, and AI tools I use every day. Seven years of
          engineering opinions on one page.
        </p>

        <nav aria-label="Bookmark sections" className="mb-8 w-full">
          <ul className="flex flex-wrap gap-2">
            {BOOKMARK_SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:border-gray-400 hover:text-black dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white"
                >
                  <section.icon size={14} />
                  {section.title.split(' ').slice(0, 2).join(' ')}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="w-full space-y-12">
          {BOOKMARK_SECTIONS.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="flex items-center gap-2 text-xl font-bold text-black dark:text-white md:text-2xl">
                <section.icon size={22} className="text-gray-500" />
                {section.title}
              </h2>
              <p className="mt-1 mb-6 text-sm text-gray-600 dark:text-gray-400">
                {section.description}
              </p>
              <ul className="space-y-4">
                {section.items.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-lg border border-gray-200 p-4 transition-all hover:border-gray-400 hover:shadow-sm dark:border-gray-800 dark:hover:border-gray-600"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                          {item.title}
                        </h3>
                        <Bookmark
                          size={16}
                          className="mt-1 shrink-0 text-gray-400 transition-colors group-hover:text-blue-500"
                        />
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}

export default BookmarksPage;
