import { PostCategory } from '@/lib/types';

const Environment = {
  Production: 'production',
  Test: 'test',
  Development: 'development',
};

export const categoryToSeoData = {
  [PostCategory.JS]: {
    title: 'JavaScript Tips to Enhance Coding Skills',
    description: 'Explore a variety of JavaScript tips and tutorials to enhance your coding skills.',
    keywords: 'JavaScript, Programming, Development',
  },
  [PostCategory.TS]: {
    title: 'TypeScript Guides for Stronger Web Projects',
    description: 'Discover resources and tutorials to master TypeScript for more robust web development projects.',
    keywords: 'TypeScript, Programming, Web Development',
  },
  [PostCategory.Astro]: {
    title: 'Astro Framework: Complete Guide',
    description: 'Dive into the features and benefits of the Astro framework with our comprehensive guide.',
    keywords: 'Astro, Frontend, Framework',
  },
  [PostCategory.JamsSack]: {
    title: 'Master Jamstack Technology: Complete Overview',
    description: 'Learn about the Jamstack technology and how to leverage it effectively for your projects.',
    keywords: 'Jamstack, Development, Technology',
  },
  [PostCategory.CSS]: {
    title: 'CSS Tips to Elevate Web Design Style',
    description: 'Find useful tips and techniques to enhance your web design using CSS.',
    keywords: 'CSS, Web Design, Development',
  },
  [PostCategory.HTML]: {
    title: 'HTML Essentials: Building Responsive Web Pages',
    description: 'Essential tips and tutorials to create responsive web pages using HTML.',
    keywords: 'HTML, Markup, Web Development',
  },
  [PostCategory.Vercel]: {
    title: 'Vercel Deployment: Streamline Your Workflow',
    description: 'Discover tips and techniques to streamline your deployment process with Vercel.',
    keywords: 'Vercel, Deployment, Workflow',
  },
  [PostCategory.CleanCode]: {
    title: 'Clean Code Tips to Improve Development Workflow',
    description: 'Explore the best practices for writing clean and maintainable code in your projects.',
    keywords: 'Clean Code, Development, Coding Standards',
  },
  [PostCategory.Tutorial]: {
    title: 'Step-by-Step Guides for Web Development Tasks',
    description: 'Dive into our comprehensive Tutorial guides for step-by-step tutorials on various tasks and topics.',
    keywords: 'Tutorial, Guides, Tutorial',
  },
  [PostCategory.UsefulResources]: {
    title: 'Top Resources to Enhance Development Arsenal',
    description: 'Discover a collection of useful resources to elevate your skills and productivity in development.',
    keywords: 'Resources, Development, Productivity',
  },
  [PostCategory.ProjectSetup]: {
    title: 'Streamline Development: Efficient Project Setup',
    description: 'Tips and techniques to set up your projects efficiently and streamline your development process.',
    keywords: 'Project Setup, Development, Workflow',
  },
  [PostCategory.Node]: {
    title: 'Node.js Development: Harness the Power of Node.js',
    description: 'Explore Node.js development resources and tutorials to harness the power of Node.js for your projects.',
    keywords: 'Node.js, Development, Backend',
  },
  [PostCategory.Opinion]: {
    title: 'Opinion: Engage in Thought-Provoking Discussions',
    description: 'Engage with our opinion pieces and join thought-provoking discussions on various topics in the industry.',
    keywords: 'Opinion, Discussions, Thought-Provoking',
  },
  [PostCategory.React]: {
    title: 'Mastering React: Advanced Tips and Techniques',
    description: 'Advance your React skills with our collection of tips and techniques for mastering React development.',
    keywords: 'React, Frontend, JavaScript',
  },
  [PostCategory.Productivity]: {
    title: 'Productivity Tips for Efficient Development',
    description: 'Discover tips and strategies to boost your productivity and efficiency in your development workflow.',
    keywords: 'Productivity, Development, Efficiency',
  },
  [PostCategory.Habits]: {
    title: 'Healthy Coding Habits: A Success Guide',
    description: 'Learn about the importance of developing healthy coding habits for success in your coding journey.',
    keywords: 'Coding Habits, Development, Success',
  },
  [PostCategory.Tools]: {
    title: 'Top Development Tools to Enhance Workflow',
    description: 'Explore essential tools and resources to enhance your development workflow and productivity.',
    keywords: 'Development Tools, Resources, Productivity',
  },
};

export const isProduction = () => process.env.NODE_ENV === Environment.Production;

export const getSlugFromMdFile = (fileName: string) => fileName.replace(/\.md$/, '');
