import { getDayInfo } from '@/lib/lunar';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Clock, 
  Compass, 
  Flame,
  ShieldAlert
} from 'lucide-react';

export default function HomePage() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  let dayInfo;
  try {
    dayInfo = getDayInfo(day, month, year);
  } catch (error) {
    console.error("Lỗi khi lấy thông tin ngày:", error);
    return <div className="text-center py-10 text-red-600">Không thể tải thông tin ngày.</div>;
  }

  // Chuyển ngày
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatUrlDate = (d: Date) => 
    `/xem-ngay/${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {/* Cột chính (2/3) */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="border-amber-900/15 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50/50 border-b border-amber-900/10 pb-4">
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-6 h-6 text-primary" />
                <div>
                  <CardTitle className="text-2xl text-primary">Hôm Nay Có Gì Tốt?</CardTitle>
                  <div className="flex flex-wrap items-center gap-1.5 mt-1">
                    {dayInfo.ngayHoangDao && (
                      <Badge 
                        className={`text-[11px] font-bold py-0.5 px-2.5 ${
                          dayInfo.ngayHoangDao.isHoangDao 
                            ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                            : 'bg-stone-200 text-stone-800'
                        }`}
                      >
                        {dayInfo.ngayHoangDao.isHoangDao ? '✨' : '⚠️'} {dayInfo.ngayHoangDao.name}
                      </Badge>
                    )}
                    {dayInfo.lucDieu && (
                      <Badge 
                        variant="outline"
                        className="text-[11px] font-semibold py-0.5 px-2 bg-white border-amber-300 text-amber-900"
                      >
                        ☯️ {dayInfo.lucDieu.name}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={formatUrlDate(yesterday)}>
                  <Button variant="outline" size="sm" className="gap-1">
                    <ChevronLeft className="w-4 h-4" /> Hôm qua
                  </Button>
                </Link>
                <Link href={formatUrlDate(tomorrow)}>
                  <Button size="sm" className="gap-1">
                    Ngày mai <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
            {dayInfo.ngayLe && dayInfo.ngayLe.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {dayInfo.ngayLe.map((le, idx) => (
                  <Badge key={idx} variant="destructive" className="animate-pulse">
                    🎉 {le}
                  </Badge>
                ))}
              </div>
            )}
          </CardHeader>

          <CardContent className="pt-6">
            {/* Lịch 2 cột: Dương - Âm */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-center">
              {/* Dương lịch */}
              <div className="border border-stone-200 rounded-2xl p-6 bg-white shadow-sm hover:border-amber-300 transition-colors">
                <Badge variant="outline" className="mb-2 text-stone-600 bg-stone-50">DƯƠNG LỊCH</Badge>
                <div className="text-stone-500 font-medium">Tháng {dayInfo.solarDate.month} / {dayInfo.solarDate.year}</div>
                <div className="text-8xl font-black text-stone-800 tracking-tight my-2">
                  {dayInfo.solarDate.day}
                </div>
                <div className="text-lg font-semibold text-danger">{dayInfo.dayOfWeek}</div>
              </div>

              {/* Âm lịch */}
              <div className="border-2 border-accent/40 rounded-2xl p-6 bg-gradient-to-br from-background-alt to-amber-50/50 shadow-sm relative overflow-hidden">
                <div className="absolute top-2 right-2 opacity-10">
                  <Flame className="w-24 h-24 text-primary" />
                </div>
                <Badge className="mb-2 bg-primary">ÂM LỊCH</Badge>
                <div className="text-amber-900 font-medium">
                  Tháng {dayInfo.lunarDate.month} {dayInfo.lunarDate.leap ? '(Nhuận)' : ''}
                </div>
                <div className="text-8xl font-black text-primary tracking-tight my-2">
                  {dayInfo.lunarDate.day}
                </div>
                <div className="text-lg font-bold text-amber-950">
                  Ngày {dayInfo.canChiDay.fullName}
                </div>
                <div className="text-xs text-stone-600 mt-1 font-medium">
                  Tháng {dayInfo.canChiMonth.fullName} • Năm {dayInfo.canChiYear.fullName}
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {dayInfo.napAm ? (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100/90 text-amber-950 border border-amber-300 font-semibold">
                      {dayInfo.napAm}
                    </span>
                  ) : dayInfo.nguHanhDay && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100/80 text-amber-900 border border-amber-200/60 font-semibold">
                      Ngũ hành: {dayInfo.nguHanhDay}
                    </span>
                  )}
                  {dayInfo.nhiThapBatTu && (
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                      dayInfo.nhiThapBatTu.nature === 'Cát' 
                        ? 'bg-emerald-100/80 text-emerald-900 border-emerald-200' 
                        : dayInfo.nhiThapBatTu.nature === 'Hung'
                        ? 'bg-red-100/80 text-red-900 border-red-200'
                        : 'bg-stone-100 text-stone-800 border-stone-200'
                    }`}>
                      Sao {dayInfo.nhiThapBatTu.name} ({dayInfo.nhiThapBatTu.nature})
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Cảnh báo Ngày Kỵ nếu có */}
            {dayInfo.ngayKy && dayInfo.ngayKy.length > 0 && (
              <div className="mb-6 p-3 rounded-xl bg-rose-50/90 border border-rose-200 text-rose-900 text-xs flex items-center gap-2 font-medium">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{dayInfo.ngayKy.join(' • ')}</span>
              </div>
            )}

            {/* Đánh Giá Nhanh Hôm Nay */}
            {dayInfo.luanGiai?.tongKet && (
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-amber-50/90 via-orange-50/40 to-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs font-bold ${
                      dayInfo.luanGiai.tongKet.danhGia === 'Đại Cát' || dayInfo.luanGiai.tongKet.danhGia === 'Cát Lành'
                        ? 'bg-emerald-600 text-white'
                        : dayInfo.luanGiai.tongKet.danhGia === 'Bình Hòa'
                        ? 'bg-amber-600 text-white'
                        : 'bg-rose-600 text-white'
                    }`}>
                      {dayInfo.luanGiai.tongKet.danhGia} ({dayInfo.luanGiai.tongKet.score}/100)
                    </Badge>
                    <span className="text-xs font-bold text-amber-950">Đánh giá Lịch Vạn Sự</span>
                  </div>
                  <p className="text-xs text-stone-700 line-clamp-2 leading-relaxed">
                    {dayInfo.luanGiai.tongKet.loiKhuyen}
                  </p>
                </div>
                <Link href={formatUrlDate(today)} className="shrink-0">
                  <Button size="sm" variant="outline" className="text-xs h-8 bg-white border-amber-300 text-primary hover:bg-amber-50 gap-1 font-semibold">
                    Xem luận giải chi tiết →
                  </Button>
                </Link>
              </div>
            )}

            {/* Banner Nhị Thập Bát Tú hôm nay */}
            {dayInfo.nhiThapBatTu && (
              <div className="mb-6 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-base">⭐</span>
                  <div>
                    <span className="text-stone-500 font-medium">Nhị Thập Bát Tú: </span>
                    <strong className="text-stone-900 font-bold">Sao {dayInfo.nhiThapBatTu.fullName} ({dayInfo.nhiThapBatTu.animal})</strong>
                    <span className="text-stone-500 hidden sm:inline"> • {dayInfo.nhiThapBatTu.direction}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={dayInfo.nhiThapBatTu.nature === 'Cát' ? 'success' : dayInfo.nhiThapBatTu.nature === 'Hung' ? 'destructive' : 'secondary'}
                    className="font-bold text-xs py-0.5"
                  >
                    {dayInfo.nhiThapBatTu.nature === 'Cát' ? '✨ Cát Tinh' : dayInfo.nhiThapBatTu.nature === 'Hung' ? '⚠️ Hung Tinh' : '⚖️ Bình Hòa'}
                  </Badge>
                  <Link href={`/xem-ngay/${day}-${month}-${year}`} className="text-primary font-semibold hover:underline">
                    Chi tiết →
                  </Link>
                </div>
              </div>
            )}

            {/* Giờ Hoàng Đạo */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-stone-100">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-stone-800">Giờ Hoàng Đạo Trong Ngày</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {dayInfo.gioHoangDao.map((gio, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl text-center border transition-all ${
                      gio.isHoangDao
                        ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900 shadow-xs'
                        : 'bg-stone-50 border-stone-100 text-stone-600'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1 font-semibold text-sm">
                      {gio.name}
                      {gio.isHoangDao && <span className="text-xs">✨</span>}
                    </div>
                    <div className="text-xs font-medium opacity-90 mt-0.5">{gio.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Việc Nên Làm / Kiêng Kỵ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="rounded-xl p-4 bg-emerald-50/50 border border-emerald-100">
                <div className="mb-3">
                  <h3 className="text-base font-bold text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Nên Làm (Cát Sự)</span>
                  </h3>
                  <p className="text-xs font-medium text-emerald-700/90 mt-1 pl-7">
                    Theo Thập Nhị Kiến Trừ (Trực {dayInfo.truc})
                  </p>
                </div>
                <ul className="space-y-1.5 text-sm text-emerald-950">
                  {dayInfo.viecNenLam.map((viec, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">•</span> {viec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl p-4 bg-red-50/50 border border-red-100">
                <div className="mb-3">
                  <h3 className="text-base font-bold text-red-800 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <span>Không Nên Làm (Kiêng Kỵ)</span>
                  </h3>
                  <p className="text-xs font-medium text-red-700/90 mt-1 pl-7">
                    Theo Thập Nhị Kiến Trừ (Trực {dayInfo.truc})
                  </p>
                </div>
                <ul className="space-y-1.5 text-sm text-red-950">
                  {dayInfo.viecKhongNenLam.map((viec, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-red-500 font-bold">•</span> {viec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sao Tốt / Sao Xấu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" /> Sao Tốt Chiếu Mệnh
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {dayInfo.saoTot.map((sao, idx) => (
                    <Badge key={idx} variant="success">
                      {sao}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-red-500" /> Sao Xấu Cần Tránh
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {dayInfo.saoXau.map((sao, idx) => (
                    <Badge key={idx} variant="destructive">
                      {sao}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cột phải / Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        {/* Thông tin trực nhật & tiết khí */}
        <Card className="border-amber-900/10">
          <CardHeader className="pb-3 border-b border-stone-100">
            <CardTitle className="text-base flex items-center gap-2 text-primary">
              <Compass className="w-4 h-4" /> Khí Tiết & Trực Nhật
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3 text-sm">
            <div className="flex justify-between items-center py-1 border-b border-stone-50">
              <span className="text-stone-500">Tiết khí</span>
              <Badge variant="secondary" className="font-semibold">{dayInfo.tietKhi}</Badge>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-stone-50">
              <span className="text-stone-500">Trực</span>
              <Badge variant="outline" className="font-semibold">Trực {dayInfo.truc}</Badge>
            </div>
            {dayInfo.nhiThapBatTu && (
              <div className="flex justify-between items-center py-1 border-b border-stone-50">
                <span className="text-stone-500">28 Chòm Sao</span>
                <Badge 
                  variant={dayInfo.nhiThapBatTu.nature === 'Cát' ? 'success' : dayInfo.nhiThapBatTu.nature === 'Hung' ? 'destructive' : 'secondary'} 
                  className="font-semibold text-xs"
                >
                  Sao {dayInfo.nhiThapBatTu.fullName}
                </Badge>
              </div>
            )}
            <div className="flex justify-between items-center py-1 border-b border-stone-50">
              <span className="text-stone-500">Năm âm</span>
              <span className="font-semibold text-stone-800">{dayInfo.canChiYear.fullName}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-stone-500">Tháng âm</span>
              <span className="font-semibold text-stone-800">{dayInfo.canChiMonth.fullName}</span>
            </div>
          </CardContent>
        </Card>

        {/* Mini Calendar tháng */}
        <Card className="border-amber-900/10">
          <CardHeader className="pb-3 border-b border-stone-100">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Tháng {month}/{year}</CardTitle>
              <Link href="/lich-van-nien" className="text-xs text-primary font-medium hover:underline">
                Xem cả năm →
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            {(() => {
              const daysInMonth = new Date(year, month, 0).getDate();
              const firstDayOfWeek = (new Date(year, month - 1, 1).getDay() + 6) % 7;
              const cells = [];
              for (let i = 0; i < firstDayOfWeek; i++) {
                cells.push(<div key={`empty-${i}`} className="p-1" />);
              }
              for (let d = 1; d <= daysInMonth; d++) {
                const lunar = getDayInfo(d, month, year);
                const isToday = d === day;
                const isSun = new Date(year, month - 1, d).getDay() === 0;
                cells.push(
                  <Link
                    key={d}
                    href={`/xem-ngay/${d.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`}
                    className={`text-center p-1 rounded-lg text-xs transition-colors flex flex-col items-center justify-center ${
                      isToday
                        ? 'bg-primary text-white font-bold shadow-xs'
                        : 'hover:bg-amber-50 text-stone-700'
                    } ${!isToday && isSun ? 'text-red-600 font-semibold' : ''}`}
                  >
                    <span className="text-xs leading-none">{d}</span>
                    <span className={`text-[10px] mt-0.5 leading-none font-medium ${isToday ? 'text-white/80' : 'text-stone-600'}`}>
                      {lunar.lunarDate.day}
                    </span>
                  </Link>
                );
              }
              return (
                <div>
                  <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-bold text-stone-600 uppercase">
                    {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d, i) => (
                      <div key={d} className={i === 6 ? 'text-red-500' : ''}>{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">{cells}</div>
                </div>
              );
            })()}
          </CardContent>
        </Card>

        {/* Lối tắt tiện ích */}
        <Card className="border-amber-900/10 bg-gradient-to-br from-amber-50/60 to-orange-50/30">
          <CardContent className="pt-6 space-y-3">
            <h4 className="font-bold text-stone-800 text-sm">Tiện Ích Nổi Bật</h4>
            <div className="grid grid-cols-1 gap-2">
              <Link href="/doi-ngay-am-duong">
                <Button variant="outline" className="w-full justify-start bg-white text-xs h-9">
                  🔄 Đổi Ngày Âm ↔ Dương
                </Button>
              </Link>
              <Link href="/lich-van-nien">
                <Button variant="outline" className="w-full justify-start bg-white text-xs h-9">
                  📅 Tra Cứu Lịch Vạn Niên
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
