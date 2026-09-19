/**
 * Danh Sách Lục Thập Hoa Giáp & Luận Giải Trọn Đời
 * ============================================================================
 * Phục vụ dynamic static pages /tu-vi/[slug] và SEO cá nhân hóa cho từng năm sinh.
 * ============================================================================
 */

export interface HoaGiapData {
  year: number;
  canChi: string;
  conGiap: string;
  menh: string; // ví dụ: "Hải Trung Kim (Vàng trong biển)"
  hanh: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
  slug: string; // ví dụ: "giap-ty-1984"
  tuongSinh: string;
  tuongKhac: string;
  tamHop: string[];
  tuHanhXung: string[];
  overview: string;
  career: string;
  wealth: string;
  love: string;
  health: string;
}

// Bảng tra Nạp âm Lục Thập Hoa Giáp kinh điển
const NAP_AM_MAP: Record<string, { menh: string; hanh: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ' }> = {
  'Giáp Tý': { menh: 'Hải Trung Kim (Vàng trong biển)', hanh: 'Kim' },
  'Ất Sửu': { menh: 'Hải Trung Kim (Vàng trong biển)', hanh: 'Kim' },
  'Bính Dần': { menh: 'Lư Trung Hỏa (Lửa trong lò)', hanh: 'Hỏa' },
  'Đinh Mão': { menh: 'Lư Trung Hỏa (Lửa trong lò)', hanh: 'Hỏa' },
  'Mậu Thìn': { menh: 'Đại Lâm Mộc (Gỗ rừng già)', hanh: 'Mộc' },
  'Kỷ Tỵ': { menh: 'Đại Lâm Mộc (Gỗ rừng già)', hanh: 'Mộc' },
  'Canh Ngọ': { menh: 'Lộ Bàng Thổ (Đất ven đường)', hanh: 'Thổ' },
  'Tân Mùi': { menh: 'Lộ Bàng Thổ (Đất ven đường)', hanh: 'Thổ' },
  'Nhâm Thân': { menh: 'Kiếm Phong Kim (Vàng mũi kiếm)', hanh: 'Kim' },
  'Quý Dậu': { menh: 'Kiếm Phong Kim (Vàng mũi kiếm)', hanh: 'Kim' },
  'Giáp Tuất': { menh: 'Sơn Đầu Hỏa (Lửa trên núi)', hanh: 'Hỏa' },
  'Ất Hợi': { menh: 'Sơn Đầu Hỏa (Lửa trên núi)', hanh: 'Hỏa' },
  'Bính Tý': { menh: 'Giản Hạ Thủy (Nước dưới khe)', hanh: 'Thủy' },
  'Đinh Sửu': { menh: 'Giản Hạ Thủy (Nước dưới khe)', hanh: 'Thủy' },
  'Mậu Dần': { menh: 'Thành Đầu Thổ (Đất trên thành)', hanh: 'Thổ' },
  'Kỷ Mão': { menh: 'Thành Đầu Thổ (Đất trên thành)', hanh: 'Thổ' },
  'Canh Thìn': { menh: 'Bạch Lạp Kim (Vàng sáp ong)', hanh: 'Kim' },
  'Tân Tỵ': { menh: 'Bạch Lạp Kim (Vàng sáp ong)', hanh: 'Kim' },
  'Nhâm Ngọ': { menh: 'Dương Liễu Mộc (Gỗ cây liễu)', hanh: 'Mộc' },
  'Quý Mùi': { menh: 'Dương Liễu Mộc (Gỗ cây liễu)', hanh: 'Mộc' },
  'Giáp Thân': { menh: 'Tuyền Trung Thủy (Nước trong suối)', hanh: 'Thủy' },
  'Ất Dậu': { menh: 'Tuyền Trung Thủy (Nước trong suối)', hanh: 'Thủy' },
  'Bính Tuất': { menh: 'Ốc Thượng Thổ (Đất nóc nhà)', hanh: 'Thổ' },
  'Đinh Hợi': { menh: 'Ốc Thượng Thổ (Đất nóc nhà)', hanh: 'Thổ' },
  'Mậu Tý': { menh: 'Tích Lịch Hỏa (Lửa sấm sét)', hanh: 'Hỏa' },
  'Kỷ Sửu': { menh: 'Tích Lịch Hỏa (Lửa sấm sét)', hanh: 'Hỏa' },
  'Canh Dần': { menh: 'Tùng Bách Mộc (Gỗ cây tùng bách)', hanh: 'Mộc' },
  'Tân Mão': { menh: 'Tùng Bách Mộc (Gỗ cây tùng bách)', hanh: 'Mộc' },
  'Nhâm Thìn': { menh: 'Trường Lưu Thủy (Nước chảy dài)', hanh: 'Thủy' },
  'Quý Tỵ': { menh: 'Trường Lưu Thủy (Nước chảy dài)', hanh: 'Thủy' },
  'Giáp Ngọ': { menh: 'Sa Trung Kim (Vàng trong cát)', hanh: 'Kim' },
  'Ất Mùi': { menh: 'Sa Trung Kim (Vàng trong cát)', hanh: 'Kim' },
  'Bính Thân': { menh: 'Sơn Hạ Hỏa (Lửa dưới núi)', hanh: 'Hỏa' },
  'Đinh Dậu': { menh: 'Sơn Hạ Hỏa (Lửa dưới núi)', hanh: 'Hỏa' },
  'Mậu Tuất': { menh: 'Bình Địa Mộc (Gỗ đồng bằng)', hanh: 'Mộc' },
  'Kỷ Hợi': { menh: 'Bình Địa Mộc (Gỗ đồng bằng)', hanh: 'Mộc' },
  'Canh Tý': { menh: 'Bích Thượng Thổ (Đất trên vách)', hanh: 'Thổ' },
  'Tân Sửu': { menh: 'Bích Thượng Thổ (Đất trên vách)', hanh: 'Thổ' },
  'Nhâm Dần': { menh: 'Kim Bạch Kim (Vàng mạ bạc)', hanh: 'Kim' },
  'Quý Mão': { menh: 'Kim Bạch Kim (Vàng mạ bạc)', hanh: 'Kim' },
  'Giáp Thìn': { menh: 'Phú Đăng Hỏa (Lửa đèn to)', hanh: 'Hỏa' },
  'Ất Tỵ': { menh: 'Phú Đăng Hỏa (Lửa đèn to)', hanh: 'Hỏa' },
  'Bính Ngọ': { menh: 'Thiên Hà Thủy (Nước trên trời)', hanh: 'Thủy' },
  'Đinh Mùi': { menh: 'Thiên Hà Thủy (Nước trên trời)', hanh: 'Thủy' },
  'Mậu Thân': { menh: 'Đại Trạch Thổ (Đất nền nhà)', hanh: 'Thổ' },
  'Kỷ Dậu': { menh: 'Đại Trạch Thổ (Đất nền nhà)', hanh: 'Thổ' },
  'Canh Tuất': { menh: 'Thoa Xuyến Kim (Vàng trang sức)', hanh: 'Kim' },
  'Tân Hợi': { menh: 'Thoa Xuyến Kim (Vàng trang sức)', hanh: 'Kim' },
  'Nhâm Tý': { menh: 'Tang Đố Mộc (Gỗ cây dâu)', hanh: 'Mộc' },
  'Quý Sửu': { menh: 'Tang Đố Mộc (Gỗ cây dâu)', hanh: 'Mộc' },
  'Giáp Dần': { menh: 'Đại Khê Thủy (Nước khe lớn)', hanh: 'Thủy' },
  'Ất Mão': { menh: 'Đại Khê Thủy (Nước khe lớn)', hanh: 'Thủy' },
  'Bính Thìn': { menh: 'Sa Trung Thổ (Đất lẫn trong cát)', hanh: 'Thổ' },
  'Đinh Tỵ': { menh: 'Sa Trung Thổ (Đất lẫn trong cát)', hanh: 'Thổ' },
  'Mậu Ngọ': { menh: 'Thiên Thượng Hỏa (Lửa trên trời)', hanh: 'Hỏa' },
  'Kỷ Mùi': { menh: 'Thiên Thượng Hỏa (Lửa trên trời)', hanh: 'Hỏa' },
  'Canh Thân': { menh: 'Thạch Lựu Mộc (Gỗ cây lựu đá)', hanh: 'Mộc' },
  'Tân Dậu': { menh: 'Thạch Lựu Mộc (Gỗ cây lựu đá)', hanh: 'Mộc' },
  'Nhâm Tuất': { menh: 'Đại Hải Thủy (Nước biển lớn)', hanh: 'Thủy' },
  'Quý Hợi': { menh: 'Đại Hải Thủy (Nước biển lớn)', hanh: 'Thủy' },
};

