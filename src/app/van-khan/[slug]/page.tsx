import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import VanKhanReader from './VanKhanReader';
import { getAllVanKhan, getVanKhanBySlug } from '@/lib/van-khan';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const items = getAllVanKhan();
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getVanKhanBySlug(slug);
  if (!item) return {};

  return {
    title: `${item.title} Chuẩn Nhất | Lịch An`,
    description: `${item.shortDesc} Hướng dẫn chuẩn bị sắm lễ chu đáo và toàn văn bài khấn phong tục cổ truyền Việt Nam.`,
    keywords: [
      item.title.toLowerCase(),
      ...item.tags.map((t) => t.toLowerCase()),
      'văn khấn cổ truyền',
      'văn khấn',
      'lịch an',
    ],
    openGraph: {
      title: `${item.title} | Lịch An`,
      description: item.shortDesc,
      type: 'article',
    },
  };
}

export default async function VanKhanDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getVanKhanBySlug(slug);

  if (!item) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.title,
    description: item.shortDesc,
    author: {
      '@type': 'Organization',
      name: 'Lịch An',
      url: 'https://lichan.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lịch An',
      url: 'https://lichan.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://lichan.com/van-khan/${item.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Trang chủ',
        item: 'https://lichan.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Văn Khấn',
        item: 'https://lichan.com/van-khan',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: item.title,
        item: `https://lichan.com/van-khan/${item.slug}`,
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <VanKhanReader item={item} />
    </div>
  );
}
