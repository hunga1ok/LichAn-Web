/**
 * BỘ KIỂM THỬ ĐƠN VỊ NHỊ THẬP BÁT TÚ (28 CHÒM SAO THIÊN VĂN CỔ TRUYỀN)
 * ============================================================================
 * Kiểm thử tính đúng đắn toán học thiên văn:
 * 1. Đủ 28 chòm sao chia đều 4 Tứ Tượng (7 sao/phương) và 7 Thất Diệu (4 sao/diệu)
 * 2. Mối liên hệ chu kỳ Thất Diệu và Thứ trong tuần (Chủ Nhật = Nhật Tú, Thứ 2 = Nguyệt Tú...)
 * 3. Kiểm chứng các mốc lịch sử thiên văn học chuẩn
 * 4. Tích hợp trọn vẹn qua LunarService (getDayInfo, getAuspiciousDays)
 * ============================================================================
 */

import { NHI_THAP_BAT_TU_LIST, getNhiThapBatTuByJd } from '../nhi-thap-bat-tu';
import { lunarService } from '../service';
import { solarToJd } from '../core/lunar-calendar';

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
console.log('   BỘ KIỂM THỬ ĐƠN VỊ NHỊ THẬP BÁT TÚ (28 CHÒM SAO CỔ TRUYỀN)    ');
console.log('================================================================\n');

// ----------------------------------------------------------------------------
// SUITE 1: Kiểm tra cấu trúc và tính toàn vẹn của danh mục 28 sao
// ----------------------------------------------------------------------------
console.log('📌 SUITE 1: Kiểm tra danh mục 28 sao và phân bổ Tứ Tượng - Thất Diệu');

assert(NHI_THAP_BAT_TU_LIST.length === 28, 'Danh mục có đúng 28 chòm sao');

// Kiểm tra 4 Tứ Tượng, mỗi tượng đúng 7 sao
const dongThanhLong = NHI_THAP_BAT_TU_LIST.filter(s => s.direction === 'Đông Phương Thanh Long');
const bacHuyenVu = NHI_THAP_BAT_TU_LIST.filter(s => s.direction === 'Bắc Phương Huyền Vũ');
const tayBachHo = NHI_THAP_BAT_TU_LIST.filter(s => s.direction === 'Tây Phương Bạch Hổ');
const namChuTuoc = NHI_THAP_BAT_TU_LIST.filter(s => s.direction === 'Nam Phương Chu Tước');

assert(dongThanhLong.length === 7, 'Đông Phương Thanh Long có đúng 7 sao (Giác, Cang, Đê, Phòng, Tâm, Vĩ, Cơ)');
assert(bacHuyenVu.length === 7, 'Bắc Phương Huyền Vũ có đúng 7 sao (Đẩu, Ngưu, Nữ, Hư, Nguy, Thất, Bích)');
assert(tayBachHo.length === 7, 'Tây Phương Bạch Hổ có đúng 7 sao (Khuê, Lâu, Vị, Mão, Tất, Chủy, Sâm)');
assert(namChuTuoc.length === 7, 'Nam Phương Chu Tước có đúng 7 sao (Tỉnh, Quỷ, Liễu, Tinh, Trương, Dực, Chẩn)');

// Kiểm tra 7 Thất Diệu, mỗi diệu đúng 4 sao
const nhatTu = NHI_THAP_BAT_TU_LIST.filter(s => s.element === 'Nhật');
const nguyetTu = NHI_THAP_BAT_TU_LIST.filter(s => s.element === 'Nguyệt');
const hoaTu = NHI_THAP_BAT_TU_LIST.filter(s => s.element === 'Hỏa');
const thuyTu = NHI_THAP_BAT_TU_LIST.filter(s => s.element === 'Thủy');
const mocTu = NHI_THAP_BAT_TU_LIST.filter(s => s.element === 'Mộc');
const kimTu = NHI_THAP_BAT_TU_LIST.filter(s => s.element === 'Kim');
const thoTu = NHI_THAP_BAT_TU_LIST.filter(s => s.element === 'Thổ');

