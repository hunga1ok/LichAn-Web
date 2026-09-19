import { THIEN_CAN, DIA_CHI, NGU_HANH, CON_GIAP } from '../constants';

export function getCanChiYear(lunarYear: number): { can: string; chi: string; fullName: string } {
  const can = THIEN_CAN[(lunarYear + 6) % 10];
  const chi = DIA_CHI[(lunarYear + 8) % 12];
  return { can, chi, fullName: `${can} ${chi}` };
}

export function getCanChiMonth(lunarMonth: number, lunarYear: number): { can: string; chi: string; fullName: string } {
  const canIndex = (lunarYear * 12 + lunarMonth + 3) % 10;
  const chiIndex = (lunarMonth + 1) % 12;
  const can = THIEN_CAN[canIndex];
  const chi = DIA_CHI[chiIndex];
  return { can, chi, fullName: `${can} ${chi}` };
}

export function getCanChiDay(jd: number): { can: string; chi: string; fullName: string } {
  const can = THIEN_CAN[(jd + 9) % 10];
  const chi = DIA_CHI[(jd + 1) % 12];
  return { can, chi, fullName: `${can} ${chi}` };
}

export function getCanChiHour(jd: number): { can: string; chi: string; fullName: string } {
  const canDay = (jd + 9) % 10;
  const canHour = (canDay * 2) % 10;
  return { can: THIEN_CAN[canHour], chi: DIA_CHI[0], fullName: `${THIEN_CAN[canHour]} Tý` };
}

export function getConGiap(lunarYear: number): string {
  return CON_GIAP[(lunarYear + 8) % 12];
}

/**
 * Ngũ hành nạp âm Lục Thập Hoa Giáp
 * Công thức: Hệ số Can + Hệ số Chi
 * Can: Giáp,Ất=1; Bính,Đinh=2; Mậu,Kỷ=3; Canh,Tân=4; Nhâm,Quý=5
 * Chi: Tý,Sửu,Ngọ,Mùi=0; Dần,Mão,Thân,Dậu=1; Thìn,Tỵ,Tuất,Hợi=2
 * Tổng > 5 thì trừ 5.
 * 1: Kim, 2: Thủy, 3: Hỏa, 4: Thổ, 5: Mộc
 */
const CAN_VALUE: Record<string, number> = {
  'Giáp': 1, 'Ất': 1,
  'Bính': 2, 'Đinh': 2,
  'Mậu': 3, 'Kỷ': 3,
  'Canh': 4, 'Tân': 4,
  'Nhâm': 5, 'Quý': 5,
};

const CHI_VALUE: Record<string, number> = {
  'Tý': 0, 'Sửu': 0, 'Ngọ': 0, 'Mùi': 0,
  'Dần': 1, 'Mão': 1, 'Thân': 1, 'Dậu': 1,
  'Thìn': 2, 'Tỵ': 2, 'Tuất': 2, 'Hợi': 2,
};

const MENH_NAMES: Record<number, string> = {
  1: 'Kim',
  2: 'Thủy',
  3: 'Hỏa',
  4: 'Thổ',
  5: 'Mộc',
};

export function getNguHanh(can: string, chi: string): string {
  const cVal = CAN_VALUE[can] || 1;
  const chVal = CHI_VALUE[chi] !== undefined ? CHI_VALUE[chi] : 0;
  let sum = cVal + chVal;
  if (sum > 5) sum -= 5;
  return MENH_NAMES[sum] || 'Kim';
}
