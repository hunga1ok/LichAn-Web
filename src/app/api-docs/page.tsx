import { Metadata } from 'next';
import ApiDocsClient from './ApiDocsClient';
import { Badge } from '@/components/ui/badge';
import { Terminal, Cpu } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Lịch An REST API Documentation v1 — Kết Nối Ứng Dụng Di Động & Bên Thứ Ba',
  description:
    'Tài liệu kỹ thuật REST API Lịch An v1. Cung cấp API Lịch Âm Dương Hồ Ngọc Đức, Xem Ngày Tốt, Văn Khấn Cổ Truyền và Phong Thủy làm nhà cho Mobile App (Flutter, React Native, iOS, Android).',
  keywords: ['api lich am', 'rest api lich am', 'lunar calendar api', 'api van khan', 'api phong thuy', 'lich an api'],
  openGraph: {
    title: 'Lịch An REST API v1 Documentation',
    description: 'Nền tảng API Lịch Âm Dương và Phong Thủy chính tông dành cho nhà phát triển ứng dụng di động.',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ApiDocsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto pt-2">
        <Badge variant="outline" className="px-3.5 py-1 text-sm bg-amber-50 border-amber-300 text-primary">
          <Terminal className="w-3.5 h-3.5 mr-1.5 inline" /> DEVELOPER PORTAL & API V1
        </Badge>
        <h1 className="text-3xl md:text-5xl font-black text-primary tracking-tight">
          Lịch An REST API Documentation
        </h1>
        <p className="text-stone-600 md:text-lg leading-relaxed">
          Đóng gói toàn bộ thuật toán thiên văn và kinh điển phong thủy thành RESTful API chuẩn hóa. 
          Sẵn sàng tích hợp cho ứng dụng di động Flutter, React Native, Swift và Kotlin.
        </p>
      </div>

      <ApiDocsClient />
    </div>
  );
}