assert(nhatTu.length === 4, 'Nhật Tú (Chủ Nhật) có đúng 4 sao (Phòng, Hư, Mão, Tinh)');
assert(nguyetTu.length === 4, 'Nguyệt Tú (Thứ Hai) có đúng 4 sao (Tâm, Nguy, Tất, Trương)');
assert(hoaTu.length === 4, 'Hỏa Tú (Thứ Ba) có đúng 4 sao (Vĩ, Thất, Chủy, Dực)');
assert(thuyTu.length === 4, 'Thủy Tú (Thứ Tư) có đúng 4 sao (Cơ, Bích, Sâm, Chẩn)');
assert(mocTu.length === 4, 'Mộc Tú (Thứ Năm) có đúng 4 sao (Giác, Đẩu, Khuê, Tỉnh)');
assert(kimTu.length === 4, 'Kim Tú (Thứ Sáu) có đúng 4 sao (Cang, Ngưu, Lâu, Quỷ)');
assert(thoTu.length === 4, 'Thổ Tú (Thứ Bảy) có đúng 4 sao (Đê, Nữ, Vị, Liễu)');

// Kiểm tra dữ liệu phong phú của mỗi sao
const allHaveRequiredFields = NHI_THAP_BAT_TU_LIST.every(s => 
  s.name && s.fullName && s.animal && s.nature && s.tho.length > 20 &&
  Array.isArray(s.nenLam) && s.nenLam.length > 0 &&
  Array.isArray(s.kiengKy) && s.kiengKy.length > 0 &&
  typeof s.scoreWeight === 'number'
);
assert(allHaveRequiredFields, 'Tất cả 28 sao đều có đầy đủ thơ khẩu quyết, việc nên làm, kiêng kỵ và trọng số');

// ----------------------------------------------------------------------------
// SUITE 2: Kiểm tra quy luật chu kỳ Thất Diệu gắn với các ngày trong tuần
// ----------------------------------------------------------------------------
console.log('\n📌 SUITE 2: Kiểm tra quy luật bất biến Thất Diệu và Thứ trong tuần trên 140 ngày');

const dayOfWeekMap: Record<number, { element: string; validStarNames: string[] }> = {
  0: { element: 'Nhật', validStarNames: ['Phòng', 'Hư', 'Mão', 'Tinh'] },    // Chủ nhật
  1: { element: 'Nguyệt', validStarNames: ['Tâm', 'Nguy', 'Tất', 'Trương'] }, // Thứ hai
  2: { element: 'Hỏa', validStarNames: ['Vĩ', 'Thất', 'Chủy', 'Dực'] },       // Thứ ba
  3: { element: 'Thủy', validStarNames: ['Cơ', 'Bích', 'Sâm', 'Chẩn'] },      // Thứ tư
  4: { element: 'Mộc', validStarNames: ['Giác', 'Đẩu', 'Khuê', 'Tỉnh'] },     // Thứ năm
  5: { element: 'Kim', validStarNames: ['Cang', 'Ngưu', 'Lâu', 'Quỷ'] },      // Thứ sáu
  6: { element: 'Thổ', validStarNames: ['Đê', 'Nữ', 'Vị', 'Liễu'] },         // Thứ bảy
};

let thatDieuMatchCount = 0;
const startDate = new Date(2024, 0, 1); // 01/01/2024

for (let i = 0; i < 140; i++) {
  const curDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
  const day = curDate.getDate();
  const month = curDate.getMonth() + 1;
  const year = curDate.getFullYear();
  const dayOfWeek = curDate.getDay();

  const jd = solarToJd(day, month, year);
  const sao = getNhiThapBatTuByJd(jd);

  const rule = dayOfWeekMap[dayOfWeek];
  if (sao.element === rule.element && rule.validStarNames.includes(sao.name)) {
    thatDieuMatchCount++;
  }
}

