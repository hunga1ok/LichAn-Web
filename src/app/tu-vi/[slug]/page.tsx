import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  Compass,
  Briefcase,
  Coins,
  Heart,
  Activity,
  ArrowLeft,
  Flame,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react';
import { getAllHoaGiapList, getHoaGiapData, getTuViPersonalReport, HoaGiapData } from '@/lib/tu-vi';

export async function generateStaticParams() {
  const list = getAllHoaGiapList();
  return list.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const list = getAllHoaGiapList();
  const hg = list.find((item) => item.slug === slug);

  if (!hg) {
    return { title: 'Không tìm thấy tử vi tuổi | Lịch An' };
  }

  return {
    title: `Tử Vi Trọn Đời Tuổi ${hg.canChi} Sinh Năm ${hg.year} — Nam & Nữ Mạng | Lịch An`,
    description: `Xem tử vi trọn đời tuổi ${hg.canChi} sinh năm ${hg.year} mệnh ${hg.menh}. Vận trình công danh sự nghiệp, tài lộc, tình cảm, sức khỏe, cung phi Bát Trạch hướng nhà hợp kỵ.`,
    keywords: [
      `tử vi tuổi ${hg.canChi}`,
      `tử vi ${hg.year}`,
      `tuổi ${hg.canChi} mệnh gì`,
      `hướng nhà tuổi ${hg.canChi}`,
      `sao chiếu mệnh tuổi ${hg.canChi}`,
    ],
    openGraph: {
      title: `Tử Vi Trọn Đời Tuổi ${hg.canChi} (${hg.year}) — Lịch An`,
      description: `Bản mệnh ${hg.menh}, cung phi Bát Trạch và vận hạn trọn đời cho nam & nữ mạng.`,
      type: 'article',
      url: `https://lichan.com/tu-vi/${slug}`,
    },
  };
}

