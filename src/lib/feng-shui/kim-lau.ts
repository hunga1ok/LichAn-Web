import { KimLauResult, KimLauType } from '@/types/feng-shui';

/**
 * Kiểm tra hạn Kim Lâu
 * Quy tắc: Lấy tuổi mụ chia cho 9, xét số dư:
 * - Dư 1: Kim Lâu Thân (hại chính bản thân gia chủ)
 * - Dư 3: Kim Lâu Thê (hại vợ người chủ)
 * - Dư 6: Kim Lâu Tử (hại con cái)
 * - Dư 8: Kim Lâu Lục Súc (hại công việc làm ăn, hao tài tốn của)
 * - Dư 0, 2, 4, 5, 7: Không phạm Kim Lâu (Cát lành)
 */
export function checkKimLau(birthYear: number, targetYear: number): KimLauResult {
  const tuoiMu = targetYear - birthYear + 1;
  const remainder = tuoiMu % 9;

  let isPham = false;
  let type: KimLauType = 'none';
  let typeName = 'Không phạm Kim Lâu';
  let description = `Tuổi mụ ${tuoiMu} chia 9 dư ${remainder}, không phạm Kim Lâu. Rất tốt lành để làm nhà, cưới hỏi.`;

  if (remainder === 1) {
    isPham = true;
    type = 'than';
    typeName = 'Kim Lâu Thân';
    description = `Tuổi mụ ${tuoiMu} chia 9 dư 1, phạm Kim Lâu Thân. Nếu làm nhà sẽ kỵ cho chính bản thân gia chủ, dễ ốm đau, tai nạn hoặc bất an.`;
  } else if (remainder === 3) {
    isPham = true;
    type = 'the';
    typeName = 'Kim Lâu Thê';
    description = `Tuổi mụ ${tuoiMu} chia 9 dư 3, phạm Kim Lâu Thê. Nếu làm nhà hoặc cưới hỏi sẽ kỵ cho vợ/chồng gia chủ, tình cảm trắc trở, sức khỏe người phối ngẫu suy giảm.`;
  } else if (remainder === 6) {
    isPham = true;
    type = 'tu';
    typeName = 'Kim Lâu Tử';
    description = `Tuổi mụ ${tuoiMu} chia 9 dư 6, phạm Kim Lâu Tử. Nếu làm nhà sẽ kỵ cho con cái trong gia đình, đường con cái lận đận, nuôi dạy gặp khó khăn.`;
  } else if (remainder === 8) {
    isPham = true;
    type = 'suc';
    typeName = 'Kim Lâu Lục Súc';
    description = `Tuổi mụ ${tuoiMu} chia 9 dư 8, phạm Kim Lâu Lục Súc. Kỵ việc phát triển kinh tế gia đình, chăn nuôi thất bát, hao tài tốn của, làm ăn khó khăn.`;
  }

  return {
    isPham,
    tuoiMu,
    remainder,
    type,
    typeName,
    description,
  };
}
