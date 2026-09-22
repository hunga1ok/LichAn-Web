import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/api-docs/'],
    },
    sitemap: 'https://lichan.com/sitemap.xml',
  };
}
