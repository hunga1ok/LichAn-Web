/**
 * Xem Tuổi Vợ Chồng — Đánh Giá Hợp Khắc 5 Yếu Tố Cổ Truyền
 * ============================================================================
 * 1. Ngũ Hành Bản Mệnh (2 điểm)
 * 2. Thiên Can (2 điểm)
 * 3. Địa Chi (2 điểm)
 * 4. Cung Phi Bát Tự (2 điểm)
 * 5. Niên Mệnh Năm Sinh (2 điểm)
 * ============================================================================
 */

import { getHoaGiapData, HoaGiapData } from '@/lib/tu-vi/hoa-giap';
import { getCungPhi, CungPhiInfo } from '@/lib/tu-vi/cung-phi';
import {
  evaluateNguHanh,
  evaluateThienCan,
  evaluateDiaChi,
  evaluateCungPhi,
  NguHanhResult,
  ThienCanResult,
  DiaChiResult,
  CungPhiResult,
} from './hop-khac-rules';

export interface VoChongReport {
  chong: {
    birthYear: number;
    hoaGiap: HoaGiapData;
    cungPhi: CungPhiInfo;
  };
  vo: {
    birthYear: number;
    hoaGiap: HoaGiapData;
    cungPhi: CungPhiInfo;
  };
  scores: {
    nguHanh: NguHanhResult;
    thienCan: ThienCanResult;
    diaChi: DiaChiResult;
    cungPhi: CungPhiResult;
    nienMenh: NguHanhResult;
    totalScore: number; // Thang điểm 10
  };
  conclusion: {
    level: 'DAI_CAT' | 'TRUNG_CAT' | 'BINH_HOA' | 'HUNG';
    levelLabel: string;
    summary: string;
    advice: string;
  };
}

export function evaluateVoChong(chongYear: number, voYear: number): VoChongReport {
  const hgChong = getHoaGiapData(chongYear);
  const hgVo = getHoaGiapData(voYear);

  const cpChong = getCungPhi(chongYear, 'nam');
  const cpVo = getCungPhi(voYear, 'nu');

  // 1. Ngũ hành bản mệnh (2 điểm)
  const resNguHanh = evaluateNguHanh(hgChong.hanh, hgVo.hanh);

  // 2. Thiên can (2 điểm)
  const canChong = hgChong.canChi.split(' ')[0];
  const canVo = hgVo.canChi.split(' ')[0];
  const resThienCan = evaluateThienCan(canChong, canVo);

  // 3. Địa chi (2 điểm)
  const resDiaChi = evaluateDiaChi(hgChong.conGiap, hgVo.conGiap);

  // 4. Cung phi Bát tự (2 điểm)
  const resCungPhi = evaluateCungPhi(cpChong.cung, cpVo.cung);

  // 5. Niên mệnh (Cung ký) (2 điểm)
  const resNienMenh = evaluateNguHanh(cpChong.hanh, cpVo.hanh);

  const totalScore = resNguHanh.score + resThienCan.score + resDiaChi.score + resCungPhi.score + resNienMenh.score;

  let level: VoChongReport['conclusion']['level'] = 'BINH_HOA';
  let levelLabel = 'Bình Hòa (Khá Tốt)';
  let summary = '';
  let advice = '';

  if (totalScore >= 8) {
    level = 'DAI_CAT';
    levelLabel = 'Đại Cát (Rất Hợp)';
    summary = `Hai tuổi ${hgChong.canChi} và ${hgVo.canChi} rất hợp nhau (${totalScore}/10 điểm). Các yếu tố bản mệnh, can chi và cung phi tương sinh tương hỗ mạnh mẽ.`;
    advice = 'Vợ chồng đồng lòng, trên thuận dưới hòa, công danh tài lộc tấn tới, gia đạo hưng vượng, con cái ngoan hiền thành đạt.';
  } else if (totalScore >= 6) {
    level = 'TRUNG_CAT';
    levelLabel = 'Trung Cát (Hợp Nhau)';
    summary = `Hai tuổi ${hgChong.canChi} và ${hgVo.canChi} khá hợp nhau (${totalScore}/10 điểm). Cuộc sống hôn nhân êm ấm, đôi lúc có chút bất đồng quan điểm nhỏ nhưng dễ dàng hóa giải.`;
    advice = 'Vợ chồng cần lắng nghe, chia sẻ chân thành với nhau. Khi gặp khó khăn cùng chung tay gánh vác sẽ giữ được hạnh phúc bền lâu.';
  } else if (totalScore >= 4) {
    level = 'BINH_HOA';
    levelLabel = 'Bình Hòa (Chấp Nhận Được)';
    summary = `Hai tuổi ${hgChong.canChi} và ${hgVo.canChi} đạt mức độ bình hòa (${totalScore}/10 điểm). Không có quá nhiều điểm tương sinh nhưng cũng không phạm phải xung khắc chí mạng.`;
    advice = 'Cần rèn luyện tính kiên nhẫn và bao dung. Có thể chọn năm sinh con hợp tuổi cả hai vợ chồng để gia tăng hòa khí trong nhà.';
  } else {
    level = 'HUNG';
    levelLabel = 'Tương Khắc (Cần Hóa Giải)';
    summary = `Hai tuổi ${hgChong.canChi} và ${hgVo.canChi} có nhiều điểm tương khắc (${totalScore}/10 điểm). Tính cách và vận số có sự đối lập, dễ nảy sinh bất hòa trong đời sống hôn nhân.`;
    advice = resCungPhi.hoaGiaiAdvice || 'Nên chọn năm sinh con mang bản mệnh hoặc cung phi tương sinh với cả hai vợ chồng để làm cầu nối dung hòa; đồng thời kê giường ngủ và bếp nấu theo hướng Cát của người chồng.';
  }

  return {
    chong: {
      birthYear: chongYear,
      hoaGiap: hgChong,
      cungPhi: cpChong,
    },
    vo: {
      birthYear: voYear,
      hoaGiap: hgVo,
      cungPhi: cpVo,
    },
    scores: {
      nguHanh: resNguHanh,
      thienCan: resThienCan,
      diaChi: resDiaChi,
      cungPhi: resCungPhi,
      nienMenh: resNienMenh,
      totalScore,
    },
    conclusion: {
      level,
      levelLabel,
      summary,
      advice,
    },
  };
}
