/**
 * @internal
 * ============================================================================
 * MODULE LỊCH VẠN SỰ & LUẬN GIẢI NGÀY TOÀN DIỆN
 * Chuẩn kinh điển:
 * - Hiệp Kỷ Biện Phương Thư (Khâm Thiên Giám triều Nguyễn)
 * - Ngọc Hạp Thông Thư
 * - Khổng Minh Lục Diệu & Bách Sự Cát Hung
 * ============================================================================
 */

import { 
  NgayHoangDaoInfo, 
  LucDieuInfo, 
  TuoiXungInfo, 
  LuanGiaiNgayInfo 
} from '@/types/lunar';
import { DIA_CHI, THIEN_CAN } from '../constants';
import {
  isTamNuong,
  isNguyetKy,
  isSatChu,
  isThuTu,
  isNguyetPha
} from './core/trach-nhat';

// ============================================================================
// 1. NGÀY HOÀNG ĐẠO / HẮC ĐẠO (12 THẦN SÁT LUÂN CHUYỂN THEO THÁNG)
// ============================================================================

interface ThanSatConfig {
  name: string;
  starName: string;
  isHoangDao: boolean;
  yNghia: string;
}

const THAN_SAT_12: ThanSatConfig[] = [
  {
    name: 'Thanh Long Hoàng Đạo',
    starName: 'Thanh Long',
    isHoangDao: true,
    yNghia: 'Cát tinh đệ nhất, chủ về sự nghiệp thăng tiến, cầu tài đắc tài, cưới hỏi hưng thịnh.',
  },
  {
    name: 'Minh Đường Hoàng Đạo',
    starName: 'Minh Đường',
    isHoangDao: true,
    yNghia: 'Cát tinh chủ quý nhân phù trợ, văn chương sáng suốt, khai trương và giao thương đại lợi.',
  },
  {
    name: 'Thiên Hình Hắc Đạo',
    starName: 'Thiên Hình',
    isHoangDao: false,
    yNghia: 'Hung tinh chủ thị phi kiện tụng, tranh chấp bất hòa, kiêng cãi vã và xử lý việc công quyền.',
  },
  {
    name: 'Chu Tước Hắc Đạo',
    starName: 'Chu Tước',
    isHoangDao: false,
    yNghia: 'Hung tinh chủ khẩu thiệt tai tiếng, dễ sinh hiểu lầm, hao tán tiền của, kỵ tranh cãi lớn.',
  },
  {
    name: 'Kim Quỹ Hoàng Đạo',
    starName: 'Kim Quỹ',
    isHoangDao: true,
    yNghia: 'Cát tinh thần tài, kho vàng mở cửa, rất tốt cho cầu tài, nhập trạch, tích lũy tài sản.',
  },
  {
    name: 'Thiên Đức Hoàng Đạo',
    starName: 'Thiên Đức',
    isHoangDao: true,
    yNghia: 'Đức trời che chở, bách sự hóa giải điềm hung thành cát, vạn sự bình an thuận lợi.',
  },
  {
    name: 'Bạch Hổ Hắc Đạo',
    starName: 'Bạch Hổ',
    isHoangDao: false,
    yNghia: 'Chủ về sự cẩn trọng an toàn, theo quan niệm xưa kiêng kỵ việc động thổ đào móng và việc tang ma.',
  },
  {
    name: 'Ngọc Đường Hoàng Đạo',
    starName: 'Ngọc Đường',
    isHoangDao: true,
    yNghia: 'Sao sáng trên trời, danh lợi song thu, thích hợp cho thi cử, nhậm chức, khởi công tạo tác.',
  },
  {
    name: 'Thiên Lao Hắc Đạo',
    starName: 'Thiên Lao',
    isHoangDao: false,
    yNghia: 'Hung tinh chủ sự bế tắc, trì trệ dây dưa, không nên tiến hành kế hoạch dài hạn.',
  },
  {
    name: 'Huyền Vũ Hắc Đạo',
    starName: 'Huyền Vũ',
    isHoangDao: false,
    yNghia: 'Chủ về sự cẩn trọng trong tài chính, phòng ngừa thất thoát tài sản, nên thận trọng khi giao dịch tiền bạc lớn.',
  },
  {
    name: 'Tư Mệnh Hoàng Đạo',
    starName: 'Tư Mệnh',
    isHoangDao: true,
    yNghia: 'Cát tinh mang lại phúc lộc dồi dào, gia đạo an vui, vượng khí cho sức khỏe và công danh.',
  },
  {
    name: 'Câu Trận Hắc Đạo',
    starName: 'Câu Trận',
    isHoangDao: false,
    yNghia: 'Chủ về việc đi lại cần chậm rãi, thận trọng, dân gian khuyên nên cân nhắc kỹ trước khi chuyển dọn nhà cửa hoặc xuất hành xa.',
  },
];

