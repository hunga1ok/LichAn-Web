'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { lunarService } from '@/lib/lunar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import {
  Compass,
  Clock,
  Sparkles,
  CalendarDays,
  MapPin,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

export default function XuatHanhClient() {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const isToday =
    selectedDay === today.getDate() &&
    selectedMonth === today.getMonth() + 1 &&
    selectedYear === today.getFullYear();

  // Lấy thông tin ngày và xuất hành
  const dayInfo = useMemo(
    () => lunarService.getDayInfo(selectedDay, selectedMonth, selectedYear),
    [selectedDay, selectedMonth, selectedYear]
  );

  const xuatHanhInfo = useMemo(
    () => lunarService.getXuatHanhInfo(selectedDay, selectedMonth, selectedYear),
    [selectedDay, selectedMonth, selectedYear]
  );

  // Giờ hoàng đạo tốt nhất
  const hoangDaoGood = dayInfo.gioHoangDao.filter((g) => g.isHoangDao);

  // Số ngày trong tháng hiện tại
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <Badge
          variant="outline"
          className="px-3.5 py-1 text-sm bg-blue-50 border-blue-300 text-blue-700"
        >
          <Compass className="w-3.5 h-3.5 mr-1.5 inline" /> TRA CỨU NHANH
        </Badge>
        <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tight">
          Hướng Xuất Hành {isToday ? 'Hôm Nay' : `${selectedDay}/${selectedMonth}/${selectedYear}`}
        </h1>
        <p className="text-stone-600 max-w-xl mx-auto text-sm">
          Phương vị nghênh đón Hỷ Thần, Tài Thần và 12 giờ Lý Thuần Phong —
          biết ngay hướng nào may mắn, giờ nào tốt nhất để khởi hành.
        </p>
      </div>

      {/* Chọn ngày */}
      <Card className="border-amber-900/15">
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-end gap-3">
            <div className="min-w-[100px]">
              <label className="text-xs font-medium text-stone-500 block mb-1">Ngày</label>
              <Select
                value={selectedDay}
                onChange={(e) => setSelectedDay(Number(e.target.value))}
              >
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </Select>
            </div>
            <div className="min-w-[120px]">
              <label className="text-xs font-medium text-stone-500 block mb-1">Tháng</label>
              <Select
                value={selectedMonth}
                onChange={(e) => {
                  const newMonth = Number(e.target.value);
                  setSelectedMonth(newMonth);
                  const maxDay = new Date(selectedYear, newMonth, 0).getDate();
                  if (selectedDay > maxDay) setSelectedDay(maxDay);
                }}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>Tháng {m}</option>
                ))}
              </Select>
            </div>
            <div className="min-w-[110px]">
              <label className="text-xs font-medium text-stone-500 block mb-1">Năm</label>
              <Select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                {Array.from({ length: 11 }, (_, i) => today.getFullYear() - 2 + i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </Select>
            </div>
            {!isToday && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedDay(today.getDate());
                  setSelectedMonth(today.getMonth() + 1);
                  setSelectedYear(today.getFullYear());
                }}
                className="text-xs"
              >
                ← Về hôm nay
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Thông tin ngày */}
      <Card className="border-amber-900/15">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50/50 border-b border-amber-900/10 pb-3">
          <CardTitle className="text-base flex items-center gap-2 text-primary">
            <CalendarDays className="w-4 h-4" />
            Thông Tin Ngày {dayInfo.dayOfWeek} — {selectedDay}/{selectedMonth}/{selectedYear}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div className="text-center p-3 rounded-lg bg-background-alt border border-amber-200/60">
              <div className="text-xs text-stone-500 mb-1">Âm lịch</div>
              <div className="font-bold text-amber-900">
                {dayInfo.lunarDate.day}/{dayInfo.lunarDate.month}
                {dayInfo.lunarDate.leap ? ' (Nhuận)' : ''}
              </div>
            </div>
            <div className="text-center p-3 rounded-lg bg-stone-50 border border-stone-200/60">
              <div className="text-xs text-stone-500 mb-1">Can Chi ngày</div>
              <div className="font-bold text-stone-800">{dayInfo.canChiDay.fullName}</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-stone-50 border border-stone-200/60">
              <div className="text-xs text-stone-500 mb-1">Trực</div>
              <div className="font-bold text-stone-800">Trực {dayInfo.truc}</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-stone-50 border border-stone-200/60">
              <div className="text-xs text-stone-500 mb-1">Ngũ hành</div>
              <div className="font-bold text-stone-800">{dayInfo.nguHanhDay}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hỷ Thần & Tài Thần */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2 border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50/30 shadow-sm">
          <CardContent className="pt-6 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-rose-100 border-2 border-rose-300 flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-rose-600" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-1">
                Hỷ Thần
              </div>
              <div className="text-3xl font-black text-rose-700">{xuatHanhInfo.hyThan}</div>
            </div>
            <p className="text-xs text-rose-600/80 leading-relaxed">
              Hướng đón Hỷ Thần mang lại may mắn, nhân duyên tốt đẹp.
              Nên hướng về phương này khi bước ra khỏi nhà.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50/30 shadow-sm">
          <CardContent className="pt-6 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center mx-auto">
              <MapPin className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-1">
                Tài Thần
              </div>
              <div className="text-3xl font-black text-amber-700">{xuatHanhInfo.taiThan}</div>
            </div>
            <p className="text-xs text-amber-600/80 leading-relaxed">
              Hướng đón Tài Thần mang lại tiền tài, phúc lộc dồi dào.
              Đi làm ăn, buôn bán nên hướng về phương này.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bảng 12 giờ Lý Thuần Phong */}
      <Card className="border-amber-900/15">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50/50 border-b border-blue-200/40 pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
            <Clock className="w-5 h-5" />
            12 Giờ Lý Thuần Phong
          </CardTitle>
          <p className="text-xs text-stone-500 mt-1">
            6 cung giờ xoay vòng — 3 giờ cát (Đại An, Tốc Hỷ, Tiểu Cát) và 3 giờ hung (Lưu Niên, Xích Khẩu, Không Vong)
          </p>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {xuatHanhInfo.gioLyThuanPhong.map((gio, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-center transition-all ${
                  gio.isGood
                    ? 'bg-emerald-50/80 border-emerald-200 shadow-xs'
                    : 'bg-stone-50 border-stone-200/80'
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  {gio.isGood ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-stone-400" />
                  )}
                  <span
                    className={`text-xs font-bold ${gio.isGood ? 'text-emerald-700' : 'text-stone-500'}`}
                  >
                    {gio.tenGio}
                  </span>
                </div>
                <div className="font-bold text-sm text-stone-800">{gio.canhGio}</div>
                <div className="text-xs text-stone-600 mt-0.5">{gio.timeRange}</div>
                <div
                  className={`text-[10px] mt-1.5 leading-snug ${gio.isGood ? 'text-emerald-600' : 'text-stone-500'}`}
                >
                  {gio.yNghia}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Giờ Hoàng Đạo */}
      <Card className="border-amber-900/15">
        <CardHeader className="border-b border-stone-100 pb-3">
          <CardTitle className="text-base flex items-center gap-2 text-primary">
            <Clock className="w-4 h-4" /> Giờ Hoàng Đạo Trong Ngày
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
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
        </CardContent>
      </Card>

      {/* CTA xem thêm */}
      <div className="text-center">
        <Link href="/xem-ngay-tot/xuat-hanh">
          <Button className="bg-primary hover:bg-primary-dark text-white gap-2 font-medium shadow-sm">
            Xem danh sách ngày tốt xuất hành cả tháng <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
