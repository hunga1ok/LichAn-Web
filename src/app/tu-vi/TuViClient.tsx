'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  Compass,
  Flame,
  ShieldAlert,
  ShieldCheck,
  Check,
  AlertTriangle,
  Heart,
  Briefcase,
  Coins,
  Activity,
  ArrowRight,
  Info,
  Calendar,
  Share2,
} from 'lucide-react';
import { Select } from '@/components/ui/select';
import {
  getTuViPersonalReport,
  getAllHoaGiapList,
  HoaGiapData,
  TuViPersonalReport,
  TU_VI_12_CON_GIAP,
  TuViConGiap,
} from '@/lib/tu-vi';

const CON_GIAP_LIST = [
  { chi: 'Tý', name: 'Tý (Chuột)', emoji: '🐭' },
  { chi: 'Sửu', name: 'Sửu (Trâu)', emoji: '🐂' },
  { chi: 'Dần', name: 'Dần (Hổ)', emoji: '🐯' },
  { chi: 'Mão', name: 'Mão (Mèo)', emoji: '🐱' },
  { chi: 'Thìn', name: 'Thìn (Rồng)', emoji: '🐲' },
  { chi: 'Tỵ', name: 'Tỵ (Rắn)', emoji: '🐍' },
  { chi: 'Ngọ', name: 'Ngọ (Ngựa)', emoji: '🐴' },
  { chi: 'Mùi', name: 'Mùi (Dê)', emoji: '🐐' },
  { chi: 'Thân', name: 'Thân (Khỉ)', emoji: '🐵' },
  { chi: 'Dậu', name: 'Dậu (Gà)', emoji: '🐔' },
  { chi: 'Tuất', name: 'Tuất (Chó)', emoji: '🐶' },
  { chi: 'Hợi', name: 'Hợi (Lợn)', emoji: '🐷' },
];