/**
 * Khởi vị trí Thanh Long theo tháng âm lịch:
 * Tháng 1, 7: Thanh Long khởi từ Tý (0)
 * Tháng 2, 8: Thanh Long khởi từ Dần (2)
 * Tháng 3, 9: Thanh Long khởi từ Thìn (4)
 * Tháng 4, 10: Thanh Long khởi từ Ngọ (6)
 * Tháng 5, 11: Thanh Long khởi từ Thân (8)
 * Tháng 6, 12: Thanh Long khởi từ Tuất (10)
 */
const THANH_LONG_START_CHI: Record<number, number> = {
  1: 0, 7: 0,
  2: 2, 8: 2,
  3: 4, 9: 4,
  4: 6, 10: 6,
  5: 8, 11: 8,
  6: 10, 12: 10,
};

export function getNgayHoangDao(lunarMonth: number, dayChi: string): NgayHoangDaoInfo {
  const startChiIdx = THANH_LONG_START_CHI[lunarMonth] ?? 0;
  const dayChiIdx = DIA_CHI.indexOf(dayChi);
  const normalizedDayChiIdx = dayChiIdx !== -1 ? dayChiIdx : 0;
  
  const step = (normalizedDayChiIdx - startChiIdx + 12) % 12;
  const thanSat = THAN_SAT_12[step];

  return {
    name: thanSat.name,
    starName: thanSat.starName,
    isHoangDao: thanSat.isHoangDao,
    yNghia: thanSat.yNghia,
  };
}

// ============================================================================
// 2. KHỔNG MINH LỤC DIỆU (6 TRẠNG THÁI NGÀY)
// ============================================================================

