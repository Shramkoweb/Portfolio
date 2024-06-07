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
