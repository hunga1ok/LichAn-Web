/**
 * Bộ kiểm thử Kết luận ngày & Pha trăng — các ca kiểm thử chép từ
 * `DayVerdictTest.kt` và `MoonPhaseTest.kt` của Lịch An App để hai bên cho cùng kết quả.
 */

import { evaluateVerdict, getDayVerdict, tabooNames, chiIndexForHour } from '../day-verdict';
import { moonPhaseOf, moonCycleFraction, nextLunarMilestone } from '../moon-phase';
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

console.log('================================================================');
console.log('   BỘ KIỂM THỬ ĐỒNG BỘ VỚI APP: KẾT LUẬN NGÀY & PHA TRĂNG      ');
console.log('================================================================\n');

console.log('📌 SUITE 1: Kết luận ngày');
const bad = evaluateVerdict({ isHoangDao: false, tabooNames: ['Nguyệt Kỵ'], starName: 'Mão Nhật Kê', starNature: 'Hung' });
assert(bad.level === 'bad', 'Hắc Đạo + ngày kỵ là ngày xấu');
assert(
  JSON.stringify(bad.reasons) === JSON.stringify(['Ngày Hắc Đạo', 'Trùng ngày kỵ dân gian: Nguyệt Kỵ', 'Sao Mão Nhật Kê chủ hung']),
  'Lý do hiển thị giống app',
  JSON.stringify(bad.reasons)
);
assert(evaluateVerdict({ isHoangDao: false, tabooNames: [], starName: 'X', starNature: 'Hung' }).level === 'bad', 'Hắc Đạo + sao hung là ngày xấu');
assert(evaluateVerdict({ isHoangDao: false, tabooNames: [], starName: 'X', starNature: 'Cát' }).level === 'normal', 'Hắc Đạo không có dấu hiệu xấu khác là bình thường');
const good = evaluateVerdict({ isHoangDao: true, tabooNames: [], starName: 'Giác Mộc Giao', starNature: 'Cát' });
assert(good.level === 'good' && good.reasons.includes('Sao Giác Mộc Giao chủ cát'), 'Hoàng Đạo + sao cát là ngày tốt');
assert(evaluateVerdict({ isHoangDao: true, tabooNames: ['Tam Nương'], starName: 'X', starNature: 'Cát' }).level === 'normal', 'Hoàng Đạo trùng ngày kỵ không phải ngày tốt');
const neutral = evaluateVerdict({ isHoangDao: true, tabooNames: [], starName: 'X', starNature: 'Bình' });
assert(neutral.level === 'normal' && neutral.reasons.includes('Sao X bình hòa'), 'Hoàng Đạo + sao bình hòa là bình thường');

console.log('\n📌 SUITE 2: Ngày kỵ (chỉ 3 loại như app)');
assert(JSON.stringify(tabooNames(9, 23)) === '["Nguyệt Kỵ"]', '23/9 âm chỉ là Nguyệt Kỵ');
assert(JSON.stringify(tabooNames(10, 23)) === '["Nguyệt Kỵ","Dương Công Kỵ"]', '23/10 âm là Nguyệt Kỵ và Dương Công Kỵ');
assert(JSON.stringify(tabooNames(1, 13)) === '["Tam Nương","Dương Công Kỵ"]', '13/1 âm là Tam Nương và Dương Công Kỵ');
assert(tabooNames(1, 2).length === 0, '2/1 âm không phải ngày kỵ');

console.log('\n📌 SUITE 3: Kết luận ngày 01/11/2026 (khớp app)');
const v = getDayVerdict(lunarService.getDayInfo(1, 11, 2026));
assert(v.level === 'bad', '01/11/2026 là ngày xấu', v.level);
assert(v.reasons[1] === 'Trùng ngày kỵ dân gian: Nguyệt Kỵ', 'Lý do ngày kỵ đúng', v.reasons[1]);

console.log('\n📌 SUITE 4: Pha trăng');
assert(moonPhaseOf(1) === 'Trăng non', 'Mùng 1 là trăng non');
assert(moonPhaseOf(8) === 'Trăng thượng huyền', 'Ngày 8 là thượng huyền');
assert(moonPhaseOf(15) === 'Trăng tròn', 'Rằm là trăng tròn');
assert(moonPhaseOf(23) === 'Trăng hạ huyền', 'Ngày 23 là hạ huyền');
assert(moonPhaseOf(30) === 'Trăng tàn', 'Ngày 30 là trăng tàn');
assert(moonCycleFraction(1) === 0 && moonCycleFraction(15) === 0.5, 'Chu kỳ: mùng 1 = 0, rằm = 0.5');
assert(moonCycleFraction(23) >= 0.7 && moonCycleFraction(23) <= 0.8 && moonCycleFraction(30) < 1, 'Chu kỳ ngày 23 và 30 hợp lệ');

console.log('\n📌 SUITE 5: Mùng 1 / rằm kế tiếp');
const m = nextLunarMilestone({ day: 1, month: 11, year: 2026 });
assert(m.type === 'Mùng 1' && m.lunarMonth === 10, 'Từ 23/9 âm, mốc kế tiếp là mùng 1 tháng 10');
assert(m.daysAway >= 6 && m.daysAway <= 8, 'Còn 6–8 ngày', String(m.daysAway));
assert(lunarService.solarToLunar(m.solarDate.day, m.solarDate.month, m.solarDate.year).day === 1, 'Ngày dương của mốc đúng là mùng 1');
const afterMungMot = new Date(Date.UTC(m.solarDate.year, m.solarDate.month - 1, m.solarDate.day + 1));
const ram = nextLunarMilestone({ day: afterMungMot.getUTCDate(), month: afterMungMot.getUTCMonth() + 1, year: afterMungMot.getUTCFullYear() });
assert(ram.type === 'Rằm', 'Sau mùng 1 là rằm');
const again = nextLunarMilestone(ram.solarDate);
assert(again.daysAway === 0 && again.type === 'Rằm', 'Đúng ngày rằm thì còn 0 ngày');

console.log('\n📌 SUITE 6: Canh giờ');
assert(chiIndexForHour(23) === 0 && chiIndexForHour(0) === 0, '23h và 0h là giờ Tý');
assert(chiIndexForHour(1) === 1 && chiIndexForHour(12) === 6 && chiIndexForHour(22) === 11, '1h Sửu, 12h Ngọ, 22h Hợi');

console.log('\n----------------------------------------------------------------');
console.log(`KẾT QUẢ: ${passedTests} PASS, ${failedTests} FAIL`);
if (failedTests > 0) process.exit(1);
