import { NextRequest } from 'next/server';
import { xemTuoiLamNha } from '@/lib/feng-shui';
import { apiSuccess, apiError, handleOptions } from '@/lib/api/response';

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const now = new Date();
    const birthYearParam = searchParams.get('birthYear') || searchParams.get('birth');
    const targetYearParam = searchParams.get('targetYear') || searchParams.get('target') || `${now.getFullYear()}`;

    if (!birthYearParam) {
      return apiError('Thiếu tham số birthYear (năm sinh của gia chủ, ví dụ: 1990).', 400);
    }

    const birthYear = parseInt(birthYearParam, 10);
    const targetYear = parseInt(targetYearParam, 10);

    if (isNaN(birthYear) || birthYear < 1900 || birthYear > 2100) {
      return apiError('Năm sinh gia chủ không hợp lệ (hỗ trợ 1900 - 2100).', 400);
    }

    if (isNaN(targetYear) || targetYear < 1900 || targetYear > 2100) {
      return apiError('Năm dự kiến làm nhà không hợp lệ (hỗ trợ 1900 - 2100).', 400);
    }

    const result = xemTuoiLamNha(birthYear, targetYear);
    return apiSuccess(result);
  } catch (error: any) {
    return apiError(error?.message || 'Lỗi tra cứu phong thủy tuổi làm nhà.', 500);
  }
}
