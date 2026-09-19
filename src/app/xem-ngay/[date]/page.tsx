import { getDayInfo } from '@/lib/lunar';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ date: string }> }) {
  const resolvedParams = await params;
  return {
    title: `Xem ngày ${resolvedParams.date} - Lịch An`,
    description: `Tra cứu thông tin chi tiết ngày ${resolvedParams.date} âm dương.`,
  };
}

export default async function XemNgayPage({ params }: { params: Promise<{ date: string }> }) {
  const resolvedParams = await params;
  const { date } = resolvedParams; // Format: DD-MM-YYYY
  const parts = date.split('-');
  
  if (parts.length !== 3) {
    notFound();
  }

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    notFound();
  }

  let dayInfo;
  try {
    dayInfo = getDayInfo(day, month, year);
  } catch (error) {
    return <div className="text-center py-10 text-danger">Lỗi khi lấy thông tin ngày.</div>;
  }

  const current = new Date(year, month - 1, day);
  const prev = new Date(current);
  prev.setDate(prev.getDate() - 1);
  const next = new Date(current);
  next.setDate(next.getDate() + 1);

  const formatUrlDate = (d: Date) => `/xem-ngay/${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;

  return (
    <div>
      <div className="text-sm text-gray-500 mb-4 flex gap-2">
        <Link href="/" className="hover:text-primary">Trang chủ</Link>
        <span>&gt;</span>
        <Link href="/lich-van-nien" className="hover:text-primary">Xem ngày</Link>
        <span>&gt;</span>
        <span className="text-gray-800">{date}</span>
      </div>

      <div className="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <Link href={formatUrlDate(prev)} className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">Ngày trước</Link>
          <h1 className="text-2xl font-bold text-primary text-center">
            Chi Tiết Ngày {day}/{month}/{year}
          </h1>
          <Link href={formatUrlDate(next)} className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">Ngày sau</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-center">
          <div className="border rounded-lg p-6 bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">Dương Lịch</h2>
            <div className="text-xl mb-4">Tháng {dayInfo.solarDate.month} Năm {dayInfo.solarDate.year}</div>
            <div className="text-8xl font-bold text-gray-800">{dayInfo.solarDate.day}</div>
            <div className="mt-4 text-lg font-medium">{dayInfo.dayOfWeek}</div>
          </div>
          
          <div className="border rounded-lg p-6 bg-background-alt border-primary-light/30">
            <h2 className="text-lg font-semibold mb-2 text-primary-dark">Âm Lịch</h2>
            <div className="text-xl mb-4">Tháng {dayInfo.lunarDate.month} {dayInfo.lunarDate.leap ? '(Nhuận)' : ''} Năm {dayInfo.lunarDate.year}</div>
            <div className="text-8xl font-bold text-primary">{dayInfo.lunarDate.day}</div>
            <div className="mt-4 text-lg font-medium">Ngày {dayInfo.canChiDay.fullName}</div>
            <div className="text-sm text-gray-600 mt-1">
              Tháng {dayInfo.canChiMonth.fullName}, Năm {dayInfo.canChiYear.fullName}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
             <h3 className="text-lg font-semibold mb-4 border-b pb-2">Việc nên làm</h3>
             <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                {dayInfo.viecNenLam.length > 0 ? (
                  dayInfo.viecNenLam.map((viec: string, idx: number) => <li key={idx}>{viec}</li>)
                ) : (
                  <li className="text-gray-500 italic list-none">Không có</li>
                )}
             </ul>
          </div>
          <div>
             <h3 className="text-lg font-semibold mb-4 border-b pb-2">Việc kiêng kỵ</h3>
             <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                {dayInfo.viecKhongNenLam.length > 0 ? (
                  dayInfo.viecKhongNenLam.map((viec: string, idx: number) => <li key={idx}>{viec}</li>)
                ) : (
                  <li className="text-gray-500 italic list-none">Không có</li>
                )}
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
