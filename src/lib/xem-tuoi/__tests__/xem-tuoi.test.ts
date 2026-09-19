/**
 * Bộ Kiểm Thử Module Xem Tuổi (Vợ Chồng, Làm Ăn, Sinh Con, Xông Đất)
 */

import {
  evaluateNguHanh,
  evaluateThienCan,
  evaluateDiaChi,
  evaluateCungPhi,
} from '../hop-khac-rules';
import { evaluateVoChong } from '../vo-chong';
import { evaluateLamAn } from '../lam-an';
import { evaluateSinhCon } from '../sinh-con';
import { getTopXongDat } from '../xong-dat';

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

async function runXemTuoiTestSuite() {
  console.log('================================================================');
  console.log('     BỘ KIỂM THỬ XEM TUỔI TOÀN DIỆN (HỢP KHẮC CỔ TRUYỀN)        ');
  console.log('================================================================\n');

  // 1. Kiểm thử Ngũ Hành Hợp Khắc
  console.log('📌 SUITE 1: Kiểm thử Ngũ Hành Tương Sinh / Tương Khắc');
  const sinhKimThuy = evaluateNguHanh('Kim', 'Thủy');
  assert(sinhKimThuy.score === 2 && sinhKimThuy.relation === 'Tương Sinh', 'Kim sinh Thủy đạt 2 điểm tương sinh');

  const khacKimMoc = evaluateNguHanh('Kim', 'Mộc');
  assert(khacKimMoc.score === 0 && khacKimMoc.relation === 'Tương Khắc', 'Kim khắc Mộc đạt 0 điểm tương khắc');

  const hoaKimKim = evaluateNguHanh('Kim', 'Kim');
  assert(hoaKimKim.score === 1 && hoaKimKim.relation === 'Bình Hòa', 'Kim với Kim bình hòa đạt 1 điểm');

  // 2. Kiểm thử Thiên Can Hợp Xung
  console.log('\n📌 SUITE 2: Kiểm thử Thiên Can Ngũ Hợp & Tương Xung');
  const hopGiapKy = evaluateThienCan('Giáp', 'Kỷ');
  assert(hopGiapKy.score === 2 && hopGiapKy.relation === 'Tương Hợp', 'Giáp - Kỷ ngũ hợp đạt 2 điểm');

  const hopAtCanh = evaluateThienCan('Ất', 'Canh');
  assert(hopAtCanh.score === 2 && hopAtCanh.relation === 'Tương Hợp', 'Ất - Canh ngũ hợp đạt 2 điểm');

  const xungGiapCanh = evaluateThienCan('Giáp', 'Canh');
  assert(xungGiapCanh.score === 0 && xungGiapCanh.relation === 'Tương Xung', 'Giáp - Canh tương xung đạt 0 điểm');

  const hoaGiapDinh = evaluateThienCan('Giáp', 'Đinh');
  assert(hoaGiapDinh.score === 1 && hoaGiapDinh.relation === 'Bình Hòa', 'Giáp - Đinh bình hòa đạt 1 điểm');

  // 3. Kiểm thử Địa Chi Tam Hợp, Lục Hợp, Lục Xung
  console.log('\n📌 SUITE 3: Kiểm thử Địa Chi Tam Hợp, Lục Hợp, Lục Xung, Lục Hại');
  const lucHopTySuu = evaluateDiaChi('Tý', 'Sửu');
  assert(lucHopTySuu.score === 2 && lucHopTySuu.relation === 'Lục Hợp', 'Tý - Sửu lục hợp đạt 2 điểm');

  const tamHopThanTy = evaluateDiaChi('Thân', 'Tý');
  assert(tamHopThanTy.score === 2 && tamHopThanTy.relation === 'Tam Hợp', 'Thân - Tý tam hợp đạt 2 điểm');

  const lucXungTyNgo = evaluateDiaChi('Tý', 'Ngọ');
  assert(lucXungTyNgo.score === 0 && lucXungTyNgo.relation === 'Lục Xung', 'Tý - Ngọ lục xung đạt 0 điểm');

  const lucHaiTyMui = evaluateDiaChi('Tý', 'Mùi');
  assert(lucHaiTyMui.score === 0 && lucHaiTyMui.relation === 'Lục Hại', 'Tý - Mùi lục hại đạt 0 điểm');

  // 4. Kiểm thử Cung Phi Bát San
  console.log('\n📌 SUITE 4: Kiểm thử Cung Phi Bát San (Bát Trạch Phối Ngẫu)');
  const canDoai = evaluateCungPhi('Càn', 'Đoài');
  assert(canDoai.score === 2 && canDoai.batSan === 'Sinh Khí', 'Càn phối Đoài là Sinh Khí (Đại Cát)');

  const canLy = evaluateCungPhi('Càn', 'Ly');
  assert(canLy.score === 0 && canLy.batSan === 'Tuyệt Mệnh', 'Càn phối Ly là Tuyệt Mệnh (Đại Hung)');
  assert(!!canLy.hoaGiaiAdvice, 'Có hướng dẫn hóa giải cho cung Tuyệt Mệnh');

  const khamTon = evaluateCungPhi('Khảm', 'Tốn');
  assert(khamTon.score === 2 && khamTon.batSan === 'Sinh Khí', 'Khảm phối Tốn là Sinh Khí');

  // 5. Kiểm thử Xem Tuổi Vợ Chồng
  console.log('\n📌 SUITE 5: Kiểm thử Xem Tuổi Vợ Chồng (evaluateVoChong)');
  // Chồng 1984 (Giáp Tý - Hải Trung Kim), Vợ 1985 (Ất Sửu - Hải Trung Kim)
  const vc1984_1985 = evaluateVoChong(1984, 1985);
  assert(vc1984_1985.chong.hoaGiap.canChi === 'Giáp Tý', 'Chồng 1984 là Giáp Tý');
  assert(vc1984_1985.vo.hoaGiap.canChi === 'Ất Sửu', 'Vợ 1985 là Ất Sửu');
  assert(vc1984_1985.scores.diaChi.relation === 'Lục Hợp', 'Địa chi Tý - Sửu Lục Hợp');
  assert(vc1984_1985.scores.totalScore >= 6, `Tổng điểm vợ chồng 1984-1985 >= 6 (Thực tế: ${vc1984_1985.scores.totalScore})`);

  // Chồng 1990 (Canh Ngọ), Vợ 1993 (Quý Dậu)
  const vc1990_1993 = evaluateVoChong(1990, 1993);
  assert(vc1990_1993.scores.totalScore >= 0 && vc1990_1993.scores.totalScore <= 10, 'Điểm số vợ chồng nằm trong khoảng 0-10');
  assert(!!vc1990_1993.conclusion.advice, 'Có lời khuyên hôn nhân và hướng dẫn hóa giải');

  // 6. Kiểm thử Xem Tuổi Làm Ăn
  console.log('\n📌 SUITE 6: Kiểm thử Xem Tuổi Làm Ăn (evaluateLamAn)');
  const laReport = evaluateLamAn(1990, 1993);
  assert(laReport.scores.totalScore >= 0 && laReport.scores.totalScore <= 10, 'Điểm làm ăn nằm trong khoảng 0-10');
  assert(!!laReport.conclusion.phanChiaVaiTro, 'Có gợi ý phân chia vai trò điều hành');

  // 7. Kiểm thử Xem Tuổi Sinh Con
  console.log('\n📌 SUITE 7: Kiểm thử Xem Tuổi Sinh Con (evaluateSinhCon)');
  // Bố 1990, Mẹ 1993, Con dự kiến 2026 (Bính Ngọ)
  const scReport = evaluateSinhCon(1990, 1993, 2026);
  assert(scReport.selectedYear.conYear === 2026, 'Năm con được chọn là 2026');
  assert(scReport.recommendedYears.length === 5, 'Quét đủ 5 năm liên tiếp');
  assert(scReport.recommendedYears[0].totalScore >= scReport.recommendedYears[4].totalScore, 'Danh sách năm gợi ý sắp xếp giảm dần theo điểm');

  // 8. Kiểm thử Xem Tuổi Xông Đất
  console.log('\n📌 SUITE 8: Kiểm thử Xem Tuổi Xông Đất (getTopXongDat)');
  const xdReport = getTopXongDat(1990, 2026);
  assert(xdReport.giaChu.birthYear === 1990, 'Gia chủ sinh năm 1990');
  assert(xdReport.targetYear === 2026, 'Năm xem là 2026');
  assert(xdReport.topCandidates.length > 0, `Tìm thấy danh sách người xông đất (Thực tế: ${xdReport.topCandidates.length})`);
  assert(xdReport.topCandidates[0].score >= 6, 'Tuổi đứng đầu danh sách đạt điểm Cát trở lên (>= 6)');
  assert(xdReport.topCandidates[0].reasons.length > 0, 'Có đầy đủ lý do tương hợp');

  console.log('\n----------------------------------------------------------------');
  console.log(`KẾT QUẢ: ${passedTests} PASS, ${failedTests} FAIL`);
  console.log('----------------------------------------------------------------\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runXemTuoiTestSuite().catch(err => {
  console.error('Lỗi ngoại lệ trong bộ test Xem Tuổi:', err);
  process.exit(1);
});
