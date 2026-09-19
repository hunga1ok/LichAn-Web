/**
 * Quy Luật Hợp Khắc Cổ Truyền Việt Nam
 * ============================================================================
 * Bao gồm:
 * 1. Ngũ Hành tương sinh, tương khắc, bình hòa
 * 2. Thiên Can ngũ hợp, tương xung, tương khắc
 * 3. Địa Chi tam hợp, lục hợp, lục xung, lục hại, tứ hành xung
 * 4. Cung Phi Bát San (Bát Trạch phối ngẫu)
 * ============================================================================
 */

import type { CungPhiName } from '@/lib/tu-vi/cung-phi';

export type NguHanhName = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';

export interface NguHanhResult {
  score: number; // 0, 1, 2
  relation: 'Tương Sinh' | 'Bình Hòa' | 'Tương Khắc';
  isGood: boolean;
  description: string;
}

export interface ThienCanResult {
  score: number; // 0, 1, 2
  relation: 'Tương Hợp' | 'Bình Hòa' | 'Tương Xung';
  isGood: boolean;
  description: string;
}

export interface DiaChiResult {
  score: number; // 0, 1, 2
  relation: 'Tam Hợp' | 'Lục Hợp' | 'Bình Hòa' | 'Lục Xung' | 'Lục Hại' | 'Tứ Hành Xung';
  isGood: boolean;
  description: string;
}

export interface CungPhiResult {
  score: number; // 0, 1, 2
  batSan: 'Sinh Khí' | 'Thiên Y' | 'Diên Niên' | 'Phục Vị' | 'Tuyệt Mệnh' | 'Ngũ Quỷ' | 'Lục Sát' | 'Họa Hại';
  isGood: boolean;
  mucDo: 'Đại Cát' | 'Thượng Cát' | 'Thứ Cát' | 'Tiểu Cát' | 'Đại Hung' | 'Thứ Hung' | 'Tiểu Hung';
  description: string;
  hoaGiaiAdvice?: string;
}

/**
 * 1. Kiểm tra Ngũ Hành Tương Sinh / Tương Khắc
 */
export function evaluateNguHanh(h1: NguHanhName, h2: NguHanhName): NguHanhResult {
  const SINH_MAP: Record<NguHanhName, NguHanhName> = {
    'Kim': 'Thủy',
    'Thủy': 'Mộc',
    'Mộc': 'Hỏa',
    'Hỏa': 'Thổ',
    'Thổ': 'Kim',
  };

  const KHAC_MAP: Record<NguHanhName, NguHanhName> = {
    'Kim': 'Mộc',
    'Mộc': 'Thổ',
    'Thổ': 'Thủy',
    'Thủy': 'Hỏa',
    'Hỏa': 'Kim',
  };

  if (h1 === h2) {
    return {
      score: 1,
      relation: 'Bình Hòa',
      isGood: true,
      description: `Hai mệnh cùng thuộc hành ${h1}, bình hòa không xung đột, tương hỗ cùng phát triển.`,
    };
  }

  if (SINH_MAP[h1] === h2 || SINH_MAP[h2] === h1) {
    const whoSinhWho = SINH_MAP[h1] === h2 ? `${h1} sinh ${h2}` : `${h2} sinh ${h1}`;
    return {
      score: 2,
      relation: 'Tương Sinh',
      isGood: true,
      description: `Hai mệnh tương sinh (${whoSinhWho}), mang lại nhiều sinh khí, may mắn và phúc lộc dồi dào.`,
    };
  }

  if (KHAC_MAP[h1] === h2 || KHAC_MAP[h2] === h1) {
    const whoKhacWho = KHAC_MAP[h1] === h2 ? `${h1} khắc ${h2}` : `${h2} khắc ${h1}`;
    return {
      score: 0,
      relation: 'Tương Khắc',
      isGood: false,
      description: `Hai mệnh tương khắc (${whoKhacWho}), dễ nảy sinh bất đồng, cần biết nhường nhịn và hóa giải.`,
    };
  }

  return {
    score: 1,
    relation: 'Bình Hòa',
    isGood: true,
    description: `Hai mệnh ${h1} và ${h2} bình hòa, không tương sinh cũng không tương khắc.`,
  };
}

