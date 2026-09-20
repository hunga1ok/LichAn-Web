'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Ghi log lỗi để theo dõi
    console.error('Unhandled runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full border-amber-900/15 shadow-md overflow-hidden text-center bg-white p-8 space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 border border-red-200 text-red-600 mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <Badge variant="destructive" className="font-semibold">
            ĐÃ XẢY RA LỖI
          </Badge>
          <h2 className="text-xl font-bold text-stone-900">
            Hệ Thống Gặp Sự Cố Bất Ngờ
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Rất tiếc vì sự bất tiện này. Dữ liệu đang được xử lý gặp trục trặc tạm thời. Bạn có thể thử tải lại trang hoặc quay về trang chủ.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            onClick={() => reset()}
            className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold gap-1.5"
          >
            <RotateCcw className="w-4 h-4" /> Thử Lại
          </Button>
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full gap-1.5 border-stone-300">
              <Home className="w-4 h-4 text-stone-600" /> Trang Chủ
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
