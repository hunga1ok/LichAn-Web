import { NextRequest } from 'next/server';
import { lunarService } from '@/lib/lunar';
import { apiSuccess, apiError, handleOptions } from '@/lib/api/response';

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get('date');
    const dParam = searchParams.get('d') || searchParams.get('day');
    const mParam = searchParams.get('m') || searchParams.get('month');
    const yParam = searchParams.get('y') || searchParams.get('year');
    const xuatHanhParam = searchParams.get('xuatHanh') === 'true';

    let day: number;
    let month: number;
    let year: number;

    if (dateParam) {
      // Hỗ trợ cả định dạng YYYY-MM-DD và DD-MM-YYYY
      if (dateParam.includes('-')) {
        const parts = dateParam.split('-');
        if (parts[0].length === 4) {
          // YYYY-MM-DD
          year = parseInt(parts[0], 10);
          month = parseInt(parts[1], 10);
          day = parseInt(parts[2], 10);
        } else {
          // DD-MM-YYYY
          day = parseInt(parts[0], 10);
          month = parseInt(parts[1], 10);
          year = parseInt(parts[2], 10);
        }
      } else {
        return apiError('Định dạng date không hợp lệ. Vui lòng dùng YYYY-MM-DD hoặc DD-MM-YYYY.', 400);
      }
    } else if (dParam && mParam && yParam) {
      day = parseInt(dParam, 10);
      month = parseInt(mParam, 10);
      year = parseInt(yParam, 10);
    } else {
      const now = new Date();
      day = now.getDate();
      month = now.getMonth() + 1;
      year = now.getFullYear();
    }

    if (isNaN(day) || isNaN(month) || isNaN(year) || month < 1 || month > 12 || day < 1 || day > 31) {
      return apiError('Ngày, tháng hoặc năm không hợp lệ.', 400);
    }

    const dayInfo = lunarService.getDayInfo(day, month, year);

    if (xuatHanhParam) {
      const xuatHanh = lunarService.getXuatHanhInfo(day, month, year);
      return apiSuccess({
        ...dayInfo,
        xuatHanh,
      });
    }

    return apiSuccess(dayInfo);
  } catch (error: any) {
    return apiError(error?.message || 'Lỗi xử lý yêu cầu thông tin ngày.', 500);
  }
}
