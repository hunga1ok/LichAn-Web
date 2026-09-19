'use client';

import React, { useState, useMemo, useRef } from 'react';
import {
  Briefcase,
  Sparkles,
  Users,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Loader2,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { evaluateLamAn, LamAnReport } from '@/lib/xem-tuoi';
import { getAllHoaGiapList, HoaGiapData } from '@/lib/tu-vi/hoa-giap';

const QUICK_PARTNERS = [
  { label: 'Canh Ngọ (1990) — Nhâm Thân (1992)', chuSu: 1990, doiTac: 1992 },
  { label: 'Kỷ Tỵ (1989) — Quý Dậu (1993)', chuSu: 1989, doiTac: 1993 },
  { label: 'Bính Dần (1986) — Canh Ngọ (1990)', chuSu: 1986, doiTac: 1990 },
  { label: 'Ất Hợi (1995) — Đinh Sửu (1997)', chuSu: 1995, doiTac: 1997 },
];

export default function LamAnClient() {
  const [chuSuYear, setChuSuYear] = useState<number>(1990);
  const [doiTacYear, setDoiTacYear] = useState<number>(1993);
  const [chuSuGender, setChuSuGender] = useState<'nam' | 'nu'>('nam');
  const [doiTacGender, setDoiTacGender] = useState<'nam' | 'nu'>('nam');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [lastCalculatedTime, setLastCalculatedTime] = useState<string>('');
  const [justCalculated, setJustCalculated] = useState<boolean>(false);
  const [expandedCriteria, setExpandedCriteria] = useState<Record<string, boolean>>({
    nguHanh: true,
    thienCan: true,
    diaChi: true,
    cungPhi: true,
  });

  const resultRef = useRef<HTMLElement>(null);

  const hoaGiapList: HoaGiapData[] = useMemo(() => {
    return getAllHoaGiapList();
  }, []);

  const report: LamAnReport = useMemo(() => {
    return evaluateLamAn(chuSuYear, doiTacYear, chuSuGender, doiTacGender);
  }, [chuSuYear, doiTacYear, chuSuGender, doiTacGender]);

  const { chuSu, doiTac, scores, conclusion } = report;

  const toggleCriterion = (key: string) => {
    setExpandedCriteria((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSearch = () => {
    setIsCalculating(true);
    setJustCalculated(false);
    setTimeout(() => {
      setIsCalculating(false);
      setJustCalculated(true);
      const now = new Date();
      setLastCalculatedTime(
        `${now.getHours().toString().padStart(2, '0')}:${now
          .getMinutes()
          .toString()
          .padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
      );
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 350);
  };

  const handleSelectQuickPartner = (c: number, d: number) => {
    setChuSuYear(c);
    setDoiTacYear(d);
    setIsCalculating(true);
    setJustCalculated(false);
    setTimeout(() => {
      setIsCalculating(false);
      setJustCalculated(true);
      const now = new Date();
      setLastCalculatedTime(
        `${now.getHours().toString().padStart(2, '0')}:${now
          .getMinutes()
          .toString()
          .padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
      );
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  return (
    <div className="space-y-10">
      {/* 1. Form Chọn Năm Sinh */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100 space-y-6">
        <h2 className="text-xl font-bold text-amber-950 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-600" />
          Chọn thông tin của Chủ sự và Đối tác
        </h2>

        {/* Quick select presets */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Gợi ý tra cứu nhanh các cặp tuổi hợp tác:
          </label>
          <div className="flex flex-wrap gap-2">
            {QUICK_PARTNERS.map((qp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectQuickPartner(qp.chuSu, qp.doiTac)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  chuSuYear === qp.chuSu && doiTacYear === qp.doiTac
                    ? 'bg-blue-100 border-blue-400 text-blue-900 font-bold shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-blue-50/70 hover:border-blue-300'
                }`}
              >
                {qp.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Chủ sự */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Năm sinh Chủ sự (Bạn)
            </label>
            <select
              value={chuSuYear}
              onChange={(e) => {
                setChuSuYear(Number(e.target.value));
                setJustCalculated(false);
              }}
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
                onClick={() => {
                  setChuSuGender('nam');
                  setJustCalculated(false);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  chuSuGender === 'nam' ? 'bg-blue-600 text-white border-blue-600 shadow-xs' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                Nam
              </button>
              <button
                type="button"
                onClick={() => {
                  setChuSuGender('nu');
                  setJustCalculated(false);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  chuSuGender === 'nu' ? 'bg-blue-600 text-white border-blue-600 shadow-xs' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
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
              onChange={(e) => {
                setDoiTacYear(Number(e.target.value));
                setJustCalculated(false);
              }}
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
                onClick={() => {
                  setDoiTacGender('nam');
                  setJustCalculated(false);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  doiTacGender === 'nam' ? 'bg-blue-600 text-white border-blue-600 shadow-xs' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                Nam
              </button>
              <button
                type="button"
                onClick={() => {
                  setDoiTacGender('nu');
                  setJustCalculated(false);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  doiTacGender === 'nu' ? 'bg-blue-600 text-white border-blue-600 shadow-xs' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                Nữ
              </button>
            </div>
          </div>
        </div>

        {/* Nút Tra Cứu */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-amber-100">
          <div className="text-xs text-stone-600 flex items-center gap-1.5">
            {lastCalculatedTime ? (
              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <Check className="w-3.5 h-3.5" /> Đã phân tích lúc {lastCalculatedTime}
              </span>
            ) : (
              <span className="italic text-stone-500">
                * Bấm nút bên dưới để tính toán tương sinh tài vận và phân chia vai trò
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleSearch}
            disabled={isCalculating}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          >
            {isCalculating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-blue-200" />
                Đang đánh giá tài vận...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-blue-200" />
                Tra Cứu Tuổi Làm Ăn Ngay
              </>
            )}
          </button>
        </div>
      </section>

      {/* 2. Banner Kết Quả Hợp Tác */}
      <section
        ref={resultRef}
        className={`rounded-3xl p-6 sm:p-10 shadow-xl border text-white transition-all ${
          justCalculated ? 'ring-4 ring-blue-400/80' : ''
        } ${
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
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                Đánh Giá Tương Hợp Kinh Doanh
              </span>
              {justCalculated && (
                <span className="text-[10px] bg-blue-400 text-blue-950 font-black px-2 py-0.5 rounded-full animate-bounce">
                  Vừa cập nhật
                </span>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-1">
              {chuSu.hoaGiap.canChi} ({chuSu.birthYear}) & {doiTac.hoaGiap.canChi} ({doiTac.birthYear})
            </h3>
            <p className="text-xs text-stone-300 mt-1">
              Chủ sự: {chuSu.hoaGiap.menh} • Cung {chuSu.cungPhi.cung} | Đối tác: {doiTac.hoaGiap.menh} • Cung {doiTac.cungPhi.cung}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-black/30 backdrop-blur px-5 py-3 rounded-2xl border border-white/20">
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-wider font-bold text-blue-300">Điểm Tương Hợp</div>
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

          {/* Gợi ý vai trò điều hành */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <Users className="w-4 h-4" />
              Chiến Lược Phân Bổ Vai Trò Điều Hành Hợp Tác:
            </div>
            <p className="text-stone-100 text-xs sm:text-sm leading-relaxed pt-1">
              {conclusion.phanChiaVaiTro}
            </p>
            <div className="p-3 rounded-xl bg-black/20 border border-white/10 text-xs sm:text-sm text-stone-200 mt-2">
              <strong className="text-amber-300 block mb-1">Lời khuyên chiến lược kinh doanh:</strong>
              {conclusion.advice}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Chi Tiết 4 Yếu Tố Hợp Tác */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-xl font-bold text-amber-950 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-600" />
            Chi Tiết 4 Yếu Tố Tương Hỗ Kinh Doanh
          </h3>
          <span className="text-xs text-stone-500">
            (Bấm vào từng tiêu chí để mở rộng phân tích)
          </span>
        </div>

        <div className="space-y-4">
          {/* Ngũ Hành */}
          <div className="rounded-xl border border-amber-200 overflow-hidden bg-white shadow-2xs">
            <div
              onClick={() => toggleCriterion('nguHanh')}
              className="p-4 bg-blue-50/30 hover:bg-blue-50/60 cursor-pointer flex items-center justify-between gap-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                {scores.nguHanh.isGood ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <div>
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    1. Ngũ Hành Bản Mệnh ({scores.nguHanh.relation})
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${scores.nguHanh.isGood ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {scores.nguHanh.score}/3 điểm
                    </span>
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Chủ sự: {chuSu.hoaGiap.hanh} • Đối tác: {doiTac.hoaGiap.hanh}
                  </p>
                </div>
              </div>
              <div className="text-stone-400">
                {expandedCriteria.nguHanh ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </div>

            {expandedCriteria.nguHanh && (
              <div className="p-4 pt-2 text-xs text-gray-700 bg-white border-t border-amber-100 space-y-2">
                <p className="leading-relaxed">{scores.nguHanh.description}</p>
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-stone-600 space-y-1">
                  <strong>Ý nghĩa trong kinh doanh:</strong> Ngũ hành bản mệnh tương sinh hoặc bình hòa giúp các thương vụ đầu tư trôi chảy, đôi bên tương trợ bổ khuyết cho nhau, tránh hao tài tán lộc.
                </div>
              </div>
            )}
          </div>

          {/* Thiên Can */}
          <div className="rounded-xl border border-amber-200 overflow-hidden bg-white shadow-2xs">
            <div
              onClick={() => toggleCriterion('thienCan')}
              className="p-4 bg-blue-50/30 hover:bg-blue-50/60 cursor-pointer flex items-center justify-between gap-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                {scores.thienCan.isGood ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <div>
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    2. Thiên Can ({scores.thienCan.relation})
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${scores.thienCan.isGood ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {scores.thienCan.score}/2 điểm
                    </span>
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Chủ sự: {chuSu.hoaGiap.canChi.split(' ')[0]} • Đối tác: {doiTac.hoaGiap.canChi.split(' ')[0]}
                  </p>
                </div>
              </div>
              <div className="text-stone-400">
                {expandedCriteria.thienCan ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </div>

            {expandedCriteria.thienCan && (
              <div className="p-4 pt-2 text-xs text-gray-700 bg-white border-t border-amber-100 space-y-2">
                <p className="leading-relaxed">{scores.thienCan.description}</p>
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-stone-600 space-y-1">
                  <strong>Ý nghĩa trong đàm phán:</strong> Thiên can tương hợp giúp hai bên thống nhất quan điểm nhanh chóng, hạn chế bất đồng khi ký kết hợp đồng và triển khai chiến lược thị trường.
                </div>
              </div>
            )}
          </div>

          {/* Địa Chi */}
          <div className="rounded-xl border border-amber-200 overflow-hidden bg-white shadow-2xs">
            <div
              onClick={() => toggleCriterion('diaChi')}
              className="p-4 bg-blue-50/30 hover:bg-blue-50/60 cursor-pointer flex items-center justify-between gap-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                {scores.diaChi.isGood ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <div>
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    3. Địa Chi ({scores.diaChi.relation})
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${scores.diaChi.isGood ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {scores.diaChi.score}/2 điểm
                    </span>
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Chủ sự: {chuSu.hoaGiap.conGiap} • Đối tác: {doiTac.hoaGiap.conGiap}
                  </p>
                </div>
              </div>
              <div className="text-stone-400">
                {expandedCriteria.diaChi ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </div>

            {expandedCriteria.diaChi && (
              <div className="p-4 pt-2 text-xs text-gray-700 bg-white border-t border-amber-100 space-y-2">
                <p className="leading-relaxed">{scores.diaChi.description}</p>
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-stone-600 space-y-1">
                  <strong>Ý nghĩa trong quan hệ đối tác:</strong> Địa chi tam hợp / lục hợp mang lại sự tín nhiệm cao, đồng cam cộng khổ khi gặp giai đoạn khó khăn tài chính.
                </div>
              </div>
            )}
          </div>

          {/* Cung Phi */}
          <div className="rounded-xl border border-amber-200 overflow-hidden bg-white shadow-2xs">
            <div
              onClick={() => toggleCriterion('cungPhi')}
              className="p-4 bg-blue-50/30 hover:bg-blue-50/60 cursor-pointer flex items-center justify-between gap-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                {scores.cungPhi.isGood ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <div>
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    4. Cung Phi Bát Tự ({scores.cungPhi.batSan} - {scores.cungPhi.mucDo})
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${scores.cungPhi.isGood ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {scores.cungPhi.score}/3 điểm
                    </span>
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Chủ sự: Cung {chuSu.cungPhi.cung} • Đối tác: Cung {doiTac.cungPhi.cung}
                  </p>
                </div>
              </div>
              <div className="text-stone-400">
                {expandedCriteria.cungPhi ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </div>

            {expandedCriteria.cungPhi && (
              <div className="p-4 pt-2 text-xs text-gray-700 bg-white border-t border-amber-100 space-y-2">
                <p className="leading-relaxed">{scores.cungPhi.description}</p>
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-stone-600 space-y-1">
                  <strong>Ý nghĩa phong thủy tài vận:</strong> Cung Sinh Khí hoặc Thiên Y là điềm đại cát trong kinh doanh, tiền tài sinh sôi, mở rộng quy mô công ty nhanh chóng.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
