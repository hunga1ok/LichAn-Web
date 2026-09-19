import {
  checkTamTai,
  checkKimLau,
  checkHoangOc,
  xemTuoiLamNha,
  getTuoiMuonLamNha,
} from '../index';

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

function runFengShuiTestSuite() {
  console.log('================================================================');
  console.log('    BỘ KIỂM THỬ PHONG THỦY: TAM TAI - KIM LÂU - HOANG ỐC        ');
  console.log('================================================================\n');

  // ============================================================================
  // SUITE 1: Kiểm tra hạn Tam Tai theo Tam Hợp cục
  // ============================================================================
  console.log('📌 SUITE 1: Kiểm tra hạn Tam Tai');

  // Nhóm 1: Thân - Tý - Thìn (Tam Tai Dần - Mão - Thìn)
  const ty1984 = 1984; // Giáp Tý
  assert(checkTamTai(ty1984, 2022).isPham && checkTamTai(ty1984, 2022).yearRank === 1, 'Tuổi Tý gặp năm Dần (2022) là Tam Tai năm 1');
  assert(checkTamTai(ty1984, 2023).isPham && checkTamTai(ty1984, 2023).yearRank === 2, 'Tuổi Tý gặp năm Mão (2023) là Tam Tai năm 2');
  assert(checkTamTai(ty1984, 2024).isPham && checkTamTai(ty1984, 2024).yearRank === 3, 'Tuổi Tý gặp năm Thìn (2024) là Tam Tai năm 3');
  assert(!checkTamTai(ty1984, 2025).isPham, 'Tuổi Tý gặp năm Tỵ (2025) không phạm Tam Tai');
  assert(!checkTamTai(ty1984, 2026).isPham, 'Tuổi Tý gặp năm Ngọ (2026) không phạm Tam Tai');

  // Nhóm 2: Dần - Ngọ - Tuất (Tam Tai Thân - Dậu - Tuất)
  const ngo1990 = 1990; // Canh Ngọ
  assert(checkTamTai(ngo1990, 2028).isPham, 'Tuổi Ngọ gặp năm Thân (2028) phạm Tam Tai');
  assert(checkTamTai(ngo1990, 2029).isPham, 'Tuổi Ngọ gặp năm Dậu (2029) phạm Tam Tai');
  assert(checkTamTai(ngo1990, 2030).isPham, 'Tuổi Ngọ gặp năm Tuất (2030) phạm Tam Tai');
  assert(!checkTamTai(ngo1990, 2026).isPham, 'Tuổi Ngọ gặp năm Ngọ (2026) không phạm Tam Tai');

  // Nhóm 3: Tỵ - Dậu - Sửu (Tam Tai Hợi - Tý - Sửu)
  const dau1993 = 1993; // Quý Dậu
  assert(checkTamTai(dau1993, 2031).isPham, 'Tuổi Dậu gặp năm Hợi (2031) phạm Tam Tai');
  assert(checkTamTai(dau1993, 2032).isPham, 'Tuổi Dậu gặp năm Tý (2032) phạm Tam Tai');
  assert(checkTamTai(dau1993, 2033).isPham, 'Tuổi Dậu gặp năm Sửu (2033) phạm Tam Tai');
  assert(!checkTamTai(dau1993, 2026).isPham, 'Tuổi Dậu gặp năm Ngọ (2026) không phạm Tam Tai');

  // Nhóm 4: Hợi - Mão - Mùi (Tam Tai Tỵ - Ngọ - Mùi)
  const hoi1995 = 1995; // Ất Hợi
  assert(checkTamTai(hoi1995, 2025).isPham && checkTamTai(hoi1995, 2025).yearRank === 1, 'Tuổi Hợi gặp năm Tỵ (2025) phạm Tam Tai năm 1');
  assert(checkTamTai(hoi1995, 2026).isPham && checkTamTai(hoi1995, 2026).yearRank === 2, 'Tuổi Hợi gặp năm Ngọ (2026) phạm Tam Tai năm 2');
  assert(checkTamTai(hoi1995, 2027).isPham && checkTamTai(hoi1995, 2027).yearRank === 3, 'Tuổi Hợi gặp năm Mùi (2027) phạm Tam Tai năm 3');
  assert(!checkTamTai(hoi1995, 2028).isPham, 'Tuổi Hợi gặp năm Thân (2028) không phạm Tam Tai');

  // ============================================================================
  // SUITE 2: Kiểm tra hạn Kim Lâu (Tuổi Mụ chia 9)
  // ============================================================================
  console.log('\n📌 SUITE 2: Kiểm tra hạn Kim Lâu');

  // Kim Lâu Thân (dư 1)
  const klThanAges = [19, 28, 37, 46, 55];
  for (const age of klThanAges) {
    const birthYear = 2026 - age + 1;
    const res = checkKimLau(birthYear, 2026);
    assert(res.isPham && res.type === 'than', `Tuổi mụ ${age} chia 9 dư 1 phạm Kim Lâu Thân`);
  }

  // Kim Lâu Thê (dư 3)
  const klTheAges = [21, 30, 39, 48, 57];
  for (const age of klTheAges) {
    const birthYear = 2026 - age + 1;
    const res = checkKimLau(birthYear, 2026);
    assert(res.isPham && res.type === 'the', `Tuổi mụ ${age} chia 9 dư 3 phạm Kim Lâu Thê`);
  }

  // Kim Lâu Tử (dư 6)
  const klTuAges = [24, 33, 42, 51, 60];
  for (const age of klTuAges) {
    const birthYear = 2026 - age + 1;
    const res = checkKimLau(birthYear, 2026);
    assert(res.isPham && res.type === 'tu', `Tuổi mụ ${age} chia 9 dư 6 phạm Kim Lâu Tử`);
  }

  // Kim Lâu Súc (dư 8)
  const klSucAges = [26, 35, 44, 53, 62];
  for (const age of klSucAges) {
    const birthYear = 2026 - age + 1;
    const res = checkKimLau(birthYear, 2026);
    assert(res.isPham && res.type === 'suc', `Tuổi mụ ${age} chia 9 dư 8 phạm Kim Lâu Lục Súc`);
  }

  // Các tuổi KHÔNG phạm Kim Lâu (dư 0, 2, 4, 5, 7)
  const nonKlAges = [20, 22, 23, 25, 27, 29, 31, 32, 34, 36, 38, 40];
  for (const age of nonKlAges) {
    const birthYear = 2026 - age + 1;
    const res = checkKimLau(birthYear, 2026);
    assert(!res.isPham && res.type === 'none', `Tuổi mụ ${age} không phạm Kim Lâu`);
  }

  // ============================================================================
  // SUITE 3: Kiểm tra hạn Hoang Ốc (Vòng 6 cung)
  // ============================================================================
  console.log('\n📌 SUITE 3: Kiểm tra hạn Hoang Ốc');

  const goodHoangOcExpectations: Record<number, string> = {
    20: 'Nhì Nghi',
    25: 'Nhất Cát',
    28: 'Tứ Tấn Tài',
    31: 'Tứ Tấn Tài',
    34: 'Nhất Cát',
    35: 'Nhì Nghi',
    40: 'Tứ Tấn Tài',
    43: 'Nhất Cát',
    44: 'Nhì Nghi',
    49: 'Nhất Cát',
  };

  for (const [ageStr, expectedCung] of Object.entries(goodHoangOcExpectations)) {
    const age = parseInt(ageStr, 10);
    const birthYear = 2026 - age + 1;
    const res = checkHoangOc(birthYear, 2026);
    assert(res.isGood && res.cungName === expectedCung, `Tuổi mụ ${age} Hoang Ốc là ${expectedCung} (Cát)`);
  }

  const badHoangOcExpectations: Record<number, string> = {
    29: 'Ngũ Thọ Tử',
    30: 'Tam Địa Sát',
    32: 'Ngũ Thọ Tử',
    33: 'Lục Hoang Ốc',
    36: 'Tam Địa Sát',
    38: 'Ngũ Thọ Tử',
    39: 'Lục Hoang Ốc',
  };

  for (const [ageStr, expectedCung] of Object.entries(badHoangOcExpectations)) {
    const age = parseInt(ageStr, 10);
    const birthYear = 2026 - age + 1;
    const res = checkHoangOc(birthYear, 2026);
    assert(!res.isGood && res.cungName === expectedCung, `Tuổi mụ ${age} Hoang Ốc là ${expectedCung} (Hung)`);
  }

  // ============================================================================
  // SUITE 4: Kiểm tra Tổng Hợp Xem Tuổi Làm Nhà & Mượn Tuổi
  // ============================================================================
  console.log('\n📌 SUITE 4: Kiểm tra Đánh giá Tổng Hợp & Thuật toán Mượn Tuổi');

  // Case 1: Tuổi Đại Cát làm nhà năm 2026
  // Tuổi Quý Dậu 1993: Năm 2026 tuổi mụ 34 (Hoang ốc: Nhất Cát, Kim Lâu: Dư 7 -> Không phạm, Tam Tai: Hợi Tý Sửu -> Không phạm)
  const result1993 = xemTuoiLamNha(1993, 2026);
  assert(result1993.canBuild, 'Tuổi 1993 năm 2026 được làm nhà (canBuild = true)');
  assert(result1993.score === 100, 'Tuổi 1993 năm 2026 đạt 100 điểm đại cát');
  assert(!result1993.tamTai.isPham && !result1993.kimLau.isPham && result1993.hoangOc.isGood, 'Tuổi 1993 sạch cả 3 hạn');

  // Case 2: Tuổi Phạm Đại Kỵ cần mượn tuổi
  // Tuổi Giáp Tuất 1994: Năm 2026 tuổi mụ 33 (Hoang ốc: Lục Hoang Ốc, Kim Lâu: 33 % 9 = 6 -> Phạm Kim Lâu Tử)
  const result1994 = xemTuoiLamNha(1994, 2026);
  assert(!result1994.canBuild, 'Tuổi 1994 năm 2026 không được làm nhà (canBuild = false)');
  assert(result1994.suggestedAges !== undefined && result1994.suggestedAges.length > 0, 'Phải có danh sách gợi ý mượn tuổi khi phạm hạn');

  // Case 3: Kiểm tra tính chuẩn xác của danh sách mượn tuổi
  const suggested2026 = getTuoiMuonLamNha(2026, 1994);
  assert(suggested2026.length >= 5, `Năm 2026 tìm thấy ít nhất 5 tuổi đẹp để mượn (hiện có ${suggested2026.length})`);
  
  // Mọi tuổi được gợi ý mượn tuổi BẮT BUỘC phải sạch cả 3 hạn
  const allSuggestedAreClean = suggested2026.every((t) => {
    const tt = checkTamTai(t.birthYear, 2026);
    const kl = checkKimLau(t.birthYear, 2026);
    const ho = checkHoangOc(t.birthYear, 2026);
    return !tt.isPham && !kl.isPham && ho.isGood;
  });
  assert(allSuggestedAreClean, 'Mọi tuổi trong danh sách mượn tuổi đều sạch cả 3 hạn Tam Tai, Kim Lâu, Hoang Ốc');

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

runFengShuiTestSuite();
