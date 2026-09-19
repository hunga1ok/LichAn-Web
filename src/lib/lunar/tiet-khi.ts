import { getSunLongitude } from './lunar-calendar';
import { TIET_KHI_NAMES } from '../constants';

/**
 * Tính tiết khí hiện tại dựa trên kinh độ Mặt Trời
 * getSunLongitude trả về sector 0-11 (chia 360° thành 12 phần)
 * Mỗi sector tương ứng với 2 tiết khí, ta dùng sector chính để xác định tiết khí lớn
 */
export function getTietKhi(jd: number): string {
  const sunLongSector = getSunLongitude(jd, 7);
  // Mỗi sector (0-11) tương ứng với 1 trong 24 tiết khí (2 tiết/sector)
  // Ta lấy tiết khí chính (tiết khí lớn = trung khí)
  if (sunLongSector >= 0 && sunLongSector < TIET_KHI_NAMES.length) {
    return TIET_KHI_NAMES[sunLongSector];
  }
  return TIET_KHI_NAMES[0];
}
