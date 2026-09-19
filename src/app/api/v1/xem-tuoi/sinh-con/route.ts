/**
 * Endpoint Xem Tuổi Sinh Con Hợp Tuổi Bố Mẹ
 * ============================================================================
 * GET /api/v1/xem-tuoi/sinh-con
 * Query params:
 *  - boYear: number (năm sinh bố)
 *  - meYear: number (năm sinh mẹ)
 *  - conYear?: number (năm dự kiến sinh con, mặc định là năm nay hoặc năm sau)
 * ============================================================================
 */

import { NextRequest, NextResponse } from 'next/server';
import { evaluateSinhCon } from '@/lib/xem-tuoi/sinh-con';
import { apiSuccess, apiError } from '@/lib/api/response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const boParam = searchParams.get('boYear');
    const meParam = searchParams.get('meYear');
    const conParam = searchParams.get('conYear');

    if (!boParam || !meParam) {
      return apiError('Vui lòng cung cấp đầy đủ tham số boYear và meYear', 400);
    }

    const boYear = parseInt(boParam, 10);
    const meYear = parseInt(meParam, 10);
    const targetConYear = conParam ? parseInt(conParam, 10) : (new Date().getFullYear() + 1);

    if (isNaN(boYear) || isNaN(meYear) || isNaN(targetConYear)) {
      return apiError('Năm sinh không hợp lệ', 400);
    }

    const report = evaluateSinhCon(boYear, meYear, targetConYear);
    return apiSuccess(report);
  } catch (error) {
    console.error('Lỗi khi xem tuổi sinh con:', error);
    return apiError('Lỗi máy chủ nội bộ khi đánh giá tuổi sinh con', 500);
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
