import { TRUC } from '../constants';

/**
 * Tính 12 Trực (Kiến, Trừ, Mãn, Bình, Định, Chấp, Phá, Nguy, Thành, Thâu, Khai, Bế)
 * Nguyên tắc cổ truyền:
 * - Tháng 1 (Dần) khởi Kiến tại Dần
 * - Tháng 2 (Mão) khởi Kiến tại Mão
 * - ...
 * - Chi của tháng = (lunarMonth + 1) % 12 (1: Dần=2, ..., 8: Dậu=9, 11: Tý=0, 12: Sửu=1)
 * - Chi của ngày = (jd + 1) % 12
 * - Trực index = (chiDay - chiMonth + 12) % 12
 */
export function getTruc(jd: number, lunarMonth: number): string {
  const chiMonth = (lunarMonth + 1) % 12;
  const chiDay = (jd + 1) % 12;
  const trucIndex = (chiDay - chiMonth + 12) % 12;
  return TRUC[trucIndex];
}
