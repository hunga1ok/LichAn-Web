/**
 * Endpoint Xem Tuổi Hợp Tác Làm Ăn & Kinh Doanh
 * ============================================================================
 * GET /api/v1/xem-tuoi/lam-an
 * Query params:
 *  - chuSuYear: number (năm sinh chủ sự)
 *  - doiTacYear: number (năm sinh đối tác)
 *  - chuSuGender?: 'nam' | 'nu'
 *  - doiTacGender?: 'nam' | 'nu'
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import { evaluateLamAn } from '@/lib/xem-tuoi/lam-an';
import { apiSuccess, apiError } from '@/lib/api/response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const chuSuParam = searchParams.get('chuSuYear');
    const doiTacParam = searchParams.get('doiTacYear');
    const chuSuGender = (searchParams.get('chuSuGender') || 'nam') === 'nu' ? 'nu' : 'nam';
    const doiTacGender = (searchParams.get('doiTacGender') || 'nam') === 'nu' ? 'nu' : 'nam';

    if (!chuSuParam || !doiTacParam) {
      return apiError('Vui lòng cung cấp đầy đủ tham số chuSuYear và doiTacYear', 400);
    }

    const chuSuYear = parseInt(chuSuParam, 10);
    const doiTacYear = parseInt(doiTacParam, 10);

    if (isNaN(chuSuYear) || isNaN(doiTacYear) || chuSuYear < 1920 || doiTacYear < 1920) {
      return apiError('Năm sinh không hợp lệ', 400);
    }

    const report = evaluateLamAn(chuSuYear, doiTacYear, chuSuGender, doiTacGender);
    return apiSuccess(report);
  } catch (error) {
    console.error('Lỗi khi xem tuổi làm ăn:', error);
    return apiError('Lỗi máy chủ nội bộ khi đánh giá tuổi làm ăn', 500);
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
