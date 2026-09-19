/**
 * Endpoint Xem Tuổi Xông Đất & Mở Hàng Đầu Năm
 * ============================================================================
 * GET /api/v1/xem-tuoi/xong-dat
 * Query params:
 *  - giaChuYear: number (năm sinh gia chủ)
 *  - targetYear?: number (năm xem, mặc định là năm hiện tại hoặc năm tới)
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import { getTopXongDat } from '@/lib/xem-tuoi/xong-dat';
import { apiSuccess, apiError } from '@/lib/api/response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const giaChuParam = searchParams.get('giaChuYear');
    const targetParam = searchParams.get('targetYear');

    if (!giaChuParam) {
      return apiError('Vui lòng cung cấp tham số giaChuYear (năm sinh gia chủ)', 400);
    }

    const giaChuYear = parseInt(giaChuParam, 10);
    const targetYear = targetParam ? parseInt(targetParam, 10) : new Date().getFullYear();

    if (isNaN(giaChuYear) || isNaN(targetYear) || giaChuYear < 1920) {
      return apiError('Năm sinh không hợp lệ', 400);
    }

    const report = getTopXongDat(giaChuYear, targetYear);
    return apiSuccess(report);
  } catch (error) {
    console.error('Lỗi khi xem tuổi xông đất:', error);
    return apiError('Lỗi máy chủ nội bộ khi tìm tuổi xông đất', 500);
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
