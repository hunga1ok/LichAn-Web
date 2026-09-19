/**
 * Xem Tuổi Sinh Con Hợp Tuổi Bố Mẹ
 * ============================================================================
 * Đánh giá sự tương hợp giữa Bố - Mẹ và Con cái trong năm dự kiến sinh:
 * 1. Ngũ hành Bản mệnh (Con sinh Cha Mẹ > Cha Mẹ sinh Con > Bình hòa > Khắc)
 * 2. Thiên can (Tương hợp, bình hòa, tránh tương xung)
 * 3. Địa chi (Tam hợp, lục hợp, tránh tứ hành xung, lục xung, lục hại)
 * ============================================================================
 */

import { getHoaGiapData, HoaGiapData } from '@/lib/tu-vi/hoa-giap';
import {
  evaluateNguHanh,
  evaluateThienCan,
  evaluateDiaChi,
  NguHanhResult,
  ThienCanResult,
  DiaChiResult,
} from './hop-khac-rules';

export interface SinhConYearEvaluation {
  conYear: number;
  conHoaGiap: HoaGiapData;
  scoreWithBo: number; // Thang điểm 5
  scoreWithMe: number; // Thang điểm 5
  totalScore: number; // Thang điểm 10
  level: 'DAI_CAT' | 'CAT' | 'BINH_HOA' | 'HUNG';
  levelLabel: string;
  nguHanhBoCon: NguHanhResult;
  nguHanhMeCon: NguHanhResult;
  thienCanBoCon: ThienCanResult;
  thienCanMeCon: ThienCanResult;
  diaChiBoCon: DiaChiResult;
  diaChiMeCon: DiaChiResult;
  summary: string;
}

export interface SinhConReport {
  bo: {
    birthYear: number;
    hoaGiap: HoaGiapData;
  };
  me: {
    birthYear: number;
    hoaGiap: HoaGiapData;
  };
  selectedYear: SinhConYearEvaluation;
  recommendedYears: SinhConYearEvaluation[]; // Đánh giá 5 năm kế tiếp
}

function evaluateSingleConYear(boYear: number, meYear: number, conYear: number): SinhConYearEvaluation {
  const hgBo = getHoaGiapData(boYear);
  const hgMe = getHoaGiapData(meYear);
  const hgCon = getHoaGiapData(conYear);

  const canBo = hgBo.canChi.split(' ')[0];
  const canMe = hgMe.canChi.split(' ')[0];
  const canCon = hgCon.canChi.split(' ')[0];

  // 1. Ngũ hành
  const nhBoCon = evaluateNguHanh(hgBo.hanh, hgCon.hanh);
  const nhMeCon = evaluateNguHanh(hgMe.hanh, hgCon.hanh);

  // 2. Thiên can
  const tcBoCon = evaluateThienCan(canBo, canCon);
  const tcMeCon = evaluateThienCan(canMe, canCon);

  // 3. Địa chi
  const dcBoCon = evaluateDiaChi(hgBo.conGiap, hgCon.conGiap);
  const dcMeCon = evaluateDiaChi(hgMe.conGiap, hgCon.conGiap);

  // Điểm với bố (tối đa 5): Ngũ hành 2đ, Chi 2đ, Can 1đ
  const scoreWithBo = nhBoCon.score + dcBoCon.score + (tcBoCon.score > 0 ? 1 : 0);
  // Điểm với mẹ (tối đa 5)
  const scoreWithMe = nhMeCon.score + dcMeCon.score + (tcMeCon.score > 0 ? 1 : 0);
  const totalScore = scoreWithBo + scoreWithMe;

  let level: SinhConYearEvaluation['level'] = 'BINH_HOA';
  let levelLabel = 'Bình Hòa (Bình Thường)';
  let summary = '';

  if (totalScore >= 8) {
    level = 'DAI_CAT';
    levelLabel = 'Đại Cát (Năm Vàng Sinh Con)';
    summary = `Năm ${conYear} (${hgCon.canChi} - ${hgCon.menh}) cực kỳ tốt để sinh con (${totalScore}/10 điểm). Con cái mang lại may mắn, tài lộc dồi dào, gia đình thêm hạnh phúc và vượng khí.`;
  } else if (totalScore >= 6) {
    level = 'CAT';
    levelLabel = 'Cát (Khá Tốt)';
    summary = `Năm ${conYear} (${hgCon.canChi}) là năm đẹp để đón thêm thành viên mới (${totalScore}/10 điểm). Bản mệnh và can chi của con hòa hợp với bố mẹ.`;
  } else if (totalScore >= 4) {
    level = 'BINH_HOA';
    levelLabel = 'Bình Hòa (Có Thể Sinh)';
    summary = `Năm ${conYear} (${hgCon.canChi}) ở mức độ bình hòa (${totalScore}/10 điểm). Không có xung khắc lớn, con cái lớn lên khỏe mạnh, bình an.`;
  } else {
    level = 'HUNG';
    levelLabel = 'Xung Khắc Nhẹ (Nên Cân Nhắc)';
    summary = `Năm ${conYear} (${hgCon.canChi}) có một vài điểm tương khắc về bản mệnh hoặc địa chi với bố/mẹ (${totalScore}/10 điểm). Nếu có thể, nên cân nhắc các năm kế tiếp có điểm số cao hơn.`;
  }

  return {
    conYear,
    conHoaGiap: hgCon,
    scoreWithBo,
    scoreWithMe,
    totalScore,
    level,
    levelLabel,
    nguHanhBoCon: nhBoCon,
    nguHanhMeCon: nhMeCon,
    thienCanBoCon: tcBoCon,
    thienCanMeCon: tcMeCon,
    diaChiBoCon: dcBoCon,
    diaChiMeCon: dcMeCon,
    summary,
  };
}

export function evaluateSinhCon(boYear: number, meYear: number, targetConYear: number): SinhConReport {
  const hgBo = getHoaGiapData(boYear);
  const hgMe = getHoaGiapData(meYear);

  const selectedYear = evaluateSingleConYear(boYear, meYear, targetConYear);

  // Quét 5 năm từ năm hiện tại
  const currentYear = new Date().getFullYear();
  const recommendedYears: SinhConYearEvaluation[] = [];
  for (let y = currentYear; y <= currentYear + 4; y++) {
    recommendedYears.push(evaluateSingleConYear(boYear, meYear, y));
  }

  // Sắp xếp các năm theo điểm số giảm dần
  recommendedYears.sort((a, b) => b.totalScore - a.totalScore);

  return {
    bo: { birthYear: boYear, hoaGiap: hgBo },
    me: { birthYear: meYear, hoaGiap: hgMe },
    selectedYear,
    recommendedYears,
  };
}
