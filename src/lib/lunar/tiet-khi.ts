import { getSunLongitude24 } from './lunar-calendar';
import { TIET_KHI_NAMES } from '../constants';

/**
 * Tính tiết khí hiện tại dựa trên kinh độ Mặt Trời (24 tiết khí, mỗi tiết 15 độ)
 * 0: Xuân phân (0°), 1: Thanh minh (15°), ..., 11: Bạch lộ (165°), ..., 23: Kinh trập (345°)
 */
export function getTietKhi(jd: number): string {
  const idx24 = getSunLongitude24(jd, 7);
  if (idx24 >= 0 && idx24 < TIET_KHI_NAMES.length) {
    return TIET_KHI_NAMES[idx24];
  }
  return TIET_KHI_NAMES[0];
}
