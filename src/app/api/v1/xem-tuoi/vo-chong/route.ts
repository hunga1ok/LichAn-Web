/**
 * Endpoint Tra Cứu Hợp Khắc Tuổi Vợ Chồng
 * ============================================================================
 * GET /api/v1/xem-tuoi/vo-chong
 * Query params:
 *  - chongYear: number (năm sinh chồng)
 *  - voYear: number (năm sinh vợ)
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import { evaluateVoChong } from '@/lib/xem-tuoi/vo-chong';
import { apiSuccess, apiError } from '@/lib/api/response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const chongParam = searchParams.get('chongYear');
    const voParam = searchParams.get('voYear');

    if (!chongParam || !voParam) {
      return apiError('Vui lòng cung cấp đầy đủ tham số chongYear và voYear', 400);
    }

    const chongYear = parseInt(chongParam, 10);
    const voYear = parseInt(voParam, 10);

    if (isNaN(chongYear) || isNaN(voYear) || chongYear < 1920 || voYear < 1920) {
      return apiError('Năm sinh không hợp lệ (hỗ trợ từ năm 1920)', 400);
    }

    const report = evaluateVoChong(chongYear, voYear);
    return apiSuccess(report);
  } catch (error) {
    console.error('Lỗi khi xem tuổi vợ chồng:', error);
    return apiError('Lỗi máy chủ nội bộ khi đánh giá tuổi vợ chồng', 500);
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
