'use client';

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Trophy,
  CheckCircle2,
  Calendar,
  Star,
  Users,
} from 'lucide-react';
import { getTopXongDat, XongDatReport } from '@/lib/xem-tuoi';
import { getAllHoaGiapList, HoaGiapData } from '@/lib/tu-vi/hoa-giap';

export default function XongDatClient() {
  const [giaChuYear, setGiaChuYear] = useState<number>(1990);
  const [targetYear, setTargetYear] = useState<number>(2026);

  const hoaGiapList: HoaGiapData[] = useMemo(() => {
    return getAllHoaGiapList();
  }, []);

  const report: XongDatReport = useMemo(() => {
    return getTopXongDat(giaChuYear, targetYear);
  }, [giaChuYear, targetYear]);

  const { giaChu, targetYearHoaGiap, topCandidates } = report;

  const resultRef = React.useRef<HTMLElement>(null);

  const handleSearch = () => {
    resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-10">
      {/* 1. Form Chọn Năm */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100">
        <h2 className="text-xl font-bold text-amber-950 mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-600" />
          Chọn tuổi gia chủ và năm cần xông đất
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Năm sinh Gia Chủ (Âm lịch)
            </label>
            <select
              value={giaChuYear}
              onChange={(e) => setGiaChuYear(Number(e.target.value))}
              aria-label="Năm sinh Gia Chủ"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-amber-50/30 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            >
              {hoaGiapList.map((hg) => (
                <option key={hg.year} value={hg.year}>
                  {hg.year} — {hg.canChi} ({hg.conGiap}) - {hg.menh.split(' ')[0]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Năm xông đất / Mở hàng khai xuân
            </label>
            <select
              value={targetYear}
              onChange={(e) => setTargetYear(Number(e.target.value))}
              aria-label="Năm xông đất"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-amber-50/30 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            >
              <option value={2025}>Năm 2025 (Ất Tỵ)</option>
              <option value={2026}>Năm 2026 (Bính Ngọ)</option>
              <option value={2027}>Năm 2027 (Đinh Mùi)</option>
              <option value={2028}>Năm 2028 (Mậu Thân)</option>
            </select>
          </div>
        </div>

        {/* Nút Tra Cứu */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-amber-100">
          <p className="text-xs text-stone-500 italic">
            * Kết quả tự động cập nhật ngay khi bạn thay đổi năm sinh.
          </p>
          <button
            type="button"
            onClick={handleSearch}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            Tra Cứu Tuổi Xông Đất Ngay
          </button>
        </div>
      </section>

      {/* 2. Banner Giới Thiệu */}
      <section
        ref={resultRef}
        className="bg-gradient-to-br from-amber-900 via-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-400/40"
      >
        <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
          Danh Sách Tuổi Đại Cát Xông Nhà
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-1">
          Gia Chủ Tuổi {giaChu.hoaGiap.canChi} ({giaChu.birthYear}) Trong Năm {targetYearHoaGiap.canChi} ({targetYear})
        </h3>
        <p className="text-sm text-stone-200 mt-2 leading-relaxed">
          Gia chủ mang bản mệnh <strong>{giaChu.hoaGiap.menh}</strong>. Người xông đất đầu năm cần có ngũ hành, thiên can và địa chi tương sinh, tam hợp với cả gia chủ và năm {targetYearHoaGiap.canChi} để kích hoạt vượng khí, tài lộc dồi dào suốt 12 tháng.
        </p>
      </section>

      {/* 3. Danh Sách Top Tuổi Đẹp Nhất */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-amber-950 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-600" />
            Top {topCandidates.length} Tuổi Xông Đất & Mở Hàng Đẹp Nhất
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Được xếp hạng theo mức độ hòa hợp cao nhất từ thuật toán phối hợp 3 chiều
          </p>
        </div>

        <div className="space-y-4">
          {topCandidates.map((cand, idx) => (
            <div
              key={cand.year}
              className={`p-5 rounded-2xl border transition-all ${
                idx === 0
                  ? 'bg-amber-50/80 border-amber-400 shadow-xs'
                  : 'bg-white border-amber-100 hover:bg-amber-50/40'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    idx === 0 ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'
                  }`}>
                    #{idx + 1}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900">
                      Tuổi {cand.hoaGiap.canChi} (Sinh năm {cand.year})
                    </h4>
                    <span className="text-xs text-gray-500">
                      Mệnh: {cand.hoaGiap.menh}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    cand.level === 'DAI_CAT' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {cand.levelLabel}
                  </span>
                  <span className="text-sm font-black text-amber-700 font-mono">
                    {cand.score}/10 điểm
                  </span>
                </div>
              </div>

              {/* Các lý do tương hợp */}
              <div className="pl-11 space-y-1.5 text-xs text-gray-700">
                {cand.reasons.map((r, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-gray-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
