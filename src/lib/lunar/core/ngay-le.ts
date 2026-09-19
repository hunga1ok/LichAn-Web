/**
 * @internal
 * KHÓA MÃ NGUỒN: Tra cứu ngày lễ
 */
import { NGAY_LE_AM_LICH, NGAY_LE_DUONG_LICH } from '../../constants';

export function getNgayLe(solarDay: number, solarMonth: number, lunarDay: number, lunarMonth: number): string[] {
  const le = [];
  const keySolar = `${solarDay}/${solarMonth}`;
  const keyLunar = `${lunarDay}/${lunarMonth}`;
  if (NGAY_LE_DUONG_LICH[keySolar]) le.push(NGAY_LE_DUONG_LICH[keySolar]);
  if (NGAY_LE_AM_LICH[keyLunar]) le.push(NGAY_LE_AM_LICH[keyLunar]);
  return le;
}
