export type Views = {
  total: number;
};

export type GitHub = {
  stars: number;
  followers: number;
};

export type Post = {
  data: {
    slug: string,
    title: string,
    description: string,
    readTime: string,
    createDate: number,
    updateData: number,
    featured: boolean;
    tags?: string[],
  },
  content: string
};

export enum Feedback {
  helpful = 'helpful',
  worthless = 'worthless',
  blank = 'blank',
}
