/**
 * Endpoint Tra Cứu Tử Vi Cá Nhân Hóa
 * ============================================================================
 * GET /api/v1/tu-vi
 * Query params:
 *  - birthYear: number (1900 - 2100)
 *  - year?: number (năm xem, mặc định năm hiện tại)
 *  - gender?: 'nam' | 'nu' (mặc định 'nam')
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import { getTuViPersonalReport } from '@/lib/tu-vi';
import { apiSuccess, apiError } from '@/lib/api/response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const birthYearParam = searchParams.get('birthYear');
    const yearParam = searchParams.get('year');
    const genderParam = searchParams.get('gender') || 'nam';

    if (!birthYearParam) {
      return apiError('Vui lòng cung cấp tham số birthYear (năm sinh)', 400);
    }

    const birthYear = parseInt(birthYearParam, 10);
    if (isNaN(birthYear) || birthYear < 1920 || birthYear > 2030) {
      return apiError('Năm sinh không hợp lệ (hỗ trợ 1920 - 2030)', 400);
    }

    const currentYear = yearParam ? parseInt(yearParam, 10) : new Date().getFullYear();
    const gender = genderParam.toLowerCase() === 'nu' ? 'nu' : 'nam';

    const report = getTuViPersonalReport(birthYear, currentYear, gender);
    return apiSuccess(report);
  } catch (error) {
    console.error('Lỗi khi tra cứu tử vi:', error);
    return apiError('Lỗi máy chủ nội bộ khi tính toán tử vi', 500);
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
