import { NextRequest } from 'next/server';
import { GET as getDay, OPTIONS as optionsDay } from '@/app/api/v1/lunar/day/route';
import { GET as getCalendar } from '@/app/api/v1/lunar/calendar/route';
import { GET as getConvert } from '@/app/api/v1/lunar/convert/route';
import { GET as getAuspicious } from '@/app/api/v1/lunar/auspicious/route';
import { GET as getVanKhanList } from '@/app/api/v1/van-khan/route';
import { GET as getVanKhanDetail } from '@/app/api/v1/van-khan/[slug]/route';
import { GET as getXemTuoi } from '@/app/api/v1/feng-shui/xem-tuoi-lam-nha/route';

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

async function runApiTestSuite() {
  console.log('================================================================');
  console.log('      BỘ KIỂM THỬ REST API BACKEND V1 (LỊCH AN MOBILE API)      ');
  console.log('================================================================\n');

  // 1. Kiểm tra CORS Headers
  console.log('📌 SUITE 1: Kiểm tra CORS Headers & Options Preflight');
  const optRes = await optionsDay();
  assert(optRes.status === 204, 'OPTIONS request trả về HTTP 204');
  assert(optRes.headers.get('Access-Control-Allow-Origin') === '*', 'Header Access-Control-Allow-Origin = *');

  // 2. Kiểm tra GET /api/v1/lunar/day
  console.log('\n📌 SUITE 2: Kiểm tra GET /api/v1/lunar/day');
  const reqDay1 = new NextRequest('http://localhost:3000/api/v1/lunar/day?date=2026-09-19');
  const resDay1 = await getDay(reqDay1);
  const jsonDay1 = await resDay1.json();
  assert(resDay1.status === 200 && jsonDay1.success === true, 'GET /day ngày cụ thể trả về HTTP 200');
  assert(jsonDay1.data.solarDate.day === 19 && jsonDay1.data.solarDate.month === 9, 'Dương lịch 19/09/2026 chính xác');
  assert(jsonDay1.data.lunarDate.day === 9 && jsonDay1.data.lunarDate.month === 8, 'Âm lịch 09/08 chính xác');

  // Test xuất hành param
  const reqDayXuatHanh = new NextRequest('http://localhost:3000/api/v1/lunar/day?date=2026-09-19&xuatHanh=true');
  const resDayXuatHanh = await getDay(reqDayXuatHanh);
  const jsonDayXuatHanh = await resDayXuatHanh.json();
  assert(!!jsonDayXuatHanh.data.xuatHanh && !!jsonDayXuatHanh.data.xuatHanh.hyThan, 'Tham số xuatHanh=true trả về hướng Hỷ Thần');

  // Test error validation
  const reqDayErr = new NextRequest('http://localhost:3000/api/v1/lunar/day?date=invalid');
  const resDayErr = await getDay(reqDayErr);
  const jsonDayErr = await resDayErr.json();
  assert(resDayErr.status === 400 && jsonDayErr.success === false, 'Date không hợp lệ trả về HTTP 400');

  // 3. Kiểm tra GET /api/v1/lunar/calendar
  console.log('\n📌 SUITE 3: Kiểm tra GET /api/v1/lunar/calendar');
  const reqCal = new NextRequest('http://localhost:3000/api/v1/lunar/calendar?month=10&year=2026');
  const resCal = await getCalendar(reqCal);
  const jsonCal = await resCal.json();
  assert(resCal.status === 200 && jsonCal.success === true, 'GET /calendar trả về HTTP 200');
  assert(jsonCal.data.days.length === 31, 'Tháng 10/2026 có đúng 31 ngày');

  // 4. Kiểm tra GET /api/v1/lunar/convert
  console.log('\n📌 SUITE 4: Kiểm tra GET /api/v1/lunar/convert');
  const reqConv1 = new NextRequest('http://localhost:3000/api/v1/lunar/convert?type=solar2lunar&d=19&m=9&y=2026');
  const resConv1 = await getConvert(reqConv1);
  const jsonConv1 = await resConv1.json();
  assert(jsonConv1.data.lunarDate.day === 9 && jsonConv1.data.lunarDate.month === 8, 'Chuyển Dương sang Âm chuẩn xác');

  const reqConv2 = new NextRequest('http://localhost:3000/api/v1/lunar/convert?type=lunar2solar&d=9&m=8&y=2026');
  const resConv2 = await getConvert(reqConv2);
  const jsonConv2 = await resConv2.json();
  assert(jsonConv2.data.solarDate.day === 19 && jsonConv2.data.solarDate.month === 9, 'Chuyển Âm sang Dương chuẩn xác');

  // 5. Kiểm tra GET /api/v1/lunar/auspicious
  console.log('\n📌 SUITE 5: Kiểm tra GET /api/v1/lunar/auspicious');
  const reqAus = new NextRequest('http://localhost:3000/api/v1/lunar/auspicious?purpose=cuoi-hoi&month=10&year=2026');
  const resAus = await getAuspicious(reqAus);
  const jsonAus = await resAus.json();
  assert(resAus.status === 200 && jsonAus.success === true, 'GET /auspicious cưới hỏi trả về HTTP 200');
  assert(Array.isArray(jsonAus.data.days), 'Trả về mảng danh sách ngày');

  // 6. Kiểm tra GET /api/v1/van-khan & /api/v1/van-khan/[slug]
  console.log('\n📌 SUITE 6: Kiểm tra GET /api/v1/van-khan & [slug]');
  const reqVkList = new NextRequest('http://localhost:3000/api/v1/van-khan?search=thần tài');
  const resVkList = await getVanKhanList(reqVkList);
  const jsonVkList = await resVkList.json();
  assert(resVkList.status === 200 && jsonVkList.data.items.length > 0, 'Tìm kiếm văn khấn trả về kết quả');

  const reqVkDetail = new NextRequest('http://localhost:3000/api/v1/van-khan/van-khan-nhap-trach-ve-nha-moi');
  const resVkDetail = await getVanKhanDetail(reqVkDetail, {
    params: Promise.resolve({ slug: 'van-khan-nhap-trach-ve-nha-moi' }),
  });
  const jsonVkDetail = await resVkDetail.json();
  assert(resVkDetail.status === 200 && jsonVkDetail.data.slug === 'van-khan-nhap-trach-ve-nha-moi', 'Xem chi tiết bài nhập trạch chính xác');

  const reqVk404 = new NextRequest('http://localhost:3000/api/v1/van-khan/slug-khong-ton-tai');
  const resVk404 = await getVanKhanDetail(reqVk404, {
    params: Promise.resolve({ slug: 'slug-khong-ton-tai' }),
  });
  assert(resVk404.status === 404, 'Slug không tồn tại trả về HTTP 404');

  // 7. Kiểm tra GET /api/v1/feng-shui/xem-tuoi-lam-nha
  console.log('\n📌 SUITE 7: Kiểm tra GET /api/v1/feng-shui/xem-tuoi-lam-nha');
  const reqXt = new NextRequest('http://localhost:3000/api/v1/feng-shui/xem-tuoi-lam-nha?birthYear=1990&targetYear=2026');
  const resXt = await getXemTuoi(reqXt);
  const jsonXt = await resXt.json();
  assert(resXt.status === 200 && jsonXt.success === true, 'Xem tuổi làm nhà API trả về HTTP 200');
  assert(!!jsonXt.data.tamTai && !!jsonXt.data.kimLau && !!jsonXt.data.hoangOc, 'Đầy đủ dữ liệu 3 đại hạn Tam Tai, Kim Lâu, Hoang Ốc');

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

runApiTestSuite();
