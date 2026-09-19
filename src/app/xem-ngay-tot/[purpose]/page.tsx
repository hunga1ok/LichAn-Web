import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AuspiciousClientView from './AuspiciousClientView';
import { AuspiciousPurpose } from '@/types/lunar';

interface PageProps {
  params: Promise<{
    purpose: string;
  }>;
}

const PURPOSE_CONFIG: Record<
  string,
  {
    purpose: AuspiciousPurpose;
    title: string;
    description: string;
    badgeText: string;
    seoTitle: string;
    seoDesc: string;
    guideTitle: string;
    guideContent: { heading: string; text: string }[];
  }
> = {
  'cuoi-hoi': {
    purpose: 'cuoi-hoi',
    title: 'Xem Ngày Tốt Cưới Hỏi & Hôn Thú',
    description:
      'Tra cứu ngày lành tháng tốt tổ chức đám cưới, ăn hỏi, đính hôn, rước dâu. Căn cứ bảng Âm Dương Bất Tương, Trực Định, Trực Thành; loại bỏ triệt để Tam Nương, Nguyệt Kỵ, Cô Thần, Quả Tú.',
    badgeText: 'Hôn Nhân Viên Mãn',
    seoTitle: 'Xem Ngày Tốt Cưới Hỏi - Chọn Ngày Lành Kết Hôn, Ăn Hỏi Chuẩn Nhất | Lịch An',
    seoDesc:
      'Tra cứu ngày tốt cưới hỏi, ăn hỏi, đính hôn theo Hiệp Kỷ Biện Phương Thư. Chọn ngày Âm Dương Bất Tương, sao Thiên Hỷ, tránh Tam Nương, Nguyệt Kỵ, Sát Chủ.',
    guideTitle: 'Kinh nghiệm chọn ngày cưới hỏi theo Hiệp Kỷ Biện Phương Thư',
    guideContent: [
      {
        heading: '1. Ưu tiên hàng đầu: Ngày Âm Dương Bất Tương',
        text: 'Cổ nhân coi ngày Bất Tương là "thần hộ mệnh" của hôn sự. Khi Âm Dương không tương khắc, khí trời đất giao hòa, vợ chồng ăn ở bền chặt, gia đạo hòa thuận, con cái đề huề.',
      },
      {
        heading: '2. Chọn Trực Thành, Trực Định, Trực Mãn',
        text: 'Trực Thành mang ý nghĩa thành tựu, viên mãn; Trực Định biểu trưng cho sự gắn kết lâu bền; Trực Mãn đem lại sự no đủ, sum vầy. Tránh các ngày Trực Phá, Trực Bế.',
      },
      {
        heading: '3. Tuyệt đối tránh các ngày đại hung',
        text: 'Tuyệt đối không cử hành cưới hỏi vào ngày Tam Nương (3, 7, 13, 18, 22, 27 âm), Nguyệt Kỵ (5, 14, 23 âm), Sát Chủ, Thụ Tử, hoặc ngày phạm các sao sát tình duyên như Cô Thần, Quả Tú, Ly Sàng.',
      },
    ],
  },
  'khai-truong': {
    purpose: 'khai-truong',
    title: 'Xem Ngày Tốt Khai Trương & Mở Cửa Hàng',
    description:
      'Chọn ngày lành khai trương công ty, mở tiệm kinh doanh, khai xuân buôn bán. Kích hoạt sao Thiên Tài, Lộc Mã, Trực Khai mang lại vận may buôn may bán đắt.',
    badgeText: 'Kinh Doanh Đại Phát',
    seoTitle: 'Xem Ngày Tốt Khai Trương - Chọn Ngày Mở Hàng, Thành Lập Công Ty | Lịch An',
    seoDesc:
      'Chọn ngày khai trương, mở cửa hàng đón tài lộc chuẩn phong thủy. Ưu tiên Trực Khai, sao Thiên Tài, Địa Tài, Lộc Mã, tránh sao Đại Hao, Tiểu Hao.',
    guideTitle: 'Bí quyết trạch cát khai trương, mở hàng phát tài',
    guideContent: [
      {
        heading: '1. Nghênh đón Trực Khai, Mãn, Thành',
        text: 'Trực Khai mang khí thế khai thông thịnh vượng, mở ra cơ hội kinh doanh vô tận. Trực Mãn mang ý nghĩa tiền của đầy ắp, khách hàng tấp nập.',
      },
      {
        heading: '2. Sao Thiên Tài, Lộc Mã trợ vận',
        text: 'Cần chọn ngày có cát tinh chủ về tiền tài như Thiên Tài, Nguyệt Tài, Lộc Mã, Địa Tài để kích hoạt nguồn doanh thu và công việc suôn sẻ.',
      },
      {
        heading: '3. Kiêng kỵ ngày Nguyệt Phá và sao Hao Tán',
        text: 'Tránh ngày Nguyệt Phá (xung chi tháng) và các ngày phạm sao Đại Hao, Tiểu Hao, Kiếp Sát để phòng ngừa thất thoát vốn liếng, rủi ro pháp lý.',
      },
    ],
  },
  'dong-tho': {
    purpose: 'dong-tho',
    title: 'Xem Ngày Tốt Động Thổ & Làm Nhà',
    description:
      'Tra cứu ngày tốt khởi công đào móng, đặt đá, cất nóc, xây cất công trình. Hợp Trực Kiến, Trực Định; đón sao Sinh Khí, Thiên Phúc; kiêng kỵ Thổ Phủ, Địa Phá.',
    badgeText: 'Gia Đạo Hưng Vượng',
    seoTitle: 'Xem Ngày Tốt Động Thổ - Chọn Ngày Khởi Công Xây Nhà, Cất Nóc | Lịch An',
    seoDesc:
      'Tra cứu ngày tốt động thổ, đào móng, đổ trần chuẩn Ngọc Hạp Thông Thư. Chọn ngày có sao Sinh Khí, Thiên Đức, tránh ngày Sát Chủ, Thụ Tử, Thổ Cấm.',
    guideTitle: 'Quy tắc phong thủy động thổ làm nhà an cư lạc nghiệp',
    guideContent: [
      {
        heading: '1. Nền móng vững chãi cùng Trực Kiến, Định, Bình',
        text: 'Động thổ liên quan đến phần âm phần thổ, nên chọn các ngày Trực Kiến (khởi tạo bền vững), Trực Định (an định lâu dài), hoặc Trực Bình (bình yên thịnh vượng).',
      },
      {
        heading: '2. Đón vượng khí sao Sinh Khí, Thiên Đức',
        text: 'Sao Sinh Khí là cát tinh mạnh nhất cho sự sống và phát triển, giúp công trình thi công an toàn, gia chủ sau khi ở luôn mạnh khỏe, tài lộc dồi dào.',
      },
      {
        heading: '3. Tránh xâm phạm Thổ Thần',
        text: 'Đặc biệt kiêng cữ các ngày phạm sao Thổ Phủ, Thổ Cấm, Địa Phá, Vãng Vong vì dễ gây tai nạn lao động hoặc xáo trộn trường khí đất đai.',
      },
    ],
  },
  'xuat-hanh': {
    purpose: 'xuat-hanh',
    title: 'Xem Ngày Tốt Xuất Hành & Đi Xa',
    description:
      'Tra cứu hướng xuất hành nghênh đón Hỷ Thần, Tài Thần và bảng 6 khung giờ Lý Thuần Phong (Đại An, Tốc Hỷ, Tiểu Cát) giúp chuyến đi thuận buồm xuôi gió.',
    badgeText: 'Thượng Lộ Bình An',
    seoTitle: 'Xem Ngày Tốt Xuất Hành - Hướng Hỷ Thần, Tài Thần & Giờ Lý Thuần Phong | Lịch An',
    seoDesc:
      'Tra cứu ngày tốt xuất hành, phương vị đón Hỷ Thần, Tài Thần và 6 giờ Lý Thuần Phong chính xác nhất. Giúp đi xa công tác, du lịch may mắn thuận buồm xuôi gió.',
    guideTitle: 'Cách tra cứu phương vị và giờ xuất hành Lý Thuần Phong',
    guideContent: [
      {
        heading: '1. Nghênh tiếp Hỷ Thần & Tài Thần',
        text: 'Khi bước ra khỏi nhà lúc bắt đầu chuyến đi, hướng đi đầu tiên nên hướng về phương vị của Hỷ Thần (cầu may mắn, nhân duyên) hoặc Tài Thần (cầu tiền tài, làm ăn).',
      },
      {
        heading: '2. Chọn 3 giờ cát Lý Thuần Phong',
        text: 'Giờ Đại An (mọi việc bình yên), Tốc Hỷ (tin vui đến mau chóng), và Tiểu Cát (buôn bán có lời, vạn sự thuận lợi) là 3 khung giờ vàng để xuất phát.',
      },
      {
        heading: '3. Hạn chế giờ Xích Khẩu và Không Vong',
        text: 'Giờ Xích Khẩu dễ xảy ra tranh cãi, chậm trễ chuyến đi; giờ Không Vong cầu tài khó thành. Nên chủ động lùi hoặc tiến giờ khởi hành để tránh 2 giờ này.',
      },
    ],
  },
};

