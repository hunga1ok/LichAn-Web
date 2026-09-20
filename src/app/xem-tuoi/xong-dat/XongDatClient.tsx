'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Sparkles,
  Trophy,
  CheckCircle2,
  Calendar,
  Star,
  Users,
  Loader2,
  Check,
  ChevronDown,
  ChevronUp,
  Share2,
} from 'lucide-react';
import { getTopXongDat, XongDatReport } from '@/lib/xem-tuoi';
import { getAllHoaGiapList, HoaGiapData } from '@/lib/tu-vi/hoa-giap';
import { Select } from '@/components/ui/select';

const QUICK_GIA_CHU = [
  { label: 'Canh Ngọ (1990)', year: 1990 },
  { label: 'Kỷ Tỵ (1989)', year: 1989 },
  { label: 'Nhâm Thân (1992)', year: 1992 },
  { label: 'Bính Dần (1986)', year: 1986 },
  { label: 'Quý Hợi (1983)', year: 1983 },
];

export default function XongDatClient() {
  const searchParams = useSearchParams();
  const initGiaChu = Number(searchParams.get('gia_chu')) || 1990;
  const initNam = Number(searchParams.get('nam')) || 2026;

  const [giaChuYear, setGiaChuYear] = useState<number>(initGiaChu);
  const [targetYear, setTargetYear] = useState<number>(initNam);
  const [copied, setCopied] = useState<boolean>(false);
  const [lastCalculatedTime, setLastCalculatedTime] = useState<string>('');
  const [justCalculated, setJustCalculated] = useState<boolean>(false);
  const [expandedCandidates, setExpandedCandidates] = useState<Record<number, boolean>>({});

  // Đồng bộ query params lên URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('gia_chu', giaChuYear.toString());
      url.searchParams.set('nam', targetYear.toString());
      window.history.replaceState(null, '', url.toString());
    }
  }, [giaChuYear, targetYear]);

  const resultRef = useRef<HTMLElement>(null);

  const hoaGiapList: HoaGiapData[] = useMemo(() => {
    return getAllHoaGiapList();
  }, []);

  const report: XongDatReport = useMemo(() => {
    return getTopXongDat(giaChuYear, targetYear);
  }, [giaChuYear, targetYear]);

  const { giaChu, targetYearHoaGiap, topCandidates } = report;

  const toggleCandidate = (year: number) => {
    setExpandedCandidates((prev) => ({ ...prev, [year]: !prev[year] }));
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

  const handleSelectQuickGiaChu = (y: number) => {
    setGiaChuYear(y);
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
      {/* 1. Form Chọn Năm */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100 space-y-6">
        <h2 className="text-xl font-bold text-amber-950 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-600" />
          Chọn tuổi gia chủ và năm cần xông đất
        </h2>

        {/* Quick select buttons */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Gợi ý tra cứu nhanh theo tuổi gia chủ:
          </label>
          <div className="flex flex-wrap gap-2">
            {QUICK_GIA_CHU.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectQuickGiaChu(item.year)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  giaChuYear === item.year
                    ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-amber-50/70 hover:border-amber-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Năm sinh Gia Chủ (Âm lịch)
            </label>
            <Select
              value={giaChuYear}
              onChange={(e) => {
                setGiaChuYear(Number(e.target.value));
                setJustCalculated(false);
              }}
              aria-label="Năm sinh Gia Chủ"
              className="h-12 bg-amber-50/30 font-semibold"
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
              Năm xông đất / Mở hàng khai xuân
            </label>
            <Select
              value={targetYear}
              onChange={(e) => {
                setTargetYear(Number(e.target.value));
                setJustCalculated(false);
              }}
              aria-label="Năm xông đất"
              className="h-12 bg-amber-50/30 font-semibold"
            >
              <option value={2025}>Năm 2025 (Ất Tỵ)</option>
              <option value={2026}>Năm 2026 (Bính Ngọ)</option>
              <option value={2027}>Năm 2027 (Đinh Mùi)</option>
              <option value={2028}>Năm 2028 (Mậu Thân)</option>
            </Select>
          </div>
        </div>

        {/* Nút Tra Cứu & Chia sẻ */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-amber-100">
          <div className="text-xs text-stone-600 flex flex-wrap items-center gap-2">
            {lastCalculatedTime ? (
              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <Check className="w-3.5 h-3.5" /> Đã xếp hạng lúc {lastCalculatedTime}
              </span>
            ) : (
              <span className="italic text-stone-500">
                * Bấm nút bên dưới để tính toán và xếp hạng Top tuổi xông nhà
              </span>
            )}
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1 text-xs font-medium text-amber-800 hover:text-amber-950 bg-amber-50 hover:bg-amber-100/80 px-2.5 py-1 rounded-full border border-amber-200 transition-colors cursor-pointer"
              title="Sao chép liên kết có chứa kết quả này"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Đã chép link!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-amber-700" />
                  <span>Chia sẻ kết quả</span>
                </>
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={handleSearch}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            Xem Danh Sách Tuổi Đẹp Nhất
          </button>
        </div>
      </section>

      {/* 2. Banner Giới Thiệu */}
      <section
        ref={resultRef}
        className={`bg-gradient-to-br from-amber-900 via-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-400/40 transition-all ${
          justCalculated ? 'ring-4 ring-amber-400/80' : ''
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Danh Sách Tuổi Đại Cát Xông Nhà
          </span>
          {justCalculated && (
            <span className="text-[10px] bg-amber-400 text-amber-950 font-black px-2 py-0.5 rounded-full animate-bounce">
              Vừa cập nhật
            </span>
          )}
        </div>
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
            Được xếp hạng theo mức độ hòa hợp cao nhất từ thuật toán phối hợp 3 chiều (Gia Chủ — Năm Mới — Người Xông Đất)
          </p>
        </div>

        <div className="space-y-4">
          {topCandidates.map((cand, idx) => {
            const isExpanded = expandedCandidates[cand.year] ?? (idx === 0);
            return (
              <div
                key={cand.year}
                className={`p-5 rounded-2xl border transition-all ${
                  idx === 0
                    ? 'bg-amber-50/80 border-amber-400 shadow-xs'
                    : 'bg-white border-amber-100 hover:bg-amber-50/40'
                }`}
              >
                <div
                  onClick={() => toggleCandidate(cand.year)}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      idx === 0 ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'
                    }`}>
                      #{idx + 1}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-gray-900 flex items-center gap-2">
                        Tuổi {cand.hoaGiap.canChi} ({cand.year})
                        {idx === 0 && (
                          <span className="text-[10px] bg-amber-500 text-amber-950 font-bold px-2 py-0.5 rounded-full">
                            Đại Cát Nhất
                          </span>
                        )}
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
                    <div className="text-stone-400 ml-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Các lý do tương hợp */}
                {isExpanded && (
                  <div className="pl-11 pt-2 border-t border-amber-100/60 space-y-1.5 text-xs text-gray-700">
                    {cand.reasons.map((r, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
