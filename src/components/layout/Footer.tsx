import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-hero text-on-hero py-8 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-gold mb-4">Lịch An</h3>
          <p className="text-on-hero/75">Tra cứu Lịch Âm Dương Việt Nam, xem ngày tốt xấu, đổi ngày âm dương dễ dàng.</p>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4">Liên kết</h4>
          <ul className="space-y-2 text-on-hero/75">
            <li><Link href="/" className="hover:text-gold">Trang chủ</Link></li>
            <li><Link href="/lich-van-nien" className="hover:text-gold">Lịch Vạn Niên</Link></li>
            <li><Link href="/xem-ngay-tot" className="hover:text-gold">Xem Ngày Tốt</Link></li>
            <li><Link href="/xuat-hanh" className="hover:text-gold">Hướng Xuất Hành</Link></li>
            <li><Link href="/xem-tuoi" className="hover:text-gold">Xem Tuổi Cổ Truyền</Link></li>
            <li><Link href="/van-khan" className="hover:text-gold">Kho Văn Khấn</Link></li>
            <li><Link href="/phong-thuy" className="hover:text-gold">Phong Thủy</Link></li>
            <li><Link href="/tu-vi" className="hover:text-gold">Tử Vi Cá Nhân Hóa</Link></li>
            <li><Link href="/than-so-hoc" className="hover:text-gold">Thần Số Học</Link></li>
            <li><Link href="/dong-bo-lich" className="hover:text-gold">Đồng Bộ Lịch (.ICS)</Link></li>
            <li><Link href="/dem-nguoc-tet" className="hover:text-gold">Đếm Ngược Tết</Link></li>
            <li><Link href="/blog" className="hover:text-gold">Cẩm Nang Văn Hóa</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4">Liên hệ</h4>
          <p className="text-on-hero/75">Email: contact@lichan.com</p>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-4 border-t border-white/10 text-center text-on-hero/60">
        <p>&copy; 2026 Lịch An. All rights reserved.</p>
      </div>
    </footer>
  );
}
