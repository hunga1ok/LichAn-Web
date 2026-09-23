import type { NhiThapBatTu } from '../lib/lunar/nhi-thap-bat-tu';

export interface LunarDate {
  day: number;
  month: number;
  year: number;
  leap: number; // 1 nếu là tháng nhuận, 0 nếu không
  jd: number;
}

export interface SolarDate {
  day: number;
  month: number;
  year: number;
}

export interface CanChi {
  can: string;
  chi: string;
  fullName: string;
}

export interface GioHoangDao {
  name: string;
  time: string; // ví dụ "23:00 - 01:00"
  isHoangDao: boolean; // true nếu hoàng đạo, false nếu hắc đạo
}

export interface TietKhi {
  name: string;
  solarDate: SolarDate;
}

export interface NgayHoangDaoInfo {
  name: string; // ví dụ: "Thanh Long Hoàng Đạo" hoặc "Bạch Hổ Hắc Đạo"
  starName: string; // ví dụ: "Thanh Long", "Bạch Hổ"
  isHoangDao: boolean; // true nếu hoàng đạo, false nếu hắc đạo
  yNghia: string;
}

export interface LucDieuInfo {
  name: 'Đại An' | 'Lưu Niên' | 'Tốc Hỷ' | 'Xích Khẩu' | 'Tiểu Cát' | 'Không Vong';
  isGood: boolean;
  yNghia: string;
  tho: string;
}

export interface TuoiXungInfo {
  ngay: string[]; // Các tuổi xung khắc với ngày
  thang: string[]; // Các tuổi xung khắc với tháng
}

export interface LuanGiaiNgayInfo {
  canChiNguHanh: string;
  hoangDaoLucDieu: string;
  trucVaTinhTu: string;
  thanSat: string;
  tongKet: {
    danhGia: 'Đại Cát' | 'Cát Lành' | 'Bình Hòa' | 'Hung' | 'Đại Hung';
    score: number; // 0 - 100
    loiKhuyen: string;
    hopViec: string[];
    kyViec: string[];
  };
}

export interface DayInfo {
  solarDate: SolarDate;
  lunarDate: LunarDate;
  dayOfWeek: string;
  canChiDay: CanChi;
  canChiMonth: CanChi;
  canChiYear: CanChi;
  gioHoangDao: GioHoangDao[];
  tietKhi: string;
  saoTot: string[];
  saoXau: string[];
  truc: string;
  nhiThapBatTu: NhiThapBatTu;
  viecNenLam: string[];
  viecKhongNenLam: string[];
  ngayLe: string[];
  nguHanhDay: string;
  // Các trường bổ sung theo chuẩn Lịch Vạn Sự
  ngayHoangDao?: NgayHoangDaoInfo;
  lucDieu?: LucDieuInfo;
  napAm?: string;
  tuoiXung?: TuoiXungInfo;
  ngayKy?: string[];
  hacThan?: string;
  luanGiai?: LuanGiaiNgayInfo;
}

export interface CalendarDaySummary {
  solarDay: number;
  solarMonth: number;
  solarYear: number;
  lunarDay: number;
  lunarMonth: number;
  lunarYear: number;
  isLeap: boolean;
  isToday: boolean;
  isSunday: boolean;
  holiday?: string;
  canChiDay: string;
  isHoangDao?: boolean; // true nếu là Ngày Hoàng Đạo
  ngayHoangDaoName?: string; // ví dụ: Thanh Long, Minh Đường...
}

export interface CalendarMonthData {
  solarMonth: number;
  solarYear: number;
  daysInMonth: number;
  firstDayOfWeek: number; // 0 = Thứ 2, 6 = Chủ nhật
  days: CalendarDaySummary[];
}

export type AuspiciousPurpose = 'cuoi-hoi' | 'khai-truong' | 'dong-tho' | 'xuat-hanh' | 'cat-toc' | 'cat-noc';

export interface AuspiciousDayResult {
  solarDay: number;
  solarMonth: number;
  solarYear: number;
  lunarDay: number;
  lunarMonth: number;
  lunarYear: number;
  isLeap: boolean;
  dayOfWeek: string;
  canChiDay: string;
  truc: string;
  sao28?: NhiThapBatTu;
  score: number; // Thang điểm 0 - 100
  isAuspicious: boolean; // true = Ngày tốt
  reasons: string[]; // Các lý do tốt (Bất Tương, Trực Thành, Sao Thiên Hỷ, Sao 28 Tú cát...)
  warnings: string[]; // Các điểm kiêng kỵ (nếu có)
  hoangDaoHours: string[]; // Giờ hoàng đạo tốt nhất trong ngày
  ngayHoangDao?: string; // Tên Ngày Hoàng Đạo / Hắc Đạo
  isHoangDao?: boolean; // true nếu ngày hoàng đạo
  lucDieu?: string; // Tên Khổng Minh Lục Diệu
}

export interface XuatHanhInfo {
  hyThan: string; // Hướng đón Hỷ Thần
  taiThan: string; // Hướng đón Tài Thần
  hacThan?: string; // Hướng đón Hạc Thần (hướng hung nên tránh)
  gioLyThuanPhong: {
    canhGio: string;
    timeRange: string;
    tenGio: string;
    isGood: boolean;
    yNghia: string;
  }[];
}

/**
 * Interface chuẩn cho dịch vụ Lịch Âm Dương Lịch An
 * Mọi component và usecase giao tiếp qua interface này.
 */
export interface ILunarService {
  /** Lấy toàn bộ thông tin phong thủy, tử vi, chi tiết của 1 ngày */
  getDayInfo(day: number, month: number, year: number): DayInfo;

  /** Chuyển đổi Dương lịch -> Âm lịch */
  solarToLunar(day: number, month: number, year: number): LunarDate;

  /** Chuyển đổi Âm lịch -> Dương lịch */
  lunarToSolar(lunarDay: number, lunarMonth: number, lunarYear: number, isLeap?: number): SolarDate;

  /** Lấy dữ liệu trọn vẹn 1 tháng cho Lịch Vạn Niên */
  getMonthCalendar(month: number, year: number): CalendarMonthData;

  /** Tính Can Chi cho năm âm lịch */
  getCanChiYear(lunarYear: number): CanChi;

  /** Tính 12 giờ Hoàng Đạo / Hắc Đạo của ngày */
  getGioHoangDao(jd: number): GioHoangDao[];

  /** Lấy thông tin Nhị Thập Bát Tú của ngày theo Julian Day */
  getNhiThapBatTu(jd: number): NhiThapBatTu;

  /** Lọc danh sách ngày tốt theo mục đích cụ thể (cưới hỏi, khai trương, động thổ...) */
  getAuspiciousDays(purpose: AuspiciousPurpose, month: number, year: number): AuspiciousDayResult[];

  /** Tra cứu hướng và giờ xuất hành Lý Thuần Phong */
  getXuatHanhInfo(day: number, month: number, year: number): XuatHanhInfo;
}

export type { NhiThapBatTu } from '../lib/lunar/nhi-thap-bat-tu';

