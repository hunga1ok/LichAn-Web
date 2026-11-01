/**
 * Ngày giờ hiện tại theo múi giờ Việt Nam — máy chủ triển khai thường chạy UTC,
 * nên không dùng trực tiếp `new Date().getDate()`.
 */

export interface VnNow {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
}

export function vnNow(date: Date = new Date()): VnNow {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { day: get('day'), month: get('month'), year: get('year'), hour: get('hour'), minute: get('minute') };
}

/** Đường dẫn trang chi tiết ngày, dạng /xem-ngay/dd-mm-yyyy */
export function dayUrl(day: number, month: number, year: number): string {
  return `/xem-ngay/${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`;
}

/** Cộng/trừ ngày trên lịch dương (không phụ thuộc múi giờ máy chủ). */
export function addDays(day: number, month: number, year: number, delta: number) {
  const d = new Date(Date.UTC(year, month - 1, day + delta));
  return { day: d.getUTCDate(), month: d.getUTCMonth() + 1, year: d.getUTCFullYear() };
}
