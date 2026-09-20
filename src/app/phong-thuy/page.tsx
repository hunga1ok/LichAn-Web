import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Home, Compass, Heart, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Phong Thủy Cổ Truyền - Xem Tuổi Làm Nhà, Cung Mệnh Bát Trạch | Lịch An',
  description:
    'Chuyên mục phong thủy chính tông Lịch An: Xem tuổi làm nhà (Tam Tai, Kim Lâu, Hoang Ốc, mượn tuổi), Hướng nhà hợp mệnh Bát Trạch, Xem tuổi kết hôn.',
  keywords: ['phong thủy', 'xem tuổi làm nhà', 'bát trạch', 'cung mệnh', 'tam tai', 'kim lâu', 'hoang ốc', 'lịch an'],
  openGraph: {
    title: 'Phong Thủy Cổ Truyền | Lịch An',
    description: 'Ứng dụng phong thủy chính tông phục vụ đời sống gia đình và sự nghiệp.',
    type: 'website',
  },
};

export default function PhongThuyHubPage() {
  const tools = [
    {
      title: 'Xem Tuổi Làm Nhà & Mượn Tuổi',
      slug: 'xem-tuoi-lam-nha',
      badge: 'Công cụ nổi bật',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: Home,
      iconColor: 'text-amber-700 bg-amber-50 border-amber-200',
      desc: 'Tra cứu hạn Tam Tai, Kim Lâu, Hoang Ốc theo tuổi gia chủ. Tự động gợi ý danh sách tuổi đẹp nhất trong năm để mượn tuổi khi khởi công.',
      criteria: [
        'Tính chính xác tuổi mụ và số dư Kim Lâu',
        'Vòng 6 cung Hoang Ốc cổ truyền',
        'Phân định Tam Tai theo Tam Hợp cục',
        'Gợi ý danh sách tuổi sạch hạn để mượn tuổi',
      ],
      link: '/phong-thuy/xem-tuoi-lam-nha',
      cta: 'Tra cứu tuổi làm nhà ngay',
    },
    {
      title: 'Chọn Ngày Tốt Động Thổ & Cất Nóc',
      slug: 'xem-ngay-tot-dong-tho',
      badge: 'Trạch Nhật Chính Tông',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      icon: Sparkles,
      iconColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      desc: 'Sau khi được tuổi làm nhà, chọn ngày hoàng đạo có Sinh Khí, Thiên Phúc, Trực Kiến, Định; tránh xa ngày Thụ Tử, Sát Chủ, Thổ Phủ.',
      criteria: [
        'Căn cứ Hiệp Kỷ Biện Phương Thư',
        'Lọc bỏ 100% ngày Tam Nương, Nguyệt Kỵ',
        'Giờ hoàng đạo khởi công đào móng',
      ],
      link: '/xem-ngay-tot/dong-tho',
      cta: 'Chọn ngày động thổ',
    },
    {
      title: 'Văn Khấn Động Thổ & Nhập Trạch',
      slug: 'van-khan-nha-cua',
      badge: 'Nghi Lễ Chuẩn',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: Compass,
      iconColor: 'text-blue-700 bg-blue-50 border-blue-200',
      desc: 'Toàn văn bài cúng Thần Linh Thổ Địa, Long Mạch trước khi đào móng và bài cúng Nhập Trạch khi dọn về nhà mới.',
      criteria: [
        'Checklist sắm sửa lễ vật mâm cúng',
        'Bài văn khấn chuẩn cổ truyền',
        'Lưu ý thủ tục chuộc nhà khi mượn tuổi',
      ],
      link: '/van-khan/van-khan-dong-tho-lam-nha',
      cta: 'Xem bài văn khấn',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto pt-2">
        <Badge variant="outline" className="px-3.5 py-1 text-sm bg-amber-50 border-amber-300 text-primary">
          <ShieldCheck className="w-3.5 h-3.5 mr-1.5 inline" /> PHONG THỦY CHÍNH TÔNG KHÂM THIÊN GIÁM
        </Badge>
        <h1 className="text-3xl md:text-5xl font-black text-primary tracking-tight">
          Phong Thủy Cổ Truyền
        </h1>
        <p className="text-stone-600 md:text-lg leading-relaxed">
          Ứng dụng học thuyết Ngũ Hành, Bát Trạch và Trạch Cát cổ truyền nhằm giúp gia chủ an cư lạc nghiệp, gia đạo bình an, thịnh vượng bền lâu.
        </p>
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map((t, idx) => {
          const Icon = t.icon;
          return (
            <Card key={idx} className="border-amber-900/15 hover:border-amber-600/40 hover:shadow-md transition-all flex flex-col justify-between bg-white">
              <CardHeader className="space-y-3 pb-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${t.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className={`text-xs font-bold ${t.badgeColor}`}>
                    {t.badge}
                  </Badge>
                </div>

                <div>
                  <CardTitle className="text-xl font-bold text-primary">{t.title}</CardTitle>
                  <CardDescription className="text-stone-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
                    {t.desc}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pt-0">
                <div className="p-3 rounded-lg bg-background-alt/70 border border-amber-900/10 space-y-1.5 text-xs text-stone-700">
                  <span className="font-bold text-amber-950 block">Đặc điểm nổi bật:</span>
                  <ul className="space-y-1 pl-4 list-disc text-stone-600">
                    {t.criteria.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                <Link href={t.link} className="block">
                  <Button className="w-full bg-primary hover:bg-primary-dark text-white font-medium text-xs sm:text-sm shadow-xs cursor-pointer gap-1">
                    {t.cta} <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
