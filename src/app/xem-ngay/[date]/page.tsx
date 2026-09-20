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
  RotateCcw
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

  const title = `Chi Tiết Ngày ${day}/${month}/${year} — Âm Lịch ${lunarDay}/${lunarMonth} Ngày ${canChiDay}`;
  const description = `Tra cứu chi tiết ngày ${day}/${month}/${year} dương lịch (tức ngày ${lunarDay}/${lunarMonth}${leapStr} năm ${canChiYear} âm lịch, ngày ${canChiDay}). Xem giờ hoàng đạo, tiết khí ${dayInfo.tietKhi}, trực ${dayInfo.truc}, sao tốt xấu và hướng xuất hành.`;

  return {
    title,
    description,
    keywords: [
      `xem ngày ${day} tháng ${month} năm ${year}`,
      `âm lịch ngày ${day}-${month}-${year}`,
      `ngày ${canChiDay}`,
      `giờ hoàng đạo ngày ${day}/${month}`,
      'lịch âm hôm nay',
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

            {dayInfo.ngayLe && dayInfo.ngayLe.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {dayInfo.ngayLe.map((le, idx) => (
                  <Badge key={idx} variant="destructive" className="font-semibold text-xs py-1">
                    🎉 {le}
                  </Badge>
                ))}
              </div>
            )}
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
              {dayInfo.nguHanhDay && (
                <div className="mt-2.5 text-xs inline-block px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 border border-amber-200/60 font-semibold">
                  Ngũ hành: {dayInfo.nguHanhDay}
                </div>
              )}
            </div>
          </div>

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
              <div className="flex justify-between py-1">
                <span className="text-stone-600">Tài Thần (Tài lộc, làm ăn)</span>
                <strong className="text-emerald-800 font-bold">{xuatHanhInfo.taiThan}</strong>
              </div>
            </div>
          </div>

          {/* Việc Nên Làm / Kiêng Kỵ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-5 bg-emerald-50/50 border border-emerald-100 space-y-3">
              <h3 className="text-base font-bold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Việc Nên Làm (Cát Sự)
              </h3>
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
              <h3 className="text-base font-bold text-red-800 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                Việc Kiêng Kỵ Cần Tránh
              </h3>
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
