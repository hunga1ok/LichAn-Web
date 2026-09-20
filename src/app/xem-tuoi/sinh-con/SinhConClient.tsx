'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Baby,
  Sparkles,
  Calendar,
  CheckCircle2,
  XCircle,
  Trophy,
  Loader2,
  Check,
  ChevronDown,
  ChevronUp,
  Share2,
} from 'lucide-react';
import { evaluateSinhCon, SinhConReport } from '@/lib/xem-tuoi';
import { getAllHoaGiapList, HoaGiapData } from '@/lib/tu-vi/hoa-giap';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const QUICK_PARENTS = [
  { label: 'Bố Canh Ngọ (1990) — Mẹ Giáp Tuất (1994)', bo: 1990, me: 1994 },
  { label: 'Bố Nhâm Thân (1992) — Mẹ Ất Hợi (1995)', bo: 1992, me: 1995 },
  { label: 'Bố Kỷ Tỵ (1989) — Mẹ Quý Dậu (1993)', bo: 1989, me: 1993 },
  { label: 'Bố Bính Dần (1986) — Mẹ Kỷ Tỵ (1989)', bo: 1986, me: 1989 },
];

export default function SinhConClient() {
  const searchParams = useSearchParams();
  const initBo = Number(searchParams.get('bo')) || 1990;
  const initMe = Number(searchParams.get('me')) || 1993;
  const initNam = Number(searchParams.get('nam')) || 2026;

  const [boYear, setBoYear] = useState<number>(initBo);
  const [meYear, setMeYear] = useState<number>(initMe);
  const [conYear, setConYear] = useState<number>(initNam);
  const [copied, setCopied] = useState<boolean>(false);
  const [lastCalculatedTime, setLastCalculatedTime] = useState<string>('');
  const [justCalculated, setJustCalculated] = useState<boolean>(false);
  const [expandedCriteria, setExpandedCriteria] = useState<Record<string, boolean>>({
    nguHanh: true,
    thienCan: true,
    diaChi: true,
  });

  // Đồng bộ query params lên URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('bo', boYear.toString());
      url.searchParams.set('me', meYear.toString());
      url.searchParams.set('nam', conYear.toString());
      window.history.replaceState(null, '', url.toString());
    }
  }, [boYear, meYear, conYear]);

  const resultRef = useRef<HTMLElement>(null);

  const hoaGiapList: HoaGiapData[] = useMemo(() => {
    return getAllHoaGiapList();
  }, []);

  const report: SinhConReport = useMemo(() => {
    return evaluateSinhCon(boYear, meYear, conYear);
  }, [boYear, meYear, conYear]);

  const { bo, me, selectedYear, recommendedYears } = report;

  const toggleCriterion = (key: string) => {
    setExpandedCriteria((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSearch = () => {
    setJustCalculated(true);
    const now = new Date();
    setLastCalculatedTime(
      `${now.getHours().toString().padStart(2, '0')}:${now
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
    );
    resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectYear = (year: number) => {
    setConYear(year);
    setJustCalculated(true);
    const now = new Date();
    setLastCalculatedTime(
      `${now.getHours().toString().padStart(2, '0')}:${now
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
    );
    resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectQuickParents = (b: number, m: number) => {
    setBoYear(b);
    setMeYear(m);
    setJustCalculated(true);
    const now = new Date();
    setLastCalculatedTime(
      `${now.getHours().toString().padStart(2, '0')}:${now
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
    );
    resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-10">
      {/* 1. Form Chọn Năm Sinh Bố - Mẹ - Con */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100 space-y-6">
        <h2 className="text-xl font-bold text-amber-950 flex items-center gap-2">
          <Baby className="w-6 h-6 text-emerald-600" />
          Nhập thông tin năm sinh của Bố, Mẹ và Con
        </h2>

        {/* Quick presets */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Gợi ý tra cứu nhanh các cặp tuổi bố mẹ:
          </label>
          <div className="flex flex-wrap gap-2">
            {QUICK_PARENTS.map((qp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectQuickParents(qp.bo, qp.me)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  boYear === qp.bo && meYear === qp.me
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-emerald-50/70 hover:border-emerald-300'
                }`}
              >
                {qp.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Năm sinh Bố
            </label>
            <Select
              value={boYear}
              onChange={(e) => {
                setBoYear(Number(e.target.value));
                setJustCalculated(false);
              }}
              aria-label="Năm sinh Bố"
              className="h-12 bg-emerald-50/30 font-semibold"
            >
              {hoaGiapList.map((hg) => (
                <option key={hg.year} value={hg.year}>
                  {hg.year} — {hg.canChi} ({hg.conGiap}) - {hg.menh.split(' ')[0]}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Năm sinh Mẹ
            </label>
            <Select
              value={meYear}
              onChange={(e) => {
                setMeYear(Number(e.target.value));
                setJustCalculated(false);
              }}
              aria-label="Năm sinh Mẹ"
              className="h-12 bg-emerald-50/30 font-semibold"
            >
              {hoaGiapList.map((hg) => (
                <option key={hg.year} value={hg.year}>
                  {hg.year} — {hg.canChi} ({hg.conGiap}) - {hg.menh.split(' ')[0]}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Năm dự kiến sinh Con
            </label>
            <Select
              value={conYear}
              onChange={(e) => {
                setConYear(Number(e.target.value));
                setJustCalculated(false);
              }}
              aria-label="Năm dự kiến sinh Con"
              className="h-12 bg-emerald-50/30 font-semibold"
            >
              {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((y) => (
                <option key={y} value={y}>
                  Năm {y}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Nút Tra Cứu & Chia sẻ */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-amber-100">
          <div className="text-xs text-stone-600 flex flex-wrap items-center gap-2">
            {lastCalculatedTime ? (
              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <Check className="w-3.5 h-3.5" /> Đã phân tích lúc {lastCalculatedTime}
              </span>
            ) : (
              <span className="italic text-stone-500">
                * Bấm nút bên dưới hoặc chọn năm từ bảng xếp hạng để xem luận giải
              </span>
            )}
            <button
              type="button"
              onClick={handleCopyLink}
              aria-label="Sao chép liên kết kết quả xem tuổi sinh con"
              className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-200 transition-colors cursor-pointer"
              title="Sao chép liên kết có chứa kết quả này"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Đã chép link!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Chia sẻ kết quả</span>
                </>
              )}
            </button>
          </div>

          <Button
            type="submit"
            onClick={handleSearch}
            className="w-full sm:w-auto px-8 h-12 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-base shadow-md cursor-pointer"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Xem Luận Giải Chi Tiết
          </Button>
        </div>
      </section>

      {/* 2. Banner Kết Quả Tổng Quan */}
      <section
        ref={resultRef}
        className="bg-gradient-to-br from-emerald-900 via-teal-900 to-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-500/30"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Kết Quả Luận Giải Cung Mệnh & Ngũ Hành
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-1">
              Bố {bo.birthYear} + Mẹ {me.birthYear} sinh con năm {selectedYear.conYear} ({selectedYear.conHoaGiap.canChi})
            </h2>
            <p className="text-xs text-stone-300 mt-1">
              Bố: {bo.hoaGiap.menh} | Mẹ: {me.hoaGiap.menh} | Con: {selectedYear.conHoaGiap.menh}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-black/30 backdrop-blur px-5 py-3 rounded-2xl border border-white/20">
            <div className="text-right">
              <div className="text-xs uppercase tracking-wider font-bold text-emerald-300">Mức Độ Cát Khí</div>
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
            Bấm vào bất kỳ năm nào để xem luận giải chi tiết và đối chiếu tương sinh tương khắc
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedYears.map((ry) => (
            <div
              key={ry.conYear}
              onClick={() => handleSelectYear(ry.conYear)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                conYear === ry.conYear
                  ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400 shadow-xs scale-[1.02]'
                  : 'bg-white border-amber-100 hover:bg-amber-50/50 hover:border-amber-300'
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
              <div className="flex items-center justify-between">
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
                <span className="text-xs text-emerald-700 font-semibold hover:underline">
                  Bấm xem →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Chi Tiết Phân Tích 3 Tiêu Chí Hợp Bố Mẹ */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-xl font-bold text-amber-950 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-600" />
            Phân Tích Chi Tiết 3 Chiều Tương Sinh
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
              className="p-4 bg-emerald-50/30 hover:bg-emerald-50/60 cursor-pointer flex items-center justify-between gap-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                {selectedYear.nguHanhBoCon.isGood || selectedYear.nguHanhMeCon.isGood ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <div>
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    1. Ngũ Hành Bản Mệnh (Bố: {selectedYear.nguHanhBoCon.relation} • Mẹ: {selectedYear.nguHanhMeCon.relation})
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {selectedYear.nguHanhBoCon.score + selectedYear.nguHanhMeCon.score}/4 điểm
                    </span>
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Bố: {bo.hoaGiap.hanh} • Mẹ: {me.hoaGiap.hanh} • Con: {selectedYear.conHoaGiap.hanh}
                  </p>
                </div>
              </div>
              <div className="text-stone-400">
                {expandedCriteria.nguHanh ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </div>

            {expandedCriteria.nguHanh && (
              <div className="p-4 pt-2 text-xs text-gray-700 bg-white border-t border-amber-100 space-y-2">
                <p className="leading-relaxed"><strong>Với Bố:</strong> {selectedYear.nguHanhBoCon.description}</p>
                <p className="leading-relaxed"><strong>Với Mẹ:</strong> {selectedYear.nguHanhMeCon.description}</p>
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-stone-600 space-y-1">
                  <strong>Quy tắc cổ điển:</strong> Ngũ hành bản mệnh của con tương sinh cho cha mẹ (hoặc cha mẹ sinh cho con) giúp gia đình thuận hòa, cha mẹ làm ăn phát đạt, con cái hay ăn chóng lớn, khỏe mạnh.
                </div>
              </div>
            )}
          </div>

          {/* Thiên Can */}
          <div className="rounded-xl border border-amber-200 overflow-hidden bg-white shadow-2xs">
            <div
              onClick={() => toggleCriterion('thienCan')}
              className="p-4 bg-emerald-50/30 hover:bg-emerald-50/60 cursor-pointer flex items-center justify-between gap-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                {selectedYear.thienCanBoCon.isGood || selectedYear.thienCanMeCon.isGood ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <div>
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    2. Thiên Can (Bố: {selectedYear.thienCanBoCon.relation} • Mẹ: {selectedYear.thienCanMeCon.relation})
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {selectedYear.thienCanBoCon.score + selectedYear.thienCanMeCon.score}/3 điểm
                    </span>
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Bố: {bo.hoaGiap.canChi.split(' ')[0]} • Mẹ: {me.hoaGiap.canChi.split(' ')[0]} • Con: {selectedYear.conHoaGiap.canChi.split(' ')[0]}
                  </p>
                </div>
              </div>
              <div className="text-stone-400">
                {expandedCriteria.thienCan ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </div>

            {expandedCriteria.thienCan && (
              <div className="p-4 pt-2 text-xs text-gray-700 bg-white border-t border-amber-100 space-y-2">
                <p className="leading-relaxed"><strong>Với Bố:</strong> {selectedYear.thienCanBoCon.description}</p>
                <p className="leading-relaxed"><strong>Với Mẹ:</strong> {selectedYear.thienCanMeCon.description}</p>
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-stone-600 space-y-1">
                  <strong>Ý nghĩa:</strong> Can của con tương sinh tương hợp với can cha mẹ giúp tạo phúc khí, con cái hiếu thuận và nghe lời khuyên răn của đấng sinh thành.
                </div>
              </div>
            )}
          </div>

          {/* Địa Chi */}
          <div className="rounded-xl border border-amber-200 overflow-hidden bg-white shadow-2xs">
            <div
              onClick={() => toggleCriterion('diaChi')}
              className="p-4 bg-emerald-50/30 hover:bg-emerald-50/60 cursor-pointer flex items-center justify-between gap-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                {selectedYear.diaChiBoCon.isGood || selectedYear.diaChiMeCon.isGood ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <div>
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    3. Địa Chi (Bố: {selectedYear.diaChiBoCon.relation} • Mẹ: {selectedYear.diaChiMeCon.relation})
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {selectedYear.diaChiBoCon.score + selectedYear.diaChiMeCon.score}/3 điểm
                    </span>
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Bố: {bo.hoaGiap.conGiap} • Mẹ: {me.hoaGiap.conGiap} • Con: {selectedYear.conHoaGiap.conGiap}
                  </p>
                </div>
              </div>
              <div className="text-stone-400">
                {expandedCriteria.diaChi ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </div>

            {expandedCriteria.diaChi && (
              <div className="p-4 pt-2 text-xs text-gray-700 bg-white border-t border-amber-100 space-y-2">
                <p className="leading-relaxed"><strong>Với Bố:</strong> {selectedYear.diaChiBoCon.description}</p>
                <p className="leading-relaxed"><strong>Với Mẹ:</strong> {selectedYear.diaChiMeCon.description}</p>
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-stone-600 space-y-1">
                  <strong>Ý nghĩa:</strong> Chi con hợp chi cha mẹ (Tam hợp, Lục hợp) tránh được xung sát và mang lại nhiều tiếng cười, sinh khí trong tổ ấm.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
