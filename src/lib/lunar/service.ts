/**
 * Lunar Service Implementation (Facade Pattern)
 * ============================================================================
 * Đây là lớp dịch vụ đóng gói (Service Facade) duy nhất kết nối giữa các Use Cases/UI
 * và bộ lõi toán học thiên văn (Core).
 * 
 * Lõi toán học trong `src/lib/lunar/core/` được khóa cố định. Mọi tính toán âm lịch
 * của toàn bộ ứng dụng Lịch An bắt buộc phải đi qua service này.
 * ============================================================================
 */

import { 
  ILunarService, 
  DayInfo, 
  LunarDate, 
  SolarDate, 
  CalendarMonthData, 
  CalendarDaySummary,
  CanChi,
  GioHoangDao 
} from '@/types/lunar';

import { 
  solarToLunar as coreSolarToLunar, 
  lunarToSolar as coreLunarToSolar, 
  solarToJd,
  getNewMoonDay,
  getSunLongitude,
  getSunLongitude24
} from './core/lunar-calendar';

import { 
  getCanChiDay, 
  getCanChiMonth, 
  getCanChiYear, 
  getNguHanh 
} from './core/can-chi';

import { getGioHoangDao as coreGetGioHoangDao } from './core/hoang-dao';
import { getTietKhi } from './core/tiet-khi';
import { getSaoTot, getSaoXau } from './core/sao-tot-xau';
import { getTruc } from './core/truc-nhat';
import { getViecNenLam, getViecKhongNenLam } from './core/viec-nen-lam';
import { getNgayLe } from './core/ngay-le';
import { THU_TRONG_TUAN } from '../constants';

export class LunarService implements ILunarService {
  private static instance: LunarService;

  private constructor() {}

  public static getInstance(): LunarService {
    if (!LunarService.instance) {
      LunarService.instance = new LunarService();
    }
    return LunarService.instance;
  }

  /**
   * Lấy toàn bộ thông tin ngày dương lịch: Âm lịch, Can Chi, Hoàng Đạo, Trực, Tiết Khí, Sao, Lễ hội...
   */
  public getDayInfo(day: number, month: number, year: number): DayInfo {
    const lunarDate = coreSolarToLunar(day, month, year);
    const jd = lunarDate.jd;
    const solarDate: SolarDate = { day, month, year };

    const canChiDay = getCanChiDay(jd);
    const canChiMonth = getCanChiMonth(lunarDate.month, lunarDate.year);
    const canChiYear = getCanChiYear(lunarDate.year);

    const gioHoangDao = coreGetGioHoangDao(jd);
    const tietKhi = getTietKhi(jd);

    const saoTot = getSaoTot(lunarDate.day, lunarDate.month);
    const saoXau = getSaoXau(lunarDate.day, lunarDate.month);
    const truc = getTruc(jd, lunarDate.month);

    const viecNenLam = getViecNenLam(truc, saoTot);
    const viecKhongNenLam = getViecKhongNenLam(truc, saoXau);

    const ngayLe = getNgayLe(day, month, lunarDate.day, lunarDate.month);
    const nguHanhDay = getNguHanh(canChiDay.can, canChiDay.chi);

    const dateObj = new Date(year, month - 1, day);
    const dayOfWeek = THU_TRONG_TUAN[dateObj.getDay()];

    return {
      solarDate,
      lunarDate,
      dayOfWeek,
      canChiDay,
      canChiMonth,
      canChiYear,
      gioHoangDao,
      tietKhi,
      saoTot,
      saoXau,
      truc,
      viecNenLam,
      viecKhongNenLam,
      ngayLe,
      nguHanhDay,
    };
  }

  /**
   * Chuyển đổi Dương lịch -> Âm lịch
   */
  public solarToLunar(day: number, month: number, year: number): LunarDate {
    return coreSolarToLunar(day, month, year);
  }

  /**
   * Chuyển đổi Âm lịch -> Dương lịch
   */
  public lunarToSolar(lunarDay: number, lunarMonth: number, lunarYear: number, isLeap: number = 0): SolarDate {
    return coreLunarToSolar(lunarDay, lunarMonth, lunarYear, isLeap);
  }

  /**
   * Lấy cấu trúc dữ liệu đầy đủ cho Lịch Tháng (Lịch Vạn Niên)
   */
  public getMonthCalendar(month: number, year: number): CalendarMonthData {
    const today = new Date();
    const isCurrentMonth = today.getMonth() + 1 === month && today.getFullYear() === year;
    const currentDay = today.getDate();

    const daysInMonth = new Date(year, month, 0).getDate();
    // Chuyển 0 (Chủ nhật) thành 6, 1 (Thứ 2) thành 0... để grid bắt đầu từ Thứ 2
    const firstDayOfWeek = (new Date(year, month - 1, 1).getDay() + 6) % 7;

    const days: CalendarDaySummary[] = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const lunar = coreSolarToLunar(d, month, year);
      const canChi = getCanChiDay(lunar.jd);
      const isSun = new Date(year, month - 1, d).getDay() === 0;
      const holidays = getNgayLe(d, month, lunar.day, lunar.month);

      days.push({
        solarDay: d,
        solarMonth: month,
        solarYear: year,
        lunarDay: lunar.day,
        lunarMonth: lunar.month,
        lunarYear: lunar.year,
        isLeap: lunar.leap === 1,
        isToday: isCurrentMonth && d === currentDay,
        isSunday: isSun,
        holiday: holidays.length > 0 ? holidays[0] : undefined,
        canChiDay: canChi.fullName,
      });
    }

    return {
      solarMonth: month,
      solarYear: year,
      daysInMonth,
      firstDayOfWeek,
      days,
    };
  }

  public getCanChiYear(lunarYear: number): CanChi {
    return getCanChiYear(lunarYear);
  }

  public getGioHoangDao(jd: number): GioHoangDao[] {
    return coreGetGioHoangDao(jd);
  }
}

// Export singleton instance duy nhất dùng xuyên suốt app
export const lunarService: ILunarService = LunarService.getInstance();
