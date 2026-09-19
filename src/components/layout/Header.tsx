'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Lịch Vạn Niên', href: '/lich-van-nien' },
    { name: 'Xem Ngày Tốt', href: '/xem-ngay-tot' },
    { name: 'Xem Tuổi', href: '/xem-tuoi' },
    { name: 'Văn Khấn', href: '/van-khan' },
    { name: 'Phong Thủy', href: '/phong-thuy' },
    { name: 'Tử Vi', href: '/tu-vi' },
    { name: 'Đồng Bộ Lịch', href: '/dong-bo-lich' },
  ];

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">Lịch An</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-600 hover:text-primary font-medium">
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white border-t p-4 flex flex-col gap-4 shadow-lg absolute w-full left-0">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="text-gray-600 hover:text-primary font-medium block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
