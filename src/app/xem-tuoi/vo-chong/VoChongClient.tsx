'use client';

import React, { useState, useMemo } from 'react';
import {
  Heart,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Sparkles,
  Flame,
  Info,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { evaluateVoChong, VoChongReport } from '@/lib/xem-tuoi';
import { getAllHoaGiapList, HoaGiapData } from '@/lib/tu-vi/hoa-giap';

export default function VoChongClient() {
  const [chongYear, setChongYear] = useState<number>(1990);
  const [voYear, setVoYear] = useState<number>(1993);

  const hoaGiapList: HoaGiapData[] = useMemo(() => {
    return getAllHoaGiapList();
  }, []);

  const report: VoChongReport = useMemo(() => {
    return evaluateVoChong(chongYear, voYear);
  }, [chongYear, voYear]);

  const { chong, vo, scores, conclusion } = report;

  return (
    <div className="space-y-10">
      {/* 1. Form Chọn Năm Sinh */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100">
        <h2 className="text-xl font-bold text-amber-950 mb-6 flex items-center gap-2">
          <Heart className="w-6 h-6 text-rose-600" />
          Chọn năm sinh của hai vợ chồng
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Chồng */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Năm sinh Chồng (Âm lịch)
            </label>
            <select
              value={chongYear}
              onChange={(e) => setChongYear(Number(e.target.value))}
              aria-label="Chọn năm sinh chồng"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-amber-50/40 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            >
              {hoaGiapList.map((hg) => (
                <option key={hg.year} value={hg.year}>
                  {hg.year} — {hg.canChi} ({hg.conGiap}) - {hg.menh.split(' ')[0]}
                </option>
              ))}
            </select>
          </div>

          {/* Vợ */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Năm sinh Vợ (Âm lịch)
            </label>
            <select
              value={voYear}
              onChange={(e) => setVoYear(Number(e.target.value))}
              aria-label="Chọn năm sinh vợ"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-amber-50/40 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            >
              {hoaGiapList.map((hg) => (
                <option key={hg.year} value={hg.year}>
                  {hg.year} — {hg.canChi} ({hg.conGiap}) - {hg.menh.split(' ')[0]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* 2. Banner Kết Quả Tổng Hợp */}
      <section
        className={`rounded-3xl p-6 sm:p-10 shadow-xl border text-white transition-all ${
          conclusion.level === 'DAI_CAT'
            ? 'bg-gradient-to-br from-emerald-800 via-emerald-900 to-stone-900 border-emerald-400/40'
            : conclusion.level === 'TRUNG_CAT'
            ? 'bg-gradient-to-br from-amber-800 via-amber-900 to-stone-900 border-amber-400/40'
            : conclusion.level === 'BINH_HOA'
            ? 'bg-gradient-to-br from-stone-800 to-stone-900 border-stone-400/40'
            : 'bg-gradient-to-br from-rose-900 via-stone-900 to-stone-950 border-rose-400/40'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/20">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Kết Quả Luận Giải Hôn Nhân
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-1">
              Chồng {chong.hoaGiap.canChi} ({chong.birthYear}) & Vợ {vo.hoaGiap.canChi} ({vo.birthYear})
            </h3>
            <p className="text-xs text-stone-300 mt-1">
              Chồng mệnh {chong.hoaGiap.menh} • Cung {chong.cungPhi.cung} | Vợ mệnh {vo.hoaGiap.menh} • Cung {vo.cungPhi.cung}
            </p>
          </div>

          {/* Điểm số */}
          <div className="flex items-center gap-3 bg-black/30 backdrop-blur px-5 py-3 rounded-2xl border border-white/20">
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-wider font-bold text-amber-300">Độ Hòa Hợp</div>
              <div className="text-xs font-semibold text-stone-200">{conclusion.levelLabel}</div>
            </div>
            <div className="text-4xl font-black text-amber-400 font-mono">
              {scores.totalScore}<span className="text-lg text-stone-400 font-normal">/10</span>
            </div>
          </div>
        </div>

        <div className="pt-6 space-y-3">
          <p className="text-sm sm:text-base leading-relaxed text-stone-100">
            {conclusion.summary}
          </p>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur border border-white/10 text-xs sm:text-sm text-stone-200 leading-relaxed">
            <strong className="text-amber-300 block mb-1">Lời khuyên gia đạo & hóa giải:</strong>
            {conclusion.advice}
          </div>
        </div>
      </section>

      {/* 3. Chi Tiết 5 Yếu Tố Hợp Khắc */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100 space-y-6">
        <h3 className="text-xl font-bold text-amber-950 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-600" />
          Phân Tích Chi Tiết 5 Yếu Tố Cổ Truyền
        </h3>

        <div className="space-y-4">
          {/* Tiêu chí 1: Ngũ Hành */}
          <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {scores.nguHanh.isGood ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <h4 className="font-bold text-gray-900 text-sm">
                  1. Ngũ Hành Bản Mệnh ({scores.nguHanh.relation})
                </h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${scores.nguHanh.isGood ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {scores.nguHanh.score}/2 điểm
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pl-7">
                {scores.nguHanh.description}
              </p>
            </div>
            <div className="text-xs text-gray-500 pl-7 sm:pl-0 sm:text-right shrink-0">
              Chồng: {chong.hoaGiap.hanh} • Vợ: {vo.hoaGiap.hanh}
            </div>
          </div>

          {/* Tiêu chí 2: Thiên Can */}
          <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {scores.thienCan.isGood ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <h4 className="font-bold text-gray-900 text-sm">
                  2. Thiên Can ({scores.thienCan.relation})
                </h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${scores.thienCan.isGood ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {scores.thienCan.score}/2 điểm
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pl-7">
                {scores.thienCan.description}
              </p>
            </div>
            <div className="text-xs text-gray-500 pl-7 sm:pl-0 sm:text-right shrink-0">
              Chồng: {chong.hoaGiap.canChi.split(' ')[0]} • Vợ: {vo.hoaGiap.canChi.split(' ')[0]}
            </div>
          </div>

          {/* Tiêu chí 3: Địa Chi */}
          <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {scores.diaChi.isGood ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <h4 className="font-bold text-gray-900 text-sm">
                  3. Địa Chi ({scores.diaChi.relation})
                </h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${scores.diaChi.isGood ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {scores.diaChi.score}/2 điểm
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pl-7">
                {scores.diaChi.description}
              </p>
            </div>
            <div className="text-xs text-gray-500 pl-7 sm:pl-0 sm:text-right shrink-0">
              Chồng: {chong.hoaGiap.conGiap} • Vợ: {vo.hoaGiap.conGiap}
            </div>
          </div>

          {/* Tiêu chí 4: Cung Phi Bát Tự */}
          <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {scores.cungPhi.isGood ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <h4 className="font-bold text-gray-900 text-sm">
                  4. Cung Phi Bát Tự ({scores.cungPhi.batSan} - {scores.cungPhi.mucDo})
                </h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${scores.cungPhi.isGood ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {scores.cungPhi.score}/2 điểm
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pl-7">
                {scores.cungPhi.description}
              </p>
            </div>
            <div className="text-xs text-gray-500 pl-7 sm:pl-0 sm:text-right shrink-0">
              Chồng: Cung {chong.cungPhi.cung} • Vợ: Cung {vo.cungPhi.cung}
            </div>
          </div>

          {/* Tiêu chí 5: Niên Mệnh */}
          <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {scores.nienMenh.isGood ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <h4 className="font-bold text-gray-900 text-sm">
                  5. Niên Mệnh Năm Sinh ({scores.nienMenh.relation})
                </h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${scores.nienMenh.isGood ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                  {scores.nienMenh.score}/2 điểm
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pl-7">
                {scores.nienMenh.description}
              </p>
            </div>
            <div className="text-xs text-gray-500 pl-7 sm:pl-0 sm:text-right shrink-0">
              Chồng: {chong.cungPhi.hanh} • Vợ: {vo.cungPhi.hanh}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
