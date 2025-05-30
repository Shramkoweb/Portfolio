export const Routes = {
  Home: () => '/',
  Blog: () => '/blog',
  BlogPost: (slug: string) => `/blog/${slug}`,
  BlogCategory: (category: string) => `/blog/category/${category.toLowerCase()}`,
  Snippets: () => '/snippets',
  Snippet: (slug: string) => `/snippets/${slug}`,
  About: () => '/about',
  Gear: () => '/gear',
  Dashboard: () => '/dashboard',
  UdemyResetProgress: () => '/udemy-reset-progress',
  QuizletList: () => '/quizlet-list',

  // External links
  Resume: () => '/static/serhii_shramko_frontend.pdf',
  GitHub: () => 'https://github.com/Shramkoweb',
  LinkTree: () => 'https://links.shramko.dev/',
} as const;
