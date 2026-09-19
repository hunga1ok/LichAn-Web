import { NextRequest } from 'next/server';
import { lunarService } from '@/lib/lunar';
import { AuspiciousPurpose } from '@/types/lunar';
import { apiSuccess, apiError, handleOptions } from '@/lib/api/response';

export async function OPTIONS() {
  return handleOptions();
}

const VALID_PURPOSES: AuspiciousPurpose[] = ['cuoi-hoi', 'khai-truong', 'dong-tho', 'xuat-hanh'];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const purpose = (searchParams.get('purpose') || 'cuoi-hoi') as AuspiciousPurpose;
    const now = new Date();
    const month = parseInt(searchParams.get('month') || searchParams.get('m') || `${now.getMonth() + 1}`, 10);
    const year = parseInt(searchParams.get('year') || searchParams.get('y') || `${now.getFullYear()}`, 10);
    const onlyGood = searchParams.get('onlyGood') !== 'false'; // mặc định true

    if (!VALID_PURPOSES.includes(purpose)) {
      return apiError(`Mục đích (purpose) không hợp lệ. Chọn một trong: ${VALID_PURPOSES.join(', ')}`, 400);
    }

    if (isNaN(month) || isNaN(year) || month < 1 || month > 12 || year < 1000 || year > 3000) {
      return apiError('Tháng (1-12) hoặc năm không hợp lệ.', 400);
    }

    const allDays = lunarService.getAuspiciousDays(purpose, month, year);
    const days = onlyGood ? allDays.filter((d) => d.isAuspicious) : allDays;

    return apiSuccess({
      purpose,
      month,
      year,
      totalFound: days.length,
      isFilteredOnlyGood: onlyGood,
      days,
    });
  } catch (error: any) {
    return apiError(error?.message || 'Lỗi tra cứu ngày tốt.', 500);
  }
}
