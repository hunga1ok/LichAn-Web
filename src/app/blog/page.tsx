import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/blog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, User, ArrowRight, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cẩm Nang Văn Hóa & Văn Khấn Cổ Truyền - Lịch An',
  description: 'Kho tàng bài viết văn khấn mùng 1, ngày rằm, phong tục tập quán truyền thống người Việt và hướng dẫn xem ngày tốt xấu chuẩn phong thủy.',
};

export default function BlogListingPage() {
  const posts = getAllBlogPosts();
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <Badge variant="outline" className="px-3 py-1 text-sm bg-amber-50 border-amber-300 text-primary">
          <BookOpen className="w-3.5 h-3.5 mr-1" /> KHO TÀNG TRI THỨC DÂN GIAN
        </Badge>
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary">
          Cẩm Nang Văn Hóa & Phong Tục
        </h1>
        <p className="text-stone-600 max-w-2xl mx-auto text-sm md:text-base">
          Trọn bộ văn khấn cổ truyền, cẩm nang xem ngày lành tháng tốt, cách bao sái ban thờ và nét đẹp phong tục nghìn năm của người Việt.
        </p>
      </div>

      {/* Featured Article */}
      {featuredPost && (
        <Card className="border-2 border-accent/40 bg-gradient-to-br from-amber-50/70 via-white to-orange-50/30 overflow-hidden shadow-sm hover:shadow-md transition-all">
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start justify-between">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary">Nổi bật</Badge>
                <Badge variant="secondary">{featuredPost.category}</Badge>
                <span className="text-xs text-stone-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-stone-900 leading-snug hover:text-primary transition-colors">
                <Link href={`/blog/${featuredPost.slug}`}>
                  {featuredPost.title}
                </Link>
              </h2>
              <p className="text-stone-600 text-sm md:text-base line-clamp-2 leading-relaxed">
                {featuredPost.description}
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs text-stone-500">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {featuredPost.author}</span>
                <span>•</span>
                <span>{featuredPost.publishedAt}</span>
              </div>
            </div>

            <div className="self-end md:self-center shrink-0">
              <Link href={`/blog/${featuredPost.slug}`}>
                <Button className="gap-2">
                  Đọc toàn văn <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* Articles Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" /> Bài Viết Mới Nhất
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <Card
              key={post.slug}
              className="flex flex-col border-amber-900/10 hover:border-primary/40 transition-all hover:shadow-md bg-white overflow-hidden group"
            >
              <CardHeader className="pb-3 bg-stone-50/50 border-b border-stone-100">
                <div className="flex justify-between items-center text-xs">
                  <Badge variant="outline" className="bg-white text-stone-700 font-semibold">
                    {post.category}
                  </Badge>
                  <span className="text-stone-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="pt-4 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-base text-stone-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h4>
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-400">{post.publishedAt}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary font-semibold hover:underline flex items-center gap-1"
                  >
                    Chi tiết <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
