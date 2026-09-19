import { HoangOcResult } from '@/types/feng-shui';

interface HoangOcCungConfig {
  name: string;
  isGood: boolean;
  yNghia: string;
  desc: string;
}

const HOANG_OC_CUNG: Record<number, HoangOcCungConfig> = {
  1: {
    name: 'Nhất Cát',
    isGood: true,
    yNghia: 'Nhất Kiết an cư, thông vạn sự',
    desc: 'Làm nhà tuổi này sẽ có chốn an cư lạc nghiệp tốt lành, mọi sự hanh thông thuận lợi, gia đạo bình yên.',
  },
  2: {
    name: 'Nhì Nghi',
    isGood: true,
    yNghia: 'Nhì Nghi tấn thất địa sinh tài',
    desc: 'Làm nhà tuổi này sẽ mang lại hưng vượng, giàu có, gia đình sung túc thịnh vượng, đất đai sinh sôi.',
  },
  3: {
    name: 'Tam Địa Sát',
    isGood: false,
    yNghia: 'Tam Sát nhơn do giai đắc mạng',
    desc: 'Tuổi này làm nhà phạm Tam Địa Sát, gia chủ dễ mắc bệnh tật, tai ương, ốm đau hoặc gặp nạn rủi ro.',
  },
  4: {
    name: 'Tứ Tấn Tài',
    isGood: true,
    yNghia: 'Tứ Tấn Tài chi phước lộc lai',
    desc: 'Làm nhà tuổi này phúc lộc tự nhiên tới, kinh doanh buôn bán đại phát, tài vận dồi dào hanh thông.',
  },
  5: {
    name: 'Ngũ Thọ Tử',
    isGood: false,
    yNghia: 'Ngũ Thọ Tử ly thân tang tử',
    desc: 'Phạm Ngũ Thọ Tử rất xấu, trong nhà dễ xảy ra lục đục bất hòa, gia đạo chia rẽ, thậm chí lâm cảnh sinh ly tử biệt.',
  },
  6: {
    name: 'Lục Hoang Ốc',
    isGood: false,
    yNghia: 'Lục Ốc tạo gia bất khả thành',
    desc: 'Tuổi này làm nhà phạm Lục Hoang Ốc, công việc khó thành đạt, tiền tài tiêu tán, trắc trở nhiều bề.',
  },
};

/**
 * Kiểm tra hạn Hoang Ốc theo vòng 6 cung cổ truyền
 * @param birthYear Năm sinh âm lịch gia chủ
 * @param targetYear Năm dự kiến khởi công làm nhà
 */
export function checkHoangOc(birthYear: number, targetYear: number): HoangOcResult {
  const tuoiMu = targetYear - birthYear + 1;

  if (tuoiMu < 10) {
    return {
      isGood: true,
      tuoiMu,
      cungIndex: 1,
      cungName: 'Nhất Cát',
      yNghia: HOANG_OC_CUNG[1].yNghia,
      description: 'Chưa đủ tuổi làm nhà.',
    };
  }

  const tens = Math.floor(tuoiMu / 10);
  const units = tuoiMu % 10;

  // Tính cung khởi của hàng chục: 10->1, 20->2, 30->3, 40->4, 50->5, 60->6, 70->1...
  const tensBase = ((tens - 1) % 6) + 1;

  // Đếm tiếp theo chiều kim đồng hồ cho phần đơn vị
  const cungIndex = ((tensBase - 1 + units) % 6) + 1;
  const config = HOANG_OC_CUNG[cungIndex];

  return {
    isGood: config.isGood,
    tuoiMu,
    cungIndex,
    cungName: config.name,
    yNghia: config.yNghia,
    description: `Tuổi mụ ${tuoiMu} rơi vào cung ${config.name} (${config.isGood ? 'Cát - Tốt lành' : 'Hung - Nên kiêng cữ'}). ${config.desc}`,
  };
}
