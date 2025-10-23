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
}

const Blog = ({ posts, limit, showViewAll = false }: BlogProps) => {
  const blogPosts = posts
    .map((post) => ({
      ...post,
      formattedDate: new Date(post.date).toLocaleDateString('de-DE', {
        day: '2-digit', month: 'long', year: 'numeric'
      })
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);

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
                <div className="overflow-hidden rounded-t-lg mb-4">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={`Blog Post: ${post.title} - ${post.category} Artikel von ${post.author}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

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
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
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
