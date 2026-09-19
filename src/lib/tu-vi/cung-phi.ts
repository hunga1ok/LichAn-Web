/**
 * Bát Trạch Minh Kính & Cung Phi Bát Tự
 * ============================================================================
 * Xác định Cung Mệnh (Cung Phi), Nhóm Đông/Tây Tứ Mệnh,
 * 4 Hướng Cát (Sinh Khí, Thiên Y, Diên Niên, Phục Vị) và
 * 4 Hướng Hung (Tuyệt Mệnh, Ngũ Quỷ, Lục Sát, Họa Hại).
 * ============================================================================
 */

export type CungPhiName = 'Càn' | 'Khảm' | 'Cấn' | 'Chấn' | 'Tốn' | 'Ly' | 'Khôn' | 'Đoài';
export type BatTrachGroup = 'Đông Tứ Mệnh' | 'Tây Tứ Mệnh';

export interface HuongBatTrach {
  huong: string; // ví dụ: 'Đông', 'Tây Bắc'
  loai: 'Sinh Khí' | 'Thiên Y' | 'Diên Niên' | 'Phục Vị' | 'Tuyệt Mệnh' | 'Ngũ Quỷ' | 'Lục Sát' | 'Họa Hại';
  isGood: boolean;
  mucDo: string; // 'Đại Cát', 'Thượng Cát', 'Đại Hung', v.v.
  yNghia: string;
}

export interface CungPhiInfo {
  cung: CungPhiName;
  hanh: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
  nhomMenh: BatTrachGroup;
  huongHop: string[];
  huongKhongHop: string[];
  chiTietHuong: HuongBatTrach[];
  mauHop: string[];
  mauKy: string[];
}

