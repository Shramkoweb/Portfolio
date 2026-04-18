import {
  BookOpen,
  Globe,
  Lightbulb,
  Newspaper,
  Sparkles,
  Users,
  Wrench,
} from 'lucide-react';
import Head from 'next/head';

import { BookmarkSection } from '@/components/bookmark-section';
import { Tag } from '@/components/tag';

interface BookmarkItem {
  title: string;
  url: string;
  description: string;
}

interface BookmarkSection {
  id: string;
  title: string;
  navLabel: string;
  icon: React.ElementType;
  description: string;
  items: BookmarkItem[];
}

const BOOKMARK_SECTIONS: BookmarkSection[] = [
  {
    id: 'books',
    title: 'The Staff Engineer Reading List',
    navLabel: 'Reading List',
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
        title:
          'Staff Engineer: Leadership Beyond the Management Track by Will Larson',
        url: 'https://staffeng.com/book',
        description:
          'Before this book, "staff engineer" was just a title to me. Larson made it concrete — what you actually do, how you set direction, why alignment matters. The Stripe and Slack stories helped.',
      },
      {
        title: "The Staff Engineer's Path by Tanya Reilly",
        url: 'https://www.oreilly.com/library/view/the-staff-engineers/9781098118723/',
        description:
          'If Larson is the map, Reilly is the field manual. How to run projects across teams, how to think big-picture, how to actually help people grow. Less inspirational, more useful.',
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
        title: 'The Goal by Eliyahu M. Goldratt',
        url: 'https://www.amazon.com/Goal-Process-Ongoing-Improvement/dp/0884271951',
        description:
          'The book Phoenix Project is based on. Manufacturing, not software — but the bottleneck thinking applies everywhere. Read Phoenix Project first, then this to understand the theory underneath.',
      },
      {
        title: 'Designing Data-Intensive Applications by Martin Kleppmann',
        url: 'https://dataintensive.net/',
        description:
          'Frontend engineer reading a distributed systems book — sounds weird, but after this I stopped writing client code that fights the backend.',
      },
      {
        title: "You Don't Know JS by Kyle Simpson",
        url: 'https://github.com/getify/You-Dont-Know-JS',
        description:
          'I picked this up around 2021, three years into my career. Thought I knew JS. Was wrong. Closures, prototypes, the event loop — Kyle Simpson explains what actually happens at the engine level.',
      },
      {
        title: 'Code by Charles Petzold',
        url: 'https://www.amazon.com/Code-Language-Computer-Hardware-Software/dp/0137909101',
        description:
          'Starts with flashlights and Morse code, ends with you understanding how a CPU works. Pairs well with CS50.',
      },
    ],
  },
  {
    id: 'engineering-blogs',
    title: 'Engineering Blogs I Actually Read',
    navLabel: 'Engineering Blogs',
    icon: Newspaper,
    description: 'Blogs I actually open. Everything else is noise.',
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
        title: 'web.dev by Google',
        url: 'https://web.dev/',
        description:
          'Where we settle arguments about Core Web Vitals and accessibility at work. Source of truth for web platform stuff.',
      },
      {
        title: '2ality by Dr. Axel Rauschmayer',
        url: 'https://2ality.com/',
        description:
          'Deep JS and TC39 proposals explained clearly. When a new ECMAScript feature drops, Axel has the best writeup before anyone else.',
      },
      {
        title: 'Joel on Software',
        url: 'https://www.joelonsoftware.com/',
        description:
          'Joel Spolsky co-founded Stack Overflow and Trello. His old posts on hiring, specs, and the Joel Test aged better than most software books. Still relevant 20 years later.',
      },
      {
        title: 'Smashing Magazine',
        url: 'https://www.smashingmagazine.com/',
        description:
          'Been reading it since I started coding. Long-form front-end articles that go deeper than the average dev.to post.',
      },
      {
        title: 'Josh W. Comeau Blog',
        url: 'https://www.joshwcomeau.com/',
        description:
          'Best CSS explanations on the internet. Interactive demos that make flexbox and grid click. I send his stuff to every dev I mentor.',
      },
    ],
  },
  {
    id: 'tools',
    title: 'Developer Tools Worth Your Time',
    navLabel: 'Developer Tools',
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
        title: 'NotePlan',
        url: 'https://noteplan.co/',
        description:
          'Daily planner for standups, idea backlog for side projects, and my brag doc for performance reviews. Markdown + calendar + tasks in one app.',
      },
      {
        title: 'PhpStorm',
        url: 'https://www.jetbrains.com/phpstorm/',
        description:
          'I love WebStorm, but PhpStorm gives me built-in database tools like DataGrip. One IDE for code and DB queries. Worth it for that alone.',
      },
      {
        title: 'Cursor',
        url: 'https://cursor.com/',
        description:
          'VS Code fork with AI baked in. I switch between this and PhpStorm depending on the project. Good for quick edits and AI-assisted prototyping.',
      },
      {
        title: 'f.lux',
        url: 'https://justgetflux.com/',
        description:
          'Warms the screen color at night. Small thing, but my eyes stopped hurting after late coding sessions.',
      },
    ],
  },
  {
    id: 'ai-tools',
    title: 'AI in My Engineering Workflow',
    navLabel: 'AI Tools',
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
          'My fallback when Claude tokens run out. GPT 5.3 on Codex Extra High is solid.',
      },
      {
        title: 'OpenCode',
        url: 'https://opencode.ai/',
        description:
          'Open-source alternative to Claude Code. I keep it around for when I want to swap models mid-task or just need a lighter CLI. Works well with Qwen and GLM-5 — handy if you want to test cheaper models on real tasks.',
      },
      {
        title: 'Claude AI',
        url: 'https://claude.ai/',
        description:
          'My rubber duck 🦆. Architecture decisions, RFC drafts, thinking through tradeoffs before bringing them to the team.',
      },
      {
        title: 'Perplexity AI',
        url: 'https://www.perplexity.ai/',
        description: 'Replaced Google for technical and daily searches.',
      },
      {
        title: 'LMArena Leaderboard',
        url: 'https://arena.ai/leaderboard',
        description:
          'How I pick which model to use. Blind Elo rankings from real users, not marketing benchmarks.',
      },
    ],
  },
  {
    id: 'learning',
    title: 'Courses That Still Challenge Me',
    navLabel: 'Courses',
    icon: Lightbulb,
    description:
      'Seven years in and I still take courses. The syllabus just got weirder.',
    items: [
      {
        title: 'CS50: Introduction to Computer Science — Harvard',
        url: 'https://cs50.harvard.edu/x/',
        description:
          'Took this years into my career. Filled gaps in algorithms and memory that self-teaching left. Malan is the best lecturer I have seen.',
      },
      {
        title: 'Frontend Masters',
        url: 'https://frontendmasters.com/',
        description:
          'My go-to when I need to go deep on one thing. Their TypeScript and system design workshops are particularly good.',
      },
      {
        title: 'Boot.dev — Backend Development Courses',
        url: 'https://www.boot.dev/?bannerlord=shramko',
        description:
          'Go, Python, algorithms, distributed systems. I use it to get outside my frontend bubble. Helps me talk to backend engineers without guessing.',
      },
      {
        title: 'iximiuz Labs',
        url: 'https://labs.iximiuz.com/',
        description:
          'Hands-on container, networking, and Linux labs. The kind of infra knowledge that makes you dangerous in a good way during incident calls.',
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
    ],
  },
  {
    id: 'newsletters',
    title: 'Newsletters and Podcasts',
    navLabel: 'Newsletters & Podcasts',
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
        title: 'JavaScript Weekly',
        url: 'https://javascriptweekly.com/',
        description:
          'Every Friday. Best JS roundup out there. Subscribed since 2019, still open every issue. Some of my posts ended up here too.',
      },
      {
        title: 'Bytes.dev',
        url: 'https://bytes.dev/',
        description:
          'JS newsletter that is actually fun to read. Never boring.',
      },
    ],
  },
  {
    id: 'oss-contributions',
    title: 'Open Source Contributions',
    navLabel: 'Open Source',
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
    ],
  },
];

