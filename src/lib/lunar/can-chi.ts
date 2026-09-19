import { THIEN_CAN, DIA_CHI, NGU_HANH, CON_GIAP } from '../constants';
import { solarToJd } from './lunar-calendar';

export function getCanChiYear(lunarYear: number): { can: string, chi: string, fullName: string } {
  const can = THIEN_CAN[(lunarYear + 6) % 10];
  const chi = DIA_CHI[(lunarYear + 8) % 12];
  return { can, chi, fullName: `${can} ${chi}` };
}

export function getCanChiMonth(lunarMonth: number, lunarYear: number): { can: string, chi: string, fullName: string } {
  const canIndex = (lunarYear * 12 + lunarMonth + 3) % 10;
  const chiIndex = (lunarMonth + 1) % 12;
  const can = THIEN_CAN[canIndex];
  const chi = DIA_CHI[chiIndex];
  return { can, chi, fullName: `${can} ${chi}` };
}

export function getCanChiDay(jd: number): { can: string, chi: string, fullName: string } {
  const can = THIEN_CAN[(jd + 9) % 10];
  const chi = DIA_CHI[(jd + 1) % 12];
  return { can, chi, fullName: `${can} ${chi}` };
}

export function getCanChiHour(jd: number): { can: string, chi: string, fullName: string } {
  // Tính can chi của giờ Tý
  const canDay = (jd + 9) % 10;
  const canHour = (canDay * 2) % 10;
  return { can: THIEN_CAN[canHour], chi: DIA_CHI[0], fullName: `${THIEN_CAN[canHour]} Tý` };
}

export function getConGiap(lunarYear: number): string {
  return CON_GIAP[(lunarYear + 8) % 12];
}

export function getNguHanh(can: string, chi: string): string {
  // Logic đơn giản ngũ hành
  return NGU_HANH[0];
}
