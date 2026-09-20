'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { lunarService } from '@/lib/lunar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Calendar, ChevronLeft, ChevronRight, Share2, Check } from 'lucide-react';

export default function LichVanNienClient() {
  const today = new Date();
  const searchParams = useSearchParams();
  const paramMonth = Number(searchParams.get('thang'));
  const paramYear = Number(searchParams.get('nam'));
  const initMonth = paramMonth >= 1 && paramMonth <= 12 ? paramMonth : (today.getMonth() + 1);
  const initYear = paramYear >= 1950 && paramYear <= 2050 ? paramYear : today.getFullYear();

  const [year, setYear] = useState<number>(initYear);
  const [month, setMonth] = useState<number>(initMonth);
  const [copied, setCopied] = useState<boolean>(false);

  // Đồng bộ query params lên URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('thang', month.toString());
      url.searchParams.set('nam', year.toString());
      window.history.replaceState(null, '', url.toString());
    }
  }, [month, year]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const monthData = lunarService.getMonthCalendar(month, year);
  const canChiYear = lunarService.getCanChiYear(year);

  const prevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  return (
    <div className="space-y-6">
      <Card className="border-amber-900/15 overflow-hidden shadow-sm">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50/50 border-b border-amber-900/10 pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-100/80 text-primary border border-amber-200">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-xl sm:text-2xl text-primary font-bold">
                    Tháng {month} / {year}
                  </CardTitle>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    aria-label="Sao chép liên kết tháng này"
                    className="inline-flex items-center gap-1 text-xs font-medium text-amber-800 hover:text-amber-950 bg-amber-100/80 hover:bg-amber-200 px-2 py-0.5 rounded-full border border-amber-300 transition-colors cursor-pointer"
                    title="Sao chép liên kết tháng này"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span className="text-emerald-800 font-semibold">Đã chép!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-amber-800" />
                        <span>Chia sẻ</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Năm {canChiYear.fullName}
                </p>
              </div>
            </div>

            {/* Bộ chọn nhanh Tháng / Năm & Nút di chuyển */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-28 sm:w-32">
                  <Select
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    className="h-9 text-xs sm:text-sm font-bold text-stone-800"
                    aria-label="Chọn tháng"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <option key={m} value={m}>Tháng {m}</option>
                    ))}
                  </Select>
                </div>

                <div className="w-28 sm:w-32">
                  <Select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="h-9 text-xs sm:text-sm font-bold text-stone-800"
                    aria-label="Chọn năm"
                  >
                    {Array.from({ length: 101 }, (_, i) => 1950 + i).map((y) => (
                      <option key={y} value={y}>Năm {y}</option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Button variant="outline" size="sm" onClick={prevMonth} aria-label="Xem tháng trước" className="h-9 gap-1 bg-white text-xs">
                  <ChevronLeft className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Tháng</span> trước
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setYear(today.getFullYear());
                    setMonth(today.getMonth() + 1);
                  }}
                  aria-label="Trở về tháng hiện tại"
                  className="h-9 bg-white text-xs font-semibold text-primary"
                >
                  Hôm nay
                </Button>
                <Button size="sm" onClick={nextMonth} aria-label="Xem tháng sau" className="h-9 gap-1 bg-primary hover:bg-primary-dark text-white text-xs">
                  <span className="hidden sm:inline">Tháng</span> sau <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-3 sm:p-6">
          {/* Header các ngày trong tuần */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center text-xs sm:text-sm font-bold text-stone-600">
            {weekDays.map((d, idx) => (
              <div
                key={d}
                className={`py-2 rounded-lg ${
                  idx === 6 ? 'text-danger bg-red-50/50' : 'bg-stone-100/60 text-stone-700'
                }`}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Grid Lịch */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {/* Các ô trống trước ngày mùng 1 */}
            {Array.from({ length: monthData.firstDayOfWeek }).map((_, idx) => (
              <div
                key={`empty-${idx}`}
                className="min-h-[72px] sm:min-h-[90px] rounded-xl border border-dashed border-stone-200/50 bg-stone-50/30"
              />
            ))}

            {/* Các ngày trong tháng */}
            {monthData.days.map((day) => {
              const urlDate = `${day.solarDay.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
              const isRamOrSoc = day.lunarDay === 1 || day.lunarDay === 15;

              return (
                <Link
                  key={day.solarDay}
                  href={`/xem-ngay/${urlDate}`}
                  aria-label={`Ngày ${day.solarDay} tháng ${month} năm ${year}, âm lịch ngày ${day.lunarDay} tháng ${day.lunarMonth}${day.holiday ? ', ' + day.holiday : ''}${day.isToday ? ', hôm nay' : ''}`}
                  className={`group relative flex flex-col p-1.5 sm:p-2.5 rounded-xl border transition-all hover:border-primary hover:shadow-md active:scale-95 min-h-[72px] sm:min-h-[90px] cursor-pointer touch-manipulation select-none ${
                    day.isToday
                      ? 'border-2 border-primary bg-amber-50/70 shadow-xs ring-2 ring-primary/20'
                      : 'border-stone-200/80 bg-white hover:bg-amber-50/30'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    {/* Ngày dương */}
                    <span
                      className={`text-base sm:text-lg font-black leading-none ${
                        day.isToday
                          ? 'text-primary'
                          : day.isSunday
                          ? 'text-red-600'
                          : 'text-stone-800'
                      }`}
                    >
                      {day.solarDay}
                    </span>

                    {/* Badge ngày lễ hoặc mùng 1 / ngày rằm */}
                    {day.holiday && (
                      <>
                        <span className="sm:hidden w-1.5 h-1.5 rounded-full bg-red-500 inline-block mt-0.5" title={day.holiday} />
                        <span className="hidden sm:inline-block text-[9px] font-bold px-1 rounded bg-red-100 text-red-700 truncate max-w-[45px]">
                          Lễ
                        </span>
                      </>
                    )}
                  </div>

                  {/* Ngày âm & tháng âm */}
                  <div className="mt-auto flex items-baseline justify-between text-right">
                    <span className="text-[10px] text-stone-500 hidden sm:inline truncate">
                      {day.canChiDay.split(' ')[1]}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-bold ${
                        isRamOrSoc ? 'text-primary font-black' : 'text-stone-600'
                      }`}
                    >
                      {day.lunarDay === 1 ? `${day.lunarDay}/${day.lunarMonth}` : day.lunarDay}
                    </span>
                  </div>

                  {day.isToday && (
                    <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-primary ring-2 ring-white" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Chú giải */}
          <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap gap-4 justify-center text-xs text-stone-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-primary" /> Hôm nay
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-red-100 border border-red-200" /> Chủ nhật / Ngày lễ
            </span>
            <span className="flex items-center gap-1.5">
              <strong className="text-primary">Số vàng đậm:</strong> Mùng 1 & Ngày Rằm (15 âm)
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
