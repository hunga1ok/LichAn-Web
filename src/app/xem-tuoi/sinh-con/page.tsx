import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Baby, ArrowLeft } from 'lucide-react';
import SinhConClient from './SinhConClient';

export const metadata: Metadata = {
  title: 'Xem Tuổi Sinh Con Hợp Tuổi Bố Mẹ — Lịch An',
  description: 'Tra cứu năm sinh con hợp tuổi bố mẹ, ngũ hành tương sinh, thiên can tương hợp để con cái khỏe mạnh thông minh, gia đình hạnh phúc phú quý.',
  keywords: ['xem tuổi sinh con', 'năm sinh con hợp bố mẹ', 'chọn năm sinh con', 'sinh con hợp tuổi'],
  openGraph: {
    title: 'Xem Tuổi Sinh Con Hợp Tuổi Bố Mẹ — Lịch An',
    description: 'Tính toán năm sinh con mang bản mệnh và can chi hòa hợp nhất với cha mẹ.',
    type: 'website',
    url: 'https://lichan.com/xem-tuoi/sinh-con',
  },
};

export default function SinhConPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Xem Tuổi Sinh Con Hợp Bố Mẹ — Lịch An',
    description: 'Công cụ tra cứu năm sinh con đẹp nhất hợp phong thủy bố mẹ.',
    url: 'https://lichan.com/xem-tuoi/sinh-con',
  };

  return (
    <div className="min-h-screen bg-[#FEF7E6] py-10 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          href="/xem-tuoi"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại Trung Tâm Xem Tuổi
        </Link>

        {/* Header Hero */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Baby className="w-4 h-4 text-emerald-600" />
            Phúc Lộc Gia Đình & Hậu Duệ
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-amber-950 font-serif">
            Xem Tuổi Sinh Con Hợp Bố Mẹ
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Phân tích tương sinh bản mệnh và can chi giữa <strong>Bố, Mẹ</strong> và <strong>Con</strong> nhằm đón chào thành viên mới bình an, khỏe mạnh và mang lại vượng khí cho gia đình.
          </p>
        </div>

        <SinhConClient />
      </div>
    </div>
  );
}
