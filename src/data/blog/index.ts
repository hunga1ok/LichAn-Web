import { BlogPost } from './types';
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
import { postPhongTucTetDoanNgo } from './phong-tuc-tet-doan-ngo';
import { postHuongDanBaoSaiBanTho } from './huong-dan-bao-sai-ban-tho';

export * from './types';

/**
 * Danh sách toàn bộ bài viết trên hệ thống Lịch An.
 * Để thêm bài viết mới:
 * 1. Tạo file mới `src/data/blog/[ten-bai-viet].ts` theo cấu trúc BlogPost
 * 2. Import và thêm vào mảng BLOG_POSTS bên dưới
 */
export const BLOG_POSTS: BlogPost[] = [
  postHuongXuatHanh,
  postKetHopHoaGiapNguHanh,
  postLucThapHoaGiap,
  postThuyetAmDuongNguHanh,
  postNgayHoangDaoHacDao,
  postThapNhiTruc,
  postNhiThapBatTu,
  postSaoTotSaoXau,
  postVanKhanMung1NgayRam,
  postXemNgayTotKhaiTruong,
  postPhongTucTetDoanNgo,
  postHuongDanBaoSaiBanTho,
];
