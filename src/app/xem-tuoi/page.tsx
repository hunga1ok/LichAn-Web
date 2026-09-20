import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Heart,
  Briefcase,
  Baby,
  Sparkles,
  Home,
  Compass,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Trung Tâm Tra Cứu Xem Tuổi Cổ Truyền — Lịch An',
  description: 'Bộ công cụ tra cứu xem tuổi chuẩn phong thủy: Xem tuổi vợ chồng kết hôn, xem tuổi làm ăn, xem tuổi sinh con hợp bố mẹ, xem tuổi xông đất và làm nhà.',
  keywords: ['xem tuổi', 'xem tuổi vợ chồng', 'xem tuổi làm ăn', 'xem tuổi sinh con', 'xem tuổi xông đất', 'hợp tuổi'],
  openGraph: {
    title: 'Trung Tâm Xem Tuổi Phong Thủy — Lịch An',
    description: 'Đánh giá hợp khắc tuổi vợ chồng, đối tác kinh doanh, sinh con và xông nhà chuẩn xác.',
    type: 'website',
    url: 'https://lichan.com/xem-tuoi',
  },
};

const XEM_TUOI_FEATURES = [
  {
    title: 'Xem Tuổi Vợ Chồng (Kết Hôn)',
    description: 'Đánh giá mức độ hòa hợp giữa hai tuổi dựa trên 5 yếu tố cốt lõi: Ngũ hành bản mệnh, Thiên can, Địa chi, Cung phi Bát trạch và Niên mệnh. Có hướng dẫn hóa giải nếu phạm cung xấu.',
    href: '/xem-tuoi/vo-chong',
    icon: Heart,
    badge: 'Hôn Nhân Đại Cát',
    bgColor: 'bg-rose-50/70',
    borderColor: 'border-rose-200',
    iconColor: 'text-rose-600',
    badgeColor: 'bg-rose-100 text-rose-800',
  },
  {
    title: 'Xem Tuổi Hợp Tác Làm Ăn',
    description: 'Tìm đối tác kinh doanh, góp vốn cùng chí hướng, tương sinh tài lộc. Phân tích chi tiết vai trò nên làm chủ trì ký kết hay quản lý tài chính hậu phương.',
    href: '/xem-tuoi/lam-an',
    icon: Briefcase,
    badge: 'Tài Vận Hanh Thông',
    bgColor: 'bg-blue-50/70',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600',
    badgeColor: 'bg-blue-100 text-blue-800',
  },
  {
    title: 'Xem Tuổi Sinh Con Hợp Bố Mẹ',
    description: 'Tính toán năm sinh con mang bản mệnh và can chi tương sinh với cả cha lẫn mẹ. Giúp em bé lớn lên thông minh khỏe mạnh, gia đình đón nhiều vượng khí tài lộc.',
    href: '/xem-tuoi/sinh-con',
    icon: Baby,
    badge: 'Phúc Lộc Gia Tộc',
    bgColor: 'bg-emerald-50/70',
    borderColor: 'border-emerald-200',
    iconColor: 'text-emerald-600',
    badgeColor: 'bg-emerald-100 text-emerald-800',
  },
  {
    title: 'Xem Tuổi Xông Đất / Mở Hàng',
    description: 'Chọn người xông nhà, mở hàng khai xuân đầu năm mới cho gia chủ. Tự động quét 60 hoa giáp và xếp hạng Top 10 tuổi đại cát nhất mang lại may mắn cả năm.',
    href: '/xem-tuoi/xong-dat',
    icon: Sparkles,
    badge: 'Khai Xuân Như Ý',
    bgColor: 'bg-amber-50/70',
    borderColor: 'border-amber-200',
    iconColor: 'text-amber-600',
    badgeColor: 'bg-amber-100 text-amber-800',
  },
  {
    title: 'Xem Tuổi Làm Nhà & Mượn Tuổi',
    description: 'Tra cứu 3 đại hạn Tam Tai, Kim Lâu, Hoang Ốc khi khởi công xây cất nhà cửa. Tự động quét danh sách các tuổi đẹp nhất trong năm để mượn tuổi động thổ.',
    href: '/phong-thuy/xem-tuoi-lam-nha',
    icon: Home,
    badge: 'An Cư Lạc Nghiệp',
    bgColor: 'bg-amber-50/50',
    borderColor: 'border-amber-200',
    iconColor: 'text-amber-800',
    badgeColor: 'bg-amber-100 text-amber-900',
  },
  {
    title: 'Tử Vi Cá Nhân Hóa & Niên Hạn',
    description: 'Tra cứu sao Cửu Diệu chiếu mệnh, Bát hạn niên vận, Cung Phi Bát Trạch hướng nhà và vận trình trọn đời theo năm sinh và giới tính.',
    href: '/tu-vi',
    icon: Compass,
    badge: 'Thiên Mệnh An Khang',
    bgColor: 'bg-stone-50/80',
    borderColor: 'border-stone-200',
    iconColor: 'text-stone-700',
    badgeColor: 'bg-stone-200 text-stone-800',
  },
];

export default function XemTuoiHubPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Trung Tâm Tra Cứu Xem Tuổi Cổ Truyền — Lịch An',
    description: 'Tổng hợp bộ công cụ xem tuổi vợ chồng, làm ăn, sinh con, xông đất và làm nhà chuẩn xác phong thủy phương Đông.',
    url: 'https://lichan.com/xem-tuoi',
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Banner Hero */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            Phong Thủy Cổ Truyền Việt Nam
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-950 font-serif">
            Trung Tâm Tra Cứu Xem Tuổi
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-700 leading-relaxed">
            Hệ thống phân tích sự tương sinh tương khắc giữa các tuổi theo chuẩn kinh điển <strong>Hiệp Kỷ Biện Phương Thư</strong> và <strong>Bát Trạch Minh Kính</strong>, phục vụ mọi quyết định trọng đại trong đời sống.
          </p>
        </div>

        {/* Danh Sách Các Công Cụ Xem Tuổi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {XEM_TUOI_FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className={`rounded-2xl p-6 border transition-all duration-200 flex flex-col justify-between group hover:shadow-md hover:-translate-y-1 ${item.bgColor} ${item.borderColor}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-white shadow-2xs ${item.iconColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-amber-900 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-xs text-gray-600 leading-relaxed mt-2 line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-gray-200/50 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:text-amber-950">
                  <span>Khám phá ngay</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
  );
}