const LUC_DIEU_LIST: Array<{
  name: 'Đại An' | 'Lưu Niên' | 'Tốc Hỷ' | 'Xích Khẩu' | 'Tiểu Cát' | 'Không Vong';
  isGood: boolean;
  yNghia: string;
  tho: string;
}> = [
  {
    name: 'Đại An',
    isGood: true,
    yNghia: 'Mọi việc bình an, ổn định vững chắc, mưu cầu việc gì cũng thuận lợi, gia đạo hòa thuận.',
    tho: 'Đại An gặp sự được an nhiên, Mưu sự hanh thông đón lộc tiền. Xuất hành bình an nơi xứ lạ, Gia đạo yên vui phúc tự biên.',
  },
  {
    name: 'Lưu Niên',
    isGood: false,
    yNghia: 'Công việc dây dưa chậm trễ, khó dứt điểm mau chóng. Nên kiên nhẫn, tránh nóng vội.',
    tho: 'Lưu Niên mưu sự khó thành ngay, Trì trệ dây dưa phải đợi ngày. Kiện tụng dây dưa hao tổn lực, Đề phòng khẩu thiệt đón tai bay.',
  },
  {
    name: 'Tốc Hỷ',
    isGood: true,
    yNghia: 'Điềm lành và niềm vui đến rất nhanh, việc gì cũng mau chóng có kết quả, tốt nhất buổi sáng.',
    tho: 'Tốc Hỷ điềm lành đến vội vàng, Cầu tài đắc lợi tựa kim ngân. Mưu sự buổi mai mau chóng đạt, Quý nhân tương trợ phước muôn phần.',
  },
  {
    name: 'Xích Khẩu',
    isGood: false,
    yNghia: 'Dễ phát sinh tranh luận, bất đồng quan điểm. Cần giữ gìn lời ăn tiếng nói hòa nhã, tránh tranh cãi không đáng có.',
    tho: 'Xích Khẩu đề phòng chuyện thị phi, Lời ăn tiếng nói giữ từ quy. Tranh giành kiện cáo nên dừng lại, Nhẫn nhịn cho qua khỏi họa suy.',
  },
  {
    name: 'Tiểu Cát',
    isGood: true,
    yNghia: 'Rất tốt lành và may mắn nhỏ liên tục, buôn may bán đắt, người đi có tin vui trở về.',
    tho: 'Tiểu Cát nhân duyên đón phước lành, Kinh doanh buôn bán sớm viên thành. Xuất hành đón lộc phương xa tới, Thân thể an khang nhẹ tựa mây.',
  },
  {
    name: 'Không Vong',
    isGood: false,
    yNghia: 'Mưu sự cần kiên trì và cân nhắc kỹ lưỡng, tránh đầu tư vội vã. Thích hợp cho nghỉ ngơi, an dưỡng tinh thần và hoàn thiện công việc cũ.',
    tho: 'Không Vong mưu sự hóa thành không, Tiền của ra đi tựa gió lồng. Tránh việc khai trương hay khởi tạo, Giữ mình thanh tịnh thoát long đong.',
  },
];

export function getLucDieu(lunarMonth: number, lunarDay: number): LucDieuInfo {
  // Khởi tháng: Tháng 1 khởi Đại An (0). Ngày khởi từ vị trí tháng đếm tới.
  const idx = ((lunarMonth + lunarDay - 2) % 6 + 6) % 6;
  return LUC_DIEU_LIST[idx];
}

// ============================================================================
// 3. NẠP ÂM LỤC THẬP HOA GIÁP KÈM Ý NGHĨA
// ============================================================================

