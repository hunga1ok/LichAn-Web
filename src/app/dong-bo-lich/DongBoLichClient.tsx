'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Smartphone, Apple, Bell, Download, Check, Copy, ExternalLink, HelpCircle, Sparkles } from 'lucide-react';
import type { CalendarEvent } from '@/lib/calendar-sync/ics-generator';

interface DongBoLichClientProps {
  initialEvents: CalendarEvent[];
  currentYear: number;
}

export default function DongBoLichClient({ initialEvents, currentYear }: DongBoLichClientProps) {
  const [selectedType, setSelectedType] = useState<'all' | 'ram-mung-1' | 'le-tet'>('all');
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [enableReminder, setEnableReminder] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [origin, setOrigin] = useState<string>('https://lichan.com');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  // Tạo URL Webcal & HTTPS
  const queryParams = new URLSearchParams({
    year: selectedYear.toString(),
    type: selectedType,
    reminder: enableReminder ? '1' : '0',
  });

  const httpsUrl = `${origin}/api/v1/calendar/subscribe.ics?${queryParams.toString()}`;
  // Chuẩn webcal protocol thay https bằng webcal
  const webcalUrl = httpsUrl.replace(/^https?:\/\//, 'webcal://');

  // Google Calendar subscribe link
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(webcalUrl)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(webcalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Lọc preview events
  const previewEvents = initialEvents
    .filter(e => {
      if (selectedType === 'ram-mung-1') return e.category === 'MUNG_1' || e.category === 'RAM';
      if (selectedType === 'le-tet') return e.category === 'LE_TET';
      return true;
    })
    .slice(0, 6);

  return (
    <div className="space-y-10">
      {/* 1. Bộ Tùy Chọn Đồng Bộ */}
      <section className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 md:p-8">
        <h2 className="text-xl font-bold text-amber-900 mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-amber-600" />
          Tùy chỉnh lịch muốn đồng bộ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Loại sự kiện */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nội dung sự kiện
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              aria-label="Nội dung sự kiện muốn đồng bộ"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/40 text-gray-800 font-medium text-sm"
            >
              <option value="all">Toàn bộ (Rằm, Mùng 1 & Lễ Tết)</option>
              <option value="ram-mung-1">Chỉ ngày Rằm & Mùng 1 ÂL</option>
              <option value="le-tet">Chỉ các ngày Lễ Tết cổ truyền</option>
            </select>
          </div>

          {/* Chọn năm */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Năm đồng bộ
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              aria-label="Chọn năm đồng bộ"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/40 text-gray-800 font-medium text-sm"
            >
              <option value={currentYear}>Năm nay ({currentYear})</option>
              <option value={currentYear + 1}>Năm sau ({currentYear + 1})</option>
            </select>
          </div>

          {/* Nhắc nhở */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Thông báo nhắc nhở
            </label>
            <button
              type="button"
              onClick={() => setEnableReminder(!enableReminder)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-sm font-medium ${
                enableReminder
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-gray-50 border-gray-200 text-gray-500'
              }`}
            >
              <span className="flex items-center gap-2">
                <Bell className={`w-4 h-4 ${enableReminder ? 'text-amber-700' : 'text-gray-400'}`} />
                Nhắc 20:00 tối hôm trước
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${enableReminder ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {enableReminder ? 'BẬT' : 'TẮT'}
              </span>
            </button>
          </div>
        </div>

        {/* CÁC NÚT ĐỒNG BỘ 1-CLICK */}
        <div className="pt-6 border-t border-gray-100">
          <p className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-4">
            Chọn phương thức đồng bộ thuận tiện nhất cho bạn
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Apple Calendar */}
            <a
              href={webcalUrl}
              className="flex items-center justify-center gap-3 px-5 py-4 bg-gray-900 hover:bg-black text-white rounded-xl font-semibold shadow-sm hover:shadow transition-all group"
            >
              <Apple className="w-5 h-5 transition-transform group-hover:scale-110" />
              <div className="text-left">
                <div className="text-sm">Apple Calendar</div>
                <div className="text-[11px] text-gray-300 font-normal">iPhone, iPad, Mac (1-Click)</div>
              </div>
            </a>

            {/* Google Calendar */}
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-5 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm hover:shadow transition-all group"
            >
              <Calendar className="w-5 h-5 transition-transform group-hover:scale-110" />
              <div className="text-left">
                <div className="text-sm">Google Calendar</div>
                <div className="text-[11px] text-blue-100 font-normal">Android & Máy tính Web</div>
              </div>
              <ExternalLink className="w-4 h-4 ml-auto text-blue-200" />
            </a>

            {/* Tải file .ics */}
            <a
              href={httpsUrl}
              download="lich-an-viet-nam.ics"
              className="flex items-center justify-center gap-3 px-5 py-4 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-semibold shadow-sm hover:shadow transition-all group sm:col-span-2 lg:col-span-1"
            >
              <Download className="w-5 h-5 transition-transform group-hover:scale-110" />
              <div className="text-left">
                <div className="text-sm">Tải file .ICS</div>
                <div className="text-[11px] text-amber-200 font-normal">Cho Outlook hoặc ứng dụng khác</div>
              </div>
            </a>
          </div>

          {/* Copy Webcal link */}
          <div className="mt-5 flex flex-col sm:flex-row items-center gap-3 p-3 bg-amber-50/70 rounded-xl border border-amber-200">
            <span className="text-xs font-semibold text-amber-900 shrink-0">
              Đường dẫn Webcal (URL Đăng ký):
            </span>
            <input
              type="text"
              readOnly
              value={webcalUrl}
              aria-label="Đường dẫn Webcal đăng ký lịch"
              className="w-full text-xs font-mono bg-white px-3 py-2 rounded-lg border border-amber-200 text-gray-700 select-all"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  Đã chép!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Sao chép
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* 2. Danh Sách Xem Trước (Preview Sự Kiện) */}
      <section className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-amber-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              Xem trước các sự kiện sắp diễn ra ({selectedYear})
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Các sự kiện này sẽ tự động xuất hiện đầy đủ trong ứng dụng Lịch của bạn
            </p>
          </div>
          <span className="hidden sm:inline-block text-xs font-bold px-3 py-1 bg-amber-100 text-amber-800 rounded-full">
            {previewEvents.length} sự kiện mẫu
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {previewEvents.map((evt) => {
            const isTet = evt.category === 'LE_TET';
            const isRam = evt.category === 'RAM';
            return (
              <div
                key={evt.uid}
                className={`p-4 rounded-xl border transition-all ${
                  isTet
                    ? 'bg-rose-50/70 border-rose-200'
                    : isRam
                    ? 'bg-amber-50/60 border-amber-200'
                    : 'bg-emerald-50/60 border-emerald-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      isTet
                        ? 'bg-rose-600 text-white'
                        : isRam
                        ? 'bg-amber-600 text-white'
                        : 'bg-emerald-700 text-white'
                    }`}
                  >
                    {isTet ? 'Lễ Tết Cổ Truyền' : isRam ? 'Ngày Rằm' : 'Mùng 1'}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">
                    {evt.solarDate.day}/{evt.solarDate.month}/{evt.solarDate.year} DL
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1 leading-snug line-clamp-1">
                  {evt.summary}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {evt.description.split('\n')[0]}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Hướng Dẫn Chi Tiết Từng Hệ Điều Hành */}
      <section className="bg-amber-50/60 rounded-2xl border border-amber-200 p-6 md:p-8">
        <h2 className="text-lg font-bold text-amber-900 mb-6 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-700" />
          Hướng dẫn đồng bộ chi tiết từng thiết bị
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hướng dẫn iPhone / iPad */}
          <div className="bg-white p-5 rounded-xl border border-amber-100 space-y-3">
            <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
              <Apple className="w-4 h-4 text-gray-900" />
              iPhone / iPad (iOS)
            </div>
            <ol className="text-xs text-gray-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Mở trang này trên trình duyệt <strong>Safari</strong>.</li>
              <li>Bấm vào nút <strong>Apple Calendar</strong> ở trên.</li>
              <li>Hệ thống hiện thông báo, chọn <strong>Đăng ký (Subscribe)</strong>.</li>
              <li>Chọn màu hiển thị và bấm <strong>Thêm</strong> để hoàn tất.</li>
            </ol>
          </div>

          {/* Hướng dẫn Google Calendar / Android */}
          <div className="bg-white p-5 rounded-xl border border-amber-100 space-y-3">
            <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
              <Smartphone className="w-4 h-4 text-blue-600" />
              Android / Google Calendar
            </div>
            <ol className="text-xs text-gray-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Bấm nút <strong>Google Calendar</strong> để mở trang đăng ký tự động.</li>
              <li>Xác nhận <strong>Thêm lịch (Add calendar)</strong> vào tài khoản Google.</li>
              <li>Mở app Lịch trên điện thoại Android, vào Cài đặt và bật đồng bộ tài khoản vừa thêm.</li>
            </ol>
          </div>

          {/* Hướng dẫn Outlook / Máy tính */}
          <div className="bg-white p-5 rounded-xl border border-amber-100 space-y-3">
            <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
              <Calendar className="w-4 h-4 text-amber-700" />
              Microsoft Outlook
            </div>
            <ol className="text-xs text-gray-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Bấm nút <strong>Tải file .ICS</strong> để lưu file về máy tính.</li>
              <li>Mở Outlook, chọn <strong>File → Open & Export → Open Calendar</strong>.</li>
              <li>Hoặc chọn <strong>Add Calendar → From Internet</strong> và dán liên kết Webcal vào.</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
