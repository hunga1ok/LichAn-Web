/**
 * Xem Tuổi Hợp Tác Làm Ăn & Kinh Doanh
 * ============================================================================
 * Đánh giá sự tương hợp giữa Chủ sự và Đối tác kinh doanh dựa trên:
 * 1. Ngũ hành tương sinh (hỗ trợ dòng tiền, vận may)
 * 2. Thiên can tương hợp (chung chí hướng, ý tưởng kinh doanh)
 * 3. Địa chi tam hợp / lục hợp (bền vững trong hợp tác)
 * 4. Cung phi Bát trạch (vượng khí và uy tín thương mại)
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

export interface LamAnReport {
  chuSu: {
    birthYear: number;
    gender: 'nam' | 'nu';
    hoaGiap: HoaGiapData;
    cungPhi: CungPhiInfo;
  };
  doiTac: {
    birthYear: number;
    gender: 'nam' | 'nu';
    hoaGiap: HoaGiapData;
    cungPhi: CungPhiInfo;
  };
  scores: {
    nguHanh: NguHanhResult;
    thienCan: ThienCanResult;
    diaChi: DiaChiResult;
    cungPhi: CungPhiResult;
    totalScore: number; // Thang điểm 10 (quy đổi)
  };
  conclusion: {
    level: 'DAI_CAT' | 'TRUNG_CAT' | 'BINH_HOA' | 'HUNG';
    levelLabel: string;
    summary: string;
    phanChiaVaiTro: string;
    advice: string;
  };
}

export function evaluateLamAn(
  chuSuYear: number,
  doiTacYear: number,
  chuSuGender: 'nam' | 'nu' = 'nam',
  doiTacGender: 'nam' | 'nu' = 'nam'
): LamAnReport {
  const hgChuSu = getHoaGiapData(chuSuYear);
  const hgDoiTac = getHoaGiapData(doiTacYear);

  const cpChuSu = getCungPhi(chuSuYear, chuSuGender);
  const cpDoiTac = getCungPhi(doiTacYear, doiTacGender);

  const resNguHanh = evaluateNguHanh(hgChuSu.hanh, hgDoiTac.hanh);
  const can1 = hgChuSu.canChi.split(' ')[0];
  const can2 = hgDoiTac.canChi.split(' ')[0];
  const resThienCan = evaluateThienCan(can1, can2);
  const resDiaChi = evaluateDiaChi(hgChuSu.conGiap, hgDoiTac.conGiap);
  const resCungPhi = evaluateCungPhi(cpChuSu.cung, cpDoiTac.cung);

  // Thang điểm 10: Ngũ hành (3đ), Địa chi (3đ), Thiên can (2đ), Cung phi (2đ)
  const rawScore = (resNguHanh.score * 1.5) + (resDiaChi.score * 1.5) + resThienCan.score + resCungPhi.score;
  const totalScore = Math.min(10, Math.round(rawScore));

  let level: LamAnReport['conclusion']['level'] = 'BINH_HOA';
  let levelLabel = 'Bình Hòa (Hợp Tác Ổn Định)';
  let summary = '';
  let phanChiaVaiTro = '';
  let advice = '';

  if (totalScore >= 8) {
    level = 'DAI_CAT';
    levelLabel = 'Đại Cát (Đối Tác Vàng)';
    summary = `Hai tuổi ${hgChuSu.canChi} và ${hgDoiTac.canChi} cực kỳ hợp nhau trong công việc kinh doanh (${totalScore}/10 điểm). Cùng hợp tác sẽ như rồng gặp mây, công việc phát triển thần tốc.`;
    phanChiaVaiTro = 'Cả hai có sự thấu hiểu tuyệt vời. Người mang mệnh vượng hơn nên làm đại diện đối ngoại, ký kết; người còn lại phụ trách hoạch định chiến lược và quản lý dòng tiền.';
    advice = 'Nên nhanh chóng nắm bắt các cơ hội đầu tư chung, ký kết hợp đồng rõ ràng minh bạch để gắn kết lâu dài.';
  } else if (totalScore >= 6) {
    level = 'TRUNG_CAT';
    levelLabel = 'Trung Cát (Hợp Tác Tốt)';
    summary = `Hai tuổi ${hgChuSu.canChi} và ${hgDoiTac.canChi} kết hợp làm ăn khá thuận lợi (${totalScore}/10 điểm). Có khả năng bù trừ điểm mạnh điểm yếu cho nhau.`;
    phanChiaVaiTro = 'Cần phân định rõ ràng quyền hạn và trách nhiệm của từng người ngay từ ban đầu để tránh tranh chấp quyền điều hành.';
    advice = 'Tôn trọng ý kiến đối tác, duy trì minh bạch sổ sách tài chính hàng tháng.';
  } else if (totalScore >= 4) {
    level = 'BINH_HOA';
    levelLabel = 'Bình Thường (Cần Thận Trọng)';
    summary = `Độ tương hợp giữa hai tuổi ở mức trung bình (${totalScore}/10 điểm). Cần nhiều nỗ lực và sự kiên nhẫn để tìm thấy tiếng nói chung.`;
    phanChiaVaiTro = 'Nên có bên thứ ba trung gian hoặc luật sư kiểm duyệt các điều khoản hợp đồng góp vốn.';
    advice = 'Chỉ nên hợp tác trong các dự án ngắn hạn hoặc quy mô vừa phải trước khi cam kết lớn.';
  } else {
    level = 'HUNG';
    levelLabel = 'Tương Khắc (Không Khuyến Khích)';
    summary = `Hai tuổi ${hgChuSu.canChi} và ${hgDoiTac.canChi} có sự xung khắc về bản mệnh hoặc địa chi (${totalScore}/10 điểm), dễ nảy sinh bất đồng quan điểm và tranh chấp lợi ích.`;
    phanChiaVaiTro = 'Nếu bắt buộc phải hợp tác, cần mời thêm người thứ 3 mang tuổi Tam Hợp với cả hai người cùng tham gia để hóa giải xung khắc.';
    advice = 'Tuyệt đối minh bạch mọi văn bản tài chính, không phụ thuộc vào thỏa thuận miệng.';
  }

  return {
    chuSu: {
      birthYear: chuSuYear,
      gender: chuSuGender,
      hoaGiap: hgChuSu,
      cungPhi: cpChuSu,
    },
    doiTac: {
      birthYear: doiTacYear,
      gender: doiTacGender,
      hoaGiap: hgDoiTac,
      cungPhi: cpDoiTac,
    },
    scores: {
      nguHanh: resNguHanh,
      thienCan: resThienCan,
      diaChi: resDiaChi,
      cungPhi: resCungPhi,
      totalScore,
    },
    conclusion: {
      level,
      levelLabel,
      summary,
      phanChiaVaiTro,
      advice,
    },
  };
}
