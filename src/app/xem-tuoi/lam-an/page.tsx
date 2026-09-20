import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, ArrowLeft } from 'lucide-react';
import LamAnClient from './LamAnClient';

export const metadata: Metadata = {
  title: 'Xem Tuổi Hợp Tác Làm Ăn & Kinh Doanh — Lịch An',
  description: 'Tra cứu tuổi làm ăn, mở công ty, chọn đối tác kinh doanh hợp phong thủy ngũ hành và tam hợp địa chi để buôn may bán đắt, tài lộc phát đạt.',
  keywords: ['xem tuổi làm ăn', 'tuổi hợp kinh doanh', 'chọn đối tác làm ăn', 'xem tuổi mở công ty'],
  openGraph: {
    title: 'Xem Tuổi Hợp Tác Làm Ăn — Lịch An',
    description: 'Đánh giá độ tương hợp kinh doanh, phân chia vai trò đối ngoại và quản lý dòng tiền.',
    type: 'website',
    url: 'https://lichan.com/xem-tuoi/lam-an',
  },
};

export default function LamAnPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Xem Tuổi Hợp Tác Làm Ăn — Lịch An',
    description: 'Công cụ tra cứu độ tương hợp giữa chủ sự và đối tác làm ăn theo phong thủy.',
    url: 'https://lichan.com/xem-tuoi/lam-an',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/xem-tuoi"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Quay lại Trung Tâm Xem Tuổi
      </Link>

      {/* Header Hero */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
          <Briefcase className="w-4 h-4 text-blue-600" />
          Tài Vận & Hợp Tác Kinh Doanh
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-amber-950 font-serif">
          Xem Tuổi Hợp Tác Làm Ăn
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Đánh giá độ tương hợp ngũ hành, can chi và cung phi giữa <strong>Chủ sự</strong> và <strong>Đối tác</strong> nhằm xây dựng sự nghiệp vững chắc, phát tài phát lộc.
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-12 text-stone-500">Đang tải công cụ xem tuổi làm ăn...</div>}>
        <LamAnClient />
      </Suspense>
    </div>
  );
}
