import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDayInfo, getXuatHanhInfo } from '@/lib/lunar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Flame, 
  ArrowRight,
  RotateCcw,
  Star,
  BookOpen,
  AlertTriangle,
  ShieldAlert,
  Scale,
  Award,
  Info
} from 'lucide-react';

interface Props {
  params: Promise<{ date: string }>;
}

function parseAndValidateDate(dateStr: string) {
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  if (year < 1800 || year > 2199) return null;
  if (month < 1 || month > 12) return null;
  const maxDays = new Date(year, month, 0).getDate();
  if (day < 1 || day > maxDays) return null;
  return { day, month, year };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  const parsed = parseAndValidateDate(date);
  if (!parsed) {
    return { title: 'Không tìm thấy ngày - Lịch An' };
  }

  const { day, month, year } = parsed;
  const dayInfo = getDayInfo(day, month, year);
  const lunarDay = dayInfo.lunarDate.day;
  const lunarMonth = dayInfo.lunarDate.month;
  const leapStr = dayInfo.lunarDate.leap ? ' (Nhuận)' : '';
  const canChiDay = dayInfo.canChiDay.fullName;
  const canChiYear = dayInfo.canChiYear.fullName;

  const hoangDaoStr = dayInfo.ngayHoangDao?.name ? ` — ${dayInfo.ngayHoangDao.name}` : '';
  const lucDieuStr = dayInfo.lucDieu?.name ? `, Lục Diệu ${dayInfo.lucDieu.name}` : '';
  const napAmStr = dayInfo.napAm ? `, Nạp âm ${dayInfo.napAm}` : '';

  const title = `Chi Tiết Ngày ${day}/${month}/${year}${hoangDaoStr} — Âm Lịch ${lunarDay}/${lunarMonth} Ngày ${canChiDay}`;
  const description = `Tra cứu Lịch Vạn Sự ngày ${day}/${month}/${year} dương lịch (tức ngày ${lunarDay}/${lunarMonth}${leapStr} năm ${canChiYear} âm lịch, ngày ${canChiDay}${napAmStr}). Xem ${dayInfo.ngayHoangDao?.name || 'Hoàng Đạo'}${lucDieuStr}, tiết khí ${dayInfo.tietKhi}, trực ${dayInfo.truc}, nhị thập bát tú, tuổi xung khắc, sao tốt xấu và luận giải đánh giá tổng quan.`;

  return {
    title,
    description,
    keywords: [
      `xem ngày ${day} tháng ${month} năm ${year}`,
      `lịch vạn sự ngày ${day}-${month}-${year}`,
      `âm lịch ngày ${day}-${month}-${year}`,
      `ngày ${canChiDay}`,
      `ngày hoàng đạo ${day}/${month}`,
      'lịch âm hôm nay',
      'lịch vạn sự',
      'lịch an',
    ],
    openGraph: {
      title: `${title} | Lịch An`,
      description,
      type: 'article',
      url: `https://lichan.com/xem-ngay/${date}`,
    },
  };
}

