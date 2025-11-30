import { PostCategory } from '@/lib/types';

const Environment = {
  Production: 'production',
  Test: 'test',
  Development: 'development',
};

export function formatCategoryName(category: PostCategory): string {
  if (!category) {
    return '';
  }
  return category.split('-').join(' ').trim();
}

export const categoryToSeoData = {
  [PostCategory.JS]: {
    title: 'JavaScript Tips to Enhance Coding Skills',
    description:
      'Master JavaScript with practical tutorials and best practices. Learn ES6+ features, async patterns, and modern techniques for web development.',
    keywords: 'JavaScript, Programming, Development',
  },
  [PostCategory.TS]: {
    title: 'TypeScript Guides for Stronger Web Projects',
    description:
      'Level up your TypeScript skills with guides on types, generics, and advanced patterns. Build type-safe applications with confidence.',
    keywords: 'TypeScript, Programming, Web Development',
  },
  [PostCategory.Astro]: {
    title: 'Astro Framework: Complete Guide',
    description:
      'Learn Astro.js from basics to advanced. Build fast static sites with partial hydration and seamless React, Vue, or Svelte integrations.',
    keywords: 'Astro, Frontend, Framework',
  },
  [PostCategory.JamsSack]: {
    title: 'Master Jamstack Technology: Complete Overview',
    description:
      'Explore Jamstack architecture for fast, secure websites. Learn about static site generators, headless CMS, and serverless functions.',
    keywords: 'Jamstack, Development, Technology',
  },
  [PostCategory.CSS]: {
    title: 'CSS Tips to Elevate Web Design Style',
    description:
      'Improve your CSS skills with tips on Flexbox, Grid, animations, and responsive design. Create beautiful, maintainable stylesheets.',
    keywords: 'CSS, Web Design, Development',
  },
  [PostCategory.HTML]: {
    title: 'HTML Essentials: Building Responsive Web Pages',
    description:
      'Master semantic HTML for accessible, SEO-friendly pages. Learn HTML5 elements, forms, and best practices for structuring web content.',
    keywords: 'HTML, Markup, Web Development',
  },
  [PostCategory.Vercel]: {
    title: 'Vercel Deployment: Streamline Your Workflow',
    description:
      'Deploy web apps effortlessly with Vercel. Learn serverless functions, edge runtime, preview deployments, and performance optimization.',
    keywords: 'Vercel, Deployment, Workflow',
  },
  [PostCategory.CleanCode]: {
    title: 'Clean Code Tips to Improve Development Workflow',
    description:
      'Write maintainable code with proven clean code principles. Learn refactoring, naming conventions, and patterns that reduce technical debt.',
    keywords: 'Clean Code, Development, Coding Standards',
  },
  [PostCategory.Tutorial]: {
    title: 'Step-by-Step Guides for Web Development Tasks',
    description:
      'Follow step-by-step tutorials for web development tasks. From project setup to deployment, learn practical skills for your projects.',
    keywords: 'Tutorial, Guides, Tutorial',
  },
  [PostCategory.UsefulResources]: {
    title: 'Top Resources to Enhance Development Arsenal',
    description:
      'Curated developer resources, tools, and learning materials. Find the best blogs, docs, and libraries to accelerate your workflow.',
    keywords: 'Resources, Development, Productivity',
  },
  [PostCategory.ProjectSetup]: {
    title: 'Streamline Development: Efficient Project Setup',
    description:
      'Set up projects the right way. Learn about linting, formatting, Git hooks, and TypeScript configuration for code quality.',
    keywords: 'Project Setup, Development, Workflow',
  },
  [PostCategory.Node]: {
    title: 'Node.js Development: Harness the Power of Node.js',
    description:
      'Build scalable backend apps with Node.js. Explore modules, async programming, package management, and server-side best practices.',
    keywords: 'Node.js, Development, Backend',
  },
  [PostCategory.Opinion]: {
    title: 'Opinion: Engage in Thought-Provoking Discussions',
    description:
      'Personal takes on software development, industry trends, and engineering culture. Honest perspectives on tools and practices.',
    keywords: 'Opinion, Discussions, Thought-Provoking',
  },
  [PostCategory.React]: {
    title: 'Mastering React: Advanced Tips and Techniques',
    description:
      'Deepen your React expertise with tutorials on hooks, state management, and component patterns. Build production-ready applications.',
    keywords: 'React, Frontend, JavaScript',
  },
  [PostCategory.Productivity]: {
    title: 'Productivity Tips for Efficient Development',
    description:
      'Boost developer productivity with strategies, shortcuts, and workflow optimizations. Work smarter, ship faster, stay balanced.',
    keywords: 'Productivity, Development, Efficiency',
  },
  [PostCategory.Habits]: {
    title: 'Healthy Coding Habits: A Success Guide',
    description:
      'Build sustainable coding habits for career success. Learn about continuous learning, code reviews, and routines for developers.',
    keywords: 'Coding Habits, Development, Success',
  },
  [PostCategory.Tools]: {
    title: 'Top Development Tools to Enhance Workflow',
    description:
      'Discover essential developer tools for coding, debugging, and deployment. Reviews of IDEs, extensions, and productivity apps.',
    keywords: 'Development Tools, Resources, Productivity',
  },
  [PostCategory.Certifications]: {
    title: 'Certification: Get Your Certification',
    description:
      'Prepare for developer certifications with study guides and resources. Learn about GraphQL, cloud, and framework certifications.',
    keywords: 'Certification, Resources, Certifications, Learning',
  },
  [PostCategory.AdvancedReact]: {
    title: 'Advanced React: Advanced Tips and Techniques',
    description:
      'Master advanced React patterns: render props, compound components, custom hooks, and performance optimization techniques.',
    keywords: 'React, Frontend, JavaScript',
  },
  [PostCategory.SEO]: {
    title: 'SEO for Developers: Optimize Your Web Projects',
    description:
      'Learn SEO fundamentals for developers. Master meta tags, structured data, performance optimization, and technical SEO best practices.',
    keywords: 'SEO, Web Development, Optimization',
  },
};

export const isProduction = () => process.env.NODE_ENV === Environment.Production;

export const extractMarkdownSlug = (fileName: string): string => {
  const lastDotIndex = fileName.lastIndexOf('.');

  return lastDotIndex === -1 ? fileName : fileName.slice(0, lastDotIndex);
};
