import Head from 'next/head';

import { ResourceCard } from '@/components/resource-card';

interface LearningItem {
  title: string;
  url?: string;
  author?: string;
  description?: string;
}

const LEARNING_ITEMS: LearningItem[] = [
  {
    title: 'The Tao of Node',
    url: 'https://www.taoofnode.com/',
    author: 'Alex Kondov',
  },
  {
    title: 'Eloquent JavaScript',
    url: 'https://eloquentjavascript.net/',
    author: 'Marijn Haverbeke',
  },
  {
    title: "The Software Engineer's Guidebook",
    url: 'https://www.amazon.de/dp/908338182X',
    author: 'Gergely Orosz',
  },
  {
    title: 'Computer Networking: A Top-Down Approach',
    url: 'https://www.amazon.de/-/en/James-F-Kurose/dp/0132856204',
    author: 'James Kurose & Keith Ross',
  },
  {
    title: 'Staff Engineer',
    url: 'https://www.amazon.de/-/en/Will-Larson-ebook/dp/B08RMSHYGG',
    author: 'Will Larson',
  },
  {
    title: "System Design Interview: An Insider's Guide",
    url: 'https://www.amazon.de/-/en/Alex-Xu/dp/B08CMF2CQF',
    author: 'Alex Xu',
  },
  {
    title: 'Grokking Simplicity',
    url: 'https://www.amazon.de/-/en/Eric-Normand/dp/1617296201',
    author: 'Eric Normand',
  },
  {
    title: 'Programming TypeScript',
    url: 'https://www.amazon.de/-/en/Boris-Cherny/dp/1492037656',
    author: 'Boris Cherny',
  },
  {
    title: 'Learning Patterns',
    url: 'https://www.patterns.dev/',
    author: 'Lydia Hallie & Addy Osmani',
  },
  {
    title: 'High Performance Browser Networking',
    url: 'https://hpbn.co',
    author: 'Ilya Grigorik',
  },
  {
    title: 'The Tech Resume Inside Out',
    url: 'https://thetechresume.com',
    author: 'Gergely Orosz',
  },
  {
    title: 'Mostly Adequate Guide to Functional Programming',
    url: 'https://mostly-adequate.gitbook.io/mostly-adequate-guide',
    author: 'Brian Lonsdorf',
  },
  {
    title: 'NestJS Fundamentals Course',
    url: 'https://courses.nestjs.com',
    author: 'Kamil Mysliwiec & Mark Pieszak',
  },
  {
    title: 'The Phoenix Project',
    url: 'https://www.amazon.com/Phoenix-Project-DevOps-Helping-Business/dp/0988262592',
    author: 'Gene Kim et al.',
  },
  {
    title: 'The Coding Career Handbook',
    url: 'https://www.learninpublic.org/#buy',
    author: 'Shawn Wang',
  },
  {
    title: 'Svelte Tutorial',
    url: 'https://svelte.dev/tutorial/basics',
    author: 'Rich Harris',
  },
  {
    title: 'Just JavaScript',
    url: 'https://justjavascript.com',
    author: 'Dan Abramov',
  },
  {
    title: 'Dive into Refactoring',
    url: 'https://refactoring.guru/refactoring/course',
    author: 'Alexander Shvetz',
  },
  {
    title: 'Clean Coder',
    url: 'https://www.amazon.com/Clean-Coder-Conduct-Professional-Programmers/dp/0137081073',
    author: 'Robert C. Martin',
  },
  {
    title: 'TypeScript Deep Dive',
    url: 'https://basarat.gitbook.io/typescript',
    author: 'Basarat Syed',
  },
  {
    title: 'Full Stack Fundamentals',
    url: 'https://frontendmasters.com/courses/fullstack-v3/',
  },
  {
    title: 'Pure React',
    url: 'https://daveceddia.com/pure-react',
    author: 'Dave Ceddia',
  },
  {
    title: 'The Road to Learn React',
    url: 'https://www.robinwieruch.de/the-road-to-learn-react',
    author: 'Robin Wieruch',
  },
  {
    title: "You Don't Know JS",
    url: 'https://github.com/getify/You-Dont-Know-JS',
    author: 'Kyle Simpson',
  },
  {
    title: 'CS50 Introduction to Computer Science',
    url: 'https://www.edx.org/course/cs50s-introduction-to-computer-science',
    author: 'Harvard University',
  },
  {
    title: 'Intermediate React Native, v2',
    url: 'https://frontendmasters.com/courses/intermediate-react-native-v2/',
    author: 'Kadi Kraman',
  },
  {
    title: 'React Native, v3',
    url: 'https://frontendmasters.com/courses/react-native-v3/',
    author: 'Kadi Kraman',
  },
  {
    title: 'Introduction to Dev Tools, v3',
    url: 'https://frontendmasters.com/courses/dev-tools/',
    author: 'Jon Kuperman',
  },
  {
    title: 'Intermediate React, v5',
    url: 'https://frontendmasters.com/courses/intermediate-react-v5/',
    author: 'Brian Holt',
  },
  {
    title: 'Complete Intro to React, v8',
    url: 'https://frontendmasters.com/courses/complete-react-v8/',
    author: 'Brian Holt',
  },
  {
    title: 'JavaScript: The Hard Parts, v2',
    url: 'https://frontendmasters.com/courses/javascript-hard-parts-v2/',
    author: 'Will Sentance',
  },
  {
    title: 'Getting a Software Engineering Job, v3',
    url: 'https://frontendmasters.com/courses/getting-a-job-v3/',
    author: 'Jerome Hardaway',
  },
  {
    title: 'Modern Search Engine Optimization (SEO)',
    url: 'https://frontendmasters.com/courses/modern-seo/',
    author: 'Mike North',
  },
  {
    title: 'Introduction to Next.js',
    url: 'https://frontendmasters.com/courses/next-js-v3/',
    author: 'Scott Moss',
  },
  {
    title: 'Tao of React',
    url: 'https://www.taoofreact.com/',
    author: 'Alex Kondov',
  },
  {
    title: "The Imposter's Handbook, Season 2",
    url: 'https://bigmachine.io/products/the-imposters-handbook/',
    author: 'Rob Conery',
  },
  {
    title: 'Naming Things',
    url: 'https://www.namingthings.co/',
    author: 'Tom Benner',
  },
  {
    title: "The Engineer's Survival Guide",
    url: 'https://www.engineerssurvivalguide.com/',
    author: 'Merih Taze',
  },
  {
    title: 'Domain-Driven Design',
    url: 'https://www.domainlanguage.com/ddd/',
    author: 'Eric Evans',
  },
  {
    title: 'Building Evolutionary Architectures',
    url: 'https://evolutionaryarchitecture.com/',
    author: 'Neal Ford',
  },
  {
    title: 'Make',
    url: 'https://readmake.com/',
    author: 'Pieter Levels',
  },
  {
    title: 'TypeScript in 50 Lessons',
    url: 'https://typescript-book.com/',
    author: 'Stefan Baumgartner',
  },
  {
    title: 'The SaaS Playbook',
    url: 'https://saasplaybook.com/',
    author: 'Rob Walling',
  },
  {
    title: 'Total TypeScript',
    url: 'https://www.totaltypescript.com/',
    author: 'Matt Pocock',
  },
  {
    title: 'Software Engineering at Google',
    url: 'https://abseil.io/resources/swe-book',
    author: 'Titus Winters et al.',
  },
  {
    title: 'Designing Data-Intensive Applications',
    url: 'https://dataintensive.net/',
    author: 'Martin Kleppmann',
  },
];

function LearningPage() {
  return (
    <>
      <Head>
        <title>Learning | Serhii Shramko</title>
        <meta
          content="A chronological record of books, courses, and projects I've learned from over the years."
          name="description"
          key="description"
        />
        <meta
          content="learning, books, courses, tutorials, education, self-improvement, programming, development"
          name="keywords"
          key="keywords"
        />
        <meta
          property="og:title"
          content="Learning | Serhii Shramko"
          key="og:title"
        />
        <meta
          property="og:description"
          content="A chronological record of books, courses, and projects I've learned from over the years."
          key="og:description"
        />
        <meta
          property="og:image"
          content="https://shramko.dev/api/og?title=Learning"
          key="og:image"
        />
      </Head>
      <section className="flex flex-col justify-center items-start max-w-3xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Learning
        </h1>
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400">
            Books, courses and projects I have learned from. WORK IN PROGRESS 🤣
          </p>
        </div>

        <ul className="w-full space-y-3">
          {LEARNING_ITEMS.map((item) => (
            <ResourceCard
              key={item.title}
              title={
                item.author ? `${item.title} · ${item.author}` : item.title
              }
              url={item.url}
              description={item.description}
            />
          ))}
        </ul>
      </section>
    </>
  );
}

export default LearningPage;
