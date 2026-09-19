import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-primary-light mb-4">Lịch An</h3>
          <p className="text-gray-400">Tra cứu Lịch Âm Dương Việt Nam chính xác, xem ngày tốt xấu, đổi ngày âm dương dễ dàng.</p>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4">Liên kết</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/" className="hover:text-primary-light">Trang chủ</Link></li>
            <li><Link href="/lich-van-nien" className="hover:text-primary-light">Lịch Vạn Niên</Link></li>
            <li><Link href="/doi-ngay-am-duong" className="hover:text-primary-light">Đổi Ngày</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4">Liên hệ</h4>
          <p className="text-gray-400">Email: contact@lichan.com</p>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-4 border-t border-gray-800 text-center text-gray-500">
        <p>&copy; 2026 Lịch An. All rights reserved.</p>
      </div>
    </footer>
  );
}
