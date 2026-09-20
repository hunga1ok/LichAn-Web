import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ArrowLeft } from 'lucide-react';
import XongDatClient from './XongDatClient';

export const metadata: Metadata = {
  title: 'Xem Tuổi Xông Đất & Mở Hàng Đầu Năm — Lịch An',
  description: 'Tra cứu tuổi xông đất, xông nhà, mở hàng khai xuân đầu năm mới cho gia chủ. Xếp hạng Top tuổi đẹp nhất mang lại bình an, tài lộc, vạn sự hanh thông cả năm.',
  keywords: ['xem tuổi xông đất', 'tuổi xông nhà', 'chọn người xông đất', 'tuổi mở hàng khai xuân', 'xông đất đầu năm'],
  openGraph: {
    title: 'Xem Tuổi Xông Đất & Mở Hàng Khai Xuân — Lịch An',
    description: 'Tìm người hợp tuổi xông nhà, mở hàng đầu năm mới đại cát đại lợi.',
    type: 'website',
    url: 'https://lichan.com/xem-tuoi/xong-dat',
  },
};

export default function XongDatPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Xem Tuổi Xông Đất & Mở Hàng Đầu Năm — Lịch An',
    description: 'Công cụ tra cứu và xếp hạng người hợp tuổi xông đất đầu năm mới.',
    url: 'https://lichan.com/xem-tuoi/xong-dat',
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-600" />
          Phong Tục Khai Xuân Đại Cát
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-amber-950 font-serif">
          Xem Tuổi Xông Đất & Mở Hàng Đầu Năm
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Thuật toán phân tích 3 chiều giữa <strong>Gia chủ, Năm mới</strong> và <strong>Người xông đất</strong> nhằm chọn ra người mang nguồn sinh khí tốt lành nhất nghênh đón xuân mới.
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-12 text-stone-500">Đang tải công cụ xem tuổi xông đất...</div>}>
        <XongDatClient />
      </Suspense>
    </div>
  );
}
