/**
 * Script kiểm tra độ chính xác lịch âm
 * So sánh kết quả solarToLunar() với dữ liệu chuẩn từ lichngaytot.com
 *
 * Chạy: npx tsx src/lib/lunar/__tests__/verify-lunar.ts
 */

import { solarToLunar } from '../lunar-calendar';

// Dữ liệu chuẩn: [dương lịch] → [âm lịch] (đã xác minh từ lichngaytot.com & lichviet.app)
const TEST_CASES: {
  solar: [number, number, number]; // [day, month, year]
  lunar: [number, number, number, number]; // [day, month, year, leap]
  label: string;
}[] = [
  { solar: [1, 1, 2024], lunar: [20, 11, 2023, 0], label: 'Tết Dương Lịch 2024' },
  { solar: [10, 2, 2024], lunar: [1, 1, 2024, 0], label: 'Tết Nguyên Đán 2024 (Giáp Thìn)' },
  { solar: [24, 2, 2024], lunar: [15, 1, 2024, 0], label: 'Rằm tháng Giêng 2024' },
  { solar: [29, 1, 2025], lunar: [1, 1, 2025, 0], label: 'Tết Nguyên Đán 2025 (Ất Tỵ)' },
  { solar: [17, 2, 2026], lunar: [1, 1, 2026, 0], label: 'Tết Nguyên Đán 2026 (Bính Ngọ)' },
  { solar: [19, 9, 2026], lunar: [9, 8, 2026, 0], label: 'Hôm nay 19/9/2026' },
  { solar: [21, 9, 2024], lunar: [19, 8, 2024, 0], label: 'Tết Trung Thu 2024' },
  { solar: [25, 12, 2024], lunar: [25, 11, 2024, 0], label: 'Giáng Sinh 2024' },
  { solar: [1, 5, 2023], lunar: [12, 3, 2023, 0], label: 'Quốc tế Lao động 2023' },
  { solar: [2, 9, 2025], lunar: [11, 7, 2025, 0], label: 'Quốc khánh 2025' },
  { solar: [15, 4, 2025], lunar: [18, 3, 2025, 0], label: 'Giữa tháng 4/2025' },
  { solar: [30, 6, 2024], lunar: [25, 5, 2024, 0], label: 'Cuối tháng 6/2024' },
];

let pass = 0;
let fail = 0;

console.log('=== KIỂM TRA ĐỘ CHÍNH XÁC LỊCH ÂM ===\n');

for (const tc of TEST_CASES) {
  const [dd, mm, yy] = tc.solar;
  const result = solarToLunar(dd, mm, yy);
  const [expDay, expMonth, expYear, expLeap] = tc.lunar;

  const ok =
    result.day === expDay &&
    result.month === expMonth &&
    result.year === expYear &&
    result.leap === expLeap;

  if (ok) {
    console.log(`✅ ${tc.label}: ${dd}/${mm}/${yy} → ${result.day}/${result.month}/${result.year}${result.leap ? ' (nhuận)' : ''}`);
    pass++;
  } else {
    console.log(`❌ ${tc.label}: ${dd}/${mm}/${yy}`);
    console.log(`   Mong đợi: ${expDay}/${expMonth}/${expYear}${expLeap ? ' (nhuận)' : ''}`);
    console.log(`   Nhận được: ${result.day}/${result.month}/${result.year}${result.leap ? ' (nhuận)' : ''}`);
    fail++;
  }
}

console.log(`\n=== KẾT QUẢ: ${pass}/${pass + fail} passed, ${fail} failed ===`);
process.exit(fail > 0 ? 1 : 0);
