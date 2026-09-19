/**
 * Tiện ích Tính Toán Đếm Ngược & Thông Tin Tết Nguyên Đán
 * ============================================================================
 */

import { lunarService } from '@/lib/lunar';
import type { DayInfo, SolarDate } from '@/types/lunar';

export interface NextTetInfo {
  lunarYear: number;
  canChiYear: string;
  conGiap: string;
  nguHanh: string;
  solarDate: SolarDate;
  targetTimestamp: number;
  dayInfoMung1: DayInfo;
  daysRemaining: number;
}

/**
 * Ngũ hành nạp âm phổ biến cho các năm gần
 */
const NGU_HANH_NAP_AM_YEARS: Record<number, string> = {
  2024: 'Phú Đăng Hỏa (Lửa đèn to)',
  2025: 'Phú Đăng Hỏa (Lửa đèn to)',
  2026: 'Thiên Hà Thủy (Nước trên trời)',
  2027: 'Thiên Hà Thủy (Nước trên trời)',
  2028: 'Đại Trạch Thổ (Đất nền nhà)',
  2029: 'Đại Trạch Thổ (Đất nền nhà)',
  2030: 'Thoa Xuyến Kim (Vàng trang sức)',
};

/**
 * Tìm thời điểm Giao Thừa Tết Nguyên Đán tiếp theo tính từ thời điểm hiện tại
 */
export function getNextTetInfo(referenceDate: Date = new Date()): NextTetInfo {
  const currentSolarYear = referenceDate.getFullYear();
  const currentSolarMonth = referenceDate.getMonth() + 1;
  const currentSolarDay = referenceDate.getDate();

  // Xác định ngày âm lịch hiện tại
  const currentLunar = lunarService.solarToLunar(currentSolarDay, currentSolarMonth, currentSolarYear);

  // Thường Tết Nguyên Đán rơi vào tháng 1 hoặc 2 dương lịch
  // Nếu ngày hiện tại chưa đến mùng 1 Tết của năm âm lịch tiếp theo
  let candidateLunarYear = currentLunar.year + 1;

  // Lấy ngày mùng 1 Tết của năm âm lịch hiện tại và năm kế
  const solarTetCandidate = lunarService.lunarToSolar(1, 1, candidateLunarYear);
  const targetDate = new Date(solarTetCandidate.year, solarTetCandidate.month - 1, solarTetCandidate.day, 0, 0, 0, 0);

  // Nếu targetDate vẫn trong quá khứ so với referenceDate (hiếm gặp vì candidateLunarYear = currentLunar.year + 1)
  if (targetDate.getTime() <= referenceDate.getTime()) {
    candidateLunarYear += 1;
  }

  const finalSolarTet = lunarService.lunarToSolar(1, 1, candidateLunarYear);
  const finalTargetDate = new Date(finalSolarTet.year, finalSolarTet.month - 1, finalSolarTet.day, 0, 0, 0, 0);

  const dayInfoMung1 = lunarService.getDayInfo(finalSolarTet.day, finalSolarTet.month, finalSolarTet.year);
  const diffMs = finalTargetDate.getTime() - referenceDate.getTime();
  const daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

  const nguHanh = NGU_HANH_NAP_AM_YEARS[candidateLunarYear] || 'Thiên Hà Thủy';

  return {
    lunarYear: candidateLunarYear,
    canChiYear: dayInfoMung1.canChiYear.fullName,
    conGiap: dayInfoMung1.canChiYear.chi,
    nguHanh,
    solarDate: finalSolarTet,
    targetTimestamp: finalTargetDate.getTime(),
    dayInfoMung1,
    daysRemaining,
  };
}
