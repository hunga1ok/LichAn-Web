import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Sparkles, Compass } from 'lucide-react';
import TuViClient from './TuViClient';

export const metadata: Metadata = {
  title: 'Tử Vi Cá Nhân Hóa Theo Năm Sinh & 12 Con Giáp — Lịch An',
  description: 'Tra cứu tử vi, sao Cửu Diệu niên vận (La Hầu, Kế Đô, Thái Bạch...), Bát Hạn, Cung Phi Bát Trạch hướng nhà, hạn Tam Tai, Kim Lâu, Hoang Ốc dựa trên kinh điển cổ truyền.',
  keywords: [
    'tử vi cá nhân hóa',
    'sao chiếu mệnh 2026',
    'bát hạn niên vận',
    'cung phi bát trạch',
    'tra cứu tử vi theo năm sinh',
    'sao chiếu mệnh',
  ],
  openGraph: {
    title: 'Tử Vi Cá Nhân Hóa Theo Năm Sinh & Niên Hạn — Lịch An',
    description: 'Tra cứu sao chiếu mệnh, niên hạn, cung mệnh Bát Trạch và hướng nhà dựa trên kinh điển phong thủy cổ truyền.',
    type: 'website',
    url: 'https://lichan.com/tu-vi',
  },
};

export default function TuViPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Tử Vi Cá Nhân Hóa & Cửu Diệu Niên Hạn — Lịch An',
    description: 'Tra cứu tử vi trọn đời, sao chiếu mệnh, bát hạn niên vận và cung phi bát trạch theo năm sinh chuẩn phong thủy phương Đông.',
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-600" />
          Cửu Diệu Niên Hạn & Bát Trạch Minh Kính
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-950 font-serif">
          Tử Vi Cá Nhân Hóa & Vận Mệnh
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Luận giải chi tiết <strong>sao chiếu mệnh Cửu Diệu</strong>, <strong>Bát hạn niên vận</strong>, <strong>Cung Phi Bát Trạch</strong> và <strong>vận hạn hàng năm</strong> chuẩn xác theo năm sinh và giới tính.
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-12 text-stone-500">Đang tải công cụ tử vi...</div>}>
        <TuViClient />
      </Suspense>
    </div>
  );
}
