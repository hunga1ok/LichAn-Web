/**
 * @internal
 * ============================================================================
 * KHÓA MÃ NGUỒN: THUẬT TOÁN TRẠCH NHẬT (XEM NGÀY TỐT XẤU) CHUYÊN SÂU
 * Căn cứ theo:
 * - Hiệp Kỷ Biện Phương Thư (Khâm Thiên Giám triều Nguyễn)
 * - Ngọc Hạp Thông Thư (Cổ bản trạch cát)
 * ============================================================================
 */

import { DIA_CHI, THIEN_CAN } from '../../constants';

// ============================================================================
// 1. CÁC NGÀY ĐẠI HUNG TRĂM SỰ ĐỀU KIÊNG (HARD TABOOS)
// ============================================================================

/**
 * Ngày Tam Nương (Nguyệt kỵ dân gian): Mùng 3, 7, 13, 18, 22, 27 âm lịch
 */
export function isTamNuong(lunarDay: number): boolean {
  return [3, 7, 13, 18, 22, 27].includes(lunarDay);
}

/**
 * Ngày Nguyệt Kỵ (Nửa đời nửa đoạn): Mùng 5, 14, 23 âm lịch (Tổng số = 5)
 */
export function isNguyetKy(lunarDay: number): boolean {
  return [5, 14, 23].includes(lunarDay);
}

/**
 * Bảng ngày Sát Chủ trong 12 tháng âm lịch (Ngọc Hạp Thông Thư):
 * Tháng 1: Tỵ | Tháng 2: Tý | Tháng 3: Mùi | Tháng 4: Mão
 * Tháng 5: Thân | Tháng 6: Tuất | Tháng 7: Hợi | Tháng 8: Sửu
 * Tháng 9: Ngọ | Tháng 10: Dậu | Tháng 11: Dần | Tháng 12: Thìn
 */
const SAT_CHU_THANG: Record<number, string> = {
  1: 'Tỵ', 2: 'Tý', 3: 'Mùi', 4: 'Mão',
  5: 'Thân', 6: 'Tuất', 7: 'Hợi', 8: 'Sửu',
  9: 'Ngọ', 10: 'Dậu', 11: 'Dần', 12: 'Thìn',
};

export function isSatChu(lunarMonth: number, dayChi: string): boolean {
  return SAT_CHU_THANG[lunarMonth] === dayChi;
}

/**
 * Bảng ngày Thụ Tử trong 12 tháng âm lịch (Hiệp Kỷ Biện Phương Thư):
 * Tháng 1: Tuất | Tháng 2: Thìn | Tháng 3: Hợi | Tháng 4: Tỵ
 * Tháng 5: Tý | Tháng 6: Ngọ | Tháng 7: Sửu | Tháng 8: Mùi
 * Tháng 9: Dần | Tháng 10: Thân | Tháng 11: Mão | Tháng 12: Dậu
 */
const THU_TU_THANG: Record<number, string> = {
  1: 'Tuất', 2: 'Thìn', 3: 'Hợi', 4: 'Tỵ',
  5: 'Tý', 6: 'Ngọ', 7: 'Sửu', 8: 'Mùi',
  9: 'Dần', 10: 'Thân', 11: 'Mão', 12: 'Dậu',
};

export function isThuTu(lunarMonth: number, dayChi: string): boolean {
  return THU_TU_THANG[lunarMonth] === dayChi;
}

/**
 * Ngày Nguyệt Phá: Chi của ngày xung trực tiếp với Chi của tháng
 * Tháng 1 (Dần) xung Thân | Tháng 2 (Mão) xung Dậu | Tháng 3 (Thìn) xung Tuất
 * Tháng 4 (Tỵ) xung Hợi | Tháng 5 (Ngọ) xung Tý | Tháng 6 (Mùi) xung Sửu
 */
const DIA_CHI_XUNG: Record<string, string> = {
  'Tý': 'Ngọ', 'Ngọ': 'Tý',
  'Sửu': 'Mùi', 'Mùi': 'Sửu',
  'Dần': 'Thân', 'Thân': 'Dần',
  'Mão': 'Dậu', 'Dậu': 'Mão',
  'Thìn': 'Tuất', 'Tuất': 'Thìn',
  'Tỵ': 'Hợi', 'Hợi': 'Tỵ',
};

export function isNguyetPha(lunarMonth: number, dayChi: string): boolean {
  const monthChi = DIA_CHI[(lunarMonth + 1) % 12];
  return DIA_CHI_XUNG[monthChi] === dayChi;
}