export default async function XemNgayDetailPage({ params }: Props) {
  const { date } = await params;
  const parsed = parseAndValidateDate(date);

  if (!parsed) {
    notFound();
  }

  const { day, month, year } = parsed;

  let dayInfo;
  let xuatHanhInfo;
  try {
    dayInfo = getDayInfo(day, month, year);
    xuatHanhInfo = getXuatHanhInfo(day, month, year);
  } catch (error) {
    notFound();
  }

  const current = new Date(year, month - 1, day);
  const prev = new Date(current);
  prev.setDate(prev.getDate() - 1);
  const next = new Date(current);
  next.setDate(next.getDate() + 1);

  const formatUrlDate = (d: Date) =>
    `/xem-ngay/${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    name: `Chi Tiết Ngày ${day}/${month}/${year} — Lịch An`,
    description: `Tra cứu tử vi ngày ${day}/${month}/${year} dương lịch, ngày ${dayInfo.canChiDay.fullName} âm lịch.`,
    url: `https://lichan.com/xem-ngay/${date}`,
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
          name: 'Lịch Vạn Niên',
          item: 'https://lichan.com/lich-van-nien',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: `Ngày ${day}/${month}/${year}`,
          item: `https://lichan.com/xem-ngay/${date}`,
        },
      ],
    },
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb & Navigation Top */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
        <nav className="flex items-center gap-1.5">
          <Link href="/" className="hover:text-primary">Trang chủ</Link>
          <span>/</span>
          <Link href="/lich-van-nien" className="hover:text-primary">Lịch Vạn Niên</Link>
          <span>/</span>
          <span className="text-stone-800 font-semibold">{day}/{month}/{year}</span>
        </nav>

        <div className="flex items-center gap-2">
          <Link href={formatUrlDate(prev)}>
            <Button variant="outline" size="sm" className="h-8 gap-1 text-xs bg-white">
              <ChevronLeft className="w-3.5 h-3.5" /> Ngày trước
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm" className="h-8 gap-1 text-xs bg-white text-primary">
              <RotateCcw className="w-3.5 h-3.5" /> Hôm nay
            </Button>
          </Link>
          <Link href={formatUrlDate(next)}>
            <Button size="sm" className="h-8 gap-1 text-xs bg-primary hover:bg-primary-dark text-white">
              Ngày sau <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Container */}
      <Card className="border-amber-900/15 overflow-hidden shadow-sm bg-white">
        <CardHeader className="bg-gradient-to-r from-amber-50 via-orange-50/40 to-amber-50/60 border-b border-amber-900/10 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <CardTitle className="text-2xl sm:text-3xl text-primary font-black">
                  Chi Tiết Ngày {day}/{month}/{year}
                </CardTitle>
              </div>
              <p className="text-xs sm:text-sm text-stone-600">
                Tức ngày <strong>{dayInfo.lunarDate.day}/{dayInfo.lunarDate.month}{dayInfo.lunarDate.leap ? ' (Nhuận)' : ''}</strong> năm <strong>{dayInfo.canChiYear.fullName}</strong> Âm Lịch
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {dayInfo.ngayHoangDao && (
                <Badge 
                  className={`text-xs font-bold py-1 px-3 gap-1 shadow-xs ${
                    dayInfo.ngayHoangDao.isHoangDao 
                      ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                      : 'bg-stone-200 text-stone-800 border border-stone-300'
                  }`}
                >
                  {dayInfo.ngayHoangDao.isHoangDao ? '✨' : '⚠️'} {dayInfo.ngayHoangDao.name}
                </Badge>
              )}
              {dayInfo.lucDieu && (
                <Badge 
                  variant="outline"
                  className={`text-xs font-semibold py-1 px-3 bg-white ${
                    dayInfo.lucDieu.isGood 
                      ? 'border-emerald-300 text-emerald-800' 
                      : 'border-amber-300 text-amber-900'
                  }`}
                >
                  ☯️ Lục Diệu: {dayInfo.lucDieu.name}
                </Badge>
              )}
              {dayInfo.ngayLe && dayInfo.ngayLe.length > 0 && (
                dayInfo.ngayLe.map((le, idx) => (
                  <Badge key={idx} variant="destructive" className="font-semibold text-xs py-1">
                    🎉 {le}
                  </Badge>
                ))
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-8">
          {/* Lịch 2 cột: Dương - Âm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            {/* Dương Lịch */}
            <div className="border border-stone-200 rounded-2xl p-6 bg-white shadow-xs hover:border-amber-300 transition-colors">
              <Badge variant="outline" className="mb-2 text-stone-600 bg-stone-50 font-semibold">
                DƯƠNG LỊCH
              </Badge>
              <div className="text-stone-500 font-medium text-sm">
                Tháng {dayInfo.solarDate.month} Năm {dayInfo.solarDate.year}
              </div>
              <div className="text-7xl sm:text-8xl font-black text-stone-800 tracking-tight my-2">
                {dayInfo.solarDate.day}
              </div>
              <div className="text-lg font-bold text-danger">{dayInfo.dayOfWeek}</div>
            </div>

            {/* Âm Lịch */}
            <div className="border-2 border-accent/40 rounded-2xl p-6 bg-gradient-to-br from-background-alt to-amber-50/50 shadow-xs relative overflow-hidden">
              <div className="absolute top-2 right-2 opacity-10">
                <Flame className="w-24 h-24 text-primary" />
              </div>
              <Badge className="mb-2 bg-primary font-semibold">
                ÂM LỊCH
              </Badge>
              <div className="text-amber-900 font-medium text-sm">
                Tháng {dayInfo.lunarDate.month} {dayInfo.lunarDate.leap ? '(Nhuận)' : ''}
              </div>
              <div className="text-7xl sm:text-8xl font-black text-primary tracking-tight my-2">
                {dayInfo.lunarDate.day}
              </div>
              <div className="text-lg font-bold text-amber-950">
                Ngày {dayInfo.canChiDay.fullName}
              </div>
              <div className="text-xs text-stone-600 mt-1 font-medium">
                Tháng {dayInfo.canChiMonth.fullName} • Năm {dayInfo.canChiYear.fullName}
              </div>
              {dayInfo.napAm ? (
                <div className="mt-2.5 text-xs inline-block px-3 py-1 rounded-full bg-amber-100/90 text-amber-950 border border-amber-300 font-bold">
                  Nạp âm: {dayInfo.napAm}
                </div>
              ) : dayInfo.nguHanhDay && (
                <div className="mt-2.5 text-xs inline-block px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 border border-amber-200/60 font-semibold">
                  Ngũ hành: {dayInfo.nguHanhDay}
                </div>
              )}
            </div>
          </div>

          {/* Cảnh báo Ngày Kỵ Dân Gian nếu có */}
          {dayInfo.ngayKy && dayInfo.ngayKy.length > 0 && (
            <div className="rounded-2xl p-4 sm:p-5 bg-rose-50/90 border border-rose-200 text-rose-950 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 font-bold text-rose-800 text-sm sm:text-base">
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
                Cảnh Báo Ngày Kiêng Kỵ Dân Gian (Đại Hung Bách Sự Kỵ)
              </div>
              <ul className="text-xs sm:text-sm space-y-1 pl-6 list-disc font-medium text-rose-900">
                {dayInfo.ngayKy.map((ky, idx) => (
                  <li key={idx}>{ky}</li>
                ))}
              </ul>
              <p className="text-xs text-rose-700 italic pt-1">
                * Dân gian kiêng kỵ khởi sự các việc đại sự (cưới hỏi, khởi công, khai trương, xuất hành xa) vào những ngày này để phòng ngừa trắc trở.
              </p>
            </div>
          )}

          {/* Tuổi Xung Khắc Trong Ngày */}
          {dayInfo.tuoiXung && (
            <div className="rounded-2xl p-4 sm:p-5 bg-amber-50/50 border border-amber-200/70 space-y-3 shadow-xs">
              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-amber-200/40 pb-2">
                <div className="flex items-center gap-2 font-bold text-amber-950 text-sm sm:text-base">
                  <Flame className="w-5 h-5 text-amber-700" />
                  Tuổi Xung Khắc Cần Lưu Ý
                </div>
                <span className="text-xs text-stone-500">Tra cứu theo Lục Xung & Thiên Khắc</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-white/90 border border-amber-200/50 space-y-1">
                  <span className="text-stone-500 font-semibold block">Tuổi xung khắc với ngày:</span>
                  <div className="font-bold text-rose-700">
                    {dayInfo.tuoiXung.ngay.length > 0 ? dayInfo.tuoiXung.ngay.join(', ') : 'Không có tuổi đại kỵ'}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/90 border border-amber-200/50 space-y-1">
                  <span className="text-stone-500 font-semibold block">Tuổi xung khắc với tháng:</span>
                  <div className="font-bold text-amber-900">
                    {dayInfo.tuoiXung.thang.length > 0 ? dayInfo.tuoiXung.thang.join(', ') : 'Không có tuổi đại kỵ'}
                  </div>
                </div>
              </div>
              <p className="text-xs text-stone-600 italic">
                💡 Người có tuổi xung khắc với ngày nên thận trọng trong lời ăn tiếng nói, hạn chế đứng tên chủ sự việc lớn hoặc ký kết giao dịch mạo hiểm.
              </p>
            </div>
          )}

          {/* Giờ Hoàng Đạo */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-stone-800">
                Giờ Hoàng Đạo Trong Ngày
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {dayInfo.gioHoangDao.map((gio, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl text-center border transition-all ${
                    gio.isHoangDao
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900 shadow-xs'
                      : 'bg-stone-50 border-stone-100 text-stone-600'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1 font-bold text-sm">
                    {gio.name}
                    {gio.isHoangDao && <span className="text-xs">✨</span>}
                  </div>
                  <div className="text-xs font-medium opacity-90 mt-0.5">{gio.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trực & Tiết Khí & Xuất Hành */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-2 text-sm">
              <h4 className="font-bold text-primary flex items-center gap-2 text-sm border-b border-amber-200/40 pb-2">
                <Compass className="w-4 h-4" /> Khí Tiết & Trực Nhật
              </h4>
              <div className="flex justify-between py-1 border-b border-amber-200/30">
                <span className="text-stone-600">Tiết khí</span>
                <Badge variant="secondary" className="font-semibold">{dayInfo.tietKhi}</Badge>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-600">Trực nhật</span>
                <Badge variant="outline" className="font-semibold bg-white">Trực {dayInfo.truc}</Badge>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/60 space-y-2 text-sm">
              <h4 className="font-bold text-blue-900 flex items-center gap-2 text-sm border-b border-blue-200/40 pb-2">
                <Compass className="w-4 h-4" /> Hướng Xuất Hành Cát Lợi
              </h4>
              <div className="flex justify-between py-1 border-b border-blue-200/30">
                <span className="text-stone-600">Hỷ Thần (Hỷ sự, may mắn)</span>
                <strong className="text-blue-900 font-bold">{xuatHanhInfo.hyThan}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-blue-200/30">
                <span className="text-stone-600">Tài Thần (Tài lộc, làm ăn)</span>
                <strong className="text-emerald-800 font-bold">{xuatHanhInfo.taiThan}</strong>
              </div>
              {dayInfo.hacThan && (
                <div className="flex justify-between py-1">
                  <span className="text-stone-600">Hạc Thần (Hướng hung cần tránh)</span>
                  <strong className="text-rose-700 font-bold">{dayInfo.hacThan}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Nhị Thập Bát Tú (28 Chòm Sao Thiên Văn Cổ Truyền) */}
          {dayInfo.nhiThapBatTu && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50/70 via-orange-50/30 to-amber-50/50 border border-amber-200/80 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/50 pb-3">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent fill-accent" />
                  <h3 className="text-base sm:text-lg font-bold text-amber-950">
                    Nhị Thập Bát Tú: <span className="text-primary font-black">Sao {dayInfo.nhiThapBatTu.fullName}</span>
                  </h3>
                </div>
                <div>
                  {dayInfo.nhiThapBatTu.nature === 'Cát' ? (
                    <Badge variant="success" className="font-bold text-xs py-1">
                      ✨ Cát Tinh (Đại Kiết)
                    </Badge>
                  ) : dayInfo.nhiThapBatTu.nature === 'Hung' ? (
                    <Badge variant="destructive" className="font-bold text-xs py-1">
                      ⚠️ Hung Tinh (Cần Kiêng Kỵ)
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="font-bold text-xs py-1">
                      ⚖️ Bình Hòa
                    </Badge>
                  )}
                </div>
              </div>

              {/* Thông số thiên văn */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-white/80 border border-amber-200/50">
                  <span className="text-stone-500 block">Tứ Tượng Phương Vị:</span>
                  <strong className="text-stone-800 font-bold">{dayInfo.nhiThapBatTu.direction}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 border border-amber-200/50">
                  <span className="text-stone-500 block">Thất Diệu Ngũ Tinh:</span>
                  <strong className="text-amber-900 font-bold">{dayInfo.nhiThapBatTu.element} Tú trực nhật</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 border border-amber-200/50 col-span-2 sm:col-span-1">
                  <span className="text-stone-500 block">Linh Thú Tượng Trưng:</span>
                  <strong className="text-stone-800 font-bold">{dayInfo.nhiThapBatTu.animal}</strong>
                </div>
              </div>

              {/* Bài thơ khẩu quyết */}
              {dayInfo.nhiThapBatTu.tho && (
                <div className="p-3.5 rounded-xl bg-amber-100/50 border border-amber-200/60 text-xs sm:text-sm text-stone-700 italic text-center font-serif leading-relaxed">
                  &ldquo;{dayInfo.nhiThapBatTu.tho}&rdquo;
                </div>
              )}

              {/* Việc cát - Kiêng kỵ theo Tú */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60 space-y-1.5">
                  <strong className="text-emerald-900 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Cát Lợi Theo Sao:
                  </strong>
                  <div className="text-emerald-950 font-medium">
                    {dayInfo.nhiThapBatTu.nenLam.join(', ')}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-red-50/70 border border-red-200/60 space-y-1.5">
                  <strong className="text-red-900 font-bold flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-red-600" /> Kiêng Cữ Theo Sao:
                  </strong>
                  <div className="text-red-950 font-medium">
                    {dayInfo.nhiThapBatTu.kiengKy.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Việc Nên Làm / Kiêng Kỵ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-5 bg-emerald-50/50 border border-emerald-100 space-y-3">
              <div>
                <h3 className="text-base font-bold text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Việc Nên Làm (Cát Sự)</span>
                </h3>
                <p className="text-xs font-medium text-emerald-700/90 mt-1 pl-7">
                  Căn cứ theo Thập Nhị Kiến Trừ (Trực {dayInfo.truc})
                </p>
              </div>
              <ul className="space-y-2 text-sm text-emerald-950">
                {dayInfo.viecNenLam && dayInfo.viecNenLam.length > 0 ? (
                  dayInfo.viecNenLam.map((viec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{viec}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-stone-400 italic">Không có chỉ định đặc biệt</li>
                )}
              </ul>
            </div>

            <div className="rounded-2xl p-5 bg-red-50/50 border border-red-100 space-y-3">
              <div>
                <h3 className="text-base font-bold text-red-800 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>Việc Kiêng Kỵ Cần Tránh</span>
                </h3>
                <p className="text-xs font-medium text-red-700/90 mt-1 pl-7">
                  Căn cứ theo Thập Nhị Kiến Trừ (Trực {dayInfo.truc})
                </p>
              </div>
              <ul className="space-y-2 text-sm text-red-950">
                {dayInfo.viecKhongNenLam && dayInfo.viecKhongNenLam.length > 0 ? (
                  dayInfo.viecKhongNenLam.map((viec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span>{viec}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-stone-400 italic">Không có chỉ định kiêng kỵ</li>
                )}
              </ul>
            </div>
          </div>

          {/* Sao Tốt / Sao Xấu */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" /> Sao Tốt Chiếu Mệnh
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {dayInfo.saoTot && dayInfo.saoTot.length > 0 ? (
                  dayInfo.saoTot.map((sao, idx) => (
                    <Badge key={idx} variant="success" className="text-xs py-0.5">
                      {sao}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-stone-400">Không có sao tốt đặc biệt</span>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-red-500" /> Sao Xấu Cần Tránh
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {dayInfo.saoXau && dayInfo.saoXau.length > 0 ? (
                  dayInfo.saoXau.map((sao, idx) => (
                    <Badge key={idx} variant="destructive" className="text-xs py-0.5">
                      {sao}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-stone-400">Không có sao xấu đặc biệt</span>
                )}
              </div>
            </div>
          </div>

          {/* KHỐI LUẬN GIẢI CHI TIẾT NGÀY THEO LỊCH VẠN SỰ */}
          {dayInfo.luanGiai && (
            <div className="rounded-2xl border border-amber-900/15 bg-white p-5 sm:p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-2.5 pb-3 border-b border-amber-900/10">
                <div className="p-2 rounded-lg bg-amber-50 text-primary border border-amber-200">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-primary">
                    Luận Giải Chi Tiết Ngày Theo Lịch Vạn Sự
                  </h3>
                  <p className="text-xs text-stone-500">
                    Bình giải theo thuật toán Khâm Thiên Giám và cổ bản Ngọc Hạp Thông Thư
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm leading-relaxed">
                {/* 1. Can Chi & Nạp Âm */}
                <div className="p-4 rounded-xl bg-stone-50/80 border border-stone-200/70 space-y-1.5">
                  <h4 className="font-bold text-amber-950 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                    1. Khí Vận Can Chi & Ngũ Hành Nạp Âm
                  </h4>
                  <p className="text-stone-700">
                    {dayInfo.luanGiai.canChiNguHanh}
                  </p>
                </div>

                {/* 2. Thần Sát Hoàng Đạo & Lục Diệu */}
                <div className="p-4 rounded-xl bg-stone-50/80 border border-stone-200/70 space-y-1.5">
                  <h4 className="font-bold text-amber-950 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                    2. Thần Sát Hoàng Đạo & Khổng Minh Lục Diệu
                  </h4>
                  <p className="text-stone-700">
                    {dayInfo.luanGiai.hoangDaoLucDieu}
                  </p>
                </div>

                {/* 3. Trực Nhật & Nhị Thập Bát Tú */}
                <div className="p-4 rounded-xl bg-stone-50/80 border border-stone-200/70 space-y-1.5">
                  <h4 className="font-bold text-amber-950 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                    3. Trực Nhật & Nhị Thập Bát Tú
                  </h4>
                  <p className="text-stone-700">
                    {dayInfo.luanGiai.trucVaTinhTu}
                  </p>
                </div>

                {/* 4. Cát Tinh, Hung Tinh & Thần Sát */}
                <div className="p-4 rounded-xl bg-stone-50/80 border border-stone-200/70 space-y-1.5">
                  <h4 className="font-bold text-amber-950 flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                    4. Cát Tinh, Hung Tinh & Thần Sát Khác
                  </h4>
                  <p className="text-stone-700">
                    {dayInfo.luanGiai.thanSat}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* KHỐI TỔNG KẾT & ĐÁNH GIÁ TỔNG QUAN */}
          {dayInfo.luanGiai?.tongKet && (
            <div className="rounded-2xl border-2 border-amber-600/35 bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-amber-50/80 p-5 sm:p-7 space-y-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-900/15 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-primary" />
                    <h3 className="text-xl sm:text-2xl font-black text-primary">
                      Tổng Kết & Đánh Giá Tổng Quan
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600">
                    Đánh giá toàn diện cát hung ngày {day}/{month}/{year} ({dayInfo.canChiDay.fullName})
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs text-stone-500 font-medium">Chỉ số cát khí</div>
                    <div className="text-lg font-black text-primary">{dayInfo.luanGiai.tongKet.score} / 100</div>
                  </div>
                  <Badge 
                    className={`text-sm sm:text-base font-extrabold px-3.5 py-1.5 gap-1.5 shadow-xs ${
                      dayInfo.luanGiai.tongKet.danhGia === 'Đại Cát'
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : dayInfo.luanGiai.tongKet.danhGia === 'Cát Lành'
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : dayInfo.luanGiai.tongKet.danhGia === 'Bình Hòa'
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : dayInfo.luanGiai.tongKet.danhGia === 'Hung'
                        ? 'bg-orange-600 hover:bg-orange-700 text-white'
                        : 'bg-rose-700 hover:bg-rose-800 text-white'
                    }`}
                  >
                    {dayInfo.luanGiai.tongKet.danhGia === 'Đại Cát' && <Sparkles className="w-4 h-4" />}
                    {dayInfo.luanGiai.tongKet.danhGia === 'Cát Lành' && <CheckCircle2 className="w-4 h-4" />}
                    {dayInfo.luanGiai.tongKet.danhGia === 'Bình Hòa' && <Scale className="w-4 h-4" />}
                    {(dayInfo.luanGiai.tongKet.danhGia === 'Hung' || dayInfo.luanGiai.tongKet.danhGia === 'Đại Hung') && (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                    {dayInfo.luanGiai.tongKet.danhGia}
                  </Badge>
                </div>
              </div>

              {/* Lời khuyên tổng quan */}
              <div className="p-4 rounded-xl bg-white/90 border border-amber-200/70 text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                <span className="font-bold text-amber-950 block mb-1">📌 Lời Khuyên Hành Sự:</span>
                {dayInfo.luanGiai.tongKet.loiKhuyen}
              </div>

              {/* 2 Cột: Việc Hợp Nhất Nên Làm & Việc Đại Kỵ Tránh */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/80 space-y-2">
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Việc Hợp Nhất Nên Làm:
                  </div>
                  <ul className="space-y-1.5 text-emerald-950 pl-5 list-disc">
                    {dayInfo.luanGiai.tongKet.hopViec.map((v, i) => (
                      <li key={i}>{v}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200/80 space-y-2">
                  <div className="font-bold text-rose-900 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    Việc Đại Kỵ Nên Tránh:
                  </div>
                  <ul className="space-y-1.5 text-rose-950 pl-5 list-disc">
                    {dayInfo.luanGiai.tongKet.kyViec.map((v, i) => (
                      <li key={i}>{v}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tiện ích liên quan */}
          <div className="pt-6 border-t border-stone-100 bg-amber-50/40 -mx-6 -mb-6 p-6 rounded-b-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Tiện ích tra cứu phong thủy liên quan
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <Link href="/xem-ngay-tot">
                <Button variant="outline" className="w-full justify-between bg-white text-xs h-10 border-amber-200 hover:bg-amber-100">
                  <span>✨ Xem Ngày Tốt Chuyên Sâu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
              <Link href="/xuat-hanh">
                <Button variant="outline" className="w-full justify-between bg-white text-xs h-10 border-amber-200 hover:bg-amber-100">
                  <span>🧭 Hướng Xuất Hành Hôm Nay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
              <Link href="/doi-ngay-am-duong">
                <Button variant="outline" className="w-full justify-between bg-white text-xs h-10 border-amber-200 hover:bg-amber-100">
                  <span>🔄 Đổi Ngày Âm Dương</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
