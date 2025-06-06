export type Views = {
  total: number;
};

export type GitHub = {
  stars: number;
  followers: number;
};

export type BaseFrontmatter = {
  slug: string;
  title: string;
  heading: string;
  description: string;
  createDate: number;
  keywords: string[];
  updateData?: number;
};

export type Post = {
  data: BaseFrontmatter & {
    readTime: string;
    featured: boolean;
    categories: PostCategory[];
  };
  content: string;
};

export enum PostCategory {
  JS = 'js',
  Vercel = 'vercel',
  Tutorial = 'tutorial',
  TS = 'ts',
  CSS = 'css',
  Astro = 'astro',
  JamsSack = 'jamstack',
  HTML = 'html',
  CleanCode = 'clean-code',
  UsefulResources = 'useful-resources',
  ProjectSetup = 'project-setup',
  Node = 'node',
  React = 'react',
  Opinion = 'opinion',
  Productivity = 'productivity',
  Habits = 'habits',
  Tools = 'tools',
  Certifications = 'certifications',
  AdvancedReact = 'advanced-react',
}

export enum Feedback {
  Helpful = 'helpful',
  Worthless = 'worthless',
  Blank = 'blank',
}

export type Snippet = {
  data: BaseFrontmatter;
  content: string;
};

type LinkedinCompany = {
  name: string;
  url: string;
};

type LinkedinFeedbackAuthor = {
  name: string;
  position: string;
  avatar: string;
  company: LinkedinCompany;
};

export type TLinkedinFeedback = {
  author: LinkedinFeedbackAuthor;
  postDate: string;
  text: string;
};
