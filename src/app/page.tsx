import Link from 'next/link';
import { ArrowLeftRight, BellRing, CalendarCheck, CalendarDays, ChevronRight, Quote as QuoteIcon } from 'lucide-react';
import { getDayInfo, moonHint, nextLunarMilestone } from '@/lib/lunar';
import { getDailyQuote } from '@/lib/daily-quote';
import { addDays, dayUrl, vnNow } from '@/lib/vn-date';
import { THU_TRONG_TUAN } from '@/lib/constants';
import MoonPhase from '@/components/lich/MoonPhase';
import MonthGrid, { lunarMonthsLabel } from '@/components/lich/MonthGrid';
import { HourDialSection } from '@/components/lich/LiveTime';
import { DetailCard, Pill } from '@/components/lich/ui';

// Trang dựng tĩnh, làm mới mỗi giờ để "hôm nay" luôn đúng theo giờ Việt Nam
export const revalidate = 3600;

export default function HomePage() {
  const { day, month, year } = vnNow();
  const dayInfo = getDayInfo(day, month, year);
  const lunar = dayInfo.lunarDate;
  const detailHref = dayUrl(day, month, year);
  const isHoangDao = dayInfo.ngayHoangDao?.isHoangDao ?? false;
  const goodChi = dayInfo.gioHoangDao.filter((g) => g.isHoangDao).map((g) => g.name);
  const milestone = nextLunarMilestone({ day, month, year });
  const quote = getDailyQuote(day, month, year);

  const milestoneDate = milestone.solarDate;
  const milestoneWeekday = THU_TRONG_TUAN[new Date(Date.UTC(milestoneDate.year, milestoneDate.month - 1, milestoneDate.day)).getUTCDay()];
  const daysText = milestone.daysAway === 0 ? 'Hôm nay' : milestone.daysAway === 1 ? 'Ngày mai' : `còn ${milestone.daysAway} ngày`;
  const tomorrow = addDays(day, month, year, 1);

  return (
    <div data-la-page className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      {/* Cột chính — cùng thứ tự với màn Trang chủ của app */}
      <div className="mx-auto w-full max-w-xl space-y-3 lg:max-w-none">
        <h1 className="text-center text-[17px] font-semibold text-on-surface lg:text-left lg:text-xl">
          {dayInfo.dayOfWeek}, {day} tháng {month}
          <span className="sr-only">
            {' '}năm {year} — âm lịch ngày {lunar.day} tháng {lunar.month} năm {dayInfo.canChiYear.fullName}
          </span>
        </h1>

        {/* Thẻ trăng */}
        <Link
          href={detailHref}
          className="flex items-center gap-4 rounded-[24px] bg-hero px-5 py-4 text-on-hero transition-opacity hover:opacity-95"
          aria-label={`Xem chi tiết ngày ${day}/${month}/${year}`}
        >
          <MoonPhase lunarDay={lunar.day} />
          <div className="flex-1">
            <div className="text-sm text-on-hero/80">Âm lịch</div>
            <div className="flex items-end">
              <span className="text-5xl font-bold leading-[52px]">{lunar.day}</span>
              <span className="pb-1.5 text-[22px] font-medium text-on-hero/80">
                {' '}/ {lunar.month}
                {lunar.leap ? ' nhuận' : ''}
              </span>
            </div>
            <div className="text-sm font-medium text-gold">{moonHint(lunar.day)}</div>
          </div>
        </Link>

        <div className="flex flex-wrap gap-2">
          <Pill tone="primary">Năm {dayInfo.canChiYear.fullName}</Pill>
          <Pill tone={isHoangDao ? 'gold' : 'danger'}>{isHoangDao ? 'Ngày Hoàng Đạo' : 'Ngày Hắc Đạo'}</Pill>
          {dayInfo.ngayLe.map((le) => (
            <Pill key={le} tone="danger">
              {le}
            </Pill>
          ))}
        </div>

        <div className="pt-1">
          <HourDialSection goodChi={goodChi} detailHref={detailHref} />
        </div>

        {/* Rằm / mùng 1 kế tiếp */}
        <Link
          href={dayUrl(milestoneDate.day, milestoneDate.month, milestoneDate.year)}
          className="flex items-center gap-3 rounded-lg border border-outline bg-surface px-4 py-3 transition-colors hover:bg-surface-variant/60"
        >
          <BellRing className="h-6 w-6 shrink-0 text-primary" aria-hidden />
          <div className="flex-1">
            <div className="font-semibold text-on-surface">
              {milestone.type} tháng {milestone.lunarMonth}
              {milestone.isLeapMonth ? ' nhuận' : ''} · {daysText}
            </div>
            <div className="text-sm text-muted">
              {milestoneWeekday}, {milestoneDate.day}/{milestoneDate.month}
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted" aria-hidden />
        </Link>

        <Link
          href={detailHref}
          className="flex h-[52px] items-center justify-center rounded-md bg-primary font-semibold text-on-primary transition-colors hover:bg-primary-dark"
        >
          Xem chi tiết ngày hôm nay
        </Link>

        {quote && (
          <p className="flex gap-2 px-2 pt-2 text-sm text-muted">
            <QuoteIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" aria-hidden />
            <span>
              {quote.content}
              {quote.author && ` — ${quote.author}`}
            </span>
          </p>
        )}
      </div>

      {/* Cột phụ trên màn hình rộng */}
      <aside className="mx-auto w-full max-w-xl space-y-4 lg:max-w-none">
        <DetailCard>
          <div className="flex min-h-10 items-center justify-between">
            <h2 className="text-[15px] font-semibold text-on-surface">
              Tháng {month}, {year}
            </h2>
            <Link href="/lich-van-nien" className="px-1 py-2 text-sm font-semibold text-primary hover:underline">
              Lịch tháng
            </Link>
          </div>
          <p className="-mt-1 mb-2 text-sm text-muted">{lunarMonthsLabel(month, year)}</p>
          <MonthGrid month={month} year={year} today={day} />
        </DetailCard>

        <DetailCard>
          <h2 className="flex min-h-10 items-center text-[15px] font-semibold text-on-surface">Tiện ích</h2>
          <nav className="divide-y divide-outline">
            {[
              { href: dayUrl(tomorrow.day, tomorrow.month, tomorrow.year), label: 'Xem ngày mai', icon: CalendarDays },
              { href: '/doi-ngay-am-duong', label: 'Đổi ngày âm - dương', icon: ArrowLeftRight },
              { href: '/dong-bo-lich', label: 'Nhắc rằm, mùng 1 trên điện thoại', icon: CalendarCheck },
            ].map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className="flex items-center gap-3 py-3 text-on-surface hover:text-primary">
                <Icon className="h-5 w-5 text-primary" aria-hidden />
                <span className="flex-1 text-[15px]">{label}</span>
                <ChevronRight className="h-4 w-4 text-muted" aria-hidden />
              </Link>
            ))}
          </nav>
        </DetailCard>
      </aside>
    </div>
  );
}
