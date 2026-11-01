'use client';

/*
 * Các phần phụ thuộc giờ hiện tại. Trang được dựng tĩnh, nên giờ chỉ tính trên trình duyệt
 * (theo giờ Việt Nam) để không lệch với lúc build.
 */

import Link from 'next/link';
import { DIA_CHI } from '@/lib/constants';
import { chiIndexForHour } from '@/lib/lunar/day-verdict';
import { HourDial, useVnClock } from './HourDial';

const pad = (n: number) => String(n).padStart(2, '0');

/** Giờ bắt đầu - kết thúc của canh giờ thứ i (Tý = 0 bắt đầu 23:00). */
function hourRange(i: number) {
  const start = (i * 2 + 23) % 24;
  return { start, end: (start + 2) % 24 };
}

function nextGood(currentIndex: number, goodChi: Set<string>) {
  for (let k = 1; k <= 12; k++) {
    const i = (currentIndex + k) % 12;
    if (goodChi.has(DIA_CHI[i])) return i;
  }
  return null;
}

/** Ngày đang xem có phải hôm nay (giờ Việt Nam) không. Null khi dựng trên máy chủ. */
export function useIsToday(day: number, month: number, year: number) {
  const now = useVnClock();
  if (!now) return null;
  return now.day === day && now.month === month && now.year === year;
}

/** Khối "Canh giờ" ở trang chủ: đồng hồ + bây giờ là giờ gì, giờ tốt kế tiếp. */
export function HourDialSection({ goodChi: goodList, detailHref }: { goodChi: string[]; detailHref: string }) {
  const goodChi = new Set(goodList);
  const now = useVnClock();
  const i = now ? chiIndexForHour(now.hour) : null;
  const current = i !== null ? DIA_CHI[i] : null;
  const isGood = current ? goodChi.has(current) : false;
  const next = i !== null ? nextGood(i, goodChi) : null;

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-[17px] font-semibold text-on-surface">Canh giờ</h2>
        <Link href={detailHref} className="px-1 py-2 text-sm font-semibold text-primary hover:underline">
          Xem 12 giờ
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <HourDial goodChi={goodChi} now={now} />
        <div className="flex-1 space-y-0.5">
          {i !== null && current ? (
            <>
              <div className="text-sm text-muted">Bây giờ</div>
              <div className="text-[22px] font-semibold text-on-surface">Giờ {current}</div>
              <div className="text-sm text-muted">
                {pad(hourRange(i).start)}:00 – {pad(hourRange(i).end)}:00
              </div>
              <div className={`pt-1 font-semibold ${isGood ? 'text-secondary' : 'text-on-surface'}`}>
                {isGood ? 'Giờ hoàng đạo' : 'Giờ thường'}
              </div>
              {next !== null && next !== i && (
                <div className="text-sm text-muted">
                  Giờ tốt kế tiếp: {DIA_CHI[next]}, {pad(hourRange(next).start)}:00
                </div>
              )}
            </>
          ) : (
            <div className="text-sm text-muted">Giờ hoàng đạo: {goodList.join(', ')}</div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Dòng "Bây giờ giờ … : giờ hoàng đạo / giờ thường" trên thẻ giờ hoàng đạo, chỉ hiện khi xem hôm nay. */
export function HoursNowNote({ date, goodChi: goodList }: { date: { day: number; month: number; year: number }; goodChi: string[] }) {
  const isToday = useIsToday(date.day, date.month, date.year);
  const now = useVnClock();
  if (!isToday || !now) return null;
  const goodChi = new Set(goodList);
  const i = chiIndexForHour(now.hour);
  const isGood = goodChi.has(DIA_CHI[i]);
  const next = nextGood(i, goodChi);
  const r = hourRange(i);
  return (
    <p className="mb-1 rounded-md bg-surface-variant px-3 py-2 text-sm text-on-surface">
      Bây giờ giờ {DIA_CHI[i]} ({pad(r.start)}–{pad(r.end)}): {isGood ? 'giờ hoàng đạo.' : 'giờ thường.'}
      {!isGood && next !== null && ` Giờ tốt kế tiếp: ${DIA_CHI[next]}, ${pad(hourRange(next).start)}:00`}
    </p>
  );
}

/** Chấm đánh dấu giờ hiện tại trong danh sách giờ hoàng đạo. */
export function NowMarker({ date, chi }: { date: { day: number; month: number; year: number }; chi: string }) {
  const isToday = useIsToday(date.day, date.month, date.year);
  const now = useVnClock();
  const isNow = !!isToday && !!now && DIA_CHI[chiIndexForHour(now.hour)] === chi;
  return (
    <>
      <span className={`h-2 w-2 shrink-0 rounded-full ${isNow ? 'bg-primary' : 'bg-gold'}`} aria-hidden />
      {isNow && <span className="sr-only">Bây giờ</span>}
    </>
  );
}

/** Nhãn " · bây giờ" sau tên cung giờ hiện tại. */
export function NowSuffix({ date, chi }: { date: { day: number; month: number; year: number }; chi: string }) {
  const isToday = useIsToday(date.day, date.month, date.year);
  const now = useVnClock();
  return isToday && now && DIA_CHI[chiIndexForHour(now.hour)] === chi ? <> · bây giờ</> : null;
}

/** Dòng giờ xuất hành Lý Thuần Phong lúc này, chỉ hiện khi xem hôm nay. */
export function LyThuanPhongNowRow({
  date,
  hours,
}: {
  date: { day: number; month: number; year: number };
  hours: { canhGio: string; tenGio: string; isGood: boolean }[];
}) {
  const isToday = useIsToday(date.day, date.month, date.year);
  const now = useVnClock();
  if (!isToday || !now) return null;
  const current = hours.find((h) => h.canhGio === DIA_CHI[chiIndexForHour(now.hour)]);
  if (!current) return null;
  return (
    <div className="flex items-start gap-3 border-t border-outline py-2">
      <div className="flex-1">
        <div className="text-[15px] text-muted">Giờ xuất hành</div>
        <div className="text-xs text-muted">lúc này · theo Lý Thuần Phong</div>
      </div>
      <div className={`flex-1 text-right text-[15px] font-semibold ${current.isGood ? 'text-on-surface' : 'text-danger'}`}>
        {current.tenGio} · {current.isGood ? 'tốt' : 'xấu'}
      </div>
    </div>
  );
}

/** Nút "Hôm nay" trên thanh chuyển ngày, ẩn khi đang xem hôm nay. */
export function TodayLink({ date }: { date: { day: number; month: number; year: number } }) {
  const isToday = useIsToday(date.day, date.month, date.year);
  const n = useVnClock();
  if (isToday !== false || !n) return <span className="w-[72px]" aria-hidden />;
  return (
    <Link
      href={`/xem-ngay/${pad(n.day)}-${pad(n.month)}-${n.year}`}
      className="w-[72px] px-2 py-2 text-center text-sm font-semibold text-primary hover:underline"
    >
      Hôm nay
    </Link>
  );
}
