'use client';

import { useState } from 'react';
import Link from 'next/link';
import { lunarService } from '@/lib/lunar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LichVanNienPage() {
  const today = new Date();
  const [year, setYear] = useState<number>(today.getFullYear());
  const [month, setMonth] = useState<number>(today.getMonth() + 1);

  const monthData = lunarService.getMonthCalendar(month, year);
  const canChiYear = lunarService.getCanChiYear(year);

  const nextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const prevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const weekDays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header điều khiển tháng / năm */}
      <Card className="border-amber-900/15 shadow-sm">
        <CardHeader className="p-4 sm:p-6 bg-gradient-to-r from-amber-50 to-orange-50/40 border-b border-amber-900/10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[#8B6914]" />
              <div>
                <CardTitle className="text-xl sm:text-2xl text-[#8B6914]">
                  Tháng {month} Năm {year}
                </CardTitle>
                <p className="text-xs text-stone-500 mt-0.5">
                  Năm {canChiYear.fullName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={prevMonth} className="gap-1 bg-white">
                <ChevronLeft className="w-4 h-4" /> Tháng trước
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setYear(today.getFullYear());
                  setMonth(today.getMonth() + 1);
                }}
                className="bg-white text-xs"
              >
                Hôm nay
              </Button>
              <Button size="sm" onClick={nextMonth} className="gap-1">
                Tháng sau <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-3 sm:p-6">
          {/* Header các ngày trong tuần */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center text-xs sm:text-sm font-bold text-stone-600">
            {weekDays.map((d, idx) => (
              <div
                key={d}
                className={`py-2 rounded-lg bg-stone-50 ${idx === 6 ? 'text-red-600 font-extrabold' : ''}`}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Grid Lịch */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {/* Các ô trống trước ngày mùng 1 */}
            {Array.from({ length: monthData.firstDayOfWeek }).map((_, idx) => (
              <div key={`empty-${idx}`} className="min-h-[72px] sm:min-h-[90px] rounded-xl bg-stone-50/50" />
            ))}

            {/* Các ngày trong tháng */}
            {monthData.days.map((day) => {
              const urlDate = `${day.solarDay.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
              const isRamOrSoc = day.lunarDay === 1 || day.lunarDay === 15;

              return (
                <Link
                  key={day.solarDay}
                  href={`/xem-ngay/${urlDate}`}
                  className={`group relative flex flex-col p-1.5 sm:p-2.5 rounded-xl border transition-all hover:border-[#8B6914] hover:shadow-md min-h-[72px] sm:min-h-[90px] cursor-pointer ${
                    day.isToday
                      ? 'border-2 border-[#8B6914] bg-amber-50/70 shadow-xs'
                      : 'border-stone-200/80 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    {/* Ngày dương */}
                    <span
                      className={`text-base sm:text-lg font-black leading-none ${
                        day.isToday
                          ? 'text-[#8B6914]'
                          : day.isSunday
                          ? 'text-red-600'
                          : 'text-stone-800'
                      }`}
                    >
                      {day.solarDay}
                    </span>

                    {/* Badge ngày lễ hoặc mùng 1 / ngày rằm */}
                    {day.holiday && (
                      <span className="hidden sm:inline-block text-[9px] font-bold px-1 rounded bg-red-100 text-red-700 truncate max-w-[45px]">
                        Lễ
                      </span>
                    )}
                  </div>

                  {/* Ngày âm & tháng âm */}
                  <div className="mt-auto flex items-baseline justify-between text-right">
                    <span className="text-[10px] text-stone-400 hidden sm:inline truncate">
                      {day.canChiDay.split(' ')[1]}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-bold ${
                        isRamOrSoc ? 'text-[#8B6914] font-black' : 'text-stone-500'
                      }`}
                    >
                      {day.lunarDay === 1 ? `${day.lunarDay}/${day.lunarMonth}` : day.lunarDay}
                    </span>
                  </div>

                  {day.isToday && (
                    <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-[#8B6914] ring-2 ring-white" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Chú giải */}
          <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap gap-4 justify-center text-xs text-stone-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#8B6914]" /> Hôm nay
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-red-100 border border-red-200" /> Chủ nhật / Ngày lễ
            </span>
            <span className="flex items-center gap-1.5">
              <strong className="text-[#8B6914]">Số đỏ đậm:</strong> Mùng 1 & Ngày Rằm (15 âm)
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