export default async function TuViHoaGiapDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const list = getAllHoaGiapList();
  const hg = list.find((item) => item.slug === slug);

  if (!hg) {
    notFound();
  }

  const currentYear = new Date().getFullYear();
  const reportNam = getTuViPersonalReport(hg.year, currentYear, 'nam');
  const reportNu = getTuViPersonalReport(hg.year, currentYear, 'nu');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Tử Vi Trọn Đời Tuổi ${hg.canChi} Sinh Năm ${hg.year}`,
    description: `Luận giải tử vi trọn đời, bản mệnh, cung phi bát trạch và sao chiếu mệnh tuổi ${hg.canChi} ${hg.year}.`,
    author: {
      '@type': 'Organization',
      name: 'Lịch An',
    },
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nút quay lại */}
        <Link
          href="/tu-vi"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại Tra Cứu Tử Vi
        </Link>

        {/* Header Hero */}
        <section className="bg-gradient-to-br from-amber-900 via-amber-950 to-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-500/30">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" /> Tử Vi Trọn Đời Lục Thập Hoa Giáp
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-amber-100">
            Tử Vi Tuổi {hg.canChi} ({hg.year})
          </h1>

          <p className="text-amber-200/90 text-sm sm:text-base mt-2">
            Cầm tinh con <strong>{hg.conGiap}</strong> | Bản mệnh: <strong className="text-amber-300">{hg.menh}</strong>
          </p>

          {/* Tag ngũ hành & tam hợp */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-amber-500/20 text-xs">
            <div className="bg-white/10 p-3 rounded-xl">
              <span className="text-amber-300 block font-semibold mb-0.5">Tương sinh:</span>
              <span className="text-stone-200">{hg.tuongSinh}</span>
            </div>
            <div className="bg-white/10 p-3 rounded-xl">
              <span className="text-amber-300 block font-semibold mb-0.5">Tương khắc:</span>
              <span className="text-stone-200">{hg.tuongKhac}</span>
            </div>
            <div className="bg-white/10 p-3 rounded-xl">
              <span className="text-amber-300 block font-semibold mb-0.5">Tam Hợp:</span>
              <span className="text-stone-200">{hg.tamHop.join(' - ')}</span>
            </div>
            <div className="bg-white/10 p-3 rounded-xl">
              <span className="text-amber-300 block font-semibold mb-0.5">Tứ Hành Xung:</span>
              <span className="text-stone-200">{hg.tuHanhXung.join(' - ')}</span>
            </div>
          </div>
        </section>

        {/* 1. Tổng quan cuộc đời */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100 space-y-4">
          <h2 className="text-xl font-bold text-amber-950">
            1. Tính Cách & Vận Trình Cuộc Đời Tuổi {hg.canChi}
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {hg.overview}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-1">
              <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-blue-600" /> Công Danh & Sự Nghiệp
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">{hg.career}</p>
            </div>

            <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100 space-y-1">
              <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-600" /> Tài Lộc & Tiền Tài
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">{hg.wealth}</p>
            </div>

            <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-100 space-y-1">
              <div className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-600" /> Tình Duyên & Hôn Nhân
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">{hg.love}</p>
            </div>

            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-1">
              <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-600" /> Sức Khỏe & Thể Trạng
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">{hg.health}</p>
            </div>
          </div>
        </section>

        {/* 2. Cung Phi & Bát Trạch Hướng Nhà (So sánh Nam & Nữ) */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-amber-950 flex items-center gap-2">
              <Compass className="w-6 h-6 text-amber-600" />
              2. Cung Mệnh Bát Trạch & Hướng Nhà Hợp - Kỵ
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Cung phi của Nam Mạng và Nữ Mạng thường khác nhau do quy luật biến dịch của Lạc Thư
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nam mạng */}
            <div className="p-5 bg-amber-50/40 rounded-2xl border border-amber-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-950 text-sm">
                  Nam Mạng Tuổi {hg.canChi}
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900">
                  Cung {reportNam.cungPhi.cung} ({reportNam.cungPhi.nhomMenh})
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="text-emerald-800 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> 4 Hướng Tốt:
                </div>
                <div className="text-gray-700 pl-5 space-y-1">
                  {reportNam.cungPhi.huongHop.map((h, i) => (
                    <div key={i}>• {h}</div>
                  ))}
                </div>

                <div className="text-rose-800 font-bold flex items-center gap-1 pt-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600" /> 4 Hướng Xấu:
                </div>
                <div className="text-gray-700 pl-5 space-y-1">
                  {reportNam.cungPhi.huongKhongHop.map((h, i) => (
                    <div key={i}>• {h}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Nữ mạng */}
            <div className="p-5 bg-amber-50/40 rounded-2xl border border-amber-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-950 text-sm">
                  Nữ Mạng Tuổi {hg.canChi}
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900">
                  Cung {reportNu.cungPhi.cung} ({reportNu.cungPhi.nhomMenh})
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="text-emerald-800 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> 4 Hướng Tốt:
                </div>
                <div className="text-gray-700 pl-5 space-y-1">
                  {reportNu.cungPhi.huongHop.map((h, i) => (
                    <div key={i}>• {h}</div>
                  ))}
                </div>

                <div className="text-rose-800 font-bold flex items-center gap-1 pt-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600" /> 4 Hướng Xấu:
                </div>
                <div className="text-gray-700 pl-5 space-y-1">
                  {reportNu.cungPhi.huongKhongHop.map((h, i) => (
                    <div key={i}>• {h}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Vận Hạn Năm Nay (2026) */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-100 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-amber-950 flex items-center gap-2">
              <Flame className="w-6 h-6 text-rose-600" />
              3. Vận Hạn Năm Nay ({currentYear} — Bính Ngọ)
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Tuổi mụ: {reportNam.tuoiMu} tuổi
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 space-y-2 text-xs">
              <div className="font-bold text-amber-900 text-sm">Nam Mạng ({currentYear}):</div>
              <div>• <strong>Sao chiếu mệnh:</strong> {reportNam.saoChieuMenh.name} ({reportNam.saoChieuMenh.natureLabel})</div>
              <div>• <strong>Bát hạn:</strong> Hạn {reportNam.batHan.name} ({reportNam.batHan.levelLabel})</div>
              <div>• <strong>Tam Tai:</strong> {reportNam.tamTai.isPham ? 'Phạm Tam Tai' : 'Không phạm'}</div>
              <div>• <strong>Kim Lâu:</strong> {reportNam.kimLau.isPham ? reportNam.kimLau.typeName : 'Không phạm'}</div>
              <div>• <strong>Hoang Ốc:</strong> {reportNam.hoangOc.cungName} ({reportNam.hoangOc.isGood ? 'Cát' : 'Hung'})</div>
            </div>

            <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 space-y-2 text-xs">
              <div className="font-bold text-amber-900 text-sm">Nữ Mạng ({currentYear}):</div>
              <div>• <strong>Sao chiếu mệnh:</strong> {reportNu.saoChieuMenh.name} ({reportNu.saoChieuMenh.natureLabel})</div>
              <div>• <strong>Bát hạn:</strong> Hạn {reportNu.batHan.name} ({reportNu.batHan.levelLabel})</div>
              <div>• <strong>Tam Tai:</strong> {reportNu.tamTai.isPham ? 'Phạm Tam Tai' : 'Không phạm'}</div>
              <div>• <strong>Kim Lâu:</strong> {reportNu.kimLau.isPham ? reportNu.kimLau.typeName : 'Không phạm'}</div>
              <div>• <strong>Hoang Ốc:</strong> {reportNu.hoangOc.cungName} ({reportNu.hoangOc.isGood ? 'Cát' : 'Hung'})</div>
            </div>
          </div>
        </section>

        {/* Danh sách liên kết xem tuổi khác */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 space-y-3">
          <h3 className="text-sm font-bold text-amber-950">
            Xem Tử Vi Các Tuổi Lân Cận:
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {list.slice(Math.max(0, hg.year - 1960 - 4), Math.min(list.length, hg.year - 1960 + 5)).map((item) => (
              <Link
                key={item.year}
                href={`/tu-vi/${item.slug}`}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                  item.year === hg.year
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-amber-50/50 hover:bg-amber-100 text-gray-800 border-amber-200'
                }`}
              >
                {item.year} {item.canChi}
              </Link>
            ))}
          </div>
        </section>
      </div>
  );
}
