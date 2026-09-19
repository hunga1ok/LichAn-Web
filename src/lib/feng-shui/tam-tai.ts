import { DIA_CHI, THIEN_CAN } from '@/lib/constants';
import { TamTaiResult } from '@/types/feng-shui';

/**
 * Bảng Tam Hợp Cục và 3 năm Tam Tai tương ứng:
 * 1. Thân - Tý - Thìn: Tam Tai tại Dần - Mão - Thìn
 * 2. Dần - Ngọ - Tuất: Tam Tai tại Thân - Dậu - Tuất
 * 3. Tỵ - Dậu - Sửu: Tam Tai tại Hợi - Tý - Sửu
 * 4. Hợi - Mão - Mùi: Tam Tai tại Tỵ - Ngọ - Mùi
 */
const TAM_TAI_MAPPING: Record<string, string[]> = {
  // Nhóm Thủy cục: Thân - Tý - Thìn
  'Thân': ['Dần', 'Mão', 'Thìn'],
  'Tý': ['Dần', 'Mão', 'Thìn'],
  'Thìn': ['Dần', 'Mão', 'Thìn'],

  // Nhóm Hỏa cục: Dần - Ngọ - Tuất
  'Dần': ['Thân', 'Dậu', 'Tuất'],
  'Ngọ': ['Thân', 'Dậu', 'Tuất'],
  'Tuất': ['Thân', 'Dậu', 'Tuất'],

  // Nhóm Kim cục: Tỵ - Dậu - Sửu
  'Tỵ': ['Hợi', 'Tý', 'Sửu'],
  'Dậu': ['Hợi', 'Tý', 'Sửu'],
  'Sửu': ['Hợi', 'Tý', 'Sửu'],

  // Nhóm Mộc cục: Hợi - Mão - Mùi
  'Hợi': ['Tỵ', 'Ngọ', 'Mùi'],
  'Mão': ['Tỵ', 'Ngọ', 'Mùi'],
  'Mùi': ['Tỵ', 'Ngọ', 'Mùi'],
};

export function getChiOfYear(year: number): string {
  const index = (year + 8) % 12;
  return DIA_CHI[index];
}

export function getCanOfYear(year: number): string {
  const index = (year + 6) % 10;
  return THIEN_CAN[index];
}

export function getCanChiOfYear(year: number): string {
  return `${getCanOfYear(year)} ${getChiOfYear(year)} (${year})`;
}

/**
 * Kiểm tra hạn Tam Tai
 * @param birthYear Năm sinh âm lịch của gia chủ
 * @param targetYear Năm xem dự kiến làm nhà/cưới hỏi
 */
export function checkTamTai(birthYear: number, targetYear: number): TamTaiResult {
  const birthChi = getChiOfYear(birthYear);
  const targetChi = getChiOfYear(targetYear);
  const targetYearName = getCanChiOfYear(targetYear);

  const tamTaiYears = TAM_TAI_MAPPING[birthChi] || [];
  const indexInTamTai = tamTaiYears.indexOf(targetChi);

  if (indexInTamTai !== -1) {
    const rank = (indexInTamTai + 1) as 1 | 2 | 3;
    let rankDesc = '';
    if (rank === 1) {
      rankDesc = 'Năm đầu Tam Tai (Khởi Tam Tai): Không nên bắt đầu làm việc trọng đại.';
    } else if (rank === 2) {
      rankDesc = 'Năm giữa Tam Tai (Trọng Tam Tai): Năm nặng nhất, kỵ dở dang công việc lớn.';
    } else {
      rankDesc = 'Năm cuối Tam Tai (Vãn Tam Tai): Không nên kết thúc công việc quan trọng.';
    }

    return {
      isPham: true,
      yearName: targetYearName,
      chiName: targetChi,
      tamTaiYears,
      yearRank: rank,
      description: `Gia chủ tuổi ${birthChi} gặp năm ${targetChi} phạm Tam Tai năm thứ ${rank}. ${rankDesc}`,
    };
  }

  return {
    isPham: false,
    yearName: targetYearName,
    chiName: targetChi,
    tamTaiYears,
    description: `Gia chủ tuổi ${birthChi} gặp năm ${targetChi} không phạm Tam Tai (3 năm Tam Tai của tuổi này là ${tamTaiYears.join(', ')}).`,
  };
}