const NAP_AM_FULL: Record<string, string> = {
  'Giáp Tý': 'Hải Trung Kim (Vàng trong biển)',
  'Ất Sửu': 'Hải Trung Kim (Vàng trong biển)',
  'Bính Dần': 'Lư Trung Hỏa (Lửa trong lò)',
  'Đinh Mão': 'Lư Trung Hỏa (Lửa trong lò)',
  'Mậu Thìn': 'Đại Lâm Mộc (Gỗ rừng già)',
  'Kỷ Tỵ': 'Đại Lâm Mộc (Gỗ rừng già)',
  'Canh Ngọ': 'Lộ Bàng Thổ (Đất ven đường)',
  'Tân Mùi': 'Lộ Bàng Thổ (Đất ven đường)',
  'Nhâm Thân': 'Kiếm Phong Kim (Vàng mũi kiếm)',
  'Quý Dậu': 'Kiếm Phong Kim (Vàng mũi kiếm)',
  'Giáp Tuất': 'Sơn Đầu Hỏa (Lửa trên núi)',
  'Ất Hợi': 'Sơn Đầu Hỏa (Lửa trên núi)',
  'Bính Tý': 'Giản Hạ Thủy (Nước dưới khe)',
  'Đinh Sửu': 'Giản Hạ Thủy (Nước dưới khe)',
  'Mậu Dần': 'Thành Đầu Thổ (Đất trên thành)',
  'Kỷ Mão': 'Thành Đầu Thổ (Đất trên thành)',
  'Canh Thìn': 'Bạch Lạp Kim (Vàng sáp ong)',
  'Tân Tỵ': 'Bạch Lạp Kim (Vàng sáp ong)',
  'Nhâm Ngọ': 'Dương Liễu Mộc (Gỗ cây liễu)',
  'Quý Mùi': 'Dương Liễu Mộc (Gỗ cây liễu)',
  'Giáp Thân': 'Tuyền Trung Thủy (Nước trong suối)',
  'Ất Dậu': 'Tuyền Trung Thủy (Nước trong suối)',
  'Bính Tuất': 'Ốc Thượng Thổ (Đất nóc nhà)',
  'Đinh Hợi': 'Ốc Thượng Thổ (Đất nóc nhà)',
  'Mậu Tý': 'Tích Lịch Hỏa (Lửa sấm sét)',
  'Kỷ Sửu': 'Tích Lịch Hỏa (Lửa sấm sét)',
  'Canh Dần': 'Tùng Bách Mộc (Gỗ cây tùng bách)',
  'Tân Mão': 'Tùng Bách Mộc (Gỗ cây tùng bách)',
  'Nhâm Thìn': 'Trường Lưu Thủy (Nước chảy dài)',
  'Quý Tỵ': 'Trường Lưu Thủy (Nước chảy dài)',
  'Giáp Ngọ': 'Sa Trung Kim (Vàng trong cát)',
  'Ất Mùi': 'Sa Trung Kim (Vàng trong cát)',
  'Bính Thân': 'Sơn Hạ Hỏa (Lửa dưới núi)',
  'Đinh Dậu': 'Sơn Hạ Hỏa (Lửa dưới núi)',
  'Mậu Tuất': 'Bình Địa Mộc (Gỗ đồng bằng)',
  'Kỷ Hợi': 'Bình Địa Mộc (Gỗ đồng bằng)',
  'Canh Tý': 'Bích Thượng Thổ (Đất trên vách)',
  'Tân Sửu': 'Bích Thượng Thổ (Đất trên vách)',
  'Nhâm Dần': 'Kim Bạch Kim (Vàng mạ bạc)',
  'Quý Mão': 'Kim Bạch Kim (Vàng mạ bạc)',
  'Giáp Thìn': 'Phú Đăng Hỏa (Lửa đèn to)',
  'Ất Tỵ': 'Phú Đăng Hỏa (Lửa đèn to)',
  'Bính Ngọ': 'Thiên Hà Thủy (Nước trên trời)',
  'Đinh Mùi': 'Thiên Hà Thủy (Nước trên trời)',
  'Mậu Thân': 'Đại Trạch Thổ (Đất nền nhà)',
  'Kỷ Dậu': 'Đại Trạch Thổ (Đất nền nhà)',
  'Canh Tuất': 'Thoa Xuyến Kim (Vàng trang sức)',
  'Tân Hợi': 'Thoa Xuyến Kim (Vàng trang sức)',
  'Nhâm Tý': 'Tang Đố Mộc (Gỗ cây dâu)',
  'Quý Sửu': 'Tang Đố Mộc (Gỗ cây dâu)',
  'Giáp Dần': 'Đại Khê Thủy (Nước khe lớn)',
  'Ất Mão': 'Đại Khê Thủy (Nước khe lớn)',
  'Bính Thìn': 'Sa Trung Thổ (Đất lẫn trong cát)',
  'Đinh Tỵ': 'Sa Trung Thổ (Đất lẫn trong cát)',
  'Mậu Ngọ': 'Thiên Thượng Hỏa (Lửa trên trời)',
  'Kỷ Mùi': 'Thiên Thượng Hỏa (Lửa trên trời)',
  'Canh Thân': 'Thạch Lựu Mộc (Gỗ cây lựu đá)',
  'Tân Dậu': 'Thạch Lựu Mộc (Gỗ cây lựu đá)',
  'Nhâm Tuất': 'Đại Hải Thủy (Nước biển lớn)',
  'Quý Hợi': 'Đại Hải Thủy (Nước biển lớn)',
};

