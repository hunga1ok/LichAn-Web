'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  AuspiciousPurpose, 
  AuspiciousDayResult, 
  XuatHanhInfo 
} from '@/types/lunar';
import { lunarService } from '@/lib/lunar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Compass, 
  ArrowRight,
  Filter,
  Info
} from 'lucide-react';

interface Props {
  purpose: AuspiciousPurpose;
  purposeTitle: string;
  purposeDescription: string;
  badgeText: string;
}

export default function AuspiciousClientView({
  purpose,
  purposeTitle,
  purposeDescription,
  badgeText,
}: Props) {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
  const [onlyAuspicious, setOnlyAuspicious] = useState<boolean>(true);
  const [expandedXuatHanhDay, setExpandedXuatHanhDay] = useState<number | null>(null);

  // Tính toán danh sách ngày theo tháng & năm đã chọn
  const allDays = useMemo(() => {
    return lunarService.getAuspiciousDays(purpose, selectedMonth, selectedYear);
  }, [purpose, selectedMonth, selectedYear]);

  // Lọc theo tùy chọn "Chỉ xem ngày tốt"
  const displayedDays = useMemo(() => {
    if (onlyAuspicious) {
      return allDays.filter((d) => d.isAuspicious);
    }
    return allDays;
  }, [allDays, onlyAuspicious]);

  // Đếm số ngày tốt trong tháng
  const auspiciousCount = useMemo(() => {
    return allDays.filter((d) => d.isAuspicious).length;
  }, [allDays]);

  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
    setExpandedXuatHanhDay(null);
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
    setExpandedXuatHanhDay(null);
  };

  const getScoreBadge = (score: number, isAuspicious: boolean) => {
    if (score >= 80) {
      return { text: 'Đại Cát', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    }
    if (isAuspicious || score >= 65) {
      return { text: 'Cát Lành', color: 'bg-green-100 text-green-800 border-green-300' };
    }
    if (score >= 45) {
      return { text: 'Bình Thường', color: 'bg-stone-100 text-stone-700 border-stone-300' };
    }
    return { text: 'Bất Lợi / Hung', color: 'bg-rose-100 text-rose-800 border-rose-300' };
  };

  return (
    <div className="space-y-8">
      {/* Header & Purpose Introduction */}
      <div className="text-center space-y-3 max-w-3xl mx-auto pt-2">
        <div className="flex items-center justify-center gap-2">
          <Link href="/xem-ngay-tot" className="text-xs text-stone-500 hover:text-amber-800 flex items-center gap-1 transition-colors">
            ← Tất cả mục đích
          </Link>
          <span className="text-stone-300">•</span>
          <Badge variant="outline" className="px-3 py-0.5 text-xs bg-amber-50 border-amber-300 text-primary">
            {badgeText}
          </Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
          {purposeTitle}
        </h1>
        <p className="text-stone-600 text-sm md:text-base leading-relaxed">
          {purposeDescription}
        </p>
      </div>

      {/* Month Navigation & Controls Bar */}
      <Card className="border-amber-900/15 shadow-sm overflow-hidden bg-white">
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-amber-900/10">
          {/* Month Selector Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevMonth}
              className="border-amber-900/20 text-stone-700 hover:bg-amber-50 cursor-pointer"
              aria-label="Tháng trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="px-3 py-1.5 rounded-lg bg-background-alt border border-amber-900/15 font-bold text-primary text-base sm:text-lg min-w-[180px] text-center">
              Tháng {selectedMonth} / {selectedYear}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextMonth}
              className="border-amber-900/20 text-stone-700 hover:bg-amber-50 cursor-pointer"
              aria-label="Tháng sau"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs sm:text-sm text-stone-600 font-medium">
              Tìm thấy <strong className="text-emerald-700 font-bold">{auspiciousCount}</strong> ngày hoàng đạo
            </span>
            <button
              type="button"
              onClick={() => setOnlyAuspicious(!onlyAuspicious)}
              aria-pressed={onlyAuspicious}
              aria-label={onlyAuspicious ? 'Đang lọc chỉ hiện ngày tốt, nhấn để hiện tất cả' : 'Đang hiện tất cả, nhấn để chỉ hiện ngày tốt'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                onlyAuspicious
                  ? 'bg-amber-800 text-white border-amber-900 shadow-xs'
                  : 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              {onlyAuspicious ? 'Đang lọc: Chỉ Ngày Tốt' : 'Hiện tất cả các ngày'}
            </button>
          </div>
        </div>

        {/* Quick Month Quick-pick chips */}
        <div className="px-4 py-2.5 bg-stone-50/70 text-xs flex items-center gap-2 overflow-x-auto">
          <span className="text-stone-600 shrink-0 font-medium">Chọn nhanh:</span>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setSelectedMonth(m);
                setExpandedXuatHanhDay(null);
              }}
              aria-label={`Xem tháng ${m}`}
              aria-pressed={selectedMonth === m}
              className={`px-2.5 py-1 rounded text-xs font-medium shrink-0 cursor-pointer transition-colors ${
                selectedMonth === m
                  ? 'bg-amber-800 text-white'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-amber-50 hover:text-amber-900'
              }`}
            >
              Th.{m}
            </button>
          ))}
        </div>
      </Card>

      {/* Days List */}
      {displayedDays.length === 0 ? (
        <div className="text-center py-12 rounded-2xl bg-white border border-dashed border-amber-900/20 p-8 space-y-3">
          <Info className="w-10 h-10 text-amber-700/50 mx-auto" />
          <h3 className="text-lg font-bold text-stone-700">
            Không có ngày hoàng đạo nào thỏa mãn điều kiện trong Tháng {selectedMonth}/{selectedYear}
          </h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            Tháng này có thể vướng nhiều ngày tiết khí bất lợi hoặc phạm các đại kỵ. Bạn có thể chuyển sang tháng khác hoặc bấm nút bên dưới để xem toàn bộ các ngày.
          </p>
          <Button
            variant="outline"
            onClick={() => setOnlyAuspicious(false)}
            className="border-amber-800 text-amber-900 hover:bg-amber-50 mt-2"
          >
            Xem tất cả các ngày trong tháng
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedDays.map((day) => {
            const scoreBadge = getScoreBadge(day.score, day.isAuspicious);
            const dd = day.solarDay.toString().padStart(2, '0');
            const mm = day.solarMonth.toString().padStart(2, '0');
            const dateStr = `${dd}-${mm}-${day.solarYear}`;
            const xuatHanhInfo = purpose === 'xuat-hanh' 
              ? lunarService.getXuatHanhInfo(day.solarDay, day.solarMonth, day.solarYear)
              : null;
            const isExpanded = expandedXuatHanhDay === day.solarDay;

            return (
              <Card 
                key={day.solarDay} 
                className={`overflow-hidden border transition-all ${
                  day.isAuspicious 
                    ? 'border-amber-700/30 shadow-xs hover:border-amber-600/60 bg-white' 
                    : 'border-stone-200 bg-stone-50/50 opacity-90'
                }`}
              >
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Top Header Row of Day Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3.5">
                    <div className="flex items-center gap-3">
                      {/* Date Block */}
                      <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center border shrink-0 ${
                        day.isAuspicious 
                          ? 'bg-amber-50 border-amber-300 text-amber-900' 
                          : 'bg-stone-100 border-stone-200 text-stone-600'
                      }`}>
                        <span className="text-xs font-semibold leading-none">{day.dayOfWeek}</span>
                        <span className="text-2xl font-black leading-none mt-1">{day.solarDay}</span>
                      </div>

                      {/* Details Info */}
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-bold text-stone-900">
                            {day.dayOfWeek}, ngày {day.solarDay}/{day.solarMonth}/{day.solarYear}
                          </h3>
                          {day.isAuspicious && (
                            <Badge className="bg-amber-600 text-white hover:bg-amber-700 gap-1 text-xs">
                              <Sparkles className="w-3 h-3" /> Ngày Cát Lành
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs sm:text-sm text-stone-600 mt-0.5 flex items-center gap-2 flex-wrap">
                          <span>Âm lịch: <strong>{day.lunarDay}/{day.lunarMonth}</strong> {day.isLeap ? '(Nhuận)' : ''}</span>
                          <span>•</span>
                          <span>Ngày: <strong>{day.canChiDay}</strong></span>
                          <span>•</span>
                          <span>Trực: <strong>{day.truc}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Score & Evaluation Badge */}
                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <div className="text-right hidden sm:block">
                        <div className="text-xs text-stone-500 font-medium">Chỉ số cát khí</div>
                        <div className="text-base font-black text-primary">{day.score}/100</div>
                      </div>
                      <Badge variant="outline" className={`px-3 py-1 font-bold text-xs ${scoreBadge.color}`}>
                        {scoreBadge.text}
                      </Badge>
                    </div>
                  </div>

                  {/* Reasons & Warnings Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                    {/* Cát tinh & Điểm tốt */}
                    <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200/70 space-y-1.5">
                      <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                        Điểm cát lợi cho {purposeTitle.toLowerCase()}:
                      </div>
                      {day.reasons.length > 0 ? (
                        <ul className="space-y-1 text-emerald-950 pl-5 list-disc">
                          {day.reasons.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-stone-500 italic pl-5">Không có sao cát trợ lực đặc biệt.</p>
                      )}
                    </div>

                    {/* Kiêng kỵ & Cảnh báo */}
                    <div className={`p-3 rounded-lg border space-y-1.5 ${
                      day.warnings.length > 0 
                        ? 'bg-rose-50/70 border-rose-200/70 text-rose-950' 
                        : 'bg-stone-50 border-stone-200 text-stone-600'
                    }`}>
                      <div className="font-bold flex items-center gap-1.5 text-stone-800">
                        <AlertTriangle className={`w-4 h-4 shrink-0 ${day.warnings.length > 0 ? 'text-rose-600' : 'text-stone-400'}`} />
                        Điểm kiêng kỵ cần lưu ý:
                      </div>
                      {day.warnings.length > 0 ? (
                        <ul className="space-y-1 pl-5 list-disc text-rose-900 font-medium">
                          {day.warnings.map((w, i) => (
                            <li key={i}>{w}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-emerald-700 pl-5 font-medium">Không phạm các đại kỵ (Tam Nương, Sát Chủ, Thụ Tử).</p>
                      )}
                    </div>
                  </div>

                  {/* Giờ Hoàng Đạo trong ngày */}
                  <div className="space-y-1.5">
                    <div className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      Giờ hoàng đạo thích hợp tiến hành việc:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {day.hoangDaoHours.map((h, i) => (
                        <span 
                          key={i} 
                          className="px-2.5 py-1 rounded bg-background-alt border border-amber-900/15 text-amber-900 text-xs font-medium"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Mục riêng cho Xuất Hành: Hướng Hỷ Thần, Tài Thần & Giờ Lý Thuần Phong */}
                  {purpose === 'xuat-hanh' && xuatHanhInfo && (
                    <div className="rounded-xl bg-blue-50/60 border border-blue-200/80 p-4 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2 font-bold text-blue-900 text-sm">
                          <Compass className="w-4 h-4 text-blue-700" />
                          Phương vị xuất hành:
                          <span className="font-normal text-blue-950">
                            Hỷ Thần hướng <strong>{xuatHanhInfo.hyThan}</strong> | Tài Thần hướng <strong>{xuatHanhInfo.taiThan}</strong>
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setExpandedXuatHanhDay(isExpanded ? null : day.solarDay)}
                          aria-expanded={isExpanded}
                          className="text-xs font-semibold text-blue-700 hover:text-blue-900 underline cursor-pointer self-start sm:self-auto"
                        >
                          {isExpanded ? 'Ẩn 6 giờ Lý Thuần Phong ▲' : 'Xem 6 giờ Lý Thuần Phong ▼'}
                        </button>
                      </div>

                      {/* Dropdown bảng 6 giờ Lý Thuần Phong */}
                      {isExpanded && (
                        <div className="pt-2 border-t border-blue-200/60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                          {xuatHanhInfo.gioLyThuanPhong.map((g, idx) => (
                            <div 
                              key={idx} 
                              className={`p-2.5 rounded-lg border text-xs space-y-1 ${
                                g.isGood 
                                  ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950' 
                                  : 'bg-rose-50/90 border-rose-300 text-rose-950'
                              }`}
                            >
                              <div className="flex items-center justify-between font-bold">
                                <span>Giờ {g.canhGio} ({g.timeRange})</span>
                                <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                                  g.isGood ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                                }`}>
                                  {g.tenGio} ({g.isGood ? 'Cát' : 'Hung'})
                                </span>
                              </div>
                              <p className="text-xs leading-snug opacity-90">{g.yNghia}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Footer link to day detail */}
                  <div className="flex items-center justify-end pt-2 border-t border-stone-100">
                    <Link 
                      href={`/xem-ngay/${dateStr}`}
                      className="text-xs font-medium text-amber-800 hover:text-amber-950 flex items-center gap-1 hover:underline"
                    >
                      Xem chi tiết tiết khí & tử vi ngày {day.solarDay}/{day.solarMonth} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
