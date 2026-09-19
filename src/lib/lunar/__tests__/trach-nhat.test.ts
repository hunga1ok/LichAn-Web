/**
 * Bộ kiểm thử đơn vị chuyên sâu cho Module Trạch Nhật (Xem Ngày Tốt Chuyên Sâu)
 * Căn cứ theo Hiệp Kỷ Biện Phương Thư & Ngọc Hạp Thông Thư
 */

import {
  isTamNuong,
  isNguyetKy,
  isSatChu,
  isThuTu,
  isNguyetPha,
  isBatTuong,
  getPhuongViXuatHanh,
  getGioLyThuanPhong,
} from '../core/trach-nhat';

import { lunarService } from '../service';
import type { AuspiciousPurpose } from '@/types/lunar';

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

function runTrachNhatTestSuite() {
  console.log('================================================================');
  console.log('  BỘ KIỂM THỬ TRẠCH NHẬT (HIỆP KỶ BIỆN PHƯƠNG THƯ & NGỌC HẠP)   ');
  console.log('================================================================\n');

  // 1. Kiểm tra ngày Tam Nương
  console.log('📌 SUITE 1: Kiểm tra ngày Tam Nương (Mùng 3, 7, 13, 18, 22, 27 âm lịch)');
  const tamNuongDays = [3, 7, 13, 18, 22, 27];
  for (const d of tamNuongDays) {
    assert(isTamNuong(d), `Ngày ${d} âm lịch phải là Tam Nương`);
  }
  const nonTamNuongDays = [1, 2, 4, 5, 6, 8, 14, 15, 20, 28, 30];
  for (const d of nonTamNuongDays) {
    assert(!isTamNuong(d), `Ngày ${d} âm lịch không phải là Tam Nương`);
  }

  // 2. Kiểm tra ngày Nguyệt Kỵ
  console.log('\n📌 SUITE 2: Kiểm tra ngày Nguyệt Kỵ (Mùng 5, 14, 23 âm lịch)');
  const nguyetKyDays = [5, 14, 23];
  for (const d of nguyetKyDays) {
    assert(isNguyetKy(d), `Ngày ${d} âm lịch phải là Nguyệt Kỵ`);
  }
  const nonNguyetKyDays = [1, 3, 7, 10, 15, 22, 29];
  for (const d of nonNguyetKyDays) {
    assert(!isNguyetKy(d), `Ngày ${d} âm lịch không phải là Nguyệt Kỵ`);
  }

  // 3. Kiểm tra ngày Sát Chủ trong 12 tháng âm lịch
  console.log('\n📌 SUITE 3: Kiểm tra ngày Sát Chủ (Ngọc Hạp Thông Thư)');
  const satChuExpected: Record<number, string> = {
    1: 'Tỵ', 2: 'Tý', 3: 'Mùi', 4: 'Mão',
    5: 'Thân', 6: 'Tuất', 7: 'Hợi', 8: 'Sửu',
    9: 'Ngọ', 10: 'Dậu', 11: 'Dần', 12: 'Thìn',
  };
  for (let m = 1; m <= 12; m++) {
    const expectedChi = satChuExpected[m];
    assert(isSatChu(m, expectedChi), `Tháng ${m} âm lịch ngày ${expectedChi} là Sát Chủ`);
    assert(!isSatChu(m, 'Thân' === expectedChi ? 'Dần' : 'Thân'), `Tháng ${m} ngày khác không phải Sát Chủ`);
  }

  // 4. Kiểm tra ngày Thụ Tử trong 12 tháng âm lịch
  console.log('\n📌 SUITE 4: Kiểm tra ngày Thụ Tử (Hiệp Kỷ Biện Phương Thư)');
  const thuTuExpected: Record<number, string> = {
    1: 'Tuất', 2: 'Thìn', 3: 'Hợi', 4: 'Tỵ',
    5: 'Tý', 6: 'Ngọ', 7: 'Sửu', 8: 'Mùi',
    9: 'Dần', 10: 'Thân', 11: 'Mão', 12: 'Dậu',
  };
  for (let m = 1; m <= 12; m++) {
    const expectedChi = thuTuExpected[m];
    assert(isThuTu(m, expectedChi), `Tháng ${m} âm lịch ngày ${expectedChi} là Thụ Tử`);
    assert(!isThuTu(m, 'Ngọ' === expectedChi ? 'Tý' : 'Ngọ'), `Tháng ${m} ngày khác không phải Thụ Tử`);
  }

  // 5. Kiểm tra ngày Nguyệt Phá (Chi ngày xung Chi tháng)
  console.log('\n📌 SUITE 5: Kiểm tra ngày Nguyệt Phá (Lục Xung)');
  // Tháng 1 (Dần) xung Thân
  assert(isNguyetPha(1, 'Thân'), 'Tháng 1 (Dần) ngày Thân là Nguyệt Phá');
  assert(!isNguyetPha(1, 'Dần'), 'Tháng 1 ngày Dần không phải Nguyệt Phá');
  // Tháng 2 (Mão) xung Dậu
  assert(isNguyetPha(2, 'Dậu'), 'Tháng 2 (Mão) ngày Dậu là Nguyệt Phá');
  // Tháng 5 (Ngọ) xung Tý
  assert(isNguyetPha(5, 'Tý'), 'Tháng 5 (Ngọ) ngày Tý là Nguyệt Phá');

  // 6. Kiểm tra ngày Âm Dương Bất Tương
  console.log('\n📌 SUITE 6: Kiểm tra ngày Bất Tương (Đại cát cưới hỏi)');
  assert(isBatTuong(1, 'Bính Dần'), 'Tháng 1: Bính Dần là ngày Bất Tương');
  assert(isBatTuong(1, 'Đinh Mão'), 'Tháng 1: Đinh Mão là ngày Bất Tương');
  assert(!isBatTuong(1, 'Giáp Ngọ'), 'Tháng 1: Giáp Ngọ không phải Bất Tương');
  assert(isBatTuong(8, 'Giáp Tý'), 'Tháng 8: Giáp Tý là ngày Bất Tương');
  assert(isBatTuong(10, 'Canh Tuất'), 'Tháng 10: Canh Tuất là ngày Bất Tương');

  // 7. Kiểm tra Hướng Hỷ Thần & Tài Thần
  console.log('\n📌 SUITE 7: Kiểm tra Hướng Hỷ Thần & Tài Thần theo Can ngày');
  const giapDirections = getPhuongViXuatHanh('Giáp');
  assert(giapDirections.hyThan === 'Đông Bắc', 'Can Giáp: Hỷ Thần ở Đông Bắc');
  assert(giapDirections.taiThan === 'Đông Nam', 'Can Giáp: Tài Thần ở Đông Nam');

  const binhDirections = getPhuongViXuatHanh('Bính');
  assert(binhDirections.hyThan === 'Tây Nam', 'Can Bính: Hỷ Thần ở Tây Nam');
  assert(binhDirections.taiThan === 'Chính Đông', 'Can Bính: Tài Thần ở Chính Đông');

  // 8. Kiểm tra 6 Khung giờ Lý Thuần Phong
  console.log('\n📌 SUITE 8: Kiểm tra 12 Giờ Lý Thuần Phong');
  const lyThuanPhong = getGioLyThuanPhong(1, 1);
  assert(lyThuanPhong.length === 12, 'Phải có đủ 12 canh giờ Lý Thuần Phong');
  assert(lyThuanPhong[0].canhGio === 'Tý', 'Canh giờ đầu tiên phải là Tý');
  const validHourNames = ['Đại An', 'Tốc Hỷ', 'Tiểu Cát', 'Lưu Niên', 'Xích Khẩu', 'Không Vong'];
  const allValidNames = lyThuanPhong.every(g => validHourNames.includes(g.tenGio));
  assert(allValidNames, 'Mọi tên giờ Lý Thuần Phong phải chuẩn xác');

  // 9. Kiểm tra tích hợp Service: getAuspiciousDays
  console.log('\n📌 SUITE 9: Kiểm tra tính toán Ngày Tốt qua LunarService');
  const purposes: AuspiciousPurpose[] = ['cuoi-hoi', 'khai-truong', 'dong-tho', 'xuat-hanh'];

  for (const purpose of purposes) {
    const days = lunarService.getAuspiciousDays(purpose, 10, 2026);
    assert(days.length === 31, `Tháng 10/2026 có 31 ngày (${purpose})`);

    // Kiểm tra quy tắc nghiêm ngặt: Tuyệt đối KHÔNG có ngày nào vướng đại hung mà được xếp là isAuspicious = true
    const invalidAuspicious = days.filter(d => {
      const isBadDay = isTamNuong(d.lunarDay) || isNguyetKy(d.lunarDay);
      return isBadDay && d.isAuspicious;
    });
    assert(
      invalidAuspicious.length === 0,
      `Không có ngày phạm Tam Nương hoặc Nguyệt Kỵ nào bị đánh giá nhầm là Ngày Tốt (${purpose})`
    );

    // Kiểm tra điểm số của ngày tốt phải >= 65 và có lý do
    const goodDays = days.filter(d => d.isAuspicious);
    const scoreValid = goodDays.every(d => d.score >= 65 && d.reasons.length > 0);
    assert(scoreValid, `Mọi ngày cát lành (${purpose}) đều đạt score >= 65 và có lý do minh bạch`);
  }

  // 10. Kiểm tra tích hợp Service: getXuatHanhInfo
  console.log('\n📌 SUITE 10: Kiểm tra getXuatHanhInfo');
  const xuatHanhInfo = lunarService.getXuatHanhInfo(1, 1, 2026);
  assert(!!xuatHanhInfo.hyThan && !!xuatHanhInfo.taiThan, 'Phải có hướng Hỷ Thần và Tài Thần');
  assert(xuatHanhInfo.gioLyThuanPhong.length === 12, 'Phải có đủ 12 khung giờ xuất hành Lý Thuần Phong');

  // ============================================================================
  // TỔNG KẾT
  // ============================================================================
  console.log('\n================================================================');
  console.log(`  KẾT QUẢ KIỂM THỬ: ${passedTests} PASSED / ${failedTests} FAILED`);
  console.log('================================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTrachNhatTestSuite();
