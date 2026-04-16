import Head from 'next/head';
import { GraduationCap, Sparkles } from 'lucide-react';

import { BookmarkNav } from '@/components/bookmark-nav';
import { BookmarkSection } from '@/components/bookmark-section';

interface LearningItem {
  title: string;
  url?: string;
  author?: string;
  date: string;
  description?: string;
}

interface LearningSection {
  id: string;
  title: string;
  navLabel: string;
  icon: React.ElementType;
  description?: string;
  items: LearningItem[];
}

const LEARNING_SECTIONS: LearningSection[] = [
  {
    id: '2026',
    title: '2026',
    navLabel: '2026',
    icon: Sparkles,
    description: 'Current year of learning',
    items: [
      {
        title: 'lisette',
        url: 'https://github.com/ivov/lisette',
        author: 'Iván Ovejero',
        date: 'March 2026',
        description: 'A little language inspired by Rust that compiles to Go',
      },
      {
        title: 'Write a Compiler That Understands Types',
        url: 'https://frontendmasters.com/courses/type-compiler/',
        author: 'Richard Feldman',
        date: 'February 2026',
      },
      {
        title: 'PostgreSQL Internals Course',
        url: 'https://github.com/Iamanshuaditya/postgresql-deep-dive',
        author: 'Anshu Aditya',
        date: 'January 2026',
      },
    ],
  },
  {
    id: '2025',
    title: '2025',
    navLabel: '2025',
    icon: GraduationCap,
    items: [
      {
        title: 'From Day Zero to Zero Day',
        url: 'https://nostarch.com/zero-day',
        author: 'Eugene Lim',
        date: 'December 2025',
      },
      {
        title: 'Gist of Go Concurrency',
        url: 'https://antonz.org/go-concurrency/',
        author: 'Anton Zhiyanov',
        date: 'November 2025',
      },
      {
        title: 'Latency',
        url: 'https://www.manning.com/books/latency',
        author: 'Pekka Enberg',
        date: 'November 2025',
      },
      {
        title: 'WebAssembly from the Ground Up',
        url: 'https://wasmgroundup.com/',
        author: 'Mariano Guerra and Patrick Dubroy',
        date: 'August 2025',
      },
      {
        title: 'Distributed Services with Go',
        url: 'https://www.amazon.de/-/en/Distributed-Services-Go-Reliable-Maintainable/dp/1680507605',
        author: 'Travis Jeffery',
        date: 'June 2025',
      },
      {
        title: 'n8n-tracer',
        url: 'https://github.com/ivov/n8n-tracer',
        author: 'Iván Ovejero',
        date: 'June 2025',
        description: 'Construct OpenTelemetry traces from n8n event logs',
      },
      {
        title: 'n8n-nodewriter',
        url: 'https://github.com/ivov/n8n-nodewriter',
        author: 'Iván Ovejero',
        date: 'April 2025',
        description: 'Generate n8n nodes from OpenAPI specs',
      },
      {
        title: 'Think Distributed Systems',
        url: 'https://www.manning.com/books/think-distributed-systems',
        author: 'Dominik Tornow',
        date: 'March 2025',
      },
      {
        title: 'n8n-deploy-starter',
        url: 'https://github.com/ivov/n8n-deploy-starter',
        author: 'Iván Ovejero',
        date: 'March 2025',
        description: 'Toolkit for deploying n8n to a cloud provider',
      },
      {
        title: 'PostgreSQL Mistakes and How to Avoid Them',
        url: 'https://www.manning.com/books/postgresql-mistakes-and-how-to-avoid-them',
        author: 'Jimmy Angelakos',
        date: 'February 2025',
      },
      {
        title: 'Grokking Relational Database Design',
        url: 'https://www.manning.com/books/grokking-relational-database-design',
        author: 'Qiang Hao and Michail Tsikerdekis',
        date: 'February 2025',
      },
      {
        title: 'Build Your Own Redis with C',
        url: 'https://build-your-own.org/redis/',
        author: 'James Smith',
        date: 'February 2025',
      },
      {
        title: 'C Programming Fundamentals',
        url: 'https://lowlevel.academy/courses/zero2hero',
        author: 'Low Level Academy',
        date: 'February 2025',
      },
    ],
  },
  {
    id: '2024',
    title: '2024',
    navLabel: '2024',
    icon: GraduationCap,
    items: [
      {
        title: 'Mastering Postgres',
        url: 'https://www.masteringpostgres.com/',
        author: 'Aaron Francis',
        date: 'November 2024',
      },
      {
        title: 'Database Internals',
        url: 'https://www.databass.dev/',
        author: 'Alex Petrov',
        date: 'October 2024',
      },
      {
        title: 'n8n-shortlink',
        url: 'https://github.com/ivov/n8n-shortlink',
        author: 'Iván Ovejero',
        date: 'August 2024',
        description: 'Create and resolve shortlinks for n8n workflows',
      },
      {
        title: 'Managing AWS Resources with Terraform',
        url: 'https://www.ardanlabs.com/live-training-events/managing-aws-resources-with-terraform.html',
        author: 'Michael Bright',
        date: 'August 2024',
      },
      {
        title: 'Deployment from Scratch',
        url: 'https://deploymentfromscratch.com/',
        author: 'Joseph Strzibny',
        date: 'July 2024',
      },
      {
        title: 'High-Performance SQLite',
        url: 'https://highperformancesqlite.com',
        author: 'Aaron Francis',
        date: 'June 2024',
      },
      {
        title: 'Learning Go',
        url: 'https://www.amazon.de/-/en/Jon-Bodner/dp/1098139291',
        author: 'Jon Bodner',
        date: 'May 2024',
      },
      {
        title: "The Engineering Executive's Primer",
        url: 'https://www.amazon.de/Engineering-Executives-Primer-Impactful-Leadership/dp/1098149483',
        author: 'Will Larson',
        date: 'May 2024',
      },
      {
        title: 'Eloquent JavaScript',
        url: 'https://eloquentjavascript.net/',
        author: 'Marijn Haverbeke',
        date: 'March 2024',
      },
      {
        title: 'Crafting Interpreters',
        url: 'https://craftinginterpreters.com/',
        author: 'Robert Nystrom',
        date: 'February 2024',
      },
      {
        title: 'The Joy of JavaScript',
        url: 'https://www.manning.com/books/the-joy-of-javascript',
        author: 'Luis Atencio',
        date: 'February 2024',
      },
      {
        title: 'The DNS course for developers',
        url: 'https://www.nslookup.io/dns-course/',
        author: 'Ruurtjan Pul',
        date: 'January 2024',
      },
      {
        title: 'The Tao of Node',
        url: 'https://www.taoofnode.com/',
        author: 'Alex Kondov',
        date: 'January 2024',
      },
      {
        title: 'Understanding Node.js: Core Concepts',
        url: 'https://www.udemy.com/course/understanding-nodejs-core-concepts',
        author: 'Joseph Heidari',
        date: 'January 2024',
      },
    ],
  },
  {
    id: '2023',
    title: '2023',
    navLabel: '2023',
    icon: GraduationCap,
    items: [
      {
        title: 'Indexing Beyond the Basics',
        url: 'https://sqlfordevs.com/ebooks/indexing',
        author: 'Tobias Petry',
        date: 'December 2023',
      },
      {
        title: "The Software Engineer's Guidebook",
        url: 'https://www.amazon.de/dp/908338182X',
        author: 'Gergely Orosz',
        date: 'November 2023',
      },
      {
        title: 'Foundations of Scalable Systems',
        url: 'https://www.amazon.com/Foundations-Scalable-Systems-Distributed-Architectures/dp/1098106067',
        author: 'Ian Gorton',
        date: 'November 2023',
      },
      {
        title: 'Rust for Rustaceans',
        url: 'https://www.amazon.de/-/en/Jon-Gjengset-ebook/dp/B0957SWKBS',
        author: 'Jon Gjengset',
        date: 'October 2023',
      },
      {
        title: 'Zero to Production in Rust',
        url: 'https://www.amazon.com/Zero-Production-Rust-introduction-development/dp/B0BHLDMFDQ',
        author: 'Luca Palmieri',
        date: 'October 2023',
      },
      {
        title: 'The Good Parts of AWS',
        url: 'https://dvassallo.gumroad.com/l/aws-good-parts',
        author: 'Daniel Vassallo and Josh Pschorr',
        date: 'September 2023',
      },
      {
        title: 'API Security in Action',
        url: 'https://www.amazon.de/-/en/Neil-Madden/dp/1617296023',
        author: 'Neil Madden',
        date: 'August 2023',
      },
      {
        title: 'Polyglot Programming: Go, Rust & TypeScript',
        url: 'https://frontendmasters.com/courses/typescript-go-rust/',
        author: 'ThePrimeagen',
        date: 'August 2023',
      },
      {
        title: 'Software Engineering at Google',
        url: 'https://www.amazon.de/-/en/Titus-Winters/dp/1492082791',
        author: 'Titus Winters et al.',
        date: 'August 2023',
      },
      {
        title: 'Docker for Node.js Projects',
        url: 'https://www.udemy.com/course/docker-mastery-for-nodejs/',
        author: 'Bret Fisher',
        date: 'July 2023',
      },
      {
        title: 'Docker Mastery with Kubernetes + Swarm',
        url: 'https://www.udemy.com/course/docker-mastery',
        author: 'Bret Fisher',
        date: 'July 2023',
      },
      {
        title: 'The Hard Parts of UI Development',
        url: 'https://frontendmasters.com/courses/hard-parts-ui-dev',
        author: 'Will Sentance',
        date: 'July 2023',
      },
      {
        title: 'Total TypeScript',
        url: 'https://www.totaltypescript.com',
        author: 'Matt Pocock',
        date: 'July 2023',
      },
      {
        title: 'Designing Data-Intensive Applications',
        url: 'https://www.amazon.de/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321',
        author: 'Martin Kleppmann',
        date: 'June 2023',
      },
      {
        title: 'Rust in Action',
        url: 'https://www.amazon.de/-/en/Tim-Mcnamara/dp/1617294551',
        author: 'Tim McNamara',
        date: 'May 2023',
      },
      {
        title: 'JavaScript: The Advanced Concepts',
        url: 'https://www.udemy.com/course/advanced-javascript-concepts',
        author: 'Andrei Neagoie',
        date: 'May 2023',
      },
      {
        title: 'n8n-utils',
        url: 'https://github.com/ivov/n8n-utils',
        author: 'Iván Ovejero',
        date: 'April 2023',
        description: 'VSCode extension with utilities for n8n development',
      },
      {
        title: '100 Go Mistakes and How to Avoid Them',
        url: 'https://www.amazon.de/100-Mistakes-How-Avoid-Them/dp/1617299596',
        author: 'Teiva Harsanyi',
        date: 'April 2023',
      },
      {
        title: 'Hands-On Rust',
        url: 'https://www.amazon.de/-/en/Herbert-Wolverson/dp/1680508164',
        author: 'Herbert Wolverson',
        date: 'April 2023',
      },
      {
        title: "Let's Go Further",
        url: 'https://lets-go-further.alexedwards.net',
        author: 'Alex Edwards',
        date: 'February 2023',
      },
      {
        title: 'Web Development with Go',
        url: 'https://www.usegolang.com',
        author: 'Jon Calhoun',
        date: 'February 2023',
      },
      {
        title: 'Dependency Injection',
        url: 'https://www.amazon.de/-/en/Mark-Seemann/dp/161729473X',
        author: 'Mark Seemann & Steven van Deursen',
        date: 'January 2023',
      },
      {
        title: 'Composing Software',
        url: 'https://www.amazon.de/-/en/Eric-Elliott/dp/1661212565',
        author: 'Eric Elliot',
        date: 'January 2023',
      },
    ],
  },
  {
    id: '2022',
    title: '2022',
    navLabel: '2022',
    icon: GraduationCap,
    items: [
      {
        title: 'Computer Networking: A Top-Down Approach',
        url: 'https://www.amazon.de/-/en/James-F-Kurose/dp/0132856204',
        author: 'James Kurose & Keith Ross',
        date: 'November 2022',
      },
      {
        title: 'Ultimate Go',
        url: 'https://www.ardanlabs.com/training/ultimate-go/',
        author: 'Bill Kennedy',
        date: 'October 2022',
      },
      {
        title: 'Ultimate Docker',
        url: 'https://www.ardanlabs.com/training/intensive-docker-kubernetes/',
        author: 'Jérôme Petazzoni',
        date: 'October 2022',
      },
      {
        title: "Let's Go",
        url: 'https://lets-go.alexedwards.net/',
        author: 'Alex Edwards',
        date: 'September 2022',
      },
      {
        title: 'Staff Engineer',
        url: 'https://www.amazon.de/-/en/Will-Larson-ebook/dp/B08RMSHYGG',
        author: 'Will Larson',
        date: 'July 2022',
      },
      {
        title: 'AWS Certified Solutions Architect Associate',
        url: 'https://acloudguru.com/course/aws-certified-solutions-architect-associate-saa-c02',
        author: 'Ryan Kroonenburg',
        date: 'July 2022',
      },
      {
        title: 'Code: The Hidden Language of Computer Hardware and Software',
        url: 'https://www.amazon.de/-/en/Charles-Petzold/dp/0735611319',
        author: 'Charles Petzold',
        date: 'June 2022',
      },
      {
        title: "System Design Interview: An Insider's Guide",
        url: 'https://www.amazon.de/-/en/Alex-Xu/dp/B08CMF2CQF',
        author: 'Alex Xu',
        date: 'June 2022',
      },
      {
        title: 'Writing an Interpreter in Go',
        url: 'https://interpreterbook.com/',
        author: 'Thorsten Ball',
        date: 'May 2022',
      },
      {
        title: 'Bash Mastery',
        url: 'https://www.udemy.com/course/bash-mastery/',
        author: 'Ziyad Yehia',
        date: 'May 2022',
      },
      {
        title: 'Linux Mastery',
        url: 'https://www.udemy.com/course/linux-mastery/',
        author: 'Ziyad Yehia',
        date: 'May 2022',
      },
      {
        title: 'eslint-plugin-n8n-nodes-base',
        url: 'https://github.com/ivov/eslint-plugin-n8n-nodes-base',
        author: 'Iván Ovejero',
        date: 'April 2022',
        description: 'ESLint plugin for linting n8n nodes',
      },
      {
        title: 'Functional Programming in JavaScript',
        url: 'https://www.amazon.com/Functional-Programming-JavaScript-React-Book-ebook/dp/B08CZZ4FQQ',
        author: 'Cristian Salcescu',
        date: 'April 2022',
      },
      {
        title: "The Programmer's Brain",
        url: 'https://www.amazon.de/-/en/Felienne-Hermans/dp/1617298670',
        author: 'Felienne Hermans',
        date: 'April 2022',
      },
      {
        title: 'Grokking Simplicity',
        url: 'https://www.amazon.de/-/en/Eric-Normand/dp/1617296201',
        author: 'Eric Normand',
        date: 'March 2022',
      },
      {
        title:
          'Learning to Reason: An Introduction to Logic, Sets, and Relations',
        url: 'https://www.amazon.de/-/en/Nancy-Rodgers/dp/047137122X',
        author: 'Nancy Rodgers',
        date: 'March 2022',
      },
      {
        title: 'Discrete Mathematics and its Applications',
        url: 'https://www.amazon.de/-/en/Susanna-S-Epp/dp/0495391328',
        author: 'Susanna S. Epp',
        date: 'March 2022',
      },
      {
        title: 'Programming TypeScript',
        url: 'https://www.amazon.de/-/en/Boris-Cherny/dp/1492037656',
        author: 'Boris Cherny',
        date: 'February 2022',
      },
      {
        title: 'Seven Databases in Seven Weeks',
        url: 'https://www.amazon.com/Seven-Databases-Weeks-Modern-Movement/dp/1934356921',
        author: 'Eric Redmond & Jim R. Wilson',
        date: 'February 2022',
      },
      {
        title: 'Engines of Logic',
        url: 'https://www.amazon.de/Engines-Logic-Mathematicians-Origin-Computer/dp/0393322297',
        author: 'Martin Davis',
        date: 'February 2022',
      },
      {
        title: 'Data Structures & Algorithms in JavaScript',
        url: 'https://www.udemy.com/course/data-structures-algorithms-javascript/',
        author: 'Scott Barrett',
        date: 'January 2022',
      },
      {
        title: 'The Go Programming Language',
        url: 'https://www.gopl.io/',
        author: 'Alan Donovan & Brian Kernighan',
        date: 'January 2022',
      },
      {
        title: 'Learning the Bash Shell',
        url: 'https://www.amazon.com/Learning-bash-Shell-Cameron-Newham/dp/1565923472',
        author: 'Cameron Newham & Bill Rosenblatt',
        date: 'January 2022',
      },
    ],
  },
  {
    id: '2021',
    title: '2021',
    navLabel: '2021',
    icon: GraduationCap,
    items: [
      {
        title: 'Learning Patterns',
        url: 'https://www.patterns.dev/',
        author: 'Lydia Hallie & Addy Osmani',
        date: 'December 2021',
      },
      {
        title: 'CSS Demystified',
        url: 'https://cssdemystified.com/',
        author: 'Kevin Powell',
        date: 'December 2021',
      },
      {
        title: 'An Elegant Puzzle: Systems of Engineering Management',
        url: 'https://www.amazon.de/-/en/Will-Larson/dp/1732265186',
        author: 'Will Larson',
        date: 'December 2021',
      },
      {
        title: 'CSS for JavaScript Developers',
        url: 'https://css-for-js.dev',
        author: 'Josh Comeau',
        date: 'December 2021',
      },
      {
        title: 'Mastering Vuex',
        url: 'https://www.vuemastery.com/courses/mastering-vuex',
        author: 'Vue Mastery',
        date: 'November 2021',
      },
      {
        title: 'High Performance Browser Networking',
        url: 'https://hpbn.co',
        author: 'Ilya Grigorik',
        date: 'November 2021',
      },
      {
        title: 'Programming Rust',
        url: 'https://www.amazon.de/-/en/Jim-Blandy/dp/1491927283',
        author: 'Jim Blandy & Jason Orendorff',
        date: 'October 2021',
      },
      {
        title: 'The Rust Programming Language',
        url: 'https://doc.rust-lang.org/book',
        author: 'Carol Nichols',
        date: 'October 2021',
      },
      {
        title: 'The Tech Resume Inside Out',
        url: 'https://thetechresume.com',
        author: 'Gergely Orosz',
        date: 'September 2021',
      },
      {
        title: 'Pragmatic Thinking and Learning',
        url: 'https://pragprog.com/titles/ahptl/pragmatic-thinking-and-learning',
        author: 'Andrew Hunt',
        date: 'August 2021',
      },
      {
        title: 'Ultimate Rust Crash Course',
        url: 'https://www.udemy.com/course/ultimate-rust-crash-course',
        author: 'Nathan Stocks',
        date: 'July 2021',
      },
      {
        title: 'Build Web Apps with Vue 3 & Firebase',
        url: 'https://www.udemy.com/course/build-web-apps-with-vuejs-firebase',
        author: 'Shaun Pelling',
        date: 'May 2021',
      },
      {
        title: 'Ultimate HTML & CSS course - Part 2',
        url: 'https://codewithmosh.com/p/the-ultimate-html-css-part2',
        author: 'Mosh Hamedani',
        date: 'April 2021',
      },
      {
        title: 'Ultimate HTML & CSS course - Part 1',
        url: 'https://codewithmosh.com/p/the-ultimate-html-css-part1',
        author: 'Mosh Hamedani',
        date: 'April 2021',
      },
      {
        title: 'Ultimate Docker Course',
        url: 'https://codewithmosh.com/p/the-ultimate-docker-course',
        author: 'Mosh Hamedani',
        date: 'April 2021',
      },
      {
        title: 'NestJS Zero to Hero',
        url: 'https://www.udemy.com/course/nestjs-zero-to-hero',
        author: 'Ariel Weinberger',
        date: 'April 2021',
      },
      {
        title: 'Functional JavaScript Libraries Playbook',
        url: 'https://www.pluralsight.com/library/courses/functional-javascript-libraries-playbook',
        author: 'David Mann',
        date: 'April 2021',
      },
      {
        title: 'Mostly Adequate Guide to Functional Programming',
        url: 'https://mostly-adequate.gitbook.io/mostly-adequate-guide',
        author: 'Brian Lonsdorf',
        date: 'March 2021',
      },
      {
        title: 'Functional Light JS',
        url: 'https://github.com/getify/Functional-Light-JS',
        author: 'Kyle Simpson',
        date: 'March 2021',
      },
      {
        title: 'Mastering Ethereum',
        url: 'https://github.com/ethereumbook/ethereumbook',
        author: 'Andreas Antonopoulos',
        date: 'March 2021',
      },
      {
        title: 'NestJS Fundamentals Course',
        url: 'https://courses.nestjs.com',
        author: 'Kamil Mysliwiec & Mark Pieszak',
        date: 'January 2021',
      },
    ],
  },
  {
    id: '2020',
    title: '2020',
    navLabel: '2020',
    icon: GraduationCap,
    items: [
      {
        title: 'Functional Programming in JavaScript',
        url: 'https://www.amazon.com/Functional-Programming-JavaScript-functional-techniques/dp/1617292826',
        author: 'Luis Atencio',
        date: 'December 2020',
      },
      {
        title: 'GraphQL for Beginners with JavaScript',
        url: 'https://www.udemy.com/course/graphql-for-beginners-with-javascript',
        author: 'James Moore',
        date: 'December 2020',
      },
      {
        title: 'Fullstack GraphQL',
        url: 'https://www.newline.co/fullstack-graphql',
        author: 'Gaetano Checinski & Roy Derks',
        date: 'December 2020',
      },
      {
        title: 'Clean Code',
        url: 'https://www.udemy.com/course/writing-clean-code',
        author: 'Maximilian Schwarzmüller',
        date: 'December 2020',
      },
      {
        title: 'Learning TypeScript',
        url: 'https://ui.dev/typescript',
        author: 'Tyler McGinnis',
        date: 'December 2020',
      },
      {
        title: 'Enterprise Architecture Patterns feat. TypeScript',
        url: 'https://frontendmasters.com/workshops/enterprise-patterns',
        author: 'Lukas Ruebbelke',
        date: 'December 2020',
      },
      {
        title: 'Production-Grade TypeScript',
        url: 'https://frontendmasters.com/courses/production-typescript',
        author: 'Mike North',
        date: 'December 2020',
      },
      {
        title: 'Mastery with SQL',
        url: 'https://www.masterywithsql.com',
        author: 'Neil Sainsbury',
        date: 'December 2020',
      },
      {
        title: 'Tackling TypeScript',
        url: 'https://exploringjs.com/tackling-ts',
        author: 'Axel Rauschmayer',
        date: 'November 2020',
      },
      {
        title: 'TypeScript Pro',
        url: 'https://typescriptcourses.com/typescript-pro',
        author: 'James Henry',
        date: 'November 2020',
      },
      {
        title: 'TypeScript Fundamentals',
        url: 'https://typescriptcourses.com/typescript-fundamentals',
        author: 'James Henry',
        date: 'November 2020',
      },
      {
        title: 'Learn Vue 2: Step by Step',
        url: 'https://laracasts.com/series/learn-vue-2-step-by-step',
        author: 'Jeffrey Way',
        date: 'November 2020',
      },
      {
        title: 'Advanced Node.js',
        url: 'https://www.pluralsight.com/courses/nodejs-advanced',
        author: 'Samer Buna',
        date: 'November 2020',
      },
      {
        title: 'Ultimate Git Course',
        url: 'https://codewithmosh.com/p/the-ultimate-git-course',
        author: 'Mosh Hamedani',
        date: 'November 2020',
      },
      {
        title: 'Pro Git',
        url: 'https://git-scm.com/book/en/v2',
        author: 'Scott Chacon & Ben Straub',
        date: 'November 2020',
      },
      {
        title: 'From Nand to Tetris: The Elements of Computing Systems',
        url: 'https://www.amazon.com/Elements-Computing-Systems-Building-Principles/dp/0262640686',
        author: 'Noam Nisan & Shimon Schocken',
        date: 'November 2020',
      },
      {
        title: "The Manager's Path",
        url: 'https://www.amazon.com/-/es/Camille-Fournier/dp/1491973897',
        author: 'Camille Fournier',
        date: 'October 2020',
      },
      {
        title: 'Effective TypeScript',
        url: 'https://www.amazon.com/Effective-TypeScript-Specific-Ways-Improve/dp/1492053740',
        author: 'Dan Vanderkam',
        date: 'September 2020',
      },
      {
        title: 'A Philosophy of Software Design',
        url: 'https://www.amazon.com/Philosophy-Software-Design-John-Ousterhout/dp/1732102201',
        author: 'John Ousterhout',
        date: 'September 2020',
      },
      {
        title: 'Clean Code',
        url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882',
        author: 'Robert C. Martin',
        date: 'August 2020',
      },
      {
        title: 'The Phoenix Project',
        url: 'https://www.amazon.com/Phoenix-Project-DevOps-Helping-Business/dp/0988262592',
        author: 'Gene Kim et al.',
        date: 'August 2020',
      },
      {
        title: 'The Coding Career Handbook',
        url: 'https://www.learninpublic.org/#buy',
        author: 'Shawn Wang',
        date: 'August 2020',
      },
      {
        title: 'Show Your Work',
        url: 'https://www.amazon.com/Show-Your-Work-Austin-Kleon/dp/076117897X',
        author: 'Austin Kleon',
        date: 'June 2020',
      },
      {
        title: 'Solid: Software Architecture and Design Principles',
        url: 'https://solidbook.io',
        author: 'Khalil Stemmler',
        date: 'May 2020',
      },
      {
        title: 'Svelte Tutorial',
        url: 'https://svelte.dev/tutorial/basics',
        author: 'Rich Harris',
        date: 'May 2020',
      },
      {
        title: 'Just JavaScript',
        url: 'https://justjavascript.com',
        author: 'Dan Abramov',
        date: 'May 2020',
      },
      {
        title: 'Designing with Tailwind CSS',
        url: 'https://tailwindcss.com/screencasts',
        author: 'Adam Wathan',
        date: 'May 2020',
      },
      {
        title: 'Dive into Refactoring',
        url: 'https://refactoring.guru/refactoring/course',
        author: 'Alexander Shvetz',
        date: 'May 2020',
      },
      {
        title: 'Electron For Desktop Apps',
        url: 'https://www.udemy.com/course/electron-react-tutorial',
        author: 'Stephen Grider',
        date: 'May 2020',
      },
      {
        title: 'Complete Guide to Testing',
        url: 'https://www.udemy.com/course/the-complete-guide-to-testing-javascript-node-applications',
        author: 'Kat Frantz',
        date: 'April 2020',
      },
      {
        title: 'Clean Coder',
        url: 'https://www.amazon.com/Clean-Coder-Conduct-Professional-Programmers/dp/0137081073',
        author: 'Robert C. Martin',
        date: 'April 2020',
      },
      {
        title: 'Structure and Interpretation of Computer Programs',
        url: 'https://sicp.comp.nus.edu.sg',
        author: 'Martin Henz & Tobias Wrigstad',
        date: 'April 2020',
      },
      {
        title: 'Refactoring UI',
        url: 'https://refactoringui.com',
        author: 'Steve Schoger & Adam Wathan',
        date: 'April 2020',
      },
      {
        title: 'C Programming: A Modern Approach',
        url: 'https://www.amazon.com/C-Programming-Modern-Approach-2nd/dp/0393979504',
        author: 'K. N. King',
        date: 'April 2020',
      },
      {
        title: 'C Programming for Beginners',
        url: 'https://www.udemy.com/course/c-programming-for-beginners-',
        author: 'Jason Fedin',
        date: 'April 2020',
      },
      {
        title: 'Common-Sense Guide to Data Structures and Algorithms',
        url: 'https://www.amazon.com/Common-Sense-Guide-Data-Structures-Algorithms/dp/1680502441',
        author: 'Jay Wengrow',
        date: 'March 2020',
      },
      {
        title: 'WordPress 5: Essential Training',
        url: 'https://www.lynda.com/WordPress-tutorials/WordPress-5-Essential-Training/651229-2.html',
        author: 'Morten Rand-Hendriksen',
        date: 'March 2020',
      },
      {
        title: 'After Effects',
        url: 'https://www.udemy.com/course/animated-infographic-video-data-visualisation',
        author: 'Daniel Scott',
        date: 'March 2020',
      },
      {
        title: 'Ultimate Design Patterns: Part 2',
        url: 'https://codewithmosh.com/p/design-patterns-part2',
        author: 'Mosh Hamedani',
        date: 'March 2020',
      },
      {
        title: 'Ultimate Design Patterns: Part 1',
        url: 'https://codewithmosh.com/p/design-patterns-part1',
        author: 'Mosh Hamedani',
        date: 'March 2020',
      },
      {
        title: 'Software Development Processes',
        url: 'https://www.coursera.org/learn/software-processes',
        author: 'Kevin Wendt & Praveen Mittal',
        date: 'March 2020',
      },
      {
        title: 'The Art of PostgreSQL',
        url: 'https://theartofpostgresql.com',
        author: 'Dimitri Fontaine',
        date: 'March 2020',
      },
      {
        title: 'JavaScript Spessore',
        url: 'https://github.com/raganwald/javascript-spessore',
        author: 'Reginald Braithwaite',
        date: 'March 2020',
      },
      {
        title: 'Refactoring JavaScript',
        url: 'https://www.amazon.com/Refactoring-JavaScript-Turning-Code-Into/dp/1491964928',
        author: 'Evan Burchard',
        date: 'March 2020',
      },
      {
        title: 'JavaScript Enlightenment',
        url: 'https://www.amazon.com/JavaScript-Enlightenment-Library-User-Developer/dp/1449342884',
        author: 'Cody Lindley',
        date: 'March 2020',
      },
      {
        title: 'Software Construction in Java',
        url: 'https://www.edx.org/course/software-construction-in-java',
        author: 'Rob Miller',
        date: 'March 2020',
      },
      {
        title: 'JavaScript ES2015+ Enlightenment',
        url: 'http://codylindley.com/frontenddevbooks/es2015enlightenment',
        author: 'Cody Lindley',
        date: 'March 2020',
      },
      {
        title: 'The Little JavaScript Book',
        url: 'https://github.com/valentinogagliardi/Little-JavaScript-Book',
        author: 'Valentino Gagliardi',
        date: 'March 2020',
      },
      {
        title: 'Grokking Algorithms',
        url: 'https://www.amazon.com/Grokking-Algorithms-illustrated-programmers-curious/dp/1617292230',
        author: 'Aditya Bhargava',
        date: 'February 2020',
      },
      {
        title: 'Introduction to Java Programming',
        url: 'https://www.amazon.com/Intro-Java-Programming-Comprehensive-Version/dp/0133761312',
        author: 'Y. Daniel Liang',
        date: 'February 2020',
      },
      {
        title: 'Programming Interviews Exposed',
        url: 'https://www.amazon.com/Programming-Interviews-Exposed-Secrets-Landing/dp/1118261364',
        author: 'John Mongan et al.',
        date: 'February 2020',
      },
      {
        title: 'Cracking the Coding Interview',
        url: 'https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850',
        author: 'Gayle L. McDowell',
        date: 'February 2020',
      },
      {
        title: 'Algorithms & Data Structures',
        url: 'https://www.udemy.com/course/coding-interview-bootcamp-algorithms-and-data-structure',
        author: 'Stephen Grider',
        date: 'February 2020',
      },
      {
        title: 'Ultimate Algorithms & Data Structures: Part 3',
        url: 'https://codewithmosh.com/p/data-structures-algorithms-part-3',
        author: 'Mosh Hamedani',
        date: 'February 2020',
      },
      {
        title: 'Ultimate Algorithms & Data Structures: Part 2',
        url: 'https://codewithmosh.com/p/data-structures-algorithms-part-2',
        author: 'Mosh Hamedani',
        date: 'February 2020',
      },
      {
        title: 'Ultimate Algorithms & Data Structures: Part 1',
        url: 'https://codewithmosh.com/p/data-structures-algorithms-part1',
        author: 'Mosh Hamedani',
        date: 'February 2020',
      },
      {
        title: 'Ultimate Java 3: Advanced Topics',
        url: 'https://codewithmosh.com/p/ultimate-java-part-3',
        author: 'Mosh Hamedani',
        date: 'January 2020',
      },
      {
        title: 'Ultimate Java 2: Object-Oriented Programming',
        url: 'https://codewithmosh.com/p/ultimate-java-part-2',
        author: 'Mosh Hamedani',
        date: 'January 2020',
      },
      {
        title: 'Ultimate Java 1: Fundamentals',
        url: 'https://codewithmosh.com/p/ultimate-java-part-1',
        author: 'Mosh Hamedani',
        date: 'January 2020',
      },
      {
        title: 'Flutter & Firebase',
        url: 'https://www.udemy.com/course/flutter-firebase-build-a-complete-app-for-ios-android',
        author: 'Andrea Bizzotto',
        date: 'January 2020',
      },
      {
        title: 'JavaScript: Understanding the Weird Parts',
        url: 'https://www.udemy.com/course/understand-javascript',
        author: 'Anthony Alicea',
        date: 'January 2020',
      },
      {
        title: 'Hard Parts: Functional JavaScript Foundations',
        url: 'https://frontendmasters.com/courses/functional-js-fundamentals',
        author: 'Will Sentance',
        date: 'January 2020',
      },
      {
        title: 'Servers & Node.js: The Hard Parts',
        url: 'https://frontendmasters.com/courses/servers-node-js',
        author: 'Will Sentance',
        date: 'January 2020',
      },
      {
        title: 'JavaScript: The New Hard Parts',
        url: 'https://frontendmasters.com/courses/javascript-new-hard-parts',
        author: 'Will Sentance',
        date: 'January 2020',
      },
      {
        title: 'The Hard Parts of Object Oriented JavaScript',
        url: 'https://frontendmasters.com/courses/object-oriented-js',
        author: 'Will Sentance',
        date: 'January 2020',
      },
    ],
  },
  {
    id: '2019',
    title: '2019',
    navLabel: '2019',
    icon: GraduationCap,
    items: [
      {
        title: 'JavaScript: The Hard Parts',
        url: 'https://frontendmasters.com/courses/javascript-hard-parts',
        author: 'Will Sentance',
        date: 'December 2019',
      },
      {
        title: 'Creating Object-Oriented TypeScript Code',
        url: 'https://www.pluralsight.com/courses/typescript-creating-object-oriented-code',
        author: 'Dan Whalin',
        date: 'December 2019',
      },
      {
        title: 'Advanced JavaScript Foundations',
        url: 'https://egghead.io/courses/advanced-javascript-foundations',
        author: 'Tyler Clark',
        date: 'December 2019',
      },
      {
        title: 'Automate Daily Development Tasks with Bash',
        url: 'https://egghead.io/courses/automate-daily-development-tasks-with-bash',
        author: 'Cameron Nookes',
        date: 'December 2019',
      },
      {
        title: 'Firebase Cloud Functions',
        url: 'https://fireship.io/courses/cloud-functions',
        author: 'Jeff Delaney',
        date: 'November 2019',
      },
      {
        title: 'Advanced TypeScript',
        url: 'https://www.pluralsight.com/courses/typescript-advanced',
        author: 'Brice Wilson',
        date: 'November 2019',
      },
      {
        title: 'React Context for State Management',
        url: 'https://egghead.io/courses/react-context-for-state-management',
        author: 'Dave Ceddia',
        date: 'November 2019',
      },
      {
        title: 'Practical Advanced TypeScript',
        url: 'https://egghead.io/courses/practical-advanced-typescript',
        author: 'Rares Matei',
        date: 'November 2019',
      },
      {
        title: 'Using Types Effectively in TypeScript',
        url: 'https://egghead.io/courses/use-types-effectively-in-typescript',
        author: 'Ari Picker',
        date: 'November 2019',
      },
      {
        title: 'Firestore Data Modeling',
        url: 'https://fireship.io/courses/angular/kanban-firestore-data',
        author: 'Jeff Delaney',
        date: 'November 2019',
      },
      {
        title: 'Firebase & Firestore Masterclass',
        url: 'https://www.udemy.com/course/firebase-course',
        author: 'Angular University',
        date: 'November 2019',
      },
      {
        title: 'Python and Qt: The Best Parts',
        url: 'https://build-system.fman.io/pyqt5-book',
        author: 'Michael Herrmann',
        date: 'November 2019',
      },
      {
        title: 'Flutter & Firebase: The Full Course',
        url: 'https://fireship.io/courses/flutter-firebase',
        author: 'Jeff Delaney',
        date: 'November 2019',
      },
      {
        title: 'Learn App Design',
        url: 'https://www.appbrewery.co/p/learn-app-design',
        author: 'Angela Yu',
        date: 'November 2019',
      },
      {
        title: 'Qt5 Python Programming Cookbook',
        url: 'https://www.amazon.com/Qt5-Python-Programming-Cookbook-cross-platform/dp/1788831004',
        author: 'B. M. Harwani',
        date: 'October 2019',
      },
      {
        title: 'SQL Antipatterns',
        url: 'https://www.amazon.com/SQL-Antipatterns-Programming-Pragmatic-Programmers/dp/1934356557',
        author: 'Bill Karwin',
        date: 'October 2019',
      },
      {
        title: 'Refactoring',
        url: 'https://www.amazon.com/gp/product/0134757599?ie=UTF8&tag=martinfowlerc-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0134757599',
        author: 'Martin Fowler',
        date: 'October 2019',
      },
      {
        title: 'Mastering Git',
        url: 'https://www.pluralsight.com/courses/mastering-git',
        author: 'Paolo Perrotta',
        date: 'October 2019',
      },
      {
        title: 'How Git Works',
        url: 'https://www.pluralsight.com/courses/how-git-works',
        author: 'Paolo Perrotta',
        date: 'October 2019',
      },
      {
        title: 'Nginx Fundamentals',
        url: 'https://www.udemy.com/course/nginx-fundamentals',
        author: 'Ray Viljoen',
        date: 'September 2019',
      },
      {
        title: 'Intermediate React',
        url: 'https://frontendmasters.com/courses/intermediate-react-v2',
        author: 'Brian Holt',
        date: 'September 2019',
      },
      {
        title: 'React Router',
        url: 'https://tylermcginnis.com/courses/react-router',
        author: 'Tyler McGinnis',
        date: 'September 2019',
      },
      {
        title: 'Node with React',
        url: 'https://www.udemy.com/course/node-with-react-fullstack-web-development',
        author: 'Stephen Grider',
        date: 'September 2019',
      },
      {
        title: 'Node JS: Advanced Concepts',
        url: 'https://www.udemy.com/course/advanced-node-for-developers',
        author: 'Stephen Grider',
        date: 'September 2019',
      },
      {
        title: 'Modern React with Redux',
        url: 'https://www.udemy.com/course/react-redux',
        author: 'Stephen Grider',
        date: 'September 2019',
      },
      {
        title: "TypeScript: The Complete Developer's Guide",
        url: 'https://www.udemy.com/course/typescript-the-complete-developers-guide',
        author: 'Stephen Grider',
        date: 'September 2019',
      },
      {
        title: 'Digging Into Node.js',
        url: 'https://frontendmasters.com/courses/digging-into-node',
        author: 'Kyle Simpson',
        date: 'September 2019',
      },
      {
        title: 'Simple GUI Applications with Python and Qt5',
        url: 'https://www.learnpyqt.com/pyqt5-book',
        author: 'Martin Fitzpatrick',
        date: 'September 2019',
      },
      {
        title: 'TypeScript Deep Dive',
        url: 'https://basarat.gitbook.io/typescript',
        author: 'Basarat Syed',
        date: 'September 2019',
      },
      {
        title: 'CSS in Depth',
        url: 'https://www.amazon.com/CSS-Depth-Keith-J-Grant/dp/1617293458',
        author: 'Keith Grant',
        date: 'September 2019',
      },
      {
        title: 'The Complete Python Course',
        url: 'https://codewithmosh.com/p/python-programming-course-beginners',
        author: 'Mosh Hamedani',
        date: 'August 2019',
      },
      {
        title: 'Full Stack for Front-End Engineers',
        url: 'https://frontendmasters.com/workshops/full-stack-v2',
        author: 'Jem Young',
        date: 'August 2019',
      },
      {
        title: 'Understanding TypeScript',
        url: 'https://www.udemy.com/course/understanding-typescript',
        author: 'Maximilian Schwarzmüller',
        date: 'August 2019',
      },
      {
        title: 'Complete SQL Mastery',
        url: 'https://codewithmosh.com/p/complete-sql-mastery',
        author: 'Mosh Hamedani',
        date: 'August 2019',
      },
      {
        title: 'Object-Oriented Programming in JavaScript',
        url: 'https://codewithmosh.com/p/object-oriented-programming-in-javascript',
        author: 'Mosh Hamedani',
        date: 'July 2019',
      },
      {
        title: 'The Complete Flutter Development Bootcamp with Dart',
        url: 'https://www.udemy.com/course/flutter-bootcamp-with-dart',
        author: 'Angela Yu',
        date: 'July 2019',
      },
      {
        title: 'Advanced JavaScript',
        url: 'https://tylermcginnis.com/courses/advanced-javascript',
        author: 'Tyler McGinnis',
        date: 'May 2019',
      },
      {
        title: 'Modern JavaScript',
        url: 'https://tylermcginnis.com/courses/modern-javascript',
        author: 'Tyler McGinnis',
        date: 'April 2019',
      },
      {
        title: 'React Fundamentals',
        url: 'https://tylermcginnis.com/courses/react',
        author: 'Tyler McGinnis',
        date: 'April 2019',
      },
      {
        title: 'Mastering React',
        url: 'https://codewithmosh.com/p/mastering-react',
        author: 'Mosh Hamedani',
        date: 'April 2019',
      },
      {
        title: 'Pure React',
        url: 'https://daveceddia.com/pure-react',
        author: 'Dave Ceddia',
        date: 'April 2019',
      },
      {
        title: 'The Road to Learn React',
        url: 'https://www.robinwieruch.de/the-road-to-learn-react',
        author: 'Robin Wieruch',
        date: 'April 2019',
      },
      {
        title: 'The Complete Node.js Course',
        url: 'https://codewithmosh.com/p/the-complete-node-js-course',
        author: 'Mosh Hamedani',
        date: 'February 2019',
      },
      {
        title: 'SQL Performance Explained',
        url: 'https://www.amazon.co.uk/SQL-Performance-Explained-Markus-Winand/dp/3950307826',
        author: 'Markus Winand',
        date: 'February 2019',
      },
      {
        title: 'Learning SQL',
        url: 'https://www.amazon.com/Learning-SQL-Master-Fundamentals/dp/0596520832',
        author: 'Alan Beaulieu',
        date: 'February 2019',
      },
      {
        title: 'Functional Programming in JavaScript',
        url: 'https://www.amazon.com/Functional-Programming-JavaScript-functional-techniques/dp/1617292826',
        author: 'Luis Atencio',
        date: 'January 2019',
      },
      {
        title: 'JavaScript Allongé',
        url: 'https://www.amazon.com/JavaScript-Allong%C3%A9-Reginald-Braithwaite-ebook/dp/B00FLKRCVO',
        author: 'Reg Braithwaite',
        date: 'January 2019',
      },
      {
        title: "You Don't Know JS",
        url: 'https://github.com/getify/You-Dont-Know-JS',
        author: 'Kyle Simpson',
        date: 'January 2019',
      },
      {
        title: 'Effective JavaScript',
        url: 'https://www.amazon.com/Effective-JavaScript-Specific-Software-Development/dp/0321812182',
        author: 'David Herman',
        date: 'January 2019',
      },
      {
        title: 'CS50W Web Programming with Python and JavaScript',
        url: 'https://www.edx.org/course/cs50s-web-programming-with-python-and-javascript',
        author: 'Harvard University',
        date: 'January 2019',
      },
      {
        title: 'CS50 Introduction to Computer Science',
        url: 'https://www.edx.org/course/cs50s-introduction-to-computer-science',
        author: 'Harvard University',
        date: 'January 2019',
      },
    ],
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
            Books, courses and projects I have learned from
          </p>
        </div>

        <BookmarkNav
          sections={LEARNING_SECTIONS.map((section) => ({
            id: section.id,
            navLabel: section.navLabel,
          }))}
        />

        <div className="w-full space-y-16">
          {LEARNING_SECTIONS.map((section) => (
            <BookmarkSection
              key={section.id}
              id={section.id}
              title={section.title}
              icon={section.icon}
              description={section.description}
              items={section.items.map((item) => ({
                title: item.author
                  ? `${item.title} · ${item.author}`
                  : item.title,
                url: item.url,
                description: item.description || item.date,
              }))}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default LearningPage;