const BAT_TRACH_MAP: Record<CungPhiName, {
  hanh: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
  nhom: BatTrachGroup;
  huong: {
    'Sinh Khí': string;
    'Thiên Y': string;
    'Diên Niên': string;
    'Phục Vị': string;
    'Tuyệt Mệnh': string;
    'Ngũ Quỷ': string;
    'Lục Sát': string;
    'Họa Hại': string;
  };
  mauHop: string[];
  mauKy: string[];
}> = {
  'Càn': {
    hanh: 'Kim',
    nhom: 'Tây Tứ Mệnh',
    huong: {
      'Sinh Khí': 'Tây',
      'Thiên Y': 'Đông Bắc',
      'Diên Niên': 'Tây Nam',
      'Phục Vị': 'Tây Bắc',
      'Tuyệt Mệnh': 'Nam',
      'Ngũ Quỷ': 'Đông',
      'Lục Sát': 'Bắc',
      'Họa Hại': 'Đông Nam',
    },
    mauHop: ['Trắng', 'Xám', 'Ghi', 'Vàng', 'Nâu đất'],
    mauKy: ['Đỏ', 'Hồng', 'Tím', 'Cam'],
  },
  'Khảm': {
    hanh: 'Thủy',
    nhom: 'Đông Tứ Mệnh',
    huong: {
      'Sinh Khí': 'Đông Nam',
      'Thiên Y': 'Đông',
      'Diên Niên': 'Nam',
      'Phục Vị': 'Bắc',
      'Tuyệt Mệnh': 'Tây Nam',
      'Ngũ Quỷ': 'Đông Bắc',
      'Lục Sát': 'Tây Bắc',
      'Họa Hại': 'Tây',
    },
    mauHop: ['Đen', 'Xanh nước biển', 'Trắng', 'Xám'],
    mauKy: ['Vàng', 'Nâu đất'],
  },
  'Cấn': {
    hanh: 'Thổ',
    nhom: 'Tây Tứ Mệnh',
    huong: {
      'Sinh Khí': 'Tây Nam',
      'Thiên Y': 'Tây Bắc',
      'Diên Niên': 'Tây',
      'Phục Vị': 'Đông Bắc',
      'Tuyệt Mệnh': 'Đông Nam',
      'Ngũ Quỷ': 'Bắc',
      'Lục Sát': 'Đông',
      'Họa Hại': 'Nam',
    },
    mauHop: ['Vàng', 'Nâu đất', 'Đỏ', 'Hồng', 'Tím'],
    mauKy: ['Xanh lá cây', 'Xanh lục'],
  },
  'Chấn': {
    hanh: 'Mộc',
    nhom: 'Đông Tứ Mệnh',
    huong: {
      'Sinh Khí': 'Nam',
      'Thiên Y': 'Bắc',
      'Diên Niên': 'Đông Nam',
      'Phục Vị': 'Đông',
      'Tuyệt Mệnh': 'Tây',
      'Ngũ Quỷ': 'Tây Bắc',
      'Lục Sát': 'Đông Bắc',
      'Họa Hại': 'Tây Nam',
    },
    mauHop: ['Xanh lá cây', 'Đen', 'Xanh nước biển'],
    mauKy: ['Trắng', 'Xám', 'Ghi'],
  },
  'Tốn': {
    hanh: 'Mộc',
    nhom: 'Đông Tứ Mệnh',
    huong: {
      'Sinh Khí': 'Bắc',
      'Thiên Y': 'Nam',
      'Diên Niên': 'Đông',
      'Phục Vị': 'Đông Nam',
      'Tuyệt Mệnh': 'Đông Bắc',
      'Ngũ Quỷ': 'Tây Nam',
      'Lục Sát': 'Tây',
      'Họa Hại': 'Tây Bắc',
    },
    mauHop: ['Xanh lá', 'Xanh lục', 'Đen', 'Xanh dương'],
    mauKy: ['Trắng', 'Ghi', 'Bạc'],
  },
  'Ly': {
    hanh: 'Hỏa',
    nhom: 'Đông Tứ Mệnh',
    huong: {
      'Sinh Khí': 'Đông',
      'Thiên Y': 'Đông Nam',
      'Diên Niên': 'Bắc',
      'Phục Vị': 'Nam',
      'Tuyệt Mệnh': 'Tây Bắc',
      'Ngũ Quỷ': 'Tây',
      'Lục Sát': 'Tây Nam',
      'Họa Hại': 'Đông Bắc',
    },
    mauHop: ['Đỏ', 'Hồng', 'Tím', 'Xanh lá cây'],
    mauKy: ['Đen', 'Xanh nước biển'],
  },
  'Khôn': {
    hanh: 'Thổ',
    nhom: 'Tây Tứ Mệnh',
    huong: {
      'Sinh Khí': 'Đông Bắc',
      'Thiên Y': 'Tây',
      'Diên Niên': 'Tây Bắc',
      'Phục Vị': 'Tây Nam',
      'Tuyệt Mệnh': 'Bắc',
      'Ngũ Quỷ': 'Đông Nam',
      'Lục Sát': 'Nam',
      'Họa Hại': 'Đông',
    },
    mauHop: ['Vàng', 'Nâu đất', 'Đỏ', 'Hồng', 'Cam'],
    mauKy: ['Xanh lá cây', 'Xanh nõn chuối'],
  },
  'Đoài': {
    hanh: 'Kim',
    nhom: 'Tây Tứ Mệnh',
    huong: {
      'Sinh Khí': 'Tây Bắc',
      'Thiên Y': 'Tây Nam',
      'Diên Niên': 'Đông Bắc',
      'Phục Vị': 'Tây',
      'Tuyệt Mệnh': 'Đông',
      'Ngũ Quỷ': 'Nam',
      'Lục Sát': 'Đông Nam',
      'Họa Hại': 'Bắc',
    },
    mauHop: ['Trắng', 'Xám', 'Bạc', 'Vàng', 'Nâu'],
    mauKy: ['Đỏ', 'Hồng', 'Tím'],
  },
};

