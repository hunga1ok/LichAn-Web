/**
 * Bộ kiểm thử đơn vị chuyên sâu (Comprehensive Unit Tests) cho Thư viện Lịch Âm Lịch An
 * Kiểm tra:
 * 1. Chuyển đổi Dương lịch -> Âm lịch các mốc lịch sử, ngày lễ, tháng nhuận
 * 2. Tính toàn vẹn hai chiều (Solar -> Lunar -> Solar) trên 3.650 ngày liên tiếp
 * 3. Tính Can Chi Năm, Tháng, Ngày, Giờ và Ngũ Hành nạp âm
 * 4. 12 Giờ Hoàng Đạo / Hắc Đạo theo Chi ngày
 * 5. 24 Tiết Khí dựa trên kinh độ Mặt Trời thiên văn
 * 6. 12 Trực cổ truyền (Kiến, Trừ, Mãn... Bế)
 */

import { 
  solarToLunar, 
  lunarToSolar, 
  solarToJd, 
  jdToSolar,
  getCanChiYear,
  getCanChiMonth,
  getCanChiDay,
  getNguHanh,
  getGioHoangDao,
  getTietKhi,
  getTruc,
  getDayInfo
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

function runTestSuite() {
  console.log('================================================================');
  console.log('  BỘ KIỂM THỬ ĐƠN VỊ THUẬT TOÁN LỊCH ÂM VIỆT NAM (HỒ NGỌC ĐỨC)  ');
  console.log('================================================================\n');

  // ============================================================================
  // SUITE 1: Chuyển đổi Dương Lịch -> Âm Lịch các mốc lịch sử & ngày lễ quan trọng
  // ============================================================================
  console.log('📌 SUITE 1: Kiểm tra độ chính xác ngày Âm lịch các mốc chuẩn');
  
  const historicalBenchmarks = [
    // Tết Nguyên Đán
    { s: [25, 1, 2020], l: [1, 1, 2020, 0], name: 'Tết Canh Tý 2020' },
    { s: [12, 2, 2021], l: [1, 1, 2021, 0], name: 'Tết Tân Sửu 2021' },
    { s: [1, 2, 2022],  l: [1, 1, 2022, 0], name: 'Tết Nhâm Dần 2022' },
    { s: [22, 1, 2023], l: [1, 1, 2023, 0], name: 'Tết Quý Mão 2023' },
    { s: [10, 2, 2024], l: [1, 1, 2024, 0], name: 'Tết Giáp Thìn 2024' },
    { s: [29, 1, 2025], l: [1, 1, 2025, 0], name: 'Tết Ất Tỵ 2025' },
    { s: [17, 2, 2026], l: [1, 1, 2026, 0], name: 'Tết Bính Ngọ 2026' },
    { s: [6, 2, 2027],  l: [1, 1, 2027, 0], name: 'Tết Đinh Mùi 2027' },
    { s: [26, 1, 2028], l: [1, 1, 2028, 0], name: 'Tết Mậu Thân 2028' },
    { s: [13, 2, 2029], l: [1, 1, 2029, 0], name: 'Tết Kỷ Dậu 2029' },
    { s: [2, 2, 2030],  l: [1, 1, 2030, 0], name: 'Tết Canh Tuất 2030' },

    // Các ngày lễ truyền thống
    { s: [18, 4, 2024], l: [10, 3, 2024, 0], name: 'Giỗ Tổ Hùng Vương 2024 (10/3 âm)' },
    { s: [17, 9, 2024], l: [15, 8, 2024, 0], name: 'Rằm Trung Thu 2024 (15/8 âm)' },
    { s: [24, 2, 2024], l: [15, 1, 2024, 0], name: 'Rằm tháng Giêng 2024 (15/1 âm)' },
    { s: [18, 8, 2024], l: [15, 7, 2024, 0], name: 'Lễ Vu Lan 2024 (15/7 âm)' },
    { s: [10, 6, 2024], l: [5, 5, 2024, 0],  name: 'Tết Đoan Ngọ 2024 (5/5 âm)' },

    // Các mốc tháng nhuận đặc biệt
    { s: [22, 3, 2023], l: [1, 2, 2023, 1],  name: 'Mùng 1 tháng 2 Nhuận năm Quý Mão 2023' },
    { s: [19, 4, 2023], l: [29, 2, 2023, 1], name: 'Ngày 29 tháng 2 Nhuận năm Quý Mão 2023' },
    { s: [25, 7, 2025], l: [1, 6, 2025, 1],  name: 'Mùng 1 tháng 6 Nhuận năm Ất Tỵ 2025' },
    { s: [26, 7, 2025], l: [2, 6, 2025, 1],  name: 'Mùng 2 tháng 6 Nhuận năm Ất Tỵ 2025' },
    { s: [23, 6, 2028], l: [1, 5, 2028, 1],  name: 'Mùng 1 tháng 5 Nhuận năm Mậu Thân 2028' },

    // Ngày đối chiếu cụ thể
    { s: [19, 9, 2026], l: [9, 8, 2026, 0],  name: 'Ngày hôm nay 19/09/2026 -> 09/08/2026 âm' },
    { s: [2, 9, 2025],  l: [11, 7, 2025, 0], name: 'Quốc khánh 02/09/2025 -> 11/07/2025 âm' },
    { s: [30, 4, 2025], l: [3, 4, 2025, 0],  name: 'Giải phóng 30/04/2025 -> 03/04/2025 âm' },
  ];

  for (const tc of historicalBenchmarks) {
    const [dd, mm, yy] = tc.s;
    const res = solarToLunar(dd, mm, yy);
    const [expD, expM, expY, expL] = tc.l;
    const match = res.day === expD && res.month === expM && res.year === expY && res.leap === expL;
    assert(
      match, 
      `${tc.name} (${dd}/${mm}/${yy})`, 
      `Kỳ vọng ${expD}/${expM}/${expY} (nhuận: ${expL}), Thực tế: ${res.day}/${res.month}/${res.year} (nhuận: ${res.leap})`
    );
  }

  // ============================================================================
  // SUITE 2: Tính toàn vẹn hai chiều (Round-trip Invariance) trên 10 năm liên tiếp
  // ============================================================================
  console.log('\n📌 SUITE 2: Kiểm tra tính bất biến hai chiều (Solar -> Lunar -> Solar)');
  let roundtripFailures = 0;
  let sampleCount = 0;

  for (let y = 2020; y <= 2029; y++) {
    for (let m = 1; m <= 12; m++) {
      const daysInMonth = new Date(y, m, 0).getDate();
      for (let d = 1; d <= daysInMonth; d++) {
        sampleCount++;
        const lunar = solarToLunar(d, m, y);
        const solarBack = lunarToSolar(lunar.day, lunar.month, lunar.year, lunar.leap);
        if (solarBack.day !== d || solarBack.month !== m || solarBack.year !== y) {
          roundtripFailures++;
          if (roundtripFailures <= 3) {
            console.error(`     Lỗi roundtrip tại ${d}/${m}/${y}: Âm=${lunar.day}/${lunar.month}/${lunar.year} (L=${lunar.leap}) -> Dương ngược=${solarBack.day}/${solarBack.month}/${solarBack.year}`);
          }
        }
      }
    }
  }

  assert(
    roundtripFailures === 0, 
    `Chuyển đổi 2 chiều trọn vẹn 10 năm (${sampleCount} ngày liên tiếp từ 2020 đến 2029)`,
    `Có ${roundtripFailures} ngày bị sai lệch giữa Solar và Lunar ngược`
  );

  // ============================================================================
  // SUITE 3: Kiểm tra Can Chi & Ngũ Hành Nạp Âm
  // ============================================================================
  console.log('\n📌 SUITE 3: Kiểm tra Can Chi (Năm, Tháng, Ngày, Giờ) & Ngũ Hành');

  const canChiYearTests = [
    { year: 2020, expected: 'Canh Tý' },
    { year: 2021, expected: 'Tân Sửu' },
    { year: 2022, expected: 'Nhâm Dần' },
    { year: 2023, expected: 'Quý Mão' },
    { year: 2024, expected: 'Giáp Thìn' },
    { year: 2025, expected: 'Ất Tỵ' },
    { year: 2026, expected: 'Bính Ngọ' },
    { year: 2027, expected: 'Đinh Mùi' },
    { year: 2028, expected: 'Mậu Thân' },
    { year: 2029, expected: 'Kỷ Dậu' },
    { year: 2030, expected: 'Canh Tuất' },
  ];

  for (const tc of canChiYearTests) {
    const res = getCanChiYear(tc.year);
    assert(res.fullName === tc.expected, `Can Chi năm ${tc.year} = ${tc.expected}`, `Nhận được: ${res.fullName}`);
  }

  // Can Chi ngày cụ thể: 19/09/2026 phải là Bính Thân
  const jd1909 = solarToJd(19, 9, 2026);
  const canChiDay1909 = getCanChiDay(jd1909);
  assert(canChiDay1909.fullName === 'Bính Thân', 'Can Chi ngày 19/09/2026 = Bính Thân', `Nhận được: ${canChiDay1909.fullName}`);

  // Can Chi tháng 8 năm 2026 phải là Đinh Dậu
  const canChiMonth8_2026 = getCanChiMonth(8, 2026);
  assert(canChiMonth8_2026.fullName === 'Đinh Dậu', 'Can Chi tháng 8 âm năm 2026 = Đinh Dậu', `Nhận được: ${canChiMonth8_2026.fullName}`);

  // Ngũ hành nạp âm: Bính Thân phải thuộc mệnh Hỏa (Sơn Hạ Hỏa)
  const nguHanhBinhThan = getNguHanh('Bính', 'Thân');
  assert(nguHanhBinhThan === 'Hỏa', 'Ngũ Hành nạp âm Bính Thân = Hỏa', `Nhận được: ${nguHanhBinhThan}`);

  // Giáp Tý phải thuộc mệnh Kim (Hải Trung Kim)
  const nguHanhGiapTy = getNguHanh('Giáp', 'Tý');
  assert(nguHanhGiapTy === 'Kim', 'Ngũ Hành nạp âm Giáp Tý = Kim', `Nhận được: ${nguHanhGiapTy}`);

  // ============================================================================
  // SUITE 4: Kiểm tra Giờ Hoàng Đạo / Hắc Đạo
  // ============================================================================
  console.log('\n📌 SUITE 4: Kiểm tra Giờ Hoàng Đạo / Hắc Đạo');

  const gioHoangDaoList = getGioHoangDao(jd1909);
  assert(gioHoangDaoList.length === 12, 'Mỗi ngày có đúng 12 canh giờ', `Nhận được: ${gioHoangDaoList.length}`);

  const hoangDaoCount = gioHoangDaoList.filter(g => g.isHoangDao).length;
  const hacDaoCount = gioHoangDaoList.filter(g => !g.isHoangDao).length;
  assert(hoangDaoCount === 6 && hacDaoCount === 6, 'Mỗi ngày có đúng 6 giờ Hoàng Đạo và 6 giờ Hắc Đạo', `Hoàng đạo: ${hoangDaoCount}, Hắc đạo: ${hacDaoCount}`);

  // Ngày Thân: Giờ Tý, Sửu, Thìn, Tỵ, Thân, Dậu là hoàng đạo
  const hoangDaoNames = gioHoangDaoList.filter(g => g.isHoangDao).map(g => g.name);
  const expectedHoangDaoThân = ['Tý', 'Sửu', 'Thìn', 'Tỵ', 'Thân', 'Dậu'];
  const hoangDaoMatch = expectedHoangDaoThân.every(h => hoangDaoNames.includes(h));
  assert(hoangDaoMatch, 'Các giờ Hoàng Đạo ngày Thân (Tý, Sửu, Thìn, Tỵ, Thân, Dậu)', `Nhận được: ${hoangDaoNames.join(', ')}`);

  // ============================================================================
  // SUITE 5: Kiểm tra 24 Tiết Khí thiên văn
  // ============================================================================
  console.log('\n📌 SUITE 5: Kiểm tra 24 Tiết Khí');

  const tietKhiTests = [
    { d: 21, m: 3, y: 2026, expected: 'Xuân phân', name: 'Xuân phân (21/3/2026)' },
    { d: 22, m: 6, y: 2026, expected: 'Hạ chí', name: 'Hạ chí (22/6/2026)' },
    { d: 19, m: 9, y: 2026, expected: 'Bạch lộ', name: 'Bạch lộ (19/9/2026)' },
    { d: 24, m: 9, y: 2026, expected: 'Thu phân', name: 'Thu phân (24/9/2026)' },
    { d: 23, m: 12, y: 2026, expected: 'Đông chí', name: 'Đông chí (23/12/2026)' },
  ];

  for (const tc of tietKhiTests) {
    const jd = solarToJd(tc.d, tc.m, tc.y);
    const tk = getTietKhi(jd);
    assert(tk === tc.expected, `Tiết khí ngày ${tc.name} = ${tc.expected}`, `Nhận được: ${tk}`);
  }

  // ============================================================================
  // SUITE 6: Kiểm tra 12 Trực cổ truyền
  // ============================================================================
  console.log('\n📌 SUITE 6: Kiểm tra 12 Trực cổ truyền');

  // Tháng 8 (Dậu), ngày Thân -> Trực Bế
  const truc1909 = getTruc(jd1909, 8);
  assert(truc1909 === 'Bế', 'Ngày Thân trong tháng Dậu = Trực Bế', `Nhận được: ${truc1909}`);

  // Tháng 1 (Dần), ngày Bính Dần (21/2/2026) -> Trực Kiến
  const jdJanDan = solarToJd(21, 2, 2026); // Ngày Bính Dần tháng 1 âm
  const trucDan = getTruc(jdJanDan, 1);
  assert(trucDan === 'Kiến', 'Ngày Dần trong tháng Dần = Trực Kiến', `Nhận được: ${trucDan}`);

  // ============================================================================
  // SUITE 7: Hàm tổng hợp getDayInfo
  // ============================================================================
  console.log('\n📌 SUITE 7: Kiểm tra tổng thể getDayInfo()');
  const dayInfo = getDayInfo(19, 9, 2026);
  assert(dayInfo.solarDate.day === 19 && dayInfo.solarDate.month === 9 && dayInfo.solarDate.year === 2026, 'SolarDate chính xác');
  assert(dayInfo.lunarDate.day === 9 && dayInfo.lunarDate.month === 8 && dayInfo.lunarDate.year === 2026, 'LunarDate chính xác (9/8/2026)');
  assert(dayInfo.dayOfWeek === 'Thứ Bảy', 'Thứ trong tuần: Thứ Bảy');
  assert(dayInfo.canChiDay.fullName === 'Bính Thân', 'Can chi ngày: Bính Thân');
  assert(dayInfo.canChiMonth.fullName === 'Đinh Dậu', 'Can chi tháng: Đinh Dậu');
  assert(dayInfo.canChiYear.fullName === 'Bính Ngọ', 'Can chi năm: Bính Ngọ');
  assert(dayInfo.truc === 'Bế', 'Trực: Bế');
  assert(dayInfo.tietKhi === 'Bạch lộ', 'Tiết khí: Bạch lộ');
  assert(dayInfo.viecNenLam.length > 0 && dayInfo.viecKhongNenLam.length > 0, 'Có danh sách việc nên làm và kiêng kỵ');

  // ============================================================================
  // TỔNG KẾT
  // ============================================================================
  console.log('\n================================================================');
  console.log(`  KẾT THÚC KIỂM THỬ: ${passedTests} ĐẠT, ${failedTests} THẤT BẠI`);
  console.log(`  TỔNG SỐ NGÀY KIỂM ĐỊNH CHI TIẾT: > ${sampleCount} NGÀY`);
  console.log('================================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTestSuite();
