/**
 * Pha trăng suy từ ngày âm lịch (tháng âm bắt đầu từ ngày trăng non).
 * Đồng bộ với `MoonPhase.kt` của Lịch An App.
 */

import { lunarService } from './service';

const SYNODIC_MONTH_DAYS = 29.53;

export type MoonPhaseLabel =
  | 'Trăng non'
  | 'Trăng lưỡi liềm'
  | 'Trăng thượng huyền'
  | 'Trăng gần tròn'
  | 'Trăng tròn'
  | 'Trăng khuyết dần'
  | 'Trăng hạ huyền'
  | 'Trăng tàn';

export function moonPhaseOf(lunarDay: number): MoonPhaseLabel {
  if (lunarDay === 1) return 'Trăng non';
  if (lunarDay <= 6) return 'Trăng lưỡi liềm';
  if (lunarDay <= 8) return 'Trăng thượng huyền';
  if (lunarDay <= 13) return 'Trăng gần tròn';
  if (lunarDay <= 16) return 'Trăng tròn';
  if (lunarDay <= 21) return 'Trăng khuyết dần';
  if (lunarDay <= 23) return 'Trăng hạ huyền';
  return 'Trăng tàn';
}

/** Vị trí trong chu kỳ: 0 = trăng non, 0.5 = trăng tròn, gần 1 = cuối tháng. Rằm luôn là trăng tròn. */
export function moonCycleFraction(lunarDay: number): number {
  if (lunarDay === 15) return 0.5;
  return Math.min(Math.max((lunarDay - 1) / SYNODIC_MONTH_DAYS, 0), 0.999);
}

/** Dòng gợi ý dưới ngày âm trên thẻ trăng. */
export function moonHint(lunarDay: number): string {
  const phase = moonPhaseOf(lunarDay);
  if (lunarDay === 1) return `Mùng 1 · ${phase}`;
  if (lunarDay === 15) return `Rằm · ${phase}`;
  if (lunarDay < 15) return `${phase} · còn ${15 - lunarDay} ngày tới rằm`;
  return phase;
}

export interface LunarMilestone {
  type: 'Mùng 1' | 'Rằm';
  lunarMonth: number;
  isLeapMonth: boolean;
  solarDate: { day: number; month: number; year: number };
  daysAway: number;
}

/** Mùng 1 hoặc rằm gần nhất kể từ ngày `from` (daysAway = 0 nếu chính ngày đó). */
export function nextLunarMilestone(from: { day: number; month: number; year: number }): LunarMilestone {
  for (let offset = 0; offset <= 31; offset++) {
    const d = new Date(Date.UTC(from.year, from.month - 1, from.day + offset));
    const solar = { day: d.getUTCDate(), month: d.getUTCMonth() + 1, year: d.getUTCFullYear() };
    const lunar = lunarService.solarToLunar(solar.day, solar.month, solar.year);
    const type = lunar.day === 1 ? 'Mùng 1' : lunar.day === 15 ? 'Rằm' : null;
    if (type) {
      return { type, lunarMonth: lunar.month, isLeapMonth: lunar.leap === 1, solarDate: solar, daysAway: offset };
    }
  }
  throw new Error('Không tìm thấy mùng 1 hoặc rằm trong 31 ngày');
}