const CAN_LIST = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI_LIST = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

const TAM_HOP_MAP: Record<string, string[]> = {
  'Tý': ['Thân', 'Thìn'],
  'Sửu': ['Tỵ', 'Dậu'],
  'Dần': ['Ngọ', 'Tuất'],
  'Mão': ['Hợi', 'Mùi'],
  'Thìn': ['Thân', 'Tý'],
  'Tỵ': ['Sửu', 'Dậu'],
  'Ngọ': ['Dần', 'Tuất'],
  'Mùi': ['Hợi', 'Mão'],
  'Thân': ['Tý', 'Thìn'],
  'Dậu': ['Tỵ', 'Sửu'],
  'Tuất': ['Dần', 'Ngọ'],
  'Hợi': ['Mão', 'Mùi'],
};

const TU_HANH_XUNG_MAP: Record<string, string[]> = {
  'Tý': ['Ngọ', 'Mão', 'Dậu'],
  'Sửu': ['Mùi', 'Thìn', 'Tuất'],
  'Dần': ['Thân', 'Tỵ', 'Hợi'],
  'Mão': ['Dậu', 'Tý', 'Ngọ'],
  'Thìn': ['Tuất', 'Sửu', 'Mùi'],
  'Tỵ': ['Hợi', 'Dần', 'Thân'],
  'Ngọ': ['Tý', 'Mão', 'Dậu'],
  'Mùi': ['Sửu', 'Thìn', 'Tuất'],
  'Thân': ['Dần', 'Tỵ', 'Hợi'],
  'Dậu': ['Mão', 'Tý', 'Ngọ'],
  'Tuất': ['Thìn', 'Sửu', 'Mùi'],
  'Hợi': ['Tỵ', 'Dần', 'Thân'],
};

