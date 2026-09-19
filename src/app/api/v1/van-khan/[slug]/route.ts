import { NextRequest } from 'next/server';
import { getVanKhanBySlug } from '@/lib/van-khan';
import { apiSuccess, apiError, handleOptions } from '@/lib/api/response';

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const item = getVanKhanBySlug(slug);

    if (!item) {
      return apiError(`Không tìm thấy bài văn khấn với slug "${slug}".`, 404);
    }

    return apiSuccess(item);
  } catch (error: any) {
    return apiError(error?.message || 'Lỗi tra cứu bài văn khấn.', 500);
  }
}
