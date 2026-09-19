import { checkTamTai, getCanChiOfYear } from './tam-tai';
import { checkKimLau } from './kim-lau';
import { checkHoangOc } from './hoang-oc';
import { XemTuoiLamNhaResult, TuoiMuonLamNha } from '@/types/feng-shui';

export { checkTamTai, checkKimLau, checkHoangOc, getCanChiOfYear };
export * from '@/types/feng-shui';

/**
 * Quét danh sách các tuổi đẹp nhất trong năm để mượn tuổi làm nhà
 * Tiêu chí: Không phạm Tam Tai, Không phạm Kim Lâu, và được cung Hoang Ốc Cát (Nhất Cát, Nhì Nghi, Tứ Tấn Tài)
 */
export function getTuoiMuonLamNha(targetYear: number, birthYearExclude?: number): TuoiMuonLamNha[] {
  const results: TuoiMuonLamNha[] = [];
  const minBirth = targetYear - 75; // khoảng 76 tuổi mụ
  const maxBirth = targetYear - 20; // khoảng 21 tuổi mụ

  for (let y = maxBirth; y >= minBirth; y--) {
    if (birthYearExclude && y === birthYearExclude) continue;

    const tamTai = checkTamTai(y, targetYear);
    const kimLau = checkKimLau(y, targetYear);
    const hoangOc = checkHoangOc(y, targetYear);

    // Bắt buộc sạch cả 3 hạn
    if (!tamTai.isPham && !kimLau.isPham && hoangOc.isGood) {
      results.push({
        birthYear: y,
        canChi: getCanChiOfYear(y),
        tuoiMu: targetYear - y + 1,
        hoangOcCung: hoangOc.cungName,
        reasons: [
          'Không phạm Tam Tai',
          'Không phạm Kim Lâu',
          `Cung Hoang Ốc: ${hoangOc.cungName} (${hoangOc.yNghia})`,
        ],
      });
    }
  }

  // Sắp xếp ưu tiên độ tuổi vàng từ 35 đến 65 (độ tuổi chín chắn, phúc lộc vững vàng nhất)
  return results.sort((a, b) => {
    const isPrimeA = a.tuoiMu >= 35 && a.tuoiMu <= 65;
    const isPrimeB = b.tuoiMu >= 35 && b.tuoiMu <= 65;
    if (isPrimeA && !isPrimeB) return -1;
    if (!isPrimeA && isPrimeB) return 1;
    return b.birthYear - a.birthYear;
  });
}

/**
 * Tra cứu phong thủy Xem Tuổi Làm Nhà chi tiết
 * @param birthYear Năm sinh âm lịch gia chủ
 * @param targetYear Năm dự kiến khởi công làm nhà
 */
export function xemTuoiLamNha(birthYear: number, targetYear: number): XemTuoiLamNhaResult {
  const canChiBirth = getCanChiOfYear(birthYear);
  const canChiTarget = getCanChiOfYear(targetYear);
  const tuoiMu = targetYear - birthYear + 1;

  const tamTai = checkTamTai(birthYear, targetYear);
  const kimLau = checkKimLau(birthYear, targetYear);
  const hoangOc = checkHoangOc(birthYear, targetYear);

  let score = 100;
  if (tamTai.isPham) score -= 25;
  if (kimLau.isPham) score -= 45;
  if (!hoangOc.isGood) score -= 35;
  score = Math.max(0, score);

  let canBuild = false;
  let verdict = '';
  let recommendation = '';
  let suggestedAges: TuoiMuonLamNha[] | undefined = undefined;

  // Trường hợp 1: Sạch cả 3 hạn
  if (!tamTai.isPham && !kimLau.isPham && hoangOc.isGood) {
    canBuild = true;
    verdict = 'Đại Cát — Tuổi Rất Đẹp Để Làm Nhà';
    recommendation = `Gia chủ tuổi ${canChiBirth} trong năm ${canChiTarget} đạt tuổi mụ ${tuoiMu} không phạm cả 3 đại hạn Tam Tai, Kim Lâu, Hoang Ốc. Đây là thời vận vàng để động thổ xây dựng, cất nóc, tạo dựng cơ nghiệp vững bền, gia đạo hưng thịnh.`;
  } 
  // Trường hợp 2: Không phạm Kim Lâu & Hoang Ốc, nhưng vướng Tam Tai nhẹ
  else if (!kimLau.isPham && hoangOc.isGood && tamTai.isPham) {
    canBuild = true;
    verdict = 'Tạm Chấp Nhận — Có Thể Khởi Công';
    recommendation = `Gia chủ tuổi ${canChiBirth} không phạm Kim Lâu và được cung Hoang Ốc ${hoangOc.cungName} cát lợi. Tuy nhiên có phạm Tam Tai năm thứ ${tamTai.yearRank}. Nếu bắt buộc phải xây nhà trong năm nay, gia chủ vẫn có thể tự khởi công nhưng cần chọn ngày giờ hoàng đạo đại cát để hóa giải, hoặc tiến hành vào những tháng cuối năm.`;
  } 
  // Trường hợp 3: Phạm Kim Lâu hoặc Hoang Ốc
  else {
    canBuild = false;
    verdict = 'Phạm Đại Kỵ — Nên Mượn Tuổi Làm Nhà';

    const phamItems: string[] = [];
    if (kimLau.isPham) phamItems.push(kimLau.typeName);
    if (!hoangOc.isGood) phamItems.push(`Hoang Ốc (${hoangOc.cungName})`);
    if (tamTai.isPham) phamItems.push(`Tam Tai năm thứ ${tamTai.yearRank}`);

    recommendation = `Gia chủ tuổi ${canChiBirth} trong năm ${canChiTarget} phạm vào ${phamItems.join(' và ')}. Theo quy tắc trạch cát phong thủy cổ truyền, nếu tự đứng tuổi khởi công sẽ dễ gặp trắc trở, ảnh hưởng gia đạo hoặc kinh tế. Gia chủ nên tiến hành MƯỢN TUỔI của người thân/bạn bè được tuổi đẹp trong năm để thay mặt cúng bái động thổ và cất nóc.`;

    suggestedAges = getTuoiMuonLamNha(targetYear, birthYear);
  }

  return {
    birthYear,
    targetYear,
    canChiBirth,
    canChiTarget,
    tuoiMu,
    tamTai,
    kimLau,
    hoangOc,
    score,
    canBuild,
    verdict,
    recommendation,
    suggestedAges,
  };
}