// ============================================================================
// 2. NGÀY BẤT TƯƠNG (ÂM DƯƠNG BẤT TƯƠNG - ĐẠI CÁT CƯỚI HỎI)
// ============================================================================

/**
 * Bảng tra Ngày Bất Tương theo từng tháng âm lịch (Ngọc Hạp Thông Thư):
 * Ngày Bất Tương là ngày Âm Dương hòa hợp, không khắc chế nhau, là ngày tốt nhất cho việc kết hôn.
 */
const BAT_TUONG_TABLE: Record<number, string[]> = {
  1: ['Bính Dần', 'Đinh Mão', 'Bính Tý', 'Đinh Sửu', 'Mậu Dần', 'Kỷ Mão', 'Canh Dần', 'Tân Mão'],
  2: ['Ất Sửu', 'Bính Dần', 'Đinh Mão', 'Kỷ Dậu', 'Canh Tuất', 'Tân Hợi', 'Ất Tỵ', 'Bính Ngọ'],
  3: ['Ất Sửu', 'Bính Tý', 'Đinh Mão', 'Mậu Dần', 'Kỷ Tỵ', 'Canh Ngọ', 'Tân Mùi'],
  4: ['Giáp Tý', 'Ất Sửu', 'Bính Thìn', 'Đinh Tỵ', 'Mậu Ngọ', 'Kỷ Mùi', 'Canh Thân'],
  5: ['Ất Tỵ', 'Bính Ngọ', 'Đinh Mùi', 'Mậu Thân', 'Kỷ Dậu', 'Canh Tuất'],
  6: ['Bính Thìn', 'Đinh Tỵ', 'Mậu Ngọ', 'Kỷ Mùi', 'Canh Thân', 'Tân Dậu'],
  7: ['Ất Sửu', 'Bính Tý', 'Đinh Sửu', 'Mậu Thân', 'Kỷ Dậu', 'Canh Tuất', 'Tân Hợi'],
  8: ['Giáp Tý', 'Ất Sửu', 'Bính Dần', 'Đinh Mão', 'Mậu Ngọ', 'Kỷ Mùi', 'Canh Thân'],
  9: ['Bính Dần', 'Đinh Mão', 'Mậu Thìn', 'Kỷ Tỵ', 'Canh Ngọ', 'Tân Mùi'],
  10: ['Ất Tỵ', 'Bính Ngọ', 'Đinh Mùi', 'Mậu Thân', 'Kỷ Dậu', 'Canh Tuất', 'Tân Hợi'],
  11: ['Giáp Tý', 'Ất Sửu', 'Bính Thìn', 'Đinh Tỵ', 'Mậu Ngọ', 'Kỷ Mùi'],
  12: ['Bính Thìn', 'Đinh Tỵ', 'Mậu Ngọ', 'Kỷ Mùi', 'Canh Thân', 'Tân Dậu'],
};

export function isBatTuong(lunarMonth: number, canChiDay: string): boolean {
  const list = BAT_TUONG_TABLE[lunarMonth] || [];
  return list.includes(canChiDay);
}

// ============================================================================
// 3. XUẤT HÀNH: HƯỚNG HỶ THẦN, TÀI THẦN & GIỜ LÝ THUẦN PHONG
// ============================================================================

/**
 * Tọa độ phương vị Hỷ Thần và Tài Thần theo Thiên Can của ngày (Hiệp Kỷ Biện Phương Thư)
 */
const PHUONG_VI_HY_THAN: Record<string, string> = {
  'Giáp': 'Đông Bắc', 'Kỷ': 'Đông Bắc',
  'Ất': 'Tây Bắc', 'Canh': 'Tây Bắc',
  'Bính': 'Tây Nam', 'Tân': 'Tây Nam',
  'Đinh': 'Chính Nam', 'Nhâm': 'Chính Nam',
  'Mậu': 'Đông Nam', 'Quý': 'Đông Nam',
};

const PHUONG_VI_TAI_THAN: Record<string, string> = {
  'Giáp': 'Đông Nam', 'Ất': 'Chính Đông',
  'Bính': 'Chính Đông', 'Đinh': 'Chính Nam',
  'Mậu': 'Chính Bắc', 'Kỷ': 'Chính Nam',
  'Canh': 'Chính Đông', 'Tân': 'Tây Nam',
  'Nhâm': 'Chính Tây', 'Quý': 'Chính Bắc',
};