function removeVietnameseAccents(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/\s+/g, '-');
}

/**
 * Sinh Can Chi từ năm dương lịch
 */
export function getCanChiFromYear(year: number): { can: string; chi: string; fullName: string } {
  const canIndex = (year + 6) % 10;
  const chiIndex = (year + 8) % 12;
  const can = CAN_LIST[canIndex];
  const chi = CHI_LIST[chiIndex];
  return { can, chi, fullName: `${can} ${chi}` };
}

/**
 * Lấy dữ liệu hoa giáp theo năm sinh
 */
export function getHoaGiapData(birthYear: number): HoaGiapData {
  const { can, chi, fullName } = getCanChiFromYear(birthYear);
  const napAm = NAP_AM_MAP[fullName] || { menh: 'Đại Lâm Mộc', hanh: 'Mộc' };
  const slug = `${removeVietnameseAccents(fullName)}-${birthYear}`;

  let tuongSinh = 'Thủy sinh Mộc, Mộc sinh Hỏa';
  let tuongKhac = 'Kim khắc Mộc, Mộc khắc Thổ';
  if (napAm.hanh === 'Kim') {
    tuongSinh = 'Thổ sinh Kim, Kim sinh Thủy';
    tuongKhac = 'Hỏa khắc Kim, Kim khắc Mộc';
  } else if (napAm.hanh === 'Thủy') {
    tuongSinh = 'Kim sinh Thủy, Thủy sinh Mộc';
    tuongKhac = 'Thổ khắc Thủy, Thủy khắc Hỏa';
  } else if (napAm.hanh === 'Hỏa') {
    tuongSinh = 'Mộc sinh Hỏa, Hỏa sinh Thổ';
    tuongKhac = 'Thủy khắc Hỏa, Hỏa khắc Kim';
  } else if (napAm.hanh === 'Thổ') {
    tuongSinh = 'Hỏa sinh Thổ, Thổ sinh Kim';
    tuongKhac = 'Mộc khắc Thổ, Thổ khắc Thủy';
  }

  return {
    year: birthYear,
    canChi: fullName,
    conGiap: chi,
    menh: napAm.menh,
    hanh: napAm.hanh,
    slug,
    tuongSinh,
    tuongKhac,
    tamHop: TAM_HOP_MAP[chi] || [],
    tuHanhXung: TU_HANH_XUNG_MAP[chi] || [],
    overview: `Người sinh năm ${birthYear} tuổi ${fullName} mang bản mệnh ${napAm.menh}. Bản tính thông minh, có chí tiến thủ, kiên trì vượt qua khó khăn để xây dựng cơ đồ vững chắc.`,
    career: `Đường công danh sự nghiệp tiền vận trải qua thăng trầm, nhưng nhờ bản lĩnh và sự khéo léo nên từ trung vận trở đi sẽ gặt hái nhiều thành tựu lớn, có địa vị và uy tín xã hội.`,
    wealth: `Tài lộc trung vận dồi dào, thu hút nhiều cơ hội đầu tư kinh doanh. Hậu vận an nhàn, của cải tích lũy dư dả cho con cháu.`,
    love: `Đường tình duyên thời trẻ có đôi chút trắc trở nhưng khi đã lập gia thất thì gia đạo yên ấm, vợ chồng đồng lòng cùng nhau vượt qua sóng gió.`,
    health: `Thể trạng nhìn chung tốt, tuy nhiên cần chú ý rèn luyện thể thao đều đặn, tránh làm việc kiệt sức và lưu tâm các chứng bệnh đặc thù của ngũ hành ${napAm.hanh}.`,
  };
}

/**
 * Lấy danh sách toàn bộ các năm hoa giáp hỗ trợ (1960 đến 2025)
 */
export function getAllHoaGiapList(): HoaGiapData[] {
  const list: HoaGiapData[] = [];
  for (let y = 1960; y <= 2025; y++) {
    list.push(getHoaGiapData(y));
  }
  return list;
}