/**
 * 2. Kiểm tra Thiên Can Hợp / Xung
 */
export function evaluateThienCan(can1: string, can2: string): ThienCanResult {
  const NGU_HOP_MAP: Record<string, string> = {
    'Giáp': 'Kỷ', 'Kỷ': 'Giáp',
    'Ất': 'Canh', 'Canh': 'Ất',
    'Bính': 'Tân', 'Tân': 'Bính',
    'Đinh': 'Nhâm', 'Nhâm': 'Đinh',
    'Mậu': 'Quý', 'Quý': 'Mậu',
  };

  const TUONG_XUNG_MAP: Record<string, string[]> = {
    'Giáp': ['Canh', 'Mậu'],
    'Ất': ['Tân', 'Kỷ'],
    'Bính': ['Nhâm', 'Canh'],
    'Đinh': ['Quý', 'Tân'],
    'Mậu': ['Giáp', 'Nhâm'],
    'Kỷ': ['Ất', 'Quý'],
    'Canh': ['Bính', 'Giáp'],
    'Tân': ['Đinh', 'Ất'],
    'Nhâm': ['Mậu', 'Bính'],
    'Quý': ['Kỷ', 'Đinh'],
  };

  if (NGU_HOP_MAP[can1] === can2) {
    return {
      score: 2,
      relation: 'Tương Hợp',
      isGood: true,
      description: `Thiên can ${can1} và ${can2} thuộc thế "Ngũ Hợp" đại cát, tâm đầu ý hợp, gia đạo thuận hòa.`,
    };
  }

  if (TUONG_XUNG_MAP[can1]?.includes(can2)) {
    return {
      score: 0,
      relation: 'Tương Xung',
      isGood: false,
      description: `Thiên can ${can1} và ${can2} tương xung khắc, tính cách có phần trái ngược, dễ tranh cãi.`,
    };
  }

  return {
    score: 1,
    relation: 'Bình Hòa',
    isGood: true,
    description: `Thiên can ${can1} và ${can2} bình hòa, không khắc phạt nhau, cuộc sống êm ả.`,
  };
}

/**
 * 3. Kiểm tra Địa Chi Tam Hợp, Lục Hợp, Lục Xung, Lục Hại
 */
