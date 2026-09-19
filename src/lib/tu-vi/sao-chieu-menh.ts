/**
 * Bảng Cửu Diệu Sao Chiếu Mệnh Niên Hạn
 * ============================================================================
 * Tính toán 9 sao chiếu mệnh theo tuổi mụ và giới tính:
 * La Hầu, Thổ Tú, Thủy Diệu, Thái Bạch, Thái Dương, Vân Hớn, Kế Đô, Thái Âm, Mộc Đức.
 * ============================================================================
 */

export type SaoNature = 'CAT' | 'HUNG' | 'TRUNG';

export interface SaoChieuMenh {
  name: string;
  hanh: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
  nature: SaoNature;
  natureLabel: string;
  description: string;
  kyThang: string; // Tháng kỵ nhất trong năm
  hopThang: string; // Tháng tốt nhất
  cungSao: {
    ngayCung: string; // Ngày cúng dâng sao âm lịch hàng tháng
    gioCung: string; // Giờ tốt cúng dâng sao
    huongLay: string; // Hướng lạy
    soDen: number; // Số ngọn đèn/nến bài trí
    baiVi: string; // Chữ ghi trên bài vị
  };
}

export const CUU_DIEU_INFO: Record<string, SaoChieuMenh> = {
  'La Hầu': {
    name: 'La Hầu',
    hanh: 'Kim',
    nature: 'HUNG',
    natureLabel: 'Hung Tinh',
    description: 'Khẩu thiệt tinh quân, chủ về khẩu thiệt, thị phi, tai tiếng, tranh chấp pháp luật và bệnh tật tai mắt, máu huyết.',
    kyThang: 'Tháng Giêng và tháng 7 âm lịch',
    hopThang: 'Không có tháng hợp đặc biệt',
    cungSao: {
      ngayCung: 'Ngày mùng 8 âm lịch hàng tháng',
      gioCung: '21:00 đến 23:00 (giờ Hợi)',
      huongLay: 'Chính Bắc',
      soDen: 9,
      baiVi: 'Thiên Cung Thần Thủ La Hầu Tinh Quân',
    },
  },
  'Thổ Tú': {
    name: 'Thổ Tú',
    hanh: 'Thổ',
    nature: 'TRUNG',
    natureLabel: 'Trung Tinh (Bán cát bán hung)',
    description: 'Chủ về bất an trong tâm trí, gia đạo hay trắc trở, xuất hành đi xa không thuận, có tiểu nhân gièm pha hãm hại.',
    kyThang: 'Tháng 4 và tháng 8 âm lịch',
    hopThang: 'Tháng cuối năm',
    cungSao: {
      ngayCung: 'Ngày 19 âm lịch hàng tháng',
      gioCung: '21:00 đến 23:00 (giờ Hợi)',
      huongLay: 'Chính Tây',
      soDen: 5,
      baiVi: 'Trung Ương Mậu Kỷ Thổ Đức Tinh Quân',
    },
  },
  'Thủy Diệu': {
    name: 'Thủy Diệu',
    hanh: 'Thủy',
    nature: 'CAT',
    natureLabel: 'Cát Tinh (Chủ về tài lộc)',
    description: 'Phước lộc tinh quân, tài lộc dồi dào, sự nghiệp thăng tiến, có hỷ sự. Tuy nhiên kỵ đường sông nước và khẩu thiệt nhỏ với nữ giới.',
    kyThang: 'Tháng 4 và tháng 8 âm lịch (kỵ sông nước)',
    hopThang: 'Tháng Giêng, tháng 3, tháng 9 âm lịch',
    cungSao: {
      ngayCung: 'Ngày 21 âm lịch hàng tháng',
      gioCung: '19:00 đến 21:00 (giờ Tuất)',
      huongLay: 'Chính Bắc',
      soDen: 7,
      baiVi: 'Bắc Phương Nhâm Quý Thủy Đức Tinh Quân',
    },
  },
  'Thái Bạch': {
    name: 'Thái Bạch',
    hanh: 'Kim',
    nature: 'HUNG',
    natureLabel: 'Đại Hung Tinh (Hao tài tốn của)',
    description: 'Triều dương tinh quân: "Thái Bạch quét sạch cửa nhà". Hao tổn tiền của, kinh doanh trắc trở, đề phòng tiểu nhân quấy phá và bệnh nội tạng.',
    kyThang: 'Tháng 2, tháng 5, tháng 8 âm lịch',
    hopThang: 'Không có',
    cungSao: {
      ngayCung: 'Ngày 15 âm lịch hàng tháng',
      gioCung: '19:00 đến 21:00 (giờ Tuất)',
      huongLay: 'Chính Tây',
      soDen: 8,
      baiVi: 'Tây Phương Canh Tân Kim Đức Tinh Quân',
    },
  },
  'Thái Dương': {
    name: 'Thái Dương',
    hanh: 'Hỏa',
    nature: 'CAT',
    natureLabel: 'Đại Cát Tinh (Mặt trời tỏa sáng)',
    description: 'Nhật cung Thái Dương tinh quân, mang lại quang minh chính đại, danh vọng lẫy lừng, kinh doanh phát đạt, quý nhân tương trợ.',
    kyThang: 'Tháng 6 và tháng 10 âm lịch (không đáng ngại)',
    hopThang: 'Tháng 6 và tháng 10 phát quang rực rỡ',
    cungSao: {
      ngayCung: 'Ngày 27 âm lịch hàng tháng',
      gioCung: '11:00 đến 13:00 (giờ Ngọ)',
      huongLay: 'Chính Đông',
      soDen: 12,
      baiVi: 'Nhật Cung Thái Dương Thiên Tử Tinh Quân',
    },
  },
  'Vân Hớn': {
    name: 'Vân Hớn',
    hanh: 'Hỏa',
    nature: 'TRUNG',
    natureLabel: 'Trung Tinh (Chủ nóng nảy, khẩu thiệt)',
    description: 'Hỏa đức tinh quân, tính tình dễ nóng nảy, vướng vào tranh cãi thị phi, kiện tụng. Đàn bà thai sản cần chú ý giữ gìn sức khỏe.',
    kyThang: 'Tháng 4 và tháng 8 âm lịch',
    hopThang: 'Không có',
    cungSao: {
      ngayCung: 'Ngày 29 âm lịch hàng tháng',
      gioCung: '9:00 đến 11:00 (giờ Tỵ)',
      huongLay: 'Chính Nam',
      soDen: 15,
      baiVi: 'Nam Phương Bính Đinh Hỏa Đức Tinh Quân',
    },
  },
  'Kế Đô': {
    name: 'Kế Đô',
    hanh: 'Thổ',
    nature: 'HUNG',
    natureLabel: 'Đại Hung Tinh (Đặc biệt kỵ nữ)',
    description: 'Hung tinh vạn sự bất an, chủ về buồn phiền, tang khó, hao tổn tài sản, thị phi khẩu thiệt. Người mạng Kim mạng Mộc lại ít chịu ảnh hưởng hơn.',
    kyThang: 'Tháng 3 và tháng 9 âm lịch',
    hopThang: 'Không có',
    cungSao: {
      ngayCung: 'Ngày 18 âm lịch hàng tháng',
      gioCung: '13:00 đến 15:00 (giờ Mùi)',
      huongLay: 'Chính Tây',
      soDen: 21,
      baiVi: 'Địa Cung Thần Vĩ Kế Đô Tinh Quân',
    },
  },
  'Thái Âm': {
    name: 'Thái Âm',
    hanh: 'Thủy',
    nature: 'CAT',
    natureLabel: 'Đại Cát Tinh (Mặt trăng hiền hòa)',
    description: 'Nguyệt cung hoàng hậu, chủ về sự nghiệp như ý, cầu danh đắc danh, cầu tài đắc tài, tình duyên viên mãn, đặc biệt rất tốt cho nữ giới.',
    kyThang: 'Tháng 11 âm lịch (hơi hao tổn khí huyết nhẹ)',
    hopThang: 'Tháng 9 âm lịch đại cát',
    cungSao: {
      ngayCung: 'Ngày 26 âm lịch hàng tháng',
      gioCung: '19:00 đến 21:00 (giờ Tuất)',
      huongLay: 'Chính Tây',
      soDen: 7,
      baiVi: 'Nguyệt Cung Thái Âm Hoàng Hậu Tinh Quân',
    },
  },
  'Mộc Đức': {
    name: 'Mộc Đức',
    hanh: 'Mộc',
    nature: 'CAT',
    natureLabel: 'Đại Cát Tinh (Phúc lộc an khang)',
    description: 'Đông phương Mộc Đức tinh quân, mang đến nhiều may mắn, cơ hội thăng tiến, kinh doanh bội thu, hôn nhân hòa thuận, sinh con quý tử.',
    kyThang: 'Tháng 10 và tháng Chạp âm lịch (chú ý bệnh về mắt nhẹ)',
    hopThang: 'Tháng 10 và tháng Chạp',
    cungSao: {
      ngayCung: 'Ngày 25 âm lịch hàng tháng',
      gioCung: '19:00 đến 21:00 (giờ Tuất)',
      huongLay: 'Chính Đông',
      soDen: 20,
      baiVi: 'Đông Phương Giáp Ất Mộc Đức Tinh Quân',
    },
  },
};

const NAM_SAO_ORDER = [
  'La Hầu',
  'Thổ Tú',
  'Thủy Diệu',
  'Thái Bạch',
  'Thái Dương',
  'Vân Hớn',
  'Kế Đô',
  'Thái Âm',
  'Mộc Đức',
];

const NU_SAO_ORDER = [
  'Kế Đô',
  'Vân Hớn',
  'Mộc Đức',
  'Thái Âm',
  'Thổ Tú',
  'La Hầu',
  'Thái Dương',
  'Thái Bạch',
  'Thủy Diệu',
];

/**
 * Tính sao chiếu mệnh theo tuổi mụ và giới tính
 */
export function getSaoChieuMenh(tuoiMu: number, gender: 'nam' | 'nu'): SaoChieuMenh {
  // Chu kỳ 9 năm bắt đầu từ 10 tuổi
  const offset = ((tuoiMu - 10) % 9 + 9) % 9;
  const saoName = gender === 'nam' ? NAM_SAO_ORDER[offset] : NU_SAO_ORDER[offset];
  return CUU_DIEU_INFO[saoName];
}
