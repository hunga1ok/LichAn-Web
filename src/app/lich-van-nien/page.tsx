import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import LichVanNienClient from './LichVanNienClient';

export const metadata: Metadata = {
  title: 'Lịch Vạn Niên 2026 - Tra Cứu Lịch Âm Dương Từng Tháng Chuẩn Xác',
  description: 'Tra cứu Lịch Vạn Niên 2026 và các năm chuẩn thiên văn Hồ Ngọc Đức. Xem chi tiết ngày âm, ngày dương, giờ hoàng đạo, ngày rằm, mùng 1 và các ngày lễ truyền thống.',
  keywords: [
    'lịch vạn niên',
    'lịch vạn niên 2026',
    'tra cứu lịch âm',
    'lịch âm tháng',
    'xem lịch âm dương',
    'ngày hoàng đạo tháng',
    'lịch an',
  ],
  openGraph: {
    title: 'Lịch Vạn Niên 2026 - Tra Cứu Lịch Âm Dương Chuẩn Xác | Lịch An',
    description: 'Tra cứu Lịch Vạn Niên các năm chuẩn thiên văn, xem ngày tốt hoàng đạo, ngày rằm, mùng 1.',
    type: 'website',
    url: 'https://lichan.com/lich-van-nien',
  },
};

export default function LichVanNienPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Lịch Vạn Niên 2026 — Lịch An',
    description: 'Bảng tra cứu lịch vạn niên âm dương từng tháng chuẩn xác theo thuật toán thiên văn học Hồ Ngọc Đức.',
    url: 'https://lichan.com/lich-van-nien',
    breadcrumb: {
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
          name: 'Lịch Vạn Niên',
          item: 'https://lichan.com/lich-van-nien',
        },
      ],
    },
  };

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div className="text-center py-12 text-stone-500">Đang tải lịch vạn niên...</div>}>
        <LichVanNienClient />
      </Suspense>
    </div>
  );
}
