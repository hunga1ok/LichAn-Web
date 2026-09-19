import { VAN_KHAN_DATA } from './data';
import { VanKhanItem, VanKhanCategory } from '@/types/van-khan';

export { VAN_KHAN_DATA };
export type { VanKhanItem, VanKhanCategory } from '@/types/van-khan';

export const CATEGORY_LABELS: Record<VanKhanCategory, { name: string; desc: string; icon: string }> = {
  'than-linh-gia-tien': {
    name: 'Thần Linh & Gia Tiên',
    desc: 'Lễ sóc vọng mùng 1, ngày Rằm, giỗ chạp tổ tiên',
    icon: 'Home',
  },
  'kinh-doanh-tai-loc': {
    name: 'Kinh Doanh & Tài Lộc',
    desc: 'Khai trương, ban Thần Tài, cầu buôn may bán đắt',
    icon: 'TrendingUp',
  },
  'xay-dung-nha-cua': {
    name: 'Xây Dựng & Nhà Cửa',
    desc: 'Động thổ làm nhà, cất nóc, nhập trạch về nhà mới',
    icon: 'Hammer',
  },
  'hon-su-gia-dao': {
    name: 'Hôn Sự & Gia Đạo',
    desc: 'Lễ cưới hỏi, đón dâu vu quy, đầy tháng, thôi nôi',
    icon: 'Heart',
  },
  'le-tet-truyen-thong': {
    name: 'Lễ Tết Truyền Thống',
    desc: 'Cúng Ông Táo 23 tháng Chạp, Tất niên, Giao thừa, Hóa vàng',
    icon: 'Flame',
  },
};

/**
 * Lấy toàn bộ danh sách văn khấn
 */
export function getAllVanKhan(): VanKhanItem[] {
  return VAN_KHAN_DATA;
}

/**
 * Tra cứu văn khấn theo slug
 */
export function getVanKhanBySlug(slug: string): VanKhanItem | undefined {
  return VAN_KHAN_DATA.find((item) => item.slug === slug);
}

/**
 * Lọc văn khấn theo danh mục
 */
export function getVanKhanByCategory(category: VanKhanCategory): VanKhanItem[] {
  return VAN_KHAN_DATA.filter((item) => item.category === category);
}

/**
 * Tìm kiếm văn khấn theo từ khóa (tiêu đề, tóm tắt, tag, đối tượng cúng)
 */
export function searchVanKhan(keyword: string): VanKhanItem[] {
  if (!keyword || !keyword.trim()) return VAN_KHAN_DATA;
  const q = keyword.toLowerCase().trim();
  return VAN_KHAN_DATA.filter((item) => {
    return (
      item.title.toLowerCase().includes(q) ||
      item.shortDesc.toLowerCase().includes(q) ||
      item.target.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q)) ||
      item.categoryName.toLowerCase().includes(q)
    );
  });
}
