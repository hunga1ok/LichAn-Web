/**
 * Lịch An — Giao diện Lịch Âm Dương Công Khai (Public API & Facade)
 * ============================================================================
 * Toàn bộ mã nguồn bên ngoài (UI Pages, Components, Hooks) tương tác thông qua
 * `lunarService` hoặc các hàm bọc (helpers) được khai báo tại đây.
 * 
 * Lõi tính toán thiên văn học đã được niêm phong trong `src/lib/lunar/core/`.
 * ============================================================================
 */

import { lunarService } from './service';
import type { DayInfo, LunarDate, SolarDate, CalendarMonthData } from '@/types/lunar';

// Export instance chính
export { lunarService };
export type { ILunarService } from '@/types/lunar';
export * from '@/types/lunar';

// Convenience helpers ủy quyền cho lunarService
export const getDayInfo = (day: number, month: number, year: number): DayInfo => 
  lunarService.getDayInfo(day, month, year);

export const solarToLunar = (day: number, month: number, year: number): LunarDate => 
  lunarService.solarToLunar(day, month, year);

export const lunarToSolar = (lunarDay: number, lunarMonth: number, lunarYear: number, isLeap: number = 0): SolarDate => 
  lunarService.lunarToSolar(lunarDay, lunarMonth, lunarYear, isLeap);

export const getMonthCalendar = (month: number, year: number): CalendarMonthData =>
  lunarService.getMonthCalendar(month, year);

export const getAuspiciousDays = (purpose: import('@/types/lunar').AuspiciousPurpose, month: number, year: number) =>
  lunarService.getAuspiciousDays(purpose, month, year);

export const getXuatHanhInfo = (day: number, month: number, year: number) =>
  lunarService.getXuatHanhInfo(day, month, year);
