'use client';

import { useState } from 'react';
import Link from 'next/link';
import { VanKhanItem } from '@/types/van-khan';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Copy, 
  Check, 
  Printer, 
  Type, 
  Clock, 
  CheckSquare, 
  Square, 
  AlertCircle, 
  ArrowLeft,
  Share2,
  Bookmark
} from 'lucide-react';

interface Props {
  item: VanKhanItem;
}

export default function VanKhanReader({ item }: Props) {
  const [fontSize, setFontSize] = useState<'base' | 'lg' | 'xl'>('lg');
  const [copied, setCopied] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.baiVanKhan);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Không thể sao chép:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleCheck = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getTextClass = () => {
    switch (fontSize) {
      case 'base':
        return 'text-base leading-relaxed';
      case 'lg':
        return 'text-lg leading-loose';
      case 'xl':
        return 'text-xl md:text-2xl leading-loose';
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-900/10 pb-4 print:hidden">
        <Link 
          href="/van-khan" 
          className="text-xs font-semibold text-stone-500 hover:text-amber-800 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Về Kho Văn Khấn
        </Link>

        {/* Toolbar: Font Size, Copy, Print */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Font Size Adjuster */}
          <div className="flex items-center bg-stone-100 rounded-lg p-1 border border-stone-200 text-xs">
            <span className="px-2 text-stone-500 font-medium">Chữ:</span>
            <button
              onClick={() => setFontSize('base')}
              className={`px-2.5 py-1 rounded cursor-pointer font-bold ${
                fontSize === 'base' ? 'bg-white text-amber-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Cỡ chữ tiêu chuẩn"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-2.5 py-1 rounded cursor-pointer font-bold ${
                fontSize === 'lg' ? 'bg-white text-amber-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Cỡ chữ vừa"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xl')}
              className={`px-2.5 py-1 rounded cursor-pointer font-bold text-sm ${
                fontSize === 'xl' ? 'bg-white text-amber-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Cỡ chữ lớn (dễ đọc khi khấn)"
            >
              A++
            </button>
          </div>

          {/* Copy Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="border-amber-900/20 text-stone-700 hover:bg-amber-50 cursor-pointer gap-1.5 text-xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Đã sao chép</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Sao chép bài khấn</span>
              </>
            )}
          </Button>

          {/* Print Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="border-amber-900/20 text-stone-700 hover:bg-amber-50 cursor-pointer gap-1.5 text-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>In bài cúng</span>
          </Button>
        </div>
      </div>

      {/* Header Info */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-0.5 text-xs bg-amber-50 border-amber-300 text-[#8B6914]">
            {item.categoryName}
          </Badge>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#8B6914] tracking-tight">
          {item.title}
        </h1>

        <p className="text-stone-600 text-sm md:text-base leading-relaxed">
          {item.shortDesc}
        </p>

        {/* Quick info boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-900/10 text-xs text-stone-700 space-y-1">
            <span className="font-bold text-amber-950 block">Đối tượng cúng tế:</span>
            <span>{item.target}</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-900/10 text-xs text-stone-700 space-y-1">
            <span className="font-bold text-amber-950 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-800" /> Thời điểm hành lễ:
            </span>
            <span>{item.timeRecommended}</span>
          </div>
        </div>
      </div>

      {/* Sắm lễ Checklist Card */}
      <Card className="border-amber-900/15 shadow-xs overflow-hidden print:border-none print:shadow-none">
        <CardHeader className="bg-stone-50/70 border-b border-stone-200/70 py-3.5 px-5">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold text-amber-950 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-amber-800" />
              Sắm sửa lễ vật mâm cúng (Checklist chuẩn bị)
            </CardTitle>
            <span className="text-xs text-stone-500 font-normal hidden sm:inline">
              Tích chọn từng món khi chuẩn bị
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {item.samLe.map((le, idx) => {
              const isChecked = !!checkedItems[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900 line-through opacity-75'
                      : 'bg-white border-stone-200 hover:border-amber-400 text-stone-800'
                  }`}
                >
                  <div className="mt-0.5 shrink-0 text-amber-800">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Square className="w-4 h-4 text-stone-400" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm font-medium">{le}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Prayer Text Frame */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-amber-950 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-800" />
            Nội dung bài văn khấn chuẩn cổ truyền
          </h2>
          <span className="text-xs text-stone-400 italic">
            Gia chủ thắp nén tâm hương, đứng trang nghiêm cung kính đọc
          </span>
        </div>

        <div className="rounded-2xl bg-[#FEF7E6] border-2 border-amber-900/20 p-6 sm:p-8 md:p-10 shadow-sm relative print:bg-white print:border-stone-400">
          <div className={`font-serif text-stone-900 whitespace-pre-line ${getTextClass()}`}>
            {item.baiVanKhan}
          </div>
        </div>
      </div>

      {/* Lưu Ý Khi Hành Lễ */}
      <Card className="border-amber-900/15 bg-stone-50/50 print:border-none">
        <CardHeader className="py-3.5 px-5 border-b border-stone-200/60">
          <CardTitle className="text-sm font-bold text-amber-950 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-800" />
            Lưu ý quan trọng & Nghi thức tâm linh
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <ul className="text-xs sm:text-sm text-stone-700 space-y-2 pl-4 list-disc">
            {item.luuY.map((ly, idx) => (
              <li key={idx} className="leading-relaxed">{ly}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Tags */}
      <div className="flex items-center gap-2 flex-wrap pt-2 print:hidden">
        <span className="text-xs text-stone-400">Từ khóa liên quan:</span>
        {item.tags.map((tag, idx) => (
          <span 
            key={idx}
            className="px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-stone-600 text-xs font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
