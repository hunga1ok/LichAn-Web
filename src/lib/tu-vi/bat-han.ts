/**
 * Bảng Bát Hạn Niên Vận
 * ============================================================================
 * Tính toán 8 hạn niên vận theo tuổi mụ và giới tính:
 * Huỳnh Tuyền, Tam Kheo, Ngũ Mộ, Thiên Tinh, Tán Tận, Thiên La, Địa Võng, Diêm Vương.
 * ============================================================================
 */

export type HanLevel = 'DAI_HAN' | 'TIEU_HAN';

export interface BatHan {
  name: string;
  level: HanLevel;
  levelLabel: string;
  shortDesc: string;
  fullDesc: string;
  advice: string;
}

export const BAT_HAN_INFO: Record<string, BatHan> = {
  'Huỳnh Tuyền': {
    name: 'Huỳnh Tuyền',
    level: 'DAI_HAN',
    levelLabel: 'Đại Hạn',
    shortDesc: 'Huỳnh Tuyền bệnh nặng nguy vong, chớ qua đường thủy mang tai',
    fullDesc: 'Hạn Huỳnh Tuyền là đại hạn chủ về sức khỏe và tính mạng. Dễ mắc bệnh tật nan y tái phát, hoa mắt chóng mặt, kỵ kinh doanh đường sông nước và bảo lãnh vay mượn.',
    advice: 'Không nên đi lại đường sông nước, thuyền bè. Tránh đứng ra bảo lãnh tiền bạc cho người khác. Chú ý khám sức khỏe định kỳ.',
  },
  'Tam Kheo': {
    name: 'Tam Kheo',
    level: 'TIEU_HAN',
    levelLabel: 'Tiểu Hạn',
    shortDesc: 'Tam Kheo đau mắt đề phòng tay chân, xô xát té ngã',
    fullDesc: 'Hạn Tam Kheo chủ về các chứng bệnh về mắt (mỏi mắt, suy giảm thị lực) và xây xát, trầy xước chân tay do va quẹt, tai nạn lao động hoặc té ngã.',
    advice: 'Cẩn thận khi lao động chân tay, tham gia giao thông. Tránh làm việc trong môi trường khói bụi, giảm thời gian dùng thiết bị điện tử.',
  },
  'Ngũ Mộ': {
    name: 'Ngũ Mộ',
    level: 'TIEU_HAN',
    levelLabel: 'Tiểu Hạn',
    shortDesc: 'Ngũ Mộ hao tài tốnของ, chớ mua đồ lậu chớ cho ngủ nhờ',
    fullDesc: 'Hạn Ngũ Mộ chủ về hao hụt tài chính, mất cắp tài sản, mua phải hàng giả hàng kém chất lượng. Kỵ tuyệt đối việc cho người lạ ngủ nhờ hoặc chứa chấp đồ đạc.',
    advice: 'Quản lý tài chính cẩn trọng, không cho người ngoài ngủ nhờ nhà. Tránh đầu tư vào những phi vụ không rõ nguồn gốc pháp lý.',
  },
  'Thiên Tinh': {
    name: 'Thiên Tinh',
    level: 'TIEU_HAN',
    levelLabel: 'Tiểu Hạn',
    shortDesc: 'Thiên Tinh dính mắc thị phi, ngộ độc ăn uống tai bay vạ gió',
    fullDesc: 'Hạn Thiên Tinh chủ về bệnh tật tiêu hóa, ngộ độc thức ăn, dạ dày. Ngoài ra cần đề phòng vạ miệng dính đến kiện cáo, tranh chấp pháp luật.',
    advice: 'Ăn chín uống sôi, vệ sinh an toàn thực phẩm. Trong lời ăn tiếng nói cần khiêm tốn, tránh tranh cãi hơn thua nơi đông người.',
  },
  'Tán Tận': {
    name: 'Tán Tận',
    level: 'DAI_HAN',
    levelLabel: 'Đại Hạn',
    shortDesc: 'Tán Tận nạn đến thình lình, đàn ông rất kỵ mất tài mất người',
    fullDesc: 'Hạn Tán Tận là đại hạn rất kỵ đối với nam giới. Chủ về tai bay vạ gió, tiền bạc tiêu tan bất ngờ, tai nạn xe cộ hoặc cướp giật trên đường.',
    advice: 'Không mang theo nhiều tiền mặt, tư trang quý giá khi ra đường. Tránh góp vốn mạo hiểm, đi đêm về hôm một mình.',
  },
  'Thiên La': {
    name: 'Thiên La',
    level: 'TIEU_HAN',
    levelLabel: 'Tiểu Hạn',
    shortDesc: 'Thiên La tâm bệnh ưu sầu, đêm ngày lo lắng canh cánh',
    fullDesc: 'Hạn Thiên La chủ về tâm lý, tinh thần bất an, hay suy nghĩ tiêu cực, mất ngủ, trầm cảm. Trong gia đạo dễ có xích mích ghen tuông vô cớ.',
    advice: 'Giữ tâm lý vững vàng, rèn luyện thể thao, thiền định. Vợ chồng cần tin tưởng, thẳng thắn chia sẻ tránh để ngờ vực kéo dài.',
  },
  'Địa Võng': {
    name: 'Địa Võng',
    level: 'TIEU_HAN',
    levelLabel: 'Tiểu Hạn',
    shortDesc: 'Địa Võng nhiều nỗi bi ai, lời ăn tiếng nói chớ đi đêm hôm',
    fullDesc: 'Hạn Địa Võng chủ về thị phi khẩu thiệt, bị hiểu lầm, tai tiếng, oan ức. Kỵ đi chơi đêm với người khác giới kẻo mang tiếng bất minh.',
    advice: 'Làm ăn minh bạch giấy tờ. Giữ gìn phẩm hạnh, tránh đi đêm về hôm. Lắng nghe nhiều hơn nói, dĩ hòa vi quý.',
  },
  'Diêm Vương': {
    name: 'Diêm Vương',
    level: 'DAI_HAN',
    levelLabel: 'Đại Hạn (Kỵ nữ giới thai sản, tốt cho tài lộc)',
    shortDesc: 'Diêm Vương thưa kiện hao tài, đàn bà sản nạn chớ coi thường',
    fullDesc: 'Hạn Diêm Vương chủ về bệnh tật đau ốm lâu ngày, đặc biệt rất kỵ với phụ nữ mang thai sinh nở. Tuy nhiên, với người bình thường không mang bệnh thì hạn này lại đem tới cơ hội mưu sinh buôn bán phát tài.',
    advice: 'Phụ nữ mang thai cần bồi bổ dinh dưỡng và khám thai định kỳ. Người ốm đau cần chữa trị dứt điểm. Nếu có sức khỏe tốt thì nên tận dụng thời cơ kinh doanh.',
  },
};

const NAM_HAN_ORDER = [
  'Tam Kheo',
  'Ngũ Mộ',
  'Thiên Tinh',
  'Tán Tận',
  'Thiên La',
  'Địa Võng',
  'Diêm Vương',
  'Huỳnh Tuyền',
];

const NU_HAN_ORDER = [
  'Thiên Tinh',
  'Tam Kheo',
  'Huỳnh Tuyền',
  'Diêm Vương',
  'Địa Võng',
  'Thiên La',
  'Tán Tận',
  'Ngũ Mộ',
];

/**
 * Tính Bát Hạn theo tuổi mụ và giới tính
 */
export function getBatHan(tuoiMu: number, gender: 'nam' | 'nu'): BatHan {
  const offset = ((tuoiMu - 10) % 8 + 8) % 8;
  const hanName = gender === 'nam' ? NAM_HAN_ORDER[offset] : NU_HAN_ORDER[offset];
  return BAT_HAN_INFO[hanName];
}
