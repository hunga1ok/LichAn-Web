'use client';

import { useState } from 'react';
import { calculateLifePathNumber, NUMEROLOGY_DATA } from '@/lib/than-so-hoc';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Compass, 
  GraduationCap 
} from 'lucide-react';

export default function ThanSoHocPage() {
  const [day, setDay] = useState<number>(19);
  const [month, setMonth] = useState<number>(9);
  const [year, setYear] = useState<number>(1995);
  const [hasCalculated, setHasCalculated] = useState<boolean>(true);

  const lifePath = calculateLifePathNumber(day, month, year);
  const data = NUMEROLOGY_DATA[lifePath] || NUMEROLOGY_DATA[lifePath === 4 ? 4 : 2];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setHasCalculated(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="outline" className="px-3 py-1 text-sm bg-amber-50 border-amber-300 text-[#8B6914]">
          <Sparkles className="w-3.5 h-3.5 mr-1" /> KHÁM PHÁ BẢN THÂN
        </Badge>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#8B6914]">
          Tra Cứu Thần Số Học Pythagoras
        </h1>
        <p className="text-stone-600 max-w-xl mx-auto text-sm md:text-base">
          Nhập ngày tháng năm sinh dương lịch để khám phá Số Chủ Đạo, điểm mạnh, bài học thử thách và định hướng nghề nghiệp lý tưởng.
        </p>
      </div>

      {/* Input Form Card */}
      <Card className="border-amber-900/15 shadow-sm">
        <CardHeader className="bg-amber-50/50 border-b border-amber-900/10 pb-4">
          <CardTitle className="text-lg text-amber-950 flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#8B6914]" /> Nhập Ngày Sinh Dương Lịch
          </CardTitle>
          <CardDescription>
            Định dạng theo giấy khai sinh chuẩn để tính toán chính xác nhất
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleCalculate} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1.5">Ngày sinh</label>
              <select
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                className="w-full h-10 px-3 rounded-lg border border-stone-300 bg-white text-sm focus:ring-2 focus:ring-[#8B6914] focus:outline-none"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>Ngày {d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1.5">Tháng sinh</label>
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="w-full h-10 px-3 rounded-lg border border-stone-300 bg-white text-sm focus:ring-2 focus:ring-[#8B6914] focus:outline-none"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>Tháng {m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1.5">Năm sinh</label>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full h-10 px-3 rounded-lg border border-stone-300 bg-white text-sm focus:ring-2 focus:ring-[#8B6914] focus:outline-none"
              >
                {Array.from({ length: 100 }, (_, i) => 2026 - i).map((y) => (
                  <option key={y} value={y}>Năm {y}</option>
                ))}
              </select>
            </div>

            <Button type="submit" className="w-full h-10 gap-1.5">
              <Search className="w-4 h-4" /> Tra Cứu Ngay
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Result Card */}
      {hasCalculated && data && (
        <Card className="border-2 border-[#D4A017]/40 shadow-md overflow-hidden animate-in fade-in-50 duration-300">
          <CardHeader className="bg-gradient-to-r from-amber-100/70 via-orange-50/50 to-amber-50 border-b border-amber-900/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <Badge className="bg-[#8B6914] text-white text-xs mb-2">CON SỐ CHỦ ĐẠO</Badge>
                <CardTitle className="text-2xl sm:text-3xl text-amber-950 font-black">
                  Số Chủ Đạo {lifePath}
                </CardTitle>
                <p className="text-base font-semibold text-[#8B6914] mt-1">{data.title}</p>
              </div>
              <div className="w-20 h-20 rounded-2xl bg-[#8B6914] text-white flex items-center justify-center text-4xl font-black shadow-inner self-center sm:self-auto shrink-0">
                {lifePath}
              </div>
            </div>
            <p className="text-sm text-stone-700 leading-relaxed mt-4 pt-3 border-t border-amber-900/10">
              {data.description}
            </p>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            {/* Điểm mạnh & Thách thức */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Điểm mạnh */}
              <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2.5">
                <h4 className="font-bold text-emerald-900 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Điểm Mạnh Tiềm Năng
                </h4>
                <ul className="space-y-1.5 text-sm text-emerald-950">
                  {data.strengths.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Thách thức */}
              <div className="p-5 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2.5">
                <h4 className="font-bold text-amber-900 text-sm flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" /> Bài Học Cần Vượt Qua
                </h4>
                <ul className="space-y-1.5 text-sm text-amber-950">
                  {data.challenges.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Định hướng nghề nghiệp */}
            <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2.5">
              <h4 className="font-bold text-blue-900 text-sm flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-blue-600" /> Ngành Nghề Phù Hợp
              </h4>
              <div className="flex flex-wrap gap-2 pt-1">
                {data.careers.map((career, idx) => (
                  <Badge key={idx} variant="outline" className="bg-white border-blue-300 text-blue-900 text-xs py-1 px-2.5">
                    💼 {career}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
