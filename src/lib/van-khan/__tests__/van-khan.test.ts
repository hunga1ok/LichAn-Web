import { 
  getAllVanKhan, 
  getVanKhanBySlug, 
  getVanKhanByCategory, 
  searchVanKhan,
  CATEGORY_LABELS,
  VanKhanCategory
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

function runVanKhanTestSuite() {
  console.log('================================================================');
  console.log('       BỘ KIỂM THỬ MODULE VĂN KHẤN CỔ TRUYỀN (LỊCH AN)          ');
  console.log('================================================================\n');

  const allItems = getAllVanKhan();

  // 1. Kiểm tra số lượng tối thiểu và tính đầy đủ
  console.log('📌 SUITE 1: Kiểm tra tính toàn vẹn dữ liệu kho văn khấn');
  assert(allItems.length >= 11, `Kho văn khấn phải có tối thiểu 11 bài (hiện có ${allItems.length})`);

  // Kiểm tra trùng lặp slug
  const slugs = allItems.map((i) => i.slug);
  const uniqueSlugs = new Set(slugs);
  assert(slugs.length === uniqueSlugs.size, 'Mọi slug văn khấn phải là duy nhất, không trùng lặp');

  // Kiểm tra tính toàn vẹn từng bài
  for (const item of allItems) {
    assert(!!item.id && item.id.length > 0, `ID hợp lệ: ${item.slug}`);
    assert(!!item.title && item.title.length > 5, `Tiêu đề chuẩn: ${item.title}`);
    assert(!!item.target && item.target.length > 0, `Có đối tượng cúng tế: ${item.title}`);
    assert(!!item.timeRecommended && item.timeRecommended.length > 0, `Có thời gian khuyến nghị: ${item.title}`);
    assert(Array.isArray(item.samLe) && item.samLe.length >= 3, `Có danh sách sắm lễ (>= 3 món): ${item.title}`);
    assert(Array.isArray(item.luuY) && item.luuY.length >= 1, `Có lưu ý hành lễ: ${item.title}`);
    assert(item.baiVanKhan.length > 100, `Nội dung bài khấn đầy đủ (> 100 ký tự): ${item.title}`);
  }

  // 2. Kiểm tra tra cứu theo slug
  console.log('\n📌 SUITE 2: Kiểm tra tra cứu theo slug');
  const sampleSlug = 'van-khan-nhap-trach-ve-nha-moi';
  const foundItem = getVanKhanBySlug(sampleSlug);
  assert(foundItem !== undefined, `Tìm thấy bài theo slug "${sampleSlug}"`);
  assert(foundItem?.title.includes('Nhập Trạch') ?? false, 'Tiêu đề bài nhập trạch chính xác');

  const notFoundItem = getVanKhanBySlug('bai-khong-ton-tai');
  assert(notFoundItem === undefined, 'Slug không tồn tại trả về undefined');

  // 3. Kiểm tra lọc theo danh mục
  console.log('\n📌 SUITE 3: Kiểm tra lọc theo danh mục');
  const categories: VanKhanCategory[] = [
    'than-linh-gia-tien',
    'kinh-doanh-tai-loc',
    'xay-dung-nha-cua',
    'hon-su-gia-dao',
    'le-tet-truyen-thong',
  ];

  for (const cat of categories) {
    const itemsInCat = getVanKhanByCategory(cat);
    assert(itemsInCat.length > 0, `Danh mục "${CATEGORY_LABELS[cat].name}" có ít nhất 1 bài (${itemsInCat.length} bài)`);
    const allMatch = itemsInCat.every((i) => i.category === cat);
    assert(allMatch, `Mọi bài trong "${cat}" đều đúng category`);
  }

  // 4. Kiểm tra tìm kiếm từ khóa
  console.log('\n📌 SUITE 4: Kiểm tra tìm kiếm theo từ khóa');
  const searchResults1 = searchVanKhan('thần tài');
  assert(searchResults1.some((i) => i.slug.includes('than-tai')), 'Tìm kiếm "thần tài" trả về đúng bài');

  const searchResults2 = searchVanKhan('giao thừa');
  assert(searchResults2.some((i) => i.slug.includes('giao-thua')), 'Tìm kiếm "giao thừa" trả về đúng bài');

  const searchResults3 = searchVanKhan('động thổ');
  assert(searchResults3.some((i) => i.slug.includes('dong-tho')), 'Tìm kiếm "động thổ" trả về đúng bài');

  const emptySearch = searchVanKhan('');
  assert(emptySearch.length === allItems.length, 'Tìm kiếm rỗng trả về toàn bộ danh sách');

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

runVanKhanTestSuite();
