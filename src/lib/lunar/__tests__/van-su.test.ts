/**
 * Bộ kiểm thử đơn vị cho Module Lịch Vạn Sự & Luận Giải Ngày Toàn Diện
 */

import {
  getNgayHoangDao,
  getLucDieu,
  getNapAmFull,
  getTuoiXung,
  getNgayKyDanGian,
  getHacThan,
  generateLuanGiaiNgay,
} from '../van-su';
import { lunarService } from '../service';

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    passedTests++;
    console.log(`  ✅ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ❌ FAIL: ${testName}`);
    if (detail) console.error(`     Chi tiết: ${detail}`);
  }
}

function runVanSuTestSuite() {
  console.log('================================================================');
  console.log('   BỘ KIỂM THỬ LỊCH VẠN SỰ & LUẬN GIẢI NGÀY TOÀN DIỆN          ');
  console.log('================================================================\n');

  // 1. Kiểm tra 12 Thần Sát Ngày Hoàng Đạo / Hắc Đạo
  console.log('📌 SUITE 1: Kiểm thử 12 Thần Sát Ngày Hoàng Đạo / Hắc Đạo');
  // Tháng 1 khởi Thanh Long tại Tý (Tý: Thanh Long, Sửu: Minh Đường, Dần: Thiên Hình, Mão: Chu Tước, Thìn: Kim Quỹ...)
  const hdThang1Ty = getNgayHoangDao(1, 'Tý');
  assert(hdThang1Ty.starName === 'Thanh Long' && hdThang1Ty.isHoangDao === true, 'Tháng 1 ngày Tý là Thanh Long Hoàng Đạo');

  const hdThang1Suu = getNgayHoangDao(1, 'Sửu');
  assert(hdThang1Suu.starName === 'Minh Đường' && hdThang1Suu.isHoangDao === true, 'Tháng 1 ngày Sửu là Minh Đường Hoàng Đạo');

  const hdThang1Dan = getNgayHoangDao(1, 'Dần');
  assert(hdThang1Dan.starName === 'Thiên Hình' && hdThang1Dan.isHoangDao === false, 'Tháng 1 ngày Dần là Thiên Hình Hắc Đạo');

  const hdThang1Mao = getNgayHoangDao(1, 'Mão');
  assert(hdThang1Mao.starName === 'Chu Tước' && hdThang1Mao.isHoangDao === false, 'Tháng 1 ngày Mão là Chu Tước Hắc Đạo');

  const hdThang1Thin = getNgayHoangDao(1, 'Thìn');
  assert(hdThang1Thin.starName === 'Kim Quỹ' && hdThang1Thin.isHoangDao === true, 'Tháng 1 ngày Thìn là Kim Quỹ Hoàng Đạo');

  // Tháng 2 khởi Thanh Long tại Dần
  const hdThang2Dan = getNgayHoangDao(2, 'Dần');
  assert(hdThang2Dan.starName === 'Thanh Long' && hdThang2Dan.isHoangDao === true, 'Tháng 2 ngày Dần là Thanh Long Hoàng Đạo');

  // 2. Kiểm tra Khổng Minh Lục Diệu
  console.log('\n📌 SUITE 2: Kiểm thử Khổng Minh Lục Diệu');
  // Tháng 1 mùng 1: (1 + 1 - 2) % 6 = 0 -> Đại An
  const ld11 = getLucDieu(1, 1);
  assert(ld11.name === 'Đại An' && ld11.isGood === true, 'Tháng 1 mùng 1 là ngày Đại An (Cát)');

  // Tháng 1 mùng 2 -> Lưu Niên
  const ld12 = getLucDieu(1, 2);
  assert(ld12.name === 'Lưu Niên' && ld12.isGood === false, 'Tháng 1 mùng 2 là ngày Lưu Niên (Hung)');

  // Tháng 1 mùng 3 -> Tốc Hỷ
  const ld13 = getLucDieu(1, 3);
  assert(ld13.name === 'Tốc Hỷ' && ld13.isGood === true, 'Tháng 1 mùng 3 là ngày Tốc Hỷ (Đại Cát)');

  // Tháng 1 mùng 4 -> Xích Khẩu
  const ld14 = getLucDieu(1, 4);
  assert(ld14.name === 'Xích Khẩu' && ld14.isGood === false, 'Tháng 1 mùng 4 là ngày Xích Khẩu');

  // Tháng 1 mùng 5 -> Tiểu Cát
  const ld15 = getLucDieu(1, 5);
  assert(ld15.name === 'Tiểu Cát' && ld15.isGood === true, 'Tháng 1 mùng 5 là ngày Tiểu Cát (Cát)');

  // Tháng 1 mùng 6 -> Không Vong
  const ld16 = getLucDieu(1, 6);
  assert(ld16.name === 'Không Vong' && ld16.isGood === false, 'Tháng 1 mùng 6 là ngày Không Vong (Đại Hung)');

  // Tháng 2 mùng 1 -> (2 + 1 - 2) % 6 = 1 -> Lưu Niên
  const ld21 = getLucDieu(2, 1);
  assert(ld21.name === 'Lưu Niên', 'Tháng 2 mùng 1 khởi Lưu Niên chuẩn xác');

  // 3. Kiểm tra Ngũ Hành Nạp Âm 60 Hoa Giáp
  console.log('\n📌 SUITE 3: Kiểm thử Ngũ Hành Nạp Âm 60 Hoa Giáp');
  assert(getNapAmFull('Giáp Tý').includes('Hải Trung Kim'), 'Giáp Tý là Hải Trung Kim');
  assert(getNapAmFull('Ất Sửu').includes('Hải Trung Kim'), 'Ất Sửu là Hải Trung Kim');
  assert(getNapAmFull('Bính Dần').includes('Lư Trung Hỏa'), 'Bính Dần là Lư Trung Hỏa');
  assert(getNapAmFull('Canh Ngọ').includes('Lộ Bàng Thổ'), 'Canh Ngọ là Lộ Bàng Thổ');
  assert(getNapAmFull('Nhâm Thân').includes('Kiếm Phong Kim'), 'Nhâm Thân là Kiếm Phong Kim');

  // 4. Kiểm tra Tuổi Xung Khắc
  console.log('\n📌 SUITE 4: Kiểm thử Tuổi Xung Khắc Ngày và Tháng');
  // Ngày Giáp Tý, tháng Đinh Mão
  const xung = getTuoiXung('Giáp', 'Tý', 'Đinh', 'Mão');
  assert(xung.ngay.some(t => t.includes('Ngọ')), 'Ngày Giáp Tý xung các tuổi Ngọ (Lục Xung)');
  assert(xung.ngay.some(t => t === 'Canh Ngọ' || t === 'Mậu Ngọ'), 'Ngày Giáp Tý có Canh Ngọ hoặc Mậu Ngọ trong danh sách xung');
  assert(xung.thang.some(t => t.includes('Dậu')), 'Tháng Mão xung các tuổi Dậu');

  // 5. Kiểm tra Ngày Kỵ Dân Gian & Hạc Thần
  console.log('\n📌 SUITE 5: Kiểm thử Ngày Kỵ Dân Gian & Hạc Thần');
  const kyMung3 = getNgayKyDanGian(3, 1, 'Tý');
  assert(kyMung3.some(k => k.includes('Tam Nương')), 'Mùng 3 phạm Tam Nương');

  const kyMung5 = getNgayKyDanGian(5, 1, 'Tý');
  assert(kyMung5.some(k => k.includes('Nguyệt Kỵ')), 'Mùng 5 phạm Nguyệt Kỵ');

  const kyDuongCong = getNgayKyDanGian(13, 1, 'Ngọ');
  assert(kyDuongCong.some(k => k.includes('Dương Công Kỵ Nhật')), 'Ngày 13 tháng Giêng phạm Dương Công Kỵ');

  const hacThanTy = getHacThan('Tý');
  assert(hacThanTy.includes('Đông Nam'), 'Ngày Tý Hạc Thần ngự hướng Đông Nam');
  const hacThanThin = getHacThan('Thìn');
  assert(hacThanThin.includes('Trên Trời'), 'Ngày Thìn Hạc Thần ở Trên Trời không phạm đất');

  // 6. Kiểm tra tích hợp Facade lunarService.getDayInfo
  console.log('\n📌 SUITE 6: Kiểm thử Tích Hợp Facade lunarService.getDayInfo');
  const dayInfo = lunarService.getDayInfo(1, 10, 2026);
  assert(dayInfo.ngayHoangDao !== undefined, 'dayInfo có trường ngayHoangDao');
  assert(dayInfo.lucDieu !== undefined, 'dayInfo có trường lucDieu');
  assert(dayInfo.napAm !== undefined && dayInfo.napAm.length > 0, 'dayInfo có trường napAm đầy đủ');
  assert(dayInfo.tuoiXung !== undefined && dayInfo.tuoiXung.ngay.length > 0, 'dayInfo có trường tuoiXung');
  assert(dayInfo.hacThan !== undefined, 'dayInfo có trường hacThan');
  assert(dayInfo.luanGiai !== undefined, 'dayInfo có trường luanGiai');
  assert(dayInfo.luanGiai?.tongKet !== undefined, 'dayInfo có khối tổng kết đánh giá');
  assert(typeof dayInfo.luanGiai?.tongKet.score === 'number', 'Điểm tổng kết là số (0-100)');
  assert((dayInfo.luanGiai?.tongKet.loiKhuyen.length ?? 0) > 0, 'Có lời khuyên tổng quan');
  assert((dayInfo.luanGiai?.tongKet.hopViec.length ?? 0) > 0, 'Có danh sách việc hợp');
  assert((dayInfo.luanGiai?.tongKet.kyViec.length ?? 0) > 0, 'Có danh sách việc kỵ');

  // 7. Kiểm tra tích hợp Lịch Tháng, Ngày Tốt và Xuất Hành
  console.log('\n📌 SUITE 7: Kiểm thử Tích Hợp Lịch Tháng, Ngày Tốt & Xuất Hành');
  const monthData = lunarService.getMonthCalendar(10, 2026);
  assert(monthData.days.length === 31, 'Tháng 10/2026 có 31 ngày');
  const hasHoangDaoDays = monthData.days.some(d => d.isHoangDao === true);
  assert(hasHoangDaoDays, 'Lịch tháng có đánh dấu Ngày Hoàng Đạo');
  assert(monthData.days[0].ngayHoangDaoName !== undefined, 'Ngày có trường ngayHoangDaoName');

  const auspiciousDays = lunarService.getAuspiciousDays('cuoi-hoi', 10, 2026);
  assert(auspiciousDays.length > 0, 'Có danh sách ngày tốt cưới hỏi');
  assert(auspiciousDays[0].ngayHoangDao !== undefined, 'AuspiciousDayResult có trường ngayHoangDao');
  assert(auspiciousDays[0].lucDieu !== undefined, 'AuspiciousDayResult có trường lucDieu');

  const xuatHanhInfo = lunarService.getXuatHanhInfo(1, 10, 2026);
  assert(xuatHanhInfo.hacThan !== undefined && xuatHanhInfo.hacThan.length > 0, 'getXuatHanhInfo trả về hướng Hạc Thần');

  console.log('----------------------------------------------------------------');
  console.log(`KẾT QUẢ: ${passedTests} PASS, ${failedTests} FAIL`);
  console.log('----------------------------------------------------------------\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runVanSuTestSuite();
