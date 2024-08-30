export type Views = {
  total: number;
};

export type GitHub = {
  stars: number;
  followers: number;
};

export type Post = {
  data: {
    slug: string;
    title: string;
    heading: string;
    description: string;
    readTime: string;
    createDate: number;
    featured: boolean;
    keywords: string[];
    categories: string[];
    updateData?: number;
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
}

export enum Feedback {
  Helpful = 'helpful',
  Worthless = 'worthless',
  Blank = 'blank',
}

export type Snippet = {
  data: {
    slug: string;
    title: string;
    description: string;
    createDate: number;
    keywords: string[];
    updateData?: number;
  };
  content: string;
};
