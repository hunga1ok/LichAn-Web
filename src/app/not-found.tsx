import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Compass, 
  Home, 
  Calendar, 
  Sparkles, 
  ArrowLeftRight, 
  BookOpen 
} from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <Card className="max-w-xl w-full border-amber-900/15 shadow-md overflow-hidden text-center bg-white">
        <div className="p-8 sm:p-10 space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-50 border border-amber-200 text-primary mx-auto shadow-inner">
            <Compass className="w-10 h-10 animate-spin-slow" />
          </div>

          <div className="space-y-2">
            <Badge variant="outline" className="px-3 py-1 bg-amber-50 text-primary border-amber-300 font-bold">
              MÃ LỖI 404
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
              Không Tìm Thấy Trang
            </h1>
            <p className="text-stone-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Trang hoặc liên kết bạn đang tìm kiếm có thể đã được thay đổi địa chỉ, chuyển dời hoặc không tồn tại trên hệ thống Lịch An.
            </p>
          </div>

          <div className="pt-2 border-t border-stone-100">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
              Bạn có thể khám phá các chuyên mục chính:
            </p>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <Link href="/">
                <Button variant="outline" className="w-full justify-start gap-2 h-10 text-stone-700 bg-stone-50 hover:bg-amber-50">
                  <Home className="w-4 h-4 text-primary" /> Trang Chủ
                </Button>
              </Link>
              <Link href="/lich-van-nien">
                <Button variant="outline" className="w-full justify-start gap-2 h-10 text-stone-700 bg-stone-50 hover:bg-amber-50">
                  <Calendar className="w-4 h-4 text-primary" /> Lịch Vạn Niên
                </Button>
              </Link>
              <Link href="/xem-ngay-tot">
                <Button variant="outline" className="w-full justify-start gap-2 h-10 text-stone-700 bg-stone-50 hover:bg-amber-50">
                  <Sparkles className="w-4 h-4 text-primary" /> Xem Ngày Tốt
                </Button>
              </Link>
              <Link href="/doi-ngay-am-duong">
                <Button variant="outline" className="w-full justify-start gap-2 h-10 text-stone-700 bg-stone-50 hover:bg-amber-50">
                  <ArrowLeftRight className="w-4 h-4 text-primary" /> Đổi Ngày Âm Dương
                </Button>
              </Link>
            </div>
          </div>

          <div className="pt-2">
            <Link href="/">
              <Button className="w-full bg-primary hover:bg-primary-dark text-white font-bold h-11">
                Về Trang Chủ Lịch An
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
