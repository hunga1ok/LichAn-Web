'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { VanKhanItem, VanKhanCategory } from '@/types/van-khan';
import { CATEGORY_LABELS } from '@/lib/van-khan';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  BookOpen, 
  Home, 
  TrendingUp, 
  Hammer, 
  Heart, 
  Flame, 
  ArrowRight, 
  Clock, 
  CheckCircle,
  Sparkles
} from 'lucide-react';

interface Props {
  initialItems: VanKhanItem[];
}

export default function VanKhanHubClient({ initialItems }: Props) {
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<VanKhanCategory | 'all'>('all');

  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      // Lọc theo danh mục
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Lọc theo từ khóa
      if (keyword.trim()) {
        const q = keyword.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.shortDesc.toLowerCase().includes(q);
        const matchesTarget = item.target.toLowerCase().includes(q);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(q));
        return matchesTitle || matchesDesc || matchesTarget || matchesTags;
      }
      return true;
    });
  }, [initialItems, selectedCategory, keyword]);

  const categoryList: { id: VanKhanCategory | 'all'; name: string; count: number }[] = useMemo(() => {
    return [
      { id: 'all', name: 'Tất cả bài khấn', count: initialItems.length },
      { 
        id: 'than-linh-gia-tien', 
        name: 'Thần Linh & Gia Tiên', 
        count: initialItems.filter((i) => i.category === 'than-linh-gia-tien').length 
      },
      { 
        id: 'kinh-doanh-tai-loc', 
        name: 'Kinh Doanh & Tài Lộc', 
        count: initialItems.filter((i) => i.category === 'kinh-doanh-tai-loc').length 
      },
      { 
        id: 'xay-dung-nha-cua', 
        name: 'Xây Dựng & Nhà Cửa', 
        count: initialItems.filter((i) => i.category === 'xay-dung-nha-cua').length 
      },
      { 
        id: 'hon-su-gia-dao', 
        name: 'Hôn Sự & Gia Đạo', 
        count: initialItems.filter((i) => i.category === 'hon-su-gia-dao').length 
      },
      { 
        id: 'le-tet-truyen-thong', 
        name: 'Lễ Tết Truyền Thống', 
        count: initialItems.filter((i) => i.category === 'le-tet-truyen-thong').length 
      },
    ];
  }, [initialItems]);

  const getCategoryIcon = (cat: VanKhanCategory) => {
    switch (cat) {
      case 'than-linh-gia-tien':
        return <Home className="w-4 h-4 text-amber-700" />;
      case 'kinh-doanh-tai-loc':
        return <TrendingUp className="w-4 h-4 text-emerald-700" />;
      case 'xay-dung-nha-cua':
        return <Hammer className="w-4 h-4 text-orange-700" />;
      case 'hon-su-gia-dao':
        return <Heart className="w-4 h-4 text-rose-700" />;
      case 'le-tet-truyen-thong':
        return <Flame className="w-4 h-4 text-red-700" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Bar & Category Tabs */}
      <div className="space-y-4 max-w-2xl mx-auto">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Tìm kiếm bài văn khấn (VD: mùng 1, thần tài, nhập trạch, động thổ...)"
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-amber-900/20 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:border-amber-700 text-sm shadow-xs"
          />
          {keyword && (
            <button
              onClick={() => setKeyword('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-stone-600 cursor-pointer"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {categoryList.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-amber-800 text-white border-amber-900 shadow-xs'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-amber-50 hover:text-amber-900'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-stone-500 max-w-5xl mx-auto px-1">
        <span>
          Hiển thị <strong className="text-amber-900 font-bold">{filteredItems.length}</strong> bài văn khấn chuẩn cổ truyền
        </span>
        {(keyword || selectedCategory !== 'all') && (
          <button
            onClick={() => {
              setKeyword('');
              setSelectedCategory('all');
            }}
            className="text-amber-800 hover:underline cursor-pointer"
          >
            Đặt lại bộ lọc
          </button>
        )}
      </div>

      {/* Grid of Cards */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300 p-8 space-y-3 max-w-lg mx-auto">
          <BookOpen className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-base font-bold text-stone-700">Không tìm thấy bài văn khấn phù hợp</h3>
          <p className="text-xs text-stone-500">
            Hãy thử tìm kiếm với các từ khóa ngắn gọn hơn như "táo quân", "giao thừa", "khai trương"...
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setKeyword('');
              setSelectedCategory('all');
            }}
            className="border-amber-800 text-amber-900 hover:bg-amber-50"
          >
            Xem tất cả bài khấn
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            return (
              <Card 
                key={item.id} 
                className="border-amber-900/15 hover:border-amber-600/40 hover:shadow-md transition-all flex flex-col justify-between bg-white"
              >
                <CardHeader className="space-y-2.5 pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 bg-stone-50 px-2 py-0.5 rounded border border-stone-200">
                      {getCategoryIcon(item.category)}
                      {item.categoryName}
                    </span>
                  </div>

                  <CardTitle className="text-lg font-bold text-[#8B6914] line-clamp-2 hover:text-[#725510]">
                    <Link href={`/van-khan/${item.slug}`}>
                      {item.title}
                    </Link>
                  </CardTitle>

                  <CardDescription className="text-stone-600 text-xs line-clamp-2 leading-relaxed">
                    {item.shortDesc}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 pt-0 text-xs">
                  {/* Đối tượng & Thời gian */}
                  <div className="p-2.5 rounded-lg bg-[#FEF7E6]/70 border border-amber-900/10 space-y-1 text-stone-700">
                    <div className="flex items-start gap-1">
                      <span className="font-bold text-amber-950 shrink-0">Cúng:</span>
                      <span className="truncate">{item.target}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-stone-500">
                      <Clock className="w-3 h-3 text-amber-700 shrink-0" />
                      <span className="truncate">{item.timeRecommended}</span>
                    </div>
                  </div>

                  {/* Sắm lễ preview */}
                  <div className="space-y-1">
                    <span className="font-semibold text-stone-600 text-[11px]">Sắm lễ gồm:</span>
                    <ul className="text-[11px] text-stone-500 space-y-0.5 pl-3 list-disc">
                      {item.samLe.slice(0, 2).map((s, idx) => (
                        <li key={idx} className="truncate">{s}</li>
                      ))}
                      {item.samLe.length > 2 && (
                        <li className="text-amber-800 font-medium list-none -ml-3">
                          + {item.samLe.length - 2} món lễ vật khác...
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Link action */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">Chuẩn cổ truyền</span>
                    <Link 
                      href={`/van-khan/${item.slug}`} 
                      className="font-bold text-xs text-amber-800 hover:text-amber-950 flex items-center gap-1 hover:underline"
                    >
                      Xem bài khấn & sắm lễ <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
