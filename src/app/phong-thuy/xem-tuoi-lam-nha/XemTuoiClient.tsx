'use client';

import { useState } from 'react';
import Link from 'next/link';
import { xemTuoiLamNha, XemTuoiLamNhaResult } from '@/lib/feng-shui';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Users, 
  Home, 
  ArrowRight,
  Info,
  Calendar,
  BookOpen
} from 'lucide-react';

export default function XemTuoiClient() {
  const currentYear = new Date().getFullYear();
  const [birthYear, setBirthYear] = useState<number>(1990);
  const [targetYear, setTargetYear] = useState<number>(currentYear);
  const [result, setResult] = useState<XemTuoiLamNhaResult>(() => xemTuoiLamNha(1990, currentYear));

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const res = xemTuoiLamNha(birthYear, targetYear);
    setResult(res);
  };

  const getVerdictStyle = (canBuild: boolean, score: number) => {
    if (score === 100) {
      return {
        bg: 'bg-emerald-50 border-emerald-300 text-emerald-950',
        badge: 'bg-emerald-600 text-white',
        icon: CheckCircle2,
      };
    }
    if (canBuild) {
      return {
        bg: 'bg-amber-50 border-amber-300 text-amber-950',
        badge: 'bg-amber-600 text-white',
        icon: AlertTriangle,
      };
    }
    return {
      bg: 'bg-rose-50 border-rose-300 text-rose-950',
      badge: 'bg-rose-600 text-white',
      icon: XCircle,
    };
  };

  const verdictStyle = getVerdictStyle(result.canBuild, result.score);
  const VerdictIcon = verdictStyle.icon;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Form Input Card */}
      <Card className="border-amber-900/15 shadow-sm bg-white overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-amber-50/80 to-stone-50 border-b border-amber-900/10 py-5">
          <CardTitle className="text-xl font-bold text-[#8B6914] flex items-center gap-2">
            <Calendar className="w-5 h-5" /> Nhập Thông Tin Tra Cứu
          </CardTitle>
          <CardDescription className="text-stone-600 text-xs sm:text-sm">
            Hệ thống đối soát đồng thời 3 đại hạn Tam Tai, Kim Lâu, Hoang Ốc theo cổ thư chính tông.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleCalculate} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
            {/* Năm sinh gia chủ */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 block">
                Năm sinh gia chủ (Dương lịch / Âm lịch):
              </label>
              <select
                value={birthYear}
                onChange={(e) => setBirthYear(parseInt(e.target.value, 10))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm font-medium focus:ring-2 focus:ring-amber-700/30 focus:outline-none"
              >
                {Array.from({ length: 71 }, (_, i) => 2010 - i).map((y) => (
                  <option key={y} value={y}>
                    Năm {y} ({xemTuoiLamNha(y, y).canChiBirth.split(' ')[0]} {xemTuoiLamNha(y, y).canChiBirth.split(' ')[1]})
                  </option>
                ))}
              </select>
            </div>

            {/* Năm dự kiến làm nhà */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 block">
                Năm dự kiến khởi công làm nhà:
              </label>
              <select
                value={targetYear}
                onChange={(e) => setTargetYear(parseInt(e.target.value, 10))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-sm font-medium focus:ring-2 focus:ring-amber-700/30 focus:outline-none"
              >
                {Array.from({ length: 15 }, (_, i) => 2024 + i).map((y) => (
                  <option key={y} value={y}>
                    Năm {y} ({xemTuoiLamNha(y, y).canChiBirth.split(' ')[0]} {xemTuoiLamNha(y, y).canChiBirth.split(' ')[1]})
                  </option>
                ))}
              </select>
            </div>

            {/* Nút tra cứu */}
            <div>
              <Button 
                type="submit" 
                className="w-full bg-[#8B6914] hover:bg-[#725510] text-white font-bold py-2.5 h-auto cursor-pointer shadow-sm"
              >
                Xem Kết Quả Ngay
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Kết Quả Tra Cứu Master Card */}
      <Card className={`border-2 shadow-sm overflow-hidden ${verdictStyle.bg}`}>
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Kết Luận */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/60 pb-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={`text-xs px-3 py-1 font-bold ${verdictStyle.badge}`}>
                  {result.verdict}
                </Badge>
                <span className="text-xs font-semibold text-stone-500">
                  Điểm phong thủy: <strong className="text-base text-amber-900">{result.score}/100</strong>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Gia chủ tuổi {result.canChiBirth} — Làm nhà năm {result.canChiTarget}
              </h2>
              <p className="text-xs sm:text-sm opacity-90">
                Tính đến năm {result.targetYear}, gia chủ tròn <strong>{result.targetYear - result.birthYear}</strong> tuổi, 
                tuổi mụ tính theo phong thủy là <strong className="text-amber-900 font-bold">{result.tuoiMu} tuổi</strong>.
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-white/80 border border-stone-200 flex items-center justify-center shrink-0 shadow-xs">
              <VerdictIcon className="w-8 h-8 text-amber-800" />
            </div>
          </div>

          {/* Lời khuyên tổng thể */}
          <div className="p-4 rounded-xl bg-white/90 border border-stone-200 text-xs sm:text-sm leading-relaxed text-stone-800">
            <span className="font-bold text-amber-950 block mb-1 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-800" /> Luận giải tổng quát từ chuyên gia:
            </span>
            {result.recommendation}
          </div>

          {/* Chi Tiết 3 Đại Hạn (3 Cột) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Tam Tai */}
            <div className={`p-4 rounded-xl border bg-white space-y-2.5 ${
              result.tamTai.isPham ? 'border-rose-300' : 'border-emerald-300'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-600 uppercase">1. Hạn Tam Tai</span>
                <Badge variant="outline" className={`text-[11px] font-bold ${
                  result.tamTai.isPham ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}>
                  {result.tamTai.isPham ? `Phạm Tam Tai (Năm ${result.tamTai.yearRank})` : 'Không phạm'}
                </Badge>
              </div>

              <div className="text-xs text-stone-600 leading-relaxed">
                {result.tamTai.description}
              </div>
            </div>

            {/* 2. Kim Lâu */}
            <div className={`p-4 rounded-xl border bg-white space-y-2.5 ${
              result.kimLau.isPham ? 'border-rose-300' : 'border-emerald-300'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-600 uppercase">2. Hạn Kim Lâu</span>
                <Badge variant="outline" className={`text-[11px] font-bold ${
                  result.kimLau.isPham ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}>
                  {result.kimLau.isPham ? result.kimLau.typeName : 'Không phạm'}
                </Badge>
              </div>

              <div className="text-xs text-stone-600 leading-relaxed">
                {result.kimLau.description}
              </div>
            </div>

            {/* 3. Hoang Ốc */}
            <div className={`p-4 rounded-xl border bg-white space-y-2.5 ${
              !result.hoangOc.isGood ? 'border-rose-300' : 'border-emerald-300'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-600 uppercase">3. Hạn Hoang Ốc</span>
                <Badge variant="outline" className={`text-[11px] font-bold ${
                  result.hoangOc.isGood ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-rose-100 text-rose-800 border-rose-300'
                }`}>
                  {result.hoangOc.cungName} ({result.hoangOc.isGood ? 'Cát' : 'Hung'})
                </Badge>
              </div>

              <div className="text-xs text-stone-600 leading-relaxed">
                {result.hoangOc.description}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Bảng Gợi Ý Mượn Tuổi (Nếu phạm hạn) */}
      {result.suggestedAges && result.suggestedAges.length > 0 && (
        <Card className="border-amber-900/15 shadow-sm bg-white overflow-hidden">
          <CardHeader className="bg-amber-50/70 border-b border-amber-900/10 py-4 px-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-amber-950 flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-800" />
                Danh Sách Tuổi Đẹp Nhất Năm {result.targetYear} Để Mượn Tuổi Làm Nhà
              </CardTitle>
              <Badge className="bg-emerald-700 text-white text-xs">
                Sạch Cả 3 Đại Hạn
              </Badge>
            </div>
            <CardDescription className="text-xs text-stone-600 mt-1">
              Các tuổi dưới đây trong năm {result.targetYear} đều không phạm Tam Tai, không phạm Kim Lâu và được cung Hoang Ốc Cát lành.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50 text-stone-600 font-bold">
                    <th className="py-2.5 px-3">Năm sinh</th>
                    <th className="py-2.5 px-3">Can Chi</th>
                    <th className="py-2.5 px-3">Tuổi mụ</th>
                    <th className="py-2.5 px-3">Cung Hoang Ốc</th>
                    <th className="py-2.5 px-3">Đánh giá</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {result.suggestedAges.slice(0, 8).map((tuoi, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/50 transition-colors">
                      <td className="py-3 px-3 font-bold text-amber-900">{tuoi.birthYear}</td>
                      <td className="py-3 px-3 font-medium text-stone-800">{tuoi.canChi}</td>
                      <td className="py-3 px-3 text-stone-600">{tuoi.tuoiMu} tuổi</td>
                      <td className="py-3 px-3 text-emerald-800 font-medium">{tuoi.hoangOcCung}</td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Đại Cát
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quy trình mượn tuổi chuẩn */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5 text-xs sm:text-sm">
              <div className="font-bold text-amber-950 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-800" />
                Quy trình & Thủ tục mượn tuổi làm nhà chuẩn cổ truyền:
              </div>
              <ol className="list-decimal pl-5 space-y-1.5 text-stone-700 leading-relaxed">
                <li>Ưu tiên mượn tuổi nam giới, lớn tuổi hơn gia chủ, người trong dòng tộc, gia đình hòa thuận, làm ăn khấm khá.</li>
                <li>Trước khi khởi công, gia chủ làm một tờ giấy bán nhà tượng trưng (giá tượng trưng 1.000đ - 10.000đ) cho người mượn tuổi.</li>
                <li>Khi làm lễ Động thổ và Cất nóc, người được mượn tuổi sẽ trực tiếp thắp hương và khấn vái thần linh; gia chủ tạm lánh mặt đi nơi khác cách nhà 50m.</li>
                <li>Khi nhập trạch (về nhà mới), người mượn tuổi làm lễ nhập trạch, sau đó gia chủ làm thủ tục "chuộc lại nhà" với giá cao hơn một chút.</li>
                <li>Sau lễ chuộc nhà, gia chủ chính thức thắp hương gia tiên và vào ở bình an, vạn sự hanh thông.</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liên kết sang Xem Ngày Động Thổ & Văn Khấn */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/xem-ngay-tot/dong-tho" className="block">
          <Card className="border-amber-900/15 hover:border-amber-500/40 hover:shadow-md transition-all p-5 h-full flex flex-col justify-between bg-white">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Bước tiếp theo</span>
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-1.5">
                <Home className="w-4 h-4 text-amber-800" /> Chọn Ngày Tốt Động Thổ
              </h3>
              <p className="text-xs text-stone-500">
                Xem ngày hoàng đạo, tránh Tam Nương, Sát Chủ, Thụ Tử trong tháng dự kiến khởi sự.
              </p>
            </div>
            <div className="pt-3 text-xs font-bold text-amber-800 flex items-center gap-1 hover:underline">
              Chọn ngày động thổ ngay <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Card>
        </Link>

        <Link href="/van-khan/van-khan-dong-tho-lam-nha" className="block">
          <Card className="border-amber-900/15 hover:border-amber-500/40 hover:shadow-md transition-all p-5 h-full flex flex-col justify-between bg-white">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Chuẩn bị nghi lễ</span>
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-800" /> Văn Khấn Động Thổ Làm Nhà
              </h3>
              <p className="text-xs text-stone-500">
                Toàn văn bài cúng Thổ thần, Long mạch và danh mục sắm lễ mâm cúng khởi công.
              </p>
            </div>
            <div className="pt-3 text-xs font-bold text-amber-800 flex items-center gap-1 hover:underline">
              Xem bài cúng động thổ <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
