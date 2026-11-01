import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Info, Quote as QuoteIcon } from 'lucide-react';
import { getDayInfo, getXuatHanhInfo, getDayVerdict, moonPhaseOf, VERDICT_TEXT } from '@/lib/lunar';
import { getDailyQuote } from '@/lib/daily-quote';
import { addDays, dayUrl } from '@/lib/vn-date';
import MoonPhase from '@/components/lich/MoonPhase';
import { DetailCard, DetailRow, Pill, SectionHeader } from '@/components/lich/ui';
import { HoursNowNote, LyThuanPhongNowRow, NowMarker, NowSuffix, TodayLink } from '@/components/lich/LiveTime';
import { cn } from '@/lib/utils';

interface Props {
  params: Promise<{ date: string }>;
}

function parseAndValidateDate(dateStr: string) {
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  if (year < 1800 || year > 2199) return null;
  if (month < 1 || month > 12) return null;
  const maxDays = new Date(year, month, 0).getDate();
  if (day < 1 || day > maxDays) return null;
  return { day, month, year };
}

// Tên tháng âm như app: "Tháng chín", "Tháng chạp nhuận"
const LUNAR_MONTH_NAMES = ['giêng', 'hai', 'ba', 'tư', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười', 'mười một', 'chạp'];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  const parsed = parseAndValidateDate(date);
  if (!parsed) {
    return { title: 'Không tìm thấy ngày - Lịch An' };
  }

  const { day, month, year } = parsed;
  const dayInfo = getDayInfo(day, month, year);
  const lunarDay = dayInfo.lunarDate.day;
  const lunarMonth = dayInfo.lunarDate.month;
  const leapStr = dayInfo.lunarDate.leap ? ' (Nhuận)' : '';
  const canChiDay = dayInfo.canChiDay.fullName;
  const canChiYear = dayInfo.canChiYear.fullName;

  const hoangDaoStr = dayInfo.ngayHoangDao?.name ? ` — ${dayInfo.ngayHoangDao.name}` : '';
  const lucDieuStr = dayInfo.lucDieu?.name ? `, Lục Diệu ${dayInfo.lucDieu.name}` : '';
  const napAmStr = dayInfo.napAm ? `, Nạp âm ${dayInfo.napAm}` : '';

  const title = `Chi Tiết Ngày ${day}/${month}/${year}${hoangDaoStr} — Âm Lịch ${lunarDay}/${lunarMonth} Ngày ${canChiDay}`;
  const description = `Tra cứu Lịch Vạn Sự ngày ${day}/${month}/${year} dương lịch (tức ngày ${lunarDay}/${lunarMonth}${leapStr} năm ${canChiYear} âm lịch, ngày ${canChiDay}${napAmStr}). Xem ${dayInfo.ngayHoangDao?.name || 'Hoàng Đạo'}${lucDieuStr}, tiết khí ${dayInfo.tietKhi}, trực ${dayInfo.truc}, nhị thập bát tú, tuổi xung khắc, sao tốt xấu và luận giải đánh giá tổng quan.`;

  return {
    title,
    description,
    keywords: [
      `xem ngày ${day} tháng ${month} năm ${year}`,
      `lịch vạn sự ngày ${day}-${month}-${year}`,
      `âm lịch ngày ${day}-${month}-${year}`,
      `ngày ${canChiDay}`,
      `ngày hoàng đạo ${day}/${month}`,
      'lịch âm hôm nay',
      'lịch vạn sự',
      'lịch an',
    ],
    openGraph: {
      title: `${title} | Lịch An`,
      description,
      type: 'article',
      url: `https://lichan.com/xem-ngay/${date}`,
    },
  };
}

