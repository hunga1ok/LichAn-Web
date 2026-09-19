export type VanKhanCategory =
  | 'than-linh-gia-tien'   // Thần linh, Gia tiên mùng 1, rằm, giỗ
  | 'kinh-doanh-tai-loc'   // Khai trương, Thần tài, cầu tài lộc
  | 'xay-dung-nha-cua'    // Động thổ, Cất nóc, Nhập trạch
  | 'hon-su-gia-dao'     // Cưới hỏi, Đầy tháng, Thôi nôi
  | 'le-tet-truyen-thong'; // Táo quân, Tất niên, Giao thừa, Hóa vàng

export interface VanKhanItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  category: VanKhanCategory;
  categoryName: string;
  target: string;          // Đối tượng cúng tế (Thổ Công, Gia Tiên, Thần Tài...)
  timeRecommended: string; // Thời điểm cúng thích hợp
  samLe: string[];         // Danh sách lễ vật cần chuẩn bị
  baiVanKhan: string;      // Toàn văn bài khấn chuẩn cổ truyền
  luuY: string[];          // Lưu ý trang phục, kiêng cữ khi hành lễ
  tags: string[];
}