export function evaluateDiaChi(chi1: string, chi2: string): DiaChiResult {
  const LUC_HOP_MAP: Record<string, string> = {
    'Tý': 'Sửu', 'Sửu': 'Tý',
    'Dần': 'Hợi', 'Hợi': 'Dần',
    'Mão': 'Tuất', 'Tuất': 'Mão',
    'Thìn': 'Dậu', 'Dậu': 'Thìn',
    'Tỵ': 'Thân', 'Thân': 'Tỵ',
    'Ngọ': 'Mùi', 'Mùi': 'Ngọ',
  };

  const TAM_HOP_GROUPS = [
    ['Thân', 'Tý', 'Thìn'],
    ['Dần', 'Ngọ', 'Tuất'],
    ['Tỵ', 'Dậu', 'Sửu'],
    ['Hợi', 'Mão', 'Mùi'],
  ];

  const LUC_XUNG_MAP: Record<string, string> = {
    'Tý': 'Ngọ', 'Ngọ': 'Tý',
    'Sửu': 'Mùi', 'Mùi': 'Sửu',
    'Dần': 'Thân', 'Thân': 'Dần',
    'Mão': 'Dậu', 'Dậu': 'Mão',
    'Thìn': 'Tuất', 'Tuất': 'Thìn',
    'Tỵ': 'Hợi', 'Hợi': 'Tỵ',
  };

  const LUC_HAI_MAP: Record<string, string> = {
    'Tý': 'Mùi', 'Mùi': 'Tý',
    'Sửu': 'Ngọ', 'Ngọ': 'Sửu',
    'Dần': 'Tỵ', 'Tỵ': 'Dần',
    'Mão': 'Thìn', 'Thìn': 'Mão',
    'Thân': 'Hợi', 'Hợi': 'Thân',
    'Dậu': 'Tuất', 'Tuất': 'Dậu',
  };

  const TU_HANH_XUNG_GROUPS = [
    ['Tý', 'Ngọ', 'Mão', 'Dậu'],
    ['Thìn', 'Tuất', 'Sửu', 'Mùi'],
    ['Dần', 'Thân', 'Tỵ', 'Hợi'],
  ];

  if (LUC_HOP_MAP[chi1] === chi2) {
    return {
      score: 2,
      relation: 'Lục Hợp',
      isGood: true,
      description: `Địa chi ${chi1} và ${chi2} thuộc thế "Lục Hợp", gắn kết keo sơn, làm ăn phát đạt, vợ chồng hòa thuận.`,
    };
  }

  for (const group of TAM_HOP_GROUPS) {
    if (group.includes(chi1) && group.includes(chi2)) {
      return {
        score: 2,
        relation: 'Tam Hợp',
        isGood: true,
        description: `Địa chi ${chi1} và ${chi2} cùng nằm trong cục Tam Hợp, luôn tương trợ, giúp đỡ lẫn nhau vượt qua mọi gian khó.`,
      };
    }
  }

  if (LUC_XUNG_MAP[chi1] === chi2) {
    return {
      score: 0,
      relation: 'Lục Xung',
      isGood: false,
      description: `Địa chi ${chi1} và ${chi2} phạm "Lục Xung" (đối xung trực diện), tính tình dễ xung đột gay gắt.`,
    };
  }

  if (LUC_HAI_MAP[chi1] === chi2) {
    return {
      score: 0,
      relation: 'Lục Hại',
      isGood: false,
      description: `Địa chi ${chi1} và ${chi2} phạm "Lục Hại", dễ sinh nghi kỵ, tổn hại tình cảm và công việc.`,
    };
  }

  for (const group of TU_HANH_XUNG_GROUPS) {
    if (group.includes(chi1) && group.includes(chi2)) {
      return {
        score: 0,
        relation: 'Tứ Hành Xung',
        isGood: false,
        description: `Địa chi ${chi1} và ${chi2} nằm trong nhóm Tứ Hành Xung, cần dung hòa và nhường nhịn.`,
      };
    }
  }

  return {
    score: 1,
    relation: 'Bình Hòa',
    isGood: true,
    description: `Địa chi ${chi1} và ${chi2} bình hòa, không xung không khắc, chung sống hòa bình.`,
  };
}

/**
 * 4. Cung Phi Bát San Phối Ngẫu (Bát Trạch)
 */
