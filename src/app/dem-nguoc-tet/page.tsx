import React from 'react';
import type { Metadata } from 'next';
import DemNguocTetClient from './DemNguocTetClient';
import { getNextTetInfo } from '@/lib/tet/tet-info';

export async function generateMetadata(): Promise<Metadata> {
  const tetInfo = getNextTetInfo();
  return {
    title: `Đếm Ngược Tết ${tetInfo.canChiYear} ${tetInfo.solarDate.year} — Còn Bao Nhiêu Ngày Đến Tết? | Lịch An`,
    description: `Đồng hồ đếm ngược thời gian thực đến thời khắc Giao Thừa Tết ${tetInfo.canChiYear}. Xem lịch nghỉ Tết, hướng xuất hành mùng 1, giờ hoàng đạo và cẩm nang chuẩn bị Tết cổ truyền.`,
    keywords: [
      `đếm ngược tết ${tetInfo.canChiYear}`,
      `còn bao nhiêu ngày đến tết`,
      `tết ${tetInfo.canChiYear} vào ngày nào`,
      `giao thừa ${tetInfo.canChiYear}`,
      `lịch tết nguyên đán`,
    ],
    openGraph: {
      title: `Đếm Ngược Đến Giao Thừa Tết ${tetInfo.canChiYear} — Lịch An`,
      description: `Còn ${tetInfo.daysRemaining} ngày nữa là đến Tết Nguyên Đán ${tetInfo.canChiYear}! Cùng đón xuân sum vầy, an khang thịnh vượng.`,
      type: 'website',
      url: 'https://lichan.com/dem-nguoc-tet',
    },
  };
}

export default function DemNguocTetPage() {
  const tetInfo = getNextTetInfo();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `Tết Nguyên Đán ${tetInfo.canChiYear}`,
    startDate: `${tetInfo.solarDate.year}-${String(tetInfo.solarDate.month).padStart(2, '0')}-${String(tetInfo.solarDate.day).padStart(2, '0')}T00:00:00+07:00`,
    endDate: `${tetInfo.solarDate.year}-${String(tetInfo.solarDate.month).padStart(2, '0')}-${String(tetInfo.solarDate.day + 3).padStart(2, '0')}T23:59:59+07:00`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Việt Nam',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'VN',
      },
    },
    description: `Thời khắc Giao thừa và Tết Nguyên Đán ${tetInfo.canChiYear} mừng xuân mới truyền thống dân tộc.`,
  };

  return (
    <div className="min-h-screen bg-[#FEF7E6] py-10 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto">
        <DemNguocTetClient tetInfo={tetInfo} />
      </div>
    </div>
  );
}
