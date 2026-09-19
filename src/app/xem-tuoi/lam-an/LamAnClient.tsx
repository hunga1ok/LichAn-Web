'use client';

import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Sparkles,
  Users,
  CheckCircle2,
  XCircle,
  TrendingUp,
} from 'lucide-react';
import { evaluateLamAn, LamAnReport } from '@/lib/xem-tuoi';
import { getAllHoaGiapList, HoaGiapData } from '@/lib/tu-vi/hoa-giap';

export default function LamAnClient() {
  const [chuSuYear, setChuSuYear] = useState<number>(1990);
  const [doiTacYear, setDoiTacYear] = useState<number>(1993);
  const [chuSuGender, setChuSuGender] = useState<'nam' | 'nu'>('nam');
  const [doiTacGender, setDoiTacGender] = useState<'nam' | 'nu'>('nam');

  const hoaGiapList: HoaGiapData[] = useMemo(() => {
    return getAllHoaGiapList();
  }, []);

  const report: LamAnReport = useMemo(() => {
    return evaluateLamAn(chuSuYear, doiTacYear, chuSuGender, doiTacGender);
  }, [chuSuYear, doiTacYear, chuSuGender, doiTacGender]);

  const { chuSu, doiTac, scores, conclusion } = report;

  const resultRef = React.useRef<HTMLElement>(null);

  const handleSearch = () => {
    resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-10">
      {/* 1. Form Chọn Năm Sinh */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100">
        <h2 className="text-xl font-bold text-amber-950 mb-6 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-600" />
          Chọn thông tin của Chủ sự và Đối tác
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Chủ sự */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Năm sinh Chủ sự (Bạn)
            </label>
            <select
              value={chuSuYear}
              onChange={(e) => setChuSuYear(Number(e.target.value))}
              aria-label="Năm sinh Chủ sự"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-blue-50/30 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {hoaGiapList.map((hg) => (
                <option key={hg.year} value={hg.year}>
                  {hg.year} — {hg.canChi} ({hg.conGiap}) - {hg.menh.split(' ')[0]}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setChuSuGender('nam')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                  chuSuGender === 'nam' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                Nam
              </button>
              <button
                type="button"
                onClick={() => setChuSuGender('nu')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                  chuSuGender === 'nu' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                Nữ
              </button>
            </div>
          </div>

          {/* Đối tác */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Năm sinh Đối tác hợp tác
            </label>
            <select
              value={doiTacYear}
              onChange={(e) => setDoiTacYear(Number(e.target.value))}
              aria-label="Năm sinh Đối tác hợp tác"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-blue-50/30 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {hoaGiapList.map((hg) => (
                <option key={hg.year} value={hg.year}>
                  {hg.year} — {hg.canChi} ({hg.conGiap}) - {hg.menh.split(' ')[0]}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDoiTacGender('nam')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                  doiTacGender === 'nam' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                Nam
              </button>
              <button
                type="button"
                onClick={() => setDoiTacGender('nu')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                  doiTacGender === 'nu' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                Nữ
              </button>
            </div>
          </div>
        </div>

        {/* Nút Tra Cứu */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-amber-100">
          <p className="text-xs text-stone-500 italic">
            * Kết quả tự động cập nhật ngay khi bạn thay đổi năm sinh hoặc giới tính.
          </p>
          <button
            type="button"
            onClick={handleSearch}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-blue-200" />
            Tra Cứu Tuổi Làm Ăn Ngay
          </button>
        </div>
      </section>

      {/* 2. Banner Kết Quả Hợp Tác */}
      <section
        ref={resultRef}
        className={`rounded-3xl p-6 sm:p-10 shadow-xl border text-white transition-all ${
          conclusion.level === 'DAI_CAT'
            ? 'bg-gradient-to-br from-blue-900 via-indigo-950 to-stone-900 border-blue-400/40'
            : conclusion.level === 'TRUNG_CAT'
            ? 'bg-gradient-to-br from-emerald-900 to-stone-900 border-emerald-400/40'
            : conclusion.level === 'BINH_HOA'
            ? 'bg-gradient-to-br from-stone-800 to-stone-900 border-stone-400/40'
            : 'bg-gradient-to-br from-rose-900 to-stone-950 border-rose-400/40'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/20">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
              Đánh Giá Tương Hợp Kinh Doanh
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-1">
              {chuSu.hoaGiap.canChi} ({chuSu.birthYear}) & {doiTac.hoaGiap.canChi} ({doiTac.birthYear})
            </h3>
            <p className="text-xs text-stone-300 mt-1">
              Chủ sự: {chuSu.hoaGiap.menh} • Cung {chuSu.cungPhi.cung} | Đối tác: {doiTac.hoaGiap.menh} • Cung {doiTac.cungPhi.cung}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-black/30 backdrop-blur px-5 py-3 rounded-2xl border border-white/20">
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-wider font-bold text-blue-300">Độ Tương Hợp</div>
              <div className="text-xs font-semibold text-stone-200">{conclusion.levelLabel}</div>
            </div>
            <div className="text-4xl font-black text-amber-400 font-mono">
              {scores.totalScore}<span className="text-lg text-stone-400 font-normal">/10</span>
            </div>
          </div>
        </div>

        <div className="pt-6 space-y-4">
          <p className="text-sm sm:text-base leading-relaxed text-stone-100">
            {conclusion.summary}
          </p>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur border border-white/10 text-xs sm:text-sm text-stone-200 leading-relaxed">
            <strong className="text-blue-300 block mb-1">Gợi ý phân chia vai trò:</strong>
            {conclusion.phanChiaVaiTro}
          </div>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur border border-white/10 text-xs sm:text-sm text-stone-200 leading-relaxed">
            <strong className="text-amber-300 block mb-1">Lời khuyên hợp tác bền vững:</strong>
            {conclusion.advice}
          </div>
        </div>
      </section>

      {/* 3. Chi Tiết 4 Yếu Tố Làm Ăn */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100 space-y-4">
        <h3 className="text-xl font-bold text-amber-950 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          Chi Tiết 4 Tiêu Chí Kinh Doanh
        </h3>

        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-amber-100 bg-blue-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {scores.nguHanh.isGood ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-rose-600" />}
              <div>
                <span className="font-bold text-sm text-gray-900">Ngũ hành tài lộc: </span>
                <span className="text-xs text-gray-600">{scores.nguHanh.description}</span>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-800 shrink-0">{scores.nguHanh.score * 1.5}/3 điểm</span>
          </div>

          <div className="p-4 rounded-xl border border-amber-100 bg-blue-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {scores.diaChi.isGood ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-rose-600" />}
              <div>
                <span className="font-bold text-sm text-gray-900">Địa chi hợp tác: </span>
                <span className="text-xs text-gray-600">{scores.diaChi.description}</span>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-800 shrink-0">{scores.diaChi.score * 1.5}/3 điểm</span>
          </div>

          <div className="p-4 rounded-xl border border-amber-100 bg-blue-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {scores.thienCan.isGood ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-rose-600" />}
              <div>
                <span className="font-bold text-sm text-gray-900">Thiên can chí hướng: </span>
                <span className="text-xs text-gray-600">{scores.thienCan.description}</span>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-800 shrink-0">{scores.thienCan.score}/2 điểm</span>
          </div>

          <div className="p-4 rounded-xl border border-amber-100 bg-blue-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {scores.cungPhi.isGood ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-rose-600" />}
              <div>
                <span className="font-bold text-sm text-gray-900">Cung phi Bát trạch: </span>
                <span className="text-xs text-gray-600">{scores.cungPhi.description}</span>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-800 shrink-0">{scores.cungPhi.score}/2 điểm</span>
          </div>
        </div>
      </section>
    </div>
  );
}