export default async function XemNgayDetailPage({ params }: Props) {
  const { date } = await params;
  const parsed = parseAndValidateDate(date);

  if (!parsed) {
    notFound();
  }

  const { day, month, year } = parsed;

  let dayInfo;
  let xuatHanhInfo;
  try {
    dayInfo = getDayInfo(day, month, year);
    xuatHanhInfo = getXuatHanhInfo(day, month, year);
  } catch {
    notFound();
  }

  const prev = addDays(day, month, year, -1);
  const next = addDays(day, month, year, 1);
  const lunar = dayInfo.lunarDate;
  const verdict = getDayVerdict(dayInfo);
  const quote = getDailyQuote(day, month, year);
  const star = dayInfo.nhiThapBatTu;
  const goodHours = dayInfo.gioHoangDao.filter((g) => g.isHoangDao);
  const lunarMonthName = `Tháng ${LUNAR_MONTH_NAMES[lunar.month - 1]}${lunar.leap ? ' nhuận' : ''}`;
  const verdictStyle = {
    good: { card: 'bg-secondary-container border-secondary/35', accent: 'bg-secondary text-white', text: 'text-on-secondary-container' },
    normal: { card: 'bg-surface-variant border-primary/35', accent: 'bg-primary text-on-primary', text: 'text-on-surface' },
    bad: { card: 'bg-danger-container border-danger/35', accent: 'bg-danger text-on-danger', text: 'text-on-danger-container' },
  }[verdict.level];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    name: `Chi Tiết Ngày ${day}/${month}/${year} — Lịch An`,
    description: `Tra cứu lịch vạn sự ngày ${day}/${month}/${year} dương lịch (ngày ${dayInfo.canChiDay.fullName} âm lịch), giờ hoàng đạo và việc nên làm, kiêng kỵ.`,
    url: `https://lichan.com/xem-ngay/${date}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://lichan.com' },
        { '@type': 'ListItem', position: 2, name: 'Lịch Vạn Niên', item: 'https://lichan.com/lich-van-nien' },
        { '@type': 'ListItem', position: 3, name: `Ngày ${day}/${month}/${year}`, item: `https://lichan.com/xem-ngay/${date}` },
      ],
    },
  };

  return (
    <div data-la-page className="mx-auto max-w-xl space-y-3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Đường dẫn" className="flex items-center gap-1.5 text-xs text-muted">
        <Link href="/" className="hover:text-primary">Trang chủ</Link>
        <span>/</span>
        <Link href="/lich-van-nien" className="hover:text-primary">Lịch vạn niên</Link>
        <span>/</span>
        <span className="text-on-surface">{day}/{month}/{year}</span>
      </nav>

      {/* Thanh chuyển ngày — như DayNavigationBar của app */}
      <div className="flex items-center">
        <Link href={dayUrl(prev.day, prev.month, prev.year)} aria-label="Ngày trước" className="rounded-full p-3 text-on-surface hover:bg-surface-variant">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="flex-1 text-center text-[15px] font-semibold text-on-surface sm:text-lg">
          {dayInfo.dayOfWeek}, {day}/{month}/{year}
        </h1>
        <Link href={dayUrl(next.day, next.month, next.year)} aria-label="Ngày sau" className="rounded-full p-3 text-on-surface hover:bg-surface-variant">
          <ChevronRight className="h-5 w-5" />
        </Link>
        <TodayLink date={{ day, month, year }} />
      </div>

      {/* Thẻ âm lịch */}
      <section className="flex items-center gap-4 rounded-[24px] bg-hero p-4 text-on-hero">
        <MoonPhase lunarDay={lunar.day} size={68} />
        <div className="flex-1">
          <div className="text-sm text-on-hero/80">Âm lịch · {moonPhaseOf(lunar.day)}</div>
          <div className="flex items-end">
            <span className="text-4xl font-bold">{lunar.day}</span>
            <span className="pb-1.5 text-[17px] font-medium text-on-hero/80">&nbsp;{lunarMonthName}</span>
          </div>
          <div className="text-sm text-on-hero/80">
            Ngày {dayInfo.canChiDay.fullName} · tháng {dayInfo.canChiMonth.fullName} · năm {dayInfo.canChiYear.fullName}
          </div>
        </div>
      </section>

      {dayInfo.ngayLe.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {dayInfo.ngayLe.map((le) => (
            <Pill key={le} tone="danger">{le}</Pill>
          ))}
        </div>
      )}

      {/* Kết luận ngày */}
      <section className={cn('rounded-lg border p-4', verdictStyle.card)}>
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn('rounded-full px-3 py-1 text-sm font-semibold', verdictStyle.accent)}>
            {VERDICT_TEXT[verdict.level].label}
          </span>
          <h2 className={cn('text-[15px] font-semibold', verdictStyle.text)}>{VERDICT_TEXT[verdict.level].headline}</h2>
        </div>
        <ul className={cn('mt-2 space-y-1 text-sm', verdictStyle.text)}>
          {verdict.reasons.map((reason) =>
            reason.startsWith('Trùng ngày kỵ') ? (
              <li key={reason}>
                <a href="#ngay-ky" className="hover:underline">• {reason} ›</a>
              </li>
            ) : (
              <li key={reason}>• {reason}</li>
            )
          )}
        </ul>
      </section>

      {/* Nên làm / Không nên */}
      <DetailCard>
        <SectionHeader title="Nên làm" actionLabel="Vì sao?" actionHref="/blog/thap-nhi-truc-12-truc-trong-xem-ngay-tot-xau" />
        <div className="flex flex-wrap gap-2">
          {dayInfo.viecNenLam.length > 0 ? (
            dayInfo.viecNenLam.map((viec) => (
              <Pill key={viec} tone="primary" className="py-1 font-normal">
                {viec === 'Dâng sao giải hạn' ? 'Cầu an, làm việc thiện' : viec}
              </Pill>
            ))
          ) : (
            <span className="text-sm text-muted">Không có chỉ định đặc biệt</span>
          )}
        </div>
        <h3 className="py-2 text-[15px] font-semibold text-on-surface">Không nên</h3>
        <div className="flex flex-wrap gap-2">
          {dayInfo.viecKhongNenLam.length > 0 ? (
            dayInfo.viecKhongNenLam.map((viec) => (
              <Pill key={viec} tone="danger" className="py-1 font-normal">{viec}</Pill>
            ))
          ) : (
            <span className="text-sm text-muted">Không có chỉ định kiêng kỵ</span>
          )}
        </div>
        <p className="pt-2 text-xs text-muted">Theo Thập Nhị Kiến Trừ, ngày trực {dayInfo.truc}.</p>
      </DetailCard>

      {/* Giờ hoàng đạo */}
      <DetailCard>
        <SectionHeader title="Giờ hoàng đạo" />
        <HoursNowNote date={{ day, month, year }} goodChi={goodHours.map((g) => g.name)} />
        <ul>
          {goodHours.map((gio) => (
            <li key={gio.name} className="flex items-center gap-3 border-t border-outline py-2 first:border-t-0">
              <NowMarker date={{ day, month, year }} chi={gio.name} />
              <span className="w-14 font-semibold text-on-surface">{gio.name}</span>
              <span className="text-sm text-muted">
                {gio.time.replace(' - ', '–')}
                <NowSuffix date={{ day, month, year }} chi={gio.name} />
              </span>
            </li>
          ))}
        </ul>
        <details className="group border-t border-outline pt-2">
          <summary className="flex cursor-pointer list-none items-center gap-1 text-sm font-semibold text-primary">
            Cả 12 giờ <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
          </summary>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 text-sm">
            {dayInfo.gioHoangDao.map((gio) => (
              <li key={gio.name} className="flex items-center gap-2 py-1">
                <span className={cn('h-2 w-2 rounded-full', gio.isHoangDao ? 'bg-gold' : 'bg-surface-variant')} aria-hidden />
                <span className="w-10 font-medium text-on-surface">{gio.name}</span>
                <span className="text-muted">{gio.time.replace(' - ', '–')}</span>
                <span className="sr-only">{gio.isHoangDao ? 'hoàng đạo' : 'hắc đạo'}</span>
              </li>
            ))}
          </ul>
        </details>
      </DetailCard>

      {/* Xuất hành */}
      <DetailCard>
        <SectionHeader title="Xuất hành" actionLabel="Xem thêm" actionHref="/xuat-hanh" />
        <DetailRow label="Hướng tốt" value={`Hỷ thần ${xuatHanhInfo.hyThan}`} valueHint={`Tài thần ${xuatHanhInfo.taiThan}`} />
        {dayInfo.hacThan && (
          <DetailRow label="Hướng nên tránh" value={`Hạc thần ${dayInfo.hacThan.split(' (')[0]}`} />
        )}
        <LyThuanPhongNowRow date={{ day, month, year }} hours={xuatHanhInfo.gioLyThuanPhong} />
        <details className="group border-t border-outline pt-2">
          <summary className="flex cursor-pointer list-none items-center gap-1 text-sm font-semibold text-primary">
            Bảng giờ Lý Thuần Phong <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
          </summary>
          <ul className="mt-2 text-sm">
            {xuatHanhInfo.gioLyThuanPhong.map((g) => (
              <li key={g.canhGio} className="flex gap-2 border-t border-outline py-1.5 first:border-t-0">
                <span className="w-10 font-medium text-on-surface">{g.canhGio}</span>
                <span className="w-24 text-muted">{g.timeRange.replace(' - ', '–')}</span>
                <span className={g.isGood ? 'font-medium text-on-surface' : 'font-medium text-danger'}>
                  {g.tenGio} · {g.isGood ? 'tốt' : 'xấu'}
                </span>
              </li>
            ))}
          </ul>
        </details>
      </DetailCard>

      {/* Lịch pháp chi tiết */}
      <DetailCard>
        <SectionHeader title="Lịch pháp chi tiết" />
        <DetailRow label="Tiết khí" value={dayInfo.tietKhi} />
        <DetailRow label="Trực" value={dayInfo.truc} href="/blog/thap-nhi-truc-12-truc-trong-xem-ngay-tot-xau" />
        <DetailRow label="Sao 28 tú" value={star.fullName} valueHint={star.direction} href="#sao-28-tu" />
        {dayInfo.napAm && (
          <DetailRow label="Nạp âm" value={dayInfo.napAm.split(' (')[0]} valueHint={dayInfo.napAm.match(/\((.*)\)/)?.[1]} />
        )}
        {dayInfo.lucDieu && <DetailRow label="Lục diệu" value={dayInfo.lucDieu.name} valueHint={dayInfo.lucDieu.isGood ? 'tốt' : 'xấu'} />}
        {dayInfo.tuoiXung && dayInfo.tuoiXung.ngay.length > 0 && (
          <DetailRow label="Tuổi xung ngày" value={dayInfo.tuoiXung.ngay.join(', ')} danger />
        )}
        {dayInfo.tuoiXung && dayInfo.tuoiXung.thang.length > 0 && (
          <DetailRow label="Tuổi xung tháng" value={dayInfo.tuoiXung.thang.join(', ')} />
        )}
      </DetailCard>

      {/* Ngày kỵ dân gian */}
      {dayInfo.ngayKy && dayInfo.ngayKy.length > 0 && (
        <DetailCard>
          <div id="ngay-ky" className="scroll-mt-20" />
          <SectionHeader title="Ngày kỵ dân gian" />
          <ul className="space-y-1.5 text-sm text-on-surface">
            {dayInfo.ngayKy.map((ky) => (
              <li key={ky}>• {ky}</li>
            ))}
          </ul>
          <p className="pt-2 text-xs text-muted">
            Theo quan niệm dân gian, vào những ngày này người xưa thường thận trọng, hạn chế khởi sự việc lớn như động thổ, cưới hỏi, khai trương.
          </p>
        </DetailCard>
      )}

      {/* Sao 28 tú */}
      <DetailCard>
        <div id="sao-28-tu" className="scroll-mt-20" />
        <SectionHeader title={`Sao ${star.fullName}`} actionLabel="Tìm hiểu" actionHref="/blog/nhi-thap-bat-tu-28-chom-sao-nguon-goc-va-cach-tinh" />
        <div className="flex flex-wrap gap-2 pb-2">
          <Pill tone={star.nature === 'Cát' ? 'gold' : star.nature === 'Hung' ? 'danger' : 'neutral'} className="py-1">
            {star.nature === 'Cát' ? 'Chủ cát' : star.nature === 'Hung' ? 'Chủ hung' : 'Bình hòa'}
          </Pill>
          <Pill tone="neutral" className="py-1 font-normal">{star.direction}</Pill>
          <Pill tone="neutral" className="py-1 font-normal">{star.animal}</Pill>
        </div>
        {star.tho && <p className="py-1 text-center text-sm italic text-muted">“{star.tho}”</p>}
        <p className="border-t border-outline py-2 text-sm text-on-surface">
          <span className="font-semibold">Nên: </span>
          {star.nenLam.join(', ')}
        </p>
        <p className="border-t border-outline py-2 text-sm text-on-surface">
          <span className="font-semibold">Kiêng: </span>
          {star.kiengKy.join(', ')}
        </p>
      </DetailCard>

      {/* Sao tốt, sao xấu */}
      <DetailCard>
        <SectionHeader title="Sao tốt" />
        <div className="flex flex-wrap gap-2">
          {dayInfo.saoTot.length > 0 ? (
            dayInfo.saoTot.map((sao) => <Pill key={sao} tone="gold" className="py-1 font-normal">{sao}</Pill>)
          ) : (
            <span className="text-sm text-muted">Không có sao tốt đặc biệt</span>
          )}
        </div>
        <h3 className="py-2 text-[15px] font-semibold text-on-surface">Sao xấu</h3>
        <div className="flex flex-wrap gap-2">
          {dayInfo.saoXau.length > 0 ? (
            dayInfo.saoXau.map((sao) => <Pill key={sao} tone="danger" className="py-1 font-normal">{sao}</Pill>)
          ) : (
            <span className="text-sm text-muted">Không có sao xấu đặc biệt</span>
          )}
        </div>
      </DetailCard>

      {/* Luận giải theo Lịch Vạn Sự */}
      {dayInfo.luanGiai && (
        <DetailCard>
          <SectionHeader title="Luận giải theo Lịch Vạn Sự" />
          <div className="space-y-3 text-sm leading-relaxed text-on-surface">
            {[
              { title: 'Can chi và ngũ hành nạp âm', text: dayInfo.luanGiai.canChiNguHanh, href: '/blog/thuyet-am-duong-ngu-hanh-nguon-goc-va-ung-dung' },
              { title: 'Hoàng đạo và Khổng Minh lục diệu', text: dayInfo.luanGiai.hoangDaoLucDieu, href: '/blog/ngay-hoang-dao-hac-dao-la-gi-nguon-goc-cach-tinh' },
              { title: 'Trực nhật và nhị thập bát tú', text: dayInfo.luanGiai.trucVaTinhTu, href: '/blog/nhi-thap-bat-tu-28-chom-sao-nguon-goc-va-cach-tinh' },
              { title: 'Cát tinh, hung tinh và thần sát', text: dayInfo.luanGiai.thanSat, href: '/blog/sao-tot-sao-xau-than-sat-trong-xem-ngay-trach-cat' },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-semibold">
                  {item.title}{' '}
                  <Link href={item.href} className="text-xs font-semibold text-primary hover:underline">Tìm hiểu</Link>
                </h3>
                <p className="text-muted">{item.text}</p>
              </div>
            ))}
            <div className="rounded-md bg-surface-variant px-3 py-2">
              <h3 className="font-semibold">Lời khuyên</h3>
              <p className="text-on-surface">{dayInfo.luanGiai.tongKet.loiKhuyen}</p>
            </div>
          </div>
        </DetailCard>
      )}

      {quote && (
        <figure className="px-4 py-3 text-center">
          <QuoteIcon className="mx-auto h-6 w-6 text-primary/60" aria-hidden />
          <blockquote className="italic text-muted">{quote.content}</blockquote>
          {quote.author && <figcaption className="text-sm font-semibold text-primary">— {quote.author}</figcaption>}
        </figure>
      )}

      <DetailCard>
        <h2 className="flex min-h-10 items-center text-[15px] font-semibold text-on-surface">Tra cứu liên quan</h2>
        <nav className="divide-y divide-outline">
          {[
            { href: '/xem-ngay-tot', label: 'Xem ngày tốt theo việc' },
            { href: '/xuat-hanh', label: 'Hướng xuất hành hôm nay' },
            { href: '/doi-ngay-am-duong', label: 'Đổi ngày âm - dương' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="flex items-center justify-between py-3 text-[15px] text-on-surface hover:text-primary">
              {label}
              <ArrowRight className="h-4 w-4 text-muted" aria-hidden />
            </Link>
          ))}
        </nav>
      </DetailCard>

      <p className="flex gap-2 px-1 pb-2 text-xs leading-relaxed text-muted">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
        <span>
          Các thông tin bình giải lịch vạn sự, ngày hoàng đạo, việc nên làm và kiêng kỵ trên Lịch An được biên soạn dựa trên các tư liệu phong tục cổ truyền dân gian (Hiệp Kỷ Biện Phương Thư, Ngọc Hạp Thông Thư, Khổng Minh Lục Diệu...). Nội dung mang tính chất tham khảo, chiêm nghiệm văn hóa truyền thống lành mạnh; không mang tính khẳng định tuyệt đối hay định hướng mê tín dị đoan. Trong thực tế, sự thành công và hanh thông của mỗi công việc luôn bắt đầu từ sự chuẩn bị chu đáo, năng lực chuyên môn và đạo đức của mỗi người.
        </span>
      </p>
    </div>
  );
}
