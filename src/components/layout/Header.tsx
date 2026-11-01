'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  Calendar, 
  Sparkles, 
  Heart, 
  Compass, 
  BookOpen, 
  Home, 
  Moon, 
  ArrowLeftRight, 
  CalendarCheck, 
  PartyPopper, 
  FileText, 
  Menu,
  X
} from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Đóng mobile menu khi chuyển trang
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  const mainNavLinks = [
    { name: 'Lịch Vạn Niên', href: '/lich-van-nien' },
    { name: 'Xem Ngày Tốt', href: '/xem-ngay-tot' },
    { name: 'Xem Tuổi', href: '/xem-tuoi' },
    { name: 'Xuất Hành', href: '/xuat-hanh' },
    { name: 'Văn Khấn', href: '/van-khan' },
    { name: 'Phong Thủy', href: '/phong-thuy' },
    { name: 'Tử Vi', href: '/tu-vi' },
  ];

  const utilityLinks = [
    { name: 'Đổi Ngày Âm ↔ Dương', href: '/doi-ngay-am-duong', desc: 'Chuyển đổi lịch âm dương dễ dàng', icon: ArrowLeftRight },
    { name: 'Đồng Bộ Lịch Điện Thoại', href: '/dong-bo-lich', desc: 'Nhắc ngày Rằm & Mùng 1 trên iPhone/Android', icon: CalendarCheck },
    { name: 'Đếm Ngược Tết', href: '/dem-nguoc-tet', desc: 'Đồng hồ đếm ngược đến Giao Thừa', icon: PartyPopper },
    { name: 'Thần Số Học Pythagoras', href: '/than-so-hoc', desc: 'Khám phá số chủ đạo & vận mệnh', icon: Sparkles },
    { name: 'Cẩm Nang Văn Hóa', href: '/blog', desc: 'Phong tục tập quán cổ truyền', icon: FileText },
  ];

  const isUtilityActive = utilityLinks.some(link => pathname.startsWith(link.href));

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className={`sticky top-0 z-50 bg-background/95 backdrop-blur-md transition-shadow duration-200 border-b border-outline ${isScrolled ? 'shadow-sm' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon.svg" alt="" width={36} height={36} className="w-9 h-9 rounded-xl group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-primary leading-none">
                Lịch An
              </span>
              <span className="text-[11px] text-muted font-medium mt-0.5">
                Lịch âm cho cả gia đình
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
            {mainNavLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg transition-colors duration-150 ${
                    active
                      ? 'text-primary bg-primary-container font-semibold'
                      : 'text-muted hover:text-primary hover:bg-surface-variant'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Dropdown Tiện Ích */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                aria-label="Mở menu tiện ích tra cứu"
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors duration-150 cursor-pointer ${
                  isUtilityActive || isDropdownOpen
                    ? 'text-primary bg-primary-container font-semibold'
                    : 'text-muted hover:text-primary hover:bg-surface-variant'
                }`}
              >
                <span>Tiện Ích</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu Box */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-surface rounded-2xl shadow-xl border border-outline p-2 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                  <div className="text-xs font-semibold text-muted px-3 py-1.5">
                    Công cụ tra cứu
                  </div>
                  <div className="space-y-1">
                    {utilityLinks.map((item) => {
                      const Icon = item.icon;
                      const active = pathname.startsWith(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsDropdownOpen(false)}
                          className={`flex items-start gap-2.5 p-2.5 rounded-xl transition-colors ${
                            active
                              ? 'bg-primary-container text-primary'
                              : 'hover:bg-surface-variant text-on-surface'
                          }`}
                        >
                          <div className="p-1.5 rounded-lg bg-primary-container text-primary shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold leading-tight">{item.name}</div>
                            <div className="text-xs text-muted leading-normal mt-0.5">{item.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-on-surface hover:text-primary rounded-lg transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer & Backdrop */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 top-16 bg-black/40 backdrop-blur-xs z-40 lg:hidden animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile Drawer Panel */}
          <nav
            role="dialog"
            aria-label="Menu điều hướng di động"
            className="fixed inset-x-0 top-16 max-h-[calc(100vh-4rem)] overflow-y-auto bg-surface border-b border-outline shadow-2xl p-5 z-50 lg:hidden space-y-6 animate-in slide-in-from-top duration-200"
          >
            {/* Nhóm mục chính */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-muted px-3 pb-1">
                Chuyên mục chính
              </div>
              <Link
                href="/"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm ${
                  pathname === '/' ? 'bg-primary-container text-primary font-semibold' : 'text-on-surface hover:bg-surface-variant'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="w-4 h-4 text-primary" /> Trang Chủ Lịch An
              </Link>
              {mainNavLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      active
                        ? 'bg-primary-container text-primary font-semibold'
                        : 'text-on-surface hover:bg-surface-variant'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Nhóm tiện ích mở rộng */}
            <div className="space-y-1 pt-4 border-t border-outline">
              <div className="text-xs font-semibold text-muted px-3 pb-1">
                Tiện ích & tra cứu
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {utilityLinks.map((item) => {
                  const Icon = item.icon;
                  const active = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold ${
                        active
                          ? 'bg-primary-container text-primary font-semibold'
                          : 'text-on-surface hover:bg-surface-variant'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4 text-primary" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
