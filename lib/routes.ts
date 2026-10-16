export const Routes = {
  Home: () => '/',
  Blog: () => '/blog',
  BlogPost: (slug: string) => `/blog/${slug}`,
  Snippets: () => '/snippets',
  Snippet: (slug: string) => `/snippets/${slug}`,
  About: () => '/about',
  Gear: () => '/gear',
  Dashboard: () => '/dashboard',
  UdemyResetProgress: () => '/udemy-reset-progress',
  UdemyTroubleshooting: () => '/udemy-reset-progress/troubleshooting',
  QuizletList: () => '/quizlet-list',
  FlashcardImport: (app: string) => `/quizlet-list/to/${app}`,
  Bookmarks: () => '/bookmarks',

  Resume: () => '/static/serhii_shramko_frontend.pdf',
  GitHub: () => 'https://github.com/Shramkoweb',
  LinkTree: () => 'https://links.shramko.dev/',
} as const;
