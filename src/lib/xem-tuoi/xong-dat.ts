/**
 * Xem Tuổi Xông Đất & Mở Hàng Đầu Năm Mới
 * ============================================================================
 * Tìm kiếm các tuổi đại cát xông nhà, mở hàng khai xuân cho gia chủ:
 * 1. Tương hợp giữa Người Xông Đất và Gia Chủ (Ngũ hành, Can, Chi)
 * 2. Tương hợp giữa Người Xông Đất và Năm Mới (Ngũ hành, Can, Chi)
 * Tự động xếp hạng Top các tuổi đẹp nhất kèm lý do chi tiết.
 * ============================================================================
 */

import { getHoaGiapData, HoaGiapData } from '@/lib/tu-vi/hoa-giap';
import {
  evaluateNguHanh,
  evaluateThienCan,
  evaluateDiaChi,
} from './hop-khac-rules';

export interface XongDatCandidate {
  year: number;
  hoaGiap: HoaGiapData;
  score: number; // Thang điểm 10
  level: 'DAI_CAT' | 'CAT' | 'BINH_HOA';
  levelLabel: string;
  reasons: string[];
}

export interface XongDatReport {
  giaChu: {
    birthYear: number;
    hoaGiap: HoaGiapData;
  };
  targetYear: number;
  targetYearHoaGiap: HoaGiapData;
  topCandidates: XongDatCandidate[];
}

function evaluateXongDatScore(
  candidateYear: number,
  giaChuYear: number,
  targetYear: number
): XongDatCandidate {
  const hgCan = getHoaGiapData(candidateYear);
  const hgGiaChu = getHoaGiapData(giaChuYear);
  const hgNam = getHoaGiapData(targetYear);

  const canCandidate = hgCan.canChi.split(' ')[0];
  const canGiaChu = hgGiaChu.canChi.split(' ')[0];
  const canNam = hgNam.canChi.split(' ')[0];

  const reasons: string[] = [];

  // A. So với gia chủ
  // 1. Ngũ hành
  const nhGiaChu = evaluateNguHanh(hgCan.hanh, hgGiaChu.hanh);
  // 2. Thiên can
  const tcGiaChu = evaluateThienCan(canCandidate, canGiaChu);
  // 3. Địa chi
  const dcGiaChu = evaluateDiaChi(hgCan.conGiap, hgGiaChu.conGiap);

  // B. So với năm mới
  const nhNam = evaluateNguHanh(hgCan.hanh, hgNam.hanh);
  const tcNam = evaluateThienCan(canCandidate, canNam);
  const dcNam = evaluateDiaChi(hgCan.conGiap, hgNam.conGiap);

  // Tính điểm tổng: Tối đa 12 điểm -> quy về thang điểm 10
  const rawScore = nhGiaChu.score + tcGiaChu.score + dcGiaChu.score + nhNam.score + tcNam.score + dcNam.score;
  const score = Math.min(10, Math.round((rawScore / 12) * 10));

  if (nhGiaChu.isGood) reasons.push(`Ngũ hành ${hgCan.hanh} tương sinh/hòa với gia chủ (${hgGiaChu.hanh})`);
  if (dcGiaChu.relation === 'Tam Hợp' || dcGiaChu.relation === 'Lục Hợp') {
    reasons.push(`Địa chi ${hgCan.conGiap} thuộc ${dcGiaChu.relation} với tuổi ${hgGiaChu.conGiap} của gia chủ`);
  }
  if (tcGiaChu.relation === 'Tương Hợp') {
    reasons.push(`Thiên can ${canCandidate} hợp với can ${canGiaChu} của gia chủ`);
  }
  if (dcNam.relation === 'Tam Hợp' || dcNam.relation === 'Lục Hợp') {
    reasons.push(`Địa chi ${hgCan.conGiap} hợp với năm mới ${hgNam.conGiap}`);
  }
  if (nhNam.isGood) {
    reasons.push(`Ngũ hành ${hgCan.hanh} tương sinh với năm mới (${hgNam.hanh})`);
  }

  let level: XongDatCandidate['level'] = 'BINH_HOA';
  let levelLabel = 'Khá Tốt';
  if (score >= 8) {
    level = 'DAI_CAT';
    levelLabel = 'Đại Cát (Xuất Sắc)';
  } else if (score >= 6) {
    level = 'CAT';
    levelLabel = 'Tốt (Nên Chọn)';
  }

  return {
    year: candidateYear,
    hoaGiap: hgCan,
    score,
    level,
    levelLabel,
    reasons,
  };
}

export function getTopXongDat(giaChuYear: number, targetYear: number = new Date().getFullYear()): XongDatReport {
  const hgGiaChu = getHoaGiapData(giaChuYear);
  const hgNam = getHoaGiapData(targetYear);

  // Quét các tuổi đẹp từ 18 tuổi đến 65 tuổi
  const candidates: XongDatCandidate[] = [];
  const minBirth = targetYear - 65;
  const maxBirth = targetYear - 18;

  for (let y = minBirth; y <= maxBirth; y++) {
    const res = evaluateXongDatScore(y, giaChuYear, targetYear);
    if (res.score >= 6) {
      candidates.push(res);
    }
  }

  // Sắp xếp điểm giảm dần
  candidates.sort((a, b) => b.score - a.score);

  return {
    giaChu: {
      birthYear: giaChuYear,
      hoaGiap: hgGiaChu,
    },
    targetYear,
    targetYearHoaGiap: hgNam,
    topCandidates: candidates.slice(0, 10),
  };
}