export function getPhuongViXuatHanh(dayCan: string): { hyThan: string; taiThan: string } {
  return {
    hyThan: PHUONG_VI_HY_THAN[dayCan] || 'Đông Bắc',
    taiThan: PHUONG_VI_TAI_THAN[dayCan] || 'Chính Nam',
  };
}

/**
 * 6 Khung Giờ Xuất Hành theo Lý Thuần Phong:
 * 1. Đại An (Cát: Mọi sự bình an, cầu tài đi hướng Tây Nam)
 * 2. Tốc Hỷ (Cát: Gặp may mắn, điềm lành tới mau chóng)
 * 3. Tiểu Cát (Cát: Buôn bán có lời, vạn sự thuận lợi)
 * 4. Lưu Niên (Hung: Mọi việc dây dưa, chậm chạp)
 * 5. Xích Khẩu (Hung: Dễ sinh cãi cọ, khẩu thiệt)
 * 6. Không Vong (Đại Hung: Cầu tài không thành, dễ thất thoát)
 */
export interface GioLyThuanPhong {
  canhGio: string;
  timeRange: string;
  tenGio: 'Đại An' | 'Tốc Hỷ' | 'Tiểu Cát' | 'Lưu Niên' | 'Xích Khẩu' | 'Không Vong';
  isGood: boolean;
  yNghia: string;
}

const LY_THUAN_PHONG_ORDER: Array<'Đại An' | 'Lưu Niên' | 'Tốc Hỷ' | 'Xích Khẩu' | 'Tiểu Cát' | 'Không Vong'> = [
  'Đại An', 'Lưu Niên', 'Tốc Hỷ', 'Xích Khẩu', 'Tiểu Cát', 'Không Vong'
];

const LY_THUAN_PHONG_DESC: Record<string, { isGood: boolean; desc: string }> = {
  'Đại An': { isGood: true, desc: 'Mọi việc bình an, phòng ngừa rủi ro, cầu tài hanh thông hướng Tây Nam.' },
  'Tốc Hỷ': { isGood: true, desc: 'Điềm lành đến nhanh, mưu sự đại vượng, nên xuất hành vào buổi sáng.' },
  'Tiểu Cát': { isGood: true, desc: 'Rất tốt lành, kinh doanh có lãi, phụ nữ có tin mừng, người đi sắp về.' },
  'Lưu Niên': { isGood: false, desc: 'Công việc trì trệ kéo dài, kiện cáo nên hoãn, hao tốn tiền của.' },
  'Xích Khẩu': { isGood: false, desc: 'Dễ xảy ra tranh cãi, hiểu lầm, tai bay vạ gió, nên giữ lời ăn tiếng nói.' },
  'Không Vong': { isGood: false, desc: 'Cầu tài bất lợi, mưu sự khó thành, nên tránh xuất hành việc lớn.' },
};

const CANH_GIO_TIMES: { name: string; time: string }[] = [
  { name: 'Tý', time: '23:00 - 01:00' },
  { name: 'Sửu', time: '01:00 - 03:00' },
  { name: 'Dần', time: '03:00 - 05:00' },
  { name: 'Mão', time: '05:00 - 07:00' },
  { name: 'Thìn', time: '07:00 - 09:00' },
  { name: 'Tỵ', time: '09:00 - 11:00' },
  { name: 'Ngọ', time: '11:00 - 13:00' },
  { name: 'Mùi', time: '13:00 - 15:00' },
  { name: 'Thân', time: '15:00 - 17:00' },
  { name: 'Dậu', time: '17:00 - 19:00' },
  { name: 'Tuất', time: '19:00 - 21:00' },
  { name: 'Hợi', time: '21:00 - 23:00' },
];

export function getGioLyThuanPhong(lunarDay: number, lunarMonth: number): GioLyThuanPhong[] {
  // Giờ Tý khởi theo công thức: (lunarMonth + lunarDay - 2) % 6
  const startIdx = (lunarMonth + lunarDay - 2 + 600) % 6;

  return CANH_GIO_TIMES.map((cg, i) => {
    const idx = (startIdx + i) % 6;
    const tenGio = LY_THUAN_PHONG_ORDER[idx];
    const info = LY_THUAN_PHONG_DESC[tenGio];
    return {
      canhGio: cg.name,
      timeRange: cg.time,
      tenGio,
      isGood: info.isGood,
      yNghia: info.desc,
    };
  });
}
