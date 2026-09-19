import { NextRequest } from 'next/server';
import { lunarService } from '@/lib/lunar';
import { apiSuccess, apiError, handleOptions } from '@/lib/api/response';

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || 'solar2lunar';
    const day = parseInt(searchParams.get('day') || searchParams.get('d') || '', 10);
    const month = parseInt(searchParams.get('month') || searchParams.get('m') || '', 10);
    const year = parseInt(searchParams.get('year') || searchParams.get('y') || '', 10);
    const leap = parseInt(searchParams.get('leap') || '0', 10);

    if (isNaN(day) || isNaN(month) || isNaN(year) || month < 1 || month > 12 || day < 1 || day > 31) {
      return apiError('Tham số ngày, tháng hoặc năm không hợp lệ.', 400);
    }

    if (type === 'solar2lunar') {
      const lunar = lunarService.solarToLunar(day, month, year);
      const dayInfo = lunarService.getDayInfo(day, month, year);
      return apiSuccess({
        type: 'solar2lunar',
        solarDate: { day, month, year },
        lunarDate: lunar,
        canChiDay: dayInfo.canChiDay.fullName,
        canChiMonth: dayInfo.canChiMonth.fullName,
        canChiYear: dayInfo.canChiYear.fullName,
      });
    } else if (type === 'lunar2solar') {
      const solar = lunarService.lunarToSolar(day, month, year, leap);
      if (solar.day === 0) {
        return apiError('Ngày âm lịch không tồn tại hoặc năm này không có tháng nhuận đó.', 400);
      }
      const dayInfo = lunarService.getDayInfo(solar.day, solar.month, solar.year);
      return apiSuccess({
        type: 'lunar2solar',
        lunarDate: { day, month, year, isLeap: leap === 1 },
        solarDate: solar,
        canChiDay: dayInfo.canChiDay.fullName,
        canChiMonth: dayInfo.canChiMonth.fullName,
        canChiYear: dayInfo.canChiYear.fullName,
      });
    } else {
      return apiError('Tham số type phải là "solar2lunar" hoặc "lunar2solar".', 400);
    }
  } catch (error: any) {
    return apiError(error?.message || 'Lỗi chuyển đổi lịch.', 500);
  }
}
