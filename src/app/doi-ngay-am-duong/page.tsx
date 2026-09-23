import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import DoiNgayClient from './DoiNgayClient';

export const metadata: Metadata = {
  title: 'Đổi Ngày Âm Dương - Chuyển Lịch Dương Sang Âm & Âm Sang Dương',
  description: 'Công cụ chuyển đổi ngày Âm sang Dương và Dương sang Âm dựa trên thuật toán thiên văn học Hồ Ngọc Đức. Tra cứu can chi, trực, tiết khí và ngũ hành ngày.',
  keywords: [
    'đổi ngày âm dương',
    'chuyển ngày âm sang dương',
    'chuyển ngày dương sang âm',
    'tính ngày âm',
    'đổi lịch âm',
    'lịch vạn niên đổi ngày',
    'lịch an',
  ],
  openGraph: {
    title: 'Đổi Ngày Âm Dương | Lịch An',
    description: 'Chuyển đổi qua lại giữa lịch Dương và lịch Âm dựa trên thuật toán thiên văn học Hồ Ngọc Đức.',
    type: 'website',
    url: 'https://lichan.com/doi-ngay-am-duong',
  },
};

export default function DoiNgayPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Công Cụ Đổi Ngày Âm Dương — Lịch An',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'VND',
    },
    description: 'Tiện ích chuyển đổi lịch âm dương dựa trên thuật toán thiên văn học Hồ Ngọc Đức.',
    url: 'https://lichan.com/doi-ngay-am-duong',
  };

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div className="text-center py-12 text-stone-500">Đang tải công cụ đổi ngày...</div>}>
        <DoiNgayClient />
      </Suspense>
    </div>
  );
}
