/**
 * Tính sao tốt trong ngày dựa trên ngày và tháng âm lịch
 * Đây là phiên bản đơn giản hóa, dùng pattern theo ngày âm lịch
 */

const SAO_TOT_LIST = [
  'Thiên đức', 'Nguyệt đức', 'Thiên ân', 'Thiên mã',
  'Phúc tinh', 'Lộc mã', 'Thiên quý', 'Ngọc đường',
  'Thánh tâm', 'Ngũ phú', 'Kim đường', 'Thiên phú',
  'Sinh khí', 'Ích hậu', 'Thanh long', 'Minh đường',
  'Trừ thần', 'Vương nhật', 'Dân nhật', 'Thiên thành',
];

const SAO_XAU_LIST = [
  'Thiên hình', 'Ngũ ly', 'Bạch hổ', 'Du họa',
  'Huyết chi', 'Địa nang', 'Thổ phủ', 'Nguyệt hình',
  'Nguyệt hại', 'Tứ kị', 'Ngũ mộ', 'Trùng tang',
  'Phục đoạn', 'Thiên cương', 'Kiếp sát', 'Tai sát',
];

/**
 * Lấy danh sách sao tốt dựa trên ngày + tháng âm lịch
 */
export function getSaoTot(lunarDay: number, lunarMonth: number): string[] {
  // Thuật toán đơn giản: chọn sao dựa trên pattern ngày/tháng
  const seed = (lunarDay * 7 + lunarMonth * 13) % SAO_TOT_LIST.length;
  const count = 2 + (lunarDay % 3); // 2-4 sao tốt
  const result: string[] = [];
  for (let i = 0; i < count && i < SAO_TOT_LIST.length; i++) {
    result.push(SAO_TOT_LIST[(seed + i * 3) % SAO_TOT_LIST.length]);
  }
  return result;
}

/**
 * Lấy danh sách sao xấu dựa trên ngày + tháng âm lịch
 */
export function getSaoXau(lunarDay: number, lunarMonth: number): string[] {
  const seed = (lunarDay * 5 + lunarMonth * 11) % SAO_XAU_LIST.length;
  const count = 1 + (lunarDay % 3); // 1-3 sao xấu
  const result: string[] = [];
  for (let i = 0; i < count && i < SAO_XAU_LIST.length; i++) {
    result.push(SAO_XAU_LIST[(seed + i * 4) % SAO_XAU_LIST.length]);
  }
  return result;
}
