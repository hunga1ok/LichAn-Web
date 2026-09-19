import { DayInfo } from '../../types/lunar';
import { solarToLunar, jdToSolar } from './lunar-calendar';
import { getCanChiDay, getCanChiMonth, getCanChiYear, getNguHanh } from './can-chi';
import { getGioHoangDao } from './hoang-dao';
import { getTietKhi } from './tiet-khi';
import { getSaoTot, getSaoXau } from './sao-tot-xau';
import { getTruc } from './truc-nhat';
import { getViecNenLam, getViecKhongNenLam } from './viec-nen-lam';
import { getNgayLe } from './ngay-le';
import { THU_TRONG_TUAN } from '../constants';

export function getDayInfo(day: number, month: number, year: number): DayInfo {
  const lunarDate = solarToLunar(day, month, year);
  const jd = lunarDate.jd;
  const solarDate = { day, month, year };
  
  const canChiDay = getCanChiDay(jd);
  const canChiMonth = getCanChiMonth(lunarDate.month, lunarDate.year);
  const canChiYear = getCanChiYear(lunarDate.year);
  
  const gioHoangDao = getGioHoangDao(jd);
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
    nguHanhDay
  };
}

export * from './lunar-calendar';
export * from './can-chi';
export * from './hoang-dao';
export * from './tiet-khi';
export * from './sao-tot-xau';
export * from './truc-nhat';
export * from './viec-nen-lam';
export * from './ngay-le';
