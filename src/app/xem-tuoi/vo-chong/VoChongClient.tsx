'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
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
  Loader2,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Check,
  Share2,
} from 'lucide-react';
import { evaluateVoChong, VoChongReport } from '@/lib/xem-tuoi';
import { getAllHoaGiapList, HoaGiapData } from '@/lib/tu-vi/hoa-giap';
import { Select } from '@/components/ui/select';

const QUICK_PAIRS = [
  { label: 'Canh Ngọ (1990) — Giáp Tuất (1994)', chong: 1990, vo: 1994 },
  { label: 'Nhâm Thân (1992) — Ất Hợi (1995)', chong: 1992, vo: 1995 },
  { label: 'Kỷ Tỵ (1989) — Nhâm Thân (1992)', chong: 1989, vo: 1992 },
  { label: 'Ất Hợi (1995) — Mậu Dần (1998)', chong: 1995, vo: 1998 },
  { label: 'Giáp Tý (1984) — Ất Sửu (1985)', chong: 1984, vo: 1985 },
];

export default function VoChongClient() {
  const searchParams = useSearchParams();
  const initChong = Number(searchParams.get('chong')) || 1990;
  const initVo = Number(searchParams.get('vo')) || 1993;

  const [chongYear, setChongYear] = useState<number>(initChong);
  const [voYear, setVoYear] = useState<number>(initVo);
  const [copied, setCopied] = useState<boolean>(false);
  const [lastCalculatedTime, setLastCalculatedTime] = useState<string>('');
  const [justCalculated, setJustCalculated] = useState<boolean>(false);
  const [expandedCriteria, setExpandedCriteria] = useState<Record<string, boolean>>({
    nguHanh: true,
    thienCan: true,
    diaChi: true,
    cungPhi: true,
    nienMenh: true,
  });

  // Đồng bộ query params lên URL khi năm thay đổi
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('chong', chongYear.toString());
      url.searchParams.set('vo', voYear.toString());
      window.history.replaceState(null, '', url.toString());
    }
  }, [chongYear, voYear]);

  const hoaGiapList: HoaGiapData[] = useMemo(() => {
    return getAllHoaGiapList();
  }, []);

  const report: VoChongReport = useMemo(() => {
    return evaluateVoChong(chongYear, voYear);
  }, [chongYear, voYear]);

  const { chong, vo, scores, conclusion } = report;
  const resultRef = useRef<HTMLElement>(null);

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

  const handleSelectQuickPair = (c: number, v: number) => {
    setChongYear(c);
    setVoYear(v);
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
      {/* 1. Form Chọn Năm Sinh */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-amber-950 flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-600" />
            Chọn năm sinh của hai vợ chồng
          </h2>
          <span className="text-xs text-stone-500">
            Hỗ trợ tra cứu từ năm 1920 đến 2030
          </span>
        </div>

        {/* Quick select buttons */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Gợi ý tra cứu nhanh các cặp tuổi phổ biến:
          </label>
          <div className="flex flex-wrap gap-2">
            {QUICK_PAIRS.map((qp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectQuickPair(qp.chong, qp.vo)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  chongYear === qp.chong && voYear === qp.vo
                    ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-amber-50/70 hover:border-amber-300'
                }`}
              >
                {qp.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Chồng */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Năm sinh Chồng (Âm lịch)
            </label>
            <Select
              value={chongYear}
              onChange={(e) => {
                setChongYear(Number(e.target.value));
                setJustCalculated(false);
              }}
              aria-label="Chọn năm sinh chồng"
              className="h-12 bg-amber-50/40 font-semibold"
            >
              {hoaGiapList.map((hg) => (
                <option key={hg.year} value={hg.year}>
                  {hg.year} — {hg.canChi} ({hg.conGiap}) - {hg.menh.split(' ')[0]}
                </option>
              ))}
            </Select>
          </div>

          {/* Vợ */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Năm sinh Vợ (Âm lịch)
            </label>
            <Select
              value={voYear}
              onChange={(e) => {
                setVoYear(Number(e.target.value));
                setJustCalculated(false);
              }}
              aria-label="Chọn năm sinh vợ"
              className="h-12 bg-amber-50/40 font-semibold"
            >
              {hoaGiapList.map((hg) => (
                <option key={hg.year} value={hg.year}>
                  {hg.year} — {hg.canChi} ({hg.conGiap}) - {hg.menh.split(' ')[0]}
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
                <Check className="w-3.5 h-3.5" /> Đã luận giải lúc {lastCalculatedTime}
              </span>
            ) : (
              <span className="italic text-stone-500">
                * Bấm nút bên dưới để xem điểm và luận giải chi tiết
              </span>
            )}
            <button
              type="button"
              onClick={handleCopyLink}
              aria-label="Sao chép liên kết kết quả xem tuổi vợ chồng"
              className="inline-flex items-center gap-1 text-xs font-medium text-amber-800 hover:text-amber-950 bg-amber-50 hover:bg-amber-100/80 px-2.5 py-1 rounded-full border border-amber-200 transition-colors cursor-pointer"
              title="Sao chép liên kết có chứa kết quả của 2 tuổi này"
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
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            Tra Cứu Hợp Khắc Ngay
          </button>
        </div>
      </section>

      {/* 2. Banner Kết Quả Tổng Hợp */}
      <section
        ref={resultRef}
        className={`rounded-3xl p-6 sm:p-10 shadow-xl border text-white transition-all relative overflow-hidden ${
          justCalculated ? 'ring-4 ring-amber-400/80' : ''
        } ${
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
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Kết Quả Luận Giải Hôn Nhân
              </span>
              {justCalculated && (
                <span className="text-[10px] bg-amber-400 text-amber-950 font-black px-2 py-0.5 rounded-full animate-bounce">
                  Vừa cập nhật
                </span>
              )}
            </div>
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
              <div className="text-xs uppercase tracking-wider font-bold text-amber-300">Độ Hòa Hợp</div>
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

      {/* 3. Chi Tiết 5 Yếu Tố Hợp Khắc (Accordion) */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-xl font-bold text-amber-950 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-600" />
            Phân Tích Chi Tiết 5 Yếu Tố Cổ Truyền
          </h3>
          <span className="text-xs text-stone-500">
            (Bấm vào từng tiêu chí để mở rộng hoặc thu gọn giải thích)
          </span>
        </div>

        <div className="space-y-4">
          {/* Tiêu chí 1: Ngũ Hành */}
          <div className="rounded-xl border border-amber-200 overflow-hidden bg-white shadow-2xs">
            <div
              onClick={() => toggleCriterion('nguHanh')}
              className="p-4 bg-amber-50/40 hover:bg-amber-50 cursor-pointer flex items-center justify-between gap-3 transition-colors"
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
                      {scores.nguHanh.score}/2 điểm
                    </span>
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Chồng: {chong.hoaGiap.hanh} ({chong.hoaGiap.menh.split('(')[0]}) • Vợ: {vo.hoaGiap.hanh} ({vo.hoaGiap.menh.split('(')[0]})
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
                  <strong>Ý nghĩa cổ điển:</strong> Ngũ hành bản mệnh là nền tảng cốt lõi của sinh mệnh. Hai mệnh tương sinh giúp vận khí gia đạo tương trợ lẫn nhau, thu hút tài lộc và nuôi dạy con cái thuận lợi.
                </div>
              </div>
            )}
          </div>

          {/* Tiêu chí 2: Thiên Can */}
          <div className="rounded-xl border border-amber-200 overflow-hidden bg-white shadow-2xs">
            <div
              onClick={() => toggleCriterion('thienCan')}
              className="p-4 bg-amber-50/40 hover:bg-amber-50 cursor-pointer flex items-center justify-between gap-3 transition-colors"
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
                    Chồng: Can {chong.hoaGiap.canChi.split(' ')[0]} • Vợ: Can {vo.hoaGiap.canChi.split(' ')[0]}
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
                  <strong>Ý nghĩa cổ điển:</strong> Thiên can đại diện cho trời, ý chí và đối ngoại xã hội. Thiên can tương hợp (Giáp-Kỷ, Ất-Canh, Bính-Tân, Đinh-Nhâm, Mậu-Quý) giúp vợ chồng thấu hiểu, đồng lòng cùng một chí hướng.
                </div>
              </div>
            )}
          </div>

          {/* Tiêu chí 3: Địa Chi */}
          <div className="rounded-xl border border-amber-200 overflow-hidden bg-white shadow-2xs">
            <div
              onClick={() => toggleCriterion('diaChi')}
              className="p-4 bg-amber-50/40 hover:bg-amber-50 cursor-pointer flex items-center justify-between gap-3 transition-colors"
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
                    Chồng: Tuổi {chong.hoaGiap.conGiap} • Vợ: Tuổi {vo.hoaGiap.conGiap}
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
                  <strong>Ý nghĩa cổ điển:</strong> Địa chi đại diện cho đất, cuộc sống đời thường, quan hệ họ hàng gia tộc. Tam Hợp hoặc Lục Hợp mang lại sự hòa khí, chung thủy và yêu thương bền chặt.
                </div>
              </div>
            )}
          </div>

          {/* Tiêu chí 4: Cung Phi Bát Tự */}
          <div className="rounded-xl border border-amber-200 overflow-hidden bg-white shadow-2xs">
            <div
              onClick={() => toggleCriterion('cungPhi')}
              className="p-4 bg-amber-50/40 hover:bg-amber-50 cursor-pointer flex items-center justify-between gap-3 transition-colors"
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
                      {scores.cungPhi.score}/2 điểm
                    </span>
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Chồng: Cung {chong.cungPhi.cung} ({chong.cungPhi.nhomMenh}) • Vợ: Cung {vo.cungPhi.cung} ({vo.cungPhi.nhomMenh})
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
                  <strong>Quy tắc Bát Trạch Minh Kính:</strong> 4 cung Cát gồm Sinh Khí, Thiên Y, Diên Niên, Phục Vị. Nếu phạm 4 cung Hung (Tuyệt Mệnh, Ngũ Quỷ, Lục Sát, Họa Hại), có thể hóa giải bằng hướng cửa chính, hướng đặt ban thờ hoặc chọn năm sinh con hợp cung.
                </div>
              </div>
            )}
          </div>

          {/* Tiêu chí 5: Niên Mệnh */}
          <div className="rounded-xl border border-amber-200 overflow-hidden bg-white shadow-2xs">
            <div
              onClick={() => toggleCriterion('nienMenh')}
              className="p-4 bg-amber-50/40 hover:bg-amber-50 cursor-pointer flex items-center justify-between gap-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                {scores.nienMenh.isGood ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <div>
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    5. Niên Mệnh Năm Sinh ({scores.nienMenh.relation})
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${scores.nienMenh.isGood ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {scores.nienMenh.score}/2 điểm
                    </span>
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Hành Cung Chồng: {chong.cungPhi.hanh} • Hành Cung Vợ: {vo.cungPhi.hanh}
                  </p>
                </div>
              </div>
              <div className="text-stone-400">
                {expandedCriteria.nienMenh ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </div>

            {expandedCriteria.nienMenh && (
              <div className="p-4 pt-2 text-xs text-gray-700 bg-white border-t border-amber-100 space-y-2">
                <p className="leading-relaxed">{scores.nienMenh.description}</p>
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-stone-600 space-y-1">
                  <strong>Ý nghĩa phong thủy:</strong> Hành của Cung Phi bổ trợ cho sức khỏe và thọ trường của hai vợ chồng trong đời sống hàng ngày.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