assert(thatDieuMatchCount === 140, '140 ngày liên tiếp đều khớp 100% Thất Diệu với thứ trong tuần (Chủ nhật = Nhật, Thứ hai = Nguyệt...)');

// ----------------------------------------------------------------------------
// SUITE 3: Kiểm tra các mốc kiểm chứng lịch sử chuẩn xác
// ----------------------------------------------------------------------------
console.log('\n📌 SUITE 3: Kiểm tra các mốc kiểm chứng thiên văn lịch sử chuẩn');

// Mốc 1: 01/01/1995 (Chủ Nhật) -> Sao Hư (Hư Nhật Thử)
const jd1995 = solarToJd(1, 1, 1995);
const sao1995 = getNhiThapBatTuByJd(jd1995);
assert(sao1995.name === 'Hư' && sao1995.fullName === 'Hư Nhật Thử', '01/01/1995 là Sao Hư Nhật Thử');

// Mốc 2: 10/02/2024 (Mùng 1 Tết Giáp Thìn - Thứ Bảy) -> Sao Đê (Đê Thổ Lạc)
const jd2024 = solarToJd(10, 2, 2024);
const sao2024 = getNhiThapBatTuByJd(jd2024);
assert(sao2024.name === 'Đê' && sao2024.fullName === 'Đê Thổ Lạc', '10/02/2024 (Mùng 1 Tết Giáp Thìn) là Sao Đê Thổ Lạc');

// Mốc 3: 22/09/2026 (Thứ Ba) -> Sao Vĩ (Vĩ Hỏa Hổ)
const jdToday = solarToJd(22, 9, 2026);
const saoToday = getNhiThapBatTuByJd(jdToday);
assert(saoToday.name === 'Vĩ' && saoToday.fullName === 'Vĩ Hỏa Hổ', '22/09/2026 là Sao Vĩ Hỏa Hổ (Hỏa Tú trực nhật Thứ Ba)');

// ----------------------------------------------------------------------------
// SUITE 4: Tích hợp qua LunarService (getDayInfo & getAuspiciousDays)
// ----------------------------------------------------------------------------
console.log('\n📌 SUITE 4: Tích hợp qua LunarService Facade');

const dayInfo = lunarService.getDayInfo(22, 9, 2026);
assert(dayInfo.nhiThapBatTu !== undefined, 'getDayInfo trả về trường nhiThapBatTu');
assert(dayInfo.nhiThapBatTu.fullName === 'Vĩ Hỏa Hổ', 'nhiThapBatTu trong dayInfo là Vĩ Hỏa Hổ');
assert(dayInfo.nhiThapBatTu.nature === 'Cát', 'Sao Vĩ Hỏa Hổ là Cát Tinh');

// Kiểm tra getAuspiciousDays
const weddingDays = lunarService.getAuspiciousDays('cuoi-hoi', 9, 2026);
assert(weddingDays.length > 0, 'getAuspiciousDays trả về danh sách ngày đánh giá');
assert(weddingDays[0].sao28 !== undefined, 'Mỗi phần tử AuspiciousDayResult có trường sao28');

// Tìm ngày có sao 28 Tú cát
const hasAuspiciousStarReason = weddingDays.some(d => 
  d.reasons.some(r => r.includes('Sao Nhị Thập Bát Tú cát'))
);
assert(hasAuspiciousStarReason, 'Thuật toán trạch cát đã ghi nhận lý do cát từ Nhị Thập Bát Tú');

// In kết quả tổng hợp
console.log('\n----------------------------------------------------------------');
console.log(`KẾT QUẢ KIỂM THỬ: ${passedTests} PASS, ${failedTests} FAIL`);
console.log('----------------------------------------------------------------\n');

if (failedTests > 0) {
  process.exit(1);
}
