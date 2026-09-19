import React from 'react';
import type { Metadata } from 'next';
import { CalendarCheck, ShieldCheck, Clock, Zap } from 'lucide-react';
import DongBoLichClient from './DongBoLichClient';
import { getYearLunarEvents } from '@/lib/calendar-sync/ics-generator';

export const metadata: Metadata = {
  title: 'Đồng Bộ Lịch Âm Vào Điện Thoại (.ICS / Webcal) — Lịch An',
  description: 'Tự động nhắc ngày Rằm (15 âm) và Mùng 1 âm lịch trên iPhone, iPad, Android, Google Calendar và Outlook. Thông báo nhắc trước 20:00 tối hôm trước để chuẩn bị lễ vật.',
  keywords: ['đồng bộ lịch âm', 'lịch âm iphone', 'lịch âm google calendar', 'nhắc ngày rằm mùng 1', 'file ics lịch âm', 'webcal lich am'],
  openGraph: {
    title: 'Đồng Bộ Lịch Âm Vào Điện Thoại (.ICS / Webcal) — Lịch An',
    description: 'Tự động nhắc ngày Rằm, Mùng 1 và các ngày lễ cổ truyền trên điện thoại kèm giờ hoàng đạo, can chi.',
    type: 'website',
    url: 'https://lichan.com/dong-bo-lich',
  },
};

export default function DongBoLichPage() {
  const currentYear = new Date().getFullYear();
  // Lấy danh sách mẫu sự kiện năm hiện tại
  const events = getYearLunarEvents(currentYear, {
    includeRamMung1: true,
    includeFestivals: true,
    enableReminder: true,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Đồng Bộ Lịch Âm Lịch An',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'iOS, Android, macOS, Windows',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'VND',
    },
    description: 'Tiện ích đồng bộ ngày Rằm, Mùng 1 và các ngày lễ Tết cổ truyền Việt Nam vào ứng dụng Lịch trên điện thoại thông minh.',
  };

  return (
    <div className="min-h-screen bg-[#FEF7E6] py-10 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto space-y-10">
        {/* Banner Hero */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <CalendarCheck className="w-4 h-4 text-amber-700" />
            Tiện ích Đồng Bộ Lịch Thông Minh
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-950 font-serif">
            Đồng Bộ Lịch Âm Vào Điện Thoại
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-700 leading-relaxed">
            Nhắc nhở tự động ngày <strong>Rằm (15 âm)</strong>, <strong>Mùng 1</strong> và các dịp <strong>Lễ Tết cổ truyền</strong> trực tiếp trên iPhone, Android, Google Calendar mà không cần cài đặt thêm ứng dụng nào.
          </p>

          {/* 3 Lợi thế nổi bật */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto pt-4 text-left">
            <div className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur rounded-xl border border-amber-200/70">
              <Clock className="w-5 h-5 text-amber-700 shrink-0" />
              <div className="text-xs text-gray-700">
                <span className="font-bold block text-gray-900">Nhắc trước 20:00 tối</span>
                Kịp chuẩn bị hoa quả, lễ vật
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur rounded-xl border border-amber-200/70">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-xs text-gray-700">
                <span className="font-bold block text-gray-900">Chuẩn thiên văn học</span>
                Thuật toán Hồ Ngọc Đức
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur rounded-xl border border-amber-200/70">
              <Zap className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="text-xs text-gray-700">
                <span className="font-bold block text-gray-900">Cài đặt 1-Click</span>
                Tự động đồng bộ mãi mãi
              </div>
            </div>
          </div>
        </div>

        {/* Khối chức năng chính */}
        <DongBoLichClient initialEvents={events} currentYear={currentYear} />
      </div>
    </div>
  );
}
