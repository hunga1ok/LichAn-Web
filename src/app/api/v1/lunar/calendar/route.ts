import { NextRequest } from 'next/server';
import { lunarService } from '@/lib/lunar';
import { apiSuccess, apiError, handleOptions } from '@/lib/api/response';

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const now = new Date();
    const month = parseInt(searchParams.get('month') || searchParams.get('m') || `${now.getMonth() + 1}`, 10);
    const year = parseInt(searchParams.get('year') || searchParams.get('y') || `${now.getFullYear()}`, 10);

    if (isNaN(month) || isNaN(year) || month < 1 || month > 12 || year < 1000 || year > 3000) {
      return apiError('Tháng (1-12) hoặc năm không hợp lệ.', 400);
    }

    const calendarData = lunarService.getMonthCalendar(month, year);
    return apiSuccess(calendarData);
  } catch (error: any) {
    return apiError(error?.message || 'Lỗi xử lý dữ liệu lịch tháng.', 500);
  }
}
