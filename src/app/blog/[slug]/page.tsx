import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { getBlogPost, blogPosts } from "@/data/blog-posts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-green transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to blog
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        {post.title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {post.readTime}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="border-neon-cyan/30 text-neon-cyan/80"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <Separator className="bg-cyber-border mb-8" />

      <article
        className="prose prose-invert prose-green max-w-none
          prose-headings:text-neon-green prose-headings:font-bold
          prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-a:text-neon-cyan prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground
          prose-code:text-neon-green prose-code:bg-cyber-card prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
          prose-pre:bg-cyber-card prose-pre:border prose-pre:border-cyber-border prose-pre:rounded-lg
          prose-li:text-muted-foreground
          prose-ul:text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-12 text-sm text-neon-green/50">
        <span>&gt; EOF_</span>
      </div>
    </div>
  );
}
