import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart, ArrowLeft, ShieldCheck } from 'lucide-react';
import VoChongClient from './VoChongClient';

export const metadata: Metadata = {
  title: 'Xem Tuổi Vợ Chồng Kết Hôn Có Hợp Nhau Không — Lịch An',
  description: 'Tra cứu tuổi vợ chồng hợp khắc theo 5 yếu tố phong thủy: Ngũ hành bản mệnh, Thiên can, Địa chi, Cung phi Bát trạch và Niên mệnh. Thang điểm 10/10 và cách hóa giải.',
  keywords: ['xem tuổi vợ chồng', 'xem tuổi kết hôn', 'tuổi vợ chồng hợp nhau', 'hóa giải xung khắc vợ chồng', 'cung phi vợ chồng'],
  openGraph: {
    title: 'Xem Tuổi Vợ Chồng Kết Hôn Chuẩn Phong Thủy — Lịch An',
    description: 'Đánh giá độ hòa hợp hôn nhân, tài vận và con cái dựa trên 5 yếu tố cổ truyền.',
    type: 'website',
    url: 'https://lichan.com/xem-tuoi/vo-chong',
  },
};

export default function VoChongPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Xem Tuổi Vợ Chồng Kết Hôn — Lịch An',
    description: 'Công cụ chấm điểm độ hòa hợp hôn nhân giữa hai tuổi theo ngũ hành, can chi và bát trạch.',
    url: 'https://lichan.com/xem-tuoi/vo-chong',
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-4 h-4 text-rose-600" />
            Hôn Nhân & Hòa Hợp Gia Đạo
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-amber-950 font-serif">
            Xem Tuổi Vợ Chồng Kết Hôn
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Đánh giá hợp khắc theo 5 tiêu chuẩn kinh điển: <strong>Ngũ hành, Thiên can, Địa chi, Cung phi Bát trạch</strong> và <strong>Niên mệnh</strong> kèm lời khuyên hóa giải gia đạo.
          </p>
        </div>

        <VoChongClient />
      </div>
    </div>
  );
}