export async function generateStaticParams() {
  return [
    { purpose: 'cuoi-hoi' },
    { purpose: 'khai-truong' },
    { purpose: 'dong-tho' },
    { purpose: 'xuat-hanh' },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { purpose } = await params;
  const config = PURPOSE_CONFIG[purpose];
  if (!config) return {};

  return {
    title: config.seoTitle,
    description: config.seoDesc,
    keywords: [
      config.title.toLowerCase(),
      `ngày tốt ${purpose.replace('-', ' ')}`,
      'xem ngày tốt',
      'lịch âm dương',
      'lịch an',
    ],
    openGraph: {
      title: config.seoTitle,
      description: config.seoDesc,
      type: 'website',
    },
  };
}

export default async function AuspiciousDetailPage({ params }: PageProps) {
  const { purpose } = await params;
  const config = PURPOSE_CONFIG[purpose];

  if (!config) {
    notFound();
  }

  const jsonLd = {
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
        name: 'Xem Ngày Tốt',
        item: 'https://lichan.com/xem-ngay-tot',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: config.title,
        item: `https://lichan.com/xem-ngay-tot/${purpose}`,
      },
    ],
  };

  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <AuspiciousClientView
        purpose={config.purpose}
        purposeTitle={config.title}
        purposeDescription={config.description}
        badgeText={config.badgeText}
      />

      {/* Cẩm nang hướng dẫn chuyên sâu */}
      <div className="rounded-2xl bg-white border border-amber-900/15 p-6 md:p-8 space-y-6 shadow-sm">
        <h2 className="text-xl md:text-2xl font-bold text-[#8B6914] border-b border-amber-900/10 pb-3">
          {config.guideTitle}
        </h2>
        <div className="space-y-4">
          {config.guideContent.map((item, index) => (
            <div key={index} className="space-y-1.5">
              <h3 className="text-sm md:text-base font-bold text-amber-950">
                {item.heading}
              </h3>
              <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
