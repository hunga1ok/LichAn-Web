export type BlogCategory = 
  | 'Phong thủy' 
  | 'Văn khấn' 
  | 'Phong tục' 
  | 'Xem ngày' 
  | 'Tử vi phong thủy';

export interface BlogPost {
  /** Đường dẫn URL thân thiện SEO (duy nhất) */
  slug: string;
  /** Tiêu đề chính H1 và thẻ Title SEO */
  title: string;
  /** Thẻ mô tả Meta Description (140 - 160 ký tự) */
  description: string;
  /** Danh mục bài viết */
  category: BlogCategory;
  /** Ngày xuất bản ban đầu (DD/MM/YYYY) */
  publishedAt: string;
  /** Ngày cập nhật nội dung mới nhất (cho Google Bot) */
  updatedAt?: string;
  /** Thời gian đọc ước tính (vd: 8 phút đọc) */
  readTime: string;
  /** Tên tác giả hoặc cơ quan biên tập (E-E-A-T) */
  author: string;
  /** Chức danh hoặc vai trò của tác giả */
  authorRole?: string;
  /** Thẻ nhãn phân loại */
  tags: string[];
  /** Danh sách từ khóa SEO mục tiêu */
  keywords?: string[];
  /** Toàn văn nội dung bài viết theo định dạng Markdown */
  content: string;
  /** Thông tin ngày lễ âm lịch tương ứng để tự động tính ngày chi tiết trong năm nay */
  lunarEvent?: {
    name: string;
    day: number;
    month: number;
  };
}
