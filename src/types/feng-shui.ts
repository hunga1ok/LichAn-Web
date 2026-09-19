export interface TamTaiResult {
  isPham: boolean;
  yearName: string;         // Tên năm xem (ví dụ: "Bính Ngọ 2026")
  chiName: string;          // Chi của năm xem (ví dụ: "Ngọ")
  tamTaiYears: string[];    // 3 năm Tam Tai của tuổi gia chủ (ví dụ: ["Dần", "Mão", "Thìn"])
  yearRank?: 1 | 2 | 3;     // Năm Tam Tai thứ 1 (đầu), thứ 2 (giữa), hay thứ 3 (cuối)
  description: string;      // Luận giải chi tiết
}

export type KimLauType = 'than' | 'the' | 'tu' | 'suc' | 'none';

export interface KimLauResult {
  isPham: boolean;
  tuoiMu: number;           // Tuổi mụ = Năm xem - Năm sinh + 1
  remainder: number;        // Số dư khi chia cho 9
  type: KimLauType;         // Loại phạm: thân, thê, tử, súc hoặc none
  typeName: string;         // Tên tiếng Việt (ví dụ: "Kim Lâu Thê")
  description: string;      // Luận giải chi tiết
}

export interface HoangOcResult {
  isGood: boolean;          // true = cung tốt (Nhất Cát, Nhì Nghi, Tứ Tấn Tài)
  tuoiMu: number;
  cungIndex: number;        // 1 đến 6
  cungName: string;         // "Nhất Cát", "Nhì Nghi", "Tam Địa Sát", "Tứ Tấn Tài", "Ngũ Thọ Tử", "Lục Hoang Ốc"
  yNghia: string;           // Ý nghĩa cung
  description: string;      // Luận giải chi tiết
}

export interface XemTuoiLamNhaResult {
  birthYear: number;        // Năm sinh gia chủ
  targetYear: number;       // Năm dự kiến làm nhà
  canChiBirth: string;      // Can Chi năm sinh (ví dụ: "Giáp Tý 1984")
  canChiTarget: string;     // Can Chi năm làm nhà (ví dụ: "Bính Ngọ 2026")
  tuoiMu: number;           // Tuổi mụ
  tamTai: TamTaiResult;
  kimLau: KimLauResult;
  hoangOc: HoangOcResult;
  score: number;            // Thang điểm đánh giá 0 - 100
  canBuild: boolean;        // true = tuổi đẹp nên làm nhà; false = phạm hạn nên mượn tuổi
  verdict: string;          // "Đại Cát Làm Nhà" | "Tạm Chấp Nhận" | "Phạm Đại Kỵ - Nên Mượn Tuổi"
  recommendation: string;   // Lời khuyên cụ thể cho gia chủ
  suggestedAges?: TuoiMuonLamNha[]; // Danh sách tuổi mượn đẹp nhất nếu phạm
}

export interface TuoiMuonLamNha {
  birthYear: number;
  canChi: string;
  tuoiMu: number;
  hoangOcCung: string;
  reasons: string[];
}
