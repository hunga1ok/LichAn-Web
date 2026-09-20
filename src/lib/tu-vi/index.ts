/**
 * Lịch An — Thư Viện Luận Giải Tử Vi & Niên Hạn Cá Nhân Hóa
 * ============================================================================
 */

import { getSaoChieuMenh, SaoChieuMenh, CUU_DIEU_INFO } from './sao-chieu-menh';
import { getBatHan, BatHan, BAT_HAN_INFO } from './bat-han';
import { getCungPhi, CungPhiInfo } from './cung-phi';
import { getHoaGiapData, getAllHoaGiapList, HoaGiapData } from './hoa-giap';
import { checkTamTai } from '@/lib/feng-shui/tam-tai';
import { checkKimLau } from '@/lib/feng-shui/kim-lau';
import { checkHoangOc } from '@/lib/feng-shui/hoang-oc';

export * from './sao-chieu-menh';
export * from './bat-han';
export * from './cung-phi';
export * from './hoa-giap';
export * from './con-giap';

export interface TuViPersonalReport {
  birthYear: number;
  currentYear: number;
  gender: 'nam' | 'nu';
  genderLabel: string;
  tuoiMu: number;
  hoaGiap: HoaGiapData;
  saoChieuMenh: SaoChieuMenh;
  batHan: BatHan;
  cungPhi: CungPhiInfo;
  tamTai: ReturnType<typeof checkTamTai>;
  kimLau: ReturnType<typeof checkKimLau>;
  hoangOc: ReturnType<typeof checkHoangOc>;
}

/**
 * Tổng hợp toàn bộ thông tin tử vi cá nhân hóa theo năm sinh, năm xem và giới tính
 */
export function getTuViPersonalReport(
  birthYear: number,
  currentYear: number = new Date().getFullYear(),
  gender: 'nam' | 'nu' = 'nam'
): TuViPersonalReport {
  const tuoiMu = currentYear - birthYear + 1;
  const hoaGiap = getHoaGiapData(birthYear);
  const saoChieuMenh = getSaoChieuMenh(tuoiMu, gender);
  const batHan = getBatHan(tuoiMu, gender);
  const cungPhi = getCungPhi(birthYear, gender);

  const tamTai = checkTamTai(birthYear, currentYear);
  const kimLau = checkKimLau(birthYear, currentYear);
  const hoangOc = checkHoangOc(birthYear, currentYear);

  return {
    birthYear,
    currentYear,
    gender,
    genderLabel: gender === 'nam' ? 'Nam mạng' : 'Nữ mạng',
    tuoiMu,
    hoaGiap,
    saoChieuMenh,
    batHan,
    cungPhi,
    tamTai,
    kimLau,
    hoangOc,
  };
}
