import { Metadata } from 'next';
import XemTuoiClient from './XemTuoiClient';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Home, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Xem Tuổi Làm Nhà Chuẩn Nhất - Tra Cứu Tam Tai, Kim Lâu, Hoang Ốc & Mượn Tuổi | Lịch An',
  description:
    'Công cụ xem tuổi làm nhà chuẩn phong thủy cổ truyền. Tra cứu chi tiết 3 đại hạn Tam Tai, Kim Lâu, Hoang Ốc. Tự động gợi ý danh sách tuổi đẹp nhất trong năm để mượn tuổi khi phạm hạn.',
  keywords: [
    'xem tuổi làm nhà',
    'tam tai',
    'kim lâu',
    'hoang ốc',
    'mượn tuổi làm nhà',
    'xem tuổi xây nhà',
    'phong thủy làm nhà',
    'lịch an',
  ],
  openGraph: {
    title: 'Xem Tuổi Làm Nhà - Tam Tai, Kim Lâu, Hoang Ốc & Mượn Tuổi | Lịch An',
    description: 'Tra cứu tuổi làm nhà chính xác theo phong thủy cổ truyền, gợi ý tuổi mượn đẹp nhất.',
    type: 'website',
  },
};

export default function XemTuoiLamNhaPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Trang chủ',
        item: 'https://lichan.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Phong Thủy',
        item: 'https://lichan.com/phong-thuy',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Xem Tuổi Làm Nhà',
        item: 'https://lichan.com/phong-thuy/xem-tuoi-lam-nha',
      },
    ],
  };

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto pt-2">
        <Badge variant="outline" className="px-3.5 py-1 text-sm bg-amber-50 border-amber-300 text-primary">
          <Home className="w-3.5 h-3.5 mr-1.5 inline" /> PHONG THỦY XÂY DỰNG NHÀ CỬA
        </Badge>
        <h1 className="text-3xl md:text-5xl font-black text-primary tracking-tight">
          Xem Tuổi Làm Nhà
        </h1>
        <p className="text-stone-600 md:text-lg leading-relaxed">
          Tra cứu chính xác 3 đại hạn <strong className="text-amber-950 font-bold">Tam Tai</strong>, 
          <strong className="text-amber-950 font-bold"> Kim Lâu</strong>, 
          <strong className="text-amber-950 font-bold"> Hoang Ốc</strong> và nhận gợi ý danh sách tuổi đẹp nhất để mượn tuổi khi phạm hạn.
        </p>
      </div>

      <XemTuoiClient />
    </div>
  );
}