const BAT_SAN_MATRIX: Record<CungPhiName, Record<CungPhiName, {
  batSan: CungPhiResult['batSan'];
  isGood: boolean;
  mucDo: CungPhiResult['mucDo'];
  desc: string;
  advice?: string;
}>> = {
  'Càn': {
    'Càn': { batSan: 'Phục Vị', isGood: true, mucDo: 'Tiểu Cát', desc: 'Bình yên, no ấm, gia đạo ổn định.' },
    'Khảm': { batSan: 'Lục Sát', isGood: false, mucDo: 'Thứ Hung', desc: 'Gia đạo bất an, dễ có tranh cãi, tai tiếng thị phi.', advice: 'Hóa giải bằng cách sinh con mang cung Diên Niên hoặc kê giường hướng Diên Niên.' },
    'Cấn': { batSan: 'Thiên Y', isGood: true, mucDo: 'Thượng Cát', desc: 'Sức khỏe dồi dào, gặp quý nhân phù trợ, gia đình trường thọ thịnh vượng.' },
    'Chấn': { batSan: 'Ngũ Quỷ', isGood: false, mucDo: 'Đại Hung', desc: 'Dễ gặp hỏa hoạn, mất cắp, bất hòa, tai họa bất ngờ.', advice: 'Hóa giải bằng cách sinh con cung Sinh Khí hoặc đặt bếp tọa Hung hướng Cát.' },
    'Tốn': { batSan: 'Họa Hại', isGood: false, mucDo: 'Tiểu Hung', desc: 'Hao tài tốn của, làm ăn khó giữ được của cải, gặp thị phi nhỏ.', advice: 'Hóa giải bằng cách đặt bàn thờ hướng Phục Vị.' },
    'Ly': { batSan: 'Tuyệt Mệnh', isGood: false, mucDo: 'Đại Hung', desc: 'Đại hung, ảnh hưởng sức khỏe và tính mạng, dễ chia ly.', advice: 'Hóa giải bằng cách sinh con mang cung Thiên Y để trấn Tuyệt Mệnh.' },
    'Khôn': { batSan: 'Diên Niên', isGood: true, mucDo: 'Thứ Cát', desc: 'Vợ chồng hòa thuận, trăm năm hạnh phúc, con cái ngoan ngoãn thành đạt.' },
    'Đoài': { batSan: 'Sinh Khí', isGood: true, mucDo: 'Đại Cát', desc: 'Đại cát đại lợi, phú quý vinh hiển, con cháu đầy đàn, công danh hiển hách.' },
  },
  'Khảm': {
    'Càn': { batSan: 'Lục Sát', isGood: false, mucDo: 'Thứ Hung', desc: 'Gia đạo bất an, tai tiếng thị phi.' },
    'Khảm': { batSan: 'Phục Vị', isGood: true, mucDo: 'Tiểu Cát', desc: 'Bình an, tài vận ổn định.' },
    'Cấn': { batSan: 'Ngũ Quỷ', isGood: false, mucDo: 'Đại Hung', desc: 'Bất hòa, tai bay vạ gió, hao tài.' },
    'Chấn': { batSan: 'Thiên Y', isGood: true, mucDo: 'Thượng Cát', desc: 'Thân tâm an lạc, tiêu trừ tật ách, quý nhân trợ mệnh.' },
    'Tốn': { batSan: 'Sinh Khí', isGood: true, mucDo: 'Đại Cát', desc: 'Phúc lộc vẹn toàn, tiền bạc dồi dào, thăng quan tiến chức.' },
    'Ly': { batSan: 'Diên Niên', isGood: true, mucDo: 'Thứ Cát', desc: 'Tình cảm bền vững, gia đạo an khang.' },
    'Khôn': { batSan: 'Tuyệt Mệnh', isGood: false, mucDo: 'Đại Hung', desc: 'Tuyệt tự, ốm đau triền miên, tài vận suy kiệt.' },
    'Đoài': { batSan: 'Họa Hại', isGood: false, mucDo: 'Tiểu Hung', desc: 'Thị phi, trở ngại trong công việc.' },
  },
  'Cấn': {
    'Càn': { batSan: 'Thiên Y', isGood: true, mucDo: 'Thượng Cát', desc: 'Gia đạo hưng vượng, sống lâu mạnh khỏe.' },
    'Khảm': { batSan: 'Ngũ Quỷ', isGood: false, mucDo: 'Đại Hung', desc: 'Mất mát tiền của, tranh chấp lục đục.' },
    'Cấn': { batSan: 'Phục Vị', isGood: true, mucDo: 'Tiểu Cát', desc: 'Ổn định, tâm an trí sáng.' },
    'Chấn': { batSan: 'Lục Sát', isGood: false, mucDo: 'Thứ Hung', desc: 'Bất hòa, kiện tụng, tình cảm rạn nứt.' },
    'Tốn': { batSan: 'Tuyệt Mệnh', isGood: false, mucDo: 'Đại Hung', desc: 'Tai họa khó lường, sinh ly tử biệt.' },
    'Ly': { batSan: 'Họa Hại', isGood: false, mucDo: 'Tiểu Hung', desc: 'Tiểu nhân quấy phá, làm ăn vất vả.' },
    'Khôn': { batSan: 'Sinh Khí', isGood: true, mucDo: 'Đại Cát', desc: 'Đại phú đại quý, con cháu hưng vượng.' },
    'Đoài': { batSan: 'Diên Niên', isGood: true, mucDo: 'Thứ Cát', desc: 'Vợ chồng sắt son, gia đình ấm êm sum vầy.' },
  },
  'Chấn': {
    'Càn': { batSan: 'Ngũ Quỷ', isGood: false, mucDo: 'Đại Hung', desc: 'Tán tài, tai bay vạ gió.' },
    'Khảm': { batSan: 'Thiên Y', isGood: true, mucDo: 'Thượng Cát', desc: 'Tài lộc dồi dào, phúc thọ tăng tiến.' },
    'Cấn': { batSan: 'Lục Sát', isGood: false, mucDo: 'Thứ Hung', desc: 'Gặp nhiều thị phi oán giận.' },
    'Chấn': { batSan: 'Phục Vị', isGood: true, mucDo: 'Tiểu Cát', desc: 'An cư lạc nghiệp, gia đạo bình yên.' },
    'Tốn': { batSan: 'Diên Niên', isGood: true, mucDo: 'Thứ Cát', desc: 'Gia đình hòa thuận, vạn sự hanh thông.' },
    'Ly': { batSan: 'Sinh Khí', isGood: true, mucDo: 'Đại Cát', desc: 'Phát tài phát lộc, danh vọng rạng rỡ.' },
    'Khôn': { batSan: 'Họa Hại', isGood: false, mucDo: 'Tiểu Hung', desc: 'Khó khăn trắc trở, hao tốn tiền của.' },
    'Đoài': { batSan: 'Tuyệt Mệnh', isGood: false, mucDo: 'Đại Hung', desc: 'Tuyệt mạng, bệnh tật hiểm nghèo.' },
  },
  'Tốn': {
    'Càn': { batSan: 'Họa Hại', isGood: false, mucDo: 'Tiểu Hung', desc: 'Gặp chuyện không may, vướng thị phi.' },
    'Khảm': { batSan: 'Sinh Khí', isGood: true, mucDo: 'Đại Cát', desc: 'Đại cát vượng tài, con đàn cháu đống.' },
    'Cấn': { batSan: 'Tuyệt Mệnh', isGood: false, mucDo: 'Đại Hung', desc: 'Hao tài tốn của, tổn hại gia chủ.' },
    'Chấn': { batSan: 'Diên Niên', isGood: true, mucDo: 'Thứ Cát', desc: 'Bền vững dài lâu, tình duyên êm đẹp.' },
    'Tốn': { batSan: 'Phục Vị', isGood: true, mucDo: 'Tiểu Cát', desc: 'Thanh thản an vui, phúc lộc vững bền.' },
    'Ly': { batSan: 'Thiên Y', isGood: true, mucDo: 'Thượng Cát', desc: 'Khỏe mạnh sống lâu, quý nhân tương trợ.' },
    'Khôn': { batSan: 'Ngũ Quỷ', isGood: false, mucDo: 'Đại Hung', desc: 'Trắc trở làm ăn, dễ sinh khẩu thiệt.' },
    'Đoài': { batSan: 'Lục Sát', isGood: false, mucDo: 'Thứ Hung', desc: 'Tình cảm rạn nứt, hao tán tiền của.' },
  },
  'Ly': {
    'Càn': { batSan: 'Tuyệt Mệnh', isGood: false, mucDo: 'Đại Hung', desc: 'Bệnh tật, chia ly, tổn hại con cháu.' },
    'Khảm': { batSan: 'Diên Niên', isGood: true, mucDo: 'Thứ Cát', desc: 'Thủy Hỏa tương tề, trăm năm hạnh phúc.' },
    'Cấn': { batSan: 'Họa Hại', isGood: false, mucDo: 'Tiểu Hung', desc: 'Bất trắc trở ngại, làm ăn gian nan.' },
    'Chấn': { batSan: 'Sinh Khí', isGood: true, mucDo: 'Đại Cát', desc: 'Đại phú đại quý, tiền tài như nước.' },
    'Tốn': { batSan: 'Thiên Y', isGood: true, mucDo: 'Thượng Cát', desc: 'Trường thọ bình an, con hiền dâu thảo.' },
    'Ly': { batSan: 'Phục Vị', isGood: true, mucDo: 'Tiểu Cát', desc: 'Gia đạo bình an, phúc khí tràn trề.' },
    'Khôn': { batSan: 'Lục Sát', isGood: false, mucDo: 'Thứ Hung', desc: 'Thị phi điều tiếng, lục đục gia đình.' },
    'Đoài': { batSan: 'Ngũ Quỷ', isGood: false, mucDo: 'Đại Hung', desc: 'Mất của, hỏa tai, gia đạo bất hòa.' },
  },
  'Khôn': {
    'Càn': { batSan: 'Diên Niên', isGood: true, mucDo: 'Thứ Cát', desc: 'Trời đất hòa hợp, gia đình viên mãn.' },
    'Khảm': { batSan: 'Tuyệt Mệnh', isGood: false, mucDo: 'Đại Hung', desc: 'Tổn thọ hao tài, sinh ly tử biệt.' },
    'Cấn': { batSan: 'Sinh Khí', isGood: true, mucDo: 'Đại Cát', desc: 'Sinh sôi nảy nở, giàu sang phú quý.' },
    'Chấn': { batSan: 'Họa Hại', isGood: false, mucDo: 'Tiểu Hung', desc: 'Tiểu nhân quấy phá, hao tổn sức lực.' },
    'Tốn': { batSan: 'Ngũ Quỷ', isGood: false, mucDo: 'Đại Hung', desc: 'Tai họa bất ngờ, làm ăn thất bát.' },
    'Ly': { batSan: 'Lục Sát', isGood: false, mucDo: 'Thứ Hung', desc: 'Gặp nhiều trắc trở, kiện cáo thị phi.' },
    'Khôn': { batSan: 'Phục Vị', isGood: true, mucDo: 'Tiểu Cát', desc: 'Đức dày nâng đỡ, gia đạo yên ổn.' },
    'Đoài': { batSan: 'Thiên Y', isGood: true, mucDo: 'Thượng Cát', desc: 'Quý nhân nâng đỡ, sức khỏe dồi dào.' },
  },
  'Đoài': {
    'Càn': { batSan: 'Sinh Khí', isGood: true, mucDo: 'Đại Cát', desc: 'Kim khí tương sinh, đại phát tài lộc, hiển vinh.' },
    'Khảm': { batSan: 'Họa Hại', isGood: false, mucDo: 'Tiểu Hung', desc: 'Khẩu thiệt thị phi, mưu sự khó thành.' },
    'Cấn': { batSan: 'Diên Niên', isGood: true, mucDo: 'Thứ Cát', desc: 'Thổ Kim tương sinh, phước lộc tràn trề.' },
    'Chấn': { batSan: 'Tuyệt Mệnh', isGood: false, mucDo: 'Đại Hung', desc: 'Kim khắc Mộc, hao tán tiền bạc, tổn hại sức khỏe.' },
    'Tốn': { batSan: 'Lục Sát', isGood: false, mucDo: 'Thứ Hung', desc: 'Hiểu lầm tranh chấp, gia đình không yên.' },
    'Ly': { batSan: 'Ngũ Quỷ', isGood: false, mucDo: 'Đại Hung', desc: 'Hỏa khắc Kim, hỏa hoạn mất của, tai ương.' },
    'Khôn': { batSan: 'Thiên Y', isGood: true, mucDo: 'Thượng Cát', desc: 'Được trời che chở, sống lâu mạnh khỏe.' },
    'Đoài': { batSan: 'Phục Vị', isGood: true, mucDo: 'Tiểu Cát', desc: 'An vui tự tại, cuộc sống thái bình.' },
  },
};

export function evaluateCungPhi(cungChong: CungPhiName, cungVo: CungPhiName): CungPhiResult {
  const record = BAT_SAN_MATRIX[cungChong]?.[cungVo] || {
    batSan: 'Phục Vị',
    isGood: true,
    mucDo: 'Tiểu Cát',
    desc: 'Bình hòa, cuộc sống ổn định.',
  };

  return {
    score: record.isGood ? 2 : 0,
    batSan: record.batSan,
    isGood: record.isGood,
    mucDo: record.mucDo,
    description: `Cung ${cungChong} kết hợp Cung ${cungVo} rơi vào cung ${record.batSan} (${record.mucDo}). ${record.desc}`,
    hoaGiaiAdvice: record.advice,
  };
}