export function getNapAmFull(canChiName: string): string {
  return NAP_AM_FULL[canChiName] || 'Ngũ hành nạp âm';
}

// ============================================================================
// 4. TUỔI XUNG KHẮC NGÀY VÀ THÁNG
// ============================================================================

const LUC_XUNG_MAP: Record<string, string> = {
  'Tý': 'Ngọ', 'Ngọ': 'Tý',
  'Sửu': 'Mùi', 'Mùi': 'Sửu',
  'Dần': 'Thân', 'Thân': 'Dần',
  'Mão': 'Dậu', 'Dậu': 'Mão',
  'Thìn': 'Tuất', 'Tuất': 'Thìn',
  'Tỵ': 'Hợi', 'Hợi': 'Tỵ',
};

// Thiên can tương khắc / xung
const THIEN_CAN_XUNG: Record<string, string[]> = {
  'Giáp': ['Canh', 'Mậu'],
  'Ất': ['Tân', 'Kỷ'],
  'Bính': ['Nhâm', 'Canh'],
  'Đinh': ['Quý', 'Tân'],
  'Mậu': ['Giáp', 'Nhâm'],
  'Kỷ': ['Ất', 'Quý'],
  'Canh': ['Bính', 'Giáp'],
  'Tân': ['Đinh', 'Ất'],
  'Nhâm': ['Mậu', 'Bính'],
  'Quý': ['Kỷ', 'Đinh'],
};

// Tương hình
const TUONG_HINH_MAP: Record<string, string[]> = {
  'Tý': ['Mão'],
  'Mão': ['Tý'],
  'Dần': ['Tỵ', 'Thân'],
  'Tỵ': ['Thân', 'Dần'],
  'Thân': ['Dần', 'Tỵ'],
  'Sửu': ['Tuất', 'Mùi'],
  'Tuất': ['Mùi', 'Sửu'],
  'Mùi': ['Sửu', 'Tuất'],
  'Thìn': ['Thìn'],
  'Ngọ': ['Ngọ'],
  'Dậu': ['Dậu'],
  'Hợi': ['Hợi'],
};

export function getTuoiXung(
  dayCan: string,
  dayChi: string,
  monthCan: string,
  monthChi: string
): TuoiXungInfo {
  // Xung Ngày: Chi xung + Can xung
  const chiXungDay = LUC_XUNG_MAP[dayChi] || '';
  const canXungDayList = THIEN_CAN_XUNG[dayCan] || ['Canh'];
  
  const ngayXungList: string[] = [];
  for (const c of canXungDayList) {
    if (chiXungDay) ngayXungList.push(`${c} ${chiXungDay}`);
  }

  // Bổ sung tuổi Tương Hình (nếu có)
  const hinhChi = TUONG_HINH_MAP[dayChi]?.[0];
  if (hinhChi && hinhChi !== dayChi && hinhChi !== chiXungDay) {
    ngayXungList.push(`${canXungDayList[0]} ${hinhChi}`);
  }

  // Xung Tháng: Chi xung tháng + Can xung tháng
  const chiXungThang = LUC_XUNG_MAP[monthChi] || '';
  const canXungThangList = THIEN_CAN_XUNG[monthCan] || ['Bính'];
  const thangXungList: string[] = [];
  for (const c of canXungThangList) {
    if (chiXungThang) thangXungList.push(`${c} ${chiXungThang}`);
  }

  return {
    ngay: Array.from(new Set(ngayXungList)),
    thang: Array.from(new Set(thangXungList)),
  };
}

// ============================================================================
// 5. CÁC NGÀY KỴ BÁCH SỰ DÂN GIAN & HẠC THẦN
// ============================================================================

