/**
 * @internal
 * ============================================================================
 * MODULE NHỊ THẬP BÁT TÚ (28 CHÒM SAO THIÊN VĂN CỔ TRUYỀN)
 * Căn cứ theo:
 * - Hiệp Kỷ Biện Phương Thư (Khâm Thiên Giám triều Nguyễn)
 * - Ngọc Hạp Thông Thư
 * ============================================================================
 */

export type TuTuong = 'Đông Phương Thanh Long' | 'Bắc Phương Huyền Vũ' | 'Tây Phương Bạch Hổ' | 'Nam Phương Chu Tước';

export type ThatDieu = 'Nhật' | 'Nguyệt' | 'Hỏa' | 'Thủy' | 'Mộc' | 'Kim' | 'Thổ';

export type SaoNature = 'Cát' | 'Hung' | 'Bình';

export interface NhiThapBatTu {
  /** Chỉ số 0 - 27 */
  id: number;
  /** Tên sao ngắn gọn: Giác, Cang, Đê... */
  name: string;
  /** Tên đầy đủ kèm Thất Diệu và Linh thú: Giác Mộc Giao, Phòng Nhật Thố... */
  fullName: string;
  /** Tứ tượng cai quản phương vị */
  direction: TuTuong;
  /** Thuộc tính Thất Diệu (Mặt trời, Mặt trăng, Ngũ tinh) */
  element: ThatDieu;
  /** Linh thú tượng trưng */
  animal: string;
  /** Tính chất tổng thể: Cát tinh, Hung tinh hay Bình hòa */
  nature: SaoNature;
  /** Điểm số trọng số cát hung (-20 đến +20) dùng cho thuật toán trạch cát */
  scoreWeight: number;
  /** Câu phú ca quyết khẩu quyết cổ truyền */
  tho: string;
  /** Các việc cát lợi nên tiến hành */
  nenLam: string[];
  /** Các việc hung kỵ nên tránh */
  kiengKy: string[];
}

