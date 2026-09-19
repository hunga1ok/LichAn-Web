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
  viecNenLam: string[];
  viecKhongNenLam: string[];
  ngayLe: string[];
  nguHanhDay: string;
}