/**
 * 13 Ngày Dương Công Kỵ Nhật cổ truyền:
 * Tháng 1: 13 | Tháng 2: 11 | Tháng 3: 9 | Tháng 4: 7 | Tháng 5: 5 | Tháng 6: 3
 * Tháng 7: 8, 29 | Tháng 8: 27 | Tháng 9: 25 | Tháng 10: 23 | Tháng 11: 21 | Tháng 12: 19
 */
const DUONG_CONG_KY: Record<number, number[]> = {
  1: [13],
  2: [11],
  3: [9],
  4: [7],
  5: [5],
  6: [3],
  7: [8, 29],
  8: [27],
  9: [25],
  10: [23],
  11: [21],
  12: [19],
};

export function getNgayKyDanGian(lunarDay: number, lunarMonth: number, dayChi: string): string[] {
  const warnings: string[] = [];

  if (isTamNuong(lunarDay)) {
    warnings.push(`Ngày Tam Nương (Mùng ${lunarDay} ÂL - dân gian khuyên thận trọng các việc trọng đại)`);
  }
  if (isNguyetKy(lunarDay)) {
    warnings.push(`Ngày Nguyệt Kỵ (Mùng ${lunarDay} ÂL - dân gian kiêng kỵ xuất hành xa hay khai trương)`);
  }
  if (isSatChu(lunarMonth, dayChi)) {
    warnings.push(`Ngày Sát Chủ tháng ${lunarMonth} (Chi ${dayChi} - dân gian kiêng kỵ động thổ, cưới hỏi)`);
  }
  if (isThuTu(lunarMonth, dayChi)) {
    warnings.push(`Ngày Thụ Tử tháng ${lunarMonth} (Chi ${dayChi} - quan niệm xưa khuyên hạn chế khởi sự việc lớn)`);
  }
  if (isNguyetPha(lunarMonth, dayChi)) {
    warnings.push(`Ngày Nguyệt Phá (Chi ngày ${dayChi} tương xung trực tiếp với Chi tháng)`);
  }

  const duongCongDays = DUONG_CONG_KY[lunarMonth] || [];
  if (duongCongDays.includes(lunarDay)) {
    warnings.push(`Ngày Dương Công Kỵ Nhật (Mùng ${lunarDay} ÂL - quan niệm xưa khuyên chuẩn bị kỹ lưỡng khi khởi sự)`);
  }

  return warnings;
}

/**
 * Hướng Hạc Thần (Phương vị hung xuất hành cần tránh theo ngày):
 * Tý, Sửu: Đông Nam | Dần, Mão: Đông Bắc | Thìn, Tỵ: Trên Trời (không kỵ đất)
 * Ngọ, Mùi: Tây Nam | Thân, Dậu: Tây Bắc | Tuất, Hợi: Dưới Đất (không kỵ đất)
 */
const HAC_THAN_MAP: Record<string, string> = {
  'Tý': 'Đông Nam (cần kiêng đi về hướng này)',
  'Sửu': 'Đông Nam (cần kiêng đi về hướng này)',
  'Dần': 'Đông Bắc (cần kiêng đi về hướng này)',
  'Mão': 'Đông Bắc (cần kiêng đi về hướng này)',
  'Thìn': 'Trên Trời (không phạm phương vị dưới đất)',
  'Tỵ': 'Trên Trời (không phạm phương vị dưới đất)',
  'Ngọ': 'Tây Nam (cần kiêng đi về hướng này)',
  'Mùi': 'Tây Nam (cần kiêng đi về hướng này)',
  'Thân': 'Tây Bắc (cần kiêng đi về hướng này)',
  'Dậu': 'Tây Bắc (cần kiêng đi về hướng này)',
  'Tuất': 'Dưới Đất (không phạm phương vị dưới đất)',
  'Hợi': 'Dưới Đất (không phạm phương vị dưới đất)',
};

export function getHacThan(dayChi: string): string {
  return HAC_THAN_MAP[dayChi] || 'Không kỵ phương vị xuất hành';
}

