import type { MetadataRoute } from 'next';

/**
 * Dynamic sitemap cho Lịch An
 * Sinh URL cho tất cả các trang tĩnh + 365 ngày × 2 năm
 */
export default function sitemap(): MetadataRoute.Sitemap {
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
  ];

  // Sinh URL cho /xem-ngay/DD-MM-YYYY — 2 năm
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

  return [...staticPages, ...dayPages];
}