let position = 0;

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://shramko.dev/bookmarks/#collection',
  name: 'Developer Bookmarks & Open Source | Serhii Shramko',
  url: 'https://shramko.dev/bookmarks',
  description:
    'Curated developer bookmarks from a senior software engineer: open source projects, staff-level engineering books, programming blogs, developer tools, and learning resources.',
  inLanguage: 'en',
  datePublished: '2026-04-12',
  dateModified: '2026-04-12',
  author: {
    '@type': 'Person',
    '@id': 'https://shramko.dev/#person',
    name: 'Serhii Shramko',
    url: 'https://shramko.dev/about',
  },
  isPartOf: {
    '@type': 'WebSite',
    '@id': 'https://shramko.dev/#website',
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
  mainEntity: {
    '@type': 'ItemList',
    name: 'Developer Bookmarks',
    numberOfItems: BOOKMARK_SECTIONS.reduce(
      (sum, s) => sum + s.items.length,
      0,
    ),
    itemListElement: BOOKMARK_SECTIONS.flatMap((section) =>
      section.items.map((item) => ({
        '@type': 'ListItem',
        position: ++position,
        name: item.title,
        url: item.url,
        description: item.description,
      })),
    ),
  },
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
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400">
            Books I actually re-read, tools I have open right now, blogs that
            changed how I write code, and AI tools I use every day. Seven years
            of engineering opinions on one page.
          </p>
        </div>

        <nav aria-label="Bookmark sections" className="mb-10 w-full">
          <ul className="flex flex-wrap gap-2 text-gray-600 dark:text-gray-400">
            {BOOKMARK_SECTIONS.map((section) => (
              <li key={section.id}>
                <Tag label={section.navLabel} href={`#${section.id}`} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="w-full space-y-16">
          {BOOKMARK_SECTIONS.map((section) => (
            <BookmarkSection
              key={section.id}
              id={section.id}
              title={section.title}
              icon={section.icon}
              description={section.description}
              items={section.items}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default BookmarksPage;
