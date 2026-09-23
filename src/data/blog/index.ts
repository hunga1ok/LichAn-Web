import { BlogPost } from './types';
import { postTetNguyenDan } from './tet-nguyen-dan';
import { postTetNguyenTieu } from './tet-nguyen-tieu';
import { postTetHanThuc } from './tet-han-thuc';
import { postGioToHungVuong } from './gio-to-hung-vuong';
import { postLePhatDan } from './le-phat-dan-vesak';
import { postPhongTucTetDoanNgo } from './phong-tuc-tet-doan-ngo';
import { postLeVuLan } from './le-vu-lan-bao-hieu';
import { postTetTrungThu } from './tet-trung-thu';
import { postTetTrungCuu } from './tet-trung-cuu';
import { postTetTrungThap } from './tet-trung-thap';
import { postTetHaNguyen } from './tet-ha-nguyen';
import { postTetTaoQuan } from './tet-tao-quan';
import { postDemGiaoThua } from './dem-giao-thua-tru-tich';

import { postHuongXuatHanh } from './huong-xuat-hanh';
import { postKetHopHoaGiapNguHanh } from './ket-hop-hoa-giap-ngu-hanh';
import { postLucThapHoaGiap } from './luc-thap-hoa-giap';
import { postThuyetAmDuongNguHanh } from './thuyet-am-duong-ngu-hanh';
import { postNgayHoangDaoHacDao } from './ngay-hoang-dao-hac-dao';
import { postThapNhiTruc } from './thap-nhi-truc';
import { postNhiThapBatTu } from './nhi-thap-bat-tu';
import { postSaoTotSaoXau } from './sao-tot-sao-xau';
import { postVanKhanMung1NgayRam } from './van-khan-mung-1-ngay-ram';
import { postXemNgayTotKhaiTruong } from './xem-ngay-tot-khai-truong';
import { postHuongDanBaoSaiBanTho } from './huong-dan-bao-sai-ban-tho';

export * from './types';

/**
 * Danh sách toàn bộ bài viết trên hệ thống Lịch An.
 * Để thêm bài viết mới:
 * 1. Tạo file mới `src/data/blog/[ten-bai-viet].ts` theo cấu trúc BlogPost
 * 2. Import và thêm vào mảng BLOG_POSTS bên dưới
 */
export const BLOG_POSTS: BlogPost[] = [
  // Bộ cẩm nang Ngày Lễ Truyền Thống Việt Nam
  postTetNguyenDan,
  postTetNguyenTieu,
  postTetHanThuc,
  postGioToHungVuong,
  postLePhatDan,
  postPhongTucTetDoanNgo,
  postLeVuLan,
  postTetTrungThu,
  postTetTrungCuu,
  postTetTrungThap,
  postTetHaNguyen,
  postTetTaoQuan,
  postDemGiaoThua,

  // Bộ cẩm nang Phong Thủy & Trạch Cát
  postHuongXuatHanh,
  postKetHopHoaGiapNguHanh,
  postLucThapHoaGiap,
  postThuyetAmDuongNguHanh,
  postNgayHoangDaoHacDao,
  postThapNhiTruc,
  postNhiThapBatTu,
  postSaoTotSaoXau,

  // Bộ cẩm nang Văn Khấn & Nghi Lễ
  postVanKhanMung1NgayRam,
  postXemNgayTotKhaiTruong,
  postHuongDanBaoSaiBanTho,
];
