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
    strengths: ['Trực giác tâm linh cực kỳ chuẩn xác', 'Tầm nhìn xa trông rộng, truyền cảm hứng mạnh mẽ', 'Chân thành, vị tha và sâu sắc'],
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
};

/**
 * Tính số chủ đạo (Life Path Number) theo trường phái Pythagoras
 * Rút gọn ngày, tháng, năm về số đơn lẻ, sau đó cộng lại:
 * Giữ nguyên 11 và 22
 */
export function calculateLifePathNumber(day: number, month: number, year: number): number {
  const reduce = (num: number): number => {
    let sum = num;
    while (sum > 9 && sum !== 11 && sum !== 22) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
    return sum;
  };

  const daySum = reduce(day);
  const monthSum = reduce(month);
  const yearSum = reduce(year);

  let total = daySum + monthSum + yearSum;
  while (total > 9 && total !== 11 && total !== 22) {
    total = total.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }

  return total;
}
