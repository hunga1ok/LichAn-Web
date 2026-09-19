'use client';

import { useState } from 'react';
import Link from 'next/link';
import { lunarService } from '@/lib/lunar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight, Calendar, Sparkles, ArrowRight } from 'lucide-react';

export default function DoiNgayPage() {
  const today = new Date();
  const [mode, setMode] = useState<'solar2lunar' | 'lunar2solar'>('solar2lunar');

  const [day, setDay] = useState<number>(today.getDate());
  const [month, setMonth] = useState<number>(today.getMonth() + 1);
  const [year, setYear] = useState<number>(today.getFullYear());
  const [isLeap, setIsLeap] = useState<number>(0);

  // Result state
  const [result, setResult] = useState<any>(() => {
    return lunarService.getDayInfo(today.getDate(), today.getMonth() + 1, today.getFullYear());
  });

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'solar2lunar') {
      const info = lunarService.getDayInfo(day, month, year);
      setResult(info);
    } else {
      const solar = lunarService.lunarToSolar(day, month, year, isLeap);
      if (solar.day === 0) {
        alert("Ngày âm lịch không hợp lệ hoặc không có tháng nhuận này!");
        return;
      }
      const info = lunarService.getDayInfo(solar.day, solar.month, solar.year);
      setResult(info);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <Badge variant="outline" className="px-3 py-1 text-sm bg-amber-50 border-amber-300 text-[#8B6914]">
          <ArrowLeftRight className="w-3.5 h-3.5 mr-1" /> CÔNG CỤ CHUYỂN ĐỔI
        </Badge>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#8B6914]">
          Đổi Ngày Âm Dương
        </h1>
        <p className="text-stone-600 text-sm">
          Chuyển đổi qua lại giữa lịch Dương và lịch Âm chính xác tuyệt đối theo thuật toán thiên văn Hồ Ngọc Đức.
        </p>
      </div>

      <Card className="border-amber-900/15 overflow-hidden shadow-sm">
        {/* Switch mode tabs */}
        <div className="grid grid-cols-2 border-b border-amber-900/10">
          <button
            type="button"
            className={`py-3.5 text-center font-bold text-sm transition-all cursor-pointer ${
              mode === 'solar2lunar'
                ? 'bg-[#8B6914] text-white'
                : 'bg-stone-50 text-stone-600 hover:bg-amber-50/50'
            }`}
            onClick={() => setMode('solar2lunar')}
          >
            ☀️ Dương lịch → 🌙 Âm lịch
          </button>
          <button
            type="button"
            className={`py-3.5 text-center font-bold text-sm transition-all cursor-pointer ${
              mode === 'lunar2solar'
                ? 'bg-[#8B6914] text-white'
                : 'bg-stone-50 text-stone-600 hover:bg-amber-50/50'
            }`}
            onClick={() => setMode('lunar2solar')}
          >
            🌙 Âm lịch → ☀️ Dương lịch
          </button>
        </div>

        <CardContent className="p-6">
          <form onSubmit={handleConvert} className="space-y-5">
            <div className="grid grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                  Ngày {mode === 'solar2lunar' ? 'Dương' : 'Âm'}
                </label>
                <select
                  value={day}
                  onChange={(e) => setDay(Number(e.target.value))}
                  className="w-full h-10 px-3 border border-stone-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-[#8B6914] focus:outline-none"
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>Ngày {d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                  Tháng {mode === 'solar2lunar' ? 'Dương' : 'Âm'}
                </label>
                <select
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                  className="w-full h-10 px-3 border border-stone-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-[#8B6914] focus:outline-none"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>Tháng {m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Năm</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  min={1800}
                  max={2199}
                  className="w-full h-10 px-3 border border-stone-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-[#8B6914] focus:outline-none"
                />
              </div>
            </div>

            {mode === 'lunar2solar' && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/60 text-xs">
                <input
                  type="checkbox"
                  id="leapCheck"
                  checked={isLeap === 1}
                  onChange={(e) => setIsLeap(e.target.checked ? 1 : 0)}
                  className="rounded text-[#8B6914] focus:ring-[#8B6914]"
                />
                <label htmlFor="leapCheck" className="text-amber-950 font-medium cursor-pointer">
                  Đây là ngày thuộc tháng Nhuận (nếu có)
                </label>
              </div>
            )}

            <Button type="submit" className="w-full h-11 text-base font-bold shadow-sm">
              Chuyển Đổi Ngay
            </Button>
          </form>

          {/* Result Card */}
          {result && (
            <div className="mt-8 pt-6 border-t border-stone-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 text-center">
                Kết Quả Chuyển Đổi
              </h3>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FEF7E6] to-amber-50 border-2 border-[#D4A017]/40 shadow-xs space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center divide-x divide-amber-900/10">
                  <div>
                    <span className="text-xs text-stone-500 font-medium block">DƯƠNG LỊCH</span>
                    <span className="text-3xl font-black text-stone-800 block mt-1">
                      {result.solarDate.day}/{result.solarDate.month}/{result.solarDate.year}
                    </span>
                    <span className="text-xs font-semibold text-red-600 mt-1 block">
                      {result.dayOfWeek}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-[#8B6914] font-bold block">ÂM LỊCH</span>
                    <span className="text-3xl font-black text-[#8B6914] block mt-1">
                      {result.lunarDate.day}/{result.lunarDate.month}
                      {result.lunarDate.leap ? ' (Nhuận)' : ''}
                    </span>
                    <span className="text-xs font-semibold text-amber-950 mt-1 block">
                      Năm {result.canChiYear.fullName}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-amber-900/10 text-xs text-stone-600 space-y-1 text-center">
                  <div>Can chi: <strong>Ngày {result.canChiDay.fullName}</strong> • Tháng {result.canChiMonth.fullName}</div>
                  <div>Trực: <strong>{result.truc}</strong> • Tiết khí: <strong>{result.tietKhi}</strong> • Mệnh: <strong>{result.nguHanhDay}</strong></div>
                </div>

                <div className="pt-2 text-center">
                  <Link href={`/xem-ngay/${result.solarDate.day.toString().padStart(2, '0')}-${result.solarDate.month.toString().padStart(2, '0')}-${result.solarDate.year}`}>
                    <Button variant="outline" size="sm" className="gap-1 bg-white hover:bg-amber-100 text-xs">
                      Xem chi tiết tử vi ngày này <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
