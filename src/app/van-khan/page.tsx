import { Metadata } from 'next';
import VanKhanHubClient from './VanKhanHubClient';
import { getAllVanKhan } from '@/lib/van-khan';
import { Badge } from '@/components/ui/badge';
import { Sparkles, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kho Văn Khấn Cổ Truyền - Trọn Bộ Bài Cúng Chuẩn Phong Tục Việt Nam | Lịch An',
  description:
    'Tra cứu trọn bộ các bài văn khấn cổ truyền: Văn khấn Mùng 1, Ngày Rằm, Khai trương, Động thổ, Cất nóc, Nhập trạch, Cúng Thần Tài, Táo Quân, Giao thừa. Hướng dẫn sắm lễ mâm cúng đầy đủ, chuẩn nghi thức tâm linh.',
  keywords: [
    'văn khấn',
    'văn khấn cổ truyền',
    'văn khấn mùng 1',
    'văn khấn ngày rằm',
    'văn khấn nhập trạch',
    'văn khấn khai trương',
    'văn khấn động thổ',
    'văn khấn thần tài',
    'lịch an',
  ],
  openGraph: {
    title: 'Kho Văn Khấn Cổ Truyền Chuẩn Phong Tục | Lịch An',
    description: 'Trọn bộ bài văn khấn nghi lễ phong tục Việt Nam, hướng dẫn sắm lễ chu đáo và chính xác.',
    type: 'website',
  },
};

export default function VanKhanPage() {
  const items = getAllVanKhan();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Kho Văn Khấn Cổ Truyền Việt Nam - Lịch An',
    description: 'Trọn bộ các bài văn khấn chuẩn cổ truyền theo phong tục tín ngưỡng Việt Nam.',
    url: 'https://lichan.com/van-khan',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        url: `https://lichan.com/van-khan/${item.slug}`,
      })),
    },
  };

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-2">
        <Badge variant="outline" className="px-3.5 py-1 text-sm bg-amber-50 border-amber-300 text-primary">
          <BookOpen className="w-3.5 h-3.5 mr-1.5 inline" /> NGHI LỄ PHONG TỤC CỔ TRUYỀN
        </Badge>
        <h1 className="text-3xl md:text-5xl font-black text-primary tracking-tight">
          Kho Văn Khấn Cổ Truyền
        </h1>
        <p className="text-stone-600 md:text-lg leading-relaxed">
          Tổng hợp đầy đủ các bài văn khấn kinh điển theo phong tục cổ truyền Việt Nam. 
          Kèm hướng dẫn chi tiết cách sắm sửa lễ vật và nghi thức hành lễ trang nghiêm, thành kính.
        </p>
      </div>

      {/* Hub Client Component */}
      <VanKhanHubClient initialItems={items} />
    </div>
  );
}
