export interface NumerologyResult {
  lifePathNumber: number | string;
  title: string;
  strengths: string[];
  challenges: string[];
  careerSuggestions: string[];
  description: string;
}

export const NUMEROLOGY_DATA: Record<number, {
  title: string;
  description: string;
  strengths: string[];
  challenges: string[];
  careers: string[];
}> = {
  1: {
    title: 'Người Tiên Phong & Lãnh Đạo Độc Lập (Số 1 / Số Chủ Đạo 10)',
    description: 'Số 1 (trong trường phái David A. Phillips gọi là Số Chủ Đạo 10) là hiện thân của tính độc lập, lòng quả cảm và khả năng thích ứng linh hoạt tuyệt vời. Bạn là người dám nghĩ dám làm, tự tin mở đường và có sức hút tự nhiên trong tập thể.',
    strengths: ['Tính độc lập, quyết đoán và tinh thần tiên phong', 'Khả năng thích nghi nhanh nhạy trước mọi biến đổi', 'Tự tin, hòa nhã, cuốn hút và quảng giao rộng rãi'],
    challenges: ['Cái tôi (Ego) lớn, dễ trở nên độc đoán hoặc nóng nảy', 'Dễ rơi vào trạng thái bấp bênh, sống mòn nếu thiếu mục tiêu rõ ràng', 'Có xu hướng né tránh đào sâu cảm xúc khi gặp trắc trở'],
    careers: ['Nhà sáng lập, doanh nhân, giám đốc điều hành (CEO)', 'Quản lý dự án, trưởng phòng kinh doanh, khởi nghiệp', 'Chuyên gia quan hệ công chúng (PR), truyền thông, ngoại giao'],
  },
  10: {
    title: 'Người Tiên Phong & Linh Hoạt Thích Nghi (Số Chủ Đạo 10 / Số 1 Quốc Tế)',
    description: 'Số 10 (đại diện cho số 1 trong hệ thống Nhân số học Pythagoras tại Việt Nam) sở hữu biên độ dao động và tiềm năng thích ứng linh hoạt bậc nhất. Được hợp thành từ số 1 (tiên phong, độc lập) và số 0 (tiềm năng vô hạn), bạn dễ dàng gặt hái thành công rực rỡ khi kiên định với mục tiêu.',
    strengths: ['Khả năng thích ứng phi thường với hoàn cảnh mới', 'Tự tin, quyết đoán, phong thái đĩnh đạc và đáng tin cậy', 'Quảng giao, lạc quan, được nhiều người yêu quý và kính trọng'],
    challenges: ['Dễ tự mãn, chủ quan khi công việc đang thuận lợi', 'Thiếu kiên nhẫn khi phải làm các công việc tỉ mỉ, lặp lại', 'Đôi khi quá chú trọng bề nổi mà bỏ qua chiều sâu nội tâm'],
    careers: ['Doanh nhân, nhà quản lý cấp cao, giám đốc đối ngoại', 'Nhà hoạt động xã hội, chính khách, cố vấn truyền thông', 'Lĩnh vực kinh doanh, bất động sản, nghệ thuật biểu diễn'],
  },
  2: {
    title: 'Người Hòa Giải & Đồng Cảm',
    description: 'Số 2 đại diện cho sự nhạy cảm, trực giác tinh tế và khả năng kết nối con người. Bạn là người lắng nghe tuyệt vời và luôn mong muốn hòa bình, hài hòa trong cuộc sống.',
    strengths: ['Khả năng lắng nghe, thấu cảm sâu sắc', 'Tinh thần ngoại giao, hòa giải tranh chấp', 'Lòng trung thành và tận tụy'],
    challenges: ['Dễ bị tổn thương, cả nghĩ', 'Thiếu quyết đoán khi đứng trước lựa chọn lớn', 'Đôi khi quá phụ thuộc vào người khác'],
    careers: ['Nhà ngoại giao, hòa giải viên', 'Chuyên viên tâm lý, cố vấn', 'Nghệ thuật, giáo dục, dịch vụ khách hàng'],
  },
  3: {
    title: 'Người Truyền Cảm Hứng & Sáng Tạo',
    description: 'Số 3 sở hữu năng lượng vui tươi, khả năng giao tiếp xuất chúng và đầu óc hài hước. Bạn là ngọn đèn lan tỏa niềm vui và sự lạc quan đến mọi người xung quanh.',
    strengths: ['Hoạt ngôn, giao tiếp lôi cuốn', 'Sáng tạo và trí tưởng tượng phong phú', 'Lạc quan, nhiệt tình, truyền cảm hứng'],
    challenges: ['Dễ mất tập trung, hay bỏ dở giữa chừng', 'Chi tiêu theo cảm xúc', 'Nhạy cảm trước những lời phê bình'],
    careers: ['MC, diễn giả, truyền thông', 'Marketing, sáng tạo nội dung, nghệ thuật', 'Thiết kế, giáo viên, viết lách'],
  },
  4: {
    title: 'Người Xây Dựng & Kỷ Luật',
    description: 'Số 4 mang năng lượng của sự vững chắc, thực tế và đáng tin cậy. Bạn coi trọng tính tổ chức, chi tiết và luôn nỗ lực bền bỉ để đạt được mục tiêu lâu dài.',
    strengths: ['Kỷ luật thép, kiên trì và tỉ mỉ', 'Đáng tin cậy, trung thực, nguyên tắc', 'Kỹ năng tổ chức và quản lý xuất sắc'],
    challenges: ['Bảo thủ, khó chấp nhận sự thay đổi', 'Đôi khi quá nghiêm khắc với bản thân và người khác', 'Có xu hướng lo âu về tài chính'],
    careers: ['Quản lý dự án, kỹ sư, kiến trúc sư', 'Kế toán, tài chính, kiểm toán', 'Chuyên gia vận hành, luật sư'],
  },
  5: {
    title: 'Người Khám Phá & Tự Do',
    description: 'Số 5 yêu thích tự do, phiêu lưu và những trải nghiệm mới mẻ. Bạn có khả năng thích nghi phi thường và luôn tìm kiếm sự đổi mới trong công việc cũng như cuộc sống.',
    strengths: ['Thích ứng linh hoạt với mọi hoàn cảnh', 'Dũng cảm, dám thử thách cái mới', 'Năng động, cuốn hút, giàu năng lượng'],
    challenges: ['Cả thèm chóng chán, thiếu kiên nhẫn', 'Khó cam kết lâu dài', 'Dễ bốc đồng trong quyết định'],
    careers: ['Du lịch, hướng dẫn viên, tiếp viên hàng không', 'Sales, kinh doanh tự do, bất động sản', 'Truyền thông, nhà báo, sự kiện'],
  },
  6: {
    title: 'Người Chăm Sóc & Yêu Thương',
    description: 'Số 6 là hiện thân của tình mẫu tử, sự che chở và trách nhiệm gia đình. Bạn luôn hướng về việc tạo dựng mái ấm và chăm sóc chu đáo cho những người thân yêu.',
    strengths: ['Giàu lòng nhân ái, ấm áp, bao dung', 'Có tinh thần trách nhiệm rất cao', 'Gu thẩm mỹ tinh tế, yêu cái đẹp'],
    challenges: ['Dễ hy sinh quên mình dẫn đến kiệt sức', 'Hay lo lắng thái quá, thích kiểm soát', 'Khó từ chối yêu cầu của người khác'],
    careers: ['Y bác sĩ, điều dưỡng, chăm sóc sức khỏe', 'Giáo viên mầm non, tư vấn tâm lý', 'Nội thất, thời trang, khách sạn'],
  },
  7: {
    title: 'Nhà Tri Thức & Chiêm Nghiệm',
    description: 'Số 7 là con số của trí tuệ, sự tìm tòi chân lý và khám phá chiều sâu nội tâm. Bạn thích dành không gian tĩnh lặng để nghiên cứu, phân tích và suy ngẫm về quy luật cuộc sống.',
    strengths: ['Tư duy phân tích sắc bén, logic cao', 'Trực giác nhạy bén, sâu sắc', 'Độc lập, kiên định với lý tưởng riêng'],
    challenges: ['Có xu hướng khép kín, khó gần', 'Đa nghi, khó đặt trọn niềm tin vào người khác', 'Dễ rơi vào trạng thái cô đơn, suy nghĩ nhiều'],
    careers: ['Nhà khoa học, nghiên cứu, lập trình viên', 'Triết gia, phân tích dữ liệu', 'Bác sĩ chuyên khoa, chuyên gia phong thủy'],
  },
  8: {
    title: 'Nhà Lãnh Đạo & Kiến Tạo Tài Chính',
    description: 'Số 8 gắn liền với quyền lực, sự thịnh vượng và khả năng quản trị đỉnh cao. Bạn có tầm nhìn chiến lược, hiểu rõ quy luật của tiền bạc và khát khao thành công lớn.',
    strengths: ['Tư duy kinh doanh sắc sảo, tự tin', 'Khả năng lãnh đạo và điều hành xuất chúng', 'Ý chí kiên cường, vượt qua mọi nghịch cảnh'],
    challenges: ['Dễ xem trọng vật chất hơn tình cảm', 'Độc đoán, tham công tiếc việc', 'Khó bộc lộ cảm xúc mềm mỏng'],
    careers: ['Doanh nhân, CEO, giám đốc điều hành', 'Nhà đầu tư, ngân hàng, bất động sản', 'Chính trị gia, quản trị chiến lược'],
  },
  9: {
    title: 'Người Nhân Đạo & Phụng Sự',
    description: 'Số 9 mang trái tim rộng lớn vì cộng đồng và lý tưởng cao đẹp. Bạn luôn khao khát cống hiến, mang lại giá trị tích cực và nâng đỡ những mảnh đời kém may mắn.',
    strengths: ['Lòng trắc ẩn bao la, vị tha, độ lượng', 'Tầm nhìn quốc tế, nhân văn sâu sắc', 'Có sức hút tự nhiên, đáng kính trọng'],
    challenges: ['Dễ mơ mộng xa rời thực tế', 'Thất vọng khi người khác không như mong đợi', 'Khó buông bỏ những tổn thương trong quá khứ'],
    careers: ['Hoạt động xã hội, phi chính phủ (NGO)', 'Giáo dục, chữa lành, nghệ thuật biểu diễn', 'Luật nhân quyền, môi trường'],
  },
  11: {
    title: 'Bậc Thầy Trực Giác & Khai Sáng (Master Number 11)',
    description: 'Số 11 là Master Number đại diện cho trực giác tâm linh siêu phàm, nhạy cảm tinh thần và sứ mệnh kết nối, truyền cảm hứng cho nhân loại.',
    strengths: ['Trực giác tâm linh sâu sắc, nhạy bén', 'Tầm nhìn xa trông rộng, truyền cảm hứng mạnh mẽ', 'Chân thành, vị tha và sâu sắc'],
    challenges: ['Áp lực nội tâm rất lớn, dễ căng thẳng thần kinh', 'Dễ bị choáng ngợp trước năng lượng xung quanh', 'Đôi khi rơi vào hoang mang về hướng đi'],
    careers: ['Nhà trị liệu tâm lý, chuyên gia chữa lành', 'Tác giả, triết gia, nghệ sĩ truyền cảm hứng', 'Lãnh đạo tinh thần, cố vấn cấp cao'],
  },
  22: {
    title: 'Bậc Thầy Kiến Tạo (Master Number 22/4)',
    description: 'Số 22 được mệnh danh là Kiến Trúc Sư Vĩ Đại, kết hợp giữa trực giác của số 11 và tính thực tế kỷ luật của số 4. Bạn có khả năng biến những giấc mơ vĩ mô thành hiện thực vững chắc.',
    strengths: ['Khả năng hiện thực hóa dự án khổng lồ', 'Tầm nhìn toàn cầu kết hợp tính kỷ luật thép', 'Tư duy chiến lược và thực thi vô song'],
    challenges: ['Gánh nặng trách nhiệm quá lớn', 'Khó thỏa mãn với những kết quả trung bình', 'Căng thẳng tột độ khi mọi việc chậm tiến độ'],
    careers: ['Nhà sáng lập tập đoàn, kiến tạo đô thị', 'Lãnh đạo quốc gia, tổ chức quốc tế', 'Chuyên gia quy hoạch chiến lược toàn cầu'],
  },
  33: {
    title: 'Bậc Thầy Nâng Đỡ & Chữa Lành (Master Number 33/6)',
    description: 'Số 33 là con số Master tối cao đại diện cho tình yêu thương vô điều kiện, sự hy sinh phụng sự và năng lượng chữa lành tâm hồn cho nhân loại. Bạn là ngọn hải đăng soi sáng và bảo bọc những người xung quanh (Lưu ý: trong một số tài liệu Nhân số học truyền thống tại Việt Nam theo TS. David A. Phillips, trường hợp tổng 33 cũng có thể được xem xét theo năng lượng phát triển nâng cao của Số 6).',
    strengths: ['Trái tim nhân hậu, lòng vị tha và tình thương bao la', 'Trực giác thấu suốt, khả năng nâng đỡ tinh thần vượt bậc', 'Ý chí cống hiến phụng sự cộng đồng không vụ lợi'],
    challenges: ['Dễ gánh vác quá nhiều nỗi đau và trách nhiệm của người khác', 'Nguy cơ kiệt sức vì quên chăm sóc chính bản thân mình', 'Kỳ vọng quá cao vào sự hoàn mỹ đạo đức của xã hội'],
    careers: ['Bậc thầy tâm lý, chuyên gia trị liệu chữa lành, nhà giáo dục', 'Lãnh đạo tổ chức nhân đạo, thiện nguyện quốc tế, y tế cộng đồng', 'Nhà hoạt động văn hóa, triết gia, nghệ sĩ truyền cảm hứng'],
  },
};

/**
 * Tính số chủ đạo (Life Path Number / Ruling Number) theo trường phái Pythagoras
 * Chuẩn phổ biến tại Việt Nam (theo TS. David A. Phillips & Lê Đỗ Quỳnh Hương):
 * - Cộng dồn tất cả các chữ số của ngày sinh, tháng sinh và năm sinh dương lịch.
 * - Rút gọn về các con số đơn lẻ từ 2 đến 9, hoặc con số 10.
 * - Giữ nguyên các con số Master: 11, 22, 33.
 */
export function calculateLifePathNumber(day: number, month: number, year: number): number {
  const fullDateStr = `${day}${month}${year}`;
  let total = fullDateStr
    .split('')
    .reduce((sum, digit) => sum + parseInt(digit, 10), 0);

  // Rút gọn liên tục: dừng lại khi tổng <= 10 hoặc là Master Number (11, 22, 33)
  while (total > 10 && total !== 11 && total !== 22 && total !== 33) {
    total = total
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }

  return total;
}
