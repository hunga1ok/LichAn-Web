import type { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blog';
import { getAllVanKhan } from '@/lib/van-khan';

/**
 * Dynamic sitemap cho Lịch An
 * Sinh URL cho tất cả các trang tĩnh + cẩm nang blog + văn khấn + 365 ngày × 3 năm
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lichan.com';
  const now = new Date();
  const currentYear = now.getFullYear();

  // Trang tĩnh
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/lich-van-nien`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/xem-ngay-tot`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/xem-ngay-tot/cuoi-hoi`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/xem-ngay-tot/khai-truong`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/xem-ngay-tot/dong-tho`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/xem-ngay-tot/xuat-hanh`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/van-khan`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/phong-thuy`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/phong-thuy/xem-tuoi-lam-nha`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/xem-tuoi`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/xem-tuoi/vo-chong`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/xem-tuoi/lam-an`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/xem-tuoi/sinh-con`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/xem-tuoi/xong-dat`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/dong-bo-lich`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dem-nguoc-tet`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/api-docs`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/doi-ngay-am-duong`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tu-vi`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/than-so-hoc`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Sinh URL cho các bài viết blog
  const blogPosts = getAllBlogPosts();
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Sinh URL cho các bài văn khấn
  const vanKhanItems = getAllVanKhan();
  const vanKhanPages: MetadataRoute.Sitemap = vanKhanItems.map((item) => ({
    url: `${baseUrl}/van-khan/${item.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  // Sinh URL cho các tuổi Tử vi hoa giáp
  const { getAllHoaGiapList } = await import('@/lib/tu-vi');
  const hoaGiapItems = getAllHoaGiapList();
  const hoaGiapPages: MetadataRoute.Sitemap = hoaGiapItems.map((item) => ({
    url: `${baseUrl}/tu-vi/${item.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  // Sinh URL cho /xem-ngay/DD-MM-YYYY — 3 năm
  const dayPages: MetadataRoute.Sitemap = [];
  for (const year of [currentYear - 1, currentYear, currentYear + 1]) {
    for (let month = 1; month <= 12; month++) {
      const daysInMonth = new Date(year, month, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const dd = day.toString().padStart(2, '0');
        const mm = month.toString().padStart(2, '0');
        dayPages.push({
          url: `${baseUrl}/xem-ngay/${dd}-${mm}-${year}`,
          lastModified: now,
          changeFrequency: 'yearly',
          priority: 0.5,
        });
      }
    }
  }

  return [...staticPages, ...blogPages, ...vanKhanPages, ...hoaGiapPages, ...dayPages];
}
