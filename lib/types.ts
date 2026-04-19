export type Views = {
  total: number;
};

export type GitHub = {
  stars: number;
  followers: number;
};

export type DashboardData = {
  totalViews: number;
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
  updateDate: number | null;
};

export type Post = {
  data: BaseFrontmatter & {
    readTime: string;
    featured: boolean;
    categories: PostCategory[];
  };
  content: string;
};

export type PostMetadata = Omit<Post, 'content'>;

export enum PostCategory {
  JS = 'js',
  Vercel = 'vercel',
  Tutorial = 'tutorial',
  TS = 'ts',
  CSS = 'css',
  Astro = 'astro',
  HTML = 'html',
  CleanCode = 'clean-code',
  ProjectSetup = 'project-setup',
  Node = 'node',
  React = 'react',
  Opinion = 'opinion',
  Productivity = 'productivity',
  Tools = 'tools',
  AdvancedReact = 'advanced-react',
  SEO = 'seo',
  AI = 'ai',
}

export const VALID_REACTION_TYPES = ['heart', 'beer', 'trophy'] as const;

export type ReactionType = (typeof VALID_REACTION_TYPES)[number];

export type ReactionsResponse = {
  reactions: Record<ReactionType, number>;
};

export function isValidReactionType(type: string): type is ReactionType {
  return VALID_REACTION_TYPES.includes(type as ReactionType);
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
  linkedinLink: string;
};

export type LinkedinFeedback = {
  author: LinkedinFeedbackAuthor;
  postDate: string;
  text: string;
};
