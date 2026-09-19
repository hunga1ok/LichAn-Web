import { getDayInfo } from '@/lib/lunar';
import Link from 'next/link';

export default function HomePage() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  
  // Xử lý lấy thông tin ngày
  let dayInfo;
  try {
    dayInfo = getDayInfo(day, month, year);
  } catch (error) {
    console.error("Lỗi khi lấy thông tin ngày:", error);
    return <div className="text-center py-10 text-danger">Không thể tải thông tin ngày.</div>;
  }

  // Generate URL chuyển ngày
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatUrlDate = (d: Date) => `/xem-ngay/${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-primary">Lịch Hôm Nay</h1>
            <div className="flex gap-2">
              <Link href={formatUrlDate(yesterday)} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm">Hôm qua</Link>
              <Link href={formatUrlDate(tomorrow)} className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark text-sm">Ngày mai</Link>
            </div>
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

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">Giờ Hoàng Đạo</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {dayInfo.gioHoangDao.map((gio: any, idx: number) => (
                <div key={idx} className={`p-2 rounded text-center text-sm ${gio.isHoangDao ? 'bg-green-100 text-green-800 font-medium' : 'bg-gray-100 text-gray-500'}`}>
                  <div>{gio.name}</div>
                  <div className="text-xs opacity-80">{gio.time}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-green-700 flex items-center gap-2">
                <span>✅</span> Việc nên làm
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {dayInfo.viecNenLam.length > 0 ? (
                  dayInfo.viecNenLam.map((viec: string, idx: number) => <li key={idx}>{viec}</li>)
                ) : (
                  <li className="text-gray-500 italic">Không có đặc biệt</li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-red-700 flex items-center gap-2">
                <span>❌</span> Việc không nên làm
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {dayInfo.viecKhongNenLam.length > 0 ? (
                  dayInfo.viecKhongNenLam.map((viec: string, idx: number) => <li key={idx}>{viec}</li>)
                ) : (
                  <li className="text-gray-500 italic">Không có đặc biệt</li>
                )}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-2">Sao tốt</h3>
              <div className="flex flex-wrap gap-1">
                {dayInfo.saoTot.map((sao: string, idx: number) => (
                  <span key={idx} className="bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded text-xs">{sao}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Sao xấu</h3>
              <div className="flex flex-wrap gap-1">
                {dayInfo.saoXau.map((sao: string, idx: number) => (
                  <span key={idx} className="bg-red-50 text-red-700 border border-red-200 px-2 py-1 rounded text-xs">{sao}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold text-primary mb-4">Thông tin thêm</h3>
          <ul className="space-y-3">
            <li className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Tiết khí</span>
              <span className="font-medium">{dayInfo.tietKhi}</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Trực</span>
              <span className="font-medium">{dayInfo.truc}</span>
            </li>
          </ul>
        </div>
        
        {/* Mini Calendar tháng hiện tại */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Tháng {month}/{year}</h3>
            <Link href="/lich-van-nien" className="text-sm text-primary hover:underline">Xem đầy đủ</Link>
          </div>
          {(() => {
            const daysInMonth = new Date(year, month, 0).getDate();
            const firstDayOfWeek = (new Date(year, month - 1, 1).getDay() + 6) % 7; // 0=Mon
            const cells = [];
            // Empty cells before first day
            for (let i = 0; i < firstDayOfWeek; i++) {
              cells.push(<div key={`e${i}`} />);
            }
            // Day cells
            for (let d = 1; d <= daysInMonth; d++) {
              const lunar = getDayInfo(d, month, year);
              const isToday = d === day;
              cells.push(
                <Link
                  key={d}
                  href={`/xem-ngay/${d.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`}
                  className={`text-center p-1 rounded text-xs hover:bg-gray-100 ${
                    isToday ? 'bg-primary text-white font-bold hover:bg-primary-dark' : ''
                  } ${new Date(year, month - 1, d).getDay() === 0 ? 'text-danger' : ''}`}
                >
                  <div className="text-sm">{d}</div>
                  <div className={`text-[10px] ${isToday ? 'text-white/80' : 'text-gray-400'}`}>{lunar.lunarDate.day}</div>
                </Link>
              );
            }
            return (
              <>
                <div className="grid grid-cols-7 gap-1 mb-1">
                  {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => (
                    <div key={d} className="text-center text-xs font-medium text-gray-500">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">{cells}</div>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
