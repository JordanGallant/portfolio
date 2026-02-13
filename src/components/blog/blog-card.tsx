"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/data/blog-posts";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="bg-cyber-card border-cyber-border group hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-neon-cyan h-full">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>

          <h3 className="text-lg font-bold text-foreground group-hover:text-neon-cyan transition-colors mb-2">
            {post.title}
          </h3>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {post.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-neon-cyan/30 text-neon-cyan/80 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
