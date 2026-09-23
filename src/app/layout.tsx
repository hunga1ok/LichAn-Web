import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://lichan.com'),
  title: {
    default: 'Lịch An - Lịch Âm Dương Việt Nam & Phong Thủy Cổ Truyền',
    template: '%s | Lịch An',
  },
  description: 'Tra cứu Lịch Âm Dương Việt Nam dựa trên thuật toán thiên văn học Hồ Ngọc Đức. Xem ngày tốt xấu, giờ hoàng đạo, lịch vạn niên, đổi ngày âm dương và tử vi phong thủy.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  keywords: [
    'lịch an',
    'lịch âm',
    'lịch âm dương',
    'lịch vạn niên',
    'xem ngày tốt',
    'đổi ngày âm dương',
    'tử vi',
    'văn khấn',
    'phong thủy',
  ],
  authors: [{ name: 'Lịch An', url: 'https://lichan.com' }],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://lichan.com',
    siteName: 'Lịch An',
    title: 'Lịch An - Lịch Âm Dương Việt Nam & Phong Thủy Cổ Truyền',
    description: 'Tra cứu Lịch Âm Dương Việt Nam chuẩn thiên văn. Xem ngày tốt hoàng đạo, lịch vạn niên và tử vi cá nhân hóa.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lịch An - Lịch Âm Dương Việt Nam',
    description: 'Tra cứu Lịch Âm Dương Việt Nam chuẩn thiên văn.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Lịch An",
    "url": "https://lichan.com",
    "publisher": {
      "@type": "Organization",
      "name": "Lịch An"
    }
  };

  return (
    <html lang="vi">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-background-alt`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
