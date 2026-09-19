/**
 * Bộ kiểm thử Tử Vi Cá Nhân Hóa, Cửu Diệu Sao Chiếu Mệnh, Bát Hạn & Cung Phi Bát Trạch
 */

import { getSaoChieuMenh } from '../sao-chieu-menh';
import { getBatHan } from '../bat-han';
import { getCungPhi } from '../cung-phi';
import { getHoaGiapData, getAllHoaGiapList } from '../hoa-giap';
import { getTuViPersonalReport } from '../index';

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

async function runTuViTestSuite() {
  console.log('================================================================');
  console.log('   BỘ KIỂM THỬ TỬ VI, CỬU DIỆU, BÁT HẠN & CUNG PHI (SPRINT 5)   ');
  console.log('================================================================\n');

  // 1. Kiểm thử Cửu Diệu Sao Chiếu Mệnh
  console.log('📌 SUITE 1: Kiểm thử Cửu Diệu Sao Chiếu Mệnh theo tuổi mụ & giới tính');

  // Nam 37 tuổi mụ (ví dụ sinh 1990 vào năm 2026) -> La Hầu
  const saoNam37 = getSaoChieuMenh(37, 'nam');
  assert(saoNam37.name === 'La Hầu', 'Nam 37 tuổi mụ chiếu mệnh bởi sao La Hầu');
  assert(saoNam37.nature === 'HUNG', 'Sao La Hầu là Hung tinh');
  assert(saoNam37.cungSao.soDen === 9, 'Cúng sao La Hầu thắp 9 ngọn đèn');

  // Nữ 37 tuổi mụ -> Kế Đô
  const saoNu37 = getSaoChieuMenh(37, 'nu');
  assert(saoNu37.name === 'Kế Đô', 'Nữ 37 tuổi mụ chiếu mệnh bởi sao Kế Đô');
  assert(saoNu37.nature === 'HUNG', 'Sao Kế Đô là Đại Hung tinh');
  assert(saoNu37.cungSao.soDen === 21, 'Cúng sao Kế Đô thắp 21 ngọn đèn');

  // Nam 34 tuổi mụ (ví dụ sinh 1993 vào năm 2026) -> Kế Đô
  const saoNam34 = getSaoChieuMenh(34, 'nam');
  assert(saoNam34.name === 'Kế Đô', 'Nam 34 tuổi mụ chiếu mệnh bởi sao Kế Đô');

  // Nữ 34 tuổi mụ -> Thái Dương
  const saoNu34 = getSaoChieuMenh(34, 'nu');
  assert(saoNu34.name === 'Thái Dương', 'Nữ 34 tuổi mụ chiếu mệnh bởi sao Thái Dương');
  assert(saoNu34.nature === 'CAT', 'Sao Thái Dương là Cát tinh');

  // Nam 31 tuổi mụ -> Thái Bạch
  const saoNam31 = getSaoChieuMenh(31, 'nam');
  assert(saoNam31.name === 'Thái Bạch', 'Nam 31 tuổi mụ chiếu mệnh bởi sao Thái Bạch');

  // Nữ 31 tuổi mụ -> Thái Âm
  const saoNu31 = getSaoChieuMenh(31, 'nu');
  assert(saoNu31.name === 'Thái Âm', 'Nữ 31 tuổi mụ chiếu mệnh bởi sao Thái Âm');

  // Nam 32 tuổi mụ -> Thái Dương
  const saoNam32 = getSaoChieuMenh(32, 'nam');
  assert(saoNam32.name === 'Thái Dương', 'Nam 32 tuổi mụ chiếu mệnh bởi sao Thái Dương');

  // Nữ 32 tuổi mụ -> Thổ Tú
  const saoNu32 = getSaoChieuMenh(32, 'nu');
  assert(saoNu32.name === 'Thổ Tú', 'Nữ 32 tuổi mụ chiếu mệnh bởi sao Thổ Tú');

  // 2. Kiểm thử Bát Hạn Niên Vận
  console.log('\n📌 SUITE 2: Kiểm thử Bát Hạn Niên Vận');
  // Nam 37 tuổi mụ -> Tán Tận
  const hanNam37 = getBatHan(37, 'nam');
  assert(hanNam37.name === 'Tán Tận', 'Nam 37 tuổi mụ gặp hạn Tán Tận');
  assert(hanNam37.level === 'DAI_HAN', 'Hạn Tán Tận là Đại Hạn');

  // Nữ 37 tuổi mụ -> Diêm Vương
  const hanNu37 = getBatHan(37, 'nu');
  assert(hanNu37.name === 'Diêm Vương', 'Nữ 37 tuổi mụ gặp hạn Diêm Vương');

  // Nam 34 tuổi mụ -> Tam Kheo
  const hanNam34 = getBatHan(34, 'nam');
  assert(hanNam34.name === 'Tam Kheo', 'Nam 34 tuổi mụ gặp hạn Tam Kheo');
  assert(hanNam34.level === 'TIEU_HAN', 'Hạn Tam Kheo là Tiểu Hạn');

  // Nữ 34 tuổi mụ -> Thiên Tinh
  const hanNu34 = getBatHan(34, 'nu');
  assert(hanNu34.name === 'Thiên Tinh', 'Nữ 34 tuổi mụ gặp hạn Thiên Tinh');

  // 3. Kiểm thử Cung Phi & Bát Trạch Hướng Nhà
  console.log('\n📌 SUITE 3: Kiểm thử Cung Phi & 8 Hướng Bát Trạch');
  // Nam 1993 (Quý Dậu) -> Cung Càn (Kim), Tây Tứ Mệnh
  const cungNam1993 = getCungPhi(1993, 'nam');
  assert(cungNam1993.cung === 'Càn', 'Nam 1993 Cung Phi là Càn');
  assert(cungNam1993.nhomMenh === 'Tây Tứ Mệnh', 'Nam 1993 thuộc Tây Tứ Mệnh');
  const sinhKhiNam1993 = cungNam1993.chiTietHuong.find(h => h.loai === 'Sinh Khí');
  assert(sinhKhiNam1993?.huong === 'Tây', 'Nam 1993 hướng Sinh Khí là Tây');
  const tuyetMenhNam1993 = cungNam1993.chiTietHuong.find(h => h.loai === 'Tuyệt Mệnh');
  assert(tuyetMenhNam1993?.huong === 'Nam', 'Nam 1993 hướng Tuyệt Mệnh là Nam');

  // Nữ 1993 (Quý Dậu) -> 4 + 5 = 9 -> Cung Ly (Hỏa), Đông Tứ Mệnh
  const cungNu1993 = getCungPhi(1993, 'nu');
  assert(cungNu1993.cung === 'Ly', 'Nữ 1993 Cung Phi là Ly');
  assert(cungNu1993.nhomMenh === 'Đông Tứ Mệnh', 'Nữ 1993 thuộc Đông Tứ Mệnh');

  // Nam 1990 (Canh Ngọ) -> 10 - 1 = 9 -> Cung Ly (Hỏa), Đông Tứ Mệnh
  const cungNam1990 = getCungPhi(1990, 'nam');
  assert(cungNam1990.cung === 'Ly', 'Nam 1990 Cung Phi là Ly');
  assert(cungNam1990.nhomMenh === 'Đông Tứ Mệnh', 'Nam 1990 thuộc Đông Tứ Mệnh');

  // Nữ 1990 (Canh Ngọ) -> 1 + 5 = 6 -> Cung Càn (Kim), Tây Tứ Mệnh
  const cungNu1990 = getCungPhi(1990, 'nu');
  assert(cungNu1990.cung === 'Càn', 'Nữ 1990 Cung Phi là Càn');

  // Nam 1984 (Giáp Tý) -> 10 - 4 = 6 -> Cung Càn (Kim), Tây Tứ Mệnh
  const cungNam1984 = getCungPhi(1984, 'nam');
  assert(cungNam1984.cung === 'Càn', 'Nam 1984 Cung Phi là Càn');

  // Nữ 1984 (Giáp Tý) -> 4 + 5 = 9 -> Cung Ly (Hỏa), Đông Tứ Mệnh
  const cungNu1984 = getCungPhi(1984, 'nu');
  assert(cungNu1984.cung === 'Ly', 'Nữ 1984 Cung Phi là Ly');

  // Nam 2000 (Canh Thìn) -> 9 - 2 = 7 -> Cung Đoài (Kim), Tây Tứ Mệnh
  const cungNam2000 = getCungPhi(2000, 'nam');
  assert(cungNam2000.cung === 'Đoài', 'Nam 2000 Cung Phi là Đoài');

  // 4. Kiểm thử Lục Thập Hoa Giáp
  console.log('\n📌 SUITE 4: Kiểm thử Lục Thập Hoa Giáp & Nạp Âm');
  const hg1984 = getHoaGiapData(1984);
  assert(hg1984.canChi === 'Giáp Tý', 'Năm 1984 Can Chi là Giáp Tý');
  assert(hg1984.menh.includes('Hải Trung Kim'), 'Năm 1984 mệnh Hải Trung Kim');
  assert(hg1984.slug === 'giap-ty-1984', 'Slug hoa giáp là giap-ty-1984');

  const hg1990 = getHoaGiapData(1990);
  assert(hg1990.canChi === 'Canh Ngọ', 'Năm 1990 Can Chi là Canh Ngọ');
  assert(hg1990.menh.includes('Lộ Bàng Thổ'), 'Năm 1990 mệnh Lộ Bàng Thổ');

  const hg1993 = getHoaGiapData(1993);
  assert(hg1993.canChi === 'Quý Dậu', 'Năm 1993 Can Chi là Quý Dậu');
  assert(hg1993.menh.includes('Kiếm Phong Kim'), 'Năm 1993 mệnh Kiếm Phong Kim');

  const allHg = getAllHoaGiapList();
  assert(allHg.length === 66, `Danh sách hoa giáp có đúng 66 năm (1960-2025) (Thực tế: ${allHg.length})`);

  // 5. Kiểm thử Báo Cáo Tử Vi Cá Nhân Hóa Tổng Hợp
  console.log('\n📌 SUITE 5: Kiểm thử Báo Cáo Tử Vi Cá Nhân Hóa (getTuViPersonalReport)');
  const report = getTuViPersonalReport(1993, 2026, 'nam');
  assert(report.birthYear === 1993, 'Năm sinh 1993');
  assert(report.currentYear === 2026, 'Năm xem 2026');
  assert(report.tuoiMu === 34, 'Tuổi mụ là 34');
  assert(report.saoChieuMenh.name === 'Kế Đô', 'Sao chiếu mệnh là Kế Đô');
  assert(report.batHan.name === 'Tam Kheo', 'Bát hạn là Tam Kheo');
  assert(report.cungPhi.cung === 'Càn', 'Cung Phi là Càn');
  assert(report.tamTai.isPham === false, 'Năm 2026 tuổi Dậu không phạm Tam Tai');
  assert(report.kimLau.isPham === false, 'Tuổi 34 không phạm Kim Lâu');
  assert(report.hoangOc.isGood === true, 'Tuổi 34 trúng Nhất Cát Hoang Ốc');

  console.log('\n----------------------------------------------------------------');
  console.log(`KẾT QUẢ: ${passedTests} PASS, ${failedTests} FAIL`);
  console.log('----------------------------------------------------------------\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTuViTestSuite().catch(err => {
  console.error('Lỗi ngoại lệ trong bộ test Tử Vi:', err);
  process.exit(1);
});
