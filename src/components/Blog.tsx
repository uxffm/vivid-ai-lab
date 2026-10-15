import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";

type BlogCardPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
  image?: string;
};

interface BlogProps {
  posts: BlogCardPost[];
  limit?: number;
  showViewAll?: boolean;
  showImage?: boolean;
  layout?: "cards" | "list";
}

const Blog = ({ posts, limit, showViewAll = false, showImage = true, layout = "cards" }: BlogProps) => {
  const blogPosts = posts
    .map((post) => ({
      ...post,
      formattedDate: new Date(post.date).toLocaleDateString('de-DE', {
        day: '2-digit', month: 'long', year: 'numeric'
      })
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

  if (layout === "list") {
    return (
      <section id="blog" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-6 mb-12">
            <h2 className="lg:col-span-5 text-3xl md:text-4xl leading-tight">
              KI-Marketing Insights & Trends
            </h2>
            <p className="lg:col-span-7 text-lg leading-relaxed text-muted-foreground">
              Bleiben Sie auf dem neuesten Stand der KI-Marketing-Entwicklungen mit unseren Expertenartikeln und Analysen.
            </p>
          </div>

          <ul className="border-b border-border">
            {blogPosts.map((post) => (
              <li key={post.slug} className="border-t border-border">
                <a
                  href={`/blog/${post.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-2 py-7 px-2 -mx-2 hover:bg-card transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground"
                >
                  <div className="md:col-span-3 text-sm text-muted-foreground">
                    <span className="block">{post.category} • {post.readTime}</span>
                    <span className="block mt-1">{post.author}</span>
                    <time dateTime={post.date} className="block mt-1">{post.formattedDate}</time>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="text-xl font-medium leading-snug underline decoration-2 decoration-transparent underline-offset-4 group-hover:decoration-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">{post.description}</p>
                    <span className="mt-3 inline-block font-semibold underline underline-offset-4 decoration-2 decoration-primary">
                      Weiterlesen →
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          {showViewAll && (
            <a
              href="/blog"
              className="mt-8 inline-flex items-center gap-2 font-semibold underline underline-offset-4 decoration-2 decoration-primary hover:decoration-foreground"
            >
              Alle Artikel ansehen
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            KI-Marketing Insights & Trends
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Bleiben Sie auf dem neuesten Stand der KI-Marketing-Entwicklungen mit unseren
            Expertenartikeln und Analysen.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <div className="group hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden rounded-lg p-6 border border-border">
                {/* Content */}
                {showImage && (
                  <div className="overflow-hidden rounded-t-lg mb-4">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={`Blog Post: ${post.title} - ${post.category} Artikel von ${post.author}`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" aria-hidden="true" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" aria-hidden="true" />
                    {post.formattedDate}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                >
                  Weiterlesen
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                </Button>
              </div>
            </a>
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <div className="text-center mt-8">
            <a href="/blog">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground border-0"
              >
                Alle Artikel ansehen
                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </Button>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
