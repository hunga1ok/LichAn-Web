import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getRelatedPosts, getAllBlogPosts } from '@/lib/blog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  User, 
  Calendar, 
  ArrowLeft, 
  ChevronRight, 
  Share2, 
  BookOpen, 
  Tag 
} from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Không tìm thấy bài viết - Lịch An',
    };
  }

  return {
    title: `${post.title} - Lịch An`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, 3);

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" className="hover:text-[#8B6914]">Trang chủ</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/blog" className="hover:text-[#8B6914]">Cẩm nang</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-stone-800 font-medium truncate max-w-xs md:max-w-md">{post.title}</span>
      </nav>

      {/* Article Header */}
      <div className="space-y-4 border-b border-stone-200 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-[#8B6914]">{post.category}</Badge>
          <span className="text-xs text-stone-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {post.readTime}
          </span>
          <span className="text-xs text-stone-400">•</span>
          <span className="text-xs text-stone-500 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {post.publishedAt}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-stone-600 font-medium leading-relaxed italic border-l-4 border-[#8B6914] pl-4 py-1 bg-amber-50/40 rounded-r-lg">
          {post.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <div className="w-7 h-7 rounded-full bg-amber-100 text-[#8B6914] flex items-center justify-center font-bold">
              LA
            </div>
            <span className="font-semibold">{post.author}</span>
          </div>

          <Link href="/blog">
            <Button variant="ghost" size="sm" className="gap-1 text-xs text-stone-600">
              <ArrowLeft className="w-3.5 h-3.5" /> Danh mục bài viết
            </Button>
          </Link>
        </div>
      </div>

      {/* Article Body Content */}
      <div className="prose prose-stone max-w-none prose-headings:text-amber-950 prose-headings:font-bold prose-h2:text-2xl prose-h2:border-b prose-h2:border-stone-100 prose-h2:pb-2 prose-h3:text-xl prose-p:leading-relaxed prose-p:text-stone-700 prose-blockquote:border-l-4 prose-blockquote:border-[#8B6914] prose-blockquote:bg-amber-50/60 prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:text-stone-800 prose-li:text-stone-700">
        <div 
          className="space-y-4 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: post.content
              .replace(/### (.*?)\n/g, '<h3 class="text-lg font-bold text-amber-950 mt-6 mb-2">$1</h3>')
              .replace(/## (.*?)\n/g, '<h2 class="text-xl sm:text-2xl font-black text-amber-950 mt-8 mb-3 pb-2 border-b border-stone-200">$1</h2>')
              .replace(/> (.*?)\n/g, '<blockquote class="border-l-4 border-[#8B6914] bg-amber-50/70 p-4 my-4 rounded-r-xl text-stone-900 font-serif leading-relaxed">$1</blockquote>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/^- (.*?)\n/gm, '<li class="ml-4 list-disc text-sm text-stone-700 my-1">$1</li>')
              .replace(/^[0-9]\. (.*?)\n/gm, '<li class="ml-4 list-decimal text-sm text-stone-700 my-1">$1</li>')
              .replace(/\n\n/g, '<br/>')
          }}
        />
      </div>

      {/* Tags */}
      <div className="pt-6 border-t border-stone-200">
        <div className="flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-stone-400" />
          <span className="text-xs font-semibold text-stone-500">Từ khóa:</span>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs bg-stone-50 text-stone-600">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="pt-8 border-t border-stone-200 space-y-4">
          <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#8B6914]" /> Bài Viết Cùng Chủ Đề
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedPosts.map((related) => (
              <Card key={related.slug} className="border-amber-900/10 hover:border-[#8B6914]/50 transition-all hover:shadow-sm">
                <CardContent className="p-4 space-y-2">
                  <Badge variant="secondary" className="text-[10px] mb-1">{related.category}</Badge>
                  <h4 className="font-bold text-sm text-stone-900 hover:text-[#8B6914] line-clamp-2 leading-snug">
                    <Link href={`/blog/${related.slug}`}>
                      {related.title}
                    </Link>
                  </h4>
                  <p className="text-xs text-stone-500 line-clamp-2">{related.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
