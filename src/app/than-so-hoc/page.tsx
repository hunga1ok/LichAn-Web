import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import ThanSoHocClient from './ThanSoHocClient';

export const metadata: Metadata = {
  title: 'Tra Cứu Thần Số Học Pythagoras - Khám Phá Số Chủ Đạo & Vận Mệnh',
  description: 'Tra cứu thần số học Pythagoras online miễn phí theo ngày tháng năm sinh. Khám phá con số chủ đạo, điểm mạnh, thách thức cuộc đời và định hướng nghề nghiệp chuẩn xác.',
  keywords: [
    'thần số học',
    'thần số học pythagoras',
    'số chủ đạo',
    'tra cứu số chủ đạo',
    'nhân số học',
    'tính số chủ đạo',
    'lịch an',
  ],
  openGraph: {
    title: 'Tra Cứu Thần Số Học Pythagoras Chính Xác | Lịch An',
    description: 'Khám phá con số chủ đạo, bài học thử thách và định hướng nghề nghiệp chuẩn xác theo ngày sinh.',
    type: 'website',
    url: 'https://lichan.com/than-so-hoc',
  },
};

export default function ThanSoHocPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Tra Cứu Thần Số Học Pythagoras — Lịch An',
    description: 'Công cụ tính toán số chủ đạo và luận giải vận mệnh theo trường phái Pythagoras.',
    url: 'https://lichan.com/than-so-hoc',
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
          name: 'Thần Số Học',
          item: 'https://lichan.com/than-so-hoc',
        },
      ],
    },
  };

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div className="text-center py-12 text-stone-500">Đang tải công cụ thần số học...</div>}>
        <ThanSoHocClient />
      </Suspense>
    </div>
  );
}
