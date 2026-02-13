import { SectionHeading } from "@/components/shared/section-heading";
import { BlogCard } from "@/components/blog/blog-card";
import { AnimatedContainer } from "@/components/shared/animated-container";
import { blogPosts } from "@/data/blog-posts";

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading title="BLOG" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map((post, i) => (
          <AnimatedContainer key={post.slug} delay={i * 0.1}>
            <BlogCard post={post} />
          </AnimatedContainer>
        ))}
      </div>
      {blogPosts.length === 0 && (
        <p className="text-muted-foreground text-center py-12">
          No posts yet. Check back soon.
        </p>
      )}
    </div>
  );
}
