/**
 * Kết luận ngày (Ngày tốt / bình thường / xấu) — đồng bộ với `DayVerdict.kt` của Lịch An App.
 *
 * Quy tắc (giữ đơn giản, minh bạch):
 * - Xấu: Hắc Đạo và (trùng ngày kỵ dân gian hoặc sao 28 tú chủ hung).
 * - Tốt: Hoàng Đạo và sao 28 tú chủ cát, không trùng ngày kỵ.
 * - Bình thường: các trường hợp còn lại.
 *
 * Ngày kỵ chỉ xét 3 loại như app (Nguyệt Kỵ, Tam Nương, Dương Công Kỵ) để hai bên cho cùng kết quả.
 */

import type { DayInfo } from '@/types/lunar';

export type VerdictLevel = 'good' | 'normal' | 'bad';

export const VERDICT_TEXT: Record<VerdictLevel, { label: string; headline: string }> = {
  good: { label: 'Ngày tốt', headline: 'Thuận cho việc lớn' },
  normal: { label: 'Ngày bình thường', headline: 'Hợp việc thường ngày' },
  bad: { label: 'Ngày xấu', headline: 'Tránh việc lớn' },
};

export interface DayVerdict {
  level: VerdictLevel;
  reasons: string[];
  /** Có trùng ngày kỵ dân gian không (dòng lý do tương ứng bắt đầu bằng "Trùng ngày kỵ") */
  hasTaboo: boolean;
}

const TAM_NUONG_DAYS = [3, 7, 13, 18, 22, 27];
const NGUYET_KY_DAYS = [5, 14, 23];
const DUONG_CONG_KY: Record<number, number[]> = {
  1: [13], 2: [11], 3: [9], 4: [7], 5: [5], 6: [3],
  7: [8, 29], 8: [27], 9: [25], 10: [23], 11: [21], 12: [19],
};

/** Tên ngày kỵ theo đúng thứ tự app hiển thị. */
export function tabooNames(lunarMonth: number, lunarDay: number): string[] {
  const names: string[] = [];
  if (NGUYET_KY_DAYS.includes(lunarDay)) names.push('Nguyệt Kỵ');
  if (TAM_NUONG_DAYS.includes(lunarDay)) names.push('Tam Nương');
  if (DUONG_CONG_KY[lunarMonth]?.includes(lunarDay)) names.push('Dương Công Kỵ');
  return names;
}

export function evaluateVerdict(input: {
  isHoangDao: boolean;
  tabooNames: string[];
  starName: string;
  starNature: 'Cát' | 'Hung' | 'Bình';
}): DayVerdict {
  const hasTaboo = input.tabooNames.length > 0;
  const starBad = input.starNature === 'Hung';
  const starGood = input.starNature === 'Cát';

  let level: VerdictLevel = 'normal';
  if (!input.isHoangDao && (hasTaboo || starBad)) level = 'bad';
  else if (input.isHoangDao && starGood && !hasTaboo) level = 'good';

  const reasons = [input.isHoangDao ? 'Ngày Hoàng Đạo' : 'Ngày Hắc Đạo'];
  if (hasTaboo) reasons.push(`Trùng ngày kỵ dân gian: ${input.tabooNames.join(', ')}`);
  reasons.push(
    starBad ? `Sao ${input.starName} chủ hung` : starGood ? `Sao ${input.starName} chủ cát` : `Sao ${input.starName} bình hòa`
  );

  return { level, reasons, hasTaboo };
}

export function getDayVerdict(dayInfo: DayInfo): DayVerdict {
  return evaluateVerdict({
    isHoangDao: dayInfo.ngayHoangDao?.isHoangDao ?? false,
    tabooNames: tabooNames(dayInfo.lunarDate.month, dayInfo.lunarDate.day),
    starName: dayInfo.nhiThapBatTu.fullName,
    starNature: dayInfo.nhiThapBatTu.nature,
  });
}

/** Chỉ số Địa Chi (0 = Tý) của một giờ đồng hồ: giờ Tý từ 23:00 đến 01:00. */
export function chiIndexForHour(hour: number): number {
  return Math.floor(((hour + 1) % 24) / 2);
}
