/**
 * @internal
 * KHÓA MÃ NGUỒN: Tính 12 Giờ Hoàng Đạo / Hắc Đạo
 */
import { GioHoangDao } from '../../../types/lunar';
import { DIA_CHI } from '../../constants';

/**
 * Bảng giờ Hoàng Đạo theo Chi của ngày
 * 6 giờ Hoàng Đạo (Thanh Long, Minh Đường, Kim Quỹ, Thiên Đức, Ngọc Đường, Tư Mệnh)
 * 6 giờ Hắc Đạo (Thiên Hình, Chu Tước, Bạch Hổ, Thiên Lao, Huyền Vũ, Câu Trận)
 * 
 * Chi ngày → vị trí bắt đầu Thanh Long (index trong 12 chi)
 */
const HOANG_DAO_START: Record<string, number[]> = {
  // Chi ngày → index các giờ hoàng đạo (0=Tý, 1=Sửu, ..., 11=Hợi)
  'Tý':   [0, 1, 4, 5, 8, 9],    // Tý, Sửu, Thìn, Tỵ, Thân, Dậu
  'Ngọ':  [0, 1, 4, 5, 8, 9],    // Tý, Sửu, Thìn, Tỵ, Thân, Dậu
  'Sửu':  [2, 3, 6, 7, 10, 11],  // Dần, Mão, Ngọ, Mùi, Tuất, Hợi
  'Mùi':  [2, 3, 6, 7, 10, 11],  // Dần, Mão, Ngọ, Mùi, Tuất, Hợi
  'Dần':  [0, 1, 4, 5, 8, 9],    // Tý, Sửu, Thìn, Tỵ, Thân, Dậu (lệch 4)
  'Thân': [0, 1, 4, 5, 8, 9],
  'Mão':  [2, 3, 6, 7, 10, 11],
  'Dậu':  [2, 3, 6, 7, 10, 11],
  'Thìn': [0, 1, 4, 5, 8, 9],
  'Tuất': [0, 1, 4, 5, 8, 9],
  'Tỵ':   [2, 3, 6, 7, 10, 11],
  'Hợi':  [2, 3, 6, 7, 10, 11],
};

// Thời gian tương ứng 12 chi (giờ)
const GIO_RANGE = [
  '23:00 - 01:00', // Tý
  '01:00 - 03:00', // Sửu
  '03:00 - 05:00', // Dần
  '05:00 - 07:00', // Mão
  '07:00 - 09:00', // Thìn
  '09:00 - 11:00', // Tỵ
  '11:00 - 13:00', // Ngọ
  '13:00 - 15:00', // Mùi
  '15:00 - 17:00', // Thân
  '17:00 - 19:00', // Dậu
  '19:00 - 21:00', // Tuất
  '21:00 - 23:00', // Hợi
];

/**
 * Tính giờ Hoàng Đạo / Hắc Đạo cho 1 ngày
 * @param jd Julian Day Number
 * @returns Mảng 12 giờ với thông tin hoàng đạo/hắc đạo
 */
export function getGioHoangDao(jd: number): GioHoangDao[] {
  const chiDayIndex = (jd + 1) % 12;
  const chiDay = DIA_CHI[chiDayIndex];
  const hoangDaoIndexes = HOANG_DAO_START[chiDay] || [0, 1, 4, 5, 8, 9];

  return DIA_CHI.map((chi, idx) => ({
    name: chi,
    time: GIO_RANGE[idx],
    isHoangDao: hoangDaoIndexes.includes(idx),
  }));
}
