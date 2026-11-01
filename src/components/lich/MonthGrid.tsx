import Link from 'next/link';
import { getMonthCalendar, lunarService } from '@/lib/lunar';
import { dayUrl } from '@/lib/vn-date';
import { cn } from '@/lib/utils';

/** "Tháng 9 – 10 âm lịch · Bính Ngọ" cho các tháng âm mà tháng dương này trải qua (giống app). */
export function lunarMonthsLabel(month: number, year: number): string {
  const lastDay = new Date(year, month, 0).getDate();
  const first = lunarService.solarToLunar(1, month, year);
  const last = lunarService.solarToLunar(lastDay, month, year);
  const months = first.month === last.month ? `Tháng ${first.month}` : `Tháng ${first.month} – ${last.month}`;
  return `${months} âm lịch · ${lunarService.getCanChiYear(last.year).fullName}`;
}

/**
 * Lưới lịch tháng theo `CalendarScreen.kt` của app: ô trung tính, ý nghĩa thể hiện bằng ký hiệu nhỏ —
 * chấm vàng = hoàng đạo, ◐ mùng 1, ● rằm, Chủ nhật chữ đỏ, hôm nay có viền.
 */
export default function MonthGrid({
  month,
  year,
  today,
  selectedDay,
}: {
  month: number;
  year: number;
  /** Ngày hôm nay nếu thuộc tháng này */
  today?: number;
  /** Ngày đang chọn nếu thuộc tháng này */
  selectedDay?: number;
}) {
  const data = getMonthCalendar(month, year);

  return (
    <div>
      <div className="grid grid-cols-7 text-center text-xs font-medium text-muted">
        {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d, i) => (
          <div key={d} className={cn('py-1', i === 6 && 'text-danger')}>
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {Array.from({ length: data.firstDayOfWeek }, (_, i) => (
          <div key={`trong-${i}`} />
        ))}
        {data.days.map((d) => {
          const isSelected = d.solarDay === selectedDay;
          const isToday = d.solarDay === today;
          const isMungMot = d.lunarDay === 1;
          const isRam = d.lunarDay === 15;
          const lunarText = isMungMot ? `◐ 1/${d.lunarMonth}` : isRam ? '● Rằm' : String(d.lunarDay);
          return (
            <Link
              key={d.solarDay}
              href={dayUrl(d.solarDay, month, year)}
              aria-label={`Ngày ${d.solarDay} tháng ${month} năm ${year}, âm lịch ${d.lunarDay}/${d.lunarMonth}${
                d.isHoangDao ? ', ngày hoàng đạo' : ''
              }${isToday ? ', hôm nay' : ''}`}
              aria-current={isToday ? 'date' : undefined}
              className={cn(
                'my-px flex min-h-[52px] flex-col items-center justify-center gap-px rounded-[10px] px-0.5 py-1 transition-colors',
                isSelected ? 'bg-primary' : 'hover:bg-surface-variant',
                isToday && !isSelected && 'ring-[1.5px] ring-inset ring-primary'
              )}
            >
              <span
                className={cn(
                  'text-[17px] font-semibold leading-tight',
                  isSelected ? 'text-on-primary' : d.isSunday ? 'text-danger' : 'text-on-surface'
                )}
              >
                {d.solarDay}
              </span>
              <span
                className={cn(
                  'whitespace-nowrap text-[11px] leading-tight',
                  isSelected ? 'text-on-primary/85' : isMungMot || isRam ? 'font-semibold text-secondary' : 'text-muted'
                )}
              >
                {lunarText}
              </span>
              <span
                className={cn(
                  'h-[5px] w-[5px] rounded-full',
                  !d.isHoangDao ? 'bg-transparent' : isSelected ? 'bg-on-primary' : 'bg-gold'
                )}
                aria-hidden
              />
            </Link>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-4 pt-1 pb-2 text-xs text-muted">
        <span className="inline-flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden /> Hoàng đạo
        </span>
        <span>◐ Mùng 1 · ● Rằm</span>
      </div>
    </div>
  );
}
