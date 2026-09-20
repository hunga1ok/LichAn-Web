'use client';

import { useEffect } from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Fatal Root Layout Error:', error);
  }, [error]);

  return (
    <html lang="vi">
      <body className="bg-[#FEF7E6] text-[#333333] font-sans antialiased min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-amber-900/15 shadow-xl p-8 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-100 border border-red-200 text-red-600 mx-auto">
            <AlertOctagon className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
              SỰ CỐ TOÀN CỤC
            </span>
            <h1 className="text-xl font-bold text-stone-900">
              Lỗi Khởi Động Hệ Thống
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Trang web gặp sự cố nghiêm trọng ở tầng khởi tạo ứng dụng. Xin vui lòng thử nạp lại trang.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => reset()}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B6914] hover:bg-[#725510] text-white font-semibold transition-colors shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Tải Lại Trang
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
