/**
 * Endpoint Sinh Lịch iCalendar (.ics) / Webcal One-click Subscription
 * ============================================================================
 * GET /api/v1/calendar/subscribe.ics
 * Query params:
 *  - year: number (ví dụ: 2026). Mặc định lấy năm nay và năm sau (2 năm liên tiếp).
 *  - type: 'all' | 'ram-mung-1' | 'le-tet' (mặc định 'all')
 *  - reminder: '1' | '0' | 'true' | 'false' (mặc định '1')
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import { getYearLunarEvents, generateIcsContent } from '@/lib/calendar-sync/ics-generator';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const currentYear = new Date().getFullYear();
    const yearParam = searchParams.get('year');
    const typeParam = searchParams.get('type') || 'all';
    const reminderParam = searchParams.get('reminder');

    const enableReminder = reminderParam === null || reminderParam === '1' || reminderParam === 'true';

    const includeRamMung1 = typeParam === 'all' || typeParam === 'ram-mung-1';
    const includeFestivals = typeParam === 'all' || typeParam === 'le-tet';

    // Xác định danh sách năm cần tạo sự kiện
    let years: number[] = [];
    if (yearParam) {
      const parsedYear = parseInt(yearParam, 10);
      if (!isNaN(parsedYear) && parsedYear >= 1900 && parsedYear <= 2100) {
        years = [parsedYear];
      } else {
        years = [currentYear, currentYear + 1];
      }
    } else {
      // Mặc định tạo cho 2 năm liên tiếp để lịch luôn đầy đủ
      years = [currentYear, currentYear + 1];
    }

    const allEvents = years.flatMap(y =>
      getYearLunarEvents(y, {
        includeRamMung1,
        includeFestivals,
        enableReminder,
      })
    );

    let calName = 'Lịch Âm Lịch An (Rằm, Mùng 1 & Lễ Tết)';
    if (typeParam === 'ram-mung-1') {
      calName = 'Lịch Âm Lịch An (Ngày Rằm & Mùng 1)';
    } else if (typeParam === 'le-tet') {
      calName = 'Lịch Lễ Tết Cổ Truyền - Lịch An';
    }

    const icsString = generateIcsContent(allEvents, {
      calendarName: calName,
      calendarDesc: `Lịch âm Việt Nam tự động cập nhật từ Lịch An (lichan.com) cho năm ${years.join(', ')}.`,
      enableReminder,
    });

    return new NextResponse(icsString, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': 'attachment; filename="lich-an-viet-nam.ics"',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
    });
  } catch (error) {
    console.error('Lỗi khi sinh lịch .ics:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể tạo file lịch iCalendar' },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
