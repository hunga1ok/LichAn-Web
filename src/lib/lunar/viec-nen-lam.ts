/**
 * Bảng việc nên làm / không nên làm theo 12 Trực
 * Mỗi trực có danh sách việc phù hợp và không phù hợp
 */

const VIEC_THEO_TRUC: Record<string, { nenLam: string[]; khongNenLam: string[] }> = {
  'Kiến': {
    nenLam: ['Xuất hành', 'Cưới hỏi', 'Khai trương', 'Nhập trạch', 'Ký kết hợp đồng'],
    khongNenLam: ['Động thổ', 'Phá dỡ', 'Mổ xẻ'],
  },
  'Trừ': {
    nenLam: ['Trị bệnh', 'Tẩy uế', 'Dọn dẹp', 'Cắt tóc', 'Sửa chữa nhà'],
    khongNenLam: ['Cưới hỏi', 'Khai trương', 'Ký hợp đồng'],
  },
  'Mãn': {
    nenLam: ['Cầu phúc', 'Cầu tài', 'Xuất hành', 'Cưới hỏi', 'Khai trương'],
    khongNenLam: ['Động thổ', 'Gieo trồng', 'An táng'],
  },
  'Bình': {
    nenLam: ['Gieo trồng', 'Xây dựng', 'Sửa chữa', 'Động thổ', 'Khai mương'],
    khongNenLam: ['Xuất hành xa', 'Cưới hỏi'],
  },
  'Định': {
    nenLam: ['Cưới hỏi', 'Ký hợp đồng', 'Nhập học', 'Cầu phúc', 'Khai trương'],
    khongNenLam: ['Kiện tụng', 'Tranh chấp', 'Phá dỡ'],
  },
  'Chấp': {
    nenLam: ['Xây dựng', 'Sửa nhà', 'Trồng cây', 'Bắt đầu công việc mới'],
    khongNenLam: ['Di chuyển', 'Xuất hành xa', 'Mở cửa hàng'],
  },
  'Phá': {
    nenLam: ['Phá dỡ', 'Trị bệnh', 'Dọn dẹp', 'Tẩy uế'],
    khongNenLam: ['Cưới hỏi', 'Khai trương', 'Ký kết', 'Xuất hành', 'Nhập trạch'],
  },
  'Nguy': {
    nenLam: ['Cầu an', 'Dâng sao giải hạn', 'Cúng tế'],
    khongNenLam: ['Xuất hành', 'Xây dựng', 'Động thổ', 'Leo cao', 'Đi thuyền'],
  },
  'Thành': {
    nenLam: ['Cưới hỏi', 'Khai trương', 'Nhập trạch', 'Xuất hành', 'Ký kết', 'Xây dựng'],
    khongNenLam: ['Kiện tụng', 'Tranh chấp'],
  },
  'Thâu': {
    nenLam: ['Thu hoạch', 'Nhập kho', 'Mua sắm', 'Giao dịch', 'Cất tiền'],
    khongNenLam: ['Xuất hành xa', 'An táng', 'Phẫu thuật'],
  },
  'Khai': {
    nenLam: ['Khai trương', 'Xuất hành', 'Cưới hỏi', 'Nhập học', 'Động thổ', 'Xây dựng'],
    khongNenLam: ['An táng', 'Phá dỡ'],
  },
  'Bế': {
    nenLam: ['Cất giữ', 'Sửa kho', 'Xây tường', 'Đắp đê'],
    khongNenLam: ['Khai trương', 'Xuất hành', 'Cưới hỏi', 'Nhập trạch', 'Phẫu thuật'],
  },
};

export function getViecNenLam(truc: string, saoTot: string[]): string[] {
  const trucData = VIEC_THEO_TRUC[truc];
  if (!trucData) return ['Cầu an', 'Cúng tế'];
  return trucData.nenLam;
}

export function getViecKhongNenLam(truc: string, saoXau: string[]): string[] {
  const trucData = VIEC_THEO_TRUC[truc];
  if (!trucData) return ['Kiện tụng', 'Tranh chấp'];
  return trucData.khongNenLam;
}
