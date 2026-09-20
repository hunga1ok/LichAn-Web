'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Share2, Sparkles, Heart, Compass, BookOpen, Calendar, Check, Copy, Flame, PartyPopper } from 'lucide-react';
import type { NextTetInfo } from '@/lib/tet/tet-info';

interface DemNguocTetClientProps {
  tetInfo: NextTetInfo;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

const TET_WISHES = [
  'Kính chúc vạn sự như ý, tỷ sự như mơ, triệu triệu bất ngờ, không chờ cũng đến!',
  'Năm mới chúc gia đình an khang thịnh vượng, phát tài phát lộc, dồi dào sức khỏe!',
  'Xuân đáo bình an tài lợi tiến - Mai khai phú quý lộc quyền lai.',
  'Chúc năm mới công việc hanh thông, vạn dặm bình an, gia đạo êm ấm thuận hòa!',
];

const PREPARATION_STEPS = [
  {
    day: '23 Tháng Chạp',
    title: 'Tiễn Ông Công Ông Táo Chầu Trời',
    desc: 'Làm lễ cúng cá chép vàng tiễn Táo Quân về trời bẩm báo Ngọc Hoàng. Bắt đầu tuần lễ chuẩn bị Tết.',
    link: '/van-khan/van-khan-ong-cong-ong-tao',
  },
  {
    day: '25 - 28 Tháng Chạp',
    title: 'Bao Sái Bàn Thờ & Gói Bánh Chưng',
    desc: 'Lau dọn trang nghiêm không gian thờ cúng gia tiên, gói bánh chưng bánh tét, quây quần bên bếp lửa hồng.',
    link: '/van-khan/van-khan-tat-nien-cuoi-nam',
  },
  {
    day: '29 - 30 Tháng Chạp',
    title: 'Chợ Hoa Xuân & Cúng Tất Niên',
    desc: 'Sắm cành đào, nhành mai, mâm ngũ quả. Chiều 30 làm cơm cúng Tất Niên đón ông bà tổ tiên về ăn Tết sum vầy.',
    link: '/van-khan/van-khan-tat-nien-cuoi-nam',
  },
  {
    day: 'Đêm Giao Thừa (00:00)',
    title: 'Thời Khắc Trừ Tịch Thiêng Liêng',
    desc: 'Cúng Giao thừa nghênh tân tống cựu, xua tan điều cũ, đón nguồn sinh khí cát tường cho năm mới.',
    link: '/van-khan/van-khan-giao-thua-ngoai-troi',
  },
  {
    day: 'Mùng 1 Tết Nguyên Đán',
    title: 'Khai Xuân Đại Cát & Xuất Hành',
    desc: 'Mừng tuổi ông bà cha mẹ, xuất hành chọn hướng Hỷ Thần, Tài Thần, đi lễ chùa cầu bình an may mắn.',
    link: '/xem-ngay-tot/xuat-hanh',
  },
];

export default function DemNguocTetClient({ tetInfo }: DemNguocTetClientProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: tetInfo.daysRemaining,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedWishIdx, setCopiedWishIdx] = useState<number | null>(null);
  const [currentUrl, setCurrentUrl] = useState('https://lichan.com/dem-nguoc-tet');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }

    const calculateTime = () => {
      const now = new Date().getTime();
      const diff = tetInfo.targetTimestamp - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [tetInfo.targetTimestamp]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyWish = (wish: string, idx: number) => {
    navigator.clipboard.writeText(`${wish}\n(Gửi từ Lịch An - https://lichan.com/dem-nguoc-tet)`);
    setCopiedWishIdx(idx);
    setTimeout(() => setCopiedWishIdx(null), 2000);
  };

  const gioHdList = tetInfo.dayInfoMung1.gioHoangDao
    .filter(g => g.isHoangDao)
    .map(g => `${g.name} (${g.time})`)
    .join(', ');

  return (
    <div className="space-y-12">
      {/* 1. ĐỒNG HỒ ĐẾM NGƯỢC LỚN (HERO COUNTDOWN) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-800 via-rose-900 to-amber-950 text-white p-6 sm:p-10 shadow-2xl border-2 border-amber-400/40">
        {/* Họa tiết pháo hoa mờ nền */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-200 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <PartyPopper className="w-4 h-4 text-amber-300" />
            Thời Khắc Giao Thừa Đón Xuân {tetInfo.canChiYear}
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-amber-100 drop-shadow-md">
            Đếm Ngược Đến Tết {tetInfo.canChiYear}
          </h2>

          <p className="text-amber-200/90 text-sm sm:text-base font-medium">
            Mùng 1 Tết Nguyên Đán: <strong>Thứ {tetInfo.dayInfoMung1.dayOfWeek.replace('Thứ ', '')}, ngày {tetInfo.solarDate.day}/{tetInfo.solarDate.month}/{tetInfo.solarDate.year} Dương Lịch</strong>
          </p>

          {/* CÁC Ô SỐ ĐẾM NGƯỢC */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto pt-2">
            {/* Ngày */}
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3 sm:p-5 border border-amber-400/30 flex flex-col items-center">
              <span className="text-3xl sm:text-5xl lg:text-6xl font-black text-amber-300 font-mono tracking-tight">
                {timeLeft.days}
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-200/80 mt-1">
                Ngày
              </span>
            </div>

            {/* Giờ */}
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3 sm:p-5 border border-amber-400/30 flex flex-col items-center">
              <span className="text-3xl sm:text-5xl lg:text-6xl font-black text-amber-300 font-mono tracking-tight">
                {timeLeft.hours.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-200/80 mt-1">
                Giờ
              </span>
            </div>

            {/* Phút */}
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3 sm:p-5 border border-amber-400/30 flex flex-col items-center">
              <span className="text-3xl sm:text-5xl lg:text-6xl font-black text-amber-300 font-mono tracking-tight">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-200/80 mt-1">
                Phút
              </span>
            </div>

            {/* Giây */}
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3 sm:p-5 border border-amber-400/30 flex flex-col items-center">
              <span className="text-3xl sm:text-5xl lg:text-6xl font-black text-amber-300 font-mono tracking-tight">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-200/80 mt-1">
                Giây
              </span>
            </div>
          </div>

          {/* Nút chia sẻ mạng xã hội */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-md"
            >
              <Share2 className="w-4 h-4" />
              Chia sẻ Facebook
            </a>
            <a
              href={`https://zalo.me/share?url=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition-all shadow-md"
            >
              <PartyPopper className="w-4 h-4" />
              Chia sẻ Zalo
            </a>
            <button
              type="button"
              onClick={handleCopyLink}
              aria-label="Sao chép liên kết đếm ngược Tết"
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold rounded-xl transition-all shadow-md"
            >
              {copiedLink ? <Check className="w-4 h-4 text-amber-950" /> : <Copy className="w-4 h-4" />}
              {copiedLink ? 'Đã chép link!' : 'Sao chép link'}
            </button>
          </div>
        </div>
      </section>

      {/* 2. THÔNG TIN PHONG THỦY NĂM MỚI */}
      <section className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 sm:p-8 space-y-6">
        <h3 className="text-xl font-bold text-amber-950 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-600" />
          Thông Tin Năm Mới {tetInfo.canChiYear} ({tetInfo.lunarYear})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200">
            <div className="text-xs text-amber-800 font-bold uppercase tracking-wider mb-1">
              Con Giáp & Ngũ Hành
            </div>
            <div className="text-lg font-bold text-gray-900">
              Cầm tinh con {tetInfo.conGiap}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Nạp âm: <strong>{tetInfo.nguHanh}</strong>
            </div>
          </div>

          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200">
            <div className="text-xs text-amber-800 font-bold uppercase tracking-wider mb-1">
              Can Chi Mùng 1 Tết
            </div>
            <div className="text-lg font-bold text-gray-900">
              Ngày {tetInfo.dayInfoMung1.canChiDay.fullName}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Tháng {tetInfo.dayInfoMung1.canChiMonth.fullName}
            </div>
          </div>

          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200">
            <div className="text-xs text-amber-800 font-bold uppercase tracking-wider mb-1">
              Trực & Tiết Khí Khai Xuân
            </div>
            <div className="text-lg font-bold text-gray-900">
              Trực {tetInfo.dayInfoMung1.truc}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Tiết khí: <strong>{tetInfo.dayInfoMung1.tietKhi}</strong>
            </div>
          </div>
        </div>

        {/* Giờ Hoàng Đạo Mùng 1 */}
        <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1">
          <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-700" />
            Giờ Hoàng Đạo Khởi Hành Sáng Mùng 1 Tết
          </div>
          <div className="text-sm font-semibold text-emerald-950">
            {gioHdList}
          </div>
        </div>
      </section>

      {/* 3. CẨM NANG ĐẾM NGƯỢC: CÁC BƯỚC CHUẨN BỊ TẾT CỔ TRUYỀN */}
      <section className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-amber-950 flex items-center gap-2">
              <Flame className="w-6 h-6 text-rose-600" />
              Lịch Trình Chuẩn Bị Đón Tết (23 Tháng Chạp Đến Mùng 1)
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Các phong tục cổ truyền cần nhớ để gia đạo bình an, hanh thông đón Tết
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {PREPARATION_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-amber-100 bg-amber-50/30 hover:bg-amber-50 transition-colors gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                    {step.day}
                  </span>
                  <h4 className="font-bold text-gray-900 text-sm">
                    {step.title}
                  </h4>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <Link
                href={step.link}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline shrink-0"
              >
                Xem chi tiết & bài khấn →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 4. GỢI Ý CÂU CHÚC TẾT HAY & Ý NGHĨA */}
      <section className="bg-amber-50/60 rounded-2xl border border-amber-200 p-6 sm:p-8 space-y-6">
        <h3 className="text-xl font-bold text-amber-950 flex items-center gap-2">
          <Heart className="w-6 h-6 text-rose-600" />
          Câu Chúc Tết Hay & Ý Nghĩa (Sao chép 1-Click)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TET_WISHES.map((wish, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl border border-amber-100 flex flex-col justify-between gap-3 shadow-2xs"
            >
              <p className="text-xs sm:text-sm text-gray-800 italic leading-relaxed">
                &ldquo;{wish}&rdquo;
              </p>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => handleCopyWish(wish, idx)}
                  aria-label="Sao chép câu chúc Tết này"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-colors cursor-pointer"
                >
                  {copiedWishIdx === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      Đã chép!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Sao chép lời chúc
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CÁC TIỆN ÍCH LIÊN QUAN */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          href="/dong-bo-lich"
          className="p-5 bg-white rounded-2xl border border-amber-100 shadow-2xs hover:shadow-md transition-all group flex items-start gap-4"
        >
          <div className="p-3 bg-amber-100 text-amber-800 rounded-xl group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm group-hover:text-amber-800 transition-colors">
              Đồng Bộ Lịch Vào Điện Thoại
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              Tự động nhắc ngày Rằm, Mùng 1 trên iPhone, Android.
            </p>
          </div>
        </Link>

        <Link
          href="/xem-ngay-tot/xuat-hanh"
          className="p-5 bg-white rounded-2xl border border-amber-100 shadow-2xs hover:shadow-md transition-all group flex items-start gap-4"
        >
          <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm group-hover:text-emerald-800 transition-colors">
              Xem Ngày Tốt Xuất Hành
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              Chọn hướng Hỷ Thần, Tài Thần và giờ hoàng đạo khai xuân.
            </p>
          </div>
        </Link>

        <Link
          href="/van-khan"
          className="p-5 bg-white rounded-2xl border border-amber-100 shadow-2xs hover:shadow-md transition-all group flex items-start gap-4"
        >
          <div className="p-3 bg-rose-100 text-rose-800 rounded-xl group-hover:bg-rose-600 group-hover:text-white transition-colors">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm group-hover:text-rose-800 transition-colors">
              Tuyển Tập Văn Khấn Tết
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              Đầy đủ văn khấn Táo Quân, Tất Niên, Giao Thừa, Mùng 1.
            </p>
          </div>
        </Link>
      </section>
    </div>
  );
}
