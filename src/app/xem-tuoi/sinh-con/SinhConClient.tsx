'use client';

import React, { useState, useMemo } from 'react';
import {
  Baby,
  Sparkles,
  Calendar,
  CheckCircle2,
  XCircle,
  Trophy,
} from 'lucide-react';
import { evaluateSinhCon, SinhConReport } from '@/lib/xem-tuoi';
import { getAllHoaGiapList, HoaGiapData } from '@/lib/tu-vi/hoa-giap';

export default function SinhConClient() {
  const [boYear, setBoYear] = useState<number>(1990);
  const [meYear, setMeYear] = useState<number>(1993);
  const [conYear, setConYear] = useState<number>(2026);

  const hoaGiapList: HoaGiapData[] = useMemo(() => {
    return getAllHoaGiapList();
  }, []);

  const report: SinhConReport = useMemo(() => {
    return evaluateSinhCon(boYear, meYear, conYear);
  }, [boYear, meYear, conYear]);

  const { bo, me, selectedYear, recommendedYears } = report;

  const resultRef = React.useRef<HTMLElement>(null);

  const handleSearch = () => {
    resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectYear = (year: number) => {
    setConYear(year);
    resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-10">
      {/* 1. Form Chọn Năm Sinh Bố - Mẹ - Con */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100">
        <h2 className="text-xl font-bold text-amber-950 mb-6 flex items-center gap-2">
          <Baby className="w-6 h-6 text-emerald-600" />
          Nhập thông tin năm sinh của Bố, Mẹ và Con
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Năm sinh Bố
            </label>
            <select
              value={boYear}
              onChange={(e) => setBoYear(Number(e.target.value))}
              aria-label="Năm sinh Bố"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-emerald-50/30 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
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
              Năm sinh Mẹ
            </label>
            <select
              value={meYear}
              onChange={(e) => setMeYear(Number(e.target.value))}
              aria-label="Năm sinh Mẹ"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-emerald-50/30 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
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
              Năm dự kiến sinh Con
            </label>
            <select
              value={conYear}
              onChange={(e) => setConYear(Number(e.target.value))}
              aria-label="Năm dự kiến sinh Con"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-emerald-50/30 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            >
              {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((y) => (
                <option key={y} value={y}>
                  Năm {y}
                </option>
              ))}
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
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            Tra Cứu Tuổi Sinh Con Ngay
          </button>
        </div>
      </section>

      {/* 2. Banner Đánh Giá Năm Đã Chọn */}
      <section
        ref={resultRef}
        className={`rounded-3xl p-6 sm:p-10 shadow-xl border text-white transition-all ${
          selectedYear.level === 'DAI_CAT'
            ? 'bg-gradient-to-br from-emerald-900 via-teal-950 to-stone-900 border-emerald-400/40'
            : selectedYear.level === 'CAT'
            ? 'bg-gradient-to-br from-amber-900 via-emerald-950 to-stone-900 border-amber-400/40'
            : selectedYear.level === 'BINH_HOA'
            ? 'bg-gradient-to-br from-stone-800 to-stone-900 border-stone-400/40'
            : 'bg-gradient-to-br from-rose-900 to-stone-950 border-rose-400/40'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/20">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Kết Quả Xem Tuổi Sinh Con Năm {conYear}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-1">
              Bố {bo.hoaGiap.canChi} + Mẹ {me.hoaGiap.canChi} → Con {selectedYear.conHoaGiap.canChi}
            </h3>
            <p className="text-xs text-stone-300 mt-1">
              Bố: {bo.hoaGiap.menh} | Mẹ: {me.hoaGiap.menh} | Con: {selectedYear.conHoaGiap.menh}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-black/30 backdrop-blur px-5 py-3 rounded-2xl border border-white/20">
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-wider font-bold text-emerald-300">Mức Độ Cát Khí</div>
              <div className="text-xs font-semibold text-stone-200">{selectedYear.levelLabel}</div>
            </div>
            <div className="text-4xl font-black text-amber-400 font-mono">
              {selectedYear.totalScore}<span className="text-lg text-stone-400 font-normal">/10</span>
            </div>
          </div>
        </div>

        <div className="pt-6 space-y-3">
          <p className="text-sm sm:text-base leading-relaxed text-stone-100">
            {selectedYear.summary}
          </p>
        </div>
      </section>

      {/* 3. Bảng Xếp Hạng 5 Năm Gần Nhất (Năm Nào Đẹp Nhất) */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-amber-950 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-600" />
            Bảng Xếp Hạng Các Năm Sinh Con Đẹp Nhất Cho Bố Mẹ
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Gợi ý các năm sắp tới để bố mẹ chủ động lên kế hoạch đón em bé thuận hòa nhất
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedYears.map((ry, idx) => (
            <div
              key={ry.conYear}
              onClick={() => handleSelectYear(ry.conYear)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                conYear === ry.conYear
                  ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400 shadow-xs'
                  : 'bg-white border-amber-100 hover:bg-amber-50/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-gray-900">
                  Năm {ry.conYear} ({ry.conHoaGiap.canChi})
                </span>
                <span className="text-xs font-black text-amber-600 font-mono">
                  {ry.totalScore}/10 đ
                </span>
              </div>
              <div className="text-xs text-gray-600 mb-2">
                Mệnh: {ry.conHoaGiap.menh.split('(')[0]}
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  ry.level === 'DAI_CAT'
                    ? 'bg-emerald-100 text-emerald-800'
                    : ry.level === 'CAT'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-stone-100 text-stone-700'
                }`}
              >
                {ry.levelLabel}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
