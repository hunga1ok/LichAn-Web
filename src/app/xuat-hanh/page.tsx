import { Metadata } from 'next';
import XuatHanhClient from './XuatHanhClient';

export const metadata: Metadata = {
  title: 'Hướng Xuất Hành Hôm Nay - Hỷ Thần, Tài Thần & Giờ Lý Thuần Phong | Lịch An',
  description: 'Tra cứu nhanh hướng xuất hành hôm nay: phương vị Hỷ Thần, Tài Thần theo Thiên Can ngày và 12 giờ Lý Thuần Phong. Biết ngay giờ nào tốt, hướng nào may mắn để khởi hành.',
  keywords: ['hướng xuất hành hôm nay', 'hỷ thần', 'tài thần', 'giờ lý thuần phong', 'xuất hành', 'lịch an'],
  openGraph: {
    title: 'Hướng Xuất Hành Hôm Nay | Lịch An',
    description: 'Tra cứu nhanh hướng Hỷ Thần, Tài Thần và giờ tốt xuất hành hôm nay.',
    type: 'website',
  },
};

export default function XuatHanhPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
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
        name: 'Hướng Xuất Hành Hôm Nay',
        item: 'https://lichan.com/xuat-hanh',
      },
    ],
  };

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <XuatHanhClient />
    </div>
  );
}
