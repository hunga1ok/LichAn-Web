import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Building2, Hammer, Compass, ShieldCheck, BookOpen, CheckCircle, ArrowRight, Sparkles, Scissors, HardHat } from 'lucide-react';
import { lunarService } from '@/lib/lunar';

export const metadata: Metadata = {
  title: 'Xem Ngày Tốt Chuyên Sâu - Cưới Hỏi, Khai Trương, Động Thổ, Xuất Hành | Lịch An',
  description: 'Tra cứu ngày lành tháng tốt, hoàng đạo cát nhật chuẩn Hiệp Kỷ Biện Phương Thư và Ngọc Hạp Thông Thư. Loại trừ triệt để Tam Nương, Nguyệt Kỵ, Sát Chủ, Thụ Tử.',
  keywords: ['xem ngày tốt', 'ngày tốt cưới hỏi', 'ngày tốt khai trương', 'ngày tốt động thổ', 'ngày tốt xuất hành', 'ngày bất tương', 'lịch an'],
  openGraph: {
    title: 'Xem Ngày Tốt Chuyên Sâu | Lịch An',
    description: 'Chọn ngày lành tháng tốt theo phong thủy chính tông Khâm Thiên Giám triều Nguyễn.',
    type: 'website',
  },
};

export default function XemNgayTotHubPage() {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  // Thống kê nhanh số ngày tốt trong tháng hiện tại cho từng mục đích
  const weddingDays = lunarService.getAuspiciousDays('cuoi-hoi', currentMonth, currentYear).filter(d => d.isAuspicious);
  const businessDays = lunarService.getAuspiciousDays('khai-truong', currentMonth, currentYear).filter(d => d.isAuspicious);
  const buildDays = lunarService.getAuspiciousDays('dong-tho', currentMonth, currentYear).filter(d => d.isAuspicious);
  const travelDays = lunarService.getAuspiciousDays('xuat-hanh', currentMonth, currentYear).filter(d => d.isAuspicious);
  const haircutDays = lunarService.getAuspiciousDays('cat-toc', currentMonth, currentYear).filter(d => d.isAuspicious);
  const roofDays = lunarService.getAuspiciousDays('cat-noc', currentMonth, currentYear).filter(d => d.isAuspicious);

  const categories = [
    {
      id: 'cuoi-hoi',
      title: 'Xem Ngày Cưới Hỏi',
      slug: 'cuoi-hoi',
      icon: Heart,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      badge: 'Trăm Năm Hạnh Phúc',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      goodCount: weddingDays.length,
      description: 'Lựa chọn ngày kết hôn, đính hôn, dạm ngõ mang lại gia đạo hòa hợp, hạnh phúc viên mãn.',
      criteria: [
        'Ưu tiên ngày Âm Dương Bất Tương (đại cát hôn sự)',
        'Hợp Trực Định, Trực Thành, Trực Mãn',
        'Sao tốt: Thiên Hỷ, Hỷ Thần, Nguyệt Ân',
        'Kiêng tuyệt đối: Tam Nương, Nguyệt Kỵ, Cô Thần, Quả Tú, Ly Sàng',
      ],
    },
    {
      id: 'khai-truong',
      title: 'Xem Ngày Khai Trương',
      slug: 'khai-truong',
      icon: Building2,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      badge: 'Tài Lộc Hanh Thông',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      goodCount: businessDays.length,
      description: 'Chọn ngày mở hàng, khai trương cửa hàng, thành lập công ty buôn may bán đắt, tài lộc dồi dào.',
      criteria: [
        'Ưu tiên Trực Khai (khai mở), Trực Mãn, Trực Thành',
        'Kích hoạt sao: Thiên Tài, Nguyệt Tài, Lộc Mã, Địa Tài',
        'Tránh ngày Sát Chủ, Nguyệt Phá, Thụ Tử',
        'Kiêng sao xấu: Đại Hao, Tiểu Hao, Kiếp Sát',
      ],
    },
    {
      id: 'dong-tho',
      title: 'Xem Ngày Động Thổ',
      slug: 'dong-tho',
      icon: Hammer,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      badge: 'Khởi Tạo Vững Bền',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      goodCount: buildDays.length,
      description: 'Chọn ngày khởi công xây dựng, đào móng, đặt đá tạo nền móng vững chắc, bình an trường cửu.',
      criteria: [
        'Ưu tiên Trực Kiến, Trực Định, Trực Bình, Trực Khai',
        'Cát tinh: Sinh Khí, Thiên Phúc, Nguyệt Đức, Thiên Đức',
        'Tuyệt đối kiêng: Thụ Tử, Sát Chủ, Tam Nương, Nguyệt Kỵ',
        'Tránh sao kỵ đất: Thổ Phủ, Địa Phá, Hoang Vu, Vãng Vong',
      ],
    },
    {
      id: 'cat-noc',
      title: 'Xem Ngày Cất Nóc',
      slug: 'cat-noc',
      icon: HardHat,
      color: 'text-teal-700 bg-teal-50 border-teal-200',
      badge: 'Thượng Lương Đại Cát',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
      goodCount: roofDays.length,
      description: 'Chọn ngày cất nóc, đổ mái, thượng lương hoàn thiện phần mái. Khác động thổ ở phần trên công trình.',
      criteria: [
        'Ưu tiên Trực Thành (thành tựu), Trực Định (ổn định), Trực Khai',
        'Cát tinh: Sinh Khí, Thiên Phúc, Nguyệt Đức, Thiên Quý',
        'Kiêng kỵ: Sát Chủ, Thụ Tử, Tam Nương, Nguyệt Kỵ',
        'Tránh sao kỵ: Thổ Phủ, Địa Phá, Đại Hao, Vãng Vong',
      ],
    },
    {
      id: 'xuat-hanh',
      title: 'Xem Ngày Xuất Hành',
      slug: 'xuat-hanh',
      icon: Compass,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      badge: 'Bình An Vạn Dặm',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      goodCount: travelDays.length,
      description: 'Tra cứu hướng đón Hỷ Thần, Tài Thần và 6 giờ Lý Thuần Phong giúp chuyến đi thượng lộ bình an.',
      criteria: [
        'Tọa độ chuẩn đón Hỷ Thần & Tài Thần theo Thiên Can ngày',
        '6 giờ Lý Thuần Phong: Đại An, Tốc Hỷ, Tiểu Cát',
        'Ưu tiên Trực Khai, Trực Thành, sao Dịch Mã, Thiên Mã',
        'Tránh giờ Xích Khẩu, Lưu Niên, Không Vong và sao Bạch Hổ',
      ],
    },
    {
      id: 'cat-toc',
      title: 'Xem Ngày Cắt Tóc',
      slug: 'cat-toc',
      icon: Scissors,
      color: 'text-violet-600 bg-violet-50 border-violet-200',
      badge: 'Đón Vận Hanh Thông',
      badgeColor: 'bg-violet-100 text-violet-800 border-violet-200',
      goodCount: haircutDays.length,
      description: 'Chọn ngày tốt cắt tóc, gội đầu theo phong thủy giúp đón vận may, tinh thần sảng khoái.',
      criteria: [
        'Đặc biệt tốt: Trực Trừ (trừ bỏ xui xẻo, đón cái mới)',
        'Hợp Trực Mãn, Trực Thành, Trực Khai',
        'Cát tinh: Thiên Đức, Nguyệt Đức, Thiên Hỷ, Tam Hợp',
        'Kiêng kỵ: Bạch Hổ, Thiên Hình, Kiếp Sát, ngày Tam Nương',
      ],
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
        <Badge variant="outline" className="px-3.5 py-1 text-sm bg-amber-50 border-amber-300 text-primary">
          <Sparkles className="w-3.5 h-3.5 mr-1.5 inline" /> KHÂM THIÊN GIÁM CHÍNH TÔNG
        </Badge>
        <h1 className="text-3xl md:text-5xl font-black text-primary tracking-tight">
          Xem Ngày Tốt Chuyên Sâu
        </h1>
        <p className="text-stone-600 md:text-lg leading-relaxed">
          Hệ thống chọn ngày lành tháng tốt chuẩn xác theo kinh điển cổ thư 
          <strong className="text-amber-900 font-semibold"> Hiệp Kỷ Biện Phương Thư</strong> và 
          <strong className="text-amber-900 font-semibold"> Ngọc Hạp Thông Thư</strong>. 
          Loại bỏ hoàn toàn cảm tính, đảm bảo 100% căn cứ toán học & thiên văn cổ truyền.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Card key={cat.id} className="border-amber-900/15 hover:border-amber-500/40 hover:shadow-md transition-all flex flex-col justify-between">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${cat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className={`text-xs font-semibold ${cat.badgeColor}`}>
                    {cat.badge}
                  </Badge>
                </div>
                <div>
                  <CardTitle className="text-2xl text-primary">{cat.title}</CardTitle>
                  <CardDescription className="text-stone-600 mt-1.5 text-sm leading-relaxed">
                    {cat.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pt-0">
                <div className="p-3.5 rounded-lg bg-background-alt/70 border border-amber-900/10 space-y-2">
                  <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    Quy tắc trạch cát cổ truyền:
                  </div>
                  <ul className="text-xs text-stone-700 space-y-1.5">
                    {cat.criteria.map((cr, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span>{cr}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-stone-500">
                    Tháng {currentMonth}/{currentYear}: <strong className="text-emerald-700 font-bold">{cat.goodCount} ngày tốt</strong>
                  </span>
                  <Link href={`/xem-ngay-tot/${cat.slug}`}>
                    <Button className="bg-primary hover:bg-primary-dark text-white gap-1.5 font-medium shadow-sm">
                      Chọn ngày ngay <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Trust & Quality Assurance Section */}
      <div className="rounded-2xl bg-white border border-amber-900/15 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-amber-900/10 pb-4">
          <div className="p-2.5 rounded-lg bg-amber-50 text-primary border border-amber-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-primary">
              Thuật toán Trạch Nhật của Lịch An được xây dựng dựa trên nguyên tắc nào?
            </h2>
            <p className="text-stone-500 text-xs md:text-sm">
              Quy trình đối soát 3 tầng bài bản, minh bạch căn cứ, nói không với phán đoán mê tín dị đoan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="space-y-2 p-4 rounded-xl bg-stone-50 border border-stone-200/80">
            <div className="font-bold text-amber-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center font-black">1</span>
              Tầng 1: Sàng Lọc Các Ngày Kiêng Kỵ Dân Gian
            </div>
            <p className="text-stone-600 text-xs leading-relaxed">
              Tất cả các ngày phạm <strong>Tam Nương</strong> (mùng 3, 7, 13, 18, 22, 27 âm), <strong>Nguyệt Kỵ</strong> (mùng 5, 14, 23 âm), 
              <strong> Sát Chủ</strong>, <strong>Thụ Tử</strong>, hoặc <strong>Nguyệt Phá</strong> đều bị hệ thống tự động loại bỏ khỏi danh sách ngày tốt.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-stone-50 border border-stone-200/80">
            <div className="font-bold text-amber-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center font-black">2</span>
              Tầng 2: Đối Soát Bản Đồ Chuyên Biệt
            </div>
            <p className="text-stone-600 text-xs leading-relaxed">
              Mỗi việc có tiêu chí riêng: Cưới hỏi bắt buộc tra cứu bảng <strong>Âm Dương Bất Tương</strong>; Khai trương ưu tiên <strong>Trực Khai, Mãn</strong>; 
              Động thổ chọn <strong>Trực Kiến, Bình</strong>; Xuất hành đối chiếu <strong>Hỷ Thần, Tài Thần</strong>.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-stone-50 border border-stone-200/80">
            <div className="font-bold text-amber-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center font-black">3</span>
              Tầng 3: Chấm Điểm & Minh Bạch Lý Do
            </div>
            <p className="text-stone-600 text-xs leading-relaxed">
              Mỗi ngày hiển thị điểm số (0 - 100) kèm đầy đủ danh sách sao tốt chiếu mệnh, trực nhật và các giờ hoàng đạo cát lợi nhất để người dùng an tâm lựa chọn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
