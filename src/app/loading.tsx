import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-4">
      <div className="flex flex-col items-center space-y-4">
        {/* Animated Brand Loader */}
        <div className="relative flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border-4 border-amber-900/10 border-t-primary animate-spin" />
          <Loader2 className="w-6 h-6 text-primary absolute animate-pulse" />
        </div>

        {/* Text */}
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-stone-800 tracking-wide">
            Đang tải dữ liệu...
          </p>
          <p className="text-xs text-stone-500">
            Lịch Vạn Niên & Phong Thủy Lịch An
          </p>
        </div>
      </div>
    </div>
  );
}