const HUONG_MEANING: Record<string, { mucDo: string; yNghia: string; isGood: boolean }> = {
  'Sinh Khí': { mucDo: 'Đại Cát', yNghia: 'Thu hút tài lộc, công danh rực rỡ, phát triển sự nghiệp đỉnh cao.', isGood: true },
  'Thiên Y': { mucDo: 'Thượng Cát', yNghia: 'Cải thiện sức khỏe, trường thọ, gặp quý nhân nâng đỡ chở che.', isGood: true },
  'Diên Niên': { mucDo: 'Thứ Cát', yNghia: 'Gia đạo hòa thuận, tình duyên gắn kết bền chặt, ngoại giao thuận lợi.', isGood: true },
  'Phục Vị': { mucDo: 'Tiểu Cát', yNghia: 'Củng cố sức mạnh tinh thần, bản thân tiến bộ, thi cử đỗ đạt may mắn.', isGood: true },
  'Tuyệt Mệnh': { mucDo: 'Đại Hung', yNghia: 'Phá sản, bệnh tật nặng nề, tai nạn nguy hiểm, hao tán gia sản.', isGood: false },
  'Ngũ Quỷ': { mucDo: 'Đại Hung', yNghia: 'Mất nguồn thu nhập, thất nghiệp, tranh chấp thị phi, hỏa hoạn trộm cắp.', isGood: false },
  'Lục Sát': { mucDo: 'Thứ Hung', yNghia: 'Xáo trộn quan hệ tình cảm, kiện tụng thù hận, gia đình bất hòa lục đục.', isGood: false },
  'Họa Hại': { mucDo: 'Tiểu Hung', yNghia: 'Thất bại trong công việc, không may mắn, thị phi và tiểu nhân gièm pha.', isGood: false },
};

/**
 * Tính Cung Phi theo năm sinh âm lịch và giới tính
 */
export function getCungPhi(lunarYear: number, gender: 'nam' | 'nu'): CungPhiInfo {
  // Tính tổng các chữ số năm sinh
  let sum = 0;
  let tempYear = lunarYear;
  while (tempYear > 0) {
    sum += tempYear % 10;
    tempYear = Math.floor(tempYear / 10);
  }
  let singleDigit = ((sum - 1) % 9) + 1;

  let cungNumber: number;

  if (lunarYear < 2000) {
    // Thế kỷ 20 (1900 - 1999)
    if (gender === 'nam') {
      cungNumber = 10 - singleDigit;
      if (cungNumber === 0) cungNumber = 9;
    } else {
      cungNumber = singleDigit + 5;
      if (cungNumber > 9) cungNumber -= 9;
    }
  } else {
    // Thế kỷ 21 (2000 trở đi)
    if (gender === 'nam') {
      cungNumber = 9 - singleDigit;
      if (cungNumber <= 0) cungNumber += 9;
    } else {
      cungNumber = singleDigit + 6;
      if (cungNumber > 9) cungNumber -= 9;
    }
  }

  // Số 5 Lạc thư: Nam hóa Khôn (2), Nữ hóa Cấn (8)
  if (cungNumber === 5) {
    cungNumber = gender === 'nam' ? 2 : 8;
  }

  // Bảng số Cung theo Lạc Thư:
  // 1: Khảm, 2: Khôn, 3: Chấn, 4: Tốn, 6: Càn, 7: Đoài, 8: Cấn, 9: Ly
  const numberToCung: Record<number, CungPhiName> = {
    1: 'Khảm',
    2: 'Khôn',
    3: 'Chấn',
    4: 'Tốn',
    6: 'Càn',
    7: 'Đoài',
    8: 'Cấn',
    9: 'Ly',
  };

  const cung = numberToCung[cungNumber] || 'Càn';
  const config = BAT_TRACH_MAP[cung];

  const chiTietHuong: HuongBatTrach[] = (Object.keys(config.huong) as Array<keyof typeof config.huong>).map((k) => ({
    loai: k as any,
    huong: config.huong[k],
    isGood: HUONG_MEANING[k].isGood,
    mucDo: HUONG_MEANING[k].mucDo,
    yNghia: HUONG_MEANING[k].yNghia,
  }));

  const huongHop = chiTietHuong.filter(h => h.isGood).map(h => `${h.huong} (${h.loai})`);
  const huongKhongHop = chiTietHuong.filter(h => !h.isGood).map(h => `${h.huong} (${h.loai})`);

  return {
    cung,
    hanh: config.hanh,
    nhomMenh: config.nhom,
    huongHop,
    huongKhongHop,
    chiTietHuong,
    mauHop: config.mauHop,
    mauKy: config.mauKy,
  };
}
