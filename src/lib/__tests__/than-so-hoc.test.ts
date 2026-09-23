/**
 * Bộ kiểm thử Thần Số Học Pythagoras (Life Path Number & Master Numbers)
 */

import { calculateLifePathNumber, NUMEROLOGY_DATA } from '../than-so-hoc';

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

function runThanSoHocTestSuite() {
  console.log('================================================================');
  console.log('   BỘ KIỂM THỬ THẦN SỐ HỌC PYTHAGORAS & SỐ CHỦ ĐẠO              ');
  console.log('================================================================\n');

  // 1. Kiểm thử đầy đủ dữ liệu con số chủ đạo
  console.log('📌 SUITE 1: Kiểm thử toàn vẹn dữ liệu NUMEROLOGY_DATA');
  const requiredNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 22, 33];
  for (const num of requiredNumbers) {
    const item = NUMEROLOGY_DATA[num];
    assert(item !== undefined, `Con số ${num} có trong NUMEROLOGY_DATA`);
    assert(Boolean(item?.title && item.title.length > 0), `Con số ${num} có tiêu đề định danh`);
    assert(Boolean(item?.description && item.description.length > 0), `Con số ${num} có mô tả chi tiết`);
    assert(Boolean(item?.strengths && item.strengths.length >= 3), `Con số ${num} có ít nhất 3 điểm mạnh`);
    assert(Boolean(item?.challenges && item.challenges.length >= 3), `Con số ${num} có ít nhất 3 bài học thử thách`);
    assert(Boolean(item?.careers && item.careers.length >= 3), `Con số ${num} có ít nhất 3 gợi ý nghề nghiệp`);
  }

  // 2. Kiểm thử thuật toán tính Số Chủ Đạo chuẩn Pythagoras (David A. Phillips / Quỳnh Hương)
  console.log('\n📌 SUITE 2: Kiểm thử thuật toán tính Số Chủ Đạo qua các mốc ngày sinh');

  // 15/07/1995: 1+5+0+7+1+9+9+5 = 37 -> 3+7 = 10
  const lp1 = calculateLifePathNumber(15, 7, 1995);
  assert(lp1 === 10, `15/07/1995 có số chủ đạo là 10 (Thực tế: ${lp1})`);

  // 16/02/1981: 1+6+2+1+9+8+1 = 28 -> 2+8 = 10
  const lp2 = calculateLifePathNumber(16, 2, 1981);
  assert(lp2 === 10, `16/02/1981 có số chủ đạo là 10 (Thực tế: ${lp2})`);

  // 01/01/1997: 1+1+1+9+9+7 = 28 -> 2+8 = 10
  const lp3 = calculateLifePathNumber(1, 1, 1997);
  assert(lp3 === 10, `01/01/1997 có số chủ đạo là 10 (Thực tế: ${lp3})`);

  // 19/09/1995: 1+9+9+1+9+9+5 = 43 -> 4+3 = 7
  const lp4 = calculateLifePathNumber(19, 9, 1995);
  assert(lp4 === 7, `19/09/1995 có số chủ đạo là 7 (Thực tế: ${lp4})`);

  // 01/01/2000: 1+1+2+0+0+0 = 4
  const lp5 = calculateLifePathNumber(1, 1, 2000);
  assert(lp5 === 4, `01/01/2000 có số chủ đạo là 4 (Thực tế: ${lp5})`);

  // 03/10/1988: 3+1+0+1+9+8+8 = 30 -> 3+0 = 3
  const lp6 = calculateLifePathNumber(3, 10, 1988);
  assert(lp6 === 3, `03/10/1988 có số chủ đạo là 3 (Thực tế: ${lp6})`);

  // 18/06/1987: 1+8+6+1+9+8+7 = 40 -> 4+0 = 4
  const lp7 = calculateLifePathNumber(18, 6, 1987);
  assert(lp7 === 4, `18/06/1987 có số chủ đạo là 4 (Thực tế: ${lp7})`);

  // 09/08/1975: 9+8+1+9+7+5 = 39 -> 3+9 = 12 -> 1+2 = 3
  const lp8 = calculateLifePathNumber(9, 8, 1975);
  assert(lp8 === 3, `09/08/1975 có số chủ đạo là 3 (Thực tế: ${lp8})`);

  // 29/09/1980: 2+9+9+1+9+8+0 = 38 -> 3+8 = 11 (Master 11)
  const lp9 = calculateLifePathNumber(29, 9, 1980);
  assert(lp9 === 11, `29/09/1980 giữ nguyên Master Number 11 (Thực tế: ${lp9})`);

  // 28/05/1994: 2+8+5+1+9+9+4 = 38 -> 3+8 = 11 (Master 11)
  const lp10 = calculateLifePathNumber(28, 5, 1994);
  assert(lp10 === 11, `28/05/1994 giữ nguyên Master Number 11 (Thực tế: ${lp10})`);

  // 3. Kiểm thử không bị undefined khi lookup dữ liệu
  console.log('\n📌 SUITE 3: Kiểm thử dữ liệu hiển thị không bao giờ bị fallback sai');
  for (let d = 1; d <= 28; d += 3) {
    for (let m = 1; m <= 12; m += 2) {
      for (let y = 1960; y <= 2025; y += 10) {
        const lp = calculateLifePathNumber(d, m, y);
        const data = NUMEROLOGY_DATA[lp];
        assert(data !== undefined, `Ngày sinh ${d}/${m}/${y} cho số ${lp} có data hợp lệ`);
      }
    }
  }

  console.log('\n----------------------------------------------------------------');
  console.log(`KẾT QUẢ: ${passedTests} PASS, ${failedTests} FAIL`);
  console.log('----------------------------------------------------------------\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runThanSoHocTestSuite();
