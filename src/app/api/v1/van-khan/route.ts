import { NextRequest } from 'next/server';
import { getAllVanKhan, getVanKhanByCategory, searchVanKhan, VanKhanCategory } from '@/lib/van-khan';
import { apiSuccess, apiError, handleOptions } from '@/lib/api/response';

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') as VanKhanCategory | null;
    const search = searchParams.get('search') || searchParams.get('q');

    let items = getAllVanKhan();

    if (category) {
      items = getVanKhanByCategory(category);
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      items = items.filter((item) => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.shortDesc.toLowerCase().includes(q) ||
          item.target.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
        );
      });
    }

    return apiSuccess({
      total: items.length,
      category: category || 'all',
      searchQuery: search || null,
      items,
    });
  } catch (error: any) {
    return apiError(error?.message || 'Lỗi tra cứu danh sách văn khấn.', 500);
  }
}