export default function TuViClient() {
  const searchParams = useSearchParams();
  const initBirth = Number(searchParams.get('nam')) || 1993;
  const initTarget = Number(searchParams.get('xem')) || 2026;
  const initGender = (searchParams.get('gt') === 'nu' ? 'nu' : 'nam') as 'nam' | 'nu';
  const initTab = (searchParams.get('tab') === 'congiap' ? 'congiap' : 'canhan') as 'canhan' | 'congiap';
  const initChi = searchParams.get('chi') || 'Tý';

  const [activeTab, setActiveTab] = useState<'canhan' | 'congiap'>(initTab);

  // State cho Tra cứu cá nhân hóa
  const [birthYear, setBirthYear] = useState<number>(initBirth);
  const [targetYear, setTargetYear] = useState<number>(initTarget);
  const [gender, setGender] = useState<'nam' | 'nu'>(initGender);
  const [copied, setCopied] = useState<boolean>(false);

  // State cho xem nhanh 12 con giáp
  const [selectedChi, setSelectedChi] = useState<string>(initChi);

  // Đồng bộ query params lên URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', activeTab);
      if (activeTab === 'canhan') {
        url.searchParams.set('nam', birthYear.toString());
        url.searchParams.set('xem', targetYear.toString());
        url.searchParams.set('gt', gender);
        url.searchParams.delete('chi');
      } else {
        url.searchParams.set('chi', selectedChi);
        url.searchParams.delete('nam');
        url.searchParams.delete('xem');
        url.searchParams.delete('gt');
      }
      window.history.replaceState(null, '', url.toString());
    }
  }, [activeTab, birthYear, targetYear, gender, selectedChi]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const report: TuViPersonalReport = useMemo(() => {
    return getTuViPersonalReport(birthYear, targetYear, gender);
  }, [birthYear, targetYear, gender]);

  const hoaGiapList: HoaGiapData[] = useMemo(() => {
    return getAllHoaGiapList();
  }, []);

  const conGiapData: TuViConGiap = TU_VI_12_CON_GIAP[selectedChi] || TU_VI_12_CON_GIAP['Tý'];

  const resultRef = React.useRef<HTMLElement>(null);

  const handleSearch = () => {
    resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-10">
      {/* Tab Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex bg-amber-100/70 p-1.5 rounded-2xl border border-amber-200">
          <button
            type="button"
            onClick={() => setActiveTab('canhan')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'canhan'
                ? 'bg-white text-amber-900 shadow-xs'
                : 'text-amber-800 hover:text-amber-950'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            Tử Vi Cá Nhân Hóa (Theo Năm Sinh)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('congiap')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'congiap'
                ? 'bg-white text-amber-900 shadow-xs'
                : 'text-amber-800 hover:text-amber-950'
            }`}
          >
            <Calendar className="w-4 h-4 text-amber-600" />
            Tử Vi 12 Con Giáp
          </button>
        </div>
      </div>

      {activeTab === 'canhan' ? (
        <div className="space-y-10">
          {/* 1. Form Tra Cứu */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100">
            <h2 className="text-xl font-bold text-amber-950 mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-600" />
              Nhập thông tin tra cứu vận mệnh
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Năm sinh */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Năm sinh (Âm lịch)
                </label>
                <Select
                  value={birthYear}
                  onChange={(e) => setBirthYear(Number(e.target.value))}
                  aria-label="Chọn năm sinh"
                  className="h-12 bg-amber-50/40 font-semibold"
                >
                  {hoaGiapList.map((hg) => (
                    <option key={hg.year} value={hg.year}>
                      {hg.year} — {hg.canChi} ({hg.conGiap})
                    </option>
                  ))}
                </Select>
              </div>

              {/* Giới tính */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Giới tính (Mạng)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGender('nam')}
                    className={`py-3 rounded-xl font-bold text-sm transition-all border ${
                      gender === 'nam'
                        ? 'bg-amber-600 border-amber-600 text-white shadow-xs'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Nam Mạng
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('nu')}
                    className={`py-3 rounded-xl font-bold text-sm transition-all border ${
                      gender === 'nu'
                        ? 'bg-amber-600 border-amber-600 text-white shadow-xs'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Nữ Mạng
                  </button>
                </div>
              </div>

              {/* Năm xem vận hạn */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Năm xem niên hạn
                </label>
                <Select
                  value={targetYear}
                  onChange={(e) => setTargetYear(Number(e.target.value))}
                  aria-label="Chọn năm xem niên hạn"
                  className="h-12 bg-amber-50/40 font-semibold"
                >
                  <option value={2025}>Năm 2025 (Ất Tỵ)</option>
                  <option value={2026}>Năm 2026 (Bính Ngọ)</option>
                  <option value={2027}>Năm 2027 (Đinh Mùi)</option>
                  <option value={2028}>Năm 2028 (Mậu Thân)</option>
                  <option value={2029}>Năm 2029 (Kỷ Dậu)</option>
                  <option value={2030}>Năm 2030 (Canh Tuất)</option>
                </Select>
              </div>
            </div>

            {/* Nút Tra Cứu & Chia sẻ */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-amber-100">
              <div className="flex items-center gap-2">
                <p className="text-xs text-stone-500 italic">
                  * Kết quả tự động cập nhật ngay khi thay đổi thông tin.
                </p>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1 text-xs font-medium text-amber-800 hover:text-amber-950 bg-amber-50 hover:bg-amber-100/80 px-2.5 py-1 rounded-full border border-amber-200 transition-colors cursor-pointer"
                  title="Sao chép liên kết lá số này"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Đã chép link!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-amber-700" />
                      <span>Chia sẻ lá số</span>
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={handleSearch}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                Tra Cứu Vận Mệnh Ngay
              </button>
            </div>
          </section>

          {/* 2. BẢNG TỔNG HỢP VẬN MỆNH CÁ NHÂN */}
          <section
            ref={resultRef}
            className="bg-gradient-to-br from-amber-900 to-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-500/30"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-amber-500/20">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Lá Số Tử Vi & Vận Trình Năm {report.currentYear}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-amber-100 mt-1">
                  Tuổi {report.hoaGiap.canChi} ({report.birthYear}) — {report.genderLabel}
                </h3>
                <p className="text-sm text-amber-200/80 mt-1">
                  Tuổi mụ năm {report.currentYear}: <strong className="text-amber-300">{report.tuoiMu} tuổi</strong> | Mệnh: <strong className="text-amber-300">{report.hoaGiap.menh}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-950/70 hover:bg-amber-900 text-amber-200 border border-amber-500/30 text-xs font-bold transition-all cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? 'Đã chép link!' : 'Chia sẻ'}</span>
                </button>
                <Link
                  href={`/tu-vi/${report.hoaGiap.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs transition-all shadow-sm"
                >
                  Xem tử vi trọn đời {report.hoaGiap.canChi} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Sao chiếu mệnh */}
              <div className="bg-black/30 backdrop-blur rounded-2xl p-4 border border-amber-400/20">
                <div className="text-xs text-amber-300 uppercase tracking-wider font-semibold mb-1">
                  Sao Chiếu Mệnh
                </div>
                <div className="text-xl font-bold text-white flex items-center gap-2">
                  {report.saoChieuMenh.name}
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      report.saoChieuMenh.nature === 'CAT'
                        ? 'bg-emerald-500 text-white'
                        : report.saoChieuMenh.nature === 'HUNG'
                        ? 'bg-rose-500 text-white'
                        : 'bg-amber-500 text-black'
                    }`}
                  >
                    {report.saoChieuMenh.natureLabel.split(' ')[0]}
                  </span>
                </div>
                <div className="text-xs text-stone-300 mt-2 line-clamp-2">
                  {report.saoChieuMenh.description}
                </div>
              </div>

              {/* Bát Hạn */}
              <div className="bg-black/30 backdrop-blur rounded-2xl p-4 border border-amber-400/20">
                <div className="text-xs text-amber-300 uppercase tracking-wider font-semibold mb-1">
                  Niên Hạn (Bát Hạn)
                </div>
                <div className="text-xl font-bold text-white flex items-center gap-2">
                  Hạn {report.batHan.name}
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      report.batHan.level === 'DAI_HAN' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-black'
                    }`}
                  >
                    {report.batHan.levelLabel.split(' ')[0]}
                  </span>
                </div>
                <div className="text-xs text-stone-300 mt-2 line-clamp-2">
                  {report.batHan.shortDesc}
                </div>
              </div>

              {/* Cung Mệnh (Cung Phi) */}
              <div className="bg-black/30 backdrop-blur rounded-2xl p-4 border border-amber-400/20">
                <div className="text-xs text-amber-300 uppercase tracking-wider font-semibold mb-1">
                  Cung Mệnh (Bát Trạch)
                </div>
                <div className="text-xl font-bold text-white">
                  Cung {report.cungPhi.cung} ({report.cungPhi.hanh})
                </div>
                <div className="text-xs text-amber-200 mt-1 font-medium">
                  {report.cungPhi.nhomMenh}
                </div>
                <div className="text-[11px] text-stone-300 mt-1">
                  Sinh Khí: {report.cungPhi.chiTietHuong.find(h => h.loai === 'Sinh Khí')?.huong}
                </div>
              </div>

              {/* 3 Đại hạn làm nhà */}
              <div className="bg-black/30 backdrop-blur rounded-2xl p-4 border border-amber-400/20">
                <div className="text-xs text-amber-300 uppercase tracking-wider font-semibold mb-1">
                  Bộ 3 Đại Hạn {report.currentYear}
                </div>
                <div className="space-y-1 text-xs text-stone-200">
                  <div className="flex justify-between items-center">
                    <span>Tam Tai:</span>
                    <span className={`font-bold ${report.tamTai.isPham ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {report.tamTai.isPham ? 'Phạm hạn' : 'Không phạm'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Kim Lâu:</span>
                    <span className={`font-bold ${report.kimLau.isPham ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {report.kimLau.isPham ? report.kimLau.typeName : 'Không phạm'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Hoang Ốc:</span>
                    <span className={`font-bold ${report.hoangOc.isGood ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {report.hoangOc.cungName} ({report.hoangOc.isGood ? 'Tốt' : 'Xấu'})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. CHI TIẾT SAO CỬU DIỆU & CÁCH DÂNG SAO GIẢI HẠN */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-amber-950 flex items-center gap-2">
                <Flame className="w-6 h-6 text-amber-600" />
                Chi Tiết Sao {report.saoChieuMenh.name} & Nghi Thức Cúng Sao Giải Hạn
              </h3>
              <span
                className={`text-xs px-3 py-1 rounded-full font-bold ${
                  report.saoChieuMenh.nature === 'CAT'
                    ? 'bg-emerald-100 text-emerald-800'
                    : report.saoChieuMenh.nature === 'HUNG'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {report.saoChieuMenh.natureLabel}
              </span>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              {report.saoChieuMenh.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100 text-xs space-y-2">
                <div><strong>Ngũ hành sao:</strong> Mệnh {report.saoChieuMenh.hanh}</div>
                <div><strong>Tháng kỵ:</strong> {report.saoChieuMenh.kyThang}</div>
                <div><strong>Tháng tốt:</strong> {report.saoChieuMenh.hopThang}</div>
              </div>

              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100 text-xs space-y-2">
                <div><strong>Thời gian cúng dâng sao:</strong> {report.saoChieuMenh.cungSao.ngayCung}, {report.saoChieuMenh.cungSao.gioCung}</div>
                <div><strong>Hướng lạy:</strong> Quay mặt về {report.saoChieuMenh.cungSao.huongLay}</div>
                <div><strong>Bài trí nến/đèn:</strong> Thắp {report.saoChieuMenh.cungSao.soDen} ngọn nến</div>
                <div><strong>Bài vị ghi:</strong> <em>&ldquo;{report.saoChieuMenh.cungSao.baiVi}&rdquo;</em></div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-gray-100">
              <span className="text-xs text-gray-500">
                Cần bài văn khấn cúng dâng sao giải hạn chuẩn văn bia cổ?
              </span>
              <Link
                href="/van-khan/van-khan-giai-han"
                className="text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline inline-flex items-center gap-1"
              >
                Xem bài văn khấn cúng sao →
              </Link>
            </div>
          </section>

          {/* 4. CHI TIẾT BÁT HẠN NIÊN VẬN */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100 space-y-4">
            <h3 className="text-xl font-bold text-amber-950 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-rose-600" />
              Luận Giải Hạn {report.batHan.name} ({report.batHan.levelLabel})
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {report.batHan.fullDesc}
            </p>
            <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-200">
              <div className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Lời Khuyên Hóa Giải & Phòng Tránh
              </div>
              <div className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                {report.batHan.advice}
              </div>
            </div>
          </section>

          {/* 5. CUNG PHI BÁT TRẠCH HƯỚNG NHÀ */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-amber-950 flex items-center gap-2">
                <Compass className="w-6 h-6 text-amber-600" />
                Phong Thủy Bát Trạch & Hướng Nhà Cho Cung {report.cungPhi.cung} ({report.cungPhi.nhomMenh})
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Dùng khi chọn hướng mua nhà, đặt bàn thờ gia tiên, phòng ngủ và bàn làm việc
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 4 Hướng Tốt */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  4 Hướng Đại Cát (Nên Chọn)
                </div>
                <div className="space-y-2">
                  {report.cungPhi.chiTietHuong.filter(h => h.isGood).map((h, i) => (
                    <div key={i} className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-emerald-950 text-sm">
                          Hướng {h.huong} — {h.loai} ({h.mucDo})
                        </div>
                        <div className="text-xs text-gray-600 mt-0.5">{h.yNghia}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4 Hướng Xấu */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  4 Hướng Hung (Cần Tránh)
                </div>
                <div className="space-y-2">
                  {report.cungPhi.chiTietHuong.filter(h => !h.isGood).map((h, i) => (
                    <div key={i} className="p-3 bg-rose-50/60 rounded-xl border border-rose-200 flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-rose-950 text-sm">
                          Hướng {h.huong} — {h.loai} ({h.mucDo})
                        </div>
                        <div className="text-xs text-gray-600 mt-0.5">{h.yNghia}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Màu hợp / Kỵ */}
            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-gray-900 block mb-1">Màu sắc tương sinh tương hợp:</span>
                <span className="text-emerald-700 font-semibold">{report.cungPhi.mauHop.join(', ')}</span>
              </div>
              <div>
                <span className="font-bold text-gray-900 block mb-1">Màu sắc tương khắc (nên hạn chế):</span>
                <span className="text-rose-700 font-semibold">{report.cungPhi.mauKy.join(', ')}</span>
              </div>
            </div>
          </section>

          {/* 6. Danh sách 60 Hoa Giáp Xem Chi Tiết */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100 space-y-4">
            <h3 className="text-lg font-bold text-amber-950">
              Tra Cứu Tử Vi Trọn Đời Cho Các Năm Sinh Khác
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {hoaGiapList.slice(0, 36).map((hg) => (
                <Link
                  key={hg.year}
                  href={`/tu-vi/${hg.slug}`}
                  className="px-3 py-2 rounded-lg bg-amber-50/60 hover:bg-amber-100 text-xs font-medium text-gray-800 hover:text-amber-900 transition-colors border border-amber-100 text-center"
                >
                  {hg.year} {hg.canChi}
                </Link>
              ))}
            </div>
          </section>
        </div>
      ) : (
        /* Tab Xem 12 Con Giáp truyền thống */
        <div className="space-y-8">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {CON_GIAP_LIST.map((cg) => (
              <button
                key={cg.chi}
                type="button"
                onClick={() => setSelectedChi(cg.chi)}
                className={`p-4 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                  selectedChi === cg.chi
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-white text-gray-800 border-amber-100 hover:bg-amber-50'
                }`}
              >
                <span className="text-2xl">{cg.emoji}</span>
                <span className="text-xs font-bold">{cg.name}</span>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-2xl font-bold text-amber-950">
                {conGiapData.name} — Vận Trình Tổng Quan
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Hành: {conGiapData.hanh} | Mệnh: {conGiapData.menh} | Quý nhân: {conGiapData.quyNhan.join(', ')}
              </p>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              {conGiapData.overview}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5 mb-1">
                  <Briefcase className="w-4 h-4 text-blue-600" /> Sự Nghiệp & Công Danh
                </div>
                <div className="text-xs text-gray-700 leading-relaxed">{conGiapData.career}</div>
              </div>

              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                  <Coins className="w-4 h-4 text-amber-600" /> Tài Chính & Tiền Bạc
                </div>
                <div className="text-xs text-gray-700 leading-relaxed">{conGiapData.wealth}</div>
              </div>

              <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-100">
                <div className="text-xs font-bold text-rose-900 flex items-center gap-1.5 mb-1">
                  <Heart className="w-4 h-4 text-rose-600" /> Tình Duyên & Gia Đạo
                </div>
                <div className="text-xs text-gray-700 leading-relaxed">{conGiapData.love}</div>
              </div>

              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 mb-1">
                  <Activity className="w-4 h-4 text-emerald-600" /> Sức Khỏe & Phòng Ngừa
                </div>
                <div className="text-xs text-gray-700 leading-relaxed">{conGiapData.health}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
