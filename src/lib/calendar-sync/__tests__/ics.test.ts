/**
 * Bộ kiểm thử định dạng iCalendar (.ics) chuẩn RFC 5545 & Sự kiện Lịch Âm
 */

import { getYearLunarEvents, generateIcsContent } from '../ics-generator';
import { GET as getIcsRoute, OPTIONS as optionsIcsRoute } from '@/app/api/v1/calendar/subscribe.ics/route';
import { NextRequest } from 'next/server';

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

async function runIcsTestSuite() {
  console.log('================================================================');
  console.log('    BỘ KIỂM THỬ ĐỒNG BỘ LỊCH (.ICS) & RFC 5545 (SPRINT 4)       ');
  console.log('================================================================\n');

  // 1. Kiểm tra sự kiện âm lịch năm 2026
  console.log('📌 SUITE 1: Kiểm tra tính toán sự kiện âm lịch trong năm (2026)');
  const events = getYearLunarEvents(2026, {
    includeRamMung1: true,
    includeFestivals: true,
  });

  assert(events.length >= 24, `Số lượng sự kiện âm lịch trong năm >= 24 (Thực tế: ${events.length})`);

  const mung1Events = events.filter(e => e.lunarDate.day === 1);
  const ramEvents = events.filter(e => e.lunarDate.day === 15);
  assert(mung1Events.length >= 12, `Có đủ ít nhất 12 ngày Mùng 1 trong năm (Thực tế: ${mung1Events.length})`);
  assert(ramEvents.length >= 12, `Có đủ ít nhất 12 ngày Rằm trong năm (Thực tế: ${ramEvents.length})`);

  // 2. Kiểm tra ngày lễ truyền thống
  console.log('\n📌 SUITE 2: Kiểm tra các ngày lễ truyền thống Việt Nam');
  const tetEvent = events.find(e => e.lunarDate.day === 1 && e.lunarDate.month === 1);
  assert(!!tetEvent && tetEvent.summary.includes('Tết Nguyên Đán'), 'Tìm thấy sự kiện Mùng 1 Tết Nguyên Đán');

  const gioToEvent = events.find(e => e.lunarDate.day === 10 && e.lunarDate.month === 3);
  assert(!!gioToEvent && gioToEvent.summary.includes('Giỗ Tổ Hùng Vương'), 'Tìm thấy sự kiện Giỗ Tổ Hùng Vương (10/3 ÂL)');

  const vuLanEvent = events.find(e => e.lunarDate.day === 15 && e.lunarDate.month === 7);
  assert(!!vuLanEvent && vuLanEvent.summary.includes('Vu Lan'), 'Tìm thấy sự kiện Đại lễ Vu Lan (15/7 ÂL)');

  const trungThuEvent = events.find(e => e.lunarDate.day === 15 && e.lunarDate.month === 8);
  assert(!!trungThuEvent && trungThuEvent.summary.includes('Trung Thu'), 'Tìm thấy sự kiện Tết Trung Thu (15/8 ÂL)');

  const taoQuanEvent = events.find(e => e.lunarDate.day === 23 && e.lunarDate.month === 12);
  assert(!!taoQuanEvent && taoQuanEvent.summary.includes('Táo Quân'), 'Tìm thấy sự kiện Tết Táo Quân (23 tháng Chạp)');

  const giaoThuaEvent = events.find(e => e.category === 'LE_TET' && e.summary.includes('Giao Thừa'));
  assert(!!giaoThuaEvent, 'Tìm thấy sự kiện Đêm Giao Thừa (Trừ Tịch)');

  // 3. Kiểm tra định dạng RFC 5545
  console.log('\n📌 SUITE 3: Kiểm tra tuân thủ cấu trúc chuẩn RFC 5545 iCalendar');
  const icsContent = generateIcsContent(events, {
    calendarName: 'Lịch Âm Lịch An Test',
    enableReminder: true,
    reminderHoursBefore: 4,
  });

  assert(icsContent.startsWith('BEGIN:VCALENDAR\r\n'), 'Bắt đầu đúng bằng BEGIN:VCALENDAR\\r\\n');
  assert(icsContent.endsWith('END:VCALENDAR\r\n'), 'Kết thúc đúng bằng END:VCALENDAR\\r\\n');
  assert(icsContent.includes('VERSION:2.0'), 'Có trường VERSION:2.0');
  assert(icsContent.includes('PRODID:-//Lich An//Lich Van Nien Viet Nam RFC5545//VI'), 'Có trường PRODID hợp lệ');
  assert(icsContent.includes('X-WR-CALNAME:Lịch Âm Lịch An Test'), 'Có trường X-WR-CALNAME');
  assert(icsContent.includes('BEGIN:VEVENT') && icsContent.includes('END:VEVENT'), 'Chứa các khối VEVENT');
  assert(icsContent.includes('DTSTART;VALUE=DATE:'), 'Chứa DTSTART;VALUE=DATE');
  assert(icsContent.includes('DTEND;VALUE=DATE:'), 'Chứa DTEND;VALUE=DATE');
  assert(icsContent.includes('STATUS:CONFIRMED'), 'Chứa STATUS:CONFIRMED');
  assert(icsContent.includes('BEGIN:VALARM') && icsContent.includes('TRIGGER:-PT4H'), 'Chứa thông báo nhắc trước 20:00 (TRIGGER:-PT4H)');

  // 4. Kiểm tra tắt nhắc nhở
  console.log('\n📌 SUITE 4: Kiểm tra tùy chọn tắt VALARM');
  const icsNoAlarm = generateIcsContent(events, { enableReminder: false });
  assert(!icsNoAlarm.includes('BEGIN:VALARM'), 'Không sinh VALARM khi enableReminder = false');

  // 5. Kiểm tra API Route GET /api/v1/calendar/subscribe.ics
  console.log('\n📌 SUITE 5: Kiểm tra API Route GET /api/v1/calendar/subscribe.ics');
  const optRes = await optionsIcsRoute();
  assert(optRes.status === 204, 'OPTIONS route trả về 204');
  assert(optRes.headers.get('Access-Control-Allow-Origin') === '*', 'OPTIONS header CORS = *');

  const reqIcs = new NextRequest('http://localhost:3000/api/v1/calendar/subscribe.ics?year=2026&type=all');
  const resIcs = await getIcsRoute(reqIcs);
  assert(resIcs.status === 200, 'GET subscribe.ics trả về HTTP 200');
  assert(resIcs.headers.get('Content-Type')?.includes('text/calendar') === true, 'Content-Type là text/calendar');
  const textBody = await resIcs.text();
  assert(textBody.includes('BEGIN:VCALENDAR') && textBody.includes('Mùng 1'), 'Nội dung trả về là file .ics hợp lệ');

  // 6. Kiểm tra thuật toán Đếm ngược Tết Nguyên Đán
  console.log('\n📌 SUITE 6: Kiểm tra thuật toán tính thời khắc Tết Nguyên Đán (getNextTetInfo)');
  const { getNextTetInfo } = await import('@/lib/tet/tet-info');

  // Test với ngày tham chiếu đầu năm 2026 (trước Tết Bính Ngọ)
  const refDate2025 = new Date('2025-10-01T00:00:00Z');
  const tet2026Info = getNextTetInfo(refDate2025);
  assert(tet2026Info.lunarYear === 2026, 'Năm âm lịch tiếp theo là 2026');
  assert(tet2026Info.canChiYear.includes('Bính Ngọ'), `Can Chi năm 2026 là Bính Ngọ (Thực tế: ${tet2026Info.canChiYear})`);
  assert(tet2026Info.solarDate.year === 2026 && tet2026Info.solarDate.month === 2 && tet2026Info.solarDate.day === 17, 'Mùng 1 Tết Bính Ngọ là 17/02/2026');
  assert(tet2026Info.daysRemaining > 0, `Số ngày đếm ngược > 0 (Thực tế: ${tet2026Info.daysRemaining} ngày)`);
  assert(tet2026Info.dayInfoMung1.gioHoangDao.length === 12, 'Có đủ 12 giờ hoàng đạo ngày mùng 1 Tết');

  // Test với ngày tham chiếu sau Tết 2026 (chuyển sang Tết Đinh Mùi 2027)
  const refDateLate2026 = new Date('2026-03-01T00:00:00Z');
  const tet2027Info = getNextTetInfo(refDateLate2026);
  assert(tet2027Info.lunarYear === 2027, 'Sau Tết 2026 thì mốc tiếp theo là Tết 2027');
  assert(tet2027Info.canChiYear.includes('Đinh Mùi'), `Can Chi năm 2027 là Đinh Mùi (Thực tế: ${tet2027Info.canChiYear})`);
  assert(tet2027Info.solarDate.year === 2027 && tet2027Info.solarDate.month === 2 && tet2027Info.solarDate.day === 6, 'Mùng 1 Tết Đinh Mùi là 06/02/2027');

  console.log('\n----------------------------------------------------------------');
  console.log(`KẾT QUẢ: ${passedTests} PASS, ${failedTests} FAIL`);
  console.log('----------------------------------------------------------------\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runIcsTestSuite().catch(err => {
  console.error('Lỗi ngoại lệ trong bộ test ICS:', err);
  process.exit(1);
});