export const NHI_THAP_BAT_TU_LIST: NhiThapBatTu[] = [
  // 1. Đông Phương Thanh Long (7 sao)
  {
    id: 0,
    name: 'Giác',
    fullName: 'Giác Mộc Giao',
    direction: 'Đông Phương Thanh Long',
    element: 'Mộc',
    animal: 'Giao (Cá sấu)',
    nature: 'Cát',
    scoreWeight: 15,
    tho: 'Giác tinh tọa chiếu đệ nhất cao, Niên niên ngũ cốc thuận hòa đào. Mai táng tạo tác tùng thử cát, Giá thú định phùng phú quý hào.',
    nenLam: ['Khởi công tạo tác', 'Cưới hỏi', 'Xuất hành', 'Thăng quan tiến chức', 'Cắt may áo mới'],
    kiengKy: ['Chôn cất tu bổ mộ phần', 'Kiện tụng'],
  },
  {
    id: 1,
    name: 'Cang',
    fullName: 'Cang Kim Long',
    direction: 'Đông Phương Thanh Long',
    element: 'Kim',
    animal: 'Long (Rồng)',
    nature: 'Hung',
    scoreWeight: -12,
    tho: 'Cang tinh hạ chiếu dũng phong ba, Nhập trạch kinh thương họa cận gia. Cưới gả động thổ sinh bất trắc, Đề phòng khẩu thiệt kiện quan hà.',
    nenLam: ['Cắt cỏ dọn dẹp', 'Tu bổ bờ đê', 'Dọn kho cất giữ'],
    kiengKy: ['Cưới hỏi', 'Động thổ làm nhà', 'Khai trương cửa hàng', 'Nhập trạch'],
  },
  {
    id: 2,
    name: 'Đê',
    fullName: 'Đê Thổ Lạc',
    direction: 'Đông Phương Thanh Long',
    element: 'Thổ',
    animal: 'Lạc (Nhím / Lạc đà)',
    nature: 'Hung',
    scoreWeight: -15,
    tho: 'Đê tinh trực nhật sự bất thường, Khởi tạo hôn nhân thấu đoạn trường. Mai táng động thổ phùng tai ách, Xuất hành kỵ lộ tổn thương phương.',
    nenLam: ['Cầu tự cầu an', 'Lập bàn thờ thần linh', 'Luyện tập dưỡng sinh'],
    kiengKy: ['Cưới gả đính hôn', 'Động thổ đào móng', 'Xuất hành xa', 'Đi thuyền'],
  },
  {
    id: 3,
    name: 'Phòng',
    fullName: 'Phòng Nhật Thố',
    direction: 'Đông Phương Thanh Long',
    element: 'Nhật',
    animal: 'Thố (Thỏ)',
    nature: 'Cát',
    scoreWeight: 20,
    tho: 'Phòng tinh tạo tác đắc trùng trùng, Gia đạo hưng long hưởng phú dung. Giá thú xuất hành câu đại cát, Vinh hoa phú quý thế vô cùng.',
    nenLam: ['Cưới hỏi', 'Khởi công xây dựng', 'Cất nóc thượng lương', 'Khai trương', 'Nhập trạch', 'Xuất hành'],
    kiengKy: ['Chôn cất an táng', 'Vá thuyền bè'],
  },
  {
    id: 4,
    name: 'Tâm',
    fullName: 'Tâm Nguyệt Hồ',
    direction: 'Đông Phương Thanh Long',
    element: 'Nguyệt',
    animal: 'Hồ (Cáo)',
    nature: 'Hung',
    scoreWeight: -20,
    tho: 'Tâm tinh tạo tác đại hung tai, Cánh phùng giá thú mạng ly hoài. Mai táng sinh ương thương phụ mẫu, Kinh doanh thất bại tán tiền tài.',
    nenLam: ['Cúng tế cầu giải hạn', 'Trừ tà chữa bệnh', 'Dọn dẹp nhà cửa'],
    kiengKy: ['Cưới hỏi', 'Khởi công làm nhà', 'Khai trương buôn bán', 'Xuất vốn đầu tư'],
  },
  {
    id: 5,
    name: 'Vĩ',
    fullName: 'Vĩ Hỏa Hổ',
    direction: 'Đông Phương Thanh Long',
    element: 'Hỏa',
    animal: 'Hổ (Cọp)',
    nature: 'Cát',
    scoreWeight: 18,
    tho: 'Vĩ tinh tạo tác đắc thiên ân, Phú quý vinh hoa đáo môn đình. Giá thú hôn nhân sinh quý tử, Khởi tạo an cư vạn sự hưng.',
    nenLam: ['Cưới hỏi', 'Khởi công cất nhà', 'Cất nóc', 'Khai trương mở cửa hàng', 'Chôn cất cải táng'],
    kiengKy: ['May quần áo mới', 'Đi thuyền đường sông biển'],
  },
  {
    id: 6,
    name: 'Cơ',
    fullName: 'Cơ Thủy Báo',
    direction: 'Đông Phương Thanh Long',
    element: 'Thủy',
    animal: 'Báo (Báo hoa)',
    nature: 'Cát',
    scoreWeight: 10,
    tho: 'Cơ tinh tạo tác chủ vinh hoa, Gia đạo bình an phúc nhập gia. Động thổ khai mương hành vạn sự, Xuất hành giá thú phát phong ba.',
    nenLam: ['Khởi tạo xây cất', 'Khai mương đào ao', 'Gieo trồng chăn nuôi', 'Tu bổ nhà cửa'],
    kiengKy: ['Cưới hỏi (dễ sinh thị phi lời qua tiếng lại)', 'Mua thêm đất đai'],
  },

  // 2. Bắc Phương Huyền Vũ (7 sao)
  {
    id: 7,
    name: 'Đẩu',
    fullName: 'Đẩu Mộc Giải',
    direction: 'Bắc Phương Huyền Vũ',
    element: 'Mộc',
    animal: 'Giải (Cua)',
    nature: 'Cát',
    scoreWeight: 16,
    tho: 'Đẩu tinh tạo tác sự giai nghi, Vượng khí môn đình phước lộc tùy. Giá thú khai trương câu đại cát, Tu tạo an táng đắc thiên thì.',
    nenLam: ['Cưới hỏi', 'Khởi công xây nhà', 'Khai trương', 'Chôn cất', 'Gieo trồng mạ giống'],
    kiengKy: ['Kiện tụng tranh chấp'],
  },
  {
    id: 8,
    name: 'Ngưu',
    fullName: 'Ngưu Kim Ngưu',
    direction: 'Bắc Phương Huyền Vũ',
    element: 'Kim',
    animal: 'Ngưu (Trâu)',
    nature: 'Hung',
    scoreWeight: -14,
    tho: 'Ngưu tinh tạo tác bất khả đương, Điền trạch tiêu ma tổn lục súc. Giá thú hôn nhân sinh biệt ly, Tu tạo động thổ hữu tai ương.',
    nenLam: ['Săn bắt diệt trừ sâu bọ', 'Dọn dẹp chuồng trại'],
    kiengKy: ['Cưới hỏi', 'Động thổ làm nhà', 'Cất nóc', 'Khai trương buôn bán'],
  },
  {
    id: 9,
    name: 'Nữ',
    fullName: 'Nữ Thổ Bức',
    direction: 'Bắc Phương Huyền Vũ',
    element: 'Thổ',
    animal: 'Bức (Dơi)',
    nature: 'Hung',
    scoreWeight: -18,
    tho: 'Nữ tinh trực nhật sự bất tường, Gia trạch tiêu hao tán bạc vàng. Giá thú khởi tạo phùng hung họa, Phòng ngừa khẩu thiệt tổn gia nương.',
    nenLam: ['Tẩy uế thanh lọc', 'Học tập nghiên cứu'],
    kiengKy: ['Cưới hỏi', 'Làm nhà động thổ', 'Chôn cất', 'Kiện cáo pháp đình'],
  },
  {
    id: 10,
    name: 'Hư',
    fullName: 'Hư Nhật Thử',
    direction: 'Bắc Phương Huyền Vũ',
    element: 'Nhật',
    animal: 'Thử (Chuột)',
    nature: 'Hung',
    scoreWeight: -15,
    tho: 'Hư tinh tạo tác sự tai ương, Gia quyến phân ly bệnh hoạn trường. Khởi công mai táng phùng tổn hại, Đề phòng quan tụng phá gia môn.',
    nenLam: ['Cúng bái cầu an', 'Quét dọn kho bãi'],
    kiengKy: ['Khởi công làm nhà', 'Cưới gả', 'Khai trương', 'Xuất hành xa'],
  },
  {
    id: 11,
    name: 'Nguy',
    fullName: 'Nguy Nguyệt Yến',
    direction: 'Bắc Phương Huyền Vũ',
    element: 'Nguyệt',
    animal: 'Yến (Chim én)',
    nature: 'Hung',
    scoreWeight: -14,
    tho: 'Nguy tinh tạo tác hữu hung tinh, Vạn sự kinh doanh đắc bất thành. Xuất hành cẩn trọng phòng tai nạn, Giá thú mai táng trúng điêu linh.',
    nenLam: ['Xây đắp đê điều bờ kè', 'Gia cố tường lũy'],
    kiengKy: ['Cưới hỏi', 'Đi thuyền đường thủy', 'Leo trèo vùng cao', 'Khởi công xây dựng'],
  },
  {
    id: 12,
    name: 'Thất',
    fullName: 'Thất Hỏa Trư',
    direction: 'Bắc Phương Huyền Vũ',
    element: 'Hỏa',
    animal: 'Trư (Heo / Lợn)',
    nature: 'Cát',
    scoreWeight: 18,
    tho: 'Thất tinh tạo tác đắc thiên tài, Phú quý hưng long tự thử lai. Khởi tạo giá thú câu cát lợi, Môn đình rực rỡ đón tương lai.',
    nenLam: ['Động thổ làm nhà', 'Cất nóc', 'Cưới gả', 'Khai trương', 'Chôn cất cải táng', 'Xuất hành'],
    kiengKy: ['Đi thuyền bè vượt sông lớn'],
  },
  {
    id: 13,
    name: 'Bích',
    fullName: 'Bích Thủy Dư',
    direction: 'Bắc Phương Huyền Vũ',
    element: 'Thủy',
    animal: 'Dư (Rái cá)',
    nature: 'Cát',
    scoreWeight: 18,
    tho: 'Bích tinh tạo tác đại cát xương, Gia môn hưng vượng phước miên trường. Khởi công giá thú câu thành tựu, Sự nghiệp hanh thông đón thịnh cường.',
    nenLam: ['Cưới hỏi', 'Khởi công xây nhà', 'Nhập trạch', 'Mở cửa hàng', 'Khai trương', 'An táng'],
    kiengKy: ['Tranh chấp kiện cáo'],
  },

  // 3. Tây Phương Bạch Hổ (7 sao)
  {
    id: 14,
    name: 'Khuê',
    fullName: 'Khuê Mộc Lang',
    direction: 'Tây Phương Bạch Hổ',
    element: 'Mộc',
    animal: 'Lang (Chó sói)',
    nature: 'Hung',
    scoreWeight: -14,
    tho: 'Khuê tinh tọa chiếu sự nan thông, Khởi tạo hôn nhân hoạch bất hòa. Gia sản tiêu điều sinh tật bệnh, Mai táng động thổ ngộ can qua.',
    nenLam: ['Cắt tóc gội đầu', 'Nạo vét mương rãnh', 'Sửa chuồng gia súc'],
    kiengKy: ['Khởi công làm nhà', 'Cưới hỏi', 'Khai trương buôn bán', 'Chôn cất'],
  },
  {
    id: 15,
    name: 'Lâu',
    fullName: 'Lâu Kim Cẩu',
    direction: 'Tây Phương Bạch Hổ',
    element: 'Kim',
    animal: 'Cẩu (Chó)',
    nature: 'Cát',
    scoreWeight: 16,
    tho: 'Lâu tinh thụ mệnh phúc vô biên, Tạo tác doanh mưu đắc vạn tuyền. Giá thú xuất hành câu đại cát, Gia môn khang thái định trường niên.',
    nenLam: ['Khởi công xây dựng', 'Cưới hỏi', 'Cất nóc', 'Chôn cất', 'Khai trương', 'Xuất hành'],
    kiengKy: ['Vi phạm pháp luật', 'Trộm cắp gian dối'],
  },
  {
    id: 16,
    name: 'Vị',
    fullName: 'Vị Thổ Dĩ',
    direction: 'Tây Phương Bạch Hổ',
    element: 'Thổ',
    animal: 'Dĩ (Chim trĩ)',
    nature: 'Cát',
    scoreWeight: 15,
    tho: 'Vị tinh tạo tác đắc thiên tường, Phú quý vinh hoa lộc tự cường. Kim ngân mãn ốc gia phong thịnh, Khởi sự giai nghi phước đức trường.',
    nenLam: ['Khởi công xây cất', 'Cất nóc', 'Cưới hỏi', 'Lập bàn thờ thần tài', 'Gieo trồng lúa ngô'],
    kiengKy: ['Phá đập be bờ chôn cất nơi ẩm thấp'],
  },
  {
    id: 17,
    name: 'Mão',
    fullName: 'Mão Nhật Kê',
    direction: 'Tây Phương Bạch Hổ',
    element: 'Nhật',
    animal: 'Kê (Gà)',
    nature: 'Hung',
    scoreWeight: -15,
    tho: 'Mão tinh tạo tác đại đa hung, Giá thú khởi công tổn lục súc. Quan phi hình pháp liên miên chí, Bách sự giai nghi cẩn thận phùng.',
    nenLam: ['Cắt cỏ săn bắn', 'Diệt sâu bọ trừ tà'],
    kiengKy: ['Cưới hỏi', 'Động thổ xây cất', 'Cất nóc', 'Khai trương mở hàng', 'Chôn cất'],
  },
  {
    id: 18,
    name: 'Tất',
    fullName: 'Tất Nguyệt Ô',
    direction: 'Tây Phương Bạch Hổ',
    element: 'Nguyệt',
    animal: 'Ô (Quạ)',
    nature: 'Cát',
    scoreWeight: 18,
    tho: 'Tất tinh trực nhật tối cát xương, Điền trạch hưng long đại cát tường. Giá thú an cư sinh quý tử, Khai trương khởi nghiệp phước miên trường.',
    nenLam: ['Khởi công xây cất', 'Cưới hỏi', 'Chôn cất an táng', 'Khai trương', 'Xuất hành', 'Nhập học'],
    kiengKy: ['Đi thuyền lớn vượt biển lúc thời tiết xấu'],
  },
  {
    id: 19,
    name: 'Chủy',
    fullName: 'Chủy Hỏa Hầu',
    direction: 'Tây Phương Bạch Hổ',
    element: 'Hỏa',
    animal: 'Hầu (Khỉ)',
    nature: 'Hung',
    scoreWeight: -18,
    tho: 'Chủy tinh tạo tác bất khả mưu, Hình pháp quan phi đạo tặc ưu. Mai táng động thổ giai tổn hại, Giá thú khởi công họa dữ cừu.',
    nenLam: ['Săn bắt bắt chuột', 'Bảo dưỡng khóa cửa phòng ngừa trộm'],
    kiengKy: ['Khởi công làm nhà', 'Cưới hỏi', 'Chôn cất', 'Xuất hành xa', 'Ký hợp đồng lớn'],
  },
  {
    id: 20,
    name: 'Sâm',
    fullName: 'Sâm Thủy Viên',
    direction: 'Tây Phương Bạch Hổ',
    element: 'Thủy',
    animal: 'Viên (Vượn)',
    nature: 'Cát',
    scoreWeight: 14,
    tho: 'Sâm tinh tạo tác vượng gia môn, Văn chương tiến bộ hiển tiền tôn. Giá thú khai trương câu đại cát, Khởi công xuất ngoại đắc hoàng ân.',
    nenLam: ['Khởi công xây dựng', 'Khai trương buôn bán', 'Cưới hỏi', 'Cầu tài cầu danh', 'Xuất hành xa'],
    kiengKy: ['Chôn cất đào xới mồ mả'],
  },

  // 4. Nam Phương Chu Tước (7 sao)
  {
    id: 21,
    name: 'Tỉnh',
    fullName: 'Tỉnh Mộc Hãn',
    direction: 'Nam Phương Chu Tước',
    element: 'Mộc',
    animal: 'Hãn (Chó rừng / Rái chó)',
    nature: 'Cát',
    scoreWeight: 14,
    tho: 'Tỉnh tinh trực nhật đại cát tường, Điền địa hưng long phúc lộc trường. Khởi tạo an cư giai đắc ý, Kinh thương tiến ích tự phong sương.',
    nenLam: ['Khởi công làm nhà', 'Cất nóc', 'Đào giếng mở mương', 'Mở cửa', 'Cưới hỏi', 'Nhận chức'],
    kiengKy: ['Chôn cất khóc lóc bi thương'],
  },
  {
    id: 22,
    name: 'Quỷ',
    fullName: 'Quỷ Kim Dương',
    direction: 'Nam Phương Chu Tước',
    element: 'Kim',
    animal: 'Dương (Dê)',
    nature: 'Hung',
    scoreWeight: -18,
    tho: 'Quỷ tinh trực nhật sự bất thường, Mai táng khởi công ngộ họa ương. Giá thú hôn nhân sinh trắc trở, Cẩn phòng tật ách tổn gia nương.',
    nenLam: ['Chôn cất an táng mồ mả tổ tiên (riêng việc táng rất cát)', 'Tẩy uế dọn dẹp'],
    kiengKy: ['Cưới hỏi', 'Làm nhà động thổ', 'Cất nóc', 'Khai trương mở hàng', 'Xuất hành'],
  },
  {
    id: 23,
    name: 'Liễu',
    fullName: 'Liễu Thổ Chương',
    direction: 'Nam Phương Chu Tước',
    element: 'Thổ',
    animal: 'Chương (Hoẵng / Cheo cheo)',
    nature: 'Hung',
    scoreWeight: -15,
    tho: 'Liễu tinh tạo tác bất khả đương, Tổn tài hao của họa trùng trùng. Hôn nhân khởi tạo phùng quan sự, Mai táng xuất hành tối kỵ phùng.',
    nenLam: ['Đặt bẫy diệt trừ sâu mọt', 'Cắt cỏ hoang dại'],
    kiengKy: ['Cưới hỏi', 'Xây nhà động thổ', 'Chôn cất', 'Xuất hành', 'Khai trương'],
  },
  {
    id: 24,
    name: 'Tinh',
    fullName: 'Tinh Nhật Mã',
    direction: 'Nam Phương Chu Tước',
    element: 'Nhật',
    animal: 'Mã (Ngựa)',
    nature: 'Hung',
    scoreWeight: -14,
    tho: 'Tinh tinh tạo tác hữu hung tinh, Vạn sự mưu cầu khó toại thành. Giá thú khởi công câu bất lợi, Phòng ngừa bệnh tật hiểm nguy sinh.',
    nenLam: ['Xây chuồng ngựa nuôi gia súc', 'Bảo dưỡng sửa chữa xe cộ'],
    kiengKy: ['Cưới hỏi', 'Làm nhà cất nóc', 'Chôn cất'],
  },
  {
    id: 25,
    name: 'Trương',
    fullName: 'Trương Nguyệt Lộc',
    direction: 'Nam Phương Chu Tước',
    element: 'Nguyệt',
    animal: 'Lộc (Hươu)',
    nature: 'Cát',
    scoreWeight: 18,
    tho: 'Trương tinh trực nhật đại cát xương, Tạo tác hôn nhân phước lộc trường. Điền trạch thăng hoa sinh quý tử, Khai trương đắc ý tấn tài phương.',
    nenLam: ['Cưới hỏi', 'Khởi công xây nhà', 'Cất nóc', 'Khai trương', 'Cầu tài đón lộc', 'Chôn cất'],
    kiengKy: ['Tranh cãi kiện tụng', 'Đi đường rừng núi hiểm trở'],
  },
  {
    id: 26,
    name: 'Dực',
    fullName: 'Dực Hỏa Xà',
    direction: 'Nam Phương Chu Tước',
    element: 'Hỏa',
    animal: 'Xà (Rắn)',
    nature: 'Hung',
    scoreWeight: -12,
    tho: 'Dực tinh tạo tác sự giai nan, Mai táng khởi công bất đắc an. Giá thú xuất hành phùng trắc trở, Đề phòng quan tụng thị phi nhàn.',
    nenLam: ['Cắt cỏ phát quang', 'Gieo hạt trồng cây', 'Phòng ngừa rắn rết cắn'],
    kiengKy: ['Cưới hỏi', 'Làm nhà cất nóc', 'Chôn cất', 'Xuất hành xa'],
  },
  {
    id: 27,
    name: 'Chẩn',
    fullName: 'Chẩn Thủy Dẫn',
    direction: 'Nam Phương Chu Tước',
    element: 'Thủy',
    animal: 'Dẫn (Giun đất)',
    nature: 'Cát',
    scoreWeight: 18,
    tho: 'Chẩn tinh trực nhật tối phong hoa, Khởi tạo hôn nhân phước mãn gia. Xuất hành khai trương câu cát lợi, Môn đình thịnh vượng rực can qua.',
    nenLam: ['Khởi công làm nhà', 'Cưới hỏi', 'Cất nóc', 'Khai trương', 'Xuất hành', 'Chôn cất an táng', 'Cầu công danh'],
    kiengKy: ['Đi thuyền vượt biển bão lớn'],
  },
];

/**
 * Thuật toán tính Nhị Thập Bát Tú từ Julian Day Number (jd)
 * Công thức chuẩn xác: saoIndex = (jd + 11) % 28
 * @param jd Julian Day Number
 */
export function getNhiThapBatTuByJd(jd: number): NhiThapBatTu {
  // Đảm bảo không âm: (jd + 11) % 28
  const idx = Math.floor((jd + 11) % 28 + 28) % 28;
  return NHI_THAP_BAT_TU_LIST[idx];
}
