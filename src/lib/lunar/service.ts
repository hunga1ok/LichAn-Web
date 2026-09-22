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
  GioHoangDao,
  AuspiciousPurpose,
  AuspiciousDayResult,
  XuatHanhInfo,
  NhiThapBatTu
} from '@/types/lunar';
import { getNhiThapBatTuByJd } from './nhi-thap-bat-tu';

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
import {
  isTamNuong,
  isNguyetKy,
  isSatChu,
  isThuTu,
  isNguyetPha,
  isBatTuong,
  getPhuongViXuatHanh,
  getGioLyThuanPhong,
} from './core/trach-nhat';
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

    const nhiThapBatTu = this.getNhiThapBatTu(jd);

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
      nhiThapBatTu,
      viecNenLam,
      viecKhongNenLam,
      ngayLe,
      nguHanhDay,
    };
  }

  /**
   * Lấy thông tin Nhị Thập Bát Tú (28 chòm sao thiên văn) theo ngày Julian
   */
  public getNhiThapBatTu(jd: number): NhiThapBatTu {
    return getNhiThapBatTuByJd(jd);
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

  /**
   * Lọc danh sách ngày tốt theo mục đích cụ thể (cưới hỏi, khai trương, động thổ, xuất hành...)
   * Căn cứ theo Hiệp Kỷ Biện Phương Thư và Ngọc Hạp Thông Thư
   */
  public getAuspiciousDays(purpose: AuspiciousPurpose, month: number, year: number): AuspiciousDayResult[] {
    const daysInMonth = new Date(year, month, 0).getDate();
    const results: AuspiciousDayResult[] = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const dayInfo = this.getDayInfo(d, month, year);
      const { lunarDate, canChiDay, truc, saoTot, saoXau, gioHoangDao, dayOfWeek } = dayInfo;

      const reasons: string[] = [];
      const warnings: string[] = [];
      let score = 50;

      // 1. Kiểm tra các ngày đại hung trăm sự đều kỵ (Tier 1: Hard Taboos)
      const tamNuong = isTamNuong(lunarDate.day);
      const nguyetKy = isNguyetKy(lunarDate.day);
      const satChu = isSatChu(lunarDate.month, canChiDay.chi);
      const thuTu = isThuTu(lunarDate.month, canChiDay.chi);
      const nguyetPha = isNguyetPha(lunarDate.month, canChiDay.chi);

      if (tamNuong) {
        score -= 35;
        warnings.push('Phạm ngày Tam Nương (trăm sự đều kỵ)');
      }
      if (nguyetKy) {
        score -= 30;
        warnings.push('Phạm ngày Nguyệt Kỵ (nửa đời nửa đoạn)');
      }
      if (satChu) {
        score -= 40;
        warnings.push('Phạm ngày Sát Chủ tháng (đại kỵ xây dựng, cưới hỏi)');
      }
      if (thuTu) {
        score -= 40;
        warnings.push('Phạm ngày Thụ Tử (trăm sự bất lợi)');
      }
      if (nguyetPha) {
        score -= 35;
        warnings.push('Phạm ngày Nguyệt Phá (chi ngày xung chi tháng)');
      }

      // 2. Kiểm tra theo từng mục đích chuyên biệt (Tier 2: Purpose-specific Rules)
      switch (purpose) {
        case 'cuoi-hoi': {
          if (isBatTuong(lunarDate.month, canChiDay.fullName)) {
            score += 30;
            reasons.push('Ngày Âm Dương Bất Tương (Đại cát cho lương duyên hòa hợp, trăm năm hạnh phúc)');
          }
          if (['Định', 'Thành', 'Mãn'].includes(truc)) {
            score += 15;
            reasons.push(`Trực ${truc} tốt cho đính hôn, vu quy`);
          } else if (['Phá', 'Bế', 'Nguy', 'Chấp'].includes(truc)) {
            score -= 20;
            warnings.push(`Trực ${truc} bất lợi cho việc thành gia lập thất`);
          }

          const goodWeddingStars = ['Thiên Hỷ', 'Hỷ Thần', 'Nguyệt Ân', 'Tam Hợp', 'Lục Hợp'];
          for (const s of goodWeddingStars) {
            if (saoTot.includes(s)) {
              score += 10;
              reasons.push(`Sao tốt ${s} chiếu mệnh gia đạo`);
            }
          }

          const badWeddingStars = ['Cô Thần', 'Quả Tú', 'Ly Sàng', 'Không Phòng', 'Cô Quả'];
          for (const s of badWeddingStars) {
            if (saoXau.includes(s)) {
              score -= 20;
              warnings.push(`Phạm sao xấu ${s} hại tình duyên`);
            }
          }
          break;
        }

        case 'khai-truong': {
          if (['Khai', 'Mãn', 'Thành'].includes(truc)) {
            score += 25;
            reasons.push(`Trực ${truc} mở rộng hanh thông, buôn bán phát đạt`);
          } else if (['Bế', 'Phá', 'Nguy', 'Chấp'].includes(truc)) {
            score -= 20;
            warnings.push(`Trực ${truc} tắc nghẽn, bất lợi cho mở hàng buôn bán`);
          }

          const goodBusinessStars = ['Thiên Tài', 'Nguyệt Tài', 'Lộc Mã', 'Địa Tài', 'Phúc Sinh'];
          for (const s of goodBusinessStars) {
            if (saoTot.includes(s)) {
              score += 10;
              reasons.push(`Sao tốt ${s} mang lại cung tài lộc thịnh vượng`);
            }
          }

          const badBusinessStars = ['Đại Hao', 'Tiểu Hao', 'Kiếp Sát', 'Thiên Tặc'];
          for (const s of badBusinessStars) {
            if (saoXau.includes(s)) {
              score -= 15;
              warnings.push(`Phạm sao ${s} hao tổn tài của`);
            }
          }
          break;
        }

        case 'dong-tho': {
          if (['Kiến', 'Định', 'Bình', 'Khai'].includes(truc)) {
            score += 25;
            reasons.push(`Trực ${truc} vượng khí, nền móng vững chắc`);
          } else if (['Phá', 'Bế', 'Nguy'].includes(truc)) {
            score -= 25;
            warnings.push(`Trực ${truc} xung khắc, kiêng cữ động thổ xây cất`);
          }

          const goodBuildStars = ['Sinh Khí', 'Thiên Phúc', 'Nguyệt Đức', 'Thiên Đức'];
          for (const s of goodBuildStars) {
            if (saoTot.includes(s)) {
              score += 15;
              reasons.push(`Sao tốt ${s} đại cát khởi tạo xây dựng`);
            }
          }

          const badBuildStars = ['Thổ Phủ', 'Địa Phá', 'Thổ Cấm', 'Hoang Vu', 'Vãng Vong'];
          for (const s of badBuildStars) {
            if (saoXau.includes(s)) {
              score -= 20;
              warnings.push(`Phạm sao sát ${s} kỵ đào đất làm móng`);
            }
          }
          break;
        }

        case 'xuat-hanh': {
          if (['Khai', 'Thành', 'Mãn', 'Định'].includes(truc)) {
            score += 20;
            reasons.push(`Trực ${truc} bình an thuận buồm xuôi gió`);
          } else if (['Phá', 'Bế', 'Nguy'].includes(truc)) {
            score -= 20;
            warnings.push(`Trực ${truc} hiểm trở, dễ gặp trắc trở trên đường`);
          }

          const goodTravelStars = ['Dịch Mã', 'Thiên Mã', 'Phúc Sinh', 'Thiên Đức'];
          for (const s of goodTravelStars) {
            if (saoTot.includes(s)) {
              score += 15;
              reasons.push(`Sao ${s} phò trợ hanh thông di chuyển`);
            }
          }

          const badTravelStars = ['Bạch Hổ', 'Vãng Vong', 'Thiên Cẩu'];
          for (const s of badTravelStars) {
            if (saoXau.includes(s)) {
              score -= 15;
              warnings.push(`Phạm sao sát ${s} dễ gặp sự cố bất trắc`);
            }
          }
          break;
        }

        case 'cat-toc': {
          // Trực Trừ đặc biệt tốt cho cắt tóc (đã có trong viecNenLam của Trực Trừ)
          if (truc === 'Trừ') {
            score += 25;
            reasons.push('Trực Trừ đại cát cho cắt tóc, tẩy uế, khử trừ xui xẻo');
          } else if (['Mãn', 'Thành', 'Khai'].includes(truc)) {
            score += 15;
            reasons.push(`Trực ${truc} hợp cho cắt tóc, chỉnh trang dung mạo`);
          } else if (['Phá', 'Bế', 'Nguy'].includes(truc)) {
            score -= 20;
            warnings.push(`Trực ${truc} kỵ cắt tóc, dễ hao tổn sinh khí`);
          }

          const goodHaircutStars = ['Thiên Đức', 'Nguyệt Đức', 'Thiên Hỷ', 'Tam Hợp', 'Lục Hợp'];
          for (const s of goodHaircutStars) {
            if (saoTot.includes(s)) {
              score += 10;
              reasons.push(`Sao ${s} chiếu mệnh, cắt tóc đón vận may`);
            }
          }

          const badHaircutStars = ['Bạch Hổ', 'Thiên Hình', 'Kiếp Sát', 'Ngũ Quỷ'];
          for (const s of badHaircutStars) {
            if (saoXau.includes(s)) {
              score -= 15;
              warnings.push(`Phạm sao ${s} kỵ cắt tóc, hao tổn vận khí`);
            }
          }
          break;
        }

        case 'cat-noc': {
          // Cất nóc (thượng lương) ưu tiên Trực Thành, Định — khác Động Thổ (đào móng)
          if (['Thành', 'Định', 'Khai'].includes(truc)) {
            score += 25;
            reasons.push(`Trực ${truc} đại cát cho cất nóc thượng lương, mái nhà vững bền`);
          } else if (['Kiến', 'Bình'].includes(truc)) {
            score += 15;
            reasons.push(`Trực ${truc} tốt cho xây cất, công trình hanh thông`);
          } else if (['Phá', 'Bế', 'Nguy'].includes(truc)) {
            score -= 25;
            warnings.push(`Trực ${truc} đại kỵ cất nóc, dễ sập đổ, tai nạn`);
          }

          const goodRoofStars = ['Sinh Khí', 'Thiên Phúc', 'Nguyệt Đức', 'Thiên Đức', 'Thiên Quý'];
          for (const s of goodRoofStars) {
            if (saoTot.includes(s)) {
              score += 12;
              reasons.push(`Sao ${s} vượng khí, cất nóc bình an trường cửu`);
            }
          }

          const badRoofStars = ['Thổ Phủ', 'Địa Phá', 'Thổ Cấm', 'Đại Hao', 'Vãng Vong'];
          for (const s of badRoofStars) {
            if (saoXau.includes(s)) {
              score -= 18;
              warnings.push(`Phạm sao ${s} kỵ cất nóc đổ mái, dễ hao tổn`);
            }
          }
          break;
        }
      }

      // 3. Tinh tú Nhị Thập Bát Tú (Tier 3: 28 Constellations)
      const sao28 = this.getNhiThapBatTu(lunarDate.jd);
      if (sao28.nature === 'Cát') {
        score += 10;
        reasons.push(`Sao Nhị Thập Bát Tú cát: ${sao28.fullName} (${sao28.animal}) - Tinh tú cát lợi bách sự`);
      } else if (sao28.nature === 'Hung') {
        score -= 15;
        const mainKieng = sao28.kiengKy.slice(0, 2).join(', ');
        warnings.push(`Sao Nhị Thập Bát Tú hung: ${sao28.fullName} (${sao28.animal}) - Hung tinh, kỵ ${mainKieng}`);
      }

      // Giờ hoàng đạo
      const hoangDaoHours = gioHoangDao
        .filter((g) => g.isHoangDao)
        .map((g) => `${g.name} (${g.time})`);

      // Tiêu chuẩn ngày tốt:
      // Không vướng đại hung (Tam nương, Nguyệt kỵ, Sát chủ, Thụ tử, Nguyệt phá)
      // Điểm >= 65 và có lý do cát lợi
      const hasHardTaboo = tamNuong || nguyetKy || satChu || thuTu || nguyetPha;
      const finalScore = Math.max(0, Math.min(100, score));
      const isAuspicious = !hasHardTaboo && finalScore >= 65 && reasons.length > 0;

      results.push({
        solarDay: d,
        solarMonth: month,
        solarYear: year,
        lunarDay: lunarDate.day,
        lunarMonth: lunarDate.month,
        lunarYear: lunarDate.year,
        isLeap: lunarDate.leap === 1,
        dayOfWeek,
        canChiDay: canChiDay.fullName,
        truc,
        sao28,
        score: finalScore,
        isAuspicious,
        reasons,
        warnings,
        hoangDaoHours,
      });
    }

    return results;
  }

  /**
   * Tra cứu hướng Hỷ Thần, Tài Thần và 6 giờ Lý Thuần Phong theo ngày
   */
  public getXuatHanhInfo(day: number, month: number, year: number): XuatHanhInfo {
    const lunarDate = coreSolarToLunar(day, month, year);
    const canChiDay = getCanChiDay(lunarDate.jd);
    const { hyThan, taiThan } = getPhuongViXuatHanh(canChiDay.can);
    const gioLyThuanPhong = getGioLyThuanPhong(lunarDate.day, lunarDate.month);

    return {
      hyThan,
      taiThan,
      gioLyThuanPhong,
    };
  }
}

// Export singleton instance duy nhất dùng xuyên suốt app
export const lunarService: ILunarService = LunarService.getInstance();