// ============================================================================
// 6. HỆ THỐNG LUẬN GIẢI CHI TIẾT VÀ TỔNG KẾT ĐÁNH GIÁ TỔNG QUAN
// ============================================================================

interface GenerateLuanGiaiParams {
  canChiDay: string;
  canChiMonth: string;
  canChiYear: string;
  dayCan: string;
  dayChi: string;
  napAm: string;
  ngayHoangDao: NgayHoangDaoInfo;
  lucDieu: LucDieuInfo;
  truc: string;
  sao28: {
    fullName: string;
    nature: 'Cát' | 'Hung' | 'Bình';
    nenLam: string[];
    kiengKy: string[];
    element: string;
    animal: string;
  };
  saoTot: string[];
  saoXau: string[];
  ngayKy: string[];
}

export function generateLuanGiaiNgay(params: GenerateLuanGiaiParams): LuanGiaiNgayInfo {
  const {
    canChiDay,
    napAm,
    ngayHoangDao,
    lucDieu,
    truc,
    sao28,
    saoTot,
    saoXau,
    ngayKy,
  } = params;

  // 1. Luận Can Chi & Ngũ Hành Nạp Âm
  const canChiNguHanh = `Ngày mang Can Chi ${canChiDay}, phối hợp nạp âm ${napAm}. Nạp âm này biểu trưng cho trường khí ổn định, tương hỗ đắc lực cho người biết nắm bắt thời cơ. Vận khí trong ngày có sự gắn kết hài hòa, tạo nền tảng vững vàng cho các dự định quan trọng.`;

  // 2. Luận Ngày Hoàng Đạo / Hắc Đạo & Lục Diệu
  const hoangDaoText = ngayHoangDao.isHoangDao
    ? `Tọa nhật là ${ngayHoangDao.name}, ${ngayHoangDao.yNghia.toLowerCase()}`
    : `Thuộc ${ngayHoangDao.name}, ${ngayHoangDao.yNghia.toLowerCase()}`;
  const lucDieuText = `Lục Diệu gặp ${lucDieu.name} (${lucDieu.isGood ? 'Cát lành' : 'Cần cẩn trọng'}): ${lucDieu.yNghia}`;
  const hoangDaoLucDieu = `${hoangDaoText} ${lucDieuText}`;

  // 3. Luận Trực & Tinh Tú (Nhị Thập Bát Tú)
  const trucText = `Trực nhật là Trực ${truc}.`;
  const sao28Text = `Tinh tú cai quản là sao ${sao28.fullName} (${sao28.animal} - ${sao28.element} Tú), là ${
    sao28.nature === 'Cát' ? 'Đại Cát Tinh phò trợ bách sự vượng phát' : sao28.nature === 'Hung' ? 'Hung tinh cần kiêng cữ thận trọng' : 'sao Bình hòa'
  }.`;
  const trucVaTinhTu = `${trucText} ${sao28Text} ${sao28.nenLam.length > 0 ? `Đắc lợi nhất cho các việc: ${sao28.nenLam.slice(0, 3).join(', ')}.` : ''}`;

  // 4. Luận Cát Tinh, Hung Tinh & Thần Sát
  const saoTotText = saoTot.length > 0 
    ? `Ngày được các cát tinh tụ hội: ${saoTot.slice(0, 4).join(', ')} chiếu rọi phúc khí.` 
    : 'Không có sao cát đặc biệt nổi bật.';
  const saoXauText = saoXau.length > 0 
    ? `Tuy nhiên có sự xuất hiện của hung tinh: ${saoXau.slice(0, 3).join(', ')}.` 
    : 'Ít hung tinh xâm phạm.';
  const kyText = ngayKy.length > 0 
    ? `Lưu ý theo dân gian: ${ngayKy.join('; ')}.` 
    : 'Ngày thanh bình, không vướng các ngày kiêng kỵ dân gian phổ biến.';
  const thanSat = `${saoTotText} ${saoXauText} ${kyText}`;

  // 5. TỔNG KẾT & ĐÁNH GIÁ TỔNG QUAN
  let score = 50;
  if (ngayHoangDao.isHoangDao) score += 20;
  else score -= 20;

  if (lucDieu.isGood) score += 15;
  else score -= 15;

  if (sao28.nature === 'Cát') score += 15;
  else if (sao28.nature === 'Hung') score -= 20;

  score += saoTot.length * 4;
  score -= saoXau.length * 5;

  if (ngayKy.length > 0) {
    score -= ngayKy.length * 20;
  }

  const finalScore = Math.max(10, Math.min(98, score));

  let danhGia: 'Đại Cát' | 'Cát Lành' | 'Bình Hòa' | 'Hung' | 'Đại Hung';
  let loiKhuyen: string;

  if (ngayKy.length > 0 || finalScore < 35) {
    danhGia = finalScore < 25 ? 'Đại Hung' : 'Hung';
    loiKhuyen = 'Theo quan niệm phong tục cổ truyền, ngày này có một số yếu tố xung kỵ hoặc trùng ngày kiêng kỵ dân gian. Với các công việc hệ trọng như khởi công xây dựng, cưới hỏi hay xuất hành đường xa, gia chủ nên cân nhắc sắp xếp kế hoạch cẩn trọng hoặc chọn thời điểm phù hợp hơn để tinh thần thêm an tâm. Các công việc sinh hoạt và lao động thường nhật vẫn diễn ra bình thường.';
  } else if (finalScore >= 75) {
    danhGia = finalScore >= 85 ? 'Đại Cát' : 'Cát Lành';
    loiKhuyen = 'Ngày tràn đầy sinh khí cát lợi, Hoàng Đạo quang minh và tinh tú phù trợ. Rất thích hợp tiến hành các việc trọng đại nhằm thu hút tài lộc, xây đắp hạnh phúc và mở rộng sự nghiệp. Nên chọn đúng khung giờ hoàng đạo để vạn sự hanh thông viên mãn.';
  } else {
    danhGia = 'Bình Hòa';
    loiKhuyen = 'Ngày có cát hung đan xen, trường khí ở mức bình hòa. Thích hợp cho các công việc sinh hoạt thường nhật, giao dịch nhỏ hoặc tu bổ dọn dẹp nhà cửa. Nếu cần tiến hành việc quan trọng, gia chủ có thể ưu tiên chọn các khung giờ hoàng đạo và hướng xuất hành thuận lợi trong ngày để công việc thêm phần hanh thông.';
  }

  // Danh sách việc tốt nhất & việc đại kỵ
  const hopViec: string[] = [];
  const kyViec: string[] = [];

  if (finalScore >= 60 && ngayKy.length === 0) {
    hopViec.push('Cầu tài lộc, giao dịch buôn bán');
    hopViec.push('Hội họp bạn bè, ký kết hợp đồng');
    hopViec.push('Xuất hành, cầu an, lễ bái');
  } else {
    hopViec.push('Làm việc thiện, cầu an hướng thiện');
    hopViec.push('Dọn dẹp nhà cửa, an dưỡng tinh thần');
  }

  if (ngayKy.length > 0 || finalScore < 50) {
    kyViec.push('Khởi công xây dựng, đào móng làm nhà');
    kyViec.push('Cưới hỏi, kết hôn, đính hôn');
    kyViec.push('Tranh chấp, kiện tụng, cho vay mượn tiền bạc');
  } else {
    kyViec.push('Tranh cãi thị phi, tham gia việc mạo hiểm');
  }

  return {
    canChiNguHanh,
    hoangDaoLucDieu,
    trucVaTinhTu,
    thanSat,
    tongKet: {
      danhGia,
      score: finalScore,
      loiKhuyen,
      hopViec,
      kyViec,
    },
  };
}
