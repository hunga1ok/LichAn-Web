'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { lunarService } from '@/lib/lunar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeftRight, ArrowRight, AlertCircle, RotateCcw, Share2, Check } from 'lucide-react';
import type { DayInfo } from '@/types/lunar';

export default function DoiNgayClient() {
  const today = new Date();
  const searchParams = useSearchParams();
  const initMode = (searchParams.get('mode') === 'lunar2solar' ? 'lunar2solar' : 'solar2lunar') as 'solar2lunar' | 'lunar2solar';
  const initDay = Number(searchParams.get('d')) || today.getDate();
  const initMonth = Number(searchParams.get('m')) || today.getMonth() + 1;
  const initYear = Number(searchParams.get('y')) || today.getFullYear();
  const initLeap = Number(searchParams.get('leap')) === 1 ? 1 : 0;

  const [mode, setMode] = useState<'solar2lunar' | 'lunar2solar'>(initMode);
  const [day, setDay] = useState<number>(initDay);
  const [month, setMonth] = useState<number>(initMonth);
  const [year, setYear] = useState<number>(initYear);
  const [isLeap, setIsLeap] = useState<number>(initLeap);
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Result state
  const [result, setResult] = useState<DayInfo | null>(() => {
    try {
      if (initMode === 'solar2lunar') {
        return lunarService.getDayInfo(initDay, initMonth, initYear);
      } else {
        const solar = lunarService.lunarToSolar(initDay, initMonth, initYear, initLeap);
        if (solar.day > 0) {
          return lunarService.getDayInfo(solar.day, solar.month, solar.year);
        }
      }
    } catch (e) {
      // Fallback today
    }
    return lunarService.getDayInfo(today.getDate(), today.getMonth() + 1, today.getFullYear());
  });

  // Đồng bộ query params lên URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('mode', mode);
      url.searchParams.set('d', day.toString());
      url.searchParams.set('m', month.toString());
      url.searchParams.set('y', year.toString());
      if (mode === 'lunar2solar') {
        url.searchParams.set('leap', isLeap.toString());
      } else {
        url.searchParams.delete('leap');
      }
      window.history.replaceState(null, '', url.toString());
    }
  }, [mode, day, month, year, isLeap]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      if (mode === 'solar2lunar') {
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day > daysInMonth) {
          setErrorMessage(`Tháng ${month}/${year} chỉ có ${daysInMonth} ngày. Vui lòng chọn ngày hợp lệ.`);
          return;
        }
        const info = lunarService.getDayInfo(day, month, year);
        setResult(info);
      } else {
        const solar = lunarService.lunarToSolar(day, month, year, isLeap);
        if (solar.day === 0) {
          setErrorMessage('Ngày âm lịch không tồn tại hoặc không có tháng nhuận này trong năm đã chọn!');
          return;
        }
        const info = lunarService.getDayInfo(solar.day, solar.month, solar.year);
        setResult(info);
      }
    } catch (err) {
      setErrorMessage('Không thể chuyển đổi ngày đã chọn. Vui lòng kiểm tra lại thông tin.');
    }
  };

  const handleResetToday = () => {
    const now = new Date();
    setDay(now.getDate());
    setMonth(now.getMonth() + 1);
    setYear(now.getFullYear());
    setIsLeap(0);
    setErrorMessage(null);
    setResult(lunarService.getDayInfo(now.getDate(), now.getMonth() + 1, now.getFullYear()));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <Badge variant="outline" className="px-3 py-1 text-sm bg-amber-50 border-amber-300 text-primary">
          <ArrowLeftRight className="w-3.5 h-3.5 mr-1" /> CÔNG CỤ CHUYỂN ĐỔI
        </Badge>
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary">
          Đổi Ngày Âm Dương
        </h1>
        <p className="text-stone-600 text-sm">
          Chuyển đổi qua lại giữa lịch Dương và lịch Âm chính xác tuyệt đối theo thuật toán thiên văn Hồ Ngọc Đức.
        </p>
      </div>

      <Card className="border-amber-900/15 overflow-hidden shadow-sm bg-white">
        {/* Switch mode tabs */}
        <Tabs
          value={mode}
          onValueChange={(val) => {
            setMode(val as 'solar2lunar' | 'lunar2solar');
            setErrorMessage(null);
          }}
        >
          <TabsList className="grid grid-cols-2 border-b border-amber-900/10">
            <TabsTrigger value="solar2lunar" className="py-3.5">
              ☀️ Dương lịch → 🌙 Âm lịch
            </TabsTrigger>
            <TabsTrigger value="lunar2solar" className="py-3.5">
              🌙 Âm lịch → ☀️ Dương lịch
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <CardContent className="p-6">
          <form onSubmit={handleConvert} className="space-y-5">
            <div className="grid grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                  Ngày {mode === 'solar2lunar' ? 'Dương' : 'Âm'}
                </label>
                <Select
                  value={day}
                  onChange={(e) => setDay(Number(e.target.value))}
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>Ngày {d}</option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                  Tháng {mode === 'solar2lunar' ? 'Dương' : 'Âm'}
                </label>
                <Select
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>Tháng {m}</option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Năm</label>
                <Input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  min={1800}
                  max={2199}
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
                  className="rounded text-primary focus:ring-primary"
                />
                <label htmlFor="leapCheck" className="text-amber-950 font-medium cursor-pointer">
                  Đây là ngày thuộc tháng Nhuận (nếu có)
                </label>
              </div>
            )}

            {/* Thông báo lỗi inline thân thiện thay vì popup alert() */}
            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex gap-2.5">
              <Button
                type="button"
                variant="outline"
                onClick={handleResetToday}
                className="h-11 px-4 gap-1.5 text-xs text-stone-600 border-stone-300 hover:bg-stone-50"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Hôm nay
              </Button>
              <Button type="submit" className="flex-1 h-11 text-base font-bold bg-primary hover:bg-primary-dark text-white shadow-sm">
                Chuyển Đổi Ngay
              </Button>
            </div>
          </form>

          {/* Result Card */}
          {result && (
            <div className="mt-8 pt-6 border-t border-stone-100">
              <div className="flex items-center justify-center gap-3 mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Kết Quả Chuyển Đổi
                </h3>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1 text-xs font-medium text-amber-800 hover:text-amber-950 bg-amber-50 hover:bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200 transition-colors cursor-pointer"
                  title="Sao chép liên kết có chứa kết quả ngày này"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Đã chép!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3 h-3 text-amber-700" />
                      <span>Chia sẻ</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-background-alt to-amber-50 border-2 border-accent/40 shadow-xs space-y-4">
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
                    <span className="text-xs text-primary font-bold block">ÂM LỊCH</span>
                    <span className="text-3xl font-black text-primary block mt-1">
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
                    <Button variant="outline" size="sm" className="gap-1 bg-white hover:bg-amber-100 text-xs border-amber-300 text-primary">
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
