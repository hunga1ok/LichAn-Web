'use client';

import { useState } from 'react';
import { TU_VI_12_CON_GIAP, TuViConGiap } from '@/lib/tu-vi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Briefcase, 
  Coins, 
  Heart, 
  Activity, 
  Gift, 
  Users
} from 'lucide-react';

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

export default function TuViPage() {
  const [selectedChi, setSelectedChi] = useState<string>('Tý');
  const data: TuViConGiap = TU_VI_12_CON_GIAP[selectedChi] || TU_VI_12_CON_GIAP['Tý'];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="outline" className="px-3 py-1 text-sm bg-amber-50 border-amber-300 text-[#8B6914]">
          <Sparkles className="w-3.5 h-3.5 mr-1" /> VẬN MỆNH & TỬ VI
        </Badge>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#8B6914]">
          Tử Vi 12 Con Giáp
        </h1>
        <p className="text-stone-600 max-w-2xl mx-auto text-sm md:text-base">
          Tra cứu vận trình sự nghiệp, tài lộc, tình cảm và sức khỏe trọn đời & hàng ngày cho từng con giáp.
        </p>
      </div>

      {/* 12 Con giáp Selector */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
        {CON_GIAP_LIST.map((item) => {
          const isSelected = item.chi === selectedChi;
          return (
            <button
              key={item.chi}
              onClick={() => setSelectedChi(item.chi)}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                isSelected
                  ? 'bg-[#8B6914] text-white border-[#8B6914] shadow-md scale-105'
                  : 'bg-white hover:bg-amber-50/60 border-stone-200 text-stone-800'
              }`}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-xs font-bold leading-tight">{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Fortune Card */}
      <Card className="border-amber-900/15 overflow-hidden shadow-sm">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50/40 border-b border-amber-900/10">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div>
              <CardTitle className="text-2xl text-[#8B6914]">{data.name}</CardTitle>
              <CardDescription className="text-stone-600 mt-1">
                Hành: <strong className="text-stone-800">{data.hanh}</strong> • Mệnh: <strong className="text-stone-800">{data.menh}</strong>
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Quý nhân: {data.quyNhan.join(', ')}</Badge>
              <Badge variant="outline">Số hợp: {data.luckyNumber.join(', ')}</Badge>
            </div>
          </div>
          <p className="text-sm text-stone-700 italic mt-3 pt-3 border-t border-amber-900/5">
            "{data.overview}"
          </p>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* 4 Trụ cột vận trình */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Sự nghiệp */}
            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 space-y-2">
              <div className="flex items-center gap-2 text-blue-900 font-bold">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <span>Công Danh - Sự Nghiệp</span>
              </div>
              <p className="text-sm text-blue-950 leading-relaxed">{data.career}</p>
            </div>

            {/* Tài lộc */}
            <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/40 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold">
                <Coins className="w-5 h-5 text-emerald-600" />
                <span>Tài Vận - Tiền Bạc</span>
              </div>
              <p className="text-sm text-emerald-950 leading-relaxed">{data.wealth}</p>
            </div>

            {/* Tình duyên */}
            <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/40 space-y-2">
              <div className="flex items-center gap-2 text-rose-900 font-bold">
                <Heart className="w-5 h-5 text-rose-600" />
                <span>Tình Cảm - Gia Đạo</span>
              </div>
              <p className="text-sm text-rose-950 leading-relaxed">{data.love}</p>
            </div>

            {/* Sức khỏe */}
            <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/40 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <Activity className="w-5 h-5 text-amber-600" />
                <span>Sức Khỏe - Thể Trạng</span>
              </div>
              <p className="text-sm text-amber-950 leading-relaxed">{data.health}</p>
            </div>
          </div>

          {/* Phong Thủy May Mắn */}
          <div className="rounded-xl p-5 bg-gradient-to-br from-amber-50 to-orange-50/30 border border-amber-200/60">
            <h4 className="font-bold text-amber-950 text-sm mb-3 flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#8B6914]" /> Yếu Tố May Mắn Tăng Cường Năng Lượng
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-stone-500 block text-xs">Con số may mắn:</span>
                <span className="font-bold text-[#8B6914] text-base">{data.luckyNumber.join(' • ')}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-xs">Màu sắc tương sinh:</span>
                <span className="font-bold text-stone-800 text-base">{data.luckyColor.join(', ')}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-xs">Tuổi hợp làm ăn/kết duyên:</span>
                <span className="font-bold text-stone-800 text-base">{data.quyNhan.join(' • ')}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
