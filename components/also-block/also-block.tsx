import { BlogPostPreview } from '@/components/blog-post-preview';

interface RelatedPost {
  slug: string;
  heading: string;
  excerpt: string;
}

function AlsoBlock({ relatedPosts }: { relatedPosts: RelatedPost[] }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold mb-4 prose dark:prose-dark max-w-none">You might also like:</h2>

      <div className="grid grid-cols-1">
        {relatedPosts.map((post) => (
          <BlogPostPreview
            key={post.slug}
            slug={post.slug}
            heading={post.heading}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}

export { AlsoBlock };
